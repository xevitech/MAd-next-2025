import Auth from "@/auth/Auth";
import { BASE_URL, BASE_URL_CHAT } from "@/utils/staticValues";
import { countries } from "@/components/common/countrydropdown/countries";
import { toast } from "react-toastify";
import Image from "next/image";
import Resizer from "react-image-file-resizer";
import Echo from "laravel-echo";
import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/router";
import { FetchChatHistoryParams } from "@/hooks/Interface";
import { styled } from "@mui/material";
import { getSessionFromCookies } from "@/utils/cookieUtils";
import { getCurrentPageUrl } from "@/utils/commonFunctions/other";
import { use } from "react";

interface TypeCheck {
  key?: string;
  country_code?: any;
  mobile_code?: any;
  country_name?: string;
}
type UserData = {
  id: string;
  [key: string]: any;
};

// orignal 👆
export const apiClient = async (
  url: string,
  method: string,
  option: any = {},
  isFormData: boolean = false,
  showToast: boolean = false
) => {
  let request: any;
  const token = Auth.token();
  const sessionID = getSessionFromCookies();
  const currentPageUrl = getCurrentPageUrl();

  let userData: string | UserData = "user-Id-NA";

  if (typeof window !== "undefined") {
    const data = localStorage.getItem("userData");
    try {
      userData = data ? JSON.parse(data) : "user-Id-NA";
    } catch {
      userData = "user-Id-NA";
    }
  }

  // Type guard
  const userId =
    typeof userData === "object" && userData !== null && "id" in userData
      ? userData.id
      : "";

  // For GET requests
  if (method === "get") {
    request = new Request(`${BASE_URL}/${url}`, {
      method: "GET",
    });
  }
  if (method === "get" && token) {
    request = new Request(`${BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
        "X-Session-Hash": sessionID ?? "session-hash",
        "X-Pc-Url": currentPageUrl ?? "page-url",
        "x-uid": userId ? `"${userId}"` : "user-Id-NA",
      },
      ////body: JSON.stringify(option?.body),
    });
  } else if (method !== "get") {
    let headersJson: any = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Auth.token()}`,
      "X-Session-Hash": sessionID ?? "session-hash",
      "X-Pc-Url": currentPageUrl ?? "page-url",
      "x-uid": userId ? `"${userId}"` : "user-Id-NA",
    };

    let bodyData = JSON.stringify(option?.body);
    if (isFormData) {
      headersJson = {
        Authorization: `Bearer ${Auth.token()}`,
        "X-Session-Hash": sessionID ?? "session-hash",
        "X-Pc-Url": currentPageUrl ?? "page-url",
        "x-uid": userId ? `"${userId}"` : "user-Id-NA",
      };
      bodyData = option?.body;
    }
    request = new Request(`${BASE_URL}/${url}`, {
      method: method?.toUpperCase(),
      headers: new Headers(headersJson),
      body: bodyData,
    });
  }
  const res: any = await fetch(request);

  const status = res.status;
  const response = await res.json();
  if (response.status == false) {
    if (response?.errors) {
      toast.error(response?.errors);
      return;
    }
    return { status: false, message: response?.message };
  }
  if (status === 401) {
    // toast.error(response?.message ?? "something went wrong!");
    localStorage.removeItem("Token");
    localStorage.removeItem("userData");
    localStorage.removeItem("userData1");
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("sessionId");
    Cookies.remove("token");
    window.location.href = "/user/signin";
    return response;
  }
  if (status === 302) {
    toast.error(response?.message ?? "something went wrong! Please try again");
    return response;
  }
  if (status === 500 || status === 405) {
    toast.error("something went wrong! Please try again later");
    return status;
  }
  if (status === 422 && !showToast) {
    toast.error("something went wrong!");
    return { ...response, status };
  } else if (status === 422 && showToast) {
    return { ...response, status };
  }
  const data = { ...response, status };
  return data;
};

export const countryDetail = ({
  key,
  mobile_code = "",
  country_code = "",
  country_name = "",
}: TypeCheck) => {
  try {
    if (mobile_code) {
      return (
        countries?.find((v) => v.phone == mobile_code.replace("+", ""))?.[
          key
        ] ?? ""
      );
    }

    if (country_name && key === "label") {
      return (
        countries?.find(
          (v) => v.name.toLowerCase() == country_name.toLowerCase()
        )?.[key] ?? ""
      );
    }
    if (country_code) {
      return (
        countries?.find((v) => v.code == country_code?.toUpperCase())?.[key] ??
        ""
      );
    } else {
      return "NA";
    }
  } catch (err) {
    return "";
  }
};

export const PaymentTooltips = {
  EXW: "Ex Works",
  FOB: "Free On Board",
  "CFR/ CNF": "Cost and Freight",
  CIF: "Cost, Insurance and Freight",
  CPT: "Carriage Paid To",
  CIP: "Carriage and Insurance Paid To",
  DDP: "Delivered Duty Paid",
  DAP: "Delivered at Place",
  FCA: " Free Carrier",
  FAS: "Free Alongside Ship",
};

export const Business_Types = [
  { name: "Trading Company", is_checked: false, input: false, values: [] },
  { name: "Manufacturer", is_checked: false, input: false, values: [] },
  { name: "Broker", is_checked: false, input: false, values: [] },
  { name: "EPC Contractor", is_checked: false, input: false, values: [] },
  { name: "Consultant", is_checked: false, input: false, values: [] },
  { name: "Governmental Entity", is_checked: false, input: false, values: [] },
  { name: "Others", is_checked: true, input: false, values: [] },
];

export const DropDownFilter = [
  { name: "is", values: "1" },
  { name: "isn't", values: "2" },
  { name: "is empty", values: "7" },
  { name: "is not empty", values: "8" },
];
export const StringFilter = [
  { name: "is", values: "1" },
  { name: "isn't", values: "2" },
  { name: "contains", values: "3" },
  { name: "doesn't contains", values: "4" },
  { name: "starts with", values: "5" },
  { name: "ends with", values: "6" },
  { name: "is empty", values: "7" },
  { name: "is not empty", values: "8" },
];

export const NumberFilter = [
  { name: "=", values: "1" },
  { name: "!=", values: "2" },
  { name: "<", values: "9" },
  { name: ">", values: "10" },
  { name: "starts with", values: "5" },
  { name: "ends with", values: "6" },
  { name: "<=", values: "11" },
  { name: ">=", values: "12" },
  { name: "is empty", values: "7" },
  { name: "is not empty", values: "8" },
];

export const DateFilter = [
  { name: "is", values: "1" },
  { name: "isn't", values: "2" },
];

export const taskFields = [
  {
    id: "1",
    db_field: "subject",
    name: "Subject",
    type: "text",
    option_list: [],
  },
  {
    id: "2",
    db_field: "task_date",
    name: "Due Date",
    type: "date",
    option_list: [],
  },
  {
    id: "3",
    db_field: "status",
    name: "Status",
    type: "select",
    option_list: ["defered", "in-progress", "completed", "wait-for-someone"],
  },
  {
    id: "4",
    db_field: "priority",
    name: "Priority",
    type: "select",
    option_list: ["low", "lowest", "normal", "high"],
  },
  {
    id: "5",
    db_field: "related_with",
    name: "Related To",
    type: "select",
    option_list: ["Leads", "Contacts", "Account", "Deals"],
  },
  {
    id: "6",
    db_field: "task_owner",
    name: "Task Owner",
    type: "autocomplete",
    option_list: [],
  },
  { id: "7", db_field: "tag", name: "Tag", type: "tag", option_list: [] },
  {
    id: "8",
    db_field: "description",
    name: "Description",
    type: "textarea",
    option_list: [],
  },
];

export const meetingFields = [
  { id: "1", db_field: "title", name: "Title", type: "text", option_list: [] },
  {
    id: "2",
    db_field: "location",
    name: "Location",
    type: "text",
    option_list: [],
  },
  {
    id: "3",
    db_field: "from",
    name: "From",
    type: "timestamp",
    option_list: [],
  },
  { id: "4", db_field: "to", name: "To", type: "timestamp", option_list: [] },
  {
    id: "5",
    db_field: "host",
    name: "Host",
    type: "autocomplete",
    option_list: [],
  },
  {
    id: "6",
    db_field: "related_to",
    name: "Related To",
    type: "select",
    option_list: ["Leads", "Contacts", "Account", "Deals"],
  },
  {
    id: "7",
    db_field: "participants",
    name: "Participants",
    type: "text",
    option_list: [],
  },
  {
    id: "8",
    db_field: "reminder",
    name: "Reminder",
    type: "text",
    option_list: [
      "5 minutes before",
      "10 minutes before",
      "15 minutes before",
      "30 minutes before",
      "1 hours before",
      "2 hours before",
      "1 day before",
      "2 days before",
    ],
  },
  {
    id: "9",
    db_field: "description",
    name: "Description",
    type: "text",
    option_list: [],
  },
  { id: "10", db_field: "tag", name: "Tag", type: "tag", option_list: [] },
];

export const callFields = [
  {
    id: "1",
    db_field: "related_to",
    name: "Related To",
    type: "select",
    option_list: ["Leads", "Contacts", "Account", "Deals"],
  },
  {
    id: "2",
    db_field: "status",
    name: "Status",
    type: "select",
    option_list: ["Scheduled", "Missed"],
  },
  {
    id: "3",
    db_field: "call_type",
    name: "Call Type",
    type: "select",
    option_list: ["in-bound", "out-bound", "missed"],
  },
  {
    id: "4",
    db_field: "call_start_date_time",
    name: "Call Start Date Time",
    type: "timestamp",
    option_list: [],
  },
  {
    id: "5",
    db_field: "subject",
    name: "Subject",
    type: "text",
    option_list: [],
  },
  {
    id: "6",
    db_field: "recording",
    name: "Voice Recording",
    type: "text",
    option_list: [],
  },
  {
    id: "7",
    db_field: "subject",
    name: "Reminder",
    type: "text",
    option_list: [
      "5 minutes before",
      "10 minutes before",
      "15 minutes before",
      "30 minutes before",
    ],
  },
  {
    id: "8",
    db_field: "call_duration",
    name: "Call Duration",
    type: "text",
    option_list: [],
  },
  {
    id: "9",
    db_field: "call_owner",
    name: "Call Owner",
    type: "autocomplete",
    option_list: [],
  },
  {
    id: "10",
    db_field: "description",
    name: "Description",
    type: "text",
    option_list: [],
  },
  {
    id: "11",
    db_field: "call_purpose",
    name: "Call Purpose",
    type: "select",
    option_list: [
      "prospecting",
      "administrative",
      "negotiation",
      "demo",
      "project",
      "desk",
    ],
  },
  {
    id: "12",
    db_field: "call_agenda",
    name: "Call Agenda",
    type: "text",
    option_list: [],
  },
  {
    id: "13",
    db_field: "incoming_call_reason",
    name: "Reason For Incoming Call",
    type: "text",
    option_list: [],
  },
  { id: "14", db_field: "tag", name: "Tag", type: "tag", option_list: [] },
];

export const GridOneOptions = [
  {
    name: "Manufacturers",
    toggle: false,
    options: [
      {
        name: "Sell directly to businesses",
        checked: false,
        tooltip: "Offer bulk discounts and customization options.",
      },
      {
        name: "OEMs: Produce components for other businesses' products",
        checked: false,
        tooltip: "Offer specialized expertise and economies of scale.",
      },
    ],
    isChecked: false,
  },
  {
    name: "Agents and Representatives",
    isChecked: false,
    toggle: false,
    options: [
      {
        name: "Represent manufacturers or businesses in specific regions",
        checked: false,
        tooltip: "Build relationships and generate leads.",
      },
      {
        name: "Manufacturers' Agents: Sell specific brands or products",
        checked: false,
        tooltip: "Offer in-depth knowledge of the manufacturer's offerings.",
      },
      {
        name: "Selling Agents: Represent multiple businesses",
        checked: false,
        tooltip: "Offer broader market reach and expertise.",
      },
      {
        name: "Brokers: Facilitate transactions between buyers and sellers",
        checked: false,
        tooltip: "Offer efficient deal-making and market intelligence.",
      },
      {
        name: "Sell products directly to businesses",
        checked: false,
        tooltip: "Offer convenient ordering and delivery options.",
      },
    ],
  },
  {
    name: "Distributors",
    isChecked: false,
    toggle: false,
    options: [
      {
        name: "Provide access to a wide range of products",
        checked: false,
        tooltip: "Offer logistical and financial support.",
      },
      {
        name: "Exclusive Distributors: Sole rights in specific regions",
        checked: false,
        tooltip: "Provide in-depth market knowledge and support.",
      },
      {
        name: "Value-Added Distributors: Offer additional services",
        checked: false,
        tooltip:
          "Provide technical expertise, training, and marketing support.",
      },
    ],
  },
  {
    isChecked: false,
    name: "Retailers",
    toggle: false,
    options: [
      {
        name: "Wholesale Retailers: Sell in large quantities at discounted rates",
        checked: false,
        tooltip: "Offer cost-effective solutions for high-volume needs.",
      },
      {
        name: "E-commerce Retailers: Sell online, offering 24/7 access",
        checked: false,
        tooltip: "Offer wider product selection and competitive prices.",
      },
    ],
  },
];

export const GridTwoOptions = [
  {
    isChecked: false,
    name: "Wholesalers",
    toggle: false,
    options: [
      {
        name: "Sell products in bulk at competitive prices",
        checked: false,
        tooltip: "Offer efficient distribution networks.",
      },
      {
        name: "General Wholesalers: Wide variety of products",
        checked: false,
        tooltip: "Offer one-stop shopping convenience.",
      },
      {
        name: "Specialty Wholesalers: Deep expertise in specific categories",
        checked: false,
        tooltip: "Provide specialized knowledge and product recommendations.",
      },
    ],
  },
  {
    isChecked: false,
    name: "Resellers",
    toggle: false,
    options: [
      {
        name: "Resellers: Purchase and resell without adding value",
        checked: false,
        tooltip: "Offer competitive prices and flexible payment options.",
      },
      {
        name: "Value-Added Resellers (VARs) Enhance products before reselling",
        checked: false,
        tooltip: "Offer customization, installation, and training services.",
      },
    ],
  },
  {
    isChecked: false,
    name: "Others",
    toggle: false,
    options: [
      {
        name: "System Integrators: Design and integrate complex systems",
        checked: false,
        tooltip: "Offer deep technical knowledge and experience.",
      },
      {
        name: "Service Providers: Offer consulting, maintenance, and support services",
        checked: false,
        tooltip: "Provide specialized expertise and resources.",
      },
    ],
  },
];

export const GridOneBuyerOptions = [
  {
    name: "Online Store",
    toggle: false,
    options: [
      {
        name: "Niche eCommerce",
        checked: false,
        tooltip:
          "Specialized in specific products, like handmade goods or eco-friendly items.",
      },
      {
        name: "Multi-Category eCommerce",
        checked: false,
        tooltip: "Offers a wide range of products across different categories.",
      },
      {
        name: "Marketplace Platform",
        checked: false,
        tooltip:
          "Hosts multiple vendors, selling products from different sources.",
      },
    ],
    isChecked: false,
  },
  {
    name: "Manufacturer",
    isChecked: false,
    toggle: false,
    options: [
      {
        name: "OEM (Original Equipment Manufacturer) ",
        checked: false,
        tooltip:
          "Produces parts or products for other companies to rebrand and sell.",
      },
      {
        name: "Contract Manufacturer ",
        checked: false,
        tooltip: "Produces goods based on contracts with other companies.",
      },
      {
        name: "Private Label Manufacturer",
        checked: false,
        tooltip: "Creates products for brands to sell under their own label.",
      },
      {
        name: "Custom Product Manufacturer",
        checked: false,
        tooltip:
          "Produces made-to-order products based on client specifications.",
      },
    ],
  },
  {
    name: "Trading Company",
    isChecked: false,
    toggle: false,
    options: [
      {
        name: "Import-Export Trading",
        checked: false,
        tooltip:
          "Specializes in buying products from one country to sell in another.",
      },
      {
        name: "Domestic Trading",
        checked: false,
        tooltip: "Deals primarily within a specific country or region.",
      },
      {
        name: "Specialty Goods Trader",
        checked: false,
        tooltip: "Focuses on trading niche or specialized products.",
      },
      {
        name: "Commodity Trader",
        checked: false,
        tooltip: "Deals in large volumes of raw materials or basic goods.",
      },
    ],
  },
  {
    isChecked: false,
    name: "Wholesaler",
    toggle: false,
    options: [
      {
        name: "Distributor",
        checked: false,
        tooltip:
          "Works closely with manufacturers to distribute products to retailers or other businesses.",
      },
      {
        name: "Cash-and-Carry Wholesaler",
        checked: false,
        tooltip:
          "Operates a warehouse-style store where buyers purchase goods in bulk.",
      },
      {
        name: "Drop-Ship Wholesaler ",
        checked: false,
        tooltip:
          "Supplies products for drop shippers, often managing logistics.",
      },
      {
        name: "Online Wholesaler",
        checked: false,
        tooltip:
          "Conducts wholesale business primarily through online platforms.",
      },
    ],
  },
  {
    isChecked: false,
    name: "Retailer",
    toggle: false,
    options: [
      {
        name: "Brick-and-Mortar Retailer ",
        checked: false,
        tooltip: "Operates physical stores selling directly to consumers.",
      },
      {
        name: "Online Retailer ",
        checked: false,
        tooltip: "Sells products through an online store.",
      },
      {
        name: "Pop-Up Retailer ",
        checked: false,
        tooltip:
          "Operates temporary stores for short periods or special events.",
      },
      {
        name: "Direct-to-Consumer Brand ",
        checked: false,
        tooltip:
          "Sells products directly to consumers, often bypassing traditional retail channels.",
      },
    ],
  },
];

export const GridTwoBuyerOptions = [
  {
    isChecked: false,
    name: "Service Provider",
    toggle: false,
    options: [
      {
        name: "IT Service Provider",
        checked: false,
        tooltip:
          "Offers technology-related services like software solutions, development, and support.",
      },
      {
        name: "Maintenance and Repair Service",
        checked: false,
        tooltip:
          "Provides repair and maintenance services for equipment, buildings, or vehicles.",
      },
      {
        name: "Construction and Engineering Services.",
        checked: false,
        tooltip:
          "Provides design, build, and project management services for construction projects.",
      },
    ],
  },
  {
    isChecked: false,
    name: "EPC Contractor",
    toggle: false,
    options: [
      {
        name: "Energy Sector EPC",
        checked: false,
        tooltip:
          "Specializes in projects related to energy, like power plants or renewable energy installations.",
      },
      {
        name: "Infrastructure EPC",
        checked: false,
        tooltip:
          "Focuses on large-scale infrastructure projects, like highways, bridges, or railways.",
      },
      {
        name: "Industrial EPC ",
        checked: false,
        tooltip:
          "Handles projects for industrial facilities, like factories or processing plants.",
      },
      {
        name: "Water and Environmental EPC ",
        checked: false,
        tooltip:
          "Manages projects related to water treatment, waste management, or environmental protection.",
      },
    ],
  },
  {
    isChecked: false,
    name: "Dropshipper",
    toggle: false,
    options: [
      {
        name: "Niche Dropshipper",
        checked: false,
        tooltip:
          "Specializes in specific product categories, like electronics, fashion, or health products.",
      },
      {
        name: "Generalist Dropshipper",
        checked: false,
        tooltip: "Offers a wide range of products across different categories.",
      },
      {
        name: "Branded Dropshipper ",
        checked: false,
        tooltip:
          "Creates a unique brand around the products, focusing on marketing and customer experience.",
      },
      {
        name: "Marketplace Dropshipper",
        checked: false,
        tooltip:
          "Sells products across multiple online marketplaces like Amazon, eBay, or Etsy.",
      },
    ],
  },
  {
    isChecked: false,
    name: "Individual",
    toggle: false,
    options: [
      {
        name: "Solo Entrepreneur",
        checked: false,
        tooltip:
          "Independent business owners who handle all aspects of their business.",
      },
      {
        name: "Freelancer",
        checked: false,
        tooltip:
          "Provides specialized services like design, writing, or consulting, often needing supplies or tools.",
      },
      {
        name: "Hobbyist",
        checked: false,
        tooltip:
          "Purchases products or materials for personal projects or small-scale businesses.",
      },
      {
        name: "Independent Consultant",
        checked: false,
        tooltip:
          "Provides expert advice or services on a contract basis, requiring specific tools or resources.",
      },
    ],
  },
  {
    isChecked: false,
    name: "Other",
    toggle: false,
    options: [
      {
        name: "Non-Profit Buyer",
        checked: false,
        tooltip:
          "Purchases products or services for non-profit activities or charitable work.",
      },
      {
        name: "Educational Institution Buyer",
        checked: false,
        tooltip:
          "Acquires goods and services for schools, colleges, or universities.",
      },
      {
        name: "Government Buyer",
        checked: false,
        tooltip:
          "Engages in procurement for government projects or public sector needs.",
      },
      {
        name: "Event Planner",
        checked: false,
        tooltip:
          "Purchases supplies, decorations, or services for organizing events like weddings, conferences, or parties.",
      },
    ],
  },
];

export const CheckBoxFilter = [{ name: "is", values: "1" }];

export const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[^\s]{6,}$/;
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const isCommaSeparatedString = (value: any) => {
  if (typeof value !== "string") {
    return false; // If it's not a string, return false
  }

  // Use a regular expression to check if the string consists of one or more words separated by commas
  const regex = /^(\w+\s*,\s*)*\w+$/;
  return regex.test(value);
};
export const convertQuery = (type, value) => {
  if (type == "1") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else if (typeof value == "object") {
      let data = "`value`";
      return `CONCAT(',', ${data}, ',') REGEXP ',(${value?.join("|")}),')`;
    } else {
      return `value = '${value}' )`;
    }
  } else if (type == "2") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else if (typeof value == "object") {
      let data = "`value`";
      return `CONCAT(',', ${data}, ',') NOT REGEXP ',(${value?.join("|")}),')`;
    } else {
      return `value != '${value}' )`;
    }
  } else if (type == "3") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else {
      return `value LIKE '%${value}%' )`;
    }
  } else if (type == "4") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else {
      return `value NOT LIKE '%${value}%' )`;
    }
  } else if (type == "5") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else {
      return `value != ${value} )`;
    }
  } else if (type == "6") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else {
      return `value LIKE'%${value}' )`;
    }
  } else if (type == "7") {
    return `value IS NULL )`;
  } else if (type == "8") {
    return `value IS NOT NULL )`;
  } else if (type == "9") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else {
      return `value < ${value} )`;
    }
  } else if (type == "10") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else {
      return `value > ${value} )`;
    }
  } else if (type == "11") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else {
      return `value <= ${value} )`;
    }
  } else if (type == "12") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else {
      return `value >= ${value} )`;
    }
  } else if (type == "13") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else {
      return `value != ${value} )`;
    }
  } else if (type == "14") {
    if (value == null || value == "") {
      return `value IS NULL )`;
    } else {
      return `value != ${value} )`;
    }
  }
  return "";
};
export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const NameFromUrl = (url) => {
  try {
    return url.substring(url.lastIndexOf("/") + 1).substring(0, 8);
  } catch (err) {
    return "";
  }
};

export const convertDateTimeToFormat = (value) => {
  try {
    const timestamp = value;
    const parsedDate = moment(timestamp, "YYYY-MM-DD hh:mm:ss A");
    const currentDate = moment();

    const years = currentDate.diff(parsedDate, "years");
    const months = currentDate.diff(parsedDate, "months");
    const days = currentDate.diff(parsedDate, "days");
    const hours = currentDate.diff(parsedDate, "hours");
    let difference = "";

    if (years >= 1) {
      difference = `${years} Yr${years > 1 ? "s" : ""}`;
    } else if (months >= 1) {
      difference = `${months} Month${months > 1 ? "s" : ""}`;
    } else if (days >= 1) {
      difference = `${days} Day${days > 1 ? "s" : ""}`;
    } else {
      difference = `${hours} Hour${hours > 1 ? "s" : ""}`;
    }

    return difference;
  } catch (err) {
    return "";
  }
};

let image = (src: string) => (
  <Image src={`/assets/${src}.svg`} height={16} width={16} alt="social media" />
);

export const LicenseKey =
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=";
export const SocialMediaList = [
  {
    id: 1,
    name: "WhatsApp",
    logo: <i className="icon-whatsapp"></i>,
  },
  {
    id: 2,
    name: "LinkedIn",
    logo: <i className="icon-linkedin-bold"></i>,
  },
  {
    id: 3,
    name: "Skype",
    logo: <i className="icon-skype"></i>,
  },
  {
    id: 4,
    name: "WeChat",
    logo: <i className="icon-wechat"></i>,
  },
  {
    id: 5,
    name: "Instagram",
    logo: <i className="icon-instagram1"></i>,
  },
  {
    id: 7,
    name: "Facebook",
    logo: <i className="icon-fb-bold"></i>,
  },
  {
    id: 8,
    // name: "Twitter",
    name: "Twitter/X",
    logo: <img alt={"twitter"} src="/assets/images/twitter_latest_icon.svg" />,
  },
];

export const GetFileExtension = (fname: String) => {
  if (fname) return fname.slice(((fname.lastIndexOf(".") - 1) >>> 0) + 2);
};

export function isImageFile(fileName) {
  const imageExtensions = [".jpg", ".jpeg", ".png"];
  return imageExtensions.some((ext) => fileName?.toLowerCase().endsWith(ext));
}

const Symbols = [
  { id: 1, name: "U.S. Dollar", code: "USD", symbol: "$" },
  { id: 1, name: "U.S. Dollar", code: "USD", symbol: "$" },
  { id: 2, name: "Australian Dollar", code: "AUD", symbol: "$" },
  { id: 3, name: "British Pound Sterling", code: "GBP", symbol: "£" },
  { id: 5, name: "Chinese Yuan Renminbi", code: "CNY", symbol: "(¥)" },
  { id: 4, name: "Brazilian Real", code: "BRL", symbol: "R$" },
  { id: 6, name: "Canadian Dollar", code: "CAD", symbol: "$" },
  { id: 7, name: "Czech Koruna", code: "CZK", symbol: "Kč" },
  { id: 8, name: "Danish Krone", code: "DKK", symbol: "kr" },
  { id: 9, name: "Euro", code: "EUR", symbol: "€" },
  { id: 10, name: "Hong Kong Dollar", code: "HKD", symbol: "$" },
  { id: 11, name: "Hungarian Forint", code: "HUF", symbol: "Ft" },
  { id: 12, name: "Israeli New Sheqel", code: "ILS", symbol: "₪" },
  { id: 13, name: "Japanese Yen", code: "JPY", symbol: "¥" },
  { id: 14, name: "Malaysian Ringgit", code: "MYR", symbol: "RM" },
  { id: 15, name: "Mexican Peso", code: "MXN", symbol: "$" },
  { id: 16, name: "Norwegian Krone", code: "NOK", symbol: "kr" },
  { id: 17, name: "New Zealand Dollar", code: "NZD", symbol: "$" },
  { id: 18, name: "Philippine Peso", code: "PHP", symbol: "₱" },
  { id: 19, name: "Polish Zloty", code: "PLN", symbol: "zł" },
  { id: 20, name: "Pound Sterling", code: "GBP", symbol: "£" },
  { id: 21, name: "Russian Ruble", code: "RUB", symbol: "руб" },
  { id: 22, name: "Singapore Dollar", code: "SGD", symbol: "$" },
  { id: 23, name: "Swedish Krona", code: "SEK", symbol: "kr" },
  { id: 24, name: "Swiss Franc", code: "CHF", symbol: "CHF" },
  { id: 26, name: "Thai Baht", code: "THB", symbol: "฿" },
  { id: 27, name: "Taka", code: "BDT", symbol: "৳" },
  { id: 28, name: "Rupee", code: "Rupee", symbol: "₹" },
];

export const CurrencySymbol = (id: number, field = "") => {
  try {
    if (field) {
      return Symbols.find((v) => v.id === id)[field];
    } else {
      return Symbols.find((v) => v.id === id).symbol;
    }
  } catch (err) {
    return "$";
  }
};

export const FirstletterCapital = (str: string) =>
  str?.charAt(0)?.toUpperCase() + str?.slice(1);

// export const Navigate = (data: any) => {
//   const {
//     slug,
//     category_name,
//     company_details,
//     name,
//     shop_name,
//     brand_name,
//     id,
//     searchKey = "",
//     product_url,
//   } = data;
//   window.open(
//     `/productdetail/${slug}?search_keyword=${searchKey}`,
//     "_blank",
//     "noreferrer"
//   );
// };

export const Navigate = (data: any) => {
   const {
    slug,
    category_name,
    company_details,
    name,
    shop_name,
    brand_name,
    id,
    searchKey = "",
  } = data;
  
  window.open(
    `/productdetail/${
      ReplaceSpaces(category_name) || ReplaceSpaces(brand_name) || id
    }/${ReplaceSpaces(company_details?.slug ?? shop_name)}/${ReplaceSpaces(
      slug
    )}?search_keyword=${searchKey}`,
    "_blank",
    "noreferrer"
  );
};

export const GetUrlParams = (param) => {
  var url = new URL(window.location.href);
  return url.searchParams.get(param);
};

export const DecodeUrl = (url) => url?.replace(/%20/g, " ") ?? "";

export const GetCurrentPlan = async (setFeatureList = null) => {
  let response = await apiClient("users/current_plan", "get");
  if (response.status == 200) {
    if (setFeatureList) setFeatureList(response.data.feature_list);
    localStorage.setItem(
      "planDetail",
      JSON.stringify(response.data.feature_list)
    );
  }
  return response;
};

export const resizeImage = (imageFile) => {
  let promise = new Promise((resolve) => {
    Resizer.imageFileResizer(
      imageFile,
      480,
      480,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
      400,
      400
    );
  });
  return promise;
};

export const FeatureImage = (photos) => {
  if (photos?.length > 0) {
    let featuredImage = photos.filter((v) => v.is_featured == "1");
    if (featuredImage.length > 0) {
      let index = photos.findIndex((v) => v.is_featured == "1");
      return handleSelectedImage(photos, index);
    } else {
      return photos;
    }
  } else {
    return [];
  }
};

const handleSelectedImage = (image, index) => {
  let newImageArray = [...image];
  let firstItems = newImageArray.slice(0, index);
  let endItems = newImageArray.slice(index);
  newImageArray.unshift(image);
  return [...endItems, ...firstItems];
};

export const getUniqueListBy = (arr, key = null) => {
  if (key) {
    return [...new Map(arr?.map((item) => [item[key], item]))?.values()];
  } else {
    return [...new Set(arr)];
  }
};

export const checkExpiry = (expiryDate) => {
  const currentDate = new Date();
  const parsedExpiryDate = new Date(expiryDate);
  return parsedExpiryDate >= currentDate;
};

export const FetchQueryParams = (params) => {
  const urlObject = new URL(window.location.href);
  const id = urlObject.searchParams.get(params);
  return id;
};

export const ReplaceSpaces = (str) => {
  if (str) return str?.replaceAll(" ", "-") ?? str;
};

export const randomStr = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const trackUserActivity: any = (
  event,
  lastScrollTimeRef,
  lastScrollTopRef,
  scrollSpeed,
  activityData,
  pathname
) => {
  if (event?.type === "scroll") {
    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage =
      (currentScrollTop / (documentHeight - windowHeight)) * 100;
    const currentTime = new Date().getTime();

    let scrollDistance = 0;
    if (lastScrollTimeRef.current && lastScrollTopRef.current) {
      scrollDistance = currentScrollTop - lastScrollTopRef.current;
      const timeElapsed = currentTime - lastScrollTimeRef.current;
      scrollSpeed = windowHeight / timeElapsed;
    }
    const scrollableHeight =
      (currentScrollTop / (documentHeight - windowHeight)) * 100;
    const TotalScrolled = (scrollableHeight * windowHeight) / 100;
    lastScrollTopRef.current = currentScrollTop;
    lastScrollTimeRef.current = currentTime;
    const ScrolledData: any = {
      scrollSpeed: scrollSpeed.toFixed(2),
      scrollPercentage: scrollPercentage.toFixed(2),
      pageHeight: windowHeight,
      scrolled: TotalScrolled.toFixed(2),
      noScrolled: (windowHeight - TotalScrolled).toFixed(2),
    };
    const getScrolledData = JSON.parse(localStorage.getItem("ScrolledData"));
    if (getScrolledData?.scrollPercentage > scrollPercentage?.toFixed(2)) {
    } else {
      localStorage.setItem("ScrolledData", JSON.stringify(ScrolledData));
      const payload = {
        session_id:
          localStorage.getItem("sessionId") == null
            ? sessionStorage.getItem("sessionId")
            : localStorage.getItem("sessionId"),
        page_viewed_id: localStorage.getItem("user_trackID"),
        scroll_position: TotalScrolled.toFixed(2),
        position_type: "Product",
        // position_type:pathname?.includes("/productlist")?"Product"? pathname?.includes("/mini-site/")?"mini-site":"",
        page_height: windowHeight,
      };

      // setTimeout(() => {
      //   trackScrollEvents(payload)
      // },2000);
    }
  } else if (event?.type === "click") {
    const tooltipData = event.target.getAttribute("aria-label");
    // tooltipData !== null && trackPageEvents(tooltipData);
    localStorage.setItem("clickInfo", tooltipData);
    // if (tooltipData !== null) {
    //   const clickedData = localStorage.getItem("clickInfo") || "";
    //   const newClickedData = `${clickedData},${tooltipData}`;
    //   localStorage.setItem("clickInfo", newClickedData);
    // }

    if (event.target.tagName === "IMG") {
      // trackPageEvents("Product Image");
      localStorage.setItem("clickInfo", "Product Image");
    }

    if (event.target.textContent) {
      localStorage.setItem("clickInfo", event.target.href);
    }
    if (!event.target) {
      return;
    }

    const clickedElement = event.target;
    if (
      clickedElement.tagName === "BUTTON" ||
      clickedElement.getAttribute("role") === "button"
    ) {
      // trackPageEvents(clickedElement.innerText);
      localStorage.setItem("clickInfo", clickedElement.innerText);
      // const clickedData = localStorage.getItem("clickInfo") || "";
      // const newClickedData = `${clickedData},${clickedElement.innerText}`;
      // activityData = {
      //   ...activityData,
      //   clickedData: newClickedData,
      // };
      // if (clickedElement.innerText !== undefined) {
      //   localStorage.setItem("clickInfo", newClickedData);
      // }
    } else {
      return;
    }
  } else if (event.target.href || event.target.nodeName === "A") {
    localStorage.setItem(
      "clickInfo",
      event.target.href ? event.target.href : event.target.nodeName
    );
    activityData = {
      ...activityData,
      type: event.type,
      link: event.target.href ? event.target.href : event.target.nodeName,
    };
  } else {
    return;
  }

  const existingData = Cookies?.get("userActivity");
  const newData = existingData ? JSON.parse(existingData) : [];
  newData.push(activityData);
  Cookies?.set("userActivity", JSON.stringify(newData), { expires: 1 });
};

export const handleTrackUser: any = (event, pathName, getTrackedId) => {
  if (event?.type === "click") {
    if (event.target.tagName === "IMG") {
      event.target.tagName !== null &&
        trackPageEvents("Product Image", event.target.src, getTrackedId);
    } else if (
      event?.target?.tagName === "BUTTON" ||
      event?.target?.getAttribute("role") === "button"
    ) {
      const trackableBtn = [
        "Get Quote Now",
        "Search",
        "Submit",
        "View Certificate",
        "Get Quote",
        "Company Profile",
        "Submit Feedback",
        "Send Message",
        "Remove Contact",
        "Add to Contact",
        "Product Resources",
        "Send a Query",
        "Technical Specifications",
        "Packaging Details",
        "Shipping option",
        "Warranty Information",
        "Certifications and Compliance",
        "Return Policy",
        "Product Description",
        "Contact Supplier",
        "Know More",
        "Chat With Seller",
        "Chat",
        " Chat With Seller",
        "All Products",
        "Old",
      ];
      const buttonName = event.target.textContent;
      if (trackableBtn.includes(buttonName)) {
        trackPageEvents(buttonName, "", getTrackedId);
      }
    } else if (event?.target?.tagName == "INPUT") {
      if (pathName == "/productlist") {
        // const inputButton=["Categories","MemberType","Manufacturer",,"Agents and Representative","Distributor","Retailer",,"Wholesaler","Reseller","Others","Price Range","Brand","BusinessType","Condition","PriceType","Product Availability","Annual Revenue","Manufacturer Year"]
        // if (inputButton?.includes(event?.target?.name)) {
        if (event?.target?.name !== "") {
          trackPageEvents(event?.target?.name, "", getTrackedId);
        }

        // }
      }
    } else if (event.target.textContent !== "") {
      const typographyContent = [
        "Read Reviews.",
        "Verified Member",
        "Gold Member",
        "Silver",
        " View more!",
        "View More...!",
        "Get Quote",
        "Get Quote Now",
        "View more",
        "Contact us",
        "Followers",
        "Contact Supplier",
        "Copy link",
        "View Image",
      ];
      if (typographyContent?.includes(event.target.textContent)) {
        trackPageEvents(event.target.textContent, "", getTrackedId);
      }
    } else if (event.target.href || event.target.nodeName === "A") {
    } else {
      const tooltipData = event.target.getAttribute("aria-label");
      const SvgAriaLavelContent = [
        "Wishlist",
        "Chat with Seller",
        "Grid View",
        "List View",
        "search",
        "Copy link and share anywhere",
        "facebook",
        "linkedIn",
        "twitter",
        "whatsapp",
      ];
      tooltipData !== null &&
        SvgAriaLavelContent?.includes(tooltipData) &&
        trackPageEvents(tooltipData, "", getTrackedId);
    }
  } else if (event?.type === "scroll") {
    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage =
      (currentScrollTop / (documentHeight - windowHeight)) * 100;
    const scrollableHeight =
      (currentScrollTop / (documentHeight - windowHeight)) * 100;
    const TotalScrolled = (scrollableHeight * windowHeight) / 100;
    const getScrolledData = JSON.parse(
      localStorage.getItem("scrollPercentage")
    );
    if (getScrolledData > scrollPercentage?.toFixed(2)) {
    } else {
      localStorage.setItem(
        "scrollPercentage",
        JSON.stringify(scrollPercentage)
      );
      const payload = {
        session_id:
          localStorage.getItem("sessionId") == null
            ? sessionStorage.getItem("sessionId")
            : localStorage.getItem("sessionId"),
        page_viewed_id: getTrackedId,
        scroll_position: TotalScrolled.toFixed(2),
        position_type: "Product",
        // position_type:pathname?.includes("/productlist")?"Product"? pathname?.includes("/mini-site/")?"mini-site":"",
        page_height: windowHeight,
      };
      trackScrollEvents(payload);
    }
  } else {
    return;
  }
};

export const handleTrackData: any = async (Data, lastVisitedUrl) => {
  const getScrolledData = JSON.parse(localStorage.getItem("ScrolledData"));
  const getClickedData = localStorage?.getItem("clickInfo");
  let dataArray = getClickedData?.split(",");
  const startTime = localStorage.getItem("pageStart");
  const totalDuration =
    moment(new Date(), "h:mm:ss A").diff(
      moment(startTime, "h:mm:ss A"),
      "minutes"
    ) / 60;
  let counts = {};
  dataArray?.forEach(function (item) {
    if (item !== "") {
      counts[item] = (counts[item] || 0) + 1;
    }
  });

  const payload = {
    ip: localStorage.getItem("ipAddress"),
    user_id: JSON?.parse(localStorage?.getItem("userData"))?.id,
    url: localStorage.getItem("Pageurl")
      ? localStorage.getItem("Pageurl")
      : lastVisitedUrl,
    // url: Data?.url ? Data?.url : lastVisitedUrl,
    city: "",
    country_code: JSON.parse(localStorage.getItem("country_code"))
      ?.country_code,
    country_name: JSON.parse(localStorage.getItem("country_code"))
      ?.country_name,
    page_start_time:
      startTime == null
        ? moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        : startTime,
    page_end_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    total_page_time: Math.abs(totalDuration)?.toFixed(2),
    // total_page_time: Data?.duration
    //   ? Data?.duration
    //   : localStorage.getItem("duration"),
    click_info: counts ? JSON.stringify(counts) : "",
    scroll_percentage: getScrolledData?.scrollPercentage
      ? getScrolledData?.scrollPercentage
      : 0,
    scrollspeed: getScrolledData?.scrollSpeed
      ? getScrolledData?.scrollSpeed
      : 0,
    sessionId:
      localStorage.getItem("sessionId") == null
        ? sessionStorage.getItem("sessionId")
        : localStorage.getItem("sessionId"),
    scrolled: getScrolledData?.scrolled ? getScrolledData?.scrolled : 0,
    noScrolled: getScrolledData?.noScrolled ? getScrolledData?.noScrolled : 0,
    previousUrl: lastVisitedUrl,
    title: document.title,
  };

  let response = await apiClient("auth/track-me", "post", {
    body: payload,
  });
  if (response.status == true || response.status == 200) {
    localStorage.removeItem("clickInfo");
    localStorage.removeItem("scrollPercentage");
    localStorage.removeItem("scrollSpeed");
    localStorage.removeItem("pageStart");
    localStorage.removeItem("Pageurl");
    localStorage.removeItem("ScrolledData");
    localStorage.removeItem("duration");
    localStorage.removeItem("previousUrl");
  }
};

export const timeInMinutes = (startTime, endTime) => {
  let time1 = moment(startTime, "h:mm:ss A");
  const pageStartTime = localStorage.getItem("pageStart");
  let time2 = moment(endTime, "h:mm:ss A");
  const differenceInSeconds = time2.diff(
    pageStartTime ? pageStartTime : time1,
    "minutes"
  );
  return differenceInSeconds;
  // const differenceInMinutes = moment.duration(differenceInSeconds).asMinutes();
  // localStorage.setItem("duration",JSON.stringify(differenceInSeconds));
  // return differenceInSeconds;
};

export const trackPageView: any = async (
  lastVisitedUrl,
  anyAcitivity,
  type,
  productDetail,
  getTrackedId
) => {
  const payload = {
    ip: localStorage.getItem("ipAddress"),
    user_id: JSON?.parse(localStorage?.getItem("userData"))?.id
      ? JSON?.parse(localStorage?.getItem("userData"))?.id
      : 0,
    user_agent: CheckOs(),
    referrer_url: "",
    page_url: lastVisitedUrl,
    page_name:
      type == "ProductDetail"
        ? productDetail?.name
        : document?.title
        ? document?.title
        : lastVisitedUrl?.split("/")?.slice(-1)[0],
    type: type,
    product_slug: type == "ProductDetail" ? productDetail?.slug : "",
    product_categories:
      type == "ProductDetail" ? productDetail?.category_lists : "",
    product_id: type == "ProductDetail" ? productDetail?.id : "",
    session_id:
      localStorage.getItem("sessionId") !== null
        ? localStorage.getItem("sessionId")
        : sessionStorage.getItem("sessionId"),
    only_update: anyAcitivity ? anyAcitivity : "",
    page_id: getTrackedId ? getTrackedId : "",
  };
  let response = await apiClient("auth/tracking-page-views", "post", {
    body: payload,
  });
  if (response.status == true || response.status == 200) {
    if (anyAcitivity == "") {
      localStorage.setItem("user_trackID", response.data);
      return response.data;
    }
  }
};

export const trackPageEvents = async (ClickedData, url, getTrackedId) => {
  const eventPayloads = {
    session_id:
      localStorage.getItem("sessionId") == null
        ? sessionStorage.getItem("sessionId")
        : localStorage.getItem("sessionId"),
    page_viewed_id: getTrackedId,
    element_type: ClickedData ? ClickedData : "",
    url: ClickedData == "Product Image" && url,
  };
  let response = await apiClient("auth/tracking-click-events", "post", {
    body: eventPayloads,
  });
  if (response.status == true || response.status == 200) {
    localStorage?.removeItem("clickInfo");
  }
};

export const trackScrollEvents = async (payload) => {
  let response = await apiClient("auth/tracking-scroll-events", "post", {
    body: payload,
  });
  if (response.status == true || response.status == 200) {
    return;
  }
};

export const generateSessionId = (length) => {
  // const sessionId=Math.random().toString(36).substring(2)
  const sessionId = Math.floor(Math.random() * Math.pow(10, length));
  const idString = sessionId.toString();
  // Cookies.set("sessionId", idString.padStart(length, "0"));
  // Cookies.set("testingsessionId", idString.padStart(length, "0"));
  return idString.padStart(length, "0");
};
export const setCookiesData = (startTime) => {
  // const clickedData = JSON?.parse(Cookies?.get(type) || '[]');
  // const updatedClickedData = [...clickedData, cookieData];
  // Cookies?.set(type, JSON.stringify(updatedClickedData), { expires: 1 });
};

export const updateTabCount = (count) => {
  localStorage.setItem("openTabs", count.toString());
  if (count == 0) {
    // removeSessionId();
  }
};

export const incrementTabCount = () => {
  let count = parseInt(localStorage.getItem("openTabs")) || 0;
  count++;
  updateTabCount(count);
};

export const decrementTabCount = () => {
  let count = parseInt(localStorage.getItem("openTabs")) || 0;
  count--;
  if (count < 0) count = 0;
  updateTabCount(count);
};

export const getTabCount = () => {
  return parseInt(localStorage.getItem("openTabs")) || 0;
};

export const areAllTabsClosed = () => {
  return getTabCount() === 0;
};

export const removeSessionId = () => {
  Cookies.remove("sessionId");
  localStorage.removeItem("sessionId");
  localStorage.removeItem("openTabs");
};

// export const getBase64 = async (url) => {
//   try {
//     let response = await fetch(url);
//     if (!response.ok) {
//       // throw new Error(`Failed to load`);
//     }
//     const buffer = await response.arrayBuffer();
//     const base64 = "";
//     await getPlaiceholder(Buffer.from(buffer));
//     return base64;
//   } catch (e) {
//     if (e instanceof Error) {
//       console.log(e);
//     }
//   }
// };
// export const addBlurredDataUrls = async (images) => {
//   const base64Promises = images.photos.map((v) => getBase64(v.src.large));
//   const base64Results = await Promise.all(base64Promises);
//   const photoWithBlur = images.photos.map((photo, i) => {
//     photo.blurredDataUrl = base64Results[i];
//     return photo;
//   });
//   return photoWithBlur;
// };

export const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

export const CheckDevice = () => {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
};

export const CheckOs = () => {
  var userAgent = window.navigator.userAgent;
  const osRegex = /(?:Windows NT|Mac OS X|Linux|Android|iOS)[^\)]*/;
  const osInfo = userAgent.match(osRegex);
  return osInfo ? osInfo[0] : "Unknown";
};

export const BrandList = [
  {
    name: "Brand New",
    buyer: "This is the highest quality condition available.",
    seller:
      "The product is in its original, unopened packaging. It has never been used or installed. All original accessories and documentation are included.",
  },
  {
    name: "New - Open Box",
    buyer:
      "This is a good alternative to Brand New when the original packaging is not important.",
    seller:
      "The product is unused and in new condition. The original packaging may have been opened, but the product remains unused. All original accessories and documentation are included.",
  },
  {
    name: "Surplus Stock",
    buyer:
      "This is a good option for buyers looking for a good deal on a brand-new product.",
    seller:
      "The product is new and unused but may not be in its original packaging. Often sold at a discounted price.",
  },
  {
    name: "Clearance",
    buyer: "This is a great opportunity to get a great deal on a product.",
    seller:
      "The product is offered at a significantly reduced price to clear excess inventory. It may be new or gently used but is priced to sell quickly. Limited quantities may be available.",
  },
  {
    name: "Damaged Packaging",
    buyer:
      "This is a good option for buyers who are not concerned about the packaging and want to save money.",
    seller:
      "The product is new, but the external packaging is damaged. The internal product remains unaffected and functional.",
  },
  {
    name: "Manufacturer Refurbished",
    buyer:
      "This offers a lower price than Brand New with the same level of functionality.",
    seller:
      "The product has been restored to like-new condition by the manufacturer or an authorized  service centre. It undergoes a thorough inspection and testing process. It may come in new packaging.",
  },
  {
    name: "Seller Refurbished",
    buyer:
      "This is a good option for budget-conscious buyers who are comfortable with minor imperfections.",
    seller:
      "The product has been inspected, repaired, and tested to ensure proper functionality. It may show signs of wear but should function like new.",
  },
  {
    name: "Used - Like New",
    buyer: "This offers a good balance between price and quality. ",
    seller:
      "The product has been used but shows minimal signs of wear. It is in excellent condition and functions perfectly. Original packaging and accessories may or may not be included. ",
  },
  {
    name: "Used - Very Good",
    buyer:
      "This is a good option for buyers who are comfortable with some wear and tear. ",
    seller:
      "The product has been used and may show some signs of wear. It is in good condition and functions well. Original packaging and accessories may or may not be included. ",
  },
  {
    name: "Used - Good",
    buyer: "This is a good option for buyers on a tight budget.",
    seller:
      "The product has been used and shows moderate signs of wear. It is inacceptable condition and functions adequately. Original packaging and accessories may or may not be included. ",
  },
  {
    name: "Used - Acceptable",
    buyer:
      "This is the lowest quality condition available. Only recommended for buyers who are comfortable with this condition.",
    seller:
      "The product has been used extensively and may have significant signs of wear. It is in working condition but may require some refurbishing. Original packaging and accessories may or may not be included.",
  },
  {
    name: "Parts Only",
    buyer:
      "This is a good option for buyers who have the skills and knowledge to repair the product.",
    seller: "The product is not functional and is sold for parts only.",
  },
  {
    name: "Not Working",
    buyer:
      "This is the lowest quality condition available and should only be purchased by buyers who are comfortable with a non-functional product.",
    seller: "The product is not functional and cannot be repaired.",
  },
  {
    name: "Damaged - Functional",
    buyer:
      "This is a good option for buyers who are not concerned about the appearance of the product.",
    seller: "The product is functional but has significant damage.",
  },
  {
    name: "Damaged - Non-Functional",
    buyer:
      "This is only suitable for buyers who are willing to attempt repair or use parts.",
    seller: "The product is damaged and non-functional.",
  },
];

export const convertDate = (inputDate) => {
  if (!inputDate) return "";
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/*********************************************************Chat WIndow Commons****************************************************************************/
/**
 * Create an Echo connection and add the connection instance to the window.
 * @returns Echo connection
 */
export const createEchoInstance = () => {
  const echoInstance = new Echo({
    broadcaster: "reverb",
    key: "c3ot369vmc6dmbsz2oei",
    wsHost: "merchantad.com",
    wsPort: 443,
    forceTLS: true,
    enabledTransports: ["ws"],
    auth: {
      headers: {
        Authorization: `Bearer ${Auth.token()}`,
        Accept: "application/json",
      },
    },
    authEndpoint: "https://merchantad.com/broadcasting/auth",
  });
  (window as any).Echo = echoInstance;
  return echoInstance;
};

/**
 * Get Logged In user ID from local Storage
 * @returns User ID
 */
export const getUserIdLocalStorage = () => {
  if ((localStorage || {}) && typeof localStorage !== "undefined") {
    const userData = localStorage?.getItem("userData");
    const { id } = userData ? JSON.parse(userData) : { id: 0 };
    return id;
  }
};

/**
 * Formats a timestamp into a string representing the time in "HH:MM AM/PM" format.
 * @param {number} timestamp -  The timestamp to format (in milliseconds)
 * @returns
 */
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hoursStr = hours.toString().padStart(2, "0");
  return `${hours}:${minutes} ${period}`;
};

/**
 * Translates a message to the specified language.
 * @param {string} - The message to translate.
 * @param {string} - The language code to translate the message to.
 * @returns {string} Translated text
 */
export const translateText = async (message = "", toTranslate = "en") => {
  try {
    const response = await fetch("/api/translation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message, to: toTranslate }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok while Translating text");
    }

    const data = await response.json();
    return data?.translatedText;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches the chat history for a user.
 *
 * @param {number} options.userId - The user ID for which to fetch chat history.
 * @param {boolean} options.isGroup - Flag to indicate if the chat is a group chat.
 * @param {string} options.roomID - The room ID if fetching group chat history.
 * @param {string} [options.params=""] - Additional query parameters.
 * @param {string} [options.url=""] - Optional URL for fetching chat history.
 *
 * @returns {Object} The response data containing the chat history.
 * @throws Will throw an error if fetching chat history fails.
 */
export const fetchChatHistory = async ({
  userId,
  isGroup,
  roomID,
  params = "",
  url = "",
  pageNumberParam = "",
}: FetchChatHistoryParams) => {
  const chatHistoryApi = `${BASE_URL_CHAT}chat-history/${userId}?${pageNumberParam}`;
  try {
    let urlParams = new URLSearchParams();
    if (isGroup === 1) params = `room_id=${roomID}`;
    if (url) {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.forEach((value, key) => {
        urlParams.append(key, value);
      });
    }
    const urlToFetch = pageNumberParam
      ? chatHistoryApi
      : `${BASE_URL_CHAT}chat-history/${userId}?${
          params ? params : urlParams.toString()
        }`;
    const response = await fetch(urlToFetch, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

/**
 * Formats a date string based on its proximity to today's date.
 * If the date is today, returns "Today".
 * If the date is yesterday, returns "Yesterday".
 * Otherwise, returns the date in the format "DD-MM-YYYY".
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 */
export const formatRelativeDate = (dateString, relativeDate) => {
  if (!dateString) return "";
  const messageDate = new Date(dateString);
  if (relativeDate) {
    return `${messageDate.getDate()}/${
      messageDate.getMonth() + 1
    }/${messageDate.getFullYear()}`;
  }
  const today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  } else if (
    messageDate.getDate() === yesterday.getDate() &&
    messageDate.getMonth() === yesterday.getMonth() &&
    messageDate.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  } else {
    return `${messageDate.getDate()}-${messageDate.getMonth()}-${messageDate.getFullYear()}`;
  }
};

/**
 * Marks a message as read in a chat room.
 * @param {Number} lastMessageId - The ID of the last message to mark as read.
 * @param {Number} roomID - The ID of the chat room.
 */
export const markMessageAsRead = async (
  lastMessageId = null,
  roomID = null
) => {
  try {
    const response = await fetch(
      `${BASE_URL_CHAT}markAsRead?message_id=${+lastMessageId}&room_id=${+roomID} `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
      }
    );
  } catch (error) {}
};

/**
 * Sends a message to a recipient in a chat room.
 * @param {Object} props - The properties for sending the message.
 * @param {string} props.currentTypingMessage - The message content to send.
 * @param {string} props.activeUserID - The ID of the recipient user.
 * @param {string} props.roomId - The ID of the chat room.
 * @param {string|null} props.id - (Optional) The ID of the parent message being replied to, or null if not a reply.
 * @returns {Promise<Object|null>} A Promise that resolves to the JSON response from the server, or null if an error occurs.
 */
export const sendMessage = async (props) => {
  const {
    currentTypingMessage = "",
    activeUserID = "",
    roomId = "",
    id = "",
    selectedFiles = [],
    messageType = "",
    chat_transfer_id,
    replied_message,
    replyingId,
  } = props || {};
  try {
    const formData = new FormData();
    if (selectedFiles?.length > 0) {
      for (let i = 0; i < selectedFiles?.length; i++) {
        formData.append("files[]", selectedFiles[i]);
      }
    }
    formData.append("message", currentTypingMessage);
    formData.append("message_type", messageType);
    formData.append("recipient_id", activeUserID);
    formData.append("roomId", roomId);
    formData.append("replied_parent_id", replyingId ?? "");
    formData.append("replied_message", replied_message ?? "");
    formData.append("read", "sent");
    formData.append("chat_transfer_id", chat_transfer_id ?? 0);

    const response = await fetch(`${BASE_URL_CHAT}rooms/send-message`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${Auth?.token()}`,
      },
      body: formData,
      // body: JSON.stringify({
      //   formData
      // }),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    return null;
  }
};

/**
 * Retrieves the current page URL and constructs a quotation URL based on it.
 * @returns {string} The quotation URL.
 */
export const getCurrentPageURL = () => {
  const url = new URL(window?.location?.href || "");
  const pathName = url?.pathname.substr(1);
  const quotationUrl = "https://www.merchantad.com//" + pathName;
  return quotationUrl;
};

//function for for processing the html data in response for file shared in chat
/**
 * @param {string} responseText - response from api in html(pass the value in string).
 * @returns {<Object|null>} returns a object with two properties fileType and fileData both value in string.
 */

export const processHtmlResponseFile = (responseText) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = responseText;

  let fileType;
  let fileData;

  if (responseText?.includes("object")) {
    const objectHtml = tempDiv?.querySelector("object");
    fileType = "file";
    fileData = objectHtml?.getAttribute("data");
  } else if (responseText?.includes("img")) {
    const imgHtml = tempDiv?.querySelector("img");
    fileType = "image";
    fileData = imgHtml?.getAttribute("src");
  }

  if (fileType && fileData) {
    return {
      fileType: fileType,
      fileData: fileData,
    };
  } else {
    return null;
  }
};

//function for extracting the file name from api response link.
/**
 * @param {string} responseMessageFromAPI - response from api in in link form.
 * @returns {string} returns a string with extracted file name.
 */
export const extractFileName = (responseMessage) => {
  let newStr;
  if (responseMessage?.includes(",")) {
    newStr = responseMessage?.split(",");
  } else {
    newStr = [responseMessage];
  }

  let fileName = newStr[newStr?.length - 1]?.trim();

  // Extracting the substring starting from the character after the first underscore
  let substring = fileName?.substring(fileName?.indexOf("_") + 1);

  // Splitting the substring by underscores
  let parts = substring?.split("_");

  // Joining the parts back into a single string with underscores
  let decodedFileName = parts?.join("_");

  // Decoding URL-encoded characters
  let decodedFileNameAndExtension = decodeURIComponent(decodedFileName);

  return decodedFileNameAndExtension;
};

/**
 * @param users - User List
 * @returns {object} Count of unread and archived messages
 */
export const calculateTotalUnreadArchivedMessages = (users) => {
  if (!users) return { unread: 0, archived: 0 };

  let archivedUnreadCount = 0;
  let unreadCount = 0;

  users?.forEach((user) => {
    if (user?.is_archived === 1) {
      archivedUnreadCount += user?.unread_count || 0;
    } else {
      unreadCount += user?.unread_count || 0;
    }
  });

  return {
    unreadMessageCount: unreadCount,
    archivedUnreadMessageCount: archivedUnreadCount,
  };
};

/**
 * @param nextUserListUrl - Pagination - next page URL.
 * @returns {Array} User lists.
 */
export const fetchMoreUserList = async (nextUserListUrl: string = "") => {
  if (nextUserListUrl) {
    try {
      const response = await fetch(nextUserListUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
          Accept: "application/json",
        },
      });
      const users = await response.json();
      return users;
    } catch (error) {
      return [];
    }
  }
};

/**
 * Gets a private Echo channel for the specified room ID.
 *
 * @param {string} roomId - The ID of the room to get the private channel for.
 * @returns {any} The private Echo channel for the specified room.
 */
export const getPrivateChannel = (
  uniqueId: string,
  channelName: string = "chat"
) => {
  return (window as any).Echo?.private(`${channelName}.${uniqueId}`);
};

export const createPrivateChannel = (
  uniqueId: string,
  channelName: string = "chat",
  eventPrefix: string = "chat"
) => {
  const channel = (window as any).Echo?.private(`${channelName}.${uniqueId}`);

  return {
    channel,
    eventPrefix,
    listen: (eventPrefix: string, callback: Function) => {
      if (channel) {
        channel.listen(eventPrefix, callback).error((error) => {});
      }
    },
  };
};

/**
 * Get the file extension from a given urls.
 * @param {string} urls - The urls from which to extract the extension.
 * @returns {string | undefined} - The file extension (without the dot) or undefined if no extension is found.
 */
export const getFileExtension = (urls) => {
  if (!urls) return [];
  return urls
    .split(",")
    .map((url) => url.trim().split(".").pop().toLowerCase());
};

/**
 * Updates the unread_count for the user in the users list if the room_id matches.
 *
 * @param {Array} users - The list of users.
 * @param {Object} user - The user object to match against the users list.
 * @param {number} user.room_id - The room ID of the user.
 * @returns {Array} The updated list of users with the unread_count set to 0 for the matching user.
 */
export const updateUnreadCount = (usersList = [], roomId) => {
  return usersList.map((ele) => {
    if (+roomId === +ele?.room_id) {
      return { ...ele, unread_count: 0 };
    }
    return ele;
  });
};

/**
 * This function handles pinning and unpinning a user to the top of a list.
 * It sends a POST request to update the pinned status of a user and then updates the local list accordingly.
 *
 * @param props - An object containing usersList and the user to be pinned/unpinned
 * @returns The updated and sorted list of users, or undefined if there was an error
 */
export const handlePinUnpinUserToTop = async (props) => {
  const { usersList, user } = props;
  try {
    const response = await fetch(`${BASE_URL_CHAT}pinned-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
      body: JSON.stringify({ room_id: user?.room_id, user_id: user?.id }),
    });

    if (response?.ok) {
      const updatedUsersList = usersList?.map((item) => {
        if (user?.room_id === item?.room_id) {
          const updatedUser = {
            ...item,
            is_pinned: item?.is_pinned == 0 ? 1 : 0,
          };
          return updatedUser;
        }
        return item;
      });
      const sortedInOrederToPinned = updatedUsersList.sort(
        (a, b) => b.is_pinned - a.is_pinned
      );
      return sortedInOrederToPinned;
    }
  } catch (err) {}
};

/**
 * This function will delete the group chat.
 * @param param0 Group Room Id to Delete
 */
export const handleDeleteGroup = async (roomId) => {
  try {
    const response = await fetch(`${BASE_URL_CHAT}deleteGroup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
      body: JSON.stringify({ room_id: roomId }),
    });
  } catch {}
};

/**
 * Sends a quotation based on the provided data.
 *
 * @param {object} data - The data required to send a quotation.
 */
export const sendQuotation = async (data) => {
  const {
    id,
    name,
    enquiry_user_id,
    unique_session_id,
    product_id,
    product_name,
    combinations,
    unique_number,
    quantity,
    unit_price,
    price_term,
    main_image,
    pre_title_name,
  } = data;
  try {
    // Send the quote configuration request
    await apiClient("front/quote_configuration", "post", {
      body: {
        unique_session_id,
        type: "simple",
        product_id,
        product_name,
        quantity: quantity || 1,
        price: unit_price || 0,
        combinations,
      },
    });

    // Prepare the form data for the quotation submission
    let formData = new FormData();
    formData.append("unique_session_id", unique_session_id || "");
    formData.append("seller_user_id", id || "");
    formData.append("enquiry_user_id", enquiry_user_id || "");
    formData.append("product_id", product_id || "");
    formData.append("price", unit_price || 0);
    formData.append("final_price", unit_price || 0);
    formData.append("quantity", quantity || 1);
    formData.append("price_term", price_term || "");
    formData.append("product_datetime", moment().format("YYYY-MM-DD hh:mm:ss"));

    formData.append("product_name", product_name ?? "");

    formData.append("product_image", main_image ?? "");

    formData.append("pre_title_name", pre_title_name ?? "");
    formData.append(
      "message",
      `Hello ${name},
    We are interested in ( ${product_name} - ${unique_number})`
    );

    // Send the quotation submission request
    await apiClient(
      "front/getQuery/submit",
      "post",
      {
        body: formData,
      },
      true
    );
  } catch {}
};

/**
 * Filters users to include only those who have unread messages and are not archived.
 *
 * @param users - An array of user objects, each containing details such as unread_count and is_archived.
 * @returns An array of user objects that have unread messages and are not archived.
 */
export const filterUnreadMessages = (users: any[]): any[] => {
  // return users.filter((user) => user.unread_count > 0 && user.isArchived === false);
  return users?.filter(
    (user) => user?.unread_count > 0 && user?.is_archived === 0
  );
};
/********************************************************************************************************************************************************* */

export const imageType = ["image/png", "image/jpg", "image/jpeg"];
export const imageTypeMessage = "Please upload only PNG, JPEG and JPG";
export const imageSize = 2; //MB
export const imageSizeMessage = "File size too large: Max size is 2MB";
export const imageFileMessage = "Max. file size: 2 MB, pdf, jpg and png";
export const registrationDocumentFileMessage =
  "Max. file size:2 MB, pdf, jpg, jpeg and png";

export const fileTypesAllowed = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
export const fileTypeMessage =
  "Please upload files only in PDF, Excel or Doc format.";
export const fileSize = 5; //MB
export const minimumPrice = 1; // Limit
export const maximumPrice = 8; // Means (12345678)
export const maxImageLimitCalculator = 3;
export const specificationTextLength = 50;
//function for size converter

/**
 * This function handles pinning and unpinning a user to the top of a list.
 * It sends a POST request to update the pinned status of a user and then updates the local list accordingly.
 *
 * @param size - Numeric value which needs to be converted
 * @param targetUnit - string value desired unit
 * @returns converted size in desired unit.
 */
export function convertSize(size: number, targetUnit: string): number {
  const units = {
    bytes: 1,
    KB: 1024,
    MB: 1024 * 1024,
  };

  if (!units[targetUnit]) {
    throw new Error(`Unsupported target unit: ${targetUnit}`);
  }

  return size / units[targetUnit];
}

export const per_page_data = 10;
export function calculateDays(startDateStr, endDateStr) {
  const startDate: any = new Date(startDateStr);
  const endDate: any = new Date(endDateStr);
  const differenceMs = endDate - startDate;
  const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  return daysDifference < 0 ? 0 : daysDifference;
}
export function formatDate(startDateStr) {
  const startDate = new Date(startDateStr);
  const day = startDate.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[startDate.getMonth()];
  const year = startDate.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}

export function permissionsList() {
  return [
    {
      name: "Dashboard",
      page: "/dashboard",
      settings: [
        {
          name: "View",
          value: false,
        },
      ],
    },
    {
      name: "Leads",
      page: "/crm/leads",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Contacts",
      page: "/crm/contacts",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Accounts",
      page: "/crm/accounts",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Deals",
      page: "/crm/deals",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Tasks",
      page: "/crm/tasks",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Meetings",
      page: "/crm/meetings",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Calls",
      page: "/crm/calls",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Scoring Rules",
      page: "/crm/settings/scoring-rules",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Engagment Score",
      page: "/crm/engagment-score",
      settings: [
        {
          name: "View",
          value: false,
        },
      ],
    },
    {
      name: "Product",
      page: "/products/List",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
        {
          name: "Duplicate",
          value: false,
        },
        {
          name: "Featured",
          value: false,
        },
        {
          name: "Big Post",
          value: false,
        },
        {
          name: "Export",
          value: false,
        },
        {
          name: "Restore",
          value: false,
        },
      ],
    },
    {
      name: "Catalog",
      page: "/catalog/list",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Wishlist",
      page: "/wishlist",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Category",
      page: "/seller/categories",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Product Application",
      page: "/seller/categories",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Product Use Cases",
      page: "/seller/categories",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Brands",
      page: "/seller/brands",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Specification Definition",
      page: "/seller/specification",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Company Settings",
      page: "/companySettings/companyDetails?tab=company",
      settings: [
        {
          name: "View",
          value: false,
        },
      ],
    },
    {
      name: "Company Information",
      page: "/companySettings/companyDetails?tab=company",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Contact Person Details",
      page: "/companySettings/companyDetails?tab=contact",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Regional Office",
      page: "/companySettings/companyDetails?tab=regional",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Company Facilities",
      page: "/companySettings/companyDetails?tab=factory",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
      ],
    },
    {
      name: "Export Capabilities",
      page: "/companySettings/companyDetails?tab=export",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
      ],
    },
    {
      name: "QA/QC",
      page: "/companySettings/companyDetails?tab=QAQC",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
      ],
    },
    {
      name: "R&D Management",
      page: "/companySettings/companyDetails?tab=research&management",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
      ],
    },
    {
      name: "Services",
      page: "/companySettings/companyDetails?tab=services",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Socail Accounts",
      page: "/companySettings/companyDetails?tab=social",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Certificates",
      page: "/companySettings/companyDetails?tab=certificates",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "News Room",
      page: "/companySettings/companyDetails?tab=newsroom",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Faq's",
      page: "/companySettings/companyDetails?tab=faq",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Manage Store",
      page: "/subdomain",
      settings: [
        {
          name: "View",
          value: false,
        },
      ],
    },
    {
      name: "Manage Menu",
      page: "/subdomain",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Manage Banner",
      page: "/subdomain",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Roles & Permissions",
      page: "/roles",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Sub Accounts",
      page: "/sellersubaccount",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Ads",
      page: "/ads",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "Pricing Rules",
      page: "/pricesettings",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
      ],
    },
    {
      name: "Discount Levels",
      page: "/pricesettings",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
      ],
    },
    {
      name: "General Settings",
      page: "/pricesettings",
      settings: [
        {
          name: "View",
          value: false,
        },
      ],
    },
    {
      name: "My Contacts",
      page: "/contacts",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Block/Unblock",
          value: false,
        },
      ],
    },
    {
      name: "Invited Users",
      page: "/invite",
      settings: [
        {
          name: "View",
          value: false,
        },
        {
          name: "Add",
          value: false,
        },
        {
          name: "Edit",
          value: false,
        },
        {
          name: "Delete",
          value: false,
        },
      ],
    },
    {
      name: "My Subscriptions",
      page: "/subscription",
      settings: [
        {
          name: "View",
          value: false,
        },
      ],
    },
    {
      name: "Plans",
      page: "/plancards",
      settings: [
        {
          name: "View",
          value: false,
        },
      ],
    },
    {
      name: "Recent Activity",
      page: "/recentactivity",
      settings: [
        {
          name: "View",
          value: false,
        },
      ],
    },
    {
      name: "Notifications",
      page: "/notifications",
      settings: [
        {
          name: "View",
          value: false,
        },
      ],
    },
    {
      name: "Account Prefercens",
      page: "/preferences",
      settings: [
        {
          name: "View",
          value: false,
        },
      ],
    },
  ];
}

export const getProductId = () => {
  const { query }: any = useRouter();
  const productId: string = query.Id;
  return productId;
};
export const territory = [
  {
    id: 1,
    name: "North America",
    code: "NA",
    value: "1t",
    view: "North America",
    type: "Territory",
  },
  {
    id: 2,
    name: "Europe",
    code: "EU",
    value: "2t",
    view: "Europe",
    type: "Territory",
  },
  {
    id: 3,
    name: "Asia",
    code: "AS",
    value: "3t",
    view: "Asia",
    type: "Territory",
  },
  {
    id: 4,
    name: "Middle East",
    code: "ME",
    value: "4t",
    view: "Middle East",
    type: "Territory",
  },
  {
    id: 5,
    name: "Gulf Countries",
    code: "GC",
    value: "5t",
    view: "Gulf Countries",
    type: "Territory",
  },
  {
    id: 6,
    name: "South America",
    code: "SA",
    value: "6t",
    view: "South America",
    type: "Territory",
  },
  {
    id: 7,
    name: "Africa",
    code: "AF",
    value: "7t",
    view: "Africa",
    type: "Territory",
  },
  {
    id: 8,
    name: "Australia and Oceania",
    code: "AO",
    value: "8t",
    view: "Australia and Oceania",
    type: "Territory",
  },
];
export const PasswordMessage =
  "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character";
export const companysellerLicence =
  "Company approval for a seller account can be relatively quick, potentially taking as little as 1-3 days if everything is in order and there are no issues with the application.";
export const companyBuyerLicence =
  "Company approval for a buyer account can be relatively quick, potentially taking as little as 1-3 days if everything is in order and there are no issues with the application.";

export function formatDateMonthYear(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatDateTime(dateTimeString) {
  if (!dateTimeString) return "";

  const date = new Date(dateTimeString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
export function parseAndFormatDateTime(dateTimeString) {
  if (!dateTimeString) return "";
  const dateParts = dateTimeString.match(
    /(\w+), (\w+) (\d+), (\d+) at (\d+):(\d+):(\d+) (\w+)/
  );

  if (!dateParts) return "";
  const [_, dayOfWeek, monthName, day, year, hour, minute, second, period] =
    dateParts;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames.indexOf(monthName) + 1;
  let hour24 = parseInt(hour, 10);
  if (period === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (period === "AM" && hour24 === 12) {
    hour24 = 0;
  }
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedHour = String(hour24).padStart(2, "0");
  const formattedMinute = String(minute).padStart(2, "0");
  const formattedSecond = String(second).padStart(2, "0");
  return `${formattedDay}/${formattedMonth}/${year} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
}
export function formatDateNew(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const paymentMethods = [
  {
    name: "Payment through Merchant AD",
    tooltip:
      "Most recommended method, Merchant AD safeguards the payment until the buyer verifies the receipt of goods or documents, establishing a secure and transparent transaction for both parties",
  },
  {
    name: "CBS (Cash before Shipment)",
    tooltip:
      "Guarantees payment for the seller before shipment, eliminating risk but potentially discouraging buyers due to the upfront requirement",
  },
  {
    name: "Advanced Payment",
    tooltip:
      "Encourages buyer commitment and accelerates cash flow for the seller by receiving a portion of the payment upfront but requires trust from the buyer.",
  },
  {
    name: "ACH Transfer",
    tooltip:
      "Transfers funds electronically within the same country, offering a cost-effective alternative to wire transfers but with slightly longer processing times",
  },
  {
    name: "Credit Card",
    tooltip:
      "Offers convenience and wide acceptance for buyers, but sellers incur processing fees.",
  },
  {
    name: "Debit Card",
    tooltip:
      "Similar to credit cards but deducts funds directly from the buyer's bank account, offering convenience and security",
  },
  {
    name: "Online Payment Platforms (e.g. PayPal)",
    tooltip:
      "Provides a secure and user-friendly platform for online payments, but fees may be associated with transactions.",
  },
  {
    name: "Cash",
    tooltip:
      "Traditional payment method accepted by most businesses but carries the risk of theft or loss.",
  },
  { name: "Escrow", tooltip: "" },
  {
    name: "D/P (Documents against Payment)",
    tooltip:
      "Provides some security for the seller while allowing buyers to inspect goods before payment.",
  },
  {
    name: "D/A (Documents against Acceptance)",
    tooltip: "Offers extended credit terms to the buyer compared to D/P.",
  },
  {
    name: "TT (Telegraphic Transfer)",
    tooltip:
      "Fast, secure, and widely accepted globally. Transparent fees and tracking of funds",
  },
  {
    name: "LC (Letter of Credit)",
    tooltip:
      "Guarantees payment to the seller through a bank upon fulfilling specific conditions outlined in the LC document, offering high security but requiring complex setup and incurring bank fees.",
    // "Specific conditions outlined in the LC document.guarantees payment to the seller through a bank upon fulfilling specific conditions outlined in the LC document, offering high security but requiring complex setup and incurring bank fees",
  },
];

export const AcceptedCurrency = [
  {
    name: "USD (US Dollar)",
    tooltip:
      "The dominant currency in international trade, accounting for over 80% of global foreign exchange reserves. Widely accepted in most B2B transactions worldwide.",
  },
  {
    name: "EUR (Euro)",
    tooltip:
      "The official currency of the European Union, the Eurozone, and several other European countries. Widely used in international trade within Europe and beyond",
  },
  {
    name: "JPY (Japanese Yen)",
    tooltip:
      "The third most-traded currency globally and the dominant currency in Asia. Often used in B2B transactions involving Japanese companies",
  },
  {
    name: "GBP (British Pound Sterling)",
    tooltip:
      "Still a major international currency despite Brexit, used in trade with the UK and other Commonwealth countries",
  },
  {
    name: "CAD (Canadian Dollar)",
    tooltip:
      "Strong currency closely tied to the US dollar, frequently used in North American B2B transactions",
  },
  {
    name: "CHF (Swiss Franc)",
    tooltip:
      "A stable and safe haven currency often used in high-value transactions and international finance",
  },
  {
    name: "CNY (Chinese Yuan Renminbi)",
    tooltip:
      "The official currency of China, increasingly used in B2B transactions as Chin economic influence grows",
  },
  {
    name: "AUD (Australian Dollar)",
    tooltip:
      "The official currency of Australia, often used in B2B transactions within the Oceania region",
  },
  {
    name: "BRL (Brazilian Real)",
    tooltip:
      "The official currency of Brazil, a major economy in Latin America",
  },
  {
    name: "INR (Indian Rupee)",
    tooltip:
      "The official currency of India, a rapidly growing economy with significant B2B activity",
  },
  {
    name: "MXN (Mexican Peso)",
    tooltip:
      "The official currency of Mexico, a major trading partner of the US and other countries",
  },
];

export const LCOptions = [
  {
    name: "Revocable LC",
    tooltip: "Revocable LC",
  },
  {
    name: "Irrevocable LC",
    tooltip: "Irrevocable LC",
  },
  {
    name: "Documentary LC",
    tooltip: "Documentary LC",
  },
  {
    name: "Standby LC",
    tooltip: "Standby LC",
  },
  {
    name: "Confirmed LC",
    tooltip: "Confirmed LC",
  },
  {
    name: "Unconfirmed LC",
    tooltip: "Unconfirmed LC",
  },
  {
    name: "Transferable LC",
    tooltip: "Transferable LC",
  },

  {
    name: "Non-transferable LC",
    tooltip: "Non-transferable LC",
  },
];
export function formatTimestamp(timestamp) {
  if (!timestamp) return "";
  const parsedTimestamp = moment(timestamp, "M/D/YYYY, h:mm:ss A");
  return parsedTimestamp.format("MMMM D YYYY | h.mm");
}
export const postalCodeText = 11;
export const textLimit = 50;
export const fullNameText = 50;
export const limitfullNameText =
  "Full name content is too long. Please limit it to 50 characters";
export const officeName = 50;
export const limitOfficeNameText =
  "The content is too long. Please limit it to 50 characters";
export const limitPostalCodeText =
  "Postal code content is too long. Please limit it to 10 characters";
export const descriptionLimit =
  "The content is too long. Please limit it to 350 characters";
export const textLimitErrorMessage =
  "The content is too long. Please limit it to 50 characters.";
export const streetAddressText = 100;
export const limitstreetAddressText =
  " content is too long. Please limit it to 100 characters.";
export const imageFormat = "(Upload JPG, JPEG, or PNG images, max size 2 MB.)";
export const imageFormatDocs =
  "(Upload PDF,DOC,PNG,JPEG,XLS,XLSX, max size 2 MB.)";
export const findPermissions = (permission, name, type) => {
  return permission.find(
    (feature) =>
      feature.name === name &&
      feature.settings.some(
        (setting) => setting.name === type && setting.value === true
      )
  );
};

export const getPermission = (name, type) => {
  const rolesData =
    localStorage?.getItem("subAccountRoles") &&
    JSON.parse(localStorage.getItem("subAccountRoles"));
  const permission = rolesData?.permissions
    ? JSON.parse(rolesData?.permissions)
    : [];
  return findPermissions(permission, name, type);
};

export const CertificateTypes = [
  "Management System Certifications",
  "Product Certificate",
  "Product Test Report",
  "Country restricted sales access",
  "Regulatory licensing document",
];

export const CertificateName = [
  "ABNT",
  "ABS",
  "ADEO",
  "AEO",
  "AIAB",
  "AIB",
  "AS/EN 9100",
  "AS9100D",
  "AVIC-QMS",
  "AWS-CWF",
  "BC1",
  "BEPI",
  "BRC",
  "BSCI",
  "C-TPAT",
  "CGMP",
  "COTTON USA",
  "D - U - N - S registered",
  "DIN 6701",
  "DOWNPASS",
  "EFFCI",
  "EICC",
  "EN 15085",
  "EN ISO 13485",
  "ENPLUS A1",
  "EPD Green Tag",
  "FAMA",
  "FCCA",
  "FSC",
  "FSSC22000",
  "G7 Colorspace",
  "G7 Master",
  "GAI - LAP",
  "GAP",
  "GBP",
  "GDP",
  "GHPs",
  "GMI",
  "GMP",
  "GMPC",
  "GRS",
  "GSV",
  "Green 5S Program",
  "HACCP",
  "Higg Index",
  "IATF16949",
  "ICTI",
  "IECQ",
  "IECQ QC080000",
  "IFS",
  "IMO",
  "IPMS",
  "IQNET",
  "ISCC",
  "ISO 11135",
  "ISO 13688",
  "ISO 14021",
  "ISO 14025",
  "ISO 14064",
  "ISO 14644",
  "ISO 15378",
  "ISO 17020",
  "ISO 20121",
  "ISO 21001",
  "ISO 22301",
  "ISO 27701",
  "ISO 28000",
  "ISO 37001",
  "ISO 3834",
  "ISO 45001",
  "ISO 55001",
  "ISO 9001",
  "ISO / IEC 27001",
  "ISO / IEC20000",
  "ISO / TS 16949: 2009",
  "ISO / TS 22163",
  "ISO10002",
  "ISO10012",
  "ISO13485",
  "ISO13485: 2016",
  "ISO14001",
  "ISO17025",
  "ISO17799",
  "ISO22000",
  "ISO22716",
  "ISO3834 - 2",
  "ISO4001",
  "ISO4064",
  "ISO45001",
  "ISO50001",
  "ISO9001",
  "ISO9001: 2015",
  "LWG",
  "Loreal audit",
  "MDSAP",
  "NAKS",
  "NBCU",
  "NOA",
  "Nordic Swan Ecolabel",
  "OHSAS 18001",
  "OHSAS18000",
  "RBA",
  "RDS",
  "RJC",
  "RSPO",
  "SA8000",
  "SC",
  "SCAN",
  "SIRIM",
  "SLCP",
  "SQP",
  "TCCC",
  "TL9000",
  "WCA",
  "WQA",
  "WRAP",
  "fffci",
  "sedex",
];

export const countryRestrictName = [];

export const productCerificateName = [
  "100% MADE IN ITALY CERTIFICATION",
  "2006/42/EC",
  "2011/95/EC",
  "3-A Sanitary Standards",
  "93/42/EEC",
  "A+",
  "AAR",
  "ABS",
  "AD 2000",
  "AENOR",
  "AGBB",
  "AHRI",
  "ANATEL",
  "ANSI-ASC A14.5",
  "ANSI/ISEA Z89",
  "AP",
  "API 624",
  "AS 1530.1",
  "AS 5810",
  "AS/NZS 4417",
  "AS/NZS4666",
  "AS2208",
  "ASME",
  "ASTM A276/A276M-2017",
  "ASTM D3475",
  "ASTM D4956",
  "ASTM F2278",
  "ASTM F2970-22",
  "Activefire",
  "Azo-free",
  "BCI",
  "BEP",
  "BHMA",
  "BIS",
  "BPI",
  "BSMI",
  "Belgian VOC",
  "Blue Tick",
  "C-Tick",
  "CA65/CP65",
  "CB",
  "CCC",
  "CCPB",
  "CCS",
  "CEC",
  "CERTIFIRE",
  "CMDCAS",
  "CPC",
  "CPR",
  "CRI",
  "CSA C22.22",
  "CTI",
  "CUL",
  "CertiPUR",
  "CodeMark",
  "DIN",
  "DLC",
  "DOCG",
  "DOT",
  "Dermatest",
  "E-2000",
  "EAC",
  "EEC",
  "EHEDG",
  "EN 13964",
  "EN 10223",
  "EN 131",
  "EN 13331",
  "EN 13479",
  "EN 13731",
  "EN 13986",
  "EN 14124",
  "EN 14516",
  "EN 1463",
  "EN 16662",
  "EN 17104",
  "EN 54",
  "EN 60898",
  "EN 62115",
  "EN 71",
  "EN IEC 61169",
  "EN ISO 12100",
  "EN ISO 20471",
  "EN ISO 6179",
  "EN ISO/IEC 17067",
  "EN1183",
  "EN1254",
  "EN14604",
  "EN50549",
  "ENEC",
  "EPA",
  "EPCS",
  "ETL",
  "EU Ecolabel",
  "EUCEB",
  "EcoCert",
  "Energy-star",
  "European Flax",
  "FCC",
  "FIFA",
  "FM",
  "FSC",
  "Fraunhofer TESTED DEVICE",
  "GASMARK",
  "GCS",
  "GHMT",
  "GOST",
  "GPSD",
  "GRAS",
  "GREEN GUARD",
  "GS",
  "Gem grading manual",
  "Good Design Award",
  "HAKC",
  "HC",
  "HRIPT",
  "Home Composting",
  "IC",
  "ICC",
  "ICC-ES PMG",
  "ICRATG",
  "IDBF",
  "IDIS",
  "IEC 61727",
  "IEC60034",
  "IEEE",
  "IGI",
  "IMQ",
  "IP",
  "IP65",
  "IP67",
  "IPX7",
  "ISED",
  "ISO 10262",
  "ISO 11439",
  "ISO 12647",
  "ISO 1461",
  "ISO 15848-1",
  "ISO 18527",
  "ISO 7591",
  "ISO Type 5",
  "ISO4064",
  "ITTF",
  "JAKIM",
  "JATE",
  "JIS",
  "JQA",
  "Japan Radio TYPE APPROVAL",
  "KC",
  "KCMA",
  "KITEMARK",
  "KR",
  "KTW",
  "Kosher",
  "LENZING ECOVERO",
  "LR",
  "Lead Free",
  "MC",
  "MD",
  "MED",
  "MIC",
  "MIT",
  "MSC",
  "Marine & Offshore",
  "Model D",
  "NAMI",
  "NB",
  "NEMA MG-1",
  "NFPA",
  "NIOSH",
  "NOM",
  "NRCAN",
  "NSF",
  "NTA 8776 certificate",
  "NZS 3501",
  "OCPP",
  "OEKO LEATHER STANDARD",
  "OIML",
  "OK Compost",
  "OMRI",
  "Oeko-Tex standard 100",
  "PCI",
  "PEFC",
  "PHI",
  "PPE Regulation（EU）2016/425",
  "PSB",
  "PSE",
  "Plastica Seconda Vita",
  "Product Carbon Footprint",
  "Qualicoat",
  "RCS",
  "RED",
  "RMS",
  "RWS",
  "RedDot",
  "Russian Maritime",
  "S-JET",
  "SABER",
  "SAE",
  "SASO",
  "SCS GLOBAL SERVICES",
  "SEEDLING",
  "SG Ready",
  "SIL",
  "SIRM",
  "SLS",
  "SOLAR KEYMARK",
  "SRCC",
  "ST COA",
  "STeP",
  "SVCOC",
  "StandardsMark Licence",
  "TELEC",
  "TISI",
  "TSE",
  "TUV mark",
  "UKCA",
  "UL 1653",
  "ULC",
  "UPC",
  "USB-IF",
  "VCCI",
  "VIA/JWL",
  "Verpack G",
  "WDMA",
  "WELS",
  "WH",
  "WPC",
  "WVTA",
  "Watersense",
  "World Athletics",
  "cUPC",
  "giteki",
  "ok-Biobased",
  "verasol",
  "16 CFR 1700",
  "2007/46/EC",
  "2014/29/EU",
  "4C",
  "98/79/EC",
  "AAMA",
  "ABA",
  "ACS",
  "ADR",
  "AGA",
  "AGL",
  "AMECA",
  "ANSI Z358",
  "ANSI/ISEA 107",
  "AOAC",
  "API",
  "AS 1210",
  "AS 4176",
  "AS CISPR 14.1",
  "AS/NZS4357",
  "AS2047",
  "AS4736",
  "ASTA",
  "ASTM D1683/D1683M-17",
  "ASTM D4234",
  "ASTM F1487",
  "ASTM F2413-18",
  "ATEX",
  "AdBlue",
  "BBA",
  "BEE",
  "BG Mark",
  "BIFMA",
  "BKI",
  "BQB",
  "BWF",
  "Benchmark",
  "Bluesign",
  "CA 01350",
  "CARB",
  "CBCA",
  "CCMC",
  "CCPSA",
  "CE",
  "CEI 0-21",
  "CIDB",
  "COSMOS",
  "CPNP",
  "CQC",
  "CSA",
  "CSTB",
  "CU-TR",
  "CWB",
  "ClassNK",
  "Csi",
  "DIN CERTCO",
  "DNV",
  "DOE",
  "DVGW",
  "Dolby",
  "E/e-mark",
  "ECE",
  "EESS",
  "EMC",
  "EN 10219",
  "EN 12691",
  "EN 13219",
  "EN 13432",
  "EN 13501",
  "EN 13869",
  "EN 14055",
  "EN 14351",
  "EN 14619",
  "EN 1527",
  "EN 16955",
  "EN 50575",
  "EN 545",
  "EN 61851",
  "EN 636",
  "EN 840",
  "EN ISO 11118",
  "EN ISO 13849",
  "EN ISO 25649",
  "EN ISO 6185",
  "EN/ISO 8098",
  "EN12469",
  "EN1442",
  "EN374",
  "EN54-7",
  "EOS",
  "EPAL",
  "EPEAT",
  "EU 2016/426",
  "EU Organic Certificate",
  "EWG",
  "ElektroG",
  "Euro V",
  "FAMI-QS",
  "FIBA",
  "FL41539",
  "FMVSS209",
  "FloorScore",
  "G99",
  "GCC",
  "GEMS",
  "GIA",
  "GOTS",
  "GPSR",
  "GRC",
  "GRS",
  "GSV",
  "Global-Mark",
  "Green leaf",
  "HALAL",
  "HDMI",
  "Hi-Res",
  "IAPMO",
  "ICAR",
  "ICC-ES",
  "ICEA",
  "ICTI",
  "IDEA",
  "IEC",
  "IEC 62116",
  "IECEx",
  "IGCC",
  "IK",
  "INMETRO",
  "IP54",
  "IP66",
  "IP68",
  "IRAM",
  "ISI",
  "ISO 11117",
  "ISO 1182",
  "ISO 13688",
  "ISO 15197",
  "ISO 17357",
  "ISO 4210",
  "ISO 8317",
  "ISO/IEC 17067",
  "ITF",
  "J55032",
  "JAS Organic Certificate",
  "JET-PVm",
  "JKR",
  "Japan F4 Star",
  "K-REACH",
  "KCC",
  "KEMA",
  "KKDIK",
  "KS",
  "KUCAS",
  "LEED",
  "LPCB",
  "LVD",
  "Lenzing",
  "MCS",
  "MDR",
  "MEPS",
  "MID",
  "MPA certificate",
  "MSHA",
  "Mfi",
  "MyHIJAU",
  "NASAA Organic",
  "NCC",
  "NF",
  "NFRC",
  "NOA",
  "NOP",
  "NRS097",
  "NSF61",
  "NTEP",
  "Nema 4X",
  "OCS",
  "OEKO-TEX® ECO PASSPORT",
  "OIML R49",
  "OK compost HOME",
  "Oeko-Tex Made In Green",
  "PAS-MARK",
  "PED",
  "PHD Green Tag",
  "PMDA",
  "PS",
  "PSC",
  "PVoC",
  "ProdSG",
  "Qi",
  "RCM",
  "REACH",
  "RETIE",
  "RSPO",
  "Rainforest Alliance",
  "RoHS",
  "S+",
  "SAA",
  "SABS",
  "SAI",
  "SCNP",
  "SEC",
  "SEMKO",
  "SGCC",
  "SIRIM",
  "SKZ",
  "SNI",
  "SONCAP",
  "SRRC",
  "STF",
  "SUPIMA",
  "Singapore Green Label",
  "TAC",
  "TGA",
  "TPED",
  "TUV SUD Mark",
  "Telcordia",
  "UL",
  "UL 1741",
  "UNE EN 15343",
  "USA Pickleball - Pickleball Certification",
  "USDA",
  "VDE",
  "Vegan",
  "W270",
  "WEEE",
  "WERS",
  "WIFI",
  "WRAS",
  "WaterMark",
  "Woolmark",
  "ZDHC",
  "d2w",
  "iF DESIGN AWARD",
  "test 003",
];

export const testItems = [
  "(EC) No 152/2009",
  "(EC) No 1935/2004",
  "(EU) No 2020/1245",
  "(EU) No 709/2014",
  "(EU) 2023/1542",
  "(EU) No 548/2014",
  "10P",
  "14 CFR 25",
  "15 U.S.C. 1278a",
  "15 U.S.C. 2063(a)",
  "16 CFR",
  "16 CFR 1225",
  "16 CFR 1307",
  "16 CFR 1508",
  "16 CFR 1509",
  "16 CFR 1610",
  "16 CFR 1611",
  "16 CFR 1615",
  "16 CFR 1616",
  "16 CFR 1632",
  "16 CFR 1633",
  "16 CFR 1130",
  "16 CFR 1307",
  "16 CFR 1501",
  "16 CFR 1303",
  "2001/95/EC",
  "2005/31/EC",
  "2006/66/EC",
  "2009/125/EC",
  "2009/48/EC",
  "21 CFR",
  "49 CFR 571",
  "49 CFR 571.213",
  "84/500/EEC",
  "94/62/EC",
  "AAMA/WDMA/CSA 101/I.S.2/A440-11",
  "AAMA/WDMA/CSA 101/I.S.2/A440-17",
  "AAMIPB70 Level 3",
  "AATCC 100",
  "AATCC 10231",
  "AATCC 112",
  "AATCC 135/150",
  "AATCC 150",
  "AATCC 183",
  "AATCC 195",
  "AATCC 197",
  "AATCC 1993",
  "AATCC 20",
  "AATCC 203",
  "AATCC 20A",
  "AATCC 22-2017",
  "AATCC 61",
  "AATCC 8",
  "AATCC 81",
  "AATCC 89",
  "AATCC 94",
  "AATCC 97",
  "AATCC TM 115",
  "AATCC TM 135",
  "AATCC TM 143-2018t",
  "AATCC TM 127",
  "AATCC TM 16",
  "AATCC-147",
  "AATCC 107",
  "AATCC 16",
  "AATCC TM 183",
  "AB2998",
  "ABNT NBR 16149",
  "ABNT NBR 17094",
  "ABNT NBR NM 300",
  "AEC-Q200",
  "AHRI 700C",
  "AISC",
  "ANSI ASC A14",
  "ANSI C78.377",
  "ANSI C82.77",
  "ANSI NEMA LD3",
  "ANSI Z359.12",
  "ANSI Z359.14",
  "ANSI Z80",
  "ANSI Z87.1",
  "ANSI-ISEA 105",
  "ANSI/AAMI PB70",
  "ANSI/ASHRAE 110",
  "ANSI/AWWA B100-99",
  "ANSI/BHMA A 156.13",
  "ANSI/BHMA A 156.4",
  "ANSI/BHMA A156",
  "ANSI/BHMA A156.36",
  "ANSI/BIFMA X5.1",
  "ANSI/BIFMA X5.5",
  "ANSI/BIFMA X5.6",
  "ANSI/CAN/UL 1973",
  "ANSI/CAN/UL 2743",
  "ANSI/ESD STM11.11",
  "ANSI/IES LM-79-19",
  "ANSI/ISEA 107",
  "ANSI/ISEA 138",
  "ANSI/ISEA Z87",
  "ANSI/NFRC 100",
  "ANSI/NFRC 200",
  "ANSI/PLATO FL1",
  "ANSI/TIA-568-C.2",
  "ANSI/WCMAA100.1",
  "ANSIC 63.4",
  "ANSI C63",
  "API 624",
  "API 6A",
  "API 6FA",
  "AS 1172.1",
  "AS 13006",
  "AS 1756",
  "AS 2001",
  "AS 3588",
  "AS 3610",
  "AS 4020",
  "AS 4092",
  "AS 4371",
  "AS 4684",
  "AS 4685",
  "AS 4964",
  "AS 4989",
  "AS ISO 9239.1",
  "AS NZS 1554.2",
  "AS NZS 1748.1",
  "AS NZS 2640",
  "AS/NZ 1170.2",
  "AS/NZS 1229",
  "AS/NZS 1249",
  "AS/NZS 1337",
  "AS/NZS 1530",
  "AS/NZS 1577",
  "AS/NZS 1730",
  "AS/NZS 1859",
  "AS/NZS 2063",
  "AS/NZS 2088",
  "AS/NZS 2172",
  "AS/NZS 2425",
  "AS/NZS 2588",
  "AS/NZS 3100",
  "AS/NZS 3504",
  "AS/NZS 3718",
  "AS/NZS 3813",
  "AS/NZS 3837",
  "AS/NZS 4220",
  "AS/NZS 4266",
  "AS/NZS 4268",
  "AS/NZS 4357.0",
  "AS/NZS 4385",
  "AS/NZS 4420",
  "AS/NZS 4438",
  "AS/NZS 4442",
  "AS/NZS 4610",
  "AS/NZS 4665",
  "AS/NZS 4688",
  "AS/NZS 4935",
  "AS/NZS 4970",
  "AS/NZS 5079",
  "AS/NZS 60335",
  "AS/NZS 62115",
  "AS/NZS CISPR 32",
  "AS/NZS ISO 8124",
  "AS/NZS 2208",
  "AS/NZS 2908",
  "AS/NZS 4399",
  "AS/ZNS 8124",
  "AS2047",
  "AS4586",
  "AS4736",
  "AS5041",
  "AS5810",
  "ASCE7-16",
  "ASCISPR",
  "ASME A112.19.2",
  "ASME A112.19.3",
  "ASME A12.19.14",
  "ASME BPVC VIII.1",
  "ASME PASE-2019",
  "ASTM F1671",
  "ASTM 1027",
  "ASTM A240/A240M",
  "ASTM A262",
  "ASTM A276/A276M",
  "ASTM A370",
  "ASTM A416",
  "ASTM A641-A641M-09a",
  "ASTM A641/A641M-19",
  "ASTM A653",
  "ASTM A90/A90M-13",
  "ASTM B117",
  "ASTM B163",
  "ASTM B221M",
  "ASTM B348M",
  "ASTM B557",
  "ASTM C1184",
  "ASTM C1185-08",
  "ASTM C1186",
  "ASTM C148",
  "ASTM C149",
  "ASTM C167",
  "ASTM C170",
  "ASTM C177",
  "ASTM C356",
  "ASTM C411",
  "ASTM C423-23",
  "ASTM C447",
  "ASTM C473",
  "ASTM C518",
  "ASTM C627-18",
  "ASTM C726",
  "ASTM C738",
  "ASTM C920",
  "ASTM D5511",
  "ASTM D6413",
  "ASTM D1003",
  "ASTM D1056",
  "ASTM D1148",
  "ASTM D1230",
  "ASTM D1238",
  "ASTM D1576",
  "ASTM D1683",
  "ASTM D1784",
  "ASTM D1907",
  "ASTM D1922",
  "ASTM D2047",
  "ASTM D2130",
  "ASTM D2244",
  "ASTM D2395",
  "ASTM D256",
  "ASTM D2654",
  "ASTM D276",
  "ASTM D2854",
  "ASTM D2859",
  "ASTM D2866",
  "ASTM D2887",
  "ASTM D3359",
  "ASTM D3363",
  "ASTM D3495",
  "ASTM D3775",
  "ASTM D4052",
  "ASTM D4060",
  "ASTM D4151",
  "ASTM D4226",
  "ASTM D4236",
  "ASTM D4329",
  "ASTM D4587",
  "ASTM D4607-14",
  "ASTM D4632",
  "ASTM D4833",
  "ASTM D4966",
  "ASTM D5034",
  "ASTM D5169",
  "ASTM D5199",
  "ASTM D523",
  "ASTM D5250",
  "ASTM D5582",
  "ASTM D570",
  "ASTM D5712-10",
  "ASTM D6109",
  "ASTM D629",
  "ASTM D6319",
  "ASTM D6370-99",
  "ASTM D638",
  "ASTM D6400",
  "ASTM D648",
  "ASTM D6544",
  "ASTM D6693",
  "ASTM D6866-22",
  "ASTM D6954",
  "ASTM D6978",
  "ASTM D7031-11",
  "ASTM D751",
  "ASTM D822",
  "ASTM D882",
  "ASTM E648",
  "ASTM E10",
  "ASTM E1019",
  "ASTM E1019-18",
  "ASTM E1086",
  "ASTM E1251",
  "ASTM E1252",
  "ASTM E1353-08a",
  "ASTM E136-19a",
  "ASTM E139",
  "ASTM E1409-13",
  "ASTM E1941-10",
  "ASTM E196",
  "ASTM E1966",
  "ASTM E2149",
  "ASTM E2180",
  "ASTM E2358",
  "ASTM E3047",
  "ASTM E384",
  "ASTM E413",
  "ASTM E415",
  "ASTM E596",
  "ASTM E662",
  "ASTM E8-E8M-16a",
  "ASTM E84",
  "ASTM E90",
  "ASTM E903",
  "ASTM E94",
  "ASTM E96",
  "ASTM F1004",
  "ASTM F1169",
  "ASTM F1250",
  "ASTM F1346",
  "ASTM F136-13",
  "ASTM F1387",
  "ASTM F1427",
  "ASTM F1487",
  "ASTM F1506",
  "ASTM F1561",
  "ASTM F1670",
  "ASTM F1774",
  "ASTM F1821",
  "ASTM F1838",
  "ASTM F1882",
  "ASTM F1912",
  "ASTM F1959",
  "ASTM F1988",
  "ASTM F2040",
  "ASTM F2050",
  "ASTM F2057",
  "ASTM F2100",
  "ASTM F2157",
  "ASTM F2179",
  "ASTM F2194",
  "ASTM F2236-16A",
  "ASTM F2264",
  "ASTM F2276",
  "ASTM F2285",
  "ASTM F2388",
  "ASTM F2388–18",
  "ASTM F2413-18",
  "ASTM F2417",
  "ASTM F2503",
  "ASTM F2598",
  "ASTM F2601-18",
  "ASTM F2613",
  "ASTM F2621",
  "ASTM F2640",
  "ASTM F2906-13",
  "ASTM F2913",
  "ASTM F2927",
  "ASTM F2999",
  "ASTM F3105",
  "ASTM F3340",
  "ASTM F3363-19",
  "ASTM F3445-21",
  "ASTM F381",
  "ASTM F404",
  "ASTM F406",
  "ASTM F609-05",
  "ASTM F833",
  "ASTM F925",
  "ASTM F963",
  "ASTM F963-17",
  "ASTM G154",
  "ASTM G155-21",
  "ASTM G175",
  "ASTM G21-15",
  "ASTM ME8/E8M-21",
  "ASTM D3475",
  "ASTM D624",
  "ASTM A580/A580M-18",
  "ASTM C1288",
  "ASTM D1424",
  "ASTM D2061",
  "ASTM D4956",
  "ASTM D6007",
  "ASTM D6866-16",
  "ASTM E2315-16",
  "ASTM F606/F606M-21",
  "ASTM D3512",
  "ASTM F833-15",
  "ATCC 6275",
  "ATCC 6538",
  "ATCC 8099",
  "ATSM D4236",
  "AWTA PRODUCT TESTING",
  "AZO",
  "Animal Skin Irritant Test",
  "Animal Skin Irritant Test",
  "Anti-Slip Property",
  "As/BGA",
  "Asbestos",
  "BFE",
  "BHMA A156.6",
  "BHMA A156.9",
  "BPA",
  "BS 1088",
  "BS 1139",
  "BS 1309",
  "BS 13758",
  "BS 1413",
  "BS 14184",
  "BS 1970",
  "BS 2780",
  "BS 3084",
  "BS 3266",
  "BS 3477",
  "BS 3582",
  "BS 4032",
  "BS 4407",
  "BS 4745",
  "BS 5866",
  "BS 5867",
  "BS 6165",
  "BS 6341",
  "BS 6387",
  "BS 6748",
  "BS 6806",
  "BS 7176",
  "BS 7914",
  "BS 8433",
  "BS EN 1021",
  "BS EN 1183",
  "BS EN 12115",
  "BS EN 12149",
  "BS EN 12207",
  "BS EN 12393",
  "BS EN 13501",
  "BS EN 13758",
  "BS EN 14468",
  "BS EN 1522",
  "BS EN 15662",
  "BS EN 16647",
  "BS EN 1935",
  "BS EN ISO 12460",
  "BS EN ISO 12677",
  "BS EN ISO 13572",
  "BS EN ISO 13936",
  "BS EN ISO 17294-2",
  "BS EN ISO 14889",
  "BS EN 1217",
  "BS EN 1891",
  "BS EN 71",
  "BS 1363",
  "BS 476",
  "BS 4875",
  "BS 5852",
  "BS 5883",
  "BS 6382",
  "BS 7177",
  "BS 7272",
  "BS 7972",
  "BS 8509",
  "BS EN 12875",
  "BS EN 957",
  "BIFMA X5.1",
  "BIFMA X5.11",
  "BIFMA X5.14",
  "BIFMA X5.4",
  "BIFMA X5.5",
  "BIFMA X5.9",
  "BIFMA X6.1",
  "BIFMA X6.4",
  "BIFMA X7.1",
  "CAN/CGSB 4.2 No. 27.6",
  "CAN/CGSB-4.2 No. 27.5",
  "CAN/ULC-S109-14",
  "CAPROP 65",
  "CARB",
  "CCPSA",
  "CEC",
  "CEC-140-2021-002",
  "CEN/TS 15676",
  "CEN/TS 15968",
  "CEN/TS 16165",
  "CFR177.1210",
  "CFR177.1640",
  "CHCC",
  "CIPAC",
  "CIPAC 437",
  "CIPAC 704",
  "CISPR 25",
  "CM/Res(2013)",
  "CNS 4797",
  "CP65",
  "CPAI-84",
  "CPG",
  "CPG 7117.05",
  "CPR",
  "CPSC",
  "CPSC 16 CFR 1203",
  "CPSC 16 CFR 1303",
  "CPSC-CH-C1001",
  "CPSC-CH-E1001",
  "CPSC-CH-E1002-08",
  "CPSC-CH-E1003",
  "CPSC-CH-E1003-09",
  "CPSIA",
  "CPSR",
  "CR 12471",
  "CSA B45.5 /IAPMO Z124",
  "CSA C22",
  "CSA C88",
  "CSA C88-16",
  "CSA W47.1",
  "CSA Z195",
  "CSA Z96",
  "CUPC",
  "Colorfastness",
  "Comparative Tracking Index (CTI)",
  "DBL 5307",
  "DEHP",
  "DGCCRF",
  "DIN 10743",
  "DIN 10754",
  "DIN 10756",
  "DIN 4102",
  "DIN 51130",
  "DIN 52306",
  "DIN 53160",
  "DIN 53354",
  "DIN 53363",
  "DIN 53438",
  "DIN 54231",
  "DIN EN 10020",
  "DIN EN 13430",
  "DIN EN 15662",
  "DIN EN 16165",
  "DIN EN 17679",
  "DIN EN ISO 5470",
  "DIN ISO 17070",
  "DIN ISO 4649",
  "DIN 10955",
  "DIN 19516",
  "DIN 32935",
  "DIN 54837",
  "DIN 5510",
  "DIN 75410-1",
  "DMFA",
  "DMFU",
  "DOE",
  "DOT-C2",
  "Drop Test Report",
  "Duration Test",
  "EAS 969",
  "EC 1223",
  "EC 1907/2006",
  "EC 1935",
  "EC 244/2009",
  "EC 245/2009",
  "ECE R118",
  "ECE R13",
  "ECE R16",
  "ECE Regulation No.22",
  "ECE-R-124",
  "ECE 104",
  "ECER 21",
  "EK5/AK8 14",
  "EMC",
  "EN 6892",
  "EN 10",
  "EN 10025-2",
  "EN 10088",
  "EN 101",
  "EN 10160",
  "EN 1022",
  "EN 10223",
  "EN 10228",
  "EN 10244",
  "EN 1077",
  "EN 1090",
  "EN 1096",
  "EN 1111",
  "EN 1125",
  "EN 1143",
  "EN 1149",
  "EN 1171",
  "EN 1176",
  "EN 1177",
  "EN 1183",
  "EN 12050",
  "EN 12057",
  "EN 12058",
  "EN 12131",
  "EN 12150",
  "EN 12182:2012",
  "EN 12184",
  "EN 12221",
  "EN 12227",
  "EN 1230",
  "EN 12326",
  "EN 12380",
  "EN 12467",
  "EN 1253",
  "EN 12541",
  "EN 12546",
  "EN 12664",
  "EN 12667",
  "EN 1273",
  "EN 1279",
  "EN 12810",
  "EN 12811",
  "EN 12811-1",
  "EN 1288",
  "EN 12934",
  "EN 12983",
  "EN 13034",
  "EN 131",
  "EN 13130",
  "EN 13138",
  "EN 13150",
  "EN 13157",
  "EN 13209",
  "EN 13240",
  "EN 13241",
  "EN 13245",
  "EN 13246",
  "EN 13310",
  "EN 13329",
  "EN 13356",
  "EN 13377",
  "EN 1341",
  "EN 1342",
  "EN 1343",
  "EN 13445",
  "EN 13479",
  "EN 13496",
  "EN 13544-1",
  "EN 13561",
  "EN 13595",
  "EN 13659",
  "EN 13758",
  "EN 13782",
  "EN 13795",
  "EN 13823",
  "EN 13828",
  "EN 13869",
  "EN 1388",
  "EN 13893",
  "EN 13899",
  "EN 13986",
  "EN 14041",
  "EN 14120",
  "EN 14124",
  "EN 1413",
  "EN 14139",
  "EN 14179",
  "EN 14183",
  "EN 14242",
  "EN 14322",
  "EN 14342",
  "EN 14351",
  "EN 14362",
  "EN 14372",
  "EN 14411",
  "EN 14428",
  "EN 14449",
  "EN 14516",
  "EN 14582",
  "EN 14617",
  "EN 1469",
  "EN 14785",
  "EN 14825",
  "EN 14877",
  "EN 14878",
  "EN 15088",
  "EN 15090",
  "EN 15102",
  "EN 15194",
  "EN 1527",
  "EN 15285",
  "EN 15434",
  "EN 15493",
  "EN 15534",
  "EN 15763",
  "EN 15828",
  "EN 16054",
  "EN 16122",
  "EN 16128",
  "EN 1621",
  "EN 16232",
  "EN 1627",
  "EN 1634",
  "EN 1634-1",
  "EN 16516",
  "EN 16582-1",
  "EN 16582-3",
  "EN 16711",
  "EN 16713",
  "EN 16732",
  "EN 16805",
  "EN 16927",
  "EN 17072",
  "EN 17093",
  "EN 17353",
  "EN 1811",
  "EN 1822",
  "EN 1860",
  "EN 1863",
  "EN 1929-1",
  "EN 1972",
  "EN 1991",
  "EN 200",
  "EN 25649",
  "EN 274",
  "EN 30",
  "EN 301",
  "EN 301 489",
  "EN 303 417",
  "EN 310",
  "EN 317",
  "EN 319",
  "EN 323",
  "EN 355",
  "EN 358",
  "EN 361",
  "EN 362",
  "EN 388",
  "EN 39",
  "EN 397",
  "EN 407",
  "EN 420",
  "EN 438",
  "EN 438-2",
  "EN 479",
  "EN 484",
  "EN 498",
  "EN 50117",
  "EN 50290",
  "EN 50399",
  "EN 50549",
  "EN 50564",
  "EN 50618",
  "EN 50663",
  "EN 50665",
  "EN 55014",
  "EN 55015",
  "EN 55032",
  "EN 564",
  "EN 572",
  "EN 598",
  "EN 60204",
  "EN 60456",
  "EN 60898",
  "EN 60947",
  "EN 61000",
  "EN 61009",
  "EN 61095",
  "EN 61386",
  "EN 61547",
  "EN 61643-11",
  "EN 61800",
  "EN 61851",
  "EN 62115",
  "EN 622",
  "EN 62209",
  "EN 62233",
  "EN 62368",
  "EN 62716",
  "EN 62752",
  "EN 62841",
  "EN 645",
  "EN 647",
  "EN 74",
  "EN 812",
  "EN 817",
  "EN 997",
  "EN IEC 55014",
  "EN IEC 55015",
  "EN IEC 61326",
  "EN IEC 61701",
  "EN IEC 61730",
  "EN IEC 62275",
  "EN IEC 62311",
  "EN IEC 62115",
  "EN IEC 62368-1",
  "EN ISO 11092",
  "EN ISO 11612",
  "EN ISO 11681",
  "EN ISO 11925",
  "EN ISO 12312",
  "EN ISO 12592",
  "EN ISO 12870",
  "EN ISO 13934",
  "EN ISO 13997",
  "EN ISO 14362",
  "EN ISO 14419",
  "EN ISO 14982",
  "EN ISO 15025",
  "EN ISO 15614",
  "EN ISO 17050",
  "EN ISO 17234",
  "EN ISO 17294",
  "EN ISO 20344",
  "EN ISO 20345",
  "EN ISO 20347",
  "EN ISO 20471",
  "EN ISO 20645",
  "EN ISO 20957",
  "EN ISO 21420",
  "EN ISO 23999",
  "EN ISO 26987",
  "EN ISO 354",
  "EN ISO 3744",
  "EN ISO 4210",
  "EN ISO 5912",
  "EN ISO 6185",
  "EN ISO 6506",
  "EN ISO 6892",
  "EN ISO 6940",
  "EN ISO 8317",
  "EN ISO 8528",
  "EN ISO 11148",
  "EN ISO 13849",
  "EN ISO 14116",
  "EN ISO 20345:2011",
  "EN ISO 6383",
  "EN ISO 9239-1",
  "EN 10204",
  "EN 1021",
  "EN 10346",
  "EN 1078",
  "EN 1112",
  "EN 1122",
  "EN 1129",
  "EN 1130",
  "EN 1154",
  "EN 11611",
  "EN 11612",
  "EN 1186",
  "EN 12329",
  "EN 124",
  "EN 12472",
  "EN 12520",
  "EN 12521",
  "EN 12727:2016",
  "EN 1276",
  "EN 12899",
  "EN 1303",
  "EN 13120",
  "EN 13130",
  "EN 13241-1",
  "EN 13248",
  "EN 13274",
  "EN 1335",
  "EN 13432",
  "EN 13501",
  "EN 136",
  "EN 13613",
  "EN 13806",
  "EN 13843",
  "EN 13963",
  "EN 13982",
  "EN 13986",
  "EN 1400",
  "EN 14055",
  "EN 14073",
  "EN 14074",
  "EN 14115",
  "EN 14126",
  "EN 14350",
  "EN 14372",
  "EN 14604",
  "EN 14605",
  "EN 14619",
  "EN 14683",
  "EN 14688",
  "EN 14749",
  "EN 149",
  "EN 14960",
  "EN 14988",
  "EN 1500",
  "EN 15194",
  "EN 15338",
  "EN 15372",
  "EN 15426",
  "EN 15570",
  "EN 16120",
  "EN 16139",
  "EN 16337",
  "EN 166",
  "EN 16781",
  "EN 17128",
  "EN 17191",
  "EN 1725",
  "EN 1728",
  "EN 1729",
  "EN 1730",
  "EN 174",
  "EN 1869",
  "EN 1888",
  "EN 1891",
  "EN 1906",
  "EN 1930",
  "EN 1938",
  "EN 1957",
  "EN 300",
  "EN 360",
  "EN 374",
  "EN 381",
  "EN 455",
  "EN 474",
  "EN 50014",
  "EN 50498",
  "EN 527",
  "EN 55014-1",
  "EN 55014-2",
  "EN 581",
  "EN 597",
  "EN 60086",
  "EN 60204-1",
  "EN 60335",
  "EN 60529",
  "EN 60598",
  "EN 60601",
  "EN 61558",
  "EN 62311",
  "EN 62321",
  "EN 62442",
  "EN 62471",
  "EN 62479",
  "EN 62717",
  "EN 649",
  "EN 660",
  "EN 71",
  "EN 716",
  "EN 717-1",
  "EN 747",
  "EN 913",
  "ENEC+",
  "EN IEC 61000-3-2",
  "EN IEC 61000-3-3",
  "EN ISO 105",
  "EN ISO 11427",
  "EN ISO 1765",
  "EN ISO 1766",
  "EN ISO 25649",
  "EN ISO 3071",
  "EN ISO 6330",
  "EN ISO 6507",
  "EN ISO 7086",
  "EN ISO 811",
  "EN ISO 8528",
  "EN ISO 898",
  "EN ISO 12100",
  "EN ISO 12312",
  "ENV 12633",
  "EPA",
  "EPA 6010C",
  "ETAG 002",
  "ETSI EN 300 328",
  "ETSI EN 300 220",
  "EU",
  "EU 10",
  "EU 2015/1094",
  "EU 2015/1095",
  "EU 2015/2115",
  "EU 2020/784",
  "EU FCM",
  "EU NO 10/2011",
  "EU food grade",
  "EU 2019/1021",
  "ErP",
  "Escherichia coli",
  "Extractable Heavy Metal",
  "FAA FAR 25.853",
  "FCC",
  "FDA 21 CFR 175.105",
  "FDA 21 CFR 176.170",
  "FDA 21 CFR 177.1210",
  "FDA 21 CFR 177.1550",
  "FDA 21 CFR 177.1630",
  "FDA 21 CFR 177.1655",
  "FDA 21 CFR 177.2510",
  "FDA 21 CFR 177.2600",
  "FDA 21CFR 176",
  "FDA 21CFR 177",
  "FDA 21CFR 178",
  "FDA 21CFR 178.3800",
  "FDA 7117",
  "FDA CPG Sec. 545.500",
  "FDA Chromium content",
  "FDA GRAS",
  "FFP2",
  "FIRA C001",
  "FIRA C002",
  "FIRA C003",
  "FIRA C004",
  "FMVSS 108",
  "FMVSS 49 CFR 571.302",
  "FMVSS-110",
  "FMVSS209",
  "FMVSS213",
  "FMVSS218",
  "FMVSS302",
  "FTIR",
  "FTTS-FA-019",
  "Filter test",
  "Finnish Regulation 268/1992",
  "Formaldehyde",
  "GDMS",
  "GSO1268",
  "Gold test",
  "Green Label Plus",
  "HIC TEST",
  "HRIPT",
  "High and low temperature test",
  "IAC",
  "IAPMO/ANSI 124.6",
  "IATA DGR",
  "ICAO",
  "ICE 60086",
  "IDFB",
  "IEC 60065",
  "IEC 60076",
  "IEC 60086",
  "IEC 60118-0",
  "IEC 602208",
  "IEC 60254",
  "IEC 60269",
  "IEC 60287",
  "IEC 60332",
  "IEC 60335",
  "IEC 60432",
  "IEC 60529",
  "IEC 60601",
  "IEC 60745",
  "IEC 60884",
  "IEC 60898-1",
  "IEC 60904",
  "IEC 60947",
  "IEC 60950",
  "IEC 60974",
  "IEC 61000",
  "IEC 61010",
  "IEC 61056",
  "IEC 61089",
  "IEC 61215",
  "IEC 61249-2-21",
  "IEC 61340",
  "IEC 61427",
  "IEC 61643",
  "IEC 61869",
  "IEC 62040",
  "IEC 62053",
  "IEC 62262",
  "IEC 62368",
  "IEC 62477",
  "IEC 62552",
  "IEC 62612",
  "IEC 62619",
  "IEC 62620",
  "IEC 62631",
  "IEC 62776",
  "IEC 62778",
  "IEC 62790",
  "IEC EX",
  "IEC TS 62257",
  "IEC TS 62804",
  "IEC-62271",
  "IEC/EN 60 898-1",
  "IEC/EN60034-1",
  "IEC/EN60570",
  "IEC/EN60669",
  "IEC/EN60730",
  "IEC/EN60825",
  "IEC/EN60968",
  "IEC/EN61058",
  "IEC/EN61347",
  "IEC/EN62031",
  "IEC60068",
  "IEC60085",
  "IEC60099-4",
  "IEC60529",
  "IEC60598",
  "IEC60601-1-2",
  "IEC60896",
  "IEC61439",
  "IEC61547",
  "IEC61683",
  "IEC61727",
  "IEC62109",
  "IEC62133",
  "IEC62321",
  "IEC62471",
  "IEC62560",
  "IEC62717",
  "IEEE C57",
  "IEEE Std 149",
  "IES LM-79-08",
  "IK08",
  "IK09",
  "IK10",
  "IMO IMDG CODE",
  "IMO Res MSC 307(88)",
  "IMO Resolution MSC 37(88)",
  "INMETRO",
  "IP",
  "IP65",
  "IP66 Protection level certificate",
  "IP67",
  "IP69K",
  "IP6X",
  "IPC-TM-650",
  "IPX4",
  "IPX5",
  "IPX6",
  "IPX7",
  "IPX8",
  "ISO 10319",
  "ISO 105 X12",
  "ISO 105 X18",
  "ISO 105-B02",
  "ISO 105-C06",
  "ISO 105-E04",
  "ISO 10542",
  "ISO 10958",
  "ISO 10993",
  "ISO 11014",
  "ISO 11117",
  "ISO 11199",
  "ISO 11640",
  "ISO 11654",
  "ISO 1183",
  "ISO 11890",
  "ISO 11901",
  "ISO 12775",
  "ISO 12945",
  "ISO 12947",
  "ISO 137",
  "ISO 13937",
  "ISO 14181",
  "ISO 14184",
  "ISO 14326",
  "ISO 14457",
  "ISO 1460",
  "ISO 1463",
  "ISO 14855",
  "ISO 15320",
  "ISO 16000",
  "ISO 16474-2",
  "ISO 16649",
  "ISO 16811",
  "ISO 17075",
  "ISO 17131",
  "ISO 17226",
  "ISO 17234",
  "ISO 17353",
  "ISO 17493",
  "ISO 17637",
  "ISO 17712",
  "ISO 17751",
  "ISO 178",
  "ISO 17885",
  "ISO 17966",
  "ISO 18184",
  "ISO 18254",
  "ISO 1833",
  "ISO 18527",
  "ISO 18611",
  "ISO 19833",
  "ISO 20346",
  "ISO 2062",
  "ISO 20743",
  "ISO 20932",
  "ISO 21898",
  "ISO 22176",
  "ISO 22241",
  "ISO 22262-1",
  "ISO 22702",
  "ISO 23351",
  "ISO 23537",
  "ISO 2409",
  "ISO 24343",
  "ISO 2531",
  "ISO 2556",
  "ISO 2859",
  "ISO 29862",
  "ISO 3071",
  "ISO 3497",
  "ISO 3506",
  "ISO 354",
  "ISO 3601",
  "ISO 3759",
  "ISO 3768",
  "ISO 4045",
  "ISO 4048",
  "ISO 4064",
  "ISO 4706",
  "ISO 4832",
  "ISO 4871",
  "ISO 4920",
  "ISO 5077",
  "ISO 527",
  "ISO 62",
  "ISO 6486",
  "ISO 6486-1",
  "ISO 6722",
  "ISO 6892",
  "ISO 6941",
  "ISO 7141",
  "ISO 7173",
  "ISO 7176",
  "ISO 7864",
  "ISO 8098",
  "ISO 811",
  "ISO 8124",
  "ISO 8442-5",
  "ISO 846",
  "ISO 8573",
  "ISO 868",
  "ISO 8749",
  "ISO 8846",
  "ISO 9050",
  "ISO 9073",
  "ISO 9227",
  "ISO 9237",
  "ISO 15025",
  "ISO IWA 14-1",
  "ISO/IEC 14443",
  "ISO/IEC 18000",
  "ISO/IEC 19752",
  "ISO/TR 11827",
  "ISO/TS 16189",
  "ISO 10545",
  "ISO 11948",
  "ISO 13006",
  "ISO 17700",
  "ISO 209",
  "ISO 21078",
  "ISO 22196",
  "ISO 2759",
  "ISO 3160",
  "ISO 4892",
  "ISO 60",
  "ISO 7170",
  "ISO 7171",
  "ISO 7866",
  "ISO 7886-1",
  "ISO 9223",
  "ISO 9994",
  "IST",
  "ISTA",
  "ISTA 1A-2014",
  "ITCS",
  "J55014",
  "J60335",
  "JB 8527",
  "JFSL",
  "JFSL370",
  "JIS C 8715",
  "JIS G 1253",
  "JIS G 3456",
  "JIS G3302",
  "JIS K6400",
  "JIS L 1091",
  "JIS L 1902",
  "JIS L1096",
  "JIS L1099",
  "JIS Z 2801",
  "JIS Z2241",
  "JIS1092",
  "Japan Food Sanitation Act, no. 233",
  "KC",
  "KCC",
  "KCMA A 161",
  "KFDA",
  "KS K 0737",
  "LBR and UPF",
  "LFGB",
  "LHAMA",
  "LM-80",
  "LVD",
  "Laboratory Measurement of Impact Sound Transmission",
  "Lead content",
  "Loading test",
  "MDMLC2",
  "MFDS",
  "MIL-STD-810",
  "MS 1020",
  "MSDS",
  "MS ISO 8302",
  "Microbiology report for analysis",
  "Migration of Colorants",
  "NALFA LF01",
  "NEMA 4X",
  "NF C 61-314",
  "NF D60-300",
  "NF P 92",
  "NFPA 79",
  "NFPA 2112",
  "NFPA 260",
  "NFPA 701",
  "NFRC 102",
  "NFRC 500",
  "NIJ 0101.06",
  "NIJ 010101 06",
  "NIJ 0115.00",
  "NIOSH 9002",
  "NMFC Item 222",
  "NPEO",
  "NSF/ANSI 372",
  "NSF/ANSI 53",
  "NSF/ANSI/CAN 61",
  "NZS4211",
  "OCIMF GMPHOM2009",
  "OEKO-TEX",
  "OK-Compost",
  "Oeko-Tex-standard-100",
  "PAH",
  "PAHS",
  "PAS 68",
  "PAS68:2013",
  "PFAS",
  "PFCs",
  "PSE",
  "PSI",
  "Phthalates Content",
  "RADIO TEST REPORT",
  "REACH",
  "RF",
  "Recycled Polyester Test",
  "RoHS",
  "SAE",
  "SAE J1756",
  "SAE J2638",
  "SAE J661",
  "SAE J684",
  "SAE J386",
  "SASO",
  "SASO 1173",
  "SASO 1473",
  "SASO 1620/GS",
  "SASO 1937",
  "SASO 2331",
  "SASO 2902",
  "SASO GSO ISO 5151",
  "SATRA TM174",
  "SATRA TM31",
  "SATRA TM411",
  "SATRA TM77",
  "SCCP",
  "SDS",
  "SEFA 10",
  "SEFA 8M",
  "SNI ISO 8124",
  "SOHO S6.5",
  "SOR/2011-17",
  "SOR/2016-152",
  "SOR/2016-188",
  "SOR/2016-193",
  "SOR/2016-194",
  "SOR/2019-97",
  "SOR/2022-122",
  "ST 2016",
  "SVHC",
  "Skin Single Application Open Epicutaneous Test",
  "Sole Bond Peel Strength",
  "Stacking Test",
  "TAS 201",
  "TAS 201-94",
  "TB117",
  "TDS",
  "TIR",
  "TMA",
  "TPCH",
  "TPE",
  "TPED",
  "TRA",
  "TSCA",
  "U.S. FDA 21 CFR 175.300",
  "U.S. FDA 21 CFR 177.1520",
  "UL",
  "UL 1026",
  "UL 1082",
  "UL 1083",
  "UL 10C",
  "UL 1175",
  "UL 1177",
  "UL 12402",
  "UL 1278",
  "UL 1431",
  "UL 1642",
  "UL 174",
  "UL 1741",
  "UL 1973",
  "UL 1989",
  "UL 2056",
  "UL 217",
  "UL 2272",
  "UL 2594",
  "UL 263",
  "UL 4041",
  "UL 4200A",
  "UL 499",
  "UL 507",
  "UL 60335",
  "UL 61010",
  "UL 723",
  "UL 795",
  "UL 859",
  "UL 8800",
  "UL 94",
  "UL 9540A",
  "UL 982",
  "UL TP0095",
  "UL 13583869",
  "UL 1012",
  "UL 1029",
  "UL 1310",
  "UL 1472",
  "UL 153",
  "UL 1573",
  "UL 1574",
  "UL 1598",
  "UL 1678",
  "UL 1786",
  "UL 1838",
  "UL 1993",
  "UL 2034",
  "UL 2054",
  "UL 2089",
  "UL 2108",
  "UL 2161",
  "UL 217",
  "UL 2271",
  "UL 2388",
  "UL 244A",
  "UL 2743",
  "UL 2849",
  "UL 305",
  "UL 48",
  "UL 508",
  "UL 588",
  "UL 62368",
  "UL 676",
  "UL 773A",
  "UL 867",
  "UL 8750",
  "UL 935",
  "UL 962",
  "UN 38.3",
  "UNI 8457",
  "UNI 9174",
  "US 16 CFR 1700.20",
  "US EPA",
  "US FDA CPG",
  "US 104-142",
  "USA Pickleball (USAPA)",
  "USCG ABYC",
  "USP 43/NF 38",
  "USP-NF 51",
  "UTS 21010125M",
  "UV test",
  "VDA 270",
  "VDA 278",
  "VDE-AR-N 4105",
  "VOM",
  "WEEE",
  "WIND RESISTANCE TEST",
  "WMTS-051",
  "Warenwet",
  "ZDHC MRSL",
  "Zhaga",
  "AATCC",
  "Antimicrobial test",
  "Chromium content",
  "Energy efficiency classes",
  "Fiber content",
  "Firetest",
  "Hyaluronic acid test",
  "Tensile strength",
  "UL 1647",
  "ГОСТ 31311",
  "日本针对刨花板甲醛释放量检测",
  "(EU) 2015/863",
];

export const scopeControlName = [
  "Lead Acid Batteries EU CE certificate",
  "Other batteries EU CE certificate",
  "Primary battery EU CE certificate",
  "Brake pads",
  "Food overseas qualification",
  "Lithium-ion Battery Category EU CE Certificate",
  "Carbon monoxide alarm UL 2034",
  "Nickel-cadmium battery EU CE certificate",
  "EU Compliance Requirements for Fertilizers",
  "Magnet products",
  "Baby and Children product compliance and safety",
  "Smoke alarm UL 217",
  "Foreign Compliance Requirements For Medical Devices",
  "U.S. Qualification for Motor Vehicle Equipment",
  "Portable emergency power supply EU CE certificate",
  "Ni-MH battery CE Certificate",
  "Self-balancing Scooters/Electric Scooters",
  "Energy storage battery category EU CE certificate",
  "Smoke Detector UL 268",
  "U.S. Qualification for Motor Vehicles",
  "Home Energy Storage System EU CE Certificate",
  "Button cell GCC + UL 4200A test report",
  "EU Qualification for Motor Vehicle",
  "Electronic fireworks machine CE Certificate",
  "Car battery EU CE certificate",
  "Sodium-ion battery EU CE certificate",
  "All-terrain vehicle",
  "Video doorbell US certificate",
  "Zinc nickel battery EU CE certificate",
  "Containerized energy storage EU CE certificate",
  "Fuel Cell EU CE Certificate",
  "Fireworks U.S. Requirements",
  "Industrial and Commercial Energy Storage EU CE Certificate",
  "Charger battery EU CE certificate e-bike",
];

export const scopeReg = ["unlimited product class"];

export const scopeCertificate = [""];
export const regulatoryName = [
  "HFC quota certificate for EU and UK",
  "Export License of the Peoples Republic of China, applicable to hydrofluorocarbons HFC",
  "Extended Producer Responsibility (EPR) - Spanish Packing EPR No.",
  "Extended Producer Responsibility (EPR) - French Motor Vehicle EPR No.",
  "Extended Producer Responsibility (EPR) - French Pleasure or Sports Boats EPR No.",
  "Extended Producer Responsibility (EPR) - French Toys and Games EPR No.",
  "Extended Producer Responsibility (EPR) - French Building Products and Materials EPR No.",
  "Extended Producer Responsibility (EPR) - French DIY and Gardening Products EPR No.",
  "Extended Producer Responsibility (EPR) - French Mineral or Synthetic, Lubricating or Industrial Oils EPR No.",
  "Extended Producer Responsibility (EPR) - French Sporting and Leisure Articles EPR No.",
  "Extended Producer Responsibility (EPR) - French Tobacco Accessories EPR No.",
  "Extended Producer Responsibility (EPR) - French Perforating Medical Devices EPR No.",
  "Extended Producer Responsibility (EPR) - French Chemicals EPR No.",
  "Export License for Dual-use Items and Technologies of PRC",
  "Extended Producer Responsibility (EPR) - Austrian Packaging EPR No.",
  "Extended Producer Responsibility (EPR) - Austrian Battery EPR No.",
  "Extended Producer Responsibility (EPR) - Austrian Electronic and Electrical EPR No.",
  "Extended Producer Responsibility (EPR) - Spanish Industrial Oil EPR",
  "Extended Producer Responsibility (EPR) - Spanish Battery EPR No.",
  "Extended Producer Responsibility (EPR) - Spain EPR No.",
  "Extended Producer Responsibility (EPR) - German Battery EPR No.",
  "Extended Producer Responsibility (EPR) - French Textile EPR No.",
  "Extended Producer Responsibility (EPR) - French Tire EPR No.",
  "Extended Producer Responsibility (EPR) - Germany WEEE No.",
  "Extended Producer Responsibility (EPR) - German Packaging EPR No.",
  "Extended Producer Responsibility (EPR) - French Furniture EPR No.",
  "Extended Producer Responsibility (EPR) - French Battery EPR No.",
  "Extended Producer Responsibility (EPR) - Spanish Tire EPR No.",
  "Extended Producer Responsibility (EPR) - French Electric EPR No.",
  "Extended Producer Responsibility (EPR) - French Packaging EPR No.",
  "Australian Water Compliance Energy Qualification Certificate",
  "Producer Responsibility Extension EPR Certificate - Spain Single Use Plastics",
  "Peoples Republic of China Military Export Licenses",
  "Medical Device Manufacturer License (Class III)",
  "Medical Device Distribution Enterprise License (Class III)",
  "Other Medical Device Licenses (Class III)",
  "Fireworks and Firecracker Business (Retail) Licenses",
  "Business Licenses",
  "Police Supplies Production and Sales Business Registration Forms",
  "Fireworks and Firecracker Business (Wholesale) Licenses",
  "Other Firework Licenses",
  "Food Business Licenses",
  "Fireworks and Firecrackers Safe Production Licenses",
  "Agency Agreements for Military Export",
];
export const CertificateIssuer = [
  "ABS",
  "BSI",
  "BV",
  "CQC",
  "CQM",
  "CTC",
  "China Great Wall Quality",
  "DNV",
  "DQS",
  "Dekra",
  "Intertek",
  "LR",
  "MOODY",
  "Other",
  "SGS",
  "TUV NORD",
  "TUV Rheinland",
  "TUV SUD",
  "UL",
  "WIT",
];

export const CertificateProductIssuer = [
  "ABS",
  "BSI",
  "BV",
  "CQC",
  "CQM",
  "CTC",
  "China Great Wall Quality",
  "DNV",
  "DQS",
  "Dekra",
  "Intertek",
  "LR",
  "MOODY",
  "Other",
  "SGS",
  "TUV NORD",
  "TUV Rheinland",
  "TUV SUD",
  "UL",
  "WIT",
];

export const showCase =
  "Looking to showcase your certificates prominently on our homepage? Here's what you need to know: For maximum visibility and impact, you'll need to have 4 or more certificates in your account.";

export const findPageWithTrueSetting = (data) => {
  const item = data.find((item) =>
    item.settings.some((setting) => setting.value === true)
  );
  return item ? item.page : null;
};

export const getFirstUrl = () => {
  const rolesData = JSON.parse(localStorage.getItem("subAccount")) || [];
  return rolesData.length > 0
    ? rolesData.find((item) =>
        item.settings.some((setting) => setting.value === true)
      )?.page
    : "/dashboard";
};
export const categorySectorContent = (
  <span>
    <strong>Attention:</strong> Ensure to select your product main product
    categories up to three times per year to maintain accurate listings and
    improve visibility. This helps buyers find you easily and ensures compliance
    with our marketplace standards. Keep your profile up-to-date!
  </span>
);

export const primarySourcingPurpose = [
  {
    id: "For company internal use",
    name: "For company internal use",
  },
  {
    id: "To resell items",
    name: "To resell items",
  },
  {
    id: "For production & processing",
    name: "For production & processing",
  },
  {
    id: "For personal use",
    name: "For personal use",
  },
];
export const averageSourceOptions = [
  { value: "never", label: "Never" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "once", label: "Once per year or less" },
];
export const sellerPlateform = [
  {
    name: "Amazon",
  },
  {
    name: "eBay",
  },

  {
    name: "Esty",
  },

  {
    name: "Offline",
  },
];

export const urlWithHttp = (str) => {
  const urlPattern = /^(https?:\/\/)/;
  if (!urlPattern.test(str)) {
    return "Please enter a valid URL (http:// or https://)";
  }
  return null;
};
export function formatYearDate(lastChange) {
  try {
    const momentDate = lastChange?.lastChanged
      ? moment(lastChange.lastChanged, "YYYY-MM-DD HH:mm:ss")
      : null;

    if (!momentDate || !momentDate.isValid()) {
      throw new Error("Invalid date or format");
    }

    const yearDate = momentDate.format("DD-MM-YYYY");
    return yearDate;
  } catch (error) {
    return "";
  }
}

export const isArrayofObjects = (data) => {
  return (
    Array.isArray(data) &&
    data.every((item) => typeof item === "object" && item !== null)
  );
};

export const registeredCapital =
  "Registered capital content is too long. Please limit it to 50 characters";
export const limitExceeded =
  "content is too long. Please limit it to 100 characters";
export const businessTypeContent =
  "Select up to 3 business types, with one as the main type. This main type should represent your core business area where you have the most expertise and product offerings.";
export const businessTypeTooltip =
  "Selecting a main seller type will help showcase your primary business category on your mini-site and product detail pages. This will give your customers a clear understanding of your business expertise and help them find your products more easily. Choose the seller type that best represents your main business activity.";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getTimeFormat = (dateParam: any) => {
  if (!dateParam) {
    null;
  }
  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const hours = date.getHours();
  const minut = date.getMinutes();
  const amPm = hours >= 12 ? "pm" : "am";
  const DAY_IN_MS = 86400000;
  const today: any = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);

  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return "about a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (isToday) {
    return `Today at ${hours}:${
      minut.toString().length == 1 ? `0${minut}` : minut
    } ${amPm}`;
  } else if (isYesterday) {
    return `Yesterday at ${hours}:${
      minut.toString().length == 1 ? `0${minut}` : minut
    }  ${amPm}`;
  } else if (isThisYear) {
    return ` at ${hours}:${
      minut.toString().length == 1 ? `0${minut}` : minut
    }  ${amPm}`;
  }
  return getFormattedDate(date);
};
const getFormattedDate = (date): any => {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
};
export const formatFileName = (fileName, maxLength = 5) => {
  if (!fileName) return "";

  const [name, extension] = fileName.split(/\.(?=[^\.]+$)/);

  if (name.length <= maxLength) {
    return fileName;
  }
  const truncatedName = name.substring(0, maxLength) + "...";
  return `${truncatedName}.${extension}`;
};
export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
let response;
export const createQaQcApi = async (payload) => {
  response = await apiClient("company_profile/createRndManfctureQaqc", "POST", {
    body: payload,
  });
  return (response = response?.data);
};

export const currencyRanges = [
  "Less than 1 Million",
  "1 Million - 10 Million",
  "10 Million - 50 Million",
  "50 Million - 100 Million",
  "100 Million - 500 Million",
  "500 Million - 1 Billion",
  "Above 1 Billion",
];
export const currencyRange = [
  // "Hundreds",
  "Thousand (10³)",
  "Million (10⁶)",
  "Billion (10⁹)",
  "Trillion (10¹²)",
];
export const unitRange = [
  "Meter",
  "Kg",
  "Unit",
  "Set",
  "Pieces",
  "Gram",
  "Piece",
  "Sets",
  "Tons",
  "Units",
  "Frequency",
  "Amplitude",
  "Ampere",
  "Watt",
  "Grams",
  "Amper",
];
export const volumeList = [
  "Under 5,000",
  "5,001-15,000",
  "15,001-30,000",
  "30,001-50,000",
  "50,001 and above",
];
export const factorySizeOptions = [
  "Below 1,000 square meters",
  "1,000-3,000 square meters",
  "3,000-5,000 square meters",
  "5,000-10,000 square meters",
  "10,000-30,000 square meters",
  "30,000-50,000 square meters",
  "50,000-100,000 square meters",
  "Above 100,000 square meters",
];
export const formatNumericValue = (value) => {
  const valueAsString = String(value);
  const [integerPart, decimalPart] = valueAsString.split(".");
  const formattedIntegerPart = integerPart.replace(/^0+/, "") || "0";
  const formattedDecimalPart = decimalPart
    ? decimalPart.replace(/0+$/, "")
    : "";
  const formattedValue = decimalPart
    ? `${formattedIntegerPart}.${formattedDecimalPart || "0"}`
    : formattedIntegerPart;
  return formattedValue;
};

export const convertToDays = (value, period) => {
  if (period == "" || period == null || period == undefined) return;
  let lowerCasePeriod = period.toLowerCase();
  const daysInPeriods = {
    days: 1,
    weeks: 7,
    months: 30,
    years: 365,
  };
  const dailyInPeriods = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    annually: 365,
  };
  if (daysInPeriods[lowerCasePeriod] !== undefined) {
    return value * daysInPeriods[lowerCasePeriod];
  } else if (dailyInPeriods[lowerCasePeriod] !== undefined) {
    return value * dailyInPeriods[lowerCasePeriod];
  } else {
    throw new Error(
      "Invalid period type. Valid periods are: days, weeks, months, years."
    );
  }
};

//simple product score values
export const productScoreValues = {
  // 15
  productCategory: {
    sector: 9,
    parentCategory: 6,
  },
  // 16
  productDescription: {
    title: 1.862197393,
    subtitle: 1.862197393,
    aboutThisProduct: 1.862197393,
    productKeyword: 1.862197393,
    uploadDatasheet: 1.862197393,
    targetIndustry: 1.862197393,
    SKU: 1.862197393,
    productApplication: 1.862197393,
    productUseCases: 1.862197393,
  },
  productInformation: {
    inStock: {
      postValidity: 1.931098696,
      manufacturerBrand: 5.586592179,
      manufacturingYear: 0.931098696,
      modelNumber: 0.931098696,
      condition: 0.931098696,
    },
    byOrder: {
      manufacturerBrand: 10,
    },
  },
  productFeaturesAndCharacteristics: {
    simple_product_type: {
      specificationsList: 5,
    },
    config_product_type: {
      specifications: 0,
      multiSpecifications: 0,
    },
  },
  commercialInformation: {
    paymentMethods: 8,
    pricing: {
      fixedPricing: {
        quantityAvailable: 4,
        measurementUnit: 4,
        price: 4,
        currency: 0,
        shippingIncoterms: 8,
      },
      quantityBasedPricing: {
        quantityAvailable: 4,
        unit: 0,
        currency: 0,
        shippingIncoterms: 4,
        MOQ: 8,
        pricePerUnit: 4,
      },
    },
    placeOfOrigin: {
      productFromSpecificCountriesOfOrigin: {
        country: 1,
      },
      productComponentsManufacturedInDifferentCountries: {
        country: 1,
        component: 1,
        sourcedFrom: 1,
      },
      regionalOriginLabelling: {
        forOrdersFrom: 1,
        productMadeIn: 1,
      },
    },
    shippingOptions: {
      orderPreparationTime: 1,
      deliveryTimePeriod: 1,
      currentExistencePlace: {
        country: 7,
        city: 8,
        nearbySeaports: 1,
        nearbyAirports: 1,
      },
    },
    productAvailabilityOrManufacturingRestrictions: 0,
  },
  uploadProductImages: {
    browseUploadImage: 5,
    featuredImageAltText: 4,
  },
  description: {
    productDescription: 1,
    technicalSpecifications: 1,
    packagingDetails: 1,
    shippingOptions: 1,
    warrantyInformation: 1,
    certificationsAndCompliance: 1,
    returnPolicy: 2,
  },
};

//config product score values
export const configProductScoreValues = {
  productCategory: {
    sector: 10.70663812,
    parentCategory: 7.922912206,
  },
  productDescription: {
    title: 2.141327623,
    subtitle: 2.141327623,
    aboutThisProduct: 2.141327623,
    productKeyword: 2.141327623,
    uploadDatasheet: 2.141327623,
    targetIndustry: 2.141327623,
    SKU: 2.141327623,
    productApplication: 2.141327623,
    productUseCases: 2.141327623,
  },
  productInformation: {
    byOrder: {
      manufacturerBrand: 9.565310493,
    },
  },
  productFeaturesAndCharacteristics: {
    config_product_type: {
      specifications: 4.282655246,
      multiSpecifications: 4.282655246,
    },
  },
  commercialInformation: {
    paymentMethods: 17.13062099,
    placeOfOrigin: {
      productFromSpecificCountriesOfOrigin: {
        country: 2.141327623,
      },
      productComponentsManufacturedInDifferentCountries: {
        country: 2.05338809,
        component: 2.05338809,
        sourcedFrom: 2.05338809,
      },
      regionalOriginLabelling: {
        forOrdersFrom: 2.096436059,
        productMadeIn: 2.096436059,
      },
    },
    shippingOptions: {
      productionCapacity: 2.141327623,
      deliveryTimePeriod: 2.141327623,
      pickupLocation: {
        country: 1.070663812,
        city: 1.070663812,
        nearbySeaports: 1.070663812,
        nearbyAirports: 1.070663812,
      },
    },
    productAvailabilityOrManufacturingRestrictions: 0,
  },
  uploadProductImages: {
    browseUploadImage: 4.282655246,
    featuredImageAltText: 4.282655246,
  },
  description: {
    productDescription: 1.070663812,
    technicalSpecifications: 1.070663812,
    packagingDetails: 1.070663812,
    shippingOptions: 1.070663812,
    warrantyInformation: 1.070663812,
    certificationsAndCompliance: 1.070663812,
    returnPolicy: 1.070663812,
  },
};
export const seaport_nearby = "Select nearby seaport";
export const airport_nearby = "Select nearby airport";
export const qa_staff = "Please enter no. of QA staff";
export const no_of_qa_staff = "Enter No. of QA staff";
export const transection_amount = "Please select total transaction amount";

//this function is used for calculating sin, cose and tan values.

export function calculateTrigonometricValues(input) {
  // Regular expression to match trigonometric functions with extra spaces
  const regex = /(cos|sin|tan)\(\s*(\d+)\s*\)?/g;

  // Check if the input contains any of the trigonometric functions
  if (!regex.test(input)) {
    return input; // Return the input as it is
  }

  // Function to calculate trigonometric values
  function calculateTrigValue(func, angle) {
    // Convert angle to radians
    const radians = (parseInt(angle, 10) * Math.PI) / 180;

    // Calculate the value based on the function
    switch (func) {
      case "cos":
        return Math.cos(radians).toFixed(4);
      case "sin":
        return Math.sin(radians).toFixed(4);
      case "tan":
        return Math.tan(radians).toFixed(4);
      default:
        return null;
    }
  }

  // Replace matches in the string
  const output = input.replace(regex, (match, func, angle) => {
    if (!angle) return match;
    const value = calculateTrigValue(func, angle);
    return value !== null ? value : match;
  });

  return output;
}
export function getCountryNameByCode(code) {
  const country = countries.find((country) => country.code === code);
  return country ? country.name : "N/A";
}
export function getCountryCodeByName(name) {
  const country = countries.find((country) => country.name === name);
  return country ? country.code : "N/A";
}
export const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
export const deliveryTerms = [
  "Ex Works (EXW)",
  "Free Carrier (FCA)",
  "Free on Board (FOB)",
  "Cost, Insurance, and Freight (CIF)",
  "Delivered Duty Paid (DDP)",
];
export const DeliveryTerms = [
  { name: "EXW", tooltip: "Ex Works" },
  { name: "FOB", tooltip: "Free On Board" },
  { name: "CFR/CNF", tooltip: "Cost and Freight" },
  { name: "CNF/CFR", tooltip: "Cost and Freight" },
  { name: "CFR", tooltip: "Cost and Freight" },
  { name: "CNF", tooltip: "Cost and Freight" },
  { name: "CIF", tooltip: "Cost, Insurance and Freight" },
  { name: "CPT", tooltip: "Carriage Paid To" },
  { name: "CIP", tooltip: "Carriage and Insurance Paid To" },
  { name: "DAF", tooltip: "Delivered at Frontier" },
  { name: "DES", tooltip: "Delivered Ex Ship" },
  { name: "DDP", tooltip: "Delivery Duty Paid" },
  { name: "DDU", tooltip: "Delivery Duty Unpaid" },
];

export const paymentMethod = [
  {
    src: "/assets/powercozmo.png",
    name: "Payment through Merchant AD",
    tooltip:
      "Most recommended method, Merchant AD safeguards the payment until the buyer verifies the receipt of goods or documents, establishing a secure and transparent transaction for both parties",
  },
  {
    src: "/assets/cbs.svg",
    name: "CBS (Cash before Shipment)",
    tooltip:
      "Guarantees payment for the seller before shipment, eliminating risk but potentially discouraging buyers due to the upfront requirement.",
  },
  {
    src: "/assets/advancepayment.svg",
    name: "Advanced Payment",
    tooltip:
      "Encourages buyer commitment and accelerates cash flow for the seller by receiving a portion of the payment upfront but requires trust from the buyer.",
  },
  {
    src: "/assets/ach.svg",
    name: "ACH Transfer",
    tooltip:
      "Transfers funds electronically within the same country, offering a cost-effective alternative to wire transfers but with slightly longer processing times.",
  },
  {
    src: "/assets/credit-card.svg",
    name: "Credit Card",
    tooltip:
      "Offers convenience and wide acceptance for buyers, but sellers incur processing fees.",
  },
  {
    src: "/assets/debit-card.svg",
    name: "Debit Card",
    tooltip:
      "Similar to credit cards but deducts funds directly from the buyer's bank account, offering convenience and security.",
  },
  {
    src: "/assets/paypal.svg",
    name: "Online Payment Platforms (e.g. PayPal)",
    tooltip:
      "Provides a secure and user-friendly platform for online payments, but fees may be associated with transactions.",
  },
  {
    src: "/assets/cash.svg",
    name: "Cash",
    tooltip:
      "Traditional payment method accepted by most businesses but carries the risk of theft or loss.",
  },
  { name: "Escrow", tooltip: "", src: "/assets/escrow.svg" },
  {
    src: "/assets/dp.svg",
    name: "D/P (Documents against Payment)",
    tooltip:
      "Provides some security for the seller while allowing buyers to inspect goods before payment.",
  },
  {
    src: "/assets/da.svg",
    name: "D/A (Documents against Acceptance)",
    tooltip: "Offers extended credit terms to the buyer compared to D/P.",
  },
  {
    src: "/assets/tt.svg",
    name: "TT (Telegraphic Transfer)",
    tooltip:
      "Fast, secure, and widely accepted globally. Transparent fees and tracking of funds",
  },
  {
    src: "/assets/lc.svg",
    name: "LC (Letter of Credit)",
    tooltip:
      "Guarantees payment to the seller through a bank upon fulfilling specific conditions outlined in the LC document, offering high security but requiring complex setup and incurring bank fees.",
  },
];

export const hideOptions = [
  {
    name: "@Sign in@ show price or @contact us@ for pricing information",
    value: 1,
  },
  {
    name: "Price Flexible: The price of this product is flexible and may vary depending on quantity and other factors. Please @sign in@ to see price us to discuss pricing",
    value: 2,
  },
  {
    name: "Price Negotiable Upon Request: Please @contact us@ for pricing information. The price of this product may vary depending on quantity and other factors",
    value: 3,
  },
  {
    name: "Price Subject to Negotiation: The price of this product is negotiable upon request. Please @contact us@ for more information",
    value: 4,
  },
  {
    name: "Price Subject to Final Agreement: The price of this product is flexible and may vary depending on quantity and other factors. Please @contact us@ to discuss pricing",
    value: 5,
  },
];

// function to calcuate the max point with information score and evavluation data points in lead scoring mudule.
// formula used in this calculation is (information score + evaluation data points) * weight
export function updateAllMaxPoints(obj) {
  for (const key in obj) {
    const item = obj[key];

    let informationScore = 0;
    let weight = 0;
    const rawScore = item?.information_score;
    const rawWeigth = item?.weight;
    const parsedScore = parseFloat(rawScore);
    const parsedWeight = parseFloat(rawWeigth);

    informationScore = isNaN(parsedScore) ? 0 : parsedScore;
    weight = isNaN(parsedWeight) ? 0 : parsedWeight;

    if (
      item.has_evaluation_edit_allow === 1 &&
      Array.isArray(item.evaluation_data)
    ) {
      const results = item.evaluation_data.map((data) => {
        const points = parseFloat(data?.points || "0");
        const safePoints = isNaN(points) ? 0 : points;

        if (data.action === "add") {
          return (informationScore + safePoints) * weight;
        } else if (data.action === "subtract") {
          return (informationScore - safePoints) * weight;
        } else {
          return 0;
        }
      });

      const maxValue =
        results.length > 0 ? Math.max(...results) : informationScore * weight;

      const descriptor = Object.getOwnPropertyDescriptor(item, "max_points");
      if (
        !descriptor ||
        descriptor.writable ||
        typeof item.max_points === "undefined"
      ) {
        item.max_points = maxValue;
      } else {
        console.error(
          `Cannot assign to read-only property max_points in ${key}`
        );
      }
    } else {
      const descriptor = Object.getOwnPropertyDescriptor(item, "max_points");
      if (
        !descriptor ||
        descriptor.writable ||
        typeof item.max_points === "undefined"
      ) {
        item.max_points = informationScore * weight;
      } else {
        console.error(
          `Cannot assign to read-only property max_points in ${key}`
        );
      }
    }
  }
}

//function to calculate total max points in lead scroing module of CRM.
export function calculateTotalMaxPoints(data) {
  let total = 0;
  for (const key in data) {
    if (
      data[key] &&
      typeof data[key] === "object" &&
      "max_points" in data[key]
    ) {
      total += Number(data[key].max_points) || 0;
    }
  }
  return total || 0;
}

// function to calculate the overall max score and overall max weighted score in lead scoring module of CRM.
export function calculateScores(objectsArray) {
  let overallMaxScore = 0;
  let overallMaxWeightedScore = 0;

  for (const obj of objectsArray) {
    for (const key in obj) {
      const field = obj[key];

      const maxPoints = Number(field.max_points || 0);
      const weight = Number(field.weight || 0);
      const informationScore = Number(field.information_score || 0);

      let evaluationPoints = 0;
      if (Array.isArray(field.evaluation_data)) {
        for (const evalItem of field.evaluation_data) {
          evaluationPoints += Number(evalItem.points || 0);
        }
      }

      const weightedScore = (informationScore + evaluationPoints) * weight;

      overallMaxScore += maxPoints;
      overallMaxWeightedScore += weightedScore;
    }
  }

  return {
    overall_max_score: overallMaxScore,
    overall_max_weight_score: overallMaxWeightedScore,
  };
}

export function isValidParentheses(str) {
  let stack = [];

  for (let char of str) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}
