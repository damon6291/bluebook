import { alpha } from "@mui/material/styles";
import {
  CBLACK,
  C1BLACK,
  CPRIMARY,
  CSECONDARY,
  CINFO,
  CSUCCESS,
  CWARNING,
  CERROR,
  CWHITE,
  CBLUEBLACK,
  CDARKRED,
  CBACKGROUND,
} from "src/constants/colorConstants";

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: CBLACK,
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

const PRIMARY = {
  main: CPRIMARY,
  contrastText: CWHITE,
};

const SECONDARY = {
  main: CSECONDARY,
};

const INFO = {
  main: CINFO,
};

const SUCCESS = {
  main: CSUCCESS,
};

const WARNING = {
  main: CWARNING,
};

const ERROR = {
  main: CERROR,
};

const COMMON = {
  common: { black: C1BLACK, white: CWHITE },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  nav: CDARKRED,
};

const TEXT = {
  blueBlack: CBLUEBLACK,
};

export function palette(mode) {
  const light = {
    ...COMMON,
    mode: "light",
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
      ...TEXT,
    },
    background: {
      paper: CWHITE,
      default: CWHITE,
      neutral: GREY[200],
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  const dark = {
    ...COMMON,
    mode: "dark",
    text: {
      primary: CWHITE,
      secondary: GREY[500],
      disabled: GREY[600],
      ...TEXT,
    },
    background: {
      paper: GREY[700],
      default: GREY[800],
      dark: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === "light" ? light : dark;
}
