import { Avatar, Box, Skeleton, Stack, styled, Typography } from "@mui/material";
import {
  BImageBox,
  ChatButton,
  ChatContainer,
  ContactSellerMini,
  GradientBox,
  MessageBubble,
  SellerHeading,
  Sellername,
  SellerOuter,
  Timestamp,
} from "./Products.styled";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "@/components/common/Confirmation";
import Swal from "sweetalert2";
import {
  createEchoInstance,
  fetchChatHistory,
  getUserIdLocalStorage,
} from "@/components/common/common";
// import useInitiateChatAndOpenWindow from "@/components/Chat/common/customHooks/useInitiateChat";
import { showAlert } from "@/components/common/sweetAlert";
import {
  chatWindowPopup,
  replaceChat,
  setActiveUser,
  setRoomId,
  setUsersList,
} from "@/hooks/ChatReducer";
const chats = [
  {
    avatar: "https://via.placeholder.com/40",
    message: "Hi! How can we help you?",
    time: "10:30 AM",
  },
];
export default function SellerDetail() {
  const [open, setOpen] = useState<boolean>(false);
  const { headerData, headerLoading, contactChatData, minisiteUserID } =
    useSelector((state: any) => state.miniSite);
  const { user_id = "" } = headerData || {};
  const dispatch = useDispatch();
  let userID = localStorage?.userData
    ? JSON.parse(localStorage.userData).id
    : "";
  const { popup, usersList } = useSelector((state: any) => state?.chatData);
  const [sellerData, setSellerData] = useState<any>();
  useEffect(() => {
    if (headerData) {
      const data = {
        image: headerData?.user_info?.profile_link,
        name: headerData?.user_info?.name,
        role: headerData?.user_info?.job_role,
        email: headerData?.contact_profile?.shop_email,
      };
      setSellerData(data);
    }
  }, [headerData]);

  const currentLoggedUserId = getUserIdLocalStorage();

  // const initiateChat = useInitiateChatAndOpenWindow();

  const chatBox = () => {
    toast.success(
      "Thank you for your interest. We are currently working on chat box."
    );
  };

  return (
    <>
      <AlertMessage
        open={open}
        handleClose={setOpen}
        text="You cannot chat with your saller"
      />
      {
        // <SellerOuter>
        //   <SellerHeading pb={"10px"}>
        //     <Typography variant="h4">Contact Seller</Typography>
        //   </SellerHeading>
        //   <Divider orientation="horizontal" />
        //   <Stack
        //     padding="16px 0"
        //     direction="row"
        //     justifyContent="start"
        //     alignItems="center"
        //     spacing={{ xs: 1, lg: 1.3 }}
        //   >
        //     <Sellername>
        //       {headerLoading ? (
        //         <Skeleton
        //           animation="wave"
        //           variant="circular"
        //           width={100}
        //           height={100}
        //         />
        //       ) : (
        //         <Avatar
        //           sx={{ width: 44, height: 44 }}
        //           alt="Remy Sharp"
        //           src={contactChatData?.image}
        //         />
        //       )}
        //     </Sellername>
        //     <Sellername>
        //       <Typography sx={{ textTransform: "capitalize" }}>
        //         {contactChatData?.name}
        //       </Typography>
        //       <Typography component="span" sx={{ textTransform: "capitalize" }}>
        //         {contactChatData?.designation}
        //       </Typography>
        //     </Sellername>
        //   </Stack>
        //   <Stack padding="12px 0" spacing={{ xs: 1, lg: 2 }}>
        //     <ChatButton
        //       onClick={(e) => {
        //         if (currentLoggedUserId !== minisiteUserID) {
        //           initiateChat();
        //         } else {
        //           const textToShow =
        //             "You can’t send messages to yourself ! <br> This view simulates how others see your store.";
        //           showAlert({
        //             userID: currentLoggedUserId,
        //             minisiteUserID: minisiteUserID,
        //             textContent: "Text",
        //             iconToShow: false,
        //             styledTextHtml: `<span style="color: #231f20; font-size:18px;font-weight:500;">${
        //               textToShow ?? ""
        //             }</span>`,
        //           });
        //         }
        //       }}
        //     >
        //       <img src="/assets/ChatIcon.svg" alt="icon" /> Chat With Seller
        //     </ChatButton>
        //   </Stack>
        // </SellerOuter>

        <ContactSellerMini>
          <GradientBox
            padding="16px 0"
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={{ xs: 1, lg: 1.3 }}
          >
            <Sellername>
              {headerLoading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={100}
                  height={100}
                />
              ) : (
                <Avatar
                  sx={{ width: 44, height: 44 }}
                  alt="Remy Sharp"
                  src={contactChatData?.image}
                />
              )}
            </Sellername>
            <Sellername>
              <Typography sx={{ textTransform: "capitalize" }}>
                {contactChatData?.name}
              </Typography>
              <Typography component="span" sx={{ textTransform: "capitalize" }}>
                {contactChatData?.designation}
              </Typography>
            </Sellername>
          </GradientBox>

          {/* <Box sx={{ padding: '20px' }}>
            {chats.map((chat, index) => (
              <ChatContainer key={index}>
                <BImageBox>
                  {headerLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Avatar
                      sx={{ width: 44, height: 44 }}
                      alt="Remy Sharp"
                      src={contactChatData?.image}
                    />
                  )}
                </BImageBox>
                <Box sx={{ width:"100%"}}>
                  <MessageBubble>
                    <Typography>{chat.message}</Typography>
                  </MessageBubble>
                  <Timestamp>{chat.time}</Timestamp>
                </Box>
              </ChatContainer>
            ))}
            <Stack padding="12px 0" spacing={{ xs: 1, lg: 2 }}>
              <ChatButton
                onClick={(e) => {
                  if (currentLoggedUserId !== minisiteUserID) {
                    initiateChat();
                  } else {
                    const textToShow =
                      "You can’t send messages to yourself ! <br> This view simulates how others see your store.";
                    showAlert({
                      userID: currentLoggedUserId,
                      minisiteUserID: minisiteUserID,
                      textContent: "Text",
                      iconToShow: false,
                      styledTextHtml: `<span style="color: #231f20; font-size:18px;font-weight:500;">${textToShow ?? ""
                        }</span>`,
                    });
                  }
                }}
              >
                <img src="/assets/ChatIcon.svg" alt="icon" /> Chat With Seller
              </ChatButton>
            </Stack>
          </Box> */}



        </ContactSellerMini>
      }
    </>
  );
}
