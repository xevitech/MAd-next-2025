import React, { useEffect, useState } from "react";
import {
  Activitycontainer,
  ActivityHeader,
  Iconcontainer,
  ActivityLabel,
  ActivityContentContainer,
  DotItem,
  ActivityContent,
  ContentLine,
  ActivityDate,
  ActivityIncont,
} from "../styles";
import Image from "next/image";
import EmptyPage from "@/components/common/EmptyPage";
import { Box } from "@mui/material";
import { getTimeFormat } from "@/components/common/common";
import Link from "next/link";

export const ActivityDetails = ({
  listItem,
  selectItem,
  activitydata,
  setActivityData,
}) => {
  const [showData, setShowData] = useState<any>({ type: "", show: false });


  const handleExpand = (type: any) => {
    setShowData((pre) => ({ type: type, show: !pre.show }));
  };

  const getActivityDate = (activityDate: any) => {
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    return new Date(activityDate).toLocaleDateString("en-US", options);
  };

  const NavigateHandler = (id: string) => {
    if (id !== null) {
    }
  };

  useEffect(() => {});

  let vissibleData = activitydata
    .map((v) =>
      v.history.filter((f) => {
        if (selectItem.flat().includes(f.type)) {
          return v;
        }
      })
    )
    .flat();

  return (
    <>
      {vissibleData.length == 0 && (
        <Box mt={16}>
          <EmptyPage
            logo="/assets/Activitylogo/activity.png"
            text="Activities"
            actiontext={false}
          />
        </Box>
      )}
      {vissibleData.length > 0 &&
        activitydata.map((item, index) => {
          return (
            <>
              <div key={index}>
                <ActivityDate>
                  {getActivityDate(item.date)}
                  {item.date === new Date().toJSON().slice(0, 10) && " -Today"}
                </ActivityDate>
                <ActivityIncont>
                  {item?.history.map((ele: any, ind: any) => {
                    if (selectItem.flat().includes(ele.type)) {
                      let colorCode = ele.color_code
                        ? `${ele.color_code}`?.replace("#", "")
                        : null;

                      return (
                        <>
                          <Activitycontainer key={ind}>
                            <ActivityHeader>
                              <Iconcontainer itemColor={`#${colorCode}`}>
                                <Image
                                  height={18}
                                  width={18}
                                  alt="Icon"
                                  src={ele.icons.icon}
                                />{" "}
                              </Iconcontainer>
                              <ActivityLabel
                                value={colorCode ? `#${colorCode}` : "#121212"}
                              >
                                {ele.name}
                              </ActivityLabel>
                            </ActivityHeader>
                            <ActivityContentContainer>
                              <div
                                className="LeftLine"
                              >
                                  { console.log("ele?.changes",ele?.changes) }
                                {ele.changes.map((activities, indx) => {
                                  return (
                                    <div key={indx}>
                                      <ActivityContent className="Mainactivitycontent">
                                        <ContentLine></ContentLine>{" "}
                                        <DotItem
                                          value={
                                            colorCode
                                              ? `#${colorCode}`
                                              : "#BEBEBE"
                                          }
                                        ></DotItem>{" "}
                                        <p
                                          onClick={() =>
                                            NavigateHandler(activities?.item_id)
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                              <Link href={activities.view_activity || " "}  target="_blank">
                                            <p dangerouslySetInnerHTML={{ __html: activities.message }}></p></Link>
                                          <p
                                            style={{
                                              color: "#003f9f",
                                              fontWeight: "600",
                                              marginLeft: "3px",
                                            }}
                                          >
                                            {getTimeFormat(
                                              activities.created_at
                                            )}
                                          </p>
                                        </p>
                                      </ActivityContent>
                                    </div>
                                  );
                                })}
                                {showData.show &&
                                  ele.changes
                                    ?.slice(5)
                                    .map((activities, indx) => {
                                      return (
                                        <div key={indx}>
                                          <ActivityContent  className="Mainactivitycontent">
                                            <ContentLine></ContentLine>{" "}
                                            <DotItem
                                              value={
                                                colorCode
                                                  ? `#${colorCode}`
                                                  : "#BEBEBE"
                                              }
                                            ></DotItem>{" "}
                                            <p
                                              onClick={() =>
                                                NavigateHandler(
                                                  activities?.item_id
                                                )
                                              }
                                              style={{ cursor: "pointer" }}
                                            >
                                          
                                              <p dangerouslySetInnerHTML={{ __html: activities.message }}></p>
                                            </p>
                                            <p
                                              style={{
                                                color: "#003f9f",
                                                fontWeight: "600",
                                                marginLeft: "3px",
                                              }}
                                            >
                                              {getTimeFormat(
                                                activities.created_at
                                              )}
                                            </p>
                                          </ActivityContent>
                                        </div>
                                      );
                                    })}
                                {ele.changes?.length > 5 && (
                                  <ActivityContent
                                    onClick={() => handleExpand(ele.type)}
                                  >
                                    <ContentLine></ContentLine>{" "}
                                    <span
                                      style={{
                                        display: "inline-flex",
                                        justifyContent: "center",
                                        gap: "4px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <Image
                                        height={18}
                                        width={18}
                                        src={"/assets/Frame 359.svg"}
                                        alt="img"
                                      />
                                      <p className="viewLink">
                                        {showData.show
                                          ? "View less"
                                          : "View more"}
                                      </p>
                                    </span>
                                  </ActivityContent>
                                )}
                              </div>
                            </ActivityContentContainer>
                          </Activitycontainer>
                        </>
                      );
                    }
                  })}
                </ActivityIncont>
              </div>
            </>
          );
        })}
    </>
  );
};
