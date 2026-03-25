import CPheader from "./CPheaderComponent";
import { Box, Grid, Skeleton } from "@mui/material";
import Divider from "@mui/material/Divider";
import {
  CompanyProfileOuter,
  CPlableNews,
  CPtext,
  NewsroomGridsubTitle,
  NewsroomGridTitle,
  NewsThumbImg,
  NewsRooms,
  NewsLargeImg,
} from "./CompanyProfile.styled";
import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router from "next/router";
import { apiClient } from "@/components/common/common";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CompanyprofileMNewsroom, NewsRoomRightSide } from "../styled";
import CustomCarousel from "@/components/common/customCarousel";

function NewsRoomSkelton({ key }) {
  return (
    <Stack key={key} direction="row" spacing={{ xs: 2 }}>
      <Box>
        <Skeleton animation="wave" variant="rounded" height={92} width={123} />
      </Box>
      <Box width={"100%"}>
        <Box mb={{ xs: 0.5 }}>
          <Skeleton animation="wave" variant="text" sx={{ width: "100px" }} />
        </Box>
        <Box>
          <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
          <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
          <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
        </Box>
      </Box>
    </Stack>
  );
}
function NewsRoomTiles({ tileInfo, key, onPress, elementRef }) {
  return (
    <NewsRooms ref={elementRef} onClick={onPress} sx={{ cursor: "pointer" }}>
      <Stack key={key} direction="row" spacing={{ xs: 2 }}>
        <NewsThumbImg>
          <img src={tileInfo?.image[0]?.source} alt="tileimage" />
        </NewsThumbImg>
        <Box>
          <Box mb={{ xs: 0.5 }}>
            <CPtext txtColour="#D7282F" wt={700} className="newroomrighttitle">
              {capitalizeFirstLetter(tileInfo?.title)}
            </CPtext>
          </Box>
          <Box>
            <CPlableNews txtColour="#231F20" className="newroomrightdetail">
              {capitalizeFirstLetter(tileInfo?.description)}
            </CPlableNews>
          </Box>
        </Box>
      </Stack>
    </NewsRooms>
  );
}

export default function NewsRoom() {
  const [newsdata, setNewsdata] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [lazyLoad, setLazyLoad] = useState<boolean>(true);
  const [activeData, setActiveData] = useState<any>();
  const refs = useRef<any>([]);
  const [newsheight, setNewsheight] = useState<number>();

  const arr = [1, 1, 1, 1];
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);
  const FetchNewListDetail = async () => {
    setLoading(true);
    let response = await apiClient("front/mini-site/news/list", "post", {
      body: { user_id: minisiteUserID },
    });
    if (response.status == 200) {
      setActiveData(response.data[0]);
      setNewsdata(response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (minisiteUserID) FetchNewListDetail();
  }, [minisiteUserID]);

  useEffect(() => {
    if (!loading) {
      const heights = refs.current?.map((element, i) =>
        i < 3 ? element.offsetHeight + 65 : 0
      );
      const sum = heights.reduce(function (a, b) {
        return a + b;
      }, 0);
      setNewsheight(sum);
    }
  }, [loading]);

  function handleNewsClick(id) {
    setLazyLoad(false);
    const data = newsdata.find((x) => x.id === id);
    setActiveData(data);
  }
  useEffect(() => {
    if (!lazyLoad) setLazyLoad(true);
  }, [lazyLoad]);

  const NavigateHandler = (route) => router.push(route);
  const enabledNewsData = newsdata?.filter((item) => item.status === "enable");
  return (
    <Box id="section1">
      <Box mb={{ xs: 1 }}>
        <CPheader
          // icon="/assets/cpicon7.svg"
          icon="icon-newsroom"
          title="Newsroom"
          controls={false}
        />
      </Box>
      <Box pt={{ xs: 0, sm: 2 }}>
        <Grid mb={{ xs: 1 }} container spacing={{ xs: 1 }}>
          {enabledNewsData?.length === 0 ? (
            <EmptyPage
              logo="/assets/images/newsRm.svg"
              onClickHandler={() =>
                NavigateHandler("/companySettings/companyDetails?tab=newsroom")
              }
              text={"Newsroom"}
              actiontext={userid !== minisiteUserID ? false : true}
            />
          ) : (
            <>
              <Grid
                item
                xs={12}
                sm={12}
                md={7}
                textAlign="center"
                position="relative"
                overflow="hidden"
              >
                <NewsLargeImg>
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={92}
                      width={123}
                    />
                  ) : (
                    lazyLoad && (
                      // <LazyLoadImage
                      //   src={activeData?.image[0]?.source}
                      //   alt={`Image Alt-News-room`}
                      //   className="img-lazy"
                      //   width={400}
                      //   height={400}
                      //   effect="blur"
                      // />
                      <Box sx={{ height: "100%", width: "100%" }}>
                        <CustomCarousel
                          imageData={activeData?.image}
                          altName="News Room"
                        />
                      </Box>
                    )
                  )}
                  <Box
                    position="absolute"
                    bottom="0"
                    zIndex="99"
                    p={{ xs: 2 }}
                    textAlign="left"
                    width="100%"
                    bgcolor="rgb(14, 14, 14, .6)"
                  >
                    <Box mb={{ xs: 1 }}>
                      {loading ? (
                        <Skeleton
                          animation="wave"
                          variant="text"
                          sx={{ fontSize: "2rem" }}
                        />
                      ) : (
                        <NewsroomGridTitle variant="h4">
                          {activeData?.title}
                        </NewsroomGridTitle>
                      )}
                    </Box>
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                      />
                    ) : (
                      <NewsroomGridsubTitle variant="h6">
                        {activeData?.description}
                      </NewsroomGridsubTitle>
                    )}
                  </Box>
                </NewsLargeImg>
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <CompanyprofileMNewsroom>
                  <CompanyProfileOuter
                    className="newsroomsecright"
                    sx={{
                      padding: "0 16px",
                      "@media (max-width: 900px)": {
                        padding: "16px 0",
                      },
                    }}
                    bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
                  >
                    <NewsRoomRightSide>
                      <Stack
                        direction="column"
                        spacing={{ xs: 1.7 }}
                        height={{ xs: newsheight }}
                        divider={<Divider orientation="horizontal" />}
                      >
                        {!loading &&
                          enabledNewsData?.map((item, i) => (
                            <NewsRoomTiles
                              elementRef={(el: any) => (refs.current[i] = el)}
                              onPress={() => handleNewsClick(item.id)}
                              tileInfo={item}
                              key={item.id}
                            />
                          ))}
                        {loading &&
                          arr.map((itm, i) => <NewsRoomSkelton key={i} />)}
                      </Stack>
                    </NewsRoomRightSide>
                  </CompanyProfileOuter>
                </CompanyprofileMNewsroom>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
