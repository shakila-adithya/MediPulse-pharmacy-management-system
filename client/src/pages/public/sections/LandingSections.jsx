import { Link } from "react-router-dom";
import { Radar, MapPinned, CalendarCheck, BellRing, Search, GitCompare, PackageCheck, ArrowRight, Pill, Bug, Flower2, Leaf, Salad, HeartPulse, Droplets, Wind, Sparkles, Thermometer } from "lucide-react";
import Button from "../../../components/common/Button";
import PharmacistScene from "../../../components/illustrations/PharmacistScene";
import Photo from "../../../components/common/Photo";
import { photo, CATEGORY_PHOTOS } from "../../../data/images";
import { PlusPattern, Capsule } from "../../../components/illustrations/Decor";

const FEATURES = [
  {
    icon: Radar,
    title: "Real-time availability",
    desc: "See live stock levels at pharmacies near you before you make a trip.",
    color: "from-primary-500 to-primary-700",
  },
  {
    icon: MapPinned,
    title: "Nearby pharmacies",
    desc: "Pharmacies close to you, sorted by distance and opening hours.",
    color: "from-teal-400 to-teal-600",
  },
  {
    icon: CalendarCheck,
    title: "Medicine reservation",
    desc: "Reserve in seconds, then walk in to collect and pay at the counter.",
    color: "from-success-500 to-success-700",
  },
  {
    icon: BellRing,
    title: "Smart notifications",
    desc: "Get told the moment a medicine is back in stock or your order changes.",
    color: "from-warning-500 to-warning-700",
  },
];

const CATEGORIES = [
  { name: "Pain Relief", icon: Pill, tone: "from-primary-500 to-primary-700" },
  { name: "Antibiotics", icon: Bug, tone: "from-teal-400 to-teal-600" },
  { name: "Antihistamine", icon: Flower2, tone: "from-warning-500 to-warning-700" },
  { name: "Vitamins & Supplements", icon: Leaf, tone: "from-success-500 to-success-700" },
  { name: "Digestive Health", icon: Salad, tone: "from-info-500 to-info-700" },
  { name: "Cardiac Care", icon: HeartPulse, tone: "from-danger-500 to-danger-700" },
  { name: "Diabetes Care", icon: Droplets, tone: "from-primary-400 to-primary-600" },
  { name: "Respiratory", icon: Wind, tone: "from-teal-500 to-teal-700" },
  { name: "Skin Care", icon: Sparkles, tone: "from-warning-500 to-danger-500" },
  { name: "Cold & Flu", icon: Thermometer, tone: "from-info-500 to-primary-600" },
];

const STEPS = [
  { icon: Search, title: "Search", desc: "Look up any medicine by brand or generic name." },
  { icon: GitCompare, title: "Compare", desc: "Compare prices, stock and distance across pharmacies." },
  { icon: CalendarCheck, title: "Reserve", desc: "Reserve your medicine with just a few taps." },
  { icon: PackageCheck, title: "Collect", desc: "Visit the pharmacy and collect your reserved order." },
];

const STATS = [
  { value: "250+", label: "Medicines Tracked" },
  { value: "45+", label: "Partner Pharmacies" },
  { value: "10,000+", label: "Registered Customers" },
  { value: "24/7", label: "Availability Updates" },
];

export function FeatureSection() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="container-page grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div className="relative order-last lg:order-first">
          <div className="absolute -inset-2 sm:-inset-4 rounded-[2.5rem] bg-gradient-to-br from-teal-100 to-primary-100 -rotate-2" aria-hidden="true" />
          <Photo
            src="/landing-feature-care.png"
            alt="A pharmacist showing a customer a bottle of medicine"
            fallback={<PharmacistScene className="relative w-full h-auto rounded-[2.25rem] shadow-pop" />}
            className="relative w-full h-[28rem] lg:h-[34rem] object-cover rounded-[2.25rem] shadow-pop"
          />
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:w-72 bg-white/95 backdrop-blur rounded-2xl shadow-pop p-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-success-100 text-success-600 flex items-center justify-center shrink-0">
              <PackageCheck className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">Order reserved</p>
              <p className="text-xs text-slate-500">Ready for pickup at 4:30 pm</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Everything you need to find medicine, faster
          </h2>
          <p className="text-slate-500 mt-4 max-w-lg leading-relaxed">
            Built for the moments when you need a medicine urgently and don't have time to call around.
          </p>
          <ul className="mt-9 space-y-6">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-4">
                <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                  <f.icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{f.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CategorySection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Browse by category</h2>
            <p className="text-slate-500 mt-2">Jump straight to the kind of medicine you need.</p>
          </div>
          <Link to="/medicines" className="text-sm font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
            See all medicines <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
          {CATEGORIES.map((c) => {
            const key = CATEGORY_PHOTOS[c.name];
            return (
              <Link
                key={c.name}
                to={`/medicines?category=${encodeURIComponent(c.name)}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.tone} text-white p-5 min-h-[11.5rem] flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-pop`}
              >
                {key ? (
                  <>
                    <Photo
                      src={photo(key, 600)}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" aria-hidden="true" />
                  </>
                ) : (
                  <c.icon className="absolute -right-3 -bottom-3 w-24 h-24 text-white/15 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                )}
                <span className="relative w-10 h-10 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center">
                  <c.icon className="w-5 h-5" />
                </span>
                <span className="relative font-bold leading-snug drop-shadow-sm">{c.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">From search to pickup in four steps</h2>
          <p className="text-slate-500 mt-3">No phone calls, no wasted trips.</p>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 mt-14 relative">
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-primary-200" aria-hidden="true" />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative text-center px-2">
              <div className="relative mx-auto w-[4.5rem] h-[4.5rem] rounded-full bg-white ring-4 ring-primary-100 shadow-card flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary-600" />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-primary-600 to-teal-500 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-5">{step.title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed max-w-[15rem] mx-auto">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-r from-primary-800 via-primary-700 to-teal-700">
      <PlusPattern id="stats-plus" className="absolute inset-0 text-white opacity-[0.06]" />
      <div className="container-page relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-white">{s.value}</p>
              <p className="text-sm text-primary-100 mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-primary-200/80 mt-8">
          * Figures shown are illustrative demo statistics for this university project.
        </p>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <div className="rounded-3xl bg-slate-900 px-6 py-16 sm:px-16 text-center relative overflow-hidden">
          <Photo src="/landing-pharmacy-interior.png" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-primary-950/85 to-slate-900/90" aria-hidden="true" />
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-primary-600/30 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-teal-500/25 rounded-full blur-3xl" aria-hidden="true" />
          <Capsule className="hidden sm:block absolute left-10 top-10 w-24 -rotate-[24deg] opacity-90" a="#2fc0b1" />
          <Capsule className="hidden sm:block absolute right-12 bottom-10 w-28 rotate-[28deg] opacity-90" a="#5691ff" />
          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Ready to find your medicine?</h2>
            <p className="text-slate-300 mt-3 max-w-xl mx-auto">
              Search hundreds of medicines across nearby pharmacies and reserve what you need in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link to="/medicines">
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  Find Medicine Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
