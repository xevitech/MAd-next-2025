import Auth from "@/auth/Auth";
import { BASE_URL, BASE_URL_V2 } from "@/utils/staticValues";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient, per_page_data } from "@/components/common/common";
import { MultiSpecification } from "./Interface";
import { setCategoryMetaData, setMetaKeywords } from "./CategoryReducer";
import { data } from "jquery";
const initialState = {
  specificationsList: [],
  checkedSpec: [],
  specEdited: false,
  catId: "",
  suggestedSpecifications: [],
  specsData: "",
  pendingSpecs: "",
  selectedSpecs: "",
  commercialInfoUnits: "",
  specValue: "",
  UpdateLoader: false,
  passiveSpecList: [],
  loader: true,
  addNewLoader: true,
  renameGroupLoader: true,
  submitLoader: true,
  matrixItems: [],
  imageSrc: "",
  accordinIndex: 0,
  totalVariation: 0,
  matrixListPage: 1,
  levelParentError: false,
  parentMulError: false,
  matrixTableLoader: false,
} as MultiSpecification;
interface AddCustomSpecParams {
  productId: string;
  name: string;
  formik: any;
}

export const getSuggestedSpecificationsOrMeta: any = createAsyncThunk(
  "suggested/getcategory",
  async (catId: "") => {
    const formData = new FormData();
    if (!catId) {
      return;
    }

    formData.append("category_id", catId);
    const response = await apiClient(
      "product/suggested/by_category",
      "post",
      {
        body: formData,
      },
      true
    );
    return response;
  }
);

export const getSpecificationsList: any = createAsyncThunk(
  "specifications/getList",
  async ({ specEdited = false, id = "" }: any) => {
    // const formData = new FormData();
    // formData.append("product_id", id);
    try {
      const response = await fetch(`${BASE_URL_V2}/product/specifications_list?product_id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        // body: formData,
      });
      const data = await response.json();
      const payload = {
        data: data,
        id: id,
        specEdited: specEdited,
      };
      return payload;
    } catch (error) {}
  }
);
export const addCustomSpec: any = createAsyncThunk(
  "suggested/addCustomSpec",
  async (params: AddCustomSpecParams, thunkAPI) => {
    const formData = new FormData();

    formData.append("product_id", params?.productId);
    formData.append("name", params?.name);
    formData.append("published", "0");
    try {
      const response = await fetch(
        `${BASE_URL}/product/create/specifications`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );
      const res = await response.json();

      if (res.status === false) {
        params.formik.setFieldError(
          "specValue",
          "Please enter a unique value for the custom specification."
        );
        params.formik.setFieldValue("specValue", params?.name);
      } else if (res.status === true) {
        params.formik.setFieldError("specValue", "");
        params.formik.setFieldValue("specValue", "");
      }
    } catch (error) {}
  }
);
export const checkTerms: any = createAsyncThunk(
  "suggested/checkTerms",
  async ({ AccordianHandle = null, id = "", term_ids = "" }: any) => {
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("term_ids", term_ids);
    formData.append("published", "0");
    try {
      const response = await fetch(
        `${BASE_URL}/product/specifications/terms/checked`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (AccordianHandle) AccordianHandle();
      return data;
    } catch (error) {}
  }
);
export const deleteSpec: any = createAsyncThunk(
  "specifications/deleteSpec",
  async (payloads: any, { dispatch, getState }) => {
    const { deletespecId, productId } = payloads;
    const formData = new FormData();
    formData.append("id", deletespecId);
    formData.append("product_id", productId);
    formData.append("published", "0");
    try {
      const response = await fetch(
        `${BASE_URL_V2}/product/specification/delete`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );
      if (response.status == 200) {
        await dispatch(getSpecificationsList({ id: productId }));
        await dispatch(listMatrix({ productId }));
        await dispatch(getSpecsList(productId));
      }
    } catch (error) {}
  }
);
export const addTermUnderSpec: any = createAsyncThunk(
  "suggested/addTermUnderSpec",
  async (payloads: any, { dispatch, getState }) => {
    const { specId = "", newTerm = "", productId = "", formik } = payloads;
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("name", newTerm.replaceAll(" ", "_"));
    formData.append("parent", specId);
    formData.append("type", "active");
    formData.append("published", "0");
    dispatch(setAddLoader(true));
    try {
      const response = await fetch(
        `${BASE_URL}/product/create/specifications`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        formik.setFieldValue("terms", "");
        await dispatch(getSpecificationsList({ id: productId }));
        await dispatch(listMatrix({ productId }));
      }
      if (!data.status) {
        formik.setFieldError(
          "terms",
          "Duplicate options/terms are not allowed. "
        );

        formik.setFieldValue("terms", newTerm);
        return;
      }
    } catch (error) {}
  }
);

let promiseArray = [];

export const listMatrix: any = createAsyncThunk(
  "specifications/listMatrix",
  async (payloads: any, { dispatch, getState }) => {
    const { productId = "", searchParams = "" } = payloads;
    const state: any = getState();
    const { matrixListPage } = state?.calculatorData;
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("per_page", `${per_page_data}`);
    try {
      let lastPage = 1;
      formData.append("page", matrixListPage);
      const response = await fetch(`${BASE_URL}/product/matrix/list${searchParams.length > 0 ? `?search=${searchParams}` : ''}`, {
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
export const getSpecsList: any = createAsyncThunk(
  "suggested/getSpecsList",
  async (productId: "") => {
    if(productId == ''){
      return;
    }
    const formData = new FormData();
    formData.append("product_id", productId);
    const responseFetch = await fetch(`${BASE_URL_V2}/product/levels/pending?product_id=${productId}`, {
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      }, 
      // body:formData
    })
    // let response = await apiClient(
    //   "product/levels/pending",
    //   "GET",
    //   { body: formData },
    //   true
    // );
    const response = await responseFetch.json();
    let pendingList;
    let selectedList;
    const { pending, selected } = response;
    pendingList =
      pending?.map((element) => ({ ...element, selected: false })) ;
    selectedList =
      selected?.map((element) => ({ ...element, selected: true })) ;
    setPendingSpecs(pendingList);
    setSelectedSpecs(selectedList);
    // if (response.status === 200) {

    //   // setSpecsData(response?.payload);

    // }
    const payload = {
      pendingData: pendingList,
      selectedData: selectedList,
      responseData: response,
    };
    return payload;
  }
);

export const createLevels: any = createAsyncThunk(
  "levels/createLevels",
  async (payload: any, { dispatch, getState }) => {
    const {
      group_id = "",
      pendingSpecs = [],
      selectedSpecs = [],
      productId = "",
      levels,
      group="",
      type = "",
    } = payload;
    const state: any = getState();
    const { specsData } = state.calculatorData;
    // if (
    //   pendingSpecs?.filter((ele) => ele?.selected)?.length > 1 &&
    //   selectedSpecs?.length === 0
    // ) {
    // }

    // const pendingSpecsSelectedArray = pendingSpecs
    //   ?.filter((element) => element?.selected)
    //   .map((element) => element?.id);

    // const selectedSpecsSelectedArray = selectedSpecs
    //   ?.filter((element) => element?.selected)
    //   .map((element) => element?.id);

    // if (pendingSpecsSelectedArray.length === 0) {
    //   return;
    // }

    // if (
    //   selectedSpecs.length > 0 &&
    //   pendingSpecsSelectedArray.length > 0 &&
    //   selectedSpecsSelectedArray.length == 0 &&
    //   (specsData?.is_group == "no" ||
    //     (specsData?.is_group == "yes" && group_id != ""))
    // ) {
    //   dispatch(setLevelParentError(true));
    //   dispatch(setParentMulError(false));
    //   return;
    // }

    // if (
    //   selectedSpecs.length > 0 &&
    //   pendingSpecsSelectedArray.length > 0 &&
    //   selectedSpecsSelectedArray.length >= 2 &&
    //   (specsData?.is_group == "no" ||
    //     (specsData?.is_group == "yes" && group_id != ""))
    // ) {
    //   dispatch(setParentMulError(true));
    //   dispatch(setLevelParentError(false));
    //   return;
    // }

    const formData = new FormData();
    formData.append("product_id", productId);
    if (group_id !== "") {
      formData.append("group", "OLD");
      formData.append("group_id", group_id);
    }
    if (type == "similar" && group == '' ) {
      // formData.append("attributes", levels.join(","));
      // formData.append("parent_level", '');
      // console.log(levels, "levels");
      // return;
      await fetch(`${BASE_URL}/product/levels/createv2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: JSON.stringify({
          product_id: productId,
          attributes: levels.join(","),
          is_multi_specification: "NO",
        }),
      });
      // const response = await apiClient(
      //   "product/levels/createv2",
      //   "post",
      //   {
      //     body: {
      //       product_id: productId,
      //       attributes: levels.join(","),
      //       is_multi_specification: "NO",
      //     },
      //   }
      //   // true
      // );
      dispatch(setLevelParentError(false));
      dispatch(setParentMulError(false));
      await dispatch(getSpecsList(productId));
      return;
    }

    if (type == "multi" && group == '') {
      // formData.append("level_specification_key", JSON.stringify(levels));
      const response = await apiClient(
        "product/levels/createv2",
        "post",
        {
          body: {
            product_id: productId,
            level_specification_key: levels,
            is_multi_specification: "YES",
            published:0
          },
        }
        // true
      );
      dispatch(setLevelParentError(false));
      dispatch(setParentMulError(false));
      await dispatch(getSpecsList(productId));
      // await dispatch(listMatrix({ productId }));
      return;
    }

    if(group == 'NEW'){
      if (type == "similar") {
        // formData.append("attributes", levels.join(","));
        // formData.append("parent_level", '');
        // console.log(levels, "levels");
        // return;
        await fetch(`${BASE_URL}/product/levels/createv2`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: JSON.stringify({
            product_id: productId,
            attributes: levels.join(","),
            is_multi_specification: "NO",
            group:group
          }),
        });
        // const response = await apiClient(
        //   "product/levels/createv2",
        //   "post",
        //   {
        //     body: {
        //       product_id: productId,
        //       attributes: levels.join(","),
        //       is_multi_specification: "NO",
        //     },
        //   }
        //   // true
        // );
        dispatch(setLevelParentError(false));
        dispatch(setParentMulError(false));
        await dispatch(getSpecsList(productId));
        return;
      }
  
      if (type == "multi") {
        // formData.append("level_specification_key", JSON.stringify(levels));
        const response = await apiClient(
          "product/levels/createv2",
          "post",
          {
            body: {
              product_id: productId,
              level_specification_key: levels,
              is_multi_specification: "YES",
              group:group,
              published:0
            },
          }
          // true
        );
        dispatch(setLevelParentError(false));
        dispatch(setParentMulError(false));
        await dispatch(getSpecsList(productId));
        // await dispatch(listMatrix({ productId }));
        return;
      }
    }

    // formData.append("attributes", pendingSpecsSelectedArray.join(","));
    // formData.append("parent_level", selectedSpecsSelectedArray.join(","));
    setSubmitLoader(true);
    // try {
    //   const response = await apiClient(
    //     "product/levels/create",
    //     "post",
    //     { body: formData },
    //     true
    //   );
    //   dispatch(setLevelParentError(false));
    //   dispatch(setParentMulError(false));
    //   await dispatch(getSpecsList(productId));
    //   await dispatch(listMatrix({ productId }));

    //   return response;
    // } catch (error) {}
  }
);

export const addGroup: any = createAsyncThunk(
  "levels/addGroup",
  async (payload: any, { dispatch, getState }) => {
    const {
      productId='',
      groupData = [],
      type = "",
      group='',
    } = payload;
    const formData = new FormData();
    formData.append("product_id", productId);
    // formData.append("group", type);
    if (group == "NEW" && groupData?.length > 0 && type != "") {
      try {
        //here
        let bodyData:any = '';
        if(type =="multi"){
         bodyData =  {
            product_id: productId,
            group: group,
            is_multi_specification: "YES",
            level_specification_key: groupData,
            published:0
          }
        }else{
         bodyData = {
            product_id: productId,
            group: group,
            is_multi_specification: "NO",
            attributes: groupData,
            published:0
          }
        }

        const response = await fetch(`${BASE_URL}/product/level/group/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: JSON.stringify(bodyData),
        });

        const data = await response.json();

        if (response.ok) {
          await dispatch(getSpecsList(productId));
        }
      } catch (error) {}
    }else{
      try {
        const response = await fetch(`${BASE_URL}/product/level/group/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: JSON.stringify({ product_id: productId, published:0 }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          await dispatch(getSpecsList(productId));
        }
      } catch (error) {}
    }

  }
);

export const deleteTermOfSpec: any = createAsyncThunk(
  "suggested/deleteTermOfSpec",
  async (payloads: any, { dispatch, getState }) => {
    const { specId, id: termId, productId } = payloads;
    const formData = new FormData();

    formData.append("id", termId);
    formData.append("parent", specId);
    formData.append("product_id", productId);
    formData.append("published", "0");

    try {
      const response = await fetch(
        `${BASE_URL_V2}/product/delete/specifications`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );
      if (response.status == 200) {
        await dispatch(getSpecificationsList({ id: productId }));
        await dispatch(listMatrix({ productId }));
      }
    } catch (error) {}
  }
);

export const fetchConstantsList: any = createAsyncThunk(
  "suggested/fetchConstantsList",
  async (id: "") => {
    const formData = new FormData();
    formData.append("product_id", id);
    try {
      const response = await fetch(`${BASE_URL}/product/constants_list`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      const payload = {
        data,
      };
      return payload;
    } catch (error) {}
  }
);
export const removeLevelOrGroup: any = createAsyncThunk(
  "levels/removeLevelOrGroup",
  async (payload: any, { dispatch, getState }) => {
    const { id, isgroup = false, groupId, type, productId, label_id } = payload;
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("id", id);
    formData.append("published", "0");
    if (isgroup) {
      formData.append("group_id", groupId);
    }
    formData.append("product_attribute_label_id", label_id)

    try {
      const response = await fetch(`${BASE_URL}/product/levels/remove`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      await dispatch(listMatrix({ productId }));
      await dispatch(getSpecsList(productId));
    } catch (error) {}
  }
);
export const deleteMatrixItem: any = createAsyncThunk(
  "levels/deleteMatrixItem",
  async (payload: any, { dispatch, getState }) => {
    const { matrixId, productId } = payload;

    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("matrix_id", matrixId);
    formData.append("published", "0");

    try {
      const response = await fetch(`${BASE_URL}/product/matrix/delete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      await dispatch(listMatrix({ productId }));
    } catch (error) {}
  }
);
export const updateItem: any = createAsyncThunk(
  "levels/updateItem",
  async (payload: any, { dispatch, getState }) => {
    const {
      matrixId,
      price,
      images,
      removeAllImage = false,
      id,
      isDefault,
      status,
    } = payload;

    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("matrix_id", matrixId);
    formData.append("published", "0");
    if (isDefault) {
      formData.append("is_default", isDefault);
    }
    if (status) {
      formData.append("status", status);
    }
    if (price) {
      if (price) formData.append("price", price);
    }

    if (!removeAllImage) {
      // formData.append("image", image);
      for (let i = 0; i < images?.length; i++) {
        formData.append("image[]", images[i]);
      }
      formData.append("remove_image", removeAllImage);
    } else if (removeAllImage) {
      formData.append("remove_image", removeAllImage);
    }

    try {
      const response = await fetch(`${BASE_URL}/product/matrix/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response?.ok) {
        await dispatch(listMatrix({ productId: id }));
      }
      return data;
    } catch (error) {}
  }
);
export const saveGroupName: any = createAsyncThunk(
  "suggested/saveGroupName",
  async (payloads: any, { dispatch, getState }) => {
    const { productId, groupName, groupId } = payloads;
    setRenameGroupLoader(groupId);
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("name", groupName);
    formData.append("group_id", groupId);
    let response = await apiClient(
      "product/group/rename",
      "post",
      { body: formData },
      true
    );
    if (response.status === 200) {
      await dispatch(getSpecsList(productId));
    }
  }
);
export const calculatorDetail = createSlice({
  name: "calculatorDetail",
  initialState,
  reducers: {
    setSpecificationsList: (state, action) => {
      state.specificationsList = action.payload;
    },
    setPassiveSpecList: (state, action) => {
      state.passiveSpecList = action.payload;
    },
    setSpecValue: (state, action) => {
      state.specValue = action.payload;
    },
    setExpandedValue: (state, action) => {
      state.specValue = action.payload;
    },
    setCategoryId: (state, action) => {
      // state.catId = action.payload;
    },
    seCheckedSpecification: (state, action) => {
      state.specificationsList = action?.payload;
    },
    setSuggestedSpecifications: (state, action) => {
      state.suggestedSpecifications = action.payload;
    },
    setSpecsData: (state, action) => {
      state.specsData = action.payload;
    },
    setUpdateLoader: (state, action) => {
      state.UpdateLoader = action.payload;
    },
    setPendingSpecs: (state, action) => {
      state.pendingSpecs = action.payload;
    },
    setCommercialInfoUnits: (state, action) => {
      state.commercialInfoUnits = action.payload;
    },
    setSelectedSpecs: (state, action) => {
      state.selectedSpecs = action.payload;
    },
    setAddLoader: (state, action) => {
      state.loader = action.payload;
    },
    setAddNewLoader: (state, action) => {
      state.addNewLoader = action.payload;
    },
    setRenameGroupLoader: (state, action) => {
      state.renameGroupLoader = action.payload;
    },
    setSubmitLoader: (state, action) => {
      state.submitLoader = action.payload;
    },
    setMatrixItems: (state, action) => {
      state.matrixItems = action.payload;
    },
    setImageSrc: (state, action) => {
      state.imageSrc = action.payload;
    },
    setCheckedSpec: (state, action) => {
      state.checkedSpec = action.payload;
    },
    setAccordinIndex: (state, action) => {
      state.accordinIndex = action.payload;
    },
    setMatrixListPage: (state, action) => {
      state.matrixListPage = action.payload;
    },
    setLevelParentError: (state, action) => {
      state.levelParentError = action.payload;
    },
    setParentMulError: (state, action) => {
      state.parentMulError = action.payload;
    },
    setMatrixTableLoader: (state, action) => {
      state.matrixTableLoader = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSpecificationsList.pending, (state, action) => {});
    builder.addCase(getSpecificationsList.rejected, (state, action) => {});
    builder.addCase(getSpecificationsList.fulfilled, (state, action) => {
      if (!action?.payload?.specEdited) {
        state.specificationsList = action?.payload?.data?.message?.map(
          (element, index) => ({
            ...element,
            children: element?.parentboth,
            productId: element?.product_id,
            expanded: state.accordinIndex == index ? true : false,
            unit: element?.unit,
          })
        );
      } else {
        state.specificationsList = action?.payload?.data?.message.map(
          (element, index) => {
            if (element?.id == action?.payload?.id) {
              return {
                ...element,
                children: element?.parentboth,
                productId: element?.product_id,
                expanded: true,
                unit: element?.unit,
              };
            } else {
              return {
                ...element,
                children: element?.parentboth,
                productId: element?.product_id,
                expanded: false,
                unit: element?.unit,
              };
            }
          }
        );
      }
    });

    builder.addCase(
      getSuggestedSpecificationsOrMeta.pending,
      (state, action) => {}
    );
    builder.addCase(
      getSuggestedSpecificationsOrMeta.rejected,
      (state, action) => {}
    );
    builder.addCase(
      getSuggestedSpecificationsOrMeta.fulfilled,
      (state, action) => {
        const { meta, meta_keywords } = action.payload;

        setCategoryMetaData(meta);
        setMetaKeywords(meta_keywords);

        const formattedNamesSet = new Set(
          state?.specificationsList?.map((element: any) =>
            element?.name.replace(/_/g, " ")
          )
        );

        state.suggestedSpecifications = action?.payload?.specification?.map(
          (element) => ({
            ...element,
            selected: formattedNamesSet.has(element?.name),
          })
        );
      }
    );
    builder.addCase(checkTerms.rejected, (state, action) => {
      state.UpdateLoader = false;
    });
    builder.addCase(checkTerms.pending, (state, action) => {
      state.UpdateLoader = true;
    });
    builder.addCase(checkTerms.fulfilled, (state, action) => {
      state.UpdateLoader = false;
    });

    builder.addCase(fetchConstantsList.rejected, (state, action) => {});
    builder.addCase(fetchConstantsList.pending, (state, action) => {});
    builder.addCase(fetchConstantsList.fulfilled, (state, action) => {
      state.passiveSpecList = action.payload?.data?.message;
    });
    builder.addCase(addTermUnderSpec.rejected, (state, action) => {
      state.loader = false;
    });
    builder.addCase(addTermUnderSpec.pending, (state, action) => {
      state.loader = false;
    });
    builder.addCase(addTermUnderSpec.fulfilled, (state, action) => {
      state.loader = true;
    });

    builder.addCase(addCustomSpec.rejected, (state, action) => {
      state.addNewLoader = false;
    });
    builder.addCase(addCustomSpec.pending, (state, action) => {
      state.addNewLoader = false;
    });
    builder.addCase(addCustomSpec.fulfilled, (state, action) => {
      state.addNewLoader = true;
    });

    builder.addCase(getSpecsList.rejected, (state, action) => {});
    builder.addCase(getSpecsList.pending, (state, action) => {});
    builder.addCase(getSpecsList.fulfilled, (state, action) => {
      state.pendingSpecs = action.payload.pendingData;
      state.selectedSpecs = action.payload.selectedData;
      state.specsData = action.payload.responseData;
    });

    builder.addCase(createLevels.rejected, (state, action) => {
      state.submitLoader = false;
    });
    builder.addCase(createLevels.pending, (state, action) => {
      state.submitLoader = false;
    });
    builder.addCase(createLevels.fulfilled, (state, action) => {
      state.submitLoader = true;
    });
    builder.addCase(listMatrix.rejected, (state, action) => {});
    builder.addCase(listMatrix.pending, (state, action) => {});
    builder.addCase(listMatrix.fulfilled, (state, action) => {
      state.totalVariation = action?.payload?.data?.total;
      state.matrixItems = action?.payload?.data["data"];
      state.imageSrc = action.payload?.image?.source;
    });
  },
});
export const {
  setSpecificationsList,
  setSuggestedSpecifications,
  setSpecsData,
  setSelectedSpecs,
  seCheckedSpecification,
  setCommercialInfoUnits,
  setSpecValue,
  setUpdateLoader,
  setAddLoader,
  setAddNewLoader,
  setPendingSpecs,
  setRenameGroupLoader,
  setSubmitLoader,
  setMatrixItems,
  setImageSrc,
  setAccordinIndex,
  setMatrixListPage,
  setLevelParentError,
  setParentMulError,
  setMatrixTableLoader
} = calculatorDetail.actions;
export default calculatorDetail.reducer;
