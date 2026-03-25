import Auth from "@/auth/Auth";
import { BASE_URL_CHAT } from "../staticValues";

/**
 * Chat API client function to handle requests to the chat backend.
 *
 * @param url - The endpoint to which the request is made.
 * @param method - The HTTP method (e.g., GET, POST).
 * @param option - Additional options for the request, typically includes request body.
 * @param isFormData - Boolean flag indicating if the body is form data.
 * @returns - Returns the parsed response or an error message.
 */
export const chatApiClient = async (
  url: string,
  method: string,
  option: any = {},
  isFormData: boolean = false
) => {
  let request: any;
  const token = Auth.token();

  if (token) {
    let headersJson: any = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    request = new Request(`${BASE_URL_CHAT}${url}`, {
      method: method?.toUpperCase(),
      headers: new Headers(headersJson),
      body: isFormData ? option?.body : JSON.stringify(option?.body),
    });
  }

  try {
    const response: any = await fetch(request);
    const status = response?.status;
    const parsedResponse = await response.json();
    if (parsedResponse.status == false) {
      if (parsedResponse?.errors) {
        console.error(parsedResponse?.errors);
        return;
      }
      return { status: false, message: parsedResponse?.message };
    }
    if ([401, 302, 500, 405].includes(status)) {
      console.error(parsedResponse.message ?? "Something went wrong!");
      return parsedResponse;
    }

    const data = { ...parsedResponse, status };
    return data;
  } catch (error) {
    console.error("Network error", error);
    return { status: false, message: "Network error occurred." };
  }
};
