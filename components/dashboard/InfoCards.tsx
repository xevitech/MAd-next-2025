import { CardContent, Grid, Typography, styled } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Box from "@mui/material/Box";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { CardCoulmn, CardBox } from "./style";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Heading = styled(Typography)(() => ({
  fontFamily: "open sans",
  fontWeight: "600",
  fontSize: "21px",
  color: "#231F20",
}));

const Subheading = styled(Typography)(() => ({
  fontFamily: "open sans",
  fontWeight: "400",
  fontSize: "14px",
  color: "#7B7979",
  lineHeight: "19.07px",
}));

const Endheading = styled(Typography)(() => ({
  fontFamily: "open sans",
  fontWeight: "400",
  fontSize: "13px",
  color: "#7B7979",
  marginLeft: "10px",
}));

const Imagebackground = styled(Box)(() => ({
  background: "#FFEEEF",
  borderRadius: "50px",
  height: "44px",
  width: "44px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 10px 0 0px",
}));

const Uparrow = styled(ArrowUpwardOutlinedIcon)(() => ({
  height: "15px",
  width: "15px",
  color: "#3BB900",
}));

const UparrowAndNumber = styled(Typography)(() => ({
  color: "#3BB900",
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
}));

const CounterBox = styled(Box)(() => ({
}));

export default function InfoCard() {
  const { role } = useSelector((state: any) => state.userData);
  const router: any = useRouter();
  const NavigateHandler = (route: any) => {
    router.push(`${route}`);
  };

  // Counter Item Component
  const CounterItem = ({
    icon,
    target,
    label,
  }: {
    icon: React.ReactNode;
    target: number;
    label: string;
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const increment = target / 200;
      const updateCounter = () => {
        setCount((prevCount) => {
          if (prevCount < target) {
            return Math.ceil(prevCount + increment);
          }
          return target;
        });
      };

      const timer = setInterval(updateCounter, 10);

      if (count === target) {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    }, [count, target]);

    return (
      <CounterBox>
        <Heading>{count}</Heading>
        <Subheading>{label}</Subheading>
      </CounterBox>
    );
  };

  const { profileInfos } = useSelector((state: any) => state.userData);
  const {
    total_quotation,
    wishlist_count,
    total_contacts,
    total_leads,
    avg_page_view_per_lead,
    weekly_lead_oppportunity_conversion_rate,
    weekly_total_leads,
    weekly_total_contacts,
    weekly_avg_page_view_per_lead,
    weekly_total_quotation,
    weekly_wishlist_count,
    lead_to_customer_conversion_rate,
    total_products,
    total_brands,
    total_categories,
    total_rfq,
  } = profileInfos?.jobDetails;
  const { user_info } = useSelector((state: any) => state.userData);
  const [checkPermissions, setCheckPermissions] = useState("");
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  // const permissions =
  //   storedSubSellerList && storedSubSellerList.length > 0
  //     ? storedSubSellerList[0]
  //     : null;
  const permissions = storedSubSellerList?.[0] ?? null;
  useLayoutEffect(() => {
    setCheckPermissions(user_info?.type);
  }, [user_info]);
  return (
    <>
      <Grid container spacing={1.5} sx={{ mt: 0.4 }}>
        {role == "buyer" && (
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <CardCoulmn
              sx={{ cursor: "pointer" }}
              onClick={(e) => NavigateHandler("/rfq")}
            >
              <CardContent>
                <CardBox>
                  <Box>
                    <Heading>{total_rfq ? total_rfq : 0}</Heading>
                    <Subheading>Total RFQ</Subheading>
                  </Box>
                  <Imagebackground>
                    <img
                      src="/assets/total_rfq.svg"
                      alt=""
                      className="IconImg"
                      style={{ height: "26px", width: "26px" }}
                    />
                  </Imagebackground>
                </CardBox>
              </CardContent>
            </CardCoulmn>
          </Grid>
        )}
        {role == "buyer" && (
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <CardCoulmn
              sx={{ cursor: "pointer" }}
              onClick={(e) => NavigateHandler("/contacts")}
            >
              <CardContent>
                <CardBox>
                  <Box className="">
                    <Heading>{total_contacts}</Heading>
                    <Subheading>Total Contacts </Subheading>
                  </Box>
                  <Imagebackground>
                    <img
                      src="/assets/contacts-icon.svg"
                      alt=""
                      className="IconImg"
                      style={{ height: "26px", width: "26px" }}
                    />
                  </Imagebackground>
                </CardBox>
                {/* <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Box>
                    <UparrowAndNumber>
                      <Uparrow />
                      {weekly_total_contacts}%
                    </UparrowAndNumber>
                  </Box>
                  <Box></Box>
                </Box> */}
              </CardContent>
            </CardCoulmn>
          </Grid>
        )}
        {role == "buyer" && (
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <CardCoulmn
              sx={{ cursor: "pointer" }}
              onClick={(e) => NavigateHandler("/wishlist")}
            >
              <CardContent>
                <CardBox>
                  <Box className="">
                    <Heading>{wishlist_count}</Heading>
                    <Subheading>Total Wishlist products</Subheading>
                  </Box>
                  <Imagebackground>
                    <img
                      className="IconImg"
                      src="/assets/product-svg.svg"
                      alt=""
                    />
                  </Imagebackground>
                </CardBox>
                {/* <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Box>
                    <UparrowAndNumber>
                      <Uparrow />
                      {weekly_wishlist_count}%
                    </UparrowAndNumber>
                  </Box>
                  <Box>
                    <Endheading>Since Last Week</Endheading>
                  </Box>
                </Box> */}
              </CardContent>
            </CardCoulmn>
          </Grid>
        )}
        {role == "buyer" && (
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <CardCoulmn>
              <CardContent>
                <CardBox>
                  <Box>
                    <Heading>{total_quotation}</Heading>
                    <Subheading>Total Quotations</Subheading>
                  </Box>
                  <Imagebackground>
                    <img
                      style={{ height: "26px", width: "26px" }}
                      src="/assets/total_quotations.svg"
                      alt=""
                      className="IconImg"
                    />
                  </Imagebackground>
                </CardBox>
                {/* <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Box>
                    <UparrowAndNumber>
                      <Uparrow /> {weekly_total_quotation}%
                    </UparrowAndNumber>
                  </Box>
                  <Box>
                    <Endheading>Since Last Week</Endheading>
                  </Box>
                </Box> */}
              </CardContent>
            </CardCoulmn>
          </Grid>
        )}
        {(role === "seller" ||
          (role === "subuser" && permissions?.product?.view == true)) && (
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <CardCoulmn
                sx={{ cursor: "pointer" }}
                onClick={(e) => {
                  if (permissions?.product?.view == true || role == "seller") {
                    NavigateHandler("/products/List");
                  } else {
                    return;
                  }
                }}
              >
                <CardContent>
                  <CardBox>
                    {/* <Box className="">
                      <Heading>{total_products ? total_products : 0}</Heading>
                      <Subheading>Total Products </Subheading>
                    </Box> */}
                    <Box className="">
                      <CounterItem
                        target={total_products ? total_products : 0}
                        label="Total Products" icon={""}
                      />
                    </Box>
                    <Imagebackground>
                      <img
                        src="/assets/total_products.svg"
                        alt=""
                        className="IconImg"
                        style={{ height: "26px", width: "26px" }}
                      />
                    </Imagebackground>
                  </CardBox>
                </CardContent>
              </CardCoulmn>
            </Grid>
          )}
        
        {(role === "seller" ||
          (role == "subuser" && permissions?.brands?.view == true)) && (
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <CardCoulmn
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (permissions?.brands?.view == true || role == "seller") {
                    NavigateHandler("/seller/brands");
                  } else {
                    return;
                  }
                }}
              >
                <CardContent>
                  <CardBox>
                    <Box className="">
                      {/* <Heading>{total_brands ? total_brands : 0}</Heading>
                      <Subheading>Total Brands</Subheading> */}
                      <CounterItem
                        target={total_brands ? total_brands : 0}
                        label="Total Brands" icon={""}
                      />
                    </Box>

                    <Imagebackground>
                      <img
                        src="/assets/total_brands.svg"
                        alt=""
                        className="IconImg"
                        style={{ height: "26px", width: "26px" }}
                      />
                    </Imagebackground>
                  </CardBox>
                </CardContent>
              </CardCoulmn>
            </Grid>
          )}
        {(role === "seller" ||
          (role == "subuser" && permissions?.categories?.view == true)) && (
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <CardCoulmn
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (permissions?.category?.view == true || role == "seller") {
                    NavigateHandler("/seller/categories");
                  } else {
                    return;
                  }
                }}
              >
                <CardContent>
                  <CardBox>
                    <Box className="">
                      {/* <Heading>{total_categories ? total_categories : 0}</Heading>
                      <Subheading>Total Categories</Subheading> */}
                      <CounterItem
                        target={total_categories ? total_categories : 0}
                        label="Total Categories" icon={""}
                      />
                    </Box>

                    <Imagebackground>
                      <img
                        src="/assets/total_categories.svg"
                        alt=""
                        className="IconImg"
                        style={{ height: "26px", width: "26px" }}
                      />
                    </Imagebackground>
                  </CardBox>
                </CardContent>
              </CardCoulmn>
            </Grid>
          )}

        {(role == "seller" ||
          (role == "subuser" && permissions?.leads?.view == true)) && (
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <CardCoulmn
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (
                    permissions?.my_contacts?.view == true ||
                    role == "seller"
                  ) {
                    NavigateHandler("/contacts");
                  } else {
                    return;
                  }
                }}
              >
                <CardContent>
                  <CardBox>
                    <Box className="">
                      <Heading>{total_contacts}</Heading>
                      <Subheading>Total Contacts </Subheading>
                    </Box>
                    <Imagebackground>
                      <img
                        src="/assets/contacts-icon.svg"
                        alt=""
                        className="IconImg"
                        style={{ height: "26px", width: "26px" }}
                      />
                    </Imagebackground>
                  </CardBox>
                  {/* <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Box>
                      <UparrowAndNumber>
                        <Uparrow />
                        {weekly_total_contacts}%
                      </UparrowAndNumber>
                    </Box>
                    <Box></Box>
                  </Box> */}
                </CardContent>
              </CardCoulmn>
            </Grid>
          )}
      </Grid>
    </>
  );
}
