import React, { useEffect, useState } from "react";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import { ThreeDots } from "react-loader-spinner";
import { Box, Button, TextField } from "@mui/material";
import { apiClient, getProductId } from "@/components/common/common";
import poststyle from "components/products/editProduct/style.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";

function EditSpecification({ data, editChoice, handle }: any) {
  const { attribute_id } = data || {};
  const [showeditSection, setShoweditSection] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editedAttributeName, setUnitName] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const productId: string = getProductId();

  useEffect(() => {
    setUnitName(data?.name.trim());
  }, [data?.name]);

  const onSubmitHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", editedAttributeName.trim());
    formData.append("id", attribute_id);

    let response = await apiClient(
      "attributes/edit ",
      "post",
      {
        body: formData,
      },
      true
    );

    if (response?.status === 200) {
      setLoading(false);
      setShoweditSection(false);
      editChoice(attribute_id, editedAttributeName.trim());
    }

    let formDatas = new FormData();
    const datas = [
      {
        attribute_id: data?.attribute_id,
        values: data?.values,
        name: editedAttributeName,
        options: data?.options ? data?.options : [],
      },
    ];
    formDatas.append("choice_options", JSON.stringify(datas));
    formDatas.append("id", productId);
    formDatas.append("published", "0");
    formDatas.append("last_update", "Technical Specification");

    await apiClient(
      "product/view/single/update",
      "post",
      { body: formDatas },
      true
    );
  };

  return (
    <>
      {!showeditSection && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            setShoweditSection(true);
            handle(showeditSection);
          }}
          style={{
            height: "fit-content",
            textTransform: "none",
            padding: "0",
            background: "transparent",
            color: "#DD484E",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            width: "fit-content",
            minWidth: "26px",
            borderRadius: "100%",
          }}
          className="editIcon"
        >
          <span
            style={{
              position: "relative",
              display: "flex",
              width: "20px",
              height: "20px",
              borderRadius: "100%",
              background: "#ffd1d3",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              border: "1px solid #ededed",
            }}
          >
            <LightTooltip arrow disableInteractive placement="top" title="Edit">
              <EditOutlinedIcon style={{ fontSize: "14px" }}></EditOutlinedIcon>
            </LightTooltip>
          </span>{" "}
        </Button>
      )}
      {showeditSection && (
        <span>
          <TextField
            value={editedAttributeName}
            onChange={(e) => {
              const { value } = e?.target;
              if (value?.length <= 50) setUnitName(value);
              setError(false);
              setErrorText("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSubmitHandler();
              }
            }}
            size="small"
            placeholder=""
            error={error}
            helperText={errorText}
            fullWidth
          ></TextField>
          <Box
            sx={{ top: "44px !important", position: "absolute" }}
            className={`${poststyle.add_btn} saveIcon`}
            onClick={(e) => {
              e.preventDefault();
              onSubmitHandler();
            }}
          >
            <LightTooltip arrow disableInteractive placement="top" title="Save">
              <CheckOutlinedIcon
                sx={{ color: "#d7282f !important", fontSize: "18px" }}
              />
            </LightTooltip>
          </Box>
          <Button
            sx={{ position: "absolute", top: "16px !important" }}
            className={poststyle.addbrand_cross}
            onClick={(e) => {
              e.preventDefault();
              setShoweditSection(false);
              handle(showeditSection);
            }}
            color="error"
          >
            <LightTooltip
              arrow
              disableInteractive
              placement="top"
              title="Close"
            >
              <CloseOutlinedIcon
                style={{ cursor: "pointer", fontSize: "18px" }}
              />
            </LightTooltip>
          </Button>
        </span>
      )}
    </>
  );
}

export default EditSpecification;
