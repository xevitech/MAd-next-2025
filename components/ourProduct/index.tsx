import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Bgimage, MainBox, Snakebg, Textoverimg1 } from './style'
import { useSelector } from 'react-redux';
import { BoxImagge, FlexBox, GridHeading, GridInnerBox, GridMainBox, GridText, RightArrowBox, Rightarrow, Thirdpageheading, Threefirstheading } from '../guestLayout/landingPage/styles';

export default function index() {
    let list = useSelector((state: any) => state.header)?.pageList ?? [];
    return (
        <>
            <MainBox>
                <Box>
                    <Bgimage>
                        <Box>
                            <Textoverimg1>Our Products</Textoverimg1>
                        </Box>
                    </Bgimage>
                </Box>
                <Snakebg>
                    <GridMainBox sx={{}}>
                        <Grid container spacing={2}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                            >
                                <Box textAlign="center" sx={{ margin: '0px 0px 40px 0px' }}>
                                    <Threefirstheading>
                                        <Typography component="span" sx={{
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "27.14px",
                                            color: "#D7282F",
                                        }}>
                                            {" "}
                                            Merchant AD{" "}
                                        </Typography>
                                        | OUR PRODUCTS
                                    </Threefirstheading>
                                    <Thirdpageheading>
                                        We deliver quality services for EPC Products
                                    </Thirdpageheading>
                                </Box>
                            </Grid>
                            {list?.map((v, i) => (
                                <Grid item xs={12} sm={6} lg={3} xl={3}
                                    sx={{ display: "flex", alignItems: "stretch" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(v.link, "_blank")
                                    }}>
                                    <GridInnerBox>
                                        <FlexBox>
                                            <BoxImagge>
                                                <img src={v.icon} alt="" width={50} height={50} />
                                            </BoxImagge>
                                            <Box>
                                                <GridHeading>
                                                    {v.label}
                                                </GridHeading>
                                                <GridText>
                                                    {v?.description.length > 80 ? v?.description.substring(0, 80) + '...' : v?.description}
                                                </GridText>
                                            </Box>
                                        </FlexBox>
                                        <RightArrowBox>
                                            <a href={v.link} className="cta" target="blank">
                                                <span>Click here <Rightarrow /></span>
                                            </a>
                                        </RightArrowBox>
                                    </GridInnerBox>
                                </Grid>))}
                        </Grid>
                    </GridMainBox>
                </Snakebg>
            </MainBox>
        </>
    )
}

