import Iconify from "src/components/iconify";
import {
  ICOW,
  IHOMEWAGYU,
  IOTHER,
  IPIG,
  ICHICKEN,
} from "src/constants/imageConstants";
export const ENUMMEAT = {
  Beef: 0,
  Pork: 1,
  Chicken: 2,
  Other: 3,
};

export const MEATCATEGORIES = [
  {
    label: "Category1",
    title: "Product Category 1",
    icon: ICOW,
  },
  {
    label: "Category2",
    title: "Product Category 2",
    icon: IPIG,
  },
  {
    label: "Category3",
    title: "Product Category 3",
    icon: ICHICKEN,
  },
  {
    label: "Category4",
    title: "Product Category 4",
    icon: IOTHER,
  },
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Tamahawk Steak",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 79.99,
    available: true,
    sellingPrice: 12.5,
    blueLabel: { enabled: true, content: "Best" },
    available: true,
    redLabel: { enabled: true, content: "Kobe" },
    type: ENUMMEAT.Beef,
    bestSeller: true,
  },
  {
    id: 2,
    name: "Ribeye",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 79.99,
    available: true,
    sellingPrice: 7.9,
    blueLabel: { enabled: true, content: "Best" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Beef,
    bestSeller: true,
  },
  {
    id: 3,
    name: "Short Rib Boneless",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 69.99,
    available: true,
    sellingPrice: 7.9,
    blueLabel: { enabled: true, content: "Best" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Beef,
    bestSeller: true,
  },
  {
    id: 4,
    name: "Chuck Flap",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 59.99,
    available: true,
    sellingPrice: 7.9,
    blueLabel: { enabled: false, content: "new" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Beef,
  },
  {
    id: 5,
    name: "Brisket",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 29.99,
    available: true,
    sellingPrice: 7.9,
    blueLabel: { enabled: false, content: "new" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Beef,
  },
  {
    id: 6,
    name: "Top Blade",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 49.99,
    available: true,
    sellingPrice: 7.9,
    blueLabel: { enabled: false, content: "new" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Beef,
  },
  {
    id: 7,
    name: "Outer Skirt",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 59.99,
    available: true,
    sellingPrice: 7.9,
    blueLabel: { enabled: false, content: "new" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Beef,
  },
  {
    id: 8,
    name: "Short Rib Bone In",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 21.99,
    available: true,
    sellingPrice: 7.9,
    blueLabel: { enabled: false, content: "new" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Beef,
  },
  {
    id: 9,
    name: "Chuck Roll",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 19.99,
    available: true,
    sellingPrice: 7.9,
    blueLabel: { enabled: false, content: "new" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Beef,
  },
  {
    id: 10,
    name: "Chuck Short Rib Bone In",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 21.99,
    available: true,
    sellingPrice: 7.9,
    blueLabel: { enabled: false, content: "new" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Beef,
  },
  {
    id: 101,
    name: "Pork Belly",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 19.99,
    available: true,
    sellingPrice: 9.9,
    blueLabel: { enabled: true, content: "best" },
    redLabel: { enabled: true, content: "Berkshire" },
    type: ENUMMEAT.Pork,
    bestSeller: true,
  },
  {
    id: 102,
    name: "Boton Butt",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 12.99,
    available: true,
    sellingPrice: 4.9,
    blueLabel: { enabled: false, content: "new" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Pork,
  },
  {
    id: 103,
    name: "Spare Rib",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 9.99,
    available: true,
    sellingPrice: 4.9,
    blueLabel: { enabled: false, content: "new" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Pork,
  },
  {
    id: 104,
    name: "CT Butt Steak",
    description: "",
    image: IHOMEWAGYU,
    originalPrice: 18.99,
    available: true,
    sellingPrice: 4.9,
    blueLabel: { enabled: false, content: "new" },
    redLabel: { enabled: false, content: "sale" },
    type: ENUMMEAT.Pork,
  },
];