"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    tag: "Weekend Discount",
    title: "Get the best quality products at the lowest prices",
    desc: "We have prepared special discounts for you on organic breakfast products.",
    price: "$21.67",
    oldPrice: "$50.99",
    note: "Don’t miss this limited time offer.",
    img: "/banner1.png",
    button: "Shop Now →",
  },
  {
    tag: "Mega Sale",
    title: "Healthy organic snacks for your daily energy",
    desc: "Discover premium organic super omega squares packed with nutrition.",
    price: "$18.99",
    oldPrice: "$45.99",
    note: "Limited stock available.",
    img: "/banner2.png",
    button: "Explore Now →",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  // ✅ Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <Box
      sx={{
        bgcolor: "#FFF5F5",
        py: { xs: 6, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={5}
        >
          {/* LEFT CONTENT */}
          <Box maxWidth={520}>
            <Box
              sx={{
                display: "inline-block",
                bgcolor: "",
                color: "success.dark",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {slide.tag}
            </Box>

            <Typography
              sx={{
                mt: 3,
                fontWeight: 800,
                fontSize: { xs: 28, md: 46 },
                lineHeight: 1.2,
              }}
            >
              {slide.title}
            </Typography>

            <Typography sx={{ mt: 2, color: "text.secondary" }}>
              {slide.desc}
            </Typography>

            <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
              <Button variant="contained" color="success" size="large">
                {slide.button}
              </Button>

              <Box>
                <Typography
                  component="span"
                  sx={{ color: "error.main", fontSize: 24, fontWeight: 700 }}
                >
                  {slide.price}
                </Typography>

                <Typography
                  component="span"
                  sx={{
                    ml: 1,
                    color: "text.disabled",
                    textDecoration: "line-through",
                  }}
                >
                  {slide.oldPrice}
                </Typography>

                <Typography variant="caption" display="block">
                  {slide.note}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* RIGHT IMAGE */}
          <Box
            sx={{
              transition: "opacity 0.5s ease",
            }}
          >
            <Image
              src={slide.img}
              alt="banner"
              width={600}
              height={400}
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
        </Stack>
      </Container>

      {/* DOT INDICATORS */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              cursor: "pointer",
              bgcolor: i === index ? "success.main" : "grey.400",
              transition: "0.3s",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}