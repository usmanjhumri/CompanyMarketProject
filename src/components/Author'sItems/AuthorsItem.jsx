/* eslint-disable react/no-unescaped-entities */

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AuthStyle from "./styles";
import { PiShoppingCartLight } from "react-icons/pi";
import AuthcartArray from "./AuthorCartArray";
const AuthsItem = () => {
  return (
    <Box sx={AuthStyle.mainBox}>
      <Container maxWidth="100%">
        <Typography sx={AuthStyle.AuthTypo}>Best Author's items</Typography>
        <Typography sx={AuthStyle.AuthTypo2}>
          Discover the Pinnacle of Authorship: Our Best Selections
        </Typography>
        <Grid
          container
          spacing={3}
         
        >
          {AuthcartArray.map((item) => {
            return (
              <>
                <Grid item xs={12} md={4}>
                  <Box sx={AuthStyle.BoxStyle}>
                    <Box
                      component="img"
                      src={item.img}
                      sx={AuthStyle.ImgStyle}
                    />
                    <Typography mt={2} sx={AuthStyle.BoxTypo}>
                      {item.title1}
                    </Typography>

                    <Typography mt={1} sx={AuthStyle.BoxTypo2}>
                      {item.title2}
                    </Typography>

                    <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                      <Typography sx={AuthStyle.PriceTypo}>
                        {item.pricetitle}
                      </Typography>
                      <Typography sx={AuthStyle.PriceTypo2}>
                        {item.pricetitle2}
                      </Typography>
                    </Box>

                    <Box
                      mt={4}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={AuthStyle.SalesTypo}>
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
                        <Button sx={AuthStyle.BtnStyle}>Live Preview</Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default AuthsItem;
