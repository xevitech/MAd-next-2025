import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProfileHeader } from "../common/profileheader";
import {
  BottomButton,
  CommonRedOutineBtn,
  RoleHeadingSection,
  RolePermissionInner,
  RolePermissionOuter,
  RolePermissionRow,
  RolePermissionSection,
  RollScrollBox,
  SelectCheckHere,
  SmallTitleHeading,
  TitleHeading,
} from "./style";
import { Grid, Checkbox, FormControlLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import RolesSkelton from "./RolesSkelton";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";

const EditRole = () => {
  const router = useRouter();
  const [permission, setPermissions] = useState([]);
  const [updateData, setUpdateData] = useState<any>([]);
  const [select, setSelect] = useState(0);
  const [addLoader, setAddLoader] = useState(false);
  const [addSkelton, setAddSkelton] = useState(true);
  const { id } = router.query;

  const validation = Yup.object().shape({
    // rolename: Yup.string()
    //   .required("Please enter role name")
    //   .max(50, "The content is too long. Please limit it to 50 characters."),
    // status: Yup.string().required("Please select role status"),
    // permissionArray: Yup.array().required(
    //   "Please select at least one permission"
    // ),
  });
  let formik: any = useFormik({
    initialValues: {
      user_permission: permission,
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (!validatePermissionAtleastOneChecked()) {
        formik.setFieldError(
          "permissionArray",
          "Please check at least one permission"
        );
        return;
      }

      await updateRole(values);
    },
  });

  const handleAllPermissions = (value) => {
    const updatedPermissions = { ...permission };

    for (const category in updatedPermissions) {
      for (const action in updatedPermissions[category]) {
        updatedPermissions[category][action] = value;
      }
    }

    setPermissions(updatedPermissions);
  };

  const validatePermissionAtleastOneChecked = () => {
    for (const category in permission) {
      for (const action in permission[category]) {
        if (permission[category][action] === true) {
          return true;
        }
      }
    }
    return false;
  };

  const handleCheckboxChange = (
    featureIndex,
    permissionIndex,
    event,
    permissionKey
  ) => {
    const newPermissions = { ...permission };
    const feature = Object.keys(newPermissions)[featureIndex];
    const permissionObject = newPermissions[feature];
    permissionObject[permissionKey] = event.target.checked;
    setPermissions(newPermissions);
  };

  const ValidateField = (field: string) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };
  const [accountName, setAccountName] = useState("");

  const getRoleDetails = async () => {
    setAddSkelton(true);
    let res = await fetch(`${BASE_URL}/roles/permissions/list?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
    });
    const response = await res.json();

    if (res.status === 200) {
      setUpdateData(response);
      setUpdateData(response);
      const accountTyp = response.name;
      setAccountName(accountTyp);
      const permissionList = response?.user_permission?.[0];

      setPermissions(permissionList);
      const isAllChecked = response?.user_permission?.every(
        (feature) =>
          feature.permissions &&
          feature.permissions.every((permission) => permission.value === true)
      );
      if (isAllChecked) {
        setSelect(1);
      } else {
        setSelect(0);
      }
      setAddSkelton(false);
    }
  };
  useEffect(() => {
    id && getRoleDetails();
  }, [id]);

  const updateRole = async (values) => {
    setAddLoader(true);

    const convertedArray = [values?.user_permission];

    const convertedArrayJson = JSON.stringify(convertedArray, null, 4);

    const payload = {
      user_permission: convertedArrayJson,
    };

    const response = await fetch(`${BASE_URL}/roles/permissions/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },

      body: JSON.stringify(payload),
    });
    const responseData = await response?.json();

    if (response.ok) {
      setAddLoader(false);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          text: "Sub Account Permissions updated successfully.",
          icon: "success",
          showCancelButton: false,
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
          allowOutsideClick: false,
        })
        .then(async (result) => {
          router.push("/sellersubaccount");
        });
    } else {
      setAddLoader(false);
    }
  };
  function convertToReadableFormat(input) {
    return input
      .split("_") // Split the string by underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words back together with spaces
  }

  return (
    <div className="full_page">
      <Box>
        <ProfileHeader text={"Roles & Permission"} />
      </Box>
      <RolePermissionOuter>
        <RoleHeadingSection>
          <Typography variant="h4">Edit Sub Account Permission</Typography>
          {/* <Typography variant="body2">Update permissions</Typography> */}
        </RoleHeadingSection>
        {addSkelton ? (
          <Box>
            <RolesSkelton />
          </Box>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <RolePermissionInner>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    label="Account Type"
                    variant="outlined"
                    disabled
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    // onChange={(e) => {
                    //   formik.setFieldValue("rolename", e.target.value);
                    //   formik.setFieldError("rolename", "");
                    // }}
                    value={accountName}

                    // error={ValidateField("rolename")}
                    // helperText={formik?.errors?.rolename}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Status"
                      size="small"
                      value={formik?.values?.status}
                      onBlur={(e) => {
                        formik?.setFieldValue("status", e?.target?.value);
                      }}
                      autoFocus
                      onChange={(e) => {
                        formik?.setFieldValue("status", e?.target?.value);
                      }}
                    >
                      <MenuItem value={"0"}>Enable</MenuItem>
                      <MenuItem value={"1"}>Disable</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}
              </Grid>

              <RolePermissionSection>
                <RolePermissionRow>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <TitleHeading>Permissions</TitleHeading>
                    </Grid>
                    <Grid item xs={4}>
                      <SelectCheckHere>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="checkbox1"
                              onChange={(e) => {
                                handleAllPermissions(e.target.checked);
                                setSelect(e.target.checked ? 1 : 0);
                              }}
                              checked={select === 1}
                            />
                          }
                          label={select === 0 ? "Select All" : "Unselect All"}
                        />
                      </SelectCheckHere>
                    </Grid>
                  </Grid>
                </RolePermissionRow>
                <Divider />
                <RollScrollBox>
                  {permission &&
                    Object.entries(permission).map(
                      ([featureKey, featureValue], index) => {
                        return (
                          <React.Fragment key={index}>
                            <RolePermissionRow>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={3}>
                                  <SmallTitleHeading>
                                    {convertToReadableFormat(featureKey)}
                                  </SmallTitleHeading>
                                </Grid>
                                <Grid item xs={12} sm={12} md={9}>
                                  <Grid container spacing={0} rowSpacing={1}>
                                    {/* Check if the featureValue is an object and loop through permissions */}
                                    {typeof featureValue === "object" &&
                                      Object.entries(featureValue).map(
                                        (
                                          [permissionKey, permissionValue],
                                          indexNew
                                        ) => (
                                          <Grid
                                            item
                                            xs={6}
                                            sm={3}
                                            md={3}
                                            lg={2}
                                            key={indexNew}
                                          >
                                            <SelectCheckHere>
                                              <FormControlLabel
                                                control={
                                                  <Checkbox
                                                    checked={
                                                      permissionValue === true
                                                    }
                                                    onChange={(e) => {
                                                      handleCheckboxChange(
                                                        index,
                                                        indexNew,
                                                        e,
                                                        permissionKey
                                                      );
                                                    }}
                                                  />
                                                }
                                                label={
                                                  convertToReadableFormat(
                                                    permissionKey
                                                  ) || "Unnamed Setting"
                                                }
                                              />
                                            </SelectCheckHere>
                                          </Grid>
                                        )
                                      )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </RolePermissionRow>
                            {index < Object.keys(permission).length - 1 && (
                              <Divider />
                            )}
                          </React.Fragment>
                        );
                      }
                    )}
                </RollScrollBox>
                {formik?.errors?.permissionArray && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <WarningAmberOutlinedIcon
                    style={{
                      fontSize: "9px",
                      margin: "0px 4px 0 0",
                      color: "#d7282f",
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "10px", color: "#d7282f !important" }}
                  >
                    {formik.errors.permissionArray}
                  </Typography>
                </Box>
              )}
            
                <BottomButton>
                  <CommonRedOutineBtn
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      router.push("/sellersubaccount");
                    }}
                  >
                    Cancel
                  </CommonRedOutineBtn>
                  <CommonRedOutineBtn
                    variant="outlined"
                    size="small"
                    type="submit"
                  >
                    {addLoader ? (
                      <ThreeDots
                        height="36px"
                        width="36px"
                        radius="9"
                        color="#D7282F"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      <>Update</>
                    )}
                  </CommonRedOutineBtn>
                </BottomButton>
              </RolePermissionSection>
            </RolePermissionInner>
          </form>
        )}
      </RolePermissionOuter>
    </div>
  );
};
export default EditRole;
