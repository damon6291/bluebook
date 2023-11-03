// @mui
import Accordion from "@mui/material/Accordion";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// _mock
import { FAQS } from "src/data/_faq";
// components
import Iconify from "src/components/iconify";

import { varFade, MotionViewport } from "src/components/animate";
import { m } from "framer-motion";

// ----------------------------------------------------------------------

export default function Faq() {
  return (
    <>
      <Container component={MotionViewport}>
        <m.div variants={varFade().inRight}>
          <Typography
            variant="h4"
            sx={{
              my: { xs: 5, md: 5 },
            }}
          >
            Frequently asked questions
          </Typography>
        </m.div>
        <div>
          {FAQS.map((accordion) => (
            <m.div key={accordion.id} variants={varFade().inRight}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                >
                  <Typography variant="subtitle1">
                    {accordion.heading}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography>{accordion.detail}</Typography>
                </AccordionDetails>
              </Accordion>
            </m.div>
          ))}
        </div>
      </Container>
    </>
  );
}
