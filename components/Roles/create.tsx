import {
  Box,
    Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import React, { useEffect, useState } from "react";
import { ProfileHeader } from "../common/profileheader";
import {
  BottomButton,
  RolNameSkl,
  CommonRedOutineBtn,
  RoleHeadingSection,
  RolePermissionInner,
  RolePermissionOuter,
  RolePermissionRow,
  RolePermissionSection,
  RollScrollBox,
  ScrollBox,
  SelectCheckHere,
  SmallTitleHeading,
  TitleHeading,
} from "./style";
import { DataGridStyle } from "../common/commonStyle";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Grid, Checkbox, FormControlLabel } from "@mui/material";
import { apiClient, permissionsList } from "../common/common";
import { useFormik } from "formik";
import * as Yup from "yup";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import HelperText from "../CompanySettings/CompanyDetail/Common/helperText";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import RolesSkelton from "./RolesSkelton";

const CreateRole = () => {
  const router = useRouter();
  const [permission, setPermissions] = useState(permissionsList);
  const [select, setSelect] = useState(0);
  const [addLoader, setAddLoader] = useState(false);
  const [addSkelton, setAddSkelton] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setAddSkelton(true);
    setPermissions(permissionsList);
    setAddSkelton(false);
  }, []);
  const validation = Yup.object().shape({
    rolename: Yup.string()
      .required("Please enter role name")
      .max(50, "The content is too long. Please limit it to 50 characters."),
    status: Yup.string().required("Please select role status"),
    permissionArray: Yup.array().required(
      "Please select at least one permission"
    ),
  });
  let formik: any = useFormik({
    initialValues: {
      rolename: "",
      status: "0",
      permissionArray: [],
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const isAnyChecked = permission.some((feature) =>
        feature.settings.some((setting) => setting.value)
      );
      if (values?.permissionArray?.length == 0 || isAnyChecked == false) {
        formik.setFieldError(
          "permissionArray",
          "Please checke at least one permission"
        );
        return;
      }
      saveNewRole(values);
    },
  });

  const saveNewRole = async (values) => {
    setAddLoader(true);
    const payloads = {
      name: values?.rolename,
      status: values?.status,
      permissions: JSON.stringify(values?.permissionArray),
    };
    let response = await apiClient("roles/permissions/create", "post", {
      body: payloads,
    });

    if (response.status === 200 || response.status == true) {
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
          title: `Role Created`,
          text: "Role and permissions successfully created. You can now assign this role to any sub-accounts",
          icon: "success",
          showCancelButton: false,
          // confirmButtonText: "Yes, clone it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
          allowOutsideClick: false,
        })
        .then(async (result) => {
          router.push("/roles");
        });
    } else {
      setAddLoader(false);
      formik.setFieldError("rolename", "Role name already exists");
    }
  };
  const handleAllPermissions = (value) => {
    setSelect(value ? 1 : 0);
    const newFeatures = permission.map((feature) => ({
      ...feature,
      settings: feature.settings.map((setting) => ({
        ...setting,
        value: value ? true : false,
      })),
    }));
    setPermissions(newFeatures);
    formik.setFieldValue("permissionArray", newFeatures);
  };

  const handleCheckboxChange = (featureIndex, settingIndex, event, name) => {
    const newFeatures = permission.map((feature, fIndex) => {
      if (fIndex === featureIndex) {
        return {
          ...feature,
          settings: feature.settings.map((setting, sIndex) => {
            if (sIndex === settingIndex) {
              if (event?.target?.checked === false && setting.name === "View") {
                return {
                  ...setting,
                  value: !setting.value,
                };
              } else {
                return {
                  ...setting,
                  value: !setting.value,
                };
              }
            } else if (setting.name === "View") {
              return {
                ...setting,
                value: true,
              };
            }
            return setting;
          }),
        };
      }
      return feature;
    });
    if (event?.target?.checked === false && name === "View") {
      const updatedPermissions = permission.map((feature, fIndex) => {
        if (fIndex === featureIndex) {
          return {
            ...feature,
            settings: feature.settings.map((setting, sIndex) => {
              return {
                ...setting,
                value: false,
              };
            }),
          };
        }
        return feature;
      });
      return setPermissions(updatedPermissions);
    }

    const isAllChecked = newFeatures.every((feature) =>
      feature.settings.every((setting) => setting.value)
    );

    if (isAllChecked) {
      setSelect(1);
    } else {
      setSelect(0);
    }
    setPermissions(newFeatures);
    formik.setFieldValue("permissionArray", newFeatures);
  };

  const ValidateField = (field: string) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };
  // console.log(permission,"permission----")

  return (
    <div className="full_page">
      <Box>
        <ProfileHeader text={"Roles & Permission"} />
      </Box>
      <RolePermissionOuter>
        <RoleHeadingSection>
          <Typography variant="h4">Add Role</Typography>
          <Typography variant="body2">Set role permissions</Typography>
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
                    label="Role Name"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      formik.setFieldValue("rolename", e.target.value);
                      formik.setFieldError("rolename", "");
                    }}
                    value={formik.values.rolename}
                    error={ValidateField("rolename")}
                    helperText={formik?.errors?.rolename}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
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
                </Grid>
              </Grid>
              <ScrollBox>
                <RolePermissionSection>
                  <RolePermissionRow>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3} md={3}>
                        <TitleHeading>Role Permissions</TitleHeading>
                      </Grid>
                      <Grid item xs={6} sm={4} md={4}>
                        <SelectCheckHere>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="checkbox1"
                                onChange={(e) =>
                                  handleAllPermissions(e.target.checked)
                                }
                                checked={select == 1 ? true : false}
                              />
                            }
                            label={select == 0 ? "Select All" : "Unselect All"}
                          />
                        </SelectCheckHere>
                      </Grid>
                    </Grid>
                  </RolePermissionRow>
                  <Divider />
                  <RollScrollBox>
                    {permission?.length > 0 &&
                      permission?.map((list, index) => (
                        <>
                          <RolePermissionRow key={index}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={3}>
                                <SmallTitleHeading>
                                  {list?.name}
                                </SmallTitleHeading>
                              </Grid>
                              <Grid item xs={12} sm={12} md={9}>
                                <Grid container spacing={0} rowSpacing={1}>
                                  {list?.settings?.map((setting, indexnew) => (
                                    <Grid
                                      item
                                      xs={6}
                                      sm={3}
                                      md={3}
                                      lg={2}
                                      key={indexnew}
                                    >
                                      <SelectCheckHere>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={
                                                setting?.value == true
                                                  ? true
                                                  : false
                                              }
                                              onChange={(e) =>
                                                handleCheckboxChange(
                                                  index,
                                                  indexnew,
                                                  e,
                                                  setting?.name
                                                )
                                              }
                                            />
                                          }
                                          label={setting?.name}
                                        />
                                      </SelectCheckHere>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Grid>
                            </Grid>
                          </RolePermissionRow>
                          {permission?.length != index + 1 && <Divider />}
                        </>
                      ))}
                  </RollScrollBox>
                  {formik.errors.permissionArray && (
                    <Typography sx={{ fontSize: "10px", color: "#d7282f" }}>
                      <WarningAmberOutlinedIcon
                        style={{
                          fontSize: "10px",
                          margin: "0px 4px 0 0",
                        }}
                      />
                      {ValidateField("permissionArray")
                        ? `${formik.errors.permissionArray}`
                        : ""}
                    </Typography>
                  )}
                  <BottomButton>
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
                        <>Save</>
                      )}
                    </CommonRedOutineBtn>
                    <CommonRedOutineBtn
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        router.push("/roles");
                      }}
                    >
                      Cancel
                    </CommonRedOutineBtn>
                  </BottomButton>
                </RolePermissionSection>
              </ScrollBox>
            </RolePermissionInner>
          </form>
        )}
      </RolePermissionOuter>
    </div>
  );
};
export default CreateRole;
