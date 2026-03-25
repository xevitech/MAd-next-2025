import { apiClient } from "@/components/common/common";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { LeadsData } from "./Interface";
import { toast } from "react-toastify";
import initialData from "../components/CRM/PageLayout/common/dummyData";
import axios from "axios";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
const initialState: LeadsData = {
  rowListing: initialData,
  copyFormData: null,
  sideBarListing: [],
  previewOpenModal: false,
  showImage: true,
  leadListingSaveResult: null,
  editProperty: false,
  editItems: "",
  editFieldsProperty: "",
  multiSelectPopUp: false,
  removedListItems: [],
  GridLayout: 6,
  loader: false,
  Saveloader: false,
  checkMenu: {},
  editColumn: "",
  skeleton: "",
};
export const LeadsListingSave: any = createAsyncThunk(
  "leads_list_save",
  async (payload: any, { getState }) => {
    const state: any = getState();
    const detail = state.LeadsData.copyFormData;
    let data = JSON.stringify({
      id: detail.id,
      type_id: detail.type_id,
      type_name: detail.type_name,
      user_id: detail.user_id,
      unique_id: detail.unique_id,
      form_data: payload?.formData,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/crm/default_form_input`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        return JSON.stringify(response);
      })
      .catch((error) => {
        return error;
      });
  }
);
export const SectionList: any = createAsyncThunk("sidebar_list", async () => {
  let response = await apiClient("crm/input_fields", "get");
  return response;
});

export const UnusedItems: any = createAsyncThunk(
  "unused_list",
  async (payload: any) => {
    let response = await apiClient(`crm/unused_input/${payload}`, "get");
    return response;
  }
);

export const DeleteFormList: any = createAsyncThunk(
  "delete_form_list",
  async (payload: any) => {
    let data = payload;
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/crm/form_section/${payload}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
);

export const LeadsListing: any = createAsyncThunk(
  "lead_list",
  async (payload, { getState, dispatch }) => {
    const userId = await JSON.parse(localStorage.getItem("userData"))?.id;
    const state: any = getState();
    const companyData = state.LeadsData.copyFormData;
    let type_id = companyData ? companyData.type_id : 1;
    let response = await apiClient(
      `crm/user_form_listing?type_name=${state.formList.typeName}&type_id=${state.formList.typeId}&user_id=${userId}`,
      "get"
    );
    return response;
  }
);

const LeadReducer = createSlice({
  name: "LeadsData",
  initialState,
  reducers: {
    setMultiSelectPopUp: (state, action) => {
      state.multiSelectPopUp = action.payload;
    },
    setSkeleton: (state, action) => {
      state.skeleton = action.payload[0];
    },
    setCheckMenu: (state, action) => {
      state.checkMenu = action.payload;
    },
    setRemovedUnusedItems: (state, action) => {
      state.removedListItems.splice(action.payload, 1);
    },
    setRowListing: (state, action) => {
      state.rowListing = action.payload;
    },
    setSaveLoader: (state, action) => {
      state.Saveloader = action.payload;
    },
    setPreviewModal: (state, action) => {
      state.previewOpenModal = action.payload;
    },
    setShowImage: (state, action) => {
      state.showImage = action.payload;
    },
    setGridColumn: (state, action) => {
      const { updateColumn, columnId } = action.payload;

      if (columnId?.tab_columns == "single") {
        state.GridLayout = 6;
      } else {
        state.GridLayout = 12;
      }
    },
    setEditItems: (state, action) => {
      state.editItems = action.payload.items;
      state.editColumn = action.payload.column;
    },
    setEditProperty: (state, action) => {
      const { status, editFields } = action.payload;
      state.editFieldsProperty = editFields;
      state.editProperty = status;
      state.editItems = editFields;
    },
    saveEditedProperty: (state, action) => {
      const { required, toolTip, editFields, options } = action.payload;

      if (required?.requiredProperty == "required") {
        state.rowListing.columnOrder.forEach((item) => {
          if (editFields?.section_id == item?.section_id) {
            const UpdatedProperty = [...item.form_fields];
            UpdatedProperty.map((newItem) => {
              if (newItem.id == editFields?.id) {
                newItem.is_required = "1";
              }
            });
            return (item.form_fields = UpdatedProperty);
          }
        });
      } else if (toolTip?.tooltipProperty == editFields?.label) {
        state.rowListing.columnOrder.forEach((item) => {
          if (editFields?.section_id == item?.section_id) {
            const UpdatedProperty = [...item.form_fields];
            UpdatedProperty.map((newItem) => {
              if (newItem.id == editFields?.id) {
                newItem.tooltip = toolTip?.tooltipProperty;
              }
            });
            return (item.form_fields = UpdatedProperty);
          }
        });
      } else {
        state.rowListing.columnOrder.forEach((item) => {
          if (editFields?.section_id == item?.section_id) {
            const UpdatedProperty = [...item.form_fields];
            UpdatedProperty.map((newItem) => {
              if (newItem.id == editFields?.id) {
                newItem.tooltip = toolTip?.tooltipProperty;
                newItem.option_list = options;
              }
            });
            return (item.form_fields = UpdatedProperty);
          }
        });
      }
    },

    setMenuItem: (state, action) => {
      const { ele, items } = action.payload;
      if (ele == "remove") {
        const removedFormList = items.column?.form_fields;
        let removedList: any;
        if (items.items?.id !== "") {
          removedList = removedFormList.filter(
            (newItem) => newItem?.id === items.items?.id
          );
        } else {
          removedList = removedFormList.filter(
            (newItem) =>
              newItem?.uniqueidForDrag === items.items?.uniqueidForDrag
          );
        }

        state.removedListItems = [...state.removedListItems, ...removedList];
        let updatedFields: any;
        if (items.items?.id !== "") {
          updatedFields = removedFormList.filter(
            (newItem) => newItem.id !== items.items?.id
          );
        } else {
          updatedFields = removedFormList.filter(
            (newItem) =>
              newItem.uniqueidForDrag !== items.items?.uniqueidForDrag
          );
        }

        state.rowListing.columnOrder.forEach((item) => {
          if (items.column?.section_id == item?.section_id) {
            return (item.form_fields = updatedFields);
          }
        });
      } else {
        state.rowListing.columnOrder.forEach((item) => {
          if (items?.section_id == item?.section_id) {
            return item.form_fields.map((newItem) => {
              if (newItem.id == items?.id && ele == "required") {
                if (newItem.is_required == "0") {
                  newItem.is_required = "1";
                } else {
                  newItem.is_required = "0";
                }
              } else {
                if (newItem.id == items?.id && ele == "duplicate") {
                  if (newItem.unique == 1) {
                    newItem.unique = 0;
                  } else {
                    newItem.unique = 1;
                  }
                }
              }
            });
          }
        });
      }
    },
    setEditName: (state, action) => {
      const { value, items } = action.payload;
      state.rowListing.columnOrder.forEach((item) => {
        if (item?.section_id == items?.section_id) {
          return item.form_fields.map((newItem) => {
            if (items?.uniqueidForDrag == newItem?.uniqueidForDrag) {
              newItem.name = value;
            }
          });
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SectionList.pending, (state, action) => {});
    builder.addCase(SectionList.fulfilled, (state, action) => {
      const updatedFields = [...action.payload?.data];
      updatedFields.forEach((ele) => (ele.is_removed = "1"));
      state.sideBarListing = updatedFields?.filter(
        (item) =>
          item?.field_type !== "tag" &&
          item?.field_type !== "section" &&
          item?.label !== "Multi Select Lookup" &&
          item?.label !== "Look Up" &&
          item?.label !== "Percent" &&
          item?.label !== "Long Integer" &&
          item?.label !== "Decimal" &&
          item?.label !== "Subform" &&
          item?.label !== "Social" &&
          item?.label !== "Timezone" &&
          item?.label !== "User" &&
          item?.label !== "Auto Number" &&
          item?.label !== "Formula" &&
          item?.label !== "Multi-Line" &&
          item?.field_type !== "file"
      );
    });

    builder.addCase(LeadsListing.pending, (state, action) => {
      state.loader = false;
    });
    builder.addCase(LeadsListing.fulfilled, (state, action) => {
      state.loader = true;
      state.rowListing.columnOrder = action.payload.data?.form_data.map(
        (item) => {
          const formFields = item.form_fields;
          const newObj = {
            ...item,
            dragged_id: uuid(),
            form_fields: formFields,
          };
          return newObj;
        }
      );
      let formData = [...action.payload.data?.form_data];
      formData.forEach((item) => {
        if (item.tab_columns == "single") {
          state.GridLayout = 12;
        } else {
          state.GridLayout = 6;
        }
      });
      state.copyFormData = action.payload.data;
      state.rowListing.columns = action.payload.data?.form_data.map(
        (item) => item.form_fields
      );
    });

    builder.addCase(LeadsListingSave.pending, (state, action) => {
      state.loader = false;
    });
    builder.addCase(LeadsListingSave.fulfilled, (state, action) => {
      state.loader = true;
      state.Saveloader = false;
      toast.success("form created successfully");
      state.leadListingSaveResult = action.payload;
    });
    builder.addCase(DeleteFormList.pending, (state, action) => {});
    builder.addCase(DeleteFormList.fulfilled, (state, action) => {});
    builder.addCase(UnusedItems.rejected, (state, action) => {});
    builder.addCase(UnusedItems.pending, (state, action) => {});

    builder.addCase(UnusedItems.fulfilled, (state, action) => {
      state.removedListItems = action.payload?.data;
    });
  },
});

export const {
  setRowListing,
  setPreviewModal,
  setShowImage,
  setEditName,
  setMenuItem,
  setEditProperty,
  saveEditedProperty,
  setMultiSelectPopUp,
  setRemovedUnusedItems,
  setGridColumn,
  setCheckMenu,
  setEditItems,
  setSaveLoader,
  setSkeleton,
} = LeadReducer.actions;

export default LeadReducer;
