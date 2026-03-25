import { Box, Button, styled, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import BrowsingHistory from "./BrowsingHistory";
import ContactSupplierFly from "./ContactSupplierFly";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
const PDpSpeedDialBox = styled(Box)({
    position: "fixed", right: "0", bottom: "45px", zIndex: 1000,
    "& .MuiFab-sizeLarge": {
        background: "#d7281f",
        width: "30px",
        height: "30px",
        minHeight: "30px",
        zIndex: 1,
        "svg": {
            color: "#fff",
            fontSize: "21px",
            margin: "-3px 0px 0px 1px"
        },
        "&:hover": {
            background: "#ddd",
            "& svg": {
                color: "#000"
            }
        }
    },
    "& .MuiSpeedDial-actions": {
        "& .MuiFab-root": {
            width: "35px",
            height: "35px",
            minHeight: "35px",
            "&:hover": {
                background: "#d7282f",

                "& i:before": {
                    color: "#fff",
                }
            },
            "& i:before": {
                color: "#d7282f",
                fontSize: "17px"
            }

        }
    }
});
const DialActionButton = styled(Button)({
    padding: "3px",
    minHeight: "30px",
    background: "transparent",
    color: "#fff",
    boxShadow: "none !important",
    "&:hover": {
        background: "transparent",
    }
});

interface SlidingDivProps {
    open: boolean;
    width: number;
    height: number;
}
const SlidingDiv = styled('div')<SlidingDivProps>(({ theme, open, width, height }) => ({
    position: 'fixed',
    bottom: 0,
    right: open ? 0 : '-100%',
    width: width == 1 ? '530px' : '300px',
    // height: height == 1 ? '70vh' : '70%',
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    transition: 'right 0.5s ease-in-out',
    zIndex: 1000,
    border: "1px solid #D8D8D8",
    "@media screen and (max-width: 900px)": {
        width: width == 1 ? '100%' : '300px',
    }
}));


const ProductActions = () => {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState<any>('')
    const handleOpen = (actionOnClick) => {
        actionOnClick();
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const actions = [
        { icon: <i className="icon-speed-survey"></i>, name: 'Survey' },
        { icon: <i className="icon-speed-chat"></i>, name: 'Chat' },
        { icon: <i className="icon-speed-browse-history"></i>, name: 'Browse History', onClick: () => setTab(2) },
        { icon: <i className="icon-speed-contact-suplier"></i>, name: 'Contact Supplier', onClick: () => setTab(1) },
    ];
    return (
        <div>
            <PDpSpeedDialBox>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    icon={<SpeedDialIcon className="addicon" />}
                    // sx={{
                    //     height: 56,
                    //     transition: 'all 0.3s ease',
                    //     padding: "5px 0",
                    //     border: '1px solid transparent',
                    //     '&:hover': {
                    //         height: 250,
                    //         border: '1px solid #ddd',
                    //         borderRadius: "4px",

                    //     },
                    // }}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={
                                <LightTooltip slotProps={{
                                    popper: {
                                        modifiers: [
                                            {
                                                name: 'offset',
                                                options: {
                                                    offset: [0, -20],
                                                },
                                            },
                                        ],
                                    },
                                }}
                                    title={action.name} placement="left" arrow disableInteractive>
                                    <DialActionButton
                                        variant="contained"
                                        color="primary"
                                    //onClick={() => alert(`${action.name} clicked`)}
                                    >
                                        {action.icon}
                                    </DialActionButton>
                                </LightTooltip>
                            }
                            onClick={() => handleOpen(action.onClick)}
                        />
                    ))}
                </SpeedDial>
            </PDpSpeedDialBox>
            <SlidingDiv open={open} width={tab == 1 ? 1 : 2} height={tab == 1 ? 1 : 2}>
                {tab == 1 && <ContactSupplierFly handleClose={handleClose} />}
                {tab == 2 && <BrowsingHistory handleClose={handleClose} />}
            </SlidingDiv>
        </div>
    );
};
export default ProductActions;


