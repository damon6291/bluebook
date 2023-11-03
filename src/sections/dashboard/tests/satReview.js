import { Box, Button, Grid, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Iconify from "src/components/iconify";
import studentStore from "src/store/studentStore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import testStore from "src/store/testStore";

const CurrentBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-anchorOriginTopLeft": {
    top: -7,
    left: 15,
    padding: "0 4px",
  },
}));

export default function SATReview({ onClose, fullScreen = false }) {
  const { studentTest } = studentStore();
  const { curSectionPreview, moveToQuestion } = testStore();

  const questions = (
    <Grid container columns={10} sx={{ width: "100%" }}>
      {studentTest.questions.map((x, key) => {
        return (
          <Grid
            item
            key={key}
            xs={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <CurrentBadge
              className="badge-on-top"
              badgeContent={
                fullScreen ? null : curSectionPreview.index === key ? (
                  <Iconify icon={"humbleicons:location"} />
                ) : null
              }
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <Badge
                badgeContent={
                  x.isReview ? (
                    <BookmarkIcon
                      fontSize="17px"
                      sx={{
                        color: "red",
                      }}
                    />
                  ) : null
                }
              >
                <Button
                  sx={{
                    border: "1px dotted black",
                    color: "blue",
                    width: fullScreen ? "40px" : "30px",
                    height: fullScreen ? "40px" : "30px",
                    minWidth: fullScreen ? "40px" : "30px",
                    borderRadius: 0,
                    fontSize: "20px",
                  }}
                  onClick={() => {
                    if (!fullScreen) onClose();
                    moveToQuestion(key);
                  }}
                >
                  {key + 1}
                </Button>
              </Badge>
            </CurrentBadge>
          </Grid>
        );
      })}
    </Grid>
  );

  return <Box>{questions}</Box>;
}

export const ReviewCurrent = () => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <Iconify icon={"humbleicons:location"} height={25} width={25} />
      <Typography variant={"body2"} sx={{ pl: 1 }}>
        Current
      </Typography>
    </Box>
  );
};

export const ReviewUnanswered = () => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <Box
        sx={{
          border: "1px dotted black",
          height: "20px",
          width: "20px",
        }}
      />
      <Typography variant={"body2"} sx={{ pl: 1 }}>
        Unanswered
      </Typography>
    </Box>
  );
};

export const ReviewForReview = () => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <BookmarkIcon
        sx={{
          color: "red",
        }}
      />
      <Typography variant={"body2"} sx={{ pl: 1 }}>
        For Review
      </Typography>
    </Box>
  );
};
