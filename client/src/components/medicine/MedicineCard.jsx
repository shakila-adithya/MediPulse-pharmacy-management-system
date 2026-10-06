import { Link } from "react-router-dom";
import { MapPin, Building2 } from "lucide-react";
import Card from "../common/Card";
import StatusBadge from "../common/StatusBadge";
import Button from "../common/Button";
import MedicineArt from "../illustrations/MedicineArt";
import Photo from "../common/Photo";
import { photo, MEDICINE_PHOTOS } from "../../data/images";
import { formatCurrency } from "../../utils/formatters";
import { medicineTint } from "../../utils/medicineArt";

// listing shape: { id, name, genericName, strength, dosageForm, manufacturer, inventory, pharmacy }
export default function MedicineCard({ listing, onReserve }) {
  const { inventory, pharmacy } = listing;
  const outOfStock = inventory.status === "out-of-stock";
  const reservationUnavailable = !onReserve;

  return (
    <Card hoverable padding="p-0" className="flex flex-col h-full overflow-hidden">
      <div className={`relative h-32 flex items-center justify-center bg-gradient-to-br ${medicineTint(listing.image)}`}>
        {MEDICINE_PHOTOS[listing.image] ? (
          <Photo
            src={photo(MEDICINE_PHOTOS[listing.image], 600)}
            fallback={<MedicineArt type={listing.image} className="w-24 h-24" />}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <MedicineArt type={listing.image} className="w-24 h-24" />
        )}
        <div className="absolute top-3 right-3">
          <StatusBadge status={inventory.status} />
        </div>
        {listing.requiresPrescription && (
          <span className="absolute top-3 left-3 text-xs font-bold text-info-700 bg-white/90 px-2 py-1 rounded-md">Rx</span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
      <h3 className="font-bold text-slate-900 leading-snug truncate">{listing.name}</h3>
      <p className="text-xs text-slate-500 mt-0.5">
        Generic: {listing.genericName} &middot; {listing.dosageForm}
      </p>

      <p className="text-xs text-slate-400 mt-1 mb-4">{listing.manufacturer}</p>

      <div className="mt-auto space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-bold text-slate-900">{formatCurrency(inventory.price)}</span>
          {!outOfStock && <span className="text-xs text-slate-500">{inventory.stock} in stock</span>}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
          <span className="flex items-center gap-1 min-w-0 truncate">
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{pharmacy.name}</span>
          </span>
          <span className="flex items-center gap-1 shrink-0 ml-2">
            <MapPin className="w-3.5 h-3.5" />
            {pharmacy.distance} km
          </span>
        </div>

        <div className="flex gap-2 pt-1">
          <Link to={`/medicines/${listing.id}`} className="flex-1">
            <Button variant="outline" size="sm" fullWidth>
              View Details
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            disabled={outOfStock || reservationUnavailable}
            title={reservationUnavailable ? "Reservations are coming soon" : undefined}
            onClick={() => onReserve?.(listing)}
          >
            Reserve
          </Button>
        </div>
      </div>
      </div>
    </Card>
  );
}
