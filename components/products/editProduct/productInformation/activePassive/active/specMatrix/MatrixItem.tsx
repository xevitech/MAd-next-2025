import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
  TableFooter,
  CircularProgress,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMatrixItem,
  listMatrix,
  setMatrixItems,
  setMatrixListPage,
  setMatrixTableLoader,
  updateItem,
} from "@/hooks/CalculatorReducer";
import {
  convertSize,
  fileTypesAllowed,
  imageSize,
  imageType,
  maxImageLimitCalculator,
} from "@/components/common/common";
import { toast } from "react-toastify";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Auth from "@/auth/Auth";
import { BASE_URL } from "@/utils/staticValues";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SaveCancelIconbox } from "../customSpecs/styles";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TablePagination from "@mui/material/TablePagination";
import CustomPagination from "@/components/common/CustomPagination";
import { PaginationBox } from "./styles";
export const MatrixItem = (props) => {
  const productId = props?.productId;
  const [priceValue, setPriceValue] = useState<any>({});
  const [defaultvalue, setDefaultValue] = useState("");
  const [delId, setDeleteId] = useState("");
  const { matrixItems, totalVariation, matrixListPage, matrixTableLoader } = useSelector(
    (state: any) => state.calculatorData
  );
  const [status, setStatus] = useState("Valid");
  const [isChecked, setIsChecked] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [matrixData, setMatrixData] = useState<any>([]);
  const [imageData, setImageData] = useState<any>([]);
  const [singleImageDeleteConfirmation, setSingleImageDeleteConfirmation] =
    useState(false);
  const [deleteAllImages, setDeleteAllImages] = useState(false);
  const [showButtons, setShowButtons] = useState("");
  const [priceError, setPriceError] = useState(false);
  const [loader, setLoader] = useState(false);

  const { productDetail, commercialInfoCurrencies } = useSelector(
    (state: any) => state.editProduct
  );
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const value = matrixItems[0]?.status;
        const initialStatus = value || "Valid";
        setStatus(initialStatus);
      } catch (error) {}
    };
    fetchStatus();
  }, []);

  // useEffect(() => {
  //   const fetchPrice = async () => {
  //     try {
  //       const value = matrixItems[0]?.price;
  //       const initialStatus = value || "";
  //       setPriceValue((prevPrices) => ({
  //         ...prevPrices,
  //         [matrixItems?.id]: value,
  //       }));
  //     } catch (error) {}
  //   };

  //   fetchPrice();
  // }, [matrixItems]);

  useEffect(() => {
    const fetchDefault = async () => {
      try {
        const value = matrixItems[0]?.is_default;
        const initialStatus = value || false;
        setDefaultValue(initialStatus);
      } catch (error) {}
    };

    fetchDefault();
  });

  const handlePriceChange = async (e, element) => {
    if (!e?.target?.value.length) {
      setPriceError(true);
    } else if (e?.target?.value.length > 0) {
      setPriceError(false);
    }
    const reg = new RegExp(/^[-]?\d*\.?\d*$/);
    const value = e.target.value;
    const digitsOnly = value.replace(".", "");
    setShowButtons(element?.id);
    if (reg.test(value) && digitsOnly.length <= 8) {
      setPriceValue((prevPrices) => ({
        ...prevPrices,
        [element?.id]: value,
      }));
    }
  };

  const handleSavePrice = async (element) => {
    // setLoader(true);
    if(priceError) return;
    dispatch(setMatrixTableLoader(true));
    try {
      await dispatch(
        updateItem({
          matrixId: element?.id,
          price: priceValue[element?.id],
          removeImage: false,
          id: productId,
        })
      );
      setPriceError(false);
      // setLoader(false);
      setShowButtons("");
    } catch {
      // setLoader(false);
    }
    finally{
      dispatch(setMatrixTableLoader(false));
    }
  };

  const handleStatusChange = async (element, value) => {
    setStatus(value);

    try {
      dispatch(setMatrixTableLoader(true));
      await dispatch(
        updateItem({
          matrixId: element?.id,
          id: productId,
          status: value,
          removeImage: false,
        })
      );
      // setLoader(false);
    } catch (error) {
      // setLoader(false);
    }
    finally{
      dispatch(setMatrixTableLoader(false));
    }
    await dispatch(listMatrix({ productId }));
  };

  const handleImageChange = async (e, element) => {
    const imagesArray = Array?.from(e?.target?.files);
    if (e?.target?.files?.length <= maxImageLimitCalculator) {
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

    const newImageArray = element?.images?.map((element) => {
      return element;
    });

    const totalFiles = newImageArray?.length + imagesArray?.length;
    if (totalFiles > maxImageLimitCalculator) {
      toast.error("Can not upload images more than 3.");
      return;
    }

    const response = await dispatch(
      updateItem({
        matrixId: element?.id,
        price: null,
        images: imagesArray,
        removeImage: false,
        id: productId,
        isDefault: element?.is_default,
      })
    );
    const image = response?.payload?.image;
    dispatch(listMatrix({ productId }));
  };

  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteMatrixItem({ matrixId: delId, productId }));
    setDeleteConfirmation(false);
  };
  useEffect(() => {
    const selectedMatrix = matrixItems?.filter(
      (item) => item?.is_default == "true"
    );

    if (selectedMatrix?.length > 0) {
      setIsChecked(selectedMatrix[0]?.id);
    }
    dispatch(listMatrix({ productId }));
  }, []);

  const handleChange = async (e, element) => {
    const updatedMatrix = matrixItems.map((item) => {
      if (item?.id == element?.id) {
        return { ...item, isSelected: e?.target?.checked };
      }
      return item;
    });
    dispatch(setMatrixItems(updatedMatrix));
    // const newValue = isChecked === element?.id ? 0 : element?.id;
    // setIsChecked(newValue);
    // try {
    //   setLoader(true);
    //   await dispatch(
    //     updateItem({
    //       matrixId: element?.id,
    //       removeImage: false,
    //       id: productId,
    //       isDefault: isChecked !== 0 ? 1 : 0,
    //     })
    //   );

    //   setLoader(false);
    // } catch {
    //   setLoader(false);
    // }
  };

  const handleChangePage = async (event) => {
    dispatch(setMatrixTableLoader(true));
    await dispatch(setMatrixListPage(event));
    setTimeout(() => {
      dispatch(setMatrixTableLoader(false));
    }, 1200);
  };

  useEffect(() => {
    dispatch(listMatrix({ productId }));
  }, [matrixListPage]);

  const handleDeleteAllImages = async () => {
    await dispatch(
      updateItem({
        matrixId: matrixData?.id,
        price: matrixData?.price,
        images: null,
        removeAllImage: true,
        id: productId,
        isDefault: matrixData?.is_default,
        status: matrixData?.status,
      })
    );

    await dispatch(listMatrix({ productId }));
    setDeleteAllImages(false);
    setMatrixData([]);
  };

  const handleSingleImageDelete = async () => {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("published", "0");
    formData.append("matrix_id", matrixData?.id);
    formData.append("image_id", imageData?.id);
    try {
      const response = await fetch(`${BASE_URL}/product/delete/matrix/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      if (response?.ok) {
        await dispatch(listMatrix({ productId }));
        setSingleImageDeleteConfirmation(false);
        setImageData([]);
        setMatrixData([]);
      }
    } catch (error) {}
  };

  const handleSelectAll = async (e) => {
    const updatedMatrix = matrixItems?.map((item) => {
      return { ...item, isSelected: e?.target?.checked };
    });
    dispatch(setMatrixItems(updatedMatrix));
  };

  return (
    <Box
      sx={{
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        position: "relative",
      }}
    >
      {matrixTableLoader && (
        <Box
          sx={{
            position: "absolute",
            content: '""',
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(2px)",
            zIndex: "9",
          }}
        >
          <CircularProgress disableShrink sx={{ color: "#d7282f" }} />
        </Box>
      )}
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="generated specification matrix"
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

      {deleteAllImages && (
        <DeleteDialog
          open={deleteAllImages}
          handleClose={setDeleteAllImages}
          text="all image"
          onClickAction={handleDeleteAllImages}
        />
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "5%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    fontSize: "13px",
                    fontWeight: "600 !important",
                  }}
                >
                  <Checkbox
                    id="checkbox"
                    checked={matrixItems?.some((item) => item?.isSelected)}
                    onChange={(e) => handleSelectAll(e)}
                    sx={{
                      "&.MuiCheckbox-root": {
                        color: "#d7282f",
                        padding: "0px",
                        "& .MuiSvgIcon-root": {
                          fontSize: "18px",
                        },
                      },
                    }}
                  />
                  {/* <LightTooltip
                    arrow
                    placement="top"
                    title="This is the default selection"
                  >
                    <InfoOutlinedIcon
                      sx={{
                        fontSize: "18px",
                        margin: "0 0 0 2px",
                        color: "#d7282f",
                      }}
                    />
                  </LightTooltip>{" "} */}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "8%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    fontSize: "13px",
                    fontWeight: "600 !important",
                  }}
                >
                  Sr. No.
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    fontSize: "13px",
                    fontWeight: "600 !important",
                  }}
                >
                  SKU No.
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    fontSize: "13px",
                    fontWeight: "600 !important",
                  }}
                >
                  Product Specifications
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    fontSize: "13px",
                    fontWeight: "600 !important",
                  }}
                >
                  Price{" "} (
                      {productDetail?.currency_id &&
                        (commercialInfoCurrencies
                          ?.find(
                            (item) => item?.value === productDetail?.currency_id
                          )
                          ?.view.match(/\((.*?)\)/)?.[1] ||
                          "")}
                      )
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    fontSize: "13px",
                    fontWeight: "600 !important",
                  }}
                >
                  Status
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "26%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    fontSize: "13px",
                    fontWeight: "600 !important",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Image
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    fontSize: "13px",
                    fontWeight: "600 !important",
                  }}
                >
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matrixItems
              // ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((element, index) => (
                <TableRow
                  key={element.id}
                  sx={{
                    "& .MuiTableCell-root": {
                      padding: "10px 16px",
                    },
                  }}
                >
                  <TableCell>
                    <Checkbox
                      id="checkbox"
                      checked={element?.isSelected ? true : false}
                      onChange={(e) => handleChange(e, element)}
                      sx={{
                        "&.MuiCheckbox-root": {
                          color: "#d7282f",
                          padding: "0px",
                          "& .MuiSvgIcon-root": {
                            fontSize: "18px",
                          },
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "14px" }}>
                      {index + 1 + (matrixListPage - 1) * 10}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "14px" }}>
                      {productDetail?.stock_keeping_unit}_{(index + 1 + (matrixListPage - 1) * 10).toString().padStart(4, '0')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "14px" }}>
                      {element?.value?.replaceAll("_", " ")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          placeholder="Enter Value"
                          size="small"
                          inputProps={{
                            style: {
                              height: "20px !important",
                              padding: "8px",
                              fontSize: "12px",
                            },
                          }}
                          onChange={(e) => handlePriceChange(e, element)}
                          value={
                            priceValue[element.id] !== undefined
                              ? priceValue[element.id]
                              : element.price || ""
                          }
                        />
                        {priceError && showButtons == element?.id && (
                          <Typography
                            sx={{ color: "#d7282f", fontSize: "10px" }}
                          >
                            <img
                              src="/assets/error-outline-red.svg"
                              alt=""
                              style={{
                                width: "8px",
                                height: "8px",
                                margin: "0 4px 0 0",
                              }}
                            />
                            {"Please enter price"}
                          </Typography>
                        )}
                      </FormControl>
                      {showButtons == element?.id && (
                        <SaveCancelIconbox>
                          <LightTooltip
                            arrow
                            title="Save"
                            disableInteractive
                            placement="top"
                          >
                            <SaveOutlinedIcon
                              onClick={() => handleSavePrice(element)}
                              sx={{ fontSize: "20px", cursor: "pointer" }}
                            />
                          </LightTooltip>
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{ margin: "1px 1px 1px 3px" }}
                          />
                          <LightTooltip
                            arrow
                            title="Cancel"
                            disableInteractive
                            placement="top"
                          >
                            <CloseOutlinedIcon
                              onClick={() => {
                                setShowButtons("");
                                setPriceValue("");
                                setPriceError(false);
                              }}
                              sx={{ fontSize: "20px", color: "#d7282f" }}
                            >
                              Cancel
                            </CloseOutlinedIcon>
                          </LightTooltip>
                        </SaveCancelIconbox>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ fontSize: "14px" }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{
                            "&.MuiFormLabel-root": {
                              fontSize: "12px",
                              fontWeight: 700,
                            },
                          }}
                          shrink={true}
                        >
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          size="small"
                          name="status"
                          placeholder="Select status"
                          value={element?.status ? element?.status : "Valid"}
                          // onBlur={(e) => {
                          //   handleStatusChange(element, e?.target?.value);
                          // }}
                          autoFocus
                          onChange={(e) => {
                            handleStatusChange(element, e?.target?.value);
                          }}
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              fontSize: "13px",
                              padding: "5.8px 14px",
                            },
                          }}
                        >
                          <MenuItem value={"Valid"}>Valid</MenuItem>
                          <MenuItem value={"Invalid"}>Invalid</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </TableCell>
                  {/* <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {element?.images?.length > 0 &&
                          element?.images?.map((item) => {
                            return (
                              <Box
                                key={item.id}
                                sx={{
                                  position: "relative",
                                  border: "1px solid #d2d2d2",
                                  padding: "2px",
                                  height: "40px",
                                  width: "50px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "4px",
                                  "&:hover": {
                                    "& .editicon": {
                                      display: "block !important",
                                    },
                                  },
                                }}
                              >
                                <img
                                  src={item?.source}
                                  alt="img"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain",
                                  }}
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
                                      }}
                                    >
                                      <CloseOutlinedIcon
                                        sx={{
                                          fontSize: "13px",
                                          color: "#d7282f",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          setMatrixData(element);
                                          setImageData(item);
                                          setSingleImageDeleteConfirmation(
                                            true
                                          );
                                        }}
                                      >
                                        Cancel
                                      </CloseOutlinedIcon>
                                    </Box>
                                  </LightTooltip>
                                </Box>
                              </Box>
                            );
                          })}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <label htmlFor={`imageProduct${element?.id}`}>
                          <div
                            style={{
                              height: "26px",
                              border: "1px solid #FF6066",
                              borderRadius: "4px",
                              display: "flex",
                              width: "fit-content",
                              cursor: "pointer",
                              justifyContent: "center",
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
                              <FileUploadOutlinedIcon
                                style={{
                                  color: "white",
                                  fontSize: "20px",
                                  width: "25px",
                                  fontWeight: "bold",
                                }}
                              />
                            </div>
                          </div>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          id={`imageProduct${element?.id}`}
                          onChange={(e) => handleImageChange(e, element)}
                        ></input>
                        {element?.images?.length > 0 && (
                          <LightTooltip
                            placement="top"
                            title="Delete All"
                            arrow
                          >
                            <CloseIcon
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => {
                                setDeleteAllImages(true);
                                setMatrixData(element);
                              }}
                            />
                          </LightTooltip>
                        )}
                      </Box>
                    </Box>
                  </TableCell> */}
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {element?.images?.length > 0 && (
                          <AvatarGroup max={4}>
                            {element?.images?.map((item) => (
                              <Box
                                key={item.id}
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
                                  // overflow: "hidden",
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
                                  src={item?.source}
                                  alt="img"
                                  className="avatar-zoom"
                                  sx={{
                                    // height: "100%",
                                    // width: "100%",
                                    objectFit: "contain",
                                    transition: "transform 0.3s ease-in-out",
                                    "&:hover": {
                                      "& img": {
                                        background: "red",
                                      },
                                    },
                                  }}
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
                                      }}
                                    >
                                      <CloseOutlinedIcon
                                        sx={{
                                          fontSize: "13px",
                                          color: "#d7282f",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          setMatrixData(element);
                                          setImageData(item);
                                          setSingleImageDeleteConfirmation(
                                            true
                                          );
                                        }}
                                      >
                                        Cancel
                                      </CloseOutlinedIcon>
                                    </Box>
                                  </LightTooltip>
                                </Box>
                              </Box>
                            ))}
                          </AvatarGroup>
                        )}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <label htmlFor={`imageProduct${element?.id}`}>
                          <div
                            style={{
                              height: "26px",
                              border: "1px solid #FF6066",
                              borderRadius: "4px",
                              display: "flex",
                              width: "fit-content",
                              cursor: "pointer",
                              justifyContent: "center",
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
                              <FileUploadOutlinedIcon
                                style={{
                                  color: "white",
                                  fontSize: "20px",
                                  width: "25px",
                                  fontWeight: "bold",
                                }}
                              />
                            </div>
                          </div>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          id={`imageProduct${element?.id}`}
                          onChange={(e) => handleImageChange(e, element)}
                        ></input>
                        {element?.images?.length > 0 && (
                          <LightTooltip
                            placement="top"
                            title="Delete All"
                            arrow
                          >
                            <CloseIcon
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: "20px",
                              }}
                              onClick={() => {
                                setDeleteAllImages(true);
                                setMatrixData(element);
                              }}
                            />
                          </LightTooltip>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <LightTooltip
                      arrow
                      placement="top"
                      title="Delete"
                      disableInteractive
                    >
                      <DeleteOutlineOutlinedIcon
                        style={{
                          color: "#D7282F",
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                        onClick={() => {
                          setDeleteConfirmation(true);
                          setDeleteId(element?.id);
                        }}
                      />
                    </LightTooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {totalVariation >= 10 && (
        <PaginationBox>
          {/* <TableRow> */}
          <CustomPagination
            currentPage={matrixListPage}
            totalPages={Math.ceil(totalVariation / 10)}
            onPageChange={handleChangePage}
          />
          {/* </TableRow> */}
        </PaginationBox>
      )}
    </Box>
  );
};
