import React from "react";
import { styled } from "@mui/material";
import { StatusTabs } from "../styles";

const IconContainer = styled("div")({
  width: "30px",
  height: "30px",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  
  '& .icon-approved':{
    fontSize:'12px', 
  },
  '& .icon-draft':{
    fontSize:'20px', 
  },
  '& .icon-expire-svgrepo-com-1':{
    fontSize:'18px', 
  },
  '& .icon-rejected_icon':{
    fontSize:'20px', 
  },

});
const TextContainer = styled("div")({
  color: "rgba(34, 51, 84, 0.5)",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16px",
});

export const CustomTab = (props) => {
  const {
    active,
    icon,
    text,
    value,
    onClick = () => console.log(text)
  } = props;

  return (
    <StatusTabs className={active ? 'active': ''} onClick={e => { e.stopPropagation(); onClick() }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
          gap: "10px",
        }}
      >
        <IconContainer> 
          <i className={icon}></i>
        </IconContainer>
        <TextContainer style={{ color: active ? '#d7282f' : '', fontWeight: active ? '600' : '', }}>
          {text} {text != 'Trashed' && `(${value})`}
        </TextContainer>
      </div>
    </StatusTabs>
  );
};
