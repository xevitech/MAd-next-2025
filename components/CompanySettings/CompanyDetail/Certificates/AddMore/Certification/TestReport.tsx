import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import {
  SaveButtonContainer,
  FullFieldLabel,
  FullFieldValue,
  FullFieldContainer,
  FieldBorder,
  ImageFormatSpan,
} from "../../../commonStyles";
import { CustomDropdown } from "@/components/common/customDropdown";
import { FileUpload } from "@/components/common/uploadFile";
import { CustomDatePicker } from "@/components/common/datePicker";
import { useFormik } from "formik";
import {
  apiClient,
  CertificateIssuer,
  CertificateName,
  CertificateProductIssuer,
  CertificateTypes,
  countryRestrictName,
  descriptionLimit,
  imageFormat,
  productCerificateName,
  regulatoryName,
  scopeCertificate,
  scopeControlName,
  scopeReg,
  testItems,
} from "@/components/common/common";
import * as Yup from "yup";
import { toast } from "react-toastify";
import TextArea from "./TextArea";
import { UploadImgBox } from "../../style";
import { error } from "console";
import { VarifyBox } from "@/components/miniSite/styled";

const TestReport = ({ editData, onClose }) => {
  let editMode = Object.keys(editData).length > 0 ? true : false;
  const [loader, setLoader] = useState<boolean>(false);
  const testItemRef = useRef(null);
  const scopeControlRef = useRef(null);
  const nameRef = useRef(null);
  const issuedByRef = useRef(null);
  const [issuedByError, setIssuedByError] = useState<any>(false);
  const [testItemError, setTestItemError] = useState<any>(false);
  const [scopeControlError, setscopeControlError] = useState<any>(false);
  const [nameError, setNameError] = useState<any>(false);

  const validation = Yup.object().shape({
    type_of_certificate: Yup.string().required(
      "Please select type of certifications"
    ),
    reference_no: Yup.string().required("Please enter reference no"),
    name: Yup.string(),
    test_item: Yup.string(),
    issued_by: Yup.string(),
    scope_control: Yup.string(),
    start_date: Yup.date().required("Please select start date"),
    end_date: Yup.date()
      .required("Please select date of expiration")
      .min(
        Yup.ref("start_date"),
        "date of expiration can't be before Start date"
      ),
    certificate_url: Yup.string()
      .url("Please enter a valid URL (http:// or https://)")
      .nullable(),

    message: Yup.string()
      // .min(300, "Please enter at least 300 character")
      .max(350, descriptionLimit)
      .required("Please enter message"),
    images: Yup.array().min(1, "Please select certificate image"),
  });
  useEffect(() => {
    editData?.type_of_certificate ?? "";
    editData?.reference_no ?? "";
    editData?.name ?? "";
    editData?.test_item ?? "", editData?.scope_control ?? "";
    editData?.issued_by ?? "";
    editData?.start_date ?? "";
    editData?.end_date ?? "";
    editData?.certificate_url ?? "";
    editData?.message ?? "";
  }, []);
  const cancelHandle = () => {
    formik.resetForm();
    setTestItemError(false);
    setNameError(false);
    setIssuedByError(false);
    setscopeControlError(false);
    onClose(false);
    editData?.type_of_certificate ?? "";
    editData?.test_item ?? "",
      editData?.scope_control ?? "",
      editData?.reference_no ?? "";
    editData?.name ?? "";
    editData?.scopename ?? "";
    editData?.regulatory ?? "";
    editData?.product ?? "";
    // editData?.testingitems ?? "";
    editData?.issued_by ?? "";
    editData?.start_date ?? "";
    editData?.end_date ?? "";
    editData?.certificate_url ?? "";
    editData?.message ?? "";
  };
  const formik = useFormik({
    validateOnChange: false,
    validationSchema: validation,
    enableReinitialize: true,
    initialValues: {
      type_of_certificate: editData?.type_of_certificate ?? "",
      reference_no: editData?.reference_no ?? "",
      name: editData?.name ?? "",
      test_item: editData?.test_item ?? "",
      scope_control: editData?.scope_control ?? "",
      issued_by: editData?.issued_by ?? "",
      start_date: editData?.start_date ?? "",
      end_date: editData?.end_date ?? "",
      certificate_url: editData?.certificate_url ?? "",
      message: editData?.message ?? "",
      images: editData?.images ?? [],
      type: "certificate",
      deleted_images_ids: [],
      status: editData?.status ?? "enable",
    },

    onSubmit: async (values) => {
      if (values.images.length === 0) {
        formik.setFieldError("images", "Please select certificate image");
        return;
      }

      setLoader(true);
      let endPoints = editMode ? "edit" : "create";
      let formData = new FormData();
      formData.append("type_of_certificate", values?.type_of_certificate);
      formData.append("reference_no", values?.reference_no);
      formData.append("name", values?.name);
      formData.append("test_item", values?.test_item);
      formData.append("scope_control", values?.scope_control);
      formData.append("status", values?.status);
      formData.append("issued_by", values?.issued_by);
      formData.append("start_date", values?.start_date);
      formData.append("end_date", values?.end_date);
      formData.append("certificate_url", values?.certificate_url);
      formData.append("message", values?.message);

      for (let i = 0; i < values.images.length; i++) {
        if (!values?.images[i].id)
          formData.append("images[]", values?.images[i]);
      }
      formData.append("type", "certificate");
      if (endPoints == "edit") {
        if (values.deleted_images_ids.length > 0) {
          formData.append(
            "deleted_images_ids",
            values?.deleted_images_ids.join(",")
          );
        }
        formData.append("id", editData?.id);
      }
      let response = await apiClient(
        `company_profile/certificate/${endPoints}`,
        "post",
        {
          body: formData,
        },
        true
      );
      if (!response.status) {
        toast.error("Something went wrong!");
      }
      formik.resetForm();
      setLoader(false);
      onClose(false, true);
    },
  });

  const handleSave = () => {
    const testItemValue = testItemRef.current?.value || "";
    const scopeControlValue = scopeControlRef.current?.value || "";
    const nameValue = nameRef.current?.value || "";
    const issuedByValue = formik.values.issued_by;

    setTestItemError("");
    setscopeControlError("");
    setNameError("");
    setIssuedByError("");

    if (!testItemValue) {
      setTestItemError("Please select a test item");
    }

    if (!scopeControlValue) {
      setscopeControlError("Please select scope of control");
    }

    if (!nameValue) {
      setNameError("Please select certificate name");
    }

    if (!issuedByValue) {
      setIssuedByError("Please select issued certificate");
    } else {
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);

    if (name === "type_of_certificate") {
      formik.setValues({
        type_of_certificate: value,
        reference_no: "",
        name: "",
        test_item: "",
        scope_control: "",
        issued_by: "",
        start_date: "",
        end_date: "",
        certificate_url: "",
        message: "",
        images: [],
        type: "",
        deleted_images_ids: [],
        status: "enable",
      });
    }

    formik.setFieldError(name, "");
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    formik.setFieldError("message", "");
    if (value.length <= 350) {
      formik.setFieldValue("message", value);
    }
    if (value.length > 350) {
      const newValue1 = value.slice(0, 350);
      formik.setFieldValue("message", newValue1);
      formik.setFieldError("message", descriptionLimit);
      return;
    }
  };
  const { values, errors }: any = formik;
  const [certificateNameOptionList, setCertificateNameOptionList] =
    useState<any>([]);

  useEffect(() => {
    const nameOptions = () => {
      const { type_of_certificate } = formik?.values;
      if (type_of_certificate !== "") {
        if (type_of_certificate === "Management System Certifications") {
          return CertificateName;
        }
        if (type_of_certificate === "Product Certificate") {
          return productCerificateName;
        }
        if (type_of_certificate === "Country restricted sales access") {
          return countryRestrictName;
        }
        if (type_of_certificate === "Regulatory licensing document") {
          return regulatoryName;
        }
      }
      return [];
    };
    const variable = nameOptions();
    setCertificateNameOptionList(variable);
    if (!editData && formik.values.type_of_certificate !== "") {
      formik.setFieldValue("name", "");
      formik.setFieldValue("scope_control", "");
    }
  }, [formik.values.type_of_certificate, editData]);

  useEffect(() => {
    if (
      (!editData &&
        formik.values.type_of_certificate !==
          "Management System Certifications") ||
      (!editData &&
        formik.values.type_of_certificate !== "Product Certificate" &&
        formik.values.issued_by)
    ) {
      formik.setFieldValue("issued_by", "");
    }
  }, [formik.values.type_of_certificate, editData]);

  return (
    <>
      <Grid container p={2} pt={1} className="companydetail_addservice">
        <Grid item xs={12} lg={12}>
          <form
            className="addservice_label newadd_form"
            onSubmit={formik.handleSubmit}
          >
            <FormControl>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <FullFieldContainer>
                    <FullFieldLabel className="certificatespacing">
                      Type of Certifications{" "}
                      <span className="detailastrics">*</span>
                    </FullFieldLabel>
                    <FullFieldValue>
                      <CustomDropdown
                        name="type_of_certificate"
                        value={formik.values?.type_of_certificate}
                        options={CertificateTypes?.map((ele, index) => ({
                          value: ele,
                          id: index,
                        }))}
                        placeholder={"Select Type of Certification"}
                        error={
                          formik.errors?.type_of_certificate ? true : false
                        }
                        errorText={formik.errors?.type_of_certificate || ""}
                        handleChange={handleChange}
                        overlay={true}
                      />
                    </FullFieldValue>

                    {["Management System Certifications"].includes(
                      formik.values?.type_of_certificate
                    ) && (
                      <>
                        <FullFieldContainer>
                          <FullFieldLabel className="certificatespacing">
                            Certificate Name{" "}
                            <span className="detailastrics">*</span>
                          </FullFieldLabel>
                          <FullFieldValue>
                            <Autocomplete
                              size="small"
                              id="free-solo-demo"
                              disableClearable
                              options={certificateNameOptionList}
                              value={formik.values.name}
                              onChange={(e, newValue) => {
                                handleChange({
                                  target: {
                                    name: "name",
                                    value: newValue || "",
                                  },
                                });

                                setNameError("");
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder={"Select Certificate Name"}
                                  error={Boolean(nameError)}
                                  helperText={
                                    nameError && (
                                      <span
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          color: "#d7282f",
                                        }}
                                      >
                                        <img
                                          src="/assets/error-outline-red.svg"
                                          alt="Error"
                                          style={{
                                            width: "8px",
                                            height: "8px",
                                            marginRight: "4px",
                                          }}
                                        />
                                        <div>{nameError}</div>{" "}
                                      </span>
                                    )
                                  }
                                  name="name"
                                  inputRef={nameRef}
                                />
                              )}
                            />
                          </FullFieldValue>
                        </FullFieldContainer>
                      </>
                    )}

                    {["Management System Certifications"].includes(
                      formik.values?.type_of_certificate
                    ) && (
                      <>
                        <FullFieldContainer>
                          <FullFieldLabel className="certificatespacing">
                            Certificate Issuer{" "}
                            <span className="detailastrics">*</span>
                          </FullFieldLabel>
                          <FullFieldValue>
                            <CustomDropdown
                              name="issued_by"
                              value={formik.values.issued_by}
                              options={CertificateIssuer?.map((ele, index) => ({
                                value: ele,
                                id: index,
                              }))}
                              placeholder={"Select Certificate Issuer"}
                              error={issuedByError ? true : false}
                              errorText={issuedByError ? issuedByError : ""}
                              handleChange={(e) => {
                                handleChange(e);
                                setIssuedByError("");
                              }}
                              overlay={true}
                              inputRef={issuedByRef}
                            />
                          </FullFieldValue>
                        </FullFieldContainer>
                      </>
                    )}
                    {["Product Certificate"].includes(
                      formik.values?.type_of_certificate
                    ) && (
                      <>
                        <FullFieldContainer>
                          <FullFieldLabel className="certificatespacing">
                            Certificate Name{" "}
                            <span className="detailastrics">*</span>
                          </FullFieldLabel>
                          <FullFieldValue>
                            <Autocomplete
                              size="small"
                              id="free-solo-demo"
                              disableClearable
                              options={certificateNameOptionList}
                              value={formik.values.name}
                              onChange={(e, newValue) => {
                                handleChange({
                                  target: {
                                    name: "name",
                                    value: newValue || "",
                                  },
                                });
                                setNameError("");
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder={"Select Certificate Name"}
                                  error={nameError ? true : false}
                                  helperText={
                                    nameError && (
                                      <span
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          color: "#d7282f",
                                        }}
                                      >
                                        <img
                                          src="/assets/error-outline-red.svg"
                                          alt=""
                                          style={{
                                            width: "8px",
                                            height: "8px",
                                            marginRight: "4px",
                                          }}
                                        />
                                        <div>{nameError}</div>
                                      </span>
                                    )
                                  }
                                  name="name"
                                  inputRef={nameRef}
                                  // onChange={(e) => {
                                  //   handleChange({
                                  //     target: {
                                  //       name: "name",
                                  //       value: e.target.value,
                                  //     },
                                  //   });
                                  // }}
                                />
                              )}
                            />
                          </FullFieldValue>
                        </FullFieldContainer>
                      </>
                    )}

                    {["Product Certificate"].includes(
                      formik.values?.type_of_certificate
                    ) && (
                      <>
                        <FullFieldContainer>
                          <FullFieldLabel className="certificatespacing">
                            Certificate Issuer{" "}
                            <span className="detailastrics">*</span>
                          </FullFieldLabel>
                          <FullFieldValue>
                            <CustomDropdown
                              name="issued_by"
                              value={formik.values.issued_by}
                              options={CertificateProductIssuer?.map(
                                (ele, index) => ({
                                  value: ele,
                                  id: index,
                                })
                              )}
                              placeholder={"Select Certificate Issuer"}
                              error={issuedByError ? true : false}
                              errorText={issuedByError || ""}
                              handleChange={(e) => {
                                handleChange(e);
                                setIssuedByError("");
                              }}
                              overlay={true}
                              inputRef={issuedByRef}
                            />
                          </FullFieldValue>
                        </FullFieldContainer>
                      </>
                    )}
                  </FullFieldContainer>
                  {["Product Test Report"].includes(
                    formik.values?.type_of_certificate
                  ) && (
                    <>
                      <FullFieldContainer>
                        <FullFieldLabel className="certificatespacing">
                          Test Item <span className="detailastrics">*</span>
                        </FullFieldLabel>
                        <FullFieldValue>
                          <Autocomplete
                            size="small"
                            id="free-solo-demo"
                            disableClearable
                            options={testItems}
                            value={formik.values.test_item || ""}
                            onChange={(e, newValue) => {
                              formik.setFieldValue("test_item", newValue || "");
                              setTestItemError("");
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder={"Select Certificate Name"}
                                error={testItemError ? true : false}
                                helperText={
                                  testItemError && (
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#d7282f",
                                      }}
                                    >
                                      <img
                                        src="/assets/error-outline-red.svg"
                                        alt=""
                                        style={{
                                          width: "8px",
                                          height: "8px",
                                          marginRight: "4px",
                                        }}
                                      />
                                      {testItemError}
                                    </span>
                                  )
                                }
                                name="test_item"
                                inputRef={testItemRef}
                              />
                            )}
                          />
                        </FullFieldValue>
                      </FullFieldContainer>
                    </>
                  )}
                  {["Country restricted sales access"].includes(
                    formik.values?.type_of_certificate
                  ) && (
                    <>
                      <FullFieldContainer>
                        <FullFieldLabel className="certificatespacing">
                          Scope of control{" "}
                          <span className="detailastrics">*</span>
                        </FullFieldLabel>
                        <FullFieldValue>
                          <Autocomplete
                            size="small"
                            id="free-solo-demo"
                            disableClearable
                            options={scopeControlName}
                            value={formik.values.scope_control}
                            onChange={(e, newValue) => {
                              handleChange({
                                target: {
                                  name: "scope_control",
                                  value: newValue ? newValue : "",
                                },
                              });
                              setscopeControlError("");
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder={"Select Scope of control"}
                                error={scopeControlError ? true : false}
                                helperText={
                                  scopeControlError && (
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#d7282f",
                                      }}
                                    >
                                      <img
                                        src="/assets/error-outline-red.svg"
                                        alt=""
                                        style={{
                                          width: "8px",
                                          height: "8px",
                                          marginRight: "4px",
                                        }}
                                      />
                                      <div>{scopeControlError}</div>
                                    </span>
                                  )
                                }
                                name="scope_control"
                                inputRef={scopeControlRef}
                                // onChange={(e) => {
                                //   handleChange({
                                //     target: {
                                //       name: "name",
                                //       value: e.target.value,
                                //     },
                                //   });
                                // }}
                              />
                            )}
                          />
                        </FullFieldValue>
                      </FullFieldContainer>
                    </>
                  )}
                  {["Country restricted sales access"].includes(
                    formik.values?.type_of_certificate
                  ) && (
                    <>
                      <FullFieldContainer>
                        <FullFieldLabel className="certificatespacing">
                          Certificate Name{" "}
                          <span className="detailastrics">*</span>
                        </FullFieldLabel>
                        <FullFieldValue>
                          <Autocomplete
                            size="small"
                            id="free-solo-demo"
                            disableClearable
                            options={certificateNameOptionList}
                            value={formik.values.name}
                            onChange={(e, newValue) => {
                              handleChange({
                                target: {
                                  name: "name",
                                  value: newValue || "",
                                },
                              });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder={"Select Certificate Name"}
                                error={nameError ? true : false}
                                helperText={
                                  nameError && (
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#d7282f",
                                      }}
                                    >
                                      <img
                                        src="/assets/error-outline-red.svg"
                                        alt=""
                                        style={{
                                          width: "8px",
                                          height: "8px",
                                          marginRight: "4px",
                                        }}
                                      />
                                      <div>{nameError}</div>
                                    </span>
                                  )
                                }
                                name="name"
                                inputRef={nameRef}
                                onChange={(e) => {
                                  handleChange({
                                    target: {
                                      name: "name",
                                      value: e.target.value,
                                    },
                                  });
                                }}
                              />
                            )}
                          />
                        </FullFieldValue>
                      </FullFieldContainer>
                    </>
                  )}
                  {["Regulatory licensing document"].includes(
                    formik.values?.type_of_certificate
                  ) && (
                    <>
                      <FullFieldContainer>
                        <FullFieldLabel className="certificatespacing">
                          Scope of control{" "}
                          <span className="detailastrics">*</span>
                        </FullFieldLabel>
                        <FullFieldValue>
                          <Autocomplete
                            size="small"
                            id="free-solo-demo"
                            disableClearable
                            options={scopeReg}
                            value={formik.values.scope_control}
                            onChange={(e, newValue) => {
                              handleChange({
                                target: {
                                  name: "scope_control",
                                  value: newValue ? newValue : "",
                                },
                              });
                              setscopeControlError("");
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder={"Select Scope of control"}
                                error={scopeControlError ? true : false}
                                helperText={
                                  scopeControlError && (
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#d7282f",
                                      }}
                                    >
                                      <img
                                        src="/assets/error-outline-red.svg"
                                        alt=""
                                        style={{
                                          width: "8px",
                                          height: "8px",
                                          marginRight: "4px",
                                        }}
                                      />
                                      <div>{scopeControlError}</div>
                                    </span>
                                  )
                                }
                                name="scope_control"
                                inputRef={scopeControlRef}
                              />
                            )}
                          />
                        </FullFieldValue>
                      </FullFieldContainer>
                    </>
                  )}
                  {["Regulatory licensing document"].includes(
                    formik.values?.type_of_certificate
                  ) && (
                    <>
                      <FullFieldContainer>
                        <FullFieldLabel className="certificatespacing">
                          Certificate Name{" "}
                          <span className="detailastrics">*</span>
                        </FullFieldLabel>
                        <FullFieldValue>
                          <Autocomplete
                            size="small"
                            id="free-solo-demo"
                            disableClearable
                            options={certificateNameOptionList}
                            value={formik.values.name}
                            onChange={(e, newValue) => {
                              handleChange({
                                target: {
                                  name: "name",
                                  value: newValue || "",
                                },
                              });
                              setNameError("");
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder={"Select Certificate Name"}
                                error={nameError ? true : false}
                                helperText={
                                  nameError && (
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#d7282f",
                                      }}
                                    >
                                      <img
                                        src="/assets/error-outline-red.svg"
                                        alt=""
                                        style={{
                                          width: "8px",
                                          height: "8px",
                                          marginRight: "4px",
                                        }}
                                      />
                                      <div>{nameError}</div>
                                    </span>
                                  )
                                }
                                name="name"
                                inputRef={nameRef}
                              />
                            )}
                          />
                        </FullFieldValue>
                      </FullFieldContainer>
                    </>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FullFieldContainer>
                    <FullFieldLabel className="certificatespacing">
                      Reference No. <span className="detailastrics">*</span>
                    </FullFieldLabel>
                    <FullFieldValue sx={{ position: "relative" }}>
                      <TextField
                        inputProps={{
                          autoComplete: "off",
                        }}
                        variant="outlined"
                        size="small"
                        name="reference_no"
                        type="text"
                        value={formik.values?.reference_no}
                        placeholder="Enter Reference No."
                        onChange={handleChange}
                        error={formik.errors?.reference_no ? true : false}
                      />
                      {formik.errors?.reference_no &&
                        typeof formik.errors?.reference_no === "string" && (
                          <span
                            style={{
                              position: "absolute",
                              left: "0px",
                              bottom: "-18px",
                            }}
                          >
                            <img
                              src="/assets/error-outline-red.svg"
                              alt=""
                              style={{ width: "8px", height: "8px" }}
                            />
                            <span
                              style={{
                                marginLeft: "3px",
                                fontSize: "10px",
                                color: "#d7282f",
                              }}
                            >
                              {formik.errors?.reference_no}
                            </span>
                          </span>
                        )}
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FullFieldContainer>
                    <FullFieldLabel className="certificatespacing">
                      Start Date <span className="detailastrics">*</span>
                    </FullFieldLabel>

                    <FullFieldValue>
                      <FormControl style={{ height: "50%" }}>
                        <CustomDatePicker
                          size="small"
                          name={"start_date"}
                          value={formik.values.start_date || "0000-00-00"}
                          handleChange={handleChange}
                          error={formik.errors?.start_date ? true : false}
                          errorText={
                            formik.errors?.start_date
                              ? formik.errors?.start_date
                              : ""
                          }
                        />
                      </FormControl>
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FullFieldContainer>
                    <FullFieldLabel className="certificatespacing">
                      Date of Expiration{" "}
                      <span className="detailastrics">*</span>
                    </FullFieldLabel>
                    <FullFieldValue>
                      <FormControl style={{ height: "50%" }}>
                        <CustomDatePicker
                          name={"end_date"}
                          value={formik.values?.end_date || "0000-00-00"}
                          handleChange={handleChange}
                          error={formik.errors?.end_date ? true : false}
                          errorText={
                            formik.errors?.end_date
                              ? formik.errors?.end_date
                              : ""
                          }
                        />
                      </FormControl>
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>
                <Grid item xs={6} sm={4} md={8}>
                  <FullFieldContainer>
                    <FullFieldLabel className="certificatespacing">
                      Certificate URL/Link
                    </FullFieldLabel>
                    <FullFieldValue>
                      <TextField
                        inputProps={{
                          autoComplete: "off",
                        }}
                        variant="outlined"
                        size="small"
                        name="certificate_url"
                        type="text"
                        value={formik.values?.certificate_url}
                        placeholder="https://example.com"
                        onChange={handleChange}
                        error={Boolean(formik.errors?.certificate_url)}
                        helperText={
                          formik.errors?.certificate_url && (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: "#d7282f",
                              }}
                            >
                              <img
                                src="/assets/error-outline-red.svg"
                                alt=""
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  marginRight: "4px",
                                }}
                              />
                              <div>
                                {formik.errors?.certificate_url?.toString() ??
                                  ""}
                              </div>
                            </span>
                          )
                        }
                      />
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                  <FullFieldContainer>
                    <FullFieldLabel className="certificatespacing">
                      Status
                    </FullFieldLabel>
                    <FullFieldValue className="lala">
                      <FormControl sx={{ width: "100%" }}>
                        <Select
                          name="status"
                          size="small"
                          value={formik.values.status}
                          onChange={handleChange}
                          displayEmpty
                        >
                          <MenuItem value={"enable"}>Enable</MenuItem>
                          <MenuItem value={"disable"}>Disable</MenuItem>
                        </Select>
                      </FormControl>
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                  <FullFieldContainer>
                    <FullFieldLabel className="certificatespacing">
                      Certificate Image
                      <span className="detailastrics">*</span>
                      <ImageFormatSpan> {imageFormat}</ImageFormatSpan>
                    </FullFieldLabel>
                    <UploadImgBox>
                      <FullFieldValue>
                        <FieldBorder
                          style={{
                            position: "relative",
                            border: `${
                              formik.errors.images ? "1px solid #d32f2f" : ""
                            }`,
                          }}
                        >
                          <FileUpload
                            fileType="image/*"
                            name="Test/ReportFile"
                            files={formik.values.images}
                            single={false}
                            error={(error) =>
                              formik.setFieldError("images", error)
                            }
                            updateFiles={(e) => {
                              if (e?.length > 3) {
                                formik.setFieldError(
                                  "images",
                                  "Please upload maximum 3 photos"
                                );
                                return;
                              } else {
                                formik.setFieldError("images", "");
                                formik.setFieldValue("images", [...e]);
                              }
                            }}
                            removedFile={(deletedID) =>
                              formik.setFieldValue(
                                "deleted_images_ids",
                                deletedID
                              )
                            }
                          />

                          {formik.errors.images ? (
                            <span
                              style={{
                                color: "#d32f2f",
                                position: "absolute",
                                bottom: "-16px",
                                fontSize: "10px",
                                fontWeight: "400",
                                marginLeft: "-3px",
                              }}
                            >
                              <span>
                                <img
                                  src="/assets/error-outline-red.svg"
                                  alt=""
                                  style={{ width: "8px", height: "8px" }}
                                />
                              </span>{" "}
                              {typeof formik.errors.images === "string"
                                ? formik.errors.images
                                : ""}
                            </span>
                          ) : (
                            ""
                          )}
                        </FieldBorder>
                      </FullFieldValue>
                    </UploadImgBox>
                  </FullFieldContainer>
                </Grid>
                <TextArea
                  values={formik.values.message}
                  handleInputChange={handleInputChange}
                  errors={formik.errors.message}
                  count={350}
                  placeholder={"Enter Message"}
                  text=" Please describe the product that the certificates cover."
                  name="Message"
                />
              </Grid>
            </FormControl>
            <Divider variant="middle" sx={{ margin: "10px 0" }} />
            <Grid item xs={12}>
              <SaveButtonContainer>
                <Blackoutlinebtn onClick={() => cancelHandle()}>
                  Cancel
                </Blackoutlinebtn>{" "}
                <Redoutlinebtn
                  style={{ height: "36px" }}
                  type="submit"
                  onClick={handleSave}
                >
                  {loader ? (
                    <ThreeDots
                      height="36"
                      width="40"
                      radius="9"
                      color="#d7282e"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  ) : editMode ? (
                    "Update"
                  ) : (
                    "Save"
                  )}
                </Redoutlinebtn>
              </SaveButtonContainer>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
export default TestReport;
