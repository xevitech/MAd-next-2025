import React, { useState, useEffect } from "react";
import { EditableTextField } from "@/components/products/common/editableTextField";
import { SelectableTextField } from "@/components/products/common/selectableTextField";
import FormControl from "@mui/material/FormControl";
import {
  Autocomplete,
  Backdrop,
  Box,
  CircularProgress,
  createFilterOptions,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableHead from "@mui/material/TableHead";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import TableRow from "@mui/material/TableRow";
// import useProductContext from "@/hooks/useProductContext";
import { ThreeDots } from "react-loader-spinner";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  ConstantAction,
  FieldsContainer,
  OuterContainer,
  StyledTableCell,
} from "./styles";
import { Grid } from "@mui/material";
import {
  HeaderCustomSpecs,
  HeaderMainText,
  HeaderSubText,
} from "../customSpecs/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConstantsList,
  listMatrix,
  setCommercialInfoUnits,
} from "@/hooks/CalculatorReducer";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ConstantListSkelton from "./ConstantsListSkelton";
import { useRouter } from "next/router";
import { getProductId } from "@/components/common/common";
import { SelectChangeEvent } from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "@/components/common/commonStyle";
import CustomDialogue from "@/components/common/customAlert/CustomDialogue1";
// import { DataGridStyle } from "../common/commonStyle";
const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#f5f5f5",
        },
        colorPrimary: {
          "&.Mui-checked": {
            color: "#D7282F",
          },
          MuiCssBaseline: {
            "@global": {
              ".Mui-disabled": { opacity: 0.5 },
              ".Mui-selected": { background: "red" },
            },
          },
        },
        track: {
          opacity: 0.38,
          backgroundColor: "#000",
          ".Mui-checked.Mui-checked + &": {
            opacity: 0.7,
            backgroundColor: "#a5a5a5",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: "error",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        color: "error",
      },
    },
    MuiTypography: {
      defaultProps: {},
    },
  },
});
export const ConstantPrices = (percentage) => {
  // const { productId: id } = useProductContext();

  const productId: string = getProductId();
  useEffect(() => {
    dispatch(fetchConstantsList(productId));
  }, [productId]);

  useEffect(() => {
    setCompleteScreenLoader(false);
    getUnits();
    dispatch(fetchConstantsList(productId));
  }, [productId]);
  const [deleteProgressLoader, setDeleteProgressLoader] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<any>({
    popup: false,
  });
  const [editConfirmation, setEditConfirmation] = useState<any>({
    popup: false,
  });
  const [confirmationMessage, setShowCofirmationMessage] = useState<string>("");
  const [loader, setCompleteScreenLoader] = useState(true);
  const [specId, setSpecificDeleteId] = useState("");
  const [deleteId, setDeletedId] = useState("");
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState(-1);
  const [status, setStatus] = useState("Activate");
  const [saveLoader, setSaveLoader] = useState(false);
  const [ids, setId] = useState("");
  const [listingLoader, setListingLoader] = useState(false);
  const [preConstValue, setPreConstValue] = useState<any>("");
  const [shouldRefetchatrixList, setShoulRefetchMatrixList] = useState(false);

  const { passiveSpecList } = useSelector((state: any) => state.calculatorData);

  const [constantType, setConstantType] = React.useState("0");

  const { commercialInfoCurrencies, commercialInfoUnits, productDetail } =
    useSelector((state: any) => state.editProduct);

  const [parameterList, setParameterList] = useState<any>([]);
  const [parameterOptions, setParameterOpions] = React.useState<any>([]);

  const [unitsList, setUnitsList] = useState<any>([]);
  const [parameterUnitsOptions, setParameterUnitsOpions] = React.useState<any>(
    []
  );
  const defaultValue =
    parameterUnitsOptions.length > 0 ? parameterUnitsOptions?.[2] : "unit";

  const [editState, setEditState] = useState({ isEdit: false, id: "" });

  useEffect(() => {
    if (unitsList?.length > 0) {
      const filteredUnit = Array.from(
        new Set(unitsList?.map((unit) => unit?.name))
      );
      setParameterUnitsOpions(filteredUnit);
    }
    if (parameterList.length > 0) {
      setParameterOpions(parameterList?.map((param) => param?.name));
    }
  }, [unitsList, parameterList]);

  const setFormikError = (value = "", formik, name, errorMessage) => {
    if (value == "") {
      formik.setFieldError(name, errorMessage);
      return true;
    } else {
      formik.setFieldError(name, "");
      return false;
    }
  };

  const validation = Yup.object().shape({
    constant_name: Yup.string(),
    // .required("Please enter specification"),
    constant_value: Yup.string()
      .max(8, "Only 8 digits are allowed")
      .matches(/^-?\d*\.?\d*$/, ""),
    // .required("Please enter constant value"),
    currency: Yup.string(),
    // .required("Please select currency"),
    constant_unit: Yup.string(),
    parameter: Yup.string(),
    parameterUnit: Yup.string(),
    // .required("Please select units"),

    //   .when("post_value", {
    //   is: (val) => val === "Unit",
    //   then: Yup.string().required("Please select units"),
    //   otherwise: Yup.string(),
    // }),
  });

  useEffect(() => {
    const resetFormikError = (formik, name) => {
      formik.setFieldError(name, "");
    };

    resetFormikError(formik, "constant_name");
    resetFormikError(formik, "constant_value");

    resetFormikError(formik, "currency");
    resetFormikError(formik, "constant_unit");

    resetFormikError(formik, "parameter");
    resetFormikError(formik, "parameterUnit");
  }, [constantType]);

  let formik: any = useFormik({
    initialValues: {
      specifications: "",
      constant_name: "",
      constant_value: "",
      constant_unit: "6",
      post_value: "Currency",
      postFix_value: "",
      currency: productDetail?.currency_id ?? "1",
      parameter: "",
      parameterUnit: "",
    },
    validationSchema: validation,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const { parameterUnit, parameter } = values;
        const endsWithDot = values?.constant_value.endsWith(".");
        if (endsWithDot) {
          formik.setFieldError(
            "constant_value",
            "Please enter valid constant value"
          );
          return;
        }
        const alreadyValue = passiveSpecList.filter(
          (value) => value?.name === values?.constant_name
        );
        // if (alreadyValue.length !== 0) {
        //   formik.setFieldError(
        //     "constant_name",
        //     "Please enter a unique value for the specification."
        //   );
        //   return;
        // }

        const formData = new FormData();
        formData.append("product_id", productId);
        formData.append("status", status);
        formData.append("published", "0");

        let error = false;
        if (constantType === "1") {
          error = setFormikError(
            values?.constant_name,
            formik,
            "constant_name",
            "Constant name is required"
          );
          error = setFormikError(
            values?.constant_value,
            formik,
            "constant_value",
            "Please enter value"
          );

          error = setFormikError(
            values?.currency,
            formik,
            "currency",
            "Please select value"
          );
          error = setFormikError(
            values?.constant_unit,
            formik,
            "constant_unit",
            "Please select value"
          );

          if (error) {
            return;
          }
        } else if (constantType === "2") {
          error = setFormikError(
            values?.constant_name,
            formik,
            "constant_name",
            "Parameter name is required"
          );
          error = setFormikError(
            values?.constant_value,
            formik,
            "constant_value",
            "Please enter value"
          );

          error = setFormikError(
            parameter,
            formik,
            "parameter",
            "Please select value"
          );
          error = setFormikError(
            parameterUnit,
            formik,
            "parameterUnit",
            "Please select value"
          );
          if (error) {
            return;
          }
        }
        if (!values?.constant_name || !values?.constant_value) {
          return;
        }

        formData.append("constant_name", values?.constant_name.trim());
        formData.append("constant_value", values?.constant_value.trim());
        formData.append("constant_type", constantType);

        if (constantType === "1") {
          formData.append("currency", `${values?.currency}`);
          // if (values.post_value === "Unit") {
          formData.append("constant_unit", `${values?.constant_unit}`);
          // return;
          // }
        } else if (constantType === "2") {
          if (!parameter || !parameterUnit) {
            return;
          }
          formData.append("constant_unit", "");

          if (parameter) {
            const isParamExist = parameterList.find(
              (param) => param?.name.toLowerCase() == parameter.toLowerCase()
            );
            if (!isParamExist) {
              formData.append(" is_unit_parameter_name", `${parameter.trim()}`);
              formData.append("is_unit_parameter_new", `${true}`);
              formData.append("unit_parameter_id", "");
            } else {
              formData.append("is_unit_parameter_name", `${parameter}`);
              formData.append("is_unit_parameter_new", `${false}`);
              formData.append("unit_parameter_id", `${isParamExist?.id}`);
            }
          }
          if (parameterUnit) {
            const isParamUnitExist = unitsList.find(
              (unit) => unit?.name.toLowerCase() == parameterUnit.toLowerCase()
            );
            if (!isParamUnitExist) {
              formData.append("is_unit_name", `${parameterUnit.trim()}`);
              formData.append("is_unit_new", `${true}`);
              formData.append("unit_id", "");
            } else {
              formData.append("is_unit_name", `${parameterUnit}`);
              formData.append("is_unit_new", `${false}`);
              formData.append("unit_id", `${isParamUnitExist?.id}`);
            }
          }
        }

        setCompleteScreenLoader(true);

        if (editState?.isEdit) {
          setSaveLoader(true);
          formData.append("id", editState?.id);
          const response = await fetch(`${BASE_URL}/product/update/constants`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Auth.token()}`,
            },
            body: formData,
          });
          if (response.status == 200 || response.ok) {
            await fetchParamUnitLIst();
            setSaveLoader(false);
            setListingLoader(true);
            await dispatch(fetchConstantsList(productId));
            setListingLoader(false);
            setEditState({ isEdit: false, id: "" });
            if (shouldRefetchatrixList) {
              dispatch(listMatrix({ productId }));
              setShoulRefetchMatrixList(false);
            }

            setCompleteScreenLoader(false);
            formik.setFieldValue("constant_name", "");
            formik.setFieldValue("constant_value", "");
            formik.setFieldValue("constant_unit", "6");
            // formik.setFieldValue("currency", "1");
            formik.setFieldValue("parameter", "");
            formik.setFieldValue("parameterUnit", "");
            setConstantType("0");
          }
        } else {
          const response = await fetch(`${BASE_URL}/product/create/constants`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Auth.token()}`,
            },
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to add specification");
          }

          await fetchParamUnitLIst();
          const data = await response.json();
          setListingLoader(true);
          await dispatch(fetchConstantsList(productId));
          setListingLoader(false);
          formik.setFieldValue("post_value", "Currency");
          setCompleteScreenLoader(false);
          formik.setFieldValue("constant_name", "");
          formik.setFieldValue("constant_value", "");
          formik.setFieldValue("constant_unit", "6");
          // formik.setFieldValue("currency", "1");
          formik.setFieldValue("parameter", "");
          formik.setFieldValue("parameterUnit", "");
          setConstantType("0");
          return data;
        }
        setCompleteScreenLoader(false);
      } catch (error) {
        throw error;
      } finally {
        // setCompleteScreenLoader(false);
        // formik.setFieldValue("constant_name", "");
        // formik.setFieldValue("constant_value", "");
        // formik.setFieldValue("constant_unit", "6");
        // formik.setFieldValue("currency", "1");
        // formik.setFieldValue("parameter", "");
        // formik.setFieldValue("parameterUnit", "");
        // setConstantType("0");
      }
    },
  });

  useEffect(() => {
    if (productDetail?.currency_id) {
      formik.setFieldValue("currency", productDetail?.currency_id ?? "1");
    }
  }, [productDetail?.currency_id]);

  const validationSchema = Yup.object().shape({
    specValue: Yup.string().required("Please enter specification value"),
    constValue: Yup.string()
      .matches(/^\d*\.?\d*$/, "Must be a numeric value")
      .max(8, "Must be 8 characters or less")
      .required("Please enter constant value"),
    postFix: Yup.string().required("Please select postfix value"),
    unit: Yup.string()
      .nullable()
      .when("postFix", {
        is: "Unit",
        then: Yup.string().required("Please select unit").nullable(),
      }),

    status: Yup.string().required("Please select status"),
  });
  useEffect(() => {
    const fetchData = async () => {
      setListingLoader(true);
      try {
        await dispatch(fetchConstantsList(productId));
      } catch (error) {
      } finally {
        setListingLoader(false);
      }
    };

    fetchData();
  }, []);

  const fetchParamUnitLIst = async () => {
    const response = await fetch(`${BASE_URL}/unit_parameter/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
    });

    const responseData = await response.json();
    setUnitsList(responseData?.units);

    const uniqueParamList = responseData?.unit_parameters.reduce(
      (acc, current) => {
        if (
          current.symbol.trim() !== "" &&
          !acc.some((item) => item.name === current.name)
        ) {
          acc.push(current);
        }
        return acc;
      },
      []
    );
    setParameterList(uniqueParamList);
  };

  useEffect(() => {
    fetchParamUnitLIst();
  }, []);

  const edit_formik = useFormik({
    initialValues: {
      specValue: "",
      constValue: "",
      postFix: "",
      unit: "",
      status: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      handleEditSaveData(values);
    },
  });

  const handleEditCancel = () => {
    setEditIndex(-1);
    edit_formik.setFieldError("specValue", "");
    edit_formik.setFieldError("constValue", "");
    edit_formik.setFieldError("postFix", "");
    edit_formik.setFieldError("unit", "");
    edit_formik.setFieldError("status", "");
  };
  const handleEditStart = (index, value) => {
    setEditIndex(index);
    edit_formik.setFieldValue("specValue", value?.name);
    edit_formik.setFieldValue("constValue", value?.value);
    edit_formik.setFieldValue("postFix", value?.type);
    edit_formik.setFieldValue("status", value?.status);
    edit_formik.setFieldValue("unit", value?.unit);
  };

  const handleEditSaveData = async (values) => {
    const alreadyValue = passiveSpecList.filter(
      (value) => value?.name === values?.specValue && value?.id != ids
    );
    if (alreadyValue.length > 0) {
      edit_formik.setFieldError(
        "specValue",
        "Please enter a unique value for the specification."
      );
      return;
    }
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("published", "0");
    formData.append("id", ids);
    formData.append("constant_name", values?.specValue);
    formData.append("constant_value", values?.constValue);
    formData.append("constant_type", values?.postFix);
    formData.append("status", values?.status);
    if (values?.postFix == "Unit") {
      formData.append("constant_unit", values?.unit);
    }
    try {
      setSaveLoader(true);

      const response = await fetch(`${BASE_URL}/product/update/constants`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      if (response.status == 200) {
        setSaveLoader(false);
        setListingLoader(true);
        await dispatch(fetchConstantsList(productId));
        setListingLoader(false);
      }
    } catch (error) {
      setSaveLoader(false);
    }
    setSaveLoader(false);
    setEditIndex(-1);
  };

  const getUnits = async () => {
    try {
      const response = await fetch(`${BASE_URL}/unit`);
      const data = await response.json();
      dispatch(
        setCommercialInfoUnits(
          data.data.map((element) => ({
            value: element?.id,
            view: element?.name,
          }))
        )
      );
    } catch (error) {}
  };

  const capitalizedUnits = (commercialInfoUnits || []).map((unit) => ({
    ...unit,
    view: unit.view.charAt(0).toUpperCase() + unit.view.slice(1),
  }));

  useEffect(() => {
    const { parameter } = formik.values;
    if (!parameter || unitsList?.length == 0 || unitsList.length == 0) {
      return;
    }
    const fiteredParamter = parameterList.find(
      (param) => param?.name == parameter
    );
    if (fiteredParamter) {
      const filteredParamUnit = unitsList.find(
        (unit) => unit?.unit_parameter_id == fiteredParamter?.id
      );
      formik.setFieldValue("parameterUnit", filteredParamUnit?.name);
    } else {
      formik.setFieldValue("parameterUnit", "");
    }
  }, [formik.values.parameter]);

  const handleSpecificationChange = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      edit_formik.handleSubmit();
    }
  };
  const handleDeleteSpec = async () => {
    setDeleteProgressLoader(deleteId);
    const formData = new FormData();
    formData.append("id", specId);
    formData.append("product_id", deleteId);
    formData.append("published", "0");
    setDeleteProgressLoader(deleteId);
    try {
      const response = await fetch(`${BASE_URL}/product/delete/constants`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      setListingLoader(true);
      await dispatch(fetchConstantsList(productId));
      setDeleteProgressLoader("");
      setDeleteConfirmation({ popup: false });
      setListingLoader(false);
    } catch (error) {
      setDeleteConfirmation({ popup: false });
      setDeleteProgressLoader("");
    } finally {
      dispatch(listMatrix({ productId }));
    }
  };
  const handleStatusChange = (value) => {
    setStatus(value);
  };

  function getNameById(id) {
    if (Array.isArray(commercialInfoUnits)) {
      const item = commercialInfoUnits?.find((item) => item.value === id);
      if (item) {
        const capitalized =
          item.view.charAt(0).toUpperCase() + item.view.slice(1);
        return capitalized;
      }
    }
    return null;
  }

  const handleConstantSelect = (event: SelectChangeEvent) => {
    setConstantType(event.target.value as string);
  };

  const handleSelectCurrency = (event: SelectChangeEvent) => {
    formik.setFieldValue("currency", event.target.value);
  };
  const columns: any = [
    {
      field: "serial_no",
      headerName: "Sr. No.",
      minWidth: 80,
      flex: 0.5,
      renderCell: (params) => {
        return <span>{params.row.index + 1}</span>;
      },
    },

    {
      field: "constant type",
      headerName: "Constant Type",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.type == 1 ? (
              <Typography>Cost (Price per unit)</Typography>
            ) : (
              <Typography>Other Parameter</Typography>
            )}
          </>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        let unitRender = "";
        let currencyCode = "";
        let parameterSymbol = "";
        if (params?.row?.type == 1) {
          const findUnit = unitsList.find(
            (unit) => unit?.id == params?.row?.constant_unit
          );
          unitRender = findUnit?.name;
          currencyCode = commercialInfoCurrencies
            .find((currency) => currency.value == params?.row?.currency)
            ?.view.match(/\(([^)]+)\)/)?.[1];
        } else if (params?.row?.type == 2) {
          const findUnit = unitsList.find(
            (unit) => unit?.id == params?.row?.unit
          );

          const findParameterSymbol = parameterList.find(
            (param) => param?.id == params?.row?.unit_parameter_id
          );
          unitRender = findUnit?.name;

          //TODO: Symbol have to use somewhere
          parameterSymbol = findParameterSymbol?.symbol;
        }
        return (
          <>
            {params?.row?.type == 1 && (
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  <strong>{params.row.name}</strong>
                </Typography>
                &nbsp; is &nbsp;
                <Typography>
                  <strong>
                    {currencyCode}
                    {params.row.value}
                  </strong>
                </Typography>
                &nbsp; per &nbsp;
                <Typography>
                  {" "}
                  <strong>{unitRender}</strong>
                </Typography>
              </Typography>
            )}
            {params?.row?.type == 2 && (
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  {" "}
                  <strong>{params.row.name}</strong>
                </Typography>
                &nbsp; is &nbsp;
                <Typography>
                  {/* {parameterSymbol}  */}
                  <strong>
                    {" "}
                    {params.row.value} {unitRender}
                  </strong>
                </Typography>
                &nbsp;
              </Typography>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <ConstantAction>
            <LightTooltip placement="top" title="Edit" arrow disableInteractive>
              <img
                width={15}
                height={15}
                src={"/assets/EditPencil.svg"}
                alt="editImage"
                onClick={() => {
                  handleEdit(params?.row);
                }}
              />
            </LightTooltip>
            <Divider orientation="vertical" variant="middle" flexItem />
            <LightTooltip
              arrow
              title="Delete"
              disableInteractive
              placement="top"
            >
              <DeleteOutlineOutlinedIcon
                onClick={() => {
                  setDeleteConfirmation({
                    popup: true,
                    deleteData: params?.row,
                  });
                  setDeletedId(productId);
                  setSpecificDeleteId(params.row?.id);
                  setShowCofirmationMessage(params?.row?.is_deleted_massage);
                }}
                style={{
                  color: "#D7282F",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              />
            </LightTooltip>
          </ConstantAction>
        );
      },
    },
  ];
  const rows =
    passiveSpecList?.length > 0
      ? passiveSpecList.map((item, index) => ({
          ...item,
          index,
        }))
      : [];

  const handleSelectParamter = (newValue: any) => {
    if (!newValue) {
      formik.setFieldError("parameter", "");
      formik.setFieldValue("parameter", "");
      return;
    }
    formik.setFieldError("parameter", "");
    formik.setFieldValue("parameter", newValue);
  };

  const handleSelectParamterUnit = (newValue: any) => {
    if (!newValue) {
      formik.setFieldError("parameterUnit", "");
      formik.setFieldValue("parameterUnit", "");
      return;
    }

    formik.setFieldError("parameterUnit", "");
    formik.setFieldValue("parameterUnit", newValue);
  };

  const handleEdit = (data) => {
    // setEditState({ isEdit: true, id: data?.id });
    // if (data?.type) {
    //   setConstantType(data?.type);
    // }
    setShowCofirmationMessage(data?.is_edit_massage);
    setEditConfirmation({ popup: true, editData: data });
  };
  useEffect(() => {
    const { constant_value } = formik?.values;
    if (constant_value && preConstValue) {
      if (constant_value == preConstValue) {
        setShoulRefetchMatrixList(false);
        return;
      } else {
        setShoulRefetchMatrixList(true);
      }
    }
  }, [preConstValue, formik?.values?.constant_value]);

  const handleEditSpec = () => {
    setEditState({ isEdit: true, id: editConfirmation?.editData?.id });
    if (editConfirmation?.editData?.type) {
      setConstantType(editConfirmation?.editData?.type);
    }
    const data = editConfirmation?.editData;

    const fieldMappings = {
      constant_name: data?.name,
      constant_value: data?.value,
      currency: data?.type === "1" ? data?.currency : undefined,
      constant_unit: data?.type === "1" ? data?.constant_unit : undefined,
      parameter:
        data?.type === "2"
          ? parameterList.find((param) => param?.id === data?.unit_parameter_id)
              ?.name
          : undefined,
      parameterUnit:
        data?.type === "2"
          ? unitsList.find((unit) => unit?.id === data?.unit)?.name
          : undefined,
    };

    Object.entries(fieldMappings).forEach(([field, value]) => {
      if (value !== undefined) {
        formik.setFieldValue(field, value);
      }
      if (field == "constant_value") {
        setPreConstValue(value);
      }
    });
    setEditConfirmation({ popup: false });
  };

  return (
    <div>
      {deleteConfirmation && (
        <CustomDialogue
          open={deleteConfirmation?.popup}
          handleClose={() => setDeleteConfirmation({ popup: false })}
          text="constant specification"
          onClickAction={handleDeleteSpec}
          componentText={confirmationMessage}
          submitButtonText="Delete"
        />
      )}
      {editConfirmation?.popup && (
        <CustomDialogue
          open={editConfirmation?.popup}
          handleClose={() => {
            setConstantType("0");
            setEditState({ isEdit: false, id: "" });
            formik.resetForm();
            setEditConfirmation({ popup: false });
          }}
          text="constant specification"
          onClickAction={() => handleEditSpec()}
          componentText={confirmationMessage}
        />
      )}
      <OuterContainer>
        {/* <HeaderCustomSpecs sx={{ backgroundColor: "#FFECEC !important" }}> */}
        {/* <HeaderCustomSpecs>
          <HeaderMainText
            sx={{ color: "#231f20 !important", fontWeight: "700 !important" }}
          >
            List of Constant Price
          </HeaderMainText>
          <HeaderSubText sx={{ color: "#231f20" }}>
            This option allows you to set a fixed price for your product
            regardless of any customizations selected by the customer.
          </HeaderSubText>
        </HeaderCustomSpecs>
        <FieldsContainer>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={3} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <EditableTextField
                    size="small"
                    required
                    name="specifications"
                    value={formik.values.specifications}
                    label="Specification"
                    style={{}}
                    sx={{
                      "&.MuiOutlinedInput-notchedOutline": {
                        borderColor: formik.errors?.specifications
                          ? "red !important"
                          : "",
                      },
                    }}
                    placeholder="Enter specification"
                    handleChange={(e) => {
                      if (e.target.value.length <= 100) {
                        formik.setFieldValue("specifications", e.target.value);
                        formik.setFieldError("specifications", "");
                      } else {
                        formik.setFieldError(
                          "specifications",
                          "Specification must be at most 100 characters"
                        );
                      }
                    }}
                    helperText={`${formik.errors?.specifications ?? ""}`}
                    error={formik.errors?.specifications ? true : false}
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                  {formik?.errors?.constant_name && (
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
                        {formik.errors.constant_name}
                      </Typography>
                    </Box>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={3} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <EditableTextField
                    size="small"
                    name="value"
                    required
                    value={formik.values.const_value}
                    label="Constant Value"
                    placeholder="Enter constant value"
                    handleChange={(e) => {
                      const { value } = e.target;
                      const numericalValue = value.replace(/[.,]/g, "");

                      if (value.length > 8 && numericalValue.length > 8) {
                        formik.setFieldError(
                          "const_value",
                          "Max Characters Limit Reached!"
                        );
                        return;
                      }

                      formik.setFieldError("const_value", "");

                      const isValidNumber = /^-?\d*\.?\d*$/.test(value);
                      if (isValidNumber) {
                        formik.setFieldValue("const_value", value);
                      } else {
                        formik.setFieldValue(
                          "const_value",
                          formik.values.const_value
                        );
                      }
                    }}
                    helperText={`${formik.errors?.const_value ?? ""}`}
                    error={formik.errors?.const_value ? true : false}
                  ></EditableTextField>
                  {formik?.errors?.const_value && (
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
                        {formik.errors.const_value}
                      </Typography>
                    </Box>
                  )}
                </FormControl>
              </Grid>

              <Grid item md={3} sm={6} xs={12}>
                <FormControl sx={{ width: "100%" }} className="removepadding">
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
                    PostFix
                    <LightTooltip
                      title="Required"
                      arrow
                      disableInteractive
                      placement="top"
                    >
                      <Box
                        component={"span"}
                        sx={{ color: "#d7282f", paddingX: "8px" }}
                      >
                        {" "}
                        *
                      </Box>
                    </LightTooltip>
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    name="status"
                    placeholder="Select postfix"
                    // value={formik.values.post_value}
                    onChange={(e) => {
                      formik.setFieldValue("post_value", e.target.value);
                    }}
                  >
                    <MenuItem value={"Currency"}>Currency</MenuItem>
                    <MenuItem value={"Unit"}>Unit</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {formik.values.post_value == "Unit" && (
                <Grid item md={3} sm={6} xs={12}>
                  <FormControl sx={{ width: "100%" }} className="">
                    <SelectableTextField
                      size="small"
                      required
                      data={capitalizedUnits || []}
                      name={"postFixValue"}
                      value={formik.values.postFix_value}
                      handleChange={(e) => {
                        formik.setFieldValue("postFix_value", e.target.value);
                        formik.setFieldError("postFix_value", "");
                      }}
                      isTextField={false}
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
              <Grid item md={3}>
                <FormControl sx={{ width: "10%" }}>
                  <div
                    style={{
                      width: "90px",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BtnFilled
                      width="40px"
                      height="38px"
                      style={{ width: "40px !important" }}
                      variant="outlined"
                      type="onsubmit"
                      onClick={onsubmit}
                    >
                      {loader ? (
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
                  </div>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </FieldsContainer>
        {passiveSpecList?.length > 0 && (
          <Box sx={{ overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="left"
                    style={{
                      width: "8%",
                      fontWeight: "600",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Sr. No.
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{
                      width: "30%",
                      fontWeight: "600",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Specifications
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{
                      width: "20%",
                      fontWeight: "600",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Constant Value
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{
                      width: "30%",
                      fontWeight: "600",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Postfix
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{
                      fontWeight: "600",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listingLoader ? (
                  <ConstantListSkelton />
                ) : (
                  <>
                    {passiveSpecList?.map((element, index) => (
                      <TableRow key={index} onSubmit={formik.handleSubmit}>
                        <TableCell>
                          <Typography sx={{ fontSize: "14px" }}>
                            {index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Box>
                            {editIndex === index ? (
                              <div>
                                <TextField
                                  size="small"
                                  type="text"
                                  name="specValue"
                                  value={edit_formik.values.specValue}
                                  onChange={edit_formik.handleChange}
                                  onKeyDown={handleSpecificationChange}
                                  onBlur={edit_formik.handleBlur}
                                />
                                {edit_formik?.errors?.specValue && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <WarningAmberOutlinedIcon
                                      style={{
                                        fontSize: "9px",
                                        margin: "0px 4px 0 0",
                                        color: "#d7282f",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: "10px",
                                        color: "#d7282f !important",
                                      }}
                                    >
                                      {edit_formik.errors.specValue}
                                    </Typography>
                                  </Box>
                                )}
                              </div>
                            ) : (
                              <>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {element?.name}
                                </Typography>
                              </>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <Box>
                            {editIndex === index ? (
                              <div>
                                <TextField
                                  size="small"
                                  type="text"
                                  name="constValue"
                                  value={edit_formik.values.constValue}
                                  onChange={edit_formik.handleChange}
                                  onKeyDown={handleSpecificationChange}
                                  onBlur={edit_formik.handleBlur}
                                />
                                {edit_formik?.errors?.constValue && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <WarningAmberOutlinedIcon
                                      style={{
                                        fontSize: "9px",
                                        margin: "0px 4px 0 0",
                                        color: "#d7282f",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: "10px",
                                        color: "#d7282f !important",
                                      }}
                                    >
                                      {edit_formik.errors.constValue}
                                    </Typography>
                                  </Box>
                                )}
                              </div>
                            ) : (
                              <>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {element?.value}
                                </Typography>
                              </>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          {editIndex === index ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                width: "100%",
                              }}
                            >
                              <Box sx={{ width: "50%" }}>
                                <FormControl
                                  sx={{ width: "100%" }}
                                  className="removepadding"
                                >
                                  <Select
                                    labelId="postFix-select-label"
                                    id="postFix-select"
                                    size="small"
                                    name="postFix"
                                    value={edit_formik.values.postFix}
                                    onChange={edit_formik.handleChange}
                                    onBlur={edit_formik.handleBlur}
                                  >
                                    <MenuItem value="Currency">
                                      Currency
                                    </MenuItem>
                                    <MenuItem value="Unit">Unit</MenuItem>
                                  </Select>

                                  {edit_formik.errors.postFix && (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <WarningAmberOutlinedIcon
                                        style={{
                                          fontSize: "9px",
                                          margin: "0px 4px 0 0",
                                          color: "#d7282f",
                                        }}
                                      />
                                      <Typography
                                        sx={{
                                          fontSize: "10px",
                                          color: "#d7282f !important",
                                        }}
                                      >
                                        {edit_formik.errors.postFix}
                                      </Typography>
                                    </Box>
                                  )}
                                </FormControl>
                              </Box>
                              <Box sx={{ width: "50%" }}>
                                {edit_formik.values.postFix == "Unit" && (
                                  <Grid item md={3}>
                                    <FormControl
                                      sx={{ width: "100%" }}
                                      className="removepadding"
                                    >
                                      <SelectableTextField
                                        size="small"
                                        label={"Units"}
                                        data={capitalizedUnits || []}
                                        name={"postFixValue"}
                                        value={edit_formik.values.unit}
                                        isTextField={false}
                                        handleChange={(e) => {
                                          edit_formik.setFieldValue(
                                            "unit",
                                            e.target.value
                                          );
                                          edit_formik.setFieldError("unit", "");
                                        }}
                                      ></SelectableTextField>
                                      {edit_formik?.errors?.unit && (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <WarningAmberOutlinedIcon
                                            style={{
                                              fontSize: "9px",
                                              margin: "0px 4px 0 0",
                                              color: "#d7282f",
                                            }}
                                          />
                                          <Typography
                                            sx={{
                                              fontSize: "10px",
                                              color: "#d7282f !important",
                                            }}
                                          >
                                            {edit_formik.errors.unit}
                                          </Typography>
                                        </Box>
                                      )}
                                      {edit_formik?.errors?.postFix && (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <WarningAmberOutlinedIcon
                                            style={{
                                              fontSize: "9px",
                                              margin: "0px 4px 0 0",
                                              color: "#d7282f",
                                            }}
                                          />
                                          <Typography
                                            sx={{
                                              fontSize: "10px",
                                              color: "#d7282f !important",
                                            }}
                                          >
                                            {edit_formik.errors.postFix}
                                          </Typography>
                                        </Box>
                                      )}
                                    </FormControl>
                                  </Grid>
                                )}
                              </Box>
                            </Box>
                          ) : (
                            <Typography sx={{ fontSize: "14px" }}>
                              {getNameById(element?.unit) || "Currency"}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {editIndex === index ? (
                            <form>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                {saveLoader && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <CircularProgress
                                      style={{
                                        color: "#D7282F",
                                        height: "25px",
                                        width: "25px",
                                        display: "flex",
                                        float: "right",
                                        marginRight: "10px",
                                      }}
                                    ></CircularProgress>
                                  </Box>
                                )}
                                <LightTooltip
                                  arrow
                                  title="Save"
                                  disableInteractive
                                  placement="top"
                                >
                                  <SaveOutlinedIcon
                                    sx={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                    type="onsubmit"
                                    onClick={() => edit_formik.handleSubmit()}
                                  />
                                </LightTooltip>
                                <Divider
                                  orientation="vertical"
                                  variant="middle"
                                  flexItem
                                  sx={{ margin: "3px 4px 3px 7px" }}
                                />
                                <LightTooltip
                                  arrow
                                  title="Cancel"
                                  disableInteractive
                                  placement="top"
                                >
                                  <CloseOutlinedIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#d7282f",
                                      cursor: "pointer",
                                    }}
                                    onClick={handleEditCancel}
                                  />
                                </LightTooltip>
                              </Box>
                            </form>
                          ) : (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <LightTooltip
                                arrow
                                title="Edit"
                                disableInteractive
                                placement="top"
                              >
                                <img
                                  src="/assets/EditPencil.svg"
                                  alt=""
                                  style={{ height: "15px", width: "15px" }}
                                  onClick={() => {
                                    handleEditStart(index, element),
                                      setId(element?.id);
                                  }}
                                />
                              </LightTooltip>
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                sx={{ margin: "3px 4px 3px 7px" }}
                              />
                              <LightTooltip
                                arrow
                                title="Delete"
                                disableInteractive
                                placement="top"
                              >
                                <DeleteOutlineOutlinedIcon
                                  onClick={() => {
                                    setDeleteConfirmation(true);
                                    setDeletedId(productId);
                                    setSpecificDeleteId(element?.id);
                                  }}
                                  style={{
                                    color: "#D7282F",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                />
                              </LightTooltip>
                            </Box>
                          )}
                          {deleteProgressLoader === element?.id && (
                            <CircularProgress
                              style={{
                                color: "#DD484E",
                                width: "25px",
                                height: "25px",
                              }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </Box>
        )} */}

        {/* new COde starts here */}
        <FieldsContainer sx={{ paddingTop: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <FormControl fullWidth size="small">
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{
                      "&.MuiFormLabel-root": {
                        color: "rgb(28, 28, 28) !important",
                        fontWeight: "600",
                        paddingX: "8px",
                      },
                    }}
                    shrink={true}
                  >
                    Constant Type
                    <LightTooltip
                      title="Required"
                      arrow
                      disableInteractive
                      placement="top"
                    >
                      <Box
                        component={"span"}
                        sx={{ color: "#d7282f", paddingX: "8px" }}
                      >
                        {" "}
                        *
                      </Box>
                    </LightTooltip>
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={constantType}
                    onChange={handleConstantSelect}
                    defaultValue="Select Constant Type"
                  >
                    <MenuItem value="0" disabled>
                      Select Constant Type
                    </MenuItem>
                    <MenuItem value="1">Cost (Price per unit)</MenuItem>
                    <MenuItem value="2">Other Parameter</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            {constantType === "1" && (
              <>
                <Grid item xs={12} sm={12} md={3} lg={2.5}>
                  <Box>
                    <EditableTextField
                      size="small"
                      name="value"
                      required
                      value={formik.values.constant_name}
                      label="Constant Name"
                      placeholder="Enter constant name"
                      handleChange={(e) => {
                        if (e?.target?.value?.startsWith(" ")) {
                          return;
                        }
                        if (e.target.value.length <= 100) {
                          formik.setFieldValue("constant_name", e.target.value);
                          formik.setFieldError("constant_name", "");
                        } else {
                          formik.setFieldError(
                            "constant_name",
                            "Constant name must be at most 100 characters"
                          );
                        }
                      }}
                      helperText={`${formik.errors?.constant_name ?? ""}`}
                      error={formik.errors?.constant_name ? true : false}
                    ></EditableTextField>
                    {formik?.errors?.constant_name && (
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
                          {formik.errors.constant_name}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={2.5}>
                  <Box>
                    <FormControl fullWidth size="small">
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                          "&.MuiFormLabel-root": {
                            color: "rgb(28, 28, 28) !important",
                            fontWeight: "600",
                            paddingX: "8px",
                          },
                        }}
                        shrink={true}
                      >
                        Currency
                        <LightTooltip
                          title="Required"
                          arrow
                          disableInteractive
                          placement="top"
                        >
                          <Box
                            component={"span"}
                            sx={{ color: "#d7282f", paddingX: "8px" }}
                          >
                            {" "}
                            *
                          </Box>
                        </LightTooltip>
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formik.values.currency || ""}
                        disabled={true}
                        onChange={handleSelectCurrency}
                      >
                        <MenuItem value={0} disabled>
                          Select Currency
                        </MenuItem>

                        {commercialInfoCurrencies?.length > 0 &&
                          commercialInfoCurrencies?.map((currency) => {
                            return (
                              <MenuItem
                                key={currency?.value}
                                value={currency?.value}
                              >
                                {currency?.view}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      {formik?.errors?.currency && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <WarningAmberOutlinedIcon
                            style={{
                              fontSize: "9px",
                              margin: "0px 4px 0 0",
                              color: "#d7282f",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "10px",
                              color: "#d7282f !important",
                            }}
                          >
                            {formik.errors.currency}
                          </Typography>
                        </Box>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={1.5}>
                  <Box>
                    <EditableTextField
                      size="small"
                      name="value"
                      required
                      value={formik.values.constant_value}
                      label="Value"
                      placeholder="Enter value"
                      handleChange={(e) => {
                        const { value } = e.target;
                        const numericalValue = value.replace(/[.,]/g, "");

                        if (value.length > 8 && numericalValue.length > 8) {
                          formik.setFieldError(
                            "constant_value",
                            "Max Characters Limit Reached!"
                          );
                          return;
                        }

                        formik.setFieldError("constant_value", "");

                        const isValidNumber = /^-?\d*\.?\d*$/.test(value);
                        if (isValidNumber) {
                          formik.setFieldValue("constant_value", value);
                        } else {
                          formik.setFieldValue(
                            "const_value",
                            formik.values.constant_value
                          );
                        }
                      }}
                      helperText={`${formik.errors?.constant_value ?? ""}`}
                      error={formik.errors?.constant_value ? true : false}
                    ></EditableTextField>
                    {formik?.errors?.constant_value && (
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
                          {formik.errors.constant_value}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={1.5}>
                  <FormControl sx={{ width: "100%" }} className="">
                    <SelectableTextField
                      placeholder={"Select Unit"}
                      size="small"
                      label={"Per Unit"}
                      required
                      data={capitalizedUnits || []}
                      name={"constant_unit"}
                      value={formik.values.constant_unit}
                      handleChange={(e) => {
                        formik.setFieldValue("constant_unit", e.target.value);
                        formik.setFieldError("constant_unit", "");
                      }}
                      isTextField={false}
                    ></SelectableTextField>
                    {formik?.errors?.constant_unit && (
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
                          {formik.errors.constant_unit}
                        </Typography>
                      </Box>
                    )}
                  </FormControl>
                </Grid>{" "}
              </>
            )}
            {constantType === "2" && (
              <>
                <Grid item xs={12} sm={12} md={3} lg={2.5}>
                  <Box>
                    <EditableTextField
                      size="small"
                      name="value"
                      required
                      value={formik.values.constant_name}
                      label="Parameter Name"
                      placeholder="Enter Parameter name"
                      handleChange={(e) => {
                        if (e?.target?.value?.startsWith(" ")) {
                          return;
                        }
                        if (e.target.value.length <= 100) {
                          formik.setFieldValue("constant_name", e.target.value);
                          formik.setFieldError("constant_name", "");
                        } else {
                          formik.setFieldError(
                            "constant_name",
                            "Parameter name must be at most 100 characters"
                          );
                        }
                      }}
                      helperText={`${formik.errors?.constant_name ?? ""}`}
                      error={formik.errors?.constant_name ? true : false}
                    ></EditableTextField>
                    {formik?.errors?.constant_name && (
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
                          {formik.errors.constant_name}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={2.5}>
                  <Box>
                    <FormControl fullWidth size="small">
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                          "&.MuiFormLabel-root": {
                            color: "rgb(28, 28, 28) !important",
                            fontWeight: "600",
                            paddingX: "8px",
                          },
                        }}
                        shrink={true}
                      >
                        Parameter Type
                        <LightTooltip
                          title="Required"
                          arrow
                          disableInteractive
                          placement="top"
                        >
                          <Box
                            component={"span"}
                            sx={{ color: "#d7282f", paddingX: "8px" }}
                          >
                            {" "}
                            *
                          </Box>
                        </LightTooltip>
                      </InputLabel>
                      <Autocomplete
                        size="small"
                        value={formik.values.parameter}
                        freeSolo
                        filterOptions={(options, params) => {
                          const { inputValue } = params;
                          if (inputValue?.startsWith(" ")) return [];
                          const filtered = options?.filter((option) => {
                            return option
                              .toLowerCase()
                              .includes(params?.inputValue.toLowerCase());
                          });
                          const isExisting = options.some(
                            (option) =>
                              inputValue.toLowerCase() === option.toLowerCase()
                          );
                          if (inputValue !== "" && !isExisting) {
                            filtered.push(inputValue);
                          }
                          return filtered;
                        }}
                        onChange={(event, newValue) =>
                          handleSelectParamter(newValue)
                        }
                        onInputChange={(event, newInputValue) => {
                          const sanitizedValue = newInputValue?.trimStart();
                          if (sanitizedValue !== newInputValue) {
                            event?.preventDefault();
                          }

                          handleSelectParamter(newInputValue || "");
                        }}
                        id="parameter-autocomplete"
                        options={parameterOptions}
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option) {
                            return option;
                          }
                          return option;
                        }}
                        disableClearable
                        slotProps={{
                          popper: {
                            sx: { zIndex: 98 },
                          },
                        }}
                        ListboxProps={{
                          sx: {
                            maxHeight: 200,
                            "&::-webkit-scrollbar": {
                              width: "6px",
                            },
                            "&::-webkit-scrollbar-track": {
                              backgroundColor: "#f1f1f1",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "#acabab",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                              backgroundColor: "#6d6d6d",
                            },
                          },
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Select Parameter"
                            placeholder="Select Parameter"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormControl>
                    {formik?.errors?.parameter && (
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
                          {formik.errors.parameter}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={1.5}>
                  <Box>
                    <EditableTextField
                      size="small"
                      name="value"
                      required
                      value={formik.values.constant_value}
                      label="Value"
                      placeholder="Enter value"
                      handleChange={(e) => {
                        const { value } = e.target;
                        const numericalValue = value.replace(/[.,]/g, "");

                        if (value.length > 8 && numericalValue.length > 8) {
                          formik.setFieldError(
                            "constant_value",
                            "Max Characters Limit Reached!"
                          );
                          return;
                        }

                        formik.setFieldError("constant_value", "");

                        const isValidNumber = /^-?\d*\.?\d*$/.test(value);
                        if (isValidNumber) {
                          formik.setFieldValue("constant_value", value);
                        } else {
                          formik.setFieldValue(
                            "const_value",
                            formik.values.constant_value
                          );
                        }
                      }}
                      helperText={`${formik.errors?.constant_value ?? ""}`}
                      error={formik.errors?.constant_value ? true : false}
                    ></EditableTextField>
                    {formik?.errors?.constant_value && (
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
                          {formik.errors.constant_value}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={1.5}>
                  <FormControl sx={{ width: "100%" }} className="">
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{
                        "&.MuiFormLabel-root": {
                          color: "rgb(28, 28, 28) !important",
                          fontWeight: "600",
                          paddingX: "8px",
                        },
                      }}
                      shrink={true}
                    >
                      Measurement Unit
                      <LightTooltip
                        title="Required"
                        arrow
                        disableInteractive
                        placement="top"
                      >
                        <Box
                          component={"span"}
                          sx={{ color: "#d7282f", paddingX: "8px" }}
                        >
                          {" "}
                          *
                        </Box>
                      </LightTooltip>
                    </InputLabel>
                    <Autocomplete
                      size="small"
                      value={formik.values.parameterUnit || ""}
                      freeSolo
                      filterOptions={(options, params) => {
                        const { inputValue } = params;
                        if (inputValue?.startsWith(" ")) return [];
                        const filtered = options?.filter((option) => {
                          return option
                            ?.toLowerCase()
                            ?.includes(params?.inputValue);
                        });
                        const isExisting = options?.some(
                          (option) => inputValue === option
                        );

                        if (inputValue !== "" && !isExisting) {
                          filtered?.push(inputValue);
                        }
                        return filtered;
                      }}
                      onChange={(event, newValue) => {
                        handleSelectParamterUnit(newValue);
                      }}
                      onInputChange={(event, newInputValue) => {
                        const sanitizedValue = newInputValue?.trimStart();
                        if (sanitizedValue !== newInputValue) {
                          event.preventDefault();
                        }
                        handleSelectParamterUnit(sanitizedValue || "");
                      }}
                      id="parameter-unit-autocomplete"
                      options={parameterUnitsOptions || []}
                      disableClearable
                      slotProps={{
                        popper: {
                          sx: { zIndex: 98 },
                        },
                      }}
                      ListboxProps={{
                        sx: {
                          maxHeight: 200,
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f1f1f1",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#acabab",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#6d6d6d",
                          },
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // label="Select Unit"
                          placeholder="Select Unit"
                          variant="outlined"
                        />
                      )}
                    />

                    {formik?.errors?.parameterUnit && (
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
                          {formik.errors.parameterUnit}
                        </Typography>
                      </Box>
                    )}
                  </FormControl>
                </Grid>{" "}
              </>
            )}
            <Grid item xs={2} sm={2} md={1}>
              <FormControl sx={{}}>
                <div
                  style={{
                    height: "100%",
                  }}
                >
                  <BtnFilled
                    sx={{
                      minWidth: "auto",
                      padding: `${editState?.isEdit ? "5px 6px" : "5px 15px"}`,
                      "@media screen and (max-width:1200px)": {
                        padding: `${
                          editState?.isEdit ? "5px 15px" : "5px 15px"
                        }`,
                      },
                    }}
                    height="38px"
                    // style={{ width: "40px !important" }}
                    variant="outlined"
                    type="onsubmit"
                    disabled={loader}
                    onClick={formik.handleSubmit}
                  >
                    {loader ? (
                      <ThreeDots
                        height="40"
                        width="40"
                        radius="9"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : editState?.isEdit ? (
                      "Update"
                    ) : (
                      "Add"
                    )}
                  </BtnFilled>
                </div>
              </FormControl>
            </Grid>
            {rows.length > 0 && (
              <>
                <Grid xs={12} mt={2}>
                  <Box>
                    <Divider variant="fullWidth" orientation="horizontal" />
                  </Box>
                </Grid>
                <Grid xs={12} mt={2}>
                  <Box sx={{ padding: "16px 0px 16px 16px" }}>
                    <ThemeProvider theme={theme}>
                      <DataGridPro
                        localeText={{
                          columnMenuShowColumns: "Manage Columns",
                        }}
                        sx={DataGridStyle}
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowHeight={45}
                        autoHeight
                        pagination
                        // rowCount={passiveSpecList.length}
                        // checkboxSelection={true}
                        disableSelectionOnClick={true}
                      />
                    </ThemeProvider>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </FieldsContainer>
      </OuterContainer>
    </div>
  );
};
