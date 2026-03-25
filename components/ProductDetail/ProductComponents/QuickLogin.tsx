import React, { useEffect, useState } from "react";
import { SupplierContainer } from "./Style";
import QuickSignup from "./QuickLogin/QuickSignup";
import Login from "./QuickLogin/QuickLogin";

function QuickLogin({
  setSendQueryButtonActive = null,
  SubmitQuotation = null,
}) {
  const [toggleSignUp, setToggleSignup] = useState<boolean>(false);
  const [hideLogin, setHideLogin] = useState<boolean>(true);
  let token = localStorage?.Token;
  useEffect(() => {
    if (token) setHideLogin(true);
  }, [token]);
  const HandleClose = () => {
    setHideLogin(true);
    if (setSendQueryButtonActive) setSendQueryButtonActive(false);
  };
  return (
    <>
      {!hideLogin && (
        <SupplierContainer className="New-user">
          {toggleSignUp ? (
            <QuickSignup
              setHideLogin={HandleClose}
              display="block"
              setToggleSignup={setToggleSignup}
            />
          ) : (
            <Login
              setToggleSignup={setToggleSignup}
              setHideLogin={HandleClose}
            />
          )}
        </SupplierContainer>
      )}
    </>
  );
}

export default QuickLogin;
