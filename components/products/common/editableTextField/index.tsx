import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Image from "next/image";
import { TextFieldHelperText, useStyles } from "./styles";
import _debounce from "lodash/debounce";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";

export const EditableTextField = (props) => {
  const {
    formik,
    placeholder,
    label,
    characterLimit = 0,
    error = false,
    numberOnly = false,
    helperText = "",
    handleChange,
    value,
    required,
    labelToolTipText,
    fieldToolTipText,
    charactersCount,
    name,
    multiline,
    rows,
    showCharactersCount,
    upperCharacterLimit,
    shrink,
    size,
    createpost = 0,
    onkeyDown,
    handleRemoveError = null,
    isCurrency = false,
    isReadOnly = false,
    onInput,
  } = props;
  const [state, setState] = useState<string>("");
  const { classes } = useStyles();
  const ShowError = (name) => {
    if (formik?.touched[name] && formik?.errors[name]) return true;
    else return false;
  };

  useEffect(() => {
    setState(value);
  }, [value]);

  const delayedQuery = React.useRef(
    _debounce((name, q) => formik.setFieldValue(name, q), 10)
  ).current;

  const onChangeHandler = (e) => {
    let { value, name } = e.target;
    if (handleRemoveError) {
      handleRemoveError();
    }
    const trimmedValue = value.trim();
    if (name == "name" && value.length > 180) {
      // formik.setFieldValue(
      //   "name",
      //   createpost === 1 ? value : "Max Characters Limit Reached!"
      // );
      formik.setFieldError("name", "Max Characters Limit Reached!");
      return;
    }
    formik.setFieldError(name, "");
    if (showCharactersCount) {
      if (value.length > upperCharacterLimit) {
        formik.setFieldTouched(name, true);
        formik.setFieldError(name, "Max Characters Limit Reached!");
        // let val = value.slice(0, upperCharacterLimit);
        // delayedQuery(name, val);
        if (name == "description") {
          formik.setFieldError(name, "Max Characters Limit Reached!");
          return;
        }
        return;
      } else {
        setState(value);
        delayedQuery(name, value);
      }
    }
    // else {
    if (numberOnly && value) {
      value = value.replace(/[^0-9.]/g, "");
      let regex = /^[0-9]*[.,]?[0-9]{0,3}$/;

      const decimalIndex = value.indexOf(".");
      if (decimalIndex !== -1) {
        value =
          value.substring(0, decimalIndex + 1) +
          value.substring(decimalIndex + 1).replace(/\./g, "");
      }

      formik.setFieldTouched(name, true);

      if (regex.test(value)) {
        let numericalValue = value.replace(/[.,]/g, "");
        let [beforeDecimal, afterDecimal] = value.split(/[.,]/);
        if (
          characterLimit &&
          numericalValue.length > characterLimit &&
          beforeDecimal.length > characterLimit
        ) {
          formik.setFieldTouched(name, true);
          formik.setFieldError(name, "Max Characters Limit Reached!");
          return;
        }
        if (afterDecimal && afterDecimal.length == 3) {
          formik.setFieldTouched(name, true);
          formik.setFieldError(
            name,
            "Max 2 digits allowed after the decimal point!"
          );
          return;
        }
        formik.setFieldError(name, "");
        setState(value);
        delayedQuery(name, value);
        return;
      }
    }

    // else {
    if (trimmedValue !== "") {
      setState(value);
      delayedQuery(name, value);
    } else {
      setState("");
      delayedQuery(name, "");
    }
    // }
    // }
    // }
  };
 
  return (
    <>
      <TextField
        style={{ width: "100%" }}
        {...formik?.getFieldProps(name)}
        size={size}
        value={formik ? state : value}
        name={name}
        multiline={multiline}
        rows={rows}
        onInput={onInput}
        // inputProps={{readOnly: true,   }}
        disabled={isCurrency}
        error={ShowError(name)}
        helperText={ShowError(name) ? formik?.errors[name] : ""}
        onKeyDown={onkeyDown}
        onChange={!formik ? handleChange : onChangeHandler}
        InputProps={{
          readOnly: isReadOnly,
          endAdornment: fieldToolTipText && (
            <InputAdornment position="start">
              <LightTooltip placement={"top"} title={fieldToolTipText} arrow>
                <InfoOutlinedIcon
                  style={{
                    color: "rgb(80, 183, 108)",
                    fontSize: "16px",
                  }}
                />
              </LightTooltip>
            </InputAdornment>
          ),
        }}
        //size="small"
        placeholder={placeholder}
        classes={{ root: classes.customTextField }}
        fullWidth
        label={
          label ? (
            <div>
              <span
                style={{
                  // paddingRight: "10px",
                  paddingRight: "5px",

                  fontWeight: 600,
                  letterSpacing: "0.4px",
                  color: "#1C1C1C",

                  fontFamily: "open sans",
                }}
              >
                {label}
              </span>

              {required && (
                <LightTooltip placement={"top"} title="Required!" arrow>
                  <span style={{ color: "#D7282F", paddingRight: "5px" }}>
                    *
                  </span>
                </LightTooltip>
              )}
              {labelToolTipText && (
                <LightTooltip
                  placement={"right"}
                  title={labelToolTipText}
                  arrow
                >
                  {
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "16px",
                        height: "16px",
                      }}
                    >
                      <Image
                        src={"/assets/helpIcon.svg"}
                        layout="fill"
                        alt="image"
                      />{" "}
                    </span>
                  }
                </LightTooltip>
              )}
            </div>
          ) : null
        }
        InputLabelProps={{ shrink: !shrink && true }}
      />
      {showCharactersCount && (
        <TextFieldHelperText>
          {" "}
          Maximum character{" "}
          {value
            ? value.length > 999
              ? 999
              : value.length
            : state
            ? state.length > 999
              ? 999
              : state.length
            : 0}
          /{upperCharacterLimit}{" "}
        </TextFieldHelperText>
      )}
    </>
  );
};
