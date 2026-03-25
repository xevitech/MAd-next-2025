/**
 * Sets a cookie with a specified name, value, and expiration days.
 * @param {string} name - The name of the cookie.
 * @param {string} [value] - The value of the cookie .
 * @param {number} [days] - The number of days until the cookie expires .
 */
export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date(days);
    if (!isNaN(date.getTime())) {
      expires = "; expires=" + date.toUTCString();
    } else {
      console.error("Invalid date format");
    }
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

/**
 * Removes a cookie by setting its expiration date to a past date.
 * @param {string} - The name of the cookie to remove (defaults to "token").
 */
export const removeTokenFromCookie = (name?: "token") => {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};

export const removeMobileVerficiationFromCookie = (name?: "token") => {
  document.cookie =
    "isMobileVerificationDismissed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};

export const getCookie = (name) => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
};

export const getTokenFromCookies = () => {
  const token =
    document.cookie.match("(^|;)\\s*" + "token" + "\\s*=\\s*([^;]+)")?.pop() ||
    null;
  return token;
};
export const getSessionFromCookies = () => {
  if (typeof window == "undefined") return "";
  const sessionId =
    document.cookie
      .match("(^|;)\\s*" + "sessionId" + "\\s*=\\s*([^;]+)")
      ?.pop() || null;
  return sessionId;
};
