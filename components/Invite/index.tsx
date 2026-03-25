import { Avatar, Box, Grid, IconButton, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProfileHeader } from "../common/profileheader";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ActionButton,
  AvatarContainer,
  AvatarLabel,
  AvtarText,
  InviteConatainerInner,
  InviteContentBox,
  InviteImageBox,
  InviteImageBoxInner,
  InviteListColumn,
  InviteListSection,
  InviteTextDes,
  InviteTextHeading,
  InviteaFriendContainer,
} from "./style";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { apiClient } from "../common/common";
import Head from "next/head";
import { useSelector } from "react-redux";
function Invite() {
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState<any>("");
  const { role } = useSelector((state: any) => state.userData);
  const getInvites = async () => {
    const response = await apiClient(`profile/invitation-email-list`, "get");
    if (response.status == 200 || response.status == true) {
      setList(response?.data);
    }
  };

  const deleteInvite = async (email, index) => {
    setLoader(index);
    const pendingInvite = list?.filter((ele) => ele != email);
    const response = await apiClient(`profile/updateProfile`, "post", {
      body: { invited_emails: pendingInvite?.join(",") },
    });
    if (response.status == 200 || response.status == true) {
      setList(pendingInvite);
      setLoader("");
    }
  };

  useEffect(() => {
    getInvites();
  }, []);
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  return (
    <>
      <Head>
        <title>Invited List | Merchant AD</title>
      </Head>
      <div className="full_page">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ProfileHeader text={"Invited Friends"} />
          </Grid>
        </Grid>
        <InviteaFriendContainer>
          <InviteConatainerInner>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                <InviteContentBox>
                  <Box>
                    <InviteTextHeading variant="h3" gutterBottom>
                      Invited <span>Friends</span>!!
                    </InviteTextHeading>
                    <InviteTextDes variant="body1" gutterBottom>
                      We provide flange to flange parts and services to Gas
                      turbines and BOP parts, DI pipes and fittings, valves,
                      Generators.
                    </InviteTextDes>
                    <InviteTextDes variant="body1" gutterBottom>
                      {" "}
                      We also provide EPC services to our client projects.
                    </InviteTextDes>
                  </Box>
                </InviteContentBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <InviteImageBox>
                  <InviteImageBoxInner>
                    <img
                      src="/assets/images/invitefriend-img.svg"
                      alt="Invite Friend"
                    />
                  </InviteImageBoxInner>
                </InviteImageBox>
              </Grid>
            </Grid>
          </InviteConatainerInner>
          <InviteListSection>
            <Grid container spacing={1}>
              {list?.length > 0 ? (
                list?.map((invite, index) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <InviteListColumn>
                      <AvatarContainer>
                        <AvatarLabel sx={{ textTransform: "uppercase" }}>
                          <Avatar>{invite?.substring(0, 2)}</Avatar>
                        </AvatarLabel>
                        <AvtarText>
                          <Typography>
                            <Link underline="hover" color="inherit">
                              {invite}
                            </Link>
                          </Typography>
                        </AvtarText>
                      </AvatarContainer>
                      <ActionButton>
                        {loader === index ? (
                          <CircularProgress
                            style={{
                              color: "#D7282F",
                              height: "25px",
                              width: "25px",
                            }}
                          />
                        ) : (
                          <>
                            {(role === "seller" ||
                              (role === "subuser" &&
                                permissions?.invited_users?.view==true 
                                )) && (
                              <IconButton aria-label="delete">
                                <DeleteOutlineOutlinedIcon
                                  onClick={() => {
                                    deleteInvite(invite, index);
                                  }}
                                />
                              </IconButton>
                            )}
                          </>
                        )}
                      </ActionButton>
                    </InviteListColumn>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sm={12} md={12}>
                  <InviteListColumn>No user found!</InviteListColumn>
                </Grid>
              )}
            </Grid>
          </InviteListSection>
        </InviteaFriendContainer>
      </div>
    </>
  );
}

export default Invite;
