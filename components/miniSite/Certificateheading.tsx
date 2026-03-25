import { Box, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import { CertificateHeadText, CustomeChip } from "./styled";
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

export function Certificateheading({ prev, next }) {
    return (
        <Stack padding={2.5} direction={{ xs: "row" }} justifyContent="space-between" alignItems="center" borderBottom="1px solid #CCCEDD;">
            <Stack direction={{ xs: "row" }} justifyContent="space-between" alignItems="center">

                <CustomeChip component="span">
                    <Image width={24} height={24} src="/assets/docIcon.svg" alt="icon" />
                </CustomeChip>
                <CertificateHeadText variant="h4" >Power Plant Auxiliaries </CertificateHeadText>


            </Stack>
            <Box>
                <IconButton onClick={() => { prev }} size="medium"><KeyboardArrowLeftOutlinedIcon /></IconButton>
                <IconButton onClick={() => { next }} size="medium"><KeyboardArrowRightOutlinedIcon /></IconButton>
            </Box>
        </Stack>
    )
}