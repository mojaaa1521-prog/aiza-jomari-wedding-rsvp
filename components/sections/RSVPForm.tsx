
"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

// ======================================
// TYPES
// ======================================

type Guest = {
  id: string;
  name: string;
  seats: number;
  additionalGuest?: string;
};

type RSVPData = {
  attending: "Yes" | "No";
  attendees: number;
  message: string;
};

type APIResponse = {
  success: boolean;
  guests?: Guest[];
  error?: string;
};

// ======================================
// MAIN COMPONENT
// ======================================

export default function RSVPForm() {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchResults, setSearchResults] = useState<Guest[]>([]);

  const [selectedGuest, setSelectedGuest] =
    useState<Guest | null>(null);

  const [additionalNames, setAdditionalNames] =
    useState<string[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [confirmedAttendees, setConfirmedAttendees] =
    useState(0);

  const [confirmedStatus, setConfirmedStatus] =
    useState<"Yes" | "No">("Yes");

  const {
  register,
  handleSubmit,
  reset,
  control,
  formState: { errors },
} = useForm<RSVPData>({
  defaultValues: {
    attending: "Yes",
    attendees: 1,
    message: "",
  },
});

 const attending = useWatch({
  control,
  name: "attending",
});

const attendeeCount = Number(
  useWatch({
    control,
    name: "attendees",
  }) ?? 1
);

  // ======================================
  // PRE-ASSIGNED COMPANION
  // ======================================

  function getFixedCompanion(guest: Guest) {
    const value = String(
      guest.additionalGuest ?? ""
    ).trim();

    if (!value || /^\d+$/.test(value)) {
      return "";
    }

    return value;
  }

  // ======================================
  // SEARCH LIVE GUEST DATABASE
  // ======================================

  async function searchGuest() {
    const query = search.trim();

    if (query.length < 3) {
      setSearchError(
        "Please enter at least 3 characters."
      );
      return;
    }

    setSearching(true);
    setSearchError("");
    setSearchResults([]);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "searchGuests",
          query,
        }),
      });

      const result: APIResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to search guests."
        );
      }

      const guests = result.guests ?? [];

      setSearchResults(guests);

      if (guests.length === 0) {
        setSearchError(
          "No invitation found. Please check your name."
        );
      }
    } catch (error) {
      console.error("Guest search error:", error);

      setSearchError(
        "Unable to search the guest list. Please try again."
      );
    } finally {
      setSearching(false);
    }
  }

  // ======================================
  // SELECT GUEST
  // ======================================

  function selectGuest(guest: Guest) {
    setSelectedGuest(guest);
    setSearch(guest.name);
    setSearchResults([]);
    setSearchError("");
    setSubmitError("");
    setSubmitted(false);

    const fixedCompanion = getFixedCompanion(guest);

    setAdditionalNames(
      Array.from(
        { length: Math.max(0, guest.seats - 1) },
        (_, i) => (i === 0 ? fixedCompanion : "")
      )
    );

    reset({
      attending: "Yes",
      attendees: 1,
      message: "",
    });
  }

  // ======================================
  // RESET GUEST SEARCH
  // ======================================

  function clearGuest() {
    setSelectedGuest(null);
    setSearch("");
    setSearchResults([]);
    setSearchError("");
    setAdditionalNames([]);
    setSubmitError("");
    setSubmitted(false);

    reset({
      attending: "Yes",
      attendees: 1,
      message: "",
    });
  }

  // ======================================
  // ADDITIONAL GUEST NAME
  // ======================================

  function updateAdditionalName(
    index: number,
    value: string
  ) {
    setAdditionalNames((previous) => {
      const updated = [...previous];
      updated[index] = value;
      return updated;
    });

    setSubmitError("");
  }

  // ======================================
  // SUBMIT RSVP
  // ======================================

  async function onSubmit(data: RSVPData) {
    if (!selectedGuest || submitting) {
      return;
    }

    setSubmitError("");

    const isAttending = data.attending === "Yes";

    const totalAttendees = isAttending
      ? Number(data.attendees)
      : 0;

    if (
      !Number.isInteger(totalAttendees) ||
      totalAttendees < 0 ||
      totalAttendees > selectedGuest.seats ||
      (isAttending && totalAttendees < 1)
    ) {
      setSubmitError(
        "Please select a valid number of attendees."
      );
      return;
    }

    const additionalCount = isAttending
      ? totalAttendees - 1
      : 0;

    const names = additionalNames
      .slice(0, additionalCount)
      .map((name) => name.trim());

    if (names.some((name) => !name)) {
      setSubmitError(
        "Please enter the full name of every additional guest."
      );
      return;
    }

    const normalizedNames = [
      selectedGuest.name,
      ...names,
    ].map((name) => name.toLowerCase().replace(/\s+/g, " ").trim());

    if (new Set(normalizedNames).size !== normalizedNames.length) {
      setSubmitError(
        "Each attendee must have a different full name."
      );
      return;
    }

    const fixedCompanion =
      getFixedCompanion(selectedGuest);

    if (
      fixedCompanion &&
      additionalCount > 0 &&
      names[0].toLowerCase() !==
        fixedCompanion.toLowerCase()
    ) {
      setSubmitError(
        "The pre-assigned additional guest cannot be changed."
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "submitRSVP",
          guestId: selectedGuest.id,
          attending: data.attending,
          attendees: totalAttendees,
          additionalGuestNames: names,
          message: data.message.trim(),
        }),
      });

      const result: APIResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "RSVP submission failed."
        );
      }

      setConfirmedAttendees(totalAttendees);
      setConfirmedStatus(data.attending);
      setSubmitted(true);

    } catch (error) {
      console.error("RSVP submission error:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit RSVP. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ======================================
  // STYLE
  // ======================================

  const inputStyle = `
    mt-2
    w-full
    rounded-2xl
    border
    border-[#E7D5C2]
    bg-[#FFFDF9]
    p-4
    text-[#3A2B2B]
    placeholder:text-[#9A8A80]
    outline-none
    transition
    focus:border-[#8A2846]
    focus:ring-4
    focus:ring-[#8A2846]/20
  `;

  const primaryButton = `
    w-full
    rounded-full
    border
    border-[#C8A04A]
    bg-[#8A2846]
    py-4
    font-semibold
    uppercase
    tracking-[0.15em]
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:bg-[#6D1E39]
    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

  // ======================================
  // RENDER
  // ======================================

  return (
    <section
      id="rsvp"
      className="
        relative
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
        px-4
        py-24
        sm:px-6
      "
      style={{
        backgroundImage:
          "url('/gallery/photo7.jpg')",
      }}
    >
      {/* BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-[#FFF9F3]/65" />

      <div className="relative z-10 mx-auto max-w-2xl">

        {/* HEADING */}
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-[#8A2846]">
            RSVP
          </p>

          <h2 className="mt-4 font-(--font-heading) text-5xl text-(--foreground)">
            Kindly Respond
          </h2>

          <p className="mt-5 text-(--foreground) opacity-70">
            We can&apos;t wait to celebrate
            our special day with you.
          </p>
        </div>

        {/* MAIN CARD */}
        <div
          className="
            space-y-7
            rounded-[40px]
            border
            border-[#E7D5C2]
            bg-white/30
            p-6
            shadow-[0_20px_60px_rgba(58,43,43,0.15)]
            backdrop-blur-md
            sm:p-10
          "
        >
          {/* HEADER */}
          <div className="text-center">
            <div className="text-4xl text-[#C8A04A]">
              ❀
            </div>

            <h3 className="mt-3 font-(--font-heading) text-3xl text-[#3A2B2B]">
              Find Your Invitation
            </h3>

            <p className="mt-3 text-sm text-[#3A2B2B]/70">
              Search your name to view your
              reserved seats.
            </p>
          </div>

          {/* ============================== */}
          {/* SEARCH GUEST */}
          {/* ============================== */}

          {!selectedGuest && (
            <div className="space-y-4">

              <div>
                <label
                  htmlFor="guest-search"
                  className="font-medium text-[#3A2B2B]"
                >
                  Guest Full Name
                </label>

                <input
                  id="guest-search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSearchResults([]);
                    setSearchError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      if (!searching) {
                        void searchGuest();
                      }
                    }
                  }}
                  placeholder="Enter your full name"
                  autoComplete="off"
                  className={inputStyle}
                />
              </div>

              <button
                type="button"
                disabled={
                  searching ||
                  search.trim().length < 3
                }
                onClick={searchGuest}
                className={primaryButton}
              >
                {searching
                  ? "Searching..."
                  : "Search Invitation"}
              </button>

              {searchError && (
                <p
                  role="alert"
                  className="text-center text-sm text-red-700"
                >
                  {searchError}
                </p>
              )}

              {searchResults.length > 0 && (
                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#E7D5C2]
                    bg-[#FFFDF9]
                    shadow-md
                  "
                >
                  {searchResults.map((guest) => (
                    <button
                      key={guest.id}
                      type="button"
                      onClick={() =>
                        selectGuest(guest)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-3
                        border-b
                        border-[#E7D5C2]
                        p-4
                        text-left
                        text-[#3A2B2B]
                        transition
                        last:border-b-0
                        hover:bg-[#F8EDE5]
                      "
                    >
                      <span className="font-medium">
                        {guest.name}
                      </span>

                      <span className="shrink-0 text-sm text-[#8A2846]">
                        Select →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================== */}
          {/* SELECTED GUEST */}
          {/* ============================== */}

          {selectedGuest && (
            <>
              <div
                className="
                  rounded-3xl
                  border
                  border-[#D8BE91]
                  bg-[#FFF9F3]/90
                  p-6
                  text-center
                  shadow-sm
                "
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#8A2846]">
                  Welcome
                </p>

                <h3 className="mt-3 font-(--font-heading) text-3xl text-[#3A2B2B]">
                  {selectedGuest.name}
                </h3>

                <div className="mx-auto my-5 h-px w-24 bg-[#C8A04A]" />

                <p className="text-sm uppercase tracking-widest text-[#8A2846]">
                  Your Reserved Seats
                </p>

                <div className="mt-4 text-6xl font-semibold text-[#8A2846]">
                  {selectedGuest.seats}
                </div>

                <p className="mt-2 text-sm text-[#3A2B2B]/70">
                  {selectedGuest.seats === 1
                    ? "Seat Reserved"
                    : "Seats Reserved"}
                </p>

                <p className="mt-3 text-xs text-[#3A2B2B]/70">
                  Including yourself and
                  your additional guests.
                </p>

                {getFixedCompanion(selectedGuest) && (
                  <div
                    className="
                      mt-5
                      rounded-xl
                      bg-[#F2E5D8]
                      p-3
                    "
                  >
                    <p className="text-xs text-[#3A2B2B]/70">
                      Pre-assigned companion
                    </p>

                    <p className="mt-1 font-medium text-[#8A2846]">
                      {getFixedCompanion(selectedGuest)}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={clearGuest}
                  className="
                    mt-5
                    text-sm
                    font-medium
                    text-[#8A2846]
                    underline
                    underline-offset-4
                  "
                >
                  Not you? Search again
                </button>
              </div>

              {/* ============================== */}
              {/* RSVP SUBMISSION FORM */}
              {/* ============================== */}

              {!submitted && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >

                  {/* ATTENDANCE */}
                  <div>
                    <p className="mb-3 font-medium text-[#3A2B2B]">
                      Kindly confirm your attendance
                    </p>

                    <label
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        border-[#E7D5C2]
                        bg-white/80
                        p-4
                        text-[#3A2B2B]
                      "
                    >
                      <input
                        type="radio"
                        value="Yes"
                        {...register("attending", {
                          required: true,
                        })}
                        className="accent-[#8A2846]"
                      />

                      <span>Joyfully Accept</span>
                    </label>

                    <label
                      className="
                        mt-3
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        border-[#E7D5C2]
                        bg-white/80
                        p-4
                        text-[#3A2B2B]
                      "
                    >
                      <input
                        type="radio"
                        value="No"
                        {...register("attending", {
                          required: true,
                        })}
                        className="accent-[#8A2846]"
                      />

                      <span>Regretfully Decline</span>
                    </label>

                    {errors.attending && (
                      <p className="mt-2 text-sm text-red-600">
                        Please confirm your attendance.
                      </p>
                    )}
                  </div>

                  {/* ============================== */}
                  {/* ATTENDEE COUNT */}
                  {/* ============================== */}

                  {attending === "Yes" && (
                    <>
                      <div>
                        <label
                          htmlFor="attendee-count"
                          className="font-medium text-[#3A2B2B]"
                        >
                          How many people will attend?
                        </label>

                        <p className="mt-1 text-xs text-[#3A2B2B]/70">
                          Maximum of {selectedGuest.seats} people,
                          including yourself.
                        </p>

                        <select
                          id="attendee-count"
                          {...register("attendees", {
                            valueAsNumber: true,
                            required: true,
                            min: 1,
                            max: selectedGuest.seats,
                          })}
                          className={inputStyle}
                        >
                          {Array.from(
                            {
                              length: selectedGuest.seats,
                            },
                            (_, index) => {
                              const number = index + 1;

                              return (
                                <option
                                  key={number}
                                  value={number}
                                >
                                  {number}{" "}
                                  {number === 1
                                    ? "Person"
                                    : "People"}
                                </option>
                              );
                            }
                          )}
                        </select>

                        {errors.attendees && (
                          <p className="mt-2 text-sm text-red-600">
                            Invalid number of attendees.
                          </p>
                        )}
                      </div>

                      {/* ============================== */}
                      {/* ADDITIONAL GUEST NAMES */}
                      {/* ============================== */}

                      {attendeeCount > 1 && (
                        <div className="space-y-4">

                          <div>
                            <h4 className="font-(--font-heading) text-2xl text-[#8A2846]">
                              Additional Guest Information
                            </h4>

                            <p className="mt-2 text-sm text-[#3A2B2B]/70">
                              Please enter the full name of
                              every additional guest attending.
                              Names will be used for venue
                              entrance verification.
                            </p>
                          </div>

                          {Array.from(
                            {
                              length: Math.min(
                                Math.max(0, attendeeCount - 1),
                                selectedGuest.seats - 1
                              ),
                            },
                            (_, index) => {
                              const fixedCompanion =
                                index === 0
                                  ? getFixedCompanion(
                                      selectedGuest
                                    )
                                  : "";

                              return (
                                <div key={index}>
                                  <label
                                    htmlFor={`additional-${index}`}
                                    className="font-medium text-[#3A2B2B]"
                                  >
                                    Additional Guest {index + 1}
                                    {" — Full Name *"}
                                  </label>

                                  <input
                                    id={`additional-${index}`}
                                    type="text"
                                    required
                                    value={
                                      additionalNames[index] ?? ""
                                    }
                                    readOnly={Boolean(fixedCompanion)}
                                    onChange={(e) =>
                                      updateAdditionalName(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter full name"
                                    className={`${inputStyle} ${
                                      fixedCompanion
                                        ? "cursor-not-allowed bg-[#F2E5D8]"
                                        : ""
                                    }`}
                                  />

                                  {fixedCompanion && (
                                    <p className="mt-1 text-xs text-[#8A2846]">
                                      This companion has been
                                      pre-assigned to your invitation.
                                    </p>
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* ============================== */}
                  {/* MESSAGE */}
                  {/* ============================== */}

                  <div>
                    <label
                      htmlFor="guest-message"
                      className="font-medium text-[#3A2B2B]"
                    >
                      Leave us a message (Optional)
                    </label>

                    <textarea
                      id="guest-message"
                      rows={5}
                      {...register("message")}
                      placeholder="Share your wishes for the couple..."
                      className={inputStyle}
                    />
                  </div>

                  {/* ERROR */}
                  {submitError && (
                    <p
                      role="alert"
                      className="
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        p-4
                        text-sm
                        text-red-700
                      "
                    >
                      {submitError}
                    </p>
                  )}

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className={primaryButton}
                  >
                    {submitting
                      ? "Submitting RSVP..."
                      : "Send RSVP"}
                  </button>
                </form>
              )}

              {/* ============================== */}
              {/* SUCCESS */}
              {/* ============================== */}

              {submitted && (
                <div
                  className="
                    rounded-3xl
                    border
                    border-[#E7D5C2]
                    bg-[#FFF9F3]
                    p-8
                    text-center
                  "
                >
                  <div className="text-4xl">
                    ❀
                  </div>

                  <h3 className="mt-4 font-(--font-heading) text-3xl text-[#8A2846]">
                    Thank You!
                  </h3>

                  <p className="mt-3 text-[#3A2B2B]">
                    {confirmedStatus === "Yes"
                      ? "We look forward to celebrating with you!"
                      : "Thank you for letting us know."}
                  </p>

                  <div className="mt-5 space-y-2 rounded-2xl bg-white p-4">
                    <p className="text-sm text-[#3A2B2B]">
                      RSVP Status
                    </p>

                    <p className="font-semibold text-[#8A2846]">
                      {confirmedStatus === "Yes"
                        ? "Confirmed"
                        : "Declined"}
                    </p>

                    <p className="text-sm text-[#3A2B2B]">
                      Confirmed Attendees:{" "}
                      <strong>{confirmedAttendees}</strong>
                    </p>
                  </div>

                  <p className="mt-5 text-sm text-[#3A2B2B]/70">
                    Your RSVP response has been submitted.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
