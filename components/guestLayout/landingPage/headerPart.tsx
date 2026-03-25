import React from "react";
import { Bar, MainHeader, Text, Textlink, NavigationBar } from "./styles";
import { Box, Toolbar } from "@mui/material";
const HeaderPage = () => {
  return (
    <MainHeader sx={{ flexGrow: 1 }}>
      <Bar position="static">
        <Toolbar>
          <Box>
            <img src="/assets/Logo.svg" alt="" />
          </Box>
          <NavigationBar>
            <Text>
              <Textlink className="active">Homesss </Textlink>
            </Text>
            <Text>
              <Textlink>About Us </Textlink>
            </Text>
            <Text>
              <Textlink href="/ductilepipePage/ductilePipe">
                Our Products{" "}
              </Textlink>
            </Text>
            <Text>
              <Textlink>Contact Us </Textlink>
            </Text>
          </NavigationBar>
        </Toolbar>
      </Bar>
    </MainHeader>
  );
};
export default HeaderPage;
