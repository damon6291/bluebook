import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import { m } from "framer-motion";
// @mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
// hooks
import { useResponsive } from "src/hooks/use-responsive";
// routes
import { PATHS } from "src/utils/routeConstants";
// _mock
import { PRICINGNEAT } from "src/utils/pricingConstants";
// components
import Iconify from "src/components/iconify";
import { varFade, MotionViewport } from "src/components/animate";

// ----------------------------------------------------------------------

export default function PricingNeat() {
  const mdUp = useResponsive("up", "md");

  const [currentTab, setCurrentTab] = useState("Standard");

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const renderDescription = (
    <Stack spacing={3} sx={{ mb: 10, textAlign: "center" }}>
      <m.div variants={varFade().inUp}>
        <Typography
          component="div"
          variant="overline"
          sx={{ mb: 2, color: "text.disabled" }}
        >
          pricing plans
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">
          The right plan for <br /> your business
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: "text.secondary" }}>
          Choose the perfect plan for your needs. Always flexible to grow
        </Typography>
      </m.div>
    </Stack>
  );

  const renderContent = (
    <>
      <Box
        gridTemplateColumns="repeat(3, 1fr)" // change 3 for more columns
        sx={{
          borderRadius: 2,
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
          display: { sx: "none", md: "grid" },
        }}
      >
        {PRICINGNEAT.map((plan) => (
          <m.div key={plan.license} variants={varFade().in}>
            <PlanCard key={plan.license} plan={plan} />
          </m.div>
        ))}
      </Box>

      <Box sx={{ display: { sx: "block", md: "none" } }}>
        <Stack alignItems="center" sx={{ mb: 5 }}>
          <Tabs value={currentTab} onChange={handleChangeTab}>
            {PRICINGNEAT.map((tab) => (
              <Tab key={tab.license} value={tab.license} label={tab.license} />
            ))}
          </Tabs>
        </Stack>

        <Box
          sx={{
            borderRadius: 2,
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {PRICINGNEAT.map(
            (tab) =>
              tab.license === currentTab && (
                <PlanCard
                  key={tab.license}
                  plan={tab}
                  sx={{
                    borderLeft: (theme) =>
                      `dashed 1px ${theme.palette.divider}`,
                  }}
                />
              )
          )}
        </Box>
      </Box>
    </>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      {/* maxWidth={false} */}
      <Container component={MotionViewport}>
        {renderDescription}

        {renderContent}
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PlanCard({ plan, sx, ...other }) {
  const { license, commons, options, icons, order, bgColor, href } = plan;

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        pt: 10,
        ...(order !== 1 && {
          borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
          // borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...sx,
        }),
      }}
      {...other}
    >
      <Stack spacing={2}>
        <Typography
          variant="overline"
          component="div"
          sx={{ color: "text.disabled" }}
        >
          License
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Typography variant="h4">{license}</Typography>
          <Box
            sx={{
              left: 0,
              bottom: 4,
              width: 40,
              height: 8,
              opacity: 0.48,
              bgcolor: bgColor,
              position: "absolute",
            }}
          />
        </Box>
      </Stack>

      <Stack direction="row" spacing={2}>
        {icons.map((icon) => (
          <Box
            component="img"
            key={icon}
            src={icon}
            sx={{ width: 20, height: 20 }}
          />
        ))}
      </Stack>

      <Stack spacing={2.5}>
        {commons.map((option) => (
          <Stack key={option} spacing={1} direction="row" alignItems="center">
            <Iconify icon="eva:checkmark-fill" width={16} />
            <Typography variant="body2">{option}</Typography>
          </Stack>
        ))}

        <Divider sx={{ borderStyle: "dashed" }} />

        {options.map((option) => {
          const disabled = option.disabled;

          return (
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{
                ...(disabled && { color: "text.disabled" }),
              }}
              key={option.name}
            >
              <Iconify
                icon={disabled ? "mingcute:close-line" : "eva:checkmark-fill"}
                width={16}
              />
              <Typography variant="body2">{option.name}</Typography>
            </Stack>
          );
        })}
      </Stack>

      {/* <Stack alignItems="flex-end">
        <Button
          color="inherit"
          size="small"
          target="_blank"
          rel="noopener"
          href={href}
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          Learn more
        </Button>
      </Stack> */}
    </Stack>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.object,
  sx: PropTypes.object,
};
