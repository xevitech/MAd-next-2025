import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  SwipeableDrawer,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import {
  ContainerHeader,
  ContainerHeaderText,
  ContentInnerContainer,
} from "@/components/profile/common";
import useAppContext from "@/hooks/useAppContext";
import Image from "next/image";
import { PencilIcon1 } from "@/components/CompanySettings/CompanyDetail/style";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { Redoutlinebtn } from "@/components/common/buttons/ButtonsVariations";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  ComDetailCarouselDialog,
  ComDetailCarouselHead,
  TradeShowImages,
} from "../styles";
import {
  DeleteSelectedDivider,
  DeleteSelectedInnerBox,
  DeleteSelectedOuterBox,
  DeleteSelectedRedText,
  DeleteSelectedText,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import Tradeshowform from "./tradeshowform";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { apiClient, getCountryNameByCode } from "@/components/common/common";
import EmptyPage from "@/components/common/EmptyPage";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { getCompanyProfile } from "@/hooks/company";
import { useDispatch } from "react-redux";
import {
  DataGridPro,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DataGridStyle } from "@/components/common/commonStyle";
import { DialogContent, IconButton } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TradeShowSkeleton from "./Skeleton/TradeShowSkeleton";
import { Flag } from "@/components/common/countryFlag";

const tradeShows = [
  {
    id: 1,
    name: "International Tech Expo",
    date: "28-11-2024",
    country: "United States",
    photos: ["photo1.jpg", "photo2.jpg"],
    instructions: "Bring business cards and brochures.",
  },
  {
    id: 2,
    name: "Green Energy Summit",
    date: "28-11-2024",
    country: "Germany",
    photos: ["photo3.jpg", "photo4.jpg"],
    instructions: "Dress formally and prepare a 5-minute pitch.",
  },

  {
    id: 3,
    name: "International Tech Expo",
    date: "28-11-2024",
    country: "United States",
    photos: ["photo1.jpg", "photo2.jpg"],
    instructions: "Bring business cards and brochures.",
  },
  {
    id: 4,
    name: "Green Energy Summit",
    date: "28-11-2024",
    country: "Germany",
    photos: ["photo3.jpg", "photo4.jpg"],
    instructions: "Dress formally and prepare a 5-minute pitch.",
  },
];

export const Textarea = styled(BaseTextareaAutosize)({
  width: "100%",
  height: "100px !important",
  overflow: "scroll",
  borderColor: "rgba(0, 0, 0, 0.23)",
  borderRadius: "6px",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#929296",
  lineHeight: "23px",
  padding: "8px",
  resize: "none",
  outline: "none",
  "&:hover": {
    borderColor: "black",
  },
});

export default function Tradeshow() {
  const { breakPoints } = useAppContext();
  const [multipleTrade, setMultipleTrade] = useState<any>(null);
  const [addMore, setAddMore] = useState<any>("");
  const [defaultValues, setDefalultValues] = useState<any>({});
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<any>([]);
  const [loader, setLoader] = useState(true);

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
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Trade Show Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "country",
      headerName: "Host Country/Region",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const hostCountry = params.row.country_;
        const countryName = getCountryNameByCode(hostCountry);
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {hostCountry ? <Flag countryCode={hostCountry} /> : "N/A"}{" "}
            {countryName}
          </Box>
        );
      },
    },
    {
      field: "photos",
      headerName: "Trade Show Photos",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const [open, setOpen] = useState(false);
        const [sliderImages, setSliderImages] = useState<string[]>([]);
        const photos = params?.value;
        const images = useMemo(
          () => [
            "https://merchantad.xevitech.com/public/uploads/product/gallery/Hfd5fd7e8187d4084a3059c08743dac2cb.jpg_720x720q50.jpg",
            "https://merchantad.xevitech.com/public/uploads/product/gallery/H94c5d8ec3b0449af826d6e9d58f42a8dc.png",
            "https://merchantad.xevitech.com/public/uploads/product/gallery/H2cf3c09544f8466e973b10c0bb99369a6.jpg_720x720q50_1_11zon.jpg",
          ],
          []
        );

        const handleAvatarClick = () => {
          setSliderImages(images);
          setOpen(true);
        };
        const handleClose = () => {
          setAddMore("");
          setOpen(false);
        };

        return (
          <>
            <AvatarGroup spacing="small">
              {photos.map((src, index) => (
                <Avatar
                  key={index}
                  alt={`Image ${index + 1}`}
                  src={src.source}
                  onClick={handleAvatarClick}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </AvatarGroup>
            <ComDetailCarouselDialog
              open={open}
              onClose={handleClose}
              maxWidth="sm"
              fullWidth
            >
              <ComDetailCarouselHead>
                <Typography variant="h6">Trade Show Photos</Typography>
                <IconButton onClick={handleClose} color="inherit">
                  <CloseIcon />
                </IconButton>
              </ComDetailCarouselHead>
              <DialogContent>
                <Carousel>
                  {photos?.map((src, index) => (
                    <TradeShowImages>
                      <img key={index} src={src.source} />
                    </TradeShowImages>
                  ))}
                </Carousel>
              </DialogContent>
            </ComDetailCarouselDialog>
          </>
        );
      },
    },
    {
      field: "instructions",
      headerName: "Trade Show Instructions",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <Box>{params.value}</Box>,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LightTooltip
                placement="top"
                title="Edit"
                arrow
                disableInteractive
              >
                <PencilIcon1>
                  <Image
                    height={14}
                    width={14}
                    src={"/assets/EditPencil.svg"}
                    alt="editImage"
                    onClick={(event) => {
                      setState({ ...state, right: true });
                      setDefalultValues(params.row);
                      setAddMore("edit");
                    }}
                  />
                </PencilIcon1>
              </LightTooltip>
              <LightTooltip
                placement="top"
                title="Delete"
                arrow
                disableInteractive
              >
                <DeleteOutlineOutlinedIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteID([params.id]);
                    e.preventDefault();
                    setDeleteConfirmation(true);
                  }}
                  style={{ color: "#D7282F", fontSize: "18px" }}
                />
              </LightTooltip>
            </Box>
          </>
        );
      },
    },
  ];

  const rows = (multipleTrade || []).map((d, index) => {
    return {
      id: d?.id || index,
      name: d?.name || "No name",
      date: d?.date || "N/A",
      country_: d?.country || "Unknown",
      photos: d?.photos || [],
      instructions: d?.instructions || "No instructions",
    };
  });

  const dispatch = useDispatch();

  const fetchList = async () => {
    setLoader(true);
    try {
      let response = await apiClient("trade_show/list", "get");
      setMultipleTrade(response.data.reverse());
      dispatch(getCompanyProfile());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  const DeleteTradeShow = async (e) => {
    const idsToDelete = Array.isArray(deleteID) ? deleteID : [deleteID];
    let response = await apiClient("trade_show/delete", "post", {
      body: { id: idsToDelete.join(",") },
    });

    if (response.status === 200) {
      toast.success("Trade show successfully deleted");
    } else {
      toast.error("Failed to delete trade show with ID: ");
    }
    setDeleteID([]);
    setDeleteConfirmation(false);
    await fetchList();
  };

  const handleCancelDelete = () => {
    setDeleteID([]);
    setDeleteConfirmation(false);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: "500px",
        "@media screen and (max-width:600px)": {
          width: "250px !important",
        },
        padding: "12px 16px 0px 16px",
      }}
      role="presentation"
    >
      <Tradeshowform
        toggleDrawer={toggleDrawer}
        setAddMore={setAddMore}
        defaultValues={addMore === "edit" ? defaultValues : {}}
        defaultValue={defaultValues}
        addMore={addMore}
        fetchList={fetchList}
      />
    </Box>
  );

  return (
    <>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={handleCancelDelete}
          text="trade show"
          onClickAction={DeleteTradeShow}
        />
      )}
      <ContentInnerContainer breakPoints={breakPoints}>
        <ContainerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between !important",
            flexDirection: "row !important",
            "@media screen and (max-width:480px)": { display: "block" },
          }}
        >
          <ContainerHeaderText breakPoints={breakPoints}>
            Trade Show
          </ContainerHeaderText>
          <Box sx={{ position: "relative" }}>
            <Redoutlinebtn
              height={"36px"}
              sx={{
                "@media screen and (max-width:600px)": {
                  marginBottom: "12px",
                },
                zIndex: 1,
              }}
              onClick={toggleDrawer("right", true)}
            >
              <div>Add Trade Show</div>
              <AddCircleOutlineIcon sx={{ marginLeft: 1, height: 24 }} />
            </Redoutlinebtn>
          </Box>
        </ContainerHeader>
        <Grid container spacing={2} alignItems={"stretch"}>
          {multipleTrade?.length > 0 && (
            <DeleteSelectedOuterBox>
              <DeleteSelectedInnerBox>
                <Box>
                  <DeleteSelectedText className="borderLeft">
                    Trade Show Selected ({deleteID.length})
                  </DeleteSelectedText>
                </Box>
                <DeleteSelectedDivider></DeleteSelectedDivider>
                {deleteID.length > 0 && (
                  <Box>
                    <DeleteSelectedRedText
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setDeleteID(deleteID);
                      }}
                    >
                      Delete Selected{" "}
                      <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                    </DeleteSelectedRedText>
                  </Box>
                )}
              </DeleteSelectedInnerBox>
            </DeleteSelectedOuterBox>
          )}
          <Box sx={{ width: "100%", margin: "1rem" }}>
            {loader ? (
              <TradeShowSkeleton />
            ) : multipleTrade?.length > 0 ? (
              <DataGridPro
                style={{
                  border: "5px",
                  borderRadius: "10px",
                  borderColor: "transparent",
                }}
                localeText={{
                  columnMenuShowColumns: "Manage Columns",
                }}
                rows={rows}
                columns={columns}
                disableSelectionOnClick
                pagination
                sx={DataGridStyle}
                pageSize={5}
                rowHeight={46}
                rowsPerPageOptions={[10]}
                checkboxSelection
                hideFooterSelectedRowCount={true}
                autoHeight
                selectionModel={deleteID}
                onSelectionModelChange={(newSelectionModel) => {
                  setDeleteID(newSelectionModel);
                }}
              />
            ) : (
              <EmptyPage
                text={"Trade Show"}
                logo="/assets/trade_new.svg"
                onClickHandler={toggleDrawer("right", true)}
              />
            )}
          </Box>
        </Grid>
        {addMore && (
          <div>
            <SwipeableDrawer
              anchor={"right"}
              open={state["right"]}
              onClose={() => {}}
              onOpen={toggleDrawer("right", true)}
            >
              {list("right")}
            </SwipeableDrawer>
          </div>
        )}
      </ContentInnerContainer>
    </>
  );
}
