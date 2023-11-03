import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Iconify from "src/components/iconify";

export default function SATHighlightView({
  highlightedText,
  onClose,
  removeHighlight,
}) {
  const format = (text) => {
    if (text.length < 100) return text;
    var ret = "";
    ret = shorten(text, 50);
    ret += "... ";
    var restStartIndex = text.length - 50;
    var restEmptyIndex = text
      .substring(restStartIndex, text.length)
      .indexOf(" ");
    ret += shorten(
      text.substring(restStartIndex + restEmptyIndex, text.length),
      50
    );
    return ret;
  };

  function shorten(str, maxLen, separator = " ") {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
  }

  return (
    <Box
      sx={{
        bgcolor: "#f6f6f6",
        position: "absolute",
        bottom: 0,
        height: "350px",
        width: "100%",
        display: highlightedText.length > 0 ? "block" : "none",
      }}
    >
      <Stack>
        <Box
          display={"flex"}
          sx={{
            py: 1,
            px: 3,
            bgcolor: "black",
            color: "white",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box display={"flex"}>
            <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>
              View/Edit:
            </Typography>
            <Typography sx={{ fontSize: "20px", pl: 1 }}>{`"${format(
              highlightedText
            )}"`}</Typography>
          </Box>
          <Button
            variant="text"
            endIcon={<Iconify icon={"ph:x-bold"} />}
            onClick={onClose}
          >
            CLOSE
          </Button>
        </Box>
        <Box paddingX={3} paddingY={2} display={"flex"}>
          <Typography sx={{ pr: 1, fontWeight: 600, fontSize: "16px" }}>
            Highlight Color:
          </Typography>
          <Box
            bgcolor={"#fae89d"}
            sx={{
              borderRadius: 25,
              width: "25px",
              height: "25px",
              border: "1px solid black",
            }}
          />
          <Box width={50} />
          <Typography sx={{ pr: 1, fontWeight: 600, fontSize: "16px" }}>
            Underline style:
          </Typography>
          <Iconify icon={"iconoir:underline-square"} width={25} height={25} />
        </Box>
        <Box paddingX={3} paddingY={1}>
          <TextField
            sx={{
              width: "700px",
              border: "1px solid black",
            }}
            inputProps={{ style: { fontSize: 20, padding: 1 } }}
            InputLabelProps={{ style: { fontSize: 20, padding: 1 } }}
            multiline
            rows={4}
          />
        </Box>
        <Box paddingX={3} paddingY={1} display={"flex"} alignItems={"center"}>
          <Button
            variant={"contained"}
            size={"medium"}
            sx={{ bgcolor: "blue", borderRadius: 25 }}
          >
            Save
          </Button>
          <Box width={50} />
          <Button
            variant={"text"}
            size={"medium"}
            sx={{ color: "red" }}
            startIcon={<Iconify icon={"ion:trash-outline"} />}
            onClick={removeHighlight}
          >
            Delete
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
