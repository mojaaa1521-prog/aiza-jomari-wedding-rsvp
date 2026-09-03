"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

type RSVPData = {
  name: string;
  attending: string;
  message: string;
};

export default function RSVPForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RSVPData>();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(data: RSVPData) {
    setLoading(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycby6eQQ6br12yfgm_QdLLLUZHB5wBsYs24iapQMmhBG32n3_Usex0eBsrZXqJAacr_t8/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      setSuccess(true);
      reset();
    } catch {
      alert("Unable to send RSVP.");
    }

    setLoading(false);
  }

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
  transition
  focus:border-[#8A2846]
  focus:ring-4
  focus:ring-[#8A2846]/20
`;

  return (
    <section
    id="rsvp"
    className="relative overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-24"
    style={{
      backgroundImage: "url('/gallery/photo7.jpg')",
    }}
  >
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-[#FFF9F3]/65" />

    {/* RSVP Content */}
    <div className="relative z-10 mx-auto max-w-2xl">

      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.45em] text-[#8A2846]">
          RSVP
        </p>

        <h2 className="mt-4 text-5xl font-[family:var(--font-heading)] text-[var(--foreground)]">
          Kindly Respond
        </h2>

        <p className="mt-5 text-[var(--foreground)] opacity-70">
          We can't wait to celebrate our special day with you.
        </p>
      </div>


        {/* ================================= */}
        {/* RSVP FORM */}
        {/* ================================= */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            space-y-6
            rounded-[40px]
            border
            border-[#E7D5C2]
            bg-bg-white/25
            p-10
            shadow-[0_20px_60px_rgba(58,43,43,0.15)]
            backdrop-blur-sm
          "
        >

          {/* FORM HEADER */}

          <div className="text-center">

            <div className="text-4xl text-[#C8A04A]">
              ❀
            </div>

            <h3
              className="
                mt-3
                font-[family:var(--font-heading)]
                text-3xl
                text-[#3A2B2B]
              "
            >
              We Can't Wait To Celebrate With You
            </h3>

            <p className="mt-2 text-sm text-[#3A2B2B]/70">
              Kindly confirm your attendance below.
            </p>

          </div>


          {/* FULL NAME */}

          <div>

            <label className="font-medium text-[#3A2B2B]">
              👤 Full Name
            </label>

            <input
              {...register("name", { required: true })}
              className={inputStyle}
              placeholder="Enter your full name"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                Name is required.
              </p>
            )}

          </div>


          {/* ATTENDANCE */}

          <div>

            <p className="mb-3 font-medium text-[#3A2B2B]">
              ❤️ Kindly confirm your attendance
            </p>

            {/* YES */}

            <label
              className="
                flex
                cursor-pointer
                gap-3
                rounded-2xl
                border
                border-[#E7D5C2]
                bg-white/70
                p-4
                text-[#3A2B2B]
                transition
                hover:border-[#8A2846]
                hover:bg-[#FFF9F3]
              "
            >
              <input
                type="radio"
                value="Yes"
                {...register("attending", { required: true })}
                className="accent-[#8A2846]"
              />

              <span>
                Joyfully Accept
              </span>
            </label>


            {/* NO */}

            <label
              className="
                mt-3
                flex
                cursor-pointer
                gap-3
                rounded-2xl
                border
                border-[#E7D5C2]
                bg-white/70
                p-4
                text-[#3A2B2B]
                transition
                hover:border-[#8A2846]
                hover:bg-[#FFF9F3]
              "
            >
              <input
                type="radio"
                value="No"
                {...register("attending", { required: true })}
                className="accent-[#8A2846]"
              />

              <span>
                Regretfully Decline
              </span>
            </label>

            {errors.attending && (
              <p className="mt-1 text-sm text-red-500">
                Please select your attendance.
              </p>
            )}

          </div>


          {/* MESSAGE */}

          <div>

            <label className="font-medium text-[#3A2B2B]">
              💌 Leave us a message
            </label>

            <textarea
              rows={5}
              {...register("message")}
              className={inputStyle}
              placeholder="Share your wishes for the couple..."
            />

          </div>


          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-full
              border
              border-[#C8A04A]
              bg-[#8A2846]
              py-4
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#6D1E39]
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Submitting..." : "Send RSVP"}
          </button>


          {/* SUCCESS MESSAGE */}

          {success && (
            <div
              className="
                rounded-2xl
                border
                border-green-200
                bg-green-50
                p-6
                text-center
                text-green-700
              "
            >
              <div className="text-4xl">
                💖
              </div>

              <h3
                className="
                  mt-2
                  font-[family:var(--font-heading)]
                  text-2xl
                "
              >
                Thank You!
              </h3>

              <p className="mt-1">
                Your RSVP has been received.
              </p>
            </div>
          )}

        </form>

      </div>
    </section>
  );
}