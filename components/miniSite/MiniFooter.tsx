import { Box, Divider, Fab, Stack, Typography } from "@mui/material";
import { FooterContainer, MiniScrollTop, CompanyNameFooter } from "./styled";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function MiniFooter({ name }) {
  function handleItemClick(item) {}
  const footerMenu1: any = [
    { element: "About Us", link: "about-us" },
    { element: "Our Products", link: "our-products" },
    { element: "Contact Us", link: "contact-us" },
    { element: "Blog", link: "blog" },
    { element: "Help", link: "blog" },
    { element: "Source", link: "blog" },
  ];
  const footerMenu2 = [
    `Copyright © 2024  ${name}. All right reserved. Powered by Merchant AD.`,
  ];
  const currentScrollTop = typeof window !== "undefined" && window.scrollY;
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const footerMenu3 = ["User Agreement", "Declaration", "Privacy Policy"];
  const footerMenu3: any = [
    { element: "User Agreement", link: "privacy-policy/use-data-deletion" },
    { element: "Privacy Policy", link: "privacy-policy" },
  ];

  return (
    <>
      <FooterContainer
        paddingX={{ xs: 2 }}
        paddingY={{ xs: 5 }}
        marginTop={"60px"}
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #231F20",
        }}
      >
        <Stack
          flexWrap="wrap"
          mb={{ xs: 2.5 }}
          gap={{ xs: 2.5 }}
          direction={{ xs: "row" }}
          justifyContent={{ xs: "center" }}
          alignItems={{ xs: "center" }}
          divider={
            <Divider
              sx={{
                background: "white",
                "@media (max-width: 767px)": {
                  height: "12px",
                  marginTop: "4px",
                },
              }}
              orientation="vertical"
              flexItem
            />
          }
        >
          {footerMenu1.map((item, i) => (
            <a href={`/${item?.link}`} key={i}>
              <Typography
                sx={{
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#d7282f",
                  },
                }}
                variant="caption"
                component="span"
              >
                {item?.element}
              </Typography>
            </a>
          ))}
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            flexWrap="wrap"
            direction={{ xs: "row" }}
            gap={{ xs: 2.5 }}
            justifyContent={{ xs: "center" }}
            alignItems={{ xs: "center" }}
            divider={
              <Divider
                style={{ background: "white" }}
                orientation="vertical"
                flexItem
              />
            }
          >
            <Typography
              sx={{ color: "white", paddingRight: "16px" }}
              variant="caption"
              component="p"
            >
              Copyright © 2024 <CompanyNameFooter> {name}.</CompanyNameFooter>{" "}
              All right reserved. Powered by Merchant AD.,
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ p: 1 }}>
          <Stack
            flexWrap="wrap"
            direction={{ xs: "row" }}
            gap={{ xs: 2.5 }}
            justifyContent={{ xs: "center" }}
            alignItems={{ xs: "center" }}
            divider={
              <Divider
                sx={{
                  background: "white",
                  "@media (max-width: 767px)": {
                    height: "12px",
                    marginTop: "4px",
                  },
                }}
                orientation="vertical"
                flexItem
              />
            }
          >
            {footerMenu3.map((item, i) => (
              <a href={`/${item?.link}`} key={i}>
                <Typography
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#d7282f",
                    },
                  }}
                  key={i}
                  variant="caption"
                  component="a"
                >
                  {item?.element}
                </Typography>
              </a>
            ))}
          </Stack>
        </Box>
      </FooterContainer>

      {currentScrollTop > 3 && (
        <MiniScrollTop style={{ position: "relative" }}>
          <Box onClick={() => handleScroll()} className="scroll-container">
            <Fab size="small" aria-label="">
              <KeyboardArrowUpIcon />
            </Fab>
          </Box>
        </MiniScrollTop>
      )}
    </>
  );
}
