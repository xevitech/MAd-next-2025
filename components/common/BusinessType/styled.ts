import { styled, Box } from "@mui/material";

export const ChipContainer = styled(Box)({
    "@media (max-width: 600px)": {
        whiteSpace:'nowrap',
        display:'flex',
        overflowX:'auto',
        overflowY:'hidden', 
        maxWidth:'260px', 
    },
    "@media (max-width: 480px)": { 
        maxWidth:'160px', 
    },
});