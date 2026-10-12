import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, MapPinned, Sparkles, BadgeCheck } from "lucide-react";
import Button from "../../../components/common/Button";
import HeroScene from "../../../components/illustrations/HeroScene";
import Photo from "../../../components/common/Photo";

const EXAMPLE_SEARCHES = ["Paracetamol", "Amoxicillin", "Cetirizine", "Ibuprofen"];

export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query ? `/medicines?q=${encodeURIComponent(query)}` : "/medicines");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-teal-50/60">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #1d4ded 1.5px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div className="container-page relative py-14 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 bg-primary-100 px-3 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Smart Medicine Availability Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Find Your Medicine.
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">Find Your Pharmacy.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              MediPulse helps you quickly find available medicines at nearby pharmacies, compare prices in
              real time, and reserve what you need before you even leave home.
            </p>

            <form onSubmit={handleSearch} className="mt-8 relative max-w-lg">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a medicine..."
                aria-label="Search for a medicine"
                className="w-full rounded-xl border border-slate-300 bg-white pl-12 pr-32 py-4 text-sm sm:text-base
                  shadow-card focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 sm:px-5 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                Search
              </button>
            </form>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs text-slate-400">Try:</span>
              {EXAMPLE_SEARCHES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => navigate(`/medicines?q=${encodeURIComponent(ex)}`)}
                  className="text-xs font-medium text-primary-600 hover:text-primary-800 hover:underline underline-offset-2"
                >
                  {ex}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/medicines">
                <Button size="lg" icon={Search}>
                  Find Medicine
                </Button>
              </Link>
              <Link to="/pharmacies">
                <Button size="lg" variant="outline" icon={MapPinned}>
                  Explore Pharmacies
                </Button>
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
              {["Free for customers", "Live stock updates", "Reserve in seconds"].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <BadgeCheck className="w-4.5 h-4.5 text-teal-500" /> {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative hidden lg:block" aria-hidden="true">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative">
      <div className="absolute -top-10 -right-6 w-72 h-72 bg-teal-200/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-8 w-64 h-64 bg-primary-200/60 rounded-full blur-3xl" />
      <Photo
        src="/landing-hero-pharmacist.png"
        fallback={<HeroScene className="relative w-full h-auto" />}
        className="relative w-full h-[31rem] object-cover rounded-[2rem] shadow-pop ring-1 ring-slate-200"
      />
      <div className="absolute -bottom-6 -left-8 w-72 bg-white rounded-2xl shadow-pop border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">Paracetamol 500mg</p>
            <p className="text-xs text-slate-500 mt-0.5">HealthPlus Pharmacy &middot; 2.4 km</p>
          </div>
          <span className="text-xs font-semibold text-success-700 bg-success-50 px-2.5 py-1 rounded-full">In stock</span>
        </div>
        <div className="mt-3 rounded-lg bg-primary-600 text-white text-center text-sm font-semibold py-2">Reserve now</div>
      </div>
      <div className="absolute top-8 -right-6 bg-white rounded-2xl shadow-pop border border-slate-200 px-5 py-4">
        <p className="font-display text-2xl font-extrabold text-primary-600">45+</p>
        <p className="text-xs text-slate-500">Partner Pharmacies</p>
      </div>
    </div>
  );
}
