import React from "react";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  MonthView,
  ViewSwitcher,
  Toolbar,
  AppointmentTooltip,
  DateNavigator,
  TodayButton,
  Resources
} from "@devexpress/dx-react-scheduler-material-ui";

import moment from "moment";
import { SchedulerPaperBox } from "./style";
import { useSelector } from "react-redux";
export const WeekScheduler = () => {
  const { tasksList } = useSelector((state: any) => state.formList);
  const dummyData = [];
  tasksList?.tasks?.map((ele: any) => {
    dummyData.push({
      title: ele.subject,
      startDate: moment(ele.created_at).toDate(),
      endDate: moment(ele.created_at).add(1, 'hour').toDate(),
      id: `task-${ele.id}`,
      location: ele.description,
      type: 'task',
      color:'#2f66c5',
    })
  })

  tasksList?.meetings?.map((ele: any) => {
    dummyData.push({
      title: ele.title,
      startDate: moment(ele.from).toDate(),
      endDate: moment(ele.to).toDate(),
      id: `meeting-${ele.id}`,
      location: ele.location,
      type: 'meeting',
      color:'#76af68',
    })
  })

  tasksList?.calls?.map((ele: any) => {
    dummyData.push({
      title: ele.subject,
      startDate: moment(ele.call_start_date_time).toDate(),
      endDate: moment(ele.call_start_date_time).add(1,'hours').toDate(),
      id: `meeting-${ele.id}`,
      location: ele.status,
      type: 'meeting',
      color:'red',
    })
  })


  const resources = [
    {
      fieldName: "id",
      title: "title",
      instances: dummyData
    }
  ];

  return (
    <SchedulerPaperBox>
    <Scheduler data={dummyData} height={545}>
      <ViewState />
      <WeekView startDayHour={9} endDayHour={24} />
      <MonthView />
      <Toolbar />
      <DateNavigator/>
      <TodayButton />
      <ViewSwitcher />
      <Appointments/>
      <Resources data={resources} />
      <AppointmentTooltip showCloseButton />
    </Scheduler>
    </SchedulerPaperBox>
  );
};
