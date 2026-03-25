import React, { useState, useEffect, useContext } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { BASE_URL } from "@/utils/staticValues";
import axios from "axios";
import Auth from "@/auth/Auth";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch } from "redux/store";
import { getCompanyProfile } from "@/hooks/company";
import { profileData } from "@/hooks/appReducers";
const useStyles = makeStyles()(() => {
  return {
    upbtn: {
      fontWeight: "bold !important",
      height: "36px !important",
      display: "inline-flex !important",
      backgroundColor: "#fff !important",
      border: "1px solid #d7282f !important",
      color: "#d7282f !important",
      boxShadow: "none !important",
      "&:hover": {
        background: "#DD484E !important",
        color: "#fff !important",
      },
    },
  };
});
const RemoveProfileImg = ({ profileImgType, closeModal, id }) => {
  const [removeImg, setRemoveImg] = useState(false);
  const endPoint = "profile/delete_images";
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const handleRemoveImage = async () => {
    setRemoveImg(true);
    let formData = new FormData();
    if (profileImgType == "user_contact_list") {
      formData.append("id", id);
      formData.append("type", profileImgType);
    } else {
      formData.append("type", profileImgType);
    }

    let url = `${BASE_URL}/${endPoint}`;
    try {
      let { status, data } = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${Auth.token()}` },
      });
      if (status === 200) {
        setRemoveImg(false);
        closeModal();
        toast.success(data?.message);
        dispatch(profileData());
        dispatch(getCompanyProfile());
      }
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <div>
        {" "}
        {removeImg ? (
          <CircularProgress
            sx={{
              "& .MuiCircularProgress-root ": {
                color: "#D7282F",
              },
            }}
          />
        ) : (
          <>
            {profileImgType === "user_contact_list" && (
              <DeleteIcon
                sx={{
                  "&.MuiSvgIcon-root": {
                    color: "#D7282F",
                    fontSize: "20px",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleRemoveImage()}
              />
            )}
            {profileImgType !== "user_contact_list" && (
              <Button
                style={{
                  textTransform: "capitalize",
                }}
                variant="contained"
                className={classes.upbtn}
                onClick={() => handleRemoveImage()}
              >
                Delete
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default RemoveProfileImg;
