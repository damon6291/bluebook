// @mui
import {
  Typography,
  Box,
  Stack,
  Divider,
  Grid,
  Container,
} from "@mui/material";
import { varFade, MotionViewport } from "src/components/animate";
import { m } from "framer-motion";
import { HOURS } from "src/data/_contact";
import { ICONS } from "src/constants/iconConstants";

// ----------------------------------------------------------------------

export default function ContactCard() {
  const renderContent = (
    <>
      <Box
        sx={{
          borderRadius: 2,
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
          display: { sx: "none", md: "grid" },
        }}
      >
        <Container component={MotionViewport}>
          <m.div variants={varFade().inUp}>
            <Card />
          </m.div>
        </Container>
      </Box>
    </>
  );

  return <>{renderContent}</>;
}

function Card() {
  return (
    <Stack
      spacing={5}
      sx={{
        p: { xs: 1, md: 5 },
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="overline"
          component="div"
          sx={{ color: "text.disabled" }}
        >
          Location & Hours
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Typography variant="h3" gutterBottom sx={{ pb: 2 }}>
            Kobe & Berkshire
          </Typography>
          <Stack
            direction={"row"}
            spacing={2}
            onClick={() =>
              window.open(
                "http://maps.google.com/maps?q=1422+Bergen+Blvd,+Fort+Lee,+NJ+07024",
                "_blank"
              )
            }
            sx={{
              pb: 2,
              "&:hover": {
                color: "primary.main",
                cursor: "pointer",
              },
            }}
          >
            <ICONS.MapIcon />
            <Typography variant="body1">
              1422 Bergen Blvd, Fort Lee, NJ 07024
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            spacing={2}
            onClick={() => (window.location.href = `tel:2012670719`)}
            sx={{
              "&:hover": {
                color: "primary.main",
                cursor: "pointer",
              },
            }}
          >
            <ICONS.PhoneIcon />
            <Typography variant="body1">(201) 267-0719</Typography>
          </Stack>

          <Box
            sx={{
              left: 0,
              bottom: 4,
              width: 40,
              height: 8,
              opacity: 0.48,
              position: "absolute",
            }}
          />
        </Box>
      </Stack>

      <Stack spacing={2.5}>
        {/* {commons.map((option) => (
          <Stack key={option} spacing={1} direction="row" alignItems="center">
            <Iconify icon="eva:checkmark-fill" width={16} />
            <Typography variant="body2">{option}</Typography>
          </Stack>
        ))} */}

        <Divider sx={{ borderStyle: "dashed" }} />

        {HOURS.map((option) => {
          return (
            <Grid
              container
              spacing={1}
              direction="row"
              alignItems="center"
              key={option.name}
            >
              <Grid item xs={4}>
                <Typography variant="body2">{option.name}</Typography>
              </Grid>
              {option.isOpen ? (
                <>
                  <Grid item xs={4}>
                    <Typography variant="body2">{option.start}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">{option.end}</Typography>
                  </Grid>
                </>
              ) : (
                <Grid item xs={4}>
                  <Typography variant="body2">Closed</Typography>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Stack>
    </Stack>
  );
}
