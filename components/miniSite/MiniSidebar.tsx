import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  MiniSortContainer,
  SellerHeading,
  SellerOuter,
  SellerOuterCon,
  StickyBar,
} from "./Products/Products.styled";
import SellerDetail from "./Products/SallerDetail";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MiniSidebar() {
  const { userCategory } = useSelector((state: any) => state.miniSite);
  const router = useRouter();
  const { query } = router;

  return (
    <StickyBar>
      {query?.id?.[1] != "companyprofile" && userCategory.length > 0 && (
        <SellerOuterCon>
          <SellerOuter>
            <SellerHeading pb={"10px"}>
              <Typography variant="h4">Products Group</Typography>
            </SellerHeading>
            <Divider orientation="horizontal" />
            <>
              {userCategory.map((v, i) => (
                <Box
                  key={`${v.name}-${i}`}
                  display={"flex"}
                  alignItems="center"
                  gap={2}
                  pt={2}
                  style={{ cursor: "pointer" }}
                >
                  <img src={v.icon} style={{ height: "20px", width: "20px" }} />

                  <Link
                    href={`/mini-site/${query?.id?.[0]}/products`}
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {v.name}
                  </Link>
                </Box>
              ))}
            </>
          </SellerOuter>
        </SellerOuterCon>
      )}
      <MiniSortContainer p={{ xs: 2 }}>
        <Stack spacing={{ xs: 2, md: 2 }}>
          <SellerDetail />
        </Stack>
      </MiniSortContainer>
    </StickyBar>
  );
}
