import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useEffect, useCallback, useState } from "react";
// routes
import { PAGEDASHBOARD, PAGELOGIN, PATHS } from "src/constants/routeConstants";
import { JWTTOKEN } from "src/constants/textConstants";
import { useRouter } from "src/routes/hook";
import userStore from "src/store/userStore";
import { isJwtExpired } from "src/utils/jwt";
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function LoginGuard({ children }) {
  const router = useRouter();

  const jwt = Cookies.get(JWTTOKEN);
  const { user, refreshUser } = userStore();

  const [checked, setChecked] = useState(false);

  const check = async () => {
    if (jwt == undefined || jwt.trim().length == 0 || isJwtExpired(jwt)) {
      // Not logged in
      var refresh = await refreshUser();
      if (!refresh) setChecked(true);
    } else if (!user) {
      setChecked(true);
    } else {
      router.replace(PAGEDASHBOARD);
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
  }, [user]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

LoginGuard.propTypes = {
  children: PropTypes.node,
};
