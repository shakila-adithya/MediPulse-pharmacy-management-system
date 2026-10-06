import { Link } from "react-router-dom";
import { MapPin, Star, Clock, Pill } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import PharmacyBanner from "../illustrations/PharmacyBanner";
import Photo from "../common/Photo";
import { photo, PHARMACY_PHOTOS } from "../../data/images";

export default function PharmacyCard({ pharmacy }) {
  const seed = Number(String(pharmacy.id).replace(/\D/g, "")) || 0;
  return (
    <Card hoverable padding="p-0" className="flex flex-col h-full overflow-hidden">
      <div className="relative h-32">
        <Photo
          src={photo(PHARMACY_PHOTOS[seed % PHARMACY_PHOTOS.length], 700)}
          fallback={<PharmacyBanner seed={seed} className="w-full h-full" />}
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
            pharmacy.isOpenNow ? "bg-success-50 text-success-700" : "bg-white text-slate-500"
          }`}
        >
          {pharmacy.isOpenNow ? "Open Now" : "Closed"}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
      <h3 className="font-bold text-slate-900 leading-snug truncate">{pharmacy.name}</h3>
      <p className="text-xs text-slate-500 mt-1 mb-4 flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{pharmacy.address}</span>
      </p>

      <div className="grid grid-cols-2 gap-3 text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-warning-500 fill-warning-500" />
          {pharmacy.rating} ({pharmacy.reviewCount})
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          {pharmacy.distance} km away
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {pharmacy.openingHours.open} - {pharmacy.openingHours.close}
        </span>
        <span className="flex items-center gap-1.5">
          <Pill className="w-3.5 h-3.5" />
          {pharmacy.availableMedicinesCount} medicines
        </span>
      </div>

      <div className="mt-auto">
        <Link to={`/pharmacies/${pharmacy.id}`}>
          <Button variant="outline" fullWidth size="sm">
            View Pharmacy
          </Button>
        </Link>
      </div>
      </div>
    </Card>
  );
}
