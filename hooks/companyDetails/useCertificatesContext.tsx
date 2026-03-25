import { apiClient } from "@/components/common/common";
import { CertificateContext } from "@/contextApi/CompanyDetails/CertificatesContext";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function useCertificateContext() {
  const {
    testReport,
    honorAward,
    setHonorAward,
    patentData,
    setPatentData,
    tradeMarks,
    setTestReport,
    setTradeMarks,
    initialTestReportState,
    initialPatentState,
    initialTradeMarkState,
    loader,
    defaultSearchState,
    setLocalLoading,
    setLoader,
    setAddMore,
    setAllCertificate,
    setSearchState,
    initialHonorAndAwardsState,
    setCompleteScreenLoader,
  } = useContext(CertificateContext);

  //----------- getList Data-------------------------------//

  const getCertificateList = async (searchParams?: {
    searchString: string;
    certificateType: string;
  }) => {
    let customUrl = "company_profile/certificate/list";
    setLocalLoading(true);
    if (searchParams?.searchString?.length > 0) {
      customUrl = customUrl + `?search=${searchParams?.searchString}`;
    }

    if (
      searchParams?.certificateType?.length > 0 &&
      searchParams?.certificateType !== "all"
    ) {
      customUrl = customUrl + `?search&type=${searchParams?.certificateType}`;
    }
    const response = await apiClient(customUrl, "get");

    setLocalLoading(false);
    if (response.status == 200) {
      setCompleteScreenLoader(false);
      setLocalLoading(false);
      setAllCertificate(response.data);
      setSearchState(defaultSearchState);
    }
  };

  //-----------Save Certificate/TestReport----------------//

  const handleSave = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("type_of_certificate", testReport.type_of_certificate);
    formData.append("reference_no", testReport.reference_no);
    formData.append("name", testReport.name);
    formData.append("issued_by", testReport.issued_by);
    formData.append("start_date", testReport.start_date);
    formData.append("end_date", testReport.end_date);
    formData.append("message", testReport.message);
    formData.append("images[]", testReport.images[0]);
    formData.append("type", testReport.type);
    formData.append("certificate_url", testReport.certificate_url);
    let response = await apiClient(
      "company_profile/certificate/create",
      "POST",
      {
        body: formData,
      },
      true
    );

    if (response.status == 200 || response.status == true) {
      setTestReport(initialTestReportState);
      toast.success("certificate created");
      setLoader(false);
      getCertificateList();
      setAddMore(false);
      return response;
    }
  };

  const handleEditCertificate = async (id: any) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("type_of_certificate", testReport.type_of_certificate);
    formData.append("reference_no", testReport.reference_no);
    formData.append("name", testReport.name);
    formData.append("issued_by", testReport.issued_by);
    formData.append("start_date", testReport.start_date);
    formData.append("end_date", testReport.end_date);
    formData.append("message", testReport.message);
    formData.append("images[]", testReport.images[0]);
    formData.append("type", testReport.type);
    formData.append("id", id);
    formData.append("deleted_images_ids", testReport.deleted_images_ids);
    formData.append("certificate_url", testReport.certificate_url);
    let response = await apiClient(
      "company_profile/certificate/edit",
      "POST",
      {
        body: formData,
      },
      true
    );

    if (response.status == 200 || response.status == true) {
      setTestReport(initialTestReportState);
      toast.success("certificate updated");
      setLoader(false);
      setAddMore(false);
      getCertificateList();
      return response;
    }
  };

  //----------------------Save and Edit Awards and honors--------
  const handleSaveAwards = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("name", honorAward.awardName);
    formData.append("issued_by", honorAward.awardIssueBy);
    formData.append("start_date", honorAward.awardStartDate);
    formData.append("end_date", honorAward.awardEndDate);
    formData.append("message", honorAward.message);
    formData.append("images[]", honorAward.images[0]);
    formData.append("type", honorAward.type);
    formData.append("certificate_url", honorAward.certificate_url);
    formData.append("reference_no", honorAward.certificate_no);
    let response = await apiClient(
      "company_profile/certificate/create",
      "POST",
      {
        body: formData,
      },
      true
    );
    if (response.status == 200 || response.status == true) {
      setHonorAward(initialHonorAndAwardsState);
      setLoader(false);
      getCertificateList();
      setAddMore(false);
      toast.success(" honor and award saved");
      return response;
    }
  };

  const handleEditAwards = async (id: any) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("id", honorAward.id);
    formData.append("name", honorAward.awardName);
    formData.append("issued_by", honorAward.awardIssueBy);
    formData.append("start_date", honorAward.awardStartDate);
    formData.append("end_date", honorAward.awardEndDate);
    formData.append("message", honorAward.message);
    formData.append("images[]", honorAward.images[0]);
    formData.append("type", honorAward.type);
    formData.append("id", id);
    formData.append("deleted_images_ids", honorAward.deleted_images_ids);
    formData.append("certificate_url", honorAward.certificate_url);
    formData.append("reference_no", honorAward.certificate_no);
    let response = await apiClient(
      "company_profile/certificate/edit",
      "POST",
      {
        body: formData,
      },
      true
    );
    if (response.status == 200 || response.status == true) {
      setHonorAward(initialHonorAndAwardsState);
      setLoader(false);
      toast.success(" honor and award updated");
      setAddMore(false);
      getCertificateList();
      return response;
    }
  };
  //------------------------Save PatentData----------
  const handleSavePatents = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("no_of_patent", patentData.no_of_patent);
    formData.append("name", patentData.name);
    formData.append("type_of_patent", patentData.type_of_patent);
    formData.append("start_date", patentData.start_date);
    formData.append("end_date", patentData.end_date);
    formData.append("images[]", patentData.images[0]);
    formData.append("type", patentData.type);
    formData.append("certificate_url", patentData.certificate_url);
    let response = await apiClient(
      "company_profile/certificate/create",
      "POST",
      {
        body: formData,
      },
      true
    );
    if (response.status == 200 || response.status == true) {
      setPatentData(initialPatentState);
      setLoader(false);
      getCertificateList();
      setAddMore(false);
      toast.success("patent saved");
      return response;
    }
  };
  const handleEditPatents = async (id: any) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("no_of_patent", patentData.no_of_patent);
    formData.append("name", patentData.name);
    formData.append("type_of_patent", patentData.AwardStartDate);
    formData.append("start_date", patentData.start_date);
    formData.append("end_date", patentData.end_date);
    formData.append("images[]", patentData.images[0]);
    formData.append("type", patentData.type);
    formData.append("id", id);
    formData.append("deleted_images_ids", patentData.deleted_images_ids);
    formData.append("certificate_url", patentData.certificate_url);
    let response = await apiClient(
      "company_profile/certificate/edit",
      "POST",
      {
        body: formData,
      },
      true
    );
    if (response.status == 200 || response.status == true) {
      setPatentData(initialPatentState);
      setLoader(false);
      toast.success("patent updated");
      getCertificateList();
      setAddMore(false);
      return response;
    }
  };
  //-----------------save tradeMarks----------------
  const handleSaveTradMark = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("associate_category", tradeMarks.associate_category);
    formData.append("source_of_trademark", tradeMarks.source_of_trademark);
    formData.append("source", tradeMarks.source);
    formData.append("filling_no", tradeMarks.filling_no);
    formData.append("start_date", tradeMarks.start_date);
    formData.append("end_date", tradeMarks.end_date);
    formData.append("name", tradeMarks.name);
    formData.append("message", tradeMarks.message);
    formData.append("images[]", tradeMarks.images[0]);
    formData.append("type", tradeMarks.type);
    formData.append("certificate_url", tradeMarks.certificate_url);
    let response = await apiClient(
      "company_profile/certificate/create",
      "POST",
      {
        body: formData,
      },
      true
    );
    if (response.status == 200 || response.status == true) {
      setTradeMarks(initialTradeMarkState);
      setLoader(false);
      toast.success("trademark saved");
      getCertificateList();
      setAddMore(false);
      return response;
    }
  };
  const handleEditTradeMark = async (id: any) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("associate_category", tradeMarks.associate_category);
    formData.append("source_of_trademark", tradeMarks.source_of_trademark);
    formData.append("source", tradeMarks.source);
    formData.append("filling_no", tradeMarks.filling_no);
    formData.append("start_date", tradeMarks.start_date);
    formData.append("end_date", tradeMarks.end_date);
    formData.append("name", tradeMarks.name);
    formData.append("message", tradeMarks.message);
    formData.append("images[]", tradeMarks.images[0]);
    formData.append("type", tradeMarks.type);
    formData.append("id", id);
    formData.append("deleted_images_ids", tradeMarks.deleted_images_ids);
    formData.append("certificate_url", tradeMarks.certificate_url);
    let response = await apiClient(
      "company_profile/certificate/edit",
      "POST",
      {
        body: formData,
      },
      true
    );
    if (response.status == 200 || response.status == true) {
      setTradeMarks(initialTradeMarkState);
      setLoader(false);
      getCertificateList();
      toast.success("trademark saved");
      setAddMore(false);
      return response;
    }
  };

  return {
    ...useContext(CertificateContext),
    handleSaveTradMark,
    handleSavePatents,
    handleEditAwards,
    handleSaveAwards,
    handleSave,
    handleEditTradeMark,
    handleEditCertificate,
    handleEditPatents,
    getCertificateList,
  };
}
