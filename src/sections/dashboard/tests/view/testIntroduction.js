import { Box, Grid, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Iconify from "src/components/iconify";

export default function TestIntroduction({ maxHeight }) {
  const list = [
    {
      icon: "ph:clock",
      title: "Timing",
      text: "Full-length practice tests are timed like real exams, but you can save and exit the test any time. If you continue on a different device, you'll need to start over.",
    },
    {
      icon: "uil:file-check-alt",
      title: "Scores",
      text: "When you finish the practive test, go to My Practive to see your scores and get personalized study tips.",
    },
    {
      icon: "ph:person-simple-fill",
      title: "Assistive Technology",
      text: "If you use assisstive technology, you should try it out on the practive test so you know what to expect on test day.",
    },
    {
      icon: "uil:unlock-alt",
      title: "No Lockdown Mode",
      text: "We don't locl down practice tests. On test day, Bluebook prevents you from accessing other programs or apps.",
    },
  ];

  const Item = ({ obj }) => {
    return (
      <Grid container sx={{ pb: 3 }}>
        <Grid item xs={1.5}>
          <Iconify
            width={35}
            height={35}
            icon={obj.icon}
            sx={{ bgcolor: "#d9d9d9", borderRadius: 25, p: 0.5 }}
          />
        </Grid>
        <Grid item xs={10.5}>
          <Stack>
            <Typography variant={"h6"}>{obj.title}</Typography>
            <Typography variant={"body1"}>{obj.text}</Typography>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  return (
    <Stack
      spacing={3}
      sx={{
        py: 5,
        bgcolor: "#f0f0f0",
        maxHeight: maxHeight,
        height: maxHeight,
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <Typography variant="h3" textAlign={"center"} sx={{ fontWeight: 400 }}>
        Practice Test
      </Typography>
      <Box
        sx={{
          width: "450px",
          mx: "auto",
          boxShadow: "-1px 0px 21px 2px #d9d9d9",
          p: 5,
          bgcolor: "#FFF",
          borderRadius: "10px",
        }}
      >
        {list.map((x, key) => {
          return <Item obj={x} key={key} />;
        })}
      </Box>
    </Stack>
  );
}
