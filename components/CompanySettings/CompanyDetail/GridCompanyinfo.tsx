import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Checkbox,
  Chip,
  TextareaAutosize,
  InputAdornment,
  Box,
  Stack,
  Popover,
  Typography,
  Autocomplete,
  Divider,
  IconButton,
  Button,
  FormGroup,
  styled,
} from "@mui/material";
import companydetail from "./companydetail.module.css";

import { useFormik } from "formik";
import { FileUpload } from "@/components/common/uploadFile";
import { CustomDropdown } from "@/components/common/customDropdown";
import { employees, revenue } from "@/utils/dropdownOptions";
import { ManufacturingYears } from "@/utils/AddProductPageSelectDropdownsData";
import CountrySelect from "@/components/common/countrydropdown/Index";
import CountryCities from "@/components/common/citydropdown";
import SelectableAndEditableField from "@/components/common/SelectDropDownwithInput";
import { apiClient } from "@/components/common/common";
import { TypebusinessButton } from "@/components/profile/common";
import { toast } from "react-toastify";
import {
  DescriptionTextContainer,
  CountryInput,
} from "@/components/CompanySettings/Edit/style";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import { MyAppContext } from "@/contextApi/appContext";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { PencilIcon } from "../style";
import Image from "next/image";
import CompanyDetailSkeleton from "./CompanySkeletons/CompanyDetail";
import FormControlLabel from "@mui/material/FormControlLabel";
import { HeaderTextContainer, FactorySmallTextContainer } from "./commonStyles";
import MobileWithFlag from "@/components/common/numberwithflag";
import { dialCountrycode } from "@/utils/dialCountryCode";
import { TypographyBusiness } from "@/components/profile/common";
import dynamic from "next/dynamic";
import {
  AboutCompanyBox,
  AboutCompanyImage,
  AboutCompanyPopover,
  AboutIconButton,
  InfoOutline,
} from "./style";

import {
  BoxCheckBox,
  CheckBoxContainer,
  OtherField,
} from "@/components/profile/companyProfile/businessType/styles";
import { BusinessSelectableAndEditableField } from "@/components/common/BusinessType";
import ImageCropper from "@/components/common/ImageCropper";
const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);

const GridCompanyInfo = ({ company_detail, getCompanyDetails }) => {
  let List = [1];
  const { setCompleteScreenLoader, breakPoints } = useContext(MyAppContext);
  const [edit, setEdit] = useState<boolean>(false);
  const [deleteCertificate, setDeleteCertificate] = useState<any>([]);
  const [deleteLicense, setDeleteLicense] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [mobile, setMobile] = useState<string>("");
  const [defaultCountrycode, setDefaultCountrycode] = useState<any>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [businessList, setBusinessList] = useState<any>([]);
  const [showListValue, setListValue] = useState<any>([]);
  const [others, setOthers] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [popoverIndex, setPopOverIndex] = useState<any>(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [validate, setValidation] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const ValidateField = (field: string) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleClick = (event: any, index: number, name: any) => {
    setPopOverIndex(index);
    setAnchorEl(event.currentTarget);
    const getList =
      businessList.find((item) => item.value == name)?.values ?? [];
    setListValue(getList);
  };

  useEffect(() => {
    setMobile(company_detail?.contact_profile?.phone);
  }, [company_detail?.contact_profile]);

  const businessOptions = [
    {
      id: 1,
      value: "Brokerdv sdvvd",
      selected: false,
      input: false,
      values: [],
    },
    {
      id: 2,
      value: "EPC Contractor",
      selected: false,
      input: false,
      values: [],
    },
    {
      id: 3,
      value: "Governmental Entity",
      selected: false,
      input: false,
      values: [],
    },
    { id: 4, value: "Manufacturer", selected: false, input: false, values: [] },
    { id: 5, value: "Consultant", selected: false, input: false, values: [] },
    {
      id: 6,
      value: "Trading Company",
      selected: false,
      input: false,
      values: [],
    },
    {
      id: 7,
      value: "Others",
      selected: true,
      input: false,
      values: [],
    },
  ];

  useEffect(() => {
    if (company_detail?.business_type?.length > 0) {
      let newValue = company_detail?.business_type?.map((v) => v.name);
      let businessOptionsName = businessOptions?.map((v) => v.value);
      let newEnteredValue = company_detail?.business_type
        ?.filter((v) => !businessOptionsName.includes(v.name))
        ?.map((value, i) => ({
          id: 8 + i,
          value: value.name,
          selected: true,
          input: false,
          values: value.value,
        }));

      let defalutSelected = [...newEnteredValue, ...businessOptions].map(
        (v) => {
          if (newValue?.includes(v.value)) {
            return {
              ...v,
              selected: true,
              values:
                company_detail?.business_type?.find((el) => el.name == v.value)
                  ?.value ?? [],
            };
          } else {
            return v;
          }
        }
      );
      setBusinessList(defalutSelected);
    }
  }, [company_detail?.business_type]);

  useEffect(() => {
    setloading(true);
    (async () => {
      let user_id = JSON.parse(localStorage.getItem("userData"))?.id;
      let { data } = await apiClient("categoryList", "post", {
        parent: 0,
        user_id,
      });
      setloading(false);
      if (data?.length) setCategoryList(data.map((v) => v.name));
    })();
  }, []);
  const LableStyle = {
    fontWeight: 400,
    fontSize: "14px",
    color: "rgba(34, 51, 84, 0.5)",
    "@media screen and (max-width:600px)": {
      margin: "4px 0 7px !important",
    },
  };
  const ValueStyle = {
    fontWeight: 400,
    fontSize: "14px",
    letterSpacing: "0.09px",
    color: "#231F20",
  };
  const businessValueStyle = {
    fontWeight: 400,
    fontSize: "14px",
    letterSpacing: "0.09px",
    color: "#231F20",
  };
  const catValueStyle = {
    fontWeight: 400,
    fontSize: "14px",
    letterSpacing: "0.09px",
    color: "#231F20",
  };

  const HeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
  };

  const ContentHeaderText = {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
    paddingTop: "16px",
    color: "#6C6C6C",
    width: "100%",
  };

  const ContentContainerStyle = {
    paddingTop: "16px",
    paddingBottom: "16px",
  };
  const CategoryContainerStyle = {
    paddingTop: "8px",
    borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
    paddingBottom: "8px",
  };

  const TextAreaStyle = {
    width: "100%",
    height: "77px",
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 10,
    borderColor: "rgba(0, 0, 0, 0.23)",
    borderRadius: "6px",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    color: "#929296",
    lineHeight: "23px",
  };

  const EditTextStyle = {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    color: "#D7282F",
    lineHeight: "18px",
  };

  const BgTextStyle = {
    fontFamily: "Open Sans",
    fontWeight: 600,
    fontSize: "12px",
    color: "#223354",
    margin: "0px 5px 5px 0px",
  };

  const CheckboxContainer = styled(Checkbox)({
    color: "#D7282F",
    borderRadius: "4px",
    padding: "0 !important",
    "&.Mui-checked": {
      color: "#D7282F",
    },
  });

  const IconStyle = {
    cursor: "pointer",
    color: "#D7282F",
    fontSize: "16px",
    border: "1px solid",
    borderRadius: "4px",
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    const { licenseFiles, certificateFiles, minisite_footer_banner } =
      formik.values;
    for (let i = 0; i < licenseFiles?.length; i++) {
      if (licenseFiles[i]?.name) {
        formData.append("registration_business_licence[]", licenseFiles[i]);
      }
    }

    if (minisite_footer_banner) {
      formData.append("minisite_footer_banner", minisite_footer_banner);
    }

    if (deleteLicense?.length > 0)
      formData.append(
        "registration_business_licence_delete_ids",
        deleteLicense?.join(",")
      );

    for (let i = 0; i < certificateFiles?.length; i++) {
      if (certificateFiles[i]?.name) {
        formData.append("certification_file[]", certificateFiles[i]);
      }
    }

    if (deleteCertificate?.length > 0)
      formData.append(
        "certification_file_delete_ids",
        deleteCertificate?.join(",")
      );
    try {
      const response = await apiClient(
        `company_profile/updateProfile`,
        "post",
        { body: formData },
        true
      );
      return response;
    } catch (error) {
      setCompleteScreenLoader(false);
      return false;
    }
  };

  const SelectedBusinessBtnOutline: any = styled("div")(
    ({ breakPoints }: any) => ({
      display: "flex",
      background: "transparent",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "14px",
      justifyContent: "center",
      alignItems: "center",
      color: "#DD484E",
      borderRadius: "6px",
      maxHeight: "35px",
      width: "fit-content",
      textAlign: "center",
      border: "1px solid #DD484E",
      padding: breakPoints?.max1440px ? "10px 7px" : "15px 20px",
      "@media screen and (max-width: 1024px)": {
        fontSize: "12px",
        padding: "7px 7px",
      },
    })
  );

  const validation = Yup.object().shape({
    shop_email: Yup.string()
      .email("Invalid email")
      .required("Please enter email"),

    country_id: Yup.string().required("Please select country"),

    company_products: Yup.array()
      .min(1, "Please enter at least one product")
      .required("Please enter at least one product"),
    postal_code: Yup.string().required("Please enter postal code"),
    registration_country_id: Yup.string().required("Please select country"),
    city: Yup.string().required("Please select city"),
    registration_city: Yup.string().required("Please select city"),
    category_id: Yup.array()
      .min(1, "Please select category")
      .required("Please select category "),
    description: Yup.string()
      .required("Please enter description")
      .max(999, "Description must be of 1000 characters")
      .min(300, "Description must be of 300 characters"),

    no_of_employee: Yup.string().required("Please select no. of employees"),
    yearly_revenue: Yup.string().required("Please select yearly revenue"),
    phone: Yup.string().required("Please enter mobile number"),
    registration_number: Yup.string().required(
      "Please enter registration number"
    ),
    licenseFiles: Yup.array()
      .min(1, "Select license file")
      .required("Select license file"),

    registration_year: Yup.string().required("Please select registration year"),
    registration_postalcode: Yup.string().required("Please enter postal code"),
  });
  const handleCancel = () => {
    setEdit(false);
    formik.setFieldValue(
      "shop_email",
      company_detail?.contact_profile?.shop_email ?? ""
    );
    formik.setFieldValue(
      "category_id",
      company_detail?.basic_information?.category_id ?? ""
    );
    formik.setFieldValue(
      "company_products",
      company_detail?.basic_information?.company_products ?? ""
    );
    formik.setFieldValue(
      "no_of_employee",
      company_detail?.basic_information?.no_of_employee ?? ""
    );
    formik.setFieldValue(
      "yearly_revenue",
      company_detail?.basic_information?.yearly_revenue ?? ""
    );
    formik.setFieldValue(
      "registration_year",
      company_detail?.location_of_registration?.registration_year ?? ""
    );
    formik.setFieldValue(
      "registration_country_id",
      company_detail?.location_of_registration?.registration_country_id ?? ""
    );
    formik.setFieldValue(
      "city",
      company_detail?.company_operational_address?.city ?? ""
    );
    formik.setFieldValue(
      "postal_code",
      company_detail?.company_operational_address?.postal_code ?? ""
    );
    formik.setFieldValue(
      "address",
      company_detail?.company_operational_address?.address ?? ""
    );
    formik.setFieldValue(
      "address",
      company_detail?.company_operational_address?.address ?? ""
    );
    formik.setFieldValue(
      "description",
      company_detail?.contact_profile?.description ?? ""
    );

    formik.setFieldValue(
      "registration_number",
      company_detail?.location_of_registration?.registration_number ?? ""
    );
    formik.setFieldValue(
      "registration_city",
      company_detail?.location_of_registration?.registration_city ?? ""
    );
    formik.setFieldValue(
      "registration_city",
      company_detail?.location_of_registration?.registration_city ?? ""
    );
    formik.setFieldValue(
      "registration_postalcode",
      company_detail?.contact_profile?.registration_postalcode ?? ""
    );
    formik.setFieldValue("fax", company_detail?.contact_profile?.fax ?? "");
    formik.setFieldValue(
      "industry",
      company_detail?.contact_profile?.industry ?? ""
    );
    formik.setFieldValue("phone", company_detail?.contact_profile?.phone ?? "");
    formik.setFieldValue(
      "mobile_code",
      company_detail?.contact_profile?.mobile_code ?? ""
    );
    formik.setFieldValue(
      "registration_website",
      company_detail?.contact_profile?.registration_website ?? ""
    );
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      registration_website:
        company_detail?.contact_profile?.registration_website.length > 0
          ? company_detail?.contact_profile?.registration_website
          : [""],
      shop_email:
        company_detail?.contact_profile?.shop_email == "0"
          ? ""
          : company_detail?.contact_profile?.shop_email,
      country_id:
        company_detail?.company_operational_address?.country_id == "0"
          ? ""
          : company_detail?.company_operational_address?.country_id,
      city:
        company_detail?.company_operational_address?.city == "0"
          ? ""
          : company_detail?.company_operational_address?.city,
      postal_code:
        company_detail?.company_operational_address?.postal_code == "0"
          ? ""
          : company_detail?.company_operational_address?.postal_code,
      registration_country_id:
        company_detail?.location_of_registration?.registration_country_id == "0"
          ? ""
          : company_detail?.location_of_registration?.registration_country_id,
      registration_city:
        company_detail?.location_of_registration?.registration_city == "0"
          ? ""
          : company_detail?.location_of_registration?.registration_city,
      registration_postalcode:
        company_detail?.location_of_registration?.registration_postalcode == "0"
          ? ""
          : company_detail?.location_of_registration?.registration_postalcode,
      fax:
        company_detail?.contact_profile?.fax == "0"
          ? ""
          : company_detail?.contact_profile?.fax,
      industry:
        company_detail?.contact_profile?.industry == "" || null
          ? ""
          : company_detail?.contact_profile?.industry,
      description: company_detail?.contact_profile?.description ?? "",
      address:
        company_detail?.company_operational_address?.address == "0"
          ? ""
          : company_detail?.company_operational_address?.address,
      category_id: company_detail?.basic_information?.category_id ?? [],
      company_products:
        company_detail?.basic_information?.company_products ?? [],
      company_other_products:
        company_detail?.basic_information?.company_other_products ?? [],
      registration_number:
        company_detail?.location_of_registration?.registration_number == "0"
          ? ""
          : company_detail?.location_of_registration?.registration_number,
      mobile_code:
        company_detail?.contact_profile?.mobile_code == undefined
          ? ""
          : `${company_detail?.contact_profile?.mobile_code}`,
      phone:
        company_detail?.contact_profile?.phone == "0"
          ? ""
          : company_detail?.contact_profile?.phone,
      business_type: company_detail?.business_type ?? [],
      yearly_revenue: company_detail?.basic_information?.yearly_revenue ?? "",
      no_of_employee:
        company_detail?.basic_information?.no_of_employee == "0"
          ? ""
          : company_detail?.basic_information?.no_of_employee,
      registration_year:
        company_detail?.location_of_registration?.registration_year == "0"
          ? ""
          : company_detail?.location_of_registration?.registration_year,
      licenseFiles:
        company_detail?.location_of_registration
          ?.registration_business_licence ?? [],
      certificateFiles:
        company_detail.location_of_registration?.certification_file ?? [],
      minisite_footer_banner:
        company_detail?.contact_profile?.minisite_footer_banner ?? "",
    },

    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (validate) {
        formik.setFieldError("phone", "Please enter correct mobile no");
        return;
      }
      if (!values.minisite_footer_banner) {
        toast.error("Please upload company banner");
        return;
      }
      let business_type = businessList
        .filter((v) => v.selected && v.value !== "Others")
        .map((v) => ({
          name: v.value,
          is_checked: v.selected,
          value: v.values,
        }));

      let company_other_products = values.company_other_products.toString();
      let company_products = values.company_products.toString();
      let category_id = values.category_id.toString();
      let registration_website = values.registration_website.toString();
      let dataToSend = {
        ...values,
        company_products,
        category_id,
        registration_website,
        company_other_products,
        business_type,
      };
      delete dataToSend["licenseFiles"];
      delete dataToSend["certificateFiles"];
      setLoader(true);

      let res = await uploadFiles();
      let response = await apiClient("company_profile/updateProfile", "post", {
        body: dataToSend,
      });
      if (response?.status === false) {
        toast.error(response?.message);
      }
      if (response?.status === 200 && res) {
        setEdit(false);
        setCompleteScreenLoader(false);
        getCompanyDetails();
      }
      setLoader(false);
    },
  });

  useEffect(() => {
    setMobile(company_detail?.contact_profile?.phone);
    setDefaultCountrycode(
      dialCountrycode.filter((element) => {
        if (
          element?.dial_code ==
          `+${company_detail?.contact_profile?.mobile_code}`
        ) {
          return element?.code;
        }
      })[0]?.code
    );
  }, [company_detail?.contact_profile]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    formik.setFieldError("description", "");

    formik.setFieldValue("description", value.slice(0, 999));
  };

  const WebsiteHandler = (e, index) => {
    let website = [...formik.values.registration_website];
    website[index] = e.target.value;
    formik.setFieldValue("registration_website", website);
  };

  const { values } = formik;

  const BusinessTypeHandler = (index) => {
    let business = [...businessList];
    if (business[index].value === "Others") {
      return;
    }
    business[index].selected = !business[index].selected;
    setBusinessList(business);
  };

  const InputHandler = (i) => {
    let list = [...businessList];
    list[i].input = !list[i].input;
    setBusinessList(list);
  };

  const handlePostalChange = (e) => {
    const re = /^[A-Z0-9]*$/;
    if (re.test(e.target.value)) {
      if (e.target.value.length > 10) {
        return;
      }
      formik.setFieldValue(
        "registration_postalcode",
        e.target.value.slice(0, 10).toUpperCase()
      );
      formik.setFieldError("registration_postalcode", ""); // Clear any previous error
    } else {
      formik.setFieldError(
        "registration_postalcode",
        "Only letters (A-Z) and digits (0-9) are allowed"
      );
    }
  };

  const handleFaxNumChange = (e) => {
    const re = /^[0-9+\-/()]+$/;
    const newValue = e.target.value;
    if (newValue === "" || re.test(newValue)) {
      if (newValue.length <= 14) {
        formik.setFieldError("fax", "");
        formik.handleChange(e);
      }
    } else {
      formik.setFieldError("fax", "Only numeric value required");
    }
  };

  const handleChangePostal = (e) => {
    const re = /^[A-Z0-9]*$/;
    if (re.test(e.target.value)) {
      if (e.target.value.length > 10) {
        return;
      }
      formik.setFieldValue(
        "postal_code",
        e.target.value.slice(0, 10).toUpperCase()
      );
      formik.setFieldError("postal_code", ""); // Clear any previous error
    } else {
      formik.setFieldError(
        "postal_code",
        "Only letters (A-Z) and digits (0-9) are allowed"
      );
    }
  };

  const HandleCountry = (value) => {
    formik.setFieldValue(`${"registration_country_id"}`, value);
    formik.setFieldError(`${"registration_country_id"}`, "");
  };

  const HandleRegistrCountry = (value) => {
    formik.setFieldValue(`${"country_id"}`, value);
    formik.setFieldError(`${"country_id"}`, "");
  };

  const HandleCity = (value) => {
    formik.setFieldValue("registration_city", value);
    formik.setFieldError("registration_city", "");
  };

  const HandleOtherCity = (value) => {
    formik.setFieldValue("city", value);
    formik.setFieldError("city", "");
  };

  const onChangeInputHandler = (index, value, action = "add") => {
    let business = [...businessList];
    business[index].values = action === "add" ? value : [];
    setBusinessList(business);
  };

  const handleInputSelection = (id) => {
    setBusinessList((prev) =>
      prev.map((element) => {
        if (element?.id == id) {
          return {
            ...element,
            input: !element?.input,
          };
        } else {
          return element;
        }
      })
    );
  };

  const NewBusinessType = () => {
    if (others === "") {
      setErrorText("Please enter value");
      setError(true);
      return;
    }
    setBusinessList((pre) => {
      let businessValues = [...pre.filter((v) => v.id !== 7)];
      let lastValue = pre.filter((v) => v.id === 7);
      businessValues.push({
        id: pre.length + 1,
        value: others,
        selected: false,
        input: false,
        values: [],
      });
      setOthers("");
      return [...businessValues, { ...lastValue[0], input: false }];
    });
  };
  const descriptionError: any =
    formik.errors.description && formik.errors.description;

  const setMobileNumber = (value, info, errorText) => {
    setMobile(value);
    formik.setFieldValue("mobile_code", info.countryCallingCode);
    formik.setFieldValue("phone", info.nationalNumber);
    if (!errorText && info.nationalNumber) {
      if (info.nationalNumber.length > 5)
        formik.setFieldError("phone", "Please enter correct mobile no");
    }

    if (errorText && info.nationalNumber) formik.setFieldError("phone", "");
    setValidation(!errorText);
  };
  const [anchorElAbout, setAnchorElAbout] = React.useState<HTMLElement | null>(
    null
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAbout(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElAbout(null);
  };

  const openAbout = Boolean(anchorElAbout);

  const onChangeHandle = async (e) => {
    formik.setFieldValue("minisite_footer_banner", e);
  };

  return (
    <>
      {loading ? (
        <>
          <div className={companydetail.boxcontainer}>
            {List.map((v, i) => (
              <CompanyDetailSkeleton key={i} />
            ))}
          </div>
        </>
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <div className={companydetail.boxcontainer}>
              <Grid container style={HeaderStyle}>
                <Grid item xs={12} md={12} xl={12} lg={12}>
                  <Grid
                    container
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Grid
                      container
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <HeaderTextContainer breakPoints={breakPoints}>
                        {" "}
                        Company Information{" "}
                      </HeaderTextContainer>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEdit(true);
                        }}
                      >
                        {!edit && (
                          <>
                            <PencilIcon>
                              <Image
                                src={"/assets/EditPencil.svg"}
                                layout="fill"
                                alt="editImage"
                              />
                            </PencilIcon>
                            <div style={EditTextStyle}>Edit</div>
                          </>
                        )}
                      </div>
                    </Grid>
                    <FactorySmallTextContainer>
                      Manage Information related to your company
                    </FactorySmallTextContainer>
                    <Divider variant="middle" style={{ marginTop: "10px" }} />
                    {/* </Grid> */}
                  </Grid>
                </Grid>

                <Grid container className="input-height">
                  <Grid item xs={12} md={12} xl={12} lg={12}>
                    <Grid
                      container
                      className={companydetail.row_container}
                      sx={{ alignItems: "center" }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={3}
                        lg={2}
                        style={LableStyle}
                        className={companydetail.labelstyle}
                      >
                        Business Type
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={9}
                        lg={10}
                        style={{
                          ...businessValueStyle,
                          display: breakPoints.max600px ? "flex" : "flex",
                          alignItems: "self-start",
                          flexFlow: "wrap",
                        }}
                        gap={1.5}
                      >
                        {!edit ? (
                          <>
                            <TypebusinessButton
                              style={{
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap",
                                width: "100%",
                              }}
                            >
                              {values?.business_type?.map((v, i) => (
                                <Stack
                                  key={i}
                                  sx={{ color: "rgb(221, 72, 78)" }}
                                  justifyContent="flex-start"
                                  alignItems="center"
                                  flexWrap="wrap"
                                  onMouseEnter={(e: any) => {
                                    setAnchorEl(e.currentTarget);
                                    handleClick(e, i, v.name);
                                  }}
                                  onMouseLeave={(e) => {
                                    setPopOverIndex(-1);
                                    setAnchorEl(null);
                                    setListValue([]);
                                  }}
                                >
                                  <SelectedBusinessBtnOutline key={i}>
                                    {v.name}
                                    {v.value?.length > 0 && (
                                      <InfoOutlinedIcon
                                        style={{
                                          fontSize: "16px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                    )}
                                  </SelectedBusinessBtnOutline>
                                </Stack>
                              ))}
                            </TypebusinessButton>
                            {Boolean(anchorEl) && showListValue.length > 0 && (
                              <Popover
                                PaperProps={{
                                  elevation: 0,
                                  sx: {
                                    overflow: "visible",
                                    filter:
                                      "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    width: "165px",
                                    minWidth: "100px",
                                    overflowY: `${
                                      showListValue?.length > 5 && "scroll"
                                    }`,
                                    "& .MuiAvatar-root": {
                                      width: 32,
                                      ml: -0.5,
                                      mr: 1,
                                    },
                                    "&::-webkit-scrollbar": {
                                      width: "0.2em",
                                    },
                                    "&::-webkit-scrollbar-track": {
                                      background: "#f1f1f1",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                      backgroundColor: "#c8c8c8",
                                    },
                                    "&::-webkit-scrollbar-thumb:hover": {
                                      background: "#555",
                                    },
                                  },
                                }}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                id="simple-popover-company"
                                sx={{
                                  pointerEvents: "none",
                                }}
                                open={Boolean(open)}
                                anchorEl={anchorEl}
                                onClose={() => {
                                  setAnchorEl(null);
                                  setListValue([]);
                                }}
                                disableRestoreFocus
                              >
                                {showListValue?.map((v, i) => (
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
                              </Popover>
                            )}
                          </>
                        ) : (
                          <>
                            <FormGroup>
                              <CheckBoxContainer breakPoints={breakPoints}>
                                {businessList?.map((v, i) => (
                                  <BoxCheckBox
                                    component="div"
                                    alignItems="center"
                                    gap={0.2}
                                    pr={1}
                                    key={i}
                                  >
                                    <Box
                                      component="div"
                                      display="flex"
                                      alignItems="center"
                                    >
                                      <FormControlLabel
                                        className="profile_business"
                                        style={{
                                          color: "#231F20",
                                          fontSize: "14px",
                                          lineHeight: "23px",
                                          marginLeft: 0,
                                          marginRight: "5px",
                                        }}
                                        key={innerHeight}
                                        control={
                                          <Checkbox
                                            style={{
                                              paddingRight: 0,
                                              paddingLeft: 0,
                                              display: v?.id == 7 ? "none" : "",
                                            }}
                                            checked={v?.selected}
                                            onChange={(e) => {
                                              BusinessTypeHandler(i);
                                            }}
                                            sx={{
                                              "& .MuiSvgIcon-root": {
                                                fontSize: "19px",
                                                color: "#d7282f",
                                              },
                                            }}
                                          />
                                        }
                                        label={v?.value}
                                      />
                                      {v?.selected && (
                                        <>
                                          {v?.input ? (
                                            <></>
                                          ) : (
                                            <AddOutlinedIcon
                                              style={IconStyle}
                                              onClick={() => InputHandler(i)}
                                            />
                                          )}
                                        </>
                                      )}
                                    </Box>

                                    {v?.input && v.id !== 7 && (
                                      <BusinessSelectableAndEditableField
                                        noOptions
                                        fetch={true}
                                        options={[]}
                                        defaultValue={
                                          businessList[i]?.values ?? []
                                        }
                                        updateValue={(value) => {
                                          onChangeInputHandler(i, value);
                                        }}
                                        onClose={() => {
                                          if (v.id === 8)
                                            onChangeInputHandler(
                                              v.id,
                                              [],
                                              "clear"
                                            );
                                          handleInputSelection(v.id);
                                        }}
                                      />
                                    )}
                                    {v?.input && v.value === "Others" && (
                                      <OtherField>
                                        <TextField
                                          className={companydetail.newadd_field}
                                          sx={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                          size="small"
                                          value={others}
                                          onChange={(e) => {
                                            setError(false);
                                            setErrorText("");
                                            setOthers(e.target.value);
                                          }}
                                          onKeyDown={(e) => {
                                            if (
                                              e.key.toLowerCase() == "enter"
                                            ) {
                                              e.stopPropagation();
                                              e.preventDefault();
                                              NewBusinessType();
                                            }
                                          }}
                                          error={error}
                                          helperText={error ? errorText : ""}
                                        />
                                      </OtherField>
                                    )}
                                  </BoxCheckBox>
                                ))}
                              </CheckBoxContainer>
                            </FormGroup>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container columnSpacing={5} className="grid_info">
                    <Grid
                      item
                      xs={12}
                      md={6}
                      xl={6}
                      lg={6}
                      className={companydetail.gridemailinput}
                    >
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={6.2}
                          lg={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Email
                          {edit && (
                            <span
                              style={{ color: "#d7282f", paddingLeft: "4px" }}
                            >
                              *
                            </span>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={5.8}
                          lg={7.9}
                          style={ValueStyle}
                        >
                          {!edit ? (
                            values.shop_email == 0 ? (
                              ""
                            ) : (
                              values.shop_email
                            )
                          ) : (
                            <TextField
                              {...formik.getFieldProps("shop_email")}
                              style={{ width: "100%" }}
                              variant="outlined"
                              size="small"
                              onChange={(e) => {
                                formik.setFieldError("shop_email", ""),
                                  formik.handleChange(e);
                              }}
                              name={`shop_email`}
                              value={formik.values.shop_email}
                              error={ValidateField("shop_email")}
                              helperText={
                                ValidateField("shop_email")
                                  ? `${formik.errors.shop_email}`
                                  : ""
                              }
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      xl={6}
                      lg={6}
                      className={companydetail.gridemailinput}
                    >
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={6.3}
                          lg={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Mobile
                          {edit && (
                            <span
                              style={{ color: "#d7282f", paddingLeft: "4px" }}
                            >
                              *
                            </span>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={5.7}
                          lg={7.9}
                          style={ValueStyle}
                        >
                          {!edit ? (
                            formik.values.mobile_code == "0" ||
                            formik.values.phone == "" ? (
                              ""
                            ) : (
                              <MobileWithFlag
                                mobile_code={formik.values.mobile_code}
                                number={formik.values.phone}
                              />
                            )
                          ) : (
                            <MobileInputCommon
                              mobileNumber={formik.values.phone}
                              mobileCode={formik.values.mobile_code}
                              countryCode={formik.values.mobile_code}
                              handleChange={setMobileNumber}
                              label={"Mobile No"}
                              helperText={formik.errors.phone}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container columnSpacing={5} className="grid_info">
                    {values?.registration_website?.map((v, i) => (
                      <Grid item xs={12} md={12} xl={6} lg={6} key={i}>
                        <Grid
                          container
                          className={companydetail.row_container}
                          sx={{ alignItems: "center" }}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            lg={4.1}
                            style={LableStyle}
                            className={companydetail.labelstyle}
                          >
                            {`Website ${i + 1}`}
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={8}
                            md={9}
                            lg={7.9}
                            style={ValueStyle}
                          >
                            {!edit ? (
                              v
                            ) : (
                              <TextField
                                {...formik.getFieldProps(
                                  `registration_website${i}`
                                )}
                                value={v}
                                name={`registration_website${i}`}
                                variant="outlined"
                                style={{ width: "100%" }}
                                size="small"
                                onChange={(e) => {
                                  WebsiteHandler(e, i),
                                    formik.setFieldError(
                                      `registration_website`,
                                      ""
                                    );
                                }}
                                error={
                                  formik?.errors?.registration_website?.[0]
                                    ? true
                                    : false
                                }
                                helperText={
                                  formik?.errors?.registration_website?.[0]
                                    ? formik.errors.registration_website[0]
                                    : ""
                                }
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment
                                      position="end"
                                      sx={{ cursor: "pointer" }}
                                    >
                                      {i < 2 && (
                                        <AddCircleOutlineIcon
                                          style={{
                                            color: "#D7282F",
                                            height: "20px",
                                            width: "27px",
                                          }}
                                          onClick={() => {
                                            if (
                                              formik.values.registration_website
                                                .length < 3
                                            )
                                              formik.setFieldValue(
                                                "registration_website",
                                                [
                                                  ...formik.values
                                                    .registration_website,
                                                  "https://",
                                                ]
                                              );
                                          }}
                                        />
                                      )}
                                      {i > 0 ? (
                                        <RemoveCircleOutlineIcon
                                          style={{
                                            color: "#231F20",
                                            height: "20px",
                                            width: "27px",
                                          }}
                                          onClick={() => {
                                            let website = [
                                              ...formik.values
                                                .registration_website,
                                            ];
                                            website.splice(i, 1);
                                            formik.setFieldValue(
                                              "registration_website",
                                              website
                                            );
                                          }}
                                        />
                                      ) : null}
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>

                  <Grid item xs={12} md={12} xl={12} lg={12}>
                    <Grid container style={CategoryContainerStyle}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={3}
                        lg={2}
                        style={LableStyle}
                        className={companydetail.labelstyle}
                      >
                        Select Category
                        {edit && (
                          <>
                            <span
                              style={{ color: "#d7282f", paddingLeft: "4px" }}
                            >
                              *
                            </span>
                          </>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={9}
                        lg={10}
                        style={catValueStyle}
                      >
                        {!edit ? (
                          values.category_id.map((v, i) => (
                            <Chip key={i} label={v} style={BgTextStyle} />
                          ))
                        ) : (
                          <Autocomplete
                            className={"autoComplete-container"}
                            size="small"
                            sx={{ width: "100%" }}
                            onChange={(event: any, value) => {
                              if (event.key == "Backspace") {
                                let keyword = [...formik.values.category_id];
                                keyword.pop();
                                formik.setFieldValue("category_id", keyword);
                              } else {
                                formik.setFieldValue("category_id", value);
                                formik.setFieldError("category_id", "");
                              }
                            }}
                            multiple
                            id="tags-filled"
                            options={categoryList}
                            defaultValue={
                              formik.values.category_id.length > 0
                                ? formik.values.category_id
                                : []
                            }
                            freeSolo
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  label={option}
                                  {...getTagProps({ index })}
                                  sx={{
                                    "& .MuiChip-deleteIcon": {
                                      color: "#d7282fd9",
                                    },
                                    color: "#1C1C1C",
                                  }}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Please enter select categories"
                                error={formik.errors.category_id ? true : false}
                                helperText={
                                  formik.errors.category_id
                                    ? `${formik.errors.category_id}`
                                    : ""
                                }
                              />
                            )}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={12} xl={12} lg={12}>
                    <Grid
                      container
                      className={companydetail.row_container}
                      sx={{ alignItems: "center" }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={3}
                        lg={2}
                        style={LableStyle}
                        className={companydetail.labelstyle}
                      >
                        Main Products
                        {edit && (
                          <>
                            <span
                              style={{ color: "#d7282f", paddingLeft: "4px" }}
                            >
                              *
                            </span>
                          </>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={9}
                        lg={10}
                        style={ValueStyle}
                      >
                        {!edit ? (
                          values.company_products?.map((v, i) => (
                            <Chip key={i} label={v} style={BgTextStyle} />
                          ))
                        ) : (
                          <SelectableAndEditableField
                            noOptions
                            options={[]}
                            defaultValue={formik.values.company_products}
                            setValues={(value) => {
                              formik.setFieldValue("company_products", value);
                              formik.setFieldError("company_products", "");
                            }}
                            placeholder="Please enter the company products"
                            error={
                              formik.errors.company_products ? true : false
                            }
                            errorText={
                              formik.errors.company_products
                                ? `${formik.errors.company_products}`
                                : ""
                            }
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12} xl={12} lg={12}>
                    <Grid
                      container
                      className={companydetail.row_container}
                      sx={{ alignItems: "center" }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={3}
                        lg={2}
                        style={LableStyle}
                        className={companydetail.labelstyle}
                      >
                        Other Products
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={9}
                        lg={10}
                        style={ValueStyle}
                      >
                        {!edit ? (
                          values.company_other_products.map((v, i) => (
                            <Chip key={i} label={v} style={BgTextStyle} />
                          ))
                        ) : (
                          <SelectableAndEditableField
                            noOptions
                            options={[]}
                            defaultValue={formik.values.company_other_products}
                            error={
                              formik.errors.company_other_products
                                ? true
                                : false
                            }
                            placeholder="Please enter the other products"
                            errorText={
                              formik.errors.company_other_products
                                ? `${formik.errors.company_other_products}`
                                : ""
                            }
                            setValues={(value) => {
                              formik.setFieldValue(
                                "company_other_products",
                                value
                              );
                              formik.setFieldError(
                                "company_other_products",
                                ""
                              );
                            }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container columnSpacing={5}>
                    <Grid item xs={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          No. of Employees
                          {edit && (
                            <>
                              <span
                                style={{ color: "#d7282f", paddingLeft: "4px" }}
                              >
                                *
                              </span>
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          lg={7.9}
                          style={ValueStyle}
                        >
                          {!edit ? (
                            formik.values.no_of_employee == 0 ? (
                              ""
                            ) : (
                              formik.values.no_of_employee
                            )
                          ) : (
                            <CustomDropdown
                              name={"no_of_employee"}
                              value={formik.values.no_of_employee}
                              handleChange={(e, name) => {
                                formik.setFieldValue(
                                  "no_of_employee",
                                  e.target.value
                                );
                                formik.setFieldError("no_of_employee", "");
                              }}
                              options={employees}
                              placeholder="No. of employees "
                              styleProps={{ width: "100%" }}
                              error={
                                formik.errors.no_of_employee ? true : false
                              }
                              errorText={
                                formik.errors.no_of_employee
                                  ? formik.errors.no_of_employee
                                  : ""
                              }
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={4.1}
                          xl={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Yearly Revenue
                          {edit && (
                            <>
                              <span
                                style={{ color: "#d7282f", paddingLeft: "4px" }}
                              >
                                *
                              </span>
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          lg={7.9}
                          xl={7.9}
                          style={ValueStyle}
                        >
                          {!edit ? (
                            formik.values.yearly_revenue == 0 ? (
                              ""
                            ) : (
                              formik.values.yearly_revenue
                            )
                          ) : (
                            <CustomDropdown
                              name={"yearly_revenue"}
                              value={formik.values.yearly_revenue}
                              handleChange={(e, name) => {
                                formik.setFieldValue(
                                  "yearly_revenue",
                                  e.target.value
                                ),
                                  formik.setFieldError("yearly_revenue", "");
                              }}
                              options={revenue}
                              styleProps={{ width: "100%" }}
                              error={
                                formik.errors.yearly_revenue ? true : false
                              }
                              errorText={
                                formik.errors.yearly_revenue
                                  ? formik.errors.yearly_revenue
                                  : ""
                              }
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container columnSpacing={5}>
                    <Grid item xl={12} style={ContentHeaderText}>
                      Company Registration
                    </Grid>
                    <Grid item xs={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Year Company Registered
                          {edit && (
                            <>
                              <span
                                style={{ color: "#d7282f", paddingLeft: "4px" }}
                              >
                                *
                              </span>
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          lg={7.9}
                          style={ValueStyle}
                        >
                          {!edit ? (
                            formik.values.registration_year == "0" ? (
                              ""
                            ) : (
                              formik.values.registration_year
                            )
                          ) : (
                            <CustomDropdown
                              name={"registration_year"}
                              value={formik.values.registration_year}
                              handleChange={(e, name) => {
                                formik.setFieldValue(
                                  "registration_year",
                                  e.target.value
                                );
                                formik.setFieldError("registration_year", "");
                              }}
                              options={ManufacturingYears}
                              styleProps={{ width: "100%" }}
                              error={ValidateField("registration_year")}
                              errorText={
                                ValidateField("registration_year")
                                  ? formik.errors.registration_year
                                  : ""
                              }
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={4.1}
                          xl={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Registration Number
                          {edit && (
                            <>
                              <span
                                style={{ color: "#d7282f", paddingLeft: "4px" }}
                              >
                                *
                              </span>
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          lg={7.9}
                          xl={7.9}
                          style={ValueStyle}
                        >
                          {!edit ? (
                            formik.values.registration_number == "0" ? (
                              ""
                            ) : (
                              formik.values.registration_number
                            )
                          ) : (
                            <TextField
                              {...formik.getFieldProps("registration_number")}
                              style={{ width: "100%" }}
                              variant="outlined"
                              size="small"
                              onChange={(e) => {
                                formik.setFieldError("registration_number", ""),
                                  formik.handleChange(e);
                              }}
                              name={"registration_number"}
                              value={formik.values.registration_number}
                              error={
                                formik.errors.registration_number ? true : false
                              }
                              helperText={
                                ValidateField(`${"registration_number"}`)
                                  ? `${formik.errors.registration_number}`
                                  : ""
                              }
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container columnSpacing={5}>
                    <Grid item xl={12} style={ContentHeaderText}>
                      Registeration Location
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          xl={4.1}
                          lg={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Country
                          {edit && (
                            <>
                              <span
                                style={{ color: "#d7282f", paddingLeft: "4px" }}
                              >
                                *
                              </span>
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          xl={7.9}
                          lg={7.9}
                          style={ValueStyle}
                          className={companydetail.selct_country_col}
                        >
                          <CountryInput>
                            {!edit ? (
                              <CountrySelect
                                country={formik.values.registration_country_id}
                                mode="view"
                              />
                            ) : (
                              <CountrySelect
                                country={
                                  formik.values["registration_country_id"]
                                }
                                setCountry={(values: any) =>
                                  HandleCountry(values)
                                }
                                styleProps={{ width: "100%" }}
                                errorText={"Please Select country"}
                                error={
                                  formik.errors["registration_country_id"]
                                    ? true
                                    : false
                                }
                                helperText={
                                  ValidateField(
                                    `${"registration_country_id"}`
                                  ) && formik.errors["registration_country_id"]
                                }
                              />
                            )}
                          </CountryInput>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center", height: "100%" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          xl={4.1}
                          lg={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          City
                          {edit && (
                            <>
                              <span
                                style={{ color: "#d7282f", paddingLeft: "4px" }}
                              >
                                *
                              </span>
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          xl={7.9}
                          lg={7.9}
                          style={ValueStyle}
                        >
                          <CountryInput>
                            {!edit ? (
                              formik.values.registration_city == 0 ? (
                                ""
                              ) : (
                                formik.values.registration_city
                              )
                            ) : (
                              <CountryCities
                                name="registration_city"
                                formik={formik}
                                country={
                                  formik.values["registration_country_id"]
                                }
                                city={formik.values["registration_city"]}
                                setCity={(values: any) => HandleCity(values)}
                                styleProps={{ width: "100%" }}
                                errors={
                                  formik.errors["registration_city"]
                                    ? true
                                    : false
                                }
                                errorText={
                                  ValidateField(`${"registration_city"}`)
                                    ? `${formik.errors["registration_city"]}`
                                    : ""
                                }
                              />
                            )}
                          </CountryInput>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        sx={{
                          paddingTop: "16px",
                          borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
                          paddingBottom: "16px",
                          alignItems: "center",
                          "@media screen and (max-width:767px)": {
                            paddingTop: "10px",
                            paddingBottom: "10px",
                          },
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          xl={4.1}
                          lg={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Postal Code
                          {edit && (
                            <>
                              <span
                                style={{ color: "#d7282f", paddingLeft: "4px" }}
                              >
                                *
                              </span>
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          xl={7.9}
                          lg={7.9}
                          style={ValueStyle}
                        >
                          {!edit ? (
                            formik.values.registration_postalcode == 0 ? (
                              ""
                            ) : (
                              formik.values.registration_postalcode
                            )
                          ) : (
                            <TextField
                              {...formik.getFieldProps(
                                "registration_postalcode"
                              )}
                              style={{ width: "100%" }}
                              variant="outlined"
                              size="small"
                              onChange={handlePostalChange}
                              name={`registration_postalcode`}
                              value={formik.values.registration_postalcode}
                              error={
                                formik.errors.registration_postalcode
                                  ? true
                                  : false
                              }
                              helperText={
                                ValidateField(`registration_postalcode`)
                                  ? `${formik.errors.registration_postalcode}`
                                  : ""
                              }
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        style={{
                          paddingTop: "16px",
                          borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
                          paddingBottom: "16px",
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          xl={4.1}
                          lg={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Fax
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          xl={7.9}
                          lg={7.9}
                          style={ValueStyle}
                        >
                          {!edit ? (
                            formik.values.fax == 0 || null ? (
                              ""
                            ) : (
                              formik.values.fax
                            )
                          ) : (
                            <TextField
                              {...formik.getFieldProps("fax")}
                              style={{ width: "100%" }}
                              variant="outlined"
                              size="small"
                              onChange={handleFaxNumChange}
                              name={`fax`}
                              value={formik.values.fax}
                              error={formik.errors.fax ? true : false}
                              helperText={
                                ValidateField(`fax`)
                                  ? `${formik.errors.fax}`
                                  : ""
                              }
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container columnSpacing={5}>
                    <Grid item xs={12} md={6} xl={6} lg={6}>
                      <Grid
                        container
                        style={{
                          paddingTop: "16px",
                          borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
                          paddingBottom: "16px",
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={4.1}
                          xl={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "rgba(34, 51, 84, 0.5)",
                              wordBreak: "break-word",
                            }}
                          >
                            Upload Business Licence
                            {edit && (
                              <>
                                <span
                                  style={{
                                    color: "#d7282f",
                                    paddingLeft: "4px",
                                  }}
                                >
                                  *
                                </span>
                              </>
                            )}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          lg={7.9}
                          xl={7.9}
                          style={ValueStyle}
                          className={companydetail.upload_col}
                        >
                          {!edit ? (
                            <FileUpload
                              mode={"view"}
                              files={values.licenseFiles}
                            />
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <FileUpload
                                mode={"edit"}
                                name="license"
                                files={formik.values.licenseFiles}
                                error={(error) =>
                                  formik.setFieldError("licenseFiles", error)
                                }
                                updateFiles={(value) => {
                                  formik.setFieldValue("licenseFiles", value);
                                  formik.setFieldError("licenseFiles", "");
                                }}
                                removedFile={(deletedID) =>
                                  setDeleteLicense(deletedID)
                                }
                                alignItem={"start"}
                                errorText={"Please Upload licence files"}
                                // error={formik.errors.licenseFiles ? true : false}
                                helperText={
                                  ValidateField("licenseFiles") &&
                                  formik.errors.licenseFiles
                                }
                              />
                              <Typography
                                className={companydetail.errormsg}
                                component="span" 
                              >
                                {/* <>{formik?.errors?.licenseFiles}</> */}
                              </Typography>
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} xl={6} lg={6}>
                      <Grid
                        container
                        style={{
                          borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
                          paddingBottom: "16px",
                          paddingTop: "16px",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={4.1}
                          xl={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "rgba(34, 51, 84, 0.5)",
                              wordBreak: "break-word",
                            }}
                          >
                            Other Registration Documents
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          lg={7.9}
                          xl={7.9}
                          style={ValueStyle}
                          className={companydetail.upload_col}
                        >
                          {!edit ? (
                            <FileUpload
                              mode={"view"}
                              files={values.certificateFiles}
                            />
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <FileUpload
                                mode={"edit"}
                                name="certificate"
                                files={formik.values.certificateFiles}
                                error={(error) =>
                                  formik.setFieldError(
                                    "certificateFiles",
                                    error
                                  )
                                }
                                updateFiles={(value) => {
                                  formik.setFieldValue(
                                    "certificateFiles",
                                    value
                                  );
                                  formik.setFieldError("certificateFiles", "");
                                }}
                                removedFile={(deletedID) =>
                                  setDeleteCertificate(deletedID)
                                }
                                alignItem={"start"}
                                // error={
                                //   formik.errors.certificateFiles ? true : false
                                // }
                                helperText={
                                  ValidateField("certificateFiles") &&
                                  formik.errors.certificateFiles
                                }
                              />

                              <Typography
                                className={companydetail.errormsg}
                                component="span"
                              >
                                {/* <>{formik?.errors?.certificateFiles}</> */}
                              </Typography>
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container columnSpacing={5}>
                    <Grid item xl={12} style={ContentHeaderText}>
                      Company Operational Address
                    </Grid>
                    <Grid item xs={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={4.1}
                          xl={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Country
                          {edit && (
                            <>
                              <span
                                style={{ color: "#d7282f", paddingLeft: "4px" }}
                              >
                                *
                              </span>
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          lg={7.9}
                          xl={7.9}
                          style={ValueStyle}
                          className={companydetail.selct_country_col}
                        >
                          <CountryInput>
                            {!edit ? (
                              <CountrySelect
                                country={formik.values.country_id}
                                mode="view"
                              />
                            ) : (
                              <CountrySelect
                                name="country_id"
                                formik={formik}
                                country={formik.values["country_id"]}
                                setCountry={(values) =>
                                  HandleRegistrCountry(values)
                                }
                                styleProps={{ width: "100%" }}
                                error={ValidateField(`${"country_id"}`)}
                                errorText={
                                  ValidateField(`${"country_id"}`)
                                    ? formik.errors["country_id"]
                                    : ""
                                }
                              />
                            )}
                          </CountryInput>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        sx={{ alignItems: "center" }}
                        style={{
                          paddingTop: "16px",
                          borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
                          paddingBottom: "16px",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={4.1}
                          xl={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          City
                          {edit && (
                            <>
                              <span
                                style={{ color: "#d7282f", paddingLeft: "4px" }}
                              >
                                *
                              </span>
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          lg={7.9}
                          xl={7.9}
                          style={ValueStyle}
                        >
                          <CountryInput>
                            {!edit ? (
                              formik.values.city == 0 ? (
                                ""
                              ) : (
                                formik.values.city
                              )
                            ) : (
                              <CountryCities
                                formik={formik}
                                country={formik.values["country_id"]}
                                city={formik.values["city"]}
                                setCity={(values) => HandleOtherCity(values)}
                                name="city"
                                styleProps={{ width: "100%" }}
                                errors={formik.errors["city"] ? true : false}
                                errorText={
                                  ValidateField(`${"city"}`)
                                    ? `${formik.errors["city"]}`
                                    : ""
                                }
                              />
                            )}
                          </CountryInput>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={4.1}
                          xl={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Postal Code
                          {edit && (
                            <>
                              <span
                                style={{ color: "#d7282f", paddingLeft: "4px" }}
                              >
                                *
                              </span>
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          lg={7.9}
                          xl={7.9}
                          style={ValueStyle}
                        >
                          {!edit ? (
                            formik.values.postal_code == 0 ? (
                              ""
                            ) : (
                              formik.values.postal_code
                            )
                          ) : (
                            <TextField
                              inputProps={{
                                autoComplete: "off",
                              }}
                              {...formik.getFieldProps("postal_code")}
                              style={{ width: "100%" }}
                              variant="outlined"
                              size="small"
                              onChange={handleChangePostal}
                              name={`postal_code`}
                              value={formik.values.postal_code}
                              error={formik.errors.postal_code ? true : false}
                              helperText={
                                ValidateField(`postal_code`)
                                  ? `${formik.errors.postal_code}`
                                  : ""
                              }
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} xl={6} lg={6}>
                      <Grid
                        container
                        className={companydetail.row_container}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={4.1}
                          xl={4.1}
                          style={LableStyle}
                          className={companydetail.labelstyle}
                        >
                          Address
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={9}
                          lg={7.9}
                          xl={7.9}
                          style={ValueStyle}
                        >
                          {!edit ? (
                            formik.values.address == 0 ? (
                              ""
                            ) : (
                              formik.values.address
                            )
                          ) : (
                            <TextField
                              {...formik.getFieldProps("address")}
                              style={{ width: "100%" }}
                              variant="outlined"
                              size="small"
                              onChange={(e) => {
                                formik.setFieldError("address", ""),
                                  formik.handleChange(e);
                              }}
                              name={`address`}
                              value={formik.values.address}
                              error={formik.errors.address ? true : false}
                              helperText={
                                ValidateField(`address`)
                                  ? `${formik.errors.address}`
                                  : ""
                              }
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={12} xl={12} lg={12}>
                    <AboutCompanyBox>
                      <Grid container style={ContentContainerStyle}>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                          <Box
                            component={"span"}
                            sx={{
                              alignItems: "inherit !important",
                              display: "flex",
                            }}
                            style={LableStyle}
                            className="aboutTitle"
                          >
                            About Company
                            <Typography
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handlePopoverOpen}
                              onMouseLeave={handlePopoverClose}
                            >
                              {" "}
                              <InfoOutline />
                              {edit && (
                                <>
                                  <span
                                    style={{
                                      color: "#d7282f",
                                      paddingLeft: "4px",
                                    }}
                                  >
                                    *
                                  </span>
                                </>
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                            <Box
                              style={ValueStyle}
                              sx={{
                                height: "100%",
                                "& textarea": {
                                  minHeight: "114px",
                                  marginTop: "0 !important",
                                },
                              }}
                            >
                              {!edit ? (
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  {values.description}
                                </Box>
                              ) : (
                                <>
                                  <TextareaAutosize
                                    {...formik.getFieldProps("description")}
                                    style={TextAreaStyle}
                                    value={formik.values.description}
                                    name="description"
                                    onChange={(e) => {
                                      handleInputChange(e);
                                    }}
                                  />
                                  <Typography
                                    style={{
                                      color: "#d32f2f",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {descriptionError}
                                  </Typography>
                                  <DescriptionTextContainer>
                                    Remaining:{" "}
                                    {`${
                                      999 -
                                      Number(formik.values.description.length)
                                    } Characters`}
                                  </DescriptionTextContainer>

                                  <DescriptionTextContainer>
                                    Please briefly describe your company’s
                                    advantages. E.g. “We have twenty years
                                    experience of product design.”
                                  </DescriptionTextContainer>
                                </>
                              )}
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              {!edit && (
                                <Box
                                  sx={{
                                    marginTop: "12px",
                                    "@media (max-width: 900px)": {
                                      margin: "0",
                                    },
                                  }}
                                >
                                  <FileUpload
                                    mode={"view"}
                                    files={[
                                      {
                                        source:
                                          formik.values.minisite_footer_banner,
                                        file_original_name: "banner_image",
                                        id: "banner_image",
                                      },
                                    ]}
                                  />
                                </Box>
                              )}
                              {edit && (
                                <AboutCompanyImage>
                                  <img
                                    src={
                                      edit
                                        ? typeof formik.values
                                            .minisite_footer_banner == "string"
                                          ? formik.values.minisite_footer_banner
                                          : URL.createObjectURL(
                                              formik.values
                                                .minisite_footer_banner
                                            )
                                        : formik.values.minisite_footer_banner
                                    }
                                    alt="About Company"
                                  />

                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                      bottom: 0,
                                      left: 0,
                                      margin: "auto",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box sx={{ margin: "auto" }}>
                                      <AboutIconButton>
                                        <Button
                                          component="label"
                                          variant="contained"
                                          className="upbuttonabout"
                                        >
                                          <ImageCropper
                                            deleteImages={null}
                                            type={"square"}
                                            endPoints={""}
                                            params={""}
                                            defaultImage={""}
                                            onChange={onChangeHandle}
                                          />
                                        </Button>
                                      </AboutIconButton>
                                      <Typography
                                        variant="body1"
                                        sx={{
                                          color: "#ffffff",
                                          fontSize: "13px",
                                          marginTop: "4px",
                                          textAlign: "center",
                                        }}
                                      >
                                        Upload Image <span>400X400</span>
                                      </Typography>
                                    </Box>
                                  </Box>
                                </AboutCompanyImage>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                      <div>
                        <AboutCompanyPopover
                          id="mouse-over-popover"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          sx={{
                            pointerEvents: "none",
                          }}
                          open={openAbout}
                          anchorEl={anchorElAbout}
                          onClose={handlePopoverClose}
                          disableRestoreFocus
                        >
                          <Box className="infocontent">
                            <img
                              src="/assets/images/aboutcompany-info.png"
                              alt="Image"
                            />
                          </Box>
                        </AboutCompanyPopover>
                      </div>
                    </AboutCompanyBox>
                  </Grid>

                  {edit && (
                    <Grid
                      container
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Grid
                        item
                        style={{
                          display: "flex",
                          paddingTop: "16px",
                          gap: 5,
                        }}
                      >
                        <Redoutlinebtn
                          type="submit"
                          borderRadius={"6px"}
                          height={"35px"}
                          disabled={loader}
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
                            "Save"
                          )}
                        </Redoutlinebtn>
                        <Blackoutlinebtn
                          borderRadius={"6px"}
                          height={"35px"}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Blackoutlinebtn>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default GridCompanyInfo;
