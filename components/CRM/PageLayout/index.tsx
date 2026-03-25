import * as React from "react";
import { v4 as uuid } from "uuid";
import { OuterContainer } from "../../SellerTools/styles";
import { ProfileHeader } from "../../common/profileheader";
import {
  AntSwitch,
  AvatarContainer,
  FilledButton,
  FullPageContainer,
  InnerContentContainer,
  LeadContentOuter,
  OutLinedButton,
  PButtonContainer,
  PageContentRight,
  PageContentleft,
  ProfileContainer,
  TopHeading,
  FieldContainer,
  IconText,
  ImageActionButton,
  ImageUpload,
  IconBg,
} from "./style";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { getUniqueListBy } from "@/components/common/common";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import AddIcon from "@mui/icons-material/Add";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import LeftConatiner from "./RightConatiner";
import { DragDropContext } from "react-beautiful-dnd";
import SideBarDragable from "./sidebar/NewUsed";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import {
  setRowListing,
  SectionList,
  setPreviewModal,
  setShowImage,
  LeadsListing,
  LeadsListingSave,
  setEditProperty,
  setMultiSelectPopUp,
  setRemovedUnusedItems,
  UnusedItems,
  setCheckMenu,
  setSaveLoader,
} from "@/hooks/LeadsReducer";
import Preview from "./preview";
import EditPropertyPopUp from "./common/editPropertyPopUp";
import Crop169SharpIcon from "@mui/icons-material/Crop169Sharp";
import MultiSelectPopUp from "./common/multiSelectPopUp";
import UnusedSideBarDragable from "./sidebar/UnUsed";
import { useEffect } from "react";
import {
  ActionIcons,
  CrmFullData,
  CrmInnerContent,
  IconButtonAdd,
} from "../commonStyle";
import AddNewSection from "./common/newSectionPopUp";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import CommonHeader from "../Leads/CommonHeader";
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&.MuiPaper-root": {
    borderRadius: "5px 5px 0 0",
    marginBottom: "1rem",
    borderBottom: "1px solid #E0E3E7",
    "@media screen and (max-width: 900px)": {
      marginBottom: "10px",
    },
  },
  "& .MuiAccordionSummary-content": {
    "@media screen and (max-width: 900px)": {
      margin: "5px 0",
    },
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  background: "#FFECEC",
  color: "#D7282F",
  fontWeight: 600,
  borderRadius: "5px 5px 0 0",
  paddingLeft: "5px",
  "& .MuiAccordionSummary-expandIconWrapper": {
    position: "absolute",
    right: 10,
    color: "#D7282F",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  padding: "12px",
}));

const PageLayout = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [nameForNumber, setNameForNumber] = React.useState<any>(0);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  /*** Dialouge  ***/
  const handleClickOpen = () => {
    dispatch(setPreviewModal(true));
  };

  /*** Dialouge ***/

  const {
    rowListing,
    sideBarListing,
    showImage,
    multiSelectPopUp,
    editProperty,
    editItems,
    copyFormData,
    removedListItems,
    loader,
    Saveloader,
    checkMenu,
    skeleton,
  } = useSelector((state: any) => state.LeadsData);
  const { id } = useSelector((state: any) => state.userData);
  const [updateNew, setUpdateNew] = React.useState<any>("");

  const [addNew, setaddNew] = React.useState(false);
  const dispatch = useAppDispatch();
  let shimmerArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  // const [rowListing, setRowList] = React.useState<any>(rowListing);
  React.useEffect(() => {
    dispatch(SectionList());
    dispatch(LeadsListing());
  }, [dispatch]);

  useEffect(() => {
    if (copyFormData?.unique_id) {
      dispatch(UnusedItems(copyFormData?.unique_id));
    }
  }, [copyFormData?.unique_id]);

  const handleReset = () => {
    dispatch(LeadsListing());
  };
  const handleSave = async () => {
    if (removedListItems.length > 0) {
      // dispatch(DeleteFormList(copyFormData.));
    }
    let allNamesAreUnique = true; // Assume all names are unique initially

    rowListing.columnOrder?.forEach((item) => {
      const encounteredNames = {};

      item.form_fields.forEach((field) => {
        if (encounteredNames[field.name]) {
          // If a duplicate name is encountered, set the flag to false and show an error message
          allNamesAreUnique = false;
          toast.error(`${field.name} name already exists, please change name.`);
        } else {
          encounteredNames[field.name] = true;
        }
      });
    });

    if (allNamesAreUnique) {
      dispatch(setSaveLoader(true));
      await dispatch(LeadsListingSave({ formData: rowListing.columnOrder }));
      await dispatch(UnusedItems(copyFormData.unique_id));
      await dispatch(LeadsListing());
    }
  };

  const handleDragable = ({ source, destination, type, draggableId }) => {
    let start: any;
    source.droppableId == "all-column"
      ? (start = rowListing?.columnOrder.filter(
          (item) => item.name == source.droppableId
        ))
      : source.droppableId == "sidebar"
      ? (start = sideBarListing.filter(
          (item) => item.uid == draggableId || item.label == draggableId
        ))
      : (start = removedListItems.filter((item) => item.label == draggableId));
    const end = rowListing?.columnOrder.filter(
      (item) => item?.name == destination?.droppableId
    );

    const columnss = rowListing?.columnOrder.find((item) => {
      if (item?.name == source.droppableId) {
        return item.form_fields;
      }
    });

    if (!destination) {
      return;
    }
    if (
      source.droppableId == "Unusedsidebar" &&
      destination.droppableId == "sidebar"
    ) {
      return;
    }
    if (
      source.droppableId == "sidebar" &&
      destination.droppableId == "sidebar"
    ) {
      return;
    }
    if (type == "column") {
      const oldListIndex = source.index;
      const newListIndex = destination.index;
      const newLists = Array.from(rowListing?.columnOrder);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      dispatch(setRowListing({ ...rowListing, columnOrder: newLists }));
      return;
    }
    if (source.droppableId == "Unusedsidebar") {
      const updatednew = [...end[0].form_fields];
      dispatch(setRemovedUnusedItems(source.index));
      // const data=removedListItems.splice(source.index,1);
      const newLists = Array.from(removedListItems).splice(source.index, 1);
      updatednew.splice(destination.index, 0, newLists[0]);
      const newColumn = rowListing?.columnOrder.map((column) => {
        if (destination.droppableId === column.name) {
          return {
            ...column,
            form_fields: updatednew,
          };
        }

        return column;
      });

      dispatch(
        setRowListing({
          ...rowListing,
          columnOrder: newColumn,
        })
      );
      return;
    }

    if (start.length > 0 && start.every((val) => end.includes(val))) {
      const updatedFields = [...columnss.form_fields];
      const DraggableField = updatedFields.find(
        (item) => item?.name == draggableId
      );

      updatedFields.splice(source.index, 1);
      updatedFields.splice(destination.index, 0, DraggableField);
      const updatedColumn = rowListing?.columnOrder.map((column) => {
        if (source.droppableId === column.name) {
          return {
            ...column,
            form_fields: updatedFields,
          };
        }
        return column;
      });

      dispatch(
        setRowListing({
          ...rowListing,
          columnOrder: updatedColumn,
        })
      );
    } else if (source.droppableId == "sidebar") {
      const updatednew = [...end[0].form_fields];
      const uniqueid = uuid();
      setNameForNumber((pre) => pre + 1);
      const checkExist = [...rowListing?.columnOrder];
      const labelToCheck = start[0]?.label;
      const itemExists = checkExist.some((ele) =>
        ele?.form_fields?.some(
          (items) => items?.name?.replace("_", " ") === labelToCheck
        )
      );

      const updatedArray = start.map((element) => ({
        ...element,
        id: "",
        uniqueidForDrag: uniqueid,
        // name:
        //   nameForNumber === 0
        //     ? `${element.label }`
        //     : (element ? element.label : element.name) + nameForNumber,
        name: itemExists ? element.label + nameForNumber : element.label,
        type_id: end[0].type_id,
        section_id: end[0].section_id,
        crm_user_form_unique_id: copyFormData.unique_id,
        form_input_list_id: element.id,
        input_list_id: element.id,
        user_id: id,
        is_required: "0",
        duplicate_allow: "0",
        is_delete: 1,
        allow_multiple_section: 0,
        option_list: [],
        order_by: destination.index,
        option_orderby: [],
        default_value: null,
        readOnly: false,
        unique_id: "",
      }));

      if (draggableId == "Multi Select") {
        setUpdateNew({
          updatednew,
          updatedArray,
          uniqueid,
          id,
          copyFormData,
          destination,
        });
        dispatch(setMultiSelectPopUp(true));
        // handleMultiSelectPopUp({ updatednew, updatedArray, destination });
        return;
      } else {
        updatednew.splice(
          destination.index == 0 ? destination.index : destination.index + 1,
          0,
          updatedArray[0]
        );
      }

      const orderedArray = [...updatednew];
      const checkorder = orderedArray.map((item, index) => {
        const updateItem = { ...item };
        if (updatedArray[0]?.name === item.name) {
          updateItem.order_by = index + 1;
        }
        return updateItem;
      });

      const newColumn = rowListing?.columnOrder.map((column) => {
        if (destination.droppableId === column.name) {
          return {
            ...column,
            form_fields: checkorder,
          };
        }
        return column;
      });

      dispatch(
        setRowListing({
          ...rowListing,
          columnOrder: newColumn,
        })
      );
    } else {
      const updatecolumnss = rowListing?.columnOrder.find((item) => {
        if (item?.name == source.droppableId) {
          return item.form_fields;
        }
      });
      const otherColumnFields = [...updatecolumnss.form_fields];

      const updatednew: any = [...end[0].form_fields];

      const DraggableField = otherColumnFields.find(
        (item) =>
          item?.id == draggableId || item?.uniqueidForDrag == draggableId
      );
      // DraggableField?.order_by=source.index+1;
      otherColumnFields.splice(source.index, 1);
      const newColumn = rowListing?.columnOrder.map((column) => {
        if (destination.droppableId === column.name) {
          {
            destination.droppableId == source.droppableId &&
              updatednew.splice(source.index, 1);
          }
          updatednew.splice(
            source.index <= destination.index
              ? destination.index + 1
              : destination.index,
            0,
            DraggableField
          );

          const updateOrdwer = [...updatednew];

          // code for update order according to index during drag and drop--------------
          const updatedArray = updateOrdwer.map((user, index) => {
            if (
              user?.id === draggableId ||
              user?.uniqueidForDrag == draggableId
            ) {
              const updatedUser = { ...user }; // Create a copy of the user object
              updatedUser.order_by = destination ? destination.index + 1 : 1;
              return updatedUser;
            }
            return user;
          });

          // Calculate new order_by values for the remaining objects
          const remainingObjects = updatedArray
            .filter(
              (user) =>
                user.id !== draggableId || user?.uniqueidForDrag !== draggableId
            )
            .map((user, index) => ({
              ...user,
              order_by: index + 1,
            }));

          // Merge the updated and recalculated objects into a final array
          const finalArray = updatedArray.map((user) => {
            let updatedUser: any;
            if (user?.id) {
              updatedUser = remainingObjects.find((obj) => obj.id === user.id);
            } else {
              updatedUser = remainingObjects.find(
                (obj) => obj.uniqueidForDrag === user.uniqueidForDrag
              );
            }
            if (updatedUser) {
              return updatedUser;
            }
            return user;
          });

          return {
            ...column,
            // form_fields: finalArray
            form_fields: getUniqueListBy(finalArray, "name"),
          };
        } else if (source.droppableId === column.name) {
          return {
            ...column,
            form_fields: otherColumnFields,
          };
        }
        return column;
      });

      dispatch(
        setRowListing({
          ...rowListing,
          columnOrder: newColumn,
        })
      );
    }
  };

  const handleMultiSelectPopUp = (props) => {
    setUpdateNew(props);
    dispatch(setMultiSelectPopUp(true));
  };
  const handleCloseModal = () => {
    const payload = { status: false, editFields: "" };
    dispatch(setEditProperty(payload));
    dispatch(setCheckMenu({ type: "", status: false }));
  };

  const createNewSection = () => {
    setaddNew(true);
  };
  const closeNewSection = () => {
    setaddNew(false);
  };

  return (
    <>
      <MultiSelectPopUp open={multiSelectPopUp} data={updateNew} />
      <AddNewSection open={addNew} handleClose={() => closeNewSection()} />
      <EditPropertyPopUp
        open={checkMenu.status}
        data={editItems}
        handleClose={() => handleCloseModal()}
        //  onClickAction={() => router.push("/plancards")}
        loading={false}
      />

      <DragDropContext onDragEnd={handleDragable}>
        <div className="full_page">
          <CrmFullData>
            <OuterContainer>
              <CommonHeader />
            </OuterContainer>
            <CrmInnerContent>
              <FullPageContainer>
                <TopHeading variant="h6">
                  <i className="icon-leads"></i> Customize Lead Fields
                </TopHeading>
                {/* <Typography>Customized fields</Typography> */}
                <Divider />
                <InnerContentContainer>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4} lg={3.5}>
                      <PageContentleft>
                        <div>
                          <Accordion
                            expanded={expanded === "panel1"}
                            onChange={handleChange("panel1")}
                          >
                            <AccordionSummary
                              aria-controls="panel1d-content"
                              id="panel1d-header"
                            >
                              <Typography>New Fields</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {loader ? (
                                <SideBarDragable />
                              ) : (
                                <Box>
                                  <Grid container spacing={1}>
                                    {shimmerArray.map((i) => (
                                      <Grid
                                        key={i}
                                        item
                                        xs={12}
                                        sm={12}
                                        lg={6}
                                        xl={6}
                                      >
                                        <Skeleton
                                          animation="wave"
                                          height={"30px"}
                                          width={"100%"}
                                        />
                                      </Grid>
                                    ))}
                                  </Grid>
                                </Box>
                              )}
                            </AccordionDetails>
                          </Accordion>
                          <Accordion
                            expanded={expanded === "panel3"}
                            onChange={handleChange("panel3")}
                          >
                            <AccordionSummary
                              aria-controls="panel2d-content"
                              id="panel2d-header"
                            >
                              <Typography>New Section</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FieldContainer>
                                <IconText>
                                  <Crop169SharpIcon />
                                  <Typography>Create New Section</Typography>
                                </IconText>
                                <ActionIcons>
                                  <IconButtonAdd
                                    aria-label="Add"
                                    onClick={() => createNewSection()}
                                  >
                                    <AddIcon />
                                  </IconButtonAdd>
                                </ActionIcons>
                                {/* <Deleteicon  /> */}
                              </FieldContainer>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion
                            expanded={expanded === "panel2"}
                            onChange={handleChange("panel2")}
                          >
                            <AccordionSummary
                              aria-controls="panel2d-content"
                              id="panel2d-header"
                            >
                              <Typography>Unused Items</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <UnusedSideBarDragable />
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </PageContentleft>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={8.5}>
                      <PageContentRight>
                        <ProfileContainer>
                          <AvatarContainer>
                            {showImage && (
                              <ImageUpload>
                                <Avatar
                                  style={{ marginRight: "14px" }}
                                  alt="Jack Sparrow"
                                  src="https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                />

                                <input
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  id="raised-button-file"
                                  multiple
                                  onChange={(e) => {}}
                                  type="file"
                                />
                                <ImageActionButton>
                                  <label htmlFor="raised-button-file">
                                    <IconBg>
                                      <UploadOutlinedIcon />
                                    </IconBg>
                                  </label>
                                  <IconBg>
                                    <DeleteOutlineOutlinedIcon />
                                  </IconBg>
                                </ImageActionButton>
                              </ImageUpload>
                            )}
                            <Box>
                              <Typography variant="body2">
                                Lead Image
                              </Typography>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <AntSwitch
                                  defaultChecked={showImage}
                                  // value={showImage}
                                  inputProps={{ "aria-label": "ant design" }}
                                  onChange={() =>
                                    dispatch(setShowImage(!showImage))
                                  }
                                />
                              </Stack>
                            </Box>
                          </AvatarContainer>
                          <PButtonContainer>
                            <FilledButton
                              variant="outlined"
                              startIcon={<SaveOutlinedIcon />}
                              onClick={() => handleSave()}
                            >
                              {Saveloader ? (
                                <ThreeDots
                                  height="18"
                                  width="40"
                                  radius="9"
                                  color="white"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                " Save"
                              )}
                            </FilledButton>
                            <OutLinedButton
                              variant="outlined"
                              startIcon={<HighlightOffOutlinedIcon />}
                              onClick={handleReset}
                            >
                              Cancel
                            </OutLinedButton>
                            <OutLinedButton
                              variant="outlined"
                              startIcon={<RemoveRedEyeOutlinedIcon />}
                              onClick={handleClickOpen}
                            >
                              Preview
                            </OutLinedButton>
                          </PButtonContainer>
                        </ProfileContainer>
                        <LeadContentOuter>
                          {loader ? (
                            <LeftConatiner />
                          ) : (
                            <Box
                              sx={{
                                border: "1px solid #E0E3E7",
                                padding: "20px 20px 0px 10px",
                                marginTop: "18px",
                                borderRadius: "6px",
                              }}
                            >
                              <Box>
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem", width: "20%" }}
                                />
                              </Box>
                              <Box
                                sx={{
                                  height: "1px",
                                  width: "100%",
                                  backgroundColor: "#E0E3E7",
                                  marginTop: "10px",
                                  marginBottom: "22px",
                                }}
                              ></Box>
                              <Box sx={{}}>
                                <Grid container spacing={2}>
                                  {shimmerArray.map((i) => (
                                    <>
                                      <Grid
                                        key={i}
                                        item
                                        xs={12}
                                        sm={12}
                                        md={
                                          skeleton == "single"
                                            ? 12
                                            : skeleton == "triple"
                                            ? 4
                                            : 6
                                        }
                                        // lg={6}
                                        // xl={6}
                                      >
                                        <Box sx={{ marginTop: "-10px" }}>
                                          <Skeleton
                                            width="100%"
                                            height="65px"
                                            animation="wave"
                                          />
                                        </Box>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={
                                          skeleton == "single"
                                            ? 12
                                            : skeleton == "triple"
                                            ? 4
                                            : 6
                                        }
                                        // lg={6}
                                        // xl={6}
                                      >
                                        <Box sx={{ marginTop: "-10px" }}>
                                          <Skeleton
                                            width="100%"
                                            height="65px"
                                            animation="wave"
                                          />
                                        </Box>
                                      </Grid>
                                    </>
                                  ))}
                                </Grid>
                              </Box>
                            </Box>
                          )}
                        </LeadContentOuter>
                      </PageContentRight>
                    </Grid>
                  </Grid>
                </InnerContentContainer>
              </FullPageContainer>
            </CrmInnerContent>
            <Preview />
          </CrmFullData>
        </div>
      </DragDropContext>
    </>
  );
};
export default PageLayout;
