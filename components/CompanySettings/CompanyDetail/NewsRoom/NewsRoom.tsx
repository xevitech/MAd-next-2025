import { Redoutlinebtn } from "@/components/common/buttons/ButtonsVariations";
import { Avatar, AvatarGroup, Box, Divider, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GridColDef } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import {
  DeleteSelectedDivider,
  DeleteSelectedInnerBox,
  DeleteSelectedOuterBox,
  DeleteSelectedRedText,
  DeleteSelectedText,
  FactorySmallTextContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import {
  OuterContainer,
  HeaderContainer,
  HeaderTextContainer,
  EditTextContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DataGridPro } from "@mui/x-data-grid-pro";

import { LicenseInfo } from "@mui/x-license-pro";

import { apiClient } from "@/components/common/common";
import AddNewsRoom from "./AddNewsRoom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import { MyAppContext } from "@/contextApi/appContext";
import EmptyPage from "@/components/common/EmptyPage";
import NoDataFound from "@/components/common/NoDataFound";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { OuterDiv, PencilIcon1 } from "../style";
import Image from "next/image";
import moment from "moment";
import NewsSkeleton from "../CompanySkeletons/NewsRoom";
import { DataGridStyle } from "@/components/common/commonStyle";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { FontContainer } from "@/components/SellerSubaccount/styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ServicesSkeleton from "../Services/Skeleton";
import {
  LargeTextContainer,
  SmallTextContainer,
} from "@/components/common/EmptyPage/styles";
import PopoverSlider from "@/components/miniSite/PopoverSlider";

LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const NewsRoom = () => {
  const [newsRoomList, setNewsRoomList] = useState<any>([]);
  const [cloneNewsList, setCloneNewsist] = useState<any>([]);
  const [addMore, setAddMore] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [editColumn, setEditColumn] = useState<any>({});
  const [deleteID, setDeleteID] = useState<any>([]);
  let List = [1, 2, 3, 4, 5];
  const [loader, setLoader] = useState<boolean>(false);

  const iconStyle = { fontSize: "18px", cursor: "pointer" };
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [viewImage, setViewImage] = useState<boolean>(false);
  const [NewsRoomSearch, setNewsRoomSearch] = useState<any>("");
  const [filterrow, setfilterrow] = useState(false);

  const fetchNewsRoomList = async () => {
    let response = await apiClient("company_profile/news/list", "get");
    if (response?.status === 200) {
      setNewsRoomList(response?.data);
      setCloneNewsist(response?.data);
      setDeleteID([]);
    }
    setLoader(false);
    setCompleteScreenLoader(false);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAddMore("add-more");
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    setLoader(true);
    fetchNewsRoomList();
  }, []);

  const FilterTable = (e) => {
    if (e.target.value.trim() !== "") {
      setNewsRoomSearch(e.target.value);
      setNewsRoomList(cloneNewsList);

      let results = cloneNewsList.filter((val) => {
        return (
          val.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          val.description.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      if (results.length == 0) {
        setfilterrow(true);
      } else {
        setfilterrow(false);
        setNewsRoomList(results);
      }

      return;
    } else {
      setNewsRoomSearch("");
      setfilterrow(false);
      setNewsRoomList(cloneNewsList);
    }
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: "500px",
        "@media screen and (max-width:600px)": {
          width: "250px",
        },
      }}
      role="presentation"
    >
      <AddNewsRoom
        type={addMore}
        setAddMore={setAddMore}
        fetchNewsRoomList={fetchNewsRoomList}
        editColumn={addMore === "edit" ? editColumn : {}}
        setEditColumn={setEditColumn}
      />
    </Box>
  );

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", minWidth: 300 },
    {
      field: "image",
      headerName: "Image",
      minWidth: 120,
      flex: 1,
      align: "left",
      headerAlign: "left",
      sortable: false,
      renderCell: (params) => (
        <AvatarGroup
        max={3}
        onClick={() => {
          if (params?.row?.image) {
            setViewImage(true);

            setImageUrl(params.row.image); 
          }
        }}
      >
        {params?.row?.image?.map(
          (
            imageObj,
            index 
          ) => (
            <Avatar
              key={index}
              sx={{ width: 36, height: 36 }}
              alt={`Avatar ${index + 1}`}
              src={imageObj?.source || ""} 
            />
          )
        )}
      </AvatarGroup>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 100,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "start date ",
      headerName: "Start Date ",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 100,
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) =>
        moment(params.row.start_date).format("DD/MM/YYYY"),
    },
    {
      field: "End Date ",
      headerName: "End Date ",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 100,
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => moment(params.row.end_date).format("DD/MM/YYYY"),
    },
    {
      field: "Status",
      headerName: "Status",
      sortable: false,
      minWidth: 100,
      flex: 1,
      align: "left",
      headerAlign: "left",
      // renderCell: (params) => params.row.status,
      renderCell: (params) => (
        <Box sx={{
          backgroundColor: params.row.status === "enable" ? "#ecfbe6" : "#ffe1e2",
          color: params.row.status === "enable" ? "#2a7e03" : "#d7282f",
          padding: "4px 8px",
          borderRadius: "4px",
          textAlign: "center", textTransform: "capitalize"
        }}>
          {params.row.status}
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 100,
      flex: 1,
      align: "center",
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <PencilIcon1>
            <LightTooltip placement="top" title="Edit" arrow disableInteractive>
              <Image
                height={14}
                width={14}
                style={{ ...iconStyle, fontSize: "18px" }}
                src={"/assets/EditPencil.svg"}
                alt="editImage"
                onClick={() => {
                  setState({ ...state, right: true });
                  setEditColumn(params.row);
                  setAddMore("edit");
                }}
              />
            </LightTooltip>
          </PencilIcon1>{" "}
          <LightTooltip placement="top" title="Delete" arrow disableInteractive>
            <DeleteOutlineOutlinedIcon
              onClick={() => {
                setDeleteID(+params.id);
                setDeleteConfirmation(true);
              }}
              style={{ ...iconStyle, color: "#D7282F" }}
            />
          </LightTooltip>
        </>
      ),
    },
  ];

  const DeleteNewsRoom = async () => {
    let response = await apiClient(
      "company_profile/services_news/delete",
      "post",
      {
        body: { ids: deleteID.toString() },
      }
    );
    if (response.status == 200) toast.success("Record Deleted Successfully");
    setDeleteConfirmation(false);
    fetchNewsRoomList();
  };

  return (
    <Grid container spacing={3} className="company_detail_service">
      <Grid item xs={12}>
        <OuterContainer>
          {deleteConfirmation && (
            <DeleteDialog
              open={deleteConfirmation}
              handleClose={setDeleteConfirmation}
              text="News room"
              onClickAction={DeleteNewsRoom}
            />
          )}
          {viewImage && (
            <PopoverSlider
              open={viewImage}
              handleClose={() => setViewImage(false)}
              activedata={{ images: imageUrl }}
              rowData={[]}
            />
          )}
          <HeaderContainer style={{ paddingLeft: 0 }}>
            <div>
              <HeaderTextContainer>Newsroom</HeaderTextContainer>

              <FactorySmallTextContainer>
                Manage Information related to NewsRoom
              </FactorySmallTextContainer>
            </div>
            <EditTextContainer>
              {
                <Redoutlinebtn
                  sx={{
                    "@media screen and (max-width:600px)": {
                      marginBottom: "10px !important",
                    },
                  }}
                  height={"36px"}
                  width={"160px"}
                  onClick={toggleDrawer("right", true)}
                >
                  Add Newsroom
                  <AddCircleOutlineIcon sx={{ marginLeft: 1, height: 24 }} />
                </Redoutlinebtn>
              }
            </EditTextContainer>
          </HeaderContainer>
          <Divider variant="middle" style={{ margin: 0 }} />

          <>
            <DeleteSelectedOuterBox>
           { newsRoomList.length >0  && (
              <TextField
                placeholder="Search Newsroom"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "4px",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(0, 0, 0, 0.4)",
                  },
                }}
                value={NewsRoomSearch}
                onChange={FilterTable}
                InputProps={{
                  style: { color: "#000" },
                }}
              />
              )}
              <DeleteSelectedInnerBox>
              { newsRoomList.length >0  && (
                <Box>
                  <DeleteSelectedText>
                    Newsroom Selected ({deleteID.length})
                  </DeleteSelectedText>
                </Box>
              )}
               { newsRoomList.length >0  && (
                <DeleteSelectedDivider></DeleteSelectedDivider>
               )}
                {deleteID.length > 0 && (
                  <Box>
                    <DeleteSelectedRedText
                      onClick={() => {
                        setDeleteConfirmation(true);
                      }}
                    >
                      Delete Selected
                      <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                    </DeleteSelectedRedText>
                  </Box>
                )}
              </DeleteSelectedInnerBox>
            </DeleteSelectedOuterBox>

            <Box
              sx={{
                width: "100%",
              }}
            >
              {loader ? (
                <>
                  {List.map((v, i) => (
                    <ServicesSkeleton key={i} />
                  ))}
                </>
              ) : (
                !filterrow &&
                newsRoomList.length == 0 && (
                  <Box
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ minHeight: "300px", display: "flex" }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Image
                        height={80}
                        width={80}
                        alt="No product added"
                        src={"/assets/images/newsRm.svg"}
                      />
                      <LargeTextContainer>
                        No News Room Added
                      </LargeTextContainer>
                      <SmallTextContainer>
                        You have not managed any NewsRoom yet.
                      </SmallTextContainer>
                      <SmallTextContainer
                        value={{ cursor: "pointer", color: "#D7282F" }}
                        height={"36px"}
                        width={"140px"}
                        onClick={toggleDrawer("right", true)}
                      >
                        Click here to add News Room
                      </SmallTextContainer>
                    </div>
                  </Box>
                )
              )}
              {filterrow && <NoDataFound />}

              {!filterrow && newsRoomList.length > 0 && (
                <DataGridPro
                  style={{
                    border: "5px",
                    borderRadius: "10px",
                    borderColor: "transparent",
                  }}
                  localeText={{
                    columnMenuShowColumns: "Manage Columns",
                  }}
                  pagination
                  rows={!loader ? newsRoomList : []}
                  loading={loader}
                  columns={columns}
                  pageSize={5}
                  rowHeight={46}
                  autoHeight
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                  sx={DataGridStyle}
                  experimentalFeatures={{ newEditingApi: true }}
                  onSelectionModelChange={(newSelectionModel) =>
                    setDeleteID(newSelectionModel)
                  }
                  hideFooterSelectedRowCount={true}
                  components={{
                    NoRowsOverlay: () => (
                      <>
                        {loader ? (
                          <>
                            {List.map((v, i) => (
                              <NewsSkeleton key={i} />
                            ))}
                          </>
                        ) : (
                          <>
                            {cloneNewsList.length !== newsRoomList.length ? (
                              <NoDataFound />
                            ) : (
                              <Stack
                                height="100%"
                                alignItems="center"
                                justifyContent="center"
                                position={"relative"}
                                zIndex="10"
                              >
                                <EmptyPage
                                  text={"Newsroom"}
                                  onClickHandler={toggleDrawer("right", true)}
                                  logo="/assets/Group.svg"
                                />
                              </Stack>
                            )}
                          </>
                        )}
                      </>
                    ),
                    LoadingOverlay: () => {
                      return (
                        <>
                          {List.map((v, i) => (
                            <NewsSkeleton key={i} />
                          ))}
                        </>
                      );
                    },
                  }}
                />
              )}
            </Box>
          </>
        </OuterContainer>
      </Grid>
      {addMore && (
        <div className="container2">
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={() => { }}
            onOpen={toggleDrawer("right", true)}
          >
            {list("right")}
          </SwipeableDrawer>
        </div>
      )}
    </Grid>
  );
};
export default NewsRoom;
