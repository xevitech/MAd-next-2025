import { apiClient } from "@/components/common/common";
import ProductItem from "@/components/ProductsListing/ProductItem";
import { AddProductDetail } from "@/hooks/productDetailsReducer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Accordion,
  AccordionSummary,
  Grid,
  styled,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import AOS from "aos";
import "aos/dist/aos.css";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  BannerFormData,
  BannerFormInner,
  BodyContentInfo,
  ButtonSize,
  CommonEachSection,
  FieldLabel,
  FixedForm,
  GetStarted,
  LandingPageHeadings,
  OurTopProducts,
  PageContentInfo,
  SectionColoredBox,
  SectionWhiteBox,
  SignUpBtn,
  SignUpBtnBox,
  StyledButton,
  StyledButtonBox,
  TestiminialButton,
  TestimonialBox,
  TestimonialDataBox,
  TestimonialDataMainBox,
  TestimonialDataOuter,
  TestimonialSlider
} from "./styles";
// import ChatWindow from "@/components/Chat";
import MobileInputCommon from "@/components/common/PhoneInput";
import { getTokenFromCookies } from "@/utils/cookieUtils";
import Heroslider from "./heroSlider";

const CounterBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  margin: "20px 30px",
}));

const CounterIcon = styled(Box)(() => ({}));

const CounterNumber = styled(Typography)(() => ({
  fontSize: "22px",
  color: "#D7282F",
  fontWeight: "700",
  padding: "10px 0",
  "@media screen and (max-width:1024px)": {
    fontSize: "18px",
  },
}));

const CounterLabel = styled(Typography)(() => ({
  fontSize: "16px",
  color: "#000",
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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "0",
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: "0",
  "& .MuiAccordionSummary-content": {
    alignItems: "center",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: 700,
  fontSize: "20px",
  "@media screen and (max-width:767px)": {
    fontSize: "14px",
    padding: 0,
  },

  "& span": {
    color: "#d32f2f",
    marginRight: theme.spacing(1),
  },
}));

// Define the keyframes for the slide-in and slide-out animation
// Keyframes for fade up and down
const fadeUpDown = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translateY(20px);  /* Start and end at the bottom (faded out) */
  }
  50% {
    opacity: 1;
    transform: translateY(0);  /* At midpoint, fully visible and at original position */
  }
`;

// Define the styles for each box with different durations and delays
const box1Style = {
  // animation: `${fadeUpDown} 3s ease-in-out 0s infinite`, // Slowed down a bit
};

const box2Style = {
  // animation: `${fadeUpDown} 2.5s ease-in-out 0.5s infinite`, // Added a slight delay
};

const box3Style = {
  // animation: `${fadeUpDown} 4.5s ease-in-out 1s infinite`, // Balanced duration and delay
};

const box4Style = {
  // animation: `${fadeUpDown} 3.5s ease-in-out 1.5s infinite`, // Smoother timing
};

const box5Style = {
  // animation: `${fadeUpDown} 4s ease-in-out 2s infinite`, // Slightly slower with a bit more delay
};

const box6Style = {
  // animation: `${fadeUpDown} 5.5s ease-in-out 2.5s infinite`, // Longest duration and delay for a final, smooth effect
};

// Create staggered transition delays for opacity changes
const staggeredDelays = [0, 0.5, 1, 1.5, 2, 2.5]; // Adjust values for smoother effect

const testimonials = [
  {
    image: " /assets/images/landing-page/testimonial-img.webp",
    quote:
      "Merchant AD has transformed the way we do business. As a seller, the platform’s intuitive interface and vast global reach have connected us with buyers we never imagined. The streamlined process, from listing our products to closing deals, has been seamless. It’s truly a game-changer for our business!",
    name: "Larry Culp",
    title: "CEO, General Electric",
  },
  {
    image: " /assets/images/landing-page/testimonial-img-2.webp",
    quote:
      "Merchant AD is a powerful tool for businesses looking to tap into global markets. Its platform provides a secure, transparent, and efficient trading environment that has enhanced our supply chain interactions. The seamless integration with trusted suppliers makes it an invaluable asset for scaling international business operations.",
    name: "John Neal",
    title: "CEO, Lloyd's London",
  },
  {
    image: " /assets/images/landing-page/testimonial-img-3.webp",
    quote:
      "Merchant AD has been instrumental in expanding our global presence. The platform’s reliable network and efficient transaction processes have made it easier to reach new markets and build long-term partnerships. Merchant AD is redefining B2B trade, offering unmatched opportunities for growth in key industrial sectors.",
    name: "Anil Rai Gupta",
    title: "MD, Havells India Limited",
  },
  {
    image: " /assets/images/landing-page/testimonial-img-2.jpg",
    quote:
      "Merchant AD is a powerful tool for businesses looking to tap into global markets. Its platform provides a secure, transparent, and efficient trading environment that has enhanced our supply chain interactions. The seamless integration with trusted suppliers makes it an invaluable asset for scaling international business operations.",
    name: "John Neal",
    title: "CEO, Lloyd's London",
  },
  {
    image: " /assets/images/landing-page/testimonial-img-3.jpg",
    quote:
      "Merchant AD has been instrumental in expanding our global presence. The platform’s reliable network and efficient transaction processes have made it easier to reach new markets and build long-term partnerships. Merchant AD is redefining B2B trade, offering unmatched opportunities for growth in key industrial sectors.",
    name: "Anil Rai Gupta",
    title: "MD, Havells India Limited",
  },
];

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <ButtonSize onClick={onClick} sx={{ right: 0 }}>
      <ArrowForwardIosIcon />
    </ButtonSize>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <ButtonSize onClick={onClick} sx={{ right: 25 }}>
      <ArrowBackIosIcon />
    </ButtonSize>
  );
};

const TestiNextArrow = (props) => {
  const { onClick } = props;
  return (
    <TestiminialButton onClick={onClick} sx={{ right: "46%" }}>
      <ArrowForwardIosIcon />
    </TestiminialButton>
  );
};
const TestiPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <TestiminialButton onClick={onClick} sx={{ left: "45%" }}>
      <ArrowBackIosIcon />
    </TestiminialButton>
  );
};
const settings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 500,
  rows: 2,
  dots: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
const settingsTestimonial = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <TestiNextArrow />,
  prevArrow: <TestiPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const settingsCrm = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
};

const settingsBigPost = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 900,
  autoplaySpeed: 3000,
  cssEase: "linear",
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const settingsProduct = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        nextArrow: false,
        prevArrow: false,
      },
    },
  ],
};
const settingsCategoriesSlide = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  rows: 2,
  slidesPerRow: 2,
  autoplay: true,
  speed: 8000,
  autoplaySpeed: 0,
  cssEase: "linear",
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesPerRow: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesPerRow: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        rows: 1,
        slidesToShow: 1,
        nextArrow: false,
        prevArrow: false,
        speed: 8000,
      },
    },
    {
      breakpoint: 480,
      settings: {
        rows: 1,
        slidesToShow: 0.5,
        nextArrow: false,
        prevArrow: false,
        speed: 8000,
      },
    },
    {
      breakpoint: 320,
      settings: {
        rows: 1,
        slidesToShow: 0.3,
        nextArrow: false,
        prevArrow: false,
      },
    },
  ],
};

const HeaderPage = dynamic(
  () => import("components/common/include/headerPart"),
  {
    ssr: false,
  }
);
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);
export default function Homepage(props: any) {
  const { defaultValues } = props;
  const [showTotal, setShowTotal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [bigPostList, setBigPostList] = useState([]);
  const [age, setAge] = useState("");
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [isOpen, setIsOpen] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [tradeShowData, setTradeShowData] = useState([]);
  const [token, setToken] = useState(null);
  const { defaultCode } = useSelector((state: any) => state.geoLocation);
  const mobileRef = useRef(null);
  const [validate, setValidation] = useState<boolean>(false);
  // if(typeof window == undefined && typeof window.localStorage !== undefined){
  const currency =
    typeof localStorage == "undefined"
      ? ""
      : localStorage.getItem("currency") ?? 1;
  // }
  const [formDataQuick, setFormDataQuick] = useState({
    name: "",
    email: "",
    phone: "",
    phone_code: "91", // default phone code
  });
  // Toggle between showing total products and the image
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTotal((prev) => !prev);
    }, 4000); // Toggle every 4 seconds

    return () => clearInterval(interval);
  }, []);
  const [topRankingProducts, setTopRankingProducts] = useState();


  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const list = useSelector((state: any) => state.header?.pageList ?? []);
  useEffect(() => {
    const token = getTokenFromCookies();
    setToken(token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const topRatedResponse = await apiClient(
          `products/top-ranking-product?currency=${currency}`,
          "GET"
        );
        if (topRatedResponse.status === 200) {
          setBigPostList(topRatedResponse.data);
        }
       
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();

    return () => {};
  }, [currency]);


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      mobile_code: defaultCode,
      mobile_country_code: defaultValues?.mobile_country_code,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Full Name is required")
        .min(2, "Minimum 2 characters required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        // .length(10, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Form values:", values);
        const response = await apiClient("auth/quick-signup", "post", {
          body: { email: values.email },
        });

        if (response.email) {
          formik.setFieldError("email", "Email already exists");
          toast.info("Email Already Exists");
        } else {
          const signupResponse = await apiClient("auth/quick-signup", "post", {
            body: values,
          });

          if (signupResponse.status == 200) {
            console.log("Signup successful:", signupResponse);
            localStorage.setItem("Token", signupResponse.accessToken);
            localStorage.setItem(
              "userData",
              JSON.stringify(signupResponse.user)
            );
            setTimeout(() => {
              window.location.reload();
            }, 1000);

            toast.success("Successfully Signed up");
          } else {
            console.log("Signup failed:", signupResponse);
            toast.error("Signup failed");
          }
        }
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error("Error during signup ,Please try again");
      }
    },
  });

  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("mobile_code", mobile_code);
    formik.setFieldValue("mobile_country_code", country_code);
    formik.setFieldValue("phone", phone);
    formik.setFieldError("phone", "");
    setValidation(isValid);
  };
  

  const [unitsOptions, setUnitsOptions] = useState([]);
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const { data } = await apiClient("unit", "get");
        console.log("udata", data);
        setUnitsOptions(data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);

  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    purchage_quantity: "",
    units: "",
    file: [],
  });

  const [filePreviews, setFilePreviews] = useState([]);
  const initialQuoteValues = {
    product_name: "",
    description: "",
    purchage_quantity: "",
    file: [],
    units: "",
  };
  const quoteValidationSchema = Yup.object().shape({
    product_name: Yup.string().required("Product Name is required"),
    description: Yup.string().required("Description is required"),
    purchage_quantity: Yup.number().required(
      "Purchase Quantity is required and should be number"
    ),
    units: Yup.string().required("Unit/Sets is required"),
  });

  const handleSubmitQuote = async (values, { setSubmitting, resetForm }) => {
    console.log("valuEs", values);
    // const token = getTokenFromCookies();
    let formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("purchage_quantity", values.purchage_quantity);
    formData.append("units", values.units);
    formData.append("description", values.description);

    if (values.file) {
      if (Array.isArray(values.file)) {
        values.file.forEach((file) => formData.append("file[]", file));
      } else {
        formData.append("file", values.file);
      }
    }
    if (!token) {
      toast.error("Token not found. Please login to continue.");
      setSubmitting(false);
      return;
    }

    // if (!token) {
    //   toast.error("Token not found. Please login to continue.");
    //   setSubmitting(false);
    //   return;
    // }

    try {
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const response = await apiClient(
        "front/contactUs",
        "post",
        {
          body: formData,
          Authorization: `Bearer ${token}`,
        },
        true
      );

      console.log("Response:", response);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error posting request:", error);
      toast.error("Error submitting form. Please try again..");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
    }).format(date);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient("blogs/getAll", "GET");
        setBlogs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const navigateHandler = (path: string) => {
    window.open(`/page/${path}`, "_blank", "noreferrer");
  };
  const handleCloseDialog = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchTradeShowData = async () => {
      try {
        const response = await apiClient("trade_show/admin_list", "GET");
        if (response.status === false) {
          throw new Error("Data fetch was unsuccessful");
        }
        setTradeShowData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchTradeShowData();
  }, []);
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const fetchAllProductsList = async () => {
    const userid = JSON.parse(localStorage.getItem("userData"))?.id;
    const currency = localStorage.getItem("currency") ?? 1;
    const body = {
      per_page: "8",
      page: 1,
      seller_id: "",
      user_id: userid || "",
    };
    const response = await apiClient(
      `front/product/list?per_page=20&currency=${currency}`,
      "GET"
    );
    const { data } = response;
    setData(data);
    dispatch(AddProductDetail({ status: false, loader: false, data: {} }));
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const handleChangeExpand =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({ duration: 1200 });
    }
  }, []);
  useEffect(() => {}, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.add("cms-body");
    fetchAllProductsList();
    return () => {
      document.body.classList.remove("cms-body");
    };
  }, []);

  if (!showContent) {
    return <Box sx={{ height: "100vh" }} />;
  }

  const handleSubmit = async (event) => {
    console.log("values", formData);
    event.preventDefault();
    const token = localStorage.getItem("Token");
    console.log("token is", token);
    try {
      console.log("formdataaaa", formData);
      const response = await apiClient("front/contactUs", "POST", {
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error posting request:", error);
    }
  };
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startDay = start.toLocaleString("en-US", { day: "2-digit" });
    const startMonth = start.toLocaleString("en-US", { month: "short" });
    const startYear = start.toLocaleString("en-US", { year: "numeric" });
    const endDay = end.toLocaleString("en-US", { day: "2-digit" });
    const endMonth = end.toLocaleString("en-US", { month: "short" });
    const endYear = end.toLocaleString("en-US", { year: "numeric" });

    return `${startMonth} ${startDay} - ${endMonth} ${endDay} , ${endYear}`;
  };
  /////////// COUNTEER=============
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
        <CounterIcon>{icon}</CounterIcon>
        <CounterNumber>{count}</CounterNumber>
        <CounterLabel>{label}</CounterLabel>
      </CounterBox>
    );
  };

  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      
      <BodyContentInfo>
        <PageContentInfo>
          <Heroslider />
          <SectionWhiteBox className="discover-business">
            <CommonEachSection>
              <Box className="mypagecontainer">
                <OurTopProducts>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="h4">Popular Products</Typography>
                        <Slider {...settingsProduct}>
                          {data.slice(0, 8)?.map((product, index) => (
                            <div key={index}>
                              <Box sx={{ margin: "0 5px" }}>
                                <ProductItem data={product} />
                              </Box>
                            </div>
                          ))}
                        </Slider>
                      </Grid>
                    </Grid>
                  </Box>
                </OurTopProducts>
              </Box>
            </CommonEachSection>
          </SectionWhiteBox>
          

          

          <SectionWhiteBox className="discover-business">
            <CommonEachSection>
              <Box className="mypagecontainer">
                {/* <LandingPageHeadings sx={{ textAlign: "center" }}>
                  Explore Opportunities to Grow Your Business
                </LandingPageHeadings> */}
                <OurTopProducts>
                  <Box>
                    <Grid container spacing={2}>
                      {/* <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
                        <Typography variant="h4">Top ranking</Typography>
                        {bigPostList?.length > 0 && (
                          <Box
                            key={"index"}
                            style={{
                              backgroundColor: "#FFF6F6",
                              borderRadius: "6px",
                            }}
                          >
                            {bigPostList.length > 1 ? (
                              <Slider {...settingsBigPost}>
                                {bigPostList?.map((bigPostElement, i) => {
                                  return (
                                    <Box
                                      sx={{ position: "relative" }}
                                      key={`Bigpost-${i}`}
                                    >
                                      <BigPostdummy data={bigPostElement} />
                                    </Box>
                                  );
                                })}
                              </Slider>
                            ) : (
                              bigPostList?.map((bigPostElement, i) => (
                                <Box
                                  sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                    "&:hover": {
                                      "& .BigPostFooter": {
                                        bottom: "0",
                                        boxShadow: "0 5px 11px #cccccc",
                                      },
                                    },
                                  }}
                                  key={`Bigpost1-${i}`}
                                >
                                  <BigPostdummy data={bigPostElement} key={i} />
                                </Box>
                              ))
                            )}
                          </Box>
                        )}
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={6} lg={7} xl={8}> */}
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="h4">New Arrivals</Typography>
                        <Slider {...settingsProduct}>
                          {data.slice(0, 8)?.map((product, index) => (
                            <div key={index}>
                              <Box sx={{ margin: "0 5px" }}>
                                <ProductItem data={product} />
                              </Box>
                            </div>
                          ))}
                        </Slider>
                      </Grid>
                    </Grid>
                  </Box>
                </OurTopProducts>
              </Box>
            </CommonEachSection>
          </SectionWhiteBox>

          

          
          
          <SectionColoredBox>
            <TestimonialBox>
              <Box className="mypagecontainer">
                <LandingPageHeadings sx={{ textAlign: "center" }}>
                  Client Testimonials
                </LandingPageHeadings>
                <TestimonialSlider>
                  <Slider {...settingsTestimonial}>
                    {testimonials.map((testimonial, index) => (
                      <TestimonialDataOuter key={index}>
                        <TestimonialDataMainBox>
                          <img
                            src="/assets/images/landing-page/Quotes.png"
                            alt="quote"
                            className="quoteimg"
                          />
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="testi-image"
                          />
                          <TestimonialDataBox>
                            <Typography variant="body1">
                              {testimonial.quote}
                            </Typography>
                            <Typography variant="h6">
                              {testimonial.name}
                            </Typography>
                            <Typography variant="subtitle2">
                              {testimonial.title}
                            </Typography>
                          </TestimonialDataBox>
                        </TestimonialDataMainBox>
                      </TestimonialDataOuter>
                    ))}
                  </Slider>
                </TestimonialSlider>
              </Box>
            </TestimonialBox>
            <SectionWhiteBox className="Bgred">
              <Box className="mypagecontainer">
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Box>
                      <LandingPageHeadings className="textWhite">
                        Ready to get started?
                      </LandingPageHeadings>
                      <GetStarted>
                        Explore millions of products from trusted suppliers by
                        signing up today!
                      </GetStarted>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <SignUpBtnBox
                      onClick={() => {
                        router.push("/user/signup");
                      }}
                    >
                      <SignUpBtn>Sign Up</SignUpBtn>
                    </SignUpBtnBox>
                  </Grid>
                </Grid>
              </Box>
            </SectionWhiteBox>
          </SectionColoredBox>
          

          <FixedForm
            sx={{
              transform: `${isOpen ? "translateX(100%)" : "translateX(0)"}`,
            }}
          >
            <BannerFormData>
              {/* <FormCrossbtn>
                <QuickSignupButton
                  onClick={handleCloseDialog}
                  sx={{
                    height: isOpen ? "150px" : "50px",
                    overflow: "hidden",
                    transition: "height 0.3s ease",
                    "@media screen and (max-width:899px)": {
                      height: isOpen ? "130px" : "40px",
                      padding: "6px 1px",
                    },
                  }}
                >
                  <MenuIcon />
                  {isOpen && (
                    <Typography
                      sx={{
                        writingMode: "vertical-rl",
                        whiteSpace: "nowrap",
                        width: "max-content",
                      }}
                    >
                      Quick Signup
                    </Typography>
                  )}
                </QuickSignupButton>
              </FormCrossbtn> */}
              {/*  */}
              <BannerFormInner>
                <Typography variant="h4">Quick Signup</Typography>
                <Typography variant="body2">
                  The quick signup from includes fields for
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 1, md: 2 }}>
                    <Grid item xs={12}>
                      <FormControl size="small" fullWidth>
                        <FieldLabel>Full Name</FieldLabel>
                        <TextField
                          size="small"
                          fullWidth
                          // required
                          variant="outlined"
                          placeholder="Please enter full name"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.errors.name && formik.touched.name
                          )}
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl size="small" fullWidth>
                        <FieldLabel>Please enter Email Address</FieldLabel>
                        <TextField
                          size="small"
                          fullWidth
                          // required
                          placeholder="Email Address"
                          variant="outlined"
                          type="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.errors.email && formik.touched.email
                          )}
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl size="small" fullWidth>
                        <FieldLabel>Please enter Mobile No</FieldLabel>
                        <MobileInputCommon
                          inputRef={mobileRef}
                          mobileNumber={formik?.values?.phone}
                          mobileCode={formik?.values?.mobile_code}
                          mobileCountryCode={
                            formik?.values?.mobile_country_code
                          }
                          handleChange={setMobileNumber}
                          // helperText={formik.errors.phone}
                          helperText={
                            formik.touched.phone && formik.errors.phone
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <StyledButtonBox>
                    <StyledButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{ padding: "10px" }}
                    >
                      Submit
                    </StyledButton>
                  </StyledButtonBox>
                </Box>
              </BannerFormInner>
            </BannerFormData>
          </FixedForm>
        </PageContentInfo>
      </BodyContentInfo>
      {/* <FooterPage /> */}
    </Box>
  );
}
