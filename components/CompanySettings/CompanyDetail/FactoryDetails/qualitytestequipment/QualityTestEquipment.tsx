import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Grid,
  Divider,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  AstricksMark,
  ButtonModeHere,
  CancelTextWithIcon,
  CompanyFacilityData,
  CompanyFacilityInnContainerQAQCnRND,
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  EditModeBoxContainer,
  EditSaveIcons,
  EditSaveIcons1,
  PlushIcon,
  PlushIconBox,
  QaqcandRndSeparation,
  SaveTextWithIcon,
  TypographyTitle,
  ViewMorLess,
} from "../style";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box } from "@/components/dashboard/style";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { FormControl } from "@mui/base";
import { apiClient } from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
import RemoveIcon from "@mui/icons-material/Remove";
import { ThreeDots } from "react-loader-spinner";
const initialFormValues = {
  equipmentName: "",
  equipmentModel: "",
  equipmentQuantity: "",
};
const QualityTestEquipment = ({
  listData,
  departmentData,
  handlCallBackFunction,
}): any => {
  const [formBlocks, setFormBlocks] = useState([initialFormValues]);
  const { companyDetails }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const [loader, setLoader] = useState(false);
  const manufactureData = companyDetails?.qaqc_rnd?.manufacture_qaqc;
  let data = [];
  if (manufactureData) {
    try {
      const parsedData = JSON.parse(manufactureData);
      if (
        Array.isArray(parsedData?.QualityTestEquipment) &&
        parsedData.QualityTestEquipment.length > 0
      ) {
        parsedData.QualityTestEquipment.forEach((equipmentEntry) => {
          if (Array.isArray(equipmentEntry.quality_test_equipment)) {
            data = equipmentEntry.quality_test_equipment;
          }
        });
      }
    } catch (error) {}
  }

  const [visibleCount, setVisibleCount] = useState(5);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleViewLess = () => {
    setVisibleCount((prevCount) => (prevCount > 5 ? prevCount - 5 : 5));
  };

  const dispatch = useDispatch();
  const handleRemove = (index) => {
    if (index !== 0) {
      const formList = formik.values.forms;
      const res = formList.filter((form, i) => {
        return i !== index;
      });

      formik.setFieldValue("forms", res);
    }
  };
  const formik: any = useFormik({
    initialValues: {
      forms: data?.length > 0 ? data : formBlocks,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      forms: Yup.array().of(
        Yup.object().shape({
          equipmentName: Yup.string().required("Please enter equipment name"),
          equipmentModel: Yup.string().required("Please enter equipment model"),
          equipmentQuantity: Yup.string().required(
            "Please enter equipment quantity"
          ),
        })
      ),
    }),
    onSubmit: async (values) => {
      const data = JSON.parse(listData);

      setLoader(true);
      const value = values?.forms;
      const quality_test_equipment = value.map(
        ({ formBlocks, ...rest }) => rest
      );

      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        manufacture_qaqc: {
          Department: data?.Department,
          QualityControlProcess: departmentData?.QualityControlProcess,
          QualityTestEquipment: [
            {
              Show: editMode ? "yes" : "no",
              quality_test_equipment,
            },
          ],
        },
      };

      let response = await apiClient(
        "company_profile/createRndManfctureQaqc",
        "POST",
        {
          body: combinedPayload,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setLoader(false);
        setSelectedValue("no");
        setEditMode(false);
        dispatch(getCompanyProfile());
        handlCallBackFunction();
      }
      setLoader(false);
    },
  });
  const handleSaveClick = () => {
    const touchedArray = formik.values.forms.map(() => ({
      equipmentName: true,
      equipmentModel: true,
      equipmentQuantity: true,
    }));

    formik.setTouched({
      forms: touchedArray,
    });

    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.handleSubmit();
      }
    });
  };

  const [editMode, setEditMode] = useState(false);
  const addFormBlock = () => {
    setFormBlocks((prevFormBlocks) => [...prevFormBlocks, initialFormValues]);
    const addForm = formik.values.forms;
    addForm.push(initialFormValues);
  };

  const [selectedValue, setSelectedValue] = useState("no");
  const handleCancel = () => {
    setSelectedValue("no");
    setEditMode(false);

    formik.resetForm({
      values: {
        ...formik.values,
        forms: data,
      },
    });

    const formikValue = data;
    const storedDataLength = data?.length;

    const slicedValue = [
      formikValue[0],
      ...formikValue?.slice(1, storedDataLength),
    ];
    formik.setFieldValue("forms", slicedValue);
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value == "yes") {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };
  return (
    <CompanyFacilityInnContainerQAQCnRND
      sx={{
        boxShadow: editMode ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "",
        padding: editMode ? "16px" : "0px 0 16px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: editMode ? "0px 0 16px 0" : "16px 16px 0px 16px",
          paddingBottom: "16px",
          "@media screen and (max-width:767px)": {
            padding: editMode ? "0px 0 16px 0" : "0 0 24px 0",
          },
        }}
      >
        <TypographyTitle>Quality Test Equipment</TypographyTitle>
        {editMode && (
          <EditSaveIcons>
            <CancelTextWithIcon
              onClick={() => handleCancel()}
              className="cancelwithicon"
            >
              <CloseIcon />
              <Typography>Cancel</Typography>
            </CancelTextWithIcon>
            <SaveTextWithIcon
              className="savewithicon"
              onClick={() => handleSaveClick()}
            >
              {loader ? (
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#D7282F"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                <>
                  <SaveOutlinedIcon />
                  <Typography variant="body1">Save</Typography>
                </>
              )}
            </SaveTextWithIcon>
          </EditSaveIcons>
        )}
        {data?.length > 0 && !editMode ? (
          <EditSaveIcons1 onClick={() => setEditMode(true)}>
            <img src="/assets/EditPencil.svg" alt="editImage" />
            <Typography>Edit</Typography>
          </EditSaveIcons1>
        ) : (
          <>
            {!editMode && (
              <ButtonModeHere>
                <Box
                  sx={{
                    padding: "0px",
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontWeight: "400",
                    },
                  }}
                >
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={selectedValue}
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
                    </RadioGroup>
                  </FormControl>
                </Box>
              </ButtonModeHere>
            )}
          </>
        )}
      </Box>
      <form onSubmit={() => formik.handleSubmit()}>
        {formik?.values?.forms &&
          formik?.values?.forms?.map((form, index) => (
            <Box sx={{ padding: "0px" }}>
              {editMode && (
                <CompanyFacilityData>
                  {editMode && (
                    <EditModeBoxContainer>
                      <form onSubmit={() => formik.onSubmit()}>
                        <Grid
                          container
                          spacing={2}
                          sx={{
                            padding:
                              index > 0 ? "19px 0 0 0 !important" : "0px",
                          }}
                        >
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere className="editview">
                                  <Grid
                                    container
                                    spacing={1}
                                    alignItems="center"
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Equipment Name{" "}
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          variant="outlined"
                                          size="small"
                                          placeholder="Enter equipment name"
                                          fullWidth
                                          name={`forms[${index}].equipmentName`}
                                          value={
                                            formik.values.forms[index]
                                              ?.equipmentName || ""
                                          }
                                          onChange={(e) => {
                                            const inputValue =
                                              e.target.value.trimStart();
                                            formik.setFieldError(
                                              `forms[${index}].equipmentName`,
                                              ""
                                            );

                                            if (inputValue === "") {
                                              formik.setFieldValue(
                                                `forms[${index}].equipmentName`,
                                                ""
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].equipmentName`,
                                                ""
                                              );
                                              return;
                                            }

                                            if (inputValue.length <= 100) {
                                              formik.setFieldValue(
                                                `forms[${index}].equipmentName`,
                                                inputValue
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].equipmentName`,
                                                ""
                                              );
                                            } else {
                                              formik.setFieldError(
                                                `forms[${index}].equipmentName`,
                                                "Equipment name content is too long. Please limit it to 100 characters."
                                              );
                                            }
                                            formik.setFieldTouched(
                                              `forms[${index}].equipmentName`,
                                              true,
                                              false
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.equipmentName &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.equipmentName
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.equipmentName &&
                                            formik.errors.forms?.[index]
                                              ?.equipmentName
                                          }
                                        />
                                      </DataRowValue>
                                    </Grid>
                                  </Grid>
                                </DataRowHere>
                              </Grid>
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere className="editview">
                                  <Grid
                                    container
                                    spacing={1}
                                    alignItems="center"
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Equipment Model
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          placeholder="Enter equipment model"
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          name={`forms[${index}].equipmentModel`}
                                          value={
                                            formik.values.forms[index]
                                              ?.equipmentModel
                                          }
                                          onChange={(e) => {
                                            let value;

                                            value = e.target.value.trimStart();

                                            formik.setFieldError(
                                              `forms[${index}].equipmentModel`,
                                              ""
                                            );
                                            if (value.length > 15) {
                                              formik.setFieldError(
                                                `forms[${index}].equipmentModel`,
                                                "Equipment model content is too long. Please limit it to 15 characters."
                                              );
                                            } else {
                                              formik.setFieldValue(
                                                `forms[${index}].equipmentModel`,
                                                value
                                              );
                                            }
                                            formik.setFieldTouched(
                                              `forms[${index}].equipmentModel`,
                                              true,
                                              false
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.equipmentModel &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.equipmentModel
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.equipmentModel &&
                                            formik.errors.forms?.[index]
                                              ?.equipmentModel
                                          }
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
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere className="editview">
                                  <Grid
                                    container
                                    spacing={1}
                                    alignItems="center"
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Equipment Quantity
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          placeholder="Enter equipment quantity"
                                          variant="outlined"
                                          size="small"
                                          name={`forms[${index}].equipmentQuantity`}
                                          value={
                                            formik.values.forms[index]
                                              ?.equipmentQuantity
                                          }
                                          onChange={(e) => {
                                            let value =
                                              e.target.value.trimStart();

                                            const numericValue = value.replace(
                                              /[^0-9]/g,
                                              ""
                                            );

                                            formik.setFieldError(
                                              `forms[${index}].equipmentQuantity`,
                                              ""
                                            );

                                            if (numericValue.length > 4) {
                                              formik.setFieldError(
                                                `forms[${index}].equipmentQuantity`,

                                                "Equipment quantity content is too long. Please limit it to 4 digit."
                                              );
                                            } else {
                                              formik.setFieldValue(
                                                `forms[${index}].equipmentQuantity`,
                                                numericValue
                                              );
                                            }
                                            formik.setFieldTouched(
                                              `forms[${index}].equipmentQuantity`,
                                              true,
                                              false
                                            );
                                          }}
                                          onPaste={(e) => {
                                            const pastedData = e.clipboardData
                                              .getData("Text")
                                              .trim();

                                            if (!/^\d+$/.test(pastedData)) {
                                              e.preventDefault();
                                              formik.setFieldError(
                                                `forms[${index}].equipmentQuantity`,
                                                "Only numeric values are allowed."
                                              );
                                            } else {
                                              const numericValue =
                                                pastedData.replace(
                                                  /[^0-9]/g,
                                                  ""
                                                );
                                              formik.setFieldError(
                                                `forms[${index}].equipmentQuantity`,
                                                ""
                                              );

                                              if (numericValue.length > 4) {
                                                formik.setFieldError(
                                                  `forms[${index}].equipmentQuantity`,
                                                  "Equipment quantity content is too long. Please limit it to 4 digit.."
                                                );
                                              } else {
                                                formik.setFieldValue(
                                                  `forms[${index}].equipmentQuantity`,
                                                  numericValue
                                                );
                                              }
                                              formik.setFieldTouched(
                                                `forms[${index}].equipmentQuantity`,
                                                true,
                                                false
                                              );
                                            }
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.equipmentQuantity &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.equipmentQuantity
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.equipmentQuantity &&
                                            formik.errors.forms?.[index]
                                              ?.equipmentQuantity
                                          }
                                          fullWidth
                                          inputProps={{
                                            pattern: "[0-9]*",
                                          }}
                                        />
                                      </DataRowValue>
                                    </Grid>
                                  </Grid>
                                </DataRowHere>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        {index > 0 && (
                          <Box
                            sx={{
                              padding: "0px",
                              margin: "12px 0 0 0",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <LightTooltip
                              title="Remove Store"
                              arrow
                              placement="left"
                            >
                              <Box
                                sx={{
                                  padding: "0px",
                                  textAlign: "center",
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  background: "#d7282f",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={() => handleRemove(index)}
                                className=""
                              >
                                {" "}
                                <RemoveIcon
                                  sx={{ fontSize: "20px", color: "#fff" }}
                                />
                              </Box>
                            </LightTooltip>
                          </Box>
                        )}
                      </form>
                    </EditModeBoxContainer>
                  )}
                  <Divider
                    variant="middle"
                    sx={{ marginTop: "20px !important" }}
                  />
                </CompanyFacilityData>
              )}
            </Box>
          ))}
      </form>
      <form>
        {formik?.values?.forms &&
          formik?.values?.forms.slice(0, visibleCount).map((form, index) => (
            <Box sx={{ padding: "0px" }} key={index}>
              {!editMode && (
                <>
                  {data?.length > 0 && (
                    <Box
                      sx={{
                        padding: "0px 16px 0px 16px",
                        "@media screen and (max-width:767px)": { padding: "0" },
                      }}
                    >
                      <QaqcandRndSeparation>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                          <DataRowHere>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                <DataRowTitle>
                                  <Typography>Equipment Name</Typography>
                                </DataRowTitle>
                              </Grid>
                              <Grid item xs={12} sm={12} md={8} lg={8}>
                                <DataRowValue>
                                  <Typography>{form?.equipmentName}</Typography>
                                </DataRowValue>
                              </Grid>
                            </Grid>
                          </DataRowHere>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <DataRowHere>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                <DataRowTitle>
                                  <Typography>Equipment Model</Typography>
                                </DataRowTitle>
                              </Grid>
                              <Grid item xs={12} sm={12} md={8} lg={8}>
                                <DataRowValue>
                                  <Typography>
                                    {form?.equipmentModel}
                                  </Typography>
                                </DataRowValue>
                              </Grid>
                            </Grid>
                          </DataRowHere>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                          <DataRowHere>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                <DataRowTitle>
                                  <Typography>Equipment Quantity</Typography>
                                </DataRowTitle>
                              </Grid>
                              <Grid item xs={12} sm={12} md={8} lg={8}>
                                <DataRowValue>
                                  <Typography>
                                    {form?.equipmentQuantity}
                                  </Typography>
                                </DataRowValue>
                              </Grid>
                            </Grid>
                          </DataRowHere>
                        </Grid>
                      </Grid>
                      </QaqcandRndSeparation>
                    </Box>
                  )}
                </>
              )}
            </Box>
          ))}

        {!editMode && formik?.values?.forms?.length > 5 && (
          <ViewMorLess sx={{}}>
            {visibleCount < formik?.values?.forms?.length ? (
              <text onClick={handleViewMore}>View More</text>
            ) : (
              <text onClick={handleViewLess}>View Less</text>
            )}
          </ViewMorLess>
        )}
      </form>
      {editMode && (
        <PlushIconBox>
          <LightTooltip
            title="Add Another Store Details"
            arrow
            placement="left"
          >
            <PlushIcon onClick={addFormBlock}>
              <AddOutlinedIcon />
            </PlushIcon>
          </LightTooltip>
        </PlushIconBox>
      )}
    </CompanyFacilityInnContainerQAQCnRND>
  );
};

export default QualityTestEquipment;
