import * as React from "react";
import {
    ActivityFormData,
    ActivityTabInner,
    ActivityTabRight,
    InfoTitle,
} from "../style";
import {
    Divider,
    Grid,
} from "@mui/material";
import { WeekScheduler } from "@/components/common/weekScheduler";

const CalenderView = () => {
    return (
        <ActivityTabRight>
            <ActivityTabInner>
                <InfoTitle>My Schedule</InfoTitle>
                <Divider/>
                <ActivityFormData>
                    <Grid container spacing={0.8}>
                        <Grid item xs={12} md={12}>
                            <WeekScheduler />
                        </Grid>
                    </Grid>
                </ActivityFormData>
            </ActivityTabInner>
        </ActivityTabRight>
    );
};
export default CalenderView;
