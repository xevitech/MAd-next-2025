import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { countryCodes } from "@/utils/countryCodes";
import { Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import Auth from "@/auth/Auth";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Image from "next/image";
import { BASE_URL } from "@/utils/staticValues";
import { InputItemContainer, style } from "./styles";
import { useSelector } from "react-redux";

export const SocialMedia = (props) => {
  const {
    open,
    closeModal,
    wechatid,
    skypeid,
    whatsappid,
    handleWeChatChange,
    handleWhatsAppChange,
    handleSkypeChange,
    getProfile,
  } = props;
  const [loading, setLoading] = useState(false);
  const [mobileValue, setMobileValue] = useState(whatsappid);
  const [mobileError, setMobileError] = useState(false);
  const { country } = useSelector((state: any) => state.geoLocation);
  const handleSocialMediaAccountSubmit = async () => {
    if (mobileError) {
      toast.error("Please Enter Valid Mobile Number");
      return;
    }

    setLoading(true);

    const res = await fetch(
      `${BASE_URL}/profile/updateProfile`,

      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
          "Content-Type": `application/json`,
        },
        body: JSON.stringify({
          skypeID: skypeid,
          wechatID: wechatid,
          whatsapp_number: mobileValue,
        }),
      }
    );

    const response = await res.json();

    if (response.status) {
      setLoading(false);
      closeModal();
      getProfile();
    }
  };

  const handleMobileChange = (text) => {
    setMobileValue(text);
  };

  useEffect(() => {
    setMobileValue(
      countryCodes.filter((element) => element?.name == country)[0]?.code
    );
  }, []);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p style={{ textAlign: "center" }}>Social Accounts</p>
          <Button
            onClick={closeModal}
            color="error"
            style={{
              minHeight: "46px",
              minWidth: "46px",
              borderRadius: "50%",
              position: "absolute",
              top: "9px",
              right: "11px",
            }}
          >
            <CloseOutlinedIcon style={{ cursor: "pointer" }} />
          </Button>
          <InputItemContainer>
            <TextField
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              autoFocus
              fullWidth
              label="WeChat ID"
              id="password"
              value={wechatid || ""}
              onChange={(e) => {
                handleWeChatChange(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        width: "30px",
                        height: "20px",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={"/assets/weChat.svg"}
                        layout="fill"
                        alt={"icon"}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </InputItemContainer>
          <InputItemContainer>
            <TextField
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              fullWidth
              label="Skype ID"
              id="password"
              value={skypeid || ""}
              onChange={(e) => {
                handleSkypeChange(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        width: "30px",
                        height: "20px",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={"/assets/skype.svg"}
                        layout="fill"
                        alt={"icon"}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </InputItemContainer>
          <InputItemContainer></InputItemContainer>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "rgba(216, 38, 47,1)",
                height: "36px",
                width: "85%",
                margin: "auto",
              }}
              variant="contained"
              onClick={() => {
                handleSocialMediaAccountSubmit();
              }}
            >
              {loading ? (
                <ThreeDots
                  height="36"
                  width="36"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
