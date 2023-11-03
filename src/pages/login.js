import { Helmet } from "react-helmet-async";
import { Backdrop, Button } from "@mui/material";
// import CookieBanner from "src/components/cookieBanner/cookieBanner";
import userStore from "src/store/userStore";
import ModernLoginView from "src/sections/login/modern-login-view";

export default function LoginPage() {
  const { isCookieAccepted, cookieAccepted } = userStore();
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <ModernLoginView />

      {/* <Button>Login</Button>
      <Backdrop sx={{ color: "#fff", zIndex: 99998 }} open={!isCookieAccepted}>
        <CookieBanner sx={{ zIndex: 99999 }} accept={cookieAccepted} />
      </Backdrop> */}
    </>
  );
}
