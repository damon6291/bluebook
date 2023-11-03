// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { lazy } from "react";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
const KeyboardArrowUpIcon = lazy(() =>
  import("@mui/icons-material/KeyboardArrowUp")
);
const KeyboardArrowRight = lazy(() =>
  import("@mui/icons-material/KeyboardArrowRight")
);

export const ICONS = {
  KeyboardArrowUpIcon: KeyboardArrowUpIcon,
  KeyboardArrowRight: KeyboardArrowRight,
  KebabDiningIcon: KebabDiningIcon,
  HomeIcon: HomeIcon,
  ShoppingCartIcon,
  ShoppingCartIcon,
  PeopleIcon: PeopleIcon,
  MapIcon: MapIcon,
  PhoneIcon: PhoneIcon,
};
