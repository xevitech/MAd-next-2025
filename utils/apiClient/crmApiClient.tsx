import Auth from "@/auth/Auth";
import { BASE_URL_CRM } from "../staticValues";
import { getSessionFromCookies } from "../cookieUtils";
import { toast } from "react-toastify";

type UserData = {
  id: string;
  [key: string]: any;
};
/**
 * CRM API client function to handle requests to the CRM backend.
 *
 * @param url - The endpoint to which the request is made.
 * @param method - The HTTP method (e.g., GET, POST).
 * @param option - Additional options for the request, typically includes request body.
 * @param isFormData - Boolean flag indicating if the body is form data.
 * @returns - Returns the parsed response or an error message.
 */

export const crmApiClient = async (
  url: string,
  method: string,
  option: any = {},
  isFormData: boolean = false
) => {
  let request: any;
  const token = Auth.token();
  const sessionID = getSessionFromCookies();

  let userData: string | UserData = "user-Id-NA";

  if (typeof window !== "undefined") {
    const data = localStorage.getItem("userData");
    try {
      userData = data ? JSON.parse(data) : "user-Id-NA";
    } catch {
      userData = "user-Id-NA";
    }
  }

  const userId =
    typeof userData === "object" && userData !== null && "id" in userData
      ? userData.id
      : "";
  // For GET requests
  if (method === "get") {
    request = new Request(`${BASE_URL_CRM}${url}`, {
      method: "GET",
    });
  }
  if (method === "get" && token) {
    request = new Request(`${BASE_URL_CRM}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
        "X-Session-Hash": sessionID ?? "session-hash",
        "x-uid": userId ? `"${userId}"` : "user-Id-NA",
      },
      ////body: JSON.stringify(option?.body),
    });
  } else if (method !== "get") {
    let headersJson: any = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Auth.token()}`,
      "X-Session-Hash": sessionID ?? "session-hash",
      "x-uid": userId ? `"${userId}"` : "user-Id-NA",
    };

    let bodyData = JSON.stringify(option?.body);
    if (isFormData) {
      headersJson = {
        Authorization: `Bearer ${Auth.token()}`,
        "X-Session-Hash": sessionID ?? "session-hash",
        "x-uid": userId ? `"${userId}"` : "user-Id-NA",
      };
      bodyData = option?.body;
    }
    request = new Request(`${BASE_URL_CRM}${url}`, {
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
  if (status === 422) {
    toast.error("something went wrong!");
    return status;
  }
  const data = { ...response, status };
  return data;
};
