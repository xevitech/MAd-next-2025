import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MinimizeOutlinedIcon from "@mui/icons-material/MinimizeOutlined";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {
  BottomButton,
  ComposeMailOuter,
  ContentSection,
  EmailBox,
  EmailBtnContainer,
  EmailFormData,
  EmailOuterContainer,
  EmailStyledTextarea,
  GridItem,
  GridRow,
  MessageHeading,
  SchduledHeading,
  StylePopOver,
} from "../style";
import {
  OutLinedButton,
  SmallBlackOutineBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
} from "../commonStyle";
import { FormHelperText, Grid, Link, TextField } from "@mui/material";
import { CustomDatePicker } from "../../common/datePicker";
import {
  setShowButtonsAsperDataChecked,
  setSelectedDataIds,
  setSelectedDataEmail,
  sendEmailOrSchedule,
  setComposeEmailPopUp,
  setEmailViewType,
  getAllListOfEmails,
  createHistory,
} from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
import { EDITOR_API_KEY } from "@/utils/staticValues";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ComposeEmail = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const editorRef = useRef(null);
  const {
    typeId,
    selectedDataIds,
    emailIdToSender,
    saveLoader,
    draftData,
    details,
  } = useSelector((state: any) => state.formList);
  const dispatch = useAppDispatch();
  const [subject, setSubject] = useState(draftData ? draftData.subject : "");
  const [subjectError, setSubjectError] = useState(
    draftData ? draftData.body : ""
  );

  const [body, setBody] = useState("");
  const [scheduleOn, setScheduleOn] = useState(0);
  const [datetime, setDateTime] = useState(
    moment(new Date()).format("ddd MMM DD YYYY HH:mm:ss")
  );
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScheduleMail = async () => {
    if (subject == "") {
      setSubjectError("Please enter subject");
    } else {
      props.type != "popup" && (await dispatch(setEmailViewType(0)));
      handleClose();
      handleSendEmail(0);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleBody = (event) => {
    setBody(event);
  };

  const handleScheduleOn = (value) => {
    setScheduleOn(value);
  };
  const handleChangeDateTime = (newValue) => {
    setDateTime(newValue);
  };

  const handleSendEmail = async (type) => {
    if (subject == "") {
      setSubjectError("Please enter subject");
    } else {
      setSubjectError("");
      let payloads = {
        from: JSON.parse(localStorage.getItem("userData"))?.email,
        to: props?.reciver,
        subject: subject,
        description: body,
        attachment_id: "",
        type_id: typeId,
        crm_unique_id: props?.unique_id,
        status: open ? "schedule" : type == 1 ? "draft" : "pending",
        schedule_on:
          scheduleOn == 1 && open
            ? moment(datetime).add(1, "hour").format("YYYY-MM-DD HH:mm:ss")
            : scheduleOn == 2 && open
            ? moment(datetime).format("YYYY-MM-DD HH:mm:ss")
            : "",
      };

      let response = await dispatch(sendEmailOrSchedule(payloads));
      if (response?.payload?.status == 200) {
        if (selectedDataIds?.length == 0) {
          dispatch(getAllListOfEmails());
          dispatch(
            createHistory({
              lead_id: props?.unique_id ? props?.unique_id : details.unique_id,
              name: "Email",
              type: "email",
              type_id: typeId,
              message: open
                ? `<span>Email Scheduled - </span> at ${
                    scheduleOn == 1 && open
                      ? moment(datetime)
                          .add(1, "hour")
                          .format("YYYY-MM-DD HH:mm A")
                      : scheduleOn == 2 && open
                      ? moment(datetime).format("YYYY-MM-DD HH:mm A")
                      : ""
                  } with <b>${props?.reciver}</b> regarding <i>${subject}</i> `
                : type == 1
                ? `<span>Email - </span> saved in draft for <b>${props?.reciver}</b> regarding <i>${subject}</i> `
                : `<span>Email Sent - </span> to <b>${props?.reciver}</b> regarding <i>${subject}</i> `,
            })
          );
        }
        type != 1 && toast.success(response?.payload?.message);
        dispatch(setComposeEmailPopUp(false));
        dispatch(setEmailViewType(0));
      }
    }
  };
  return (
    <>
      <EmailOuterContainer type={props.type}>
        <ComposeMailOuter>
          {props.type != "popup" && (
            <MessageHeading>
              <Typography>New message</Typography>
              <Box>
                <Link underline="none">
                  {" "}
                  <Image
                    src="/assets/images/crm/close_tab.svg"
                    alt="Edit"
                    width={30}
                    height={"20"}
                    onClick={() => {
                      dispatch(setEmailViewType(0));
                      handleSendEmail(1);
                    }}
                  />
                </Link>
              </Box>
            </MessageHeading>
          )}
          <EmailFormData>
            <EmailBox>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Input
                      id="standard-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">From:</InputAdornment>
                      }
                      value={
                        JSON.parse(localStorage.getItem("userData"))?.email
                      }
                      disabled
                    />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <Input
                      id="standard-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">To:</InputAdornment>
                      }
                      value={props?.reciver}
                    />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <Input
                      id="standard-adornment-amount"
                      placeholder="Add a subject"
                      onChange={handleSubject}
                      value={subject}
                      error={subjectError != "" ? true : false}
                    />
                    {subjectError != "" && (
                      <FormHelperText id="my-helper-text">
                        Please enter subject.
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <Editor
                      apiKey={EDITOR_API_KEY}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      value={body}
                      onEditorChange={(e, q) => handleBody(q.getContent())}
                      init={{
                        init_instance_callback: function (editor) {
                          var freeTiny: any = document.querySelector(
                            ".tox .tox-notification--in"
                          );
                          if (freeTiny?.style) freeTiny.style.display = "none";
                        },
                        autoresize_overflow_padding: 10,
                        padding: "2",
                        ui_mode: "split",
                        branding: false,
                        height: "400",
                        menubar: true,
                        font_family_formats: "Open Sans=open-sans,",
                        block_formats:
                          "Paragraph=p; div=div; Blockquote=blockquote; Pre=pre",
                        style_formats: [
                          {
                            title: "Headers",
                            items: [
                              { title: "Heading 2", block: "h2" },
                              { title: "Heading 3", block: "h3" },
                              { title: "Heading 4", block: "h4" },
                              { title: "Heading 5", block: "h5" },
                              { title: "Heading 6", block: "h6" },
                            ],
                          },
                        ],
                        plugins: [
                          // "autoresize",
                          "advlist",
                          "autolink",
                          "lists",
                          "charmap",
                          "preview",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "wordcount",
                          "duplicate",
                        ],
                        // autoresize_max_height: 300,
                        // autoresize_height: 500,
                        toolbar:
                          "undo redo | image code | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat",
                        content_style:
                          " /components/products/editProduct/SmartEditing/style.module.css; @import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,300,400,700); body {padding: 30px;  font-family: 'Open Sans', sans-serif;}",

                        content_css: [
                          "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
                          "/components/products/editProduct/SmartEditing/style.module.css",
                          "/style.css",
                        ],
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <EmailBtnContainer>
                {props.type == "popup" && (
                  <SmallBlackOutineBtn
                    variant="outlined"
                    aria-describedby={id}
                    onClick={() => {
                      handleSendEmail(1);
                      dispatch(setComposeEmailPopUp(false));
                    }}
                    startIcon={<HighlightOffRoundedIcon />}
                  >
                    Close
                  </SmallBlackOutineBtn>
                )}

                <SmallBlackOutineBtn
                  variant="outlined"
                  aria-describedby={id}
                  onClick={handleClick}
                  startIcon={<AccessTimeIcon />}
                >
                  Schedule
                </SmallBlackOutineBtn>
                <StylePopOver
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  // onClose={handleClose}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                >
                  <SchduledHeading>
                    <AccessTimeIcon />
                    <Typography>Schedule</Typography>
                  </SchduledHeading>
                  <ContentSection>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <Grid container spacing={1}>
                          <GridRow item md={12}>
                            <FormControlLabel
                              value={scheduleOn}
                              control={
                                <Radio checked={scheduleOn == 1 && true} />
                              }
                              label="One hour from now"
                              onChange={() => handleScheduleOn(1)}
                            />
                          </GridRow>
                          <Grid item md={12}>
                            <Grid container spacing={2}>
                              <GridItem item md={12}>
                                <FormControlLabel
                                  value={scheduleOn}
                                  control={
                                    <Radio checked={scheduleOn == 2 && true} />
                                  }
                                  label="Custom"
                                  onChange={() => handleScheduleOn(2)}
                                />
                                <CustomDateTimePicker
                                  label={"Select Date"}
                                  value={datetime}
                                  mindate={datetime}
                                  handleChange={handleChangeDateTime}
                                  disabled={scheduleOn == 1 && true}
                                />
                              </GridItem>
                              <GridItem item md={12}>
                                <BottomButton>
                                  <SmallRedOutineBtn
                                    variant="outlined"
                                    startIcon={<CancelOutlinedIcon />}
                                    onClick={() => {
                                      handleScheduleMail();
                                    }}
                                  >
                                    Schedule and Send
                                  </SmallRedOutineBtn>
                                  <SmallBlackOutineBtn
                                    // variant="outlined"
                                    startIcon={<SendOutlinedIcon />}
                                    onClick={() => {
                                      handleClose();
                                    }}
                                  >
                                    Cancel
                                  </SmallBlackOutineBtn>
                                </BottomButton>
                              </GridItem>
                            </Grid>
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </ContentSection>
                </StylePopOver>

                <SmallRedOutineBtn
                  variant="outlined"
                  startIcon={<SendOutlinedIcon />}
                  onClick={() => handleSendEmail(0)}
                >
                  {saveLoader ? (
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
                    "Send"
                  )}
                </SmallRedOutineBtn>
              </EmailBtnContainer>
            </EmailBox>
          </EmailFormData>
        </ComposeMailOuter>
      </EmailOuterContainer>
    </>
  );
};

export default ComposeEmail;
