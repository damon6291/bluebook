import { PAGEHOME } from "./routeConstants";

export const PRICINGNEAT = [
  {
    order: 1,
    bgColor: "error.main",
    license: "Standard",
    href: PAGEHOME,
    commons: ["One end products", "12 months updates", "6 months of support"],
    options: [
      { name: "JavaScript version", disabled: false },
      { name: "TypeScript version", disabled: false },
      { name: "Design Resources", disabled: true },
      { name: "Commercial applications", disabled: true },
    ],
    icons: [
      "/assets/icons/platforms/ic_figma.svg",
      "/assets/icons/platforms/ic_js.svg",
      "/assets/icons/platforms/ic_ts.svg",
    ],
  },
  {
    order: 2,
    bgColor: "primary.main",
    license: "Standard Plus",
    href: PAGEHOME,
    commons: ["One end products", "12 months updates", "6 months of support"],
    options: [
      { name: "JavaScript version", disabled: false },
      { name: "TypeScript version", disabled: false },
      { name: "Design Resources", disabled: false },
      { name: "Commercial applications", disabled: true },
    ],
    icons: [
      "/assets/icons/platforms/ic_figma.svg",
      "/assets/icons/platforms/ic_js.svg",
      "/assets/icons/platforms/ic_ts.svg",
    ],
  },
  {
    order: 3,
    bgColor: "warning.main",
    license: "Extended",
    href: PAGEHOME,
    commons: ["One end products", "12 months updates", "6 months of support"],
    options: [
      { name: "JavaScript version", disabled: false },
      { name: "TypeScript version", disabled: false },
      { name: "Design Resources", disabled: false },
      { name: "Commercial applications", disabled: false },
    ],
    icons: [
      "/assets/icons/platforms/ic_figma.svg",
      "/assets/icons/platforms/ic_js.svg",
      "/assets/icons/platforms/ic_ts.svg",
    ],
  },
];

// ----------------------------------------------------------------------

export const PRICINGINCREASE = [
  {
    subscription: "basic",
    price: 0,
    caption: "Forever",
    lists: ["3 Prototypes", "3 Boards", "Up To 5 Team Members"],
    labelAction: "Current Plan",
  },
  {
    subscription: "starter",
    price: 4.99,
    caption: "Saving $24 a year",
    lists: [
      "3 Prototypes",
      "3 Boards",
      "Up To 5 Team Members",
      "Advanced Security",
      "Issue Escalation",
    ],
    labelAction: "Choose Starter",
  },
  {
    subscription: "premium",
    price: 9.99,
    caption: "Saving $124 a year",
    lists: [
      "3 Prototypes",
      "3 Boards",
      "Up To 5 Team Members",
      "Advanced Security",
      "Issue Escalation",
      "Issue Development license",
      "Permissions & workflows",
    ],
    labelAction: "Choose Premium",
  },
];
