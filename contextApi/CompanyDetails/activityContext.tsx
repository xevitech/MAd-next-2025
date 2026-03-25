import React, { useState, createContext, useEffect } from "react";
export const ActivityContext = createContext<any>(null);

export const ActivityContextProvider=({children}:any)=>{
    const checkBoxActive={selectedActivity: "",
    status: false,}
    const [listItem, setListItem] = useState<any>([]);
    const[select,setSelect]=useState<any>([])
    const [selectItem, setSelectedItem] = useState<any>(checkBoxActive);
    const [activitydata, setActivityData] = useState<any>([]);
    const [showSkeleton,setShowSkeleton]= useState<any>(true);
    const [type,setType]=useState<any>([]);
    const repeatedValues=[];
    return(
        <ActivityContext.Provider value={{
            listItem,
            setListItem,
            selectItem,
            setSelectedItem,
            activitydata,
            setActivityData,
            checkBoxActive,
            select,
            setSelect,
            type,
            setType,
            showSkeleton,
            setShowSkeleton
        }}>
      {children}
        </ActivityContext.Provider>
    )
}