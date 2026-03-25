import ProductModule from '../../ProductsListing/product.module.css'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Miniproductslider from '../MiniProductSlider';
import { Miniproductheading, MiniproductInfoCompany, MiniproductInfoData, MiniproductInfoHead, MiniproductSubheading, ProductContentContainer, QuaniityText, QuoteButton } from '../styled';





const GridbaseProductItem = ({ data, quoteclick }) => {

    return (
        <Box maxWidth={335} key={data.id} className={ProductModule.product_col} >
            <Box p={2}>
                <Miniproductheading>Gas Turbine</Miniproductheading>
                <MiniproductSubheading>Product Id: <span>24199245</span></MiniproductSubheading>
            </Box>

            <Box  >
                <Miniproductslider slides={data.photos} />
            </Box>
            <Box p={2}>
                <Stack direction={{ xs: "row", sm: "column", md: "row" }} justifyContent={{ xs: "space-between", sm: "flex-start", md: "space-between" }} alignItems={{ xs: "top", sm: "flex-start", md: "top" }}>
                    <ProductContentContainer >
                        <MiniproductInfoHead>Location</MiniproductInfoHead>
                        <MiniproductInfoData><LocationOnOutlinedIcon className={ProductModule.location_icon} /> China</MiniproductInfoData>
                    </ProductContentContainer>
                    <ProductContentContainer >
                        <MiniproductInfoHead>Manufacturer</MiniproductInfoHead>
                        <MiniproductInfoCompany sx={{lineHeight:"25px"}} >General Electric</MiniproductInfoCompany>
                    </ProductContentContainer>
                </Stack>
            </Box>
            <Stack paddingX={2} spacing={{ md: "5px" }} direction="row" justifyContent="space-between" alignItems="start" >
                <Box>
                    <QuaniityText>Minimum Quantity: 155</QuaniityText>
                </Box>
                <Box >
                    <QuoteButton onClick={quoteclick} ><AssignmentOutlinedIcon /> Get Quote</QuoteButton>
                </Box>
            </Stack>

        </Box>


    )
}

export default GridbaseProductItem;