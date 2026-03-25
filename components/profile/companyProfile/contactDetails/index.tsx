import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  Skeleton,
  TextField,
} from "@mui/material";
import React, { useState, useEffect, useCallback, useRef } from "react";
import useAppContext from "@/hooks/useAppContext";
import {
  ContainerHeader,
  ContainerHeaderDescription,
  ContainerHeaderText,
  ContentInnerContainer,
  FieldOuterContainer,
  FieldValueContainer,
  FloatingEditIcon,
  LabelContainer,
  OuterContainer,
  PencilIcon,
  CancelLink,
  SaveLink,
} from "@/components/profile/common";
import Image from "next/image";
import { CustomTextField } from "@/components/common/customTextField";
import { dialCountrycode } from "@/utils/dialCountryCode";
import { useAppDispatch } from "redux/store";
import { getGeoLocation, setDefaultCode } from "@/hooks/geolocation";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import * as Yup from "yup";
import { useFormik } from "formik";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { apiClient } from "@/components/common/common";
import MobileWithFlag from "@/components/common/numberwithflag";
import dynamic from "next/dynamic";
import { EditText, IconAndTextContainer } from "../../personalProfile/styles";
import VerifyCompanyMobile from "../verifyCompanyMobile";
import VerifyCompanymail from "../verifyCompanymail";
import { toast } from "react-toastify";
import { getCompanyProfile } from "@/hooks/company";
import { profileData } from "@/hooks/appReducers";
import _debounce from "lodash/debounce";
import { ThreeDots } from "react-loader-spinner";
const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);
export const ContactDetails = (props: any) => {
  const { defaultValues } = props;
  const { breakPoints } = useAppContext();
  const [showConfirmMobileModal, setShowConfirmMobileModal] = useState(false);
  const [showConfirmEmailModal, setShowConfirmEmailModal] = useState(false);
  const [mobile, setMobile] = useState<string>("");
  const [validate, setValidation] = useState<boolean>(false);
  const [defaultCountrycode, setDefaultCountrycode] = useState<any>("");
  const dispatch = useAppDispatch();
  const { defaultCode } = useSelector((state: any) => state.geoLocation);
  const [verifyphone, setVarifyPhone] = useState<any>();
  const [verifymail, setVarify] = useState<any>();
  const [status, setStatus] = useState<any>({ type: 0, msg: "" });
  const [isMount, setIsMount] = useState<any>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [skeltonLoader, setSkeltonLoader] = useState<boolean>(false);
  const [duplicate, setDuplicate] = useState<any>({ dup: false, index:[] });
  useEffect(() => setIsMount(true), []);

  const validation = Yup.object().shape({
    shop_email: Yup.string()
      .email("Please enter valid email address")
      .required("Please enter email address"),
    phone: Yup.string().required("Please enter mobile number"),
  });
  const validationSchema = Yup.object().shape({
    registration_website: Yup.array()
      .of(Yup.string().url("Please enter a valid URL (http:// or https://)"))
      .max(3, "No more than 3 websites are allowed"),
  });

  function isValidHttpUrl(string) {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (err) {
      return false;
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validation.fields,
      ...validationSchema.fields,
    }),
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      editMode: false,
      registration_website:
        defaultValues?.registration_website.length > 0
          ? defaultValues?.registration_website
          : [""],
      shop_email:
        defaultValues?.shop_email == "0" ? "" : defaultValues?.shop_email,
      phone: defaultValues?.phone ?? "",
      mobile_code: defaultValues?.mobile_code ?? defaultCode,
      mobile_country_code: defaultValues?.mobile_country_code,
    },
    onSubmit: async (values, { setFieldError }) => {
      // if (duplicate?.dup && duplicate?.index.length > 0) {
      //   duplicate?.index?.forEach((value:any, idx:number)=>{
      //     formik.setFieldError(
      //       `registration_website[${idx}]`,
      //       "Duplicate website not allowed!"
      //     );
      //   })
      //   return;
      // } else {
      //   duplicate?.index?.forEach((value: any, idx: number)=>{
      //     formik.setFieldError(`registration_website[${idx}]`, "");
      //   })
      // }

      if (duplicate?.dup) {
        duplicate.index.forEach((idx:number) => {
          setFieldError(`registration_website[${idx}]`, "Duplicate website not allowed!");
        });
        return;
      } else {
        formik.values.registration_website.forEach((idx:number) => {
          setFieldError(`registration_website[${idx}]`, "");
        });
      }
      if (status?.type === 0) {
        if (!validate) {
          setFieldError("phone", "Please enter correct mobile no");
          return;
        }
        setLoader(true);
        try {
          const response = await apiClient(
            "company_profile/updateProfile",
            "post",
            {
              body: {
                ...values,
                registration_website: values.registration_website.join(","),
              },
            }
          );

          if (response.status === false) {
            setLoader(false);
            toast.error(response.message);
          } else {
            await dispatch(getCompanyProfile());
            dispatch(profileData());
            setLoader(false);
            formik.setFieldValue("editMode", false);
            toast.success("Contact details saved successfully!");
          }
        } catch (error) {
          setLoader(false);
        }
      }
    },
  });
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
    if (
      defaultValues?.mobile_code === "" ||
      defaultValues?.mobile_code == undefined
    ) {
      dispatch(getGeoLocation());
    } else {
      dispatch(
        setDefaultCode(
          dialCountrycode.filter((element) => {
            if (element?.dial_code == `+${defaultValues?.mobile_code}`) {
              return element?.code;
            }
          })[0]?.code
        )
      );
    }
  }, [defaultValues?.mobile_code]);

  const {
    shop_email,
    registration_website,
    phone,
    mobile_code,
    editMode,
    mobile_country_code,
  } = formik.values;

  const { companyDetails } = useSelector((state: any) => state.companyProfile);

  const WebsiteHandler = (e: any, index: string) => {
    let website = [...formik?.values?.registration_website];
    website[index] = e.target.value;
    formik.setFieldValue("registration_website", website);
  };

  useEffect(() => {
    if (defaultValues?.mobile_code && defaultValues?.phone && mobile == "") {
      setMobile(`${defaultValues?.phone}`);
    }
    setDefaultCountrycode(defaultCode);
    setVarify(defaultValues?.email_verified);
    setVarifyPhone(defaultValues?.phone_verified);
  }, [defaultValues]);

  useEffect(() => {
    setDefaultCountrycode(defaultCode);
  }, []);

  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("mobile_code", mobile_code);
    formik.setFieldValue("phone", phone);
    formik.setFieldValue("mobile_country_code", country_code);
    formik.setFieldError("phone", "");
    setValidation(isValid);
  };

  const CancelEditing = () => {
    if (editMode) {
      formik.resetForm();
      formik.setFieldValue("editMode", false);
    } else {
      formik.setFieldValue(
        "registration_website",
        defaultValues?.registration_website ?? ""
      );
      formik.setFieldValue("shop_email", defaultValues?.shop_email ?? "");
      formik.setFieldValue("phone", defaultValues?.phone ?? "");
      formik.setFieldValue("mobile_code", defaultValues?.mobile_code ?? "");
      formik.setFieldValue(
        "mobile_country_code",
        defaultValues?.mobile_country_code ?? ""
      );
    }
  };
  const closeModals = () => {
    setShowConfirmEmailModal(false);
    setShowConfirmMobileModal(false);
  };
  const emailRef = useRef(null);
  const mobileRef = useRef(null);

  const handleSave = () => {
    formik.handleSubmit();

    if(!formik.values.shop_email || formik.errors.shop_email) {
      emailRef.current?.focus();
      return;
    }
    if(!formik.values.phone || formik.errors.phone) {
      mobileRef?.current?.focus();
      return;
    }
  }


  return (
    <Box>
      <VerifyCompanyMobile
        open={showConfirmMobileModal}
        closeModal={closeModals}
        mobile={mobile_code}
        phone={phone}
        emailId={shop_email}
        setVarifyPhone={setVarifyPhone}
      />
      <VerifyCompanymail
        open={showConfirmEmailModal}
        closeModal={closeModals}
        emailId={shop_email}
        setVarify={setVarify}
      />

      <ContentInnerContainer breakPoints={breakPoints}>
        <ContainerHeader sx={{ marginBottom: "0px" }}>
          <ContainerHeaderText breakPoints={breakPoints}>
            Contact Details 
          </ContainerHeaderText>
          <ContainerHeaderDescription breakPoints={breakPoints}>
            Manage Information related to Your Contacts
          </ContainerHeaderDescription>
          {!editMode ? (
            <FloatingEditIcon
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                formik.setFieldValue("editMode", true);
              }}
            >
              <PencilIcon>
                <Image
                  src={"/assets/EditPencil.svg"}
                  layout="fill"
                  alt="editImage"
                />
              </PencilIcon>{" "}
              {companyDetails?.contact_profile?.shop_email ? "Edit" : "Add"}
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
                  CancelEditing();
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
                  height="30"
                  width="60"
                  radius="5"
                  color="#d32f2f"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                <SaveLink>
                  <Button
                    // onClick={(e) => formik.handleSubmit()}
                    onClick={handleSave}
                    sx={{ padding: "0px", minWidth: "auto" }}
                  >
                    <SaveOutlinedIcon sx={{ marginLeft: "10px" }} />
                    <Box
                      sx={{
                        minWidth: "auto",
                        "@media screen and (max-width:320px)": {
                          display: "none",
                        },
                      }}
                    >
                      Save
                    </Box>
                  </Button>
                </SaveLink>
              )}
            </FloatingEditIcon>
          )}
        </ContainerHeader>
        <OuterContainer>
          <FormControl sx={{ width: "100%" }}>
            <FieldOuterContainer breakPoints={breakPoints}>
              {editMode ? (
                <LabelContainer breakPoints={breakPoints}>
                  Email Address<div style={{ color: "#d7282f" }}>*</div>
                </LabelContainer>
              ) : (
                <>
                  <LabelContainer breakPoints={breakPoints}>
                    Email Address
                  </LabelContainer>
                  
                </>
              )}

              <FieldValueContainer
                breakPoints={breakPoints}
                className="BasicInfoContactDetail"
              >
                {" "}
                {!editMode ? (
                  <p style={{ fontSize: "14px" }}>
                    {skeltonLoader ? (
                      <Skeleton
                        width={"200px"}
                        variant="text"
                        animation="wave"
                      />
                    ) : shop_email === "" ? (
                      "N/A"
                    ) : shop_email == "0" ? (
                      ""
                    ) : (
                      shop_email
                    )}
                  </p>
                ) : (
                  <CustomTextField
                    errorText={formik.errors.shop_email}
                    error={formik.errors.shop_email ? true : false}
                    value={shop_email}
                    inputRef={emailRef}
                    name="Enter email address"
                    handleChange={(e) => {
                      formik.setFieldValue(
                        "shop_email",
                        e.target?.value?.toLowerCase()
                      );
                      formik.setFieldError("shop_email", "");
                    }}
                  />
                )}
                {shop_email && !editMode && (
                  <IconAndTextContainer
                    style={{ right: 0 }}
                    verified={{
                      verified: verifymail === "0" ? false : true,
                    }}
                    bgcolor={{ color: true }}
                    transform={{ up: true }}
                    onClick={() => {
                      if (verifymail == "0") {
                        setShowConfirmEmailModal(true);
                      } else {
                        setShowConfirmEmailModal(false);
                      }
                    }}
                  >
                    <EditText>
                      {verifymail == "0" ? "Verify" : "Verified"}
                    </EditText>
                  </IconAndTextContainer>
                )}
              </FieldValueContainer>
            </FieldOuterContainer>
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <FieldOuterContainer breakPoints={breakPoints}>
              {editMode ? (
                <LabelContainer breakPoints={breakPoints}>
                  Mobile No.<div style={{ color: "#d7282f" }}>*</div>
                </LabelContainer>
              ) : (
                <>
                  <LabelContainer breakPoints={breakPoints}>
                    Mobile No.
                  </LabelContainer>
                  
                </>
              )}
              <FieldValueContainer breakPoints={breakPoints} className="BasicInfoContactDetail">
                {skeltonLoader ? (
                  <Skeleton width={"150px"} variant="text" animation="wave" />
                ) : !editMode ? (
                  mobile_code && phone ? (
                    <p>
                      <MobileWithFlag
                        mobile_code={mobile_code}
                        number={phone}
                        country_code={mobile_country_code}
                      />
                    </p>
                  ) : (
                    "N/A"
                  )
                ) : (
                  <MobileInputCommon
                    inputRef={mobileRef}
                    mobileNumber={formik?.values?.phone}
                    mobileCode={formik?.values?.mobile_code}
                    mobileCountryCode={formik?.values?.mobile_country_code}
                    handleChange={setMobileNumber}
                    helperText={formik.errors.phone}
                  />
                )}
                {phone && !editMode && (
                  <IconAndTextContainer
                    style={{ right: 0 }}
                    verified={{
                      verified: verifyphone === "0" ? false : true,
                    }}
                    bgcolor={{ color: true }}
                    transform={{ up: true }}
                    onClick={() => {
                      if (verifyphone == "0") {
                        setShowConfirmMobileModal(true);
                      } else {
                        setShowConfirmMobileModal(false);
                      }
                    }}
                  >
                    <EditText>
                      {verifyphone == "0" ? "Verify" : "Verified"}
                    </EditText>
                  </IconAndTextContainer>
                )}
              </FieldValueContainer>
            </FieldOuterContainer>
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <FieldOuterContainer lastOne={true} breakPoints={breakPoints}>
              <LabelContainer breakPoints={breakPoints}>Website</LabelContainer>
              <FieldValueContainer breakPoints={breakPoints}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                    "@media screen and (max-width:767px)": {
                      "& p": {},
                    },
                    "@media screen and (max-width:480px)": {
                      "& p": {
                        textAlign: "left",
                      },
                    },
                  }}
                >
                  {skeltonLoader ? (
                    <Skeleton width={"150px"} variant="text" animation="wave" />
                  ) : (
                    !editMode &&
                    registration_website?.map((ele, index) => {
                      const fccUrl = isValidHttpUrl(ele);
                      let url = fccUrl ? ele : `https://${ele}`;
                      return (
                        <a href={url} target="_blank" rel="noopener">
                          <p key={index} style={{ cursor: "pointer" }}>
                            {ele ? ele : "N/A"}
                          </p>
                        </a>
                      );
                    })
                  )}

<form onSubmit={formik.handleSubmit}>
  {editMode &&
    formik.values.registration_website.map((v, i) => (
      <TextField
        key={i}
        inputProps={{
          autoComplete: "off",
        }}
        {...formik.getFieldProps(`registration_website[${i}]`)}
        value={v}
        name={`registration_website[${i}]`}
        variant="outlined"
        style={{ width: "100%", marginBottom: "8px" }}
        size="small"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); 
          }
        }}
        onChange={(e) => {
          // WebsiteHandler(e, i);
          // const newValue = e.target.value;
          // const isDuplicate =
          //   formik.values.registration_website.includes(newValue) &&
          //   formik.values.registration_website.indexOf(newValue) !== i;

          // setDuplicate({ dup: isDuplicate, index: [] });

          // formik.setFieldValue(`registration_website[${i}]`, newValue);

          WebsiteHandler(e, i);
          const newValue = e.target.value;
          const updatedWebsites = [...formik.values.registration_website];
          updatedWebsites[i] = newValue;
          const duplicates = updatedWebsites
          .map((val, idx, arr) => arr.indexOf(val) !== idx ? idx : -1).filter(idx => idx !== -1);
          const duplicateIndices = [...new Set(duplicates)];
          setDuplicate({ dup: duplicateIndices.length > 0, index: duplicateIndices });
          formik.setFieldValue(`registration_website[${i}]`, newValue);
        }}
        error={
          formik.touched.registration_website &&
          Boolean(formik.errors.registration_website?.[i])
        }
        helperText={
          formik.touched.registration_website &&
          formik.errors.registration_website?.[i]
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ cursor: "pointer" }}>
              {formik.values.registration_website.length === 1 && i == 0 && (
                <AddCircleOutlineIcon
                  style={{
                    color: "#D7282F",
                    height: "20px",
                    width: "27px",
                  }}
                  onClick={() => {
                    if (formik.values.registration_website.length < 3) {
                      formik.setFieldValue("registration_website", [
                        ...formik.values.registration_website,
                        "",
                      ]
                    );
                    }
                  }}
                />
              )}
                {formik.values.registration_website.length !== 1 && (
                <RemoveCircleOutlineIcon
                  style={{
                    color: "#231F20",
                    height: "20px",
                    width: "27px",
                  }}
                  onClick={() => {
                    let website = [...formik.values.registration_website];
                    website.splice(i, 1);
                    formik.setFieldValue("registration_website", website);

                    const updateDups = duplicate;
                    if(updateDups?.index?.includes(i)){
                      let index: number =  updateDups?.index?.indexOf(i);
                      updateDups?.index?.splice(index,1)
                    }

                    if(updateDups?.index == 0){
                      updateDups.dup = false;
                    }
                    setDuplicate(updateDups);
                        formik.setFieldError(`registration_website[${i}]`,"");
                  }}
                />
              )}
              {formik.values.registration_website.length === 2 && i==1 && (
                <AddCircleOutlineIcon
                  style={{
                    color: "#D7282F",
                    height: "20px",
                    width: "27px",
                  }}
                  onClick={() => {
                    if (formik.values.registration_website.length < 3) {
                      formik.setFieldValue("registration_website", [
                        ...formik.values.registration_website,
                        "",
                      ]);
                    }
                  }}
                />
              )}
            </InputAdornment>
          ),
        }}
      />
    ))}
</form>

                </Box>
              </FieldValueContainer>
            </FieldOuterContainer>
          </FormControl>
        </OuterContainer>
      </ContentInnerContainer>
    </Box>
  );
};
