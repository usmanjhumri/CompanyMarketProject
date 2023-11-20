import React, { useState } from "react";
import styles from "./styles/";

//Material UI
import { Box, Typography, Card, CardContent } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

//Icons
import { IoFunnelOutline } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import { TiBusinessCard } from "react-icons/ti";
import { AiOutlineLineChart } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { PiGitlabLogoSimple } from "react-icons/pi";
import { RiSurveyLine } from "react-icons/ri";

//Swiper.js
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "120ch",
  borderRadius: "15px",
  background: "#FFF",
  boxShadow: "0px 0px 20px 1px rgba(0, 0, 0, 0.15);",
  marginTop: "-100px",
  zIndex: "1",
  [theme.breakpoints.up("md")]: {
    borderRadius: "15px",
    background: "#FFF",
    boxShadow: "0px 0px 20px 1px rgba(0, 0, 0, 0.15);",
    marginTop: "-100px",
    zIndex: "1",
  },
  [theme.breakpoints.up("xs")]: {
    zIndex: "1",
    marginLeft: "20px",
    marginRight: "20px",
  },
}));

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <Box sx={styles.sliderBoxDiv}>
      <StyledCard variant="outlined" raised>
        <Typography variant="h4" sx={styles.silderHeading}>
          Explore Different Categories
        </Typography>

        <Box sx={styles.innerCardDisplay}>
          {" "}
          <Swiper
            effect={"coverflow"}
            onSlideChange={handleSlideChange}
            grabCursor={true}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Navigation, EffectCoverflow, Autoplay]}
            slidesPerView={4}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 400,
              modifier: 2.5,
              slideShadows: false,
            }}
            speed={900}
            style={{ width: "100%", height: "40%" }}
          >
            <SwiperSlide style={styles.innerCardDisplaySwiper}>
              <Card
                variant="outlined"
                sx={
                  activeIndex === 0
                    ? styles.InnerCardStyleActive
                    : styles.InnerCardStyle
                }
              >
                <CardContent sx={styles.cardContent}>
                  <IoFunnelOutline
                    size={50}
                    style={activeIndex === 0 ? { color: "white" } : {}}
                  />
                  <Typography
                    sx={
                      activeIndex === 0
                        ? styles.cardTextActive
                        : styles.cardText
                    }
                  >
                    Funnel
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide style={styles.innerCardDisplaySwiper}>
              <Card
                variant="outlined"
                sx={
                  activeIndex === 1
                    ? styles.InnerCardStyleActive
                    : styles.InnerCardStyle
                }
              >
                <CardContent sx={styles.cardContent}>
                  <AiOutlineGlobal
                    size={50}
                    style={activeIndex === 1 ? { color: "white" } : {}}
                  />
                  <Typography
                    sx={
                      activeIndex === 1
                        ? styles.cardTextActive
                        : styles.cardText
                    }
                  >
                    Websites
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide style={styles.innerCardDisplaySwiper}>
              <Card
                variant="outlined"
                sx={
                  activeIndex === 2
                    ? styles.InnerCardStyleActive
                    : styles.InnerCardStyle
                }
              >
                <CardContent sx={styles.cardContent}>
                  <TiBusinessCard
                    size={50}
                    style={activeIndex === 2 ? { color: "white" } : {}}
                  />
                  <Typography
                    sx={
                      activeIndex === 2
                        ? styles.cardTextActive
                        : styles.cardText
                    }
                  >
                    Business Cards
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide style={styles.innerCardDisplaySwiper}>
              <Card
                variant="outlined"
                sx={
                  activeIndex === 3
                    ? styles.InnerCardStyleActive
                    : styles.InnerCardStyle
                }
              >
                <CardContent sx={styles.cardContent}>
                  <AiOutlineLineChart
                    size={50}
                    style={activeIndex === 3 ? { color: "white" } : {}}
                  />
                  <Typography
                    sx={
                      activeIndex === 3
                        ? styles.cardTextActive
                        : styles.cardText
                    }
                  >
                    Dashboard
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide style={styles.innerCardDisplaySwiper}>
              <Card
                variant="outlined"
                sx={
                  activeIndex === 4
                    ? styles.InnerCardStyleActive
                    : styles.InnerCardStyle
                }
              >
                <CardContent sx={styles.cardContent}>
                  <PiGitlabLogoSimple
                    size={50}
                    style={activeIndex === 4 ? { color: "white" } : {}}
                  />
                  <Typography
                    sx={
                      activeIndex === 4
                        ? styles.cardTextActive
                        : styles.cardText
                    }
                  >
                    Logos
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            {/* <SwiperSlide style={styles.innerCardDisplaySwiper}>
              <Card
                variant="outlined"
                sx={
                  activeIndex === 5
                    ? styles.InnerCardStyleActive
                    : styles.InnerCardStyle
                }
              >
                <CardContent sx={styles.cardContent}>
                  <RiSurveyLine
                    size={50}
                    style={activeIndex === 5 ? { color: "white" } : {}}
                  />
                  <Typography
                    sx={
                      activeIndex === 5
                        ? styles.cardTextActive
                        : styles.cardText
                    }
                  >
                    Surveys
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide> */}
          </Swiper>
        </Box>
      </StyledCard>
    </Box>
  );
};

export default Slider;
