import { Button, styled } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";

export const EmailContainer = styled("div")({
  display: "flex",
  gap: "10px",
  width: "fit-content",
});

export const EmailText = styled("span")({
  display: "inline-block",
  minWidth: "200px",
  fontSize: "16px",
  opacity: "1",
  color: "black",
});

export const EmailIconContainer = styled("span")({
  display: "inline-block",
  fontSize: "16px",
});

export const InputContainer = styled("div")({
  display: "flex",
  gap: "10px",
  margin: "10px",
  marginTop: "25px",
});
export const steps = ["", "", "", "", "", ""];

export const ModalContainer = styled("div")({
  width: "900px",
  height: "440px",
  background: "white",
  position: "absolute",
  zIndex: 100,
  borderRadius: "6px",
  margin: "0 auto",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  display: "flex",
  justifyContent: "center",
});

export const OuterMostContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const OuterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "140px",
  position: "relative",
  zIndex: 1,
  padding: "30px",
  minWidth: "440px",
  background: "white",
  borderRadius: "6px",
  paddingLeft: "0px",
  justifyContent: "space-around",
});

export const LeftRightContainer = styled("div")({
  minWidth: "100vw",
  minHeight: "100vh",
  filter: `brightness(40%)`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: -1,
});
export const StepContainer = styled("div")({
  display: "flex",
  width: "100%",
  gap: "10px",
  fontFamily: "open sans",
  minHeight: "240px",
});

export const LeftLogoContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
});

export const LogoImage = styled("img")({
  width: "35px",
  height: "35px",
});
export const StepContentContainer: any = styled("div")(
  ({ activeStep }: any) => ({
    display: "flex",
    justifyContent: activeStep?.step1 ? "flex-end" : "center",
    alignItems: "center",
    flexDirection: "column",
  })
);

export const StepContentHeading: any = styled("p")(({ activeStep }: any) => ({
  fontWeight: 700,
  fontSize: "24px",
  lineHeight: "30px",
  color: "#231F20",
  width: "100%",
  textAlign: "start",
}));

export const StepContent: any = styled("div")(({ flexDir }: any) => ({
  color: "#9E9E9E",
  fontSize: "14px",
  paddingTop: "10px",
  maxWidth: "100%",
  flexDirection: flexDir?.column ? "column" : "row",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const StepFooterButtonContainer: any = styled("div")(
  ({ buttons }: any) => ({
    display: "flex",
    justifyContent: buttons?.two ? "space-between" : "flex-end",
  })
);

export const CustomButton = styled(Button)({
  textTransform: "none",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "19px",
  minWidth: "72px",
  background: "#D7282F",
  color: "white",
  height: "37px !important",
  paddingLeft: "15px",
  paddingRight: "15px",
  "&:hover": {
    background: "#D7282F",
  },
  borderRadius: "6px",
  boxShadow:
    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
});

export const EmailsOuterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  width: "100%",
  marginTop: "15px",
});

export const TextContainer = styled("div")({});

export const Text = styled("p")({
  display: "inline-block",
  fontSize: "14px",
  opacity: "0.9",
  color: "rgba(34, 51, 84, 0.5)",
  marginTop: "10px",
});

export const ToggleButtonContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "15px",
});

export const CustomToggleButton: any = styled(ToggleButton)({
  padding: "4px 6px",
  textTransform: "none",
  background: "rgba(35, 31, 32, 0.12)",
  outline: "none",
  borderRadius: "6px",
  fontWeight: 600,
  fontSize: "13px",
  lineHeight: "121.9%",
  fontFamily: "open sans",
  border: "2px solid #e4e3e4",
  opacity: "0.8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "3px",
});

export const ContainerLeft = styled("div")({
  width: "100%",
  margin: "auto",
});

export const ContainerRight = styled("div")({
  width: "20%",
  background: `linear-gradient(90deg, #F74A51 0%, #4F1214 98.96%)`,
});

export const CustomisedEmailButton = styled(Button)({
  minWidth: "80px",
  background: "#D7282F",

  "&:hover": {
    background: "#D7282F",
  },
});

export const Step2Image = styled("img")({
  height: "375px",
  width: "380px",
  margin: "30px",
  marginBottom: "0px",
  marginTop: "0px",
});

export const Step3Image = styled("img")({
  height: "420px",
  width: "380px",
  margin: "30px",
  marginBottom: "0px",
});

export const Step4Image = styled("img")({
  height: "320px",
  width: "380px",
  margin: "30px",
  marginBottom: "0px",
});

export const Step5Image = styled("img")({
  height: "320px",
  width: "380px",
  margin: "30px",
  marginBottom: "0px",
});
export const GridOneOptions = [
  {
    value: "Manufacturers",
    toggle: false,
    options: [
      { name: "Sell directly to businesses", checked: false },
      {
        name: "OEMs: Produce components for other businesses' products",
        checked: false,
      },
    ],
    selected: false,
  },
  {
    value: "Agents and Representatives",
    selected: false,
    toggle: false,
    options: [
      {
        name: "Manufacturers representatives or businesses in specific regions",
        checked: false,
      },
      {
        name: "Manufacturers' Agents: Sell specific brands or products",
        checked: false,
      },
      {
        name: "Selling Agents: Represent multiple businesses",
        checked: false,
      },
      {
        name: "Brokers: Facilitate transactions between buyers and sellers",
        checked: false,
      },
      {
        name: "Sell products directly to businesses",
        checked: false,
      },
    ],
  },
  {
    value: "Distributors",
    selected: false,
    toggle: false,
    options: [
      {
        name: "Provide access to a wide range of products",
        checked: false,
      },
      {
        name: "Exclusive Distributors: Sole rights in specific regions",
        checked: false,
      },
      {
        name: "Value-Added Distributors: Offer additional services",
        checked: false,
      },
    ],
  },
  {
    selected: false,
    value: "Retailers",
    toggle: false,
    options: [
      {
        name: "Wholesale Retailers: Sell in large quantities at discounted rates",
        checked: false,
      },
      {
        name: "E-commerce Retailers: Sell online, offering 24/7 access",
        checked: false,
      },
    ],
  },
];

export const GridTwoOptions = [
  {
    selected: false,
    value: "Wholesalers",
    toggle: false,
    options: [
      {
        name: "Sell products in bulk at competitive prices",
        checked: false,
      },
      {
        name: "General Wholesalers: Wide variety of products",
        checked: false,
      },
      {
        name: "Specialty Wholesalers: Deep expertise in specific categories",
        checked: false,
      },
    ],
  },
  {
    selected: false,
    value: "Resellers",
    toggle: false,
    options: [
      {
        name: "Resellers: Purchase and resell without adding value",
        checked: false,
      },
      {
        name: "Value-Added Resellers (VARs) Enhance products before reselling",
        checked: false,
      },
    ],
  },
  {
    selected: false,
    value: "Others",
    toggle: false,
    options: [
      {
        name: "System Integrators: Design and integrate complex systems",
        checked: false,
      },
      {
        name: "Service Providers: Offer consulting, maintenance, and support services",
        checked: false,
      },
      {
        name: "Design and Engineering",
        checked: false,
      },
    ],
  },
];
export const GridOneBuyerOptions = [
  {
    value: "Online Store",
    toggle: false,
    selected: false,
    options: [
      {
        name: "Niche eCommerce",
        checked: false,
      },
      {
        name: "Multi-Category eCommerce",
        checked: false,
      },
      {
        name: "Marketplace Platform",
        checked: false,
      },
    ],
  },
  {
    value: "Manufacturer",
    selected: false,
    toggle: false,
    options: [
      {
        name: "OEM (Original Equipment Manufacturer) ",
        checked: false,
      },
      {
        name: "Contract Manufacturer ",
        checked: false,
      },
      {
        name: "Private Label Manufacturer",
        checked: false,
      },
      {
        name: "Custom Product Manufacturer",
        checked: false,
      },
    ],
  },
  {
    value: "Trading Company",
    selected: false,
    toggle: false,
    options: [
      {
        name: "Import-Export Trading",
        checked: false,
      },
      {
        name: "Domestic Trading",
        checked: false,
      },
      {
        name: "Specialty Goods Trader",
        checked: false,
      },
      {
        name: "Commodity Trader",
        checked: false,
      },
    ],
  },
  {
    selected: false,
    value: "Wholesaler",
    toggle: false,
    options: [
      {
        name: "Distributor",
        checked: false,
      },
      {
        name: "Cash-and-Carry Wholesaler",
        checked: false,
      },
      {
        name: "Drop-Ship Wholesaler ",
        checked: false,
      },
      {
        name: "Online Wholesaler",
        checked: false,
      },
    ],
  },
  {
    selected: false,
    value: "Retailer",
    toggle: false,
    options: [
      {
        name: "Brick-and-Mortar Retailer ",
        checked: false,
      },
      {
        name: "Online Retailer ",
        checked: false,
      },
      {
        name: "Pop-Up Retailer ",
        checked: false,
      },
      {
        name: "Direct-to-Consumer Brand ",
        checked: false,
      },
    ],
  },
];

export const GridTwoBuyerOptions = [
  {
    selected: false,
    value: "Service Provider",
    toggle: false,
    options: [
      {
        name: "IT Service Provider",
        checked: false,
      },
      {
        name: "Maintenance and Repair Service",
        checked: false,
      },
      {
        name: "Construction and Engineering Services.",
        checked: false,
      },
    ],
  },
  {
    selected: false,
    value: "EPC Contractor",
    toggle: false,
    options: [
      {
        name: "Energy Sector EPC",
        checked: false,
      },
      {
        name: "Infrastructure EPC",
        checked: false,
      },
      {
        name: "Industrial EPC ",
        checked: false,
      },
      {
        name: "Water and Environmental EPC ",
        checked: false,
      },
    ],
  },
  {
    selected: false,
    value: "Dropshipper",
    toggle: false,
    options: [
      {
        name: "Niche Dropshipper",
        checked: false,
      },
      {
        name: "Generalist Dropshipper",
        checked: false,
      },
      {
        name: "Branded Dropshipper ",
        checked: false,
      },
      {
        name: "Marketplace Dropshipper",
        checked: false,
      },
    ],
  },
  {
    selected: false,
    value: "Individual",
    toggle: false,
    options: [
      {
        name: "Solo Entrepreneur",
        checked: false,
      },
      {
        name: "Freelancer",
        checked: false,
      },
      {
        name: "Hobbyist",
        checked: false,
      },
      {
        name: "Independent Consultant",
        checked: false,
      },
    ],
  },
  {
    selected: false,
    value: "Other",
    toggle: false,
    options: [
      {
        name: "Non-Profit Buyer",
        checked: false,
      },
      {
        name: "Educational Institution Buyer",
        checked: false,
      },
      {
        name: "Government Buyer",
        checked: false,
      },
      {
        name: "Event Planner",
        checked: false,
      },
    ],
  },
];
