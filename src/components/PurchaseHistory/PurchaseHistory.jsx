import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableStyle from "./style";

const ResponsiveTableContainer = styled(TableContainer)({
  overflowX: "auto",
});

const ResponsiveTableCell = styled(TableCell)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const PurchaseHistory = () => {
  return (
    <>
      <ResponsiveTableContainer component={Paper}>
        <Table sx={TableStyle.Table} aria-label="customized table">
          <TableHead>
            <TableRow sx={TableStyle.tbHeadRow}>
              <ResponsiveTableCell sx={TableStyle.tbHeadCell} align="">
                Purchase Code
              </ResponsiveTableCell>
              <ResponsiveTableCell sx={TableStyle.tbHeadCell} align="right">
                Product Name
              </ResponsiveTableCell>
              <ResponsiveTableCell sx={TableStyle.tbHeadCell} align="right">
                Support
              </ResponsiveTableCell>
              <ResponsiveTableCell sx={TableStyle.tbHeadCell} align="right">
                Support End{" "}
              </ResponsiveTableCell>
              <ResponsiveTableCell sx={TableStyle.tbHeadCell} align="right">
                Purchased At
              </ResponsiveTableCell>
              <ResponsiveTableCell sx={TableStyle.tbHeadCell} align="right">
                Status
              </ResponsiveTableCell>
              <ResponsiveTableCell sx={TableStyle.tbHeadCell} align="right">
                Extra Pages
              </ResponsiveTableCell>
              <ResponsiveTableCell sx={TableStyle.tbHeadCell} align="right">
                Total
              </ResponsiveTableCell>
              <ResponsiveTableCell sx={TableStyle.tbHeadCell} align="right">
                Action
              </ResponsiveTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <ResponsiveTableCell style={TableStyle.tableBodyCell}>
                2QPVOAKKBHWOWU8KF2OX
              </ResponsiveTableCell>
              <ResponsiveTableCell
                style={TableStyle.tableBodyCell}
                align="right"
              >
                Product With All Qualities
              </ResponsiveTableCell>
              <ResponsiveTableCell align="right">
                <Button style={TableStyle.tbBodyYesButton} variant="contained">
                  Yes
                </Button>
              </ResponsiveTableCell>
              <ResponsiveTableCell
                style={TableStyle.tableBodyCell}
                align="right"
              >
                2024-01-24
              </ResponsiveTableCell>
              <ResponsiveTableCell
                style={TableStyle.tableBodyCell}
                align="right"
              >
                25 Nov, 2023 02:59 AM
              </ResponsiveTableCell>
              <ResponsiveTableCell align="right">
                <Button
                  style={TableStyle.tbBodyPurchseButton}
                  variant="contained"
                >
                  Purchased
                </Button>
              </ResponsiveTableCell>
              <ResponsiveTableCell
                style={TableStyle.tableBodyCell}
                align="right"
              >
                15
              </ResponsiveTableCell>
              <ResponsiveTableCell
                style={TableStyle.tableBodyCell}
                align="right"
              >
                $1,200.65{" "}
              </ResponsiveTableCell>
              <ResponsiveTableCell align="right">
                <Button style={TableStyle.tbBodyYesButton} variant="contained">
                  View
                </Button>
              </ResponsiveTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ResponsiveTableContainer>
    </>
  );
};

export default PurchaseHistory;
