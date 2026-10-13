import { ShieldCheck, Clock, MapPinned } from "lucide-react";
import Logo from "./Logo";
import { PlusPattern, Capsule } from "../illustrations/Decor";
import Photo from "../common/Photo";

const PERKS = [
  { icon: MapPinned, text: "See which nearby pharmacies have your medicine" },
  { icon: Clock, text: "Reserve online and collect when you arrive" },
  { icon: ShieldCheck, text: "Stock levels checked by pharmacy staff" },
];

export default function AuthShell({ children, image, imageAlt = "Pharmacy care" }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-white">
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-teal-700 text-white p-12 xl:p-16">
        <Photo src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        <PlusPattern id="auth-plus" className="absolute inset-0 text-white opacity-[0.06]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-400/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-primary-400/30 blur-3xl" aria-hidden="true" />
        <Capsule className="absolute top-24 right-14 w-32 rotate-[28deg] drop-shadow-xl" a="#5cdac9" />
        <Capsule className="absolute bottom-40 right-24 w-20 -rotate-[24deg] drop-shadow-xl" a="#8db8ff" />

        <div className="relative">
          <Logo to="/" tone="light" />
        </div>

        <div className="relative max-w-md">
          <h2 className="font-display text-4xl xl:text-[2.6rem] font-extrabold leading-[1.1] tracking-tight">
            Find Your Medicine. Find Your Pharmacy.
          </h2>
          <ul className="mt-9 space-y-4">
            {PERKS.map((perk) => (
              <li key={perk.text} className="flex items-center gap-3.5 text-primary-50/95">
                <span className="w-10 h-10 rounded-xl bg-white/12 ring-1 ring-white/20 flex items-center justify-center shrink-0">
                  <perk.icon className="w-5 h-5" />
                </span>
                <span className="text-[15px] leading-snug">{perk.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm p-4 max-w-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0">
            <span className="w-5 h-5 rounded-full bg-success-500" />
          </span>
          <div>
            <p className="text-sm font-semibold">Paracetamol 500mg is in stock</p>
            <p className="text-xs text-primary-100/90 mt-0.5">HealthPlus Pharmacy, 2.4 km away</p>
          </div>
        </div>
      </aside>

      <main className="flex items-center justify-center px-5 py-12 sm:px-10 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <Logo to="/" />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
