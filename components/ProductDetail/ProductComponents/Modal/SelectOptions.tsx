import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { setRelatedProductSpecs } from "@/hooks/quoteHooks";
import { toast } from "react-toastify";
import { RelatedTableList, AddSpecBtn } from "./style";
import { MobileCodes } from "@/components/common/PhoneInput/MobileCodesList";

function SelectOptions({
  product_detail,
  v,
  quotedetails,
  unique_session_id,
  otherValues,
}) {
  const [validation, setValidation] = useState<any>(false);
  const [buttonDisable, setButtonDisable] = useState<any>(false);
  const { relatedProductSpecs } = useSelector(
    (state: any) => state.quoteDetails
  );
  const [matrixData, setMatrixData] = useState("");
  const dispatch = useAppDispatch();
  const relatedProductSpecifications = [
    ...(relatedProductSpecs?.find((v) => v.id == product_detail.id)?.specs ??
      []),
  ];

  useEffect(() => {
    fetchSpecification();
    if (v.length > 0 && relatedProductSpecifications.length == 0) {
      let specs = [...relatedProductSpecs];
      specs.push({
        id: product_detail.id,
        specs: [
          {
            value: v,
            edit: true,
            quantity: 0,
            selectedOptions: [],
            price: "0.00",
          },
        ],
      });
      dispatch(setRelatedProductSpecs(specs));
    }
  }, [v]);
  const fetchSpecification = async () => {
    let response = await apiClient("front/quotation_product_matrix", "post", {
      body: {
        product_id: product_detail.id,
      },
    });
    if (response.status === 200) {
      setMatrixData(response?.specifications);
    }
  };
  const AddSpecifications = () => {
    let isEdit =
      relatedProductSpecifications[relatedProductSpecifications.length - 1]
        ?.edit;
    if (
      relatedProductSpecifications[relatedProductSpecifications.length - 1]
        .selectedOptions.length === v.length &&
      isEdit
    ) {
      toast.error("please save values");
      return;
    }
    if (
      relatedProductSpecifications[relatedProductSpecifications.length - 1]
        .selectedOptions.length !== v.length &&
      isEdit
    ) {
      setValidation(true);
      return;
    }
    let duplicateSpecs = [...relatedProductSpecifications];
    duplicateSpecs.push({
      value: v,
      edit: true,
      quantity: 1,
      selectedOptions: [],
    });
    let filteredSpecs = relatedProductSpecs?.filter(
      (v) => v.id != product_detail.id
    );
    dispatch(
      setRelatedProductSpecs([
        ...filteredSpecs,
        { id: product_detail.id, specs: duplicateSpecs },
      ])
    );
  };

  const CalculatePrice = async (index, selectedOptions, value = null) => {
    setButtonDisable(true);
    let formData = new FormData();
    selectedOptions.forEach((v, childIndex) => {
      if (v?.option) {
        formData.append(
          `data[${index}][select][${childIndex}][option]`,
          v.option
        );
      }
      if (v?.value) {
        formData.append(
          `data[${index}][select][${childIndex}][value]`,
          v.value
        );
      }
    });
    formData.append(
      `data[${index}][number]`,
      value ? value : relatedProductSpecifications[index].quantity ?? 1
    );
    formData.append("product_id", product_detail.id);
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
      let updatedValue = [...relatedProductSpecifications.map((v) => v)];
      updatedValue[index] = {
        ...updatedValue[index],
        price: total,
        unit_price: unit,
        selectedOptions,
      };
      if (value) {
        updatedValue[index] = {
          ...updatedValue[index],
          quantity: value,
        };
      }
      let filteredSpecs = relatedProductSpecs?.filter(
        (v) => v.id != product_detail.id
      );
      dispatch(
        setRelatedProductSpecs([
          ...filteredSpecs,
          { id: product_detail.id, specs: updatedValue },
        ])
      );

      setButtonDisable(false);
    }
  };

  const onChangeHandler = (e, index, parent) => {
    let options = [...relatedProductSpecifications[index].selectedOptions];
    const { value } = e.target;
    let selectedValue = options.filter((v) => v.option != parent);
    selectedValue.push({
      option: parent,
      value,
    });

    let updatedValue = [...relatedProductSpecifications.map((v) => v)];
    updatedValue[index] = {
      ...updatedValue[index],
      selectedOptions: selectedValue,
    };
    let filteredSpecs = relatedProductSpecs?.filter(
      (v) => v.id != product_detail.id
    );
    if (selectedValue.length == v.length) {
      CalculatePrice(index, selectedValue);
    }
    dispatch(
      setRelatedProductSpecs([
        ...filteredSpecs,
        { id: product_detail.id, specs: updatedValue },
      ])
    );
  };

  const DeleteHandler = async (index) => {
    const { id } = quotedetails;
    let value = relatedProductSpecifications?.[index]?.selectedOptions ?? [];
    if (value?.[0]?.id) {
      await apiClient("front/destroyQuoteConf", "post", {
        body: {
          id: value?.[0]?.id,
          product_id: id,
          unique_session_id,
        },
      });
    }
    let duplicateSpecs = [...relatedProductSpecifications];
    duplicateSpecs.splice(index, 1);
    let filteredSpecs = relatedProductSpecs?.filter(
      (v) => v.id != product_detail.id
    );
    dispatch(
      setRelatedProductSpecs([
        ...filteredSpecs,
        { id: product_detail.id, specs: duplicateSpecs },
      ])
    );
  };

  const editHandler = (index) => {
    let updatedValue = [...relatedProductSpecifications.map((v) => v)];
    updatedValue[index] = {
      ...updatedValue[index],
      edit: true,
    };
    let filteredSpecs = relatedProductSpecs?.filter(
      (v) => v.id != product_detail.id
    );
    dispatch(
      setRelatedProductSpecs([
        ...filteredSpecs,
        { id: product_detail.id, specs: updatedValue },
      ])
    );
  };

  const SaveSpecifications = async (index) => {
    let value = relatedProductSpecifications?.[index]?.selectedOptions ?? [];
    let quantity = relatedProductSpecifications?.[index]?.quantity ?? 1;
    let price = relatedProductSpecifications?.[index]?.price;
    let response = await apiClient("front/quote_configuration", "post", {
      body: {
        country_name:
          MobileCodes.find((v) => v.code == otherValues?.country_name)?.name ??
          "",
        category_name: otherValues?.category_name,
        product_datetime: otherValues?.product_datetime,
        unique_session_id,
        type: product_detail.product_type,
        product_id: product_detail.id,
        product_name: product_detail.name,
        combinations: JSON.stringify(value),
        quantity,
        price,
        id: value?.[0]?.id ?? "",
      },
    });
    if (response.status == 200) {
      let selectedValue = !value?.[0]?.id
        ? [...relatedProductSpecifications[index].selectedOptions].map((v) => ({
            ...v,
            id: response.data.id,
          }))
        : [...relatedProductSpecifications[index].selectedOptions];
      let updatedValue = [...relatedProductSpecifications.map((v) => v)];
      updatedValue[index] = {
        ...updatedValue[index],
        selectedOptions: selectedValue,
        edit: false,
      };
      let filteredSpecs = relatedProductSpecs?.filter(
        (v) => v.id != product_detail.id
      );
      dispatch(
        setRelatedProductSpecs([
          ...filteredSpecs,
          { id: product_detail.id, specs: updatedValue },
        ])
      );

      setValidation(false);
    }
  };

  const saveHandler = (index) => {
    let value = relatedProductSpecifications[index].selectedOptions;
    if (value?.length !== v.length) {
      setValidation(true);
      return;
    }
    SaveSpecifications(index);
  };

  const QuantityHandler = (index, e) => {
    const { value } = e.target;
    let updatedValue = [...relatedProductSpecifications.map((v) => v)];
    updatedValue[index] = {
      ...updatedValue[index],
      quantity: value,
    };
    let filteredSpecs = relatedProductSpecs?.filter(
      (v) => v.id != product_detail.id
    );
    if (
      relatedProductSpecifications[index].selectedOptions.length == v.length
    ) {
      CalculatePrice(
        index,
        relatedProductSpecifications[index].selectedOptions,
        value
      );
    }
    dispatch(
      setRelatedProductSpecs([
        ...filteredSpecs,
        { id: product_detail.id, specs: updatedValue },
      ])
    );
  };

  return (
    <RelatedTableList>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {v.map((val, i) => (
                <TableCell align="left">{val.name}</TableCell>
              ))}
              <TableCell align="left">{"Quantity"}</TableCell>
              <TableCell align="left">{"Unit Price"}</TableCell>
              <TableCell align="left">{"Total Price"}</TableCell>
              <TableCell align="center">{"Actions"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {relatedProductSpecifications.map((v, index) => {
              return (
                <TableRow
                  key={`parent__${index + 1}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {v.value.map((row, i) => {
                    let value =
                      v?.selectedOptions?.find(
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
                                    ? "red"
                                    : "",
                              }}
                              size="small"
                              labelId={row.id}
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
                        value={v.quantity}
                        onChange={(e: any) => {
                          if (e.target.value >= 0) {
                            QuantityHandler(index, e);
                          }
                        }}
                      />
                    ) : (
                      <Box>{v.quantity}</Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box>{v?.unit_price ?? "0.00"}</Box>
                  </TableCell>
                  <TableCell>
                    <Box>{v?.price ?? "0.00"}</Box>
                  </TableCell>
                  <TableCell align="center">
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

                        {v.selectedOptions.length > 1 && (
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
      <AddSpecBtn>
        <Button disabled={buttonDisable} onClick={() => AddSpecifications()}>
          <AddIcon /> Add new Specifications
        </Button>
      </AddSpecBtn>
    </RelatedTableList>
  );
}

export default SelectOptions;
