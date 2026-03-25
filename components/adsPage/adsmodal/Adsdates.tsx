import { Box, Grid } from '@mui/material'
import React from 'react'
import { DateTime, SelectWhen, Setyourdates } from '../style'
import { CustomDatePicker } from '@/components/common/datePicker'

export default function Adsdates() {
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    return (
        <>
            <Box boxShadow='0px 2px 4px 0px rgba(0, 0, 0, 0.075)' marginTop={4} paddingX={2} pb={4}>
                <Setyourdates>Set your Dates</Setyourdates>
                <SelectWhen>Select when you would like your advertising to start and end.</SelectWhen>
                <Box marginTop={4} gap={3} mb={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <DateTime>Start Date</DateTime>
                            <CustomDatePicker
                                name="startDate"
                                label="Start Date"
                                value={startDate}
                                handleChange={({ target }) => setStartDate(target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <DateTime>End Date</DateTime>
                            <CustomDatePicker
                                name="endDate"
                                label="End Date"
                                value={endDate}
                                handleChange={({ target }) => setEndDate(target.value)}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
