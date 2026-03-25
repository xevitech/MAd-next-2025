import { Box, Typography,styled } from "@mui/material";

export const MainHeadings = styled(Typography)({
    fontSize: '18px',
    fontWeight: '600',
    color: '#000000'
});
export const MainSubHeadings = styled(Typography)({
    fontSize: '16px',
    fontWeight: '600',
    color: '#000000'
});
export const Headings = styled(Typography)({
    fontSize: '14px',
    fontWeight: '600',
    color: '#494949',
});
export const HeadingText = styled(Typography)({
    fontSize: '14px',
    fontWeight: '400',
    color: '#494949',
    textAlign:'left'
});
export const BorderAndPadding = styled(Box)({
    padding:'8px 0px',
    borderBottom:'1px solid rgba(0, 0, 0, 0.12)'
});