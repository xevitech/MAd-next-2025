import * as React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  PipelineContainer,
  PipelineTopbar,
  PipelineName,
  PipelineButtons,
  StyledForm,
  PipelineStage,
  StagesData,
  StagesItems,
  PiplineFormControl,
  FormDataPipline,
  CheckBoxStack,
  ErrorOutline,
  TypographyCheck,
  DeleteStage,
  LinkAddicon,
  StagesHeading,
  AddNewStageData,
  SectionTopHeading,
  AddStagesBox,
  // StyledDialog,
  RadioButtonBox,
  TextInfo,
  SelectStage,
  PipeLineButtonSection,
  PipeLineTabRow,
  AddPipelineDiv,
  DealAnnualRevenue, DealCardInfo, DealCardLayout, DealCardMail, DealCardStyle, DealComanyIcon, DealCompanyInfo, DealEmailStack, DealLeadNameValue, DealRevenueStack,
  DealOwner,
  AddIcon,
  DealRevenueStack2
} from "./style";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
/** Common file for these two components **/
import { OuterContainer } from "../../SellerTools/styles";
/** Common file for these two components **/
import { ProfileHeader } from "../../common/profileheader";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },

  "& .MuiStack-root": {
    "& .MuiTypography-root": {
      fontSize: "12px",
      color: "#231F20",
    },
  },
}));
import { CrmFullData, CrmInnerContent, Search, SearchIconWrapper, SmallBlackOutineBtn, SmallRedOutineBtn, StyledBootstrapDialog, StyledInputBase, TitleDialog } from "../commonStyle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ManagaDeleteDialog, OutLinedButton } from "../style";
import { useAppDispatch } from "redux/store";
import { setPipeLinePopUp } from "@/hooks/UseCreateFormData";
import PipeLinePopUp from "./PipeLinePopUp";
import CommonHeader from "../Leads/CommonHeader";
import CommonCRMTabs from "../Leads/CommonCRMTabs";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Checkbox from '@mui/material/Checkbox';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
const PipeManagement = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const [age, setAge] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => { setAge(event.target.value); };
  return (

    <div className="full_page">
      <CrmFullData>
        <OuterContainer>
          {/* <ProfileHeader text={"Lead Management Center"} /> */}
          <CommonHeader />
        </OuterContainer>
        <CrmInnerContent>
          <CommonCRMTabs activeButton={1} />
          <PipelineContainer>
            <PipelineTopbar>
              <PipelineName>
                <Typography>Pipeline Name</Typography>
                <TextField sx={{ mt: 1, ml: 1 }} id="outlined-basic" variant="outlined" size="small" placeholder="Pipeline Name" />
              </PipelineName>
              <PipeLineButtonSection>
                <CheckBoxStack style={{ margin: "10px 0 0" }}>
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AntSwitch
                        defaultChecked
                        inputProps={{ "aria-label": "ant design" }}
                      />
                      <TypographyCheck>Deal Probability</TypographyCheck>
                    </Stack>
                  </FormGroup>
                </CheckBoxStack>
                <PipelineButtons>
                  <OutLinedButton variant="outlined">Cancel</OutLinedButton>
                  <OutLinedButton variant="outlined" className="savegreenbtn">Save Changes</OutLinedButton>
                </PipelineButtons>
              </PipeLineButtonSection>
            </PipelineTopbar>
            <PipelineStage>
              <Grid container spacing={2} className="pipelinenowrap">
                <Grid item xs={12} sm={8} md={9.5} className="scrollgrid">
                  <StagesData>
                    <StagesItems>
                      <LinkAddicon href="#">
                        <AddCircleIcon />
                      </LinkAddicon>
                      <SectionTopHeading>New Enquiries</SectionTopHeading>
                      <FormDataPipline>
                        <PiplineFormControl fullWidth variant="standard">
                          <InputLabel htmlFor="standard-adornment-amount">
                            Name
                          </InputLabel>
                          <Input
                            id="standard-adornment-amount"
                            placeholder="New Enquiries"
                            startAdornment={
                              <InputAdornment position="start"></InputAdornment>
                            }
                          />
                        </PiplineFormControl>
                        <PiplineFormControl fullWidth variant="standard">
                          <InputLabel htmlFor="standard-adornment-amount">
                            Probability
                          </InputLabel>
                          <Input
                            id="standard-adornment-amount"
                            placeholder=""
                            startAdornment={
                              <InputAdornment position="start"></InputAdornment>
                            }
                          />
                          <ErrorOutline />
                        </PiplineFormControl>
                        <CheckBoxStack>
                          <FormGroup>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <AntSwitch
                                defaultChecked
                                inputProps={{ "aria-label": "ant design" }}
                              />
                              <TypographyCheck>Rotting in (days)</TypographyCheck>
                            </Stack>
                          </FormGroup>
                          <ErrorOutlineOutlinedIcon />
                        </CheckBoxStack>
                        <DeleteStage>
                          {" "}
                          <Link
                            href="#"
                            onClick={handleClickOpen}
                            underline="hover"
                          >
                            <DeleteOutlineOutlinedIcon />
                            Delete Stage
                          </Link>
                        </DeleteStage>
                      </FormDataPipline>
                    </StagesItems>
                    <StagesItems>
                      <LinkAddicon href="#">
                        <AddCircleIcon />
                      </LinkAddicon>
                      <StagesHeading>To Do</StagesHeading>
                      <DealCardLayout>
                        <DealCardStyle>
                          <DealCardInfo>
                            <DealLeadNameValue variant="h5">Deal Name Here</DealLeadNameValue>
                            <Checkbox {...label} defaultChecked size="small" />
                          </DealCardInfo>
                          <DealOwner variant="h5"><i className="icon-account-icon"></i>Maya Dogra</DealOwner>
                          <DealCompanyInfo>
                            <DealComanyIcon><i className="icon-accountType"></i></DealComanyIcon>
                            <Typography>Arneja Trading Co.</Typography>
                          </DealCompanyInfo>
                          <DealCompanyInfo>
                            <DealComanyIcon><i className="icon-contact"></i></DealComanyIcon>
                            <Typography>Contact name here</Typography>
                          </DealCompanyInfo>
                          <DealAnnualRevenue>
                            <Grid container spacing={2}>
                              <Grid item md={6}>
                                <DealRevenueStack direction="row" alignItems="center" gap={1}>
                                  <img
                                    src="/assets/images/crm/dollar-icon.svg"
                                    alt="Edit"
                                    width={16}
                                    height={16}
                                  />
                                  <Typography>2,50,978.00</Typography>
                                </DealRevenueStack>
                              </Grid>
                              <Grid item md={6}>
                                <DealRevenueStack2 direction="row" alignItems="center" gap={1}>
                                  <CalendarMonthOutlinedIcon className="ccalender"/>
                                  <Typography fontWeight={400}>03/10/2023</Typography>
                                  <Link href="#"><AddIcon /></Link>
                                </DealRevenueStack2>

                              </Grid>
                            </Grid>
                          </DealAnnualRevenue>
                        </DealCardStyle>
                      </DealCardLayout>
                      <AddPipelineDiv className="addHover"><AddRoundedIcon /></AddPipelineDiv>
                      <DeleteStage>
                        {" "}
                        <Link href="#" onClick={handleClickOpen} underline="hover">
                          <DeleteOutlineOutlinedIcon />
                          Delete Stage
                        </Link>
                      </DeleteStage>
                    </StagesItems>
                    <StagesItems>
                      <LinkAddicon href="#">
                        <AddCircleIcon />
                      </LinkAddicon>
                      <StagesHeading sx={{ color: "#D7282F" }}>
                        High Priority
                      </StagesHeading>
                      <AddPipelineDiv className="addHover"><AddRoundedIcon /></AddPipelineDiv>
                      <DeleteStage>
                        {" "}
                        <Link href="#" underline="hover">
                          <DeleteOutlineOutlinedIcon />
                          Delete Stage
                        </Link>
                      </DeleteStage>
                    </StagesItems>
                    <StagesItems>
                      <LinkAddicon href="#">
                        <AddCircleIcon />
                      </LinkAddicon>
                      <StagesHeading>To Do</StagesHeading>
                      <AddPipelineDiv className="addHover"><AddRoundedIcon /></AddPipelineDiv>
                      <DeleteStage>
                        {" "}
                        <Link href="#" underline="hover">
                          <DeleteOutlineOutlinedIcon />
                          Delete Stage
                        </Link>
                      </DeleteStage>
                    </StagesItems>
                    <StagesItems>
                      <LinkAddicon href="#">
                        <AddCircleIcon />
                      </LinkAddicon>
                      <SectionTopHeading>New Enquiries</SectionTopHeading>
                      <FormDataPipline>
                        <PiplineFormControl fullWidth variant="standard">
                          <InputLabel htmlFor="standard-adornment-amount">
                            Name
                          </InputLabel>
                          <Input
                            id="standard-adornment-amount"
                            placeholder="New Enquiries"
                            startAdornment={
                              <InputAdornment position="start"></InputAdornment>
                            }
                          />
                        </PiplineFormControl>
                        <PiplineFormControl fullWidth variant="standard">
                          <InputLabel htmlFor="standard-adornment-amount">
                            Probability
                          </InputLabel>
                          <Input
                            id="standard-adornment-amount"
                            placeholder=""
                            startAdornment={
                              <InputAdornment position="start"></InputAdornment>
                            }
                          />
                          <ErrorOutline />
                        </PiplineFormControl>
                        <CheckBoxStack>
                          <FormGroup>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <AntSwitch
                                defaultChecked
                                inputProps={{ "aria-label": "ant design" }}
                              />
                              <TypographyCheck>Rotting in (days)</TypographyCheck>
                            </Stack>
                          </FormGroup>
                          <ErrorOutlineOutlinedIcon />
                        </CheckBoxStack>
                        <DeleteStage>
                          {" "}
                          <Link
                            href="#"
                            onClick={handleClickOpen}
                            underline="hover"
                          >
                            <DeleteOutlineOutlinedIcon />
                            Delete Stage
                          </Link>
                        </DeleteStage>
                      </FormDataPipline>
                    </StagesItems>
                    <StagesItems>
                      <LinkAddicon href="#">
                        <AddCircleIcon />
                      </LinkAddicon>
                      <StagesHeading>To Do</StagesHeading>
                      <DeleteStage>
                        {" "}
                        <Link href="#" onClick={handleClickOpen} underline="hover">
                          <DeleteOutlineOutlinedIcon />
                          Delete Stage
                        </Link>
                      </DeleteStage>
                    </StagesItems>
                    <StagesItems>
                      <LinkAddicon href="#">
                        <AddCircleIcon />
                      </LinkAddicon>
                      <StagesHeading sx={{ color: "#D7282F" }}>
                        High Priority
                      </StagesHeading>
                      <DeleteStage>
                        {" "}
                        <Link href="#" underline="hover">
                          <DeleteOutlineOutlinedIcon />
                          Delete Stage
                        </Link>
                      </DeleteStage>
                    </StagesItems>
                    <StagesItems>
                      <LinkAddicon href="#">
                        <AddCircleIcon />
                      </LinkAddicon>
                      <StagesHeading>To Do</StagesHeading>
                      <DeleteStage>
                        {" "}
                        <Link href="#" underline="hover">
                          <DeleteOutlineOutlinedIcon />
                          Delete Stage
                        </Link>
                      </DeleteStage>
                    </StagesItems>
                  </StagesData>
                </Grid>
                <Grid item xs={12} sm={5} md={2.5}>
                  <AddStagesBox>
                    <AddNewStageData>
                      <Box>
                        <Typography variant="h5" gutterBottom>
                          Add New Stage
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Powercozmo stages represent the steps in your sales
                          process
                        </Typography>
                        {/* <Button variant="outlined" endIcon={<AddCircleOutlineOutlinedIcon />} onClick={()=>dispatch(setPipeLinePopUp(true))}>
                      New Stage
                    </Button> */}
                        <Button variant="outlined" endIcon={<AddCircleOutlineOutlinedIcon />}>
                          New Stage
                        </Button>
                      </Box>
                    </AddNewStageData>
                  </AddStagesBox>
                </Grid>
              </Grid>
            </PipelineStage>
          </PipelineContainer>
          <div>
            <StyledBootstrapDialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={ManagaDeleteDialog}
            >
              <TitleDialog id="alert-dialog-title">{"Delete Stage"}</TitleDialog>
              <Divider />
              <DialogContent style={{ padding: 0 }}>
                <TextInfo>
                  <Typography variant="h6" gutterBottom>
                    Delete Demo Scheduled stage
                  </Typography>
                  <DialogContentText id="alert-dialog-description">
                    There are no deals in this stage right now.
                  </DialogContentText>
                </TextInfo>
                <TextInfo>
                  <Typography variant="h6" gutterBottom>
                    Delete Contact Made stage
                  </Typography>
                  <Typography variant="body1" gutterBottom> Before deleting this pipeline stage, please specify the
                    following:
                  </Typography>
                </TextInfo>
                <RadioButtonBox>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">1. What would you like to do with the deal in this stage?</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <SelectStage>
                        <FormControlLabel value="female" control={<Radio />} label="Move to another stage " />
                        <FormControl sx={{ mt: 1, minWidth: 150 }} size="small">
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            onChange={handleChange}
                            IconComponent={KeyboardArrowDownIcon}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Untouched</MenuItem>
                            <MenuItem value={20}>Qualified</MenuItem>
                            <MenuItem value={30}>Non-Qualified</MenuItem>
                            <MenuItem value={40}>Nurturing Leads</MenuItem>
                          </Select>
                        </FormControl>
                      </SelectStage>
                      <FormControlLabel value="male" control={<Radio />} label="Delete Deals" />
                    </RadioGroup>
                  </FormControl>
                </RadioButtonBox>
                <Divider />
                <DialogActions>
                  <SmallBlackOutineBtn variant="outlined" onClick={handleClose}>
                    Cancel
                  </SmallBlackOutineBtn>
                  <SmallRedOutineBtn
                    variant="outlined"
                    onClick={handleClose}
                  // startIcon={<DeleteOutlineOutlinedIcon />}
                  >
                    Delete Stage
                  </SmallRedOutineBtn>
                </DialogActions>
              </DialogContent>
            </StyledBootstrapDialog>
          </div>
        </CrmInnerContent>
        <PipeLinePopUp />
      </CrmFullData>
    </div>

  );
};
export default PipeManagement;
