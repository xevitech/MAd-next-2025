import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Divider, Skeleton ,styled} from "@mui/material";
import Box from "@mui/material/Box";
// import styled from "@emotion/styled";

export const Flex = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export default function ProductSkeleton() {
  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px',overflowX:'auto' }}>
                <Box sx={{ border: '1px solid rgb(221, 145, 145)', paddingTop: '5px', paddingRight: '5px', paddingLeft: '5px', minWidth: '260px', height: '308px', borderRadius: '6px' }}>
                    <Box>
                        <Skeleton animation='wave' variant='rounded' width={'100%'} height={'30px'} />
                    </Box>
                    <Box sx={{ margin: '8px 0 0 0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton animation='wave' variant='text' width={'50%'} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton animation='wave' variant='text' width={'30%'} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton animation='wave' variant='text' width={'60%'} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton animation='wave' variant='text' width={'80%'} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ overflowX: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
                        <Box sx={{ border: '1px solid #ABAAAA', paddingTop: '5px', paddingRight: '5px', paddingLeft: '5px', minWidth: '260px', height: '308px', borderRadius: '6px' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'30px'} />
                            </Box>
                            <Box sx={{ margin: '8px 0 0 0' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'70%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ border: '1px solid #ABAAAA', paddingTop: '5px', paddingRight: '5px', paddingLeft: '5px', minWidth: '260px', height: '308px', borderRadius: '6px' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'30px'} />
                            </Box>
                            <Box sx={{ margin: '8px 0 0 0' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'70%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ border: '1px solid #ABAAAA', paddingTop: '5px', paddingRight: '5px', paddingLeft: '5px', minWidth: '260px', height: '308px', borderRadius: '6px' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'30px'} />
                            </Box>
                            <Box sx={{ margin: '8px 0 0 0' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'70%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                         <Box sx={{ border: '1px solid #ABAAAA', paddingTop: '5px', paddingRight: '5px', paddingLeft: '5px', minWidth: '260px', height: '308px', borderRadius: '6px' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'30px'} />
                            </Box>
                            <Box sx={{ margin: '8px 0 0 0' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'70%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                      {/*  <Box sx={{ border: '1px solid #ABAAAA', paddingTop: '5px', paddingRight: '5px', paddingLeft: '5px', minWidth: '260px', height: '308px', borderRadius: '6px' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'30px'} />
                            </Box>
                            <Box sx={{ margin: '8px 0 0 0' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'70%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px 0', }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rectangular' height={'12px'} width={'12px'} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'60%'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box> */}
                    </Box>
                </Box>
            </Box>
            {/* <Box sx={{ margin: '12px 0 0 0', border: '1px solid #ABAAAA', }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', padding: '6px' }}>
                    <Skeleton variant='rounded' width={'24px'} animation='wave' />
                    <Skeleton variant='rounded' width={'50px'} animation='wave' />
                    <Skeleton variant='rounded' width={'40px'} animation='wave' />
                    <Skeleton variant='rounded' width={'33px'} animation='wave' />
                    <Skeleton variant='rounded' width={'45px'} animation='wave' />
                </Box>
            </Box> */}
    </>
  );
}
