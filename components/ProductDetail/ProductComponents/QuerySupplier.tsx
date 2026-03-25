import { ButtonBase, Divider, styled } from "@mui/material";
import React, { useState } from "react";
import {
  FontContainer,
  Shadowcontainer,
  TextArea,
} from "@/components/ProductDetail/style";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { apiClient } from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getTokenFromCookies } from "@/utils/cookieUtils";

const DownloadButton = styled(ButtonBase)(() => ({
  gap: 5,
  border: "1px solid rgba(34, 51, 84, 0.5)",
  color: "#6C6C6C",
  width: 127,
  alignItems: "center",
  fontFamily: "Open Sans",
  fontSize: 14,
  fontWeight: 400,
  padding: "5px 10px",
  borderRadius: 6,
  "& .MuiTypography-root": {
    color: "#6C6C6C",
    fontFamily: "Open Sans",
    fontSize: 14,
    fontWeight: 400,
    position: "relative",
    top: 1,
  },
}));
const StyledTextares:any = styled(TextArea)(() => ({
  margin: 0,
  fontFamily: "Open Sans",
  fontSize: 14,
  fontWeight: 400,
  border: "1px solid rgba(34, 51, 84, 0.5)",
  "&:focus-visible": {
    outline: "none",
  },
}));

const QuerySupplier = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { user_id, id }: any = useSelector(
    (state: any) => state.productDetail.detail.data
  );

  const SendQuery = async () => {
    try {
      let token = getTokenFromCookies();
      if (token) {
        if (message === "") {
          setErrorMsg("Please enter query");
          return;
        }
        setLoading(true);
        let response = await apiClient("front/getQuery/submit", "post", {
          body: {
            message,
            product_id: id,
            user_id,
          },
        });
        if (response.status === 200) {
          setShowMessage(true);
          setMessage("");
        }
        setLoading(false);
      } else {
        toast.error("Please Login");
      }
    } catch (err) {
      toast.error("Please Login");
    }
  };

  return (
    <Shadowcontainer>
      <FontContainer fontSize="15px" padding="8px 8px">
        Your Query To The Supplier
      </FontContainer>
      <Divider />
      {!showMessage ? (
        <Stack
          direction={{ xs: "row" }}
          justifyContent={{ xs: "space-between" }}
          alignItems={{ xs: "stretch" }}
          spacing={{ xs: 2 }}
        >
          <StyledTextares
            flexGrow={1}
            name="description"
            placeholder="Have a question/query? Message it instantly to the seller here..."
            onChange={(e) => {
              setErrorMsg("");
              setMessage(e.target.value);
            }}
            value={message}
            error={errorMsg !== "" ? true : false}
            minRows={2}
            style={{ marginTop: "0px!important" }}
          />
          <DownloadButton onClick={SendQuery} disabled={loading}>
            {loading ? (
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="#D7282F"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              "Submit"
            )}
          </DownloadButton>
        </Stack>
      ) : (
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" variant="middle" flexItem />}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              height={20}
              width={20}
              alt="Query"
              src="/assets/Check-Icon.svg"
            />
            <FontContainer fontSize="19px">Sent!!</FontContainer>
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              padding: "16px",
            }}
          >
            <FontContainer fontSize="19px" fontWeight="400">
              Your Query has been sent we will revert you soon if you want to
              resend
            </FontContainer>
            <FontContainer
              fontSize="19px"
              color="#D7282F"
              fontWeight="400"
              style={{ cursor: "pointer" }}
              onClick={() => setShowMessage(false)}
            >
              click here!!
            </FontContainer>
          </Box>
        </Stack>
      )}
    </Shadowcontainer>
  );
};

export default QuerySupplier;
