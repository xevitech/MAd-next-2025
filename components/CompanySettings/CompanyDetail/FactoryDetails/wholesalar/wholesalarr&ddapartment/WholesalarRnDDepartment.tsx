
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
  Radiomain,
  SavebtnBox,
  SaveTextWithIcon,
  SubHeadingPage,
  TypographyTitle,
} from "../../style";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";

export default function WholesalarRnDDepartment() {
  const [editMode, setEditMode] = useState(false);
  const [showData, setShowData] = useState(false);
  const [productlinename, setProductlinename] = useState("");
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleRadioChange = (event) => {
    if (event.target.value === 'yes') {
      setShowData(true);
    } else {
      setShowData(false); 
    }
  };
  const handleSaveClick = () => {
    setEditMode(false);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <CompanyFacilityInnContainer
    sx={{
      boxShadow: editMode ? "0px 2px 2px 0px #9FA2BF52" : "",
      padding: editMode ? "16px" : "",
    }}
  ><Box sx={{
    border: '1px solid #e2e2e2',
    borderRadius: '5px',
    padding: '16px 10px 10px 15px',
    gap: "18px",
  }}>
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
           <Box sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
              fontWeight: "400",
            },
          }}>
            <FormControl
            >
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={showData ? "yes" : "no"} // Controlled component
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="yes"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: "19px",
                        },
                        "&.Mui-checked": {
                          color: "#d7282f",
                        },
                      }}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: "19px",
                        },
                        "&.Mui-checked": {
                          color: "#d7282f",
                        },
                      }}
                    />
                  }
                  label="No"
                />
              </RadioGroup >
            </FormControl>
          </Box>
        )}
      </ButtonModeHere>
    </SubHeadingPage>
    <CompanyFacilityData>
      {editMode ? (
        <EditModeBoxContainer>
           {showData &&<Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <DataRowHere className="editview">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12} sm={12} md={4}>
                        <DataRowTitle>
                          <Typography>R&D Spending <AstricksMark>
                              {" "}*
                           </AstricksMark>{" "} </Typography>
                        </DataRowTitle>
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <DataRowValue>
                          <FormControl fullWidth size="small">
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={selectedValue}
                              // onChange={handleSelectChange}
                              displayEmpty
                              renderValue={
                                selectedValue !== ""
                                  ? undefined
                                  : () => "Select your state"
                              }
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
                      <Grid item xs={12} sm={4} md={2}>
                        <DataRowValue>
                          <TextField
                            id="outlined-basic"
                            placeholder="Enter equipment name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            // value={factoryName}
                            //onChange={(e) => setFactoryName(e.target.value)}
                          />
                        </DataRowValue>
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <DataRowValue>
                          <FormControl fullWidth size="small">
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={selectedValue}
                              // onChange={handleSelectChange}
                              displayEmpty
                              renderValue={
                                selectedValue !== ""
                                  ? undefined
                                  : () => "Select your state"
                              }
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
                              {" "}*
                              <HelpOutlineOutlinedIcon />
                            </AstricksMark>{" "}
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
                            //onChange={(e) => setFactoryName(e.target.value)}
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
              <Grid item xs={12} sm={12} >
                  <DataRowHere className="editview">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12} sm={12} md={2}>
                        <DataRowTitle>
                          <Typography>
                            Certification Level of R&D Head{" "}
                            <AstricksMark>
                              {" "}*
                           </AstricksMark>{" "}
                          </Typography>
                        </DataRowTitle>
                      </Grid>
                      <Grid item xs={12} sm={12} md={10}>
                        <DataRowValue>
                          <TextField
                            id="outlined-basic"
                            placeholder="Enter patent production"
                            variant="outlined"
                            size="small"
                            fullWidth
                            // value={factoryName}
                            //onChange={(e) => setFactoryName(e.target.value)}
                          />
                        </DataRowValue>
                      </Grid>
                    </Grid>
                  </DataRowHere>
                </Grid>
             
              </Grid>
            </Grid>
          </Grid>}
          {showData && (<><FooterDiv>
                <Divider variant="middle" />
              </FooterDiv>
                <Radiomain>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <SavebtnBox>
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
                      </SavebtnBox>
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
                </Radiomain> </>)}

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
                          <Typography>$129 Million</Typography>
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
                          <Typography>Ibrahim Sameeh</Typography>
                        </DataRowValue>
                      </Grid>
                    </Grid>
                  </DataRowHere>
                </Grid>
              </Grid>
            </Grid>
           
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <DataRowHere>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={2}>
                        <DataRowTitle>
                          <Typography>
                            Certification Level of R&D Head
                          </Typography>
                        </DataRowTitle>
                      </Grid>
                      <Grid item xs={12} sm={12} md={10}>
                        <DataRowValue>
                          <Typography>Ibrahim Sameeh</Typography>
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
   </Box>
  </CompanyFacilityInnContainer>
  );
}
