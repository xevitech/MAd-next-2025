import React, { useEffect, useState } from "react";
import {
  TopHeader,
  ActivityContainer,
  ActivityContainerInn,
  Appfixed,
} from "./styles";
import activitystyle from "./style.module.css";
import ActivitiesNavigation from "./activitiesNavigation";
import { Grid } from "@mui/material";
import NavigationData from "./navigationData";
import useAppContext from "@/hooks/useAppContext";
import Recentactivityskeleton from "./recentActivitySkeleton";
import { ProfileHeader } from "../common/profileheader";
import { AppBar } from "@mui/material";
import { apiClient } from "../common/common";
import { useSelector } from "react-redux";

export const AcitivityPage = () => {
  const [selectItem, setSelectedItem] = useState<any>([]);
  const [showSkeleton, setShowSkeleton] = useState<any>(true);
  const [listItem, setListItem] = useState<any>([]);
  const [activitydata, setActivityData] = useState<any>([]);

  const { breakPoints } = useAppContext();
  const { user_info } = useSelector((state: any) => state.userData);

  // its taking data from api map it and spread each element
  // and adding expanded: true field into it
  // in nested data its spreading it and then again adding expanded:true to nested data also
  const getNavigationList = async () => {
    setShowSkeleton(true);
    const response = await apiClient("activities/list", "get");
    if (response.status) {
      const data = response.data;
      setListItem(
        data.map((element) => ({
          ...element,
          parent: element.parent.map((v) => ({ ...v, expanded: true })),
          expanded: true,
        }))
      );

      setSelectedItem(
        data
          .map((element) => {
            if (element.parent.length > 0) {
              return element.parent.map((v) => v.type);
            } else {
              return element.type;
            }
          })
          .flat()
      );
    }
    setShowSkeleton(false);
  };

  const getActivitiesData = async () => {
    const response = await apiClient(
      `activities/recent?accountType=${user_info?.type}`,
      "get"
    );
    if (response.status) {
      const data = response.data;
      data.map((element) => {
        element.history.forEach((item) => {
          listItem.find((ele) => {
            if (ele.type == item.type) {
              (item.icon = ele.icon), (item.color_code = ele.color_code);
              (item.name = ele.name), (item.expanded = ele.expanded);
            }
          });
          return item;
        });
        return;
      });
      setActivityData(data);
    }
  };

  useEffect(() => {
    getNavigationList();
    getActivitiesData();
  }, []);

  console.log("listItem", listItem);
  console.log("selectItem", selectItem);
  console.log("activitydata", activitydata);
  console.log("setActivityData", setActivityData);
  return (
    <>
      <div className="full_page recent_activitypage">
        <Appfixed>
          <ActivityContainer
            breakPoints={breakPoints}
            className={activitystyle.main_container}
          >
            <TopHeader variant="h1" className={activitystyle.my_txt}>
              <ProfileHeader text={"Recent Activity"} />
            </TopHeader>

            <ActivityContainerInn
              breakPoints={breakPoints}
              className={activitystyle.activityInn}
            >
              {!showSkeleton && (
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    lg={9}
                    className={activitystyle.activity_content}
                  >
                    {/* Main Display ie All the log tree of activities from login to product addition edit delete */}
                    <ActivitiesNavigation
                      listItem={listItem}
                      selectItem={selectItem}
                      activitydata={activitydata}
                      setActivityData={setActivityData}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={3}
                    className={activitystyle.activity_sec}
                  >
                    <AppBar
                      position="sticky"
                      style={{ background: "transparent", boxShadow: "none" }}
                    >
                      {/* Right side of page ie Activities Navigation */}
                      <NavigationData
                        listItem={listItem}
                        selectItem={selectItem}
                        setListItem={setListItem}
                        setSelectedItem={setSelectedItem}
                      />
                    </AppBar>
                  </Grid>
                </Grid>
              )}
              {showSkeleton && <Recentactivityskeleton />}
            </ActivityContainerInn>
          </ActivityContainer>
        </Appfixed>
      </div>
    </>
  );
};
