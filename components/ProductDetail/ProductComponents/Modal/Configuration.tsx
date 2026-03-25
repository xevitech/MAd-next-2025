import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControl,
  Divider,
  Grid,
  Stack,
  Chip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FontContainer } from "@/components/ProductDetail/style";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FirstletterCapital, apiClient } from "@/components/common/common";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

// Outside of functional component
const useStyles = makeStyles()((theme) => {
  return {
    mainbox: {
      boxShadow:
        "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32) !important",
    },
    typotxt: {
      color: "#6C6C6C",
      fontSize: "16px !important",
    },

    boxouter: { background: "#f4f6fa" },
  };
});

const Configuration = ({
  productConfiguration,
  setProductCOnfiguration,
  quantities,
  setQuantities,
  variation_options,
  id,
  selectedProductOptions = [],
  setSelectedProductOptions = null,
}) => {
  const { classes } = useStyles();
  const [dropDownTab, setDropDownTab] = useState<any>([1]);
  const [seperate, setSeperate] = useState<any>([]);
  const [price, setPrice] = useState<any>({});

  useEffect(() => {
    if (selectedProductOptions.length > 0) {
      let tabsCount = selectedProductOptions.map((v, i) => i + 1);
      let quantityCount = selectedProductOptions.map((v) => 1);
      setDropDownTab(tabsCount);
      setQuantities(quantityCount);
      setProductCOnfiguration(selectedProductOptions);
    }
  }, selectedProductOptions);

  const onChangeHandler = (e, parent, index, childIndex) => {
    let config: any = [...productConfiguration];
    const { name } = e.target;
    const [parentName, itemName] = e.target.value.split("__");
    let value = config?.[index] ? [...config[index]] : [];
    value[childIndex] = { parentID: "", childID: "", itemName, name };
    let newValue = [];
    for (let i = 0; i < variation_options.length; i++) {
      newValue.push(value?.[i] ?? "no");
    }
    config[index] = newValue;
    setProductCOnfiguration(config);
  };

  const QunatityHandler = (e, index) => {
    let productQuantity = [...quantities];
    productQuantity[index] = e.target.value;
    setQuantities(productQuantity);
  };

  const AddQunatityHandler = (index) => {
    let productQuantity = [...quantities];
    productQuantity[index] = quantities[index] + 1;
    setQuantities(productQuantity);
  };
  const MinusQunatityHandler = (index) => {
    let productQuantity = [...quantities];
    productQuantity[index] = quantities[index] - 1;
    if (productQuantity[index] > 0) setQuantities(productQuantity);
  };

  const AddMoreHandler = () => {
    if (productConfiguration.length === dropDownTab.length) {
      setDropDownTab((prev) => [...prev, prev.length + 1]);
      setQuantities((prev) => [...prev, 1]);
    } else {
      toast.error("Please select values");
    }
  };

  const CalculatePrice = async () => {
    let formData = new FormData();
    productConfiguration.forEach((parent, parentIndex) => {
      parent.forEach((child, childIndex) => {
        if (child?.name) {
          formData.append(
            `data[${parentIndex}][select][${childIndex}][option]`,
            child.name
          );
        }
        if (child?.itemName) {
          formData.append(
            `data[${parentIndex}][select][${childIndex}][value]`,
            child.itemName
          );
        }
      });
      formData.append(
        `data[${parentIndex}][number]`,
        quantities?.[parentIndex] ?? 1
      );
    });
    formData.append("product_id", id);
    let response = await apiClient(
      "front/single_product_variation_check",
      "post",
      {
        body: formData,
      },
      true
    );
    if (response.status === 200) {
      const { total, unit, seperate } = response;
      setPrice({ unit, total });
      setSeperate(seperate);
    }
  };

  useEffect(() => {
    if (productConfiguration.length > 0) {
      CalculatePrice();
    }
  }, [productConfiguration, quantities]);

  const PriceFormatter = (str, quantity) => {
    const [symbol, price] = str.split(" ");
    return `${symbol} ${price * quantity}`;
  };

  const RemoveHandler = (index) => {
    setDropDownTab((prev) => {
      let tabs = [...prev];
      tabs.splice(index, 1);
      return tabs;
    });
    setProductCOnfiguration((prev) => {
      let list = [...prev];
      list.splice(index, 1);
      return list;
    });

    setQuantities((prev) => {
      let quantity = [...prev];
      quantity.splice(index, 1);
      return quantity;
    });
    if (selectedProductOptions?.length > 0) {
      if (setSelectedProductOptions) {
        setSelectedProductOptions((prev) => {
          let optionsList = [...selectedProductOptions];
          optionsList.splice(index, 1);
          return optionsList;
        });
      }
    }
  };

  return (
    <Accordion
      sx={{ width: "100%" }}
      defaultExpanded={true}
      className={classes.mainbox}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <FontContainer className={classes.typotxt}>
          {" "}
          Configure Product
        </FontContainer>
      </AccordionSummary>
      <AccordionDetails>
        <>
          {dropDownTab.map((value, i) => (
            <Grid
              key={i}
              container
              alignItems="flex-start"
              spacing={1}
              marginBottom="16px"
            >
              <Grid item sm={6} md={6} xs={6} xl={10} lg={10}>
                <Grid container spacing={1} alignItems="center">
                  {variation_options?.map((val, index) => {
                    let defaultValue = productConfiguration?.[i]
                      ? productConfiguration[i].find((v) => v.name == val.name)
                      : {};
                    return (
                      <Grid item lg={2} xl={2} xs={4} sm={4} md={3} key={index}>
                        <FormControl
                          fullWidth
                          size="small"
                          style={{ textAlign: "center" }}
                        >
                          <InputLabel id={`demo-simple-select-${val.name}`}>
                            Select {val.name}
                          </InputLabel>
                          <Select
                            labelId={`demo-simple-select-${val.name}`}
                            id="demo-simple-configure"
                            size="small"
                            label={`Select ${val.name}`}
                            name={val.name}
                            onChange={(e) =>
                              onChangeHandler(e, val.id, i, index)
                            }
                            value={
                              defaultValue
                                ? `${defaultValue.name}__${defaultValue.itemName}`
                                : ""
                            }
                          >
                            {val.parents.map((item) => (
                              <MenuItem
                                key={item.id}
                                value={`${val.name}__${item.name}`}
                              >
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    );
                  })}
                  {dropDownTab.length > 1 && (
                    <DeleteOutlinedIcon
                      style={{
                        color: "#D7282F",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => RemoveHandler(i)}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid
                item
                sm={6}
                md={6}
                xs={6}
                xl={2}
                lg={2}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <FontContainer
                  className={classes.typotxt}
                  style={{ fontWeight: 400 }}
                >
                  Quantity:
                </FontContainer>
                <RemoveIcon
                  style={{
                    color: "#D7282F",
                    background: "#FFEBEC",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => MinusQunatityHandler(i)}
                />
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    variant="outlined"
                    size="small"
                    onChange={(e) => QunatityHandler(e, i)}
                    value={quantities?.[i] ?? 1}
                  />
                </div>

                <AddIcon
                  style={{
                    color: "#D7282F",
                    background: "#FFEBEC",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => AddQunatityHandler(i)}
                />
              </Grid>
            </Grid>
          ))}
          <Box
            component="div"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <FontContainer fontSize="16px">
              {/* Your Configured product is {name} */}
            </FontContainer>
            <FontContainer
              color="#D7282F"
              fontSize="14px"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                AddMoreHandler();
              }}
            >
              +Add another configuration
            </FontContainer>
          </Box>

          {productConfiguration.length > 0 && (
            <>
              <Box m={2}>
                <Divider style={{ border: "1px solid #6C6C6C" }} />
              </Box>
              <TableContainer component={Paper}>
                <Box p={1.5}>
                  <Typography
                    fontFamily="open sans"
                    fontWeight="600"
                    fontSize="18px"
                  >
                    Configurations List
                  </Typography>
                </Box>
                <Divider style={{ border: "1px solid #6C6C6C" }} />
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr. No.</TableCell>
                      {variation_options?.map((name, index) => (
                        <TableCell align="center" key={index}>
                          {FirstletterCapital(name.name)}
                        </TableCell>
                      ))}
                      <TableCell
                        align="center"
                        style={{ background: "#FDEBEC" }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ background: "#FDEBEC" }}
                      >
                        Price
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productConfiguration.map((row, index) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        {row.map((value) => (
                          <TableCell component="th" scope="row" align="center">
                            {value?.itemName ?? "-"}
                          </TableCell>
                        ))}
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{ background: "#FDEBEC" }}
                        >
                          {quantities?.[index] ?? "-"}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{ background: "#FDEBEC" }}
                        >
                          {seperate?.[index]?.price
                            ? PriceFormatter(
                                seperate?.[index]?.price,
                                quantities?.[index] ?? 0
                              )
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display="flex" justifyContent="space-between" mt={5}>
                <Stack direction="row" spacing={1}>
                  <Chip label="Unit Price" style={{ borderRadius: "5px" }} />
                  <Chip
                    label={price?.unit ?? 0}
                    style={{ borderRadius: "5px" }}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Chip label="Total Price" style={{ borderRadius: "5px" }} />
                  <Chip
                    label={price?.total ?? 0}
                    style={{ borderRadius: "5px" }}
                  />
                </Stack>
              </Box>
            </>
          )}
        </>
      </AccordionDetails>
    </Accordion>
  );
};

export default Configuration;
