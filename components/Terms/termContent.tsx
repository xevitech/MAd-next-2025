import React from "react";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { BannerTxt, Bgimage, Textoverimg1 } from "../Faq/style";

function TermContent() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box>
            <Bgimage>
              <BannerTxt>
                <Box>
                  <Textoverimg1 variant="h1">
                   Term and conditions
                  </Textoverimg1>
                </Box>
              </BannerTxt>
            </Bgimage>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h6" component="h6" p={2}>
          India’s largest online B2B marketplace for Small & Medium Size Businesses, connecting global buyers with suppliers. The company offers a platform and tools to over 1.2 million suppliers to generate business leads from more than 6.5 million buyers, who use the platform to find reliable and competitive suppliers. The company has over 2,800 employees located across 60+ offices in the country. Its existing investors include Intel Capital and Bennett, Coleman & Co. Ltd.
          </Typography>

          <Typography variant="h6" component="h6" p={2}>
          MerchantAd.com offers products that enable small and medium-sized businesses to generate business leads through online catalogs and storefronts, establish their credibility through third-party verified trust profiles, and use business information such as finance, news, trade shows, and tenders for business promotion.

          
          </Typography>

        <Typography variant="h6" component="h6" p={2}>
          MerchantAd.com has won numerous awards and received significant nominations over the years, including the coveted Red Herring Award and Emerging India Award, among others. The company has also been widely covered by the media for its pioneering role in promoting SME businesses in the country.
        </Typography>
    </div>
  );
}

export default TermContent;
