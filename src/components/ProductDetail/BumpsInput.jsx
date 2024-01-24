import React, { useState } from "react";
import { Checkbox, Box, Typography } from "@mui/material";
import styles from "./styles";
function BumpsInput({
  item,
  index,
  checkedItems,
  handleCheckboxChange,
  handlePageChange,
}) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [extraPages, setExtraPages] = useState(item.min_quantity);

  return (
    <Box
      sx={{
        ...styles.productBumps,
      }}
    >
      <Box
        display="flex"
        sx={{
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box display="flex" sx={{ alignItems: "center", gap: 1 }}>
          <Checkbox
            {...label}
            sx={{ p: 0 }}
            onChange={(e) =>
              handleCheckboxChange(index, item.price, item.is_quantity, item.id)
            }
            checked={checkedItems[item.id] === true ? true : false}
          />
          <Typography sx={styles.detailsText}>{item.name}</Typography>
          {item.is_quantity === 1 && (
            <input
              style={{ width: "18%" }}
              value={extraPages}
              type="number"
              min={item.min_quantity}
              pattern="\d*"
              onChange={(e) => {
                let value = e.target.value;
                if (e.target.value < item.min_quantity) {
                  e.target.value = item.min_quantity;
                }
                handlePageChange(e, item.price, checkedItems[item.id], index);
                setExtraPages(value);
              }}
            />
          )}
        </Box>
      </Box>
      <Typography sx={styles.detailsText}>$ {Number(item.price)}</Typography>
    </Box>
  );
}

export default BumpsInput;
