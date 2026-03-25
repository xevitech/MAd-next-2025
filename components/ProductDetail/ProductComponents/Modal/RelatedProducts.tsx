import React, { useEffect, useState } from "react";
import { ConfigTableList } from "./style";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { FontContainer, ProductListAccordion } from "../../style";
import { apiClient } from "@/components/common/common";
import AccordianData from "./AccordianData";
function RelatedProducts({
  quotedetails,
  unique_session_id,
  customiseRequest,
  onProductIdsChange,
}) {
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    FetchRelatedProducts();
  }, []);

  const FetchRelatedProducts = async () => {
    setLoader(true); // Start loader

    try {
      let id = quotedetails?.category_lists;
      let response = await apiClient(
        `front/quote_related_product?category_list=${id}&seller_id=${quotedetails?.user_id}&product_id=${quotedetails?.id}&product_type=${quotedetails?.product_type}`,
        "get"
      );

      if (response.status) {
        let productList = response.data.filter(
          (v) => v.id !== quotedetails?.id
        );
        if (productList.length > 0) {
          setRelatedProducts(productList);
        }
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoader(false); // Stop loader
    }
  };
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleCheckboxChange = (product) => (event) => {
    setSelectedProducts((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === product.id);

      if (event.target.checked && !isAlreadySelected) {
        return [...prev, product];
      }

      if (!event.target.checked && isAlreadySelected) {
        return prev.filter((item) => item.id !== product.id);
      }

      return prev;
    });
  };

  React.useEffect(() => {
    const selectedProductIds = Array.from(
      selectedProducts.map((product) => product.id)
    );
    onProductIdsChange(selectedProductIds);
  }, [selectedProducts]);
  return (
    <div>
      {loader ? (
        <Box sx={{}}>
          {[...Array(3)].map((_, idx) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                gap: "5px",
                width: "100%",
              }}
            >
              <Box  sx={{ padding: "9px 9px 9px 0px" }}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={"16px"}
                  width={"16px"}
                 
                ></Skeleton>
              </Box>
              <Box
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: "8px",
                  margin: "0 0 12px 0",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    padding: "3px",
                    backgroundColor: "rgba(0, 0, 0, .03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Skeleton
                      variant="circular"
                      width="32px"
                      height="32px"
                      animation="wave"
                    />
                    <Box>
                      <Skeleton variant="text" width="140px" animation="wave" />
                      <Skeleton variant="text" width="100px" animation="wave" />
                    </Box>
                  </Box>
                  <Box>
                    <Skeleton
                      variant="text"
                      width="40px"
                      height={"30px"}
                      animation="wave"
                    />
                  </Box>
                </Box>
                <Box sx={{ padding: "16px" }}>
                  <Grid container spacing={2}>
                    <Grid item xl={3} lg={3} md={3} sm={4} xs={12}>
                      <Box borderLeft="1px solid #CBCBCB">
                        <FontContainer
                          sx={{
                            borderLeft: "2px solid #D7282F",
                            paddingLeft: "13px",
                            paddingTop: "4px",
                            color: "#231F20",
                          }}
                        >
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={"15%"}
                          ></Skeleton>
                        </FontContainer>
                        <FontContainer
                          fontWeight={"500"}
                          sx={{
                            paddingLeft: "13px",
                            fontSize: "12px !important",
                            fontWeight: "600",
                            color: "#4b4b4b !important",
                          }}
                        >
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={"12%"}
                          ></Skeleton>
                        </FontContainer>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ) : relatedProducts?.length > 0 ? (
        <ConfigTableList>
          <ProductListAccordion>
            {relatedProducts?.map((v, i) => (
              <AccordianData
                quotedetails={quotedetails}
                productList={relatedProducts}
                unique_session_id={unique_session_id}
                v={v}
                i={i}
                key={i}
                selectedProducts={selectedProducts}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </ProductListAccordion>
        </ConfigTableList>
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Typography
            sx={{ fontSize: "15px", fontWeight: "600", color: "#000000DE" }}
          >
            No Related Product Exists
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default RelatedProducts;
