import React from "react";
import { makeStyles } from 'tss-react/mui';
import { NotificationContextProvider } from "@/hooks/notification";
import NotificationDataList from "./notificationData";

const useStyles = makeStyles()(() => {
  return {
  heading: {
    width: 124,
    height: 27,
    fontSize: 20,
    fontWeight: 600,
    color: "#000000",
  },
  headertext: {
    display: "flex",
    flexDirection: "row",
    color: "#D7282F",
    fontFamily: "sans-serif",
    marginLeft: "30px",
    fontWeight: "600",
  },
  head: {
    display: "flex",
    flexDirection: "row",
    fontSize: "24px",
    color: "#000000",
    fontFamily: "sans-serif",
    justifyContent: "space-between",
  },
  btn: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    backgroundColor: "#7B7979",
    borderRadius: 50,
    height: 30,
    color: "#FFFFFF",
    textAlign: "center",
    marginLeft: 6,
  },
  image: {
    margin: "auto",
    display: "block",
    maxWidth: 100,
    maxHeight: 100,
  },
  divider: {
    margin: "0px 5px 5px",
    alignItems: "center",
    height: "25px",
  },
  subtitle: {
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "sans-serif",
    height: "19px",
  },
  tabLabel: {
    color: "#D7282F",
    width: "19px",
    height: "22px",
    fontFamily: "sans-serif",
  },
}
});
const NotificationPopUp = () => {
  return (
    <NotificationContextProvider>
      <NotificationDataList />
    </NotificationContextProvider>
  );
};

export default NotificationPopUp;
