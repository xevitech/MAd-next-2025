import { Box, Container, Typography } from "@mui/material";

const categories = [
  { name: "Lighting essential", img: "/images/cat1.jpg" },
  { name: "Furniture", img: "/images/cat2.jpg" },
  { name: "Bulb", img: "/images/cat3.jpg" },
  { name: "Sofas", img: "/images/cat4.jpg" },
  { name: "Mosquito nets", img: "/images/cat5.jpg" },
  { name: "Dining", img: "/images/cat6.jpg" },
  { name: "Drinkware", img: "/images/cat7.jpg" },
  { name: "Cookware", img: "/images/cat8.jpg" },
  { name: "Wallpaper", img: "/images/cat9.jpg" },
  { name: "Lighting essential", img: "/images/cat1.jpg" },
  { name: "Furniture", img: "/images/cat2.jpg" },
  { name: "Bulb", img: "/images/cat3.jpg" },
  { name: "Sofas", img: "/images/cat4.jpg" },
  { name: "Cookware", img: "/images/cat8.jpg" },
  { name: "Lighting essential", img: "/images/cat1.jpg" },
  { name: "Furniture", img: "/images/cat2.jpg" },
  { name: "Bulb", img: "/images/cat3.jpg" },
  { name: "Sofas", img: "/images/cat4.jpg" },
  { name: "Mosquito nets", img: "/images/cat5.jpg" },
  { name: "Dining", img: "/images/cat6.jpg" },
  { name: "Drinkware", img: "/images/cat7.jpg" },
  { name: "Cookware", img: "/images/cat8.jpg" },
  { name: "Wallpaper", img: "/images/cat9.jpg" },
  { name: "Lighting essential", img: "/images/cat1.jpg" },
  { name: "Furniture", img: "/images/cat2.jpg" },
  { name: "Bulb", img: "/images/cat3.jpg" },
  { name: "Sofas", img: "/images/cat4.jpg" },
  { name: "Cookware", img: "/images/cat8.jpg" },
];

export default function BrandSection() {
  return (
        
      
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          py: 2,
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {categories.map((item, index) => (
          <Box
            key={index}
            sx={{
              minWidth: 90,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            {/* Image Card */}
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                mb: 1,
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Label */}
            <Typography
              variant="caption"
              sx={{
                fontSize: "12px",
                color: "#333",
                display: "block",
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
        
  );
}