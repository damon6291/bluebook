import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useEffect } from "react";
// routes
import { JWTTOKEN } from "src/constants/textConstants";
import { useRouter } from "src/routes/hook";
import userStore from "src/store/userStore";
import { isJwtExpired } from "src/utils/jwt";
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function RefreshGuard({ children }) {
  const jwt = Cookies.get(JWTTOKEN);
  const { refreshUser } = userStore();

  const check = async () => {
    if (jwt == undefined || jwt.trim().length == 0 || isJwtExpired(jwt)) {
      // Not logged in
      await refreshUser();
    }
  };

  // const check = useCallback(() => {
  //   if (!authenticated && user && user.role != 2) {
  //     const loginPath = PAGELOGIN;

  //     router.replace(loginPath);
  //   } else {
  //     setChecked(true);
  //   }
  // }, [authenticated, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  return <>{children}</>;
}

RefreshGuard.propTypes = {
  children: PropTypes.node,
};
