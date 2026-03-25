import { Box, Divider, Radio, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function CardsInfo({ logo, index = 0, length = 1 }) {
  return (
    <div>
      <Box sx={{
        position: 'relative',
        display: "flex", alignItems: "center", justifyContent: "space-between", "@media screen and (max-width:480px)": {
          display: 'block'
        }
      }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: '2', justifyContent: "center", "@media screen and (max-width:480px)": {
            display: 'block'
          }
        }}>
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <Radio
              value={index}
              checked={index == 0 ? true : false}
            />
            <Image src={logo} height={70} width={90} alt="visa" /></Box>

          <Box>
            <Typography
              fontFamily={"open sans"}
              fontWeight={"400"}
              fontSize="14px"
            >
              .... .... .... 9347
            </Typography>
            <Typography
              fontFamily={"open sans"}
              fontWeight={"400"}
              fontSize="14px"
            >
              Expiry 10/2024
            </Typography>
          </Box>
        </Box>
        <Box sx={{
          position: "absolute",
          top: '0px',
          right: '8px'
        }}>
          <Typography
            fontFamily={"open sans"}
            fontWeight={"600"}
            fontSize="14px"
            sx={{ color: "#39CA15" }}
          >
            primary
          </Typography>
        </Box>
      </Box>
      {(index != 0 || length != index + 1) && <Divider />}
    </div>
  );
}
