import { Helmet } from "react-helmet-async";

import PropTypes from "prop-types";
// @mui
import { Box, Stack, Typography, Button } from "@mui/material";
import { RouterLink } from "src/routes/components";
import { PAGEHOME } from "src/constants/routeConstants";
// hooks
// import { useCountdownDate } from "../hooks/use-countdown";
import { MotionContainer, varBounce } from "src/components/animate";
import { m } from "framer-motion";
// assets
// import { ComingSoonIllustration } from "src/assets/illustrations";

// ----------------------------------------------------------------------

export function ComingSoonView() {
  // const today = new Date();
  // const { days, hours, minutes, seconds } = useCountdownDate(
  //   new Date(today.getFullYear() + today.getMonth() + 1, 1)
  // );

  return (
    <MotionContainer>
      <Stack sx={{ alignItems: "center" }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Coming Soon!
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
            SOON!
          </Typography>
        </m.div>

        {/* <m.div variants={varBounce().in}>
          <Stack
            direction="row"
            justifyContent="center"
            divider={<Box sx={{ mx: { xs: 1, sm: 2.5 }, mb: 10 }}>:</Box>}
            sx={{ typography: "h2" }}
          >
            <TimeBlock label="Days" value={days} />

            <TimeBlock label="Hours" value={hours} />

            <TimeBlock label="Minutes" value={minutes} />

            <TimeBlock label="Seconds" value={seconds} />
          </Stack>
        </m.div> */}

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
  );
}

// ----------------------------------------------------------------------

function TimeBlock({ label, value }) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: "text.secondary", typography: "body1" }}>{label}</Box>
    </div>
  );
}

TimeBlock.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default function ComingSoonPage() {
  return (
    <>
      <Helmet>
        <title> Coming Soon</title>
      </Helmet>

      <ComingSoonView />
    </>
  );
}
