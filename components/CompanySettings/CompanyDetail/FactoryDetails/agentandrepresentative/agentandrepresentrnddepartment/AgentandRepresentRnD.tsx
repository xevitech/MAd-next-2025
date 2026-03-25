import React, { useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import {
  AdditionAddress,
  AstricksMark,
  ButtonModeHere,
  CancelTextWithIcon,
  CompanyFacilityData,
  CompanyFacilityInnContainer,
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  EditBrowseIcon,
  EditBrowseText,
  EditModeBoxContainer,
  EditSaveIcons,
  EditSaveIcons1,
  EditUpImagesStack,
  FooterDiv,
  PlushIcon,
  PlushIconBox,
  SaveTextWithIcon,
  SelectedEditImg,
  SelectedEditSection,
  SubHeadingPage,
  TypographyTitle,
  UpImageName,
  UploadImageCol,
  UploadImagesRow,
} from "../../style";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AgentandRepresentRnD() {
  const [editMode, setEditMode] = useState(false);
  const [productlinename, setProductlinename] = useState("");
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleSaveClick = () => {
    setEditMode(false);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const getFileNameAndExtension = (file) => {
    const dotIndex = file.lastIndexOf(".");
    if (dotIndex === -1) return { name: file, extension: "" };
    return {
      name: file.substring(0, dotIndex),
      extension: file.substring(dotIndex),
    };
  };
  const { name, extension } = getFileNameAndExtension(__filename);
  return (
    <>
      <CompanyFacilityInnContainer
        sx={{
          boxShadow: editMode ? "0px 2px 2px 0px #9FA2BF52" : "",
          padding: editMode ? "16px" : "",
        }}
      >
        <SubHeadingPage>
          <TypographyTitle>R&D Department</TypographyTitle>
          <ButtonModeHere>
            {!editMode && (
              <EditSaveIcons1 onClick={() => setEditMode(true)}>
                <img src={"/assets/EditPencil.svg"} alt="editImage" />
                <Typography>Edit</Typography>
              </EditSaveIcons1>
            )}
            {editMode && (
              <EditSaveIcons>
                <CancelTextWithIcon
                  onClick={() => setEditMode(false)}
                  className="cancelwithicon"
                >
                  <CloseIcon />
                  <Typography>Cancel</Typography>
                </CancelTextWithIcon>
                <SaveTextWithIcon
                  className="savewithicon"
                  onClick={handleSaveClick}
                >
                  <SaveOutlinedIcon />
                  <Typography variant="body1">Save</Typography>
                </SaveTextWithIcon>
              </EditSaveIcons>
            )}
          </ButtonModeHere>
        </SubHeadingPage>
        <CompanyFacilityData>
          {editMode ? (
            <EditModeBoxContainer>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                      <DataRowHere className="editview">
                        <Grid container spacing={1} alignItems={"center"}>
                          <Grid item xs={12} sm={12} md={4}>
                            <DataRowTitle>
                              <Typography>R&D Spending</Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8}>
                            <DataRowValue>
                              <TextField
                                id="outlined-basic"
                                placeholder="Enter R&D spending"
                                variant="outlined"
                                size="small"
                                fullWidth
                                // value={factoryName}
                                // onChange={(e) => setFactoryName(e.target.value)}
                              />
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <DataRowHere className="editview">
                        <Grid container spacing={1} alignItems={"center"}>
                          <Grid item xs={12} sm={12} md={4}>
                            <DataRowTitle>
                              <Typography>
                                Vitality Index{" "}
                                <AstricksMark>
                                  {" "}
                                  <HelpOutlineOutlinedIcon />
                                </AstricksMark>
                              </Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8}>
                            <DataRowValue>
                              <TextField
                                id="outlined-basic"
                                placeholder="Enter vitality index"
                                variant="outlined"
                                size="small"
                                fullWidth
                                // value={factoryName}
                                // onChange={(e) => setFactoryName(e.target.value)}
                              />
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                      <DataRowHere className="editview">
                        <Grid container spacing={1} alignItems={"center"}>
                          <Grid item xs={12} sm={12} md={4}>
                            <DataRowTitle>
                              <Typography>
                                Certification Level of R&D Head 
                              </Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8}>
                            <DataRowValue>
                              <TextField
                                id="outlined-basic"
                                placeholder="Enter certification level of R&D head"
                                variant="outlined"
                                size="small"
                                fullWidth
                                // value={factoryName}
                                // onChange={(e) => setFactoryName(e.target.value)}
                              />
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <DataRowHere className="editview">
                        <Grid container spacing={1} alignItems={"center"}>
                          <Grid item xs={12} sm={12} md={4}>
                            <DataRowTitle>
                              <Typography>
                                No. Of R&D Staff{" "}
                                <AstricksMark>
                                  {" "}
                                  <HelpOutlineOutlinedIcon />
                                </AstricksMark>
                              </Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8}>
                            <DataRowValue>
                              <TextField
                                id="outlined-basic"
                                placeholder="Enter no. of R&D staff"
                                variant="outlined"
                                size="small"
                                fullWidth
                                // value={factoryName}
                                // onChange={(e) => setFactoryName(e.target.value)}
                              />
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <FooterDiv>
                <Divider variant="middle" />
              </FooterDiv>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <PlushIconBox>
                    <LightTooltip
                      title="Add Another Store Details"
                      arrow
                      placement="left"
                    >
                      <PlushIcon>
                        <AddOutlinedIcon />
                      </PlushIcon>
                    </LightTooltip>
                  </PlushIconBox>
                </Grid>
              </Grid>
            </EditModeBoxContainer>
          ) : (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                      <DataRowHere>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={4}>
                            <DataRowTitle>
                              <Typography>R&D Spending</Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8}>
                            <DataRowValue>
                              <Typography>5000</Typography>
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <DataRowHere>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={4}>
                            <DataRowTitle>
                              <Typography>Vitality Index</Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8}>
                            <DataRowValue>
                              <Typography>5000</Typography>
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                      <DataRowHere>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={4}>
                            <DataRowTitle>
                              <Typography>
                                Certification Level of R&D Head
                              </Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8}>
                            <DataRowValue>
                              <Typography>abc@twitter</Typography>
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <DataRowHere>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={4}>
                            <DataRowTitle>
                              <Typography>No. Of R&D Staff</Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8}>
                            <DataRowValue>
                              <Typography>5000</Typography>
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
        </CompanyFacilityData>
      </CompanyFacilityInnContainer>
    </>
  );
}
