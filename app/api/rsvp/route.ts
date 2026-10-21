
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Guest = {
  id: string;
  name: string;
  seats: number;
  additionalGuest?: string;
};

type BackendResult = {
  success?: boolean;
  guests?: Guest[];
  error?: string;
};

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

export async function POST(request: NextRequest) {
  try {
    const scriptURL = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!scriptURL) {
      console.error("GOOGLE_APPS_SCRIPT_URL is missing");

      return errorResponse(
        "RSVP service is not configured.",
        503
      );
    }

    const body = await request.json();

    if (!body || typeof body !== "object") {
      return errorResponse("Invalid request.", 400);
    }

    let payload;

    // ====================================
    // SEARCH GUESTS
    // ====================================

    if (body.action === "searchGuests") {
      const query = body.query;

      if (
        typeof query !== "string" ||
        query.trim().length < 3 ||
        query.trim().length > 100
      ) {
        return errorResponse(
          "Enter a valid guest name.",
          400
        );
      }

      payload = {
        action: "searchGuests",
        query: query.trim(),
      };
    }

    // ====================================
    // SUBMIT RSVP
    // ====================================

    else if (body.action === "submitRSVP") {
      if (
        typeof body.guestId !== "string" ||
        !body.guestId.trim() ||
        !["Yes", "No"].includes(body.attending) ||
        !Number.isInteger(body.attendees) ||
        body.attendees < 0 ||
        !Array.isArray(body.additionalGuestNames) ||
        body.additionalGuestNames.some(
          (name: unknown) =>
            typeof name !== "string" ||
            name.trim().length > 150
        ) ||
        typeof body.message !== "string" ||
        body.message.length > 2000
      ) {
        return errorResponse(
          "Invalid RSVP information.",
          400
        );
      }

      const expectedCount =
        body.attending === "Yes"
          ? body.attendees - 1
          : 0;

      if (
        (body.attending === "Yes" &&
          body.attendees < 1) ||
        (body.attending === "No" &&
          body.attendees !== 0) ||
        body.additionalGuestNames.length !==
          expectedCount ||
        body.additionalGuestNames.some(
          (name: string) => !name.trim()
        )
      ) {
        return errorResponse(
          "Invalid additional guest information.",
          400
        );
      }

      payload = {
        action: "submitRSVP",
        guestId: body.guestId.trim(),
        attending: body.attending,
        attendees: body.attendees,
        additionalGuestNames:
          body.additionalGuestNames.map(
            (name: string) => name.trim()
          ),
        message: body.message.trim(),
      };
    } else {
      return errorResponse("Unknown action.", 400);
    }

    // ====================================
    // GOOGLE APPS SCRIPT CONNECTION
    // ====================================

    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      console.error(
        "Apps Script HTTP status:",
        response.status
      );

      return errorResponse(
        "Google Apps Script is unavailable.",
        502
      );
    }

    const result: BackendResult = await response.json();

    if (result.success !== true) {
      return errorResponse(
        result.error || "RSVP request failed.",
        400
      );
    }

    // ====================================
    // RETURN SEARCH RESULTS
    // ====================================

    if (body.action === "searchGuests") {
      if (!Array.isArray(result.guests)) {
        return errorResponse(
          "Invalid guest lookup response.",
          502
        );
      }

      const guests = result.guests.filter(
        (guest) =>
          typeof guest.id === "string" &&
          guest.id.length > 0 &&
          typeof guest.name === "string" &&
          Number.isInteger(guest.seats) &&
          guest.seats >= 1
      );

      return NextResponse.json(
        {
          success: true,
          guests,
        },
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // ====================================
    // CONFIRMED SUBMISSION
    // ====================================

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

  } catch (error) {
    console.error("RSVP API error:", error);

    return errorResponse(
      "Unable to process RSVP. Please try again.",
      502
    );
  }
}
