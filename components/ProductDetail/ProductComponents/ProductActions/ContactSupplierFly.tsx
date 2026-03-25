import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, InputLabel, styled, TextField, Typography } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { AreaForCheckbox, BottomSection, ContactFlyoutBorder, ContactFlyoutHeader, ContactFlyoutOuter, ContactSupplierProductType, ContactSupplierProductTypeInn, CPAddAttachmnt, CSFLableValue, CSFLableValueTop, CSFQuantitySection, CSPriceQuoteColumn, CSPriceQuoteInfo, CSPriceTermVlue, EnterQuantityRow, QuantityValue } from "./style";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const ContactSupplierFly = (props) => {
    const handleClose = () => {
        props.handleClose(false)
    };
    return (
        <ContactFlyoutOuter sx={{ width: `${props?.manualWidth && props?.manualWidth}` }}>
            <ContactFlyoutHeader>
                <Typography variant="h5">Contact Supplier</Typography>
                <CancelOutlinedIcon onClick={handleClose} />
            </ContactFlyoutHeader>
            <ContactFlyoutBorder>
                <Box sx={{
                    "@media (max-width:1200px)": {
                        height: "300px",
                        overflowY: "scroll"
                    },
                }}>
                    <ContactSupplierProductType>
                        <Typography>
                            This is <span className="in-stockp">In Stock</span>{" "}
                            product, available for purchase at below listed
                            prices.
                        </Typography>
                        <ContactSupplierProductTypeInn>
                            <CSPriceQuoteColumn>
                                <Grid container>
                                    <Grid item xs="auto" sm="auto" md="auto" sx={{ padding: "0" }}>
                                        <CSPriceQuoteInfo>
                                            <Typography variant="h5">
                                                US$50.00
                                            </Typography>
                                            <Typography variant="body1">
                                                1 - 99 pieces
                                            </Typography>
                                        </CSPriceQuoteInfo>
                                    </Grid>
                                    <Grid item xs="auto" sm="auto" md="auto" sx={{ padding: "0" }}>
                                        <CSPriceQuoteInfo>
                                            <Typography variant="h5">
                                                US$50.00
                                            </Typography>
                                            <Typography variant="body1">
                                                1 - 99 pieces
                                            </Typography>
                                        </CSPriceQuoteInfo>
                                    </Grid>
                                    <Grid item xs="auto" sm="auto" md="auto" sx={{ padding: "0" }}>
                                        <CSPriceQuoteInfo>
                                            <Typography variant="h5">
                                                US$500.00
                                            </Typography>
                                            <Typography variant="body1">
                                                1 - 99 pieces
                                            </Typography>
                                        </CSPriceQuoteInfo>
                                    </Grid>
                                    <Grid item xs="auto" sm="auto" md="auto" sx={{ padding: "0" }}>
                                        <CSPriceQuoteInfo>
                                            <Typography variant="h5">
                                                US$50.00
                                            </Typography>
                                            <Typography variant="body1">
                                                1 - 77 pieces
                                            </Typography>
                                        </CSPriceQuoteInfo>
                                    </Grid>
                                    <Grid item xs="auto" sm="auto" md="auto" sx={{ padding: "0" }}>
                                        <CSPriceQuoteInfo>
                                            <Typography variant="h5">
                                                US$50.00
                                            </Typography>
                                            <Typography variant="body1">
                                                1 - 99 pieces
                                            </Typography>
                                        </CSPriceQuoteInfo>
                                    </Grid>
                                    <Grid item xs={12} sm="auto" md="auto" sx={{ padding: "0" }}>
                                        <CSPriceTermVlue>
                                            <Typography variant="h6">
                                                EX Work
                                                <LightTooltip
                                                    disableInteractive
                                                    arrow
                                                    placement="top"
                                                    title={
                                                        "EX Work"
                                                    }
                                                >
                                                    <InfoOutlinedIcon />
                                                </LightTooltip>
                                            </Typography>
                                        </CSPriceTermVlue>
                                    </Grid>
                                </Grid>
                            </CSPriceQuoteColumn>
                        </ContactSupplierProductTypeInn>
                    </ContactSupplierProductType>
                    <CSFQuantitySection>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CSFLableValue>
                                    <Typography variant="h3">Quantity Selection</Typography>
                                    <Typography variant="body1">
                                        This is <span>By Order</span> product. Please provide your estimated required quantity.
                                    </Typography>
                                </CSFLableValue>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <EnterQuantityRow>
                                            <TextField
                                                label="Enter Quantity"
                                                id="outlined-size-small"
                                                size="small"
                                            />
                                            <QuantityValue>
                                                Tones
                                                <span></span>
                                            </QuantityValue>
                                        </EnterQuantityRow>
                                    </Grid>
                                    <Grid item xs={12} mt={2}>
                                        <TextField fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            id="outlined-multiline-static"
                                            label="Write your requirement"
                                            multiline
                                            rows={2}
                                            placeholder="Please write your requirement here"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <CPAddAttachmnt>
                                            <Button
                                                component="label"
                                                role={undefined}
                                                tabIndex={-1}
                                                startIcon={<i className="icon-attachment"></i>}
                                            >
                                                Add Attachment
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={(event) => console.log(event.target.files)}
                                                    multiple
                                                />
                                            </Button>
                                        </CPAddAttachmnt>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AreaForCheckbox>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox defaultChecked />} label="Recommend matching suppliers if this supplier doesn’t contact me on Message Center within 24 hours." />
                                                <FormControlLabel control={<Checkbox defaultChecked />} label="I agree to share my Business Card to the supplier." />
                                            </FormGroup>
                                        </AreaForCheckbox>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </CSFQuantitySection>
                </Box>
                <Grid item xs={12}>
                    <BottomSection>
                        <Button size="small" variant="contained">Contact Supplier</Button>
                    </BottomSection>
                </Grid>
            </ContactFlyoutBorder>
        </ContactFlyoutOuter>
    );
};
export default ContactSupplierFly;


