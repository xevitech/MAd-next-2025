import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { styled, Button, Box, Divider } from "@mui/material";
import { toast } from "react-toastify";
import { CalcHeading } from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid #d7d7d7",
  backgroundColor: "#E6E6E6",
  borderRadius: "5px",
  padding: "0px 16px 16px 16px",
  // width: "320px",
  width: "100%",
  "@media screen and (max-width:1400px)": {
    width: "320px",
    padding: "0 8px 8px 8px",
  },
  "@media screen and (max-width:480px)": {
    width: "275px",
    padding: "0 8px 8px 8px",
  },
  "@media screen and (max-width:390px)": {
    width: "100%",
  },
};

export const Content = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  // gap: "15px",
  width: "100%",
  justifyContent: "center",
  "@media screen and (max-width:480px)": {
    gap: "8px",
  },
});
export const CalcyHeadingBox = styled(Box)({
  borderBottom: "1px solid #D7D7D7",
  width: "100%",
  textAlign: "center",
  margin: "0 0 10px 0",
});

export const CalcyButton = styled(Button)({
  width: "45px",
  height: "25px",
  border: "1px solid #484848",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Inter",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "15px",
  padding: "0px",
  minWidth: "19px",
  color: "#484848",
});

const calcyButtons = [
  {
    value: "ln",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "√",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "Exp",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "x²",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "x³",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      display: "block",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "sin(",
    disabled: false,
    type: "trig",
    sx: {
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "cos(",
    disabled: false,
    type: "trig",
    sx: {
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "tan(",
    disabled: false,
    type: "trig",
    sx: {
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "e",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "x!",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "7",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "8",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "9",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "+",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "(",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "4",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "5",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "6",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "-",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: ")",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },

  {
    value: "1",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "2",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "3",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "*",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "π",
    disabled: false,
    type: "pie",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: ".",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "0",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "^",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "/",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "%",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
];
const calcyButtons1 = [
  {
    value: "ln",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "√",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "Exp",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "x²",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "x³",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      display: "block",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "sin(",
    disabled: false,
    type: "trig",
    sx: {
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "cos(",
    disabled: false,
    type: "trig",
    sx: {
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "tan(",
    disabled: false,
    type: "trig",
    sx: {
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "e",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "x!",
    disabled: false,
    type: "trignometric",
    sx: {
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "#929292",
        color: "#fff",
        border: "1px solid #929292",
      },
    },
  },
  {
    value: "+",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "-",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "/",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "%",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "π",
    disabled: false,
    type: "pie",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "(",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: ")",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "*",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
      fontWeight: "700",
      "&:hover": {
        color: "#d7282f",
        border: "1px solid #d7282f",
        backgroundColor: "#fff",
        fontWeight: "700",
      },
    },
  },
  {
    value: "7",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "8",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "9",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },

  {
    value: "4",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "5",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "6",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },

  {
    value: "1",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "2",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "3",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },

  {
    value: ".",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "0",
    disabled: false,
    type: "numeric",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
  {
    value: "^",
    disabled: false,
    type: "operand",
    sx: {
      backgroundColor: "#929292",
      color: "#fff",
      border: "1px solid #929292",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#231f20",
        border: "1px solid #231f20",
        fontWeight: "700",
      },
    },
  },
];

export const CalculatorClone = ({
  // show = false,
  // setShow = null,
  // finalCalculation = [],
  equation = [],
  setEquation = null,
  setEditEquationError = null,
  // setFinalEquation = null,
  // setFinalPayloads = null,
  // leftValues = [],
  // showClear = false,
  // type = null,

  // marginCheck = null,
  // setData = null,
  // selectedGroupsData = null,
  // calculatorType,
  // groupFinalState = null,
  // setGroupFinalState = null,
}) => {
  const [calcyButtonsState, setCalcyButtonsState] = useState(calcyButtons);
  const [calcyButtonsStateMobile, setCalcyButtonsStateMobile] =
    useState(calcyButtons1);

  const factorial = (num) => {
    if (num < 0) return undefined;
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1);
  };

  const performCalculation = useCallback((operation, equation) => {
    const lastItem = equation[equation.length - 1];
    const lastSecondItem = equation[equation.length - 2];
    if (operation === "e") {
      // Add e in place without replacing the previous value
      if (operation === "e" && lastSecondItem.type == "numeric") {
        const updatedData = [
          ...equation.slice(0, equation.length - 2), // Exclude the last item
          {
            type: "numeric",
            view: `${lastSecondItem.view}e`,
            value: +lastSecondItem?.value * Math.E,
          }, // Update the last item with 'e' value
        ];
        return updatedData;
      }
      const updatedData = [
        ...equation.slice(0, -1), // Exclude the last item
        { ...lastItem, type: "numeric", view: "e", value: Math.E }, // Update the last item with 'e' value
      ];
      return updatedData;
    }

    // Find the last numeric item before the trigonometric operator
    const lastNumericIndex = equation
      .slice(0, -1)
      .reverse()
      .findIndex((item) => item.type === "numeric" && item !== "e");

    if (lastNumericIndex !== -1) {
      const actualIndex = equation.length - 2 - lastNumericIndex; // Convert reversed index to actual index
      const lastNumericItem = equation[actualIndex];

      let calculationResult = null;
      let view = "";

      switch (operation) {
        case "x²":
          calculationResult = Math.pow(Number(lastNumericItem.value), 2);
          view = `${lastNumericItem.value}<sup>2</sup>`;
          break;
        case "x³":
          calculationResult = Math.pow(Number(lastNumericItem.value), 3);
          view = `${lastNumericItem.value}<sup>3</sup>`;
          break;
        case "√":
          calculationResult = Math.sqrt(Number(lastNumericItem.value));
          view = `√${lastNumericItem.value}`;
          break;
        case "ln":
          calculationResult = Math.log(Number(lastNumericItem.value));
          view = `ln${lastNumericItem.value}`;
          break;
        case "x!":
          calculationResult = factorial(Number(lastNumericItem.value));
          view = `${lastNumericItem.value}!`;
          break;
        case "Exp":
          calculationResult = Math.exp(Number(lastNumericItem.value));
          view = `Exp(${lastNumericItem.value})`;
          break;
        // case "e":
        //   calculationResult = Math.E;
        //   view = `e`;
        //   break;
        default:
          break;
      }

      // Update the equation with the calculated value and the new view
      const updatedData = [
        ...equation.slice(0, actualIndex),
        { ...lastNumericItem, view, value: calculationResult },
        ...equation.slice(actualIndex + 1, -1), // Exclude the last trigonometry item
      ];

      return updatedData;
    }

    return equation; // Return the original equation if no numeric item is found
  }, []);

  const mergeNumericValues = useMemo(() => {
    return (equation) => {
      return equation?.reduce((acc, current) => {
        if (
          current.type === "numeric" &&
          acc[acc.length - 1]?.view?.includes("e")
        ) {
          acc.push({ value: "*", view: "*", type: "operand" }, { ...current });
          return acc;
        }
        if (current.type === "numeric" || current.type === "trig") {
          // Convert 'trig' to 'numeric' and merge values
          const updatedCurrent =
            current.type === "trig" ? { ...current, type: "numeric" } : current;

          // Check if the last item is numeric, then concatenate values
          if (acc.length > 0 && acc[acc.length - 1].type === "numeric") {
            acc[acc.length - 1].value += updatedCurrent.value; // Concatenate numeric values
            acc[acc.length - 1].view += updatedCurrent.view; // Concatenate views
          } else {
            // Add as a new entry if no numeric to merge with
            acc.push({ ...updatedCurrent });
          }
        } else if (current.type === "operand" && current.value === ".") {
          // Check if the current value is an operand (dot) and merge it with the last numeric value
          if (acc.length > 0 && acc[acc.length - 1].type === "numeric") {
            acc[acc.length - 1].value += current.value; // Append dot to the last numeric value
            acc[acc.length - 1].view += current.value; // Append dot to the view
          } else {
            // If there's no numeric value to merge with, we can simply push the dot as a new entry
            acc.push({ value: "0.", view: "0.", type: "numeric" }); // Start with "0."
          }
        } else {
          // For non-numeric and non-operand (dot) values, add them to the accumulator
          acc.push({ ...current });
        }
        return acc;
      }, []);
    };
  }, []);

  useEffect(() => {
    const updateStateIfChanged = (state, updatedState, setter) => {
      if (JSON.stringify(state) !== JSON.stringify(updatedState) && setter) {
        setter(updatedState);
      }
    };
    const equationClone = JSON.parse(equation[0]?.equationData);
    if (!equationClone || equationClone.length === 0) {
      setEquation([]);
      return;
    }

    const lastItem = equationClone[equationClone.length - 1];
    const updatedState = mergeNumericValues(equationClone);

    const furtherUpdate = updatedState.map((state) => {
      return {
        ...state,
        equationId: equation[0]?.equationId,
        equationData: JSON.stringify(updatedState),
      };
    });

    updateStateIfChanged(equation, furtherUpdate, setEquation);

    if (lastItem?.type === "trignometric") {
      const operation = lastItem.value;
      const updatedData = performCalculation(operation, equationClone);
      const newUpdate = updatedData.map((state) => {
        return {
          ...state,
          equationId: equation[0]?.equationId,
          equationData: JSON.stringify(updatedData),
        };
      });
      updateStateIfChanged(equation, newUpdate, setEquation);
    }
  }, [
    equation ? JSON.stringify(equation) : null,
    mergeNumericValues,
    performCalculation,
  ]);

  const [selectedCalculatorButton, setSelectedCalculatorButton] = useState({
    value: "",
    type: "",
  });

  const calculatorRef = useRef(null);

  const validateOperation = (equation, name, errorMessage) => {
    const lastItemType = equation[equation.length - 1]?.type;
    const isTrigOperation = name === "trignometric";

    if (lastItemType !== "numeric" && isTrigOperation) {
      toast.error(
        "Please enter numeric value before clicking trignometric operation"
      );
      return true;
    }

    if (
      (lastItemType === "operand" && isTrigOperation) ||
      (equation.length === 0 && isTrigOperation)
    ) {
      toast.error(errorMessage);
      return true;
    }

    return false;
  };

  const handleCalculatorKeyClick = (e) => {
    // name parameter is actually type that we have for the calcy buttons in static definitions of buttons
    if (setEditEquationError) {
      setEditEquationError(false);
    }

    const { value, target, name } = e.target;

    let validationCheck = false;
    validationCheck = validateOperation(
      equation,
      name,
      "Please enter numeric value before clicking trignometric operation"
    );

    if (validationCheck) {
      return;
    }

    if (name == "clear") {
      const endElement = equation[equation?.length - 1];
      if (setEquation) {
        setEquation((prev) => prev?.slice(0, -1));
      }
      return;
    }
    setSelectedCalculatorButton({ value, type: "calcy" });

    const allowedOperands = ["trignometric", "operand", "numeric"];

    let hasError = false;
    //in case of the pie
    setEquation((prev) => {
      if (
        (prev[prev.length - 1]?.type == "pie" && name != "operand") ||
        (name == "pie" && prev[prev.length - 1]?.type != "operand")
      ) {
        hasError = true;
        return prev;
      }
      return prev;
    });

    setEquation((prev) => {
      if (
        prev[prev.length - 1]?.type == "operand" &&
        (prev[prev.length - 1]?.value == ")") && name !="operand"
      ) {
        hasError = true;
        return prev;
      }
      return prev;
    });

    setEquation((prev) => {
      if (
        prev[prev.length - 1]?.type == "operand" &&
        prev[prev.length - 1]?.value == ")" &&
        value == "("
      ) {
        hasError = true;
        return prev;
      }
      if(prev?.lenght > 0 && prev[prev.length - 1]?.type !== "operand" && (value =="(")){
        hasError = true;
        return prev;
      }
      return prev;
    });

    setEquation((rev) => {
      if (
        rev?.length &&
        rev[rev.length - 1]?.type == "tagInput" &&
        name == "numeric"
      ) {
        hasError = true;
        return rev;
      } else if (
        rev?.length &&
        rev[rev.length - 1]?.type == "tagInput" &&
        value == "."
      ) {
        hasError = true;
        return rev;
      }
      return rev;
    });

    setEquation((rev) => {
      if (
        rev?.length &&
        rev[rev.length - 1]?.type == "tagInput" &&
        name == "trig"
      ) {
        hasError = true;
        return rev;
      }
      return rev;
    });

    setEquation((prev) => {
      if (
        prev?.length &&
        prev[prev.length - 1]?.type !== "operand" &&
        !allowedOperands.includes(name) && prev[prev.length - 1]?.type !== ""
      ) {
        hasError = true;
        return prev;
      }
      return prev;
    });

    if (hasError) {
      toast.error("Please enter operator.");
      return;
    }
    // setEquation((prev) => {
    //   if (value == ".") {
    //     const lastObject = prev[prev.length - 1];
    //     const withDot = lastObject?.value.includes(".");
    //     if (withDot) {
    //       return prev;
    //     } else if (lastObject?.type == "operand") {
    //       return [...prev, { value, view: value, type: name }];
    //     }
    //   }
    //   if (
    //     prev?.length &&
    //     prev[prev.length - 1]?.type == "operand" &&
    //     name == "operand"
    //   ) {
    //     if (
    //       ((prev[prev.length - 1]?.value == "(" ||
    //         prev[prev.length - 1]?.value == ")" ||
    //         prev[prev.length - 1]?.value == "π") &&
    //         name == "operand") ||
    //       value == "(" ||
    //       value == ")" ||
    //       value == "π"
    //     ) {
    //       if(name == "pie"){
    //         return [...prev, { value:"3.14", view: value, type: name }];
    //       }
    //       return [...prev, { value, view: value, type: name }];
    //     }
    //     const clone = prev.slice(0, prev.length - 1);
    //     if(name == "pie"){
    //       return [...clone, { value:"3.14", view: value, type: name }];
    //     }
    //     return [...clone, { value, view: value, type: name }];
    //   }

    //   const parsedData = JSON.parse(prev[0]?.equationData);

    //   const newValue = [...parsedData, { value, view: value, type: name }];
    //   const newUpdate = parsedData.map((ele) => {
    //     return {
    //       ...ele,
    //       equationId: prev[0]?.equationId,
    //       equationData: JSON.stringify(newValue),
    //     };
    //   });
    //   return newUpdate;
    // });

    setEquation((prev) => {
      const lastObject = prev[prev.length - 1];

      let parsedData = [];
      try {
        parsedData = prev[0]?.equationData
          ? JSON.parse(prev[0].equationData)
          : [];
      } catch (error) {
        console.error("Error parsing equationData:", error);
        return prev;
      }

      let newValue = [...parsedData];

      if (value === ".") {
        if (lastObject?.type === "operand" && lastObject?.value.includes(".")) {
          return prev;
        }
        newValue.push({ value, view: value, type: name });
      } else if (
        ((prev[prev.length - 1]?.value == "(" ||
          prev[prev.length - 1]?.value == ")" ||
          prev[prev.length - 1]?.value == "π") &&
          name == "operand") ||
        value == "(" ||
        value == ")" ||
        value == "π"
      ) {
        newValue.push({ value, view: value, type: name });
      } else if (name === "pie") {
        newValue.push({ value: "3.14", view: value, type: name });
      } else if (lastObject?.type === "operand" && name === "operand") {
        newValue = [
          ...newValue.slice(0, -1),
          { value, view: value, type: name },
        ];
      } else {
        newValue.push({ value, view: value, type: name });
      }

      return prev.map((ele) => ({
        ...ele,
        equationId: prev[0]?.equationId,
        equationData: JSON.stringify(newValue),
      }));
    });
  };

  const handleKeyDown = (e) => {
    if (!calculatorRef?.current.contains(document?.activeElement)) return;
    const key = e?.key;
    if (key === "Backspace") {
      const customEvent = {
        target: {
          value: "Back",
          name: "clear",
        },
      };
      handleCalculatorKeyClick(customEvent);
      return;
    }

    const calcyButton = calcyButtons?.find((btn) => btn?.value === key);

    if (calcyButton) {
      const customEvent = {
        target: {
          value: calcyButton.value,
          name: calcyButton.type,
        },
      };
      handleCalculatorKeyClick(customEvent);
    }
  };

  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("390px"));
  const isMobile = useMediaQuery("(max-width: 390px)");

  useEffect(() => {
    if (isMobile) {
      window.addEventListener("keydown", handleKeyDown);

      setCalcyButtonsStateMobile((prev) =>
        prev.map((ele) => {
          if (ele?.type == "numeric") {
            return { ...ele, disabled: true };
          } else return ele;
        })
      );

      const lastElement = equation[equation?.length - 1];
      if (lastElement?.type != "tagInput") {
        setCalcyButtonsStateMobile(calcyButtons1);
      }
    } else {
      window.addEventListener("keydown", handleKeyDown);

      setCalcyButtonsState((prev) =>
        prev.map((ele) => {
          if (ele?.type == "numeric") {
            return { ...ele, disabled: true };
          } else return ele;
        })
      );

      const lastElement = equation[equation?.length - 1];
      if (lastElement?.type != "tagInput") {
        setCalcyButtonsState(calcyButtons);
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [equation]);

  return (
    <>
      <Box
        sx={{ width: "100%", float: "right" }}
        ref={calculatorRef}
        tabIndex={0}
      >
        <Box sx={style}>
          <CalcyHeadingBox>
            <CalcHeading>Calculator Parameters</CalcHeading>
          </CalcyHeadingBox>

          {isMobile ? (
            <Content>
              {calcyButtonsStateMobile?.map((ele, index) => {
                return (
                  <>
                    <CalcyButton
                      sx={ele?.sx}
                      key={ele?.value}
                      name={ele?.type}
                      value={ele?.value}
                      onClick={handleCalculatorKeyClick}
                    >
                      {ele?.value}
                    </CalcyButton>
                  </>
                );
              })}
            </Content>
          ) : (
            // <Content>
            //   {calcyButtonsState?.map((ele) => (
            //     <CalcyButton
            //       sx={ele?.sx}
            //       key={ele?.value}
            //       name={ele?.type}
            //       value={ele?.value}
            //       onClick={handleCalculatorKeyClick}
            //     >
            //       {ele?.value}
            //     </CalcyButton>
            //   ))}
            // </Content>
            <Content>
              {/* First 10 buttons inside one div with 5 buttons per row */}
              <div>
                {calcyButtonsState
                  ?.slice(0, 10)
                  .reduce((acc, ele, index) => {
                    const rowIndex = Math.floor(index / 5); // Determine the row number
                    if (!acc[rowIndex]) {
                      acc[rowIndex] = []; // Create a new row if it doesn't exist
                    }
                    acc[rowIndex].push(
                      <CalcyButton
                        sx={ele?.sx}
                        key={ele?.value}
                        name={ele?.type}
                        value={ele?.value}
                        onClick={handleCalculatorKeyClick}
                      >
                        {ele?.value}
                      </CalcyButton>
                    );
                    return acc;
                  }, [])
                  .map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px", // 10px gap between buttons
                        marginBottom: "10px", // Space between rows
                      }}
                    >
                      {row}
                    </div>
                  ))}
              </div>

              {/* Remaining buttons (after the first 10) inside another div with 5 buttons per row */}
              <div>
                {calcyButtonsState
                  ?.slice(10)
                  .reduce((acc, ele, index) => {
                    const rowIndex = Math.floor(index / 5); // Determine the row number
                    if (!acc[rowIndex]) {
                      acc[rowIndex] = []; // Create a new row if it doesn't exist
                    }
                    acc[rowIndex].push(
                      <CalcyButton
                        sx={ele?.sx}
                        key={ele?.value}
                        name={ele?.type}
                        value={ele?.value}
                        onClick={handleCalculatorKeyClick}
                      >
                        {ele?.value}
                      </CalcyButton>
                    );
                    return acc;
                  }, [])
                  .map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px", // 10px gap between buttons
                        marginBottom: "10px", // Space between rows
                      }}
                    >
                      {row}
                    </div>
                  ))}
              </div>
            </Content>
          )}
        </Box>
      </Box>
    </>
  );
};
