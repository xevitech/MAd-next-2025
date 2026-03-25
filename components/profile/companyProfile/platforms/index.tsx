import React, { useEffect, useRef, useState } from "react";
import {
  ContainerHeader,
  ContainerHeaderText,
  ContentInnerContainer,
} from "@/components/profile/common";
import useAppContext from "@/hooks/useAppContext";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  ContainerHeaderDescription,
  EditSaveCancel,
  PencilIcon,
  PlatformTextCenter,
} from "../styles";
import Image from "next/image";
import { CancelLink, SaveLink } from "../businessType/styles";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useDispatch, useSelector } from "react-redux";
import { apiClient, sellerPlateform } from "@/components/common/common";
import { getCompanyProfile } from "@/hooks/company";
import { ThreeDots } from "react-loader-spinner";
import { DataGridStyle } from "@/components/common/commonStyle";
import PlatformSkeleton from "./PlatformSkeleton";

export const Ulcomponent = styled("ul")({
  listStyle: "none",
  "@media screen and (max-width:767px)": {
    padding: "0 0 0 20px",
  },
});
export const Licomponent = styled("li")({
  display: "inline-block",
  padding: "0 20px 0 20px",
  borderRight: "1px solid #e2e2e2",
  margin: "12px 0 0 0 ",
  fontSize: "14px",
  color: "#000",
  "@media screen and (max-width:767px)": {
    borderBottom: "1px solid #dddd",
    minWidth: "20%",
    padding: "0px 20px 9px 20px",
  },
});
export default function Platforms() {
  const { breakPoints } = useAppContext();
  const [isEdit, setEdit] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedPlatformsAlreadyDefined, setSelectedPlatformsAlreadyDefined] =
    useState([]);
  const [otherPlatforms, setOtherPlatforms] = useState([]);
  const textFieldRef = useRef(null);
  const { role } = useSelector((state: any) => state.userData);
  const [isOtherCheckboxChecked, setIsOtherCheckboxChecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const { companyDetails } = useSelector((state: any) => state.companyProfile);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otherPlatformsError, setOtherPlatformsError] = useState(false);

  useEffect(() => {
    setOtherPlatformsError(false);
    setIsError(false);
  }, []);

  const fetchLatestCheckboxValues = async () => {
    setLoading(true);
    const viewProfileResponse = await apiClient("company_profile/view", "get");
    if (
      viewProfileResponse?.status == true ||
      viewProfileResponse?.status == 200
    ) {
      setOtherPlatformsError(false);
      setIsError(false);
      if (
        viewProfileResponse?.user_info?.user_type == "seller" ||
        role == "seller"
      ) {
        let localValue = sellerPlateform.map((v) => v.name);
        let storedValue = viewProfileResponse.platform.platform_selling;
        let valueCheck = storedValue?.filter((v) => !localValue?.includes(v));
        if (valueCheck.length > 0) {
          setIsOtherCheckboxChecked(true);
          setOtherPlatforms(valueCheck);
        }
        setSelectedPlatformsAlreadyDefined(
          storedValue?.filter((v) => localValue.includes(v))
        );
        setSelectedPlatforms(viewProfileResponse.platform.platform_selling);
      } else {
        setLoading(true);
        let localValue = sellerPlateform.map((v) => v.name);
        let storedValue = viewProfileResponse.platform.platform_buying;
        let valueCheck = storedValue?.filter((v) => !localValue.includes(v));
        if (valueCheck.length > 0) {
          setIsOtherCheckboxChecked(true);
          setOtherPlatforms(valueCheck);
        }
        setSelectedPlatformsAlreadyDefined(
          storedValue?.filter((v) => localValue.includes(v))
        );
        setSelectedPlatforms(viewProfileResponse.platform.platform_buying);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLatestCheckboxValues();
    dispatch(getCompanyProfile());
  }, []);

  const handleCheckboxChange = (platformName) => {
    setSelectedPlatforms((prevSelectedPlatforms) => {
      if (prevSelectedPlatforms.includes(platformName)) {
        return prevSelectedPlatforms.filter((name) => name !== platformName);
      } else {
        return [...prevSelectedPlatforms, platformName];
      }
    });

    setSelectedPlatformsAlreadyDefined((prevSelectedPlatforms) => {
      if (prevSelectedPlatforms.includes(platformName)) {
        return prevSelectedPlatforms.filter((name) => name !== platformName);
      } else {
        return [...prevSelectedPlatforms, platformName];
      }
    });

    const isOtherSelected = platformName === "Other";
    if (!isOtherSelected) {
      if (textFieldRef.current) {
        textFieldRef.current.value = "";
      }
    }
  };

  const handleOtherCheckboxChange = (event) => {
    setIsOtherCheckboxChecked(event.target.checked);
    if (!event.target.checked) {
      setOtherPlatforms([]);
      if (textFieldRef.current) {
        textFieldRef.current.value = "";
      }
    }
  };
  const handleBuyerClick = async () => {
    if (isOtherCheckboxChecked && otherPlatforms.length === 0) {
      setOtherPlatformsError(true);
      return;
    }
    const requestBody = {
      body: {
        platform_buying:
          selectedPlatformsAlreadyDefined.join(",") +
          (isOtherCheckboxChecked
            ? selectedPlatformsAlreadyDefined.length > 0
              ? `,${otherPlatforms}`
              : `${otherPlatforms}`
            : ""),
      },
    };
    setLoader(true);
    try {
      const response = await apiClient(
        "company_profile/updateProfile",
        "post",
        requestBody
      );

      if (response.status === 200) {
        setEdit(false);
        setLoader(false);
        fetchLatestCheckboxValues();
        dispatch(getCompanyProfile());
      }
    } catch (error) {}
  };

  const handleSellerSaveClick = async () => {
    if (isOtherCheckboxChecked && otherPlatforms.length === 0) {
      setOtherPlatformsError(true);
      return;
    }
    const requestBody = {
      body: {
        platform_selling:
          selectedPlatformsAlreadyDefined.join(",") +
          (isOtherCheckboxChecked
            ? selectedPlatformsAlreadyDefined.length > 0
              ? `,${otherPlatforms}`
              : `${otherPlatforms}`
            : ""),
      },
    };
    setLoader(true);
    try {
      const response = await apiClient(
        "company_profile/updateProfile",
        "post",
        requestBody
      );

      if (response.status === 200) {
        setEdit(false);
        setLoader(false);
        fetchLatestCheckboxValues();
        dispatch(getCompanyProfile());
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchLatestCheckboxValues();
  }, [role]);
  const borderColor = isError || otherPlatformsError ? "#d7282f" : "";
  return (
    <>
      <ContentInnerContainer breakPoints={breakPoints}>
        <ContainerHeader>
          {
            <ContainerHeaderText breakPoints={breakPoints}>
              Platforms for {role == "seller" ? "Selling" : "Buying"}
            </ContainerHeaderText>
          }

          <ContainerHeaderDescription breakPoints={breakPoints}>
            Comprehensive and detailed information helps
            {role == "buyer" ? " buyer" : " supplier"} understand your company's
            background and strengths faster.
          </ContainerHeaderDescription>
          {!isEdit && (
            <Box>
              <EditSaveCancel
                onClick={() => {
                  setEdit(true);
                }}
              >
                <PencilIcon>
                  <Image
                    src={"/assets/EditPencil.svg"}
                    layout="fill"
                    alt="editImage"
                  />
                </PencilIcon>{" "}
                {role == "seller"
                  ? companyDetails?.platform?.platform_selling[0]
                    ? "Edit"
                    : "Add"
                  : companyDetails?.platform?.platform_buying[0]
                  ? "Edit"
                  : "Add"}
              </EditSaveCancel>
            </Box>
          )}
          {isEdit && (
            <>
              <EditSaveCancel
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <CancelLink
                  onClick={() => {
                    fetchLatestCheckboxValues(),
                      setSelectedPlatforms([]),
                      setIsOtherCheckboxChecked(false),
                      setEdit(false);
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
                <SaveLink
                  onClick={
                    role == "seller" ? handleSellerSaveClick : handleBuyerClick
                  }
                >
                  {!loader ? (
                    <SaveOutlinedIcon sx={{ marginLeft: "10px" }} />
                  ) : (
                    ""
                  )}
                  {loader ? (
                    <ThreeDots
                      height="30"
                      width="60"
                      radius="5"
                      color="#d32f2f"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    <Box
                      sx={{
                        "@media screen and (max-width:320px)": {
                          display: "none",
                        },
                      }}
                    >
                      Save
                    </Box>
                  )}
                </SaveLink>
              </EditSaveCancel>
            </>
          )}
        </ContainerHeader>
        <Box sx={DataGridStyle}>
          <Grid container spacing={2}>
            {isEdit && (
              <Grid item xs={12} mt={-2}>
                <Grid container rowSpacing={-2}>
                  {sellerPlateform.map((platform) => (
                    <Grid
                      key={platform.name}
                      item
                      xs={12}
                      sm={12}
                      md={2}
                      lg={2}
                      sx={{ marginTop: "12px" }}
                    >
                      <Box>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                sx={{
                                  ".MuiOutlinedInput-root.MuiInputBase-sizeSmall":
                                    {
                                      paddingTop:
                                        otherPlatforms.length > 0 ? "2px" : "",
                                      paddingBottom:
                                        otherPlatforms.length > 0 ? "2px" : "",
                                    },
                                  ".MuiChip-deleteIcon": {
                                    color: "red",
                                    "&:hover": {
                                      color: "black",
                                    },
                                  },
                                }}
                                checked={selectedPlatforms.includes(
                                  platform.name
                                )}
                                onChange={() =>
                                  handleCheckboxChange(platform.name)
                                }
                              />
                            }
                            label={
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#231f20",
                                  fontWeight: "400",
                                }}
                              >
                                {platform.name}
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </Box>
                    </Grid>
                  ))}

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    sx={{ marginTop: "12px" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        "@media screen and (max-width:900px)": {
                          display: "block",
                        },
                      }}
                    >
                      <Box>
                        <FormGroup>
                          <FormControlLabel
                            sx={{ width: "80px" }}
                            control={
                              <Checkbox
                                sx={{
                                  "&.Mui-checked": {
                                    color: "#d7282f",
                                  },
                                  "& .MuiSvgIcon-root": {
                                    fontSize: "19px",
                                  },
                                }}
                                checked={isOtherCheckboxChecked}
                                onChange={handleOtherCheckboxChange}
                              />
                            }
                            label={
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#231f20",
                                  fontWeight: "400",
                                }}
                              >
                                Other
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </Box>
                      {isOtherCheckboxChecked && (
                        <Box
                          sx={{
                            ".MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                              paddingTop:
                                otherPlatforms.length > 0 ? "4.57px" : "",
                              paddingBottom:
                                otherPlatforms.length > 0 ? "4.57px" : "",
                            },
                          }}
                        >
                          <Autocomplete
                            size="small"
                            multiple
                            id="tags-filled"
                            options={[]}
                            freeSolo
                            value={otherPlatforms}
                            defaultValue={otherPlatforms}
                            sx={{
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: borderColor,
                                "&:hover": {
                                  borderColor: borderColor,
                                },
                              },
                              "& .MuiInputBase-root:hover": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: borderColor,
                                },
                              },
                            }}
                            onChange={(event: any, value: any) => {
                              if (event?.key == "Backspace") {
                                let keyword = [...otherPlatforms];
                                keyword?.pop();
                                setOtherPlatforms(keyword);
                              } else {
                                let keywordValues =
                                  event?.target?.value?.includes(",")
                                    ? [
                                        ...otherPlatforms,
                                        ...event?.target?.value?.split(","),
                                      ]
                                    : value;
                                setOtherPlatforms(keywordValues);
                              }
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={index}
                                  size="small"
                                  label={option}
                                  {...getTagProps({ index })}
                                  sx={{
                                    backgroundColor:
                                      "rgba(34, 51, 84, 0.1) !important",
                                    "& .MuiChip-deleteIcon": {
                                      color: "#d7282fd9",
                                    },
                                  }}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Press Enter to fill value"
                                inputRef={textFieldRef}
                                onChange={(e) => {
                                  if (
                                    otherPlatforms?.includes(e?.target?.value)
                                  ) {
                                    setIsError(true);
                                    setOtherPlatformsError(false);
                                  } else {
                                    setIsError(false);
                                    setOtherPlatformsError(false);
                                  }
                                }}
                                error={isError ? true : false}
                                InputLabelProps={{ shrink: true }}
                                helperText={
                                  isError || otherPlatformsError
                                    ? isError
                                      ? "Duplicate not allowed!"
                                      : "Please enter a value for other platforms"
                                    : ""
                                }
                              />
                            )}
                          />
                          <Typography
                            sx={{
                              fontSize: "11px",
                              fontWeight: "600",
                              color: "#4a4a4a",
                              opacity: ".8",
                            }}
                          >
                            Please press the Enter key after typing each
                            platform.
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {!isEdit && (
              <Grid item xs={12} mt={-2} ml={-2}>
                {role === "seller" ? (
                  selectedPlatforms.length > 0 ? (
                    <Ulcomponent>
                      {selectedPlatforms.map((platform, index) => (
                        <Licomponent key={index}>{platform}</Licomponent>
                      ))}
                    </Ulcomponent>
                  ) : (
                    <Grid item xs={12}>
                      {loading ? (
                        <PlatformSkeleton></PlatformSkeleton>
                      ) : (
                        <PlatformTextCenter>
                          <Typography>
                            No {role} platform has been added yet
                          </Typography>
                        </PlatformTextCenter>
                      )}
                    </Grid>
                  )
                ) : selectedPlatforms.length > 0 ? (
                  <Ulcomponent>
                    {selectedPlatforms.map((platform, index) => (
                      <Licomponent key={index}>{platform}</Licomponent>
                    ))}
                  </Ulcomponent>
                ) : (
                  <Grid item xs={12}>
                    <PlatformTextCenter>
                      <Typography>
                        No {role} platform has been added yet
                      </Typography>
                    </PlatformTextCenter>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </ContentInnerContainer>
    </>
  );
}
