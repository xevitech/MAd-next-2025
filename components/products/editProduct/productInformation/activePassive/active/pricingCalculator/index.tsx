import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import SkeletonForCalculator from "./SkeletonForCalculator";
import { Skeleton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const style = {
  position: "absolute" as "absolute",
  top: "0%",
  right: "0%",
  transform: "translate(-50%, -50%)",
  width: "96%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflow: "auto",
  "@media (max-width: 1368px)": {
    width: "90%",
  },
};

import {
  HeaderText,
  Header,
  OuterContainer,
  RightContainer,
  LeftContainer,
  CalculatorOuterContianer,
  CalculatorHeader,
  CalculatorContent,
  EquationHeader,
  AddEquationContainer,
  CustomEquationContainer,
  CustomChipEquation,
  EquationsContainer,
  EquationOuterContainer,
  EquationContainer,
  FinalCalculationContainer,
  EquationsContainerFinalCalculation,
  EquationItem,
  CalculatorBox,
  EQAction,
  CalcHeading,
  EditEquation,
  EQField,
  ExpandCollapseArrow,
  EquationSave,
  CalcyBackspace,
  CalcyDelEdit,
  CalyDeletedIcon,
  CalyBackSpaceIcon,
  CalculateText,
} from "./styles";
import TableWrapper from "./tableWrapper";
import GroupTableWrapper from "./GroupTableWrapper";
import {
  apiClient,
  calculateTrigonometricValues,
  getProductId,
  isValidParentheses,
} from "@/components/common/common";
import { toast } from "react-toastify";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import { Grid, TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { Calculator } from "./calculator";
import { BASE_URL, BASE_URL_V2 } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCalculator,
  handleGroupEquationsData,
  setAllSpecs,
  setAllTerms,
  setEmptyFieldsError,
  setEquations,
  setFinalEquationShow,
  setFinalGroup,
  setFinalGroupEquation,
  setMultiTableInfo,
  setPayloadValuesForMultiTableInitially,
  setPayloadValuesForTableInitially,
  setRowFields,
  setSelectedGroupData,
} from "@/hooks/PricingCalculatorReducer";
import { setProductCalculatorInfo } from "@/hooks/PricingCalculatorReducer";
import { ThreeDots } from "react-loader-spinner";
import {
  fetchConstantsList,
  getSpecificationsList,
  setMatrixItems,
} from "@/hooks/CalculatorReducer";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
import useErrorTimeout from "@/hooks/useErrorTimeout";
import FinalCalculation from "./FinalCalculation";
import { CalculatorClone } from "./calculatorClone";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";

export default function PricingCalculator({ showModal, setShowModal }) {
  const productId = getProductId();
  const [open, setOpen] = useState(showModal);
  const [specsForEquations, setSpecsForEquations] = useState<any>([]);
  const [specsForEquationsClone, setSpecsForEquationsClone] = useState<any>([]);
  const [allEquationsState, setAllEquationsState] = useState<any>([]);
  const [equationState, setEquationState] = useState<any[]>([]);

  // const [finalEquationState, setFinalEquationState] = useState<any[]>([]);

  const [showEquationCalculator, setShowEquationCalculator] = useState(false);
  const [showFinalPriceCalculator, setShowFinalPriceCalculator] =
    useState(false);
  const [allEquationsStateClone, setAllEquationsStateClone] = useState<any>([]);

  const [idsOfEquations, setIdsOfEquations] = useState<any>([]);
  const [finalCalculation, setFinalCalculation] = useState<any>([]);
  const [finalCalculationClone, setFinalCalculationClone] = useState<any>([]);
  const [addEqLoader, setAddEqLoader] = useState(false);
  const [finalLoader, setFinalLoader] = useState(false);
  const [groupEquation, setGroupEquation] = useState([]);
  const [showFirstCalculator, setShowFirstCalculator] = useState(true);
  const [showSecondCalculator, setShowSecondCalculator] = useState(false);

  const [finalValues, setFinalValues] = useState<any>([]);
  const [finalPayloads, setFinalPayloads] = useState<any>([]);
  const handleOpen = () => setOpen(true);
  const [myCalculatorEquations, setMyCalculatorEquations] = useState<any>([]);

  const [selectedGroups, setSelectedGroups] = React.useState<any>([]);
  const [newGrpId, setNewGrpId] = React.useState<any>("");
  const [groupFinalState, setGroupFinalState] = React.useState<any>([]);
  const [groupEquationsSteps, setGroupEquationsSteps] = React.useState<any>([]);
  /*************************Experiment***********************************/

  const [groupsClone, setGroupsClone] = useState<any>([]);

  const [resetLoader, setResetLoader] = useState<any>(false);
  const [resetLoaderFinal, setResetLoaderFinal] = useState<any>(false);

  const [allSpecsClone, setAllSpecsClone] = useState<any>([]);
  const [allGroupSpecList, setAllGroupSpecList] = useState<any>([]);
  const [updateEquationLoader, setUpdateEquationLoader] = useState<any>(false);
  const [calculatorToggle, setCalculatorToggle] = useState<any>(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const {
    productCalculatorHeader,
    productCalculatorInfo,
    finalEquationShow,
    rowFields,
    allSpecs,
    allTerms,
    multiTableInfo,
    equations,
    finalGroupEquation,
    payloadValuesForTableInitially,
    payloadValuesForMultiTableInitially,
    finalGroup,
    selectedGroupData,
    groupEquationsDataForFinal,
    emptyFieldsError,
  } = useSelector((state: any) => state?.PricingCalculator);
  const [finalEquationError, setFinalEquationError] = useState(false);
  const [equationError, setEquationError] = useState(false);
  const [minEquationError, setMinEquationError] = useState(false);
  const [equationSelectionError, setEquationSelectionError] = useState(false);
  const [finalCalEqError, setFinalCalEqError] = useState(false);
  const [grpFinalEqError, setGrpFinalEqError] = useState(false);
  const [groupEqError, setGroupEqError] = useState(false);
  const [editEquation, setEditEquation] = useState<any>([]);
  const [editEquationCalcy, setEditEquationCalcy] = useState<any>([]);

  // useEffect(() => {
  //   if (editEquation[0]?.equationId) {
  //     dispatch(setEditEqCalcy(JSON.parse(editEquation[0]?.equationData)));
  //   }
  // }, [editEquation]);

  // useEffect(() => {
  //   const updatedEqData = editEquation?.map((ele) => {
  //     return { ...ele, equationData: JSON.stringify(editEquationCalcy) };
  //   });
  //   setEditEquation(updatedEqData);
  // }, [editEquationCalcy]);

  const { passiveSpecList } = useSelector(
    (state: any) => state?.calculatorData
  );
  useEffect(() => {
    if (productCalculatorHeader == "Group") {
      // if (JSON?.parse(finalEquationShow)) {
      const equation =
        typeof finalEquationShow === "string"
          ? JSON?.parse(finalEquationShow)
          : [];
      setGroupFinalState(equation);
      // }
    } else {
      const equation =
        typeof finalEquationShow === "string"
          ? JSON?.parse(finalEquationShow)
          : [];
      setFinalCalculation(equation);
    }
  }, [finalEquationShow, productCalculatorHeader]);

  const [updateLoader, setUpdateLoader] = useState(false);

  const dispatch = useDispatch();

  const reloadMatrixData = async () => {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("per_page", "100");
    try {
      const response = await fetch(`${BASE_URL}/product/matrix/list`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      return data?.data;
    } catch (error) {
      console.error(error);
    }
  };
  useErrorTimeout(minEquationError, setMinEquationError, 5000);
  useErrorTimeout(finalCalEqError, setFinalCalEqError, 5000);
  useErrorTimeout(grpFinalEqError, setGrpFinalEqError, 5000);
  useErrorTimeout(finalEquationError, setFinalEquationError, 5000);
  useErrorTimeout(equationError, setEquationError, 5000);
  useErrorTimeout(equationSelectionError, setEquationSelectionError, 5000);
  useErrorTimeout(groupEqError, setGroupEqError, 5000);

  useEffect(() => {
    setFinalEquationError(false);
    setEquationError(false);
    setEquationSelectionError(false);
    setMinEquationError(false);
    setFinalCalEqError(false);
    setGrpFinalEqError(false);
  }, [selectedTab]);

  const handleFinalPriceGroupCalculationSubmit = async () => {
    if (groupFinalState.length == 0) {
      setGrpFinalEqError(true);
      return;
    }
    setGrpFinalEqError(false);
    setFinalLoader(true);
    var setUser = [];
    if (
      groupFinalState[groupFinalState.length - 1]?.type == "operand" &&
      groupFinalState[groupFinalState.length - 1]?.view !== ")"
    ) {
      setFinalCalEqError(true);
      setFinalLoader(false);
      return;
    }
    groupFinalState?.map((element) => {
      // if (element.type == "tagInput" && element.constants === true) {
      //   setUser.push(":" + element.value.split("").join(":") + ":");
      // } else if (element.type == "tagInput") {
      //   let filterEquations = groupEquationsDataForFinal?.filter(
      //     (newEle) => newEle.group_id == element.value
      //   );
      //   let filterGroup = productCalculatorInfo?.filter(
      //     (newEle) => newEle.id == element.value
      //   );
      //   let extraParams = allSpecsClone
      //     .flat()
      //     .filter((ele) => ele.tag == element.view.replaceAll("#", ""));
      //   let mainEquations = filterEquations?.[0]?.equations;
      //   setUser.push(`${mainEquations ? mainEquations : extraParams?.[0]?.id}`);
      // } else {
      //   setUser.push(":" + element.view + ":");
      // }

      if (
        element.value &&
        !element.constants &&
        element?.type == "tagInput" &&
        !element?.is_group &&
        !element?.is_parameter
      ) {
        // setUser.push(`${element.equation_formula}`);
        setUser.push(`specification_id:${element.id}`);
      } else if (element?.is_parameter && element?.attribute_id) {
        setUser.push(`parameter_id:${element.attribute_id}`);
      } else if (element.constants === true) {
        // setUser.push(":" + element.value.split("").join(":") + ":");
        setUser.push(`constant_id:${element?.id}`);
      } else if (element?.is_group) {
        // setUser.push(":" + element.value.split("").join(":") + ":");
        setUser.push(`group_equation_id:${element?.id}`);
      } else {
        // setUser.push(":" + element.view + ":");
        setUser.push(" " + element.value + " ");
      }
    });

    // var data = setUser
    //   .join("")
    //   .replaceAll("::", ":")
    //   .replaceAll(":):", ")")
    //   .replaceAll(")", "):");
    // var getFirstindexValue = data.charAt(0);

    // var filterPayloads = data;
    // if (getFirstindexValue == ":") {
    //   filterPayloads = filterPayloads.substring(1);
    // }

    let makeJsonData = [];
    groupFinalState?.map((ele) => {
      if (ele?.constants) {
        makeJsonData.push({
          view: ele.view,
          type: ele.type,
          id: ele?.id ? ele.id : 0,
          value: ele?.value,
          constants: ele?.constants,
        });
        return;
      }

      if (ele?.is_group) {
        makeJsonData.push({
          view: ele.view,
          type: ele.type,
          id: ele?.id ? ele.id : 0,
          value: ele?.value,
          is_group: ele?.is_group,
        });
        return;
      }
      makeJsonData.push({
        view: ele.view,
        type: ele.type,
        id: ele?.id ? ele.id : 0,
        value: ele?.value,
        attribute_id: ele?.attribute_id ?? "",
        is_parameter: ele?.is_parameter ?? "",
      });
    });

    // if (makeJsonData[makeJsonData.length - 1]?.type == "operand") {
    //   setFinalEquationError(true);
    //   setFinalLoader(false);
    //   return;
    // }

    var data = setUser.join("");
    var getFirstindexValue = data.charAt(0);
    var filterPayloads = data;
    if (getFirstindexValue == ":") {
      filterPayloads = filterPayloads.substring(1);
    }

    const calculatedPayload = calculateTrigonometricValues(filterPayloads);

    if(!isValidParentheses(calculatedPayload)){
      setFinalLoader(false);
      toast.error("Please enter valid equation.");
      return;
    }

    let payloads = {
      id: productId,
      type: productCalculatorInfo[0]?.is_group ? "Group" : null,
      formula: calculatedPayload,
      final_equation: JSON.stringify(makeJsonData),
      published: 0,
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
      if (fetchedResponse?.ok) {
        toast.success(
          "Price will be reflected across all metrics based on the value of the final equation."
        );
        // toast.success(response.message);
        dispatch(setMatrixItems([]));
        dispatch(setMatrixItems(await reloadMatrixData()));
        handleClose();
        await dispatch(fetchConstantsList(productId));
        await await dispatch(
          getSpecificationsList({ specEdited: false, id: productId })
        );
      } else {
        setFinalLoader(false);
        toast.error(response.message);
      }
    } catch (err) {
      setFinalLoader(false);
      toast.error(err);
    }
  };

  // function getUniqueListBy(arr, key) {
  //   return [...new Map(arr.map((item) => [item[key], item])).values()];
  // }

  // const handleFinalPriceCalculationSubmit = async () => {
  //   if (selectedGroups.length == 0 && productCalculatorHeader == "Group") {
  //     setGroupEqError(true);
  //     return;
  //   }
  //   setGroupEqError(false);
  //   setFinalLoader(true);
  //   // let groupId = selectedGroupData
  //   //   ? selectedGroupData
  //   //   : productCalculatorInfo?.[0]?.id;
  //   // let filterGroup = productCalculatorInfo.filter((v) => v.id == groupId);
  //   if (
  //     productCalculatorHeader == "Group"
  //     //  &&
  //     // (filterGroup?.[0]?.message == "similar" ||
  //     //   filterGroup?.[0]?.message == "multilevel")
  //   ) {
  //     if (selectedGroups.length > 0) {
  //       var setUser = [];
  //       if (finalPayloads.length <= 0) {
  //         setEquationSelectionError(true);
  //         setFinalLoader(false);
  //         return;
  //       }
  //       finalPayloads?.map((element) => {
  //         if (element.id && !element.constants && !element.equation_name) {
  //           // setUser.push(`${element.equation_formula}`);
  //           setUser.push(`specification_id:${element.id}`);
  //         } else if (element.constants === true) {
  //           // setUser.push(":" + element.value.split("").join(":") + ":");
  //           setUser.push(`constant_id:${element?.id}`);
  //         } else if (element.equation_name) {
  //           // setUser.push(":" + element.value.split("").join(":") + ":");
  //           setUser.push(`equation_id:${element?.id}`);
  //         } else {
  //           // setUser.push(":" + element.view + ":");
  //           setUser.push(" " + element.view + " ");
  //         }
  //       });

  //       var data = setUser.join("");
  //       var getFirstindexValue = data.charAt(0);
  //       var filterPayloads = data;
  //       if (getFirstindexValue == ":") {
  //         filterPayloads = filterPayloads.substring(1);
  //       }

  //       // var details = "";
  //       // if (filterGroup?.[0]?.message == "similar") {

  //       // selectedGroups?.forEach((element) => {
  //       //   details = details + element + ":";
  //       // });
  //       // }

  //       // else {
  //       // let allGroupsFormulla = groupEquationsSteps.filter(
  //       //   (element) => element.id == selectedGroupData
  //       // );
  //       // details =
  //       //   allGroupsFormulla?.[0].value.join().replaceAll(",", ":") + ":";
  //       // }

  //       let payloads = {
  //         product_id: productId,
  //         equations: filterPayloads,
  //         group_id: selectedGroupData
  //           ? selectedGroupData
  //           : equations?.[0]?.group_id,
  //       };
  //       const response = await apiClient(
  //         "product/calculator/equation_final/create",
  //         "POST",
  //         {
  //           body: payloads,
  //         }
  //       );
  //       await dispatch(
  //         handleGroupEquationsData({
  //           productId,
  //         })
  //       );
  //       setFinalLoader(false);
  //       toast.success("Equations created successfully");
  //       //2693:+:2694:+:2695:+:1
  //     }
  //     return;
  //   } else {
  //     //Non-Group Case
  //     var setUser = [];
  //     if (finalPayloads.length <= 0) {
  //       setEquationSelectionError(true);
  //       setFinalLoader(false);
  //       return;
  //     }
  //     finalPayloads?.map((element) => {
  //       if (element.id && !element.constants && !element.equation_name) {
  //         // setUser.push(`${element.equation_formula}`);
  //         setUser.push(`specification_id:${element.id}`);
  //       } else if (element.constants === true) {
  //         // setUser.push(":" + element.value.split("").join(":") + ":");
  //         setUser.push(`constant_id:${element?.id}`);
  //       } else if (element.equation_name) {
  //         // setUser.push(":" + element.value.split("").join(":") + ":");
  //         setUser.push(`equation_id:${element?.id}`);
  //       } else {
  //         // setUser.push(":" + element.view + ":");
  //         setUser.push(" " + element.view + " ");
  //       }
  //     });

  //     // if (
  //     //   productCalculatorHeader == "similar" &&
  //     //   productCalculatorInfo?.[0]?.message === undefined
  //     // ) {
  //     //   let newArray = [];
  //     //   productCalculatorInfo.map((ele) => {
  //     //     ele?.terms?.map((element) => {
  //     //       element?.price_matrix?.map((ele_term) => {
  //     //         newArray.push({
  //     //           id: ele_term?.price_matrix_id,
  //     //           value: ele_term?.value,
  //     //         });
  //     //       });
  //     //     });
  //     //     // ele?.terms.map((element) =>
  //     //     //   newArray.push({
  //     //     //     id: element?.id,
  //     //     //     value: element?.attributes_values,
  //     //     //   })
  //     //     // );
  //     //   });
  //     //   for (let i = 0; i < newArray?.length; i++) {
  //     //     if (newArray[i].value == "null" || newArray[i].value == "") {
  //     //       toast.error("Please fill all the fields!");
  //     //       setUpdateLoader(false);
  //     //       setFinalLoader(false);
  //     //       return;
  //     //     }
  //     //   }
  //     // }
  //     var data = setUser.join("");
  //     var getFirstindexValue = data.charAt(0);
  //     var filterPayloads = data;
  //     if (getFirstindexValue == ":") {
  //       filterPayloads = filterPayloads.substring(1);
  //     }

  //     // if (productCalculatorHeader == "multilevel") {
  //     //   filterPayloads = allSpecs[0].id + ":+:" + filterPayloads;
  //     // }

  //     let makeJsonData = [];
  //     finalCalculation?.map((ele) => {
  //       makeJsonData.push({
  //         view: ele.view,
  //         type: ele.type,
  //         id: ele?.id ? ele.id : 0,
  //       });
  //     });

  //     if (makeJsonData[makeJsonData.length - 1]?.type == "operand") {
  //       setFinalEquationError(true);
  //       setFinalLoader(false);
  //       return;
  //     }
  //     let payloads = {
  //       id: productId,
  //       type: productCalculatorHeader,
  //       formula: filterPayloads,
  //       final_equation: JSON.stringify(makeJsonData),
  //     };
  //     try {
  //       const response = await apiClient("product/calculator/storage", "POST", {
  //         body: payloads,
  //       });
  //       setFinalLoader(false);
  //       setFinalEquationError(false);
  //       setEquationSelectionError(false);
  //       if (response.status === 200) {
  //         toast.success(response.message);
  //         dispatch(setMatrixItems([]));
  //         dispatch(setMatrixItems(await reloadMatrixData()));
  //         handleClose();
  //         dispatch(listMatrix({ productId }));
  //       } else {
  //         setFinalLoader(false);
  //         toast.error(response.message);
  //       }
  //     } catch (err) {
  //       setFinalLoader(false);
  //       setFinalEquationError(false);
  //       toast.error(err);
  //     }
  //     setFinalLoader(false);
  //   }
  // };

  // const createEquation = async () => {
  //   const formData = new FormData();

  //   const requiredPayload = equationState
  //     ?.map((element) => {
  //       if (element?.type == "tagInput") {
  //         return {
  //           ...element,
  //           value: allSpecs
  //             .filter((elem) => elem?.tag == element?.value?.slice(-2))[0]
  //             ?.id?.toString(),
  //         };
  //       } else return element;
  //     })
  //     ?.map((element) => element?.value)
  //     ?.reduce((acc, currValue) => acc + ":" + currValue);

  //   formData.append("product_id", productId);
  //   formData.append("equation_formula", requiredPayload);
  //   const response = await apiClient(
  //     "product/calculator/equation/create",
  //     "post",
  //     { body: formData },
  //     true
  //   );

  //   if (response.status) {
  //     toast.success(response.message);
  //   }
  // };

  const parseEquationToOriginalForm = (
    equation,
    equationId,
    equationName,
    elementData
  ) => {
    const parsedEquation = JSON.parse(elementData?.equation_name);
    let formattedEquations = parsedEquation?.map((element) =>
      returnElementType(element, equationId, equationName, elementData)
    );
    return formattedEquations;
  };

  // const returnTagFromSpecId = (idValue) => {
  //   if (productCalculatorHeader != "Group") {
  //     let checkME = productCalculatorInfo?.[0]?.newTerm?.map((elem) => {
  //       if (elem.id == idValue) {
  //         return elem?.tag;
  //       }
  //     });
  //     return `#${
  //       allSpecs?.filter((element) => element?.id == idValue)[0]?.tag ?? checkME
  //     }`;
  //   } else {
  //     let groupId = selectedGroupData
  //       ? selectedGroupData
  //       : productCalculatorInfo?.[0]?.group_id;
  //     let filterGroup = productCalculatorInfo.filter((v) => v.group_id == groupId);
  //     if (
  //       productCalculatorHeader == "Group"
  //       // &&
  //       // filterGroup?.[0]?.message == "similar"
  //     ) {
  //       let filterTag = allSpecs.flat()?.filter((element) => {
  //         if (element?.id == idValue) {
  //           return element.id;
  //         }
  //       });
  //       return `#${filterTag?.[0]?.tag}`;
  //     }

  //     //TODO:need to check for equation tag value creation.
  //     // else {
  //     //   if (allSpecs.length > 0) {
  //     //     let newSpecs = allSpecs
  //     //       ?.map(
  //     //         (filterData) => {
  //     //           // filterData?.filter((elem) => {
  //     //           if (filterData?.id == idValue) {
  //     //             return filterData.id;
  //     //           }
  //     //         }
  //     //         // })
  //     //       )
  //     //       .flat();
  //     //     return `#${newSpecs?.[0]?.tag}`;
  //     //   }
  //     // }
  //   }
  // };

  const returnElementType = (
    elementValue,
    equationId,
    equationName,
    elementData
  ) => {
    if (elementValue?.type == "tagInput") {
      return {
        type: elementValue?.type,
        view: elementValue?.view,
        value: elementValue?.value,
        equationId: equationId,
        equationName: equationName,
        name: equationName,
        equationData: elementData?.equation_name,
      };
    } else if (elementValue?.type == "operand" || elementValue?.type == "pie") {
      return {
        type: elementValue?.type,
        view: elementValue?.view,
        value: elementValue?.value,
        equationData: elementData?.equation_name,
        equationName: equationName,
        name: equationName,
        equationId: equationId,
      };
    } else if (elementValue?.type == "numeric") {
      return {
        type: elementValue?.type,
        view: elementValue?.view,
        value: elementValue?.value,
        equationData: elementData?.equation_name,
        equationName: equationName,
        name: equationName,
        equationId: equationId,
      };
    }
  };

  const resetAllGroupsFinalEquation = () => {
    setGroupFinalState([]);
    setGroupsClone(finalGroupEquation);
  };
  // 2693:+:2694:*:2695:+:1:+:3:+:2696:+:4:+:4:5:6:*:5:6:*:2697:+:5:*:5:6:
  const handleEquationClickFinalGroup = async (data, type = null) => {
    if (type == "extra") {
      // let fineData = allSpecsClone
      //   .flat()
      //   .filter((ele) => ele.tag == data.value.replaceAll("#", ""));
      setGroupFinalState((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          toast.error("Please enter operator.");
          return prev;
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          prev[prev.length - 1]?.value == ")"
        ) {
          toast.error("Please enter operator.");
          return prev;
        }
        return [
          ...prev,
          {
            view: data.value,
            type: "tagInput",
            value: data.value,
            id: data?.id,
            attribute_id: data?.attribute_id ?? "",
            is_parameter: data?.is_parameter ?? "",
          },
        ];
      });
    } else if (type == "extra_passive") {
      setGroupFinalState((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          toast.error("Please enter operator.");
          return prev;
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          prev[prev.length - 1]?.value == ")"
        ) {
          toast.error("Please enter operator.");
          return prev;
        }

        return [
          ...prev,
          {
            view: `#${data?.tag}`,
            type: "tagInput",
            value: data.value,
            constants: true,
            id: data?.id,
          },
        ];
      });
    } else if (data?.group_id) {
      setGroupFinalState((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          toast.error("Please enter operator.");
          return prev;
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          prev[prev.length - 1]?.value == ")"
        ) {
          toast.error("Please enter operator.");
          return prev;
        }
        return [
          ...prev,
          {
            view: data?.group_name,
            type: "tagInput",
            value: data.equation_formula,
            id: data?.id,
            is_group: true,
          },
        ];
      });
    } else {
      setGroupFinalState((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          toast.error("Please enter operator.");
          return prev;
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          prev[prev.length - 1]?.value == ")"
        ) {
          toast.error("Please enter operator.");
          return prev;
        }
        return [
          ...prev,
          {
            view: data?.name,
            type: "tagInput",
            value: data.value,
            id: data?.id ?? 0,
            attribute_id: data?.attribute_id ?? "",
            is_parameter: data?.is_parameter ?? "",
          },
        ];
      });
    }
  };

  useEffect(() => {
    if (selectedGroupData) {
      setGroupEquationsSteps((pre) => {
        if (selectedGroups.length > 0) {
          let equation = [...pre];
          let index = equation.findIndex(
            (v) => v.group_id == selectedGroupData
          );
          if (index < 0) {
            return [...pre, { id: selectedGroupData, value: selectedGroups }];
          } else {
            equation[index].value = selectedGroups;
            return equation;
          }
        } else {
          return pre;
        }
      });
    }
  }, [selectedGroups]);

  // const handleEquationClickFinalPrice = (id, equationData) => {
  //   setFinalEquationError(false);
  //   setEquationSelectionError(false);
  //   let groupId = selectedGroupData
  //     ? selectedGroupData
  //     : productCalculatorInfo?.[0]?.id;
  //   let filterGroupData = productCalculatorInfo.filter((v) => v.id == groupId);
  //   if (
  //     productCalculatorHeader == "Group" &&
  //     (filterGroupData?.[0]?.message == "similar" ||
  //       filterGroupData?.[0]?.message == "multilevel")
  //   ) {
  //     let filterEquations = equations?.filter(
  //       (element) => selectedGroupData === element.group_id
  //     );

  //     filterGroupData?.[0]?.message == "similar"
  //       ? setSelectedGroups(
  //           equationData == "extra"
  //             ? [
  //                 ...selectedGroups,
  //                 allSpecsClone
  //                   .flat()
  //                   .filter(
  //                     (ele) => ele.tag == id.value.replaceAll("#", "")
  //                   )?.[0]?.id,
  //               ]
  //             : equationData == "extra_passive"
  //             ? [...selectedGroups, id?.value.split("").join(":") + ":"]
  //             : [
  //                 ...selectedGroups,
  //                 filterEquations?.[0]?.equations?.[id]?.equation_formula,
  //               ]
  //         )
  //       : setSelectedGroups(
  //           equationData == "extra"
  //             ? [
  //                 ...selectedGroups,
  //                 allSpecsClone
  //                   .flat()
  //                   .filter(
  //                     (ele) => ele.tag == id.value.replaceAll("#", "")
  //                   )?.[0]?.id,
  //               ]
  //             : equationData == "extra_passive"
  //             ? [...selectedGroups, ":" + id?.value.split("").join(":") + ":"]
  //             : [
  //                 ...selectedGroups,
  //                 filterEquations?.[0]?.equations?.[id]?.equation_formula,
  //               ]
  //         );
  //   }

  //   if (equationData == "extra") {
  //     let getEqData = [];
  //     if (productCalculatorHeader == "Group") {
  //       getEqData = allSpecsClone
  //         .flat()
  //         .filter((ele) => ele.tag == id.value.replaceAll("#", ""));
  //     } else {
  //       getEqData = allSpecs.filter(
  //         (ele) => ele.tag == id.value.replaceAll("#", "")
  //       );
  //     }
  //     setFinalPayloads([
  //       ...finalPayloads,
  //       { id: getEqData?.[0]?.id, equation_formula: getEqData?.[0]?.id },
  //     ]);
  //   } else if (equationData == "extra_passive") {
  //     setFinalPayloads([
  //       ...finalPayloads,
  //       { view: id?.tag, type: "tagInput", value: id?.value, constants: true },
  //     ]);
  //   } else {
  //     setFinalPayloads([
  //       ...finalPayloads,
  //       myCalculatorEquations?.[id] ?? equations[id],
  //     ]);
  //   }

  //   if (equationData == "extra") {
  //     setFinalCalculation((prev) => [
  //       ...prev,
  //       { view: `${id.value}`, type: "tagInput", value: equationData, id: id },
  //     ]);
  //   } else if (equationData == "extra_passive") {
  //     setFinalCalculation((prev) => [
  //       ...prev,
  //       {
  //         view: `#${id.tag}`,
  //         type: "tagInput",
  //         value: equationData,
  //         id: id?.id,
  //       },
  //     ]);
  //   } else {
  //     setFinalCalculation((prev) => [
  //       ...prev,
  //       {
  //         view: equationData?.[0].equationName
  //           ? equationData?.[0].equationName
  //           : `Equation #${id + 1}`,
  //         type: "tagInput",
  //         value: equationData,
  //         id: id,
  //       },
  //     ]);
  //   }

  //   setShowFirstCalculator(false);
  //   setShowSecondCalculator(true);
  //   setFinalCalculationClone((prev) => [
  //     ...prev,
  //     { view: `EQ#${id + 1}`, type: "tagInput", value: equationData, id: id },
  //   ]);

  //   setShowFinalPriceCalculator(true);
  // };

  // const handleEquationClickFinalPrice = (id, equationData) => {
  //   setFinalEquationError(false);
  //   setEquationSelectionError(false);

  //   // const groupId = selectedGroupData || productCalculatorInfo?.[0]?.id;
  //   // const filterGroupData = productCalculatorInfo.filter(
  //   //   (v) => v.id === groupId
  //   // )[0];
  //   // const isGroupMessageSimilar = filterGroupData?.message === "similar";
  //   // const isGroupMessageMultiLevel = filterGroupData?.message === "multilevel";
  //   if (
  //     productCalculatorHeader === "Group"
  //     // &&
  //     // (isGroupMessageSimilar || isGroupMessageMultiLevel)
  //   ) {
  //     const filterEquations = equations?.filter(
  //       (el) => selectedGroupData === el.group_id
  //     );

  //     const updatedGroups =
  //       equationData === "extra"
  //         ? [
  //             ...selectedGroups,
  //             allSpecsClone
  //               .flat()
  //               .find((ele) => ele.tag === id.value.replace("#", ""))?.id,
  //           ]
  //         : equationData === "extra_passive"
  //         ? [...selectedGroups, ":" + id?.value.split("").join(":") + ":"]
  //         : [
  //             ...selectedGroups,
  //             filterEquations?.[0]?.equations?.[id]?.equation_formula,
  //           ];

  //     setSelectedGroups(updatedGroups);
  //   }

  //   if (equationData == "extra") {
  //     let getEqData = [];
  //     if (productCalculatorHeader == "Group") {
  //       getEqData = allSpecsClone
  //         .flat()
  //         .filter((ele) => ele.tag == id.value.replaceAll("#", ""));
  //     } else {
  //       getEqData = allSpecs.filter(
  //         (ele) => ele.tag == id.value.replaceAll("#", "")
  //       );
  //     }
  //     setFinalPayloads([
  //       ...finalPayloads,
  //       { id: getEqData?.[0]?.id, equation_formula: getEqData?.[0]?.id },
  //     ]);
  //   } else if (equationData == "extra_passive") {
  //     setFinalPayloads([
  //       ...finalPayloads,
  //       {
  //         view: id?.tag,
  //         type: "tagInput",
  //         value: id?.value,
  //         constants: true,
  //         id: id?.id,
  //       },
  //     ]);
  //   } else {
  //     setFinalPayloads([
  //       ...finalPayloads,
  //       myCalculatorEquations?.[id] ?? equations[id],
  //     ]);
  //   }

  //   if (equationData == "extra") {
  //     setFinalCalculation((prev) => [
  //       ...prev,
  //       {
  //         view: `${id.value}`,
  //         type: "tagInput",
  //         value: equationData,
  //         id: id?.id,
  //       },
  //     ]);
  //   } else if (equationData == "extra_passive") {
  //     setFinalCalculation((prev) => [
  //       ...prev,
  //       {
  //         view: `#${id.tag}`,
  //         type: "tagInput",
  //         value: equationData,
  //         id: id?.id,
  //       },
  //     ]);
  //   } else {
  //     setFinalCalculation((prev) => [
  //       ...prev,
  //       {
  //         view: equationData?.[0].equationName
  //           ? equationData?.[0].equationName
  //           : `Equation #${id + 1}`,
  //         type: "tagInput",
  //         value: equationData,
  //         id: id,
  //       },
  //     ]);
  //   }

  //   setShowFirstCalculator(false);
  //   setShowSecondCalculator(true);
  //   setFinalCalculationClone((prev) => [
  //     ...prev,
  //     { view: `EQ#${id + 1}`, type: "tagInput", value: equationData, id: id },
  //   ]);

  //   setShowFinalPriceCalculator(true);
  // };
  // const resetAllFinalEquation = () => {
  //   setResetLoaderFinal(true);
  //   setResetLoader(false);
  //   setFinalCalculation([]);
  //   setFinalLoader(false);
  //   setFinalEquationState([]);
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

  const returnStartIndex = (serialNumber) => {
    let startIndex = 0;

    for (let i = 1; i < serialNumber; i++) {
      startIndex = startIndex + multiTableInfo[i - 1]?.totalChildrenRows;
    }

    return startIndex;
  };

  const handleFormatEquation = async (data) => {
    // return;
    if (productCalculatorHeader != "Group") {
      // let newData = data
      //   ?.map((element) => {
      //     if (element?.type == "tagInput" && !element?.constants) {
      //       return {
      //         ...element,
      //         value:
      //           allSpecs
      //             .filter((elem) => elem?.tag == element?.value?.slice(-2))[0]
      //             ?.id?.toString() ??
      //           productCalculatorInfo?.[0]?.newTerm?.map((elem) => {
      //             if (elem.tag === element.value.replace("#", "")) {
      //               return elem?.id?.toString();
      //             }
      //           }),
      //       };
      //     } else return element;
      //   })
      //   ?.map((element) => {
      //     if (element.constants) {
      //       return element.value.split("").join(":");
      //     } else {
      //       return element?.value;
      //     }
      //   })
      //   ?.reduce((acc, currValue) => acc + ":" + currValue);
      // return newData;

      //   let newData = data
      //   ?.map((element) => {
      //     if (element?.type === "tagInput" && !element?.constants) {
      //       // Remove the "#" from the value and use the full remaining string for matching
      //       const tagValue = element?.value?.replace("#", ""); // Handle dynamic length tags

      //       // Try to get the id from allSpecs based on the full tag
      //       const specValue = allSpecs
      //         .find((elem) => elem?.tag === tagValue)?.id?.toString();

      //       // Try to get the id from productCalculatorInfo based on the full tag
      //       const calculatorValue = productCalculatorInfo?.[0]?.newTerm?.find(
      //         (elem) => elem.tag === tagValue
      //       )?.id?.toString();

      //       // Return only the matched id, or undefined if no match is found
      //       return {
      //         ...element,
      //         value: specValue || calculatorValue || undefined,  // No fallback to original value
      //       };
      //     } else return element;
      //   })
      //   ?.filter((element) => element.value !== undefined) // Ensure no undefined values are passed
      //   ?.map((element) => {
      //     if (element.constants) {
      //       // If it's a constant, return the value with ":" inserted between characters
      //       return element.value.split("").join(":");
      //     } else {
      //       return element?.value; // Otherwise return the processed value (the ID)
      //     }
      //   })
      //   ?.reduce((acc, currValue) => acc + ":" + currValue); // Join all values with ":"

      // return newData;

      let newData = data
        ?.map((element) => {
          if (element?.type === "tagInput" && !element?.constants) {
            // Remove the "#" from the value and use the full remaining string for matching
            const tagValue = element?.value?.replace("#", "");

            // Try to get the id from allSpecs based on the full tag
            const specValue = allSpecs
              .find((elem) => elem?.tag === tagValue)
              ?.id?.toString();

            // Try to get the id from productCalculatorInfo based on the full tag
            const calculatorValue = productCalculatorInfo?.[0]?.newTerm
              ?.find((elem) => elem.tag === tagValue)
              ?.id?.toString();

            // Return only the matched id, or undefined if no match is found
            return {
              ...element,
              value: specValue || calculatorValue || undefined, // No fallback to original value
            };
          } else return element;
        })
        ?.filter((element) => element.value !== undefined) // Ensure no undefined values are passed
        ?.map((element) => {
          if (element.constants) {
            // Prefix "constant_id:" for constant elements
            return `constant_id:${element.id}`;
          } else if (element.type_check === "specification") {
            // Prefix "specification_id:" for specification elements
            return `specification_id:${element.id}`;
          } else if (element.type_check === "parameter") {
            // Prefix "specification_id:" for specification elements
            return `parameter_id:${element.attribute_id}`;
          } else if (element.type === "operand") {
            // Include operand as is for dynamic operands
            return element.value;
          } else if (element.type_check === "calculator_input") {
            // Prefix "cal:" for calculator input elements
            return `cal:${element.value}`;
          } else if (element.type === "numeric") {
            // Return numeric values directly for concatenation
            return element.value;
          } else {
            return element.value; // Otherwise return the processed value as is
          }
        })
        ?.reduce((acc, currValue, index, array) => {
          const prevElement = array[index - 1];

          // Check if both current and previous elements are numeric
          if (!isNaN(currValue) && !isNaN(prevElement)) {
            // Concatenate without space for consecutive numeric elements
            return acc + currValue;
          } else {
            // Add a space for non-consecutive numeric or other element types
            return acc ? acc + " " + currValue : currValue;
          }
        }, ""); // Initialize reduce with an empty string
      return newData; // Trim any leading/trailing whitespace
    } else {
      let groupId = selectedGroupData
        ? selectedGroupData
        : productCalculatorInfo?.[0]?.group_id;
      let filterGroupData = productCalculatorInfo.filter(
        (v) => v.group_id == groupId
      );
      if (
        productCalculatorHeader == "Group" &&
        // &&
        // filterGroupData[0]?.message == "similar"
        data?.length > 0
      ) {
        let newData = data
          ?.map((element) => {
            if (element?.type === "tagInput" && !element?.constants) {
              // Remove the "#" from the value and use the full remaining string for matching
              const tagValue = element?.value?.replace("#", "");

              // Try to get the id from allSpecs based on the full tag
              const specValue = allSpecs
                .find((elem) => elem?.tag === tagValue)
                ?.id?.toString();

              // Try to get the id from productCalculatorInfo based on the full tag
              const calculatorValue = productCalculatorInfo?.[0]?.newTerm
                ?.find((elem) => elem?.tag === tagValue)
                ?.id?.toString();

              // Return only the matched id, or undefined if no match is found
              return {
                ...element,
                value: specValue || calculatorValue || undefined, // No fallback to original value
              };
            } else return element;
          })
          ?.filter((element) => element?.value !== undefined) // Ensure no undefined values are passed
          ?.map((element) => {
            if (element?.constants) {
              // Prefix "constant_id:" for constant elements
              return `constant_id:${element?.id}`;
            } else if (element?.type_check === "specification") {
              // Prefix "specification_id:" for specification elements
              return `specification_id:${element?.id}`;
            } else if (element.type_check === "parameter") {
              // Prefix "specification_id:" for specification elements
              return `parameter_id:${element.attribute_id}`;
            } else if (element?.type === "operand") {
              // Include operand as is for dynamic operands
              return element?.value;
            } else if (element?.type_check === "calculator_input") {
              // Prefix "calculator_input:" for calculator input elements
              return `calculator_input:${element?.value}`;
            } else {
              return element?.value; // Otherwise return the processed value as is
            }
          })
          ?.reduce((acc, currValue) => acc + " " + currValue); // Join all values with a space

        return newData;
        // data
        //   ?.map((element) => {
        //     if (element?.type == "tagInput") {
        //       return {
        //         ...element,
        //         value: allSpecs
        //           .flat()
        //           ?.filter((elem) => elem?.tag == element?.value?.slice(-2))[0]
        //           ?.id?.toString(),
        //       };
        //     } else return element;
        //   })
        //   ?.map((element) => element?.value)
        //   ?.reduce((acc, currValue) => acc + ":" + currValue);
      } else {
        let newData = data
          ?.map((element) => {
            if (element?.type === "tagInput" && !element?.constants) {
              // Remove the "#" from the value and use the full remaining string for matching
              const tagValue = element?.value?.replace("#", "");

              // Try to get the id from allSpecs based on the full tag
              const specValue = allSpecs
                .find((elem) => elem?.tag === tagValue)
                ?.id?.toString();

              // Try to get the id from productCalculatorInfo based on the full tag
              const calculatorValue = productCalculatorInfo?.[0]?.newTerm
                ?.find((elem) => elem?.tag === tagValue)
                ?.id?.toString();

              // Return only the matched id, or undefined if no match is found
              return {
                ...element,
                value: specValue || calculatorValue || undefined, // No fallback to original value
              };
            } else return element;
          })
          ?.filter((element) => element?.value !== undefined) // Ensure no undefined values are passed
          ?.map((element) => {
            if (element?.constants) {
              // Prefix "constant_id:" for constant elements
              return `constant_id:${element?.id}`;
            } else if (element?.type_check === "specification") {
              // Prefix "specification_id:" for specification elements
              return `specification_id:${element?.id}`;
            } else if (element.type_check === "parameter") {
              // Prefix "specification_id:" for specification elements
              return `parameter_id:${element.attribute_id}`;
            } else if (element?.type === "operand") {
              // Include operand as is for dynamic operands
              return element?.value;
            } else if (element?.type_check === "calculator_input") {
              // Prefix "calculator_input:" for calculator input elements
              return `calculator_input:${element?.value}`;
            } else {
              return element?.value; // Otherwise return the processed value as is
            }
          })
          ?.reduce((acc, currValue) => acc + " " + currValue); // Join all values with a space

        return newData;
      }
    }
  };

  const setEditEquationData = (equation, type) => {
    setEditEquationError(false);
    setShowFirstCalculator(true);
    const parsedEq = JSON?.parse(editEquation[0]?.equationData);
    if (type == "extra_passive") {
      const newAppendingData = {
        id: equation?.id,
        // type_check: equation?.type_check,
        value: equation?.value,
        view: `#${equation?.tag}`,
        type: "tagInput",
        type_check: "constant",
        constants: true,
        equationId: editEquation[0]?.equationId,
        equationData: JSON.stringify(parsedEq),
      };
      // parsedEq.push({ ...equation, view: equation?.value });
      const updatedParsedData = [...parsedEq, newAppendingData];

      // return;

      setEditEquation((prev) => {
        if (
          prev?.length &&
          prev[prev.length - 1]?.type !== "operand" &&
          prev[prev.length - 1]?.type !== ""
        ) {
          toast.error("Please enter operator.");
          return prev;
        }

        if (
          prev[prev.length - 1]?.type == "operand" &&
          prev[prev.length - 1]?.value == ")"
        ) {
          toast.error("Please enter operator.");
          return prev;
        }

        const allEquationDataReplace = prev.map((el) => {
          return { ...el, equationData: JSON.stringify(updatedParsedData) };
        });

        return allEquationDataReplace;
      });
    } else {
      if (equation?.data) {
        parsedEq.push(
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
              attribute_id: eq?.attribute_id ?? "",
              is_parameter: eq?.is_parameter ?? "",
            };
          }),
          {
            view: ")",
            value: ")",
            type: "operand",
          }
        );

        const newFormat = parsedEq.map((eq) => {
          return {
            id: eq?.id,
            type_check: eq?.type_check,
            value: eq?.value,
            view: eq?.view,
            type: "tagInput",
            constants: eq?.constants,
            equationId: editEquation[0]?.equationId,
            equationData: JSON.stringify(parsedEq),
            attribute_id: eq?.attribute_id ?? "",
            is_parameter: eq?.is_parameter ?? "",
          };
        });

        setEditEquation((prev) => {
          if (
            prev?.length &&
            prev[prev.length - 1]?.type !== "operand" &&
            prev[prev.length - 1]?.type !== ""
          ) {
            toast.error("Please enter operator.");
            return prev;
          }
          if (
            prev[prev.length - 1]?.type == "operand" &&
            prev[prev.length - 1]?.value == ")"
          ) {
            toast.error("Please enter operator.");
            return prev;
          }
          return newFormat;
        });

        // setEditEquation((prev) => {
        //   // if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
        //   //   toast.error("Please enter operator.");
        //   //   return prev;
        //   // }
        //   const allEquationDataReplace = prev.map((el) => {
        //     return { ...el, equationData: JSON.stringify(parsedEq) };
        //   });
        //   if (equation?.data) {
        //     return [
        //       ...allEquationDataReplace,
        //       { ...newAppendingData },
        //     ];
        //   }

        //   return [...allEquationDataReplace, { ...newAppendingData }];
        // });
      } else {
        parsedEq.push({ ...equation, view: equation?.value });

        const newAppendingData = {
          id: equation?.id,
          type_check: equation?.type_check,
          value: equation?.value,
          view: equation?.value,
          type: "tagInput",
          equationId: editEquation[0]?.equationId,
          equationData: JSON.stringify(parsedEq),
          attribute_id: equation?.attribute_id ?? "",
          is_parameter: equation?.is_parameter ?? "",
        };

        setEditEquation((prev) => {
          if (
            prev?.length &&
            prev[prev.length - 1]?.type !== "operand" &&
            prev[prev.length - 1]?.type !== ""
          ) {
            toast.error("Please enter operator.");
            return prev;
          }
          if (
            prev[prev.length - 1]?.type == "operand" &&
            prev[prev.length - 1]?.value == ")"
          ) {
            toast.error("Please enter operator.");
            return prev;
          }
          const allEquationDataReplace = prev.map((el) => {
            return { ...el, equationData: JSON.stringify(parsedEq) };
          });
          if (equation?.data) {
            return [...allEquationDataReplace, { ...newAppendingData }];
          }

          return [...allEquationDataReplace, { ...newAppendingData }];
        });
      }
    }
  };

  const setEquationStateData = async (equation, type) => {
    setShowFirstCalculator(true);
    if (type == "extra_passive") {
      setEquationState((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          toast.error("Please enter operator.");
          return prev;
        }

        if (
          prev[prev.length - 1]?.type == "operand" &&
          prev[prev.length - 1]?.value == ")"
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
      setEquationState((prev) => {
        if (prev?.length && prev[prev.length - 1]?.type !== "operand") {
          toast.error("Please enter operator.");
          return prev;
        }
        if (
          prev[prev.length - 1]?.type == "operand" &&
          prev[prev.length - 1]?.value == ")"
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
                  attribute_id: eq?.attribute_id ?? "",
                  is_parameter: eq?.is_parameter ?? "",
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
              attribute_id: equation?.attribute_id ?? "",
              is_parameter: equation?.is_parameter ?? "",
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
                  attribute_id: eq?.attribute_id ?? "",
                  is_parameter: eq?.is_parameter ?? "",
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
              attribute_id: equation?.attribute_id ?? "",
              is_parameter: equation?.is_parameter ?? "",
            },
          ];
        }
      });
    }
  };

  const handleSaveAllEquations = async () => {
    setEquationError(false);
    setAddEqLoader(true);

    if (equationState?.length < 1) {
      setMinEquationError(true);
      setAddEqLoader(false);
      return;
    }

    const shouldNotContain = ["+", "-", "*", "/"];

    if (
      equationState[equationState?.length - 1]?.type === "operand" &&
      shouldNotContain.includes(equationState[equationState?.length - 1]?.value)
    ) {
      setEquationError(true);
      setAddEqLoader(false);
      return;
    }


    const previousEquation = allEquationsState?.map((v) =>
      v?.map((i) => ({ ...i, status: "old" }))
    );
    const concatEquations = [...previousEquation, equationState];

    for (const eq of concatEquations) {
      if (eq?.filter((v) => v?.equationId)?.length === 0) {
        const formattedEquation = await handleFormatEquation(eq);
        if(!isValidParentheses(formattedEquation)){
          setAddEqLoader(false);
          toast.error("Please enter valid equation.");
          return;
        }
        await saveEquation(
          // formattedEquation?.replaceAll(",", ""),
          formattedEquation,
          eq[0]?.equationName,
          JSON.stringify(eq)
        );
      }
    }
    setEquationState([]);
    setAllEquationsStateClone([]);

    setAllEquationsStateClone(
      concatEquations?.map((element, index) => ({
        id: element?.id,
        idx: index + 1,
        data: element,
        name: element?.name,
      }))
    );

    const formData = new FormData();
    formData.append("product_id", productId);

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

      if (response?.status) {
        setFinalEquationError(false);
        dispatch(setProductCalculatorInfo(response?.data));
        dispatch(setEquations(response?.equations));
        dispatch(setFinalEquationShow(response?.final_equation));
        if (productCalculatorHeader == "Group") {
          // dispatch(setSelectedGroupData(selectedGroupData ? selectedGroupData : response?.data?.[0]?.group_id));
          dispatch(
            setFinalGroupEquation(
              response?.group_equation?.length > 0
                ? response?.group_equation
                : []
            )
          );
        }
        setMyCalculatorEquations(response?.equations);
      }
    } catch (error) {
      console.error(error);
    }

    setAddEqLoader(false);
    setFinalEquationError(false);
    setEquationError(false);
    // dispatch(setFinalEquationShow([]));
    setShowSecondCalculator(true);
  };

  const saveEquation = async (
    payloads,
    equationName = "",
    equationTagsData,
    groupFinalEquation = false,
    equationId = ""
  ) => {
    const formData = new FormData();
    if(!isValidParentheses(payloads) ) {
      toast.error("Please enter valid equation.");
      return;
    }
    formData.append("product_id", productId);
    formData.append("equation_formula", calculateTrigonometricValues(payloads));
    formData.append("name", equationName);
    formData.append("equation_name", equationTagsData ? equationTagsData : []);

    if (
      productCalculatorHeader === "Group"
      // &&
      // ["multilevel", "similar"].includes(productCalculatorInfo?.[0]?.message)
    ) {
      formData.append(
        "group_id",
        selectedGroupData || productCalculatorInfo?.[0]?.group_id
      );
      formData.append(
        "new_group_id",
        newGrpId || productCalculatorInfo?.[0]?.group_id
      );
    }

    if (equationId) {
      formData.append("id", equationId);
    }

    if (productCalculatorHeader === "Group" && groupFinalEquation) {
      formData.append("group_final_equation", String(groupFinalEquation));
    }
    if (equationId) {
      await apiClient(
        "product/calculator/equation/update",
        "post",
        { body: formData },
        true
      );
      toast.success("Equation Updated successfully");
    } else {
      await apiClient(
        "product/calculator/equation/create",
        "post",
        { body: formData },
        true
      );
      toast.success("Equation Created successfully");
    }
  };

  const handleNewEquationAddition = async () => {
    if (equationState?.length < 1) {
      setAddEqLoader(false);
      setMinEquationError(true);
      return;
    }
    await handleSaveAllEquations();

    // if (equationState?.length >= 1) {
    //   toast?.error("Please save the equation first.");
    //   return;
    // }

    // setAddEqLoader(true);

    // setShowFirstCalculator(true);
    // setShowSecondCalculator(false);

    // setAllEquationsState((prev) => {
    //   return prev.length ? [...prev, equationState] : [equationState];
    // });

    // setEquationState([]);
    // setAddEqLoader(false);
  };

  const deleteAllEquations = async (type) => {
    const formData = new FormData();
    formData.append("product_id", productId);
    let groupId = selectedGroupData
      ? selectedGroupData
      : productCalculatorInfo?.[0]?.group_id;
    let filterGroup = productCalculatorInfo.filter(
      (v) => v.group_id == groupId
    );
    if (
      (productCalculatorHeader == "Group" &&
        filterGroup?.[0]?.message == "multilevel") ||
      filterGroup?.[0]?.message == "similar"
    ) {
      formData.append(
        "group_id",
        selectedGroupData ? selectedGroupData : filterGroup?.[0]?.group_id
      );
    }
    const response = await apiClient(
      "product/calculator/equation/delete",
      "post",
      { body: formData },
      true
    );

    if (response.status) {
      if (type === 1) toast.success(response.message);
    }
  };

  const resetAllEquations = async () => {
    dispatch(setFinalEquationShow([]));
    setResetLoader(true);
    setResetLoaderFinal(false);
    await deleteAllEquations(1);
    setAddEqLoader(false);
    setFinalLoader(false);
    setEquationError(false);
    setFinalEquationError(false);
    setAllEquationsState([]);
    setGroupEquation([]);
    setShowFirstCalculator(true);
    setShowSecondCalculator(false);
    setAllEquationsStateClone([]);
    setEquationState([]);
    setMyCalculatorEquations([]);
    dispatch(setEquations([]));
    setResetLoader(false);
  };

  const handleClose = () => {
    setOpen(false);
    setShowModal(false);
  };

  useEffect(() => {
    setOpen(showModal);
  }, [showModal]);

  useEffect(() => {
    if (!productCalculatorInfo || productCalculatorInfo.length === 0) {
      return;
    }
    setGroupsClone(finalGroupEquation);
    // if (productCalculatorInfo?.length > 0) {
    //   if (productCalculatorHeader != "Group") {
    //     let newAllTerms = productCalculatorInfo
    //       ?.map((element) => element?.terms)
    //       ?.reduce((accumulator, currentValue) => {
    //         if (accumulator) {
    //           return [...accumulator, ...currentValue]?.map((ele, index) => ({
    //             ...ele,
    //             serialNo: index + 1,
    //           }));
    //         } else {
    //           return currentValue?.map((ele, index) => ({
    //             ...ele,
    //             serialNo: index + 1,
    //           }));
    //         }
    //       }, []);

    //     dispatch(setAllTerms(newAllTerms));
    //   }
    // }

    if (productCalculatorInfo?.length > 0) {
      if (productCalculatorHeader !== "Group") {
        let newAllTerms = productCalculatorInfo
          ?.map((element) => element?.terms || []) // Ensure terms is always an array
          ?.reduce((accumulator, currentValue) => {
            const validCurrentValue = Array.isArray(currentValue)
              ? currentValue
              : []; // Validate currentValue
            if (accumulator) {
              return [...accumulator, ...validCurrentValue]?.map(
                (ele, index) => ({
                  ...ele,
                  serialNo: index + 1,
                })
              );
            } else {
              return validCurrentValue?.map((ele, index) => ({
                ...ele,
                serialNo: index + 1,
              }));
            }
          }, []);

        dispatch(setAllTerms(newAllTerms));
      }
    }

    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [productCalculatorInfo, productCalculatorHeader]);

  useEffect(() => {
    if (!productCalculatorInfo || productCalculatorInfo.length === 0) {
      return;
    }
    let newSpecs;
    if (productCalculatorHeader !== "Group") {
      newSpecs = productCalculatorInfo.flatMap((element) => {
        let allArray = [
          {
            id: element?.id,
            name: element?.name,
            tag: element?.tag,
          },
        ];

        const extractedObjects = [];

        element?.terms?.forEach((term) => {
          term?.price_matrix?.forEach((item) => {
            if (item.is_parameter) {
              // Check if parent_id is already added
              const isParentAlreadyAdded = extractedObjects?.some(
                (obj) => obj?.parent_id === item?.parent_id
              );
              if (!isParentAlreadyAdded) {
                extractedObjects?.push(item);
              }
            }
          });
        });

        if (extractedObjects?.length) {
          allArray = allArray?.concat(
            extractedObjects.map((newEle) => ({
              id: newEle?.price_matrix_id,
              name: newEle?.name,
              is_parameter: newEle?.is_parameter ?? "",
              attribute_id: newEle?.attribute_id ?? "",
              tag: newEle?.tag,
            }))
          );
        }
        return allArray;
      });
    } else {
      if (selectedGroupData === "" && selectedTab == "Group") {
        dispatch(setAllSpecs(allSpecs));
        return;
      }
      // dispatch(
      //   setSelectedGroupData(
      //     selectedGroupData ? selectedGroupData : productCalculatorInfo?.[0]?.id
      //   )
      // );
      setShowFirstCalculator(true);
      setShowSecondCalculator(false);
      let groupId = selectedGroupData
        ? selectedGroupData
        : productCalculatorInfo?.[0]?.group_id;
      let filterGroup = productCalculatorInfo.filter(
        (v) => v.group_id == groupId
      );

      // if (
      //   filterGroup?.[0]?.message === "similar" ||
      //   filterGroup?.[0]?.message === "multilevel"
      // ) {

      // let filterData = productCalculatorInfo.filter(
      //   (element) => element.id == selectedGroupData
      // );
      // newSpecs = filterData.flatMap((element) =>
      //   element?.newTerms.flatMap((newEle) => {
      //     let allnewArray = [];
      //     if (newEle.level == null) {
      //       allnewArray = allnewArray.concat(
      //         newEle?.newTerm.map((extraTerms) => ({
      //           id: extraTerms?.id,
      //           name: extraTerms?.name,
      //           tag: extraTerms?.tag,
      //         }))
      //       );
      //     }
      //     allnewArray.push({
      //       id: newEle?.id,
      //       name: newEle?.name,
      //       tag: newEle?.tag,
      //     });
      //     return allnewArray;
      //   })
      // );

      newSpecs = filterGroup[0]?.levels.flatMap((element) => {
        let allArray = [
          {
            id: element?.id,
            name: element?.name,
            tag: element?.tag,
          },
        ];
        const extractedObjects = [];

        element?.terms?.forEach((term) => {
          term?.price_matrix?.forEach((item) => {
            if (item.is_parameter) {
              // Check if parent_id is already added
              const isParentAlreadyAdded = extractedObjects?.some(
                (obj) => obj?.parent_id === item?.parent_id
              );
              if (!isParentAlreadyAdded) {
                extractedObjects.push(item);
              }
            }
          });
        });

        if (extractedObjects?.length) {
          allArray = allArray.concat(
            extractedObjects.map((newEle) => ({
              id: newEle?.price_matrix_id,
              name: newEle?.name,
              is_parameter: newEle?.is_parameter ?? "",
              attribute_id: newEle?.attribute_id ?? "",
              tag: newEle?.tag,
            }))
          );
        }
        return allArray;
      });
      setAllSpecsClone(newSpecs);

      // }
      // else {
      //   let filterData = productCalculatorInfo.filter(
      //     (element) => element.id == selectedGroupData
      //   );

      //   // newSpecs = filterData.map((element) =>
      //   // {
      //   //   return(
      //   //   element?.levels.map((newEle) => {
      //   //     let newArray = [];
      //   //     if (newEle.level == null) {
      //   //       newArray = newArray.concat(
      //   //         newEle?.terms.map((extraTerms) => ({
      //   //           id: extraTerms?.id,
      //   //           name: extraTerms?.name,
      //   //           // tag: extraTerms?.tag,
      //   //         }))
      //   //       );
      //   //     }
      //   //     newArray.push({
      //   //       id: newEle?.id,
      //   //       name: newEle?.name,
      //   //       tag: newEle?.tag,
      //   //     });
      //   //     return newArray;
      //   //   })
      //   //   )}
      //   // );

      //   newSpecs = filterData.flatMap((element) =>
      //     element?.levels.map((newEle) => ({
      //       id: newEle?.id,
      //       name: newEle?.name,
      //       tag: newEle?.tag,
      //     }))
      //   );
      // }
    }
    dispatch(setAllSpecs(newSpecs));

    if (
      productCalculatorHeader == "Group"

      // &&
      // (productCalculatorInfo?.[0]?.message == "similar" ||
      //   productCalculatorInfo?.[0]?.message == "multilevel")
    ) {
      setSelectedGroups([]);
      setFinalCalculation([]);
      setEquationState([]);
    }
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [productCalculatorInfo, selectedGroupData, productCalculatorHeader]);

  useEffect(() => {
    if (productCalculatorInfo?.length == 0) return;

    dispatch(
      setRowFields(
        productCalculatorInfo
          ?.map((ele) => ({
            [ele?.id]: ele?.terms
              ?.map((ele) => ele?.name)
              ?.reduce((acc, curValue) => acc + " " + curValue, ""),
          }))
          ?.reduce((accumulator, currentValue) => ({
            ...accumulator,
            ...currentValue,
          }))
      )
    );
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [productCalculatorInfo]);

  // const FormatData = (data) => {
  //   let loop = [];
  //   data.forEach((v, i) => {
  //     v.terms.forEach((item) => {
  //       loop.push(
  //         v.child.map((termItem) => {
  //           let name =
  //             typeof termItem === "string"
  //               ? `row-${v.tag}-${item.serialNo}-${item.value}-${termItem}`
  //               : `row-${v.tag}-${termItem.id}-${termItem.name}`;
  //           return { row_name: name, attribute_id: v.attribute_id };
  //         })
  //       );
  //     });
  //   });
  //   return loop.flat();
  // };

  const FormatData = (data) => {
    let loop = [];
    data.forEach((v) => {
      v.terms.forEach((item) => {
        if (v.child && v.child.length > 0) {
          // If `child` exists, map over it
          loop.push(
            v.child.map((termItem) => {
              let name =
                typeof termItem === "string"
                  ? `row-${v.tag}-${item.serialNo}-${item.value}-${termItem}`
                  : `row-${v.tag}-${termItem.id}-${termItem.name}`;
              return { row_name: name, attribute_id: v.attribute_id };
            })
          );
        } else {
          // If `child` does not exist, use a default name structure
          let name = `row-${v.tag}-${item.serialNo}-${item.value}`;
          loop.push({ row_name: name, attribute_id: v.attribute_id });
        }
      });
    });
    return loop.flat();
  };

  useEffect(() => {
    if (productCalculatorInfo?.length == 0) return;
    if (productCalculatorHeader != "Group") {
      let data = [];
      let data1 = [];
      let data2 = [];
      productCalculatorInfo.forEach((element) => {
        if (element.level) {
          data.push({
            attribute_id: element.id,
            tag: element?.tag,
            brand: element.name,
            terms: element?.terms?.map((ele) => ({
              value: ele?.name,
              serialNo: ele?.id,
            })),
            child: rowFields[element?.level]?.split(" ") ?? [],
          });
        }
        if (element.level == null || element.level == "") {
          data2.push({
            attribute_id: element.id,
            tag: element?.tag,
            brand: element.name,
            terms: element?.terms?.map((ele) => ({
              value: ele?.name,
              serialNo: ele?.id,
            })),
            child: rowFields[element?.level]?.split(" ") ?? [],
          });
        }
      });

      let firstData = data2?.[0]?.terms?.map(
        (ele) => `row-${data2?.[0]?.tag}-${ele?.serialNo}-${ele?.value}`
      );
      let notLevel = [];
      firstData?.map((element) => {
        notLevel.push({
          row_name: element,
          attribute_id: data2?.[0]?.attribute_id,
        });
      });
      productCalculatorInfo.forEach((element, index) => {
        if (element?.newTerm) {
          element.newTerm.forEach((item, i) => {
            const terms = [
              {
                serialNo: element?.terms?.[i]?.id,
                value: element?.terms?.[i]?.name,
              },
            ];
            data1.push({
              attribute_id: element.id,
              brand: element.name,
              tag: item?.tag,
              terms,
              child: item.terms_list,
            });
          });
          return;
        }
      });
      if (FormatData(data).length > 0) {
        let total = [
          ...FormatData(data1),
          ...FormatData(data),
          ...FormatData(data2),
        ];
        dispatch(
          setPayloadValuesForTableInitially([
            ...FormatData(data1),
            ...FormatData(data),
            ...FormatData(data2),
          ])
        );
      }
    } else {
      var mainArray = [];
      productCalculatorInfo?.map((element) => {
        element?.levels?.map((ele) => {
          ele?.terms?.map((newEle, index) => {
            if (ele.level != "" && ele.level != null) {
              let filterData = productCalculatorInfo.map((v) =>
                v.levels.filter((val) => {
                  if (val.id == ele.level) {
                    return val;
                  }
                })
              );
              filterData.flat()[0]?.terms?.map((filter) => {
                mainArray.push({
                  row_name: `row-${ele?.tag}-${newEle?.id}-${newEle?.name}-${filter?.name}`,
                  attribute_id: ele?.id,
                });
              });
            } else {
              if (ele?.terms) {
                ele?.terms?.map((new_term) => {
                  mainArray.push({
                    row_name: `row-${new_term?.tag}-${newEle?.id}-${newEle?.name}`,
                    attribute_id: ele?.id,
                  });
                });
              }
              mainArray.push({
                row_name: `row-${ele?.tag}-${newEle?.id}-${newEle?.name}`,
                attribute_id: ele?.id,
              });
            }
          });
        });
      });
      dispatch(setPayloadValuesForTableInitially(mainArray));
    }
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [allTerms, productCalculatorInfo]);

  useEffect(() => {
    if (productId) {
      dispatch(
        getProductCalculator({
          productId,
        })
      );
    }

    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!productId) return;
    if (productCalculatorHeader != "Group") {
      if (allTerms?.length == 0) return;

      if (Array.isArray(payloadValuesForMultiTableInitially)) {
        if (
          payloadValuesForTableInitially?.filter((ele) => ele?.attribute_id)
            ?.length == 0
        ) {
          return;
        }

        if (
          payloadValuesForMultiTableInitially.filter((ele) =>
            ele?.key.includes("NaN")
          ).length > 0
        ) {
          return;
        }
      }

      // dispatch(
      //   productMultipleSave({
      //     productId,
      //   })
      // );
    } else {
      let groupId = selectedGroupData
        ? selectedGroupData
        : productCalculatorInfo?.[0]?.group_id;
      let filterGroupData = productCalculatorInfo.filter(
        (v) => v.group_id == groupId
      );
      // filterGroupData[0]?.message != "similar"
      //   ? dispatch(
      //     productMultipleSave({
      //       productId,
      //     })
      //   )
      //   : null;
    }

    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [
    payloadValuesForTableInitially,
    productCalculatorHeader,
    payloadValuesForMultiTableInitially,
  ]);

  useEffect(() => {
    let updatedMultiTableInfo = multiTableInfo.map((element) => ({
      ...element,
      totalChildrenRows:
        rowFields[element?.level.split(",")?.[1]]?.split(" ")?.length *
        element?.total_parent,
    }));

    dispatch(setMultiTableInfo(updatedMultiTableInfo));
  }, [rowFields]);

  useEffect(() => {
    const singleTotalValues = productCalculatorInfo
      ?.filter(
        (element) =>
          element?.level == null || element?.level?.split(",")?.length == 1
      )
      ?.reduce((ele, currValue) => ele + currValue?.total_parent, 0);

    if (multiTableInfo?.length == 0) return;
    dispatch(
      setPayloadValuesForMultiTableInitially(
        multiTableInfo
          ?.map((element) =>
            element?.terms
              ?.map((term, termIndex) =>
                rowFields[element?.level?.split(",")?.[1]]
                  ?.split(" ")
                  ?.map((rowHeader, rowIndex) =>
                    rowFields[element?.level?.split(",")[0]]
                      ?.split(" ")
                      ?.map((columnHeader) => ({
                        key: `row-${element?.tag}-${
                          singleTotalValues +
                          returnStartIndex(element?.serialNo) +
                          rowIndex +
                          rowFields[element?.level?.split(",")?.[1]]?.split(" ")
                            ?.length *
                            termIndex +
                          1
                        }-${rowHeader}-${columnHeader}`,
                        attribute_id: element?.id,
                      }))
                  )
              )
              ?.flat()
              ?.flat()
          )
          ?.reduce((acc, curr) => [...acc, ...curr])
      )
    );
  }, [payloadValuesForTableInitially, productCalculatorInfo]);

  useEffect(() => {
    // if (productCalculatorHeader == "multilevel") {
    //   let cloneAllSpecs = [...allSpecs];

    //   let newTerms = cloneAllSpecs?.map((element) => ({
    //     id: element?.id,
    //     type_check: "specification",
    //     view: `${element?.name} #${element?.tag}`,
    //     value: `#${element?.tag}`,
    //     type: "tag",
    //   }));
    //   setSpecsForEquations(newTerms);
    //   setSpecsForEquationsClone(newTerms);
    // } else {
    if (productCalculatorHeader != "Group") {
      let newTerms = allSpecs?.map((element) => ({
        view: `${element?.name} #${element?.tag}`,
        value: `#${element?.tag}`,
        type: "tagInput",
        id: element?.id,
        attribute_id: element?.attribute_id ?? "",
        is_parameter: element?.is_parameter ?? "",
        type_check: element?.is_parameter ? "parameter" : "specification",
      }));
      setSpecsForEquations(newTerms);
      setSpecsForEquationsClone(newTerms);
    } else {
      let newTerms = allSpecs?.map(
        (element) =>
          // element?.map((newEle) => (
          {
            return {
              view: `${element?.name} #${element?.tag}`,
              value: `#${element?.tag}`,
              type: "tagInput",
              id: element?.id,
              attribute_id: element?.attribute_id ?? "",
              is_parameter: element?.is_parameter ?? "",
              type_check: element?.is_parameter ? "parameter" : "specification",
            };
          }
        // ))
      );

      // let newTermsConse = allSpecsClone?.map(
      //   (element) =>
      //     // element?.map((newEle) =>
      //     ({
      //       view: `${element?.name} #${element?.tag}`,
      //       value: `#${element?.tag}`,
      //       type: "tag",
      //     })
      //   // ))
      // );
      // setAllGroupSpecList(newTermsConse.flat());
      setAllGroupSpecList(newTerms?.flat());
      let constantsArray = [];

      if (newTerms) {
        newTerms.push(constantsArray?.flat());
      }
      setSpecsForEquationsClone(newTerms?.flat());
    }
    // }
  }, [allSpecs, allSpecsClone, productCalculatorHeader, selectedTab]);

  useEffect(() => {
    setSpecsForEquations(specsForEquationsClone);
  }, [specsForEquationsClone]);

  useEffect(() => {
    if (equationState?.length >= 1) {
      if (equationState[equationState?.length - 1]?.type == "tagInput") {
        setShowEquationCalculator(true);
      }
    }
  }, [equationState]);

  useEffect(() => {
    if (equationState?.length < 0) {
      return;
    }
    const currentEquationSelectedSpecs = equationState
      ?.filter((element) => element?.type == "tagInput")
      ?.map((element) => element?.value)
      ?.toString();

    if (Array.isArray(allEquationsState) && allEquationsState.length > 0) {
      var previousEquationsSelectedSpecs: any = allEquationsState
        .reduce((accumulator, currentValue) => {
          if (Array.isArray(currentValue)) {
            return [
              ...accumulator,
              ...currentValue
                .filter((element) => element?.type === "tagInput")
                .map((element) => element?.value),
            ];
          }
          return accumulator;
        }, [])
        .toString();
    } else {
      var previousEquationsSelectedSpecs: any = "";
    }

    const selectedSpecsString =
      currentEquationSelectedSpecs + " " + previousEquationsSelectedSpecs;
  }, [equationState, allEquationsState]);

  useEffect(() => {
    if (equations?.length > 0) {
      const groupId = selectedGroupData || productCalculatorInfo?.[0]?.group_id;
      const filterGroupData = productCalculatorInfo.find(
        (v) => v.group_id == groupId
      );

      const processEquations = (equations) => {
        const values = equations?.map((element) => {
          return parseEquationToOriginalForm(
            element?.equation_formula,
            element?.id,
            element?.name,
            element
          );
        });
        setAllEquationsState(values);
        setAllEquationsStateClone(
          equations?.map((element, index) => {
            const parsedData = JSON.parse(element?.equation_name);
            return {
              id: element?.id,
              idx: index + 1,
              data: parsedData,
              name: element?.name,
            };
          })
        );
      };

      //TODO: check here equation filteration for group cases
      if (selectedGroupData && filterGroupData) {
        //TODO: need to check this condition when working on multilevel group.
        // if (
        //   filterGroupData.message === "similar" ||
        //   filterGroupData.message === "multilevel"
        // ) {
        //TODO: need to check the this filteration in case of the multiple group.
        const filterEq = equations?.filter(
          (element) => element.group_id == selectedGroupData
        );
        //TODO: need to check this as well;
        // const targetEquations =
        // filterGroupData.message === "multilevel"
        //   ? filterEq
        //   : equations.filter((v) => v.group_id == groupId);
        processEquations(filterEq);
        handleGroupEquationsData();
        // }
      } else {
        processEquations(equations);
      }
    } else {
      setAllEquationsState(equations);
      setAllEquationsStateClone([]);
    }
  }, [equations, allTerms, allSpecs, productCalculatorInfo, selectedGroupData]);

  useEffect(() => {
    if (equations?.length > 0)
      setIdsOfEquations(equations.map((element) => element?.id));
  }, [equations]);

  const setFinalOperandsData = async (operand: any) => {
    // if (
    //   productCalculatorHeader == "Group"

    //   // &&
    //   // (productCalculatorInfo?.[0]?.message == "similar" ||
    //   //   productCalculatorInfo?.[0]?.message == "multilevel")
    // ) {
    //   setSelectedGroups((prev) => [...prev, operand.view]);
    // }
    // if (
    //   productCalculatorHeader == "Group" &&
    //   // productCalculatorInfo?.[0]?.message == "similar" &&
    //   finalGroup
    // ) {
    //   setGroupFinalState((prev) => [
    //     ...prev,
    //     { group_id: equations?.[0]?.group_id, value: operand.view },
    //   ]);
    // }

    let hasError = false;
    const allowedOperands = ["trignometric", "operand", "numeric"];
    setFinalCalculation((prev) => {
      if (
        (prev.length > 0 &&
          prev[prev.length - 1]?.type == "pie" &&
          operand?.type != "operand") ||
        (prev.length > 0 &&
          operand?.type == "pie" &&
          prev[prev.length - 1]?.type != "operand")
      ) {
        hasError = true;
        return prev;
      }
      if (
        prev[prev.length - 1]?.type == "operand" &&
        prev[prev.length - 1]?.value == ")" &&
        operand?.type != "operand"
      ) {
        hasError = true;
        return prev;
      }
      return prev;
    });

    setFinalCalculation((prev) => {
      if (
        prev[prev.length - 1]?.type == "operand" &&
        prev[prev.length - 1]?.value == ")" &&
        operand?.value == "("
      ) {
        hasError = true;
        return prev;
      }
      if (prev.length > 0 && prev[prev.length - 1]?.type !== "operand" && operand?.value == "(") {
        hasError = true;
        return prev;
      }
      return prev;
    });

    setFinalCalculation((rev) => {
      if (
        rev?.length &&
        rev[rev.length - 1]?.type == "tagInput" &&
        operand?.type == "numeric"
      ) {
        hasError = true;
        return rev;
      } else if (
        rev?.length &&
        rev[rev.length - 1]?.type == "tagInput" &&
        operand?.value == "."
      ) {
        hasError = true;
        return rev;
      }
      return rev;
    });

    setFinalCalculation((rev) => {
      if (
        rev?.length &&
        rev[rev.length - 1]?.type == "tagInput" &&
        operand?.type == "trig"
      ) {
        hasError = true;
        return rev;
      }
      return rev;
    });

    setFinalCalculation((rev) => {
      if (
        rev?.length &&
        rev[rev.length - 1]?.type !== "operand" &&
        !allowedOperands.includes(operand?.type)
      ) {
        hasError = true;
        return rev;
      }
      return rev;
    });

    // setFinalCalculation((rev) => {
    //   if (rev?.length && rev[rev.length - 1]?.type !== "operand" && operand?.type == "numeric") {
    //     hasError=true;
    //     return rev;
    //   }
    //   return rev;
    // });

    setFinalPayloads((prev) => {
      if (
        (prev.length > 0 &&
          prev[prev.length - 1]?.type == "pie" &&
          operand?.type != "operand") ||
        (prev.length > 0 &&
          operand?.type == "pie" &&
          prev[prev.length - 1]?.type != "operand")
      ) {
        hasError = true;
        return prev;
      }
      if (
        prev[prev.length - 1]?.type == "operand" &&
        prev[prev.length - 1]?.value == ")" &&
        operand?.type != "operand"
      ) {
        hasError = true;
        return prev;
      }

      if (prev.length > 0 &&  prev[prev.length - 1]?.type !== "operand" && operand?.value == "(") {
        hasError = true;
        return prev;
      }
      return prev;
    });

    setFinalPayloads((prev) => {
      if (
        prev[prev.length - 1]?.type == "operand" &&
        prev[prev.length - 1]?.value == ")" &&
        operand?.value == "("
      ) {
        hasError = true;
        return prev;
      }
      return prev;
    });

    setFinalPayloads((rev) => {
      if (
        rev?.length &&
        rev[rev.length - 1]?.type == "tagInput" &&
        operand?.type == "numeric"
      ) {
        hasError = true;
        return rev;
      } else if (
        rev?.length &&
        rev[rev.length - 1]?.type == "tagInput" &&
        operand?.value == "."
      ) {
        hasError = true;
        return rev;
      }
      return rev;
    });

    setFinalPayloads((rev) => {
      if (
        rev?.length &&
        rev[rev.length - 1]?.type == "tagInput" &&
        operand?.type == "trig"
      ) {
        hasError = true;
        return rev;
      }
      return rev;
    });

    setFinalPayloads((prev) => {
      if (
        prev?.length &&
        prev[prev.length - 1]?.type !== "operand" &&
        !allowedOperands.includes(operand?.type)
      ) {
        hasError = true;
        return prev;
      }
      return prev;
    });

    // setFinalPayloads((prev) => {
    //   if (prev?.length && prev[prev.length - 1]?.type == "numeric" && operand?.type == "numeric") {
    //     // hasError=true;
    //     return prev;
    //   }
    //   return prev;
    // });

    if (hasError) {
      toast.error("Please enter operator.");
      return;
    }

    setFinalCalculation((prev) => {
      if (operand?.value == ".") {
        const lastObject = prev[prev.length - 1];
        const withDot = lastObject?.value?.includes(".");
        if (withDot) {
          return prev;
        } else if (lastObject?.type == "operand") {
          return [...prev, operand];
        }
      }
      if (
        prev?.length &&
        prev[prev.length - 1]?.type == "operand" &&
        operand?.type == "operand"
      ) {
        if (
          ((prev[prev.length - 1]?.value == "(" ||
            prev[prev.length - 1]?.value == ")" ||
            prev[prev.length - 1]?.value == "π") &&
            operand?.type == "operand") ||
          operand?.value == "(" ||
          operand?.value == ")" ||
          operand?.value == "π"
        ) {
          if (operand?.type == "pie") {
            return [
              ...prev,
              { value: "3.14", view: operand?.value, type: operand?.type },
            ];
          }
          return [
            ...prev,
            {
              value: operand?.value,
              view: operand?.value,
              type: operand?.type,
            },
          ];
        }
        const clone = prev.slice(0, prev.length - 1);
        if (operand?.type == "pie") {
          return [
            ...prev,
            { value: "3.14", view: operand?.value, type: operand?.type },
          ];
        }
        return [
          ...clone,
          { value: operand?.value, view: operand?.value, type: operand?.type },
        ];
      }
      if (operand?.type == "pie") {
        return [
          ...prev,
          { value: "3.14", view: operand?.value, type: operand?.type },
        ];
      }
      return [...prev, operand];
    });

    // setFinalPayloads((prev) => {
    //   if (operand?.value == ".") {
    //     const lastObject = prev[prev.length - 1];
    //     const withDot = lastObject?.value.includes(".");
    //     if (withDot) {
    //       return prev;
    //     } else if (lastObject?.type == "operand") {
    //       return [...prev, operand];
    //     }
    //   }
    //   if (
    //     prev?.length &&
    //     prev[prev.length - 1]?.type == "operand" &&
    //     operand?.type == "operand"
    //   ) {
    //     if (
    //       ((prev[prev.length - 1]?.value == "(" ||
    //         prev[prev.length - 1]?.value == ")") &&
    //         operand?.type == "operand") ||
    //       operand?.type == "(" ||
    //       operand?.type == ")"
    //     ) {
    //       return [...prev, operand];
    //     }
    //     const clone = prev.slice(0, prev.length - 1);
    //     return [...clone, operand];
    //   }
    //   return [...prev, operand];
    // });

    setFinalPayloads((prev) => {
      if (operand?.value == ".") {
        const lastObject = prev[prev.length - 1];
        const withDot = lastObject?.value?.includes(".");
        if (withDot) {
          return prev;
        } else if (lastObject?.type == "operand") {
          return [...prev, operand];
        }
      }
      if (
        prev?.length &&
        prev[prev.length - 1]?.type == "operand" &&
        operand?.type == "operand"
      ) {
        if (
          ((prev[prev.length - 1]?.value == "(" ||
            prev[prev.length - 1]?.value == ")" ||
            prev[prev.length - 1]?.value == "π") &&
            operand?.type == "operand") ||
          operand?.value == "(" ||
          operand?.value == ")" ||
          operand?.value == "π"
        ) {
          if (operand?.type == "pie") {
            return [
              ...prev,
              { value: "3.14", view: operand?.value, type: operand?.type },
            ];
          }
          return [
            ...prev,
            {
              value: operand?.value,
              view: operand?.value,
              type: operand?.type,
            },
          ];
        }
        const clone = prev.slice(0, prev.length - 1);
        if (operand?.type == "pie") {
          return [
            ...prev,
            { value: "3.14", view: operand?.value, type: operand?.type },
          ];
        }
        return [
          ...clone,
          { value: operand?.value, view: operand?.value, type: operand?.type },
        ];
      }
      if (operand?.type == "pie") {
        return [
          ...prev,
          { value: "3.14", view: operand?.value, type: operand?.type },
        ];
      }
      return [...prev, operand];
    });
  };

  const [deleteEqLoader, setEqLoader] = useState(false);

  const handleDeleteSingleEquation = async (equationID) => {
    if (!equationID) {
      return;
    }
    setEqLoader(true);
    try {
      // Delete the equation
      const deleteResponse = await fetch(
        `${BASE_URL}/product/deleteEquation/${equationID}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${Auth.token()}` },
        }
      );

      if (!deleteResponse?.ok) {
        toast.error("Failed to delete equation");
      }

      const responseData = await deleteResponse.json();
      toast.success(responseData.message);
      await dispatch(getProductCalculator({ productId: productId }));
      setUpdateEquationLoader(false);
      setInputValues({});
      setShowInput(false);
    } catch (error) {
      console.error(error);
    } finally {
      setEqLoader(false);
    }
  };

  const LoaderSkeleton =
    allEquationsState?.length > 0 ? (
      allEquationsState?.map(() => (
        <CalculatorBox>
          <Box
            display="flex"
            sx={{ borderRadius: "3px", border: "1px solid #E4E4E4" }}
          >
            <Skeleton
              variant="rounded"
              width={"25%"}
              height={25}
              sx={{ m: 1 }}
            ></Skeleton>
            <Skeleton
              variant="rounded"
              width={"25%"}
              height={25}
              sx={{ m: 1 }}
            ></Skeleton>
            <Skeleton
              variant="rounded"
              width={"25%"}
              height={25}
              sx={{ m: 1 }}
            ></Skeleton>
            <Skeleton
              variant="rounded"
              width={"25%"}
              height={25}
              sx={{ m: 1 }}
            ></Skeleton>
          </Box>
        </CalculatorBox>
      ))
    ) : (
      <CalculatorBox>
        <Box
          display="flex"
          sx={{ borderRadius: "3px", border: "1px solid #E4E4E4" }}
        >
          <Skeleton
            variant="rounded"
            width={"25%"}
            height={25}
            sx={{ m: 1 }}
          ></Skeleton>
          <Skeleton
            variant="rounded"
            width={"25%"}
            height={25}
            sx={{ m: 1 }}
          ></Skeleton>
          <Skeleton
            variant="rounded"
            width={"25%"}
            height={25}
            sx={{ m: 1 }}
          ></Skeleton>
          <Skeleton
            variant="rounded"
            width={"25%"}
            height={25}
            sx={{ m: 1 }}
          ></Skeleton>
        </Box>
      </CalculatorBox>
    );

  const [showInput, setShowInput] = useState(false);
  const [inputValues, setInputValues] = useState<any>({});
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("false");
  const handleEdit = (element) => {
    setInputValues({
      id: element?.[0]?.equationId,
      value: element?.[0]?.equationName,
    });
    setShowInput(true);
  };

  const SubmitHandler = async (name) => {
    if (inputValues?.value === "") {
      setErrorText("please enter value");
      setShowError(true);
      return;
    }
    const { value } = inputValues;
    if (name === inputValues?.value) {
      setInputValues({});
      setShowInput(false);
      return;
    }

    setUpdateEquationLoader(true);
    let response = await apiClient(
      "product/calculator/equation/update",
      "post",
      {
        body: { product_id: productId, id: inputValues?.id, name: value },
      }
    );
    if (response.status === 200) {
      const formData = new FormData();
      formData.append("product_id", productId);
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

        if (response?.status) {
          dispatch(setProductCalculatorInfo(response?.data));
          if (productCalculatorHeader == "Group") {
            dispatch(setSelectedGroupData(response?.data?.[0]?.group_id));
            dispatch(
              setFinalGroupEquation(
                response?.group_equation?.length > 0
                  ? response?.group_equation
                  : []
              )
            );
          }

          dispatch(setEquations(response?.equations));
          setMyCalculatorEquations(response?.equations);
        }
      } catch (error) {
        console.log(error);
      }
      setUpdateEquationLoader(false);
      setInputValues({});
      setShowInput(false);
    }
  };

  const RenderEquation = (json, equation) => {
    if (json) {
      return JSON.parse(json);
    } else {
      return equation;
    }
  };

  const RenderFinalEquation = (json) => {
    if (json) {
      return JSON.parse(json);
    } else {
      return [];
    }
  };

  useEffect(() => {
    const timeOutObj = setTimeout(() => {
      dispatch(setEmptyFieldsError(false));
    }, 5000);

    return () => {
      clearTimeout(timeOutObj);
    };
  }, [emptyFieldsError]);

  useEffect(() => {
    dispatch(setFinalGroup(false));
  }, []);

  const handleBackspace = (type) => {
    if (type == "final") {
      if (finalCalculation?.length > 0) {
        setFinalCalculation((prev) => prev?.slice(0, -1));
        setFinalPayloads((prev) => prev?.slice(0, -1));
      }
    } else {
      if (equationState?.length > 0) {
        setEquationState((prev) => prev?.slice(0, -1));
        setFinalPayloads((prev) => prev?.slice(0, -1));
      }
    }
    if (groupFinalState?.length > 0) {
      setGroupFinalState((prev) => prev?.slice(0, -1));
    }
  };

  const handleUpdateCalculatorData = async () => {
    for (const item of productCalculatorInfo ?? []) {
      const isValid = item?.terms?.every((termValue) => {
        return termValue?.price_matrix?.every((priceValue) => {
          if (!priceValue?.value) {
            toast.error("Please fill all fields.");
            return false;
          }
          return true;
        });
      });
      if (!isValid) {
        return;
      }
    }

    const extractedData = productCalculatorInfo.flatMap((calyData) =>
      calyData.terms.flatMap((term) =>
        term.price_matrix.map(({ price_matrix_id, value }) => ({
          price_matrix_id,
          price: value,
        }))
      )
    );

    const response = await fetch(
      `${BASE_URL_V2}/product/calculator/pricematrix-update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: JSON.stringify({
          product_id: productId,
          update_matrix_price: extractedData,
        }),
      }
    );
    const parsedData = await response?.json();
  };

  const handleEditSingleEquation = (equation) => {
    // const editData = {
    //   ...equation,
    //   equationData: equation?.equationData,
    // };

    setEditEquation(equation);
  };

  // const handleEditEquationBackSpace = () => {
  //   // const parsedData = JSON.parse(editEquation[0]?.equationData);
  //   //  parsedData.slice(0, -1);
  //   setEditEquation((prev) => {
  //     const parsedData = JSON.parse(prev[0]?.equationData);
  //     parsedData.pop();
  //     const updatedData = prev.map((ele) => {
  //       return { ...ele, equationData: JSON.stringify(parsedData) };
  //     });
  //     return updatedData;
  //   });
  // };

  const handleEditEquationBackSpace = () => {
    setEditEquation((prev) => {
      const parsedData = JSON?.parse(prev[0]?.equationData);

      const updatedData = prev.map((ele) => {
        const newEquationData =
          parsedData?.length > 1
            ? parsedData?.slice(0, -1)
            : [
                {
                  id: ele?.id,
                  type_check: "",
                  value: "",
                  view: "",
                  type: "",
                  attribute_id: "",
                  is_parameter: "",
                  equationId: ele?.equationId,
                  equationData: "[]",
                },
              ];

        return { ...ele, equationData: JSON.stringify(newEquationData) };
      });
      return updatedData;
    });
  };
  const [editEquationError, setEditEquationError] = useState(false);

  const handleSaveEditEquation = async () => {
    setEditEquationError(false);
    const updatedEqution = JSON.parse(editEquation[0]?.equationData)?.filter(
      (equation) => {
        return equation?.value;
      }
    );
    if (
      updatedEqution[0]?.value == "" ||
      updatedEqution == undefined ||
      updatedEqution == null ||
      updatedEqution?.length == 0
    ) {
      setEditEquationError(true);
      return;
    }
    const formattedEquation = await handleFormatEquation(updatedEqution);
    await saveEquation(
      // formattedEquation?.replaceAll(",", ""),
      formattedEquation,
      editEquation[0]?.equationName,
      JSON.stringify(updatedEqution),
      false,
      editEquation[0]?.equationId
    );

    setEditEquation([]);

    await dispatch(getProductCalculator({ productId: productId }));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 700,
        }}
      >
        <Slide in={open} direction="left">
          <Box sx={style}>
            <Header>
              <HeaderText>
                Pricing Calculator {productCalculatorHeader}
              </HeaderText>
              <Button
                onClick={() => {
                  handleClose();
                  dispatch(setEmptyFieldsError(false));
                  setUpdateLoader(false);
                }}
                style={{
                  minHeight: "46px",
                  minWidth: "46px",
                  borderRadius: "50%",
                  color: "black",
                }}
              >
                <CloseOutlinedIcon
                  sx={{ cursor: "pointer", "&:hover": { color: "#d7282f" } }}
                />
              </Button>
            </Header>

            {productCalculatorHeader == "" && (
              <Box sx={{ margin: "20px" }}>
                {" "}
                <SkeletonForCalculator />
              </Box>
            )}

            <OuterContainer>
              <Grid container className={calculatorToggle ? "active" : ""}>
                <Grid
                  item
                  xl={5}
                  lg={5}
                  md={12}
                  xs={12}
                  className={`SpecTable ${
                    selectedTab == "Group" ? "GroupActive" : ""
                  }`}
                >
                  <LeftContainer>
                    {productCalculatorHeader != "" &&
                    (productCalculatorHeader == "multilevel" ||
                      productCalculatorHeader == "similar") &&
                    productCalculatorHeader != "Group" ? (
                      <>
                        <TableWrapper
                          headerName={productCalculatorHeader}
                          updateEquationsData={setAllEquationsState}
                        />
                      </>
                    ) : (
                      <>
                        <GroupTableWrapper
                          selectedTab={selectedTab}
                          updateData={setProductCalculatorInfo}
                          updateEquationsData={setAllEquationsState}
                          setSelectedTab={setSelectedTab}
                          setNewGrpId={setNewGrpId}
                        />
                      </>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {productCalculatorHeader != "" &&
                        productCalculatorHeader != "Group" &&
                        !finalGroup && (
                          <>
                            <BtnFilled
                              background="#d7282f"
                              onClick={async () => {
                                setUpdateLoader(true);
                                await handleUpdateCalculatorData();
                                setUpdateLoader(false);
                                return;
                              }}
                              disabled={updateLoader ? true : false}
                            >
                              {updateLoader ? (
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
                                "Update"
                              )}
                            </BtnFilled>

                            {emptyFieldsError && !updateLoader && (
                              <CommonErrorMessage
                                message={"Please fill all the fields!"}
                              />
                            )}

                            {updateLoader && (
                              <span
                                style={{
                                  color: "#D7282F",
                                  fontSize: "12px",
                                  display: "flex",
                                  width: "74%",
                                }}
                              >
                                Please be patient till we update product
                                varations, this process will take couple of
                                minutes.
                              </span>
                            )}
                          </>
                        )}
                    </div>

                    {finalGroup && (
                      <FinalCalculationContainer
                        sx={{
                          width: "60%",
                          margin: "20px 0 0 24px",
                          "@media screen and (max-width:1536px)": {
                            width: "80%",
                          },
                          "@media screen and (max-width:1299px)": {
                            width: "98%",
                          },
                        }}
                      >
                        <CalculatorHeader style={{ margin: "0px" }}>
                          {/* Make Final Calculation */}
                          Equation For Final Calculation
                          <span
                            onClick={resetAllGroupsFinalEquation}
                            style={{
                              position: "absolute",
                              display: "inline-block",
                              fontSize: "12px",
                              lineHeight: "16px",
                              color: "#D7282F",
                              paddingRight: "10px",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              cursor: "pointer",
                              fontFamily: "open sans",
                              textAlign: "end",
                              fontWeight: "400",
                              right: "0px",
                            }}
                          >
                            Reset all
                          </span>
                        </CalculatorHeader>
                        <CalcyBackspace>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={9} lg={9} xl={9.5}>
                              <EquationsContainerFinalCalculation
                                style={{
                                  border: "1px solid #d2d2d2",
                                  borderRadius: "6px",
                                  padding: "6px 26px 6px 6px",
                                  minHeight: "37.83px",
                                  display: "inline-flex",
                                  flexWrap: "wrap",
                                  position: "relative",
                                  width: "100%",
                                }}
                              >
                                {groupFinalState?.map((element) => {
                                  if (element?.type == "tagInput") {
                                    return (
                                      <EquationItem
                                        borderColor="#D7282F"
                                        style={{
                                          color: "#FFFFFF",
                                          backgroundColor: "#D7282F",
                                          width: "auto",
                                        }}
                                      >
                                        {element?.view}
                                      </EquationItem>
                                    );
                                  }
                                  return element?.type == "numeric" ? (
                                    <Typography
                                      variant="subtitle2"
                                      dangerouslySetInnerHTML={{
                                        __html: element?.view,
                                      }}
                                    />
                                  ) : (
                                    <span
                                      style={{
                                        fontSize: "16px",
                                        display: "inline-flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      {element?.view}
                                    </span>
                                  );
                                })}

                                <CalyBackSpaceIcon
                                  sx={{ right: "4px" }}
                                  onClick={() => {
                                    if (groupFinalState?.length > 0) {
                                      setGroupFinalState((prev) =>
                                        prev?.slice(0, -1)
                                      );
                                    }
                                  }}
                                />
                              </EquationsContainerFinalCalculation>
                              <Box>
                                {finalCalEqError && (
                                  <CommonErrorMessage
                                    message={"Please enter correct equaion."}
                                  />
                                )}
                                {grpFinalEqError && (
                                  <CommonErrorMessage
                                    message={
                                      "Please select at least one equation."
                                    }
                                  />
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={2.5}>
                              <Box>
                                <BtnFilled
                                  onClick={
                                    handleFinalPriceGroupCalculationSubmit
                                  }
                                  sx={{
                                    width: "100%",
                                    "@media (max-width: 900px)": {
                                      width: "max-content",
                                    },
                                    "&:hover": {
                                      opacity: "1",
                                    },
                                  }}
                                  className={
                                    groupFinalState.length == 0
                                      ? "disableBTN"
                                      : ""
                                  }
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
                                <CalculateText>
                                  Click <span>“Calculate” </span> to apply the
                                  value as price across all metrics{" "}
                                </CalculateText>
                              </Box>
                            </Grid>
                          </Grid>
                        </CalcyBackspace>
                        <Grid
                          container
                          spacing={2}
                          mt={1}
                          sx={{
                            width: "100%",
                            "@media screen and (max-width:1400px)": {
                              flexDirection: "column-reverse",
                            },
                          }}
                        >
                          <Grid item xs={12} sm={12} md={12} lg={7}>
                            <Box>
                              <Grid container spacing={2} mt={1}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <Box>
                                    <CalcHeading>
                                      Select Specifications
                                    </CalcHeading>
                                    <EquationsContainerFinalCalculation>
                                      {allGroupSpecList?.map(
                                        (element, index) => {
                                          return (
                                            <EquationItem
                                              onClick={() => {
                                                handleEquationClickFinalGroup(
                                                  element,
                                                  "extra"
                                                );
                                              }}
                                            >
                                              {element.view}
                                            </EquationItem>
                                          );
                                        }
                                      )}
                                    </EquationsContainerFinalCalculation>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                  <Box>
                                    <CalcHeading>Select Constants</CalcHeading>
                                    <EquationsContainerFinalCalculation>
                                      {passiveSpecList?.length > 0
                                        ? passiveSpecList?.map(
                                            (element, index) => (
                                              <EquationItem
                                                onClick={() => {
                                                  handleEquationClickFinalGroup(
                                                    element,
                                                    "extra_passive"
                                                  );
                                                }}
                                              >
                                                {element.name} #{element.tag}
                                              </EquationItem>
                                            )
                                          )
                                        : "N/A"}
                                    </EquationsContainerFinalCalculation>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                  <Box>
                                    <CalcHeading>Select Equations</CalcHeading>
                                    <EquationsContainerFinalCalculation>
                                      {groupsClone?.length > 0
                                        ? groupsClone?.map((element) => (
                                            <EquationItem
                                              style={{ width: "auto" }}
                                              onClick={() => {
                                                handleEquationClickFinalGroup(
                                                  element
                                                );
                                              }}
                                            >
                                              {`${element?.group_name} Final Equation`}
                                            </EquationItem>
                                          ))
                                        : "N/A"}
                                    </EquationsContainerFinalCalculation>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={5}>
                            <Box>
                              <Calculator
                                selectedGroupsData={setSelectedGroups}
                                setFinalPayloads={setFinalPayloads}
                                setGroupFinalState={setGroupFinalState}
                                groupFinalState={groupFinalState}
                                showClear={true}
                                marginCheck={1.6}
                                calculatorType={"Group"}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </FinalCalculationContainer>
                    )}
                  </LeftContainer>
                </Grid>
                <Grid
                  item
                  xl={7}
                  lg={7}
                  md={12}
                  xs={12}
                  className="RightSection"
                >
                  {productCalculatorHeader != "" && !finalGroup && (
                    <RightContainer>
                      <CalculatorHeader>
                        <LightTooltip
                          arrow
                          disableInteractive
                          title="Collapse"
                          placement="top"
                        >
                          <ExpandCollapseArrow
                            className="arrowPosition"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCalculatorToggle((prev) => !prev);
                            }}
                          >
                            <ArrowForwardIosIcon />
                          </ExpandCollapseArrow>
                        </LightTooltip>{" "}
                        Calculator
                      </CalculatorHeader>
                      <CalculatorOuterContianer>
                        {!addEqLoader && (
                          <EQAction>
                            <Box
                              component={"span"}
                              onClick={resetAllEquations}
                              sx={{
                                display: "inline-block",
                                fontSize: "15px",
                                cursor: "pointer",
                                fontFamily: "open sans",
                                fontWeight: "500",
                                color: "#d7282f",
                                position: "absolute",
                                right: "16px",
                                textDecoration: "underline",
                                "&:hover": {
                                  textDecoration: "none",
                                },
                              }}
                            >
                              {resetLoader && allEquationsState?.length > 0 ? (
                                <>
                                  <ThreeDots
                                    height="20"
                                    width="36"
                                    radius="9"
                                    color="#d7282f"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    visible={true}
                                  />
                                </>
                              ) : (
                                "Delete all"
                              )}
                            </Box>
                          </EQAction>
                        )}

                        <CalculatorContent>
                          <EquationsContainer>
                            {allEquationsState?.length > 0 &&
                              allEquationsState?.map((element, index) => {
                                if (!element?.[0]?.equationData) {
                                  return null;
                                }
                                return (
                                  <EquationOuterContainer>
                                    {!addEqLoader && (
                                      <>
                                        {showInput &&
                                        inputValues?.id ==
                                          element?.[0]?.equationId ? (
                                          <EditEquation
                                            component={"div"}
                                            display="flex"
                                            gap={2}
                                            alignItems="center"
                                          >
                                            <TextField
                                              size="small"
                                              value={inputValues?.value ?? ""}
                                              onChange={(e) => {
                                                setInputValues((prev) => ({
                                                  ...prev,
                                                  value: e.target.value,
                                                }));
                                                if (showError)
                                                  setShowError(false);
                                                if (errorText) setErrorText("");
                                              }}
                                              onKeyDown={(e) => {
                                                if (e.key == "Enter")
                                                  SubmitHandler(
                                                    element?.[0]?.equationName
                                                  );
                                              }}
                                              helperText={
                                                showError ? errorText : ""
                                              }
                                              error={showError}
                                            />
                                            {updateEquationLoader ? (
                                              <span>
                                                <CircularProgress
                                                  style={{
                                                    color: "#D7282F",
                                                    height: "16px",
                                                    width: "16px",
                                                    display: "flex",
                                                    margin: "0 auto",
                                                    position: "relative",
                                                  }}
                                                />
                                              </span>
                                            ) : (
                                              <>
                                                <CheckCircleOutlineOutlinedIcon
                                                  onClick={() => {
                                                    SubmitHandler(
                                                      element?.[0]?.equationName
                                                    );
                                                  }}
                                                />
                                                <CancelOutlinedIcon
                                                  onClick={() => {
                                                    setInputValues({});
                                                    setShowInput(false);
                                                  }}
                                                />
                                              </>
                                            )}
                                          </EditEquation>
                                        ) : (
                                          <EquationHeader>
                                            {element[0]?.name
                                              ? element[0]?.name
                                              : `Equation #${index + 1}`}

                                            <EditOutlinedIcon
                                              style={{
                                                color: "#D7282F",
                                                cursor: "pointer",
                                              }}
                                              onClick={(e) => {
                                                handleEdit(element);
                                              }}
                                            />
                                          </EquationHeader>
                                        )}
                                        <CustomEquationContainer>
                                          {editEquation[0]?.equationId ==
                                            element[0]?.equationId &&
                                          editEquation[0]?.equationId
                                            ? RenderEquation(
                                                editEquation[0]?.equationData,
                                                editEquation
                                              )?.map((ele, idx) => {
                                                return (
                                                  <>
                                                    {/* Rendering based on the type of element */}
                                                    {ele?.type ===
                                                    "tagInput" ? (
                                                      <CustomChipEquation>
                                                        {ele?.view}
                                                      </CustomChipEquation>
                                                    ) : ele?.type ===
                                                      "numeric" ? (
                                                      <Typography
                                                        variant="subtitle2"
                                                        dangerouslySetInnerHTML={{
                                                          __html: ele.view,
                                                        }}
                                                      />
                                                    ) : (
                                                      <span
                                                        style={{
                                                          fontSize: "16px",
                                                          display:
                                                            "inline-flex",
                                                          justifyContent:
                                                            "center",
                                                          alignItems: "center",
                                                        }}
                                                      >
                                                        {ele?.view}
                                                      </span>
                                                    )}
                                                    {/* Adding the icons after each list item */}
                                                    {idx == 0 && (
                                                      <CalcyDelEdit>
                                                        <Box>
                                                          {editEquation[0]
                                                            ?.equationId > 0 ? (
                                                            <CalyBackSpaceIcon
                                                              onClick={() =>
                                                                handleEditEquationBackSpace()
                                                              }
                                                            />
                                                          ) : (
                                                            <CalyDeletedIcon
                                                              onClick={() => {
                                                                //for now handling edit case in this icon
                                                                handleEditSingleEquation(
                                                                  element
                                                                );
                                                              }}
                                                            />
                                                          )}
                                                        </Box>
                                                      </CalcyDelEdit>
                                                    )}
                                                  </>
                                                );
                                              })
                                            : element?.[0]?.equationData
                                            ? RenderEquation(
                                                element[0]?.equationData,
                                                element
                                              )?.map((ele, idx) => {
                                                return (
                                                  <>
                                                    {/* Rendering based on the type of element */}
                                                    {ele?.type ===
                                                    "tagInput" ? (
                                                      <CustomChipEquation>
                                                        {ele?.view}
                                                      </CustomChipEquation>
                                                    ) : ele?.type ===
                                                      "numeric" ? (
                                                      <Typography
                                                        variant="subtitle2"
                                                        dangerouslySetInnerHTML={{
                                                          __html: ele.view,
                                                        }}
                                                      />
                                                    ) : (
                                                      <span
                                                        style={{
                                                          fontSize: "16px",
                                                          display:
                                                            "inline-flex",
                                                          justifyContent:
                                                            "center",
                                                          alignItems: "center",
                                                        }}
                                                      >
                                                        {ele?.view}
                                                      </span>
                                                    )}

                                                    {/* Adding the icons after each list item */}
                                                    {idx == 0 && (
                                                      <CalcyDelEdit>
                                                        <Box
                                                          sx={{
                                                            display: "flex",
                                                            alignItems:
                                                              "center",
                                                            gap: "6px",
                                                          }}
                                                        >
                                                          <Box
                                                            sx={{
                                                              position:
                                                                "absolute",
                                                              right:
                                                                "44px !important",
                                                              top: "12px",
                                                              cursor: "pointer",
                                                            }}
                                                            onClick={() => {
                                                              handleEditSingleEquation(
                                                                element
                                                              );
                                                            }}
                                                          >
                                                            <img
                                                              src="/assets/EditPencil.svg"
                                                              alt=""
                                                              style={{
                                                                position:
                                                                  "absolute",
                                                                right:
                                                                  "28px !important",
                                                                height: "16px",
                                                                width: "16px",
                                                              }}
                                                            />
                                                          </Box>
                                                          <CalyDeletedIcon
                                                            onClick={() => {
                                                              handleDeleteSingleEquation(
                                                                element[0]
                                                                  ?.equationId
                                                              );
                                                            }}
                                                          />
                                                        </Box>
                                                      </CalcyDelEdit>
                                                    )}
                                                  </>
                                                );
                                              })
                                            : null}
                                        </CustomEquationContainer>
                                        {editEquation[0]?.equationId &&
                                          editEquation[0]?.equationId ==
                                            element[0]?.equationId && (
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "flex-end",
                                                flexWrap: "wrap",
                                                gap: "8px",
                                              }}
                                            >
                                              {editEquationError && (
                                                <CommonErrorMessage
                                                  message={
                                                    "Please add at least one equation."
                                                  }
                                                />
                                              )}
                                              <EquationSave
                                                onClick={() => {
                                                  handleSaveEditEquation();
                                                }}
                                              >
                                                Save
                                              </EquationSave>
                                              <EquationSave
                                                onClick={() => {
                                                  setEditEquationError(false);
                                                  setEditEquation([]);
                                                }}
                                              >
                                                Cancel
                                              </EquationSave>
                                            </Box>
                                          )}
                                      </>
                                    )}
                                  </EquationOuterContainer>
                                );
                              })}
                          </EquationsContainer>
                          {!(
                            specsForEquations?.length == 0 &&
                            equationState?.length == 0 &&
                            !(allEquationsState?.length > 5)
                          ) && (
                            <EquationContainer>
                              <EquationHeader
                                style={{
                                  display: "inline-flex",
                                  justifyContent: "space-between",
                                  marginBottom: "4px",
                                }}
                              >
                                {" "}
                                <span style={{ display: "inline-block" }}>
                                  {allEquationsState?.length == 0
                                    ? "Equation #1"
                                    : addEqLoader
                                    ? ""
                                    : `Equation # ${
                                        allEquationsState?.length + 1
                                      }`}{" "}
                                </span>
                              </EquationHeader>
                              <CalcyBackspace>
                                <FormControl
                                  sx={{
                                    margin: "auto",
                                    width: "calc(100% - 0px)",
                                  }}
                                >
                                  {!addEqLoader && (
                                    <>
                                      <EQField>
                                        {equationState?.map((v, index) => {
                                          return v.type == "tagInput" ? (
                                            <Typography variant="subtitle1">
                                              {v.view}
                                            </Typography>
                                          ) : v.constant == true ? (
                                            <Typography variant="subtitle2">
                                              {v.view}
                                            </Typography>
                                          ) : v.type == "numeric" ? (
                                            <Typography
                                              variant="subtitle2"
                                              dangerouslySetInnerHTML={{
                                                __html: v.view,
                                              }}
                                            />
                                          ) : (
                                            <Typography variant="subtitle2">
                                              {v.view}
                                            </Typography>
                                          );
                                        })}
                                        {equationState?.length > 0 && (
                                          <CalyBackSpaceIcon
                                            onClick={() =>
                                              handleBackspace("equation")
                                            }
                                          />
                                        )}
                                      </EQField>
                                    </>
                                  )}
                                </FormControl>
                              </CalcyBackspace>
                            </EquationContainer>
                          )}
                          {specsForEquations?.length == 0 &&
                            equationState?.length == 0 && (
                              <span
                                onClick={resetAllEquations}
                                style={{
                                  display: "inline-block",
                                  fontSize: "12px",
                                  lineHeight: "16px",
                                  color: "#D7282F",
                                  paddingRight: "10px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  cursor: "pointer",
                                  fontFamily: "open sans",
                                  textAlign: "end",
                                  fontWeight: "400",
                                }}
                              >
                                Reset all
                              </span>
                            )}
                        </CalculatorContent>
                        {addEqLoader && LoaderSkeleton}
                        {!(
                          specsForEquations?.length == 0 &&
                          equationState?.length == 0
                        ) && (
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                margin: "6px 0 0 0",
                                "@media (max-width: 360px)": {},
                              }}
                            >
                              {showFirstCalculator && (
                                <EquationSave
                                  onClick={() => {
                                    handleSaveAllEquations();
                                  }}
                                >
                                  {addEqLoader ? (
                                    <ThreeDots
                                      height="36"
                                      width="36"
                                      radius="9"
                                      color="#fff"
                                      ariaLabel="three-dots-loading"
                                      wrapperStyle={{}}
                                      visible={true}
                                    />
                                  ) : (
                                    "Save"
                                  )}
                                </EquationSave>
                              )}

                              {minEquationError && (
                                <CommonErrorMessage
                                  message={"Please add at least one equation."}
                                />
                              )}

                              {equationError && (
                                <CommonErrorMessage
                                  message={"Please enter a correct equation."}
                                />
                              )}
                            </Box>

                            <AddEquationContainer
                              onClick={() => {
                                handleNewEquationAddition();
                              }}
                              style={{ paddingRight: "0", fontSize: "14px" }}
                            >
                              {" "}
                              {!addEqLoader && "+ Add New Equation"}
                            </AddEquationContainer>
                          </Box>
                        )}

                        <Grid
                          container
                          spacing={2}
                          sx={{
                            "@media screen and (max-width:1400px)": {
                              flexDirection: "column-reverse",
                            },
                          }}
                        >
                          <Grid item xs={12} sm={12} md={12} lg={7} xl={7.5}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={4} lg={12} xl={4}>
                                <Box>
                                  <CalcHeading>
                                    Select Specifications
                                  </CalcHeading>
                                  <EquationsContainerFinalCalculation>
                                    {specsForEquations?.map(
                                      (element, index) => (
                                        <EquationItem
                                          onClick={() => {
                                            setEquationError(false);
                                            if (editEquation[0]?.equationId) {
                                              setEditEquationData(
                                                element,
                                                "extra"
                                              );
                                            } else {
                                              setEquationStateData(
                                                element,
                                                "extra"
                                              );
                                            }
                                          }}
                                        >
                                          {element.view}
                                        </EquationItem>
                                      )
                                    )}
                                  </EquationsContainerFinalCalculation>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={12} xl={4}>
                                <Box>
                                  <CalcHeading>Select Constants</CalcHeading>
                                  {passiveSpecList?.length > 0
                                    ? passiveSpecList?.map((element, index) => (
                                        <EquationItem
                                          sx={{ margin: "0 4px 4px" }}
                                          onClick={() => {
                                            //TODO: check here how data is set for constant
                                            if (editEquation[0]?.equationId) {
                                              setEditEquationData(
                                                element,
                                                "extra_passive"
                                              );
                                            } else {
                                              setEquationStateData(
                                                element,
                                                "extra_passive"
                                              );
                                            }
                                          }}
                                        >
                                          {element.name} #{element.tag}
                                        </EquationItem>
                                      ))
                                    : "N/A"}
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={12} xl={4}>
                                <Box>
                                  <CalcHeading>Select Equations</CalcHeading>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {allEquationsStateClone?.length > 0
                                      ? allEquationsStateClone?.map(
                                          (element) => {
                                            return (
                                              <Box>
                                                <EquationItem
                                                  onClick={() => {
                                                    if (
                                                      editEquation[0]
                                                        ?.equationId
                                                    ) {
                                                      setEditEquationData(
                                                        element,
                                                        "extra"
                                                      );
                                                    } else {
                                                      setEquationStateData(
                                                        element,
                                                        "extra"
                                                      );
                                                    }
                                                  }}
                                                >
                                                  {element?.name
                                                    ? element?.name
                                                    : `Equation #${element?.idx}`}
                                                </EquationItem>
                                              </Box>
                                            );
                                          }
                                        )
                                      : "N/A"}
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={5} xl={4.5}>
                            {showFirstCalculator &&
                            editEquation[0]?.equationId ? (
                              <CalculatorClone
                                setEditEquationError={setEditEquationError}
                                equation={editEquation}
                                setEquation={setEditEquation}
                              />
                            ) : showFirstCalculator ? (
                              <Calculator
                                show={showEquationCalculator}
                                setFinalPayloads={setFinalPayloads}
                                setShow={setShowEquationCalculator}
                                // setFinalEquation={setFinalEquationState}
                                equation={equationState}
                                setEquation={setEquationState}
                                showClear={true}
                                marginCheck={1.6}
                                calculatorType=""
                              />
                            ) : null}
                          </Grid>
                        </Grid>
                      </CalculatorOuterContianer>
                      {/* TODO: second calculator starts here */}
                      {/* TODO: second calculator ends here */}

                      <FinalCalculation
                        newGrpId={newGrpId}
                        saveEquation={saveEquation}
                        handleFormatEquation={handleFormatEquation}
                        RenderFinalEquation={RenderFinalEquation}
                        setFinalOperandsData={setFinalOperandsData}
                        // setFinalEquationState={setFinalEquationState}
                        reloadMatrixData={reloadMatrixData}
                        handleClose={handleClose}
                        specsForEquations={specsForEquations}
                        setResetLoader={setResetLoader}
                        setFinalValues={setFinalValues}
                        allEquationsState={allEquationsState}
                        groupEquationsSteps={groupEquationsSteps}
                        allSpecsClone={allSpecsClone}
                        myCalculatorEquations={myCalculatorEquations}
                        setShowFirstCalculator={setShowFirstCalculator}
                        setShowSecondCalculator={setShowSecondCalculator}
                        setFinalCalculationClone={setFinalCalculationClone}
                        setShowFinalPriceCalculator={
                          setShowFinalPriceCalculator
                        }
                        allEquationsStateClone={allEquationsStateClone}
                        setAllEquationsStateClone={setAllEquationsStateClone}
                        resetLoaderFinal={resetLoaderFinal}
                        setResetLoaderFinal={setResetLoaderFinal}
                        finalCalculation={finalCalculation}
                        setFinalCalculation={setFinalCalculation}
                        finalEquationError={finalEquationError}
                        setFinalEquationError={setFinalEquationError}
                        finalLoader={finalLoader}
                        setFinalLoader={setFinalLoader}
                        equationSelectionError={equationSelectionError}
                        setEquationSelectionError={setEquationSelectionError}
                        groupEqError={groupEqError}
                        setGroupEqError={setGroupEqError}
                        selectedGroups={selectedGroups}
                        setSelectedGroups={setSelectedGroups}
                        groupFinalState={groupFinalState}
                        setGroupFinalState={setGroupFinalState}
                        equationState={equationState}
                        setEquationState={setEquationState}
                        finalPayloads={finalPayloads}
                        setFinalPayloads={setFinalPayloads}
                        handleBackspace={handleBackspace}
                      />
                    </RightContainer>
                  )}
                </Grid>
              </Grid>
            </OuterContainer>
          </Box>
        </Slide>
      </Modal>

      {/* TODO: check for this its not needed anyhwere */}
      {showFinalPriceCalculator && (
        <Calculator
          type="finalPriceCalculator"
          leftValues={finalCalculationClone}
          // setFinalEquation={setFinalEquationState}
          show={showFinalPriceCalculator}
          setShow={setShowFinalPriceCalculator}
          equation={finalCalculation}
          setFinalPayloads={setFinalPayloads}
          setEquation={setFinalCalculation}
          showClear={false}
          calculatorType={""}
        />
      )}
    </div>
  );
}
