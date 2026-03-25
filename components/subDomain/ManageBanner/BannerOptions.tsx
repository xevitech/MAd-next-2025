import { Box, Divider, Grid, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BoxRightBorder,
  FlexBox,
  GridBoxes,
  TypoRightBorder,
  CustomSwitch,
} from "../Subdomainstyle";
import SavePreviewbuttons from "./SavePreviewbuttons";
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
export default function BannerOptions({ mode }) {
  const [color, setColor] = useState("#ffffff");
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useAppDispatch();
  const {
    cycleNavigation,
    navButtonVisible,
    indicators,
    swipe,
    activateBanner,
    fullHeightHover,
    defaultBanner,
    bannarImagePreview,
  } = useSelector((state: any) => state.subseller);
  // const [activateBanner1, setActivateBanner1] = useState(true);
  // const [Swipe, setSwipe] = useState(true);
  // const [Indicators, setIndicators] = useState(true);
  // const [CycleNavigation, setcycleNavigation] = useState(true);
  // const [navButtons, setNavButtons] = useState(true);
  // const [fullheight, setfullheight] = useState(true);

  // useEffect(() => {
    
  //     if (activateBanner === false) {
  //       dispatch(setActivateBanner(true));
  //     }
  //     if (swipe === false) {
  //       dispatch(setSwipe(true));
  //     }
  //     if (indicators === false) {
  //       dispatch(setIndicators(true));
  //     }
  //     if (cycleNavigation === false) {
  //       dispatch(setCycleNav(true));
  //     }
  //     if (navButtonVisible === false) {
  //       dispatch(setButtonVisible(true));
  //     }
  //     if (fullHeightHover === false) {
  //       dispatch(setFullHeightHover(true));
  //     }
  // }, [bannarImagePreview]);

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
                          setColor(newColor.hex);
                          dispatch(setBackgroundColor(newColor.hex));
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
                      {/* {mode == "create" ? ( */}
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              defaultChecked={activateBanner}
                              value={activateBanner}
                              onChange={(e) => {
                                if (e.target.checked == false) {
                                  dispatch(setActivateBanner(false));
                                } else {
                                  dispatch(setActivateBanner(true));
                                }
                              }}
                            />
                          }
                          label=" "
                        />
                      </FormGroup>
                      {/* ) : (
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <FormControlLabel
                                control={
                                  <Android12Switch
                                    checked={activateBanner1}
                                    onChange={(e) => {
                                      setActivateBanner1(e.target.checked);
                                      dispatch(
                                        setActivateBanner(activateBanner1)
                                      );
                                    }}
                                  />
                                }
                                label=""
                              />
                            }
                            label=""
                          />
                        </FormGroup>
                      )} */}
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
                      {/* {mode == "create" ? ( */}
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              defaultChecked={swipe}
                              value={swipe}
                              onChange={(e) => {
                                if (e.target.checked == false) {
                                  dispatch(setSwipe(false));
                                } else {
                                  dispatch(setSwipe(true));
                                }
                              }}
                            />
                          }
                          label=""
                        />
                      </FormGroup>
                      {/* ) : (
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <FormControlLabel
                                control={
                                  <Android12Switch
                                    checked={Swipe}
                                    onChange={(e) => {
                                      setSwipe(e.target.checked);
                                      dispatch(setSwipe(Swipe));
                                    }}
                                  />
                                }
                                label=""
                              />
                            }
                            label=""
                          />
                        </FormGroup>
                      )} */}
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
                      {/* {mode == "create" ? ( */}
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              defaultChecked={indicators}
                              value={indicators}
                              onChange={(e) => {
                                if (e.target.checked == false) {
                                  dispatch(setIndicators(false));
                                } else {
                                  dispatch(setIndicators(true));
                                }
                              }}
                            />
                          }
                          label=" "
                        />
                      </FormGroup>
                      {/* ) : (
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <FormControlLabel
                                control={
                                  <Android12Switch
                                    checked={indicators}
                                    onChange={(e) => {
                                      setIndicators(e.target.checked);
                                      // dispatch(setIndicators(indicators));
                                    }}
                                  />
                                }
                                label=""
                              />
                            }
                            label=""
                          />
                        </FormGroup>
                      )} */}
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
                      {/* {mode == "create" ? ( */}
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              defaultChecked={cycleNavigation}
                              value={cycleNavigation}
                              onChange={(e) => {
                                if (e.target.checked == false) {
                                  dispatch(setCycleNav(false));
                                } else {
                                  dispatch(setCycleNav(true));
                                }
                              }}
                            />
                          }
                          label=" "
                        />
                      </FormGroup>
                      {/* ) : (
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <FormControlLabel
                                control={
                                  <Android12Switch
                                    checked={cycleNavigation}
                                    onChange={(e) => {
                                      setcycleNavigation(e.target.checked);
                                      dispatch(setCycleNav(cycleNavigation));
                                    }}
                                  />
                                }
                                label=""
                              />
                            }
                            label=""
                          />
                        </FormGroup>
                      )} */}
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
                      {/* {mode == "create" ? ( */}
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              defaultChecked={navButtonVisible}
                              value={navButtonVisible}
                              onChange={(e) => {
                                if (e.target.checked == false) {
                                  dispatch(setButtonVisible(false));
                                } else {
                                  dispatch(setButtonVisible(true));
                                }
                              }}
                            />
                          }
                          label=" "
                        />
                      </FormGroup>
                      {/* ) : (
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <FormControlLabel
                                control={
                                  <Android12Switch
                                    checked={navButtons}
                                    onChange={(e) => {
                                      setNavButtons(e.target.checked);
                                      dispatch(setButtonVisible(navButtons));
                                    }}
                                  />
                                }
                                label=""
                              />
                            }
                            label=""
                          />
                        </FormGroup>
                      )} */}
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
                      {/* {mode == "create" ? ( */}
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Android12Switch
                              defaultChecked={fullHeightHover}
                              value={fullHeightHover}
                              onChange={(e) => {
                                if (e.target.checked == false) {
                                  dispatch(setFullHeightHover(false));
                                } else {
                                  dispatch(setFullHeightHover(true));
                                }
                              }}
                            />
                          }
                          label=" "
                        />
                      </FormGroup>
                      {/* ) : (
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <FormControlLabel
                                control={
                                  <Android12Switch
                                    checked={fullheight}
                                    onChange={(e) => {
                                      setfullheight(e.target.checked);
                                      dispatch(setFullHeightHover(fullheight));
                                    }}
                                  />
                                }
                                label=""
                              />
                            }
                            label=""
                          />
                        </FormGroup>
                      )} */}
                    </CustomSwitch>
                  </Box>
                </FlexBox>
              </GridBoxes>
            </Grid>
          </Grid>
          <Divider />
          {/* <SavePreviewbuttons /> */}
        </Box>
      </Box>
    </>
  );
}
