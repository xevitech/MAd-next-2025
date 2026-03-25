import { getCookie, getTokenFromCookies, setCookie } from "@/utils/cookieUtils";

class Auth {
  authenticated = false;

  login(token, data, expires_at = null) {
    setCookie("token", token, expires_at);
    // localStorage.setItem("Token", 'abc');
    localStorage.setItem("userData", JSON.stringify(data));
    if (data?.token) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }
  token() {
    const token = typeof window == "undefined" ? "" : getTokenFromCookies();
    return token;
  }

  logout() {
    localStorage.removeItem("Token");
    localStorage.removeItem("userData");
    localStorage.removeItem("userData1");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    this.authenticated = false;
  }

  userData() {
    const data = JSON.parse(localStorage.getItem("userData"));
    return data;
  }
  isUserAuthenticated() {
    if (typeof window !== "undefined" && getTokenFromCookies()) {
      return true;
    } else {
      return false;
    }
  }
}
export default new Auth();
