import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RetargatingHomePage from "./retargatingHomePage";
import { useStyles } from "./styles";
const Homepage = dynamic(() => import("./homepage"), {
  ssr: false,
});
const HeaderPage = dynamic(
  () => import("components/common/include/headerPart"),
  {
    ssr: false,
  }
);
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);

export default function LandingPage() {
  const { classes } = useStyles();
  const router = useRouter();
  let list = useSelector((state: any) => state.header)?.pageList ?? [];
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  const NavigateHandler = (path) =>
    window.open(`/page/${path}`, "_blank", "noreferrer");

  useEffect(() => {
    document.body.classList.add("cms-body");
    return () => {
      document.body.classList.remove("cms-body");
    };
  });
  useEffect(() => {
    // Ensure this runs only on the client side
    const isLandingPage = localStorage.getItem("isLandingPage");
    console.log("isLandingPage", isLandingPage, isLandingPage);
    if (isLandingPage) {
      setIsFirstVisit(true);
    }
  }, [localStorage.getItem("isLandingPage")]);
  return (
    <>
      <HeaderPage />
      {isFirstVisit ? (
        <RetargatingHomePage />
      ) : (
        <>
          <Homepage />
          {""}
        </>
      )}
      <FooterPage />
    </>
  );
}
