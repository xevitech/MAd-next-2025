import React, { useContext, useEffect, useState } from "react";
import { Header } from "@/components/common/header";
import { UserSidebar } from "@/components/common/sidebar";
import "react-toastify/dist/ReactToastify.css";
import { MyAppContext } from "contextApi/appContext";
import { styled } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FullWebPage } from "./innerlayout";
const InnerLayout = (props: any) => {
  const { children, id, breakpoint } = props;
  const [render, setRender] = useState<any>(false);
  const { profileInfos } = useSelector((state: any) => state.userData);
  let checkPermissions = profileInfos?.basicDetails?.accountType;
  const SpinnerContainer = styled("div")({
    position: "fixed",
    width: "100%",
    height: "100vh",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(5px)",
    top: 0,
    bottom: 0,
  });
  const Fablisting = styled(Box)({
    display: "none",
    "@media screen and (max-width: 1200px)": {
      display: "block",
    },
    [`@media screen and (max-width: ${breakpoint}px)`]: {
      display: "block", // This will activate for screens >= 1280px
    },
  });
  const FabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
    background: "#DD484E !Important",
    "&:hover": {
      backgroundColor: "#DD484E !important",
    },
    "@media screen and (max-width: 1200px)": {
      width: "30px",
      height: "30px",
      minHeight: "30px",
      "& .MuiSvgIcon-root": {
        fontSize: "18px",
      },
    },
  };

  const ScreenLoader = useContext(MyAppContext);
  const { asPath, pathname } = useRouter();
  useEffect(() => {
    setRender(true);
  }, []);

  const router = useRouter();
  const { togglenavbar } = useSelector((state: any) => state.header);
  const NavigateHandler = (route: any) => {
    router.push(`${route}`);
  };
  return (
    <FullWebPage
      style={{
        position: "relative",
        margin: "auto",
      }}
    >
      {ScreenLoader?.completeScreenLoader && (
        <SpinnerContainer>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="black"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </SpinnerContainer>
      )}
      <div className={`${togglenavbar ? "active-toggle" : ""}`}>
        {render && <UserSidebar />}
        {render && <Header />}
        {render && (
          <div className="inner-layout-content-container">{children}</div>
        )}
        {(checkPermissions == "seller" || checkPermissions == "subuser") && (
          <Tooltip title="Add Listing">
            {!asPath.includes("crm") && (
              <Fablisting>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  sx={FabStyle}
                  onClick={(e) => NavigateHandler("/products/List?add")}
                >
                  <AddIcon />
                </Fab>
              </Fablisting>
            )}
          </Tooltip>
        )}
      </div>
    </FullWebPage>
  );
};

export default InnerLayout;
