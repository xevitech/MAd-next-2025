import { Grid } from "@mui/material"
import { forwardRef, useImperativeHandle, useRef } from "react"
import Carousel from "react-material-ui-carousel"

function PowerCozmoCarousel({ data, SlideComponent, perItem }: any, ref) {
    const slider = useRef<any>()
    const perChunk = perItem // items per chunk    
    const sliderItemwidth = 12 / perChunk


    const result = data?.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item) 

        console.log("res", resultArray)

        return resultArray
    }, [])

    useImperativeHandle(ref, () => ({
        handlePrevSlide() {
            console.log('ch', slider);
        },
    }));

    return (
        <Carousel  changeOnFirstRender={true} indicators={false} duration={800} swipe={true} animation="slide" navButtonsProps={{
            style: {
                backgroundColor: 'black',
                borderRadius: 6,
                color: "white"
            }
        }}>
            {
                result?.map((item, i) => <Grid container key={i} spacing={2}>
                    {item?.map((slideData, y) => <Grid item ><SlideComponent quoteclick={null} data={slideData} /></Grid>)}
                </Grid>)
            }
        </Carousel>
    )
}

export default forwardRef(PowerCozmoCarousel)