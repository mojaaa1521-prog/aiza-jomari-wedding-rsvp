"use client";

// Premium RSVP form (drop-in replacement)

import { useState } from "react";
import { useForm } from "react-hook-form";

type RSVPData = {
  name:string;
  email:string;
  phone:string;
  attending:string;
  guests:number;
  message:string;
};

export default function RSVPForm(){
 const {register,handleSubmit,reset,formState:{errors}}=useForm<RSVPData>();
 const [loading,setLoading]=useState(false);
 const [success,setSuccess]=useState(false);

 async function onSubmit(data:RSVPData){
   setLoading(true);
   try{
     await fetch("https://script.google.com/macros/s/AKfycby6eQQ6br12yfgm_QdLLLUZHB5wBsYs24iapQMmhBG32n3_Usex0eBsrZXqJAacr_t8/exec",{method:"POST",body:JSON.stringify(data)});
     setSuccess(true);
     reset();
   }catch{alert("Unable to send RSVP.");}
   setLoading(false);
 }

 const inputStyle=`mt-2 w-full rounded-2xl border border-[#E7D5C2] bg-white/90 dark:bg-[#2C1C23] p-4 transition focus:border-[#8A2846] focus:ring-4 focus:ring-[#8A2846]/20`;

 return (
<section id="rsvp" className="bg-[var(--background)] py-24 px-6">
<div className="mx-auto max-w-2xl">
<div className="mb-12 text-center">
<p className="uppercase tracking-[0.45em] text-[#8A2846] text-sm">RSVP</p>
<h2 className="mt-4 font-[family:var(--font-heading)] text-5xl">Kindly Respond</h2>
<p className="mt-5 opacity-70">We can't wait to celebrate our special day with you.</p>
</div>

<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-[40px] border border-[#E7D5C2] bg-white/90 dark:bg-[#22171B]/90 backdrop-blur-md p-10 shadow-[0_20px_60px_rgba(0,0,0,.08)]">

<div className="text-center">
<div className="text-4xl text-[#C8A04A]">❀</div>
<h3 className="mt-3 font-[family:var(--font-heading)] text-3xl">We Can't Wait To Celebrate With You</h3>
<p className="mt-2 text-sm opacity-70">Kindly confirm your attendance below.</p>
</div>

<div><label>👤 Full Name</label><input {...register("name",{required:true})} className={inputStyle}/>{errors.name&&<p className="text-sm text-red-500">Name is required.</p>}</div>
<div><label>📧 Email Address</label><input type="email" {...register("email")} className={inputStyle}/></div>
<div><label>📱 Mobile Number</label><input {...register("phone",{required:true})} className={inputStyle}/>{errors.phone&&<p className="text-sm text-red-500">Mobile number is required.</p>}</div>

<div>
<p className="mb-3">❤️ Kindly confirm your attendance</p>
<label className="flex gap-3 rounded-2xl border p-4"><input type="radio" value="Yes" {...register("attending",{required:true})}/>Joyfully Accept</label>
<label className="mt-3 flex gap-3 rounded-2xl border p-4"><input type="radio" value="No" {...register("attending",{required:true})}/>Regretfully Decline</label>
</div>

<div><label>👥 Additional Guest</label><select {...register("guests",{valueAsNumber:true})} defaultValue={0} className={inputStyle}><option value={0}>No Additional Guest</option><option value={1}>1 Additional Guest</option></select></div>

<div><label>💌 Leave us a message</label><textarea rows={5} {...register("message")} className={inputStyle} placeholder="Share your wishes for the couple..."/></div>

<button disabled={loading} className="w-full rounded-full border border-[#C8A04A] bg-[#8A2846] py-4 uppercase tracking-[0.2em] font-semibold text-white hover:bg-[#6D1E39]">{loading?"Submitting...":"Send RSVP"}</button>

{success&&<div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center"><div className="text-4xl">💖</div><h3 className="mt-2 text-2xl font-[family:var(--font-heading)]">Thank You!</h3><p>Your RSVP has been received.</p></div>}
</form>
</div>
</section>);
}
