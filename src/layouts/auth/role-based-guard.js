import PropTypes from "prop-types";
import { m } from "framer-motion";
import Cookies from "js-cookie";
// @mui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// hooks

// components
import { MotionContainer, varBounce } from "src/components/animate";
import userStore from "src/store/userStore";
import { Button, Stack } from "@mui/material";
import { Height } from "@mui/icons-material";
import { PAGEHOME } from "src/constants/routeConstants";
import { JWTTOKEN } from "src/constants/textConstants";
import { isJwtExpired } from "src/utils/jwt";

// ----------------------------------------------------------------------

export default function RoleBasedGuard({ hasContent, roles, children, sx }) {
  // Logic here to get current user role

  const jwt = Cookies.get(JWTTOKEN);
  const { user, refreshUser } = userStore();

  // const currentRole = 'user';
  const currentRole = user?.role; // admin;

  if (
    jwt == undefined ||
    jwt.trim().length == 0 ||
    isJwtExpired(jwt) ||
    (typeof roles !== "undefined" && !roles.includes(currentRole))
  ) {
    return hasContent ? (
      <Container
        component={MotionContainer}
        sx={{ textAlign: "center", ...sx }}
      >
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Button
            href={PAGEHOME}
            size={"large"}
            variant={"contained"}
            sx={{ mt: 3 }}
          >
            Go to Home
          </Button>
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.number),
  sx: PropTypes.object,
};
