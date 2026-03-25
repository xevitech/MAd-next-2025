import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { DataGridPro,GridColDef } from "@mui/x-data-grid-pro";
import { DataGridStyle, SmallOutineBtn } from "../commonStyle";
import { InviteMeetingOuter } from "../style";
const ScoringRules = () => {
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Rule Name",
      width: 200,
      flex: 1,
      headerAlign: 'center',
  align: 'center'

    },
    {
      field: "date",
      headerName: "Positive",
      width: 250,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },

    {
      field: "status",
      headerName: "Negative",
      width: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: "positivepoints",
      headerName: "Positive Touch Points",
      width: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: "negetivepoints",
      headerName: "Negative Touch Points",
      width: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: "total",
      headerName: "Total Touch Points",
      width: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: "score",
      headerName: "Score",
      width: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
  ];

  const rows = [
    {
      id: 1,
      status: "30",
      title: "Scoring 1",
      date: "0",
      positivepoints: "0",
      negetivepoints: "0",
      total: "0",
      score: "30",

    },
    {
      id: 2,
      status: "30",
      title: "Scoring 1",
      date: "0",
      positivepoints: "0",
      negetivepoints: "0",
      total: "0",
      score: "30",
    },
    {
      id: 3,
      status: "30",
      title: "Scoring 1",
      date: "0",
      positivepoints: "0",
      negetivepoints: "0",
      total: "0",
      score: "30",
    },
    {
      id: 4,
      status: "30",
      title: "Scoring 1",
      date: "0",
      positivepoints: "0",
      negetivepoints: "0",
      total: "0",
      score: "30",
    },
    {
      id: 5,
      status: "30",
      title: "Scoring 1",
      date: "0",
      positivepoints: "0",
      negetivepoints: "0",
      total: "0",
      score: "30",
    },
    {
      id: 6,
      status: "30",
      title: "Scoring 1",
      date: "0",
      positivepoints: "0",
      negetivepoints: "0",
      total: "0",
      score: "30",
    },
    {
      id: 7,
      status: "30",
      title: "Scoring 1",
      date: "0",
      positivepoints: "0",
      negetivepoints: "0",
      total: "0",
      score: "30",
    },
    {
      id: 8,
      status: "30",
      title: "Scoring 1",
      date: "0",
      positivepoints: "0",
      negetivepoints: "0",
      total: "0",
      score: "30",
    },
    {
      id: 9,
      status: "30",
      title: "Scoring 1",
      date: "0",
      positivepoints: "0",
      negetivepoints: "0",
      total: "0",
      score: "30",
    },
  ];
  return (
    <>
      <InviteMeetingOuter>
        <Box style={{ height: 500, width: "100%" }} className="seller_toptable">
          <DataGridPro
           pagination
            rows={rows}
            columns={columns}
            loading={rows.length === 0}
            rowHeight={38}
            // checkboxSelection
            sx={DataGridStyle}
          />
        </Box>
      </InviteMeetingOuter>
    </>
  );
};

export default ScoringRules;
