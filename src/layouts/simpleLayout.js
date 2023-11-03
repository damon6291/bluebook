import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Footer from "../components/footer/footer";
import Header from "../components/header";

// ----------------------------------------------------------------------

const StyledHeader = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "sticky",
  backdropFilter: "grayscale(100%)",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
