import React from "react";
import { Box, Stack } from '@mui/material';
import { SliderBox } from "./styled";
import Carousel from "react-material-ui-carousel";


const slideImages = [
    {
        url: "https://picsum.photos/899/638.jpg",
        caption: 'Slide 1'
    },
    {
        url: "https://picsum.photos/899/638.jpg",
        caption: 'Slide 2'
    },
    {
        url: "https://picsum.photos/899/638.jpg",
        caption: 'Slide 3'
    },
    {
        url: "https://picsum.photos/899/638.jpg",
        caption: 'Slide 4'
    },
    {
        url: "https://picsum.photos/899/638.jpg",
        caption: 'Slide 5'
    },
    {
        url: "https://picsum.photos/899/638.jpg",
        caption: 'Slide 6'
    },
    {
        url: "https://picsum.photos/899/638.jpg",
        caption: 'Slide 7'
    },


];


const MySlides = ({ slide }) => {
    return (
        <Stack justifyContent="center" height={180} overflow="hidden" alignItems="center">
            <img style={{ width: "100%" }} src={slide} alt="sliderimage" />
        </Stack>
    )
}

export default function Miniproductslider({ slides }) {

    return (
        <SliderBox position="relative">
            <Carousel changeOnFirstRender={true} indicators={false} duration={500} swipe={true} animation="slide" navButtonsProps={{
                style: {
                    backgroundColor: 'black',
                    borderRadius: 6,
                    color: "white"
                }
            }}>
                {slides?.map((image, i) => (
                    <Box textAlign="center" height={200} overflow="hidden" key={i} >
                        <img style={{ width: "100%", }} src={image} alt={image} />
                    </Box>
                ))}
            </Carousel>
        </SliderBox>
    )
} 