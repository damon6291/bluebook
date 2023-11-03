import PropTypes from "prop-types";
import { m } from "framer-motion";
// @mui
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// components
import { MotionContainer, varFade } from "src/components/animate";

// ----------------------------------------------------------------------

export default function HomeBannerBGImage() {
  return (
    <Box
      sx={{
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: "hidden",
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage:
          "url(/assets/background/overlay_1.svg), url(/assets/images/about/hero.jpg)",
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            // bottom: { md: 80 },
            position: { md: "absolute" },
            top: "30%",
            left: 0,
            right: 0,
            textAlign: {
              xs: "center",
            },
          }}
        >
          <m.div variants={varFade().inRight}>
            <Typography
              variant="h1"
              sx={{
                color: "common.white",
              }}
            >
              About Us
            </Typography>
          </m.div>

          <m.div variants={varFade().inRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 3,
                color: "common.white",
                fontWeight: "fontWeightSemiBold",
              }}
            >
              Let&apos;s work together
              <br /> Best meats around the world
            </Typography>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: "h1",
        overflow: "hidden",
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      {text.split("").map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
