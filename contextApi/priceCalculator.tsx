import React, { useState, createContext, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export const MyPriceCalculatorContext = createContext<any>(null);

export const PriceCalculatorContextProvider = ({ children }: any) => {
  const [rowFields, setRowFields] = useState<any>({});
  const [priceCalculatorData, setPriceCalcualtorData] = useState<any>([]);
  const [allTerms, setAllTerms] = useState<any>([]);
  const [allSpecs, setAllSpecs] = useState<any>([]);
  const [variationTableValues, setVariationTableValues] = useState<any>({});
  const [productCalculatorInfo, setProductCalculatorInfo] = useState<any>([]);
  const [payloadValuesForTableInitially, setPayloadValuesForTableInitially] =
    useState<any>([]);

  const [variationTableValuesWithKeys, setVariationTableValuesWithKeys] =
    useState<any>([]);
  const [multiTableInfo, setMultiTableInfo] = useState<any>([]);
  const [simpleTableRowsLength, setSimpleTableRowsLength] = useState<any>("");
  const [productCalculatorHeader, setProductCalculatorHeader] = useState("");
  const [
    payloadValuesForMultiTableInitially,
    setPayloadValuesForMultiTableInitially,
  ] = useState<any>();
  const [multiTableStartSerialHashMap, setMultiTableStartSerialHashMap] =
    useState({});

  const [equations, setEquations] = useState<any>([]);

  return (
    <MyPriceCalculatorContext.Provider
      value={{
        rowFields,
        setRowFields,
        allTerms,
        setAllTerms,
        allSpecs,
        setAllSpecs,
        variationTableValues,
        setVariationTableValues,
        payloadValuesForTableInitially,
        setPayloadValuesForTableInitially,
        variationTableValuesWithKeys,
        setVariationTableValuesWithKeys,
        productCalculatorInfo,
        setProductCalculatorInfo,
        multiTableInfo,
        setMultiTableInfo,
        simpleTableRowsLength,
        setSimpleTableRowsLength,
        productCalculatorHeader,
        setProductCalculatorHeader,
        multiTableStartSerialHashMap,
        setMultiTableStartSerialHashMap,
        payloadValuesForMultiTableInitially,
        setPayloadValuesForMultiTableInitially,
        equations,
        setEquations,
      }}
    >
      {children}
    </MyPriceCalculatorContext.Provider>
  );
};
