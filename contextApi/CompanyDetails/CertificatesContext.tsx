import Auth from "@/auth/Auth";
import { apiClient } from "@/components/common/common";
import { BASE_URL } from "@/utils/staticValues";
import { toast } from "react-toastify";
import React, { useState, createContext, useEffect, useContext } from "react";
import { MyAppContext } from "../appContext";
export const CertificateContext = createContext<any>(null);
export const CertificateContextProvider = ({ children }: any) => {
  const initialTestReportState = {
    type_of_certificate: "",
    name: "",
    reference_no: "",
    issued_by: "",
    start_date: "",
    end_date: "",
    certificate_url: "",
    message: "",
    images: [],
    type: "certificate",
    deleted_images_ids: null,
  };
  const { setCompleteScreenLoader } = useContext(MyAppContext);

  const initialHonorAndAwardsState = {
    id: "",
    awardName: "",
    awardIssueBy: "",
    awardStartDate: "",
    certificate_url: "",
    certificateDesc: "",
    images: [],
    type: "honor",
    deleted_images_ids: null,
  };

  const initialTradeMarkState = {
    associate_category: "",
    source_of_trademark: "Own",
    source: "",
    filling_no: "",
    name: "",
    start_date: "",
    images: [],
    end_date: "",
    message: "",
    certificate_url: "",
    type: "trademark",
    deleted_images_ids: null,
  };
  const initialPatentState = {
    id: "",
    no_of_patent: "",
    name: "",
    type_of_patent: "",
    start_date: "",
    end_date: "",
    certificate_url: "",
    images: [],
    type: "patent",
    deleted_images_ids: null,
  };

  const defaultSearchState = {
    certificateType: "",
    searchString: "",
  };

  const [searchState, setSearchState] = useState<any>(defaultSearchState);
  const [getAllCertificate, setAllCertificate] = useState<any>([]);
  const [editableRow, setEditableRow] = useState({});
  const [edit, setEdit] = useState<boolean>(false);
  const [certificateType, setCertificateType] = useState("");
  const [name, setName] = useState<any>("");
  const [reference, setRefrence] = useState("");
  const [issueBy, setIssueBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<any>([]);
  const [addMore, setAddMore] = useState<boolean>(false);
  const [testReport, setTestReport] = useState<any>(initialTestReportState);
  const [localLoading, setLocalLoading] = useState<any>();
  const [honorAward, setHonorAward] = useState<any>(initialHonorAndAwardsState);
  const [mode, setMode] = useState<any>("");
  const [patentData, setPatentData] = useState<any>(initialPatentState);
  const [tradeMarks, setTradeMarks] = useState<any>(initialTradeMarkState);
  const [editTabsData, setEditTabData] = useState<any>({
    id: "",
    state: false,
    label: "",
  });
  const [loader, setLoader] = useState<any>(false);

  return (
    <CertificateContext.Provider
      value={{
        initialTestReportState,
        initialHonorAndAwardsState,
        initialPatentState,
        initialTradeMarkState,
        addMore,
        mode,
        setMode,
        setAddMore,
        name,
        setName,
        loader,
        setLoader,
        certificateType,
        setCertificateType,
        reference,
        setRefrence,
        issueBy,
        setIssueBy,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        url,
        setUrl,
        message,
        setMessage,
        images,
        setImages,
        editTabsData,
        setEditTabData,
        honorAward,
        setHonorAward,
        // handleSaveAwards,
        patentData,
        setPatentData,
        // handleSavePatents,
        tradeMarks,
        setTradeMarks,
        // handleSaveTradMark,
        // handleEditAwards,
        getAllCertificate,
        setAllCertificate,
        editableRow,
        setEditableRow,
        edit,
        setEdit,
        testReport,
        setTestReport,
        searchState,
        setSearchState,
        localLoading,
        setLocalLoading,
        defaultSearchState,
        setCompleteScreenLoader,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
