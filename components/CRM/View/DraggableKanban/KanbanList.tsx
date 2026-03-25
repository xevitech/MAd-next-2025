import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Link,
  Typography,
  styled,
  Grid,
  Tooltip,
  Chip,
  Popover,
  Popper,
  Fade,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Checkbox from "@mui/material/Checkbox";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Image from "next/image";
import { countriesList as countries } from "@/utils/countriesphp";
import {
  CardHeading,
  KanbanItemGreen,
  PriceBoxV,
  KanbanItem,
  ItemInfo,
  CardLayout,
  CardStyle,
  CardInfo,
  AddIcon,
  CardMail,
  CompanyInfo,
  ComanyIcon,
  AnnualRevenue,
  PriceValue,
  LeadNameValue,
  RevenueStack,
  EmailStack,
  KanbanItemHeader,
  LeadNumber,
  KanbanBoxContainer,
  LabelChipStack,
  CustomChip,
  CustomChip2,
  MoreTags,
  MoreTag,
  KanbanQuickAdd,
} from "../style";
import { useAppDispatch } from "redux/store";
import {
  EditSingleLead,
  setActivityType,
  setCheckedKanban,
  setCommonTabs,
  setDetailActiveTab,
  setDetailsData,
  setKanbanList,
  setSelectedDataEmail,
  setSelectedDataIds,
  setShowButtonsAsperDataChecked,
} from "@/hooks/UseCreateFormData";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Flag } from "@/components/common/countryFlag";
import { QuickAddMenu } from "../../commonStyle";
const KanbanList = ({
  columnId,
  column,
  selectedChecked,
  setSelectedChecked,
  snapshot
}) => {
  const dispatch = useAppDispatch();
  const { crmUniqueId, kanbanLists, selectedDataIds, selectedDataEmails } =
    useSelector((state: any) => state.formList);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [moreTags, setMoreTags] = useState<any>("");
  const handleAdd = (event: React.MouseEvent<HTMLElement>, item) => {
    setAnchorEl1(event.currentTarget);
    localStorage.setItem("details", JSON.stringify(item));
    dispatch(setDetailsData(item));
  };
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClose = () => {
    setAnchorEl(null);
    setMoreTags("");
    setOpen(false);
    dispatch(setShowButtonsAsperDataChecked(false));
  };

  const handleRedirect = (value) => {
    const payload = {
      unique_id: value?.unique_id,
      crm_user_form_unique_id: crmUniqueId,
    };
    dispatch(setDetailsData(value));
    dispatch(EditSingleLead(payload));
    localStorage.setItem("details", JSON.stringify(value));
    router.push(`leads/${value?.unique_id}`);
  };


  const handleClick = (event: React.MouseEvent<HTMLElement>, item) => {
    setAnchorEl(event.currentTarget);
    setMoreTags(item?.unique_id);
    setOpen((previousOpen) => !previousOpen);
  };
  const handleRedirectTab = (type, item) => {
    // dispatch(setDetailTab())

    dispatch(setDetailActiveTab(2));
    dispatch(setActivityType(type));
    setAnchorEl1(null);
    router.push(`leads/${item?.unique_id}`);
  };

  const handleCheckKanabn = (e, item, column) => {
    // checkbox selection for kanban single data-----
    const checkedKanabn = { ...kanbanLists };
    const getData = [...checkedKanabn[columnId].data];
    const updateList = getData.map((items) => ({
      ...items,
      selected: items?.id === item?.id ? e.target.checked : items.selected,
    }));
    const updateKanban = {
      ...checkedKanabn,
      [columnId]: {
        ...checkedKanabn[columnId],
        data: updateList,
      },
    };
    dispatch(setKanbanList(updateKanban));
    if (e.target.checked) {
      dispatch(setShowButtonsAsperDataChecked(true));
      setSelectedChecked((pre) => [
        ...pre,
        {
          id: item?.unique_id,
          crm_user_form_unique_id: item?.crm_user_form_unique_id,
        },
      ]);

      dispatch(
        setSelectedDataIds([...selectedDataIds, parseInt(item.unique_id)])
      );
      dispatch(
        setSelectedDataEmail([
          ...selectedDataEmails,
          {
            id: item?.unique_id,
            crm_user_form_unique_id: item?.crm_user_form_unique_id,
            mail: item?.mail,
          },
        ])
      );
    } else {
      setSelectedChecked((pre) =>
        pre.filter((id) => id?.id !== item?.unique_id)
      );
      dispatch(setShowButtonsAsperDataChecked(false));
    }
  };

  return (
    <>
      {column?.data?.map((item, index) => {
        return (
          <Draggable draggableId={item?.id?.toString()} index={index}>
            {(provided,_snapshot) => (
              <CardLayout
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                key={index}
              >
                <CardStyle  style={{
                 backgroundColor: snapshot.draggingFromThisWith ? column?.["color_code"].split("_")[0] : '#fff',
          }} >
                  <CardInfo>
                    {/* {item?.Lead_Owner&&<LeadNameValue variant="h5">{item?.Lead_Owner}</LeadNameValue>} */}
                    <LeadNameValue variant="h5" onClick={() => handleRedirect(item)}>
                      {item?.First_Name} {item?.Last_Name}
                    </LeadNameValue>
                    <Checkbox
                      size="small"
                      checked={selectedChecked.some(
                        (items) => items?.id === item.unique_id
                      )}
                      onChange={(e) => handleCheckKanabn(e, item, column)}
                    />
                  </CardInfo>
                  {item?.mail && (
                    <EmailStack direction="row" alignItems="center" gap={1} onClick={() => handleRedirect(item)}>
                      <EmailOutlinedIcon />
                      <CardMail
                        value={column?.["color_code"].split("_")[0]}
                        variant="body1"
                      >
                        {item?.mail}
                      </CardMail>
                    </EmailStack>
                  )}
                  {item?.Account && (
                    <CompanyInfo onClick={() => handleRedirect(item)}>
                      <ComanyIcon value={column?.["color_code"].split("_")[0]}>
                        {/* <LocationCityIcon /> */}
                        <i className="icon-accountType"></i>
                      </ComanyIcon>
                      <Typography>{item?.Account}</Typography>
                    </CompanyInfo>
                  )}
                  <AnnualRevenue>
                    <Grid container spacing={0.5} sx={{ alignItems: "center" }}>
                      <Grid item xs={12} sm={12} md={12} onClick={() => handleRedirect(item)}>
                        {item?.Annual_Revenue && (
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={14}
                              height={14}
                            />
                            <Typography>{item?.Annual_Revenue}</Typography>
                          </RevenueStack>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={12} md={12}>
                        <RevenueStack
                          direction="row"
                          alignItems="center"
                          gap={0.5}
                          justifyContent={"space-between"}
                        >
                          <Typography fontWeight={400} onClick={() => handleRedirect(item)}>
                            <Flag
                              countryCode={item?.Country ? item?.Country : "JO"}
                            />
                            {item?.Country
                              ? countries.find(
                                  (ele) =>
                                    ele.code == item?.Country ||
                                    ele.name == item?.Country
                                )?.name
                              : "Jordan"}{" "}
                          </Typography>
                          <Typography fontWeight={400} onClick={() => handleRedirect(item)}>
                            {item?.Street}
                          </Typography>
                          <Link>
                            <span onClick={(e) => handleAdd(e, item)}>
                              <AddIcon />
                            </span>
                            <KanbanQuickAdd
                              anchorEl={anchorEl1}
                              id="account-menu"
                              open={Boolean(anchorEl1)}
                              onClose={() => setAnchorEl1(null)}
                              onClick={() => setAnchorEl1(null)}
                              PaperProps={{
                                elevation: 0,
                                sx: {
                                  width: "120px",
                                  overflow: "visible",
                                  filter:
                                    "drop-shadow(0px 2px 4px rgba(0,0,0,0.10))",
                                  mt: "1px",
                                  ml: 1,
                                  "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                  },
                                  "&:before": {
                                    content: '""',
                                    filter:
                                      "drop-shadow(0px 0px 1px rgba(0,0,0,0.10))",
                                    display: "block",
                                    position: "absolute",
                                    // top: 0,
                                    right: 9,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                  },
                                },
                              }}
                              transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                              }}
                              anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                              }}
                            >
                              <MenuItem
                                onClick={() => handleRedirectTab(1, item)}
                              >
                                New Task
                              </MenuItem>
                              <Divider />
                              <MenuItem
                                onClick={() => handleRedirectTab(3, item)}
                              >
                                New Meeting
                              </MenuItem>
                              <Divider />
                              <MenuItem
                                onClick={() => handleRedirectTab(2, item)}
                              >
                                New Call
                              </MenuItem>
                            </KanbanQuickAdd>
                          </Link>
                        </RevenueStack>
                      </Grid>
                    </Grid>
                  </AnnualRevenue>
                  <LabelChipStack alignItems="center">
                    {item?.tag?.length > 0 &&
                      item?.tag?.slice(0, 3)?.map(
                        (item, index) => (
                          <CustomChip
                            value={item?.background_color_code}
                            text={item?.text_code}
                          >
                            {item?.name}
                          </CustomChip>
                        )
                        // {/* <CustomChip2>Lead Source</CustomChip2>
                        // <CustomChip color="primary">Chat</CustomChip> */}
                      )}
                      <MoreTags
                        onClick={() => {
                          dispatch(
                            setSelectedDataIds([parseInt(item.unique_id)])
                          );
                          // dispatch(setSelectedDataEmail())
                          // dispatch(setShowButtonsAsperDataChecked(true));
                        }}
                      >
                        {item?.tag?.length > 3 && (
                          <div
                            aria-describedby={moreTags}
                            onClick={(e) => handleClick(e, item)}
                          >
                            and <span>{item?.tag?.length - 3} more</span>
                          </div>
                        )}
                        <Popover
                          id={moreTags}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <Typography sx={{ p: 2 }}>
                            {moreTags == item.unique_id &&
                              item?.tag?.length > 3 &&
                              item?.tag?.slice(3)?.map(
                                (item, index) => (
                                  <Box
                                    sx={{
                                      borderRadius: 6,
                                      background: "#F6F6F6",
                                      border: "1px solid #EAEAEA",
                                    }}
                                  >
                                    <MoreTag
                                      value={item?.background_color_code}
                                      text={item?.text_code}
                                    >
                                      {item?.name}
                                    </MoreTag>
                                  </Box>
                                )
                                // {/* <CustomChip2>Lead Source</CustomChip2>
                                // <CustomChip color="primary">Chat</CustomChip> */}
                              )}
                          </Typography>
                        </Popover>

                        {/* {item?.tag?.length < 3 && (
                          <>
                            <span>add tag</span>
                          </>
                        )} */}
                      </MoreTags>
                   
                  </LabelChipStack>
                </CardStyle>
              </CardLayout>
            )}
          </Draggable>
        );
      })}
    </>
  );
};

export default KanbanList;
