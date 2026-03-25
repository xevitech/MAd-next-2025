import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  BoxSelectAdd,
  Btn,
  Btn2,
  Btn3,
  CreatAddPopover,
  CreateAddFooter,
  CreateAddInner,
  CreateAddTable,
  CreateAddTitle,
  DateTime,
  Popovertext,
  RedTypography,
  SelectWhen,
  SetDatesData,
  Setyourdates,
  ThProductImage,
  ThProductListBox,
  ThProductName,
} from "./style";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuItem from "@mui/material/MenuItem";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import { DataGridPro, GridToolbarContainer } from "@mui/x-data-grid-pro";
import { CustomDatePicker } from "../common/datePicker";
import { DataGridStyle } from "../common/commonStyle";
import { useAppDispatch } from "redux/store";
import { createAds, updateAds } from "@/hooks/UseAds";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { convertUnderscoreToSpaceAndCapitalize } from "@/utils/commonFunctions/other";
import { useFormik } from "formik";
import * as Yup from "yup";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { apiClient } from "../common/common";
import EmptyPage from "../common/EmptyPage";
import moment from "moment";
import { CustomDateTimePicker } from "../common/datePicker/CustomDateTimePicker";
const column: any = [
  {
    field: "sr_no",
    headerName: "Serial No",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => {
      return <>{params?.row?.sr_no}</>;
    },
  },
  {
    field: "unique_number",
    headerName: "Product Id",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => {
      return <>{params?.row?.unique_number}</>;
    },
  },
  {
    field: "name",
    headerName: "Product Image/Name",
    flex: 1,
    minWidth: 200,
    renderCell: (params) => {
      return (
        <ThProductListBox>
          <ThProductImage src={params?.row?.photos} alt={params?.row?.name} />
          <ThProductName>{params?.row?.name}</ThProductName>
        </ThProductListBox>
      );
    },
  },
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    minWidth: 200,
    renderCell: (params) => {
      return <>{params?.row?.category_name}</>;
    },
  },
  {
    field: "product_type",
    headerName: "Product Type",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => {
      return (
        <>
          {params?.row?.product_type === "simple" ? "Simple" : "Configuration"}
        </>
      );
    },
  },
  {
    field: "validity",
    headerName: "Post Validity",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => {
      return (
        <>{convertUnderscoreToSpaceAndCapitalize(params?.row?.validity)}</>
      );
    },
  },
];

export default function CreateAdd(props) {
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const [products, setProducts] = useState<any>([]);
  const [productLoader, setProductLoader] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setlastpage] = React.useState<number>(0);
  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const dispatch = useAppDispatch();
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  useEffect(() => {
    FetchProductList();
  }, []);

  const { createLoader } = useSelector((state: any) => state.ads);
  const [fromDate, setFromDate] = React.useState<any>(
    moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  );
  const validation = Yup.object().shape({
    ad_type: Yup.string().required("Please select ads type"),
    title_1: Yup.string().required("Please enter title 1"),
    title_2: Yup.string().required("Please enter title 2"),
    title_3: Yup.string().required("Please enter title 3"),
    start_date: Yup.date().required("Please select start date"),
    end_date: Yup.date()
      .required("Please select end date")
      .min(Yup.ref("start_date"), "End date can't be before Start date"),
  });

  let formik: any = useFormik({
    initialValues: {
      ad_type: props.editMode == "Edit" ? props?.data?.ad_type : "",
      title_1: props.editMode == "Edit" ? props?.data?.title_1 : "",
      title_2: props.editMode == "Edit" ? props?.data?.title_2 : "",
      title_3: props.editMode == "Edit" ? props?.data?.title_3 : "",
      product_id:
        props.editMode == "Edit"
          ? props?.data?.product_ids?.map((v) => +v)
          : [],
      start_date: props.editMode == "Edit" ? props?.data?.start_date : "",
      end_date: props.editMode == "Edit" ? props?.data?.end_date : "0000-00-00",
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (props.editMode == "New") {
        let res = await dispatch(createAds(values));
        if (res?.payload?.status == "200" || res?.payload?.status == true) {
          toast.success(res?.payload?.message);
          props.fetchAllAds();
          CloseMainPopOver();
        } else {
          // toast.error("testing");
          toast.error(res?.payload?.message);
        }
      } else {
        let updateData = values;
        updateData["id"] = props?.data?.id;
        let res = await dispatch(updateAds(updateData));
        if (res?.payload?.status == "200" || res?.payload?.status == true) {
          toast.success(res?.payload?.message);
          props.fetchAllAds();
          CloseMainPopOver();
        } else {
          toast.error(res?.payload?.message);
        }
      }
    },
  });

  const CloseMainPopOver = async () => {
    props.closePopOver();
  };

  const ValidateField = (field: string) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };
  useEffect(() => {
    formik.setFieldValue("start_date", moment().format("YYYY-MM-DD HH:mm:ss"));
    formik.setFieldValue("end_date", moment().format("YYYY-MM-DD HH:mm:ss"));

    if (props?.data?.start_date) {
      formik.setFieldValue("start_date", props?.data?.start_date);
    }

    if (props?.data?.end_date) {
      formik.setFieldValue("end_date", props?.data?.end_date);
      formik.setFieldError("end_date", "");
    }

  }, []);

  const handleChangeStart = (value) => {
    formik.setFieldValue("start_date", value);
  };
  const handleChangeEnd = (value) => {
    formik.setFieldValue("end_date", value);
    formik.setFieldError("end_date", "");
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Box sx={{ p: 1 }}>
          <Typography
            sx={{
              fontWeight: "600 !important",
              fontSize: "18px",
              color: "#231F20",
            }}
          >
            Select Products
          </Typography>
        </Box>
      </GridToolbarContainer>
    );
  }

  const adsOptions = ["Simple"];

  const FetchProductList = async (page = 1) => {
    setProductLoader(true);
    let response = await apiClient("product/list", "get", {
      body: { per_page: "10", page },
    });

    if (response.status === 200) {
      const filteredProducts = response.data.filter(
        (v) => !["draft", "rejected"].includes(v.published_status)
      );

      if (filteredProducts.length > 0) {
        setProducts(
          filteredProducts.map((v: any, i: any) => ({ ...v, sr_no: i + 1 }))
        );
      } else {
        setProducts([]);
      }

      setlastpage(response.lastpage);
    } else {
    }

    setProductLoader(false);
  };

  return (
    <>
      <CreateAddTitle>
        <Popovertext>Which ad do you want to use?</Popovertext>
        <Box>
          <CloseOutlinedIcon
            sx={{ cursor: "pointer" }}
            onClick={CloseMainPopOver}
          />
        </Box>
      </CreateAddTitle>
      <Divider />

      <CreateAddInner>
        <form onSubmit={formik.handleSubmit}>
          <BoxSelectAdd
            sx={{
              display: "flex",
              alignItems: `${formik?.errors?.ad_type ? "start" : "center"}`,
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: "314px" }} size="small">
              <InputLabel id="demo-select-small-label">
                Select ads type
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Age"
                onChange={(e) => {
                  formik.setFieldValue("ad_type", e.target.value);
                  formik.setFieldError("ad_type", "");
                }}
                value={formik.values.ad_type}
                error={ValidateField("ad_type")}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {},
                }}
              >
                {adsOptions.map((option) => (
                  <MenuItem value={option.toLowerCase()}>{option}</MenuItem>
                ))}
              </Select>

              {formik?.errors?.ad_type && (
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
                    {formik.errors.ad_type}
                  </Typography>
                </Box>
              )}
            </FormControl>
            <Box>
              <Btn3
                aria-describedby={open1 ? "image-view" : undefined}
                onClick={handleClick1}
                disableRipple
              >
                <ContactSupportOutlinedIcon sx={{ mt: 2.3, ml: 1.5 }} />
              </Btn3>

              <CreatAddPopover
                open={open1}
                anchorEl={anchorEl1}
                onClose={handleClose1}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: "150px",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: -1.5,
                    ml: 1,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 23,
                      left: -5,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Box className="adsshown">
                  <Box className="adsshownInn">
                    <Typography>Under Product Name/Title</Typography>
                    <img src="/assets/images/adsscreenshot.png" alt="Image" />
                    <RedTypography>
                      Your ads will be show here.
                    </RedTypography>
                  </Box>
                </Box>
              </CreatAddPopover>
            </Box>
          </BoxSelectAdd>
          <Box display="flex" mt={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                  size="small"
                  label="Title 1"
                  focused
                  sx={{
                    width: "100%",
                    "& label.Mui-focused": {
                      color: "#D7282F",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#D7282F !important",
                      },
                    },
                    input: { color: "#D7282F" },
                    "& .MuiFormHelperText-root": {
                      color: "#D7282F !important",
                    },
                  }}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    navigator.clipboard
                      .writeText(newValue)
                      .then(() => {
                        formik.setFieldValue("title_1", newValue.slice(0, 100));
                      })
                      .catch((error) => { });

                    if (newValue.length <= 100) {
                      formik.setFieldValue("title_1", newValue);
                      formik.setFieldError("title_1", "");
                    } else {
                      formik.setFieldError(
                        "title_1",
                        "Only 100 characters allowed"
                      );
                    }
                  }}
                  value={formik.values.title_1}
                />
                {formik?.errors?.title_1 && (
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
                      {formik.errors.title_1}
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                  size="small"
                  label="Title 2"
                  focused
                  sx={{
                    width: "100%",
                    "& label.Mui-focused": {
                      color: "#51C11C",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#51C11C !important",
                      },
                    },
                    input: { color: "#51C11C" },
                    "& .MuiFormHelperText-root": {
                      color: "#D7282F !important",
                    },
                  }}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    navigator.clipboard
                      .writeText(newValue)
                      .then(() => {
                        formik.setFieldValue("title_2", newValue.slice(0, 100));
                      })
                      .catch((error) => { });

                    if (newValue.length <= 100) {
                      formik.setFieldValue("title_2", newValue);
                      formik.setFieldError("title_2", "");
                    } else {
                      formik.setFieldError(
                        "title_2",
                        "Only 100 characters allowed"
                      );
                    }
                  }}
                  value={formik.values.title_2}
                />
                {formik?.errors?.title_2 && (
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
                      {formik.errors.title_2}
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                  size="small"
                  label="Title 3"
                  focused
                  sx={{
                    width: "100%",
                    "& label.Mui-focused": {
                      color: "#FFA319",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#FFA319 !important",
                      },
                    },
                    input: { color: "#FFA319" },
                    "& .MuiFormHelperText-root": {
                      color: "#D7282F !important",
                    },
                  }}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    navigator.clipboard
                      .writeText(newValue)
                      .then(() => {
                        formik.setFieldValue("title_3", newValue.slice(0, 100));
                      })
                      .catch((error) => { });

                    if (newValue.length <= 100) {
                      formik.setFieldValue("title_3", newValue);
                      formik.setFieldError("title_3", "");
                    } else {
                      formik.setFieldError(
                        "title_3",
                        "Only 100 characters allowed"
                      );
                    }
                  }}
                  value={formik.values.title_3}
                />
                {formik?.errors?.title_3 && (
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
                      {formik.errors.title_3}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
          <CreateAddTable>
            {productLoader ? (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <CircularProgress
                  style={{
                    color: "#D7282F",
                    height: "25px",
                    width: "25px",
                  }}
                />
              </Stack>
            ) : products.length === 0 ? (
              <Typography sx={{ fontSize: "16px", color: "#d7282f" }}>
                <EmptyPage
                  text={"Publish"}
                  onClickHandler={() => { }}
                  logo="/assets/contact_img.svg"
                  actiontext={false}
                />
              </Typography>
            ) : (
              <DataGridPro
                rows={products}
                columns={column}
                initialState={{}}
                pagination
                checkboxSelection
                disableSelectionOnClick={true}
                sx={DataGridStyle}
                selectionModel={formik.values.product_id}
                components={{
                  Toolbar: CustomToolbar,
                  Pagination: () => {
                    if (lastPage > 1) {
                      return (
                        <Pagination
                          count={lastPage}
                          page={page}
                          onChange={(e, page) => {
                            setPage(page);
                            FetchProductList(page);
                          }}
                          size="small"
                        />
                      );
                    }
                  },
                }}
                onSelectionModelChange={(ids) => {
                  formik.setFieldValue("product_id", ids);
                  formik.setFieldError("product_id", "");
                }}
              />
            )}
            {formik.errors.product_id && (
              <Typography sx={{ fontSize: "10px", color: "#d7282f" }}>
                <WarningAmberOutlinedIcon
                  style={{ fontSize: "10px", margin: "0px 4px 0 0" }}
                />
                {ValidateField("product_id")
                  ? `${formik.errors.product_id}`
                  : ""}
              </Typography>
            )}
          </CreateAddTable>

          <SetDatesData>
            <Setyourdates>Set your Dates</Setyourdates>
            <SelectWhen>
              Select when you would like your advertising to start and end.
            </SelectWhen>
            <Box marginTop={2} gap={3} mb={1.5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <DateTime>Start Date</DateTime>
                  {/* <CustomDatePicker
                    name="startDate"
                    // label="Start Date"
                    handleChange={({ target }) => {
                      formik.setFieldValue("start_date", target.value);
                      formik.setFieldError("start_date", "");
                    }}
                    value={formik.values.start_date}
                    error={ValidateField("start_date")}
                    errorText={
                      ValidateField("start_date")
                        ? `${formik.errors.start_date}`
                        : ""
                    }
                    defaultDate={moment(new Date()).format("YYYY-MM-DD")}
                  /> */}
                  <CustomDateTimePicker
                    label={""}
                    value={formik.values.start_date}
                    handleChange={handleChangeStart}
                  // mindate={moment(new Date())}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <DateTime>End Date</DateTime>
                  {/* <CustomDatePicker
                    name="endDate"
                    handleChange={({ target }) => {
                      formik.setFieldValue("end_date", target.value);
                      formik.setFieldError("end_date", "");
                    }}
                    value={formik.values.end_date}
                    error={ValidateField("end_date")}
                    errorText={
                      ValidateField("end_date")
                        ? `${formik.errors.end_date}`
                        : ""
                    }
                    defaultDate={moment(new Date()).format("YYYY-MM-DD")}
                  /> */}
                  <CustomDateTimePicker
                    label={""}
                    value={formik.values.end_date}
                    handleChange={handleChangeEnd}
                    errorText={
                      ValidateField("end_date")
                        ? `${formik.errors.end_date}`
                        : ""
                    }
                    error={ValidateField("end_date")}
                  // mindate={moment(new Date())}
                  />
                </Grid>
              </Grid>
            </Box>
          </SetDatesData>
          <CreateAddFooter sx={{ mt: 2, pb: 3 }}>
            <Btn2 onClick={CloseMainPopOver}>Cancel</Btn2>
            <Btn type="submit">
              {createLoader ? (
                <ThreeDots
                  height="18"
                  width="40"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                "Launch"
              )}
            </Btn>
          </CreateAddFooter>
        </form>
      </CreateAddInner>
    </>
  );
}
