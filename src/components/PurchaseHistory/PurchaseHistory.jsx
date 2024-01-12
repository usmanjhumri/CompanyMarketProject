import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import TableStyle from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { purchaseHistory } from "../../Redux/api/api";
import Skeleton from "@mui/material/Skeleton";
const ResponsiveTableContainer = styled(TableContainer)({
  overflowX: "auto",
});

const ResponsiveTableCell = styled(TableCell)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const PurchaseHistory = () => {
  const dispatch = useDispatch();

  const tableData = useSelector((state) => state?.purchasehistory?.data);
  const isLoading = useSelector((state) => state?.purchasehistory?.isLoading);

  useEffect(() => {
    dispatch(purchaseHistory());
  }, [dispatch]);
  return (
    <>
      <Typography sx={TableStyle.AuthTypo}>Purchase History</Typography>
      {isLoading ? (
        <Skeleton animation="wave" width={"100%"} height={600} />
      ) : (
        <div style={{ marginTop: "2%" }}>
          {tableData?.length === 0 ? (
            "No purchase history"
          ) : (
            <ResponsiveTableContainer component={Paper}>
              <Table sx={TableStyle.Table} aria-label="customized table">
                <TableHead>
                  <TableRow sx={TableStyle.tbHeadRow}>
                    <ResponsiveTableCell sx={TableStyle.tbHeadCell} align="">
                      Purchase Code
                    </ResponsiveTableCell>
                    <ResponsiveTableCell
                      sx={TableStyle.tbHeadCell}
                      align="right"
                    >
                      Product Name
                    </ResponsiveTableCell>
                    <ResponsiveTableCell
                      sx={TableStyle.tbHeadCell}
                      align="right"
                    >
                      Support
                    </ResponsiveTableCell>
                    <ResponsiveTableCell
                      sx={TableStyle.tbHeadCell}
                      align="right"
                    >
                      Support End{" "}
                    </ResponsiveTableCell>
                    <ResponsiveTableCell
                      sx={TableStyle.tbHeadCell}
                      align="right"
                    >
                      Purchased At
                    </ResponsiveTableCell>
                    <ResponsiveTableCell
                      sx={TableStyle.tbHeadCell}
                      align="right"
                    >
                      Bumps
                    </ResponsiveTableCell>
                    <ResponsiveTableCell
                      sx={TableStyle.tbHeadCell}
                      align="right"
                    >
                      Extra Pages
                    </ResponsiveTableCell>
                    <ResponsiveTableCell
                      sx={TableStyle.tbHeadCell}
                      align="right"
                    >
                      Total
                    </ResponsiveTableCell>
                    <ResponsiveTableCell
                      sx={TableStyle.tbHeadCell}
                      align="right"
                    >
                      Action
                    </ResponsiveTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData.map((item, index) => (
                    <TableRow key={index} sx={{ mt: 2, mb: 20 }}>
                      <ResponsiveTableCell style={TableStyle.tableBodyCell}>
                        {item.code}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell
                        style={TableStyle.tableBodyCell}
                        align="right"
                      >
                        {item.product.name}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell align="right">
                        <Button
                          style={TableStyle.tbBodyYesButton}
                          variant="contained"
                        >
                          {item.support == 1 ? "Yes" : "No"}
                        </Button>
                      </ResponsiveTableCell>
                      <ResponsiveTableCell
                        style={TableStyle.tableBodyCell}
                        align="right"
                      >
                        {item.support == 1 ? item.support_time : "-"}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell
                        style={TableStyle.tableBodyCell}
                        align="right"
                      >
                        {new Date(item.created_at).toLocaleString("en-GB")}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell align="right">
                        <Button
                          style={TableStyle.tbBodyPurchseButton}
                          variant="contained"
                        >
                          {item.bumpresponses.length > 0 ? "Yes" : "No"}
                        </Button>
                      </ResponsiveTableCell>
                      <ResponsiveTableCell
                        style={TableStyle.tableBodyCell}
                        align="right"
                      >
                        {item.bumpresponses.length > 0 ? "Yes" : "-"}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell
                        style={TableStyle.tableBodyCell}
                        align="right"
                      >
                        $ {Number(item.total_price).toFixed(2)}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell align="right">
                        <Button
                          style={TableStyle.tbBodyYesButton}
                          variant="contained"
                        >
                          View
                        </Button>
                      </ResponsiveTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ResponsiveTableContainer>
          )}
        </div>
      )}
    </>
  );
};

export default PurchaseHistory;
