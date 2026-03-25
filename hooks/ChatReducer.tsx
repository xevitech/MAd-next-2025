import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  message: "",
  typing: {},
  roomId: "",
  activeUser: {},
  usersList: [],
  popup: false,
  userProfile: {},
  sharedFileData: { fileType: "", fileData: "", fileName: "" },
  messageRecievedNotification: false,
  userTabs: {
    showAllUsers: true,
    showUnreadUsers: false,
    showArchiveUsers: false,
    showBlockedUsers: false,
    showNewRequestUsers: false,
    showChats: true,
    showCalls: false,
    showGroups: false,
  },
  additionalSuggestions: {
    isOpen: false,
    componentType: null,
  },
  roomParticipants: null,
  ratingStatus: false,
  chatRequest: [],
  showGroupInformation: true,
};

export const ChatReducer = createSlice({
  name: "chatDetail",
  initialState,
  reducers: {
    UpdateChat: (state, action) => {
      const { payload } = action;
      return { ...state, chats: [...state.chats, ...payload] };
    },
    replaceChat: (state, action) => {
      const { payload } = action;
      return { ...state, chats: payload };
    },
    translateMessage: (state, action) => {
      const { chatId, message, isMessageIsInEnglish, textToTranslate } =
        action.payload;
      const updatedChats = JSON.parse(JSON.stringify(state.chats));
      const messageIndex = updatedChats?.findIndex(
        (chat) => chat?.id === chatId
      );
      if (messageIndex !== -1) {
        if (!updatedChats[messageIndex].isTranslated) {
          updatedChats[messageIndex].message = message;
          updatedChats[messageIndex].originalMessage = textToTranslate;
          updatedChats[messageIndex].isTranslated = true;
        } else {
          updatedChats[messageIndex].message =
            updatedChats[messageIndex].originalMessage;
          updatedChats[messageIndex].isTranslated = false;
        }
      }
      state.chats = updatedChats;
    },
    setMessage: (state, action) => {
      const { payload } = action;
      return { ...state, message: payload };
    },
    setTyping: (state, action) => {
      const { payload } = action;
      return { ...state, typing: payload };
    },
    setRoomId: (state, action) => {
      const { payload } = action;
      return { ...state, roomId: payload };
    },
    setActiveUser: (state, action) => {
      const { payload } = action;
      return { ...state, activeUser: payload };
    },
    setUsersList: (state, action) => {
      const { payload } = action;
      return { ...state, usersList: payload };
    },
    chatWindowPopup: (state, action) => {
      const { payload } = action;
      return { ...state, popup: payload };
    },
    setUserProfile: (state, action) => {
      const { payload } = action;
      return { ...state, userProfile: payload };
    },
    setFileSharedData: (state, action) => {
      const { payload } = action;
      return { ...state, sharedFileData: payload };
    },
    setNotification: (state, action) => {
      const { payload } = action;
      return { ...state, messageRecievedNotification: payload };
    },
    setUserTabs: (state, action) => {
      const { payload } = action;
      return { ...state, userTabs: payload };
    },
    setAdditionalSuggestions: (state, action) => {
      const { payload } = action;
      return { ...state, additionalSuggestions: payload };
    },
    setRoomParticipants: (state, action) => {
      const { payload } = action;
      return { ...state, roomParticipants: payload };
    },
    setRatingStatus: (state, action) => {
      const { payload } = action;
      return { ...state, ratingStatus: payload };
    },
    setChatRequestList: (state, action) => {
      const { payload } = action;
      return { ...state, chatRequest: payload };
    },
    setShowGroupInformationSection: (state, action) => {
      const { payload } = action;
      return { ...state, showGroupInformation: payload };
    },
  },
});

export const {
  UpdateChat,
  setMessage,
  setTyping,
  setRoomId,
  translateMessage,
  replaceChat,
  setActiveUser,
  setUsersList,
  chatWindowPopup,
  setUserProfile,
  setFileSharedData,
  setNotification,
  setUserTabs,
  setAdditionalSuggestions,
  setRoomParticipants,
  setRatingStatus,
  setChatRequestList,
  setShowGroupInformationSection,
} = ChatReducer.actions;

export default ChatReducer;
