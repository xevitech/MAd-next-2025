import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";

export const getData = async (URL) => {
  try {
    const response = await fetch(`${BASE_URL}` + URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Auth.token()}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postData = async (URL, METHOD, payLoads) => {
  try {
    const response = await fetch(`${BASE_URL}` + URL, {
      method: METHOD,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
      body: JSON.stringify(payLoads),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Formats the full address from the user information object.
 *
 * @param {object} userInfo - Object containing the details about the company.
 * @returns {string} - Formatted address as a comma-separated string.
 */
export const formatToFullAddress = (userInfo) => {
  const { location_of_registration = {} } = userInfo || {};
  const {
    reg_street_address,
    reg_additional_address,
    registration_city,
    reg_region_state_province,
    registration_postalcode,
  } = location_of_registration;

  const addressParts = [
    reg_street_address,
    reg_additional_address,
    registration_city ? registration_city.toUpperCase() : "",
    reg_region_state_province ? reg_region_state_province.toUpperCase() : "",
    registration_postalcode,
  ];

  const filteredAddressParts = addressParts.filter(
    (part) => part && part.trim() !== ""
  );

  return filteredAddressParts.join(", ");
};

export const stringToBooleadTypecast = (value = "") => {
  if (value === "on" || value == "on") {
    return true;
  }

  return false;
};

/**
 *
 * @param {string}
 * @returns {string} space removed string
 */
export const removeSpaces = (str = "") => {
  return str.replace(/\s+/g, "");
};

export const isValidDate = (dateString) => {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Check if the date is valid
  return !isNaN(date.getTime());
};

export const getParsedValue = (value) => {
  return value ? JSON.parse(value) : "";
};

export const removeUnderscoreFromString = (value: string) => {
  if (!value) return "";
  return value.replaceAll(/_/g, " ");
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getSymbolByName = (name) => {
  if (!name) return "";
  const symbolMatch = name.match(/\(([^)]+)\)$/);
  return symbolMatch ? symbolMatch[1] : "";
};

/**
 *
 * @param dateString
 * @returns DD/Long/YYYY
 */
export const formatDateUsFormat = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  // Rearrange the parts to "DD Month YYYY"
  const [month, day, year] = formattedDate.split(" ");

  return `${day} ${month} ${year}`;
};

export const getBussinessTypeIcon = (bussinessType = "") => {
  switch (bussinessType) {
    case "Manufacturers":
      return "Manufacturers1.svg";
    case "Agents and Representatives":
      return "Agents1.svg";
    case "Resellers":
      return "Resellers1.svg";
    case "Distributors":
      return "Distributors1.svg";
    case "Retailers":
      return "Retailers1.svg";
    case "Wholesalers":
      return "Wholesalers1.svg";
    default:
      return "Others1.svg";
  }
};

export const getUTMParameter = (name = "") => {
  if (typeof window != "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get(name);
    return paramValue;
  }
  return null;
};

export const getMetaData = (typeOfData = null) => {
  if (!typeOfData) return;
  return document
    .querySelector(`meta[name=${typeOfData}]`)
    ?.getAttribute("content");
};

/**
 * @returns DD Month YYYY at 00:00:00 PM/AM
 */
export const getCurrentDateTimeTracking = () => {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour clock (for AM/PM)
  }).format(currentDate);
  return formattedDate;
};

/**
 * Removes or retrieves the last value from a hyphen-separated string.
 * If `needLastIndexValue` is true, it returns the last segment; otherwise, it removes the last segment and returns the modified string.
 *
 * @param value - The input string to be processed.
 * @param needLastIndexValue - A flag that determines whether to return the last segment (`true`) or remove it (`false`).
 * @returns The last segment of the string if `needLastIndexValue` is true, or the modified string with the last segment removed.
 */
export const removeLastIndexValue = (
  value: string,
  needLastIndexValue: boolean = false
) => {
  if (!value) return;
  if (needLastIndexValue) {
    const segments = value.split("-");
    return segments[segments?.length - 1];
  }
  const segments = value.split("-"); // Split the string into segments by hyphen
  segments.pop(); // Remove the last segment
  return segments.join("-");
};


export const capitalizeFirstLetter = (str)=> {
  if (typeof str !== 'string') {
  return
  }

  if (str === '') {
    return
  }

  let result = str.toLowerCase();
  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result;
}
