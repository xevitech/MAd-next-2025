import * as React from "react";
import {
  Avatar,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import {
  ActivityColumn,
  ActivityDate,
  ActivityHead,
  ActivityThreeColumn,
  AvatarInfo,
  StatusLabel,
  InnerInfoContainer,
  InnerInfoData,
  StatusContainer,
  PersonDetail,
  ActivityCard,
  MeetingHead,
  OpenCallHead,
  OpenCallStatus,
  PersonDetailTop,
} from "../style";
import Image from "next/image";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import ActivityScheduler from "./ActivityScheduler";
import { useAppDispatch } from "redux/store";
import { getAllListOfTasks } from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import ActivitySkeleton from "../Skeletons/ActivitySkeleton";
import TasksList from "./TasksList";
import MeetingLists from "./MeetingLists";
import CallLists from "./CallLists";


const Activites = (props) => {
  const dispatch = useAppDispatch();

  const { tasksList, saveLoader, activityType } = useSelector((state: any) => state.formList);

  React.useEffect(() => {
    dispatch(getAllListOfTasks())
  }, [dispatch])

  let filterTasks = tasksList?.tasks?.filter((ele) => props.title == 'Open' ? ele.status != 'completed' : ele.status == 'completed')
  let filterMeetings = tasksList?.meetings?.filter((ele) => props.title == 'Open' ? ele.status != 'completed' : ele.status == 'completed')
  let filterCalls = tasksList?.calls?.filter((ele) => props.title == 'Open' ? ele.status != 'call-a-log' : ele.status == 'call-a-log')

 
  return (
    <>
      {
        saveLoader ? <ActivitySkeleton />
          :
          activityType == 0 ?
            (
              <ActivityThreeColumn>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={4}>
                    <ActivityColumn>
                      <ActivityCard>
                        <ActivityHead>
                          <Image
                            src="/assets/images/crm/opentask.svg"
                            alt="Edit"
                            width={30}
                            height={16}
                          />
                          <Typography>
                            {props.title} Task <span>({filterTasks?.length})</span>
                          </Typography>
                        </ActivityHead>
                        <InnerInfoContainer>
                          {
                            filterTasks?.length > 0 ?
                              filterTasks?.map((tasks, indexTask) => (
                                <TasksList key={indexTask} data={tasks} title={props.title} />
                              ))
                              :
                              (
                                <InnerInfoData>
                                  <PersonDetailTop>
                                    <PersonDetail>
                                      No task added yet
                                    </PersonDetail>
                                  </PersonDetailTop>
                                </InnerInfoData>
                              )
                          }

                        </InnerInfoContainer>
                      </ActivityCard>
                    </ActivityColumn>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <ActivityColumn>
                      <ActivityCard>
                        <MeetingHead>
                          <Image
                            src="/assets/images/crm/meeting_icon.svg"
                            alt="Edit"
                            width={30}
                            height={16}
                          />
                          <Typography>
                            {props.title} Meetings <span>({filterMeetings?.length})</span>
                          </Typography>
                        </MeetingHead>
                        <InnerInfoContainer>
                          {
                            filterMeetings?.length > 0 ?
                              filterMeetings.map((meeting, indexMeeting) => (
                                <MeetingLists key={indexMeeting} data={meeting} title={props.title} />
                              ))
                              :
                              (
                                <InnerInfoData>
                                  <PersonDetail>
                                    No meeting added yet
                                  </PersonDetail>
                                </InnerInfoData>
                              )
                          }


                        </InnerInfoContainer>
                      </ActivityCard>
                    </ActivityColumn>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <ActivityColumn>
                      <ActivityCard>
                        <OpenCallHead>
                          <Image
                            src="/assets/images/crm/opencallicon.svg"
                            alt="Edit"
                            width={30}
                            height={16}
                          />
                          <Typography>
                            {props.title} Calls <span>({filterCalls?.length})</span>
                          </Typography>
                        </OpenCallHead>
                        <InnerInfoContainer>
                          {
                            filterCalls?.length > 0 ?
                              filterCalls?.map((calls, indexCalls) => (
                                <CallLists key={indexCalls} data={calls} title={props.title} />
                              ))
                              :
                              (
                                <InnerInfoData>
                                  <PersonDetail>
                                    No call added yet
                                  </PersonDetail>
                                </InnerInfoData>
                              )
                          }

                        </InnerInfoContainer>
                      </ActivityCard>
                    </ActivityColumn>
                  </Grid>
                </Grid>
              </ActivityThreeColumn>
            ) :
            <ActivityScheduler />

      }

    </>
  );
};
export default Activites;
