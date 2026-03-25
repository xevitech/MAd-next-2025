import React, { useEffect, useState } from "react";
import { GreenBtn, SeeAllFeature } from "../../styles";
import {
  Box,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import { apiClient } from "@/components/common/common";
import EmptyPage from "@/components/common/EmptyPage";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "@/components/common/commonStyle";

const columns: any = [

  {
    field: "planName",
    headerName: "Plan Name/Features",
    minWidth: 100,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => {
      return <Box>
        <Typography sx={{ fontSize: '14px !important', fontWeight: '600 !important', color: '#1A2027 !important' }}>
          Plan Name/Features
        </Typography>
      </Box>;
    },
    renderCell: (cellValues) => {
      return <Box>
        <Typography> {cellValues?.row?.plan_name}</Typography>
      </Box>;
    },
  },
  {
    field: "date",
    headerName: "Date",
    minWidth: 100,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => {
      return <Box>
        <Typography sx={{ fontSize: '14px !important', fontWeight: '600 !important', color: '#1A2027 !important' }}>
          Date
        </Typography>
      </Box>;
    },
    renderCell: (cellValues) => {
      return <Box>
        <Typography> {cellValues?.row?.payment_date}</Typography>
      </Box>;
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    minWidth: 100,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => {
      return <Box>
        <Typography sx={{ fontSize: '14px !important', fontWeight: '600 !important', color: '#1A2027 !important' }}>
          Amount
        </Typography>
      </Box>;
    },
    renderCell: (cellValues) => {
      return <Box>
        <Typography>$ {cellValues?.row?.amount}</Typography>
      </Box>;
    },
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 100,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => {
      return <Box>
        <Typography sx={{ fontSize: '14px !important', fontWeight: '600 !important', color: '#1A2027 !important' }}>
          Status
        </Typography>
      </Box>;
    },
    renderCell: (cellValues) => {
      return <Box>
        <Typography>{cellValues?.row?.status}</Typography>
      </Box>;
    },
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 100,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => {
      return <Box>
        <Typography sx={{ fontSize: '14px !important', fontWeight: '600 !important', color: '#1A2027 !important' }}>
          Description
        </Typography>
      </Box>;
    },
    renderCell: (cellValues) => {
      return <Box>
        <Typography>{cellValues?.row?.description}</Typography>
      </Box>;
    },
  },
  {
    field: "method",
    headerName: "Method",
    minWidth: 100,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => {
      return <Box>
        <Typography sx={{ fontSize: '14px !important', fontWeight: '600 !important', color: '#1A2027 !important' }}>
          Method
        </Typography>
      </Box>;
    },
    renderCell: (cellValues) => {
      return <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
        <img src="/assets/visa-logo.svg" alt="" /><Typography>{cellValues?.row?.payment_method}</Typography>
      </Box>;
    },
  },
  {
    field: "invoice",
    headerName: "Invoice",
    minWidth: 100,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => {
      return <Box>
        <Typography sx={{ fontSize: '14px !important', fontWeight: '600 !important', color: '#1A2027 !important' }}>
          Invoice
        </Typography>
      </Box>;
    },
    renderCell: (cellValues) => {
      return <Box sx={{}}>
        <img src="/assets/pdf icon.svg" alt="" />
      </Box>;
    },
  },


];

function Payment() {
  const [paymentList, setPaymentList] = useState<any>([]);

  useEffect(() => {
    FetchPaymentDetail();
  }, []);

  const FetchPaymentDetail = async () => {
    let formData = new FormData();
    formData.append("tab_type", "payment");
    let response = await apiClient(
      "users/billing_info",
      "post",
      {
        body: formData,
      },
      true
    );
    if (response.status === 200) {
      setPaymentList(response.data);
    }
  };
  return (
    <div>
      <Box p={2} display="flex" flexDirection="column" gap={2}>
        <Paper>
          {paymentList.length > 0 ? (
          <Box sx={{ width: "100%" }}>
            <DataGridPro
              sx={DataGridStyle}
              autoHeight
              pageSize={5}
              rowHeight={46}
              rowsPerPageOptions={[5]}
              pagination
              rows={paymentList}
              columns={columns}
              components={{
                Toolbar: () => (
                  <Box sx={{ padding: '8px 0px 0px 10px' }}>
                    <Typography sx={{ fontSize: '18px !important', fontWeight: '500 !important', color: '#231f20 !important' }}>Payment History</Typography>
                  </Box>
                )
              }}
            />
          </Box>
          ):(
            <EmptyPage
              text="Payment History"
              actiontext={false}
              logo='/assets/payment-history.svg'
            />
          )}
        </Paper>
        <Paper>
          <TableContainer component={Paper} elevation={2}>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}

export default Payment;
