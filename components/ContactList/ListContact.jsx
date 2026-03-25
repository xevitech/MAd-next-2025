import React, { useState, useEffect } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import {
  InputBase,
  Stack,
  Typography,
  styled,
  Box,
  Button,
  Tooltip,
  Grid,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ContactListDetail from "./ContactListForm";
import ListStyles from "./List.module.css";
import {
  fetchAllContacts,
  fetchContactDetails,
  setContactId,
} from "@/hooks/UseContactList";
import { LicenseInfo } from "@mui/x-license-pro";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import { DataGridStyle, ContactTabs } from "../common/commonStyle";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

import {
  OuterContainer,
  InnerContainer,
  Card,
  CardHeader,
} from "../SellerTools/styles";
import { returnCountryFromCode } from "@/utils/commonFunctions/other";
import Image from "next/image";
import { ProfileHeader } from "../common/profileheader";
import SkeletonForContactList from "./ContactListSkeleton";
import EmptyPage from "../common/EmptyPage";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { useRouter } from "next/router";
import Head from "next/head";

export const Searchbar = styled("div")(({ theme }) => ({
  border: "1px solid #2233541a",
  paddingLeft: "10px",
  position: "relative",
  marginLeft: "10px !important",
  width: "96%",
  borderRadius: "3px",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  right: "10px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    width: "100%",
  },
}));

export const ListHeader = styled("div")({
  justifyContent: "space-between",
  flex: 1,
  background: "#FFFFFF",
  boxShadow: "0px 4px 20px rgb(170 180 190 / 30%)",
  borderRadius: "6px",
  marginBottom: "20px",
  minHeight: "129px",
  border: "1px solid #DFDFDF",
  padding: "20px",
  "@media screen and (max-width:767px)": {
    padding: "10px",
  },
});

export default function ListContact(props) {
  let List = [1, 2, 3, 4, 5, 6, 7, 8];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);
  const { contacts, loader } = useSelector((state) => state.contact);
  const allContacts = contacts.data;
  const [pageSize, setPageSize] = useState(10);
  const [editstate, editsetState] = useState({ right: true });
  const [editDrawer, setEditDrawer] = useState(false);
  const [emptyfield, setEmptyField] = useState("");
  const [editValues, setEditValue] = useState({});
  const [active, setActive] = useState("one");
  const { role } = useSelector((state) => state.userData);

  const router = useRouter();
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  const toggleDrawer1 = (anchor1, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    editsetState({ ...editstate, [anchor1]: open });
  };

  const list1 = (toggle, type) => (
    <Box role="presentation">
      <ContactListDetail
        toggleDrawer1={toggle}
        userDetails={type}
        editValues={editValues}
      />
    </Box>
  );
  getScrollPosition: () => GridScrollParams;
  const columns = [
    {
      field: "serialNo",
      headerName: "Sr. No.",
      width: 100,
      renderCell: (cellValues) => {
        return <div>{cellValues.value}</div>;
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.profile_link === "" ? (
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "rgb(201,201,201)",
                  textAlign: "center",
                }}
              >
                <PhotoSizeSelectActualOutlinedIcon
                  style={{
                    width: "20px",
                    height: "20px",
                    marginTop: 7,
                  }}
                />
              </div>
            ) : (
              <img
                height={30}
                width={30}
                alt="Profile Link"
                src={params.row.profile_link}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            )}
            &nbsp;&nbsp;
            <Typography
              style={{ fontSize: "14px" }}
              onClick={() => {
                setEditDrawer(true);
                dispatch(setContactId(params.row.id));
                setEditValue(params.row);
              }}
            >
              {params.value?.length > 0
                ? params.value.charAt(0).toUpperCase() + params.value.slice(1)
                : "--"}
            </Typography>
          </>
        );
      },
    },
    {
      field: "company_name",
      headerName: "Company Name",
      width: 280,
      renderCell: (params) => {
        return (
          <>
            <Typography
              style={{ fontSize: "14px" }}
              onClick={() =>
                router.push(
                  `miniSite/CompanyProfile?id=${params.row.follower_id}`
                )
              }
            >
              {params.value?.length > 0
                ? params.value.charAt(0).toUpperCase() + params.value.slice(1)
                : "--"}
            </Typography>
          </>
        );
      },
    },
    {
      field: "job_role",
      headerName: "Department",
      type: "text",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.value?.length > 0
              ? params.value.charAt(0).toUpperCase() + params.value.slice(1)
              : "--"}
          </>
        );
      },
    },
    {
      field: "shop_email",
      headerName: "Email ID",
      type: "email",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "registration_country_id",
      headerName: "Country",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.value?.length > 0
              ? returnCountryFromCode(params.value).charAt(0).toUpperCase() +
                returnCountryFromCode(params.value).slice(1)
              : "--"}
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="outlined"
              style={{
                color: `${
                  params.value == "1"
                    ? "#34A400"
                    : params.value == "0"
                    ? "#FFBF00"
                    : "#F6272F"
                }`,
                border: `${
                  params.value == "1"
                    ? "1px solid #34A400"
                    : params.value == "0"
                    ? "1px solid #FFBF00"
                    : "1px solid #F6272F"
                }`,
              }}
            >
              {params.value == 1
                ? "Accept"
                : params.value == 0
                ? "Pending"
                : "Blocked"}
            </Button>
          </>
        );
      },
    },
    {
      field: "actions",
      blockCheck: "blocked",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Box className={ListStyles.actionbtn}>
              <>
                <Tooltip title="View Profile">
                  <Image
                    height={20}
                    width={20}
                    alt="View"
                    src="/assets/threedot.svg"
                    onClick={() => {
                      setEditDrawer(true);
                      dispatch(setContactId(params.id));
                      setEditValue(params.row);
                    }}
                  />
                </Tooltip>
                <SwipeableDrawer
                  BackdropProps={{ invisible: true }}
                  anchor="right"
                  open={editDrawer}
                  onClose={toggleDrawer1("right", false)}
                  onOpen={toggleDrawer1("right", true)}
                  PaperProps={{
                    sx: {
                      width: 502,
                      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
                      overflowY: "visible",
                      "@media screen and (max-width:600px)": {
                        width: "290px",
                      },
                      "@media screen and (max-width:350px)": {
                        width: "260px",
                      },
                    },
                  }}
                >
                  {list1(setEditDrawer)}
                </SwipeableDrawer>
              </>
              &nbsp;&nbsp;
              {params.row.status !== 2 ? (
                <>
                  {(role === "seller" ||
                    (role === "subuser" &&
                      permissions.my_contacts.block_unblock==true
                     )) && (
                    <Tooltip title="Block User">
                      <Image
                        height={20}
                        width={20}
                        alt="Block User"
                        src="/assets/formicon3.svg"
                        onClick={() => {
                          dispatch(setContactId(params.id));
                          dispatch(fetchContactDetails(params.row.status));
                        }}
                      />
                    </Tooltip>
                  )}
                </>
              ) : (
                <Tooltip title="Add Contact">
                  <Image
                    height={20}
                    width={20}
                    alt="Add user"
                    src="/assets/formicon1.svg"
                    onClick={() => {
                      dispatch(setContactId(params.id));
                      dispatch(fetchContactDetails(params.row.status));
                    }}
                  />
                </Tooltip>
              )}
              &nbsp;&nbsp;
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Head>
        <title>Contact List | Merchant AD</title>
      </Head>
      <div className="full_page">
        <Grid container>
          <Grid item xs={12}>
            <OuterContainer>
              <InnerContainer>
                <ProfileHeader text={"My Contacts"} />

                <ListHeader>
                  <Card>
                    <CardHeader>
                      <div className={ListStyles.contactinfobtn}>
                        <ContactTabs>
                          <Button
                            sx={{
                              "@media screen and (max-width:600px)": {
                                paddingLeft: "16px",
                              },
                            }}
                            size="small"
                            className={
                              ListStyles[
                                active === "one"
                                  ? "specificationbtnone"
                                  : "specificationbtn"
                              ]
                            }
                            onClick={() => {
                              setActive("one");
                              setEmptyField("contacts");
                              dispatch(fetchAllContacts());
                            }}
                          >
                            All Contacts
                            <div className={ListStyles.contactbtn}>
                              {contacts.total}
                            </div>
                          </Button>
                          <Button
                            size="small"
                            className={
                              ListStyles[
                                active === "two"
                                  ? "specificationbtnone"
                                  : "specificationbtn"
                              ]
                            }
                            onClick={() => {
                              setActive("two");
                              setEmptyField(" my contacts");
                              dispatch(fetchAllContacts(1));
                            }}
                            sx={{ px: 2 }}
                          >
                            My Contacts
                            <div className={ListStyles.contactbtn}>
                              {contacts.my_contact}
                            </div>
                          </Button>
                          {permissions?.my_contacts?.block_unblock===true?<></>:<Button
                            size="small"
                            className={
                              ListStyles[
                                active === "three"
                                  ? "specificationbtnone"
                                  : "specificationbtn"
                              ]
                            }
                            onClick={() => {
                              setActive("three");
                              setEmptyField("blocked contacts");
                              dispatch(fetchAllContacts(2));
                            }}
                            sx={{ px: 2 }}
                          >
                            Blocked Contacts
                            <div className={ListStyles.contactbtn}>
                              {contacts.block_contact}
                            </div>
                          </Button>}          
                          <Button
                            size="small"
                            className={
                              ListStyles[
                                active === "four"
                                  ? "specificationbtnone"
                                  : "specificationbtn"
                              ]
                            }
                            onClick={() => {
                              setActive("four");
                              setEmptyField("pending contacts");
                              dispatch(fetchAllContacts(0));
                            }}
                            sx={{ px: 2 }}
                          >
                            Pending Contacts
                            <div className={ListStyles.contactbtn}>
                              {contacts.contact_requests}
                            </div>
                          </Button>
                        </ContactTabs>
                      </div>
                    </CardHeader>
                    {loader ? (
                      <>
                        {List.map((v, i) => (
                          <SkeletonForContactList key={i} />
                        ))}
                      </>
                    ) : (
                      <>
                        {allContacts?.length > 0 ? (
                          <Box sx={{ overflow: "auto" }}>
                            <Box
                              sx={{
                                height: 500,
                                width: "100%",
                                display: "table",
                                tableLayout: "fixed",
                              }}
                            >
                              <DataGridPro
                                initialState={{
                                  pinnedColumns: {
                                    right: ["actions"],
                                  },
                                }}
                                localeText={{
                                  columnMenuShowColumns: "Manage Columns",
                                }}
                                rows={!loader ? allContacts : []}
                                columns={columns}
                                pageSize={10}
                                rowHeight={45}
                                onPageSizeChange={(newPageSize) =>
                                  setPageSize(newPageSize)
                                }
                                pagination
                                checkboxSelection={false}
                                disableSelectionOnClick={true}
                                sx={DataGridStyle}
                                style={{
                                  "&. MuiSelect-select-MuiInputBase-input": {
                                    padding: "0px",
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              height: 520,
                              width: "100%",
                              display: "table",
                              tableLayout: "fixed",
                            }}
                          >
                            <Stack
                              height="100%"
                              alignItems="center"
                              justifyContent="center"
                              position={"relative"}
                              zIndex="10"
                            >
                              <EmptyPage
                                text={
                                  emptyfield == "" ? "contacts" : emptyfield
                                }
                                onClickHandler={() => {}}
                                logo="/assets/contact_img.svg"
                                actiontext={false}
                              />
                            </Stack>
                          </Box>
                        )}
                      </>
                    )}
                  </Card>
                </ListHeader>
              </InnerContainer>
            </OuterContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
