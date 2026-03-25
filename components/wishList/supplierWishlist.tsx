import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ManufactureBusinessType,
  ManufactureChatBTN,
  ManufactureContactSupplierBTN,
  ManufactureCountry,
  ManufactureDivider,
  ManufactureFlex1,
  ManufactureFlexSpacebetween,
  ManufactureOriginDate,
  ManufactureSellerImgBox,
  ManufactureSellerName,
  ManufactureUserStatus,
  ManufactureWishlist,
} from "../guestLayout/landingPage/manufactureProducts/ManufactureStyle";
import { LightTooltip } from "../common/Tooltip/tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import GetQuoteQueryModal from "./GetQuoteQueryModal";
// import ChatWindow from "../Chat";
import SupplierProductItem from "./SupplierProductItem";
// import useInitiateChatAndOpenWindow from "../Chat/common/customHooks/useInitiateChat";
import { useSelector } from "react-redux";
import EmptyPage from "../common/EmptyPage";
import SaveSellerSkeleton from "./skeleton/SaveSellerSkeleton";
import { getBussinessTypeIcon } from "../Helper";
import { SupplierImageBox, SupplierInnerBox, SupplierOriginDateBox, SupplierOuterBox, SupplierWishlistBox } from "./styles";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function SupplierWishlist() {
  const [wishlistData, setWishlistData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [productIds, setproductsIds] = useState([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [indexdata, indexSetData] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    user_info: { id: currentLoggedUserId },
  } = useSelector((state: any) => state.userData);

  // const initiateChat = useInitiateChatAndOpenWindow();

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/product/supplier/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
      });
      const responseData = await res.json();
      setWishlistData(responseData);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };
  const handleFavorite = async (shop_id) => {
    setLoading(true);
    const res = await fetch(
      `${BASE_URL}/product/supplier/wishlist/delete/${shop_id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
      }
    );
    if (res.status === 200) {
      fetchWishlist();
      setWishlistData(wishlistData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSelectProduct = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pid) => pid !== id);
      } else {
        return [...prev, id];
      }
    });
    setproductsIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pid) => pid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div>
      <>
        {openModal && (
          <GetQuoteQueryModal
            opens={openModal}
            setOpenModal={setOpenModal}
            handleClose={() => setOpenModal(false)}
            onClickAction={fetchWishlist}
            data={indexdata}
          />
        )}
        {/* {openChat && <ChatWindow />} */}
      </>
      {wishlistData.length > 0 ? (
        <Box>
          {wishlistData.map((supplier, index) => {
            const businessTypes = supplier?.business_type
              ? JSON.parse(supplier.business_type)
              : [];
            const userID = supplier?.shop_id;
            return (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <SupplierOuterBox>
                      <SupplierInnerBox>
                        <Box>
                          <SupplierImageBox>
                            <img
                              src={
                                supplier.shop_logo
                                  ? supplier.shop_logo
                                  : "assets/images/No-seller-comimage.svg"
                              }
                              alt="logo"
                            />
                          </SupplierImageBox>
                        </Box>
                        <Box sx={{}}>
                          <ManufactureFlex1>
                            <Box>
                              <ManufactureSellerName>
                                {supplier?.company_name}
                              </ManufactureSellerName>
                            </Box>

                            {supplier.email_verified && (
                              <img
                                src="/assets/verifyWtext.svg"
                                alt=""
                                width={60}
                                height={21}
                              />
                            )}
                            <ManufactureDivider></ManufactureDivider>
                            <ManufactureFlex1
                              sx={{
                                gap: "4px",
                              }}
                            >
                              <img
                                src={
                                  supplier.registration_country_id
                                    ? `https://flagcdn.com/w20/${supplier.registration_country_id.toLowerCase()}.png`
                                    : ""
                                }
                                alt=""
                                style={{
                                  border: "1px solid #ddd",
                                  padding: "1px",
                                  borderRadius: "2px",
                                }}
                              />
                              <Box component={"span"}>
                                <ManufactureCountry>
                                  {supplier.registration_country_id}
                                </ManufactureCountry>
                              </Box>
                            </ManufactureFlex1>
                          </ManufactureFlex1>
                          <SupplierOriginDateBox>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <img
                                src={
                                  supplier.icon
                                    ? `https://merchantad.xevitech.com/public/${supplier.icon.toLowerCase()}`
                                    : ""
                                }
                                alt=""
                                height={25}
                              />
                              <Typography
                                variant="body2"
                                sx={{ fontSize: "12px" }}
                              >
                                Since {supplier.registration_year}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                "@media screen and (max-width:767px)": {
                                  // flexDirection: "column",
                                  // alignItems: "start",
                                },
                              }}
                            >
                              <LightTooltip
                                title={supplier?.getTooltipMessage}
                                disableInteractive
                                placement="top"
                                arrow
                              >
                                <ManufactureBusinessType>
                                  {businessTypes.filter(
                                    (item) => item.toggle === "1"
                                  ).length > 0
                                    ? businessTypes
                                        .filter((item) => item.toggle === "1")
                                        .map((item, index, filteredArray) => (
                                          <Box
                                            component={"span"}
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                            key={index}
                                            className="businesstype"
                                          >
                                            <img
                                              src={`/assets/images/${getBussinessTypeIcon(
                                                item?.name
                                              )}`}
                                              alt={item?.name}
                                              height={16}
                                              style={{ marginRight: "5px" }}
                                            />
                                            {item?.name.replace(
                                              /s(?=[^s]*$)/,
                                              ""
                                            )}
                                            {index < filteredArray.length - 1
                                              ? ", "
                                              : ""}
                                          </Box>
                                        ))
                                    : ""}
                                </ManufactureBusinessType>
                              </LightTooltip>
                              <ManufactureUserStatus>
                                {supplier.no_of_employee}+ Staff
                              </ManufactureUserStatus>
                            </Box>
                          </SupplierOriginDateBox>
                        </Box>
                      </SupplierInnerBox>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        <ManufactureContactSupplierBTN
                          onClick={() => {
                            setOpenModal(true), indexSetData(supplier);
                          }}
                        >
                          Contact seller
                        </ManufactureContactSupplierBTN>
                        {/* <ManufactureChatBTN
                          onClick={() => {
                            if (userID)
                              initiateChat(userID, currentLoggedUserId);
                          }}
                        >
                          Chat Now
                        </ManufactureChatBTN> */}
                        <SupplierWishlistBox>
                          <FavoriteIcon
                            onClick={() => handleFavorite(supplier.shop_id)}
                          />
                        </SupplierWishlistBox>
                      </Box>
                    </SupplierOuterBox>
                  </Grid>
                  {/* <Grid item xs={4} sm={3} md={2} lg={1}>
                    <ManufactureSellerImgBox>
                      <img
                        src={
                          supplier.shop_logo
                            ? supplier.shop_logo
                            : "assets/images/No-seller-comimage.svg"
                        }
                        alt="logo"
                      />
                    </ManufactureSellerImgBox>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={11}>
                    < >
                      <Box sx={{}}>
                        <ManufactureFlex1>
                          <Box>
                            <ManufactureSellerName>
                              {supplier?.company_name}
                            </ManufactureSellerName>
                          </Box>

                          {supplier.email_verified && (
                            <img
                              src="/assets/verifyWtext.svg"
                              alt=""
                              width={60}
                              height={21}
                            />
                          )}
                          <ManufactureDivider></ManufactureDivider>
                          <ManufactureFlex1
                            sx={{
                              gap: "4px",
                            }}
                          >
                            <img
                              src={
                                supplier.registration_country_id
                                  ? `https://flagcdn.com/w20/${supplier.registration_country_id.toLowerCase()}.png`
                                  : ""
                              }
                              alt=""
                              style={{
                                border: "1px solid #ddd",
                                padding: "1px",
                                borderRadius: "2px",
                              }}
                            />
                            <Box component={"span"}>
                              <ManufactureCountry>
                                {supplier.registration_country_id}
                              </ManufactureCountry>
                            </Box>
                          </ManufactureFlex1>
                        </ManufactureFlex1>
                        <ManufactureOriginDate>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <img
                              src={
                                supplier.icon
                                  ? `https://merchantad.xevitech.com/public/${supplier.icon.toLowerCase()}`
                                  : ""
                              }
                              alt=""
                              height={25}
                            />
                            <Typography
                              variant="body2"
                              sx={{ fontSize: "12px" }}
                            >
                              Since {supplier.registration_year}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              "@media screen and (max-width:767px)": {
                                flexDirection: "column",
                                alignItems: "start",
                              },
                            }}
                          >
                            <LightTooltip
                              title={supplier?.getTooltipMessage}
                              disableInteractive
                              placement="top"
                              arrow
                            >
                              <ManufactureBusinessType>
                                {businessTypes.filter(
                                  (item) => item.toggle === "1"
                                ).length > 0
                                  ? businessTypes
                                      .filter((item) => item.toggle === "1")
                                      .map((item, index, filteredArray) => (
                                        <Box
                                          component={"span"}
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                          key={index}
                                          className="businesstype"
                                        >
                                          <img
                                            src={`/assets/images/${getBussinessTypeIcon(
                                              item?.name
                                            )}`}
                                            alt={item?.name}
                                            height={16}
                                            style={{ marginRight: "5px" }}
                                          />
                                          {item?.name.replace(
                                            /s(?=[^s]*$)/,
                                            ""
                                          )}
                                          {index < filteredArray.length - 1
                                            ? ", "
                                            : ""}
                                        </Box>
                                      ))
                                  : ""}
                              </ManufactureBusinessType>
                            </LightTooltip>
                            <ManufactureUserStatus>
                              {supplier.no_of_employee}+ Staff
                            </ManufactureUserStatus>
                          </Box>
                        </ManufactureOriginDate>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        <ManufactureContactSupplierBTN
                          onClick={() => {
                            setOpenModal(true), indexSetData(supplier);
                          }}
                        >
                          Contact seller
                        </ManufactureContactSupplierBTN>
                        <ManufactureChatBTN
                          onClick={() => {
                            if (userID)
                              initiateChat(userID, currentLoggedUserId);
                          }}
                        >
                          Chat Now
                        </ManufactureChatBTN>
                        <ManufactureWishlist>
                          <FavoriteIcon
                            onClick={() => handleFavorite(supplier.shop_id)}
                          />
                        </ManufactureWishlist>
                      </Box>
                    </>
                  </Grid> */}
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {supplier.products.slice(0, 4)?.map((product, index) => {
                        return (
                          <Grid item xs={12} sm={12} md={4} lg={3} key={index}>
                            <div>
                              <Box sx={{ margin: "0 5px" }}>
                                <SupplierProductItem
                                  key={product.id}
                                  data={{
                                    ...product,
                                    name: product?.name,
                                    business_type: supplier?.business_type,
                                    companyName: supplier?.company_name,
                                    miniSlug: supplier?.company_slug,
                                  }}
                                  onSelect={handleSelectProduct}
                                  isSelected={selectedIds.includes(product.id)}
                                />
                              </Box>
                            </div>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ margin: "30px 0" }}></Divider>
              </>
            );
          })}
        </Box>
      ) : loading ? (
        <Box>
          <SaveSellerSkeleton />
        </Box>
      ) : (
        <Box>
          <EmptyPage
            text={"Wishlist"}
            onClickHandler={() => {}}
            logo="/assets/cart.svg"
            actiontext={false}
          />
        </Box>
      )}
    </div>
  );
}
