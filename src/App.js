import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";
import ScrollToTop from "react-scroll-to-top";
import loadingStore from "./store/loadingStore";
import Router from "./routes/sections";
import ThemeProvider from "./theme";
import { ICONS } from "./constants/iconConstants";
import MotionLazy from "./components/animate/motion-lazy";
import { SplashScreen } from "./components/loading-screen";
import RefreshGuard from "./layouts/auth/refreshGuard";

import "simplebar-react/dist/simplebar.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./app.css";

function App() {
  const isLoading = loadingStore((state) => state.isLoading);

  return (
    <>
      <HelmetProvider>
        {/* <RouteGuard> */}
        <BrowserRouter>
          <Suspense fallback={<SplashScreen />}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ThemeProvider>
                <MotionLazy>
                  <RefreshGuard>
                    <Router />
                  </RefreshGuard>
                </MotionLazy>
              </ThemeProvider>
            </LocalizationProvider>
          </Suspense>
        </BrowserRouter>
        {/* </RouteGuard> */}
      </HelmetProvider>
      <Backdrop sx={{ color: "#fff", zIndex: 99999 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
      <ScrollToTop
        smooth
        component={<ICONS.KeyboardArrowUpIcon />}
        style={{ borderRadius: "25px" }}
      />
    </>
  );
}

export default App;
