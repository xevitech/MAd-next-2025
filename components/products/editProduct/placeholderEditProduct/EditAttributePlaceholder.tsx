import {
  TextField,
  Button,
  Box,
  Autocomplete,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { getUserIdLocalStorage } from "@/components/common/common";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import EditSpecification from "../productInformation/EditSpecifcation";
import EditSpecificationPlaceholder from "./EditSpecificationPlaceholder";

export const EditAttributePlaceholder = ({
  data,
  handleAttributeValueChange,
  DeleteAttribute,
  formik,
  index,
  editChoice,
  specifcationTerm = [],
}) => {
  const { name, values, attribute_id: id } = data;

  const [showEditSection, setShowEditSection] = useState(true);

  let localFormik = useFormik({
    initialValues: { value: "" },
    onSubmit: () => {},
  });

  const showErrors = () => {
    if (formik?.errors?.choice_options?.[index]?.values) return true;
    else return false;
  };

  const firstLetterCapital = (str) => {
    return `${str}`.charAt(0).toUpperCase() + `${str}`.toLowerCase().slice(1);
  };

  const currentlyLoggedUserId = getUserIdLocalStorage();

  const editChoiceAndUpdateSpecList = (attribute_id, editedAttributeName) => {
    editChoice(attribute_id, editedAttributeName);
    setShowEditSection(true);
  };

  const handleEdit = (show) => {
    setShowEditSection(!showEditSection);
  };

  const hasSpecificationTerm = specifcationTerm?.length === 0;

  return (
    <div style={{ position: "relative" }} className="lala">
      {showEditSection ? (
        <>
          <>
            <span
              style={{
                paddingRight: "10px",
                fontWeight: 600,
                letterSpacing: "0.4px",
                color: "#1C1C1C",
                fontSize: "13px",
              }}
            >
              {firstLetterCapital(name)}{" "}
              <LightTooltip
                title="Required"
                arrow
                disableInteractive
                placement="top"
              >
                <Box component={"span"} sx={{ color: "#d7282f" }}></Box>
              </LightTooltip>
              <LightTooltip
                arrow
                title="Add related Terms Values, Levels, Options, Choices or Selections."
                disableInteractive
                placement="top-start"
              >
                <Box component="span" sx={{ padding: "0 0 0 4px" }}>
                  <img
                    src="/assets/helpIcon.svg"
                    alt=""
                    style={{ width: "12px" }}
                  />
                </Box>
              </LightTooltip>
            </span>
          </>
          <Autocomplete
            freeSolo
            fullWidth
            sx={{
              minWidth: "190px",
              margin: "0 0 8px 0",
              "@media screen and (max-width:480px)": { margin: "0 0 22px 0" },
            }}
            options={specifcationTerm || []}
            className="PlaceholderSize"
            // noOptionsText="Empty Term"
            popupIcon={null}
            value={values}
            disableClearable={hasSpecificationTerm}
            onChange={(event, newValue) => {
              handleAttributeValueChange(id, newValue || "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...localFormik.getFieldProps("value")}
                name={name}
                error={showErrors()}
                helperText={formik?.errors?.choice_options?.[index]?.values}
                placeholder="Option/Term"
                InputLabelProps={{ shrink: true }}
                className="PlaceholderSize"
                size="small"
                onChange={(e) => {
                  if (e.target.value.trim() !== "") {
                    handleAttributeValueChange(id, e.target.value);
                  } else {
                    handleAttributeValueChange(id, "");
                  }
                }}
              />
            )}
          />
        </>
      ) : (
        <Box sx={{ minHeight: "20px" }}></Box>
      )}

      <Box
        sx={{
          position: `${showEditSection ? "absolute" : ""}`,
          top: "25px",
          right: 0,
          "& .editIcon": {
            position: "absolute",
            right: "-8px",
            bottom: "-8px",
            top: "20px",
            cursor: "pointer",
          },
          "& .saveIcon": {
            position: "absolute",
            right: "-9px",
            top: "20px",
            bottom: "-8px",
            height: "20px !important",
            width: "20px !important",
            borderRadius: "50%",
            backgroundColor: "#fff",
            border: "1px solid #ededed",
            minWidth: "20px !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": { backgroundColor: "#ebebeb" },
          },
        }}
      >
        <Button
          onClick={() => {
            DeleteAttribute(id);
          }}
          style={{
            height: "fit-content",
            textTransform: "none",
            padding: "0",
            backgroundColor: "#fff",
            background: "transparent",
            color: "#DD484E",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            width: "fit-content",
            minWidth: "26px",
            borderRadius: "100%",
            position: "absolute",
            right: "-9px",
            top: "-8px",
          }}
        >
          {" "}
          {showEditSection && (
            <LightTooltip
              arrow
              placement="top"
              disableInteractive
              title="Delete"
            >
              <span
                style={{
                  position: "relative",
                  display: "flex",
                  width: "20px",
                  height: "20px",
                  borderRadius: "100%",
                  background: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #ededed",
                }}
              >
                <DeleteOutlineIcon
                  style={{ fontSize: "14px" }}
                ></DeleteOutlineIcon>
              </span>
            </LightTooltip>
          )}{" "}
        </Button>
        {data.user_id === currentlyLoggedUserId && (
          <EditSpecificationPlaceholder
            data={data}
            editChoice={editChoiceAndUpdateSpecList}
            handle={handleEdit}
            sx={{}}
          />
        )}
      </Box>
    </div>
  );
};
