import PropTypes from "prop-types";
import merge from "lodash/merge";
import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { customShadows } from "./customShadows";
import { componentsOverrides } from "./overrides";
import { darkMode } from "./options/dark-mode";
import settingsStore from "../store/settingsStore";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const themeMode = settingsStore((context) => context.themeMode);

  const darkModeOption = darkMode(themeMode);

  const baseOption = useMemo(
    () => ({
      palette: palette("light"),
      shadows: shadows("light"),
      customShadows: customShadows("light"),
      shape: { borderRadius: 8 },
      typography,
    }),
    []
  );

  const memoizedValue = useMemo(
    () =>
      merge(
        // Base
        baseOption,
        // Dark mode: remove if not in use
        darkModeOption
      ),
    [baseOption, darkModeOption]
  );

  const theme = createTheme(memoizedValue);
  theme.components = componentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
