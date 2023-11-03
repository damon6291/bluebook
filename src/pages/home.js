import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Divider,
  Grid,
  ToggleButton,
  Typography,
} from "@mui/material";
import { Container } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { fDate } from "src/utils/format-time";
import { LoadingButton } from "@mui/lab";
import { useBoolean } from "src/hooks/use-boolean";
import EventPopup from "src/layouts/_common/eventPopup";

export default function HomePage() {
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState("");
  const loading = useBoolean();
  const today = useMemo(() => new Date(), []);
  const nextMonth = useMemo(
    () => new Date().setMonth(today.getMonth() + 1),
    [today]
  );
  const availDate = [
    {
      month: 8,
      date: 28,
      availTime: [
        { time: "2:00PM", available: true },
        { time: "3:00PM", available: false },
        { time: "4:00PM", available: false },
        { time: "5:00PM", available: true },
        { time: "6:00PM", available: true },
        { time: "7:00PM", available: true },
      ],
    },
    {
      month: 8,
      date: 29,
      availTime: [
        { time: "2:00PM", available: false },
        { time: "3:00PM", available: true },
        { time: "4:00PM", available: true },
        { time: "5:00PM", available: true },
        { time: "6:00PM", available: true },
        { time: "7:00PM", available: true },
      ],
    },
    {
      month: 8,
      date: 30,
      availTime: [
        { time: "2:00PM", available: true },
        { time: "3:00PM", available: true },
        { time: "4:00PM", available: true },
        { time: "5:00PM", available: true },
        { time: "6:00PM", available: true },
        { time: "7:00PM", available: true },
      ],
    },
  ];
  const CustomDay = useCallback(({ selectedDay, ...other }) => {
    return (
      <PickersDay
        {...other}
        sx={{
          ...(availDate.some((x) => sameDate(x, other.day)) && {
            "&::before": dotActive,
          }),
        }}
      />
    );
  }, []);

  const dotActive = {
    content: '""',
    borderRadius: "50%",
    position: "absolute",
    width: 6,
    height: 6,
    bottom: 0,

    opacity: 0.48,
    backgroundColor: "primary.main",
  };

  const sameDate = (date1, date2) => {
    return date1.month == date2.getMonth() + 1 && date1.date == date2.getDate();
  };

  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>
      {console.log(value, time)}
      <Grid container sx={{ width: "50%" }}>
        <Grid item xs={6}>
          <StaticDatePicker
            orientation="landscape"
            openTo="day"
            value={value}
            views={["day"]}
            //shouldDisableDate={isWeekend}
            disablePast
            maxDate={nextMonth}
            shouldDisableDate={(date) => {
              return !availDate.some((x) => sameDate(x, date));
            }}
            onChange={(newValue) => {
              setValue(newValue);
              setTime("");
            }}
            slotProps={{ day: { selectedDay: value } }}
            slots={{ toolbar: null, actionBar: () => null, day: CustomDay }}
          />
        </Grid>
        <Grid item xs={6}>
          <Container>
            <Typography>{fDate(value, "EEEE, MMMM d")}</Typography>
            <Divider sx={{ borderStyle: "dashed", mt: 2, mb: 5 }} />
            <Grid container display="flex" textAlign={"center"} spacing={3}>
              {availDate
                .find((x) => sameDate(x, value))
                ?.availTime.map((item, key) => {
                  return (
                    <Grid item xs={4} key={key}>
                      <ToggleButton
                        sx={{
                          border: `1px solid ${
                            item.available ? "black" : "#919EAB"
                          }`,
                          height: "50px",
                          width: "100%",

                          background: item.available
                            ? null
                            : "linear-gradient(to top right, #fff calc(50% - 1px), #919EAB, #fff calc(50% + 1px))",

                          borderRadius: 0,
                        }}
                        disabled={!item.available}
                        selected={time == item.time}
                        value={item.time}
                        onClick={(event) => setTime(event.target.value)}
                      >
                        {item.time}
                      </ToggleButton>
                    </Grid>
                  );
                })}
            </Grid>
            <LoadingButton
              color="primary"
              variant="contained"
              fullWidth
              sx={{ mt: 5 }}
              disabled={time == ""}
              loading={loading.value}
              onClick={() => loading.onTrue()}
            >
              Next
            </LoadingButton>
          </Container>
        </Grid>
      </Grid>
      TESt
    </>
  );
}
