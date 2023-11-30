import React from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import { Box, Button, Grid, Typography, Container } from "@mui/material";
import Styles from "./Styles";

const Cards = ({ data }) => {
  console.log(data, "in cards");
  return (
    <Box sx={Styles.mainBox}>
      <Container maxWidth="100%">
        <Grid container spacing={3}>
          {data.map((item, index) => (
            <Grid item xs={12} md={4}>
              <Box sx={Styles.BoxStyle}>
                <Box
                  component="img"
                  src={`https://marketplace.jdfunnel.com/assets/images/product/6509e13e5c8b51695146302.png`}
                  sx={Styles.ImgStyle}
                  alt="Loading"
                />
                <Typography mt={2} sx={Styles.BoxTypo}>
                  {item.name}
                </Typography>

                <Typography mt={1} sx={Styles.BoxTypo2}>
                  By Demo
                </Typography>

                <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                  <Typography sx={Styles.PriceTypo}>Demo</Typography>
                  <Typography sx={Styles.PriceTypo2}>Demo</Typography>
                </Box>

                <Box
                  mt={4}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography sx={Styles.SalesTypo}>Demo</Typography>
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

                    <a href="#" target="_blank">
                      <Button sx={Styles.BtnStyle}>Live Preview</Button>
                    </a>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    // <Grid xs={12} sx={{marginTop:"30px"}} container  spacing={2}   columnSpacing={{ sm: 3, md: 3, lg:4  }} item>
    //   <Grid lg={3} xs={12} sm={6}  display="flex" justifyContent="center" alignItems="center" >
    //     <Card sx={{ maxWidth: 345 ,  margin:2}}>
    //       <CardMedia
    //         sx={{ height: 140 }}
    //         image="https://marketplace.jdfunnel.com/assets/images/product/63e0f37b665c71675686779.png"
    //         alt="loading"
    //         title="green iguana"
    //       />
    //       <CardContent>
    //         <Typography gutterBottom variant="p" component="div">
    //         Product With All Qualities
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //         By SAJJJJAD
    //         </Typography>

    //       </CardContent>
    //       <CardActions>
    //         <Button size="small">Share</Button>
    //         <Button size="small">Live Preview</Button>
    //       </CardActions>
    //     </Card>
    //   </Grid>

    //   <Grid lg={3} xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
    //     <Card sx={{ maxWidth: 345,margin:2 }}>
    //       <CardMedia
    //         sx={{ height: 140 }}
    //         image="/static/images/cards/contemplative-reptile.jpg"
    //         title="green iguana"
    //       />
    //       <CardContent>
    //         <Typography gutterBottom variant="h5" component="div">
    //           Lizard
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Lizards are a widespread group of squamate reptiles, with over
    //           6,000 species, ranging across all continents except Antarctica
    //         </Typography>
    //       </CardContent>
    //       <CardActions>
    //         <Button size="small">Share</Button>
    //         <Button size="small">Learn More</Button>
    //       </CardActions>
    //     </Card>
    //   </Grid>

    //   <Grid lg={3} xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
    //     <Card sx={{ maxWidth: 345,margin:2 }}>
    //       <CardMedia
    //         sx={{ height: 140 }}
    //         image="/static/images/cards/contemplative-reptile.jpg"
    //         title="green iguana"
    //       />
    //       <CardContent>
    //         <Typography gutterBottom variant="h5" component="div">
    //           Lizard
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Lizards are a widespread group of squamate reptiles, with over
    //           6,000 species, ranging across all continents except Antarctica
    //         </Typography>
    //       </CardContent>
    //       <CardActions>
    //         <Button size="small">Share</Button>
    //         <Button size="small">Learn More</Button>
    //       </CardActions>
    //     </Card>
    //   </Grid>

    //   <Grid lg={3} xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
    //     <Card sx={{ maxWidth: 345,margin:2 }}>
    //       <CardMedia
    //         sx={{ height: 140 }}
    //         image="/static/images/cards/contemplative-reptile.jpg"
    //         title="green iguana"
    //       />
    //       <CardContent>
    //         <Typography gutterBottom variant="h5" component="div">
    //           Lizard
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Lizards are a widespread group of squamate reptiles, with over
    //           6,000 species, ranging across all continents except Antarctica
    //         </Typography>
    //       </CardContent>
    //       <CardActions>
    //         <Button size="small">Share</Button>
    //         <Button size="small">Learn More</Button>
    //       </CardActions>
    //     </Card>
    //   </Grid>
    // </Grid>
  );
};

export default Cards;
