import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
} from "@mui/material";
import React from "react";
import { AdvertisementText, FontContainer } from "../../style";
import { OptionContainer, Options } from "./style";
import { useFormik } from "formik";
import _debounce from "lodash/debounce";
export default function AdditionalDetails({
  quotedetails,
  QuotationDatahandler,
  quotationData,
}) {
  const { company_name, industry } = localStorage?.userData
    ? JSON.parse(localStorage.userData)
    : { company_name: "", industry: "" };
  const options = [
    {
      id: 1,
      value:
        "Conver it to RFQ and send to other suppliers. If this supplier does not respond within 48 hours",
    },
    {
      id: 2,
      value: "Complete this order through Merchant AD Trusted Account",
    }, 
    {
      id: 3,
      value: "Share your contacts details with supplier",
    },
  ];
  const DefaultValue = [
    {
      id: 1,
      value: "What is shiping Cost?",
      color: "#3BB900",
      background: "#ECFBE6",
      borderColor: "#BFEAAC",
    },
    {
      id: 2,
      value: "What is payment method?",
      color: "#D7282F",
      background: "#FFE8EC",
      borderColor: "#F6CFD1",
    },
    {
      id: 3,
      value: "What is delivery time?",
      color: "#FFA31A",
      background: "#FFF6E8",
      borderColor: "#FFD69A",
    },
    {
      id: 4,
      value: "What is best price?",
      color: "#599CFF",
      background: "#B0D0FF",
      borderColor: "#B0D0FF",
    },
  ];
  let formik = useFormik({
    initialValues: {
      details:
        `Hello ${quotedetails?.seller_name},
    We are interested in ( ${quotedetails?.name} - ${quotedetails?.unique_number})`,
      options: quotationData?.select ?? [],
      industry: industry ? industry : "",
      enquiry_type: "",
    },
    onSubmit: (values) => {},
  });

  const delayedQuery = React.useRef(
    _debounce(
      (value) =>
        QuotationDatahandler({
          message: value,
        }),
      1000
    )
  ).current;

  let IndustryList = [
    "Online Shop",
    "Manufacturer",
    "Trading Company",
    "Distributor",
    "Retailer",
    "Individual",
    "Other",
  ];
  let EnquiryList = [
    "End user",
    "Government Entity",
    "Project Execution stage",
    "Project awarded",
    "Budgetary",
  ];

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        paddingTop={2}
      >
        <TextField
          label={"Company"}
          sx={{ width: "100%" }}
          size="small"
          value={company_name}
          onChange={(e) => console.log("")}
        />

        <FormControl fullWidth>
          <InputLabel size="small" id="demo-simple-enquiry-type">
            Enquiry Type
          </InputLabel>
          <Select
            size="small"
            labelId="demo-simple-enquiry-type"
            id="demo-simple-enquiry-type"
            value={formik.values.enquiry_type}
            label="Enquiry"
            onChange={(e) => {
              formik.setFieldValue("enquiry_type", e.target.value);
              QuotationDatahandler({
                enquiry_type: e.target.value,
              });
            }}
          >
            {EnquiryList.map((v, i) => (
              <MenuItem value={v} key={`${v}_${i}`}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel size="small" id="demo-simple-industry">
            Industry
          </InputLabel>
          <Select
            size="small"
            labelId="demo-simple-industry"
            id="demo-simple-industryz"
            value={formik.values.industry}
            label="Industry"
            onChange={(e) => {
              formik.setFieldValue("industry", e.target.value);
              QuotationDatahandler({
                industry: e.target.value,
              });
            }}
          >
            {IndustryList.map((v, i) => (
              <MenuItem value={v} key={`${v}_${i}`}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        component="div"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: "30px",
        }}
      >
        <TextField
          sx={{ width: "100%" }}
          variant="outlined"
          label="Add Details to Your Request"
          multiline={true}
          rows="3"
          name="details"
          value={formik.values.details}
          onChange={(e) => {
            formik.setFieldValue("details", e.target.value);
            delayedQuery(e.target.value);
          }}
        />
        <Box
          component="div"
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Grid container justifyContent="flex-start">
            {DefaultValue.map((v, i) => {
              if (!formik.values.details.includes(v.value)) {
                return (
                  <Grid item key={i}>
                    <AdvertisementText
                      key={i}
                      color={v.color}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        formik.setFieldValue(
                          "details",
                          `${formik.values.details} ${v.value}`
                        );
                        QuotationDatahandler({
                          message: `${formik.values.details} ${v.value}`,
                        });
                      }}
                    >
                      {v.value}
                    </AdvertisementText>
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      </Box>
      <OptionContainer>
        <FontContainer
          sx={{
            fontSize: "16px",
            color: "#000000",
            fontWeight: "600",
            margin: "16px 0 6px",
          }}
        >
          Options
        </FontContainer>
        <Grid container spacing={2}>
          {options.map((v, i) => (
            <Grid item xs={12} sm={6} md={4} position="relative" key={i}>
              <Options>
                <FormGroup
                  className={
                    formik.values.options.includes(v.value) ? "active" : ""
                  }
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label={v.value}
                    checked={formik.values.options.includes(v.value)}
                    onChange={(e: any) => {
                      if (formik.values.options.includes(v.value)) {
                        let optionValues = formik.values.options.filter(
                          (val) => val !== v.value
                        );
                        formik.setFieldValue("options", optionValues);
                        QuotationDatahandler({
                          select: optionValues,
                        });
                      } else {
                        let value = [...formik.values.options, v.value];
                        formik.setFieldValue("options", value);
                        QuotationDatahandler({
                          select: value,
                        });
                      }
                    }}
                  />
                </FormGroup>
              </Options>
            </Grid>
          ))}
        </Grid>
      </OptionContainer>
    </div>
  );
}
