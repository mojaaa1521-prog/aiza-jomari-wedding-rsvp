"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type RSVPData = {
  name: string;
  email: string;
  phone: string;
  attending: string;
  guests: number;
  meal: string;
  dietary: string;
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
    } catch (error) {
      console.error(error);
      alert("Unable to send RSVP.");
    }

    setLoading(false);
  }

  const inputStyle = `
    w-full
    rounded-xl
    border
    border-gray-300
    bg-white
    p-4
    text-[var(--foreground)]
    placeholder:text-gray-500
    transition-all
    duration-300
    focus:border-[#8A2846]
    focus:ring-2
    focus:ring-[#8A2846]/20
    dark:bg-[#2C1C23]
    dark:border-gray-700
    dark:text-white
    dark:placeholder:text-gray-400
  `;

  return (
    <section
      id="rsvp"
      className="bg-[var(--background)] py-24 px-6 transition-colors duration-500"
    >
      <div className="mx-auto max-w-2xl">

        <div className="mb-12 text-center">
          <p className="uppercase tracking-[0.4em] text-[#8A2846] text-sm">
            RSVP
          </p>

          <h2 className="mt-4 font-[family:var(--font-heading)] text-5xl text-[var(--foreground)]">
            Kindly Respond
          </h2>

          <p className="mt-5 text-gray-600 dark:text-gray-300">
            Please let us know if you will celebrate with us.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            space-y-6
            rounded-3xl
            bg-white
            p-10
            shadow-2xl
            transition-colors
            duration-500
            dark:bg-[#22171B]
          "
        >

          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className={inputStyle}
          />

          {errors.name && (
            <p className="text-red-500">
              Name is required.
            </p>
          )}

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={inputStyle}
          />

          <input
            {...register("phone")}
            placeholder="Mobile Number"
            className={inputStyle}
          />

          <select
            {...register("attending", { required: true })}
            className={inputStyle}
            defaultValue=""
          >
            <option value="">Will you attend?</option>
            <option value="Yes">Joyfully Accept</option>
            <option value="No">Regretfully Decline</option>
          </select>

          <input
            type="number"
            min="1"
            max="10"
            placeholder="Number of Guests"
            {...register("guests", { valueAsNumber: true })}
            className={inputStyle}
          />

          <select
            {...register("meal", {
              required: "Please select a meal preference",
            })}
            className={inputStyle}
            defaultValue=""
          >
            <option value="" disabled>
              Select Meal Preference
            </option>

            <option value="Chicken">Chicken</option>
            <option value="Beef">Beef</option>
            <option value="Fish">Fish</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>

          <textarea
            {...register("dietary")}
            rows={3}
            placeholder="Dietary Restrictions"
            className={inputStyle}
          />

          <textarea
            {...register("message")}
            rows={4}
            placeholder="Message to the Couple"
            className={inputStyle}
          />

          <button
            disabled={loading}
            className="
              w-full
              rounded-full
              bg-[#8A2846]
              py-4
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#6C1D37]
              hover:shadow-xl
            "
          >
            {loading ? "Submitting..." : "Send RSVP"}
          </button>

          {success && (
            <div className="rounded-xl bg-green-100 p-4 text-center text-green-700">
              Thank you! Your RSVP has been received.
            </div>
          )}

        </form>

      </div>
    </section>
  );
}