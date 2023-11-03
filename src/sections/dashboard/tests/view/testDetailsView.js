// @mui
import Container from "@mui/material/Container";
// routes
import { PATHS } from "src/constants/routeConstants";
// components
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { Button, Stack } from "@mui/material";
import Iconify from "src/components/iconify";
import TestSection from "../testSection";
import { useEffect, useMemo, useState } from "react";
import testStore from "src/store/testStore";
import { DEFAULT_SECTION } from "src/constants/productConstants";
import DialogAddSection from "./dialogAddSection";
import { useBoolean } from "src/hooks/use-boolean";
//

// ----------------------------------------------------------------------

export default function TestDetailsView({ id }) {
  const { curTest, getTestDetails } = testStore();
  const sectionDialog = useBoolean(false);

  useEffect(() => {
    (async () => {
      await getTestDetails(id);
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <>
      <Container>
        {console.log("test details view", curTest)}
        <CustomBreadcrumbs
          heading="Test Details"
          links={[
            {
              name: "Dashboard",
              href: PATHS.dashboard,
            },
            {
              name: "Tests",
              href: PATHS.dashboardTests,
            },
            { name: curTest.name || "Details" },
          ]}
          action={
            <Button
              variant="contained"
              onClick={sectionDialog.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Section
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Stack spacing={2}>
          {curTest != null &&
            curTest.sections != null &&
            curTest.sections.map((section, key) => {
              return (
                <TestSection
                  key={key}
                  section={section}
                  number={key}
                  testId={id}
                />
              );
            })}
        </Stack>
      </Container>
      <DialogAddSection
        open={sectionDialog.value}
        onClose={sectionDialog.onFalse}
        testId={id}
      />
    </>
  );
}
