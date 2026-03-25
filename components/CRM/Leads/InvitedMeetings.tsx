import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle, SmallOutineBtn } from "../commonStyle";
import { Typography } from "@mui/material";
import { InviteActionBtn, InviteMeetingOuter, InviteTopBar } from "../style";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { deleteInvitedMeetings, getAllListOfInvitedMeetings } from "@/hooks/UseCreateFormData";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import moment from "moment";
import Image from "next/image";
const InvitedMeetings = () => {
  const dispatch = useAppDispatch()
  const { crmMeetingLoader, invitedMeetings } = useSelector((state: any) => state.formList);

  const columns = [
    {
      field: "title",
      headerName: "Title",
      minwidth: 200,
      flex: 1,
    },
    {
      field: "from",
      headerName: "Meeting Date",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            {moment(params?.row?.from).format('ddd MMM DD YYYY HH:mm:ss')} , {moment(params?.row?.to).format('ddd MMM DD YYYY HH:mm:ss')}
          </>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      minwidth: 200,
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <span style={{ textTransform: 'capitalize' }}>{cellValues.row.status}</span>
        )
      }
    },
    {
      field: "id",
      headerName: "Action",
      minwidth: 200,
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
            {/* <Image
              src="/assets/EditPencil.svg"
              onClick={() => {
                // router.push(`/products/edit/${id}`);
              }}
              alt="Edit"
              width={15}
              height={16}
              style={{ color: "#231F20" }}
            /> */}
            <DeleteTwoToneIcon
              onClick={() => {
                dispatch(deleteInvitedMeetings(cellValues?.row?.id))
              }}
              style={{
                width: "20px",
                height: "20px",
                color: "#d7282f",
              }}
            />
          </>
        );
      },
    },
  ];



  useEffect(() => {
    dispatch(getAllListOfInvitedMeetings())
  }, [dispatch])

  return (
    <>
      <InviteMeetingOuter>
        <InviteTopBar>
          <Typography>Invited Meeting</Typography>
        </InviteTopBar>
        <Box style={{ height: 500, width: "100%" }}>
          <DataGridPro
            pagination
            rows={invitedMeetings ? invitedMeetings : []}
            columns={columns}
            loading={crmMeetingLoader}
            rowHeight={38}
            sx={DataGridStyle}
          />
        </Box>
      </InviteMeetingOuter>
    </>
  );
};

export default InvitedMeetings;
