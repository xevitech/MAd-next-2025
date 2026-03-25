import * as React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Popover,
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
  Count,
  ListPipeViewOuter,
  ListPipeBox,
  SectionTopHeading2,
  PopoverStages,
  PopoverPipeline,
  AddStagesHere,
  ViewPageStagesItems,
  ViewPageStagesItemsInner,
  ViewHeader,
} from "./style";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
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
import {
  CrmFullData,
  CrmInnerContent,
  CrmStyledMenu,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../commonStyle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { OutLinedButton } from "../style";
import { useAppDispatch } from "redux/store";
import { setPipeLinePopUp } from "@/hooks/UseCreateFormData";
import PipeLinePopUp from "./PipeLinePopUp";
import CommonHeader from "../Leads/CommonHeader";
import CommonCRMTabs from "../Leads/CommonCRMTabs";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu, { MenuProps } from "@mui/material/Menu";

const StyledMenu = styled((props: MenuProps) => (
  <Menu elevation={0} {...props} />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    "& .MuiDivider-root": { margin: "0" },
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));
const PipeLineList = () => {
  // const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  // const handleClickOpen = () => { setOpen(true); };
  // const handleClose = () => { setOpen(false); };
  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [anchorElThreedots, setAnchorElThreedots] =
    React.useState<null | HTMLElement>(null);
  const openThreedots = Boolean(anchorElThreedots);
  const handleClickThreedots = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElThreedots(event.currentTarget);
  };
  const handleCloseThreedots = () => {
    setAnchorElThreedots(null);
  };
  return (
    <div className="full_page">
      <CrmFullData>
        <OuterContainer>
          {/* <ProfileHeader text={"Lead Management Center"} /> */}
          <CommonHeader />
        </OuterContainer>
        <CrmInnerContent>
          {/* <PipeLineTabRow> */}
          {/* <Grid container spacing={2}>
              <Grid item xs={12} sm={9} md={9}> */}
          <CommonCRMTabs activeButton={1} />
          {/* </Grid> */}
          {/* <Grid item xs={12} sm={3} md={3}>
                <PipeLineButtonSection>
                  <CheckBoxStack style={{ margin: "0" }}>
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
                    <OutLinedButton variant="outlined">Save</OutLinedButton>
                  </PipelineButtons>
                </PipeLineButtonSection>
              </Grid>
            </Grid> */}
          {/* </PipeLineTabRow> */}
          <PipelineContainer>
            <PipeLineButtonSection>
              <CheckBoxStack style={{ margin: "0" }}>
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
                <OutLinedButton variant="outlined" className="savegreenbtn">
                  Save Changes
                </OutLinedButton>
              </PipelineButtons>
            </PipeLineButtonSection>
            <PipelineStage>
              <Grid container spacing={1} className="pipelinenowrap">
                <Grid item xs={12} sm={8} md={9.5} className="scrollgrid">
                  <StagesData className="scrollgrid">
                    <ViewPageStagesItems>
                      <ViewPageStagesItemsInner>
                        <ViewHeader>
                          <SectionTopHeading2>
                            Standard{" "}
                            <Count>
                              <Typography>11</Typography>
                            </Count>
                          </SectionTopHeading2>
                          <div>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={handleClickThreedots}
                            >
                              {" "}
                              <MoreHorizIcon />
                            </IconButton>
                            <StyledMenu
                              id="basic-menu"
                              anchorEl={anchorElThreedots}
                              open={openThreedots}
                              onClose={handleCloseThreedots}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                              sx={CrmStyledMenu}
                              PaperProps={{
                                elevation: 0,
                                sx: {
                                  overflow: "visible",
                                  filter:
                                    "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                  mt: 1.5,
                                  "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                  },
                                  "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
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
                              <MenuItem onClick={handleCloseThreedots}>
                                Clone
                              </MenuItem>
                              <Divider />
                              <MenuItem onClick={handleCloseThreedots}>
                                Delete
                              </MenuItem>
                            </StyledMenu>
                          </div>
                        </ViewHeader>
                        <ListPipeViewOuter>
                          <ListPipeBox>
                            <Typography>Needs Analysis</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Value Proposition</Typography>
                            <div className="listbox">
                              <CloseIcon />
                              <img
                                src="/assets/images/crm/thumbdown.svg"
                                className="thumbdown"
                              />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Identify Decision Makers</Typography>
                            <div className="listbox">
                              <CloseIcon />
                              <img
                                src="/assets/images/crm/thumbup.svg"
                                className="thumbup"
                              />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Proposal/Price Quote</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Negotiation/Review</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Lost</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Needs Analysis</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Value Proposition</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Identify Decision Makers</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Proposal/Price Quote</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Negotiation/Review</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Lost</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                        </ListPipeViewOuter>
                        <DeleteStage className="deletestagespace">
                          {" "}
                          <Button
                            disableRipple
                            aria-describedby={id}
                            variant="text"
                            onClick={handleClick}
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            endIcon={<KeyboardArrowDownIcon />}
                          >
                            Add Stages
                          </Button>
                          <PopoverPipeline
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            <PopoverStages>
                              <ListPipeBox>
                                <Typography>Needs Analysis</Typography>
                                <div className="listbox">
                                  <CloseIcon />
                                </div>
                              </ListPipeBox>
                              <ListPipeBox>
                                <Typography>Needs Analysis</Typography>
                                <div className="listbox">
                                  <CloseIcon />
                                </div>
                              </ListPipeBox>
                              <ListPipeBox>
                                <Typography>Stages 121</Typography>
                                <div className="listbox">
                                  <CloseIcon />
                                </div>
                              </ListPipeBox>
                              <ListPipeBox>
                                <Typography>New Stage</Typography>
                                <div className="listbox">
                                  <CloseIcon />
                                </div>
                              </ListPipeBox>
                              <ListPipeBox>
                                <Typography>Needs Analysis</Typography>
                                <div className="listbox">
                                  <CloseIcon />
                                </div>
                              </ListPipeBox>
                              <ListPipeBox>
                                <Typography>Needs Analysis</Typography>
                                <div className="listbox">
                                  <CloseIcon />
                                </div>
                              </ListPipeBox>
                              <ListPipeBox>
                                <Typography>Stages 121</Typography>
                                <div className="listbox">
                                  <CloseIcon />
                                </div>
                              </ListPipeBox>
                              <ListPipeBox>
                                <Typography>New Stage</Typography>
                                <div className="listbox">
                                  <CloseIcon />
                                </div>
                              </ListPipeBox>
                            </PopoverStages>
                            <AddStagesHere>
                              <Link href="#" underline="hover">
                                <AddCircleOutlineOutlinedIcon />
                                Create new Stage
                              </Link>
                            </AddStagesHere>
                          </PopoverPipeline>
                        </DeleteStage>
                      </ViewPageStagesItemsInner>
                    </ViewPageStagesItems>
                    <ViewPageStagesItems>
                      <ViewPageStagesItemsInner>
                        <SectionTopHeading2>
                          <div className="sucessiconns">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="svg-success"
                              viewBox="0 0 24 24"
                            >
                              <g
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-miterlimit="10"
                              >
                                <circle
                                  className="success-circle-outline"
                                  cx="12"
                                  cy="12"
                                  r="11.5"
                                />
                                <circle
                                  className="success-circle-fill"
                                  cx="12"
                                  cy="12"
                                  r="11.5"
                                />
                                <polyline
                                  className="success-tick"
                                  points="17,8.5 9.5,15.5 7,13"
                                />
                              </g>
                            </svg>
                          </div>
                          Standard{" "}
                          <Count>
                            <Typography>11</Typography>
                          </Count>
                        </SectionTopHeading2>
                        <ListPipeViewOuter>
                          <ListPipeBox>
                            <Typography>Needs Analysis</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Value Proposition</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Identify Decision Makers</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                        </ListPipeViewOuter>
                        <DeleteStage className="deletestagespace">
                          {" "}
                          <div>
                            <Button
                              disableRipple
                              aria-describedby={id}
                              variant="text"
                              onClick={handleClick}
                              startIcon={<AddCircleOutlineOutlinedIcon />}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              Add Stage
                            </Button>
                            <PopoverPipeline
                              id={id}
                              open={open}
                              PaperProps={{
                                style: {
                                  width: "300px",
                                },
                              }}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <PopoverStages>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Stages 121</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>New Stage</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Stages 121</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>New Stage</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                              </PopoverStages>
                              <AddStagesHere>
                                <Link href="#" underline="hover">
                                  <AddCircleOutlineOutlinedIcon />
                                  Create new Stage
                                </Link>
                              </AddStagesHere>
                            </PopoverPipeline>
                          </div>
                        </DeleteStage>
                      </ViewPageStagesItemsInner>
                    </ViewPageStagesItems>
                    <ViewPageStagesItems>
                      <ViewPageStagesItemsInner>
                        <ViewHeader>
                          <SectionTopHeading2>
                            Standard{" "}
                            <Count>
                              <Typography>11</Typography>
                            </Count>
                          </SectionTopHeading2>
                          <div>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={handleClickThreedots}
                            >
                              {" "}
                              <MoreHorizIcon />
                            </IconButton>
                            <StyledMenu
                              id="basic-menu"
                              anchorEl={anchorElThreedots}
                              open={openThreedots}
                              onClose={handleCloseThreedots}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                              sx={CrmStyledMenu}
                              PaperProps={{
                                elevation: 0,
                                sx: {
                                  overflow: "visible",
                                  filter:
                                    "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                  mt: 1.5,
                                  "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                  },
                                  "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
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
                              <MenuItem onClick={handleCloseThreedots}>
                                Clone
                              </MenuItem>
                              <Divider />
                              <MenuItem onClick={handleCloseThreedots}>
                                Delete
                              </MenuItem>
                            </StyledMenu>
                          </div>
                        </ViewHeader>
                        <ListPipeViewOuter>
                          <ListPipeBox>
                            <Typography>Needs Analysis</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Value Proposition</Typography>
                            <div className="listbox">
                              <CloseIcon />
                              <img
                                src="/assets/images/crm/thumbdown.svg"
                                className="thumbdown"
                              />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Identify Decision Makers</Typography>
                            <div className="listbox">
                              <CloseIcon />
                              <img
                                src="/assets/images/crm/thumbup.svg"
                                className="thumbup"
                              />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Proposal/Price Quote</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Negotiation/Review</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Lost</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Needs Analysis</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Value Proposition</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Identify Decision Makers</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Proposal/Price Quote</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Negotiation/Review</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Lost</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                        </ListPipeViewOuter>
                        <DeleteStage className="deletestagespace">
                          {" "}
                          <div>
                            <Button
                              disableRipple
                              aria-describedby={id}
                              variant="text"
                              onClick={handleClick}
                              startIcon={<AddCircleOutlineOutlinedIcon />}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              Add Stage
                            </Button>
                            <PopoverPipeline
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <PopoverStages>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Stages 121</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>New Stage</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Stages 121</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>New Stage</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                              </PopoverStages>
                              <AddStagesHere>
                                <Link href="#" underline="hover">
                                  <AddCircleOutlineOutlinedIcon />
                                  Create new Stage
                                </Link>
                              </AddStagesHere>
                            </PopoverPipeline>
                          </div>
                        </DeleteStage>
                      </ViewPageStagesItemsInner>
                    </ViewPageStagesItems>
                    <ViewPageStagesItems>
                      <ViewPageStagesItemsInner>
                        <SectionTopHeading2>
                          <div className="sucessiconns">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="svg-success"
                              viewBox="0 0 24 24"
                            >
                              <g
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-miterlimit="10"
                              >
                                <circle
                                  className="success-circle-outline"
                                  cx="12"
                                  cy="12"
                                  r="11.5"
                                />
                                <circle
                                  className="success-circle-fill"
                                  cx="12"
                                  cy="12"
                                  r="11.5"
                                />
                                <polyline
                                  className="success-tick"
                                  points="17,8.5 9.5,15.5 7,13"
                                />
                              </g>
                            </svg>
                          </div>
                          Standard{" "}
                          <Count>
                            <Typography>11</Typography>
                          </Count>
                        </SectionTopHeading2>
                        <ListPipeViewOuter>
                          <ListPipeBox>
                            <Typography>Needs Analysis</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Value Proposition</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Identify Decision Makers</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                        </ListPipeViewOuter>
                        <DeleteStage className="deletestagespace">
                          {" "}
                          <div>
                            <Button
                              disableRipple
                              aria-describedby={id}
                              variant="text"
                              onClick={handleClick}
                              startIcon={<AddCircleOutlineOutlinedIcon />}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              Add Stage
                            </Button>
                            <PopoverPipeline
                              id={id}
                              open={open}
                              PaperProps={{
                                style: {
                                  width: "300px",
                                },
                              }}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <PopoverStages>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Stages 121</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>New Stage</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Stages 121</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>New Stage</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                              </PopoverStages>
                              <AddStagesHere>
                                <Link href="#" underline="hover">
                                  <AddCircleOutlineOutlinedIcon />
                                  Create new Stage
                                </Link>
                              </AddStagesHere>
                            </PopoverPipeline>
                          </div>
                        </DeleteStage>
                      </ViewPageStagesItemsInner>
                    </ViewPageStagesItems>
                    <ViewPageStagesItems>
                      <ViewPageStagesItemsInner>
                        <ViewHeader>
                          <SectionTopHeading2>
                            Standard{" "}
                            <Count>
                              <Typography>11</Typography>
                            </Count>
                          </SectionTopHeading2>
                          <div>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={handleClickThreedots}
                            >
                              {" "}
                              <MoreHorizIcon />
                            </IconButton>
                            <StyledMenu
                              id="basic-menu"
                              anchorEl={anchorElThreedots}
                              open={openThreedots}
                              onClose={handleCloseThreedots}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                              sx={CrmStyledMenu}
                              PaperProps={{
                                elevation: 0,
                                sx: {
                                  overflow: "visible",
                                  filter:
                                    "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                  mt: 1.5,
                                  "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                  },
                                  "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
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
                              <MenuItem onClick={handleCloseThreedots}>
                                Clone
                              </MenuItem>
                              <Divider />
                              <MenuItem onClick={handleCloseThreedots}>
                                Delete
                              </MenuItem>
                            </StyledMenu>
                          </div>
                        </ViewHeader>
                        <ListPipeViewOuter>
                          <ListPipeBox>
                            <Typography>Needs Analysis</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Value Proposition</Typography>
                            <div className="listbox">
                              <CloseIcon />
                              <img
                                src="/assets/images/crm/thumbdown.svg"
                                className="thumbdown"
                              />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Identify Decision Makers</Typography>
                            <div className="listbox">
                              <CloseIcon />
                              <img
                                src="/assets/images/crm/thumbup.svg"
                                className="thumbup"
                              />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Proposal/Price Quote</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Negotiation/Review</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Lost</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Needs Analysis</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Value Proposition</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Identify Decision Makers</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Proposal/Price Quote</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Negotiation/Review</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Lost</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Closed Won</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                        </ListPipeViewOuter>
                        <DeleteStage className="deletestagespace">
                          {" "}
                          <div>
                            <Button
                              disableRipple
                              aria-describedby={id}
                              variant="text"
                              onClick={handleClick}
                              startIcon={<AddCircleOutlineOutlinedIcon />}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              Add Stage
                            </Button>
                            <PopoverPipeline
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <PopoverStages>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Stages 121</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>New Stage</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Stages 121</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>New Stage</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                              </PopoverStages>
                              <AddStagesHere>
                                <Link href="#" underline="hover">
                                  <AddCircleOutlineOutlinedIcon />
                                  Create new Stage
                                </Link>
                              </AddStagesHere>
                            </PopoverPipeline>
                          </div>
                        </DeleteStage>
                      </ViewPageStagesItemsInner>
                    </ViewPageStagesItems>
                    <ViewPageStagesItems>
                      <ViewPageStagesItemsInner>
                        <SectionTopHeading2>
                          <div className="sucessiconns">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="svg-success"
                              viewBox="0 0 24 24"
                            >
                              <g
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-miterlimit="10"
                              >
                                <circle
                                  className="success-circle-outline"
                                  cx="12"
                                  cy="12"
                                  r="11.5"
                                />
                                <circle
                                  className="success-circle-fill"
                                  cx="12"
                                  cy="12"
                                  r="11.5"
                                />
                                <polyline
                                  className="success-tick"
                                  points="17,8.5 9.5,15.5 7,13"
                                />
                              </g>
                            </svg>
                          </div>
                          Standard{" "}
                          <Count>
                            <Typography>11</Typography>
                          </Count>
                        </SectionTopHeading2>
                        <ListPipeViewOuter>
                          <ListPipeBox>
                            <Typography>Needs Analysis</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Value Proposition</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                          <ListPipeBox>
                            <Typography>Identify Decision Makers</Typography>
                            <div className="listbox">
                              <CloseIcon />
                            </div>
                          </ListPipeBox>
                        </ListPipeViewOuter>
                        <DeleteStage className="deletestagespace">
                          {" "}
                          <div>
                            <Button
                              disableRipple
                              aria-describedby={id}
                              variant="text"
                              onClick={handleClick}
                              startIcon={<AddCircleOutlineOutlinedIcon />}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              Add Stage
                            </Button>
                            <PopoverPipeline
                              id={id}
                              open={open}
                              PaperProps={{
                                style: {
                                  width: "300px",
                                },
                              }}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <PopoverStages>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Stages 121</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>New Stage</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Needs Analysis</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>Stages 121</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                                <ListPipeBox>
                                  <Typography>New Stage</Typography>
                                  <div className="listbox">
                                    <CloseIcon />
                                  </div>
                                </ListPipeBox>
                              </PopoverStages>
                              <AddStagesHere>
                                <Link href="#" underline="hover">
                                  <AddCircleOutlineOutlinedIcon />
                                  Create new Stage
                                </Link>
                              </AddStagesHere>
                            </PopoverPipeline>
                          </div>
                        </DeleteStage>
                      </ViewPageStagesItemsInner>
                    </ViewPageStagesItems>
                  </StagesData>
                </Grid>
                <Grid item xs={12} sm={5} md={2.5}>
                  <AddStagesBox>
                    <AddNewStageData>
                      <Box>
                        <Typography variant="h5" gutterBottom>
                          Add New Pipeline
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Powercozmo stages represent the steps in your sales
                          process
                        </Typography>
                        <Button
                          variant="outlined"
                          endIcon={<AddCircleOutlineOutlinedIcon />}
                          onClick={() => dispatch(setPipeLinePopUp(true))}
                        >
                          New Stage
                        </Button>
                        <Button
                          disableRipple
                          variant="outlined"
                          endIcon={<AddCircleOutlineOutlinedIcon />}
                        >
                          New Pipeline
                        </Button>
                      </Box>
                    </AddNewStageData>
                  </AddStagesBox>
                </Grid>
              </Grid>
            </PipelineStage>
          </PipelineContainer>
        </CrmInnerContent>
        <PipeLinePopUp />
      </CrmFullData>
    </div>
  );
};
export default PipeLineList;
