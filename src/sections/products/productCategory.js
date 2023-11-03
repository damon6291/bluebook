import PropTypes from "prop-types";
import { m } from "framer-motion";
// @mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ListItemButton from "@mui/material/ListItemButton";
import Container from "@mui/material/Container";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
import { useResponsive } from "src/hooks/use-responsive";
// components
import Image from "src/components/image";
import Iconify from "src/components/iconify";
import TextMaxLine from "src/components/text-max-line";
import { MotionViewport, varFade } from "src/components/animate";
import productStore from "src/store/productStore";

import { ICOW } from "src/constants/imageConstants";
import { PRODUCT_CATEGORY_GROUP_OPTIONS } from "src/constants/productConstants";

// ----------------------------------------------------------------------

export default function ProductCategory() {
  const { shopTab, setShopTab } = productStore();
  return (
    <Container>
      <Box
        component={MotionViewport}
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
      >
        {PRODUCT_CATEGORY_GROUP_OPTIONS.map((category, id) => (
          <m.div
            key={category.value}
            variants={varFade().inDown}
            onClick={() => setShopTab(id)}
          >
            <CardDesktop category={category} selected={shopTab == id} />
          </m.div>
        ))}
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function CardDesktop({ category, selected }) {
  const { value, icon } = category;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "unset",
        cursor: "pointer",
        textAlign: "center",
        "&:hover": {
          bgcolor: "background.paper",
          boxShadow: (theme) => theme.customShadows.z20,
        },
      }}
    >
      <Image src={icon} sx={{ height: 70, my: 2 }} />

      <TextMaxLine variant="subtitle2" persistent>
        {value}
      </TextMaxLine>
    </Paper>
  );
}

CardDesktop.propTypes = {
  category: PropTypes.object,
  selected: PropTypes.bool,
};
