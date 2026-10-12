export const MEDICINE_TINTS = {
  pill: "from-primary-50 to-primary-100",
  capsule: "from-teal-50 to-teal-100",
  tablet: "from-warning-50 to-warning-100",
  cream: "from-success-50 to-success-100",
  inhaler: "from-info-50 to-info-100",
  syrup: "from-danger-50 to-danger-100",
};

export function medicineTint(type) {
  return MEDICINE_TINTS[type] || MEDICINE_TINTS.pill;
}
