import React, { useState } from "react";
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
  EditModeBoxContainer,
  EditSaveIcons,
  EditSaveIcons1,
  FooterDiv,
  PlushIcon,
  PlushIconBox,
  SaveTextWithIcon,
  SubHeadingPage,
  TypographyTitle,
} from "../style";
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
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  rAndDSpending: Yup.string().required("Please enter R&D spending"),
  value: Yup.string().required("Please enter value"),
  currency: Yup.string().required("Please select currency"),
  vitalityIndex: Yup.string().required("Please add vitality"),
  patentProduction: Yup.string().required("Please add patent Production"),
  certificationLevel: Yup.string().required("Please add certification Level"),
});

export default function RnD() {
  const [editMode, setEditMode] = useState(false);
  const [productlinename, setProductlinename] = useState("");
  const handleEditClick = (index) => {
    setEditableIndex(index);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [sections, setSections] = useState([createNewSection()]);

  function createNewSection() {
    return {
      id: Date.now(),
      rAndDSpending: "",
      equipmentName: "",
      state: "",
      vitalityIndex: "",
      patentProduction: "",
      certificationLevel: "",
    };
  }

  const handleAddSection = () => {
    setSections([...sections, createNewSection()]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSections = sections.map((section, secIndex) =>
      secIndex === index ? { ...section, [name]: value } : section
    );
    setSections(updatedSections);
  };
  const handleDeleteSection = (index) => {
    const updatedSections = sections.filter(
      (_, secIndex) => secIndex !== index
    );
    setSections(updatedSections);
  };
  const handleCancelClick = (index) => {
    setEditableIndex("");
  };
  const [editableIndex, setEditableIndex] = useState(null);
  const handleSaveSection = async (index) => {
    const sectionToSave = sections[index];
    console.log(sectionToSave, "sectionToSavesectionToSave");
  };

  const mainHTML = sections?.map((section, index) => (
    <CompanyFacilityInnContainer
      key={index}
      sx={{
        boxShadow: editMode ? "0px 2px 2px 0px #9FA2BF52" : "",
        padding: editMode ? "16px" : "",
      }}
    >
      <Formik
        key={section.id}
        initialValues={section}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSaveSection(values)}
      >
        {({ setFieldValue }) => (
          <Form>
            <div key={section.id}>
              {index != 0 && (
                <button onClick={() => handleDeleteSection(index)}>
                  Delete Me
                </button>
              )}
              <SubHeadingPage>
                <TypographyTitle>R&D Department</TypographyTitle>
                <ButtonModeHere>
                  {editableIndex !== index ? (
                    <EditSaveIcons1 onClick={() => handleEditClick(index)}>
                      <img src={"/assets/EditPencil.svg"} alt="editImage" />
                      <Typography>Edit</Typography>
                    </EditSaveIcons1>
                  ) : (
                    <EditSaveIcons>
                      <CancelTextWithIcon
                        onClick={() => handleCancelClick(index)}
                      >
                        <CloseIcon />
                        <Typography>Cancel</Typography>
                      </CancelTextWithIcon>
                      <Button type="submit" variant="contained" color="primary">
                        <SaveOutlinedIcon />
                        <Typography variant="body1">Save</Typography>
                      </Button>
                    </EditSaveIcons>
                  )}

                  {/* {!editMode && (
                    <EditSaveIcons1 onClick={() =>  handleCancelClick(index)}>
                      <img src={"/assets/EditPencil.svg"} alt="editImage" />
                      <Typography>Edit</Typography>
                    </EditSaveIcons1>
                  )}
                  {editMode && (
                    <EditSaveIcons>
                      <CancelTextWithIcon
                        onClick={() => handleCancelClick(index)}
                        className="cancelwithicon"
                      >
                        <CloseIcon />
                        <Typography>Cancel</Typography>
                      </CancelTextWithIcon>
                      <Button type="submit" variant="contained" color="primary">
                        <SaveOutlinedIcon />
                        <Typography variant="body1">Save</Typography>
                      </Button> */}
                  {/* <SaveTextWithIcon
                className="savewithicon"
                onClick={() => handleSaveSection(index)}
              >
                <SaveOutlinedIcon />
                <Typography variant="body1">Save</Typography>
              </SaveTextWithIcon> */}
                  {/* </EditSaveIcons>
                  )} */}
                </ButtonModeHere>
              </SubHeadingPage>
              <EditModeBoxContainer>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6}>
                        <DataRowHere className="editview">
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={12} md={4}>
                              <DataRowTitle>
                                <Typography>R&D Spending </Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                              <DataRowValue>
                                <FormControl fullWidth size="small">
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="rAndDSpending"
                                    value={section.rAndDSpending}
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                    displayEmpty
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                  <ErrorMessage
                                    name="rAndDSpending"
                                    component="div"
                                  />
                                </FormControl>
                              </DataRowValue>
                            </Grid>
                            <Grid item xs={12} sm={4} md={2}>
                              <DataRowValue>
                                <TextField
                                  id="outlined-basic"
                                  name="equipmentName"
                                  placeholder="Enter equipment name"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={section.equipmentName}
                                  onChange={(e) => handleInputChange(index, e)}
                                />
                              </DataRowValue>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                              <DataRowValue>
                                <FormControl fullWidth size="small">
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="state"
                                    value={section.state}
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                    displayEmpty
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                </FormControl>
                              </DataRowValue>
                            </Grid>
                          </Grid>
                        </DataRowHere>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <DataRowHere className="editview">
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={12} md={4}>
                              <DataRowTitle>
                                <Typography>
                                  Vitality Index{" "}
                                  <AstricksMark>
                                    {" "}
                                    <HelpOutlineOutlinedIcon />
                                  </AstricksMark>{" "}
                                </Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <TextField
                                  id="outlined-basic"
                                  name="vitalityIndex"
                                  placeholder="Enter vitality index"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={section.vitalityIndex}
                                  onChange={(e) => handleInputChange(index, e)}
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
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={12} md={4}>
                              <DataRowTitle>
                                <Typography>
                                  Patent Production{" "}
                                  <AstricksMark>
                                    {" "}
                                    <HelpOutlineOutlinedIcon />
                                  </AstricksMark>{" "}
                                </Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <TextField
                                  id="outlined-basic"
                                  name="patentProduction"
                                  placeholder="Enter patent production"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={section.patentProduction}
                                  onChange={(e) => handleInputChange(index, e)}
                                />
                              </DataRowValue>
                            </Grid>
                          </Grid>
                        </DataRowHere>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <DataRowHere className="editview">
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={12} md={4}>
                              <DataRowTitle>
                                <Typography>
                                  Certification Level of R&D Head{" "}
                                </Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <TextField
                                  id="outlined-basic"
                                  name="certificationLevel"
                                  placeholder="Enter certification level"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={section.certificationLevel}
                                  onChange={(e) => handleInputChange(index, e)}
                                />
                              </DataRowValue>
                            </Grid>
                          </Grid>
                        </DataRowHere>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </EditModeBoxContainer>
              {index === sections.length - 1 && (
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <PlushIconBox>
                      <LightTooltip
                        title="Add Another Store Details"
                        arrow
                        placement="left"
                      >
                        <PlushIcon>
                          <AddOutlinedIcon onClick={handleAddSection} />
                        </PlushIcon>
                      </LightTooltip>
                    </PlushIconBox>
                  </Grid>
                </Grid>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </CompanyFacilityInnContainer>
  ));

  const handleSave = async () => {
    console.log(sections, "sectionssections");
    return;
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sections),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Saved Data:", result);
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  return <>{mainHTML}</>;
}
