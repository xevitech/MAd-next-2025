import React, { useState, useEffect } from "react";
import {
  FormControl,
  styled,
  Button,
  Box,
  Grid,
  Typography,
  TableCell,
  Tooltip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { EditableTextField } from "@/components/products/common/editableTextField";
import { BASE_URL } from "@/utils/staticValues";
import { MyAppContext } from "contextApi/appContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Auth from "@/auth/Auth";
import Paper from "@mui/material/Paper";
import {
  AuxItem,
  AuxListContainer,
  BtnContainer,
  CancelBtn,
  CustomButton,
  DeleteIcon,
  Header,
  InputFieldsContainer,
  ListHeader,
  Name,
  OuterContainer,
  SaveBtn,
  SerialNo,
  Value,
} from "./styles";
import { ThreeDots } from "react-loader-spinner";
import SaveIcon from "@mui/icons-material/Save";
import {
  GridToolbarExport,
  GridToolbarColumnsButton,
  DataGridPro,
  GridEventListener,
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-license-pro";
import { useFormik } from "formik";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import * as Yup from "yup";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { StyledTableCell } from "../constantPrices/styles";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { specificationTextLength } from "@/components/common/common";
import ConstantListSkelton from "../constantPrices/ConstantsListSkelton";
import AuxilarySkeltonList from "./AuxilarySkeltonList";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export const AddAuxiliaryComponent = (props) => {
  const hideAuxComponent = props?.hideAux;
  const productId = props?.productId;
  const termId = props?.termId;

  const auxList = props?.auxList;
  const setAuxList = props?.setAuxList;
  const visibleInput = props.visibleInput;
  const setVisibleInput = props.setVisibleInput;
  // const [auxList, setAuxList] = useState<any>([]);
  const [auxId, setAuxId] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [addLoader, setAddLoader] = useState(false);
  const [ids, setId] = useState("");
  const [loader, setLoader] = useState(false);
  const [listingLoader, setListingLoader] = useState(false);
  const validation = Yup.object().shape({
    auxiliary_name: Yup.string().required("Please enter name"),
    auxiliary_price: Yup.string()
      .max(8, "Please limit the price to a maximum of 8 digits.")
      .matches(/^-?\d*\.?\d*$/, "")
      .required("Please enter price"),
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      setListingLoader(true);
      try {
        await getAuxList();
      } catch (error) {
      } finally {
        setListingLoader(false);
      }
    };

    fetchData();
  }, []);
  const [editFormikIndex, setEditFormikIndex] = useState(-1);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Only 50 character allowed")
      .required("Please enter name"),
    price: Yup.string()
      .matches(/^\d*\.?\d*$/, "Must be a numeric value")
      .max(8, "Please limit the price to a maximum of 8 digits.")
      .required("Please enter price"),
  });
  const edit_formik = useFormik({
    initialValues: {
      name: "",
      price: "",
    },
    validationSchema,
    onSubmit: (values) => {
      SaveAuxilaryValue(auxList[editIndex]?.id, values.name, values.price);
      setEditIndex(-1);
    },
  });

  let formik: any = useFormik({
    initialValues: {
      auxiliary_name: "",
      auxiliary_price: "",
    },
    validationSchema: validation,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const aux_value = auxList?.map((item) => item?.name);
      if (aux_value.includes(values?.auxiliary_name)) {
        formik.setFieldError(
          "auxiliary_name",
          "Please enter a unique value for the name."
        );
        return;
      } else {
        try {
          setListingLoader(true);
          const formData = new FormData();
          formData.append("product_id", productId);
          formData.append("term_id", termId);
          formData.append("name", values?.auxiliary_name);
          formData.append("value", values?.auxiliary_price);
          formData.append("published", "0");

          setAddLoader(true);
          const response = await fetch(`${BASE_URL}/product/auxiliary/create`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Auth.token()}`,
            },
            body: formData,
          });
          if (response.status == 200) {
            formik.setFieldValue("auxiliary_name", "");
            formik.setFieldValue("auxiliary_price", "");
            getAuxList();
            setAddLoader(false);
            setListingLoader(false);
            setVisibleInput(false);
          }
        } catch (error) {
          setAddLoader(false);
          setListingLoader(false);
          throw error;
        }
      }
    },
  });

  const getAuxList = async () => {
    try {
      setListingLoader(true);
      const formData = new FormData();
      formData.append("product_id", productId);
      formData.append("term_id", termId);
      const response = await fetch(`${BASE_URL}/product/auxiliary/list`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      if (response.status == 200) {
        const data = await response.json();
        setAuxList(data?.data);
        setListingLoader(false);
      }
    } catch {
      setListingLoader(false);
    }
  };

  const SaveAuxilaryValue = async (id, name, price) => {
    const alreadyValue = auxList.filter(
      (value) => value?.name === name && value?.id != ids
    );
    if (alreadyValue.length > 0) {
      edit_formik.setFieldError(
        "name",
        "Please enter a unique value for the auxiliary name."
      );
      return;
    }
    try {
      setListingLoader(true);
      const formData = new FormData();
      formData.append("product_id", productId);
      formData.append("id", ids);
      formData.append("term_id", termId);
      formData.append("name", name);
      formData.append("value", price);
      formData.append("published", "0");

      const response = await fetch(`${BASE_URL}/product/auxiliary/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      if (response.status == 200) {
        setLoader(false);
        setListingLoader(false);
        formik.setFieldValue("auxiliary_name", "");
        formik.setFieldValue("auxiliary_price", "");
        await getAuxList();
        setEditFormikIndex(-1);
      }
    } catch (error) {
      setLoader(false);

      setListingLoader(false);
      throw error;
    }
  };
  const deleteAux = async (auxId) => {
    const formData = new FormData();

    formData.append("product_id", productId);
    formData.append("term_id", termId);
    formData.append("auxiliary_id", auxId);
    formData.append("published", "0");
    try {
      setListingLoader(true);
      const response = await fetch(`${BASE_URL}/product/auxiliary/delete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      getAuxList();
    } catch (error) {
      setListingLoader(false);
    }
  };

  const handleDeleteSpec = async () => {
    await deleteAux(auxId);
    setDeleteConfirmation(false);
  };
  const handleSpecificationChange = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      edit_formik.handleSubmit;
    }
  };

  return (
    <div>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="auxiliary item"
          onClickAction={handleDeleteSpec}
        />
      )}
      <form onSubmit={formik.handleSubmit}>
        <InputFieldsContainer sx={{ p: 0 }}>
          {visibleInput && (
            <Grid
              container
              columnSpacing={2}
              alignItems={"start "}
              sx={{ padding: "0 0 6px 0" }}
            >
              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                <FormControl sx={{ width: "100%" }}>
                  <EditableTextField
                    placeholder="Enter name"
                    size="small"
                    value={formik.values.auxiliary_name}
                    handleChange={(e) => {
                      if (e?.target?.value?.startsWith(" ")) {
                        return;
                      }
                      if (e.target.value.length > specificationTextLength) {
                        formik.setFieldError(
                          "auxiliary_name",
                          "The content is too long. Please limit it to 50 characters."
                        );
                      } else {
                        formik.setFieldValue("auxiliary_name", e.target.value);
                        formik.setFieldError("auxiliary_name", "");
                      }
                    }}
                    helperText={`${formik.errors?.auxiliary_name ?? ""}`}
                    error={formik.errors?.auxiliary_name ? true : false}
                    onkeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        formik.handleSubmit();
                      }
                    }}
                  />
                  {formik?.errors?.auxiliary_name && (
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
                        {formik.errors.auxiliary_name}
                      </Typography>
                    </Box>
                  )}
                </FormControl>
              </Grid>
              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                <FormControl sx={{ width: "100%" }}>
                  <EditableTextField
                    size="small"
                    placeholder="Enter Price"
                    handleChange={(e) => {
                      const { value } = e.target;
                      const isValidNumber = /^-?\d*\.?\d*$/.test(value);
                      if (isValidNumber) {
                        formik.setFieldValue("auxiliary_price", value);
                        formik.setFieldError("auxiliary_price", "");
                      } else {
                        formik.setFieldValue(
                          "auxiliary_price",
                          formik.values.auxiliary_price
                        );
                        formik.setFieldError("auxiliary_price", "");
                      }
                    }}
                    value={formik.values.auxiliary_price}
                    onkeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        formik.handleSubmit();
                      }
                    }}
                    helperText={`${formik.errors?.auxiliary_price ?? ""}`}
                    error={formik.errors?.auxiliary_price ? true : false}
                  />
                  {formik?.errors?.auxiliary_price && (
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
                        {formik.errors.auxiliary_price}
                      </Typography>
                    </Box>
                  )}
                </FormControl>
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    margin: "4px 0 0 0",
                  }}
                >
                  {!addLoader ? (
                    <Box sx={{ cursor: "pointer" }}>
                      <CheckCircleIcon
                        sx={{ color: "#d7282f" }}
                        onClick={(e) => {
                          e.preventDefault();
                          formik.handleSubmit();
                        }}
                      />
                    </Box>
                  ) : (
                    <CircularProgress
                      style={{
                        color: "#DD484E",
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  )}
                  <Box sx={{ margin: "0px", cursor: "pointer" }}>
                    <CancelIcon
                      sx={{ color: "#d7282f" }}
                      onClick={() => {
                        setVisibleInput(false);
                        if (auxList.length == 0) {
                          hideAuxComponent();
                          setVisibleInput(true);
                        }
                        formik.setFieldValue("auxiliary_name", "");
                        formik.setFieldValue("auxiliary_price", "");
                        formik.setFieldError("auxiliary_name", "");
                        formik.setFieldError("auxiliary_price", "");
                      }}
                    ></CancelIcon>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </InputFieldsContainer>
      </form>
    </div>
  );
};
