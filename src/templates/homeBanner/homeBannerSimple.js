import { m } from "framer-motion";
// @mui
import { styled, alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import {
  IHOMEBANNER,
  IHOMEWAGYU,
  IHOMEHEROBACKROUND,
} from "src/utils/imageConstants";

// hooks
import { useResponsive } from "src/hooks/use-responsive";
// theme
import { bgGradient, textGradient } from "src/theme/css";
// components
import { MotionViewport, varFade } from "src/components/animate";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(10, 0),
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
    color: alpha(theme.palette.background.default, 0.1),
    imgUrl: IHOMEBANNER,
  }),
}));

// ----------------------------------------------------------------------

export default function HomeBannerSimple() {
  const theme = useTheme();

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack spacing={3}>
              <m.div variants={varFade().inUp}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    color: "primary.main",
                    // ...textGradient(
                    //   `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%`
                    // ),
                  }}
                >
                  Butcher shop
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography sx={{ color: "text.secondary" }}>
                  We provide the best meat
                  <br /> locally sourced from NJ and NY
                </Typography>
              </m.div>
            </Stack>
          </Grid>

          <Grid
            item
            xs={0}
            sm={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              component={m.div}
              variants={varFade().inDown}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Box
                component={m.img}
                alt="illustrations characters"
                animate={{
                  y: [-10, 0, -10],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                src={IHOMEWAGYU}
                sx={{ maxWidth: 600 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <StyledBg />
    </StyledRoot>
  );
}
