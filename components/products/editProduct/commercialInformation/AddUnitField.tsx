import { apiClient, FirstletterCapital } from "@/components/common/common";
import React, { useEffect, useState } from "react";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import { ThreeDots } from "react-loader-spinner";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import poststyle from "components/products/editProduct/style.module.css";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";

function AddUnitField(props) {
  const {
    commercialUnitList,
    setCommercialUnitList,
    setValue,
    accordionValue = ''
  } = props;
  const [addUnit, setAddUnit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [unitName, setUnitName] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const onSubmitHandler = async () => {
    if (unitName === "") {
      setError(true);
      setErrorText("Please enter unit name");
      return;
    }
    setLoading(true);
    let response = await apiClient("product/unit", "post", {
      body: { name: unitName, is_common: 1 },
    });

    if (response.status == 200) {
        let response = await apiClient("unit", "get");
        setCommercialUnitList(
          response.data.map((v) => ({
            view: FirstletterCapital(v.name),
            value: v.id,
          }))
        );
      
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons.fire({
        title: "Success",
        text: "Unit successfully added. You will receive a notification after admin approval.",
        icon: "success",
        showCancelButton: false,
        reverseButtons: true,
      });

      setValue(unitName)
      setAddUnit(false);
    } else {
      if (response.message) {
        setError(true);
        setErrorText(response.message);
        setValue(unitName)
      }
      // const swalWithBootstrapButtons = Swal.mixin({
      //   customClass: {
      //     confirmButton: "custom-btn cancel-button",
      //     cancelButton: "custom-btn remove-btn",
      //   },
      //   buttonsStyling: false,
      // });

      // swalWithBootstrapButtons.fire({
      //   title: "Error",
      //   text: response?.message?.[0],
      //   icon: "error",
      //   showCancelButton: false,
      //   reverseButtons: true,
      // });
    }
    setLoading(false);
    setUnitName("");
  };

  const CloseAddUnit = () => {
    setUnitName("");
    setError(false);
    setErrorText("");
    setLoading(false);
    setAddUnit(false);
  };

  useEffect(() =>{
    if(addUnit && accordionValue != "commercial"){
      setUnitName("");
      setError(false);
      setErrorText("");
      setLoading(false);
      setAddUnit(false);
    }
  }, [accordionValue])

  return (
    <>
      <span
        className={poststyle.add_brand_txt}
        onClick={(e) => {
          e.preventDefault();
          setAddUnit(true);
        }}
      >
        <span style={{}}> + </span> Add Unit
      </span>
      {addUnit && (
        <span className={poststyle.add_brand_field}>
          <TextField
            value={unitName}
            onChange={(e) => {
              if (!/\d/g.test(e.target.value)) {
                setUnitName(e.target.value);
              }
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
            placeholder="Enter Name"
            error={error}
            helperText={errorText}
          ></TextField>
          <BtnFilled
            className={poststyle.add_btn}
            onClick={(e) => {
              e.preventDefault();
              onSubmitHandler();
            }}
          >
            {loading ? (
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              "Add"
            )}
          </BtnFilled>
          <Button
            className={poststyle.addbrand_cross}
            onClick={(e) => {
              e.preventDefault();
              CloseAddUnit();
            }}
            color="error"
          >
            <CloseOutlinedIcon
              style={{ cursor: "pointer", fontSize: "18px" }}
            />
          </Button>
        </span>
      )}
    </>
  );
}

export default AddUnitField;
