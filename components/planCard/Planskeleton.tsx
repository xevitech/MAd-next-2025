import { Box, Divider, List, ListItem, Skeleton, styled } from '@mui/material'
import React from 'react'
export const OUterBox = styled(Box)({
  display: "-webkit-box",
  alignItems: "center",
  gap: "16px",
  marginTop: "8px",
  maxWidth: "1160px",
  paddingBottom: "6px",
  zIndex: "1",
  overflow: "auto",
  flexWrap: "nowrap",
  "@media (min-width: 1700px) and (max-width: 1880px)": {
    maxWidth: "1060px",
  },
  "@media (min-width: 1600px) and (max-width: 1700px)": {
    maxWidth: "960px",
  },
  "@media (min-width: 1450px) and (max-width: 1600px)": {
    maxWidth: "727px",
  },
  "@media (min-width: 1280px) and (max-width: 1450px)": {
    maxWidth: "662px",
  },
  "@media (min-width: 1200px) and (max-width: 1280px)": {
    maxWidth: "662px",
  },
  "@media (min-width: 1024px) and (max-width: 1199px)": {
    maxWidth: "662px",
  },
  "@media (min-width: 900px) and (max-width: 1023px)": {
    maxWidth: "562px",
  },
  "@media (min-width: 600px) and (max-width: 899px)": {
    maxWidth: "345px",
  },
})
export const InnerBox = styled(Box)({
  width: "282px", border: "1px solid #f4f4f4", display: "flex", backgroundColor: "#fff", height: "1020px", borderRadius: "10px", zIndex: 1, boxShadow: "0 2px 5px 0 rgba(50, 50, 105, .15), 0 1px 1px 0 rgba(0, 0,0,.05)", flexDirection: "column", position: "relative",
  overflow: "scroll",
})
const skeletonItems = [
  {
    sx: { justifyContent: "center", paddingBottom: "4px" },
    skeletonProps: { animation: 'wave', variant: 'text', width: 30, height: 10 }
  },
  { divider: true },
  {
    sx: { justifyContent: "center", paddingBottom: "4px" },
    skeletonProps: { animation: 'wave', variant: 'text', width: 30, height: 10 }
  },
  { divider: true },
  {
    sx: { justifyContent: "center", paddingBottom: "4px" },
    skeletonProps: { animation: 'wave', variant: 'text', width: 30, height: 10 }
  },
  { divider: true },
  {
    sx: { justifyContent: "center", paddingBottom: "4px" },
    skeletonProps: { animation: 'wave', variant: 'text', width: 30, height: 10 }
  },
  { divider: true }
];

export default function Planskeleton() {
  return (
    <>
      <OUterBox >
        <InnerBox>
          <Box sx={{ margin: "28px 0 0 0", display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'60%'} height={'52px'}></Skeleton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'30%'}></Skeleton>
          </Box>
          <Box sx={{ margin: "22px 0 0 0", padding: "0px 14px" }}>
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", padding: "0px 14px", overflow: 'hidden' }}>
            <List sx={{ width: "100%" }}>
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider /> <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <Box sx={{ margin: "18px 0 0 0", padding: "0px 14px" }}>
                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
              </Box>
            </List>
          </Box>
        </InnerBox>
        <InnerBox>
          <Box sx={{ margin: "28px 0 0 0", display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'60%'} height={'52px'}></Skeleton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'30%'}></Skeleton>
          </Box>
          <Box sx={{ margin: "22px 0 0 0", padding: "0px 14px" }}>
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", padding: "0px 14px", overflow: 'hidden' }}>
            <List sx={{ width: "100%" }}>
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider /> <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <Box sx={{ margin: "18px 0 0 0", padding: "0px 14px" }}>
                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
              </Box>
            </List>
          </Box>
        </InnerBox>
        <InnerBox>
          <Box sx={{ margin: "28px 0 0 0", display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'60%'} height={'52px'}></Skeleton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'30%'}></Skeleton>
          </Box>
          <Box sx={{ margin: "22px 0 0 0", padding: "0px 14px" }}>
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", padding: "0px 14px", overflow: 'hidden' }}>
            <List sx={{ width: "100%" }}>
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider /> <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <Box sx={{ margin: "18px 0 0 0", padding: "0px 14px" }}>
                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
              </Box>
            </List>
          </Box>
        </InnerBox>
        <InnerBox>
          <Box sx={{ margin: "28px 0 0 0", display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'60%'} height={'52px'}></Skeleton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'30%'}></Skeleton>
          </Box>
          <Box sx={{ margin: "22px 0 0 0", padding: "0px 14px" }}>
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", padding: "0px 14px", overflow: 'hidden' }}>
            <List sx={{ width: "100%" }}>
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider /> <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <Box sx={{ margin: "18px 0 0 0", padding: "0px 14px" }}>
                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
              </Box>
            </List>
          </Box>
        </InnerBox>
        <InnerBox>
          <Box sx={{ margin: "28px 0 0 0", display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'60%'} height={'52px'}></Skeleton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'30%'}></Skeleton>
          </Box>
          <Box sx={{ margin: "22px 0 0 0", padding: "0px 14px" }}>
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", padding: "0px 14px", overflow: 'hidden' }}>
            <List sx={{ width: "100%" }}>
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider /> <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <Box sx={{ margin: "18px 0 0 0", padding: "0px 14px" }}>
                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
              </Box>
            </List>
          </Box>
        </InnerBox>
        <InnerBox>
          <Box sx={{ margin: "28px 0 0 0", display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'60%'} height={'52px'}></Skeleton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton animation='wave' variant='text' width={'30%'}></Skeleton>
          </Box>
          <Box sx={{ margin: "22px 0 0 0", padding: "0px 14px" }}>
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", padding: "0px 14px", overflow: 'hidden' }}>
            <List sx={{ width: "100%" }}>
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider /> <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", paddingBottom: "4px" }}>
                <Skeleton animation='wave' variant='text' width={30} />
              </ListItem>
              <Divider />
              <Box sx={{ margin: "18px 0 0 0", padding: "0px 14px" }}>
                <Skeleton animation='wave' variant='rounded' width={'100%'} height={'40px'} />
              </Box>
            </List>
          </Box>
        </InnerBox>
      </OUterBox>
    </>
  )
}