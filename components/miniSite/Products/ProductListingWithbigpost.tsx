import { Box, Button, Popover, Typography, Card, TextField, Stack } from "@mui/material"
import React from "react";
import GridbaseProductItem from "./GridbaseProductItem";
import { CssGridBox } from "./Products.styled";

export default function ProductListingWithbigpost({ dataitem }) {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <CssGridBox>
                {dataitem.length === 0 ? <Typography>No Data available</Typography> :
                    dataitem.map((item, i) => <GridbaseProductItem data={item} quoteclick={handleClick} key={i}/>)
                }
            </CssGridBox>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                style={{ marginRight: "10px" }}
                anchorOrigin={{
                    vertical: 'center',  
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Card sx={{ minWidth: 275 }}>
                    <Box p={1.5} style={{ borderBottom: "1px solid rgba(34, 51, 84, .1)" }}>
                        <Typography variant="h6" style={{ fontSize: "21px", fontWeight: 700 }}>Send Inquiry Now</Typography>
                    </Box>
                    <Stack spacing={2.5} p={{ xs: 2.5 }}>
                        <Typography variant="h6" style={{ fontSize: "18px", fontWeight: 700 }}>Biogas Generator Silent Type 200kw 300kVA</Typography>
                        <TextField sx={{
                            '& .MuiFormLabel-root': {
                                top: "-4px"
                            },
                            '& .MuiInputBase-input': {
                                paddingX: 1.5
                            }
                        }} label="Enter email address" size="small" />
                        <TextField sx={{
                            '& .MuiFormLabel-root': {
                                top: "-4px"
                            },
                            '& .MuiInputBase-input': {
                                paddingX: 1.5
                            }
                        }} label="Short description" size="small" multiline maxRows={4} />
                        <Button variant="contained" size="medium" color="primary">Send Inquiry Now</Button>
                    </Stack>
                </Card>
            </Popover>
        </>
    )
}