import React, { Fragment } from "react";
import { Menu, MenuItem, Popover, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "../styles";

const MenuCat = ({ anchorEl, handleClose, subcategories }) => {
  return (
    <div>
      <Popover
        id="simple-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        onMouseLeave={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        mouseLeaveDelay={300} // Set a delay before closing the popover
        disableRestoreFocus
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
};

export default MenuCat;
