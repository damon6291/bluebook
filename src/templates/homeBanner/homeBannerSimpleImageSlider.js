import { m, useScroll } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
// @mui
import { styled, alpha, useTheme } from "@mui/material/styles";
import { Box, Grid, Stack, Container, Typography } from "@mui/material";

import { IHOMEBANNER } from "src/utils/imageConstants";

// theme
import { bgGradient } from "src/theme/css";
// components
import { MotionViewport, varFade } from "src/components/animate";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(10, 0),
  height: "100vh",
}));

const StyledBg = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  position: "absolute",
  transform: "scaleX(-1)",
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.9),
    imgUrl: IHOMEBANNER,
  }),
}));

// ----------------------------------------------------------------------

export default function HomeBannerSimpleImageSlider() {
  const theme = useTheme();

  const heroRef = useRef(null);

  const [percent, setPercent] = useState(0);

  const { scrollY } = useScroll();

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on("change", (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const isLight = theme.palette.mode === "light";

  const opacity = 1 - percent / 100;

  const transition = {
    repeatType: "loop",
    ease: "linear",
    duration: 60 * 4,
    repeat: Infinity,
  };

  const renderDescription = (
    <Stack spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" component="h1">
          Components
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography sx={{ color: "text.secondary" }}>
          With huge resource pack making deployment
          <br /> easy and expanding more effectively
        </Typography>
      </m.div>
    </Stack>
  );

  const renderSlides = (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        height: "100%",
        position: "absolute",
        overflow: "hidden",
        opacity: opacity > 0 ? opacity : 0, // Opacity only available at the top of the page
        transform: `skew(${-16 - 50 / 24}deg, ${4 - 50 / 16}deg)`,
        top: 0,
      }}
    >
      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{
          width: 344,
          position: "relative",
        }}
      >
        <Box
          component={m.img}
          animate={{ y: ["0%", "100%"] }}
          transition={transition}
          alt={isLight ? "light_1" : "dark_1"}
          src={
            isLight
              ? `/assets/images/home/hero/light_1.webp`
              : `/assets/images/home/hero/dark_1.webp`
          }
          sx={{ position: "absolute", mt: -5 }}
        />
        <Box
          component={m.img}
          animate={{ y: ["-100%", "0%"] }}
          transition={transition}
          alt={isLight ? "light_1" : "dark_1"}
          src={
            isLight
              ? `/assets/images/home/hero/light_1.webp`
              : `/assets/images/home/hero/dark_1.webp`
          }
          sx={{ position: "absolute" }}
        />
      </Stack>

      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{ width: 720, position: "relative", ml: -5 }}
      >
        <Box
          component={m.img}
          animate={{ y: ["100%", "0%"] }}
          transition={transition}
          alt={isLight ? "light_2" : "dark_2"}
          src={
            isLight
              ? `/assets/images/home/hero/light_2.webp`
              : `/assets/images/home/hero/dark_2.webp`
          }
          sx={{ position: "absolute", mt: -5 }}
        />
        <Box
          component={m.img}
          animate={{ y: ["0%", "-100%"] }}
          transition={transition}
          alt={isLight ? "light_2" : "dark_2"}
          src={
            isLight
              ? `/assets/images/home/hero/light_2.webp`
              : `/assets/images/home/hero/dark_2.webp`
          }
          sx={{ position: "absolute" }}
        />
      </Stack>
    </Stack>
  );

  return (
    <StyledRoot ref={heroRef}>
      <Container component={MotionViewport}>
        <Grid container sx={{ height: 1 }}>
          <Grid item xs={12} md={6}>
            {renderDescription}
          </Grid>

          <Grid item xs={0} md={6}>
            {renderSlides}
          </Grid>
        </Grid>
      </Container>

      <StyledBg />
    </StyledRoot>
  );
}
