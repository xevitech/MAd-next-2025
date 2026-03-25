import React, { useEffect, useState } from "react";
import {
  CalcHeading,
  CalculateText,
  CalculatorHeader,
  CalcyBackspace,
  CalyBackSpaceIcon,
  EquationItem,
  EquationsContainerFinalCalculation,
  FinalCalculationContainer,
  FinalEQField,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import { ThreeDots } from "react-loader-spinner";
import { Calculator } from "./calculator";
import {
  getProductCalculator,
  handleGroupEquationsData,
  listMatrix,
  setEquations,
  setFinalGroupEquation,
  setProductCalculatorInfo,
  setSelectedGroupData,
  // setFinalEquationShow,
} from "@/hooks/PricingCalculatorReducer";
import {
  apiClient,
  calculateTrigonometricValues,
  getProductId,
  isValidParentheses,
} from "@/components/common/common";
import { toast } from "react-toastify";
import {
  fetchConstantsList,
  getSpecificationsList,
  setMatrixItems,
} from "@/hooks/CalculatorReducer";
import { BASE_URL_V2 } from "@/utils/staticValues";
import Auth from "@/auth/Auth";

const FinalCalculation = (props) => {
  const {
    productCalculatorHeader,
    finalEquationShow,
    allSpecs,
    equations,
    selectedGroupData,
    productCalculatorInfo,
    finalGroupEquation,
  } = useSelector((state: any) => state?.PricingCalculator);

  const { passiveSpecList } = useSelector(
    (state: any) => state?.calculatorData
  );

  const {
    // RenderFinalEquation,
    setFinalOperandsData,
    // setFinalEquationState,
    reloadMatrixData,
    handleClose,
    specsForEquations,
    // setResetLoader,
    // setFinalValues,
    // allEquationsState,
    allSpecsClone,
    myCalculatorEquations,
    setShowFirstCalculator,
    setShowSecondCalculator,
    setFinalCalculationClone,
    setShowFinalPriceCalculator,
    allEquationsStateClone,
    // setAllEquationsStateClone,
    // resetLoaderFinal,
    // setResetLoaderFinal,
    finalCalculation,
    setFinalCalculation,
    finalEquationError,
    setFinalEquationError,
    finalLoader,
    setFinalLoader,
    equationSelectionError,
    setEquationSelectionError,
    groupEqError,
    setGroupEqError,
    selectedGroups,
    setSelectedGroups,
    // groupFinalState,
    // setGroupFinalState,
    equationState,
    // setEquationState,
    finalPayloads,
    setFinalPayloads,
    handleFormatEquation,
    saveEquation,
    handleBackspace,
  } = props;

  const [groupEquationState, setGroupEquationState] = useState<any>([]);
  const [isCalculating, setIsCalculating] = useState<any>(false);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (productCalculatorHeader == "Group") {
      if (groupEquationState?.length == 0) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    } else {
      if (finalCalculation?.length == 0) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }, [groupEquationState, productCalculatorHeader, finalCalculation]);

  useEffect(() => {
    if (productCalculatorHeader === "Group") {
      const equation = finalGroupEquation.find(
        (eq) => eq?.group_id === selectedGroupData
      )?.equation_name;

      setGroupEquationState(equation ? JSON.parse(equation) : []);
    }
  }, [finalGroupEquation, selectedGroupData, productCalculatorHeader]);

  useEffect(() => {
    if (finalEquationShow?.length > 0 && productCalculatorHeader != "Group") {
      if (JSON?.parse(finalEquationShow)?.length > 0) {
        const equation = JSON?.parse(finalEquationShow);
        setFinalCalculation(equation);
      }
    }
  }, [finalEquationShow, productCalculatorHeader]);

  const productId = getProductId();

  const dispatch = useDispatch();

  // const resetAllFinalEquation = () => {
  //   setResetLoaderFinal(true);
  //   setResetLoader(false);
  //   setFinalCalculation([]);
  //   setFinalLoader(false);
  //   // setFinalEquationState([]);
  //   setFinalValues([]);
  //   setFinalPayloads([]);
  //   setSelectedGroups([]);
  //   setGroupFinalState([]);
  //   setFinalEquationError(false);
  //   setEquationSelectionError(false);
  //   setAllEquationsStateClone(
  //     allEquationsState?.map((element, index) => ({ id: index, data: element }))
  //   );
  //   dispatch(setFinalEquationShow([]));
  //   setResetLoaderFinal(false);
  // };

  const handleBackspaceGroup = () => {
    if (groupEquationState?.length > 0) {
      setGroupEquationState((prev) => prev?.slice(0, -1));
    }
  };

  // useEffect(() => {
  //   if (productCalculatorHeader == "Group") {
  //     dispatch(setSelectedGroupData(productCalculatorInfo?.[0]?.group_id));
  //   }
  // }, []);

  const handleFinalPriceCalculationSubmit = async () => {
    setIsCalculating(true);
    // const returnedData = await handleFormatEquation(finalPayloads);
    // return;
    if (selectedGroups.length == 0 && productCalculatorHeader == "Group") {
      setGroupEqError(true);
      return;
    }
    setGroupEqError(false);
    // setFinalLoader(true);
    // let groupId = selectedGroupData
    //   ? selectedGroupData
    //   : productCalculatorInfo?.[0]?.id;
    // let filterGroup = productCalculatorInfo.filter((v) => v.id == groupId);
    if (
      productCalculatorHeader == "Group"
      //  &&
      // (filterGroup?.[0]?.message == "similar" ||
      //   filterGroup?.[0]?.message == "multilevel")
    ) {
      if (selectedGroups.length > 0) {
        var setUser = [];
        if (finalPayloads.length <= 0) {
          setEquationSelectionError(true);
          setFinalLoader(false);
          return;
        }
        finalPayloads?.map((element) => {
          if (
            element.id &&
            !element.constants &&
            !element.equation_name &&
            !element?.is_parameter
          ) {
            // setUser.push(`${element.equation_formula}`);
            setUser.push(`specification_id:${element.id}`);
          } else if (element?.is_parameter && element?.attribute_id) {
            setUser.push(`parameter_id:${element?.attribute_id}`);
          } else if (element.constants === true) {
            // setUser.push(":" + element.value.split("").join(":") + ":");
            setUser.push(`constant_id:${element?.id}`);
          } else if (element.equation_name) {
            // setUser.push(":" + element.value.split("").join(":") + ":");
            setUser.push(`equation_id:${element?.id}`);
          } else {
            // setUser.push(":" + element.view + ":");
            setUser.push(" " + element.view + " ");
          }
        });

        var data = setUser.join("");
        var getFirstindexValue = data.charAt(0);
        var filterPayloads = data;
        if (getFirstindexValue == ":") {
          filterPayloads = filterPayloads.substring(1);
        }

        // var details = "";
        // if (filterGroup?.[0]?.message == "similar") {

        // selectedGroups?.forEach((element) => {
        //   details = details + element + ":";
        // });
        // }

        // else {
        // let allGroupsFormulla = groupEquationsSteps.filter(
        //   (element) => element.id == selectedGroupData
        // );
        // details =
        //   allGroupsFormulla?.[0].value.join().replaceAll(",", ":") + ":";
        // }

        let payloads = {
          product_id: productId,
          equations: filterPayloads,
          group_id: selectedGroupData
            ? selectedGroupData
            : equations?.[0]?.group_id,
        };
        const response = await apiClient(
          "product/calculator/equation_final/create",
          "POST",
          {
            body: payloads,
          }
        );
        await dispatch(
          handleGroupEquationsData({
            productId,
          })
        );
        setFinalLoader(false);
        toast.success("Equations created successfully.");
        //2693:+:2694:+:2695:+:1
      }
      return;
    } else {
      //Non-Group Case
      var setUser = [];
      if (finalCalculation.length <= 0) {
        setEquationSelectionError(true);
        setFinalLoader(false);
        return;
      }
      finalCalculation?.map((element) => {
        if (element.id && !element.constants && !element.equation_name && !element?.is_parameter) {
          // setUser.push(`${element.equation_formula}`);
          setUser.push(`specification_id:${element.id}`);
        }else if (element?.is_parameter && element?.attribute_id) {
          setUser.push(`parameter_id:${element?.attribute_id}`);
        }  else if (element.constants === true) {
          // setUser.push(":" + element.value.split("").join(":") + ":");
          setUser.push(`constant_id:${element?.id}`);
        } else if (element.equation_name) {
          // setUser.push(":" + element.value.split("").join(":") + ":");
          setUser.push(`equation_id:${element?.id}`);
        } else {
          // setUser.push(":" + element.view + ":");
          const operandValue = element.value ? element.value : element.view;
          setUser.push(" " + operandValue + " ");
        }
      });

      // if (
      //   productCalculatorHeader == "similar" &&
      //   productCalculatorInfo?.[0]?.message === undefined
      // ) {
      //   let newArray = [];
      //   productCalculatorInfo.map((ele) => {
      //     ele?.terms?.map((element) => {
      //       element?.price_matrix?.map((ele_term) => {
      //         newArray.push({
      //           id: ele_term?.price_matrix_id,
      //           value: ele_term?.value,
      //         });
      //       });
      //     });
      //     // ele?.terms.map((element) =>
      //     //   newArray.push({
      //     //     id: element?.id,
      //     //     value: element?.attributes_values,
      //     //   })
      //     // );
      //   });
      //   for (let i = 0; i < newArray?.length; i++) {
      //     if (newArray[i].value == "null" || newArray[i].value == "") {
      //       toast.error("Please fill all the fields!");
      //       setUpdateLoader(false);
      //       setFinalLoader(false);
      //       return;
      //     }
      //   }
      // }
      var filterPayloads = setUser.join("");
      // var getFirstindexValue = data.charAt(0);
      // var filterPayloads = data;
      // if (getFirstindexValue == ":") {
      //   filterPayloads = filterPayloads.substring(1);
      // }

      // if (productCalculatorHeader == "multilevel") {
      //   filterPayloads = allSpecs[0].id + ":+:" + filterPayloads;
      // }

      let makeJsonData = [];
      finalCalculation?.map((ele) => {
        if (ele?.equation_name) {
          makeJsonData.push({
            view: ele?.view,
            type: ele?.type,
            value: JSON.stringify(ele?.value),
            id: ele?.id ? ele?.id : 0,
            equation_name: ele?.equation_name,
          });
          return;
        }
        if (ele.constants) {
          makeJsonData.push({
            view: ele?.view,
            type: ele?.type,
            value: ele?.value,
            id: ele?.id ? ele.id : 0,
            constants: ele?.constants,
          });

          return;
        }
        makeJsonData.push({
          view: ele?.view,
          type: ele?.type,
          value: ele?.value,
          id: ele?.id ? ele?.id : 0,
        });
      });

      // if (makeJsonData[makeJsonData.length - 1]?.type == "operand") {
      //   setFinalEquationError(true);
      //   setFinalLoader(false);
      //   return;
      // }
      //TODO: Need to check this
      if (
        makeJsonData[makeJsonData.length - 1]?.type === "operand" &&
        makeJsonData[makeJsonData.length - 1]?.view !== ")"
      ) {
        setFinalEquationError(true);
        setFinalLoader(false);
        return;
      }
      if(!isValidParentheses(filterPayloads)) {
        toast.error("Please enter valid equation.");
        setIsCalculating(false);
        setFinalLoader(false);
        return;
      }

      const calculatedPayload = calculateTrigonometricValues(filterPayloads);

      let payloads = {
        id: productId,
        type: productCalculatorHeader,
        formula: calculatedPayload,
        final_equation: JSON.stringify(makeJsonData),
        published:0
      };
      try {
        const fetchedResponse = await fetch(
          `${BASE_URL_V2}/product/calculator/storage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Auth.token()}`,
            },
            body: JSON.stringify(payloads),
          }
        );

        const response = await fetchedResponse?.json();
        // const response = await apiClient("product/calculator/storage", "POST", {
        //   body: payloads,
        // });
        setFinalLoader(false);
        setFinalEquationError(false);
        setEquationSelectionError(false);
        if (fetchedResponse?.ok) {
          toast.success(
            "Price will be reflected across all metrics based on the value of the final equation."
          );
          // toast.success(response.message);
          dispatch(setMatrixItems([]));
          dispatch(setMatrixItems(await reloadMatrixData()));
          handleClose();
          await dispatch(listMatrix({ productId }));
          await dispatch(fetchConstantsList(productId));
          await dispatch(
            getSpecificationsList({ specEdited: false, id: productId })
          );
        } else {
          setFinalLoader(false);
          toast.error(response.message);
        }
      } catch (err) {
        setFinalLoader(false);
        setFinalEquationError(false);
        toast.error(err);
      }
      setIsCalculating(false);
      setFinalLoader(false);
    }
  };

  const handleEquationClickFinalPriceGroup = (equation, type) => {
    if (type == "extra_passive") {
      setGroupEquationState((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          toast.error("Please enter operator.");
          return prev;
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          (prev[prev.length - 1]?.value == ")")
        ) {
          toast.error("Please enter operator.");
          return prev;
        }
        if (prev?.length)
          return [
            ...prev,
            {
              id: equation?.id,
              type_check: "constant",
              value: equation?.value,
              view: `#${equation?.tag}`,
              type: "tagInput",
              constants: true,
            },
          ];
        else
          return [
            {
              id: equation?.id,
              type_check: "constant",
              value: equation?.value,
              view: `#${equation?.tag}`,
              type: "tagInput",
              constants: true,
            },
          ];
      });
    } else {
      setGroupEquationState((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          toast.error("Please enter operator.");
          return prev;
        }

        if (
          prev[prev.length - 1]?.type == "operand" &&
          (prev[prev.length - 1]?.value == ")")
        ) {
          toast.error("Please enter operator.");
          return prev;
        }

        if (prev?.length) {
          if (equation?.data) {
            return [
              ...prev,
              {
                view: "(",
                value: "(",
                type: "operand",
              },
              ...equation?.data?.map((eq) => {
                return {
                  id: eq?.id,
                  type_check: eq?.type_check,
                  value: eq?.value,
                  view: eq?.view,
                  type: eq?.type,
                  constants: eq?.constants,
                  attribute_id: eq?.attribute_id??"",
              is_parameter: eq?.is_parameter??"",
                };
              }),
              {
                view: ")",
                value: ")",
                type: "operand",
              },
            ];
          }

          return [
            ...prev,
            {
              id: equation?.id,
              type_check: equation?.type_check,
              value: equation?.value,
              view: equation?.value,
              type: "tagInput",
              attribute_id: equation?.attribute_id??"",
              is_parameter: equation?.is_parameter??"",
            },
          ];
        } else {
          if (equation?.data) {
            return [
              ...prev,
              {
                view: "(",
                value: "(",
                type: "operand",
              },
              ...equation?.data?.map((eq) => {
                return {
                  id: eq?.id,
                  type_check: eq?.type_check,
                  value: eq?.value,
                  view: eq?.view,
                  type: eq?.type,
                  constants: eq?.constants,
                  attribute_id: eq?.attribute_id??"",
              is_parameter: eq?.is_parameter??"",
                };
              }),
              {
                view: ")",
                value: ")",
                type: "operand",
              },
            ];
          }
          return [
            {
              id: equation?.id,
              type_check: equation?.type_check,
              value: equation?.value,
              view: equation?.value,
              type: "tagInput",
              attribute_id: equation?.attribute_id??"",
              is_parameter: equation?.is_parameter??"",
            },
          ];
        }
      });
    }
  };

  // const setOperandDataGroup = (operand: any) => {
  //   setGroupEquationState((prev) => [...prev, operand]);
  // };

  const handleSaveEquationGroup = async () => {
    setIsCalculating(true);
    const formattedEquation = await handleFormatEquation(groupEquationState);

    if(!isValidParentheses(formattedEquation)){
      setIsCalculating(false);
      toast.error("Please enter valid equation.");
      return;
    }
    await saveEquation(
      // formattedEquation?.replaceAll(",", ""),
      formattedEquation,
      groupEquationState[0]?.equationName,
      JSON.stringify(groupEquationState),
      true
    );
    try {
      const fetchData = await fetch(
        `${BASE_URL_V2}/product/calculator?product_id=${productId}`,
        {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );

      const response = await fetchData?.json();

      if (response?.status || response?.ok) {
        // toast.success("Equations created successfully.");
        setFinalEquationError(false);
        dispatch(setProductCalculatorInfo(response?.data));
        dispatch(setEquations(response?.equations));
        if (productCalculatorHeader == "Group") {
          dispatch(
            setSelectedGroupData(
              selectedGroupData
                ? selectedGroupData
                : response?.data?.[0]?.group_id
            )
          );
          dispatch(
            setFinalGroupEquation(
              response?.group_equation?.length > 0
                ? response?.group_equation
                : []
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsCalculating(false);
    // await dispatch(getProductCalculator({ productId }));
  };

  const handleEquationClickFinalPrice = async (id, equationData, idx = "" ,equaionName = '') => {
    // return;

    setFinalEquationError(false);
    setEquationSelectionError(false);

    // const groupId = selectedGroupData || productCalculatorInfo?.[0]?.id;
    // const filterGroupData = productCalculatorInfo.filter(
    //   (v) => v.id === groupId
    // )[0];
    // const isGroupMessageSimilar = filterGroupData?.message === "similar";
    // const isGroupMessageMultiLevel = filterGroupData?.message === "multilevel";
    if (
      productCalculatorHeader === "Group"
      // &&
      // (isGroupMessageSimilar || isGroupMessageMultiLevel)
    ) {
      const filterEquations = equations?.filter(
        (el) => selectedGroupData === el.group_id
      );

      const updatedGroups =
        equationData === "extra"
          ? [
              ...selectedGroups,
              allSpecsClone
                .flat()
                .find((ele) => ele.tag === id.value.replace("#", ""))?.id,
            ]
          : equationData === "extra_passive"
          ? [...selectedGroups, ":" + id?.value.split("").join(":") + ":"]
          : [
              ...selectedGroups,
              filterEquations?.[0]?.equations?.[id]?.equation_formula,
            ];

      setSelectedGroups(updatedGroups);
    }
    if (equationData == "extra") {
      let hasError = false;
      let getEqData = [];
      if (productCalculatorHeader == "Group") {
        getEqData = allSpecsClone
          .flat()
          .filter((ele) => ele.tag == id.value.replaceAll("#", ""));
      } else {
        getEqData = allSpecs.filter(
          (ele) => ele.tag == id.value.replaceAll("#", "")
        );
      }

      await setFinalPayloads((prev) => {
        if (prev[prev.length - 1]?.type == "pie") {
          hasError = true;
          return prev;
        }
        return prev;
      });

      await setFinalPayloads((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          hasError = true;
          return prev; // Prevent adding a new item if the last one is invalid
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          (prev[prev.length - 1]?.value == ")")
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

      setFinalPayloads([
        ...finalPayloads,
        { id: getEqData?.[0]?.id, equation_formula: getEqData?.[0]?.id },
      ]);
    } else if (equationData == "extra_passive") {
      let hasError = false;
      await setFinalPayloads((prev) => {
        if (prev[prev.length - 1]?.type == "pie") {
          hasError = true;
          return prev;
        }
        return prev;
      });
      await setFinalPayloads((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          hasError = true;

          return prev; // Prevent adding a new item if the last one is invalid
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          (prev[prev.length - 1]?.value == ")")
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

      setFinalPayloads([
        ...finalPayloads,
        {
          view: id?.tag,
          type: "tagInput",
          value: id?.value,
          constants: true,
          id: id?.id,
          attribute_id: id?.attribute_id ?? "",
          is_parameter: id?.is_parameter ?? "",
        },
      ]);
    } else {
      let hasError = false;
      await setFinalPayloads((prev) => {
        if (prev[prev.length - 1]?.type == "pie") {
          hasError = true;
          return prev;
        }
        return prev;
      });
      await setFinalPayloads((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          hasError = true;

          return prev; // Prevent adding a new item if the last one is invalid
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          (prev[prev.length - 1]?.value == ")")
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
      setFinalPayloads([
        ...finalPayloads,
        myCalculatorEquations?.[id] ?? equations[id],
      ]);
    }

    if (equationData == "extra") {
      let hasError = false;
      await setFinalPayloads((prev) => {
        if (prev[prev.length - 1]?.type == "pie") {
          hasError = true;
          return prev;
        }
        return prev;
      });
      await setFinalCalculation((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          hasError = true;
          toast.error("Please enter operator.");
          return prev; // Prevent adding a new item if the last one is invalid
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          (prev[prev.length - 1]?.value == ")")
        ) {
          hasError = true;
          return prev;
        }
        return prev;
      });
      if (hasError) {
        return;
      }

      setFinalCalculation((prev) => [
        ...prev,
        {
          view: `${id.value}`,
          type: "tagInput",
          value: equationData,
          id: id?.id,
          attribute_id: id?.attribute_id ?? "",
          is_parameter: id?.is_parameter ?? "",
        },
      ]);
    } else if (equationData == "extra_passive") {
      let hasError = false;
     await setFinalCalculation((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          hasError = true;
          toast.error("Please enter operator.");
          return prev; // Prevent adding a new item if the last one is invalid
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          (prev[prev.length - 1]?.value == ")")
        ) {
          hasError = true;
          return prev;
        }
        return prev;
      });
      if (hasError) {
        return;
      }

      setFinalCalculation((prev) => [
        ...prev,
        {
          view: `#${id.tag}`,
          type: "tagInput",
          value: id.value,
          id: id?.id,
          constants: true,
        },
      ]);
    } else {
      let hasError = false;
      await setFinalCalculation((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          hasError = true;
          toast.error("Please enter operator.");
          return prev; // Prevent adding a new item if the last one is invalid
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          (prev[prev.length - 1]?.value == ")")
        ) {
          hasError = true;
          return prev;
        }
        return prev;
      });
      if (hasError) {
        return;
      }

      setFinalCalculation((prev) => [
        ...prev,
        {
          view: equaionName
            ? equaionName
            : `Equation #${idx}`,
          type: "tagInput",
          value: equationData,
          id: id,
          // constants:true,
          equation_name: equaionName
            ? equaionName
            : `Equation #${idx}`,
          attribute_id: equationData?.attribute_id ?? "",
          is_parameter: equationData?.is_parameter ?? "",
        },
      ]);
    }

    setShowFirstCalculator(false);
    setShowSecondCalculator(true);
    setFinalCalculationClone((prev) => [
      ...prev,
      { view: `EQ#${idx}`, type: "tagInput", value: equationData, id: id },
    ]);

    setShowFinalPriceCalculator(true);
  };

  return (
    <FinalCalculationContainer>
      <CalculatorHeader style={{ margin: "0px" }}>
        {productCalculatorHeader == "Group"
          ? `${
              productCalculatorInfo?.find(
                (group) => group?.group_id == selectedGroupData
              )?.name
                ? productCalculatorInfo?.find(
                    (group) => group?.group_id == selectedGroupData
                  )?.name
                : productCalculatorInfo[0]?.name
            } Final Equation  `
          : " Equation For Final Calculation"}
      </CalculatorHeader>
      {/* {finalEquationShow?.length > 0 && (
        <EquationsContainerFinalCalculation
          style={{
            border: "1px solid #D2D2D2",
            marginBottom: "8px",
            padding: "10px 0",
            minHeight: "37.83px",
          }}
        >
          {RenderFinalEquation(finalEquationShow)?.map((element) => {
            return element?.type == "tagInput" ? (
              <EquationItem
                borderColor="#D7282F"
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "#D7282F",
                }}
              >
                {element?.view}
              </EquationItem>
            ) : (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                {element?.view}
              </span>
            );
          })}

          {resetLoaderFinal ? (
            <span>
              <CircularProgress
                style={{
                  color: "#D7282F",
                  height: "20px",
                  width: "20px",
                }}
              />
            </span>
          ) : (
            <>
              <DeleteOutlineIcon
                style={{
                  color: "#D7282F",
                  cursor: "pointer",
                  height: "20px",
                  width: "20px",
                }}
                onClick={(e) => resetAllFinalEquation()}
              />
            </>
          )}
        </EquationsContainerFinalCalculation>
      )} */}
      {/* {finalCalculation?.length > 0 && ( */}
      <CalcyBackspace>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={9} lg={9} xl={9.5}>
            <FinalEQField sx={{ width: "100%", gap: "2px" }}>
              <CalyBackSpaceIcon
                onClick={() =>
                  productCalculatorHeader == "Group"
                    ? handleBackspaceGroup()
                    : handleBackspace("final")
                }
              />
              {productCalculatorHeader == "Group"
                ? groupEquationState?.length > 0 &&
                  groupEquationState?.map((element) => {
                    return element?.type == "tagInput" ? (
                      <EquationItem
                        borderColor="#D7282F"
                        style={{
                          color: "#FFFFFF",
                          backgroundColor: "#D7282F",
                        }}
                      >
                        {element?.view}
                        {/* {element?.id?.id} */}
                      </EquationItem>
                    ) : element?.type == "numeric" ? (
                      <Typography
                        variant="subtitle2"
                        dangerouslySetInnerHTML={{
                          __html: element?.view,
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                      >
                        {element?.view}
                      </span>
                    );
                  })
                : finalCalculation?.map((element) => {
                    return element?.type == "tagInput" ? (
                      <EquationItem
                        borderColor="#D7282F"
                        style={{
                          color: "#FFFFFF",
                          backgroundColor: "#D7282F",
                        }}
                      >
                        {element?.view}
                      </EquationItem>
                    ) : element?.type == "numeric" ? (
                      <Typography
                        variant="subtitle2"
                        dangerouslySetInnerHTML={{
                          __html: element?.view,
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                      >
                        {element?.view}
                      </span>
                    );
                  })}
            </FinalEQField>
            <Box
              sx={
                {
                  /*paddingTop: "7px"*/
                }
              }
            >
              {finalEquationError && !finalLoader && (
                <CommonErrorMessage
                  message={"Please enter a correct equation."}
                />
              )}

              {equationSelectionError && !finalLoader && (
                <CommonErrorMessage
                  message={"Please select at least one equation."}
                />
              )}

              {groupEqError && !finalLoader && (
                <CommonErrorMessage
                  message={"Please select at least one equation."}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={2.5}>
            <Box>
              <BtnFilled
                onClick={
                  productCalculatorHeader == "Group"
                    ? handleSaveEquationGroup
                    : handleFinalPriceCalculationSubmit
                }
                sx={{
                  /*marginTop: "12px"*/ width: "100%",
                  "@media (max-width: 900px)": {
                    width: "max-content",
                  },
                }}
                // background={"#2F2F2F"}
                className={finalLoader || isDisabled ? "disableBTN" : ""}

                // disabled={finalLoader || groupEquationState?.length == 0 ? true : false}
              >
                {isCalculating || finalLoader ? (
                  <ThreeDots
                    height="36"
                    width="36"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : productCalculatorHeader == "Group" ? (
                  "Save"
                ) : (
                  "Calculate"
                )}
              </BtnFilled>
              <CalculateText>
                Click <span>“Calculate” </span> to apply the value as price
                across all metrics{" "}
              </CalculateText>
            </Box>
          </Grid>
        </Grid>
      </CalcyBackspace>
      {/* )} */}
      <Grid
        container
        spacing={2}
        mt={2}
        sx={{
          "@media screen and (max-width:1400px)": {
            flexDirection: "column-reverse",
          },
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={7} xl={7.5}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Box>
                  <CalcHeading>Select Specifications</CalcHeading>
                  <EquationsContainerFinalCalculation>
                    {/* {
                    // finalEquationShow?.length === 0 &&
                    specsForEquations?.map(
                      (element, index) =>
                        productCalculatorHeader ==
                          "multilevel" && index != 0 ? (
                          <EquationItem
                            onClick={() => {
                              handleEquationClickFinalPrice(
                                element,
                                "extra"
                              );
                            }}
                          >
                            {element.view}
                          </EquationItem>
                        ) : productCalculatorHeader ==
                          "similar" ? (
                          <EquationItem
                            onClick={() => {
                              handleEquationClickFinalPrice(
                                element,
                                "extra"
                              );
                            }}
                          >
                            {element.view}
                          </EquationItem>
                        ) : productCalculatorHeader ==
                          "Group" ? (
                          <EquationItem
                            onClick={() => {
                              handleEquationClickFinalPrice(
                                element,
                                "extra"
                              );
                            }}
                          >
                            {element.view}
                          </EquationItem>
                        ) : null
                    )
                  } */}

                    {specsForEquations?.map((element) => (
                      <EquationItem
                        onClick={() => {
                          productCalculatorHeader == "Group"
                            ? handleEquationClickFinalPriceGroup(
                                element,
                                "extra"
                              )
                            : handleEquationClickFinalPrice(element, "extra");
                        }}
                      >
                        {element.view}
                      </EquationItem>
                    ))}
                  </EquationsContainerFinalCalculation>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Box>
                  <CalcHeading>Select Constants</CalcHeading>
                  {passiveSpecList.length > 0 ?
                    passiveSpecList?.map((element, index) => (
                      <EquationItem
                        sx={{ margin: "0 4px 4px" }}
                        onClick={() => {
                          productCalculatorHeader == "Group"
                            ? handleEquationClickFinalPriceGroup(
                                element,
                                "extra_passive"
                              )
                            : handleEquationClickFinalPrice(
                                element,
                                "extra_passive"
                              );
                        }}
                      >
                        {element.name} #{element.tag}
                      </EquationItem>
                    )) : "N/A"}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Box>
                  <CalcHeading>Select Equations</CalcHeading>
                  {
                    // finalEquationShow?.length === 0 &&
                    allEquationsStateClone?.length > 0 ? allEquationsStateClone?.map((element, index) => {
                      return (
                        <EquationItem
                          sx={{ margin: "0 4px 4px" }}
                          onClick={() => {
                            productCalculatorHeader == "Group"
                              ? handleEquationClickFinalPriceGroup(
                                  element,
                                  "extra"
                                )
                              : handleEquationClickFinalPrice(
                                  element?.id,
                                  element?.data,
                                  element?.idx,
                                  element?.name
                                );
                          }}
                        >
                          {element?.name
                            ? element?.name
                            : `Equation #${element?.idx}`}
                        </EquationItem>
                      )
                    }) : "N/A"
                  }
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5} xl={4.5}>
          <Box>
            {/* {showSecondCalculator && ( */}
            {productCalculatorHeader == "Group" ? (
              <Calculator
                setData={setGroupEquationState}
                equation={groupEquationState}
                // setFinalEquation={setFinalEquationState}
                setEquation={setGroupEquationState}
                setFinalPayloads={setFinalPayloads}
                showClear={true}
                marginCheck={0}
                type={1}
                calculatorType={"Group"}
              />
            ) : (
              <Calculator
                setData={setFinalOperandsData}
                equation={equationState}
                // setFinalEquation={setFinalEquationState}
                finalCalculation={finalCalculation}
                setEquation={setFinalCalculation}
                setFinalPayloads={setFinalPayloads}
                showClear={true}
                marginCheck={0}
                type={1}
                calculatorType={""}
              />
            )}
            {/* )} */}
          </Box>
        </Grid>
      </Grid>

      {/* {finalEquationShow?.length === 0 && ( */}
      {/* <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        marginTop: "5px",
        "@media screen and (max-width:600px)": {
          display: "block",
          marginRight: "15px",
        },
      }}
    >
      <BtnFilled
        onClick={handleFinalPriceCalculationSubmit}
        style={{ marginTop: "12px" }}
        background={"#2F2F2F"}
        disabled={finalLoader ? true : false}
      >
        {finalLoader ? (
          <ThreeDots
            height="36"
            width="36"
            radius="9"
            color="white"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        ) : (
          "Calculate"
        )}
      </BtnFilled>
      <Box sx={{ paddingTop: "7px" }}>
        {finalEquationError && !finalLoader && (
          <CommonErrorMessage
            message={"Please enter a correct equation."}
          />
        )}

        {equationSelectionError && !finalLoader && (
          <CommonErrorMessage
            message={"Please select at least one equation."}
          />
        )}

        {groupEqError && !finalLoader && (
          <CommonErrorMessage
            message={"Please select at least one equation."}
          />
        )}
      </Box>
    </Box> */}
    </FinalCalculationContainer>
  );
};

export default FinalCalculation;
