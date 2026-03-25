// toggling edit and view states of sections
import { countriesList as countries } from "@/utils/countriesphp";
import { buttonTrackIdentifiers } from "../commonDatas/commonIdentifierDatas";

// function for toggling views in
export const toggleView = (state, setter, resetViews) => {
  resetViews();
  if (state == "view") {
    setter("edit");
  } else if (state == "edit") {
    setter("view");
  }
};

// function that returns country's name taking input as code for that coutnry
export const returnCountryFromCode = (code: string) => {
  if (!code) return;
  return countries.find((ele) => ele?.code == code)?.name || "";
};

// function that converts a given lowercase letter string to first letter capitalized

export const capitalizeFirstLetter = (string: string) => {
  if (!string) return;
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

export const convertUnderscoreToSpaceAndCapitalize = (string: string) => {
  let modifiedString;
  if (!string) return;

  if (string?.includes("_")) {
    modifiedString = string
      .split("_")
      .map((ele) => capitalizeFirstLetter(ele))
      .join(" ");
    return modifiedString;
  } else if (!string?.includes("_")) {
    return capitalizeFirstLetter(string);
  }
};

export const objectsEqual = (obj1, obj2) => {
  const obj1Stringified = JSON.stringify(obj1);
  const obj2Stringified = JSON.stringify(obj2);

  if (obj1Stringified == obj2Stringified) {
    return true;
  } else {
    return false;
  }
};

export const allowOnlyNums = (value, setState) => {
  const regex = /^[0-9\b]+$/;
  if (value === "" || regex.test(value)) {
    console.log("I ran!");
    setState(value);
  } else {
    return;
  }
};

export const redirectToPageWithQuery = (queryName, queryValue) => {
  const pathname = "productlist";
  const query = { queryName: queryValue };
  // router.push(
  //   { pathname, query },
  //   undefined,
  //   { shallow: true }
  // );
  window.open(
    `/${pathname}?${queryName}=${queryValue}`,
    "_blank",
    "noreferrer"
  );
};

export const checkIsIdentifier = (identifier = "") => {
  if (identifier == null) {
    return false;
  }
  const checkByDynamicValues = buttonTrackIdentifiers.some((item) =>
    identifier.includes(item)
  );
  let isIdentifierMatching = false;
  if (buttonTrackIdentifiers.includes(identifier)) {
    isIdentifierMatching = true;
  } else if (checkByDynamicValues) {
    isIdentifierMatching = true;
  }
  return isIdentifierMatching;
};

export const modifyEmail = (email: string) => {
  return email?.replace(
    /(.{2})(.*)(?=@)/,
    function (gp1: string, gp2: string, gp3: string) {
      for (let i = 0; i < gp3.length; i++) {
        gp2 += "*";
      }
      return gp2;
    }
  );
};

export const setOtpExpirationTimeInLS = () => {
  const time = new Date();
  const expirationTime = time.getTime() + 120 * 1000;
  localStorage.setItem("otpExpirationTime", expirationTime.toString());
};

/**
 * To find if the ibject has value or not
 * @param {Object} objectValue
 * @returns {Boolean}
 */
export const isObjectEmpty = (objectValue) => {
  if (!objectValue) return;
  const isEmpty = Object.keys(objectValue).length === 0;
  return isEmpty;
};

export const formatDateToTimeStamp = (inputDate) => {
  if (!inputDate) return "";
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

export const parseJsonArray = (jsonString) => {
  try {
    if (Array.isArray(jsonString) && jsonString?.length > 0) {
      return jsonString;
    }
    const parsedData = JSON.parse(jsonString);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
};

export const getCurrentPageUrl = () => {
  try {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
  } catch (error) {
    console.error("Error getting current page URL:", error);
    return "";
  }
};

/**
 * 
 * @param dateString 
 * @returns 
 */
  export const formatDateTime = (dateString: string) => {
    if(dateString === "0000-00-00 00:00:00" || !dateString) return ''
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, 
    };
  
    const formattedDate = date.toLocaleString('en-GB', options);
  
    const [datePart, timePart] = formattedDate.split('at');
  
    if (timePart) {
      const formattedTime = timePart.replace(/(\d{2}):(\d{2})([APM]{2})/, '$1:$2 $3');
  
      return `${datePart} | ${formattedTime}`;
    }
  
    return datePart || '';
  };