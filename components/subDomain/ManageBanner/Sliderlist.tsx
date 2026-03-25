import { Box, Grid } from '@mui/material'
import React from 'react'
import { Addslider, Copycontent, Deletecontent, Editcontent, GridouterBox, IconBox, Icondivider, ImageSliderBox, SliderGridBox, SliderHeading, Sliderheaderandadd, SliderinnerBox, Slidername, Slidernameandedit, SliderouterBox } from '../Subdomainstyle'

export default function Sliderlist() {
    return (
        <>
            <SliderouterBox>
                <SliderinnerBox>
                    <Sliderheaderandadd>
                        <SliderHeading>
                            List of Sliders
                        </SliderHeading>
                        <Box>
                            <Addslider>Add Slider</Addslider>
                        </Box>
                    </Sliderheaderandadd>
                    <GridouterBox>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <SliderGridBox>
                                    <ImageSliderBox>
                                        <img src="/assets/images/sliderlist.png" alt="" />
                                    </ImageSliderBox>
                                    <Slidernameandedit>
                                        <Slidername>Main Page Slider</Slidername>
                                        <IconBox>
                                            <Copycontent />
                                            <Icondivider></Icondivider>
                                            <Editcontent />
                                            <Icondivider></Icondivider>
                                            <Deletecontent />
                                        </IconBox>
                                    </Slidernameandedit>
                                </SliderGridBox>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <SliderGridBox>
                                    <ImageSliderBox>
                                        <img src="/assets/images/sliderlist.png" alt="" />
                                    </ImageSliderBox>
                                    <Slidernameandedit>
                                        <Slidername>Main Page Slider</Slidername>
                                        <IconBox>
                                            <Copycontent />
                                            <Icondivider></Icondivider>
                                            <Editcontent />
                                            <Icondivider></Icondivider>
                                            <Deletecontent />
                                        </IconBox>
                                    </Slidernameandedit>
                                </SliderGridBox>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <SliderGridBox>
                                    <ImageSliderBox>
                                        <img src="/assets/images/sliderlist.png" alt="" />
                                    </ImageSliderBox>
                                    <Slidernameandedit>
                                        <Slidername>Main Page Slider</Slidername>
                                        <IconBox>
                                            <Copycontent />
                                            <Icondivider></Icondivider>
                                            <Editcontent />
                                            <Icondivider></Icondivider>
                                            <Deletecontent />
                                        </IconBox>
                                    </Slidernameandedit>
                                </SliderGridBox>
                            </Grid>
                        </Grid>
                    </GridouterBox>
                </SliderinnerBox>
            </SliderouterBox>
        </>
    )
}
