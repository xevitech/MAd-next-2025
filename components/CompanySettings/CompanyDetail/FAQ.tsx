import React, { useContext, useEffect, useState } from "react";
import {
  AddFAQFieldContainer,
  AnswerContainer,
  FAQButtonContainer,
  HeaderContainer,
  HeaderTextContainer,
  OuterContainer,
  QuestionContainer,
  TextFieldStyle,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import {
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiClient, formatTimestamp } from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { MyAppContext } from "@/contextApi/appContext";
import EmptyPage from "@/components/common/EmptyPage";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Image from "next/image";
import { FactorySmallTextContainer } from "@/components/CompanySettings/CompanyDetail/commonStyles";
import {
  CreatedUpdatedBox,
  CreatedUpdatedInnerBox,
  CreatedUpdatedOuterBox,
  PencilIcon1,
} from "./style";
import FaqSkeleton from "./CompanySkeletons/FAQSkeleton";
import FaqInputField from "./Common/InputField";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { DeleteButtonLink } from "./ContactPersonDetail/style";
import {
  Btn3,
  CreatAddPopover,
  RedTypography,
} from "@/components/adsPage/style";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
const FAQ = () => {
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const [addMore, setAddMore] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [itemIndex, setItemIndex] = useState<number>(-1);
  const [editIndex, setEditIndex] = useState<any>([]);
  const [faqList, setFaqList] = useState<any>([]);
  let List = [1, 2];
  const [loader, setLoader] = useState<boolean>(true);
  const [expand, setExpand] = useState<number>(0);
  const dispatch = useDispatch();
  const CustomizedAccordion = styled(Accordion)(() => ({
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    "& .MuiPaper-root": {
      boxShadow: "none",
    },
    boxShadow: "none",
    margin: "0 !important",
    padding: "5px 0 5px",
    "&.Mui-expanded": {
      "& .MuiCollapse-root": {},
    },
  }));
  const fetchFaqList = async () => {
    setLoader(true);
    let response = await apiClient("company_profile/faq/list", "get");
    if (response.status === 200) setFaqList(response.data);
    setLoader(false);
    setCompleteScreenLoader(false);
  };

  const validation = Yup.object().shape({
    faq_title: Yup.string().required("Please enter question").trim(),
    faq_answer: Yup.string().required("Please enter answer").trim(),
  });
  const [status, setStatus] = useState("enable");
  const handleStatusChange = (value) => {
    setStatus(value);
  };
  const isEditing = editIndex.length > 0;
  const currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const open1 = Boolean(anchorEl1);
  const [loading, setLoading] = useState(false);
  let formik = useFormik({
    initialValues: {
      faq_title: "",
      faq_answer: "",
      status: isEditing ? status : "enable",
      created_at: "",
      updated_at: "",
    },

    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const isDuplicate = faqList.some(
        (faq, i) =>
          i !== editIndex &&
          faq.faq_title.toLowerCase() === values?.faq_title.toLowerCase()
      );

      if (isDuplicate) {
        formik.setFieldError(
          "faq_title",
          "It looks like this question is already in the FAQs.Try a different question."
        );
        return;
      } else {
        setButtonLoader(true);
        setLoading(true);
        const value = {
          ...values,
          status: status,
          created_at: currentDate,
        };
        let response = await apiClient(
          "company_profile/updateProfile",
          "post",
          {
            body: { faq: [...faqList, value] },
          }
        );
        if (response.status === 200) {
          fetchFaqList();
          dispatch(getCompanyProfile());
        }
        setStatus("enable");
        setLoading(false);
        formik.resetForm();
        if (addMore) setAddMore(false);
        setButtonLoader(false);
      }
      setStatus("enable");
    },
  });

  useEffect(() => {
    setLoader(true);
    fetchFaqList();
  }, []);

  const DeleteAccounts = async () => {
    let list = [...faqList];
    list.splice(itemIndex, 1);
    await onSaveSubmit(list);
    setFaqList(list);
    setDeleteConfirmation(false);
    setItemIndex(-1);
  };

  const onSaveSubmit = async (values) => {
    setStatus("enable");
    setButtonLoader(true);
    let response = await apiClient("company_profile/updateProfile", "post", {
      body: { faq: values },
    });
    if (response.status === 200) {
      fetchFaqList();
      dispatch(getCompanyProfile());
    }
    formik.resetForm();
    if (addMore) setAddMore(false);
    if (editIndex.length > 0) setEditIndex([]);
    setButtonLoader(false);
    return response;
  };
  const handleAccordionClick = (index) => {
    setExpand((prevExpand) => (prevExpand === index ? null : index));
  };

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className="companydetail_faq">
          <OuterContainer>
            {deleteConfirmation && (
              <DeleteDialog
                open={deleteConfirmation}
                handleClose={setDeleteConfirmation}
                text="faq"
                onClickAction={DeleteAccounts}
              />
            )}
            <HeaderContainer sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: "80%",
                  "@media screen and (max-width:767px)": { width: "100%" },
                }}
              >
                <HeaderTextContainer>
                  FAQs{" "}
                  <Box>
                    {/* <Btn3
                      aria-describedby={open1 ? "image-view" : undefined}
                      onClick={handleClick1}
                      disableRipple
                    > */}
                    <LightTooltip
                      arrow
                      disableInteractive
                      placement="right"
                      title="A list of default questions is provided below for your convenience. Feel free to use, edit, or add your own FAQs."
                    >
                      <ContactSupportOutlinedIcon sx={{ fontSize: "16px" }} />
                    </LightTooltip>
                    {/* </Btn3> */}

                    <CreatAddPopover
                      open={open1}
                      anchorEl={anchorEl1}
                      onClose={handleClose1}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          width: "150px",
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: -1.5,
                          ml: 1,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 23,
                            left: -5,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      anchorOrigin={{
                        vertical: "center",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <Box className="adsshown">
                        <Box className="adsshownInn">
                          <Typography>FAQs</Typography>
                          <img src="\assets\FAQ.jpg" alt="Image" />
                          <RedTypography>
                            Please view the demo how we can add FAQs
                          </RedTypography>
                        </Box>
                      </Box>
                    </CreatAddPopover>
                  </Box>
                </HeaderTextContainer>
                <FactorySmallTextContainer>
                  Add or update your FAQs to provide buyers with quick answers
                  to common questions about your company, products, or services.
                </FactorySmallTextContainer>
              </Box>

              <Redoutlinebtn
                height={"36px"}
                onClick={() => {
                  setEditIndex([]);
                  setAddMore(true);
                }}
              >
                Add New FAQ
                <AddCircleOutlineIcon sx={{ marginLeft: 1, height: 24 }} />
              </Redoutlinebtn>
            </HeaderContainer>
            <Divider variant="middle" style={{ margin: 0 }} />
            <div
              className="faq_top"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0 0 0",
              }}
            >
              {addMore && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <form onSubmit={formik.handleSubmit}>
                      <AddFAQFieldContainer className="addfaqbox">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            "@media screen and (max-width: 900px)": {
                              flexDirection: "column-reverse",
                              gap: "10px",
                              alignItems: "start",
                            },
                          }}
                        >
                          <TextField
                            sx={{
                              width: "50%",
                              "@media screen and (max-width:900px)": {
                                width: "100%",
                              },
                            }}
                            size="small"
                            name="faq_title"
                            placeholder="Enter your question"
                            value={formik.values.faq_title}
                            autoComplete="off"
                            onChange={(e) => {
                              const trimmedValue = e.target.value.replace(
                                /^\s+/,
                                ""
                              );
                              formik.setFieldValue("faq_title", trimmedValue);
                              formik.setFieldError("faq_title", "");
                            }}
                            helperText={`${formik.errors?.faq_title ?? ""}`}
                            error={formik.errors?.faq_title ? true : false}
                          />
                          <FormControl
                            sx={{
                              "@media screen and (max-width:900px)": {
                                width: "40%",
                              },
                              "@media screen and (max-width:400px)": {
                                width: "70%",
                              },
                            }}
                          >
                            <InputLabel
                              id="demo-simple-select-label"
                              sx={{
                                "&.MuiFormLabel-root": {
                                  color: "rgb(28, 28, 28) !important",
                                  fontWeight: "600",
                                  paddingX: "8px",
                                },
                              }}
                            >
                              Status
                              <LightTooltip title="Required" placement="top">
                                <Box
                                  component={"span"}
                                  sx={{ color: "#d7282f", paddingX: "8px" }}
                                ></Box>
                              </LightTooltip>
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              size="small"
                              name="status"
                              placeholder="Select status"
                              value={status}
                              onChange={(e) =>
                                handleStatusChange(e.target.value)
                              }
                            >
                              <MenuItem value={"enable"}>Enable</MenuItem>
                              <MenuItem value={"disable"}>Disable</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <div className="faqanswer">
                          <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            maxRows={3}
                            style={{
                              ...TextFieldStyle,
                              borderColor: formik.errors?.faq_answer
                                ? "#e74c3c"
                                : "rgba(0, 0, 0, 0.23)",
                              marginTop: 0,
                              color: "#000",
                            }}
                            sx={{
                              padding: "0 !important",
                              height: "auto !important",
                            }}
                            placeholder="Enter your answer"
                            name="faq_answer"
                            value={formik.values.faq_answer}
                            autoComplete="off"
                            onChange={(e) => {
                              const trimmedValue = e.target.value.replace(
                                /^\s+/,
                                ""
                              );
                              formik.setFieldValue("faq_answer", trimmedValue);
                              formik.setFieldError("faq_answer", "");
                            }}
                            helperText={`${formik.errors?.faq_answer ?? ""}`}
                            error={formik.errors?.faq_answer ? true : false}
                          />
                        </div>

                        <FAQButtonContainer>
                          <Blackoutlinebtn
                            disabled={buttonLoader}
                            borderRadius={"6px"}
                            height={"28px"}
                            onClick={() => {
                              formik.resetForm();
                              setAddMore(false);
                              setStatus("enable");
                            }}
                          >
                            Cancel
                          </Blackoutlinebtn>
                          <Redoutlinebtn
                            type="submit"
                            borderRadius={"6px"}
                            height={"28px"}
                            disabled={buttonLoader}
                          >
                            {buttonLoader ? (
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
                        </FAQButtonContainer>
                      </AddFAQFieldContainer>
                    </form>
                  </Grid>
                </Grid>
              )}
              {loader ? (
                <>
                  {List.map((v, i) => (
                    <FaqSkeleton key={i} />
                  ))}
                </>
              ) : (
                <>
                  {faqList.length > 0 ? (
                    faqList.map((value, index) => (
                      <>
                        <CustomizedAccordion
                          key={index}
                          expanded={expand === index}
                          // onClick={() => {
                          //   handleAccordionClick(index);
                          // }}
                          // onClick={() => {
                          //   if (!editIndex.includes(index)) {
                          //     handleAccordionClick(index);
                          //   }
                          // }}
                        >
                          <AccordionSummary
                            sx={{
                              margin: "0px",
                              minHeight: "48px !important",
                              backgroundColor: "transparent !important",
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                              "& .MuiAccordionSummary-content": {
                                backgroundColor: "transparent",
                                margin: "0px !important",
                              },
                              "&.Mui-expanded": {
                                "&:hover": {
                                  backgroundColor: "transparent",
                                },
                              },
                            }}
                            className="faq_col"
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            {!editIndex.includes(index) ? (
                              <Box sx={{ width: "100%" }}>
                                <CreatedUpdatedOuterBox>
                                  <CreatedUpdatedInnerBox>
                                    <CreatedUpdatedBox>
                                      <Typography>Created:</Typography>
                                      <AnswerContainer
                                        sx={{
                                          textTransform: "capitalize",
                                          margin: "0px 0 0 0",
                                          fontSize: "11px",
                                          color: "#231F20",
                                          // padding: "2px 8px",
                                          padding: "2px 18px 2px 0",
                                          borderRadius: "4px",
                                          fontWeight: "400",
                                          "@media screen and (max-width:320px)":
                                            {
                                              fontSize: "10px",
                                            },
                                        }}
                                      >
                                        {moment(value?.created_at).format(
                                          "DD-MMMM-yyyy hh:mm A"
                                        )}
                                      </AnswerContainer>
                                    </CreatedUpdatedBox>

                                    {value.updated_at && (
                                      <CreatedUpdatedBox>
                                        <Typography>Updated:</Typography>
                                        <AnswerContainer
                                          sx={{
                                            textTransform: "capitalize",
                                            margin: "0px 10px 0 0",
                                            fontSize: "11px",
                                            // background: "#fff7e7",
                                            color: "#231F20",
                                            padding: "2px 8px 0 0",
                                            borderRadius: "4px",
                                            "@media screen and (max-width:320px)":
                                              {
                                                fontSize: "10px",
                                              },
                                          }}
                                        >
                                          {moment(value?.updated_at).format(
                                            "DD-MMMM-yyyy hh:mm A"
                                          )}
                                        </AnswerContainer>
                                      </CreatedUpdatedBox>
                                    )}

                                    <CreatedUpdatedBox>
                                      <Typography>Status:</Typography>
                                      <AnswerContainer
                                        sx={{
                                          textTransform: "capitalize",
                                          margin: "0px 10px 0 0",
                                          fontSize: "11px",
                                          backgroundColor: `${
                                            value?.status === "enable"
                                              ? "#34a853"
                                              : "#e04b51"
                                          }`,
                                          color: `${
                                            value?.status === "enable"
                                              ? "#fff"
                                              : "#fff"
                                          }`,
                                          padding: "4px 8px",
                                          borderRadius: "4px",
                                          "@media screen and (max-width:320px)":
                                            {
                                              fontSize: "10px",
                                            },
                                        }}
                                      >
                                        {value?.status}
                                      </AnswerContainer>
                                    </CreatedUpdatedBox>
                                  </CreatedUpdatedInnerBox>
                                  <Box
                                    sx={{
                                      alignItems: "center",
                                      marginLeft: "auto",
                                      display: "none",
                                      "@media screen and (max-width:600px)": {
                                        display: "block",
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <PencilIcon1>
                                        <LightTooltip
                                          placement="top"
                                          title="Edit"
                                          arrow
                                          disableInteractive
                                        >
                                          <Image
                                            style={{
                                              fontSize: "18px",
                                              cursor: "pointer",
                                              color: "#FF1A43",
                                            }}
                                            src={"/assets/EditPencil.svg"}
                                            layout="fill"
                                            alt="editImage"
                                            onClick={(e) => {
                                              setAddMore(false);
                                              setExpand(index);
                                              setEditIndex((prev) => [index]);
                                            }}
                                          />
                                        </LightTooltip>
                                      </PencilIcon1>{" "}
                                      <LightTooltip
                                        placement="top"
                                        title="Delete"
                                        arrow
                                        disableInteractive
                                      >
                                        <DeleteButtonLink
                                          style={{
                                            fontSize: "18px",
                                            cursor: "pointer",
                                            color: "#D7282F",
                                          }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteConfirmation(true);
                                            setItemIndex(index);
                                          }}
                                        />
                                      </LightTooltip>
                                    </Box>
                                  </Box>
                                </CreatedUpdatedOuterBox>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <QuestionContainer
                                    onClick={() => {
                                      if (!editIndex.includes(index)) {
                                        handleAccordionClick(index);
                                      }
                                    }}
                                    sx={{
                                      paddingRight: "35px",
                                      // width: "95%",
                                      // width: "max-content",
                                      maxWidth: "95%",
                                      display: "inline-block",
                                      padding: "1px 0px 10px",
                                      "@media screen and (max-width:600px)": {
                                        width: "100%",
                                      },
                                    }}
                                  >
                                    {value.faq_title}
                                  </QuestionContainer>

                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginLeft: "auto",
                                      "@media screen and (max-width:600px)": {
                                        display: "none",
                                      },
                                    }}
                                  >
                                    <PencilIcon1>
                                      <LightTooltip
                                        placement="top"
                                        title="Edit"
                                        arrow
                                        disableInteractive
                                      >
                                        <Image
                                          style={{
                                            fontSize: "18px",
                                            cursor: "pointer",
                                            color: "#FF1A43",
                                          }}
                                          src={"/assets/EditPencil.svg"}
                                          layout="fill"
                                          alt="editImage"
                                          onClick={(e) => {
                                            setAddMore(false);
                                            setExpand(index);
                                            setEditIndex((prev) => [index]);
                                          }}
                                        />
                                      </LightTooltip>
                                    </PencilIcon1>{" "}
                                    <LightTooltip
                                      placement="top"
                                      title="Delete"
                                      arrow
                                      disableInteractive
                                    >
                                      <DeleteButtonLink
                                        style={{
                                          fontSize: "18px",
                                          cursor: "pointer",
                                          color: "#D7282F",
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setDeleteConfirmation(true);
                                          setItemIndex(index);
                                        }}
                                      />
                                    </LightTooltip>
                                  </Box>
                                </Box>
                              </Box>
                            ) : (
                              <FaqInputField
                                defaultValue={value}
                                setEditIndex={setEditIndex}
                                index={index}
                                setFaqList={setFaqList}
                                faqList={faqList}
                                onSaveSubmit={onSaveSubmit}
                              />
                            )}
                          </AccordionSummary>
                          {!editIndex.includes(index) && (
                            <AccordionDetails
                              sx={{
                                "&.MuiAccordionDetails-root": {
                                  padding: "0px",
                                },
                              }}
                            >
                              <AnswerContainer>
                                {value.faq_answer}
                              </AnswerContainer>
                            </AccordionDetails>
                          )}
                        </CustomizedAccordion>
                      </>
                    ))
                  ) : (
                    <ThreeDots
                      height="40"
                      width="40"
                      radius="9"
                      color="white"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  )}

                  {!addMore && faqList.length === 0 && !loader && (
                    <EmptyPage
                      text={"FAQs"}
                      onClickHandler={() => setAddMore(true)}
                      logo="/assets/faq.svg"
                    />
                  )}
                </>
              )}
            </div>
          </OuterContainer>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FAQ;
