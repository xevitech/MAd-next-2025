
import { Box, Divider, Skeleton, Stack, Grid } from '@mui/material'
import React from 'react'
import { Boxfortext, IConforlines, ListOfSliders, RedText, Texts } from '../Subdomainstyle'



export default function Instruction() {
    return (
        <>
            <Stack>
                <Boxfortext>
                    <IConforlines />
                    <Texts>Manage your Main Page Contents.</Texts>
                </Boxfortext>
                <Boxfortext>
                    <IConforlines />
                    <Texts>
                        Main Page is the most important page. Please give attention to
                        manage main page.
                    </Texts>
                </Boxfortext>
                <Boxfortext>
                    <IConforlines />
                    <Texts>
                        You can create Rolling Banner, Top 5 Products, Social Networks
                        on your Main Page.
                    </Texts>
                </Boxfortext>
                <Boxfortext>
                    <IConforlines />
                    <Texts>
                        Advertise your Product or Company with your Rolling Banner for
                        Main Page.
                    </Texts>
                </Boxfortext>
                <Boxfortext>
                    <IConforlines />
                    <Texts>
                        You can upload up to <Box component={'span'} className='impInfo'> 5 maximum banners</Box> for rolling.
                    </Texts>
                </Boxfortext>
                <Boxfortext>
                    <IConforlines />
                    <Texts>
                        Please be cautious about your uploading image quality.
                    </Texts>
                </Boxfortext>
                <Boxfortext>
                    <IConforlines />
                    <Texts> <Box component={'span'} className='impInfo'> 1920px(w) x 421px(h), only jpg, png</Box> files accepted.</Texts>
                </Boxfortext>
            </Stack>
            {/* <Divider sx={{ mt: 3 }} />
            <RedText>
                * Image(s) will be compressed or extended to fit 990px wide x 200px high to enable your Storefront to run properly.
            </RedText>
         
            <Stack>
                <Boxfortext>
                    <Skeleton variant='text'  animation="wave" width={  10}/>
                    <Skeleton variant='text'  animation="wave" width={  300}/>
                </Boxfortext>
                <Boxfortext>
                <Skeleton variant='text'  animation="wave" width={  10}/>
                <Skeleton variant='text'  animation="wave" width={  350}/>
                </Boxfortext>
                <Boxfortext>
                <Skeleton variant='text'  animation="wave" width={  10}/>
                <Skeleton variant='text'  animation="wave" width={  400}/>
                </Boxfortext>
                <Boxfortext>
                <Skeleton variant='text'  animation="wave" width={  10}/>
                <Skeleton variant='text'  animation="wave" width={  450}/>
                </Boxfortext>
                <Boxfortext>
                <Skeleton variant='text'  animation="wave" width={  10}/>
                <Skeleton variant='text'  animation="wave" width={  250}/>
                </Boxfortext>
                <Boxfortext>
                <Skeleton variant='text'  animation="wave" width={  10}/>
                <Skeleton variant='text'  animation="wave" width={  300}/>
                </Boxfortext>
                <Boxfortext>
                <Skeleton variant='text'  animation="wave" width={  10}/>
                <Skeleton variant='text'  animation="wave" width={  350}/>
                </Boxfortext>
            </Stack>
            <Divider sx={{ mt: 3 }} />
            <RedText>
            <Skeleton variant='text'  animation="wave" width={  550}/>
            </RedText>
           
            <ListOfSliders>
            <Skeleton variant='rounded'  animation="wave" width={ 80} height={30}/>
            <Skeleton variant='rounded'  animation="wave" width={ 100} height={30}/>
            </ListOfSliders>
            <Divider/>
            <Box sx={{border :"1px solid #eaeaea ",borderRadius:"6px",
                padding:"0px 16px 10px 16px",
                margin:"16px 0 0 0 ",
                width: "100%",
            
            
            }}>
                <Grid container spacing={2}>
            
            <Grid item xs={12} sm={12} md={6} lg={4} >
            <Skeleton variant='text'  animation="wave" width={  500} height={400}/>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} >
            <Skeleton variant='text'  animation="wave" width={  500} height={400}/>
              </Grid>
              <Grid  item xs={12} sm={12} md={6} lg={4}>
            <Skeleton variant='text'  animation="wave" width={  500} height={400}/>
              </Grid>
            </Grid>
            </Box> */}
         
     
        </>
    )
}
