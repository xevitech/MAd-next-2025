import * as React from "react";
import {
  CrmTableField,
  DetailDrawerBox,
  ListActionFlex,
  ListActionStyling,
  ListGroupColumn,
  ListSocialIconTable,
  SocialLinksTooltipText,
  TableCoulmn,
  TaskRelatesTable,
} from "./style";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "../commonStyle";
import { Box, Chip, Divider, Link, SwipeableDrawer, Typography } from "@mui/material";
import {
  setShowButtonsAsperDataChecked,
  setSelectedDataIds,
  setSelectedDataEmail,
  setDetailsData,
  setCommonTabs,
  setEmailIdToSender,
  getAllFieldData,
} from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { useState } from "react";
import { useRouter } from "next/router";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { LicenseKey, SocialMediaList } from "@/components/common/common";
import { LicenseInfo } from "@mui/x-license-pro";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
LicenseInfo.setLicenseKey(LicenseKey);
const ListView = () => {
  const { savedFieldData, saveLoader, typeId, userLists, typeName } =
    useSelector((state: any) => state.formList);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [renderComponent, setRenderComponent] = useState(false);

  localStorage.setItem(
    "form_input_data",
    JSON.stringify({
      form_input_list_id: savedFieldData?.data?.filter_fields?.find(
        (item) => item.name == "Lead_Owner"
      )?.form_input_list_id,
      form_input_list_id_email: savedFieldData?.data?.filter_fields?.find(
        (item) => item.name == "mail"
      )?.form_input_list_id,
    })
  );
  const EditPopup = (cellValues) => {
    dispatch(setCommonTabs(""));
    if (typeId == 1) {
      router.push(
        `leads/${cellValues?.unique_id}/${cellValues?.crm_user_form_unique_id}`
      );
    } else if (typeId == 2) {
      router.push(
        `deals/${cellValues?.unique_id}/${cellValues?.crm_user_form_unique_id}`
      );
    } else if (typeId == 3) {
      router.push(
        `accounts/${cellValues?.unique_id}/${cellValues?.crm_user_form_unique_id}`
      );
    } else if (typeId == 4) {
      router.push(
        `contacts/${cellValues?.unique_id}/${cellValues?.crm_user_form_unique_id}`
      );
    }
  };
  const ToBeStyledTooltip = ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ tooltip: className }} />
  );
  const StyledTooltip = styled(ToBeStyledTooltip)(({ theme }) => ({
    backgroundColor: "#ebebeb",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    fontSize: 12,
    fontFamily: "Open Sans !important",
    border: "1px solid #dadde9",
  }));

  // React.useEffect(() => {
  //     dispatch(getAllFieldData())
  // }, [dispatch])

  const columns = savedFieldData?.data?.form_fields_data
    ? savedFieldData.data.form_fields_data
    .filter((v) => v.name.toLowerCase() !== "description") // Ensure comparison is case insensitive
    
    .map((v, i) => ({
      editable: false,
      field: v.name,
      headerName:
        v.name == "id"
          ? `${typeName.endsWith("s") ? typeName.slice(0, -1) : typeName} Id`
          : v.name == "mail"
            ? "Email"
            : v.name == "tag"
              ? "Tag"
              : v.name?.replaceAll("_", " ").replaceAll(".", ""),
              
      minWidth: 220,
      flex: 1,
      renderCell: (cellValues, row) => {
        const formatPhoneNumber = (phoneNumber) => {
          if (phoneNumber && !phoneNumber.includes("+")) {
            return `+${phoneNumber}`;
          }
          return phoneNumber;
        };
        return (
          <CrmTableField
            className="MuiDataGrid-cellContent"
            // onClick={() => EditPopup(cellValues.row)}
          >
            <div className="crmlanguagefield">
              {v.name == "Language" ? (
                cellValues?.value
                  ?.split(",")
                  .map((ele, index) => (
                    <Chip key={index} size="small" variant="filled" label={ele} />
                  ))
              ) : v.field_type == "checkbox" ? (
                <>
                  {cellValues.value != 1 ? (
                    <CancelOutlinedIcon
                      sx={{ color: "#d7282f", fontSize: "16px" }}
                    />
                  ) : (
                    <TaskAltSharpIcon
                      sx={{ color: "green !important", fontSize: "16px" }}
                    />
                  )}
                </>
              ) : v.name == "Social" ? (
                <div className="sociallinksValueShow">
                  {cellValues?.value &&
                    JSON.parse(cellValues?.value)?.map((social, index) => (
                      <ListSocialIconTable
                        onClick={() => {
                          window.open(social?.value, "_blank", "noreferrer");
                        }}
                      >
                        <StyledTooltip
                          title={
                            <SocialLinksTooltipText>
                              <Typography>
                                <Link>{social?.value}</Link>
                              </Typography>
                            </SocialLinksTooltipText>
                          }
                        >
                          {/* <span className="relatedWithValueShow"> */}
                          <span>
                            <Typography>
                              {
                                SocialMediaList.find(
                                  (v) =>
                                    v.name.toLowerCase() ===
                                    social?.platform.toLowerCase()
                                )?.logo
                              }
                            </Typography>
                          </span>
                        </StyledTooltip>
                      </ListSocialIconTable>
                    ))}
                </div>
              ) : v.name == "tag" ? (
                <Box sx={{ display: "flex", position: "relative" }}>
                  <Box>
                    {cellValues?.value?.map((ele, index) => (
                      <Chip
                        key={index}
                        size="small"
                        variant="filled"
                        label={ele.name}
                        sx={{
                          color: "#fff",
                          background: ele.background_color_code,
                          border: `1px solid ${ele.background_color_code}`,
                        }}
                      />
                    ))}
                  </Box>
                  {/* <Box
                  sx={{
                    background:
                      "linear-gradient(270deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 100%)",
                    position: "absolute",
                    right: "0",
                    height: "100%",
                    width: "120px",
                  }}
                >
                </Box> */}
                </Box>
              ) : v.field_type == "phone" ? (
                <div>{formatPhoneNumber(cellValues?.value)}</div>
              ) : v.name == "Lead_Owner" ||
                v.name == "Deal_Owner" ||
                v.name == "Account_Owner" ||
                v.name == "Contact_Owner" ? (
                <>
                  <div>
                    {" "}
                    {v.name == "Lead_Owner" ||
                      v.name == "Deal_Owner" ||
                      v.name == "Account_Owner" ||
                      v.name == "Contact_Owner"
                      ? userLists?.find((item) => item.email == cellValues.value)
                        ?.name
                      : cellValues.value}{" "}
                  </div>
                </>
              ) : cellValues?.row?.id == cellValues?.value ? (
                <div>{cellValues?.value}</div>
              ) : (
                <StyledTooltip title={cellValues?.value} placement="left">
                  <div>
                    {cellValues?.value?.length > 25
                      ? `${cellValues?.value?.slice(0, 25)}...`
                      : cellValues?.value}
                  </div>
                </StyledTooltip>
              )}
            </div>
          </CrmTableField>
        );
      },
    }
    )) : [];
  // Add the action column
  columns.push({
    field: "actions",
    headerName: "Actions",
    minWidth: 100,
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <ListActionFlex>
        <ListActionStyling>
          <img onClick={() => EditPopup(cellValues.row)}
            src="/assets/editicon.svg"
            alt="Edit"
            width={15}
            height={16}
          />{" "}
        </ListActionStyling>
        <Divider orientation="vertical" variant="middle" flexItem />

        <ListActionStyling>
          <DeleteOutlinedIcon />
        </ListActionStyling>

      </ListActionFlex>
    ),
  });
  // Add the Group column
  columns.push({
    field: "group",
    headerName: "Group",
    minWidth: 100,
    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <ListGroupColumn>
        <Typography>Group1</Typography>
      </ListGroupColumn>
    ),
  });


  const handleCellClick = (param, event) => {
    dispatch(setEmailIdToSender(param.row));
    if (param.field != "__check__") setOpen(true);
    param.field && event.stopPropagation();
    setRenderComponent(true);
  };

  return (
    <>
      <TableCoulmn sx={{ /*height: 525,*/ width: "100%" }}>
        <DataGridPro
          onCellClick={handleCellClick}
          pagination
          rows={savedFieldData?.data?.data || []}
          columns={columns || []}
          loading={saveLoader}
          // rowHeight={42}
          getRowHeight={() => "auto"}
          checkboxSelection
          sx={DataGridStyle}
          pageSize={14}
          headerHeight={40}
          autoHeight={false}
          initialState={{
            pinnedColumns: {
              right: ["actions"],
            },
          }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = savedFieldData?.data?.data.filter((row) =>
              selectedIDs.has(row.id)
            );
            const detailsData = savedFieldData?.data?.data.find(
              (item) => item.id == ids
            );

            dispatch(setSelectedDataIds(ids));
            if (selectedRowData?.length > 0) {
              dispatch(setSelectedDataEmail(selectedRowData));
              dispatch(setShowButtonsAsperDataChecked(true));
            } else {
              dispatch(setSelectedDataEmail([]));
              dispatch(setShowButtonsAsperDataChecked(false));
            }
          }}
        />
      </TableCoulmn>
    </>
  );
};
export default ListView;
