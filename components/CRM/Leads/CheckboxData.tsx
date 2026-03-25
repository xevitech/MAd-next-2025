import { Checkbox, FormControlLabel, Grid } from '@mui/material'
import React from 'react'
import { SDCheckboxStyle } from '../commonStyle'
import { CustomInputCheckbox, CustomInputCheckboxRow } from '../style'

const CheckboxData = ({ check, listType }) => {

  return (
    <CustomInputCheckboxRow>
      <Grid container spacing={2}>
        <>
          {
            check?.map(ele => ele.section_id == listType?.id && <Grid item xs={12} sm={6} md={6}><CustomInputCheckbox> <FormControlLabel control={<Checkbox defaultChecked />} label="Email Opt Out"
              sx={SDCheckboxStyle}
            />
            </CustomInputCheckbox>
            </Grid>)}
        </>
      </Grid>
    </CustomInputCheckboxRow>
  )
}

export default CheckboxData