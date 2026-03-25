import { Pagination, Stack } from '@mui/material';
import React, { useState } from 'react'

const CustomPagination = (props) => {
    const { currentPage, totalPages, onPageChange } = props;
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChange = (event, value) => {
        onPageChange(value);
      };
    
      return (
        <Stack spacing={2}>
          <Pagination
            count={totalPages} //total length of the data
            // rowsPerPage={rowsPerPage}
            page={currentPage}
            onChange={handleChange}
            shape="rounded"
          />
        </Stack>
      );
}

export default CustomPagination
