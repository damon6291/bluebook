import {
  ICOW,
  IHOMEWAGYU,
  IOTHER,
  IPIG,
  ICHICKEN,
} from "src/constants/imageConstants";

export const PRODUCT_STOCK_OPTIONS = [
  { value: "in stock", label: "In stock" },
  { value: "low stock", label: "Low stock" },
  { value: "out of stock", label: "Out of stock" },
];

// export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
//   {
//     group: "Clothing",
//     classify: ["Shirts", "T-shirts", "Jeans", "Leather", "Accessories"],
//   },
//   {
//     group: "Tailored",
//     classify: ["Suits", "Blazers", "Trousers", "Waistcoats", "Apparel"],
//   },
//   {
//     group: "Accessories",
//     classify: ["Shoes", "Backpacks and bags", "Bracelets", "Face masks"],
//   },
// ];

export const PUBLISH_OPTIONS = [
  { value: true, label: "Published" },
  { value: false, label: "Hidden" },
];

export const QUESTION_RESPONSE_TYPE = [
  { enum: 1, value: "MCP", icon: ICOW },
  { enum: 2, value: "SA", icon: ICOW },
];

export const QUESTION_VIEW_TYPE = [
  { enum: 1, value: "SINGLE", icon: ICOW },
  { enum: 2, value: "DOUBLE", icon: ICOW },
];

export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
  { enum: 1, value: "SAT", icon: ICOW },
  { enum: 2, value: "ACT", icon: ICOW },
];

export const SECTION_CATEGORY_GROUP_OPTIONS = [
  { enum: 1, value: "SATREADING", icon: ICOW },
  { enum: 2, value: "SATMATH", icon: ICOW },
];

export const DEFAULT_QUESTION = {
  id: 0,
  paragraph: "",
  text: "",
  explanation: "",
  responseType: "",
  viewType: "",
};

export const DEFAULT_SECTION = {
  id: 0,
  timeLimit: 0,
  category: "SATREADING",
  questions: [],
};
