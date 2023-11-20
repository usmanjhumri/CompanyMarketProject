import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import Products from "./Products";
import Styles from "./styles";
import { styled } from "@mui/material/styles";
import { PiShoppingCartLight } from "react-icons/pi";
import { useRadioGroup } from "@mui/material/RadioGroup";

// eslint-disable-next-line react-refresh/only-export-components
const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": {
    fontFamily: "Be Vietnam Pro,sans-serif",
    color: checked && theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
}));

// eslint-disable-next-line react-refresh/only-export-components
function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    // eslint-disable-next-line react/prop-types
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState("tourism");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Grid container>
      <Grid item xs={12} md={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={Styles.CategoriesText}>Categories</Typography>
          <RadioGroup
            value={value}
            onChange={handleChange}
            sx={{
              flexDirection: { md: "column", xs: "row" },
              paddingLeft: { xs: "20px" },
              alignItems: "flex-start",
              marginTop: 2,
              label: {
                fontSize: { md: "16px", xs: "14px" }, // Adjust the font size as needed
              },
            }}
          >
            <MyFormControlLabel
              value="tourism"
              control={<Radio />}
              label="Tourism"
            />
            <MyFormControlLabel value="saas" control={<Radio />} label="SAAS" />
            <MyFormControlLabel
              value="financial"
              control={<Radio />}
              label="Financial"
            />

            <MyFormControlLabel
              value="ss"
              control={<Radio />}
              label="Tourism"
            />
          </RadioGroup>
        </Box>
      </Grid>
      <Grid
        container
        spacing={2}
        xs={12}
        md={10}
        sx={{ margin: { md: "0px", xs: "auto" } }}
      >
        {Products.map((item) => (
          <>
            {value === "tourism" && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  paddingLeft: { md: "16px", xs: "0px" },
                  "@media screen and (max-width: 600px)": {
                    paddingLeft: "0px !important",
                  },
                }}
              >
                <Box sx={Styles.BoxStyle}>
                  <Box component="img" src={item.img} sx={Styles.ImgStyle} />
                  <Typography mt={2} sx={Styles.BoxTypo}>
                    {item.title1}
                  </Typography>

                  <Typography mt={1} sx={Styles.BoxTypo2}>
                    {item.title2}
                  </Typography>

                  <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                    <Typography sx={Styles.PriceTypo}>
                      {item.pricetitle}
                    </Typography>
                    <Typography sx={Styles.PriceTypo2}>
                      {item.pricetitle2}
                    </Typography>
                  </Box>

                  <Box
                    mt={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={Styles.SalesTypo}>
                      {item.salestitle}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <PiShoppingCartLight
                        style={{
                          padding: "0.6rem",
                          border: "1px solid #787878",
                          borderRadius: "2px",
                          color: "#787878",
                        }}
                      />
                      <Button sx={Styles.BtnStyle}>Live Preview</Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}
            {value === "saas" && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  paddingLeft: { md: "16px", xs: "0px" },
                  "@media screen and (max-width: 600px)": {
                    paddingLeft: "0px !important",
                  },
                }}
              >
                <Box sx={Styles.BoxStyle}>
                  <Box component="img" src={item.img} sx={Styles.ImgStyle} />
                  <Typography mt={2} sx={Styles.BoxTypo}>
                    {item.title1}
                  </Typography>

                  <Typography mt={1} sx={Styles.BoxTypo2}>
                    {item.title2}
                  </Typography>

                  <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                    <Typography sx={Styles.PriceTypo}>
                      {item.pricetitle}
                    </Typography>
                    <Typography sx={Styles.PriceTypo2}>
                      {item.pricetitle2}
                    </Typography>
                  </Box>

                  <Box
                    mt={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={Styles.SalesTypo}>
                      {item.salestitle}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <PiShoppingCartLight
                        style={{
                          padding: "0.6rem",
                          border: "1px solid #787878",
                          borderRadius: "2px",
                          color: "#787878",
                        }}
                      />
                      <Button sx={Styles.BtnStyle}>Live Preview</Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}
            {value === "financial" && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  paddingLeft: { md: "16px", xs: "0px" },
                  "@media screen and (max-width: 600px)": {
                    paddingLeft: "0px !important",
                  },
                }}
              >
                <Box sx={Styles.BoxStyle}>
                  <Box component="img" src={item.img} sx={Styles.ImgStyle} />
                  <Typography mt={2} sx={Styles.BoxTypo}>
                    {item.title1}
                  </Typography>

                  <Typography mt={1} sx={Styles.BoxTypo2}>
                    {item.title2}
                  </Typography>

                  <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                    <Typography sx={Styles.PriceTypo}>
                      {item.pricetitle}
                    </Typography>
                    <Typography sx={Styles.PriceTypo2}>
                      {item.pricetitle2}
                    </Typography>
                  </Box>

                  <Box
                    mt={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={Styles.SalesTypo}>
                      {item.salestitle}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <PiShoppingCartLight
                        style={{
                          padding: "0.6rem",
                          border: "1px solid #787878",
                          borderRadius: "2px",
                          color: "#787878",
                        }}
                      />
                      <Button sx={Styles.BtnStyle}>Live Preview</Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}
            {value === "ss" && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  paddingLeft: { md: "16px", xs: "0px" },
                  "@media screen and (max-width: 600px)": {
                    paddingLeft: "0px !important",
                  },
                }}
              >
                <Box sx={Styles.BoxStyle}>
                  <Box component="img" src={item.img} sx={Styles.ImgStyle} />
                  <Typography mt={2} sx={Styles.BoxTypo}>
                    {item.title1}
                  </Typography>

                  <Typography mt={1} sx={Styles.BoxTypo2}>
                    {item.title2}
                  </Typography>

                  <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                    <Typography sx={Styles.PriceTypo}>
                      {item.pricetitle}
                    </Typography>
                    <Typography sx={Styles.PriceTypo2}>
                      {item.pricetitle2}
                    </Typography>
                  </Box>

                  <Box
                    mt={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={Styles.SalesTypo}>
                      {item.salestitle}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <PiShoppingCartLight
                        style={{
                          padding: "0.6rem",
                          border: "1px solid #787878",
                          borderRadius: "2px",
                          color: "#787878",
                        }}
                      />
                      <Button sx={Styles.BtnStyle}>Live Preview</Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </Grid>
  );
}
