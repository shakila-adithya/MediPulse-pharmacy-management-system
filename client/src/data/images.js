// Real photos hosted on Unsplash (free licence, hotlinking via images.unsplash.com is allowed).
// Each entry is the part of the URL after "photo-". Swap an ID to change a picture.
const PHOTO_IDS = {
  pharmacistShelf: "1580281657527-47f249e8f4df", // pharmacist reaching for a box on a shelf
  pharmacistCounter: "1576091358783-a212ec293ff3", // pharmacist showing a pill bottle to a customer
  pharmacistStanding: "1580281657529-557a6abb6387", // pharmacist beside wooden shelves
  shelves: "1642055514517-7b52288890ec", // shelves stacked with boxes
  greenSign: "1622230208995-0f26eba75875", // green pharmacy cross sign
  redCross: "1603706580932-6befcf7d8521", // white and red cross sign
  pillsPile: "1631549916768-4119b2e5f926",
  pillsRound: "1573883430697-4c3479aae6b9",
  pillsAssorted: "1512069772995-ec65ed45afd6",
  pillOrange: "1587854692152-cbe660dbde88",
  capsuleBottle: "1562243061-204550d8a2c9",
  // category tiles
  vitaminsCitrus: "1707129785947-ddc627a8bab9", // citrus slices and supplement capsules
  freshProduce: "1610348725531-843dff563e2c", // fruit and vegetables on a board
  stethoscope: "1512069511692-b82d787265cf", // stethoscope beside pills
  glucoseMeter: "1683727186226-910f31a9da45", // blood glucose test
  creamJar: "1708477199100-e4d5f56a8eb2", // jar of cream
  orangeSlices: "1611073061835-e77b1b16d3f3", // orange slices on yellow
};

export function photo(key, width = 1200) {
  return `https://images.unsplash.com/photo-${PHOTO_IDS[key]}?auto=format&fit=crop&w=${width}&q=70`;
}

// Medicine `image` field -> photo key. Types without a matching photo keep the SVG illustration.
export const MEDICINE_PHOTOS = {
  pill: "pillsRound",
  capsule: "capsuleBottle",
  tablet: "pillOrange",
};

// Category tile name -> photo key. A category with no entry shows the gradient + icon only.
export const CATEGORY_PHOTOS = {
  "Pain Relief": "pillsPile",
  "Antibiotics": "capsuleBottle",
  "Antihistamine": "pillsAssorted",
  "Vitamins & Supplements": "vitaminsCitrus",
  "Digestive Health": "freshProduce",
  "Cardiac Care": "stethoscope",
  "Diabetes Care": "glucoseMeter",
  "Skin Care": "creamJar",
  "Cold & Flu": "orangeSlices",
  // "Respiratory": add a photo key here
};

// Pharmacy cards pick one of these by id so the list looks varied but stays stable.
export const PHARMACY_PHOTOS = ["pharmacistStanding", "shelves", "greenSign", "redCross", "pharmacistShelf"];

export const PHOTO_CREDITS = [
  { name: "National Cancer Institute", url: "https://unsplash.com/@nci" },
  { name: "Árpád Czapp", url: "https://unsplash.com/@czapp_arpad" },
  { name: "Mariano Baraldi", url: "https://unsplash.com/@nature_of_the_experiment" },
  { name: "Markus Winkler", url: "https://unsplash.com/@markuswinkler" },
  { name: "Roberto Sorin", url: "https://unsplash.com/@roberto_sorin" },
  { name: "Hal Gatewood", url: "https://unsplash.com/@halacious" },
  { name: "Alexander Grey", url: "https://unsplash.com/@sharonmccutcheon" },
  { name: "Christina Victoria Craft", url: "https://unsplash.com/@victoriabcphotographer" },
  { name: "pina messina", url: "https://unsplash.com/@pinamessina" },
  { name: "Madara", url: "https://unsplash.com/@madara_p" },
  { name: "engin akyurt", url: "https://unsplash.com/@enginakyurt" },
  { name: "Sweet Life", url: "https://unsplash.com/@sweetlifediabetes" },
  { name: "Isaac Wolff", url: "https://unsplash.com/@isaacwolff" },
  { name: "Diana Polekhina", url: "https://unsplash.com/@diana_pole" },
];
