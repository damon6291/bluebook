import { Box } from "@mui/material";
import React from "react";
import Copyright from "./copyright";

const Footer = () => {
  return (
    <Box
      sx={{
        px: { xs: 5, sm: 10 },
        py: 5,
      }}
    >
      <Box sx={{ mt: 2 }}>
        <Copyright />
      </Box>
    </Box>
  );
};

export default Footer;
