import React from "react";
import { Container } from "@/components/ProductDetail/style";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Popover,
} from "@mui/material";
import { styled } from "@mui/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { CurrencySymbol } from "@/components/common/common";
import { useSelector } from "react-redux";

const Quantity = ({ handlePopoverClose, anchorEl, Units, qty_unit }) => {
  const open = Boolean(anchorEl);
  const { quantity_based_list, currency_id }: any = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const StyledTableCell = styled(TableCell)(({}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F0F3F8",
      color: "#000000",
      fontSize: "12px !important",
      fontWeight: 600,
      padding: "3px 8px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      fontWeight: 400,
      padding: 12,
    },
  }));

  const StyledTableRow = styled(TableRow)(({}) => ({
    "&:nth-of-type(even)": {
      backgroundColor: "#FAFAFA",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Popover
      id="mouse-over-popover-quantity"
      sx={{
        pointerEvents: "none",
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Container>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", border: "1px solid #d2d2d2" }}
        >
          <Table
            sx={{ minWidth: 100, width: "100%" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell
                  colSpan={2}
                  align="center"
                  sx={{ borderRight: "1px solid #e0e0e0", width: "50%" }}
                >
                  Quantity
                </StyledTableCell>
                <StyledTableCell
                  rowSpan={2}
                  align="center"
                  sx={{ borderRight: "1px solid #e0e0e0" }}
                >
                  Price / Unit
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">Min</StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ borderRight: "1px solid #e0e0e0" }}
                >
                  Max
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quantity_based_list?.map((row) => (
                <StyledTableRow key={row.max_qty}>
                  <StyledTableCell align="center">{`${row.min_qty}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${row.max_qty}`}</StyledTableCell>
                  <StyledTableCell align="center">
                    {`${CurrencySymbol(+currency_id)}${row.price}`} /{" "}
                    {Units?.find((v) => v.id == qty_unit)?.name ?? "NA"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Popover>
  );
};

export default Quantity;
