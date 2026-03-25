import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setMultiTableStartSerialHashMap,
  setVariationTableValues,
} from "@/hooks/PricingCalculatorReducer";

export const MultiSpecTable = ({ expanded, data }) => {
  const [tableState, setTableState] = useState<any>({});

  const {
    variationTableValues,
    rowFields,
    multiTableInfo,
    simpleTableRowsLength,
  } = useSelector((state: any) => state?.PricingCalculator);

  const dispatch = useDispatch();

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      var val = value;
    } else return;

    dispatch(setVariationTableValues((prev) => ({ ...prev, [name]: val })));
  };

  const returnStartIndex = (serialNumber) => {
    let startIndex = 0;

    for (let i = 1; i < serialNumber; i++) {
      startIndex = startIndex + multiTableInfo[i - 1]?.totalChildrenRows;
    }

    return startIndex;
  };

  useEffect(() => {
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [rowFields, data]);

  useEffect(() => {
    setTableState(multiTableInfo?.find((element) => element?.id == data?.id));

    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [data, multiTableInfo]);

  const returnSerialNumber = (rowIndex, tableIndex) => {
    const serialNumber =
      simpleTableRowsLength +
      1 +
      rowIndex +
      tableIndex *
        rowFields[tableState?.level?.split(",")[1]]?.split(" ")?.length +
      returnStartIndex(tableState?.serialNo);
    return serialNumber;
  };

  useEffect(() => {
    dispatch(
      setMultiTableStartSerialHashMap(
        multiTableInfo
          ?.map((ele) => ({
            id: ele?.id,
            children: ele?.totalChildrenRows,
          }))
          ?.map((element) => ({
            ...element,
            startIndex: multiTableInfo
              ?.filter((elem) => elem?.id < element?.id)
              ?.reduce(
                (acc, curr) => acc.totalChildrenRows + curr.totalChildrenRows,
                0
              ),
          }))
      )
    );
  }, [multiTableInfo]);

  return (
    <TableContainer
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {expanded && (
        <>
          <div
            style={{
              width: "1px",
              height: "calc(66.7%)",
              borderLeft: "1px solid #959595",
              borderBottom: "1px solid #959595",
              position: "absolute",
              top: "50px",
              zIndex: 999,
              background: "white",
              left: "20px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#959595",
                position: "relative",
                left: "-6px",
                top: "-8px",
              }}
            ></span>
          </div>
        </>
      )}

      {tableState?.terms?.map((ele, index) => (
        <div key={index} style={{ position: "relative", overflow: "visible" }}>
          <Table
            sx={{
              minWidth: 300,
            }}
            aria-label="a dense table"
            style={{ position: "relative" }}
          >
            <span
              style={{
                position: "absolute",
                width: "24px",
                height: "1px",
                background: "#959595",
                left: "-20px",
                display: "inline-block",
                zIndex: "999999",
                top: 0,
              }}
            ></span>
            <TableHead
              style={{
                minHeight: "37px",
                position: "relative",
              }}
            >
              <TableRow>
                <TableCell
                  align="left"
                  style={{
                    padding: "8px 16px",
                    minHeight: "37px",
                    background: "#FCC4C6",
                  }}
                >
                  {ele?.name.replaceAll("_", " ")}
                </TableCell>
                {rowFields[tableState?.level?.split(",")[0]]
                  ?.split(" ")
                  ?.map((text, idx) => (
                    <TableCell
                      key={idx}
                      align="left"
                      style={{
                        padding: "8px 16px",
                        minHeight: "37px",
                      }}
                    >
                      {text.replaceAll("_", " ")}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody style={{ maxHeight: "360px", overflowY: "scroll" }}>
              {rowFields[tableState?.level?.split(",")[1]]
                ?.split(" ")
                ?.map((rowLeftHeaderText, indexRow) => {
                  return (
                    <TableRow
                      key={rowLeftHeaderText}
                      style={{
                        background: indexRow % 2 == 0 ? "white" : "#D2D2D2",
                      }}
                    >
                      <TableCell
                        style={{ width: "200px", padding: "12px 16px" }}
                      >
                        {returnSerialNumber(indexRow, index)}
                        {"."}
                        {rowLeftHeaderText}
                      </TableCell>
                      {rowFields[tableState?.level?.split(",")[0]]
                        ?.split(" ")
                        ?.map((text, indx) => (
                          <TableCell
                            key={indx}
                            align="left"
                            style={{
                              padding: "8px 16px",
                              minHeight: "37px",
                            }}
                          >
                            <TextField
                              size="small"
                              name={`row-${
                                tableState?.tag
                              }-${returnSerialNumber(
                                indexRow,
                                index
                              )}-${rowLeftHeaderText}-${
                                rowFields[
                                  tableState?.level?.split(",")[0]
                                ]?.split(" ")[indx]
                              }`}
                              style={{ background: "white", width: "95px" }}
                              inputProps={{
                                style: {
                                  height: "12px",
                                  color: "black",
                                },
                              }}
                              value={
                                variationTableValues[
                                  `row-${tableState?.tag}-${returnSerialNumber(
                                    indexRow,
                                    index
                                  )}-${rowLeftHeaderText}-${
                                    rowFields[
                                      tableState?.level?.split(",")[0]
                                    ]?.split(" ")[indx]
                                  }`
                                ] == "null"
                                  ? ""
                                  : variationTableValues[
                                      `row-${
                                        tableState?.tag
                                      }-${returnSerialNumber(
                                        indexRow,
                                        index
                                      )}-${rowLeftHeaderText}-${
                                        rowFields[
                                          tableState?.level?.split(",")[0]
                                        ]?.split(" ")[indx]
                                      }`
                                    ]
                              }
                              onChange={handleValueChange}
                            />
                          </TableCell>
                        ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      ))}
    </TableContainer>
  );
};
