import { Box } from "@mui/material";

export const Parallax = ({ backgroundImage, height }) => {
  return (
    <Box
      sx={{
        backgroundImage: backgroundImage,

        /* Set a specific height */
        height: height,

        /* Create the parallax scrolling effect */
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  );
};
