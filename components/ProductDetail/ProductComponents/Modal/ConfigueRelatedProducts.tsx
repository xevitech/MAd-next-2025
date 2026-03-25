import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Grid,
  MenuItem,
  Select,
  Typography,
  styled,
  TextField,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  ConfigAccordionHeader,
  EnterQuantityBox,
  FlyoutBtn,
  FlyOutButtonArea,
  ProdThumbImg,
  ProductLabel,
  SelectLbl,
} from "../../style";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { ConfigSummaryInn, ConfigSummaryOuter, ConfigTotalBox } from "./style";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { apiClient } from "@/components/common/common";
import index from "./QuickLoginModal";
function ConfigueRelatedProducts({
  fetchRelatedProducts,
  id,
  onSendRelatedData,
  relatedlist,
  totalPrice,
}) {
  const [expanded, setExpanded] = useState<string | false>("panel_1");
  const [selectedProducts, setSelectedProducts] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [specifications, setSpecifications] = useState([{}]);
  const [quantity, setQuantity] = useState("1");
  const [filterData, setFilterData] = useState([]);
  const [totalPriceModified, setTotalPriceModified] = useState([]);
  const [responseData, setResponseData] = useState([]);
  useEffect(() => {
    if (responseData.length > 0) {
      const total = responseData.reduce((acc, item) => {
        const price = parseFloat(item.price);
        const quantity1 = parseInt(quantity);
        return acc + price * quantity1;
      }, 0);

      setTotalPriceModified(total);
    }
  }, [responseData]);
  useEffect(() => {
    fetchRelatedProducts();
  }, []);
  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={
        <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem !important" }} />
      }
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    // flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginRight: theme.spacing(1),
      justifyContent: "space-between",
      alignItem: "flex-start",
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: "10px",
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));
  const [loader, setLoader] = useState(false);

  const generatePayload = () => {
    let payload = [];
    Object.values(selectedValues).forEach((spec) => {
      Object.entries(spec).forEach(([optionName, value]) => {
        payload.push(`${value},${optionName}`);
      });
    });
    return payload.join(",");
  };
  const [relatedProducts, setRelatedProducts] = useState([]);
  let result;
  const handleSelectChange = (specIndex, optionName, event) => {
    const newSpecifications = [...specifications];
    newSpecifications[specIndex] = {
      ...newSpecifications[specIndex],
      [optionName]: event.target.value,
    };
    setSpecifications(newSpecifications);
    setSelectedValues({
      ...selectedValues,
      [specIndex]: {
        ...selectedValues[specIndex],
        [optionName]: event.target.value,
      },
    });
    const payload = generatePayload();

    generateRelatedProductsJSON(payload);
  };
  if (selectedValues["0"]) {
    const extractedValues = Object.values(selectedValues["0"]);
    result = extractedValues.join(",");
  } else {
  }
  const [summary, setSummary] = useState(false);
  const filterVariations = async () => {
    if (!result) {
      toast.error("Please enter Variations");
      return;
    }
    if (!quantity) {
      toast.error("Please enter Quantity");
      return;
    }

    try {
      setLoader(true);
      const sanitizedSearchData = result
        .replace(/^,/, "")
        .replace(/,{2,}/g, ",")
        .replace(/,$/, "");

      let response = await apiClient(
        `front/matrix/list?search=${sanitizedSearchData}&product_id=${id}&product_type=configured`,
        "GET"
      );
      if (response.status === 200) {
        const newQuantity = response?.data.map((da) => {
          return { ...da, quantity: quantity };
        });
        setResponseData(response?.data);
        setRelatedProducts(response?.data);
        setFilterData((prevData) => {
          const newData = [...prevData, ...newQuantity];
          if (
            newData.length !== prevData.length ||
            !newData.every((item, index) => item === prevData[index])
          ) {
            return newData;
          }
          return prevData;
        });
        setSummary(true);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[productId]) {
        delete newSelected[productId];
      } else {
        newSelected[productId] = true;
      }
      return newSelected;
    });
  };

  const generateRelatedProductsJSON = (payload) => {
    const matchedMatrix = filterData.find((item) => {
      if (!item.json) return false;
      return Object.entries(selectedValues).every(([key, value]) => {
        return item.json[key] === value;
      });
    });

    const matrix = Object.entries(selectedValues).map(([key, value]) => ({
      value_attribute_ids: key,
      value: value,
    }));

    const relatedProduct = [
      {
        product_id: id,
        matrix: matrix.length ? matrix : [],
        quantity: matchedMatrix?.quantity || quantity || "1",
        final_price: totalPriceModified,
        image: matchedMatrix?.images?.[0]?.source || null,
      },
    ];

    onSendRelatedData(relatedProduct);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "5px" }}>
        {relatedlist.length > 0 &&
          relatedlist.map((product, index) => (
            <Box
              key={product.id || index}
              sx={{
                "& .MuiCheckbox-root": {
                  "&.Mui-checked": {
                    color: "#d7282f",
                  },
                },
                ".MuiCheckbox-root": {
                  padding: "9px 9px 9px 0px",

                  "& .MuiSvgIcon-root": {
                    display: "none",
                  },
                  "&:before": {
                    content: '" "',
                    display: "block",
                    width: "14px",
                    height: "14px",
                    border: "1px solid #d2d2d2",
                    borderRadius: "4px",
                    padding: 0,
                  },
                  "&:after": {
                    content: '" "',
                    display: "inline-block",
                    transform: "rotate(45deg)",
                    width: "4px",
                    height: "8px",
                    borderBottom: "1px solid #D7282F",
                    borderRight: "1px solid #D7282F",
                    position: "absolute",
                    top: "11px",
                    opacity: "0",
                  },
                  "&:hover": {
                    background: "transparent",
                    "&:before": {
                      borderColor: "#b1b0b0",
                    },
                  },
                  "&.Mui-checked": {
                    "&:after": {
                      opacity: "1",
                    },
                    "&:before": {
                      borderColor: "#D7282F",
                    },
                  },
                  "& .MuiCheckbox-root": {
                    padding: "5px 10px",
                  },
                },
              }}
            >
              <Checkbox
                checked={!!selectedProducts[product.id]}
                onChange={() => handleCheckboxChange(product.id)}
              />
            </Box>
          ))}
        <Box sx={{ flex: 1,"& .MuiAccordionSummary-content":{
          margin:'4px 0'
        } }}>
          {relatedlist.length > 0 ? (
            relatedlist.map((product, index) => (
              <Accordion
                sx={{
                  "&.MuiAccordion-root": {
                    borderRadius: "8px",
                    marginBottom: "12px !important",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                  },
                }}
                key={product.id}
                expanded={expanded === `panel_${index + 1}`}
                onChange={handleChange(`panel_${index + 1}`)}
              >
                <AccordionSummary
                  sx={{ padding: "0px 16px 0px 4px" }}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ProdThumbImg>
                      <img
                        src={product?.photos[0]?.source}
                        alt={product?.photos[0]?.source}
                      />
                    </ProdThumbImg>
                    <ConfigAccordionHeader>
                      <Typography>{product?.product_name}</Typography>
                    </ConfigAccordionHeader>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center",margin:'0 30px 0 0' }}>
                    <ProductLabel>Configuration</ProductLabel>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {specifications.map((_, specIndex) => (
                    <Grid container spacing={1} key={specIndex}>
                      {product?.variation_options?.map(
                        (option, optionIndex) => (
                          <Grid item xs={12} sm={6} md={4} key={option.id}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {option.name}
                            </Typography>
                            <Select
                              fullWidth
                              size="small"
                              value={
                                selectedValues[specIndex]?.[option.name] || ""
                              }
                              IconComponent={KeyboardArrowDownOutlinedIcon}
                              onChange={(e) =>
                                handleSelectChange(specIndex, option.name, e)
                              }
                            >
                              <MenuItem value="">Select</MenuItem>
                              {option.parents.map((parent, i) => (
                                <MenuItem key={i} value={parent.name}>
                                  {parent.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                        )
                      )}
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <SelectLbl sx={{ mb: 1, fontSize: "14px" }}>
                          Quantity
                        </SelectLbl>
                        <EnterQuantityBox>
                          <TextField
                            sx={{
                              "& .MuiInputBase-input": {
                                padding: "9.5px 14px",
                              },
                            }}
                            id="outlined-size-small"
                            size="small"
                            fullWidth
                            type="number"
                            placeholder="Enter Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            inputProps={{
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            }}
                          />
                        </EnterQuantityBox>
                      </Grid>
                    </Grid>
                  ))}

                  <FlyOutButtonArea>
                    <FlyoutBtn
                      onClick={() => {
                        if (selectedValues) {
                          filterVariations();
                        } else {
                          toast.error("Please select variations");
                          return;
                        }
                      }}
                      variant="outlined"
                      size="small"
                    >
                      {loader ? (
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
                        "Save"
                      )}
                    </FlyoutBtn>
                  </FlyOutButtonArea>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#000000DE",
                  }}
                >
                  No Related Product Exists
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
      {summary && (
        <ConfigSummaryOuter>
          <ConfigSummaryInn>
            <Typography variant="h5">Product Summary</Typography>
            <ConfigTotalBox>
              <Typography variant="h3">Total Price:</Typography>
              <Typography variant="body1">${totalPriceModified}</Typography>
            </ConfigTotalBox>
          </ConfigSummaryInn>
        </ConfigSummaryOuter>
      )}
    </>
  );
}

export default ConfigueRelatedProducts;
