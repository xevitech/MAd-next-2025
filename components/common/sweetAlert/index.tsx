import Swal from "sweetalert2";

interface AlertOptions {
  userID?: string;
  minisiteUserID?: string;
  textContent?: string;
  titleContent?: string;
  iconToShow?: boolean;
  styledTextHtml?: string | null;
  imageWidth?: number;
}

export const showAlert = ({
  userID,
  minisiteUserID,
  textContent,
  titleContent,
  iconToShow = true,
  styledTextHtml = "",
  imageWidth = 100,
}: AlertOptions) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "custom-btn cancel-button",
      cancelButton: "custom-btn remove-btn",
    },
    buttonsStyling: false,
  });
  if (userID && minisiteUserID) {
    return swalWithBootstrapButtons.fire({
      title: titleContent ? titleContent : "",
      text: textContent ?? "",
      html: styledTextHtml && styledTextHtml,
      icon: iconToShow ? "warning" : undefined,
      showCancelButton: false,
      reverseButtons: true,
      imageUrl: !iconToShow ? "/assets/minisiteimages/blockmessage.svg" : "",
      imageWidth: !iconToShow ? imageWidth : "",
      imageAlt: !iconToShow ? "Custom image" : "",
    });
  } else {
    return swalWithBootstrapButtons.fire({
      title: titleContent ? titleContent : "Notice",
      text: textContent ?? "",
      icon: iconToShow ? "warning" : undefined,
      html: styledTextHtml && styledTextHtml,
      showCancelButton: false,
      reverseButtons: true,
      imageUrl: !iconToShow ? "/assets/minisiteimages/blockmessage.svg" : "",
      imageWidth: !iconToShow ? imageWidth : "",
      imageAlt: !iconToShow ? "Custom image" : "",
    });
  }
};
