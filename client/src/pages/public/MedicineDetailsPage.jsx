import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import MedicineArt from "../../components/illustrations/MedicineArt";
import { Pill, Factory, Beaker, FileText, MapPin, Clock, Building2, ChevronLeft } from "lucide-react";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import { medicineService } from "../../services";
import { formatCurrency } from "../../utils/formatters";
import { medicineTint } from "../../utils/medicineArt";

export default function MedicineDetailsPage() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(null);
    medicineService
      .getMedicineById(id)
      .then(setMedicine)
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    const timerId = window.setTimeout(load, 0);
    return () => window.clearTimeout(timerId);
  }, [load]);

  if (isLoading) return <LoadingSpinner fullPage label="Loading medicine details..." />;
  if (error) return <ErrorState description={error} onRetry={load} />;
  if (!medicine) return null;

  const bestListing = medicine.listings[0];
  const overallStatus = medicine.listings.some((l) => l.inventory.status === "available")
    ? "available"
    : medicine.listings.some((l) => l.inventory.status === "low-stock")
    ? "low-stock"
    : "out-of-stock";

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="container-page py-6">
          <Link to="/medicines" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to search
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${medicineTint(medicine.image)} flex items-center justify-center shrink-0`}>
                <MedicineArt type={medicine.image} className="w-16 h-16" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{medicine.name}</h1>
                <p className="text-slate-500 text-sm mt-1">
                  Generic: {medicine.genericName} &middot; {medicine.strength} &middot; {medicine.dosageForm}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={overallStatus} />
                  {medicine.requiresPrescription && (
                    <span className="text-xs font-semibold text-info-700 bg-info-50 px-2.5 py-1 rounded-full">
                      Prescription Required
                    </span>
                  )}
                </div>
              </div>
            </div>
            {bestListing && (
              <div className="text-left sm:text-right">
                <p className="text-xs text-slate-400">From</p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatCurrency(Math.min(...medicine.listings.map((l) => l.inventory.price)))}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-page py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="font-semibold text-slate-900 mb-4">Medicine Information</h2>
            <div className="grid sm:grid-cols-2 gap-5 text-sm">
              <InfoRow icon={Factory} label="Manufacturer" value={medicine.manufacturer} />
              <InfoRow icon={Beaker} label="Strength" value={medicine.strength} />
              <InfoRow icon={Pill} label="Dosage Form" value={medicine.dosageForm} />
              <InfoRow icon={FileText} label="Category" value={medicine.category} />
            </div>
            <div className="mt-5 pt-5 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-700 mb-2">Description</p>
              <p className="text-sm text-slate-600 leading-relaxed">{medicine.description}</p>
            </div>
          </Card>

          <div>
            <h2 className="font-semibold text-slate-900 mb-4">Available Pharmacies ({medicine.listings.length})</h2>
            {medicine.listings.length === 0 ? (
              <EmptyState title="Not currently available." description="This medicine isn't stocked at any partner pharmacy right now." />
            ) : (
              <div className="space-y-4">
                {medicine.listings.map(({ inventory, pharmacy }) => (
                  <Card key={pharmacy.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                      <Building2 className="w-5.5 h-5.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-slate-900">{pharmacy.name}</p>
                        <StatusBadge status={inventory.status} />
                      </div>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {pharmacy.address} &middot; {pharmacy.distance} km away
                      </p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {pharmacy.openingHours.open} - {pharmacy.openingHours.close}
                        {inventory.status !== "out-of-stock" && ` \u00b7 ${inventory.stock} in stock`}
                      </p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-lg font-bold text-slate-900 mb-2">{formatCurrency(inventory.price)}</p>
                      <div className="flex gap-2">
                        <Link to={`/pharmacies/${pharmacy.id}`}>
                          <Button variant="outline" size="sm">
                            View Pharmacy
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          disabled
                          title="Reservations are coming soon"
                        >
                          Reserve
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Card className="sticky top-24">
            <h3 className="font-semibold text-slate-900 mb-3">Need this medicine?</h3>
            <p className="text-sm text-slate-500 mb-4">
              Reserve at the pharmacy with the best price or distance, and collect it in person.
            </p>
            {bestListing && (
              <Button fullWidth disabled title="Reservations are coming soon">
                Reserve Now
              </Button>
            )}
          </Card>
        </div>
      </div>

    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
        <Icon className="w-4.5 h-4.5" />
      </span>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}
