import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, MapPin, Phone, Clock, Star, Navigation } from "lucide-react";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import DataTable from "../../components/common/DataTable";
import { pharmacyService } from "../../services";
import { formatCurrency } from "../../utils/formatters";

export default function PharmacyDetailsPage() {
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(null);
    pharmacyService
      .getPharmacyById(id)
      .then(setPharmacy)
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    const timerId = window.setTimeout(load, 0);
    return () => window.clearTimeout(timerId);
  }, [load]);

  if (isLoading) return <LoadingSpinner fullPage label="Loading pharmacy details..." />;
  if (error) return <ErrorState description={error} onRetry={load} />;
  if (!pharmacy) return null;

  const columns = [
    { key: "medicine", header: "Medicine", render: (row) => (
      <div>
        <p className="font-medium text-slate-800">{row.medicine.name}</p>
        <p className="text-xs text-slate-400">{row.medicine.genericName}</p>
      </div>
    ) },
    { key: "price", header: "Price", render: (row) => formatCurrency(row.inventory.price) },
    { key: "status", header: "Availability", render: (row) => <StatusBadge status={row.inventory.status} /> },
    { key: "stock", header: "Stock", render: (row) => (row.inventory.status === "out-of-stock" ? "—" : row.inventory.stock) },
    {
      key: "action",
      header: "Action",
      render: () => (
        <Button size="sm" disabled title="Reservations are coming soon">
          Reserve
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="container-page py-6">
          <Link to="/pharmacies" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to pharmacies
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 font-bold text-lg">
                {pharmacy.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{pharmacy.name}</h1>
                <p className="text-slate-500 text-sm mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {pharmacy.address}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${pharmacy.isOpenNow ? "bg-success-50 text-success-700" : "bg-slate-100 text-slate-500"}`}>
                    {pharmacy.isOpenNow ? "Open Now" : "Closed"}
                  </span>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-warning-500 fill-warning-500" /> {pharmacy.rating} ({pharmacy.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold text-slate-900 mb-4">Available Medicines ({pharmacy.inventory.length})</h2>
            <Card padding="p-0">
              <div className="p-5">
                {pharmacy.inventory.length === 0 ? (
                  <EmptyState title="No medicines listed." description="This pharmacy hasn't added any inventory yet." />
                ) : (
                  <DataTable columns={columns} data={pharmacy.inventory.map((row) => ({ ...row, id: row.inventory.id }))} mobileCard={(row) => (
                    <Card padding="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{row.medicine.name}</p>
                          <p className="text-xs text-slate-400">{row.medicine.genericName}</p>
                        </div>
                        <StatusBadge status={row.inventory.status} />
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-semibold text-slate-900">{formatCurrency(row.inventory.price)}</span>
                        <Button size="sm" disabled title="Reservations are coming soon">
                          Reserve
                        </Button>
                      </div>
                    </Card>
                  )} />
                )}
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-slate-900 mb-4">Pharmacy Information</h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                <span className="text-slate-600">{pharmacy.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                <span className="text-slate-600">{pharmacy.openingHours.open} - {pharmacy.openingHours.close} daily</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                <span className="text-slate-600">{pharmacy.distance} km from your location</span>
              </div>
            </div>
          </Card>

          <Card padding="p-0" className="overflow-hidden">
            <div className="relative h-48 bg-gradient-to-br from-primary-50 to-teal-50 flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-30"
                style={{ backgroundImage: "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-center">
                <span className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-pop animate-pulse">
                  <Navigation className="w-5 h-5" />
                </span>
                <p className="text-xs text-slate-500 mt-2 font-medium">Map integration coming soon</p>
              </div>
            </div>
            <div className="p-4 text-xs text-slate-400">
              Live map view (Google Maps) will be integrated once the backend location services are connected.
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
