import { Box, Divider, Grid, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BoxRightBorder,
  FlexBox,
  GridBoxes,
  TypoRightBorder,
  CustomSwitch,
} from "../Subdomainstyle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import {
  setActivateBanner,
  setBackgroundColor,
  setButtonVisible,
  setCycleNav,
  setIndicators,
  setSwipe,
  setFullHeightHover,
} from "@/hooks/sellerSubaccount";
import { TwitterPicker } from "react-color";
import { stringToBooleadTypecast } from "@/components/Helper";
export const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));
export default function BannerOptionEditBanner(props) {
  const [color, setColor] = useState("#ffffff");
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [activeBanner, setActivateBanner] = useState(false);
  const [swipe, setSwipe] = useState(false);
  const [indicators, setIndicators] = useState(false);
  const [cycleNav, setCycleNav] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [fullHeightHover, setFullHeightHover] = useState(false);
  const { mode, activeItems = [], handleEditChange } = props;

  const {
    activeEditPageData,
    banner_list,
  } = useSelector((state: any) => state.subseller);

  useEffect(() => {
    const {
      swap_banner,
      active_banner,
      full_height_hover,
      indicator_banner,
      nav_button_visible,
      navigation_button,
    } = activeItems.length > 0 ? activeItems[0] : activeItems;

    setActivateBanner(stringToBooleadTypecast(active_banner));
    setSwipe(stringToBooleadTypecast(swap_banner));
    setIndicators(stringToBooleadTypecast(indicator_banner));
    setCycleNav(stringToBooleadTypecast(nav_button_visible));
    setButtonVisible(stringToBooleadTypecast(navigation_button));
    setFullHeightHover(stringToBooleadTypecast(full_height_hover));
  }, [activeItems]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setIsLoading(false);
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (activeEditPageData && activeEditPageData.length > 0) {
      setIsLoading(false);
    }
  }, [activeEditPageData]);

  useEffect(() => {
    if (activeEditPageData[0]?.background_color !== null) {
      setColor(activeEditPageData[0]?.background_color);
    }
  }, [activeEditPageData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box sx={{ border: "1px solid grey", borderRadius: "6px", mt: 5 }}>
        <Typography
          sx={{ backgroundColor: "#F5F5F5", p: 1, borderRadius: "6px" }}
        >
          Customize Background Color
        </Typography>
        <Box p={2}>
          <Grid container spacing={2} pb={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <GridBoxes>
                <FlexBox>
                  <BoxRightBorder>
                    <TypoRightBorder>Background color</TypoRightBorder>
                  </BoxRightBorder>
                  <Box
                    onMouseEnter={() => setShowPicker(true)}
                    onMouseLeave={() => setShowPicker(false)}
                    sx={{
                      position: "relative",
                      "@media screen and (max-width:600px)": {
                        textAlign: "left",
                      },
                    }}
                  >
                    <img
                      src="/assets/images/storesettingbgcoloricon.svg"
                      alt=""
                    />
                    <div
                      style={{
                        display: showPicker ? "block" : "none",
                        position: "absolute",
                        zIndex: 1,
                      }}
                    >
                      <TwitterPicker
                        color={color}
                        onChange={(newColor) => {
                          if (
                            newColor.hex !==
                            activeEditPageData[0]?.background_color
                          ) {
                            setColor(newColor.hex);
                            dispatch(setBackgroundColor(newColor.hex));
                          } else {
                            setColor(activeEditPageData[0]?.background_color);
                            dispatch(
                              setBackgroundColor(
                                activeEditPageData[0]?.background_color
                              )
                            );
                          }
                        }}
                      />
                    </div>
                  </Box>
                </FlexBox>
              </GridBoxes>
            </Grid>
          </Grid>
          <Divider />
        </Box>
        <Typography
          sx={{ backgroundColor: "#F5F5F5", p: 1, borderRadius: "6px" }}
        >
          General Options
        </Typography>

        <Box p={2}>
          <Grid container spacing={2} pb={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <GridBoxes>
                <FlexBox>
                  <BoxRightBorder>
                    <TypoRightBorder>AutoPlay</TypoRightBorder>
                  </BoxRightBorder>
                  <Box>
                    <CustomSwitch>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              checked={activeBanner}
                              value={activeBanner}
                              onChange={(e) => {
                                handleEditChange(
                                  "active_banner",
                                  e.target.checked
                                );
                              }}
                            />
                          }
                          label=" "
                        />
                      </FormGroup>
                    </CustomSwitch>
                  </Box>
                </FlexBox>
              </GridBoxes>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <GridBoxes>
                <FlexBox>
                  <BoxRightBorder>
                    <TypoRightBorder>Swipe</TypoRightBorder>
                  </BoxRightBorder>
                  <Box display={"flex"} alignItems={"center"}>
                    <CustomSwitch>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              checked={swipe}
                              value={swipe}
                              onChange={(e) => {
                                handleEditChange(
                                  "swap_banner",
                                  e.target.checked
                                );
                              }}
                            />
                          }
                          label=""
                        />
                      </FormGroup>
                    </CustomSwitch>
                  </Box>
                </FlexBox>
              </GridBoxes>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <GridBoxes>
                <FlexBox>
                  <BoxRightBorder>
                    <TypoRightBorder>Indicators</TypoRightBorder>
                  </BoxRightBorder>
                  <Box>
                    <CustomSwitch>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              checked={indicators}
                              value={indicators}
                              onChange={(e) => {
                                handleEditChange(
                                  "indicator_banner",
                                  e.target.checked
                                );
                              }}
                            />
                          }
                          label=" "
                        />
                      </FormGroup>
                    </CustomSwitch>
                  </Box>
                </FlexBox>
              </GridBoxes>
            </Grid>
          </Grid>
          <Divider />
        </Box>

        <Typography
          sx={{ backgroundColor: "#F5F5F5", p: 1, borderRadius: "6px" }}
        >
          Navigation (Buttons) Options
        </Typography>

        <Box p={2}>
          <Grid container spacing={2} pb={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <GridBoxes>
                <FlexBox>
                  <BoxRightBorder>
                    <TypoRightBorder>Cycle navigation</TypoRightBorder>
                  </BoxRightBorder>
                  <Box>
                    <CustomSwitch>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              checked={cycleNav}
                              value={cycleNav}
                              onChange={(e) => {
                                console.log(e.target.checked);
                                handleEditChange(
                                  "nav_button_visible",
                                  e.target.checked
                                );
                              }}
                            />
                          }
                          label=" "
                        />
                      </FormGroup>
                    </CustomSwitch>
                  </Box>
                </FlexBox>
              </GridBoxes>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <GridBoxes>
                <FlexBox>
                  <BoxRightBorder>
                    <TypoRightBorder>
                      Nav buttons always visible
                    </TypoRightBorder>
                  </BoxRightBorder>
                  <Box>
                    <CustomSwitch>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              checked={buttonVisible}
                              value={buttonVisible}
                              onChange={(e) => {
                                handleEditChange(
                                  "navigation_button",
                                  e.target.checked
                                );
                              }}
                            />
                          }
                          label=" "
                        />
                      </FormGroup>
                    </CustomSwitch>
                  </Box>
                </FlexBox>
              </GridBoxes>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <GridBoxes>
                <FlexBox>
                  <BoxRightBorder>
                    <TypoRightBorder>Full Height Hover</TypoRightBorder>
                  </BoxRightBorder>
                  <Box>
                    <CustomSwitch>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              checked={fullHeightHover}
                              value={fullHeightHover}
                              onChange={(e) => {
                                handleEditChange(
                                  "full_height_hover",
                                  e.target.checked
                                );
                              }}
                            />
                          }
                          label=" "
                        />
                      </FormGroup>
                    </CustomSwitch>
                  </Box>
                </FlexBox>
              </GridBoxes>
            </Grid>
          </Grid>
          <Divider />
        </Box>
      </Box>
    </>
  );
}
