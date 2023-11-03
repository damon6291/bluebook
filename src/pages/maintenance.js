import { Helmet } from "react-helmet-async";
// @mui
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// routes
import { RouterLink } from "src/routes/components";
import { PAGEHOME } from "src/constants/routeConstants";

import { MotionContainer, varBounce } from "src/components/animate";
import { m } from "framer-motion";

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  return (
    <>
      <Helmet>
        <title> Maintenance</title>
      </Helmet>

      <MotionContainer>
        <Stack sx={{ alignItems: "center" }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              Website currently under maintenance
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: "text.secondary" }}>
              We are currently working hard on this page!
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography
              color="error"
              fontWeight={"bold"}
              mt={5}
              mb={5}
              fontSize={100}
            >
              MAINTENANCE
            </Typography>
          </m.div>

          <Button
            component={RouterLink}
            href={PAGEHOME}
            size="large"
            variant="contained"
          >
            Go to Home
          </Button>
        </Stack>
      </MotionContainer>
    </>
  );
}
