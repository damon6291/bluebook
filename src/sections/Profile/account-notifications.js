import { useForm, Controller } from "react-hook-form";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
// components
import FormProvider from "src/components/hook-form";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  // {
  //   subheader: "Activity",
  //   caption: "Update on product Progress",
  //   items: [
  //     {
  //       id: "activity_comments",
  //       label: "Email me when orde",
  //     },
  //     {
  //       id: "activity_answers",
  //       label: "Email me when someone answers on my form",
  //     },
  //     { id: "activityFollows", label: "Email me hen someone follows me" },
  //   ],
  // },
  {
    subheader: "Advertisement",
    caption: "Advertising Emails on the product",
    items: [
      {
        id: "advertisement_email",
        label: "Receieve Emails with new products or features",
      },
      // { id: "application_product", label: "Weekly product updates" },
      // { id: "application_blog", label: "Weekly blog digest" },
    ],
  },
];

// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const methods = useForm({
    defaultValues: {
      selected: ["advertisement_email"],
    },
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Update success!");
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  const getSelected = (selectedItems, item) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        {NOTIFICATIONS.map((notification) => (
          <Grid key={notification.subheader} container spacing={3}>
            <Grid xs={12} md={4}>
              <ListItemText
                primary={notification.subheader}
                secondary={notification.caption}
                primaryTypographyProps={{ typography: "h6", mb: 0.5 }}
                secondaryTypographyProps={{ component: "span" }}
              />
            </Grid>

            <Grid xs={12} md={8}>
              <Stack
                spacing={1}
                sx={{ p: 3, borderRadius: 2, bgcolor: "background.neutral" }}
              >
                <Controller
                  name="selected"
                  control={control}
                  render={({ field }) => (
                    <>
                      {notification.items.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          label={item.label}
                          labelPlacement="start"
                          control={
                            <Switch
                              checked={field.value.includes(item.id)}
                              onChange={() =>
                                field.onChange(
                                  getSelected(values.selected, item.id)
                                )
                              }
                            />
                          }
                          sx={{
                            m: 0,
                            width: 1,
                            justifyContent: "space-between",
                          }}
                        />
                      ))}
                    </>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
        ))}

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ ml: "auto" }}
        >
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
