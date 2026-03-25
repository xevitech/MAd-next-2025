import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { WelcomeMenuBox, WelcomeSectionInner, WlecomeTxt, WlecomeTxtHello } from './style'
import { useRouter } from 'next/router';
import Auth from '@/auth/Auth';
import { useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function WelcomePopupData(props) {
  const { menuData, setUserBasicInfo, setAnchorMenuMessage } = props;
  const dispatch = useDispatch()
  const router = useRouter();
  const NavigateHandler = (route) => router.push(route);

  return (
    <div>
      <WelcomeSectionInner onMouseLeave={() => {
        setAnchorMenuMessage(null)
      }} >
        {menuData?.name && <><Box>
          <WlecomeTxtHello>
            <span>Hi, {menuData?.name && menuData?.name || "Loading..."}</span>
          </WlecomeTxtHello>
        </Box>
          <Divider /></>}
        <WelcomeMenuBox>
          {menuData?.name && <>
            {/* <WlecomeTxt 
              onClick={() => {
                router.push("/chat");
              }}>  <Typography><i className="icon-messages-img">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
              <span className="path4"></span>
            </i>Messages fddsf </Typography></WlecomeTxt> */}
            <WlecomeTxt  onClick={(e) => NavigateHandler("/wishlist")}> <Typography><FavoriteBorderIcon sx={{margin:"0 0 0 -2px" }}  />Wishlist</Typography></WlecomeTxt>
            <WlecomeTxt onClick={() => NavigateHandler("/profile/")}>  <Typography><i className="icon-account-icon"></i>Account</Typography></WlecomeTxt>
            <WlecomeTxt onClick={() => NavigateHandler("/preferences")}><Typography> <i className="icon-setting"></i>Settings</Typography></WlecomeTxt>
            <Divider /></>}
          {menuData.name ? (<WlecomeTxt onClick={(e) => {
            Auth.logout();
            dispatch(setUserBasicInfo({}));
            window.location.href = "/user/signin";
          }} className="signOut-option"> <Typography><i className="icon-logout"></i>Sign Out</Typography></WlecomeTxt>) : (<WlecomeTxt onClick={(e) => {
            window.location.href = "/user/signin";
          }} className="signOut-option"> <Typography><i className="icon-logout"></i>Sign In</Typography></WlecomeTxt>)}
        </WelcomeMenuBox>
      </WelcomeSectionInner>
    </div>
  )
}

export default WelcomePopupData