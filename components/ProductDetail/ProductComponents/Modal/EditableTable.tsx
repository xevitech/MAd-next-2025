import React, { memo, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { apiClient } from "@/components/common/common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { setTotalAndUnitPrice } from "@/hooks/quoteHooks";
import { useAppDispatch } from "redux/store";
import { ConfigureTable } from "./style";
import AddIcon from "@mui/icons-material/Add";
import { MobileCodes } from "@/components/common/PhoneInput/MobileCodesList";
function EditableTable({
  specification_options,
  details,
  unique_session_id,
  setCheckConfigurationSelected,
  checkConfigurationSelected,
}) {
  const [rows, setRows] = React.useState([]);
  const [validation, setValidation] = useState<any>(false);
  const [productConfiguration, setProductConfiguration] = useState<any>([]);
  const [quantities, setQuantities] = useState<any>([1]);
  const [seperate, setSeperate] = useState<any>([]);
  const [price, setPrice] = useState<any>([]);
  const { productConfig } = useSelector((state: any) => state.productDetail);
  const dispatch = useAppDispatch();
  const { productQuantity } = useSelector((state: any) => state.quoteDetails);

  useEffect(() => {
    if (rows.length == 0) {
      AddSpecifications("first");
    }
  }, []);

  useEffect(() => {
    if (productQuantity > 1 && quantities[0] == 1) {
      setQuantities([productQuantity]);
    }
  }, [productQuantity]);

  useEffect(() => {
    if (productConfig.length > 0 && productConfiguration.length == 0) {
      let config = productConfig.map((v) => ({
        option: v.name,
        value: v.itemName,
      }));
      setProductConfiguration([config]);
      CalculatePrice({ config: [config], qty: null, index: -1 });
    }
  }, [productConfig]);

  const AddSpecifications = (val = "add") => {
    if (val == "add") {
      let lastElementLength =
        productConfiguration[productConfiguration.length - 1]?.length;
      let lastElementMode = rows[rows.length - 1]?.edit;

      if (
        lastElementLength != specification_options.length &&
        lastElementMode
      ) {
        setValidation(true);
        return;
      }

      if (
        lastElementLength === specification_options.length &&
        lastElementMode
      ) {
        toast.error("please save values");
        return;
      }
      setRows((prev) => [
        ...prev,
        { value: specification_options, edit: true },
      ]);
      setQuantities((prev) => [...prev, 1]);
    }
    if (val == "first") setRows([{ value: specification_options, edit: true }]);
  };

  const onChangeHandler = (e, index, parent) => {
    const { value } = e.target;
    let selectedValue = [...productConfiguration];
    let existingValueIndex =
      productConfiguration[index]?.findIndex((v) => v.option == parent) ?? -1;
    if (existingValueIndex >= 0) {
      selectedValue[index][existingValueIndex].value = value;
    } else {
      selectedValue[index] = [
        ...(selectedValue?.[index] ?? []),
        {
          option: parent,
          value,
        },
      ];
    }
    if (selectedValue[index]?.length === specification_options.length) {
      CalculatePrice({ config: selectedValue, qty: null, index });
    }
    setProductConfiguration(selectedValue);
    setValidation(false);
  };

  const CalculatePrice = async ({ config, qty, index }) => {
    let configList = config.length > 0 ? config : productConfiguration;
    let formData = new FormData();
    configList.forEach((parent, parentIndex) => {
      parent.forEach((child, childIndex) => {
        if (child?.option) {
          formData.append(
            `data[${parentIndex}][select][${childIndex}][option]`,
            child.option
          );
        }
        if (child?.value) {
          formData.append(
            `data[${parentIndex}][select][${childIndex}][value]`,
            child.value
          );
        }
      });
      formData.append(
        `data[${parentIndex}][number]`,
        qty ? qty : quantities?.[parentIndex] ?? 1
      );
    });
    formData.append("product_id", details.id);
    let response = await apiClient(
      "front/single_product_variation_check",
      "post",
      {
        body: formData,
      },
      true
    );
    if (response.status === 200) {
      const { seperate } = response;
      if (index >= 0 && price?.[index]) {
        setPrice((prev) => {
          let totalPrice = [...prev];
          totalPrice.splice(index, 1);
          totalPrice.push({ total: response.total, unit: response.unit });
          dispatch(
            setTotalAndUnitPrice({
              mainProduct: totalPrice,
            })
          );
          return totalPrice;
        });
      } else
        setPrice((prev) => {
          dispatch(
            setTotalAndUnitPrice({
              mainProduct: [
                ...prev,
                { unit: response.unit, total: response.total },
              ],
            })
          );
          return [...prev, { unit: response.unit, total: response.total }];
        });
      setSeperate(seperate);
    }
  };

  const SaveSpecifications = async (index) => {
    if (!checkConfigurationSelected) setCheckConfigurationSelected(true);
    const { id, name, product_type } = details;
    let response = await apiClient("front/quote_configuration", "post", {
      body: {
        unique_session_id,
        type: product_type,
        product_id: id,
        product_name: name,
        combinations: JSON.stringify(productConfiguration[index]),
        quantity: quantities[index],
        price: price?.[index]?.total,
        id: productConfiguration?.[index]?.[0]?.id ?? "",
        country_name:
          MobileCodes.find((v) =>
            v.code == details?.country_origin_id
              ? details?.country_origin_id
              : details.country_origin_id
          )?.name ?? "",
        category_name: details?.category_name,
        product_datetime: details?.created_at,
      },
    });
    if (response.status == 200) {
      if (!productConfiguration?.[index]?.[0]?.id) {
        setProductConfiguration((prev) => {
          let config = [...prev];
          config[index][0].id = response.data.id;
          return config;
        });
      }
      setRows((prev) => {
        let row = [...prev];
        row[index].edit = false;
        return row;
      });
      setValidation(false);
    }
  };

  const saveHandler = (index) => {
    if (productConfiguration[index]?.length !== specification_options.length) {
      setValidation(true);
      return;
    }
    SaveSpecifications(index);
  };

  const editHandler = (index) => {
    setRows((prev) => {
      let row = [...prev];
      row[index].edit = true;
      return row;
    });
  };

  const DeleteHandler = async (index) => {
    const { id } = details;
    if (productConfiguration?.[index]?.[0]?.id) {
      await apiClient("front/destroyQuoteConf", "post", {
        body: {
          id: productConfiguration?.[index]?.[0]?.id,
          product_id: id,
          unique_session_id,
        },
      });
    }
    setRows((prev) => {
      let deleted = [...prev];
      deleted.splice(index, 1);
      return deleted;
    });
    setProductConfiguration((prev) => {
      let deleted = [...prev];
      deleted.splice(index, 1);
      return deleted;
    });
  };

  return (
    <ConfigureTable>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {specification_options.map((v, i) => (
                <TableCell align="left">{v.name}</TableCell>
              ))}
              <TableCell align="left">{"Quantity"}</TableCell>
              <TableCell align="left">{"Unit Price"}</TableCell>
              <TableCell align="left">{"Total Price"}</TableCell>
              <TableCell align="left">{"Actions"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((v, index) => {
              return (
                <TableRow
                  key={`parent__${index + 1}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {v.value.map((row, i) => {
                    let value =
                      productConfiguration?.[index]?.find(
                        (values) => values.option == row.name
                      )?.value ?? "Select";
                    return (
                      <TableCell align="left" key={row.id}>
                        {v.edit ? (
                          <FormControl fullWidth>
                            <Select
                              sx={{
                                background:
                                  (!value || value == "Select") && validation
                                    ? "#ffdcdc"
                                    : "",
                              }}
                              placeholder="Select"
                              size="small"
                              id={row.id}
                              value={value}
                              onChange={(e) =>
                                onChangeHandler(e, index, row.name)
                              }
                            >
                              <MenuItem value={"Select"} disabled>
                                Select
                              </MenuItem>
                              {row.parents.map((value) => {
                                if (value) {
                                  return (
                                    <MenuItem value={`${value.name}`}>
                                      {value.name}
                                    </MenuItem>
                                  );
                                }
                              })}
                            </Select>
                          </FormControl>
                        ) : (
                          <Box>{value}</Box>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    {v.edit ? (
                      <TextField
                        type="number"
                        size="small"
                        value={quantities[index]}
                        onChange={(e: any) => {
                          if (e.target.value >= 0) {
                            setQuantities((prev) => {
                              let qty = [...prev];
                              qty[index] = e.target.value;
                              if (
                                productConfiguration[index]?.length ===
                                specification_options.length
                              ) {
                                CalculatePrice({
                                  config: [],
                                  qty: e.target.value,
                                  index,
                                });
                              }
                              return qty;
                            });
                          }
                        }}
                      />
                    ) : (
                      <Box>{quantities[index]}</Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ whiteSpace: "nowrap" }}>
                      {price?.[index]?.unit ?? "0.00"}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ whiteSpace: "nowrap" }}>
                      {price?.[index]?.total ?? "0.00"}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {v.edit ? (
                      <SaveIcon
                        sx={{ cursor: "pointer", color: "#24a53b !important" }}
                        onClick={() => saveHandler(index)}
                      />
                    ) : (
                      <>
                        <EditIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => editHandler(index)}
                        />

                        {productConfiguration.length > 1 && (
                          <DeleteIcon
                            sx={{
                              cursor: "pointer",
                              color: "#d7282f !important",
                            }}
                            onClick={() => DeleteHandler(index)}
                          />
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => AddSpecifications("add")}>
        <AddIcon /> Add Another specification
      </Button>
    </ConfigureTable>
  );
}

export default memo(EditableTable);
