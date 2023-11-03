import PropTypes from "prop-types";
import { m } from "framer-motion";
// @mui
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";
// theme
import { bgGradient } from "src/theme/css";
//
import { MotionContainer, varFade } from "src/components/animate";
import { CLIGHTGREEN, CLIGHTPINK } from "src/constants/colorConstants";

// ----------------------------------------------------------------------

export default function ContactHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // ...bgGradient({
        //   color: alpha(theme.palette.grey[900], 0.8),
        //   imgUrl: "/assets/images/contact/hero.jpg",
        // }),
        ...bgGradient({
          startColor: CLIGHTPINK,
          endColor: CLIGHTGREEN,
          direction: "to right",
        }),
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: "hidden",
        position: "relative",
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
          <TextAnimate
            text="Where"
            sx={{ color: "common.black" }}
            variants={varFade().inRight}
          />
          <br />

          <Stack
            spacing={2}
            display="inline-flex"
            direction="row"
            sx={{ color: "text.secondary" }}
          >
            <TextAnimate text="to" />
            <TextAnimate text="find" />
            <TextAnimate text="us?" />
          </Stack>
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
