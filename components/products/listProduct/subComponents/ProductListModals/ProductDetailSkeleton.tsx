import { Box, Divider, Skeleton, Grid, Stack } from "@mui/material";
import React from "react";

export default function DetailSkeleton() {
  return (
    // <Box padding='15px'>
    //     <Box display='flex' justifyContent='space-between'>
    //         <Box>
    //             <Skeleton animation='wave' width={130} height={25}></Skeleton>
    //         </Box>
    //         <Box display='flex' alignItems='center'>
    //             <Box mr={5}>
    //                 <Skeleton animation='wave' width={100} height={20}></Skeleton>
    //                 <Skeleton animation='wave' width={90} ></Skeleton>
    //             </Box>
    //             <Box mr={5}>
    //                 <Skeleton animation='wave' width={100} height={20}></Skeleton>
    //                 <Skeleton animation='wave' width={80} ></Skeleton>
    //             </Box>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={30}></Skeleton>
    //             </Box>
    //         </Box>
    //     </Box>
    //     <Divider />
    //     <Box display='flex' justifyContent='space-between'>
    //         <Box display='flex'>
    //             <Box sx={{}}><Skeleton animation='wave' width={80} height={25}></Skeleton></Box>
    //             <Box sx={{ ml: 5 }}><Skeleton animation='wave' width={80} height={25}></Skeleton></Box>
    //             <Box sx={{ ml: 5 }}><Skeleton animation='wave' width={80} height={25}></Skeleton></Box>
    //             <Box sx={{ ml: 5 }}><Skeleton animation='wave' width={80} height={25}></Skeleton></Box>
    //         </Box>
    //         <Box>
    //             <Skeleton animation='wave' width={100} height={30}></Skeleton>
    //         </Box>
    //     </Box>
    //     <Box mt={3} display='flex'>
    //         <Grid container spacing={3}>
    //             <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
    //                 <Box>
    //                     <Skeleton variant="rectangular" width='100%' height={280} />
    //                 </Box>
    //             </Grid>
    //             <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
    //                 <Box display='flex' justifyContent='space-between' alignItems='center'>
    //                     <Box display='flex'>
    //                         <Box><Skeleton animation='wave' width={100} height={20}></Skeleton></Box>
    //                         <Box ml={2}><Skeleton animation='wave' width={80} height={20}></Skeleton></Box>
    //                     </Box>
    //                     <Box display='flex'>
    //                         <Skeleton animation='wave' width={100} height={25}></Skeleton>
    //                         <Skeleton animation='wave' width={100} sx={{ ml: 2 }}></Skeleton>
    //                     </Box>
    //                 </Box>
    //                 <Box mt={4}>
    //                     <Skeleton animation='wave' width={150} />
    //                 </Box>
    //                 <Box mt={4}>
    //                     <Skeleton animation='wave' width='100%' />
    //                     <Skeleton animation='wave' width='100%' />
    //                     <Skeleton animation='wave' width='100%' />
    //                     <Skeleton animation='wave' width='10%' />
    //                 </Box>
    //                 <Box mt={5}>
    //                     <Grid container spacing={3}>
    //                         <Grid item xs={3}>
    //                             <Box>
    //                                 <Skeleton animation='wave' width='90%' height={20} />
    //                                 <Skeleton animation='wave' width={80} />
    //                             </Box>
    //                         </Grid>
    //                         <Grid item xs={3}>
    //                             <Box>
    //                                 <Skeleton animation='wave' width='90%' height={20} />
    //                                 <Skeleton animation='wave' width={80} />
    //                             </Box>
    //                         </Grid>
    //                         <Grid item xs={3}>
    //                             <Box>
    //                                 <Skeleton animation='wave' width='90%' height={20} />
    //                                 <Skeleton animation='wave' width={80} />
    //                             </Box>
    //                         </Grid>
    //                     </Grid>
    //                 </Box>
    //             </Grid>
    //         </Grid>
    //     </Box>

    //     <Grid container spacing={3} mt={4} paddingLeft='15px'>
    //         <Grid item xs={12}>
    //             <Box>
    //                 <Skeleton animation='wave' width='27%' height={25} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={25} />
    //             </Box>
    //         </Grid>
    //     </Grid>
    //     <Grid container spacing={3} mt={4} paddingLeft='15px'>
    //         <Grid item xs={12}>
    //             <Box>
    //                 <Skeleton animation='wave' width={150} height={25} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //     </Grid>
    //     <Grid container spacing={3} mt={4} paddingLeft='15px'>
    //         <Grid item xs={12}>
    //             <Box>
    //                 <Skeleton animation='wave' width={150} height={25} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
    //             <Box>
    //                 <Skeleton animation='wave' width={100} height={25} />
    //                 <Skeleton animation='wave' width='100%' height={22} />
    //             </Box>
    //         </Grid>
    //     </Grid>
    // </Box>

    <>
      <Box sx={{ padding: "8px 15px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Skeleton variant="text" width="100%" height="" animation="wave" />
          </Box>
          <Box sx={{ width: "20%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Box sx={{ width: "30%" }}>
                <Skeleton
                  variant="text"
                  width="100%"
                  height=""
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height=""
                  animation="wave"
                />
              </Box>
              <Box sx={{ width: "30%" }}>
                <Skeleton
                  variant="text"
                  width="100%"
                  height=""
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height=""
                  animation="wave"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Box sx={{ marginRight: "10px" }}>
            <Skeleton variant="text" width="100px" height="" animation="wave" />
          </Box>
          &gt;
          <Box sx={{ marginX: "10px" }}>
            <Skeleton variant="text" width="100px" height="" animation="wave" />
          </Box>
          &gt;
          <Box sx={{ marginX: "10px" }}>
            <Skeleton variant="text" width="100px" height="" animation="wave" />
          </Box>
          &gt;
          <Box sx={{ marginX: "10px" }}>
            <Skeleton variant="text" width="100px" height="" animation="wave" />
          </Box>
  
        </Box>
        <Divider
          variant="fullWidth"
          orientation="horizontal"
          sx={{ margin: "10px 0" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom:'1px solid #ddd',
            "@media screen and (max-width:900px)":{display:'block'},
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", }}>
            <Box sx={{ padding: "0px 16px" }}>
              <Skeleton variant="text" width="48px" height="" animation="wave" />
            </Box>
            <Box sx={{ padding: "0px 16px" }}>
              <Skeleton variant="text" width="48px" height="" animation="wave" />
            </Box>
            <Box sx={{ padding: "0px 16px" }}>
              <Skeleton variant="text" width="48px" height="" animation="wave" />
            </Box>
          </Box>
          <Box sx={{"@media screen and (max-width:900px)":{display:'flex',justifyContent:'flex-end',margin:'0 0 12px 0'},}}>
            <Skeleton
              variant="rounded"
              width="95.41px"
              height="30px"
              animation="wave"
            />
          </Box>
        </Box>
        <Box sx={{ background: "#F8F8F8", padding: "16px", width: "100%" }}>
          <Box
            sx={{
              padding: "16px",
              backgroundColor: "#fff",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 2px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "start", gap: "16px","@media screen and (max-width:900px)":{flexDirection:'column'}, }}>
              <Box sx={{ width: "18.3333%","@media screen and (max-width:1199px)":{width:'33.3333%'},"@media screen and (max-width:900px)":{width:'100%'}, }}>
                <Box>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="180px"
                    animation="wave"
                  />
                </Box>
              </Box>
              <Box sx={{ width: "81.6667%","@media screen and (max-width:1199px)":{width:'66.6667%'},"@media screen and (max-width:900px)":{width:'100%'}, }}>
                <Stack>
                  <Box sx={{ position: "relative" }}>
                    <Skeleton
                      variant="text"
                      width="40%"
                      height=""
                      animation="wave"
                    />
                    <Box
                      sx={{ position: "absolute", right: "0px", top: "0px" }}
                    >
                      <Skeleton
                        variant="text"
                        width="30px"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Skeleton
                      variant="text"
                      width="36%"
                      height=""
                      animation="wave"
                    />
                  </Box>
                  <Box sx={{ margin: "12px 0 0 0" }}>
                    <Skeleton
                      variant="text"
                      width="100%"
                      height=""
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width="100%"
                      height=""
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width="16%"
                      height=""
                      animation="wave"
                    />
                  </Box>
                  <Box sx={{ margin: "12px 0 0 0" }}>
                    <Skeleton
                      variant="text"
                      width="30%"
                      height=""
                      animation="wave"
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <Skeleton
                      variant="text"
                      width="50px"
                      height=""
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width="150px"
                      height=""
                      animation="wave"
                    />
                    <Skeleton
                      variant="circular"
                      width="12px"
                      height="12px"
                      animation="wave"
                    />
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Box sx={{ margin: "16px 0 0 0" }}>
            <Skeleton variant="text" width="12%" height="" animation="wave" />
          </Box>
          <Box sx={{ margin: "10px 0 0 0" }}>
            <Box sx={{ padding: "20px", background: "rgb(255, 255, 255)" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="40%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="40%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="40%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="40%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ margin: "16px 0 0 0" }}>
            <Skeleton variant="text" width="12%" height="" animation="wave" />
          </Box>
          <Box sx={{ margin: "10px 0 0 0" }}>
            <Box sx={{ padding: "20px", background: "rgb(255, 255, 255)" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="40%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="40%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="40%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="40%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ margin: "16px 0 0 0" }}>
            <Skeleton variant="text" width="12%" height="" animation="wave" />
          </Box>
          <Box sx={{ margin: "10px 0 0 0" }}>
            <Box sx={{ padding: "20px", background: "rgb(255, 255, 255)" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="20%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                        margin: "10px 0 0 0",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        width="21%"
                        height=""
                        animation="wave"
                      />
                      ,
                      <Skeleton
                        variant="text"
                        width="25%"
                        height=""
                        animation="wave"
                      />
                      ,
                      <Skeleton
                        variant="text"
                        width="28%"
                        height=""
                        animation="wave"
                      />
                      ,
                      <Skeleton
                        variant="text"
                        width="10%"
                        height=""
                        animation="wave"
                      />
                      ,
                      <Skeleton
                        variant="text"
                        width="18%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ margin: "15px 0 0 0" }}>
            <Box sx={{ padding: "20px", background: "rgb(255, 255, 255)" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="20%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box sx={{}}>
                      <Skeleton
                        variant="text"
                        width="16%"
                        height=""
                        animation="wave"
                      />
                      <Skeleton
                        variant="text"
                        width="40%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ margin: "15px 0 0 0" }}>
            <Box sx={{ padding: "20px", background: "rgb(255, 255, 255)" }}>
              <Box sx={{ margin: "0px 0 10px 0" }}>
                <Skeleton
                  variant="text"
                  width="12%"
                  height=""
                  animation="wave"
                />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="20%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box sx={{}}>
                      <Skeleton
                        variant="text"
                        width="16%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="20%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box sx={{}}>
                      <Skeleton
                        variant="text"
                        width="16%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ margin: "15px 0 0 0" }}>
            <Box sx={{ padding: "20px", background: "rgb(255, 255, 255)" }}>
              <Box sx={{ margin: "0px 0 10px 0" }}>
                <Skeleton
                  variant="text"
                  width="12%"
                  height=""
                  animation="wave"
                />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="20%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box sx={{}}>
                      <Skeleton
                        variant="text"
                        width="16%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        width="20%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                    <Box sx={{}}>
                      <Skeleton
                        variant="text"
                        width="16%"
                        height=""
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
