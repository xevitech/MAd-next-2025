import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  BtnFilled,
  BtnOutlined,
} from "@/components/common/buttons/ButtonsVariations";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { CloseIconContainer, closeIconStyle, CrossIconContainer, OuterContainer } from "../common/DeleteAlert/DeleteDialougeStyle";
import { apiClient } from "../common/common";
const PlanDialogSellerSubAccount = ({
  open,
  handleClose,
  onClickAction,
  loading,
  role,
}: any) => {
  const [disableButton, setDisable] = useState<boolean>(false);
  useEffect(() => {
    FetchPlanDetail();
  }, []);
  const [plan, setPlan] = useState("");
  const FetchPlanDetail = async () => {
    let response = await apiClient("users/current_plan", "get");
    if (response.status === 200) {
      setPlan(response?.data?.name);
    }
  };
  console.log("response?.data?.name---",plan)
  const router: any = useRouter();
  const NavigateHandler = (route: any) => {
    router.push(`${route}`);
  };
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: 10 }}
    >
      <OuterContainer onClick={() => handleClose(false)}>
        <CrossIconContainer>
          <CloseIcon style={{ color: "#FF1A43" }} />
        </CrossIconContainer>
      </OuterContainer>
      <CloseIconContainer>
        <CloseIcon style={closeIconStyle} />
      </CloseIconContainer>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description1"
          sx={{
            fontFamily: "Open Sans",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "13px",
            lineHeight: "21px",
            color: "#4A4A4A",
            textAlign: "center",
          }}
        >
          Your <span style={{ fontWeight: "bold" }}>{plan} plan</span> doesn't
          support seller sub account
          <br />
          Upgrade to unlock this feature.
          {role == "seller" && (
            <span
              onClick={() => {
                NavigateHandler("/subscription");
              }}
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              View Plan
            </span>
          )}<br></br>
          {role == "subuser" && <span>Please contact with seller to upgrade plan.</span>}
        </DialogContentText>
      </DialogContent>
      {role == "seller" && (
        <DialogActions sx={{ justifyContent: "center", marginBottom: 2 }}>
          <BtnFilled
            disabled={disableButton}
            type="submit"
            height={"36px"}
            onClick={() => {
              setDisable(true);
              onClickAction();
            }}
          >
            {disableButton || loading ? (
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              "Upgrade"
            )}
          </BtnFilled>
          <BtnOutlined
            disabled={disableButton}
            height={"36px"}
            onClick={() => handleClose(false)}
          >
            Cancel
          </BtnOutlined>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PlanDialogSellerSubAccount;
