import React, { useEffect, useState } from "react";
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
  CrmInnerContent,
  IconButtonAdd,
  IconButtonRemove,
  OutLinedButton,
  SearchCommon,
  SecondSkeletonBox,
  SmallFilledBtn,
  SmallOutineBtn,
  StyledBootstrapDialog,
} from "../commonStyle";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormGroup,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Switch,
  SwitchProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
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
import { CustomFieldControl } from "../style";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "../commonStyle";
import { LicenseInfo } from "@mui/x-license-pro";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";
import { apiClient } from "@/components/common/common";
import { useAppDispatch } from "redux/store";
import moment from "moment";
import ClearIcon from "@mui/icons-material/Clear";
import { ThreeDots } from "react-loader-spinner";
import CommonHeader from "../Leads/CommonHeader";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },

    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 17,
    height: 17,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    // transition: theme.transitions.create(['background-color'], {
    //   duration: 500,
    // }),
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
const ScoringRules = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [opendialogDelete, setOpendelete] = React.useState(false);
  const [scoringLoader, setScoringLoader] = React.useState(false);
  const [selectedScoringRules, setSelectedScoringRules] = React.useState([]);
  const [scoringRules, setScoringRules] = React.useState([]);
  const [scoringRulesDuplicate, setScoringRulesDuplicate] = React.useState([]);
  const [opendialogRun, setOpenRun] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleClickOpenDelete = () => {
    setOpendelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpendelete(false);
  };

  const handleClickOpenRun = () => {
    setOpenRun(true);
  };

  const handleCloseDialogRun = () => {
    setOpenRun(false);
  };

  const FetchScoringRules = async (page = 1) => {
    setScoringLoader(true);
    let response: any = await apiClient(`crm/score/rule?per_page=100`, "get");
    if (response.status === 200 || response.status === true) {
      setScoringRules(response.data);
      setScoringRulesDuplicate(response.data);
    }
    setScoringLoader(false);
  };

  useEffect(() => {
    FetchScoringRules();
  }, [dispatch]);

  const [toggleSwitch, setToggleSwitch] = useState({
    id: "",
    status: true,
    data: "",
  });
  const [opendialog, setOpen] = React.useState(false);
  const [anchorElP, setAnchorElP] = React.useState<HTMLButtonElement | null>(
    null
  );

  const openP = Boolean(anchorElP);
  const id = openP ? "simple-popover" : undefined;
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Rule Name",
      minWidth: 250,
      flex: 0.9,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "module_type",
      headerName: "All Modules",
      minWidth: 250,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues?.value == 1
              ? "Leads"
              : cellValues?.value == 2
                ? "Deals"
                : cellValues?.value == 3
                  ? "Accounts"
                  : "Contacts"}
          </>
        );
      },
    },
    {
      field: "layout_type",
      headerName: "Layout",
      minWidth: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return <>{cellValues.value}</>;
      },
    },
    {
      field: "total_score",
      headerName: "Score Factors Configured",
      minWidth: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updated_at",
      headerName: "Last Modified",
      minWidth: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues?.row?.updated_at
              ? moment(cellValues?.row?.updated_at).format("ddd MMM DD YYYY")
              : moment(cellValues?.row?.created_at).format("ddd MMM DD YYYY")}
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <>
            <IOSSwitch
              sx={{ m: 1 }}
              checked={cellValues?.value == "activate" ? true : false}
              defaultChecked={cellValues?.value == "activate" ? true : false}
              onClick={(e) => handleClickPopover(e, cellValues)}
            />
          </>
        );
      },
    },
  ];

  const handleClickPopover = (
    event: React.MouseEvent<HTMLButtonElement>,
    data
  ) => {
    setToggleSwitch({ id: data?.id, status: true, data: data?.value });
    setAnchorElP(event.currentTarget);
  };

  const handleCellClick = (param, event) => {
    if (param.field != "__check__" && param.field != "status") {
      router.push("scoring-rules/create");
    } else {
      event.stopPropagation();
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const UpdateRuleStatus = async () => {
    let status = toggleSwitch?.data == "activate" ? "deactivate" : "activate";
    setScoringLoader(true);
    let body = {
      status: status,
      id: toggleSwitch?.id,
    };
    let response: any = await apiClient(`crm/score/rule`, "POST", {
      body: body,
    });
    if (response.status === 200 || response.status === true) {
      setAnchorElP(null);
      setScoringLoader(false);
      FetchScoringRules();
      setToggleSwitch({
        id: "",
        status: true,
        data: "",
      });
    }
  };

  const DeleteRule = async () => {
    setScoringLoader(true);
    let response: any = await apiClient(
      `crm/score/rule/${selectedScoringRules?.join()}`,
      "DELETE"
    );
    if (response.status === 200 || response.status === true) {
      setScoringLoader(false);
      FetchScoringRules();
      setOpendelete(false);
      setToggleSwitch({
        id: "",
        status: true,
        data: "",
      });
    }
  };

  const RunScoringRule = () => {
    alert("We are working on it");
    console.log(selectedScoringRules, "selectedScoringRules");
    return;
  };

  return (
    <div className="full_page">
      <CrmFullData>
        <OuterContainer>
          {/* <ProfileHeader text={"Scoring Rules"} /> */}
          <CommonHeader />
        </OuterContainer>
        <CrmInnerContent>
          <ScroingFullpageData>
            <ScoringListPage>
              {search == "" && !scoringLoader && scoringRules?.length == 0 ? (
                <NoScoreContent>
                  <Box sx={{ width: "100%" }}>
                    <PageHeading>Take your score to the next level </PageHeading>
                    <PageDescription>
                      Start by adding your first score find <br />
                      new business opportunities for you
                    </PageDescription>
                    <NoImage
                      src="/assets/images/crm/scoring_rule/noimg.svg"
                      alt="Edit"
                      width={400}
                      height={300}
                    />
                    <PageHeading>Scoring Rules</PageHeading>
                    <PageDescription>
                      Create scoring rules to quantify your records. Scores are
                      calculated based on the field values and your customer’s
                      interactions. If you
                      <br /> have multiple departments in your organization, You
                      can even set up multiple Scoring Rules.
                    </PageDescription>
                    <BtnFilledLeads
                      onClick={() => {
                        router.push("scoring-rules/create");
                      }}
                    >
                      New Scoring Rule
                    </BtnFilledLeads>
                  </Box>
                </NoScoreContent>
              ) : (
                <ScoringListOuter>
                  <SearchScoringBar>
                    <TopBarLeft>
                      <SearchCommon>
                        <TextField
                          fullWidth
                          id="standard-bare"
                          variant="outlined"
                          placeholder="Search Rule"
                          value={search}
                          InputProps={{
                            endAdornment: (
                              <>
                                {search ? (
                                  <IconButton aria-label="Clear" size="small" onClick={() => {
                                    setSearch('')
                                    setScoringRules(scoringRulesDuplicate);
                                  }}>
                                    <ClearIcon fontSize="inherit" />
                                  </IconButton>
                                ) : (
                                  <IconButton aria-label="Search" size="small">
                                    <SearchIcon fontSize="inherit" />{" "}
                                  </IconButton>
                                )}
                              </>
                            ),
                          }}
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setScoringLoader(true);
                            if (e.target.value != "" || e.target.value != null) {
                              setScoringRules(
                                scoringRulesDuplicate.filter((item) =>
                                  item.name.toLowerCase().includes(e.target.value)
                                )
                              );
                              setScoringLoader(false);
                            }
                          }}
                        />
                      </SearchCommon>
                    </TopBarLeft>
                    <BtnFilledLeads
                      varient="filled"
                      onClick={() => {
                        router.push("scoring-rules/create");
                      }}
                    >
                      New Scoring Rule
                    </BtnFilledLeads>
                  </SearchScoringBar>
                  {selectedScoringRules?.length > 0 && (
                    <SearchScoringBar>
                      <TopBarLeft>
                        <Typography>
                          {" "}
                          {selectedScoringRules?.length} Rule(s) Selected{" "}
                          <Link
                            fontWeight="600"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSelectedScoringRules([]);
                            }}
                          >
                            <span>Clear</span>
                          </Link>
                        </Typography>
                        <SmallOutineBtn onClick={handleClickOpenRun}>
                          Run Scoring Rule
                        </SmallOutineBtn>
                        <BtnFilledLeads
                          varient="filled"
                          onClick={handleClickOpenDelete}
                        >
                          Delete
                        </BtnFilledLeads>
                      </TopBarLeft>
                    </SearchScoringBar>
                  )}
                  <Box
                    style={{ height: 500, width: "100%" }}
                    className="seller_toptable"
                  >
                    <DataGridPro
                      onCellClick={handleCellClick}
                      pagination
                      rows={scoringRules}
                      columns={columns}
                      loading={scoringLoader}
                      selectionModel={selectedScoringRules}
                      rowHeight={38}
                      pageSize={10}
                      checkboxSelection
                      sx={DataGridStyle}
                      onSelectionModelChange={(ids) => {
                        setSelectedScoringRules(ids);
                      }}
                    />
                  </Box>
                </ScoringListOuter>
              )}

              <CreateScoreDialog>
                <div>
                  <StyledBootstrapDialog
                    // onClose={handleCloseDialogDelete}
                    aria-labelledby="customized-dialog-title"
                    open={opendialogRun}
                  >
                    <BootstrapDialogTitle
                      id="customized-dialog-title"
                      onClose={handleCloseDialogRun}
                    >
                      <CreareHeading variant="h4">Run Scoring Rule</CreareHeading>
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                      This action cannot be undone. The existing scores will be
                      overwritten and new scores will be calculated for records
                      that are created or have last activity within past 6 months.
                    </DialogContent>
                    <DialogActions>
                      <CustomActionButon>
                        <SmallOutineBtn
                          variant="outlined"
                          onClick={handleCloseDialogRun}
                        >
                          Cancel
                        </SmallOutineBtn>
                        <SmallFilledBtn
                          variant="outlined"
                          onClick={() => {
                            RunScoringRule();
                          }}
                        >
                          Run Scoring Rule
                        </SmallFilledBtn>
                      </CustomActionButon>
                    </DialogActions>
                  </StyledBootstrapDialog>
                </div>
              </CreateScoreDialog>
              <CreateScoreDialog>
                <div>
                  <StyledBootstrapDialog
                    // onClose={handleCloseDialogDelete}
                    aria-labelledby="customized-dialog-title"
                    open={opendialogDelete}
                  >
                    <BootstrapDialogTitle
                      id="customized-dialog-title"
                      onClose={handleCloseDialogDelete}
                    >
                      <CreareHeading variant="h4">
                        Delete Scoring Rule
                      </CreareHeading>
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                      This action cannot be undone. Are you sure to delete Here
                      will be a rule name
                    </DialogContent>
                    <DialogActions>
                      <CustomActionButon>
                        <SmallFilledBtn
                          variant="outlined"
                          onClick={() => {
                            DeleteRule();
                          }}
                        >
                          {scoringLoader ? (
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
                            "Yes, delete"
                          )}
                        </SmallFilledBtn>
                        <SmallOutineBtn
                          variant="outlined"
                          onClick={() => {
                            setOpendelete(false);
                          }}
                        >
                          Cancel
                        </SmallOutineBtn>
                      </CustomActionButon>
                    </DialogActions>
                  </StyledBootstrapDialog>
                </div>
              </CreateScoreDialog>
              <DeactivatePopover
                id={id}
                open={openP}
                anchorEl={anchorElP}
                // onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <DeactivateRuleBox>
                  <Typography variant="h4" gutterBottom>
                    {toggleSwitch?.data == "activate" ? "Deactivate" : "Activate"}{" "}
                    Rule
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Do you want to{" "}
                    {toggleSwitch?.data == "activate" ? "Deactivate" : "Activate"}{" "}
                    the scoring rule?
                  </Typography>
                  <CustomActionButon sx={{ pb: 0 }}>
                    <OutLinedButton
                      variant="outlined"
                      onClick={() => {
                        setAnchorElP(null);
                        handleCloseDialog();
                      }}
                    >
                      Cancel
                    </OutLinedButton>
                    <OutLinedButton
                      variant="outlined"
                      onClick={() => {
                        handleCloseDialog();
                        UpdateRuleStatus();
                      }}
                    >
                      {toggleSwitch?.data == "activate"
                        ? "Deactivate"
                        : "Activate"}{" "}
                      Now
                    </OutLinedButton>
                  </CustomActionButon>
                </DeactivateRuleBox>
              </DeactivatePopover>
              {/* <Box sx={{ height: "500px", width: "100%", border: "1px solid #E0E3E7", marginTop: "20px" }}>
              <TableContainer>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow >
                      <TableCell>
                        <SecondSkeletonBox>
                          <Skeleton variant="text" width={20} height={30} />
                          <Skeleton variant="text" width={120} />
                        </SecondSkeletonBox>
                      </TableCell>

                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={120} sx={{ paddingLeft: "10px" }} /></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <SecondSkeletonBox>
                          <Skeleton variant="text" width={20} height={30} />
                          <Skeleton variant="text" width={120} />
                        </SecondSkeletonBox>
                      </TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>

                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={120} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SecondSkeletonBox>
                          <Skeleton variant="text" width={20} height={30} />
                          <Skeleton variant="text" width={120} />
                        </SecondSkeletonBox>
                      </TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={120} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SecondSkeletonBox>
                          <Skeleton variant="text" width={20} height={30} />
                          <Skeleton variant="text" width={120} />
                        </SecondSkeletonBox>
                      </TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={120} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SecondSkeletonBox>
                          <Skeleton variant="text" width={20} height={30} />
                          <Skeleton variant="text" width={120} />
                        </SecondSkeletonBox>
                      </TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={120} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SecondSkeletonBox>
                          <Skeleton variant="text" width={20} height={30} />
                          <Skeleton variant="text" width={120} />
                        </SecondSkeletonBox>
                      </TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={120} /></TableCell>
                    </TableRow>       <TableRow>
                      <TableCell>
                        <SecondSkeletonBox>
                          <Skeleton variant="text" width={20} height={30} />
                          <Skeleton variant="text" width={120} />
                        </SecondSkeletonBox>
                      </TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={120} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SecondSkeletonBox>
                          <Skeleton variant="text" width={20} height={30} />
                          <Skeleton variant="text" width={120} />
                        </SecondSkeletonBox>
                      </TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={120} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SecondSkeletonBox>
                          <Skeleton variant="text" width={20} height={30} />
                          <Skeleton variant="text" width={120} />
                        </SecondSkeletonBox>
                      </TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={120} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SecondSkeletonBox>
                          <Skeleton variant="text" width={20} height={30} />
                          <Skeleton variant="text" width={120} />
                        </SecondSkeletonBox>
                      </TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton animation='wave' variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton  style={{ textAlign: 'left' }} animation='wave' variant="text" width={120} /></TableCell>
                    </TableRow>
                   
                  </TableBody>
                </Table>
              </TableContainer>
              </Box> */}
            </ScoringListPage>
          </ScroingFullpageData>

        </CrmInnerContent>
      </CrmFullData>
    </div>
  );
};
export default ScoringRules;
