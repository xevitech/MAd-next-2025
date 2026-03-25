import React, { useState, useEffect, useContext, useRef } from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ControlPointSharpIcon from "@mui/icons-material/ControlPointSharp";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { AddAuxiliaryComponent } from "../addAuxiliary";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { MyAppContext } from "contextApi/appContext";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  Grid,
  IconButton,
  Button,
  AvatarGroup,
  Avatar,
  useMediaQuery,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  AddComponentContainer,
  AuxiliaryAddMore,
  AuxiliaryHeading,
  AuxiliaryText,
  ChooseFileIcon,
  DeleteIconContainer,
  ImgContainer,
  TermNameContainer,
  TermNameContent,
} from "./styles";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import {
  deleteTermOfSpec,
  getSpecificationsList,
  seCheckedSpecification,
} from "@/hooks/CalculatorReducer";
import { useDispatch, useSelector } from "react-redux";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  apiClient,
  convertSize,
  fileTypesAllowed,
  imageSize,
  imageType,
  maxImageLimitCalculator,
  specificationTextLength,
} from "@/components/common/common";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { ErrorImage } from "../GroupsAndLevels/styles";
import { EditableTextField } from "@/components/products/common/editableTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import CancelIcon from "@mui/icons-material/Cancel";
export const SingleSpecTerm = (props) => {
  const {
    attributes_values: attributeValues,
    id,
    image_id: imageId,
    name,
    parent: specId,
    product_id: productId,
    type,
  } = props?.data;
  const [imagesArray, setImagesArray] = useState<any>([props?.data]);
  const dispatch = useDispatch();
  const [showAuxComp, setShowAuxComp] = useState(false);
  const [termImagesArray, setTermImagesArray] = useState<any>([]);
  const [termPreviewImagesArray, setTermPreviewImagesArray] = useState<any>([]);
  const { specificationsList, updateTermData, specsData } = useSelector(
    (state: any) => state?.calculatorData
  );
  const [error, setError] = useState("");
  const showAuxComponent = () => {
    setShowAuxComp(!showAuxComp);
  };
  const hideAuxCompnent = () => {
    setShowAuxComp(false);
  };

  const [auxList, setAuxList] = useState<any>([]);
  const [listingLoader, setListingLoader] = useState(false);
  const [visibleInput, setVisibleInput] = useState(true);
  const [isEditAux, setIsEditAux] = useState(false);
  const [addLoader, setAddLoader] = useState(false);

  const { commercialInfoCurrencies } = useSelector(
    (state: any) => state.editProduct
  );

  const storedCurrency = localStorage.getItem("productCurrency");

  const currency = storedCurrency
    ? commercialInfoCurrencies
        .find(({ value }) => value == JSON.parse(storedCurrency))
        ?.view.match(/\(([^)]+)\)/)?.[1]
    : commercialInfoCurrencies
        .find(({ value }) => value == 1)
        ?.view.match(/\(([^)]+)\)/)?.[1];

  const validation = Yup.object().shape({
    auxiliary_name: Yup.string().required("Please enter name"),
    auxiliary_price: Yup.string()
      .max(8, "Please limit the price to a maximum of 8 digits.")
      .matches(/^-?\d*\.?\d*$/, "")
      .required("Please enter price"),
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [editFormikIndex, setEditFormikIndex] = useState(-1);
  const [ids, setId] = useState("");

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
          formData.append("term_id", id);
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
          }
        } catch (error) {
          setAddLoader(false);
          setListingLoader(false);
          throw error;
        }
      }
    },
  });

  const SaveAuxilaryValue = async (auxId, name, price) => {
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
      formData.append("term_id", id);
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
      SaveAuxilaryValue(
        auxList[editIndex]?.id,
        values.name.trim(),
        values.price.trim()
      );
      setEditIndex(-1);
    },
  });

  const getAuxList = async () => {
    try {
      setListingLoader(true);
      const formData = new FormData();
      formData.append("product_id", productId);
      formData.append("term_id", id);
      const response = await fetch(`${BASE_URL}/product/auxiliary/list`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      if (response.status == 200) {
        const data = await response.json();
        if (data?.data.length == 0) {
          setShowAuxComp(false);
          setVisibleInput(true);
        }
        setAuxList(data?.data);
        setListingLoader(false);
      }
    } catch {
      setListingLoader(false);
    }
  };

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
  }, [specificationsList]);

  const handleSpecificationChange = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      edit_formik.handleSubmit;
    }
  };

  useEffect(() => {
    setImagesArray([props?.data]);
  }, [props?.data]);
  const [editedName, setEditedName] = useState(name);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [singleImageDeleteConfirmation, setSingleImageDeleteConfirmation] =
    useState(false);
  const [allImageDeleteConfirmation, setAllImageDeleteConfirmation] =
    useState(false);
  const [image_id, setImageId] = useState("");
  const handleTermSelection = (specId, termId) => {
    const payload = specificationsList.map((element) => {
      if (element?.id == specId) {
        return {
          ...element,
          children: element?.children.map((element) => {
            if (element?.id == termId) {
              return {
                ...element,
                type: element?.type == "passive" ? "active" : "passive",
              };
            } else {
              return element;
            }
          }),
        };
      } else {
        return element;
      }
    });
    dispatch(seCheckedSpecification(payload));
  };
  const EditName = async () => {
    const filterExisting = props?.children?.filter(
      (item) => item.name == editedName
    );
    if (filterExisting?.length > 0) {
      setIsEditMode(true);
      setError("Duplicate values are not allowed for option/term.");
      return;
    }
    if (!editedName.trim()) {
      setError("Please enter option/term");
      setIsEditMode(true);
      return;
    } else {
      setError("");
      setSaveLoader(true);
      setIsEditMode(true);
      const formData = new FormData();
      formData.append("id", props?.data?.id);
      formData.append("product_id", productId);
      formData.append("name", editedName);
      formData.append("published", "0");
      try {
        const response = await fetch(
          `${BASE_URL}/product/update/specifications`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Auth.token()}`,
            },
            body: formData,
          }
        );
        if (response.status == 200) {
          setSaveLoader(false);
          setIsEditMode(false);
          dispatch(getSpecificationsList({ id: productId }));
        }
      } catch (error) {}
    }
  };

  const deleteAllImages = async () => {
    const formData = new FormData();

    setTermImagesArray([]);
    setTermPreviewImagesArray([]);
    formData.append("product_id", productId);
    formData.append("term_id", id);
    formData.append("remove_all", "true");
    formData.append("image[]", "");
    formData.append("published", "0");

    setAllImageDeleteConfirmation(true);

    try {
      const response = await fetch(
        `${BASE_URL}/product/update_images/specifications/terms`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );

      if (response?.ok) {
        await dispatch(getSpecificationsList({ id: productId }));
      }
      setAllImageDeleteConfirmation(false);
    } catch (error) {
      setAllImageDeleteConfirmation(false);
    }
  };

  const uploadImagesOfSpecTerm = async (imgArray, removeAll = false) => {
    const formData = new FormData();
    formData.append("published", "0");
    if (!removeAll) {
      for (let i = 0; i < imgArray.length; i++) {
        formData.append("image[]", imgArray[i]);
      }
      formData.append("product_id", productId);
      formData.append("term_id", id);
      formData.append("remove_all", "false");
    } else if (removeAll) {
      setTermImagesArray([]);
      setTermPreviewImagesArray([]);
      formData.append("product_id", productId);
      formData.append("term_id", id);
      formData.append("remove_all", "true");
      for (let i = 0; i < imgArray.length; i++) {
        formData.append("image[]", imgArray[i]);
      }
    }

    setLoader(true);
    try {
      const response = await fetch(
        `${BASE_URL}/product/update_images/specifications/terms`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );

      if (response?.ok) {
        await dispatch(getSpecificationsList({ id: productId }));
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const inputRef = useRef(null);

  const handleImageChangeSpecTerm = (e) => {
    if (
      imageId?.length <= maxImageLimitCalculator &&
      e.target.files?.length <= maxImageLimitCalculator
    ) {
      const fileList = e?.target?.files;
      for (let i = 0; i < fileList?.length; i++) {
        const file = fileList[i];
        const fileType = file?.type;
        const fileSize = file?.size;
        if (!imageType?.includes(fileType)) {
          toast.error("Only allowed PNG and JPG ");
          return;
        } else if (fileTypesAllowed?.includes(fileType)) {
          toast.error("Only allowed PNG and JPG ");
          return;
        }

        if (convertSize(fileSize, "MB") > imageSize) {
          toast.error("Can not upload size more than 5MB");
          return;
        }
      }
    }

    const newFiles = Array?.from(e.target.files);
    const totalFiles = imageId?.length + newFiles?.length;

    if (totalFiles > maxImageLimitCalculator) {
      toast.error("Can not upload images more than 3.");
      return;
    }

    uploadImagesOfSpecTerm(newFiles);
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  };

  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const handleDelete = async () => {
    try {
      await dispatch(deleteTermOfSpec({ specId, id, productId }));
      await dispatch(getSpecificationsList({ id: productId }));
      setDeleteConfirmation(false);
    } catch {
      setDeleteConfirmation(false);
    }
  };
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSingleImageDelete = async () => {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("term_id", id);
    formData.append("image_id", image_id);
    formData.append("published", "0");
    setSingleImageDeleteConfirmation(true);
    try {
      const response = await fetch(
        `${BASE_URL}/product/delete/specifications/image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );

      if (response?.ok) {
        await dispatch(getSpecificationsList({ id: productId }));
      }
      setSingleImageDeleteConfirmation(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (auxList.length > 0) {
      setVisibleInput(false);
      setShowAuxComp(true);
    }
  }, [auxList]);

  const handleDeleteAux = async (aux_id) => {
    if (!aux_id) return;
    const response = await apiClient("product/auxiliary/delete", "post", {
      body: {
        auxiliary_id: aux_id,
        product_id: productId,
        term_id: id,
        published: 0,
      },
    });
    if (response.status === 200) {
      await dispatch(getSpecificationsList({ id: productId }));
      toast?.success("Auxiliary deleted successfully");
    }
  };
  const isMobile = useMediaQuery("(max-width: 1300px)");

  console.log(editFormikIndex, isMobile, "editFormikIndex");

  return (
    <>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="option/term"
          onClickAction={handleDelete}
        />
      )}
      {singleImageDeleteConfirmation && (
        <DeleteDialog
          open={singleImageDeleteConfirmation}
          handleClose={setSingleImageDeleteConfirmation}
          text="image"
          onClickAction={handleSingleImageDelete}
        />
      )}
      {allImageDeleteConfirmation && (
        <DeleteDialog
          open={allImageDeleteConfirmation}
          handleClose={setAllImageDeleteConfirmation}
          text="all images"
          onClickAction={deleteAllImages}
        />
      )}
      <TableRow
        sx={{
          "& .MuiTableCell-root": { verticalAlign: "top", padding: "0 16px" },
        }}
      >
        <TableCell>
          <TermNameContainer>
            <Checkbox
              size={"small"}
              onChange={(e) => {
                handleTermSelection(specId, id);
              }}
              checked={type === "active" ? true : false}
            />

            {isEditMode ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Box>
                  <TextField
                    size="small"
                    sx={{ padding: "4px 0" }}
                    value={editedName}
                    onChange={(e) => {
                      if (e?.target?.value.length > specificationTextLength) {
                        setError(
                          "The content is too long. Please limit it to 50 characters."
                        );
                      } else {
                        setEditedName(e.target.value);
                        setError("");
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        EditName();
                      }
                    }}
                  />
                  {isEditMode && (
                    <Typography
                      sx={{
                        color: "#D7282F",
                        fontSize: "10px",
                        margin: "-3px 0 2px 0",
                        textTransform: "none",
                      }}
                    >
                      {error && (
                        <ErrorImage
                          src="/assets/error-outline-red.svg"
                          alt=""
                          sx={{ height: "8px", width: "8px" }}
                        />
                      )}
                      {error}
                    </Typography>
                  )}
                </Box>
                {saveLoader && (
                  <CircularProgress
                    style={{
                      color: "#DD484E",
                      width: "25px",
                      height: "25px",
                      marginLeft: "10px",
                    }}
                  />
                )}
                <LightTooltip
                  arrow
                  disableInteractive
                  title="Save"
                  placement="top"
                >
                  <SaveOutlinedIcon
                    onClick={() => {
                      setIsEditMode(false);
                      EditName();
                    }}
                    sx={{ fontSize: "20px", cursor: "pointer" }}
                  >
                    Save
                  </SaveOutlinedIcon>
                </LightTooltip>
                <LightTooltip
                  arrow
                  disableInteractive
                  title="Cancel"
                  placement="top"
                >
                  <CloseOutlinedIcon
                    onClick={() => {
                      setIsEditMode(false);
                      setEditedName(name);
                      setError("");
                    }}
                    sx={{
                      fontSize: "20px",
                      color: "#d7282f",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </CloseOutlinedIcon>
                </LightTooltip>
              </Box>
            ) : (
              <Box>
                <TermNameContent
                  sx={{
                    "&:hover": {
                      "& .editicon": {
                        display: "block !important",
                      },
                    },
                  }}
                >
                  {name.replaceAll("_", " ")}
                </TermNameContent>
              </Box>
            )}
          </TermNameContainer>
        </TableCell>
        <TableCell sx={{ width: "500px" }} align="center">
          {showAuxComp ? (
            <AddComponentContainer
              sx={{
                flexDirection: "column",
                width: "100%",
                maxWidth: "500px",
                alignItems: "start",
              }}
            >
              <Grid container columnSpacing={0} sx={{ margin: "7px 0 0 0" }}>
                <Grid item xs={5} sm={5} md={5}>
                  <AuxiliaryHeading>Name</AuxiliaryHeading>
                </Grid>
                <Grid item xs={5} sm={5} md={5}>
                  <AuxiliaryHeading>Price({currency})</AuxiliaryHeading>
                </Grid>
              </Grid>
              <Box>
                {showAuxComp && (
                  <AddAuxiliaryComponent
                    visibleInput={visibleInput}
                    setVisibleInput={setVisibleInput}
                    auxList={auxList}
                    setAuxList={setAuxList}
                    hideAux={showAuxComponent}
                    productId={productId}
                    termId={id}
                  />
                )}
              </Box>

              {auxList &&
                auxList.length > 0 &&
                auxList.map((element, index) => (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "100%",
                      }}
                    >
                      {editFormikIndex === index ? (
                        <form onSubmit={edit_formik.handleSubmit}>
                          <Grid
                            container
                            columnSpacing={2}
                            alignItems={"start "}
                            sx={{ padding: "0 0 6px 0" }}
                          >
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                              <Box sx={{}}>
                                <TextField
                                  size="small"
                                  type="text"
                                  name="name"
                                  value={edit_formik.values.name}
                                  onChange={(e) => {
                                    if (e.target.value.startsWith(" ")) {
                                      return;
                                    }
                                    edit_formik.setFieldValue(
                                      "name",
                                      e.target.value
                                    );
                                  }}
                                  onBlur={edit_formik.handleBlur}
                                  onKeyDown={(e) => {
                                    handleSpecificationChange(e),
                                      setId(element?.id);
                                  }}
                                />
                                {edit_formik.errors.name && (
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
                                      {edit_formik.errors.name}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                              {" "}
                              <EditableTextField
                                size="small"
                                placeholder="Enter Price"
                                handleChange={(e) => {
                                  const { value } = e.target;
                                  const isValidNumber = /^-?\d*\.?\d*$/.test(
                                    value
                                  );
                                  if (isValidNumber) {
                                    edit_formik.setFieldValue("price", value);
                                    edit_formik.setFieldError("price", "");
                                  } else {
                                    edit_formik.setFieldValue(
                                      "price",
                                      edit_formik.values.price
                                    );
                                    edit_formik.setFieldError("price", "");
                                  }
                                }}
                                value={edit_formik.values.price}
                                onkeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    edit_formik.handleSubmit();
                                  }
                                }}
                              />
                              {edit_formik.errors.price && (
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
                                    {edit_formik.errors.price}
                                  </Typography>
                                </Box>
                              )}
                            </Grid>
                            <Grid item xs={2}>
                              {" "}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                {!listingLoader ? (
                                  <Button
                                    sx={{
                                      color: "#d7282f",
                                      background: "none",
                                      padding: "0px",
                                      minWidth: "auto",
                                      "&:hover": { backgroundColor: "none" },
                                    }}
                                    type="submit"
                                    onClick={() => setId(element?.id)}
                                  >
                                    <CheckCircleIcon />
                                  </Button>
                                ) : (
                                  <CircularProgress
                                    style={{
                                      color: "#DD484E",
                                      width: "25px",
                                      height: "25px",
                                    }}
                                  />
                                )}
                                <CancelIcon
                                  sx={{ color: "#d7282f" }}
                                  onClick={() => {
                                    setEditFormikIndex(-1);
                                  }}
                                ></CancelIcon>
                              </Box>
                            </Grid>
                          </Grid>
                        </form>
                      ) : (
                        <>
                          <Box sx={{ width: "100%" }}>
                            <Grid container columnSpacing={0}>
                              <Grid item xs={5}>
                                <Box>
                                  <AuxiliaryText>{element?.name}</AuxiliaryText>
                                </Box>
                              </Grid>
                              <Grid item xs={5}>
                                <Box>
                                  <AuxiliaryText>
                                    {element?.value}
                                  </AuxiliaryText>
                                </Box>
                              </Grid>
                              <Grid item xs={2}>
                                <Box sx={{ display: "flex", width: "100%" }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "6px",
                                    }}
                                  >
                                    <LightTooltip
                                      arrow
                                      placement="top"
                                      title="Edit"
                                      disableInteractive
                                    >
                                      <img
                                        className="editicon"
                                        src="/assets/EditPencil.svg"
                                        alt=""
                                        style={{
                                          height: "15px",
                                          width: "15px",
                                        }}
                                        onClick={() => {
                                          setEditFormikIndex(index);
                                          edit_formik.setValues({
                                            name: element?.name || "",
                                            price: element?.value || "",
                                          });
                                        }}
                                      />
                                    </LightTooltip>
                                    <Divider orientation="vertical" flexItem />
                                    {/* aux delete icon  */}
                                    <LightTooltip
                                      arrow
                                      placement="top"
                                      title="Delete"
                                      disableInteractive
                                    >
                                      <IconButton
                                        sx={{
                                          color: "#D7282F",
                                          cursor: "pointer",
                                          fontSize: "20px",
                                          padding: "0px",
                                        }}
                                      >
                                        <DeleteOutlineOutlinedIcon
                                          sx={{ fontSize: "20px" }}
                                          onClick={() =>
                                            handleDeleteAux(element?.id)
                                          }
                                        />
                                      </IconButton>
                                    </LightTooltip>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </>
                      )}
                    </Box>
                  </>
                ))}

              {!visibleInput && editFormikIndex == -1 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    width: "100%",
                    borderTop: "1px solid #ddd",
                    justifyContent: "center",
                  }}
                >
                  <LightTooltip
                    arrow
                    disableInteractive
                    placement="top"
                    title="Add More"
                  >
                    <AuxiliaryAddMore
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => setVisibleInput(true)}
                    >
                      Add More
                    </AuxiliaryAddMore>
                  </LightTooltip>
                </Box>
              )}
            </AddComponentContainer>
          ) : (
            <AddComponentContainer
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "9px 0 0px 0",
              }}
              onClick={() => {
                showAuxComponent();
              }}
            >
              <ControlPointSharpIcon
                style={{ color: "D7282F", cursor: "pointer", fontSize: "18px" }}
              />
              Add Component
            </AddComponentContainer>
          )}
        </TableCell>
        <TableCell>
          {
            <>
              <ChooseFileIcon
                sx={{
                  // overflowX: "scroll",
                  // width: "30%",
                  paddingRight: "6px ",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    height: "3px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "10px",
                  },

                  "&::-webkit-scrollbar-thumb": {
                    background: "#6d6d6d",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#6d6d6d !important",
                  },
                }}
              >
                <ImgContainer>
                  {imagesArray?.map((element, index) => {
                    return element?.image_id?.map((image) => (
                      <AvatarGroup key={index}>
                        <Box
                          sx={{
                            position: "relative",
                            // border: "1px solid #d2d2d2",
                            // padding: "2px",
                            // height: "40px",
                            // width: "50px",
                            // display: "flex",
                            // alignItems: "center",
                            // justifyContent: "center",
                            // borderRadius: "4px",
                            "& .MuiAvatar-root": {
                              border: "2px solid #d5d5d5",
                            },
                            "&:hover": {
                              "& .editicon": {
                                display: "block !important",
                              },
                              "& .avatar-zoom": {
                                transform: "scale(1.1)",
                              },
                              "& .MuiAvatar-root": {
                                borderColor: "1px solid #ddd",
                              },
                            },
                          }}
                        >
                          <Avatar
                            src={image?.source}
                            alt="img"
                            sx={{ transition: "transform 0.3s ease-in-out" }}
                            className="avatar-zoom"
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              right: "-5px",
                              top: "-5px",
                              height: "10px",
                              display: "none",
                            }}
                            className="editicon"
                          >
                            <LightTooltip
                              arrow
                              disableInteractive
                              title="Delete"
                              placement="top"
                            >
                              <Box
                                sx={{
                                  height: "15px",
                                  width: "15px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  border: "1px solid red",
                                  padding: "2px",
                                  borderRadius: "50%",
                                  backgroundColor: "#FFECEC",
                                  zIndex: 100,
                                  position: "relative",
                                }}
                              >
                                <CloseOutlinedIcon
                                  sx={{
                                    fontSize: "13px",
                                    color: "#d7282f",

                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setImageId(image?.id);
                                    setSingleImageDeleteConfirmation(true);
                                  }}
                                >
                                  Cancel
                                </CloseOutlinedIcon>
                              </Box>
                            </LightTooltip>
                          </Box>
                        </Box>
                      </AvatarGroup>
                    ));
                  })}
                </ImgContainer>
                <label htmlFor={`imagesUpload${id || Math.random()}`}>
                  <div
                    style={{
                      height: "26px",
                      border: "1px solid #FF6066",
                      borderRadius: "4px",
                      display: "flex",
                      width: "fit-content",
                      cursor: "pointer",
                      justifyContent: "center",
                      margin: "7px 0 7px 0",
                    }}
                  >
                    <div
                      style={{
                        flex: 0.2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#FF6066",
                      }}
                    >
                      {loader ? (
                        <ThreeDots
                          height="10"
                          width="80"
                          radius="9"
                          color="white"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      ) : (
                        <FileUploadOutlinedIcon
                          style={{
                            color: "white",
                            fontSize: "20px",
                            width: "25px",
                            fontWeight: "bold",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={inputRef}
                  id={`imagesUpload${id}`}
                  onChange={(e) => {
                    handleImageChangeSpecTerm(e);
                  }}
                ></input>

                {imageId?.length > 0 && (
                  <LightTooltip placement="top" title="Delete All" arrow>
                    <span
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: "10px",
                      }}
                    >
                      <CloseIcon
                        onClick={() => {
                          setAllImageDeleteConfirmation(true);
                        }}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </span>
                  </LightTooltip>
                )}
              </ChooseFileIcon>
            </>
          }
        </TableCell>
        <TableCell className="ActionData" align="right">
          <DeleteIconContainer
            sx={{
              margin: "7px 0 7px 0",
            }}
          >
            {!isEditMode && (
              <LightTooltip
                arrow
                title="Edit"
                disableInteractive
                placement="top"
              >
                <img
                  src="/assets/EditPencil.svg"
                  alt=""
                  style={{
                    height: "15px",
                    width: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setIsEditMode(true);
                  }}
                ></img>
              </LightTooltip>
            )}
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                margin: "3px 4px 3px 7px",
                "&.MuiDivider-root": {
                  height: "16px",
                  alignSelf: "auto",
                },
              }}
            />
            <LightTooltip
              arrow
              placement="top"
              title="Delete"
              disableInteractive
            >
              <DeleteOutlineOutlinedIcon
                onClick={() => {
                  setDeleteConfirmation(true);
                }}
                style={{
                  color: "rgb(215, 40, 47)",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              />
            </LightTooltip>
          </DeleteIconContainer>
        </TableCell>
      </TableRow>
    </>
  );
};
