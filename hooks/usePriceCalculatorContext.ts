import { useContext, useState } from "react";
import { MyPriceCalculatorContext } from "@/contextApi/priceCalculator";
import { apiClient } from "@/components/common/common";
// import useProductContext from "./useProductContext";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import EditProductFormik from "./useEditProductFormik";
export default function usePriceCalculatorContext() {
  const {
    allTerms,
    payloadValuesForTableInitially,
    setVariationTableValues,
    setVariationTableValuesWithKeys,
    multiTableInfo,
    setProductCalculatorInfo,
    setProductCalculatorHeader,
    setMultiTableInfo,
    productCalculatorHeader,
    productCalculatorInfo,
    setSimpleTableRowsLength,
    variationTableValues,
    payloadValuesForMultiTableInitially,
    setEquations,
  } = useContext(MyPriceCalculatorContext);

  // const { productId, matrixItems } = useProductContext();

  const { productId } = EditProductFormik();
  const [updateLoader, setUpdateLoader] = useState<any>(false);
  const [finalGroup, setFinalGroup] = useState<any>(false);
  const [selectedGroupData, setSelectedGroupData] = useState<any>('');
  const [groupFinalCalculation, setGroupFinalCalculation] = useState<any>([]);
  const [groupEquationsDataForFinal, setGroupEquationsDataForFinal] = useState<any>([]);
  const [finalEquationShow, setFinalEquationShow] = useState<any>([]);

  const handleGroupEquationsData = async () => {
    let payloads = {
      product_id: productId
    };
    const response = await apiClient("product/calculator/equation_final/list", "POST", {
      body: payloads,
    });
    if (response.status === 200) {
      setGroupEquationsDataForFinal(response?.data)
    }
  }
  const getProductCalculator = async () => {
    const formData = new FormData();
    formData.append("product_id", productId);
    try {
      const response = await apiClient(
        "product/calculator",
        "post",
        { body: formData },
        true
      );

      if (response?.status) {
        setProductCalculatorInfo(response?.data);
        setEquations(response?.equations);
        setFinalEquationShow(response?.final_equation)
        productCalculatorHeader == 'Group' && (productCalculatorInfo?.[0]?.message == "similar" || productCalculatorInfo?.[0]?.message == "multilevel") ? setSelectedGroupData(selectedGroupData ? selectedGroupData : response?.data?.[0]?.id) : null

        setMultiTableInfo(
          response.data
            ?.filter((element) => element?.level?.split(",")?.length > 1)
            ?.map((element, index) => ({ ...element, serialNo: index + 1 }))
        );

        setSimpleTableRowsLength(
          response?.data
            ?.filter(
              (element) =>
                !element?.level || element?.level.split(",")?.length < 2
            )
            ?.map((ele) => ele?.total_parent)
            .reduce((acc, currValue) => acc + currValue, 0)
        );

        setProductCalculatorHeader(response.message);
      }
    } catch (error) { }
  };


  function getUniqueListBy(arr, key = null) {
    if (key) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    }
    else {
      return [...new Set(arr)]
    }

  }


  let promiseArray = [];
  const listMatrix = async () => {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("per_page", '100');
    try {
      let lastPage = 1;
        formData.append("page", '1');
        const response = await fetch(`${BASE_URL}/product/matrix/list`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        });
        const data = await response.json();
        promiseArray.push(data?.data);
        lastPage = data?.lastPage
    } catch (error) {
      console.error(error);
    }
  };





  const updateProductCalculator = async (type = null, groupIndex = null, groupLength = null) => {
    setUpdateLoader(true);
    let formData = new FormData();
    formData.append("product_id", productId);
    let newArrayValues = [];

    await listMatrix();
    if (productCalculatorHeader == "similar") {

      let newArray = [];
      productCalculatorInfo
        .map((ele) => {
          ele?.newTerm?.map((element) => {
            element?.terms_list?.map((ele_term) => {
              newArray.push({
                id: ele_term?.id,
                value: ele_term?.attributes_values,
              })
            })
          })
          ele?.terms.map((element) => (
            newArray.push({
              id: element?.id,
              value: element?.attributes_values,
            })
          ))
        })
      for (let i = 0; i < newArray?.length; i++) {
        if (newArray[i].value == "null" || newArray[i].value == "") {
          toast.error("Please fill all the fields!");
          setUpdateLoader(false)
          return;
        }
      }

      if (newArray.includes) {
        for (let i = 0; i < newArray?.length; i++) {
          formData.append(
            `attributes_values[${newArray[i]?.id}]`,
            newArray[i]?.value
          );
        }
      }

      promiseArray?.flat()?.map((matrix) => {
        let splitEq = matrix.value.split("|");
        let dataEquations = [];
        let idsEquations = [];
        let tagsEquations = [];
        let tagsEquationsIds = [];
        splitEq.map((equations) => {
          productCalculatorInfo?.map((ele) => {
            let data = ele?.terms?.find((v) => v.name == equations) ?? {};
            if (Object.values(data).length > 0) {
              dataEquations.push(data.attributes_values);
              idsEquations.push(data.id);
              tagsEquations.push(ele.tag);
              tagsEquationsIds.push(ele.id);
            }
          })
        })
        newArrayValues.push({ id: matrix.id, value: matrix.value, new_value: dataEquations.join('|'), new_value_ids: idsEquations.join('|'), tags: tagsEquations.join('|'), ids: tagsEquationsIds.join('|') })
      })

      formData.append('formula_equations', JSON.stringify(newArrayValues));
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
      setUpdateLoader(false)
      return
    }

    if (productCalculatorHeader === "multilevel") {
      if (
        Object.entries(variationTableValues)?.filter((ele) => ele[1] == "")
          ?.length > 0
      ) {
        toast.error("Please fill all the fields!");
        setUpdateLoader(false)
        return;
      } else {
        const customValues = Object.entries(variationTableValues);
        for (let i = 0; i < customValues?.length; i++) {
          formData.append(
            `row_name[${customValues[i][0]}]`,
            customValues[i][1] == '0' || customValues[i][1] == null ? '0' as string : customValues[i][1] as string

          );
        }

        let Possiblevalue = [];

        let mainCombination = productCalculatorInfo.map((value, index) => {
          if (value.level) {
            let filterValue = productCalculatorInfo.find(item => item.id == value.level)
            let combination = value.terms.map((parent, i) => {
              return filterValue.terms.map(child => {
                return `${parent.name}-${child.name}`
              })
            })
            return combination.flat();
          }
        })

        promiseArray?.flat()?.map((matrix: any) => {
          let splitEq = matrix.value.split('|');
          let martixValue = matrix.value;          

          let filteredKey = []
          Object.keys(variationTableValues).forEach(value => {
            let keyValue = value.split('-')
            let lastValue = keyValue[keyValue.length - 1]
            let secondLastValue = keyValue[keyValue.length - 2]
            if (mainCombination.flat().filter(v => v).includes(`${secondLastValue}-${lastValue}`)) {
              filteredKey.push({ name: `${secondLastValue}-${lastValue}`, value: variationTableValues[value] })
            }
          })
          productCalculatorInfo.map(value => {
            if (value.level) {
              const { terms } = value
              let parentTerms = productCalculatorInfo.find(v => v.id == value.level).terms;
              let data = terms.map(childTerm => {
                return parentTerms.map(v => {
                  return `${childTerm.name}-${v.name}-${childTerm.id}-${v.id}`
                })
              })
              Possiblevalue.push(data.flat())
            }
          });

          let allPossiblevalue = Possiblevalue.flat()


          let filteredKeyData = filteredKey.filter(v => { if (v) return v })
          let filterDataKeys = []
          let allIds = filteredKeyData.forEach(v => {
            allPossiblevalue.forEach(item => {
              let [first, second, child, parent] = item.split('-')
              if (`${first}-${second}` == v.name) {
                let newVal = { ...v, parent, child };
                filterDataKeys.push(newVal)
              }
            })
          })


          let inputArray = martixValue.split('|')
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


          let finalArray: any = getUniqueListBy(filterDataKeys, 'name')
          let output = finalArray.map(value => {
            const { parent, child } = value
            if (outputArray.includes(value.name)) {
              dataEquations.push(value.value)
              idsEquations.push(child)
            }
          })

          let filterParent = productCalculatorInfo.filter(v => v.level == null)?.[0]?.terms.map(v => v.name)
          let Index = martixValue.split("|").findIndex(v => filterParent.includes(v))
          let filterParentID = productCalculatorInfo.filter(v => v.level == null)?.[0]?.terms.filter(v => v.name == martixValue.split("|")[Index]).map(v => v.id)
          if (filterParent) {
            dataEquations.splice(Index, 0, "0")
            idsEquations.splice(Index, 0, filterParentID)
          }

          let allParent = [];
          let all = splitEq?.map((split) => {
            productCalculatorInfo?.map((ele) => {
              return ele?.terms?.filter((fill) => {
                if (fill.name == split) {
                  allParent.push(fill.parent)
                }
              })
            })
          })

          let tagsName = [];
          let tagsIds = [];
          let allTag = allParent?.map((parent) => {
            let filterTag = productCalculatorInfo.filter(v => v.id == parent)?.[0];
            tagsName.push(filterTag?.tag)
            tagsIds.push(filterTag?.id)
          })

          newArrayValues.push({ id: matrix.id, value: matrix.value, new_value: dataEquations.join('|'), new_value_ids: idsEquations.join('|'), tags: tagsName.join('|'), ids: tagsIds.join('|') })
        });

        formData.append('formula_equations', JSON.stringify(newArrayValues));
        const response = await apiClient(
          "product/calculator/calculator_multiple_save",
          "post",
          { body: formData },
          true
        );
        if (response.status === 200) {
          toast.success(response.message);
          await productMultipleSave(productId)
        } else {
          toast.error("Something went wrong. Please try after sometime!");
        }
        setUpdateLoader(false)
        return
      }
    }

    if (productCalculatorHeader === "Group") {
      if (productCalculatorInfo[type].message == 'similar') {
        let newArray = [];
        productCalculatorInfo[type].newTerms
          .map((ele) => {
            ele?.newTerm?.map((element) => {
              element?.terms_list?.map((ele_term) => {
                newArray.push({
                  id: ele_term?.id,
                  value: ele_term?.attributes_values,
                })
              })
            })
            ele?.terms.map((element) => (
              newArray.push({
                id: element?.id,
                value: element?.attributes_values,
              })
            ))
          })

        for (let i = 0; i < newArray?.length; i++) {
          if (newArray[i].value == "null" || newArray[i].value == "") {
            toast.error("Please fill all the fields!");
            setUpdateLoader(false)
            return;
          }
        }

        if (newArray.includes) {
          for (let i = 0; i < newArray?.length; i++) {
            formData.append(
              `attributes_values[${newArray[i]?.id}]`,
              newArray[i]?.value
            );
          }
        }

        const requiredPayload = productCalculatorInfo[type].newTerms
          .map((ele) => ele?.terms)
          .flat()
          .map((element) => ({
            id: element?.id,
            value: element?.attributes_values,
          }));

        if (requiredPayload.includes) {
          for (let i = 0; i < requiredPayload?.length; i++) {
            formData.append(
              `attributes_values[${requiredPayload[i]?.id}]`,
              requiredPayload[i]?.value
            );
          }
        }

        if (groupIndex + 1 == groupLength) {
          promiseArray?.flat()?.map((matrix, index) => {
            let splitEq = matrix.value.split("|");
            let dataEquations = [];
            let idsEquations = [];
            let tagsEquations = [];
            let tagsEquationsIds = [];
            splitEq.map((equations) => {
              productCalculatorInfo?.map((mainElement, index) => {
                mainElement?.newTerms?.map((ele) => {
                  let data = ele?.terms?.find((v) => v.name == equations) ?? {};
                  if (Object.values(data).length > 0) {
                    dataEquations.push(data.attributes_values);
                    idsEquations.push(data.id);
                    tagsEquations.push(ele.tag);
                    tagsEquationsIds.push(ele.id);
                  }
                })
              })
            })
            newArrayValues.push({ id: matrix.id, value: matrix.value, new_value: dataEquations.join('|'), new_value_ids: idsEquations.join('|'), tags: tagsEquations.join('|'), ids: tagsEquationsIds.join('|') })
          })
          formData.append('formula_equations', JSON.stringify(newArrayValues));
        }

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
      } else {
        if (
          Object.entries(variationTableValues)?.filter((ele) => ele[1] == "")
            ?.length > 0
        ) {
          toast.error("Please fill all the fields!");
          setUpdateLoader(false)
          return;
        } else {
          const customValues = Object.entries(variationTableValues);
          for (let i = 0; i < customValues?.length; i++) {
            formData.append(
              `row_name[${customValues[i][0]}]`,
              customValues[i][1] == '0' || customValues[i][1] == null ? '0' as string : customValues[i][1] as string
            );
          }

          if (groupIndex + 1 == groupLength) {
            let allPossiblevalue = [];
            let mainCombination = productCalculatorInfo.map((groupLoop, index) => {
              return groupLoop?.newTerms.map((newTermsLoop, termindex) => {
                if (newTermsLoop.level) {
                  let filterValue = groupLoop?.newTerms?.find(item => item.id == newTermsLoop.level)
                  let combination = newTermsLoop.terms.map((parent, i) => {
                    return filterValue.terms.map(child => {
                      allPossiblevalue.push(`${child.name}-${parent.name}-${child.id}-${parent.id}`)
                      return `${parent.name}-${child.name}`
                    })
                  })
                  return combination.flat();
                }

              })
            }).flat().flat();
           
            promiseArray?.flat()?.map((matrix: any) => {
              let splitEq = matrix.value.split('|');
              let martixValue = matrix.value;
              let filteredKey = []
              Object.keys(variationTableValues).forEach(value => {
                let keyValue = value.split('-')
                let lastValue = keyValue[keyValue.length - 1]
                let secondLastValue = keyValue[keyValue.length - 2]
                if (mainCombination.filter(v => v).includes(`${secondLastValue}-${lastValue}`)) {
                  filteredKey.push({ name: `${secondLastValue}-${lastValue}`, value: variationTableValues[value] })
                }
              })

              let filteredKeyData = filteredKey.filter(v => { if (v) return v })
              let filterDataKeys = []

              filteredKeyData.forEach(v => {
                allPossiblevalue.forEach(item => {
                  let [first, second, child, parent] = item.split('-')
                  if (`${second}-${first}` == v.name) {
                    let newVal = { ...v, parent, child };
                    filterDataKeys.push(newVal)
                  }
                })
              })


              let inputArray = splitEq
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

              let finalArray: any = getUniqueListBy(filterDataKeys, 'name')

              outputArray.forEach(name => {
                return finalArray.forEach(val => {
                  if (val.name === name) {
                    const { parent, child } = val
                    dataEquations.push(val.value)
                    idsEquations.push(parent)
                  }
                })
              })

              let filterParent = productCalculatorInfo.map((groupLoop, index) => {
                return groupLoop?.newTerms.filter(v => v.level == null)?.[0]?.terms
              })

              let filterParents = []
              splitEq.findIndex((v, index) => {
                filterParent.flat().map((ele) => {
                  if (v == ele.name) {
                    filterParents.push({ name: ele.name, id: ele.id, index: index })
                  }
                })
              })

              if (filterParents) {
                filterParents.map((parent) => {
                  dataEquations.splice(parent.index, 0, "0")
                  idsEquations.splice(parent.index, 0, parent.id)
                })
              }

              let allParentTags = [];
              let allParentTagsIds = [];
              splitEq?.map((split) => {
                productCalculatorInfo?.map((mainLoop) => {
                  mainLoop?.newTerms.map((newTermsLoop) => {
                    return newTermsLoop?.terms?.filter((fill) => {
                      if (fill.name == split) {
                        allParentTags.push(newTermsLoop.tag)
                        allParentTagsIds.push(newTermsLoop.id)
                      }
                    })
                  })
                })
              })

              newArrayValues.push({ id: matrix.id, value: matrix.value, new_value: dataEquations.join('|'), new_value_ids: idsEquations.join('|'), tags: allParentTags.join("|"), ids: allParentTagsIds.join('|') })
            });
            console.log(newArrayValues, '==============newArrayValues')
            formData.append('formula_equations', JSON.stringify(newArrayValues));
          }
          const response = await apiClient(
            "product/calculator/calculator_multiple_save",
            "post",
            { body: formData },
            true
          );
          if (response.status === 200) {
            toast.success(response.message);
          } else {
            toast.error("Something went wrong. Please try after sometime!");
          }
        }
      }
    }
    setUpdateLoader(false)
  };

  const returnSumOfChildRowTillGivenSerialNumber = (num) => {
    if (!num) return;

    const returnValue = multiTableInfo
      ?.filter((ele) => ele?.serialNo <= num)
      ?.reduce(
        (acc, currValue) => acc.totalChildrenRows + currValue.totalChildrenRows
      );

    return returnValue;
  };

  const serialNumForTerm = (id) => {
    return allTerms.find((element) => element?.id == id)?.serialNo;
  };

  const productMultipleSave = async (productId) => {
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
        setVariationTableValuesWithKeys(response.data);
        setVariationTableValues(
          Object.fromEntries(
            response.data.map((element) => [
              element?.rowname,
              element?.price == "null" ? "" : element?.price,
            ])
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
        setVariationTableValues(
          Object.fromEntries(
            response.data.map((element) => [
              element?.rowname,
              element?.price == "null" ? "" : element?.price,
            ])
          )
        );
      }
    }

  };

  return {
    serialNumForTerm,
    productMultipleSave,
    returnSumOfChildRowTillGivenSerialNumber,
    getProductCalculator,
    updateProductCalculator,
    updateLoader,
    setUpdateLoader,
    finalGroup,
    setFinalGroup,
    selectedGroupData,
    setSelectedGroupData,
    groupFinalCalculation,
    setGroupFinalCalculation,
    handleGroupEquationsData,
    groupEquationsDataForFinal,
    setGroupEquationsDataForFinal,
    finalEquationShow,
    setFinalEquationShow,
    ...useContext(MyPriceCalculatorContext),
  };
}
