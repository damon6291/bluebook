import { Helmet } from "react-helmet-async";
import { m } from "framer-motion";
import { Button, Typography, Stack } from "@mui/material";
import { MotionContainer, varBounce } from "src/components/animate";

import { RouterLink } from "src/routes/components";
import { PAGEHOME } from "src/constants/routeConstants";

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found </title>
      </Helmet>
      <MotionContainer>
        <Stack sx={{ alignItems: "center" }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              Sorry, Page Not Found!
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: "text.secondary" }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
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
              404
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
