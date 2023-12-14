/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-target-blank */
import { Fragment, useState, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  
} from "@mui/material";
import Styles from "./styles";
import { styled } from "@mui/material/styles";
import { PiShoppingCartLight } from "react-icons/pi";
import { useRadioGroup } from "@mui/material/RadioGroup";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

export default function index({ filterProduct, isLoading }) {
  const [subCategoryUnique, setSubCategoryUnique] = useState([]);
  const [value, setValue] = useState("");

  const imgPath = useSelector((state) => state?.home?.imgPath);

  useMemo(() => {
    const subCat = filterProduct.reduce(
      (acc, cur) =>
        acc.some(({ subcategory }) => subcategory.name === cur.subcategory.name)
          ? acc
          : [...acc, cur],
      []
    );
    setSubCategoryUnique(subCat);
    setValue(subCat[0]?.subcategory?.name);
  }, [filterProduct]);

  // eslint-disable-next-line react-hooks/rules-of-hooks

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Grid container sx={{ maxWidth: { md: "90%", xs: "auto" } }} margin="auto">
      <Grid item xs={12} md={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={Styles.CategoriesText}>Sub categories</Typography>
          <RadioGroup
            value={value}
            onChange={handleChange}
            sx={{
              flexDirection: { md: "column", xs: "row" },
              alignItems: "flex-start",
              marginTop: 2,
              label: {
                fontSize: { md: "16px", xs: "14px" }, // Adjust the font size as needed
              },
            }}
          >
            {subCategoryUnique?.map((item, index) => (
              <MyFormControlLabel
                key={index}
                value={item?.subcategory?.name}
                control={<Radio />}
                label={item?.subcategory?.name}
              />
            ))}
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
        {filterProduct?.map((item, index) => (
          <Fragment key={index}>
            {value === item?.subcategory?.name && (
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
                  <Link
                    to={`/product/${item.category_id}/${item.name
                      .toLowerCase()
                      .replace(/[\s-]/g, "-")}/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box component="div" sx={Styles.imgBoxDiv}>
                      {" "}
                      <Box
                        component="img"
                        src={imgPath + "/" + item.image}
                        sx={Styles.ImgStyle}
                      />
                    </Box>

                    <Typography mt={2} sx={Styles.BoxTypo}>
                      {item.name}
                    </Typography>

                    <Typography mt={1} sx={Styles.BoxTypo2}>
                      By {item.user.username}
                    </Typography>

                    <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                      <Typography sx={Styles.PriceTypo}>
                        $ {Number(item.extended_price).toFixed(2)}
                      </Typography>
                      <Typography sx={Styles.PriceTypo2}>
                        $ {Number(item.regular_price).toFixed(2)}
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
                        {item.total_sell} Sales
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
                        <a href={item.demo_link} target="_blank">
                          <Button sx={Styles.BtnStyle}>Live Preview</Button>
                        </a>
                      </Box>
                    </Box>
                  </Link>
                </Box>
              </Grid>
            )}
          </Fragment>
        ))}
        {isLoading ||
          (filterProduct?.length === 0 && (
            <Typography variant="h4" textAlign="center">
              No product is listed
            </Typography>
          ))}
      </Grid>
    </Grid>
  );
}
