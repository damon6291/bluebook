import PropTypes from "prop-types";
import { m } from "framer-motion";
// @mui
import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
// components
import { MotionContainer, varFade } from "src/components/animate";
import { bgGradient } from "src/theme/css";
import { CLIGHTGREEN, CLIGHTPINK } from "src/constants/colorConstants";
import { MEATCATEGORIES } from "src/data/_products";

import { IPRODUCTBANNER } from "src/constants/imageConstants";
import { PRODUCT_CATEGORY_GROUP_OPTIONS } from "src/constants/productConstants";
import productStore from "src/store/productStore";

// ----------------------------------------------------------------------

export default function ProductHero() {
  const tab = productStore((val) => val.shopTab);

  const category = PRODUCT_CATEGORY_GROUP_OPTIONS[tab];

  return (
    <Box
      sx={{
        height: { md: 400 },
        py: { xs: 10, md: 0 },
        overflow: "hidden",
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundImage: `url(${IPRODUCTBANNER})`,
        // backgroundImage:
        //   "url(/assets/background/overlay_1.svg), url(/assets/images/about/hero.jpg)",
        ...bgGradient({
          startColor: CLIGHTPINK,
          endColor: CLIGHTGREEN,
          direction: "to right",
        }),
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
          <m.div variants={varFade().inUp}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: "text.primary",
              }}
            >
              {category.value}
            </Typography>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}

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
