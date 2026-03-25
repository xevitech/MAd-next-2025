import Auth from "@/auth/Auth";
import { BASE_URL } from "@/utils/staticValues";
import Resizer from "react-image-file-resizer";

const resizeAndUploadImage = async (file: File) => {
  const resizedImage = file;
  const payload = {
    profile: resizedImage,
  };
  const response = await fetch(`${BASE_URL}/profile/updateProfile`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${Auth.token()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data?.message;
};

export const resizeFile = (file: File, cover: boolean = false, type = null) => {
  if (cover == true) {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        1500,
        1000,
        "JPEG",
        100,
        0,
        (resizedFile) => {
          resolve(resizedFile);
        },
        "base64",
        1000,
        800
      );
    });
  } else if ((type = "factoryDetails")) {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        500,
        300,
        "JPEG",
        100,
        0,
        (resizedFile) => {
          resolve(resizedFile);
        },
        "base64",
        400,
        200
      );
    });
  } else {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        "JPEG",
        100,
        0,
        (resizedFile) => {
          resolve(resizedFile);
        },
        "base64",
        80,
        80
      );
    });
  }
};

export const dataURLtoBlob = (dataURL) => {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

export default resizeAndUploadImage;
