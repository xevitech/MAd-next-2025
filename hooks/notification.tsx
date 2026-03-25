import React, { useState, createContext } from "react";
export const NotificationContext = createContext<any>(null);

export const NotificationContextProvider=({children}:any)=>{
    const [notificationlistItem, setNotificationListItem] = useState<any>([]);
    const [listItem, setListItem] = useState<any>([]);
    const [loadData,setLoadData]=useState<any>(false);
    const [ids,setIds]=useState("");
    const [showSkeleton,setShowSkeleton]=useState<any>(false);
    const [counting,setCounting]=useState<any>({all:0,enquiries:0,orderInvoices:0,product:0});
    const [type, setType] = useState<any>("");
  
    return(
        <>
      
        <NotificationContext.Provider value={{
            notificationlistItem,
            setNotificationListItem,
            counting,
            setCounting,
            type,
            loadData,
            setLoadData,
            setType,
            showSkeleton,
            setShowSkeleton,
            ids,
            setIds,
            listItem,
            setListItem
        }}>
      {children}
        </NotificationContext.Provider>
        </>
    )
}