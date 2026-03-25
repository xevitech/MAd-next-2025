import Auth from "@/auth/Auth";
import { apiClient, per_page_data } from "@/components/common/common";
import { BASE_URL, BASE_URL_V2 } from "@/utils/staticValues";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface PricingCalculatorInterface {
  productCalculatorInfo: any[];
  productCalculatorHeader: string;
  variationTableValues: {};
  equations: any[];
  finalEquationShow: any[];
  multiTableInfo: any[];
  selectedGroupData: any;
  simpleTableRowsLength: string;
  allSpecs: any[];
  rowFields: {};
  multiTableStartSerialHashMap: {};
  allTerms: any[];
  payloadValuesForTableInitially: any[];
  payloadValuesForMultiTableInitially: any;
  variationTableValuesWithKeys: any[];
  finalGroup: boolean;
  groupEquationsDataForFinal: any[];
  updateLoader: boolean;
  emptyFieldsError: boolean;
  finalGroupEquation: any[];
}

const initialState = {
  productCalculatorInfo: [],
  productCalculatorHeader: "",
  variationTableValues: {},
  equations: [],
  finalEquationShow: [],
  multiTableInfo: [],
  selectedGroupData: "",
  simpleTableRowsLength: "",
  allSpecs: [],
  rowFields: {},
  multiTableStartSerialHashMap: {},
  allTerms: [],
  payloadValuesForTableInitially: [],
  payloadValuesForMultiTableInitially: "",
  variationTableValuesWithKeys: [],
  finalGroup: false,
  groupEquationsDataForFinal: [],
  updateLoader: false,
  emptyFieldsError: false,
  finalGroupEquation: [],
} as PricingCalculatorInterface;

let promiseArray = [];

function getUniqueListBy(arr, key = null) {
  if (key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  } else {
    return [...new Set(arr)];
  }
}

export const listMatrix: any = createAsyncThunk(
  "specifications/listMatrix",
  async (payloads: any, { dispatch, getState }) => {
    const { productId = "" } = payloads;
    const state: any = getState();
    const { matrixListPage, totalVariation } = state?.calculatorData;
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("per_page", `${totalVariation}`);
    try {
      let lastPage = 1;
      formData.append("page", matrixListPage);
      const response = await fetch(`${BASE_URL}/product/matrix/list`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      promiseArray.push(data?.data);
      lastPage = data?.lastPage;
      const payload = {
        data: data,
      };
      return payload;
    } catch (error) {}
  }
);
export const updateProductCalculator: any = createAsyncThunk(
  "productCalculator/updateProductCalculator",
  async (payload: any, { dispatch, getState }) => {
    dispatch(setUpdateLoader(true));
    const {
      type = null,
      groupIndex = null,
      groupLength = null,
      productId,
    } = payload;
    let formData = new FormData();
    formData.append("product_id", productId);
    let newArrayValues = [];
    const state: any = getState();
    const {
      productCalculatorInfo,
      productCalculatorHeader,
      variationTableValues,
    } = state.PricingCalculator;
    await dispatch(listMatrix({ productId }));
    if (productCalculatorHeader == "similar") {
      let newArray = [];

      productCalculatorInfo?.forEach((ele) => {
        ele?.terms?.forEach((element) => {
          // element?.terms_list?.forEach((ele_term) => {
          newArray?.push({
            id: element?.id,
            value: element?.attributes_values,
          });
          // });
        });
        // ele?.terms?.forEach((element) =>
        //   newArray?.push({
        //     id: element?.id,
        //     value: element?.attributes_values,
        //   })
        // );
      });

      for (const item of newArray) {
        if (item?.value === null || item?.value === "") {
          dispatch(setEmptyFieldsError(true));
          return;
        }
        dispatch(setEmptyFieldsError(false));
        formData.append(`attributes_values[${item?.id}]`, item?.value);
      }

      newArrayValues = promiseArray?.flat()?.map((matrix) => {
        const splitEq = matrix?.value?.split("|");
        const dataEquations = [];
        const idsEquations = [];
        const tagsEquations = [];
        const tagsEquationsIds = [];

        splitEq?.forEach((equation) => {
          productCalculatorInfo?.forEach((ele) => {
            const data = ele?.terms?.find((v) => v.name == equation) || {};
            if (Object.keys(data)?.length > 0) {
              dataEquations?.push(data.attributes_values);
              idsEquations?.push(data.id);
              tagsEquations?.push(ele.tag);
              tagsEquationsIds?.push(ele.id);
            }
          });
        });

        return {
          id: matrix.id,
          value: matrix.value,
          new_value: dataEquations.join("|"),
          new_value_ids: idsEquations.join("|"),
          tags: tagsEquations.join("|"),
          ids: tagsEquationsIds.join("|"),
        };
      });

      formData.append("formula_equations", JSON.stringify(newArrayValues));
      promiseArray = [];

      const response = await apiClient(
        "product/calculator/table/update",
        "post",
        { body: formData },
        true
      );
      if (response?.status === 200) {
        toast.success(response?.message);
      } else {
        toast.error("Something went wrong. Please try after sometime!");
      }
      dispatch(setUpdateLoader(false));

      return;
    }
    if (productCalculatorHeader === "multilevel") {
      // for (const [key, value] of Object.entries(variationTableValues)) {
      //   if (value === "" || value === null) {
      //     dispatch(setEmptyFieldsError(true));
      //     dispatch(setUpdateLoader(false));
      //     return;
      //   }
      // }
      if (
        Object.entries(variationTableValues)?.filter((ele) => ele[1] == "")
          ?.length > 0
      ) {
        // dispatch(setEmptyFieldsError(true));
        // dispatch(setUpdateLoader(false));
        return;
      } else {
        const customValues = Object.entries(variationTableValues);
        for (let i = 0; i < customValues?.length; i++) {
          formData.append(
            `row_name[${customValues[i][0]}]`,
            customValues[i][1] == "0" || customValues[i][1] == null
              ? ("0" as string)
              : (customValues[i][1] as string)
          );
        }

        let Possiblevalue = [];

        let mainCombination = productCalculatorInfo.map((value, index) => {
          if (value.level) {
            let filterValue = productCalculatorInfo.find(
              (item) => item.id == value.level
            );
            let combination = value.terms.map((parent, i) => {
              return filterValue.terms.map((child) => {
                return `${parent.name}-${child.name}`;
              });
            });
            return combination.flat();
          }
          //TODO: check this condition
          else {
            let combination = value.terms.map((parent, i) => {
              return `${parent.name}`;
            });
            return combination.flat();
          }
        });

        // return;

        promiseArray?.flat()?.map((matrix: any) => {
          let splitEq = matrix.value.split("|");
          let martixValue = matrix.value;

          let filteredKey = [];
          Object.keys(variationTableValues).forEach((value) => {
            let keyValue = value.split("-");
            let lastValue = keyValue[keyValue.length - 1];
            let secondLastValue = keyValue[keyValue.length - 2];
            if (
              mainCombination
                .flat()
                .filter((v) => v)
                .includes(`${secondLastValue}-${lastValue}`)
            ) {
              filteredKey.push({
                name: `${secondLastValue}-${lastValue}`,
                value: variationTableValues[value],
              });
            }
          });
          productCalculatorInfo.map((value) => {
            if (value.level) {
              const { terms } = value;
              let parentTerms = productCalculatorInfo.find(
                (v) => v.id == value.level
              ).terms;
              let data = terms.map((childTerm) => {
                return parentTerms.map((v) => {
                  return `${childTerm.name}-${v.name}-${childTerm.id}-${v.id}`;
                });
              });
              Possiblevalue.push(data.flat());
            }
          });

          let allPossiblevalue = Possiblevalue.flat();

          let filteredKeyData = filteredKey.filter((v) => {
            if (v) return v;
          });
          let filterDataKeys = [];
          filteredKeyData.forEach((v) => {
            allPossiblevalue.forEach((item) => {
              let [first, second, child, parent] = item.split("-");
              if (`${first}-${second}` == v.name) {
                let newVal = { ...v, parent, child };
                filterDataKeys.push(newVal);
              }
            });
          });

          let inputArray = martixValue.split("|");
          const outputArray = [];
          for (let i = 0; i < inputArray.length; i++) {
            for (let j = 0; j < inputArray.length; j++) {
              if (i !== j) {
                outputArray.push(`${inputArray[i]}-${inputArray[j]}`);
              }
            }
          }

          let dataEquations = [];
          let idsEquations = [];

          let finalArray: any = getUniqueListBy(filterDataKeys, "name");
          let output = finalArray.map((value) => {
            const { parent, child } = value;
            if (outputArray.includes(value.name)) {
              dataEquations.push(value.value);
              idsEquations.push(child);
            }
          });

          let filterParent = productCalculatorInfo
            .filter((v) => v.level == null)?.[0]
            ?.terms.map((v) => v.name);
          let Index = martixValue
            .split("|")
            .findIndex((v) => filterParent.includes(v));
          let filterParentID = productCalculatorInfo
            .filter((v) => v.level == null)?.[0]
            ?.terms.filter((v) => v.name == martixValue.split("|")[Index])
            .map((v) => v.id);
          if (filterParent) {
            dataEquations.splice(Index, 0, "0");
            idsEquations.splice(Index, 0, filterParentID);
          }

          let allParent = [];
          let all = splitEq?.map((split) => {
            productCalculatorInfo?.map((ele) => {
              return ele?.terms?.filter((fill) => {
                if (fill.name == split) {
                  allParent.push(fill.parent);
                }
              });
            });
          });

          let tagsName = [];
          let tagsIds = [];
          let allTag = allParent?.map((parent) => {
            let filterTag = productCalculatorInfo.filter(
              (v) => v.id == parent
            )?.[0];
            tagsName.push(filterTag?.tag);
            tagsIds.push(filterTag?.id);
          });

          newArrayValues.push({
            id: matrix.id,
            value: matrix.value,
            new_value: dataEquations.join("|"),
            new_value_ids: idsEquations.join("|"),
            tags: tagsName.join("|"),
            ids: tagsIds.join("|"),
          });
        });

        formData.append("formula_equations", JSON.stringify(newArrayValues));
        const response = await apiClient(
          "product/calculator/calculator_multiple_save",
          "post",
          { body: formData },
          true
        );
        if (response.status === 200) {
          toast.success(response.message);
          //   await productMultipleSave(productId);
        } else {
          toast.error("Something went wrong. Please try after sometime!");
        }
        dispatch(setUpdateLoader(false));
        return;
      }
    }

    if (productCalculatorHeader === "Group") {
      // if (productCalculatorInfo[type]?.message == "similar") {
      let newArray = [];
      productCalculatorInfo[type]?.levels?.forEach(({ terms }) => {
        // newTerm?.forEach(({ terms_list }) => {
        //   terms_list?.forEach(({ id, attributes_values }) => {
        //     newArray.push({ id, value: attributes_values });
        //   });
        // });

        terms?.forEach(({ id, attributes_values }) => {
          newArray.push({ id, value: attributes_values });
        });
      });

      for (const item of newArray) {
        if (item?.value == null || item?.value == "") {
          dispatch(setEmptyFieldsError(true));
          dispatch(setUpdateLoader(false));
          return;
        }
        dispatch(setEmptyFieldsError(false));
        formData.append(`attributes_values[${item.id}]`, item.value);
      }

      promiseArray?.flat()?.forEach((matrix) => {
        const splitEq = matrix.value.split("|");
        const dataEquations = [];
        const idsEquations = [];
        const tagsEquations = [];
        const tagsEquationsIds = [];

        splitEq.forEach((equation) => {
          productCalculatorInfo?.forEach(({ newTerms }) => {
            newTerms?.forEach(({ terms, tag, id: termId }) => {
              const data = terms?.find(({ name }) => name === equation) || {};
              if (Object.keys(data).length > 0) {
                dataEquations.push(data.attributes_values);
                idsEquations.push(data.id);
                tagsEquations.push(tag);
                tagsEquationsIds.push(termId);
              }
            });
          });
        });

        newArrayValues.push({
          id: matrix.id,
          value: matrix.value,
          new_value: dataEquations.join("|"),
          new_value_ids: idsEquations.join("|"),
          tags: tagsEquations.join("|"),
          ids: tagsEquationsIds.join("|"),
        });
      });

      formData.append("formula_equations", JSON.stringify(newArrayValues));
      // }
      promiseArray = [];

      const response = await apiClient(
        "product/calculator/table/update",
        "post",
        { body: formData },
        true
      );
      if (response.status === 200) {
        toast.success(response.message);
      } else {
        toast.error("Something went wrong. Please try after sometime!");
      }
      // }

      // else {
      //   const customValues = Object.entries(variationTableValues);
      //   dispatch(setUpdateLoader(false));

      //   customValues.forEach((value, index) => {
      //     const parameterName = value[0].split("-");
      //     if (parameterName.length < 5) {
      //       customValues[index][1] = 0;
      //     }
      //   });

      //   for (const item of customValues) {
      //     if (item[1] === null || item[1] === "") {
      //       dispatch(setEmptyFieldsError(true));
      //       return;
      //     }
      //     dispatch(setEmptyFieldsError(false));
      //   }

      //   for (let i = 0; i < customValues?.length; i++) {
      //     formData.append(
      //       `row_name[${customValues[i][0]}]`,
      //       customValues[i][1] == "0" || customValues[i][1] == null
      //         ? ("0" as string)
      //         : (customValues[i][1] as string)
      //     );
      //   }

      //   // if (groupIndex + 1 == groupLength) {
      //   let allPossiblevalue = [];
      //   let mainCombination = productCalculatorInfo.flatMap(
      //     (groupLoop, index) => {
      //       return groupLoop.newTerms.flatMap((newTermsLoop, termindex) => {
      //         if (newTermsLoop.level) {
      //           let filterValue = groupLoop.newTerms.find(
      //             (item) => item.id == newTermsLoop.level
      //           );
      //           if (filterValue) {
      //             let combinations = newTermsLoop.terms.flatMap((parent) => {
      //               return filterValue.terms.map((child) => {
      //                 allPossiblevalue.push(
      //                   `${child.name}-${parent.name}-${child.id}-${parent.id}`
      //                 );
      //                 return `${parent.name}-${child.name}`;
      //               });
      //             });
      //             return combinations;
      //           } else {
      //             return [];
      //           }
      //         } else {
      //           return [];
      //         }
      //       });
      //     }
      //   );

      //   promiseArray?.flat()?.map((matrix: any) => {
      //     let splitEq = matrix.value.split("|");
      //     let martixValue = matrix.value;
      //     let filteredKey = [];
      //     Object.keys(variationTableValues).forEach((value) => {
      //       let keyValue = value.split("-");
      //       let lastValue = keyValue[keyValue.length - 1];
      //       let secondLastValue = keyValue[keyValue.length - 2];
      //       if (
      //         mainCombination
      //           .filter((v) => v)
      //           .includes(`${secondLastValue}-${lastValue}`)
      //       ) {
      //         filteredKey.push({
      //           name: `${secondLastValue}-${lastValue}`,
      //           value: variationTableValues[value],
      //         });
      //       }
      //     });

      //     let filteredKeyData = filteredKey.filter((v) => {
      //       if (v) return v;
      //     });
      //     let filterDataKeys = [];

      //     filteredKeyData.forEach((v) => {
      //       allPossiblevalue.forEach((item) => {
      //         let [first, second, child, parent] = item.split("-");
      //         if (`${second}-${first}` == v.name) {
      //           let newVal = { ...v, parent, child };
      //           filterDataKeys.push(newVal);
      //         }
      //       });
      //     });
      //     const outputArray = splitEq.flatMap((item1, i) =>
      //       splitEq
      //         .filter((_, j) => i !== j)
      //         .map((item2) => `${item1}-${item2}`)
      //     );

      //     let dataEquations = [];
      //     let idsEquations = [];

      //     let finalArray: any = getUniqueListBy(filterDataKeys, "name");

      //     outputArray.forEach((name) => {
      //       return finalArray.forEach((val) => {
      //         if (val.name === name) {
      //           const { parent, child } = val;
      //           dataEquations.push(val.value);
      //           idsEquations.push(parent);
      //         }
      //       });
      //     });

      //     let filterParent = productCalculatorInfo.map((groupLoop, index) => {
      //       return groupLoop?.newTerms.filter((v) => v.level == null)?.[0]
      //         ?.terms;
      //     });

      //     let filterParents = [];

      //     splitEq.forEach((v, index) => {
      //       filterParent.forEach((parentArray) => {
      //         parentArray.forEach((ele) => {
      //           if (v === ele.name) {
      //             filterParents.push({
      //               name: ele.name,
      //               id: ele.id,
      //               index: index,
      //             });
      //           }
      //         });
      //       });
      //     });

      //     if (filterParents) {
      //       filterParents.map((parent) => {
      //         dataEquations.splice(parent.index, 0, "0");
      //         idsEquations.splice(parent.index, 0, parent.id);
      //       });
      //     }

      //     let allParentTags = [];
      //     let allParentTagsIds = [];

      //     splitEq?.forEach((split) => {
      //       productCalculatorInfo?.forEach(({ newTerms }) => {
      //         newTerms?.forEach(({ terms, tag, id }) => {
      //           terms?.forEach(({ name }) => {
      //             if (name === split) {
      //               allParentTags.push(tag);
      //               allParentTagsIds.push(id);
      //             }
      //           });
      //         });
      //       });
      //     });

      //     newArrayValues.push({
      //       id: matrix.id,
      //       value: matrix.value,
      //       new_value: dataEquations.join("|"),
      //       new_value_ids: idsEquations.join("|"),
      //       tags: allParentTags.join("|"),
      //       ids: allParentTagsIds.join("|"),
      //     });
      //   });
      //   formData.append("formula_equations", JSON.stringify(newArrayValues));
      //   // }
      //   promiseArray = [];

      //   const response = await apiClient(
      //     "product/calculator/calculator_multiple_save",
      //     "post",
      //     { body: formData },
      //     true
      //   );
      //   if (response.status === 200) {
      //     toast.success(response.message);
      //   } else {
      //     toast.error("Something went wrong. Please try after sometime!");
      //   }
      //   // }
      // }
    }
    dispatch(setUpdateLoader(false));
  }
);

export const getProductCalculator: any = createAsyncThunk(
  "productCalculator/getProductCalculator",
  async (payload: any, { dispatch, getState }) => {
    const { productId } = payload;

    const state: any = getState();
    const {
      productCalculatorInfo,
      selectedGroupData,
      productCalculatorHeader,
      equations,
    } = state.PricingCalculator;
    const formData = new FormData();
    formData.append("product_id", productId);
    try {
      // const response = await apiClient(
      //   "product/calculator",
      //   "get",
      //   { body: formData },
      //   true
      // );

      const APIResponse = await fetch(
        `${BASE_URL_V2}/product/calculator?product_id=${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );

      const response = await APIResponse.json();

      if (response?.status) {
        dispatch(setProductCalculatorInfo(response?.data));
        dispatch(setEquations(response?.equations));
        dispatch(setFinalEquationShow(response?.final_equation));
        // if (productCalculatorHeader == "Group") {
          dispatch(setSelectedGroupData(selectedGroupData ? selectedGroupData : response?.data?.[0]?.group_id || ''));
          dispatch(setFinalGroupEquation(response?.group_equation?.length > 0 ? response?.group_equation : []));
        // }
        // productCalculatorHeader == "Group"
        // // &&(
        // //   productCalculatorInfo?.[0]?.message == "similar" ||
        // //   productCalculatorInfo?.[0]?.message == "multilevel"
        // // )
        //   ? dispatch(
        //       setSelectedGroupData(
        //         selectedGroupData ? selectedGroupData : response?.data?.[0]?.id
        //       )
        //     )
        //   : null;

        dispatch(
          setMultiTableInfo(
            response.data
              ?.filter((element) => element?.level?.split(",")?.length > 1)
              ?.map((element, index) => ({ ...element, serialNo: index + 1 }))
          )
        );

        dispatch(
          setSimpleTableRowsLength(
            response?.data
              ?.filter(
                (element) =>
                  !element?.level || element?.level.split(",")?.length < 2
              )
              ?.map((ele) => ele?.total_parent)
              .reduce((acc, currValue) => acc + currValue, 0)
          )
        );

        dispatch(setProductCalculatorHeader(response.message));
      }
    } catch (error) {}
  }
);

export const productMultipleSave: any = createAsyncThunk(
  "productCalculator/productMultipleSave",
  async (payload: any, { dispatch, getState }) => {
    const { productId } = payload;
    const state: any = getState();
    const {
      productCalculatorHeader,
      payloadValuesForTableInitially,
      payloadValuesForMultiTableInitially,
    } = state.PricingCalculator;
    const formData = new FormData();
    formData.append("product_id", productId);
    if (productCalculatorHeader === "Group") {
      for (let i = 0; i < payloadValuesForTableInitially?.length; i++) {
        formData.append(
          "row_name[]",
          payloadValuesForTableInitially[i]?.row_name
        );
        formData.append(
          "attribute_id[]",
          payloadValuesForTableInitially[i]?.attribute_id
        );
      }
      const response = await apiClient(
        "product/calculator/calculator_multiple_check",
        "post",
        {
          body: formData,
        },
        true
      );

      if (response.status) {
        dispatch(setVariationTableValuesWithKeys(response.data));

        dispatch(
          setVariationTableValues(
            Object.fromEntries(
              response.data.map((element) => [
                element?.rowname,
                element?.price == "null" ? "" : element?.price,
              ])
            )
          )
        );
      }
    } else {
      for (let i = 0; i < payloadValuesForTableInitially?.length; i++) {
        formData.append(
          "row_name[]",
          payloadValuesForTableInitially[i]?.row_name
        );
        formData.append(
          "attribute_id[]",
          payloadValuesForTableInitially[i]?.attribute_id
        );
      }

      for (let i = 0; i < payloadValuesForMultiTableInitially?.length; i++) {
        formData.append(
          "row_name[]",
          payloadValuesForMultiTableInitially[i]?.key
        );
        formData.append(
          "attribute_id[]",
          payloadValuesForMultiTableInitially[i]?.attribute_id
        );
      }

      // return;

      const response = await apiClient(
        "product/calculator/calculator_multiple_check",
        "post",
        {
          body: formData,
        },
        true
      );
      if (response.status) {
        setVariationTableValuesWithKeys(response.data);
        dispatch(
          setVariationTableValues(
            Object.fromEntries(
              response.data.map((element) => [
                element?.rowname,
                element?.price == "null" ? "" : element?.price,
              ])
            )
          )
        );
      }
    }
  }
);

export const handleGroupEquationsData: any = createAsyncThunk(
  "productCalculator/handleGroupEquationsData",
  async (payload: any, { dispatch, getState }) => {
    const { productId } = payload;

    let payloads = {
      product_id: productId,
    };
    const response = await apiClient(
      "product/calculator/equation_final/list",
      "POST",
      {
        body: payloads,
      }
    );
    if (response.status === 200) {
      dispatch(setGroupEquationsDataForFinal(response?.data));
    }
  }
);

export const PricingCalculator = createSlice({
  name: "PricingCalculator",
  initialState,
  reducers: {
    setProductCalculatorInfo: (state, action) => {
      state.productCalculatorInfo = action.payload;
    },
    setProductCalculatorHeader: (state, action) => {
      state.productCalculatorHeader = action.payload;
    },
    setVariationTableValues: (state, action) => {
      state.variationTableValues = action.payload;
    },
    setEquations: (state, action) => {
      state.equations = action.payload;
    },
    setFinalEquationShow: (state, action) => {
      state.finalEquationShow = action.payload;
    },
    setMultiTableInfo: (state, action) => {
      state.multiTableInfo = action.payload;
    },
    setSelectedGroupData: (state, action) => {
      state.selectedGroupData = action.payload;
    },
    setSimpleTableRowsLength: (state, action) => {
      state.simpleTableRowsLength = action.payload;
    },
    setAllSpecs: (state, action) => {
      state.allSpecs = action.payload;
    },
    setRowFields: (state, action) => {
      state.rowFields = action.payload;
    },
    setMultiTableStartSerialHashMap: (state, action) => {
      state.multiTableStartSerialHashMap = action.payload;
    },
    setAllTerms: (state, action) => {
      state.allTerms = action.payload;
    },
    setPayloadValuesForTableInitially: (state, action) => {
      state.payloadValuesForTableInitially = action.payload;
    },
    setPayloadValuesForMultiTableInitially: (state, action) => {
      state.payloadValuesForMultiTableInitially = action.payload;
    },
    setVariationTableValuesWithKeys: (state, action) => {
      state.variationTableValuesWithKeys = action.payload;
    },
    setFinalGroup: (state, action) => {
      state.finalGroup = action.payload;
    },
    setGroupEquationsDataForFinal: (state, action) => {
      state.groupEquationsDataForFinal = action.payload;
    },
    setUpdateLoader: (state, action) => {
      state.updateLoader = action.payload;
    },
    setEmptyFieldsError: (state, action) => {
      state.emptyFieldsError = action.payload;
    },
    setFinalGroupEquation: (state, action) => {
      state.finalGroupEquation = action.payload;
    },
  },
});
export const {
  setFinalGroupEquation,
  setProductCalculatorInfo,
  setProductCalculatorHeader,
  setVariationTableValues,
  setEquations,
  setFinalEquationShow,
  setMultiTableInfo,
  setSelectedGroupData,
  setSimpleTableRowsLength,
  setAllSpecs,
  setRowFields,
  setMultiTableStartSerialHashMap,
  setAllTerms,
  setPayloadValuesForTableInitially,
  setPayloadValuesForMultiTableInitially,
  setVariationTableValuesWithKeys,
  setFinalGroup,
  setGroupEquationsDataForFinal,
  setUpdateLoader,
  setEmptyFieldsError,
} = PricingCalculator.actions;
export default PricingCalculator.reducer;
