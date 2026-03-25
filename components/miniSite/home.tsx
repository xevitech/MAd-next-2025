import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { Certificate } from "./Certificates";
import { MiniSiteContextProvider } from "@/contextApi/miniContext";
import { useEffect, useState } from "react";
import { useAppDispatch } from "redux/store";
import { setMinisiteID, setuserID } from "@/hooks/miniSite";
import SingleSlider from "./SingleSlider";
import { useSelector } from "react-redux";
const MiniSiteContainer = dynamic(() =>
  import("./styled").then((mod) => mod.MiniSiteContainer)
);

const MiniAbout = dynamic(() => import("./MiniAbout"), { ssr: false });
const Miniproductlisting = dynamic(() => import("./Miniproductlisting"), {
  ssr: false,
});

const Home = () => {
  const dispatch = useAppDispatch();
  const [hideCertificates, setHideCertificates] = useState<boolean>(false);
  const { headerData } = useSelector((state: any) => state.miniSite);
  const { banner_list = [] } = headerData;
  useEffect(() => {
    let id = window.location.search.split("=");
    let userID = localStorage?.userData
      ? JSON.parse(localStorage.userData).id
      : null;

    dispatch(setMinisiteID(id[1]));
    dispatch(setuserID(userID));
  }, [dispatch]);

  return (
    <MiniSiteContextProvider>
      <Box>
        <Box>
          {banner_list?.length > 0 && (
            <SingleSlider settings={banner_list[0]} type="home" />
          )}
        </Box>
        <Box paddingX={{ xs: 1, sm: 2, md: 3.5 }}>
          <MiniSiteContainer className="sectionspacing">
            <Box
              boxShadow={{
                xs: "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
              }}
              borderRadius={{ xs: "6px" }}
              bgcolor="white"
            >
              <Miniproductlisting />
            </Box>
          </MiniSiteContainer>
        </Box>
        <Box paddingX={{ xs: 1, sm: 2, md: 3.5 }} mt={2.5}>
          <MiniSiteContainer>
            {!hideCertificates && (
              <Box
                boxShadow={{
                  xs: "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
                }}
                borderRadius={{ xs: "6px" }}
                bgcolor="white"
                padding="16px 20px 0"
              >
                <Certificate setHideCertificates={setHideCertificates} />
              </Box>
            )}
          </MiniSiteContainer>
        </Box>
        <Box paddingX={{ xs: 1, sm: 2, md: 3.5 }} mt={2.5}>
          <MiniSiteContainer>
            <Box
              boxShadow={{
                xs: "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
              }}
              borderRadius={{ xs: "6px" }}
              bgcolor="white"
            >
              <MiniAbout />
            </Box>
          </MiniSiteContainer>
        </Box>
      </Box>
    </MiniSiteContextProvider>
  );
};

export default Home;
