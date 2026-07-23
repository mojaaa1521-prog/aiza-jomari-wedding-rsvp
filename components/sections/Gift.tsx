"use client";

import { Gift, Heart } from "lucide-react";

export default function GiftSection() {
  return (
    <section className="bg-[#FCF8F5] py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">

        <div className="flex justify-center mb-6">
          <div className="bg-[#8A2846] text-white p-5 rounded-full shadow-lg">
            <Gift size={36} />
          </div>
        </div>

        <p className="uppercase tracking-[0.4em] text-[#8A2846] text-sm">
          Gifts
        </p>

        <h2 className="text-5xl font-serif text-[#5C1830] mt-4">
          With Love & Gratitude
        </h2>

        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-8 rounded-full"></div>

        <p className="mt-10 text-lg leading-9 text-gray-700">
          Your love, prayers, and presence on our wedding day are the greatest
          gifts we could ever ask for.
        </p>

        <p className="mt-6 text-lg leading-9 text-gray-700">
          Should you wish to bless us with a gift, a monetary contribution
          toward our future together would be sincerely appreciated.
        </p>

        <div className="mt-14 bg-white rounded-3xl shadow-xl p-10 border border-[#EAD8C7]">

          <Heart className="mx-auto text-[#8A2846]" size={32} />

          <h3 className="text-3xl font-serif text-[#5C1830] mt-4">
            Gift Options
          </h3>

          <div className="mt-8 space-y-5 text-gray-700">

            <div>
              <p className="font-semibold text-[#8A2846]">
                GCash
              </p>

              <p>0995 982 9850</p>

              <p>Aiza & Jomari</p>
            </div>

            <hr />

            <div>
              <p className="font-semibold text-[#8A2846]">
                Bank Transfer
              </p>

              <p>Landbank</p>

              <p>Jomari Valdez</p>

              <p>Account Number</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}