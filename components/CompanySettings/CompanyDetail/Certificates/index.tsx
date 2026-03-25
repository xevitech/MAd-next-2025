import React from "react";
import { CertificateContextProvider } from "@/contextApi/CompanyDetails/CertificatesContext";
import AllCertificateData from "./AllCertificateData";

const Certificates = () => {
  const certificateTypes = [
    "All",
    "patent",
    "honor",
    "certificate",
    "trademark",
  ];

  return (
    <CertificateContextProvider>
      <AllCertificateData certificateTypes={certificateTypes} />
    </CertificateContextProvider>
  );
};
export default Certificates;
