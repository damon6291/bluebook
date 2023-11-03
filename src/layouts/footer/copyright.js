import { Typography, Link, Box, Container } from "@mui/material";
import Logo from "src/components/logo";

const Copyright = (props) => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        textAlign: "center",
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: "auto" }} />

        <Typography variant="caption" component="div">
          © All rights reserved
          <br /> made by
          <Link href="/"> Damon Joung </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Copyright;
