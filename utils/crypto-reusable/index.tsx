import { SECRET_KEY } from "../staticValues";
import CryptoJS from "crypto-js";

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};
export const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
