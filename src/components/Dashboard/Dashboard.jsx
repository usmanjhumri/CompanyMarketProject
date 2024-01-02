import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { List, ListItem, ListItemText } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import img1 from "../../assets/AuthItems.png";
import Typography from "@mui/material/Typography";
import style from "./Styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        sx={{
          minWidth: 275,
        }}
      >
        <Card sx={{ background: "#F8F9FA" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              justifyContent: isSmallScreen ? "center" : "space-around",
              alignItems: isSmallScreen ? "center" : "flex-start",
              marginTop: "20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                sx={{
                  width: isSmallScreen ? "80px" : "100px",
                  height: "100px",
                }}
                component="img"
                image={img1}
                alt="funnel"
              />

              <CardContent sx={{ marginLeft: isSmallScreen ? 0 : "16px" }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontFamily: "Be Vietnam",
                    color: "#363636",
                    fontWeight: 600,
                  }}
                >
                  test user
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Be Vietnam",
                    color: "#6f6f6f",
                    fontSize: "16px",

                    fontWeight: "400",
                  }}
                >
                  Member since December, 2023
                </Typography>
              </CardContent>
            </Box>

            <CardContent sx={{ marginLeft: isSmallScreen ? 0 : "16px" }}>
              <Typography
                sx={{
                  fontFamily: "Be Vietnam",
                  color: "#6f6f6f",
                  fontSize: "16px",

                  fontWeight: "400",
                }}
              >
                Purchased
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontFamily: "Be Vietnam",
                  color: "#363636",
                  fontWeight: 600,
                  textAlign: "right",
                }}
              >
                83
              </Typography>
            </CardContent>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <List
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                justifyContent: "center",
                alignItems: isSmallScreen ? "center" : "flex-start",
                cursor: "pointer",
                fontFamily: "Be Vietnam",
                color: "#6f6f6f",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              <ListItem>
                <ListItemText sx={{ padding: "20px" }} primary="Dashboard" />
              </ListItem>
              <ListItem>
                <ListItemText sx={{ padding: "20px" }} primary="Deposit" />
              </ListItem>
              <ListItem>
                <ListItemText sx={{ padding: "20px" }} primary="Transactions" />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ padding: "20px" }}
                  primary="Purchase Logs"
                />
              </ListItem>
              <ListItem>
                <ListItemText sx={{ padding: "20px" }} primary="Support" />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ padding: "20px" }}
                  primary="Your Meetings"
                />
              </ListItem>
            </List>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Dashboard;
