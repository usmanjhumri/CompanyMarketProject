import React from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./styles";
function Faq() {
  return (
    <>
      <Grid container>
        <Grid item lg={3}></Grid>
        <Grid item lg={6} sx={{ mt: 5 }}>
          <Accordion sx={styles.accordionRoot}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon fontSize="large" color="#000" />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={styles.faqQuestion}>
                How can I get your product?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={styles.faqAnswer}>
                If you wish to obtain our products, including funnels, websites,
                graphics, and business cards, you can locate them in the menu
                items on the JD Funnel Marketplace. Select the desired product,
                proceed with the transaction, and we will provide you with a
                shareable link for installation on your end.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordionRoot}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon fontSize="large" color="#000" />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={styles.faqQuestion}>
                How do I install your product after buying it?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={styles.faqAnswer}>
                If you're interested in purchasing our product, follow these
                steps:
              </Typography>
              <Typography sx={{ mt: 1.5, pl: 3 }}>
                {" "}
                <ul>
                  <li>Select the desired product.</li>
                  <li>Proceed with payment using your card.</li>
                  <li>
                    After payment, we'll provide you with an installation link.
                    You can then use this link to install the product on your
                    end.
                  </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordionRoot}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon fontSize="large" color="#000" />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={styles.faqQuestion}>
                Is there a refund policy in place at the JD Funnel Marketplace?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={styles.faqAnswer}>
                Please check the Payment Policy and Terms & Conditions!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordionRoot}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon fontSize="large" color="#000" />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={styles.faqQuestion}>
                Which payment methods does JD Funnel Marketplace accept?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={styles.faqAnswer}>
                We exclusively accept card payments as the payment method.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordionRoot}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon fontSize="large" color="#000" />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={styles.faqQuestion}>
                What is included with the product on JD Funnel Marketplace?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={styles.faqAnswer}>
                The specific contents included with each product on JD Funnel
                Marketplace can vary. To get detailed information about what is
                included with a particular product, please refer to the product
                details or documentation provided on the marketplace.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordionRoot}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon fontSize="large" color="#000" />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={styles.faqQuestion}>
                Do you offer technical support, or should I contact JD Funnel
                Marketplace for assistance?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={styles.faqAnswer}>
                We offer technical support. Feel free to submit the form below
                to discuss any issues you may have.e.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item lg={3}></Grid>
      </Grid>
      <Grid container>
        <Grid item lg={3}></Grid>
        <Grid item lg={6} sx={{ mt: 5 }}>
            
        </Grid>
        <Grid item lg={3}></Grid>
      </Grid>
    </>
  );
}

export default Faq;
