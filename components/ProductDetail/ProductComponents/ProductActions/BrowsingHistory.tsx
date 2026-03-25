import React, { useEffect, useState } from "react";
import { BItemQuantity, BottomButton, BProductContent, BProductInfo, BProductInfoImage, BProductInfoInner, BProductName, BProductPrice, BrowsingProductList, FlyoutInnerWrapper, FlyoutOuterContainer, RedFillButton, SelectAndClearRow, TopTitleArea } from "./style";
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
const BrowsingHistory = (props) => {
    console.log(props.manualWidth);

    const handleClose = () => {
        props.handleClose(false)
    };
    const [selectedId, setSelectedId] = useState<any>([]);

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setSelectedId((pre) => [...pre, id])
        } else {
            const deselectData = selectedId?.filter(item => item !== id)
            setSelectedId(deselectData)
        }
    };

    return (
        <FlyoutOuterContainer sx={{ width: `${props?.manualWidth && props?.manualWidth}` }}>
            <FlyoutInnerWrapper>
                <TopTitleArea>
                    <Typography variant="h1">Browsing History</Typography>
                    <CancelOutlinedIcon onClick={handleClose} />
                </TopTitleArea>
                <SelectAndClearRow>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Select All" />
                    </FormGroup>
                    <RedFillButton size="small" variant="contained">Clear</RedFillButton>
                </SelectAndClearRow>
                <BrowsingProductList>
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10,]?.map((item, index) => <Grid item xs={12}>
                            <BProductInfo key={index}>
                                <FormControlLabel
                                    control={<Checkbox checked={selectedId?.find(itm => itm == item)} onChange={(e) => handleCheckboxChange(e, item)} />}
                                    label=""
                                />
                                <BProductInfoInner>
                                    <BProductInfoImage>
                                        <img src="https://merchantad.xevitech.com/public/uploads/product/gallery/wind-turbine-motor.jpg" alt="" title="" />
                                    </BProductInfoImage>
                                    <BProductContent>
                                        <BProductName>
                                            Air compressor pump for sale with factory price twin cylinder air compressor pump
                                        </BProductName>
                                        <BProductPrice>
                                            US$22560.00
                                            <BItemQuantity>
                                                / 860 Pices
                                            </BItemQuantity>
                                        </BProductPrice>
                                    </BProductContent>
                                </BProductInfoInner>
                            </BProductInfo>
                        </Grid>)}
                    </Grid>
                </BrowsingProductList>
                <BottomButton>
                    <RedFillButton disabled={selectedId?.length == 0 ? true : false} size="small" variant="contained">Contact Supplier</RedFillButton>
                </BottomButton>
            </FlyoutInnerWrapper>
        </FlyoutOuterContainer>
    );
};
export default BrowsingHistory;


