import Auth from "@/auth/Auth";
import { apiClient, convertQuery } from "@/components/common/common";
import { crmApiClient } from "@/utils/apiClient/crmApiClient";
import { BASE_URL } from "@/utils/staticValues";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import { toast } from "react-toastify";

export const fetchAllFields: any = createAsyncThunk(
  "Fetch All Fields",
  async (payload: any, { getState }) => {
    const state: any = getState();
    const userId = await JSON.parse(localStorage.getItem("userData"))?.id;
    // let response = await apiClient(
    //   `crm/user_form_listing?type_name=${state.formList.typeName}&type_id=${state.formList.typeId}&user_id=${userId}`,
    //   "get"
    // );

    let response = await crmApiClient(
      `lead/addform?type_id=${
        payload?.typeId ? payload?.typeId : state?.formList?.typeId
      }`,
      "get"
    );

    return response;
  }
);

export const fetchFieldsForContactLead: any = createAsyncThunk(
  "Fetch Fields for contact leads",
  async (payload: any, { getState }) => {
    let response = await crmApiClient(
      `dynamic/form/lead/${payload?.contact_id}?type_id=1`,
      "get"
    );

    return response;
  }
);

export const fetchFieldsForContactDeal: any = createAsyncThunk(
  "Fetch Fields for contact deal",
  async (payload: any, { getState }) => {
    let response = await crmApiClient(
      `dynamic/form/deal/${payload?.contact_id}?type_id=2`,
      "get"
    );

    return response;
  }
);

export const fetchFieldsForAccountContact: any = createAsyncThunk(
  "Fetch Fields for Account contact",
  async (payload: any, { getState }) => {
    let response = await crmApiClient(
      `dynamic/form/account/contact/${payload?.account_id}?type_id=4`,
      "get"
    );

    return response;
  }
);

export const fetchFieldsForAccountLead: any = createAsyncThunk(
  "Fetch Fields for Account lead",
  async (payload: any, { getState }) => {
    let response = await crmApiClient(
      `dynamic/form/lead/account/${payload?.account_id}?type_id=1`,
      "get"
    );

    return response;
  }
);

export const fetchFieldsForAccountDeal: any = createAsyncThunk(
  "Fetch Fields for Account deal",
  async (payload: any, { getState }) => {
    let response = await crmApiClient(
      `dynamic/form/account/deal/${payload?.account_id}?type_id=2`,
      "get"
    );

    return response;
  }
);

export const saveFieldsData: any = createAsyncThunk(
  "Save All Fields",
  async (payloads: any, { dispatch }) => {
    var body = payloads;
    let response = await apiClient("crm/save_input_form", "post", {
      body,
    });
    if (response.status == 200) {
      dispatch(getAllFieldData());
    }
    return response;
  }
);
export const getAllFieldData: any = createAsyncThunk(
  "Get All saved Fields Data",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let custom_view_id = state.formList.customViewId
      ? state.formList.customViewId
      : "0";
    let filtersPayload =
      state.formList.filters.length > 0 ? state.formList.filters : "";
    let customFilterId = state.formList.customFilterId
      ? state.formList.customFilterId
      : "";
    let filterQuery = customFilterId?.id
      ? customFilterId.filter
      : filtersPayload;
    let querryNew = "";
    filterQuery?.length > 0 &&
      filterQuery?.map((ele, index) => {
        let operator = index == 0 ? "AND" : "OR";
        querryNew =
          querryNew +
          " " +
          operator +
          " (`section_form_id` = " +
          "'" +
          ele.id +
          "' AND " +
          convertQuery(ele.condition, ele.value);
      });
    let body = {
      type_name: state.formList.typeName,
      type_id: state.formList.typeId,
      custom_view_id: localStorage.getItem("view")
        ? localStorage.getItem("view")
        : custom_view_id,
      filters: customFilterId?.id ? customFilterId.filter : filtersPayload,
      filter_id: customFilterId?.id ? customFilterId?.id : "",
      query: querryNew,
      per_page: 100,
    };

    let response = await apiClient(`crm/data_listing`, "post", { body });
    return response;
  }
);
export const getLeadsAllFieldDataAndUpdateStates: any = createAsyncThunk(
  "Get All saved Fields Data",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let custom_view_id = state.formList.customViewId
      ? state.formList.customViewId
      : "0";
    let filtersPayload =
      state.formList.filters.length > 0 ? state.formList.filters : "";
    let customFilterId = state.formList.customFilterId
      ? state.formList.customFilterId
      : "";
    let filterQuery = customFilterId?.id
      ? customFilterId.filter
      : filtersPayload;
    let querryNew = "";
    filterQuery?.length > 0 &&
      filterQuery?.map((ele, index) => {
        let operator = index == 0 ? "AND" : "OR";
        querryNew =
          querryNew +
          " " +
          operator +
          " (`section_form_id` = " +
          "'" +
          ele.id +
          "' AND " +
          convertQuery(ele.condition, ele.value);
      });
    let body = {
      type_name: state.formList.typeName,
      type_id: state.formList.typeId,
      custom_view_id: localStorage.getItem("view")
        ? localStorage.getItem("view")
        : custom_view_id,
      filters: customFilterId?.id ? customFilterId.filter : filtersPayload,
      filter_id: customFilterId?.id ? customFilterId?.id : "",
      query: querryNew,
      per_page: 100,
    };
    console.log("consoling...");

    let response = await crmApiClient(`leads`, "post", { body });
    dispatch(setDataList(response?.data?.lead_data?.data));
    dispatch(setSavedDataFilters(response?.data?.lead_data?.save_filters));
    dispatch(setFilterDataKeys(response?.data?.lead_data?.filters));
    dispatch(setCustomizeColumn(response?.data?.lead_data?.setting_col));
    dispatch(setDefaultColumns(response?.data?.lead_data?.default_column_name));
    dispatch(
      setCustomViewFilter(response?.data?.lead_data?.custom_view_filter)
    );
    return response;
  }
);
export const getContactsAllFieldDataAndUpdateStates: any = createAsyncThunk(
  "Get All saved Fields Data",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let custom_view_id = state.formList.customViewId
      ? state.formList.customViewId
      : "0";
    let filtersPayload =
      state.formList.filters.length > 0 ? state.formList.filters : "";
    let customFilterId = state.formList.customFilterId
      ? state.formList.customFilterId
      : "";
    let filterQuery = customFilterId?.id
      ? customFilterId.filter
      : filtersPayload;
    let querryNew = "";
    filterQuery?.length > 0 &&
      filterQuery?.map((ele, index) => {
        let operator = index == 0 ? "AND" : "OR";
        querryNew =
          querryNew +
          " " +
          operator +
          " (`section_form_id` = " +
          "'" +
          ele.id +
          "' AND " +
          convertQuery(ele.condition, ele.value);
      });
    let body = {
      type_name: state.formList.typeName,
      type_id: state.formList.typeId,
      custom_view_id: localStorage.getItem("view")
        ? localStorage.getItem("view")
        : custom_view_id,
      filters: customFilterId?.id ? customFilterId.filter : filtersPayload,
      filter_id: customFilterId?.id ? customFilterId?.id : "",
      query: querryNew,
      per_page: 100,
    };

    let response = await crmApiClient(`contact/list`, "post", { body });
    dispatch(setDataList(response?.data?.contact_data?.data));
    dispatch(setSavedDataFilters(response?.data?.contact_data?.save_filters));
    dispatch(setFilterDataKeys(response?.data?.contact_data?.filters));
    dispatch(setCustomizeColumn(response?.data?.contact_data?.setting_col));
    dispatch(
      setDefaultColumns(response?.data?.contact_data?.default_column_name)
    );
    dispatch(
      setCustomViewFilter(response?.data?.contact_data?.custom_view_filter)
    );
    return response;
  }
);
export const getLeadsPersonaldetails: any = createAsyncThunk(
  "lead personal detail",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    const lead_id = payloads.lead_id;
    let response = await crmApiClient(`lead/info?lead_id=${lead_id}`, "get");
    // let parsedLeadInfo =
    //   typeof response?.data?.lead_info?.mobile_no === "string"
    //     ? JSON.parse(response?.data?.lead_info?.mobile_no)
    //     : response?.data?.lead_info?.mobile_no;
    // dispatch(setShowMobile(parsedLeadInfo));
    dispatch(setLeadPersonalSideBarData(response?.data?.lead_info));
    dispatch(setLeadPersonalSideAllData(response?.data));
    // dispatch((response?.data?.lead_info));
    return response;
  }
);
export const getAccountsPersonaldetails: any = createAsyncThunk(
  "accounts personal detail",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    const account_id = payloads.account_id;
    let response = await crmApiClient(`account/info/${account_id}`, "get");
    dispatch(setAccountPersonSideBarData(response?.data));
    return response;
  }
);
export const getContactsPersonaldetails: any = createAsyncThunk(
  "contacts personal detail",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    const contact_id = payloads.contact_id;
    let response = await crmApiClient(
      `contact/info-sidebar?contact_id=${contact_id}`,
      "get"
    );

    dispatch(setContactPersonSideBarData(response?.data));
    // (response?.data?.Account_data?.data));
    // setPersonalInfoData(response?.data);
    return response;
  }
);
export const getDealsPersonaldetails: any = createAsyncThunk(
  "deals personal detail",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    const deal_id = payloads.deal_id;
    let response = await crmApiClient(
      `deal/sidebar-info?deal_id=${deal_id}`,
      "get"
    );
    dispatch(setDealsPersonalSideBarData(response?.data));
    return response;
  }
);
export const getAccountsAllFieldDataAndUpdateStates: any = createAsyncThunk(
  "Get All saved Fields Data",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let custom_view_id = state.formList.customViewId
      ? state.formList.customViewId
      : "0";
    let filtersPayload =
      state.formList.filters.length > 0 ? state.formList.filters : "";
    let customFilterId = state.formList.customFilterId
      ? state.formList.customFilterId
      : "";
    let filterQuery = customFilterId?.id
      ? customFilterId.filter
      : filtersPayload;
    let querryNew = "";
    filterQuery?.length > 0 &&
      filterQuery?.map((ele, index) => {
        let operator = index == 0 ? "AND" : "OR";
        querryNew =
          querryNew +
          " " +
          operator +
          " (`section_form_id` = " +
          "'" +
          ele.id +
          "' AND " +
          convertQuery(ele.condition, ele.value);
      });
    let body = {
      type_name: state.formList.typeName,
      type_id: state.formList.typeId,
      custom_view_id: localStorage.getItem("view")
        ? localStorage.getItem("view")
        : custom_view_id,
      filters: customFilterId?.id ? customFilterId.filter : filtersPayload,
      filter_id: customFilterId?.id ? customFilterId?.id : "",
      query: querryNew,
      per_page: 100,
    };

    let response = await crmApiClient(`account/list`, "post", { body });
    dispatch(setDataList(response?.data?.Account_data?.data));
    dispatch(setSavedDataFilters(response?.data?.Account_data?.save_filters));
    dispatch(setFilterDataKeys(response?.data?.Account_data?.filters));
    dispatch(setCustomizeColumn(response?.data?.Account_data?.setting_col));
    dispatch(
      setDefaultColumns(response?.data?.Account_data?.default_column_name)
    );
    dispatch(
      setCustomViewFilter(response?.data?.Account_data?.custom_view_filter)
    );
    return response;
  }
);

export const getAllSavedViews: any = createAsyncThunk(
  "Get All Saved Views Data",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/custom_view?type_id=${state.formList.typeId}`,
      "get"
    );
    return response;
  }
);
export const getAllType: any = createAsyncThunk(
  "Get All Saved Views",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(`crm/type`, "get");
    return response;
  }
);

export const getSingleCustomViews: any = createAsyncThunk(
  "Get Single Custom View",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let custom_view_id = payloads;
    if (custom_view_id != 0 || custom_view_id != "") {
      let response = await apiClient(
        `crm/custom_view/${custom_view_id}`,
        "get"
      );
      return response;
    } else {
      return [];
    }
  }
);

export const deleteCustomViews: any = createAsyncThunk(
  "Delete Single Custom View",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let custom_view_id = state.formList.customViewId;
    let response = await apiClient(
      `crm/custom_view/${custom_view_id}`,
      "delete"
    );
    if (response.status == 200) {
      dispatch(setCustomViewId(""));
      dispatch(setSelectedViewName("All Leads"));
      dispatch(setCurrentCustomView([]));
      dispatch(getAllSavedViews());
      dispatch(getAllFieldData());
    }
    return response;
  }
);

export const saveCustomViewData: any = createAsyncThunk(
  "Save Custom View",
  async (payloads: any, { dispatch, getState }) => {
    var body = payloads;
    const state: any = getState();
    let customViewId = localStorage.getItem("view")
      ? localStorage.getItem("view")
      : state.formList.customViewId;

    let url = customViewId
      ? "lead/custom-index-save" + customViewId
      : "lead/custom-index-save";
    let method = customViewId ? "put" : "post";
    let response = await crmApiClient(url, method, { body });
    if (response.status == 200 || response.status) {
      if (customViewId) {
        dispatch(setSaveLoader(true));
        console.log(body.name, "body.name");

        dispatch(setSelectedViewName(body.name));
        dispatch(setCustomViewId(customViewId));
        dispatch(getAllSavedViews());
        dispatch(getAllFieldData());
        dispatch(setOpenCustomView(false));
      } else {
        dispatch(setSaveLoader(true));
        dispatch(setSelectedViewName(response.data.name));
        dispatch(setCustomViewId(response.data.id));
        localStorage.setItem("view", response.data.id);
        dispatch(getAllSavedViews());
        dispatch(getAllFieldData());
        dispatch(setOpenCustomView(false));
      }
    }
    return response;
  }
);

export const saveFilterData: any = createAsyncThunk(
  "Save Filter Name and Data",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let custom_view_id = state.formList.customViewId
      ? state.formList.customViewId
      : "0";
    let filtersPayload =
      state.formList.filters.length > 0 ? state.formList.filters : "";
    let body = {};
    let querryNew = "";
    filtersPayload?.length > 0 &&
      filtersPayload?.map((ele, index) => {
        let operator = index == 0 ? "AND" : "OR";
        querryNew =
          querryNew +
          " " +
          operator +
          " (`section_form_id` = " +
          "'" +
          ele.id +
          "' AND " +
          convertQuery(ele.condition, ele.value);
      });
    if (state.formList.currentFilterId?.id) {
      body = {
        name: payloads.name,
        filter_id:
          state.formList.currentFilterId && state.formList.currentFilterId?.id,
      };
    } else {
      body = {
        name: payloads.name,
        type_name: state.formList.typeName,
        type_id: state.formList.typeId,
        custom_view_id: custom_view_id,
        filters: filtersPayload,
        total_results: payloads.total,
        query: querryNew,
      };
    }

    let response = await crmApiClient(`lead/filter-save`, "post", { body });
    return response;
  }
);

export const deleteFilterSavedData: any = createAsyncThunk(
  "Delete Filter Saved Data",
  async (payloads: any) => {
    let response = await crmApiClient(
      `lead/filter-delete/` + payloads,
      "delete"
    );
    return response;
  }
);

export const updateFiledsData: any = createAsyncThunk(
  "Update Field Data",
  async (payloads: any) => {
    let body = {
      unique_id: payloads.unique_id,
      section_form_id: payloads.section_form_id,
      value: payloads.value,
      crm_user_form_unique_id: payloads?.crm_user_form_unique_id,
      type_id: payloads?.type_id,
      form_input_list_id: payloads?.form_input_list_id,
    };
    let response = await apiClient(`crm/update_datalisting_fields`, "post", {
      body,
    });
    return response;
  }
);

export const deleteLeadSavedData: any = createAsyncThunk(
  "Delete Lead Saved Data",
  async (payloads: any) => {
    let response = await apiClient(
      `crm/delete_lead?unique_id=${payloads.unique_id}&crm_user_form_unique_id=${payloads.crm_user_form_unique_id}`,
      "delete"
    );
    return response;
  }
);

export const sendEmailOrSchedule: any = createAsyncThunk(
  "Send Email Or Schedule Email",
  async (payloads: any, { getState }) => {
    let body = payloads;
    const state: any = getState();
    if (state.formList?.draftData) {
      let response = await apiClient(
        `crm/emails/create_emails/${state.formList?.draftData?.id}`,
        "put",
        {
          body,
        }
      );
      return response;
    } else {
      let response = await apiClient(`crm/emails/create_emails`, "post", {
        body,
      });
      return response;
    }
  }
);

export const EditSingleLead: any = createAsyncThunk(
  "Single Lead",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let url: any;
    if (state.formList?.typeName == "Leads") {
      let form_input_data = JSON.parse(localStorage.getItem("form_input_data"));
      url = `crm/single_lead_form_detail?unique_id=${payloads.unique_id}&type_id=${state.formList.typeId}&crm_user_form_unique_id=${payloads.crm_user_form_unique_id}&form_input_list_id_email=${form_input_data?.form_input_list_id}&form_input_list_id=${form_input_data?.form_input_list_id_email}`;
    } else {
      url = `crm/single_lead_form_detail?unique_id=${payloads.unique_id}&type_id=${state.formList.typeId}&crm_user_form_unique_id=${payloads.crm_user_form_unique_id}`;
    }
    let response = await apiClient(url, "get");
    return response;
  }
);
export const EditTaskCallMeeting: any = createAsyncThunk(
  "Single Task Call",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let url: any;
    url = `crm/task_information/show_details/${payloads?.id}`;

    let response = await apiClient(url, "get");
    return response;
  }
);

export const getListOfUsersAndSubUsers: any = createAsyncThunk(
  "Get Users List",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(`crm/userList`, "get");
    return response;
  }
);
export const getLeadsList: any = createAsyncThunk(
  "Get Leads List",
  async (payload: any) => {
    let url = `lead/list`;
    if (payload?.typeName == "Leads") {
      url = `lead/list?lead_id=${payload?.id}`;
    } else if (payload?.typeName == "Contacts") {
      url = `lead/list?contact_id=${payload?.id}`;
    } else if (payload?.typeName == "Accounts") {
      url = `lead/list?account_id=${payload?.id}`;
    }
    let response = await crmApiClient(url, "get");
    return response;
  }
);

export const getAllListOfTags: any = createAsyncThunk(
  "Get List of all tags",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let per_page = 1000;
    let response = await crmApiClient(`tag/index`, "get");
    return response;
  }
);

export const createListOfTags: any = createAsyncThunk(
  "create List of tags",
  async (payloads: any, { dispatch, getState }) => {
    let url = "tag/create";
    let methode = "POST";
    const state: any = getState();
    if (payloads?.id) {
      methode = "POST";
      url = `tag/create`;
    }
    let response = await crmApiClient(url, methode, { body: payloads });
    if (response.status == 200) {
      if (
        state.formList.typeId != 5 &&
        state.formList.typeId != 6 &&
        state.formList.typeId != 7
      ) {
        await dispatch(getAllFieldData());
      } else {
        await dispatch(informationTaskMeetingCalls());
      }
      await dispatch(getAllListOfTags());
    }
    return response;
  }
);

export const deleteListOfTags: any = createAsyncThunk(
  "delete List of tags",
  async (payloads: any, { dispatch, getState }) => {
    const state: any = getState();
    if (payloads) {
      let response = await apiClient(`crm/crm_tags/bulk_delete`, "delete", {
        body: {
          id: payloads,
          type_id: state.formList.typeId,
          unique_id: state.formList.details.unique_id,
        },
      });
      state.formList.typeId != 5 &&
        state.formList.typeId != 6 &&
        state.formList.typeId != 7 &&
        dispatch(getAllListOfTags());
      return response;
    } else {
      toast.error("Empty Fields");
      return;
    }
  }
);
export const updateListOfTags: any = createAsyncThunk(
  "update List of tags",
  async (payloads: any, { dispatch }) => {
    let response = await apiClient(
      `crm/crm_tags/create_crm_tags/${payloads[0].id}`,
      "PUT",
      {
        body: payloads[0],
      }
    );
    dispatch(getAllListOfTags());
    return response;
  }
);
export const updateEachTask: any = createAsyncThunk(
  "update Task",
  async (payloads: any, { dispatch }) => {
    let response = await apiClient(
      `crm/task_information/update/${payloads?.id}`,
      "PUT",
      {
        body: payloads?.data,
      }
    );
    if (response.status == 200 || response.status == true) {
      dispatch(informationTaskMeetingCalls());
    }

    return response;
  }
);
export const updateEachMeeting: any = createAsyncThunk(
  "update Meeting",
  async (payloads: any, { dispatch, getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/meeting_information/update/${payloads?.id}`,
      "PUT",
      {
        body: payloads?.data,
      }
    );
    if (response.status == 200 || response.status == true) {
      dispatch(informationTaskMeetingCalls());
    }

    return response;
  }
);

export const updateEachCall: any = createAsyncThunk(
  "update Call",
  async (payloads: any, { dispatch, getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/call_information/update/${payloads?.id}`,
      "PUT",
      {
        body: payloads?.data,
      }
    );
    if (response.status == 200 || response.status == true) {
      dispatch(informationTaskMeetingCalls());
    }

    return response;
  }
);

export const getAllListOfEmails: any = createAsyncThunk(
  "Get List of all emails",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/emails/create_emails?crm_unique_id=${
        state.formList.emailIdToSender.id
          ? state.formList.emailIdToSender.id
          : state.formList.details.unique_id
      }`,
      "get"
    );
    return response;
  }
);

export const getKanbanList: any = createAsyncThunk(
  "Kanban List ",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let aggregate_kanban =
      state.formList.savedFieldData?.data?.form_fields_data?.find(
        (item) => item?.name == "Annual_Revenue"
      )?.id;
    let custom_view_id = state.formList.customViewId
      ? state.formList.customViewId
      : "0";
    let filtersPayload =
      state.formList.filters.length > 0 ? state.formList.filters : "";
    let customFilterId = state.formList.customFilterId
      ? state.formList.customFilterId
      : "";
    let filterQuery = customFilterId?.id
      ? customFilterId.filter
      : filtersPayload;
    let querryNew = "";
    filterQuery?.length > 0 &&
      filterQuery?.map((ele, index) => {
        let operator = index == 0 ? "AND" : "OR";
        querryNew =
          querryNew +
          " " +
          operator +
          " (`section_form_id` = " +
          "'" +
          ele.id +
          "' AND " +
          convertQuery(ele.condition, ele.value);
      });
    let queryParams = new URLSearchParams({
      custom_view_id: custom_view_id,
      filters: customFilterId?.id ? customFilterId.filter : filtersPayload,
      filter_id: customFilterId?.id ? customFilterId.id : "",
      query: querryNew,
      kanban_aggergate: aggregate_kanban,
    });

    queryParams.set("type_name", state.formList.typeName);
    queryParams.set("type_id", state.formList.typeId);
    queryParams.set("per_page", "10"); // Adjust the per_page value as needed

    let url = `${BASE_URL}/crm/kanbon_data_list?${queryParams}`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
    });
    const status = response.status;
    const data = await response.json();
    return data;
  }
);

export const createKanbanView: any = createAsyncThunk(
  " create kanban view ",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(`crm/store_kanbon_view`, "post", {
      body: { crm_user_form_unique_id: "", type_id: "" },
    });
    return response;
  }
);

export const deleteAllSelectedEmail: any = createAsyncThunk(
  "Delete all selected emails",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let response = await apiClient(`crm/emails/delete_myemails`, "delete", {
      body: { id: state.formList.emailIds.join(",") },
    });
    if (response.status == 200 || response.status == true) {
      dispatch(getAllListOfEmails());
    }
    return response;
  }
);

export const createNotes: any = createAsyncThunk(
  "Create New Notes",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let url = "crm/notes/create_notes";
    let method = "post";
    if (payloads.id) {
      url = "crm/notes/create_notes/" + payloads.id;
      method = "PUT";
    }
    let response = await apiClient(url, method, {
      body: {
        unique_id: state.formList.details.unique_id,
        message: payloads.body,
        type_id: state.formList.typeId,
      },
    });
    if (response.status == 200 || response.status == true) {
      dispatch(getAllListOfNotes());
    }
    return response;
  }
);

export const getAllListOfNotes: any = createAsyncThunk(
  "Get List of all Notes",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/notes/create_notes?unique_id=${state.formList.details.unique_id}&type_id=${state.formList.typeId}`,
      "get"
    );
    return response;
  }
);

export const deleteNotes: any = createAsyncThunk(
  "Delete Notes Data",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/notes/create_notes/${payloads}`,
      "delete"
    );
    if (response.status == 200 || response.status == true) {
      dispatch(getAllListOfNotes());
    }
    return response;
  }
);

export const getAllListOfCRMFiles: any = createAsyncThunk(
  "Get List of all CRM Files",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/show_crm_images/${state.formList.details.unique_id}/${state.formList.typeId}`,
      "get"
    );
    return response;
  }
);

export const uploadFilesForCRM: any = createAsyncThunk(
  "CRM Upload Files",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    const formData = new FormData();
    formData.append("unique_id", state.formList.details.unique_id);
    formData.append("associated_for", `crm,${state.formList.typeId}`);
    for (let i = 0; i < payloads?.length; i++) {
      if (payloads[i]?.name) {
        formData.append("images[]", payloads[i]);
      }
    }
    let response = await apiClient(
      "crm/crm_save_file",
      "post",
      { body: formData },
      true
    );
    if (response.status == 200 || response.status == true) {
      dispatch(getAllListOfCRMFiles());
    }
    return response;
  }
);

export const uploadFilesForCRMV1: any = createAsyncThunk(
  "CRM Upload Files",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    const formData = new FormData();
    // formData.append("lead_id", state.formList.details.unique_id);
    // formData.append("associated_for", `crm,${state.formList.typeId}`);
    // for (let i = 0; i < payloads?.length; i++) {
    //   if (payloads[i]?.name) {
    //     formData.append("file", payloads[i]);
    //   }
    // }
    let response = await crmApiClient("lead/file-upload", "post", {
      body: { lead_id: "1254545", file: [] },
    });
    if (response.status == 200 || response.status == true) {
      dispatch(getAllListOfCRMFiles());
    }
    return response;
  }
);
export const uploadFile: any = createAsyncThunk(
  "CRM Upload Files",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    const formData = new FormData();
    formData.append("unique_id", state.formList.details.unique_id);
    formData.append("associated_for", `crm,${state.formList.typeId}`);
    for (let i = 0; i < payloads?.length; i++) {
      if (payloads[i]?.name) {
        formData.append("images[]", payloads[i]);
      }
    }
    let response = await apiClient(
      "crm/crm_save_file",
      "post",
      { body: formData },
      true
    );
    if (response.status == 200 || response.status == true) {
      dispatch(getAllListOfCRMFiles());
    }
    return response;
  }
);
export const deleteFilesForCRM: any = createAsyncThunk(
  "Delete CRm Files Data",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let response = await apiClient(`crm/delete_crm_images`, "post", {
      body: { id: payloads, type_id: state.formList.typeId },
    });
    if (response.status == 200 || response.status == true) {
      dispatch(getAllListOfCRMFiles());
    }
    return response;
  }
);

export const createTaskAndSchedule: any = createAsyncThunk(
  "Create Task and Schedule",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let body = payloads;
    let url = "crm/task_information/create";
    let method = "post";
    if (payloads.id) {
      url = "crm/task_information/update/" + payloads.id;
      method = "PUT";
    }
    let response = await apiClient(url, method, { body });
    return response;
  }
);

export const getDetailOfSingleTasks: any = createAsyncThunk(
  "Get detail of single Task",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let url = "";
    if (payloads.type == "task") {
      // url = `crm/task_information/show_details/${payloads.id}`;
      url = `lead/task/show/${payloads?.id}`;
    } else if (payloads.type == "meeting") {
      // url = `meeting/show/${payloads.id}`;
      url = `meeting/show/${payloads.id}`;
    } else if (payloads.type == "email") {
      url = `lead/activitiy_email/show/${payloads.id}`;
    } else {
      // url = `crm/call_information/show/${payloads.id}`;
      url = `call/show/${payloads.id}`;
    }
    // let response = await apiClient(url, "get");
    let response = await crmApiClient(url, "get");
    return response;
  }
);

export const getAllListOfTasks: any = createAsyncThunk(
  "Get List of all Tasks",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    // let response = await apiClient(`crm/task_information/get_list`, "post", {
    let response = await crmApiClient(`lead/task/list/${payloads}`, "get");
    return response;
  }
);

export const getAllListOfContactTasks: any = createAsyncThunk(
  "Get List of all Contact Tasks",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(
      `contact/activity/list/${payloads}`,
      "get"
    );
    return response;
  }
);

export const getAllListOfAccountTasks: any = createAsyncThunk(
  "Get List of all Account Tasks",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(
      `account/activity/list/${payloads}`,
      "get"
    );
    return response;
  }
);

export const getAllListOfDealTasks: any = createAsyncThunk(
  "Get List of all Deal Tasks",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(`deal/activity/list/${payloads}`, "get");
    return response;
  }
);

export const getAllActivityData: any = createAsyncThunk(
  "Get Activity Data",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/task_information/all-call-task-meeting`,
      "get"
    );
    return response;
  }
);

export const deleteTasks: any = createAsyncThunk(
  "Delete Tasks",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let response = await apiClient(
      payloads.type == "task"
        ? `crm/task_information/destroy/${payloads.id}`
        : payloads.type == "calls"
        ? `crm/call_information/destroy/${payloads.id}`
        : `crm/meeting_information/destroy/${payloads.id}`,
      "delete"
    );
    return response;
  }
);

export const createMeetings: any = createAsyncThunk(
  "Create New Meeting and Invite",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let url = "crm/meeting_information/create";
    let method = "post";
    if (payloads.id) {
      url = "crm/meeting_information/update/" + payloads.id;
      method = "PUT";
    }

    let response = await apiClient(url, method, {
      body: payloads,
    });
    return response;
  }
);

export const createAndScheduleCalls: any = createAsyncThunk(
  "Create New Call and Scheduled",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let url = "crm/call_information/create";
    let method = "post";
    if (payloads.id) {
      url = "crm/call_information/update/" + payloads.id;
      method = "PUT";
    }

    let response = await apiClient(url, method, {
      body: payloads,
    });
    return response;
  }
);

export const getAllListOfInvitedMeetings: any = createAsyncThunk(
  "Get List of all Invited Meetings",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/meeting_information/list/${state.formList.details.unique_id}`,
      "get"
    );
    return response;
  }
);

export const getAllReminder: any = createAsyncThunk(
  "Get all Reminder",
  async (payloads: any, { getState }) => {
    //  setshowSkelton(true);
    let response = await crmApiClient(`reminder/index`, "get");
    if (response?.status == 200 || response?.status == true) {
      // setshowSkelton(false);
      // const sortedData = _.sortBy(response?.data?.task?.data, function (dateObj) {
      //   return dateObj.reminder_date_time;
      // });
      const previousMeetings = response?.data?.task?.data.filter(
        (task: any) => {
          // if (task.id) {
          const currentDate = moment();
          const reminderDate = moment(task.reminder_date_time);
          return reminderDate.isSameOrBefore(
            currentDate.subtract(1, "days"),
            "day"
          );
          // }
          //   return false;
        }
      );
      // setpreviousDate(previousMeetings)

      const todaysMeetings = response?.data?.task?.data.filter((task: any) => {
        // if (task.id) {
        const currentDate = moment();
        const reminderDate = moment(task.reminder_date_time);
        return reminderDate.isSame(currentDate, "day");
        // }
        // return false;
      });
      // setCurrentDate(todaysMeetings);
      return {
        previousMeetings,
        todaysMeetings,
      };
    }
  }
);

export const deleteInvitedMeetings: any = createAsyncThunk(
  "Delete data of Invited Meetings",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/meeting_information/destroy/${payloads}`,
      "DELETE"
    );
    if (response.status == 200 || response.status == true) {
      dispatch(getAllListOfInvitedMeetings());
    }
    return response;
  }
);

export const getEnquiryDetails: any = createAsyncThunk(
  "Get List of all Enquiry",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/crmproducts?per_page=1&lead_id=${state.formList.details.unique_id}`,
      "get"
    );
    return response;
  }
);

export const leadActivity: any = createAsyncThunk(
  "Get List of all Activities",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    const typeName = state?.formList?.typeName;
    const uniqueId = payloads ? payloads : state.formList.details.unique_id;
    const typeId = state.formList.typeId;

    let queryParam = "";

    switch (typeName) {
      case "Contacts":
        queryParam = `contact_id=${uniqueId}`;
        break;
      case "Accounts":
        queryParam = `account_id=${uniqueId}`;
        break;
      case "Deals":
        queryParam = `deal_id=${uniqueId}`;
        break;
      case "Leads":
        queryParam = `lead_id=${uniqueId}`;
        break;
      default:
        throw new Error("Invalid typeName provided in state.formList");
    }

    const url = `crm/activities/list?${queryParam}&type_id=${typeId}`;

    const response = await apiClient(url, "get");

    return response;
  }
);

export const createHistory: any = createAsyncThunk(
  "Create New History",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let response = await apiClient(`crm/activities/create`, "post", {
      body: payloads,
    });
    if (response.status == 200 || response.status == true) {
      dispatch(leadActivity());
    }
    return response;
  }
);

export const TaskMeetingCallsActivity: any = createAsyncThunk(
  "Get List of all Activities of Tasks Meeting Calls",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/activities/list?lead_id=${payloads}&type_id=${state.formList.typeId}`,
      "get"
    );
    return response;
  }
);

export const createTaskMeetingCallsHistory: any = createAsyncThunk(
  "Create New History of Tasks Meeting Calls",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let response = await apiClient(`crm/activities/create`, "post", {
      body: {
        ...payloads,
        type_id: state.formList.typeId,
      },
    });
    if (response.status == 200 || response.status == true) {
      dispatch(TaskMeetingCallsActivity(state?.formList.singleActivity?.id));
    }
    return response;
  }
);

export const informationTaskMeetingCalls: any = createAsyncThunk(
  "Get Task Meeting Calls",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let response = await apiClient(
      state.formList.typeName == "Tasks"
        ? `crm/task_information/index`
        : state.formList.typeName == "Meetings"
        ? `crm/meeting_information/index`
        : `crm/call_information/index`,
      "post",
      {
        body: {
          ...payloads,
          per_page: 100,
          type_id: state.formList.typeId,
          typeName: state.formList.typeName,
          filter_id: state.formList.customFilterId?.id
            ? state.formList.customFilterId?.id
            : "",
        },
      }
    );
    return response;
  }
);

export const getAllTrackingData: any = createAsyncThunk(
  "Get All Tracking Events",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let response = await apiClient(
      `crm/tracking/listing?lead_id=${state?.formList?.details?.unique_id}`,
      "get"
    );
    return response;
  }
);

export const getEngagmentScore: any = createAsyncThunk(
  "Get All Engagment Score",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let response = await apiClient(`crm/tracking/report`, "get");
    return response;
  }
);
export const leadStatusChange: any = createAsyncThunk(
  "Lead Status Change",
  async (payloads: any, { getState, dispatch }) => {
    let response = await crmApiClient(`lead/lead-status-update`, "post", {
      body: payloads,
    });
    return response;
  }
);
export const handleAssignLead: any = createAsyncThunk(
  "Assign leads",
  async (payloads: any, { getState, dispatch }) => {
    let response = await crmApiClient(`lead/assign`, "post", {
      body: payloads,
    });
    return response;
  }
);
export const getStatusData: any = createAsyncThunk(
  "Fetch Status Data",
  async (payloads: any, { getState, dispatch }) => {
    let response = await crmApiClient(`lead/group-classification`, "get");
    return response;
  }
);

export const getTaskListActivity: any = createAsyncThunk(
  "Get All Activities",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(`activity/all`, "get");

    return response;
  }
);
export const allLeadList: any = createAsyncThunk(
  "Get All Lead List",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(`lead/list/main`, "get");

    return response;
  }
);
export const getTagsData: any = createAsyncThunk(
  "Get tags list",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(`tag/index`, "get");
    return response;
  }
);
export const getStatusSettingsData: any = createAsyncThunk(
  "Get status list",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(`status-settings/index`, "get");

    return response;
  }
);
export const getDealsAllFieldDataAndUpdateStates: any = createAsyncThunk(
  "Get All saved Fields Data",
  async (payloads: any, { getState, dispatch }) => {
    const state: any = getState();
    let custom_view_id = state.formList.customViewId
      ? state.formList.customViewId
      : "0";
    let filtersPayload =
      state.formList.filters.length > 0 ? state.formList.filters : "";
    let customFilterId = state.formList.customFilterId
      ? state.formList.customFilterId
      : "";
    let filterQuery = customFilterId?.id
      ? customFilterId.filter
      : filtersPayload;
    let querryNew = "";
    filterQuery?.length > 0 &&
      filterQuery?.map((ele, index) => {
        let operator = index == 0 ? "AND" : "OR";
        querryNew =
          querryNew +
          " " +
          operator +
          " (`section_form_id` = " +
          "'" +
          ele.id +
          "' AND " +
          convertQuery(ele.condition, ele.value);
      });
    let body = {
      type_name: state.formList.typeName,
      type_id: state.formList.typeId,
      custom_view_id: localStorage.getItem("view")
        ? localStorage.getItem("view")
        : custom_view_id,
      filters: customFilterId?.id ? customFilterId.filter : filtersPayload,
      filter_id: customFilterId?.id ? customFilterId?.id : "",
      query: querryNew,
      per_page: 100,
    };

    let response = await crmApiClient(`deal/list`, "get", { body });
    if (response?.data?.deal_data) {
      dispatch(setDataList(response.data.deal_data.data || []));
      dispatch(setSavedDataFilters(response.data.deal_data.save_filters || []));
      dispatch(setFilterDataKeys(response.data.deal_data.filters || []));
      dispatch(setCustomizeColumn(response.data.deal_data.setting_col || []));
      dispatch(
        setDefaultColumns(response.data.deal_data.default_column_name || [])
      );
      dispatch(
        setCustomViewFilter(response.data.deal_data.custom_view_filter || [])
      );
    } else {
      console.error("Invalid response structure:", response);
    }
    return response;
  }
);
export const getTaskKanbanList: any = createAsyncThunk(
  "Get Task kanban list",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(`task/activity/bycategory`, "get");

    return response;
  }
);
export const getMeetingKanbanList: any = createAsyncThunk(
  "Get Meeting kanban list",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(`meeting/activity/bycategory`, "get");

    return response;
  }
);
export const getCallsKanbanList: any = createAsyncThunk(
  "Get Calls kanban list",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(`call/activity/bycategory`, "get");

    return response;
  }
);

export const getEmailsKanbanList: any = createAsyncThunk(
  "Get Emails kanban list",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await crmApiClient(`email/activity/bycategory`, "get");

    return response;
  }
);
const UseCreateFormData = createSlice({
  name: "formList",
  initialState: {
    deleteStatus: false,
    createListResponse: "",
    typeName: "Leads",
    typeId: 1,
    taskList: [],
    tagsList: [],
    statusSettingsList: [],
    meetingList: [],
    leadContact: [],
    dealList: [],
    accountList: [],
    leadList: [],
    dealsList: [],
    accountsList: [],
    contactsList: [],
    leadCallList: [],
    dealsCallList: [],
    accountsCallList: [],
    contactsCallList: [],
    leadEmailList: [],
    dealsEmailList: [],
    accountsEmailList: [],
    contactsEmailList: [],
    allLeadData: [],
    callList: [],
    emailsList: [],
    formList: [],
    saveFormList: [],
    loader: false,
    saveLoader: false,
    formId: null,
    formData: [],
    savedFieldData: [],
    savedViews: [],
    savedViewLoader: false,
    saveCustomViewList: [],
    showButtonsAsperDataChecked: false,
    customViewId: "",
    selectedViewName: "All Leads",
    currentCustomView: [],
    singleLoader: false,
    deleteLoader: false,
    openCustomView: false,
    filters: [],
    savedFiltersData: [],
    selectedDataIds: [],
    selectedDataEmails: [],
    showFilters: [],
    savedFilterData: [],
    updateField: [],
    deleteFilterLoader: false,
    customFilterId: [],
    currentFilterId: [],
    filterPopUp: false,
    taskPopUp: false,
    meetingPopUp: false,
    callsPopUp: false,
    emailsPopUp: false,
    composeEmailPopUp: false,
    subjectError: false,
    manageTags: false,
    userLists: [],
    details: "",
    updateSingleData: [],
    activitiesCount: "",
    check_survey_mail_status: false,
    updateSingleTasks: [],
    userTags: [],
    tabsLoader: false,
    userEmailsList: [],
    emailViewType: 0,
    emailIdToSender: "",
    emailIds: [],
    draftData: "",
    tasksList: [],
    CrmTabs: 0,
    actionManage: 0,
    activityType: 0,
    notesList: [],
    notesLoader: false,
    kanbanLists: [],
    createKanbanStatus: "",
    crmFilesLoader: false,
    crmFilesData: [],
    crmMeetingLoader: false,
    invitedMeetings: [],
    crmUniqueId: "",
    callsLoader: false,
    activityViewType: "add",
    activityFormType: "task",
    singleActivity: "",
    singleActivityLoader: false,
    leadHistoryLoader: false,
    dataViewType: 0,
    enquiryDetail: [],
    leadHistory: [],
    taskMeetingCallHistory: [],
    detailsTab: 0,
    ConvertAttachment: "",
    dealsData: [],
    showSkelton: false,
    DealsList: [],
    taskMeetingCalls: [],
    dataLoader: false,
    allTypeId: [],
    selectedActvityIds: [],
    filterOthers: [],
    filterShowOthers: [],
    savedFiltersDataOthers: [],
    allActivityData: "",
    redirectedValue: false,
    individualTag: [],
    pipeLinePopUp: false,
    massConvertPopUp: false,
    massConvertDetail: false,
    drawerLoader: false,
    addedTags: [],
    openCreateFrom: false,
    mainPageLoader: false,
    trackingData: [],
    seasonsList: [],
    trackingLoader: false,
    engagmentData: [],
    engagmentLoader: false,
    filterDataKeys: [],
    dataList: [],
    savedDataFilters: [],
    defaultColumns: [],
    customizeColumn: {},
    leadsList: [],
    statusLists: [],
    customViewFilter: [],
    contactTasksList: [],
    accountTasksList: [],
    dealTasksList: [],
    previousMeetings: [],
    todaysMeetings: [],
    leadPersonalSideBarData: [],
    leadContactPersonalSideBarData: [],
    leadContactPersonalSideBarAllData: [],
    dealsPersonalSideBarData: [],
    accountPersonalData: [],
  },
  reducers: {
    setActionManage: (state, action) => {
      state.actionManage = action.payload;
    },
    setAccountPersonSideBarData: (state, action) => {
      state.accountPersonalData = action.payload;
    },
    setAddedTags: (state, action) => {
      state.addedTags = action.payload;
    },
    setRedirectedValue: (state, action) => {
      state.redirectedValue = action.payload;
    },
    setTypeName: (state, action) => {
      state.typeName = action.payload;
    },
    setCreateIndividualTag: (state, action) => {
      state.individualTag = action.payload;
    },
    setShowSkeltn: (state, action) => {
      state.showSkelton = action.payload;
    },
    setMassCovrtPop: (state, action) => {
      state.massConvertPopUp = action.payload;
    },
    setMassConvertDetails: (state, action) => {
      state.massConvertDetail = action.payload;
    },
    setMassAttatchment: (state, action) => {
      state.ConvertAttachment = action.payload;
    },
    setDealsData: (state, action) => {
      state.dealsData = action.payload;
    },
    setDetailActiveTab: (state, action) => {
      state.detailsTab = action.payload;
    },
    setKanbanStatus: (state, action) => {
      state.createKanbanStatus = action.payload;
    },
    setCrmFilesLoader: (state, action) => {
      state.crmFilesLoader = action.payload;
    },
    setKanbanList: (state, action) => {
      state.kanbanLists = action.payload;
    },
    setCommonTabs: (state, action) => {
      state.CrmTabs = action.payload;
    },
    setTypeId: (state, action) => {
      state.typeId = action.payload;
    },
    setFormId: (state, action) => {
      state.formId = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setShowButtonsAsperDataChecked: (state, action) => {
      state.showButtonsAsperDataChecked = action.payload;
    },
    setCheckedKanban: (state, action) => {},
    setCustomViewId: (state, action) => {
      state.customViewId = action.payload;
    },
    setSelectedViewName: (state, action) => {
      state.selectedViewName = action.payload;
    },
    setCurrentCustomView: (state, action) => {
      state.currentCustomView = action.payload;
    },
    setSaveLoader: (state, action) => {
      state.saveLoader = action.payload;
    },
    setPipeLinePopUp: (state, action) => {
      state.pipeLinePopUp = action.payload;
    },
    setDeleteLoader: (state, action) => {
      state.deleteLoader = action.payload;
    },
    setOpenCustomView: (state, action) => {
      state.openCustomView = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSelectedDataIds: (state, action) => {
      state.selectedDataIds = action.payload;
    },
    setSelectedDataEmail: (state, action) => {
      state.selectedDataEmails = action.payload;
    },
    setShowFilters: (state, action) => {
      state.showFilters = action.payload;
    },
    setCustomFilterId: (state, action) => {
      state.customFilterId = action.payload;
    },
    setCurrentFilterId: (state, action) => {
      state.currentFilterId = action.payload;
    },
    setFilterPopUp: (state, action) => {
      state.filterPopUp = action.payload;
    },
    setComposeEmailPopUp: (state, action) => {
      state.composeEmailPopUp = action.payload;
    },
    setTaskPopUp: (state, action) => {
      state.taskPopUp = action.payload;
    },
    setMeetingPopUp: (state, action) => {
      state.meetingPopUp = action.payload;
    },
    setCallsPopUp: (state, action) => {
      state.callsPopUp = action.payload;
    },
    setEmailsPopUp: (state, action) => {
      state.emailsPopUp = action.payload;
    },
    setSubjectError: (state, action) => {
      state.subjectError = action.payload;
    },
    setManageTags: (state, action) => {
      state.manageTags = action.payload;
    },
    setDetailsData: (state, action) => {
      state.details = action.payload;
    },
    setEmailViewType: (state, action) => {
      state.emailViewType = action.payload;
    },
    setEmailIdToSender: (state, action) => {
      state.emailIdToSender = action.payload;
    },
    setEmailIds: (state, action) => {
      state.emailIds = action.payload;
    },
    setDraftData: (state, action) => {
      state.draftData = action.payload;
    },
    setActivityType: (state, action) => {
      state.activityType = action.payload;
    },
    setActivityViewType: (state, action) => {
      state.activityViewType = action.payload;
    },
    setSingleActivity: (state, action) => {
      state.singleActivity = action.payload;
    },
    setActivityFormType: (state, action) => {
      state.activityFormType = action.payload;
    },
    setDataViewType: (state, action) => {
      state.dataViewType = action.payload;
    },
    setUpdateSingleData: (state, action) => {
      state.updateSingleData = action.payload;
    },
    setSelectedActvityIds: (state, action) => {
      state.selectedActvityIds = action.payload;
    },
    setFilterOthers: (state, action) => {
      state.filterOthers = action.payload;
    },
    setFilterShowOthers: (state, action) => {
      state.filterShowOthers = action.payload;
    },
    setOpenCreateFrom: (state, action) => {
      state.openCreateFrom = action.payload;
    },
    setFilterDataKeys: (state, action) => {
      state.filterDataKeys = action.payload;
    },
    setDataList: (state, action) => {
      state.dataList = action.payload;
    },
    setSavedDataFilters: (state, action) => {
      state.savedDataFilters = action.payload;
    },
    setDefaultColumns: (state, action) => {
      state.defaultColumns = action.payload;
    },
    setCustomizeColumn: (state, action) => {
      state.customizeColumn = action.payload;
    },
    setStatusList: (state, action) => {
      state.statusLists = action.payload;
    },
    setCustomViewFilter: (state, action) => {
      state.customViewFilter = action.payload;
    },
    setContactPersonSideBarData: (state, action) => {
      state.leadContactPersonalSideBarData = action.payload;
    },
    setLeadPersonalSideBarData: (state, action) => {
      state.leadPersonalSideBarData = action.payload;
    },
    setLeadPersonalSideAllData: (state, action) => {
      state.leadContactPersonalSideBarAllData = action.payload;
    },
    setDealsPersonalSideBarData: (state, action) => {
      state.dealsPersonalSideBarData = action.payload;
    },
    setTaskList: (state, action) => {
      state.taskList = action.payload;
    },
    setStatusSettingsList: (state, action) => {
      state.statusSettingsList = action.payload;
    },
    setMeetingList: (state, action) => {
      state.meetingList = action.payload;
    },
    setCallsList: (state, action) => {
      state.callList = action.payload;
    },
    setEmailsList: (state, action) => {
      state.emailsList = action.payload;
    },
    setLeadContact: (state, action) => {
      state.leadContact = action.payload;
    },
    setDealList: (state, action) => {
      state.dealList = action.payload;
    },
    setAccountList: (state, action) => {
      state.accountList = action.payload;
    },
    setLeadsList: (state, action) => {
      state.leadList = action.payload;
    },
    setContactsList: (state, action) => {
      state.contactsList = action.payload;
    },
    setAccountsList: (state, action) => {
      state.accountsList = action.payload;
    },
    setDealsList: (state, action) => {
      state.dealsList = action.payload;
    },
    setLeadsCallList: (state, action) => {
      state.leadCallList = action.payload;
    },
    setContactsCallList: (state, action) => {
      state.contactsCallList = action.payload;
    },
    setAccountsCallList: (state, action) => {
      state.accountsCallList = action.payload;
    },
    setDealsCallList: (state, action) => {
      state.dealsCallList = action.payload;
    },
    setLeadsEmailList: (state, action) => {
      state.leadEmailList = action.payload;
    },
    setContactsEmailList: (state, action) => {
      state.contactsEmailList = action.payload;
    },
    setAccountsEmailList: (state, action) => {
      state.accountsEmailList = action.payload;
    },
    setDealsEmailList: (state, action) => {
      state.dealsEmailList = action.payload;
    },
    // setLeadPersonalSideBarData: (state, action) => {
    //   state.leadPersonalSideBarData = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllFields.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchAllFields.fulfilled, (state, action) => {
      state.formList = action.payload;
      let formsData = action.payload?.data?.form_data?.map((list) =>
        list?.form_fields?.map((newList) => {
          return {
            id: newList.id,
            value: "",
            required: newList.is_required,
            type: newList.field_type,
            label: newList.label,
            section_form_id: newList.section_id,
            form_input_list_id: newList.form_input_list_id,
            name: newList.name,
            crm_user_form_unique_id: newList?.crm_user_form_unique_id,
            unique: newList?.unique,
          };
        })
      );
      state.formData = formsData.flat();
      state.DealsList = formsData.flat();
      // state.dealsData=formsData.includes()
      state.loader = false;
    });
    builder.addCase(fetchAllFields.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(fetchFieldsForContactLead.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchFieldsForContactLead.fulfilled, (state, action) => {
      state.formList = action.payload;
      let formsData = action.payload?.data?.form_data?.map((list) =>
        list?.form_fields?.map((newList) => {
          return {
            id: newList.id,
            value: newList?.value,
            required: newList.is_required,
            type: newList.field_type,
            label: newList.label,
            section_form_id: newList.section_id,
            form_input_list_id: newList.form_input_list_id,
            name: newList.name,
            crm_user_form_unique_id: newList?.crm_user_form_unique_id,
            unique: newList?.unique,
          };
        })
      );
      state.formData = formsData.flat();
      state.DealsList = formsData.flat();
      // state.dealsData=formsData.includes()
      state.loader = false;
    });
    builder.addCase(fetchFieldsForContactLead.rejected, (state) => {
      state.loader = false;
    });

    builder.addCase(fetchFieldsForContactDeal.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchFieldsForContactDeal.fulfilled, (state, action) => {
      state.formList = action.payload;
      let formsData = action.payload?.data?.form_data?.map((list) =>
        list?.form_fields?.map((newList) => {
          return {
            id: newList.id,
            value: newList?.value,
            required: newList.is_required,
            type: newList.field_type,
            label: newList.label,
            section_form_id: newList.section_id,
            form_input_list_id: newList.form_input_list_id,
            name: newList.name,
            crm_user_form_unique_id: newList?.crm_user_form_unique_id,
            unique: newList?.unique,
          };
        })
      );
      state.formData = formsData.flat();
      state.DealsList = formsData.flat();
      // state.dealsData=formsData.includes()
      state.loader = false;
    });
    builder.addCase(fetchFieldsForContactDeal.rejected, (state) => {
      state.loader = false;
    });

    builder.addCase(fetchFieldsForAccountContact.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchFieldsForAccountContact.fulfilled, (state, action) => {
      state.formList = action.payload;
      let formsData = action.payload?.data?.form_data?.map((list) =>
        list?.form_fields?.map((newList) => {
          return {
            id: newList.id,
            value: newList?.value,
            required: newList.is_required,
            type: newList.field_type,
            label: newList.label,
            section_form_id: newList.section_id,
            form_input_list_id: newList.form_input_list_id,
            name: newList.name,
            crm_user_form_unique_id: newList?.crm_user_form_unique_id,
            unique: newList?.unique,
          };
        })
      );
      state.formData = formsData.flat();
      state.DealsList = formsData.flat();
      // state.dealsData=formsData.includes()
      state.loader = false;
    });
    builder.addCase(fetchFieldsForAccountContact.rejected, (state) => {
      state.loader = false;
    });

    builder.addCase(fetchFieldsForAccountLead.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchFieldsForAccountLead.fulfilled, (state, action) => {
      state.formList = action.payload;
      let formsData = action.payload?.data?.form_data?.map((list) =>
        list?.form_fields?.map((newList) => {
          return {
            id: newList.id,
            value: newList?.value,
            required: newList.is_required,
            type: newList.field_type,
            label: newList.label,
            section_form_id: newList.section_id,
            form_input_list_id: newList.form_input_list_id,
            name: newList.name,
            crm_user_form_unique_id: newList?.crm_user_form_unique_id,
            unique: newList?.unique,
          };
        })
      );
      state.formData = formsData.flat();
      state.DealsList = formsData.flat();
      // state.dealsData=formsData.includes()
      state.loader = false;
    });
    builder.addCase(fetchFieldsForAccountLead.rejected, (state) => {
      state.loader = false;
    });

    builder.addCase(fetchFieldsForAccountDeal.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchFieldsForAccountDeal.fulfilled, (state, action) => {
      state.formList = action.payload;
      let formsData = action.payload?.data?.form_data?.map((list) =>
        list?.form_fields?.map((newList) => {
          return {
            id: newList.id,
            value: newList?.value,
            required: newList.is_required,
            type: newList.field_type,
            label: newList.label,
            section_form_id: newList.section_id,
            form_input_list_id: newList.form_input_list_id,
            name: newList.name,
            crm_user_form_unique_id: newList?.crm_user_form_unique_id,
            unique: newList?.unique,
          };
        })
      );
      state.formData = formsData.flat();
      state.DealsList = formsData.flat();
      // state.dealsData=formsData.includes()
      state.loader = false;
    });
    builder.addCase(fetchFieldsForAccountDeal.rejected, (state) => {
      state.loader = false;
    });

    builder.addCase(saveFieldsData.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(saveFieldsData.fulfilled, (state, action) => {
      state.saveFormList = action.payload;
      state.saveLoader = false;
    });
    builder.addCase(saveFieldsData.rejected, (state) => {});
    builder.addCase(deleteListOfTags.pending, (state) => {
      state.deleteStatus = false;
    });
    builder.addCase(deleteListOfTags.fulfilled, (state, action) => {
      state.deleteStatus = true;
      {
        action.payload && toast.success("Tags Deleted Successfully");
      }
    });
    builder.addCase(deleteListOfTags.rejected, (state) => {
      state.deleteStatus = false;
    });
    builder.addCase(createListOfTags.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(createListOfTags.fulfilled, (state, action) => {
      state.createListResponse = action.payload;
      toast.success(action.payload.message);
      state.saveLoader = false;
    });
    builder.addCase(createListOfTags.rejected, (state, action) => {
      state.saveLoader = false;
      state.createListResponse = "error";
    });
    builder.addCase(saveCustomViewData.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(saveCustomViewData.fulfilled, (state, action) => {
      state.customViewId = action.payload.data?.id
        ? action.payload.data?.id
        : state.customViewId;
      state.loader = false;
    });
    builder.addCase(saveCustomViewData.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(getAllFieldData.pending, (state) => {
      state.saveLoader = true;
      state.mainPageLoader = true;
    });
    builder.addCase(getAllFieldData.fulfilled, (state, action) => {
      state.savedFieldData = action.payload;
      state.saveLoader = false;
      state.mainPageLoader = false;
      state.savedFiltersData = action.payload?.data?.savedFilterRequests;
      state.createKanbanStatus = action.payload?.data?.user_form_listing;
      state.crmUniqueId = action.payload?.data?.user_form_listing?.unique_id;
      state.selectedViewName = localStorage?.getItem("view");
    });
    builder.addCase(getAllFieldData.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(getAllType.fulfilled, (state, action) => {
      state.allTypeId = action.payload.data;
    });
    builder.addCase(getAllType.rejected, (state, action) => {});
    builder.addCase(getAllType.pending, (state, action) => {
      // state.allTypeId = action.payload.data;
    });
    builder.addCase(getSingleCustomViews.pending, (state) => {
      state.drawerLoader = true;
    });
    builder.addCase(getSingleCustomViews.fulfilled, (state, action) => {
      state.currentCustomView = action.payload.data;
      state.drawerLoader = false;
    });
    builder.addCase(getSingleCustomViews.rejected, (state) => {
      state.drawerLoader = false;
    });
    builder.addCase(deleteCustomViews.pending, (state) => {
      state.deleteLoader = true;
    });
    builder.addCase(deleteCustomViews.fulfilled, (state) => {
      state.deleteLoader = false;
    });
    builder.addCase(deleteCustomViews.rejected, (state) => {
      state.deleteLoader = false;
    });
    builder.addCase(saveFilterData.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(saveFilterData.fulfilled, (state, action) => {
      state.savedFilterData = action.payload.data;
      state.customFilterId = [];
      state.saveLoader = false;
    });
    builder.addCase(saveFilterData.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(updateFiledsData.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(updateFiledsData.fulfilled, (state, action) => {
      state.updateField = action.payload.data;
      state.saveLoader = false;
    });
    builder.addCase(updateFiledsData.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(deleteFilterSavedData.pending, (state) => {
      state.deleteFilterLoader = true;
    });
    builder.addCase(deleteFilterSavedData.fulfilled, (state, action) => {
      state.deleteFilterLoader = false;
    });
    builder.addCase(deleteFilterSavedData.rejected, (state) => {
      state.deleteFilterLoader = false;
    });
    builder.addCase(deleteLeadSavedData.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(deleteLeadSavedData.fulfilled, (state, action) => {
      state.saveLoader = false;
      state.selectedDataEmails = [];
    });
    builder.addCase(deleteLeadSavedData.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(sendEmailOrSchedule.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(sendEmailOrSchedule.fulfilled, (state, action) => {
      state.saveLoader = false;
    });
    builder.addCase(sendEmailOrSchedule.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(createTaskAndSchedule.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(createTaskAndSchedule.fulfilled, (state, action) => {
      state.saveLoader = false;
    });

    builder.addCase(createTaskAndSchedule.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(updateEachTask.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(updateEachTask.fulfilled, (state, action) => {
      toast.success(action.payload.message);
    });
    builder.addCase(updateEachMeeting.rejected, (state, action) => {
      // toast.success(action.payload.message);
    });
    builder.addCase(updateEachMeeting.fulfilled, (state, action) => {
      toast.success(action.payload.message);
      // state.singleActivity=action.payload.data;updateEachCall
    });
    builder.addCase(updateEachCall.rejected, (state, action) => {
      // toast.success(action.payload.message);
    });
    builder.addCase(updateEachCall.fulfilled, (state, action) => {
      toast.success(action.payload.message);
    });
    builder.addCase(getListOfUsersAndSubUsers.fulfilled, (state, action) => {
      state.userLists = action.payload.data;
    });
    builder.addCase(getLeadsList.fulfilled, (state, action) => {
      state.leadsList = action.payload.data;
    });
    builder.addCase(EditSingleLead.pending, (state, action) => {
      // state.userLists = action.payload.data;
      state.showSkelton = true;
    });
    builder.addCase(EditSingleLead.rejected, (state, action) => {
      // state.userLists = action.payload.data;EditTaskCallMeeting
      state.showSkelton = false;
    });
    builder.addCase(EditSingleLead.fulfilled, (state, action) => {
      state.updateSingleData = action.payload?.data?.lead_detail;
      const singleLeadTag = [
        ...action.payload.data?.lead_detail?.[0]?.form_data,
      ];
      state.activitiesCount = action.payload?.data?.lead_analyitics;
      state.check_survey_mail_status =
        action.payload?.data?.check_survey_mail_status;
      state.details = action.payload?.data?.lead_data;
      // state.selectedDataIds =  [action.payload?.data?.lead_data?.unique_id];
      // state.details = detailsData;
      for (const items of singleLeadTag) {
        for (const ele of items?.form_fields) {
          if (ele?.field_type === "tag") {
            // state.individualTag = [...ele?.value];
          }
        }
      }
      state.showSkelton = false;
    });
    builder.addCase(EditTaskCallMeeting.fulfilled, (state, action) => {
      state.updateSingleTasks = action.payload?.data;
      state.showSkelton = false;
    });
    builder.addCase(EditTaskCallMeeting.pending, (state, action) => {
      // state.userLists = action.payload.data;
    });
    builder.addCase(EditTaskCallMeeting.rejected, (state, action) => {
      // state.userLists = action.payload.data;EditTaskCallMeeting
      state.showSkelton = false;
    });
    builder.addCase(getAllListOfTags.pending, (state) => {
      // state.saveLoader = true;
      state.deleteStatus = false;
      state.createListResponse = "";
    });
    builder.addCase(getAllListOfTags.fulfilled, (state, action) => {
      state.saveLoader = false;
      state.deleteStatus = false;
      state.userTags = action.payload.data;
      state.individualTag =
        action.payload.data?.length > 0 && action.payload.data;
    });
    builder.addCase(getAllListOfTags.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(getAllListOfEmails.pending, (state) => {
      state.tabsLoader = true;
    });
    builder.addCase(getAllListOfEmails.fulfilled, (state, action) => {
      state.userEmailsList = action.payload.data;
      state.tabsLoader = false;
    });
    builder.addCase(getAllListOfEmails.rejected, (state) => {
      state.tabsLoader = false;
    });
    builder.addCase(deleteAllSelectedEmail.pending, (state) => {
      state.tabsLoader = true;
    });
    builder.addCase(deleteAllSelectedEmail.fulfilled, (state, action) => {
      state.tabsLoader = false;
    });
    builder.addCase(deleteAllSelectedEmail.rejected, (state) => {
      state.tabsLoader = false;
    });
    builder.addCase(updateListOfTags.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(updateListOfTags.fulfilled, (state, action) => {
      state.saveLoader = false;
    });
    builder.addCase(updateListOfTags.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(getAllListOfTasks.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(getAllListOfTasks.fulfilled, (state, action) => {
      state.tasksList = action.payload.data;
      state.saveLoader = false;
    });
    builder.addCase(getAllListOfTasks.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(getAllListOfContactTasks.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(getAllListOfContactTasks.fulfilled, (state, action) => {
      state.contactTasksList = action.payload.data;
      state.saveLoader = false;
    });
    builder.addCase(getAllListOfContactTasks.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(getAllListOfAccountTasks.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(getAllListOfAccountTasks.fulfilled, (state, action) => {
      state.accountTasksList = action.payload.data;
      state.saveLoader = false;
    });
    builder.addCase(getAllListOfAccountTasks.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(getAllListOfDealTasks.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(getAllListOfDealTasks.fulfilled, (state, action) => {
      state.dealTasksList = action.payload.data;
      state.saveLoader = false;
    });
    builder.addCase(getAllListOfDealTasks.rejected, (state) => {
      state.saveLoader = false;
    });
    builder.addCase(getAllListOfNotes.pending, (state) => {
      state.notesLoader = true;
      getAllActivityData;
    });
    builder.addCase(getAllActivityData.rejected, (state) => {
      // state.saveLoader = false;
    });
    builder.addCase(getAllActivityData.fulfilled, (state, action) => {
      // state.saveLoader = false;
      state.allActivityData = action.payload?.data;
    });
    builder.addCase(getAllActivityData.pending, (state) => {
      // state.saveLoader = false;
    });
    builder.addCase(getAllListOfNotes.fulfilled, (state, action) => {
      state.notesList = action.payload.data;
      state.notesLoader = false;
    });
    builder.addCase(getAllListOfNotes.rejected, (state) => {
      state.notesLoader = false;
    });
    builder.addCase(getKanbanList.pending, (state) => {
      state.saveLoader = true;
    });
    builder.addCase(getKanbanList.rejected, (state) => {
      console.log("error");
    });
    builder.addCase(getKanbanList.fulfilled, (state, action) => {
      const checkedData = action.payload?.data;
      for (const categoryKey in checkedData) {
        checkedData[categoryKey].data = checkedData[categoryKey].data.map(
          (item) => ({
            ...item,
            selected: false,
          })
        );
      }
      state.kanbanLists = checkedData;
      state.saveLoader = false;
      // state.createKanbanStatus=action.payload?.status;
    });
    builder.addCase(createKanbanView.pending, (state, action) => {
      // state.kanbanLists=action.payload;
    });
    builder.addCase(createKanbanView.rejected, (state, action) => {
      state.kanbanLists = action.payload;
    });
    builder.addCase(createKanbanView.fulfilled, (state, action) => {
      state.kanbanLists = action.payload;
    });
    builder.addCase(getAllListOfCRMFiles.pending, (state, action) => {
      state.crmFilesLoader = true;
    });
    builder.addCase(getAllListOfCRMFiles.fulfilled, (state, action) => {
      state.crmFilesData = action.payload.data;
      state.crmFilesLoader = false;
    });
    builder.addCase(getAllListOfCRMFiles.rejected, (state, action) => {
      state.crmFilesLoader = false;
    });
    builder.addCase(createMeetings.pending, (state, action) => {
      state.crmMeetingLoader = true;
    });
    builder.addCase(createMeetings.fulfilled, (state, action) => {
      state.crmMeetingLoader = false;
    });
    builder.addCase(createMeetings.rejected, (state, action) => {
      state.crmMeetingLoader = false;
    });
    builder.addCase(getAllListOfInvitedMeetings.pending, (state, action) => {
      state.crmMeetingLoader = true;
    });
    builder.addCase(getAllListOfInvitedMeetings.fulfilled, (state, action) => {
      state.invitedMeetings = action.payload.data;
      state.crmMeetingLoader = false;
    });
    builder.addCase(getAllListOfInvitedMeetings.rejected, (state, action) => {
      state.crmMeetingLoader = false;
    });
    builder.addCase(getAllReminder.pending, (state, action) => {});
    builder.addCase(getAllReminder.fulfilled, (state, action) => {
      const { previousMeetings, todaysMeetings } = action?.payload;
      state.previousMeetings = previousMeetings;
      state.todaysMeetings = todaysMeetings;
    });
    builder.addCase(getAllReminder.rejected, (state, action) => {});
    builder.addCase(createAndScheduleCalls.pending, (state, action) => {
      state.callsLoader = true;
    });
    builder.addCase(createAndScheduleCalls.fulfilled, (state, action) => {
      state.callsLoader = false;
    });
    builder.addCase(createAndScheduleCalls.rejected, (state, action) => {
      state.callsLoader = false;
    });
    builder.addCase(getDetailOfSingleTasks.pending, (state, action) => {
      state.singleActivityLoader = true;
    });
    builder.addCase(getDetailOfSingleTasks.fulfilled, (state, action) => {
      state.singleActivity = action.payload.data;
      state.singleActivityLoader = false;
    });
    builder.addCase(getDetailOfSingleTasks.rejected, (state, action) => {
      state.singleActivityLoader = false;
    });
    builder.addCase(getEnquiryDetails.pending, (state, action) => {
      state.singleActivityLoader = true;
    });
    builder.addCase(getEnquiryDetails.fulfilled, (state, action) => {
      state.enquiryDetail = action.payload.data;
      state.singleActivityLoader = false;
    });
    builder.addCase(getEnquiryDetails.rejected, (state, action) => {
      state.singleActivityLoader = false;
    });
    builder.addCase(leadActivity.pending, (state, action) => {
      state.leadHistoryLoader = true;
    });
    builder.addCase(leadActivity.fulfilled, (state, action) => {
      state.leadHistory = action.payload.data;
      state.leadHistoryLoader = false;
    });
    builder.addCase(leadActivity.rejected, (state, action) => {
      state.leadHistoryLoader = false;
    });
    builder.addCase(TaskMeetingCallsActivity.fulfilled, (state, action) => {
      state.taskMeetingCallHistory = action.payload.data;
    });
    builder.addCase(createHistory.fulfilled, (state, action) => {
      // console.log(action.payload.data);
    });
    builder.addCase(getAllSavedViews.fulfilled, (state, action) => {
      // state.saveLoader = true;
      state.savedViews = action.payload.data;
      state.savedViewLoader = true;
    });
    builder.addCase(informationTaskMeetingCalls.pending, (state, action) => {
      state.dataLoader = true;
    });
    builder.addCase(informationTaskMeetingCalls.fulfilled, (state, action) => {
      state.taskMeetingCalls = action.payload.data;
      state.savedFiltersDataOthers = action.payload.data.savedFilterRequests;
      state.dataLoader = false;
    });
    builder.addCase(informationTaskMeetingCalls.rejected, (state, action) => {
      state.dataLoader = false;
    });
    builder.addCase(getAllTrackingData.pending, (state, action) => {
      state.trackingLoader = true;
    });
    builder.addCase(getAllTrackingData.fulfilled, (state, action) => {
      state.trackingData = action.payload.data;
      state.seasonsList = action.payload.seasons_list;
      state.trackingLoader = false;
    });
    builder.addCase(getAllTrackingData.rejected, (state, action) => {
      state.trackingLoader = false;
    });
    builder.addCase(getEngagmentScore.pending, (state, action) => {
      state.engagmentLoader = true;
    });
    builder.addCase(getEngagmentScore.fulfilled, (state, action) => {
      state.engagmentData = action.payload.data;
      state.engagmentLoader = false;
    });
    builder.addCase(getEngagmentScore.rejected, (state, action) => {
      state.engagmentLoader = false;
    });
    builder.addCase(getTaskKanbanList?.fulfilled, (state, action) => {
      state.leadContact = action.payload?.data?.lead_contact;
      state.dealList = action.payload?.data?.deals;
      state.accountList = action.payload?.data?.account;
    });
    builder.addCase(getMeetingKanbanList.fulfilled, (state, action) => {
      state.leadList = action.payload?.data?.leads;
      state.dealsList = action.payload?.data?.deals;
      state.accountsList = action.payload?.data?.accounts;
      state.contactsList = action.payload?.data?.contacts;
    });
    builder.addCase(getCallsKanbanList.fulfilled, (state, action) => {
      state.leadCallList = action.payload?.data?.leads;
      state.dealsCallList = action.payload?.data?.deals;
      state.accountsCallList = action.payload?.data?.accounts;
      state.contactsCallList = action.payload?.data?.contacts;
    });
    builder.addCase(getEmailsKanbanList.fulfilled, (state, action) => {
      state.leadEmailList = action.payload?.data?.leads;
      state.dealsEmailList = action.payload?.data?.deals;
      state.accountsEmailList = action.payload?.data?.accounts;
      state.contactsEmailList = action.payload?.data?.contacts;
    });

    builder.addCase(getTaskListActivity?.fulfilled, (state, action) => {
      state.taskList = action.payload?.data?.tasks;
      state.meetingList = action.payload?.data?.meetings;
      state.callList = action.payload?.data?.calls;
      state.emailsList = action.payload?.data?.emails;
    });
    builder.addCase(allLeadList?.fulfilled, (state, action) => {
      state.allLeadData = action.payload?.data;
    });
    builder.addCase(getTagsData?.fulfilled, (state, action) => {
      state.tagsList = action.payload?.data;
    });
    builder.addCase(getStatusSettingsData?.fulfilled, (state, action) => {
      state.statusSettingsList = action.payload?.data;
    });
  },
});
export const {
  setFormId,
  setFormData,
  setShowButtonsAsperDataChecked,
  setCustomViewId,
  setSelectedViewName,
  setSaveLoader,
  setOpenCustomView,
  setFilters,
  setSelectedDataIds,
  setShowFilters,
  setCustomFilterId,
  setCurrentFilterId,
  setFilterPopUp,
  setTaskPopUp,
  setMeetingPopUp,
  setCallsPopUp,
  setEmailsPopUp,
  setComposeEmailPopUp,
  setSubjectError,
  setTypeId,
  setTypeName,
  setDetailActiveTab,
  setSelectedDataEmail,
  setManageTags,
  setActionManage,
  setDetailsData,
  setEmailViewType,
  setEmailIdToSender,
  setEmailIds,
  setDraftData,
  setCommonTabs,
  setActivityType,
  setKanbanStatus,
  setKanbanList,
  setActivityViewType,
  setSingleActivity,
  setActivityFormType,
  setDataViewType,
  setCurrentCustomView,
  setCheckedKanban,
  setCrmFilesLoader,
  setUpdateSingleData,
  setMassAttatchment,
  setDealsData,
  setShowSkeltn,
  setCreateIndividualTag,
  setSelectedActvityIds,
  setFilterOthers,
  setFilterShowOthers,
  setRedirectedValue,
  setPipeLinePopUp,
  setMassCovrtPop,
  setMassConvertDetails,
  setAddedTags,
  setOpenCreateFrom,
  setFilterDataKeys,
  setDataList,
  setSavedDataFilters,
  setDefaultColumns,
  setCustomizeColumn,
  setCustomViewFilter,
  setContactPersonSideBarData,
  setLeadPersonalSideBarData,
  setAccountPersonSideBarData,
  setLeadPersonalSideAllData,
  setDealsPersonalSideBarData,
  setTaskList,
  setStatusSettingsList,
  setMeetingList,
  setCallsList,
  setEmailsList,
  setLeadContact,
  setDealList,
  setAccountList,
  setLeadsList,
  setDealsList,
  setAccountsList,
  setContactsList,
  setLeadsCallList,
  setDealsCallList,
  setAccountsCallList,
  setContactsCallList,
  setLeadsEmailList,
  setDealsEmailList,
  setAccountsEmailList,
  setContactsEmailList,
  // setShowMobile,
  // setPersonalInfoData,
} = UseCreateFormData.actions;
export default UseCreateFormData;
