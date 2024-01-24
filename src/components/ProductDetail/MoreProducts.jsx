/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-target-blank */
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "./styles";
import { Link } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Carousel from "react-multi-carousel";

const MoreProducts = () => {
  const moreProduct = useSelector(
    (state) => state?.productDetail?.data?.moreProducts
  );
  const imgPath = useSelector((state) => state?.home?.imgPath);

  const CustomRight = ({ onClick }) => (
    <button className="arrow right" onClick={onClick} style={styles.arrowRight}>
      <GoChevronRight style={{ fontSize: "50px" }} />
    </button>
  );
  const CustomLeft = ({ onClick }) => (
    <button className="arrow left" onClick={onClick} style={styles.arrowLeft}>
      <GoChevronLeft style={{ fontSize: "50px" }} />
    </button>
  );
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 538, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Carousel
        responsive={responsive}
        infinite
        containerClass="container-with-dots"
        itemClass="image-item"
        arrows
        autoPlaySpeed={3000}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        customRightArrow={<CustomRight />}
        customLeftArrow={<CustomLeft />}
      >
        {moreProduct?.length > 0 &&
          moreProduct?.map((item, index) => (
            <div style={{ marginLeft: 5, marginRight: 5 }} key={index}>
              <Box sx={styles.BoxStyle}>
                <Link
                  to={`/product/${item.category_id}/${item.name
                    .toLowerCase()
                    .replace(/[\s-]/g, "-")}/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box sx={styles.imgBoxDiv}>
                    <Box
                      component="img"
                      src={`${imgPath}/${item.image}`}
                      sx={styles.ImgStyle}
                      alt="Loading"
                    />
                  </Box>
                  <Typography mt={2} sx={styles.BoxTypo}>
                    {item.name}
                  </Typography>

                  <Typography mt={1} sx={styles.BoxTypo2}>
                    By {item?.user?.firstname + " " + item?.user?.lastname}
                  </Typography>

                  <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                    <Typography sx={{ ...styles.PriceTypo }}>
                      $ {Number(item.extended_price).toFixed(2)}
                    </Typography>
                    <Typography sx={styles.PriceTypo2}>
                      {" "}
                      $ {Number(item.regular_price).toFixed(2)}
                    </Typography>
                  </Box>
                </Link>

                <Box
                  mt={4}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={styles.SalesTypo}>
                    {item.total_sell} Sales
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <a href={item["demo_link"]} target="_blank">
                      <Button sx={styles.BtnStyle}>Live Preview</Button>
                    </a>
                  </Box>
                </Box>
              </Box>
            </div>
          ))}
      </Carousel>
    </>
  );
};

export default MoreProducts;
