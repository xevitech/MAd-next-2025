import React from "react";
import { NotificationContextProvider } from "@/hooks/notification";
import NotificationPage from "./notificationPage";
import Head from "next/head";

const Notifications = () => {
  return (
    <>
     <Head>
            <title>Notifictions | Merchant AD</title>
        </Head>
    <NotificationContextProvider>
      <NotificationPage />
    </NotificationContextProvider>
    </>
  );
};
export default Notifications;
