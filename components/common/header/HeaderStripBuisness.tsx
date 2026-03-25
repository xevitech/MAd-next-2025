import { Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { TypeListing } from "@/components/profile/companyProfile/businessType/styles";
import { LightTooltip } from "../Tooltip/tooltip";
const HeaderStripBuisness = () => {
  const [popUpdata, setPopUpdata] = React.useState<any[]>([]);
  const { headerData } = useSelector((state: any) => state.miniSite);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: any, item: any) => {
    setPopUpdata(item);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopUpdata([]);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <TypeListing>
      {headerData?.business_type?.map((item, i) => {
        // if (item.toggle == 0) {
          return (
            <>
              <Typography style={{ fontSize: 13,  color:`${item?.toggle == 0 ? '' : 'rgb(215, 40, 47)'}` }}>
                {item.name}
                <LightTooltip
                 sx={{color:`${item?.toggle == 0 ? '' : 'rgb(215, 40, 47)'}`}}
                  placement="top"
                  arrow
                  title={
                    popUpdata.length > 0 &&
                    popUpdata?.map((v, i) => (
                      <Typography
                        sx={{
                          p: 0.5,
                          fontSize: "13px",
                          "&::before": {
                            content: '""',
                            width: "5px",
                            height: "5px",
                            backgroundColor: "black",
                            margin: "0 -10px 0",
                            borderRadius: "50%",
                            display: "inline-block",
                            position: "relative",
                            top: "-3px",
                            marginRight: "4px", // Adjust this value as needed
                          },
                        }}
                        key={i}
                        fontSize={"14px"}
                      >
                        {v}
                      </Typography>
                    ))
                  }
                >
                  {item.tooltip && item?.tooltip?.length != 0 && (
                    <InfoOutlinedIcon
                    sx={{color:`${item?.toggle == 1 ? 'red!important' : 'inherit'}`}}
                      aria-owns={
                        open ? "mouse-popover-company-business" : undefined
                      }
                      aria-haspopup="true"
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        handlePopoverOpen(e, item?.tooltip);
                      }}
                      onMouseLeave={handlePopoverClose}
                    />
                  )}
                </LightTooltip>
                {i === headerData?.business_type.length - 1 ? "" : i != 2 && ","}
                &nbsp;&nbsp;
              </Typography>
            </>
          );
        // }
      })}
    </TypeListing>
  );
};

export default HeaderStripBuisness;
