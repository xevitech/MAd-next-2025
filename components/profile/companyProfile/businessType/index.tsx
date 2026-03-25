import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Stack,
  Switch,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ContainerHeader,
  ContainerHeaderDescription,
  ContainerHeaderText,
  ContentInnerContainer,
  FloatingEditIcon,
  OuterContainer,
  PencilIcon,
  TypebusinessButton,
  TypographyBusiness,
} from "@/components/profile/common";
import { SelectedBusinessBtnOutline, CancelLink, SaveLink } from "./styles";
import useAppContext from "@/hooks/useAppContext";
import { Grid } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { toast } from "react-toastify";
import {
  GridOneOptions,
  GridTwoOptions,
  apiClient,
  businessTypeContent,
  businessTypeTooltip,
} from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { getCompanyProfile } from "@/hooks/company";
import { ThreeDots } from "react-loader-spinner";
import { PlatformTextCenter } from "../styles";
import moment from "moment";
import { DataGridStyle } from "@/components/common/commonStyle";
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
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#d7282f",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    background: "#fff",
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
}));

export const BusinessType = (props: any) => {
  const { defaultData, changeMode, toggleMode, resetModes, mode } = props;
  const { breakPoints } = useAppContext();
  const [loader, setLoader] = useState<boolean>(false);
  const [skeltonLoader, setSkeltonLoader] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showListValue, setListValue] = useState<any>([]);
  const [selectionError, setSelectionError] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const { user_info } = useSelector((state: any) => state.userData);
  const { role } = useSelector((state: any) => state.userData);
  const [otpMessage, setOtpMessage] = useState<any>({
    status: "",
    message: "",
  });
  const [isSelected,setIsSelected]=useState(false);
  const [child,setChild]=useState(false)
  useEffect(() => {
    getCompanyProfile();
    if (otpMessage.message !== "" && otpMessage.status === "error") {
      const timer = setTimeout(() => {
        setOtpMessage({ status: "", message: "" });
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [otpMessage, getCompanyProfile]);

  const defaultValues =
    user_info?.type == "seller"
      ? defaultData?.business_type
      : defaultData?.business_type_user;

  const { companyDetails } = useSelector((state: any) => state.companyProfile);
  useEffect(() => {
    setSkeltonLoader(true);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (companyDetails) {
        setSkeltonLoader(false);
      } else {
        setSkeltonLoader(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const defaultTypes = defaultValues;
    setSelectedOptions(
      defaultTypes?.map((v) => ({
        name: v.name,
        child: typeof v.value == "string" ? [v.value] : v.value,
        toggle: v.toggle,
        tooltip: user_info?.type == "seller" ? v.tooltip : v.value,
      }))
    );
  }, [defaultValues]);
  const handleClickPopUp = (
    event: any,
    index: number,
    name: any,
    tooltip: any
  ) => {
    setAnchorEl(event.currentTarget);
    if (Array.isArray(tooltip)) {
      setListValue(tooltip);
    } else {
      tooltip !== undefined ? setListValue([tooltip]) : setListValue([]);
    }
  };
  const BusinessTypeHandler = (event: any, order, parent = "") => {
    let selectedTypes = selectedOptions ? [...selectedOptions] : [];
    if (order == "parent") {
      if (event.target.checked) {
        const defaultTypes = selectedOptions;
        if (defaultTypes?.length === 3) {
          toast.error("You can select only 3 business types");
          setSelectionError(true);
          return;
        } else {
          setSelectionError(false);
        }
        if (selectedTypes.length == 0) {
          selectedTypes.push({
            name: event.target.name,
            child: [parent],
            toggle: "1",
          });
        } else {
          selectedTypes.push({
            name: event.target.name,
            child: [parent],
            toggle: "0",
          });
        }
        setSelectedOptions(selectedTypes);
      } else {
        setSelectedOptions(
          selectedTypes.filter((v) => v.name !== event.target.name)
        );
        setSelectionError(false);
      }
      return;
    }
    if (order == "child") {
      let index = selectedTypes.findIndex((v) => v.name == parent);
      if (event.checked) {
        if (Array.isArray(selectedTypes[index]?.child)) {
          selectedTypes[index].child.push(event.value);
        } else {
          selectedTypes[index].child = [event.value];
        }
      } else {
        if (Array.isArray(selectedTypes[index]?.child)) {
          selectedTypes[index].child = selectedTypes[index].child.filter(
            (v) => v != event.value
          );
        }
      }
      setSelectedOptions(selectedTypes);
      return;
    }
  };

  const ToggleHandler = (event, name) => {
    let selectedTypes = [...selectedOptions];
    if (!event.target.checked) return;
    let existingToggleIndex = selectedTypes.findIndex((v) => v.toggle == "1");
    let index = selectedTypes.findIndex((v) => v.name == name);
    if (existingToggleIndex >= 0) {
      selectedTypes[existingToggleIndex].toggle = "0";
    }
    selectedTypes[index].toggle = event.target.checked ? "1" : "0";
    setSelectedOptions(selectedTypes);
  };

  function addTooltip(array) {
    return array.map((obj) => {
      const tooltips = [];
      const gridOne = GridOneOptions?.find(
        (option) => option.name === obj.name
      );
      const gridTwo = GridTwoOptions?.find(
        (option) => option.name === obj.name
      );
      if (gridOne) {
        if (typeof obj.child == "object") {
          obj.child.forEach((child) => {
            const childMatch = gridOne.options.find(
              (option) => option.name === child
            );
            if (childMatch) {
              tooltips.push(childMatch.tooltip);
            }
          });
        } else {
          const childMatch = gridOne.options.find(
            (option) => option.name === obj?.child
          );
          tooltips.push(childMatch.tooltip);
        }
      }
      if (gridTwo) {
        if (typeof obj.child == "object") {
          obj.child.forEach((child) => {
            const childMatch = gridTwo.options.find(
              (option) => option.name === child
            );
            if (childMatch) {
              tooltips.push(childMatch.tooltip);
            }
          });
        } else {
          const childMatch = gridTwo.options.find(
            (option) => option.name === obj?.child
          );
          tooltips.push(childMatch.tooltip);
        }
      }
      return { ...obj, tooltips };
    });
  }

  const dispatch = useDispatch();
  const SaveValues = async () => {
    if (selectedOptions?.length === 0 || selectedOptions?.length === undefined) {
      toast.error("Please select at least one business type");
      setSelectionError(true);
      return;
    }
  
    for (let parentOption of selectedOptions) {
      if (Array.isArray(parentOption.child)) {
        const isChildSelected = parentOption.child.length > 0;
        if (!isChildSelected) {
          toast.error("Please select at least one sub-type.");
          setSelectionError(true);
          return;
        }
      }
    }
    let isParentToggleActive = selectedOptions.some(option => option.toggle === "1");
    if (!isParentToggleActive) {
      toast.error("Please enable one business type.");
      setIsSelected(true);
      return;
    }
    if (loader) return;
    setLoader(true);
    let newSelectedOption = addTooltip(selectedOptions);
    let dataTosend =
      user_info?.type == "buyer"
        ? {
            business_type: JSON.stringify(
              selectedOptions.map((v) => ({
                name: v.name,
                is_checked: true,
                value: v.child,
                toggle: v.toggle,
              }))
            ),
            user_type: user_info?.type,
          }
        : {
            business_type: JSON.stringify(
              newSelectedOption?.map((v) => ({
                name: v.name,
                is_checked: true,
                value: v.child,
                toggle: v.toggle,
                tooltip: v.tooltips,
              }))
            ),
          };

    const response = await apiClient(
      `${
        user_info?.type == "buyer"
          ? "profile/updateProfile"
          : "company_profile/updateProfile"
      }`,
      "post",
      {
        body: dataTosend,
      }
    );
    if (response?.status == 200 || response?.status == true) {
      setLoader(false);
      toast.success("Business type saved successfully!");
      dispatch(getCompanyProfile());
      setLoader(false);
      setSelectionError(false);
      toggleMode(mode, changeMode, resetModes);
    } else if (
      response?.status == false &&
      response.message == "You can change your business type only once a month."
    ) {
      const startDate = moment(response?.date).format("DD-MMMM-YYYY");
      const daysLeft = moment(response?.date)
        .add(30, "days")
        .diff(moment(), "days");
      setLoader(false);
      setOtpMessage({
        status: "error",
        message: `You are unable to change your business type right now. Since you last changed it on ${startDate}, you must wait ${daysLeft} days before change your business type.`,
      });
    } else if (
      response?.status == false &&
      response.message == "You can not change more then 3 times in a year."
    ) {
      const startDate = moment(response?.date).format("DD-MMMM-YYYY");
      const daysLeft = moment(response?.date)
        .add(365, "days")
        .diff(moment(), "days");
      setLoader(false);
      setOtpMessage({
        status: "error",
        message: `You are unable to change your business type right now. Since you last changed it on ${startDate}, you must wait ${daysLeft} days before submitting another request. You can change it only 3 times a year.`,
      });
    }
  };

  return (
    <ContentInnerContainer breakPoints={breakPoints}>
      <ContainerHeader>
        <ContainerHeaderText breakPoints={breakPoints}>
          Business Types
          {companyDetails?.basic_information?.plan_status?.display_name !== "Free" && (<Typography
            sx={{
              fontSize: "10px",
              color: "rgba(0, 0, 0, 1)",
              opacity: "1 !important",
            }}
          >
            (You can select only 3 Business Type)
          </Typography>)}
        </ContainerHeaderText>
        {mode == "edit" && (
          <>
            <Box sx={{display:'flex',gap:'6px'}}>
              {companyDetails?.basic_information?.plan_status?.display_name !== "Free" && 
               <><ContainerHeaderDescription
               breakPoints={breakPoints}
               sx={{
                 display: "flex",
                 alignItems: "center",
                 gap: "8px",
                 "@media screen and (max-width:600px)": { display: "block" },
               }}
             >
               {businessTypeContent}
             </ContainerHeaderDescription>
             <LightTooltip
               disableInteractive
               arrow
               style={{ cursor: "pointer" }}
               title={businessTypeTooltip}
               placement="top"
             >
               <InfoOutlinedIcon sx={{ color: "#34a853 ", fontSize: "18px" }} />
             </LightTooltip></>}
             
            </Box>
            <ContainerHeaderDescription
              breakPoints={breakPoints}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                "@media screen and (max-width:600px)": { display: "block" },
              }}
            ></ContainerHeaderDescription>
          </>
        )}
        {mode == "view" ? (
          <FloatingEditIcon
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              toggleMode(mode, changeMode, resetModes);
            }}
          >
            <PencilIcon>
              <Image
                src={"/assets/EditPencil.svg"}
                layout="fill"
                alt="editImage"
              />
            </PencilIcon>{" "}
            {role === "buyer"
              ? companyDetails?.business_type_user?.length > 0
                ? "Modify"
                : "Add"
              : companyDetails?.business_type?.length > 0
              ? "Modify"
              : "Add"}
          </FloatingEditIcon>
        ) : (
          <FloatingEditIcon
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <CancelLink
              onClick={() => {
                setSelectedOptions(
                  defaultValues?.map((v) => ({
                    name: v.name,
                    child: typeof v.value == "string" ? [v.value] : v.value,
                    toggle: v.toggle,
                    tooltip: user_info?.type == "seller" ? v.tooltip : v.value,
                  }))
                );
                toggleMode(mode, changeMode, resetModes);
                setSelectionError(false);
              }}
            >
              <CloseIcon />
              <Box
                sx={{
                  "@media screen and (max-width:320px)": {
                    display: "none",
                  },
                }}
              >
                Cancel
              </Box>
            </CancelLink>
            {loader ? (
              <ThreeDots
                height="20"
                width="60"
                radius="5"
                color="#d32f2f"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              <Button type="submit" sx={{ padding: "0px", minWidth: "auto" }}>
                <SaveLink
                  onClick={() => {
                    SaveValues();
                  }}
                >
                  <SaveOutlinedIcon />
                  <Box
                    sx={{
                      "@media screen and (max-width:320px)": {
                        display: "none",
                      },
                      textTransform: "capitalize",
                    }}
                  >
                    Save
                  </Box>
                </SaveLink>
              </Button>
            )}
          </FloatingEditIcon>
        )}
      </ContainerHeader>
      <OuterContainer style={{ marginTop: "0px" }}  sx={DataGridStyle}>
        {mode == "edit" ? (
          <>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Grid container spacing={1}>
                  {GridOneOptions.map((value, index) => {
                    const defaultChecked = selectedOptions?.find(
                      (v) => v.name == value.name
                    );
                    return (
                      <Grid item xs={12} sm={12} md={12}>
                        <Box
                          sx={{
                            border: "1px solid #EAEAEA",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#EAEAEA",
                              padding: "0px 14px 0px 14px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name={value.name}
                                    checked={defaultChecked ? true : false}
                                    onChange={(e) =>
                                      BusinessTypeHandler(
                                        e,
                                        "parent",
                                        value.options[0].name
                                      )
                                    }
                                    sx={{
                                      "& .MuiSvgIcon-root": {
                                        fontSize: "19px",
                                        color: defaultChecked
                                          ? "#D7282F"
                                          : "inherit",
                                      },
                                      "&.Mui-checked .MuiSvgIcon-root": {
                                        color: "#D7282F",
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: "500",
                                      color: "#231f20",
                                    }}
                                  >
                                    {value.name}
                                  </Typography>
                                }
                              />
                            </FormGroup>
                            {defaultChecked && (
                              <Box>
                                <LightTooltip
                                  sx={{ cursor: "pointer" }}
                                  placement="top"
                                  title="The selected main business type will be displayed on your mini store. "
                                  arrow
                                >
                                  <FormGroup>
                                    <FormControlLabel
                                      label=""
                                      name="ques5"
                                      onChange={(e) =>
                                        ToggleHandler(e, value.name)
                                      }
                                      checked={
                                        defaultChecked.toggle == "1"
                                          ? true
                                          : false
                                      }
                                      control={<AntSwitch />}
                                      sx={{ marginRight: "0px" }}
                                    />
                                  </FormGroup>
                                </LightTooltip>
                              </Box>
                            )}
                          </Box>
                          {defaultChecked && (
                            <Box sx={{ padding: "0 0 10px 14px" }}>
                              <FormControl>
                                {value.options.map((childValue, index) => {
                                  return (
                                    <>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={defaultChecked?.child?.includes(
                                              childValue.name
                                            )}
                                            sx={{
                                              "& .MuiSvgIcon-root": {
                                                fontSize: "19px",
                                                color: defaultChecked
                                                  ? "#D7282F"
                                                  : "inherit",
                                              },
                                              "&.Mui-checked .MuiSvgIcon-root":
                                                {
                                                  color: "#D7282F",
                                                },
                                            }}
                                          />
                                        }
                                        label={
                                          <Typography
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "400",
                                              color: "#231f20",
                                            }}
                                          >
                                            {childValue.name}
                                          </Typography>
                                        }
                                        onChange={(e: any) =>
                                          BusinessTypeHandler(
                                            {
                                              checked: e.target.checked,
                                              value: childValue.name,
                                            },
                                            "child",
                                            value.name
                                          )
                                        }
                                      />
                                    </>
                                  );
                                })}
                              </FormControl>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Grid container spacing={1}>
                  {GridTwoOptions.map((value, index) => {
                    const defaultChecked = selectedOptions?.find(
                      (v) => v.name == value.name
                    );
                    return (
                      <Grid item xs={12} sm={12} md={12}>
                        <Box
                          sx={{
                            border: "1px solid #EAEAEA",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#EAEAEA",
                              padding: "0px 14px 0px 14px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name={value.name}
                                    checked={defaultChecked ? true : false}
                                    onChange={(e) =>
                                      BusinessTypeHandler(
                                        e,
                                        "parent",
                                        value.options[0].name
                                      )
                                    }
                                    sx={{
                                      "& .MuiSvgIcon-root": {
                                        fontSize: "19px",
                                        color: defaultChecked
                                          ? "#D7282F"
                                          : "inherit",
                                      },
                                      "&.Mui-checked .MuiSvgIcon-root": {
                                        color: "#D7282F",
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: "500",
                                      color: "#231f20",
                                    }}
                                  >
                                    {value.name}
                                  </Typography>
                                }
                              />
                            </FormGroup>
                            {defaultChecked && (
                              <Box>
                                <LightTooltip
                                  sx={{ cursor: "pointer" }}
                                  placement="top"
                                  title="The selected main business type will be displayed on your mini store. "
                                  arrow
                                >
                                  <FormGroup>
                                    <FormControlLabel
                                      label=""
                                      name="ques5"
                                      onChange={(e) =>
                                        ToggleHandler(e, value.name)
                                      }
                                      checked={
                                        defaultChecked.toggle == "1"
                                          ? true
                                          : false
                                      }
                                      control={<AntSwitch />}
                                      sx={{ marginRight: "0px" }}
                                    />
                                  </FormGroup>
                                </LightTooltip>
                              </Box>
                            )}
                          </Box>
                          {defaultChecked && (
                            <Box sx={{ padding: "0 0 10px 14px" }}>
                              <FormControl>
                                {value.options.map((childValue, index) => {
                                  return (
                                    <>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={defaultChecked?.child?.includes(
                                              childValue.name
                                            )}
                                            sx={{
                                              "& .MuiSvgIcon-root": {
                                                fontSize: "19px",
                                                color: defaultChecked
                                                  ? "#D7282F"
                                                  : "inherit",
                                              },
                                              "&.Mui-checked .MuiSvgIcon-root":
                                                {
                                                  color: "#D7282F",
                                                },
                                            }}
                                          />
                                        }
                                        label={
                                          <Typography
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "400",
                                              color: "#231f20",
                                            }}
                                          >
                                            {childValue.name}
                                          </Typography>
                                        }
                                        onChange={(e: any) =>
                                          BusinessTypeHandler(
                                            {
                                              checked: e.target.checked,
                                              value: childValue.name,
                                            },
                                            "child",
                                            value.name
                                          )
                                        }
                                      />
                                    </>
                                  );
                                })}
                              </FormControl>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Box
                sx={{
                  textAlign: "left",
                  marginTop: "20px",
                }}
              >
                {otpMessage?.message !== "" && otpMessage.status == "error" && (
                  <Alert
                    sx={{
                      ".MuiAlert-icon": {
                        color:
                          otpMessage?.status == "success" ? "green" : "#D7282F",
                        fontSize: "20px",
                      },
                      fontSize: "12px",
                      cursor: "pointer",
                      alignItems: "flex-start",
                      textAlign: "left",
                    }}
                    onClose={() => {
                      setOtpMessage("");
                    }}
                    severity={"error"}
                  >
                    {otpMessage?.message}
                  </Alert>
                )}
              </Box>
            </Grid>
          </>
        ) : (
          <TypebusinessButton
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {skeltonLoader ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Skeleton
                  width={100}
                  height={"26px"}
                  variant="rounded"
                  animation="wave"
                />
                <Skeleton
                  width={130}
                  height={"26px"}
                  variant="rounded"
                  animation="wave"
                />
                <Skeleton
                  width={90}
                  height={"26px"}
                  variant="rounded"
                  animation="wave"
                />
              </Box>
            ) : (
              <>
                {selectedOptions ? (
                  selectedOptions?.map((element, index) => (
                    <Stack
                      key={index}
                      sx={{ color: "rgb(221, 72, 78)" }}
                      justifyContent="flex-start"
                      alignItems="center"
                      flexWrap="wrap"
                      onMouseOver={(e: any) => {
                        if (element.child !== "") {
                          setAnchorEl(e.currentTarget);
                          handleClickPopUp(
                            e,
                            index,
                            element.child,
                            element.tooltip
                          );
                        }
                      }}
                    >
                      <Tooltip
                        PopperProps={{ style: { zIndex: 10 } }}
                        componentsProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: "#fff",
                              color: "#000",
                              border: "1px solid rgb(225, 225, 225)",
                              boxShadow: "0 1px 12px 0 rgba(25,27,35,.15)",
                              fontSize: "14px",
                              padding: "5px",
                              letterSpaceing: "0.2px",
                              display:
                                showListValue?.length > 0 ? "block" : "none",
                            },
                          },
                        }}
                        placement="right"
                        title={
                          showListValue?.length > 0 && (
                            <div>
                              {showListValue.map((v, i) => (
                                <TypographyBusiness
                                  key={i}
                                  sx={{
                                    py: 1,
                                    px: 2,
                                    fontSize: "13px",
                                    borderRadius: "10px",
                                    fontWeight: "400",
                                    letterSpacing: "0.00938em",
                                    transition:
                                      "backgroundColor 300ms ease 0s, color 300ms ease 0s",
                                  }}
                                >
                                  {v}
                                </TypographyBusiness>
                              ))}
                            </div>
                          )
                        }
                      >
                        <SelectedBusinessBtnOutline
                          key={index}
                          style={{
                            color: element.toggle == "1" ? "#d7282f" : "",
                            border:
                              element.toggle == "1"
                                ? "1px solid #d7282f"
                                : "1px solid #727272",
                          }}
                        >
                          {element?.name}
                          {element?.child && (
                            <InfoOutlinedIcon
                              style={{ fontSize: "16px", marginLeft: "5px" }}
                            />
                          )}
                        </SelectedBusinessBtnOutline>
                      </Tooltip>
                    </Stack>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <PlatformTextCenter>
                      <Typography>
                        No business types has been added yet
                      </Typography>
                    </PlatformTextCenter>
                  </Grid>
                )}
              </>
            )}
          </TypebusinessButton>
        )}
      </OuterContainer>
    </ContentInnerContainer>
  );
};
