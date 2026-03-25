import React, { useEffect, useRef, useState } from "react";
import { OuterContainer } from "../../SellerTools/styles";
import { ProfileHeader } from "../../common/profileheader";
import {
  NoImage,
  PageDescription,
  PageHeading,
  NoScoreContent,
  CreareHeading,
  CreateScoreform,
  CustomActionButon,
  CreateScoreDialog,
  ScorRuleOuterWrap,
  ScorRuleTopBar,
  TopLeftcontent,
  LayoutInfo,
  Pageheading,
  TextAreaBox,
  InnerContentSection,
  StackRowItem,
  InnerItem,
  LeadFieldValue,
  LeadField,
  AddPoints,
  StackBox,
  FormValueS,
  ConfirmationMsg,
  ConfigureStack,
  GridCon,
  ScorRuleInner,
  LeadFieldStack,
  NumCircleOuter,
  NumCircle,
  MiddleText,
  CustolFieldData,
  CriteriaFormValue,
  LinkText,
  ScoringListPage,
  ScoringListOuter,
  SearchScoringBar,
  TopBarLeft,
  ScroingFullpageData,
  DeactivateRuleBox,
  DeactivatePopover,
  EditDeleteAction,
  IconButtonEdit,
  IconButtonDelete,
  EditDeleteHover,
  GridContainerr,
} from "./style";
import {
  ActionIcons,
  BtnFilledLeads,
  CommonFormcontrol,
  CrmFullData,
  IconButtonAdd,
  IconButtonRemove,
  OutLinedButton,
  SearchCommon,
  SmallFilledBtn,
  SmallOutineBtn,
  StyledBootstrapDialog,
} from "../commonStyle";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormGroup,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Switch,
  SwitchProps,
  TextField,
  // TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { styled } from "@mui/system";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import { FormControl } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { CustomFieldControl, FilterField } from "../style";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "../commonStyle";
import { LicenseInfo } from "@mui/x-license-pro";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MenuProps } from "@/components/profile/personalProfile/styles";
import {
  CheckBoxFilter,
  DateFilter,
  DropDownFilter,
  NumberFilter,
  StringFilter,
  apiClient,
} from "@/components/common/common";
import MobileInputCommon from "@/components/common/PhoneInput";
import { useSelector } from "react-redux";
import { CustomDatePicker } from "@/components/common/datePicker";
import CommonOwner from "../Leads/CommonOwner";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
import { getAllFieldData, getAllType } from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { toast } from "react-toastify";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" />
))(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff !important",
      "& + .MuiSwitch-track": {
        backgroundColor: "#78B768",
        opacity: 1,
        border: 0,
        color: "#fff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    opacity: 1,
    background: "#D1D1D6",
  },
}));
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  //...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const CreateScoring = () => {
  const [age, setAge] = useState("10");
  const [emails, setEmail] = useState([
    { id: 1, checked: false, email: "received", compare: "+", value: "10" },
    { id: 2, checked: false, email: "open", compare: "+", value: "10" },
    { id: 3, checked: false, email: "clicked", compare: "+", value: "10" },
    { id: 4, checked: false, email: "bounced", compare: "+", value: "10" },
    { id: 5, checked: false, email: "respond", compare: "+", value: "10" },
    { id: 6, checked: false, email: "visit", compare: "+", value: "10" },
  ]);

  const [module, setModule] = useState("");
  const [desc, setDesc] = useState("");
  const [addCriteria, setAddCriteria] = useState<any>({
    scoring: true,
    operator: "+",
    point: "10",
  });
  const [showCriteria, setShowCriteria] = useState([]);
  const autocompleteRef = useRef(null);
  const [filterTags, setFilterTags] = useState<any>([]);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const { savedFieldData, allTypeId, userLists, userTags } = useSelector(
    (state: any) => state.formList
  );
  const dispatch = useAppDispatch();
  const [filterType, setFilterType] = useState<any>([]);
  const [scoringName, setScoring] = useState<any>("");
  const [inputList, setInputList] = useState([
    {
      field_id: "",
      comparator: "",
      value: "",
      group_operator: "And",
      userID: "",
      point: "10",
      operator: "+",
      scoring: true,
    },
  ]);
  const [opendialog, setOpen] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState({ status: false, index: "" });

  const handleChangeCriteria = async (type, e, inputIndex, inputType) => {
    if (type == 1) {
      const list = [...inputList];
      list[inputIndex]["group_operator"] = e == "Or" ? "And" : "Or";
      setInputList(list);
    } else {
      if (inputType != "tag" && inputType != "integer") {
        const { name, value } = e.target;
        const list = [...inputList];
        list[inputIndex][name] = value;
        setInputList(list);
      } else if ((inputType = "integer")) {
        // const { name, value } = e.target;
        const list = [...inputList];
        list[inputIndex]["value"] = e;
        setInputList(list);
      } else {
        const list = [...inputList];
        list[inputIndex][e?.target?.name] = e?.target?.mainId;
        list[inputIndex]["value"] = e?.target?.value;
        setInputList(list);
      }
    }
  };

  const editCriteria = (index) => {
    setShowEdit({ status: true, index: index });
    setOpen2(true);
  };

  const handleCloseDialog = () => {
    setOpen2(false);
  };
  const handleRemoveNewInput = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(getAllFieldData());
    dispatch(getAllType());
  }, [dispatch]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [opendialog2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleCloseDialog2 = () => {
    setOpen2(false);
    setAddCriteria({});
    setInputList([]);
  };
  console.log(
    addCriteria,
    inputList,
    savedFieldData?.data?.filter_fields,
    StringFilter,
    "addCriteria"
  );

  const [anchorElP, setAnchorElP] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElP(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorElP(null);
  };

  const handleAddNewInput = () => {
    const list = [...inputList];
    list.push({
      field_id: "",
      comparator: "",
      value: "",
      group_operator: "And",
      userID: "",
      point: "10",
      operator: "+",
      scoring: true,
    });
    setInputList(list);
  };
  const handleChangeEmail = (value, id, type) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === id) {
        return { ...email, [type]: value };
      }
      return email;
    });

    setEmail(updatedEmails);
  };

  const handleSaveScore = async () => {
    const filteredEmails = emails?.filter(
      (item) => item.id !== 1 && item?.id !== 5 && item?.id !== 6
    );
    const emailInsightJson = {};
    filteredEmails.forEach((email) => {
      emailInsightJson[email.checked && email.email] = {
        scoring: email.checked,
        point: email.value,
        operator: email.compare,
      };
    });

    const payload = {
      name: scoringName,
      module_type: module,
      layout_type: "Standard",
      description: desc,
      lead_json_fields: [
        {
          scoring: addCriteria?.scoring,
          point: addCriteria?.point,
          operator: addCriteria?.operator,
          group: inputList?.length > 0 ? inputList : [],
        },
      ],
      emails:
        emails?.find((item) => item.id === 1) &&
          emails?.find((item) => item.id === 1).checked
          ? {
            scoring: emails?.find((item) => item.id === 1)?.checked,
            point: emails?.find((item) => item.id === 1)?.value,
            operator: emails?.find((item) => item.id === 1)?.compare,
          }
          : {},
      email_insight_json: emailInsightJson,
      survey: {
        responded: emails?.find((item) => item.id === 5)?.checked
          ? {
            scoring: emails?.find((item) => item.id === 5)?.checked,
            point: emails?.find((item) => item.id === 5)?.value,
            operator: emails?.find((item) => item.id === 5)?.compare,
          }
          : {},
        visited: emails?.find((item) => item.id === 6)?.checked
          ? {
            scoring: emails?.find((item) => item.id === 6)?.checked,
            point: emails?.find((item) => item.id === 6)?.value,
            operator: emails?.find((item) => item.id === 6)?.compare,
          }
          : {},
      },
    };

    let response = await apiClient("crm/score/rule", "post", {
      body: payload,
    });
    if (response.status == true) {
      toast.success(response.message);
    }
  };

  const addSpecificRule = () => {
    setOpen2(false);
  };

  const openP = Boolean(anchorElP);
  const id = openP ? "simple-popover" : undefined;

  return (
    <div className="full_page">
      <CrmFullData>
        <OuterContainer>
          <ProfileHeader text={"Scoring Rules"} />
        </OuterContainer>
        <ScroingFullpageData>
          <CreateScoreDialog>
            <div>
              <StyledBootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={opendialog}
              >
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleCloseDialog}
                >
                  <CreareHeading variant="h4">
                    Create Scoring Rule
                  </CreareHeading>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <CreateScoreform>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12}>
                        <CommonFormcontrol required fullWidth size="small">
                          <TextField
                            fullWidth
                            required
                            label="Name"
                            id="outlined-size-small"
                            size="small"
                            placeholder="Enter Name"
                          // value={scoringName}
                          // onChange={(e)=>setScoring(e.target.value)}
                          />
                        </CommonFormcontrol>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <CommonFormcontrol required fullWidth size="small">
                          <InputLabel id="demo-select-small-label">
                            Module
                          </InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            label="Module"
                            onChange={handleChange}
                            IconComponent={KeyboardArrowDownOutlinedIcon}
                            placeholder="Select Module"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Lead</MenuItem>
                            <MenuItem value={20}>Contacts</MenuItem>
                            <MenuItem value={30}>Accounts</MenuItem>
                            <MenuItem value={40}>Deal</MenuItem>
                            <MenuItem value={50}>Quotes</MenuItem>
                            <MenuItem value={60}>Calls</MenuItem>
                            <MenuItem value={70}>Meetings</MenuItem>
                            <MenuItem value={80}>Tasks</MenuItem>
                          </Select>
                        </CommonFormcontrol>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <CommonFormcontrol required fullWidth size="small">
                          <InputLabel id="demo-select-small-label">
                            Layout
                          </InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            label="Layout"
                            onChange={handleChange}
                            IconComponent={KeyboardArrowDownOutlinedIcon}
                            placeholder="Lead Status"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>All Layouts</MenuItem>
                            <MenuItem value={20}>Standard</MenuItem>
                          </Select>
                        </CommonFormcontrol>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <CommonFormcontrol required fullWidth>
                          <TextField
                            id="outlined-textarea"
                            label="Description"
                            placeholder="Placeholder"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            multiline
                          />
                        </CommonFormcontrol>
                      </Grid>
                    </Grid>
                  </CreateScoreform>
                </DialogContent>
                <DialogActions>
                  <CustomActionButon>
                    <SmallFilledBtn variant="outlined">Save</SmallFilledBtn>
                    <SmallOutineBtn
                      variant="outlined"
                      onClick={handleCloseDialog}
                    >
                      Cancel
                    </SmallOutineBtn>
                  </CustomActionButon>
                </DialogActions>
              </StyledBootstrapDialog>
            </div>
          </CreateScoreDialog>

          <ScorRuleOuterWrap>
            <ScorRuleInner>
              <ScorRuleTopBar>
                <TopLeftcontent sx={{
                  "@media screen and (max-width:900px)": {
                    justifyContent:"start",
                  }
                }}>
                  <Pageheading>Scoring Rule Name</Pageheading>
                  <LayoutInfo>
                    <Typography>Leads - All Layouts</Typography>
                  </LayoutInfo>
                </TopLeftcontent>
                <TopLeftcontent>
                  <Pageheading>Scoring Rule is Active.</Pageheading>
                  <Box sx={{   "@media screen and (max-width:900px)": {
              
            alignItems:"center"
                  }}}>
                    <BtnFilledLeads
                      varient="filled"
                      onClick={(e) => handleClickPopover(e)}
                    >
                      Deactivate
                    </BtnFilledLeads>
                    <Tooltip title="Account settings">
                      <IconButton
                        sx={{ p: 0 }}
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <IconButton aria-label="delete">
                          <MoreVertIcon />
                        </IconButton>
                      </IconButton>
                    </Tooltip>
               
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    // onClose={handleClose}
                    // onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        width: "90px",
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
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
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                      }}
                    >
                      Clone
                    </MenuItem>
                    <Divider sx={{ margin: "0 !important" }} />
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                  </Menu>
                  </Box>
                </TopLeftcontent>
              </ScorRuleTopBar>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  <CommonFormcontrol size="small" fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      size="small"
                      value={scoringName}
                      onChange={(e) => setScoring(e.target.value)}
                    />
                  </CommonFormcontrol>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6}>
                  <CommonFormcontrol size="small" fullWidth>
                    <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" size="small" />
                  </CommonFormcontrol>
                </Grid> */}
                <Grid item xs={12} sm={6} md={6}>
                  <CommonFormcontrol fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Select Module
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={module}
                      label="Module"
                      size="small"
                      onChange={(e) => setModule(e.target.value)}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                    >
                      <MenuItem value={""}>Select Module</MenuItem>
                      {allTypeId?.length > 0 &&
                        allTypeId
                          ?.filter(
                            (ele) =>
                              ele?.name !== "Tasks" &&
                              ele?.name !== "Calls" &&
                              ele.name !== "Meetings"
                          )
                          ?.map((item) => (
                            <MenuItem value={item?.id}>{item?.name}</MenuItem>
                          ))}
                    </Select>
                  </CommonFormcontrol>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  {/* <TextAreaBox> */}
                  <CommonFormcontrol fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-textarea"
                      placeholder="Description goes here.."
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      multiline
                      rows={4}
                    />
                  </CommonFormcontrol>
                  {/* </TextAreaBox> */}
                </Grid>
              </Grid>
              <InnerContentSection>
                <LeadFieldStack>
                  <Pageheading variant="h4" gutterBottom>
                    Lead Fields
                  </Pageheading>
                  <Grid container spacing={2}>
                    {inputList?.length > 0 &&
                      inputList?.map((item: any, index: any) => {
                        return (
                          <StackBox>
                            {inputList?.length > 0 &&
                              savedFieldData?.data?.filter_fields?.map(
                                (ele: any) => {
                                  if (item?.field_id === ele?.id) {
                                    return (
                                      <StackRowItem item md={12}>
                                        <GridContainerr container>
                                          <InnerItem md={6}>
                                            <LeadField>
                                              {" "}
                                              {index + 1}. {ele?.label}
                                            </LeadField>
                                            <LeadFieldValue>
                                              {" "}
                                              {
                                                StringFilter?.find(
                                                  (itm) =>
                                                    itm?.values ==
                                                    item?.comparator
                                                )?.name
                                              }{" "}
                                              {item?.value}
                                            </LeadFieldValue>
                                            <InnerItem md={6}>
                                              <EditDeleteHover>
                                                <AddPoints>
                                                  {" "}
                                                  {item?.operator == "+"
                                                    ? "Add"
                                                    : "Subtract"}
                                                  {item?.point} Points
                                                </AddPoints>
                                                <EditDeleteAction>
                                                  <IconButtonEdit
                                                    aria-label="Remove"
                                                    className="icon icon-enter"
                                                    onClick={() => {
                                                      editCriteria(index);
                                                    }}
                                                  >
                                                    <i className="fa-home">
                                                      <ModeEditOutlineOutlinedIcon />
                                                    </i>
                                                  </IconButtonEdit>
                                                  <Divider
                                                    sx={{ margin: "4px 0" }}
                                                    orientation="vertical"
                                                    variant="middle"
                                                    flexItem
                                                  />
                                                  <IconButtonDelete
                                                    aria-label="Add"
                                                    className="icon icon-enter"
                                                  >
                                                    <i className="fa-home">
                                                      <DeleteOutlineOutlinedIcon />
                                                    </i>
                                                  </IconButtonDelete>
                                                </EditDeleteAction>
                                              </EditDeleteHover>
                                            </InnerItem>
                                          </InnerItem>
                                        </GridContainerr>
                                      </StackRowItem>
                                    );
                                  }
                                }
                              )}
                          </StackBox>
                        );
                      })}
                    {/* <StackBox>
                      <StackRowItem item md={12}>
                        <GridContainerr container>
                          <InnerItem md={6}>
                            <LeadField> 1. City</LeadField>
                            <LeadFieldValue>IS NOT EMPTY</LeadFieldValue>
                          </InnerItem>
                          <InnerItem md={6}>
                            <EditDeleteHover>
                              <AddPoints>Add 10 Points</AddPoints>
                              <EditDeleteAction>
                                <IconButtonEdit
                                  aria-label="Remove"
                                  className="icon icon-enter"
                                >
                                  <i className="fa-home">
                                    <ModeEditOutlineOutlinedIcon />
                                  </i>
                                </IconButtonEdit>
                                <Divider
                                  sx={{ margin: "4px 0" }}
                                  orientation="vertical"
                                  variant="middle"
                                  flexItem
                                />
                                <IconButtonDelete
                                  aria-label="Add"
                                  className="icon icon-enter"
                                >
                                  <i className="fa-home">
                                    <DeleteOutlineOutlinedIcon />
                                  </i>
                                </IconButtonDelete>
                              </EditDeleteAction>
                            </EditDeleteHover>
                          </InnerItem>
                        </GridContainerr>
                      </StackRowItem>
                      <StackRowItem item md={12}>
                        <GridContainerr container>
                          <InnerItem md={6}>
                            <LeadField> 2. Email</LeadField>
                            <LeadFieldValue>IS NOT EMPTY</LeadFieldValue>
                          </InnerItem>
                          <InnerItem md={6}>
                            <AddPoints>Add 10 Points</AddPoints>
                          </InnerItem>
                        </GridContainerr>
                      </StackRowItem>
                      <StackRowItem item md={12}>
                        <GridContainerr container>
                          <InnerItem md={6}>
                            <LeadField>3. Phone</LeadField>
                            <LeadFieldValue>IS NOT EMPTY</LeadFieldValue>
                          </InnerItem>
                          <InnerItem md={6}>
                            <AddPoints>Add 10 Points</AddPoints>
                          </InnerItem>
                        </GridContainerr>
                      </StackRowItem>
                    </StackBox> */}
                  </Grid>
                  <Root>
                    <Divider textAlign="left">
                      <LinkText underline="hover">
                        {" "}
                        <Typography onClick={handleClickOpen2}>
                          Add Criteria
                        </Typography>
                      </LinkText>
                    </Divider>
                  </Root>
                </LeadFieldStack>
                <Stack>
                  <Pageheading variant="h4" gutterBottom>
                    Email
                  </Pageheading>
                  <Grid container spacing={2}>
                    <StackBox>
                      <StackRowItem item md={12}>
                        <GridContainerr container>
                          <InnerItem md={6}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      emails?.find((item) => item.id == 1)
                                        .checked
                                    }
                                    onChange={(e) =>
                                      handleChangeEmail(
                                        e.target.checked,
                                        1,
                                        "checked"
                                      )
                                    }
                                  />
                                }
                                label="For every email response received"
                              />
                            </FormGroup>
                          </InnerItem>
                          <InnerItem md={6}>
                            <FormValueS>
                              <FormControl>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={
                                    emails?.find((item) => item.id == 1).compare
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      1,
                                      "compare"
                                    )
                                  }
                                  IconComponent={KeyboardArrowDownOutlinedIcon}
                                >
                                  <MenuItem value={"+"}>Add</MenuItem>
                                  <MenuItem value={"-"}>Subtract</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl size="small">
                                <TextField
                                  id="outlined-size-small"
                                  size="small"
                                  value={
                                    emails?.find((item) => item.id == 1).value
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      1,
                                      "value"
                                    )
                                  }
                                />
                              </FormControl>
                              <Typography>Points</Typography>
                            </FormValueS>
                          </InnerItem>
                        </GridContainerr>
                      </StackRowItem>
                    </StackBox>
                  </Grid>
                </Stack>
                <Stack>
                  <Pageheading variant="h4" gutterBottom>
                    Email Insights
                  </Pageheading>
                  <Grid container spacing={2}>
                    <StackBox>
                      <StackRowItem item md={12}>
                        <Grid container>
                          <InnerItem md={6}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={
                                      emails?.find((item) => item.id == 2)
                                        .checked
                                    }
                                    onChange={(e) =>
                                      handleChangeEmail(
                                        e.target.checked,
                                        2,
                                        "checked"
                                      )
                                    }
                                  />
                                }
                                label="For every email opened"
                              />
                            </FormGroup>
                          </InnerItem>
                          <InnerItem md={6}>
                            <FormValueS>
                              <FormControl>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={
                                    emails?.find((item) => item.id == 2).compare
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      2,
                                      "compare"
                                    )
                                  }
                                  IconComponent={KeyboardArrowDownOutlinedIcon}
                                >
                                  <MenuItem value={"+"}>Add</MenuItem>
                                  <MenuItem value={"-"}>Subtract</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl size="small">
                                <TextField
                                  id="outlined-size-small"
                                  defaultValue="10"
                                  size="small"
                                  value={
                                    emails?.find((item) => item.id == 2).value
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      2,
                                      "value"
                                    )
                                  }
                                />
                              </FormControl>
                              <Typography>Points</Typography>
                            </FormValueS>
                          </InnerItem>
                        </Grid>
                      </StackRowItem>
                      <StackRowItem item md={12}>
                        <Grid container>
                          <InnerItem md={6}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={
                                      emails?.find((item) => item.id == 3)
                                        .checked
                                    }
                                    onChange={(e) =>
                                      handleChangeEmail(
                                        e.target.value,
                                        3,
                                        "checked"
                                      )
                                    }
                                  />
                                }
                                label="For every email clicked"
                              />
                            </FormGroup>
                          </InnerItem>
                          <InnerItem md={6}>
                            <FormValueS>
                              <FormControl>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={
                                    emails?.find((item) => item.id == 3).compare
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      3,
                                      "compare"
                                    )
                                  }
                                  IconComponent={KeyboardArrowDownOutlinedIcon}
                                >
                                  <MenuItem value={"+"}>Add</MenuItem>
                                  <MenuItem value={"-"}>Subtract</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl size="small">
                                <TextField
                                  id="outlined-size-small"
                                  defaultValue="10"
                                  size="small"
                                  value={
                                    emails?.find((item) => item.id == 3).value
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      3,
                                      "value"
                                    )
                                  }
                                />
                              </FormControl>
                              <Typography>Points</Typography>
                            </FormValueS>
                          </InnerItem>
                        </Grid>
                      </StackRowItem>
                      <StackRowItem item md={12}>
                        <Grid container>
                          <InnerItem md={6}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={
                                      emails?.find((item) => item.id == 4)
                                        .checked
                                    }
                                    onChange={(e) =>
                                      handleChangeEmail(
                                        e.target.value,
                                        4,
                                        "checked"
                                      )
                                    }
                                  />
                                }
                                label="For every email bounce"
                              />
                            </FormGroup>
                          </InnerItem>
                          <InnerItem md={6}>
                            <FormValueS>
                              <FormControl>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={
                                    emails?.find((item) => item.id == 4).compare
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      4,
                                      "compare"
                                    )
                                  }
                                  IconComponent={KeyboardArrowDownOutlinedIcon}
                                >
                                  <MenuItem value={"+"}>Add</MenuItem>
                                  <MenuItem value={"-"}>Subtract</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl size="small">
                                <TextField
                                  id="outlined-size-small"
                                  defaultValue="10"
                                  size="small"
                                  value={
                                    emails?.find((item) => item.id == 4).value
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      4,
                                      "value"
                                    )
                                  }
                                />
                              </FormControl>
                              <Typography>Points</Typography>
                            </FormValueS>
                          </InnerItem>
                        </Grid>
                      </StackRowItem>
                    </StackBox>
                  </Grid>
                </Stack>
                <Stack>
                  <Pageheading variant="h4" gutterBottom>
                    Survey
                  </Pageheading>
                  <Grid container spacing={2}>
                    <StackBox>
                      <StackRowItem item md={12}>
                        <Grid container>
                          <InnerItem md={6}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={
                                      emails?.find((item) => item.id == 5)
                                        .checked
                                    }
                                    onChange={(e) =>
                                      handleChangeEmail(
                                        e.target.checked,
                                        5,
                                        "checked"
                                      )
                                    }
                                  />
                                }
                                label="For every Survey responded"
                              />
                            </FormGroup>
                          </InnerItem>
                          <InnerItem md={6}>
                            <FormValueS>
                              <FormControl>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={
                                    emails?.find((item) => item.id == 5).compare
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      5,
                                      "compare"
                                    )
                                  }
                                  IconComponent={KeyboardArrowDownOutlinedIcon}
                                >
                                  <MenuItem value={"+"}>Add</MenuItem>
                                  <MenuItem value={"-"}>Subtract</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl size="small">
                                <TextField
                                  id="outlined-size-small"
                                  size="small"
                                  value={
                                    emails?.find((item) => item.id == 5).value
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      5,
                                      "value"
                                    )
                                  }
                                />
                              </FormControl>
                              <Typography>Points</Typography>
                            </FormValueS>
                          </InnerItem>
                        </Grid>
                      </StackRowItem>
                      <StackRowItem item md={12}>
                        <Grid container>
                          <InnerItem md={6}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={
                                      emails?.find((item) => item.id == 6)
                                        .checked
                                    }
                                    onChange={(e) =>
                                      handleChangeEmail(
                                        e.target.checked,
                                        6,
                                        "checked"
                                      )
                                    }
                                  />
                                }
                                label="For every survey visited"
                              />
                            </FormGroup>
                          </InnerItem>
                          <InnerItem md={6}>
                            <FormValueS>
                              <FormControl>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={
                                    emails?.find((item) => item.id == 6).compare
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      6,
                                      "compare"
                                    )
                                  }
                                  IconComponent={KeyboardArrowDownOutlinedIcon}
                                >
                                  <MenuItem value={"+"}>Add</MenuItem>
                                  <MenuItem value={"-"}>Subtract</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl size="small">
                                <TextField
                                  id="outlined-size-small"
                                  size="small"
                                  value={
                                    emails?.find((item) => item.id == 6).value
                                  }
                                  onChange={(e) =>
                                    handleChangeEmail(
                                      e.target.value,
                                      6,
                                      "value"
                                    )
                                  }
                                />
                              </FormControl>
                              <Typography>Points</Typography>
                            </FormValueS>
                          </InnerItem>
                        </Grid>
                      </StackRowItem>
                    </StackBox>
                  </Grid>
                </Stack>
                {/* <ConfirmationMsg>
                  Would you like to add score fields to the records ?
                  <span>
                    <LinkText href="#" underline="hover">
                      Yes, proceed
                    </LinkText>
                  </span>
                </ConfirmationMsg>
                <ConfigureStack>
                  <Pageheading variant="h4" gutterBottom>
                    Configure Scoring Rule Fieldsidcondition
                  </Pageheading>
                  <GridCon container spacing={4}>
                    <Grid item md={5}>
                      <TextField
                        id="outlined-basic"
                        label="Field Name"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter field name"
                      />
                    </Grid>
                    <Grid item md={5}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Score
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Score"
                          onChange={handleChange}
                          IconComponent={KeyboardArrowDownOutlinedIcon}
                        >
                          <MenuItem value={10}>Select score value</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={2}>
                      <ActionIcons>
                        <IconButtonRemove aria-label="Remove">
                          <RemoveIcon />
                        </IconButtonRemove>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <IconButtonAdd aria-label="Add">
                          <AddIcon />
                        </IconButtonAdd>
                      </ActionIcons>
                    </Grid>
                  </GridCon>
                </ConfigureStack> */}
                <Divider />
                <CustomActionButon>
                  <SmallFilledBtn variant="outlined" onClick={handleSaveScore}>
                    Save
                  </SmallFilledBtn>
                  <SmallOutineBtn
                    variant="outlined"
                    onClick={handleCloseDialog}
                  >
                    Cancel
                  </SmallOutineBtn>
                </CustomActionButon>
              </InnerContentSection>
            </ScorRuleInner>
            <div>
              <StyledBootstrapDialog
                onClose={handleCloseDialog2}
                aria-labelledby="customized-dialog-title"
                open={opendialog2}
              >
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleCloseDialog2}
                >
                  <CreareHeading variant="h4">Choose Criteria</CreareHeading>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  {/* <CustolFieldData>
                    <Grid container spacing={2}>
                      <Grid item md={12}>
                        <Grid container spacing={2}>
                          <Grid item md={0.5}>
                            <NumCircleOuter>
                              <NumCircle>1</NumCircle>
                              <MiddleText>
                                <Typography>And</Typography>
                              </MiddleText>
                            </NumCircleOuter>
                          </Grid>
                          <Grid item md={3}>
                            <CustomFieldControl variant="standard" fullWidth>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDownOutlinedIcon}
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      "& .MuiMenuItem-root": {
                                        fontSize: "12px",
                                      },
                                    },
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={20}>Annual Revenue</MenuItem>
                                <MenuItem value={30}>Auto-Number 1</MenuItem>
                                <MenuItem value={40}>Campaign Name</MenuItem>
                                <MenuItem value={50}>City</MenuItem>
                                <MenuItem value={60}>Account</MenuItem>
                                <MenuItem value={70}>Country</MenuItem>
                              </Select>
                            </CustomFieldControl>
                          </Grid>
                          <Grid item md={3}>
                            <CustomFieldControl variant="standard" fullWidth>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard2"
                                value={age}
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDownOutlinedIcon}
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      "& .MuiMenuItem-root": {
                                        fontSize: "12px",
                                      },
                                    },
                                  },
                                }}
                              // label="Age"
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={20}>Annual Revenue</MenuItem>
                                <MenuItem value={30}>Auto-Number 1</MenuItem>
                                <MenuItem value={40}>Campaign Name</MenuItem>
                                <MenuItem value={50}>City</MenuItem>
                                <MenuItem value={60}>Account</MenuItem>
                                <MenuItem value={70}>Country</MenuItem>
                              </Select>
                            </CustomFieldControl>
                          </Grid>
                          <Grid item md={3}>
                            <TextField
                              fullWidth
                              id="standard-basic"
                              variant="standard"
                            />
                          </Grid>
                          <Grid item md={2}>
                            <ActionIcons>
                              <IconButtonRemove aria-label="Remove">
                                <RemoveIcon />
                              </IconButtonRemove>
                            </ActionIcons>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={12}>
                        <Grid container spacing={2}>
                          <Grid item md={0.5}>
                            <NumCircleOuter>
                              <NumCircle>2</NumCircle>
                              <MiddleText>
                                <Typography>Or</Typography>
                              </MiddleText>
                            </NumCircleOuter>
                          </Grid>
                          <Grid item md={3}>
                            <CustomFieldControl variant="standard" fullWidth>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDownOutlinedIcon}
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      "& .MuiMenuItem-root": {
                                        fontSize: "12px",
                                      },
                                    },
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={20}>Annual Revenue</MenuItem>
                                <MenuItem value={30}>Auto-Number 1</MenuItem>
                                <MenuItem value={40}>Campaign Name</MenuItem>
                                <MenuItem value={50}>City</MenuItem>
                                <MenuItem value={60}>Account</MenuItem>
                                <MenuItem value={70}>Country</MenuItem>
                              </Select>
                            </CustomFieldControl>
                          </Grid>
                          <Grid item md={3}>
                            <CustomFieldControl variant="standard" fullWidth>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard2"
                                value={age}
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDownOutlinedIcon}
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      "& .MuiMenuItem-root": {
                                        fontSize: "12px",
                                      },
                                    },
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={20}>Annual Revenue</MenuItem>
                                <MenuItem value={30}>Auto-Number 1</MenuItem>
                                <MenuItem value={40}>Campaign Name</MenuItem>
                                <MenuItem value={50}>City</MenuItem>
                                <MenuItem value={60}>Account</MenuItem>
                                <MenuItem value={70}>Country</MenuItem>
                              </Select>
                            </CustomFieldControl>
                          </Grid>
                          <Grid item md={3}>
                            <TextField
                              fullWidth
                              id="standard-basic"
                              variant="standard"
                            />
                          </Grid>
                          <Grid item md={2}>
                            <ActionIcons>
                              <IconButtonRemove aria-label="Remove">
                                <RemoveIcon />
                              </IconButtonRemove>
                            </ActionIcons>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={12}>
                        <Grid container spacing={2}>
                          <Grid item md={0.5}>
                            <NumCircleOuter>
                              <NumCircle>3</NumCircle>
                            </NumCircleOuter>
                          </Grid>
                          <Grid item md={3}>
                            <CustomFieldControl variant="standard" fullWidth>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDownOutlinedIcon}
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      "& .MuiMenuItem-root": {
                                        fontSize: "12px",
                                      },
                                    },
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={20}>Annual Revenue</MenuItem>
                                <MenuItem value={30}>Auto-Number 1</MenuItem>
                                <MenuItem value={40}>Campaign Name</MenuItem>
                                <MenuItem value={50}>City</MenuItem>
                                <MenuItem value={60}>Account</MenuItem>
                                <MenuItem value={70}>Country</MenuItem>
                              </Select>
                            </CustomFieldControl>
                          </Grid>
                          <Grid item md={3}>
                            <CustomFieldControl variant="standard" fullWidth>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard2"
                                value={age}
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDownOutlinedIcon}
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      "& .MuiMenuItem-root": {
                                        fontSize: "12px",
                                      },
                                    },
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={20}>Annual Revenue</MenuItem>
                                <MenuItem value={30}>Auto-Number 1</MenuItem>
                                <MenuItem value={40}>Campaign Name</MenuItem>
                                <MenuItem value={50}>City</MenuItem>
                                <MenuItem value={60}>Account</MenuItem>
                                <MenuItem value={70}>Country</MenuItem>
                              </Select>
                            </CustomFieldControl>
                          </Grid>
                          <Grid item md={3}>
                            <TextField
                              fullWidth
                              id="standard-basic"
                              variant="standard"
                            />
                          </Grid>
                          <Grid item md={2}>
                            <ActionIcons>
                              <IconButtonRemove aria-label="Remove">
                                <RemoveIcon />
                              </IconButtonRemove>
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                              />
                              <IconButtonAdd aria-label="Add">
                                <AddIcon />
                              </IconButtonAdd>
                            </ActionIcons>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CustolFieldData> */}
                  <CustolFieldData>
                    {!showEdit?.status &&
                      inputList.map((element, inputIndex) => {
                        return (
                          <Grid container spacing={2} key={inputIndex}>
                            <Grid item md={12}>
                              <Grid container spacing={2}>
                                <Grid item md={0.5}>
                                  <NumCircleOuter>
                                    <NumCircle>{inputIndex + 1}</NumCircle>
                                    {inputList.length !== 1 &&
                                      inputList.length !== inputIndex + 1 && (
                                        <MiddleText>
                                          <Typography
                                            onClick={(e) =>
                                              handleChangeCriteria(
                                                1,
                                                element.group_operator,
                                                inputIndex,
                                                "group_operator"
                                              )
                                            }
                                          >
                                            {element.group_operator}
                                          </Typography>
                                        </MiddleText>
                                      )}
                                  </NumCircleOuter>
                                </Grid>
                                <Grid item md={3}>
                                  <CustomFieldControl
                                    variant="standard"
                                    fullWidth
                                  >
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={element.field_id}
                                      name="field_id"
                                      onChange={(e) =>
                                        handleChangeCriteria(
                                          0,
                                          e,
                                          inputIndex,
                                          "select"
                                        )
                                      }
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                      MenuProps={MenuProps}
                                    >
                                      {savedFieldData?.data?.filter_fields.map(
                                        (item, index) => {
                                          if (item?.name != "id") {
                                            return (
                                              <MenuItem
                                                value={item.id}
                                                onClick={() => {
                                                  const criteria = [
                                                    ...showCriteria,
                                                  ];
                                                  criteria[inputIndex] =
                                                    item.field_type;
                                                  setShowCriteria(criteria);
                                                  const oldFilter = [
                                                    ...filterType,
                                                  ];
                                                  oldFilter[inputIndex] = item;
                                                  setFilterType(oldFilter);
                                                }}
                                                sx={{
                                                  textTransform: "capitalize",
                                                }}
                                              >
                                                {" "}
                                                {item.name == "mail"
                                                  ? "Email"
                                                  : item.name
                                                    .replaceAll("_", " ")
                                                    .replaceAll(".", " ")}
                                              </MenuItem>
                                            );
                                          }
                                        }
                                      )}
                                    </Select>
                                  </CustomFieldControl>
                                </Grid>
                                <Grid item md={3}>
                                  <CustomFieldControl
                                    variant="standard"
                                    fullWidth
                                  >
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard2"
                                      value={inputList[inputIndex]?.comparator}
                                      name="comparator"
                                      onChange={(e) =>
                                        handleChangeCriteria(
                                          0,
                                          e,
                                          inputIndex,
                                          "select"
                                        )
                                      }
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                      MenuProps={MenuProps}
                                    >
                                      {showCriteria[inputIndex] == "select"
                                        ? DropDownFilter.map((element) => (
                                          <MenuItem value={element.values}>
                                            {element.name}
                                          </MenuItem>
                                        ))
                                        : showCriteria[inputIndex] ==
                                          "textarea" ||
                                          showCriteria[inputIndex] == "email" ||
                                          showCriteria[inputIndex] == "text" ||
                                          showCriteria[inputIndex] == "phone" ||
                                          showCriteria[inputIndex] ==
                                          "mobile" ||
                                          showCriteria[inputIndex] == "tag" ||
                                          showCriteria[inputIndex] == "url" ||
                                          showCriteria[inputIndex] == "country"
                                          ? StringFilter.map((element) => (
                                            <MenuItem value={element.values}>
                                              {element.name}
                                            </MenuItem>
                                          ))
                                          : showCriteria[inputIndex] == "float" ||
                                            showCriteria[inputIndex] == "integer"
                                            ? NumberFilter.map((element) => (
                                              <MenuItem value={element.values}>
                                                {element.name}
                                              </MenuItem>
                                            ))
                                            : showCriteria[inputIndex] == "checkbox"
                                              ? CheckBoxFilter.map((element) => (
                                                <MenuItem value={element.values}>
                                                  {element.name}
                                                </MenuItem>
                                              ))
                                              : DateFilter.map((element) => (
                                                <MenuItem value={element.values}>
                                                  {element.name}
                                                </MenuItem>
                                              ))}
                                    </Select>
                                  </CustomFieldControl>
                                </Grid>
                                <Grid item md={4}>
                                  {filterType[inputIndex]?.field_type ==
                                    "select" &&
                                    filterType[inputIndex]?.name ==
                                    "Lead_Owner" ? (
                                    <CommonOwner
                                      defaultOwner={userLists?.find(
                                        (ele) =>
                                          ele.id ==
                                          inputList[inputIndex]?.userID
                                      )}
                                      updateValue={(newValue) => {
                                        const list = [...inputList];
                                        list[inputIndex]["value"] =
                                          newValue?.email;
                                        list[inputIndex]["userID"] =
                                          newValue?.id;
                                        setInputList(list);
                                      }}
                                      label={""}
                                      userLists={userLists}
                                    />
                                  ) : filterType[inputIndex]?.field_type ===
                                    "phone" ||
                                    filterType?.field_type === "integer" ? (
                                    <MobileInputCommon
                                      mobileNumber={
                                        inputList[inputIndex]?.value
                                      }
                                      countryCode={""}
                                      handleChange={(e) => {
                                        handleChangeCriteria(
                                          0,
                                          e,
                                          inputIndex,
                                          "integer"
                                        );
                                      }}
                                      helperText={""}
                                      placeholder={"90 2327 7211"}
                                    />
                                  ) : // <TextField
                                    //   id="outlined-number"
                                    //   type="number"
                                    //   name="value"
                                    //   size="small"
                                    //   onChange={(e) => {
                                    //     handleChangeCriteria(
                                    //       0,
                                    //       e,
                                    //       inputIndex,
                                    //       "integer"
                                    //     );
                                    //   }}
                                    // />
                                    filterType[inputIndex]?.field_type ==
                                      "select" ? (
                                      <CommonFormcontrol fullWidth>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          onChange={(e) => {
                                            handleChangeCriteria(
                                              0,
                                              e,
                                              inputIndex,
                                              "select"
                                            );
                                          }}
                                          name="value"
                                          IconComponent={
                                            KeyboardArrowDownOutlinedIcon
                                          }
                                        >
                                          {filterType[
                                            inputIndex
                                          ]?.option_list?.map((element) => (
                                            <MenuItem value={element}>
                                              {element}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </CommonFormcontrol>
                                    ) : filterType[inputIndex]?.field_type ==
                                      "date" ? (
                                      <CommonFormcontrol fullWidth>
                                        <CustomDatePicker
                                          handleChange={(e) => {
                                            handleChangeCriteria(
                                              0,
                                              e,
                                              inputIndex,
                                              "date"
                                            );
                                          }}
                                          name="value"
                                          value={filterType[inputIndex]?.value}
                                        // defaultDate={new Date()}
                                        />
                                      </CommonFormcontrol>
                                    ) : filterType[inputIndex]?.field_type ==
                                      "timestamp" ? (
                                      <CustomDateTimePicker
                                        label={""}
                                        value={""}
                                        name="value"
                                        handleChange={(e) => {
                                          handleChangeCriteria(
                                            0,
                                            e,
                                            inputIndex,
                                            "timestamp"
                                          );
                                        }}
                                      />
                                    ) : filterType[inputIndex]?.field_type ==
                                      "checkbox" ? (
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={filteredValue?.condition}
                                        defaultValue={0}
                                        onChange={(e) => {
                                          handleChangeCriteria(
                                            0,
                                            e,
                                            "input",
                                            "checkbox"
                                          );
                                        }}
                                        IconComponent={
                                          KeyboardArrowDownOutlinedIcon
                                        }
                                      >
                                        <MenuItem value={0}>Select</MenuItem>
                                        <MenuItem value={1}>Selected</MenuItem>
                                        <MenuItem value={2}>
                                          Not Selected
                                        </MenuItem>
                                      </Select>
                                    ) : filterType[inputIndex]?.field_type ==
                                      "tag" ? (
                                      <Autocomplete
                                        popupIcon={
                                          <KeyboardArrowDownOutlinedIcon />
                                        }
                                        ref={autocompleteRef}
                                        fullWidth
                                        multiple
                                        id="participants"
                                        freeSolo={false}
                                        options={userTags ? userTags : []}
                                        value={filterTags}
                                        noOptionsText={""}
                                        limitTags={10}
                                        onChange={(event, newValue) => {
                                          autocompleteRef.current = newValue;
                                          setFilterTags(newValue);
                                          let tagData = {
                                            target: {
                                              name: "id",
                                              mainId: filterType[inputIndex]?.id,
                                              value:
                                                newValue?.length > 0 &&
                                                newValue?.map((ele) => ele.id),
                                            },
                                          };
                                          handleChangeCriteria(
                                            0,
                                            tagData,
                                            inputIndex,
                                            "tag"
                                          );
                                        }}
                                        getOptionLabel={(option) => option.name} // Define how options are displayed
                                        renderTags={(value, getTagProps) =>
                                          value.map((tag, index) => (
                                            <Chip
                                              key={tag.id} // Use unique key
                                              label={tag.name}
                                              size="small"
                                              {...getTagProps({ index })}
                                            />
                                          ))
                                        }
                                        renderInput={(params) => (
                                          <TextField
                                            fullWidth
                                            {...params}
                                            placeholder="Select multiple tags"
                                            variant="outlined"
                                          />
                                        )}
                                      />
                                    ) : (
                                      <TextField
                                        style={{ width: "100%" }}
                                        id="outlined-required"
                                        size="small"
                                        placeholder="Textfield"
                                        value={inputList[inputIndex]?.value}
                                        name="value"
                                        onChange={(e) => {
                                          handleChangeCriteria(
                                            0,
                                            e,
                                            inputIndex,
                                            "text"
                                          );
                                        }}
                                      />
                                    )}
                                </Grid>
                                <Grid item md={1}>
                                  <ActionIcons>
                                    {inputList.length !== 1 && (
                                      <IconButtonRemove
                                        aria-label="Remove"
                                        onClick={() =>
                                          handleRemoveNewInput(inputIndex)
                                        }
                                      >
                                        <RemoveIcon />
                                      </IconButtonRemove>
                                    )}

                                    <Divider
                                      orientation="vertical"
                                      variant="middle"
                                      flexItem
                                    />
                                    {inputList.length - 1 === inputIndex && (
                                      <IconButtonAdd
                                        aria-label="Add"
                                        onClick={handleAddNewInput}
                                      >
                                        <AddIcon />
                                      </IconButtonAdd>
                                    )}
                                  </ActionIcons>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })}
                    {showEdit?.status &&
                      inputList.map((element, inputIndex) => {
                        return (
                          <Grid container spacing={2} key={inputIndex}>
                            <Grid item md={12}>
                              <Grid container spacing={2}>
                                <Grid item md={0.5}>
                                  <NumCircleOuter>
                                    <NumCircle>{inputIndex + 1}</NumCircle>
                                    {inputList.length !== 1 &&
                                      inputList.length !== inputIndex + 1 && (
                                        <MiddleText>
                                          <Typography
                                            onClick={(e) =>
                                              handleChangeCriteria(
                                                1,
                                                element.group_operator,
                                                inputIndex,
                                                "group_operator"
                                              )
                                            }
                                          >
                                            {element.group_operator}
                                          </Typography>
                                        </MiddleText>
                                      )}
                                  </NumCircleOuter>
                                </Grid>
                                <Grid item md={3}>
                                  <CustomFieldControl
                                    variant="standard"
                                    fullWidth
                                  >
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={element.field_id}
                                      name="field_id"
                                      onChange={(e) =>
                                        handleChangeCriteria(
                                          0,
                                          e,
                                          inputIndex,
                                          "select"
                                        )
                                      }
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                      MenuProps={MenuProps}
                                    >
                                      {savedFieldData?.data?.filter_fields.map(
                                        (item, index) => {
                                          if (item?.name != "id") {
                                            return (
                                              <MenuItem
                                                value={item.id}
                                                onClick={() => {
                                                  const criteria = [
                                                    ...showCriteria,
                                                  ];
                                                  criteria[inputIndex] =
                                                    item.field_type;
                                                  setShowCriteria(criteria);
                                                  const oldFilter = [
                                                    ...filterType,
                                                  ];
                                                  oldFilter[inputIndex] = item;
                                                  setFilterType(oldFilter);
                                                }}
                                                sx={{
                                                  textTransform: "capitalize",
                                                }}
                                              >
                                                {" "}
                                                {item.name == "mail"
                                                  ? "Email"
                                                  : item.name
                                                    .replaceAll("_", " ")
                                                    .replaceAll(".", " ")}
                                              </MenuItem>
                                            );
                                          }
                                        }
                                      )}
                                    </Select>
                                  </CustomFieldControl>
                                </Grid>
                                <Grid item md={3}>
                                  <CustomFieldControl
                                    variant="standard"
                                    fullWidth
                                  >
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard2"
                                      value={inputList[inputIndex]?.comparator}
                                      name="comparator"
                                      onChange={(e) =>
                                        handleChangeCriteria(
                                          0,
                                          e,
                                          inputIndex,
                                          "select"
                                        )
                                      }
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                      MenuProps={MenuProps}
                                    >
                                      {showCriteria[inputIndex] == "select" ||
                                        showCriteria[inputIndex] == "textarea" ||
                                        showCriteria[inputIndex] == "email" ||
                                        showCriteria[inputIndex] == "text" ||
                                        showCriteria[inputIndex] == "country"
                                        ? StringFilter.map((element) => (
                                          <MenuItem value={element.values}>
                                            {element.name}
                                          </MenuItem>
                                        ))
                                        : showCriteria[inputIndex] == "float" ||
                                          showCriteria[inputIndex] == "integer"
                                          ? NumberFilter.map((element) => (
                                            <MenuItem value={element.values}>
                                              {element.name}
                                            </MenuItem>
                                          ))
                                          : DateFilter.map((element) => (
                                            <MenuItem value={element.values}>
                                              {element.name}
                                            </MenuItem>
                                          ))}
                                    </Select>
                                  </CustomFieldControl>
                                </Grid>
                                <Grid item md={4}>
                                  {filterType[inputIndex]?.field_type ==
                                    "select" &&
                                    filterType[inputIndex]?.name ==
                                    "Lead_Owner" ? (
                                    <CommonOwner
                                      defaultOwner={userLists?.find(
                                        (ele) =>
                                          ele.id ==
                                          inputList[inputIndex]?.userID
                                      )}
                                      updateValue={(newValue) => {
                                        const list = [...inputList];
                                        list[inputIndex]["value"] =
                                          newValue?.email;
                                        list[inputIndex]["userID"] =
                                          newValue?.id;
                                        setInputList(list);
                                      }}
                                      label={""}
                                      userLists={userLists}
                                    />
                                  ) : filterType[inputIndex]?.field_type ===
                                    "phone" ||
                                    filterType?.field_type === "integer" ? (
                                    <MobileInputCommon
                                      mobileNumber={
                                        inputList[inputIndex]?.value
                                      }
                                      countryCode={""}
                                      handleChange={(e) => {
                                        handleChangeCriteria(
                                          0,
                                          e,
                                          inputIndex,
                                          "integer"
                                        );
                                      }}
                                      helperText={""}
                                      placeholder={"90 2327 7211"}
                                    />
                                  ) : // <TextField
                                    //   id="outlined-number"
                                    //   type="number"
                                    //   name="value"
                                    //   size="small"
                                    //   onChange={(e) => {
                                    //     handleChangeCriteria(
                                    //       0,
                                    //       e,
                                    //       inputIndex,
                                    //       "integer"
                                    //     );
                                    //   }}
                                    // />
                                    filterType[inputIndex]?.field_type ==
                                      "select" ? (
                                      <FilterField fullWidth>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          onChange={(e) => {
                                            handleChangeCriteria(
                                              0,
                                              e,
                                              inputIndex,
                                              "select"
                                            );
                                          }}
                                          name="value"
                                          IconComponent={
                                            KeyboardArrowDownOutlinedIcon
                                          }
                                        >
                                          {filterType[
                                            inputIndex
                                          ]?.option_list?.map((element) => (
                                            <MenuItem value={element}>
                                              {element}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FilterField>
                                    ) : filterType[inputIndex]?.field_type ==
                                      "date" ? (
                                      <FilterField fullWidth>
                                        <CustomDatePicker
                                          handleChange={(e) => {
                                            handleChangeCriteria(
                                              0,
                                              e,
                                              inputIndex,
                                              "date"
                                            );
                                          }}
                                          name="value"
                                          value={filterType[inputIndex]?.value}
                                        // defaultDate={new Date()}
                                        />
                                      </FilterField>
                                    ) : filterType[inputIndex]?.field_type ==
                                      "timestamp" ? (
                                      <CustomDateTimePicker
                                        label={""}
                                        value={""}
                                        name="value"
                                        handleChange={(e) => {
                                          handleChangeCriteria(
                                            0,
                                            e,
                                            inputIndex,
                                            "timestamp"
                                          );
                                        }}
                                      />
                                    ) : filterType[inputIndex]?.field_type ==
                                      "checkbox" ? (
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={filteredValue?.condition}
                                        defaultValue={0}
                                        onChange={(e) => {
                                          handleChangeCriteria(
                                            0,
                                            e,
                                            "input",
                                            "checkbox"
                                          );
                                        }}
                                        IconComponent={
                                          KeyboardArrowDownOutlinedIcon
                                        }
                                      >
                                        <MenuItem value={0}>Select</MenuItem>
                                        <MenuItem value={1}>Selected</MenuItem>
                                        <MenuItem value={2}>
                                          Not Selected
                                        </MenuItem>
                                      </Select>
                                    ) : filterType[inputIndex]?.field_type ==
                                      "tag" ? (
                                      <Autocomplete
                                        popupIcon={
                                          <KeyboardArrowDownOutlinedIcon />
                                        }
                                        ref={autocompleteRef}
                                        fullWidth
                                        multiple
                                        id="participants"
                                        freeSolo={false}
                                        options={userTags ? userTags : []}
                                        value={filterTags}
                                        noOptionsText={""}
                                        limitTags={10}
                                        onChange={(event, newValue) => {
                                          autocompleteRef.current = newValue;
                                          setFilterTags(newValue);
                                          let tagData = {
                                            target: {
                                              name: "id",
                                              mainId: filterType[inputIndex]?.id,
                                              value:
                                                newValue?.length > 0 &&
                                                newValue?.map((ele) => ele.id),
                                            },
                                          };
                                          handleChangeCriteria(
                                            0,
                                            tagData,
                                            inputIndex,
                                            "tag"
                                          );
                                        }}
                                        getOptionLabel={(option) => option.name} // Define how options are displayed
                                        renderTags={(value, getTagProps) =>
                                          value.map((tag, index) => (
                                            <Chip
                                              key={tag.id} // Use unique key
                                              label={tag.name}
                                              size="small"
                                              {...getTagProps({ index })}
                                            />
                                          ))
                                        }
                                        renderInput={(params) => (
                                          <TextField
                                            fullWidth
                                            {...params}
                                            placeholder="Select multiple tags"
                                            variant="outlined"
                                          />
                                        )}
                                      />
                                    ) : (
                                      <TextField
                                        style={{ width: "100%" }}
                                        id="outlined-required"
                                        size="small"
                                        placeholder="Textfield"
                                        value={inputList[inputIndex]?.value}
                                        name="value"
                                        onChange={(e) => {
                                          handleChangeCriteria(
                                            0,
                                            e,
                                            inputIndex,
                                            "text"
                                          );
                                        }}
                                      />
                                    )}
                                </Grid>
                                <Grid item md={1}>
                                  <ActionIcons>
                                    {inputList.length !== 1 && (
                                      <IconButtonRemove
                                        aria-label="Remove"
                                        onClick={() =>
                                          handleRemoveNewInput(inputIndex)
                                        }
                                      >
                                        <RemoveIcon />
                                      </IconButtonRemove>
                                    )}

                                    <Divider
                                      orientation="vertical"
                                      variant="middle"
                                      flexItem
                                    />
                                    {inputList.length - 1 === inputIndex && (
                                      <IconButtonAdd
                                        aria-label="Add"
                                        onClick={handleAddNewInput}
                                      >
                                        <AddIcon />
                                      </IconButtonAdd>
                                    )}
                                  </ActionIcons>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })}
                  </CustolFieldData>
                </DialogContent>
                <DialogActions>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <CriteriaFormValue>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={addCriteria[0]?.compare}
                            onChange={(e) => {
                              const updatedInputList = inputList.map(
                                (item) => ({
                                  ...item,
                                  operator: e.target.value,
                                })
                              );
                              setInputList(updatedInputList);
                            }}
                          >
                            <FormControlLabel
                              value="+"
                              control={<Radio />}
                              label="Add"
                              defaultChecked
                            />
                            <FormControlLabel
                              value="-"
                              control={<Radio />}
                              label="Subtract"
                            />
                          </RadioGroup>
                        </FormControl>
                        <FormControl size="small">
                          <TextField
                            id="outlined-size-small"
                            defaultValue="10"
                            size="small"
                            // value={addCriteria?.point}
                            onChange={(e) => {
                              const updatedInputList = inputList.map(
                                (item) => ({
                                  ...item,
                                  point: e.target.value,
                                })
                              );
                              setInputList(updatedInputList);
                            }}
                          />
                        </FormControl>
                        <Typography>Points</Typography>
                      </CriteriaFormValue>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomActionButon>
                        <SmallFilledBtn
                          variant="outlined"
                          onClick={() => addSpecificRule()}
                        >
                          Save
                        </SmallFilledBtn>
                        <SmallOutineBtn
                          variant="outlined"
                          onClick={handleCloseDialog}
                        >
                          Cancel
                        </SmallOutineBtn>
                      </CustomActionButon>
                    </Grid>
                  </Grid>
                </DialogActions>
              </StyledBootstrapDialog>
            </div>
          </ScorRuleOuterWrap>

          <DeactivatePopover
            id={id}
            open={openP}
            anchorEl={anchorElP}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <DeactivateRuleBox>
              <Typography variant="h4" gutterBottom>
                Deactivate Rule
              </Typography>
              <Typography variant="body1" gutterBottom>
                Do you want to deactivate the scoring rule?
              </Typography>
              <CustomActionButon sx={{ pb: 0 }}>
                <OutLinedButton variant="outlined" onClick={handleCloseDialog}>
                  Cancel
                </OutLinedButton>
                <OutLinedButton variant="outlined" onClick={handleCloseDialog}>
                  Deactivate Now
                </OutLinedButton>
              </CustomActionButon>
            </DeactivateRuleBox>
          </DeactivatePopover>
        </ScroingFullpageData>
      </CrmFullData>
    </div>
  );
};
export default CreateScoring;
