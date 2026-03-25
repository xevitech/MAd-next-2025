import { ButtonContainer } from "@/components/CRM/style";
import {
  BlackCancelButton,
  FieldContainerAddContact,
  FloatingIconfield,
  FormControlData,
  ImageuploadIconField,
  LabelContainerAddContact,
  PersonNameCont,
  RedSaveButton,
  ValueContainerAddContact,
} from "@/components/CompanySettings/CompanyDetail/ContactPersonDetail/style";
import {
  ContentHeaderContainer,
  LeftContentContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { ContentContainer } from "@/components/CompanySettings/style";
import { SelectableTextField } from "@/components/products/common/selectableTextField";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { constantTypes } from "@/utils/AddProductPageSelectDropdownsData";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { fetchConstantsList } from "@/hooks/CalculatorReducer";

const EditDialogConstantPrices = (props) => {
  const { open, handleClose, formik, capitalizedUnits, id } = props;
  const [address, setAddress] = useState("");
  const [postFix, setPostFix] = useState("");
  const handleSave = () => {
    saveEditFields();
    handleClose();
  };

  const { passiveSpecList } = useSelector((state: any) => state.calculatorData);
  const filterData = passiveSpecList?.filter((item) => item.id == id);
  let name, value, type, unit, product_id;

  if (filterData.length > 0) {
    const firstItem = filterData[0];
    name = firstItem.name;
    value = firstItem.value;
    type = firstItem.type;
    unit = firstItem.unit;
    product_id = firstItem.product_id;
  }
  const dispatch = useDispatch();
  const handleCancel = () => {
    handleClose();
  };
  const saveEditFields = async () => {
    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("id", id);
    formData.append("constant_name", name);
    formData.append("constant_value", value);
    formData.append("constant_type", type);
    formData.append("published", "0");

    try {
      const response = await fetch(`${BASE_URL}/product/update/constants`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.status == 200) {
        dispatch(fetchConstantsList(product_id));
      }
    } catch (error) {}
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Constants Prices</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                value={name}
                label="Specification"
                placeholder="Enter Specification"
                // onChange={(e) => setName(e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Constant value"
                placeholder="Enter Constant value"
                value={value}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <FormControl sx={{ width: "100%" }} className="removepadding">
              <SelectableTextField
                style={{ minHeight: "20px", maxHeight: "20px" }}
                size="small"
                value={type}
                data={constantTypes}
                label="Postfix"
                name="postFix"
                placeholder="Select units"
                handleChange={(e) => {
                    formik.setFieldValue("post_value", e.target.value);
                    formik.setFieldError("post_value", "");
                    formik.setFieldValue("postFix_value", "");
                    setPostFix(e.target.value);
                }}
              ></SelectableTextField>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <WarningAmberOutlinedIcon
                  style={{
                    fontSize: "9px",
                    margin: "0px 4px 0 0",
                    color: "#d7282f",
                  }}
                />
                <Typography
                  sx={{ fontSize: "10px", color: "#d7282f !important" }}
                ></Typography>
              </Box>
            </FormControl>
          </Grid>
          {postFix == "Unit" && (
            <Grid item md={3}>
              <FormControl sx={{ width: "100%" }} className="removepadding">
                <SelectableTextField
                  size="small"
                   label="Units"
                  data={capitalizedUnits || []}
                  name={"postFixValue"}
                  value={formik.values.postFix_value}
                  handleChange={(e) => {
                    formik.setFieldValue("postFix_value", e.target.value);
                    formik.setFieldError("postFix_value", "");
                  }}
                  helperText={`${formik.errors?.postFix_value ?? ""}`}
                  error={formik.errors?.postFix_value ? true : false}
                ></SelectableTextField>
                {formik?.errors?.postFix_value && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <WarningAmberOutlinedIcon
                      style={{
                        fontSize: "9px",
                        margin: "0px 4px 0 0",
                        color: "#d7282f",
                      }}
                    />
                    <Typography
                      sx={{ fontSize: "10px", color: "#d7282f !important" }}
                    >
                      {formik.errors.postFix_value}
                    </Typography>
                  </Box>
                )}
              </FormControl>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialogConstantPrices;
