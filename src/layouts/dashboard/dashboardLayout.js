import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
import { useResponsive } from "src/hooks/use-responsive";
// components
//
import Main from "./main";
import Header from "./header";
import NavVertical from "./nav-vertical";

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const lgUp = useResponsive("up", "lg");

  const nav = useBoolean();

  const renderNavVertical = (
    <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />
  );

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {renderNavVertical}

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
