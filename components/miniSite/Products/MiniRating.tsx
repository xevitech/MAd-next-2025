import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { MiniproductInfoCompany } from "../styled";
import { Ratingcontainer, RatingFlex, SellerOuter } from "./Products.styled";
import Rating from '@mui/material/Rating';
import StarRateTwoToneIcon from '@mui/icons-material/StarRateTwoTone';
import React from "react";

export default function MiniRating({ data }: any) {
   
    const [value, setValue] = React.useState<number | null>(2);
    const ratingVal = data?.total
    return (
        <SellerOuter>
            <Box p={{ xs: 2 }}>
                <Ratingcontainer textAlign="center" mb={{ xs: 1, lg: 2.5 }}>
                    <Typography variant="h5">Ratings</Typography>
                    <MiniproductInfoCompany>Managing Director</MiniproductInfoCompany>
                </Ratingcontainer>
            </Box>
            <Divider orientation="horizontal" />
            <RatingFlex direction="row" alignItems="top" divider={<Divider orientation="vertical" flexItem />}>
                <Box flex={1} p={{ xs: 2 }}>
                    <Typography variant="h6">Overall Rating</Typography>
                    <Box mt={{ xs: 1.5 }}>
                        <Typography variant="h3">{ratingVal}</Typography>
                        <Rating
                            size="large"
                            name="read-only"
                            value={ratingVal || 0}
                            icon={<StarRateTwoToneIcon color="warning" fontSize="medium" />}
                            emptyIcon={<StarRateTwoToneIcon  fontSize="medium" />}
                        />

                    </Box>
                </Box>
                <Box flex={1} p={{ xs: 2 }}>
                    <Typography variant="h6">Total Customers</Typography>
                    <Box mt={{ xs: 1.5 }}>
                        <Typography variant="h3">{data?.total || 0}</Typography>
                    </Box>
                </Box>
            </RatingFlex>
        </SellerOuter>
    )
}