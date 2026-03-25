import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ModalHeader, CloseIcon, ConfigTable } from "./style";
import Pagination from "@mui/material/Pagination";
export default function ProductOptionsModal({
  open,
  handleClose,
  productOptionsList,
  lastPage,
  page,
  setPage,
}) {

  const RenderSerialNo = (i, page) => {
    if (page == 1) {
      return i + 1;
    }
    if (i == 9) {
      return `${page}0`;
    }
    if (page > 1 && i < 9) {
      return `${page - 1}${i + 1}`;
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        sx={{
          "@media (max-width: 480px)": {
            "& .MuiDialog-paper": {
              margin: "12px",
            },
          },
        }}
      >
        <DialogTitle>
          <ModalHeader display="flex" justifyContent="space-between">
            <Typography fontFamily="open sans" fontWeight="600" fontSize="18px">
              Available Options of Configuration
            </Typography>
            <CloseIcon>
              <ClearIcon onClick={handleClose} />
            </CloseIcon>
          </ModalHeader>
        </DialogTitle>
        <DialogContent>
          <ConfigTable>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell rowSpan={2}>Sr. No.</TableCell>
                    <TableCell
                      rowSpan={2}
                      align="center"
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        borderLeft: "1px solid #e0e0e0",
                      }}
                    >
                      Id
                    </TableCell>
                    <TableCell
                      rowSpan={2}
                      align="center"
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        borderLeft: "1px solid #e0e0e0",
                      }}
                    >
                      Image
                    </TableCell>
                    <TableCell colSpan={7} align="center">
                      Specifications
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    {productOptionsList.length > 0 &&
                      Object.keys(
                        JSON.parse(productOptionsList?.[0]?.json)
                      ).map((v) => <TableCell align="center">{v}</TableCell>)}
                    <TableCell
                      rowSpan={2}
                      align="center"
                      sx={{ borderLeft: "1px solid #e0e0e0" }}
                    >
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productOptionsList.map((row, i) => (
                    <>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {RenderSerialNo(i, page)}
                        </TableCell>
                        <TableCell align="center">{row?.id ?? "--"}</TableCell>
                        <TableCell align="center">
                          {row?.images ?? "--"}
                        </TableCell>
                        {row.value.split("|").map((v, i) => (
                          <TableCell align="center">{v}</TableCell>
                        ))}

                        <TableCell align="center">
                          {row?.price ? row.price : "--"}
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ConfigTable>
        </DialogContent>
        {lastPage > 1 && (
          <Stack spacing={2} mb={2} sx={{ display: "flex" }}>
            <Pagination
              sx={{ marginLeft: "auto !important" }}
              size="small"
              count={lastPage}
              page={page}
              onChange={(e, page) => {
                setPage(page);
              }}
            />
          </Stack>
        )}
      </Dialog>
    </React.Fragment>
  );
}
