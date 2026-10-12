import { Heart, ShieldCheck, Users, Target, Mail, Phone, MapPin } from "lucide-react";
import Card from "../../components/common/Card";

const VALUES = [
  { icon: Heart, title: "Patient First", desc: "Every feature is designed around getting people the medicine they need, quickly and reliably." },
  { icon: ShieldCheck, title: "Trustworthy Data", desc: "Pharmacy inventory is kept accurate and up to date so you never make a wasted trip." },
  { icon: Users, title: "Community of Pharmacies", desc: "We partner with local pharmacies to build a connected, accessible healthcare network." },
  { icon: Target, title: "Simple & Accessible", desc: "A clean, accessible interface that works for everyone, on any device." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-b from-primary-50 to-white border-b border-slate-100">
        <div className="container-page py-16 text-center">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">About MediPulse</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 max-w-2xl mx-auto">
            Making medicine availability visible, for everyone
          </h1>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            MediPulse is a university DevOps Engineering project exploring how technology can connect
            customers with real-time pharmacy inventory — reducing wasted trips and helping people get the
            medicine they need faster.
          </p>
        </div>
      </div>

      <div className="container-page py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v) => (
            <Card key={v.title}>
              <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                <v.icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5">{v.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-t border-slate-100">
        <div className="container-page py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Every day, people struggle to find whether a medicine they need is in stock nearby. MediPulse
              was built to solve that problem — giving customers a single place to search, compare and
              reserve medicines across a network of partner pharmacies, while giving pharmacy staff simple
              tools to manage inventory and reservations.
            </p>
            <p className="text-slate-600 leading-relaxed">
              This frontend is a demonstration build for a university DevOps Engineering course. All data
              shown is mock data — no real pharmacies, medicines, or transactions are involved.
            </p>
          </div>
          <Card padding="p-8">
            <h3 className="font-semibold text-slate-900 mb-5">Get in Touch</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </span>
                <span className="text-slate-600">support@medipulse.demo</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4.5 h-4.5" />
                </span>
                <span className="text-slate-600">+94 11 234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4.5 h-4.5" />
                </span>
                <span className="text-slate-600">Colombo, Sri Lanka</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
