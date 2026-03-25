import React, { useState } from "react";
import {
  Box,
  ButtonBase,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
export const ForButton = styled(ButtonBase)({});

function FaqInputField({
  defaultValue,
  setEditIndex,
  setFaqList,
  index,
  faqList,
  onSaveSubmit,
}) {
  const validation = Yup.object().shape({
    faq_title: Yup.string().required("Please enter question").trim(),
    faq_answer: Yup.string().required("Please enter answer").trim(),
  });
  const updated_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  let formik = useFormik({
    initialValues: {
      faq_title: defaultValue?.faq_title ?? "",
      faq_answer: defaultValue?.faq_answer ?? "",
      status: defaultValue?.status ?? "",
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ faq_title, faq_answer, status }) => {
      const isDuplicate = faqList.some(
        (faq, i) =>
          i !== index && faq.faq_title.toLowerCase() === faq_title.toLowerCase()
      );
      if (isDuplicate) {
        formik.setFieldError(
          "faq_title",
          "It looks like this question is already in the FAQs. Try a different question."
        );
        return;
      } else {
        onSave(faq_title, faq_answer, status);
      }
    },
  });

  const onSave = (faq_title, faq_answer, status) => {
    let list = [...faqList];
    list[index].faq_title = faq_title;
    list[index].faq_answer = faq_answer;
    list[index].status = status;
    list[index].updated_at = updated_at;
    setFaqList(list);
    onSaveSubmit(list);
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    formik.setFieldValue("status", value);
  };

  const { faq_title, faq_answer, status } = formik.values;
  return (
    <form style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          margin: "8px 0px",
          width: "100%",
          "@media screen and (max-width: 900px)": {
            padding: "0 0 0 10px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            justifyContent: "space-between",
            "@media screen and (max-width: 900px)": {
              flexDirection: "column-reverse",
              gap: "10px",
              alignItems: "start",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              width: "70%",
              "@media screen and (max-width:900px)": {
                width: "100%",
              },
            }}
          >
            <TextField
              sx={{
                width: "100%",
                "@media screen and (max-width:900px)": { width: "100%" },
              }}
              size="small"
              name="faq_title"
              placeholder="Enter Your Question"
              value={faq_title}
              onChange={(e) => {
                formik.setFieldValue("faq_title", e.target.value),
                  formik.setFieldError("faq_title", "");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  formik.handleSubmit();
                }
              }}
              autoComplete="off"
              onClick={(e) => e.stopPropagation()}
              helperText={
                formik.errors.faq_title ? `${formik.errors.faq_title}` : ""
              }
              error={formik.errors.faq_title ? true : false}
            />
            <ForButton
              onClick={(e) => {
                e.stopPropagation();
                formik.handleSubmit();
              }}
            >
              <CheckCircleOutlineOutlinedIcon
                style={{
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              />
            </ForButton>
            <CancelOutlinedIcon
              style={{
                fontSize: "18px",
                cursor: "pointer",
                color: "#D7282F",
              }}
              onClick={() => setEditIndex([])}
            />
          </Box>
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
            </InputLabel>
            <Select
              size="small"
              value={status}
              onChange={(e) => {
                handleStatusChange(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  formik.handleSubmit();
                }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <MenuItem value={"enable"}>Enable</MenuItem>
              <MenuItem value={"disable"}>Disable</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Enter your answer"
          name="faq_answer"
          autoComplete="off"
          value={faq_answer}
          onChange={(e) => {
            if (e?.target?.value.length < 0) {
              formik.setFieldError("faq_answer", "");
            }
            formik.setFieldValue("faq_answer", e.target.value),
              formik.setFieldError("faq_answer", "");
          }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              formik.handleSubmit();
            }
          }}
          helperText={
            formik.errors.faq_answer ? `${formik.errors.faq_answer}` : ""
          }
          error={formik.errors.faq_answer ? true : false}
        />
      </Box>
    </form>
  );
}

export default FaqInputField;
