import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LableValue } from "../style";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";

function MoreInfomation({ formik }) {
  const [purposeOfInquiry, setPurposeOfInquiry] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [projectLocation, setProjectLocation] = useState<string>("");
  const [competitor, setCompetitor] = useState<any>(["", ""]);
  const [productApplications, setProductApplications] = useState<any>("");
  const [statementOne, setStatementOne] = useState<any>({
    checked: false,
    statement:
      "Convert it to RFQ and send to other suppliers. If this supplier does not respond within 48 hours",
  });
  const [statementTwo, setStatementTwo] = useState<any>({
    checked: false,
    statement: "Complete this order through Merchant AD Trusted Account",
  });
  const InquiryOptions = [
    {
      name: "Tendering",
      tooltip:
        "You are participating in a bidding process and need to submit a proposal to the buyer",
    },
    {
      name: "Immediate Purchase",
      tooltip:
        "You are ready to purchase the product or service immediately and need to know the final price and delivery terms",
    },
    {
      name: "End User Cost Inquiry",
      tooltip:
        "You are an end user who wants to know the total cost of ownership (TCO) of a product or service.",
    },
    {
      name: "Product Comparison:",
      tooltip:
        "You are comparing different products or services from different sellers and need to get pricing information from each.",
    },
    {
      name: "Technical Specifications",
      tooltip:
        "You need more detailed technical specifications for a product or service before you can make a purchasing decision",
    },
  ];

  useEffect(() => {
    let Data = {
      purposeOfInquiry,
      projectName,
      projectLocation,
      competitor,
      productApplications,
      statementOne,
      statementTwo,
    };
    formik.setFieldValue("more_information", Data);
  }, [
    purposeOfInquiry,
    projectName,
    projectLocation,
    competitor,
    productApplications,
    statementOne,
    statementTwo,
  ]);

  return (
    <div>
      {/* <Stack
        sx={{
          width: "100%",
          "& .MuiPaper-root": {
            backgroundColor: "#F4F4F4",
            border: "1px solid #C6C6C6",
            "& .MuiAlert-icon": {
              color: "#000000",
              marginRight: "6px",
            },
            "& .MuiAlert-message": {
              color: "#000000",
            },
            "& svg":{
              color:"#d7282f",
              fontSize:"18px"
            }
          },
        }}
      >
        <Alert severity="info">
          The more information you provide, the better we can understand your
          needs and requirements. This will help us provide you with a more
          accurate and tailored quote.
        </Alert>
      </Stack> */}

      <Grid container spacing={2} sx={{ marginTop: "0px" }}>
        <Grid item xs={12}>
          <Box>
            <LableValue>
              <Typography variant="h3">Purpose of Inquiry</Typography>
              <Typography variant="body1" sx={{marginBottom:"6px"}}>
                Please select the primary purpose of your inquiry.
              </Typography>
            </LableValue>
            <Box>
              <FormControl fullWidth>
                <InputLabel size="small" id="demo-simple-select-label">
                  Inquiry
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={purposeOfInquiry}
                  label="Inquiry"
                  size="small"
                  onChange={(e) => setPurposeOfInquiry(e.target.value)}
                >
                  {InquiryOptions.map((v) => (
                    <MenuItem value={v.name}>{v.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <LableValue>
              <Typography variant="h3">Project Information</Typography>
              {/* <Typography variant="body1" sx={{marginBottom:"6px"}}>
                If you are submitting a proposal for a specific project, please
                provide the following information.
              </Typography> */}
            </LableValue>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Box >
                  <TextField
                    label="Project Name"
                    id="outlined-size-small1"
                    defaultValue="Enter Name"
                    size="small"
                    fullWidth
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box >
                  <TextField
                    label="Project Location"
                    id="outlined-size-small1"
                    defaultValue="Enter location"
                    size="small"
                    fullWidth
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* <Grid item md={12}>
          <LableValue sx={{marginBottom:'16px'}}>
            <Typography variant="h3">Competitor Information</Typography>
            <Typography variant="body1">
              If you are comparing different products or services, please list
              the names of your competitors.
            </Typography>
          </LableValue>
          <Grid container spacing={1}>
            {competitor.map((v, index) => (
              <Grid item xs={12} sm={4} md={4}>
                <Box display="flex" gap={1} alignItems={"center"}>
                  <Box sx={{width:'100%',}} >
                    <TextField
                      label={`Competitor ${index + 1}`}
                      id="outlined-size-small"
                      value={v}
                      size="small"
                      fullWidth
                      onChange={(e) =>
                        setCompetitor((prev) => {
                          let list = [...prev];
                          list[index] = e.target.value;
                          return list;
                        })
                      }
                    />
                  </Box>
                  {competitor.length > 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          borderLeft: "1px solid #dddddd",
                          paddingLeft: "8px",
                          "& .MuiSvgIcon-root": {
                            fontSize: "16px",
                            color: "#d7282f",
                            cursor: "pointer",
                            "&:hover": {
                              color: "#b30007",
                            },
                          },
                        }}
                      >
                        <LightTooltip title="Delete" placement="top" arrow disableInteractive>
                          <DeleteOutlineIcon
                            onClick={() => {
                              setCompetitor((prev) => {
                                let list = [...prev];
                                list.splice(index, 1);
                                return list;
                              });
                            }}
                          />
                        </LightTooltip>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
           <Grid item xs={12} sm={4} md={3}>
              {competitor.length < 3 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    "& .MuiLink-root": {
                      color: "#D7282F",
                      textDecoration: "none",
                      fontSize: "13px",
                      cursor: "pointer",
                      "&:hover": {
                        color: "#ad0007",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "18px",
                      },
                    },
                  }}
                >
                  <Link onClick={(e) => setCompetitor((prev) => [...prev, ""])} sx={{display:'flex',alignItems:'center'}}>
                    <AddIcon />
                    Add more
                  </Link>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid> */}
        {/* <Grid item md={12}>
          <LableValue>
            <Typography variant="h3" sx={{ margin: "0!important" }}>
              Product Application
            </Typography>
          </LableValue>
          <Box
            sx={{
              // "& textarea": {
              //   borderRadius: "4px",
              //   border: "1px solid #BBBBBB",
              //   outline: "none",
              //   padding: "12px",
              //   width: "100%",
              //   fontFamily: "open sans",
              //   "&:hover": {
              //     borderColor: "#333333",
              //   },
              // },
              "& .textarea-heading": {
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "4px",
                marginTop: "0px",
              },
            }}
          >
            <Typography className="textarea-heading">
              Please describe how you plan to use the product or service
            </Typography>
            <TextField
              aria-label="minimum height"
              minRows={3}
              maxRows={3} 
              fullWidth      
              multiline       
              placeholder="Enter text here...!"
              value={productApplications}
              onChange={(e) => setProductApplications(e.target.value)}
            />
          </Box>
        </Grid> */}
        {/* <Grid item md={12}>
          <FormGroup
            sx={{
              marginTop: "-12px",
              "& .MuiFormControlLabel-root": {
                margin: "0 0 0 -7px",
                "& .MuiCheckbox-root": {
                  padding: "4px",
                  "&.Mui-checked": {
                    color: "#d7282f",
                  },
                },
                ".MuiCheckbox-root": {
                  "& .MuiSvgIcon-root": {
                    display: "none",
                  },
                  "&:before": {
                    content: '" "',
                    display: "block",
                    width: "14px",
                    height: "14px",
                    border: "1px solid #d2d2d2",
                    borderRadius: "4px",
                    padding: 0,
                  },
                  "&:after": {
                    content: '" "',
                    display: "inline-block",
                    transform: "rotate(45deg)",
                    width: "4px",
                    height: "8px",
                    borderBottom: "1px solid #D7282F",
                    borderRight: "1px solid #D7282F",
                    position: "absolute",
                    top: "7px",
                    opacity: "0",
                  },
                  "&:hover": {
                    "&:before": {
                      borderColor: "#b1b0b0",
                    },
                  },
                  "&.Mui-checked": {
                    "&:after": {
                      opacity: "1",
                    },
                    "&:before": {
                      borderColor: "#D7282F",
                    },
                  },
                  "&.MuiCheckbox-root": {
                    padding: "5px 10px",
                  },
                },
                "& .MuiFormControlLabel-label": {
                  fontSize: "13px",
                },
              },
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={statementOne?.checked}
                  onChange={(e) =>
                    setStatementOne((prev) => ({
                      ...prev,
                      checked: e.target.checked,
                    }))
                  }
                />
              }
              label={statementOne?.statement}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={statementTwo?.checked}
                  onChange={(e) =>
                    setStatementTwo((prev) => ({
                      ...prev,
                      checked: e.target.checked,
                    }))
                  }
                />
              }
              label={statementTwo?.statement}
            />
          </FormGroup>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default MoreInfomation;
