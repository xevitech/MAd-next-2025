import { Search as SearchIcon } from "@mui/icons-material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import {
    Collapse,
    Grid,
    IconButton,
    InputAdornment,
    styled,
    TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import * as Yup from "yup";
import {
    BannerBoxSearch,
    BannerImageBox,
    ButtonoverCard,
    ButtonText,
    ChatColumnImage,
    CheckRow,
    CheckSection,
    CircleShape,
    CircleShapeRight,
    ClickHereBox,
    ColumnGap,
    ColumnImage,
    ColumnStack,
    CommonQuestionBox,
    Content,
    CRMColumnStack,
    EmainChatBoxOuter,
    EngagementAnalyticsBox,
    FlexBoxforchat,
    GrowBusinessSec,
    Imageborder,
    ImageSliderScreen,
    LearnMoreBox,
    LeftSection,
    Livechat,
    LiveChatInfo,
    LiveChatinnBox,
    LiveChatinnData,
    Livechatparagraph,
    Onlinechat,
    PageHeadingDes,
    PageMainHead,
    PagePerSection,
    PageSubHead,
    Realtime,
    Realtimespan,
    SectionPageHeadings,
    SectionPageText,
    SellerBannerContainer,
    SellerCommonContainer,
    SellerPageBody,
    Shadesbg,
    SimplyComBoxLeft,
    SimplyCompleHead,
    SimplyCompleRight,
    Skewimage2,
    Skewimageinsidepadding,
    SliderScreenSection,
    Startsellingbutton,
    StepCardCon,
    StepCardInn,
    TestiminialButton,
    TextLayer,
    TotalCountBox,
    TotalCountCol,
    TypographyBorderline,
    VideoContainer,

    VideoContent,
    VideoDescription,
    VideoIframeBox,
    WatchButton,
    Weeasy
} from "./sellerStyle";
const images = [
    "/assets/images/landing-page/laptop-slide1.jpg",
    "/assets/images/landing-page/laptop-slide1.jpg",
];

const videos = [
    {
        name: "John Neal",
        image: "https://img.youtube.com/vi/VIDEO_ID_1/0.jpg",
        videoLink: "https://www.youtube.com/watch?v=VIDEO_ID_1",
    },
    {
        name: "Larry Culp",
        image: "https://img.youtube.com/vi/VIDEO_ID_2/0.jpg",
        videoLink: "https://www.youtube.com/watch?v=VIDEO_ID_2",
    },
    {
        name: "Anil Rai Gupta",
        image: "https://img.youtube.com/vi/VIDEO_ID_3/0.jpg",
        videoLink: "https://www.youtube.com/watch?v=VIDEO_ID_3",
    },
];



const sections = [
    { title: "Your Virtual Store", content: "Detailed description of Virtual Store." },
    { title: "Dynamic Pricing Tool", content: "Explanation of dynamic pricing." },
    { title: "Auto Quoting Setup", content: "How the quoting system works." },
    { title: "Pricing Engine", content: "Details on price calculations." },
    { title: "Buyer Database", content: "Information on buyer network." },
];

import { apiClient } from "@/components/common/common";
import { AddProductDetail } from "@/hooks/productDetailsReducer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SelectChangeEvent } from "@mui/material/Select";
import AOS from "aos";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import ChatWindow from "@/components/Chat";
import { landingPage } from "@/utils/constantImages";
import { getTokenFromCookies } from "@/utils/cookieUtils";

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';

import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
const Item = styled(Box, {
    shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
    padding: "24px 15px",
    borderLeft: active ? "3px solid #d7282f" : "3px solid transparent",
    cursor: "pointer",
    fontWeight: "bold",
    margin: "0 -3px 0",

}));
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

const StepsContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginTop: "40px",
});

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    // borderLeft: `3px solid #d7282f`,
    margin: "10px",
    "&:not(:last-child)": {
        // borderBottom: 0,
    },
    "&::before": {
        display: "none",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
        "& svg": {
            fontSize: "15px",
        },
    },
    "& .MuiAccordionSummary-root": {
        borderLeft: `4px solid #d7282f`,
    },
    "& .MuiAccordionDetails-root": {
        padding: "7px",
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
    // flexDirection: 'row-reverse',
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: 'rotate(90deg)',
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
    "& .MuiTypography-body1": {
        color: "#231F20",
        fontWeight: 600,
        fontSize: "18px"
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));


const NumberCircle = styled(Typography)(({ theme }) => ({
    fontSize: "60px",
    fontWeight: "bold",
    color: theme.palette.primary.main,
}));

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
export default function SellerHome(props: any) {
    const { defaultValues } = props;
    const [showTotal, setShowTotal] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [bigPostList, setBigPostList] = useState([]);
    const [age, setAge] = useState("");
    // const [expanded, setExpanded] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [tradeShowData, setTradeShowData] = useState([]);
    const [token, setToken] = useState(null);
    const { defaultCode } = useSelector((state: any) => state.geoLocation);
    const mobileRef = useRef(null);
    const [validate, setValidation] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(1);
    const [expanded, setExpanded] = React.useState<string | false>('panel1');


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

        return () => { };
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
    useEffect(() => { }, []);

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
    const expandableItems = [
        {
            id: 1,
            title: "Your Virtual Store",
            content:
                "It's definitely not what we want to see happen, and we try to prevent it in a number of ways. For example, if you spell something wrong, we have systems to detect those misspellings and provide proper spelling predictions.",
        },
        { id: 2, title: "Dynamic Pricing Tool", content: "Content for Dynamic Pricing Tool." },
        { id: 3, title: "Auto Quoting Setup", content: "Content for Auto Quoting Setup." },
        { id: 4, title: "Pricing Engine", content: "Content for Pricing Engine." },
        { id: 5, title: "Buyer Database", content: "Content for Buyer Database." },
    ];

    /////// Seller files //////////////////////
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
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
    const stepData = [
        { number: "1", title: "Global market", desc: "Share your product details..." },
        { number: "2", title: "Lead & opportunities", desc: "Get multiple leads..." },
        { number: "3", title: "Close Deals", desc: "With our one-stop portal..." },
        { number: "4", title: "Manage Order", desc: "Multiple buyer leads and orders..." },
    ];



    const handleChangeQ =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };


    return (
        <SellerPageBody>
            <HeaderPage />
            {/* <ChatWindow /> */}
            <SellerBannerContainer>
                <SellerCommonContainer>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={12} md={6}>
                            <Typography variant="h2" data-aos="fade-up" data-aos-delay="100">
                                Sell on Merchant AD
                            </Typography>
                            <Typography
                                variant="h1"
                                gutterBottom
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                Sell online to worldwide customers with <br />enhanced tools and features
                            </Typography>
                            <Typography variant="body1" data-aos="fade-up" data-aos-delay="300">
                                Post your products at Merchant AD and grow your business across world
                            </Typography>
                            <BannerBoxSearch>
                                <TextField
                                    variant="outlined"
                                    placeholder="Enter product, model, manufacturer, category etc..."
                                    sx={{
                                        width: "80%",
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton>
                                                    <SearchIcon sx={{ color: "#fff" }} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Startsellingbutton>Start Selling</Startsellingbutton>
                            </BannerBoxSearch>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <BannerImageBox>
                                <img src="/assets/images/landing-page/seller-bannerright.png" alt="" title="" />
                            </BannerImageBox>
                        </Grid>
                    </Grid>
                </SellerCommonContainer>
            </SellerBannerContainer>
            <TotalCountBox>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={3}>
                        <TotalCountCol>
                            <CounterItem
                                icon={
                                    <img
                                        src="../assets/images/landing-page/total-count-1.svg"
                                        width="40"
                                        height="40"
                                        alt="total-count"
                                    />
                                }
                                target={2000}
                                label="Products"
                            />
                        </TotalCountCol>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <TotalCountCol>
                            <CounterItem
                                icon={
                                    <img
                                        src="../assets/images/landing-page/total-count-2.svg"
                                        width="40"
                                        height="40"
                                        alt="total-count"
                                    />
                                }
                                target={1000}
                                label="Suppliers"
                            />
                        </TotalCountCol>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <TotalCountCol>
                            <CounterItem
                                icon={
                                    <img
                                        src="../assets/images/landing-page/total-count-1.svg"
                                        width="40"
                                        height="40"
                                        alt="total-count"
                                    />
                                }
                                target={12000}
                                label="Product Categories"
                            />
                        </TotalCountCol>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <TotalCountCol>
                            <CounterItem
                                icon={
                                    <img
                                        src="../assets/images/landing-page/total-count-1.svg"
                                        width="40"
                                        height="40"
                                        alt="total-count"
                                    />
                                }
                                target={4000}
                                label="countries and regions"
                            />
                        </TotalCountCol>
                    </Grid>
                </Grid>
            </TotalCountBox>
            <PagePerSection>
                <SliderScreenSection>
                    <PageSubHead>Merchant AD | You Can create products</PageSubHead>
                    <PageMainHead>Add your product details and advertise within minutes !!!</PageMainHead>
                    <PageHeadingDes>Got multiple variants of A product? Don’t worry, we got you covered with our integrated product addition tool</PageHeadingDes>
                </SliderScreenSection>
                <ImageSliderScreen>
                    <Box sx={{ overflow: "hidden" }}>
                        <img src="/assets/images/landing-page/laptop-screen.png" alt="Laptop" style={{ width: "100%", maxWidth: "900px" }} />
                    </Box>
                    <div

                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "50%",
                            transform: "translate(-50%, 0)",
                            width: "31%",
                        }}
                    >
                        <Slider {...settings}>
                            {images.map((src, index) => (
                                <img key={index} src={src} alt={`Slide ${index + 1}`} />
                            ))}

                        </Slider>
                    </div>
                </ImageSliderScreen>
            </PagePerSection>
            <PagePerSection className="pinksection">
                <PageSubHead><span>Merchant AD</span> | SELLER PORTAL</PageSubHead>
                <PageMainHead>Grow your business with the best suite tools</PageMainHead>
                <PageHeadingDes>Now, giving your product the global market has become very simple. Follow below for professional and dynamic tools.</PageHeadingDes>
                <GrowBusinessSec>
                    <Grid container spacing={4} mt={8} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <LeftSection>
                                {expandableItems.map((item) => (
                                    <Box key={item.id}>
                                        <Item
                                            active={activeIndex === item.id}
                                            onClick={() => setActiveIndex(item.id)}
                                        >
                                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                                {item.id < 10 ? `0${item.id}` : item.id} {item.title}
                                            </Typography>
                                        </Item>
                                        <Collapse in={activeIndex === item.id} timeout="auto" unmountOnExit>
                                            <Content>{item.content}</Content>
                                        </Collapse>
                                    </Box>
                                ))}
                            </LeftSection>
                        </Grid>
                        <Grid item xs={12} md={6} textAlign="center">
                            <img src="/assets/images/landing-page/Grow.png" alt="Details" style={{ width: "90%", borderRadius: "5px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }} />
                        </Grid>
                    </Grid>
                </GrowBusinessSec>
            </PagePerSection>
            <PagePerSection className="whitesection">
                <PageSubHead><span>Merchant AD</span></PageSubHead>
                <PageMainHead>How It <span>Works</span></PageMainHead>
                <PageHeadingDes>Choosing the best product type ensures that you see the most appropriate data fields for your product. Browse the product types directly or use searches. <br /> With over 150,000 manufacturers, wholesalers, and distributors selling on the platform, you can find or create anything you’re looking for. </PageHeadingDes>
                <StepCardCon>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3} >
                            <div className="Card-1">
                                <StepCardInn data-aos="fade-up" data-aos-delay="100">
                                    <p className=" oddNo">1</p>
                                    <h4><span>Global</span> market</h4>
                                    <p>Share your product details and publish them for global buyers and resellers.</p>
                                    <CircleShape></CircleShape>
                                </StepCardInn>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                            <div className="Card-2" >
                                <StepCardInn data-aos="fade-down" data-aos-delay="200">
                                    <h4><span>Lead &</span> opportunities</h4>
                                    <p>Get multiple leads and opportunities from our extensive database floated directly to your dashboard.
                                    </p>
                                    <p className=" evenNo">2</p>
                                </StepCardInn>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                            <div className="Card-3" >
                                <StepCardInn data-aos="fade-up" data-aos-delay="300">
                                    <p className=" oddNo">3</p>
                                    <h4><span>Close</span> Deals</h4>
                                    <p>With our one-stop portal, quote, negotiate, close deals in clicks away.</p>
                                </StepCardInn>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                            <div className="Card-4">
                                <StepCardInn data-aos="fade-down" data-aos-delay="400">
                                    <h4><span>Manage</span> Order</h4>
                                    <p>Multiple buyer leads and orders are categorized in our CRM portal. Get access to them for a
                                        hassle-free virtual experience.</p>
                                    <p className=" evenNo">4</p>
                                    <CircleShapeRight></CircleShapeRight>
                                </StepCardInn>
                            </div>
                        </Grid>
                    </Grid>
                </StepCardCon>

            </PagePerSection>


            <PagePerSection className="pinksection">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={5}>
                        <ColumnImage>
                            <Slider {...settingsCrm}>
                                <div>
                                    <img
                                        src={landingPage?.crmimage1}
                                        alt="Slide 1"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                                <div>
                                    <img
                                        src={landingPage?.crmimage2}
                                        alt="Slide 2"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                                <div>
                                    <img
                                        src={landingPage?.crmimage3}
                                        alt="Slide 3"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            </Slider>
                        </ColumnImage>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                        <ColumnGap data-aos="fade-up" data-aos-delay="100">
                            <CRMColumnStack>
                                <SectionPageHeadings className="leftHeading">
                                    What is Merchant AD CRM?
                                </SectionPageHeadings>
                                <SectionPageText>
                                    Merchant AD’s CRM is a custom-built solution designed
                                    to simplify and enhance business interactions.
                                    Tailored for B2B companies in the energy, power
                                    generation, oil & gas, and water management sectors,
                                    our CRM empowers you to efficiently manage leads,
                                    track customer engagement, and build stronger
                                    relationships. With intuitive features like real-time
                                    analytics, automated workflows, and seamless
                                    integration into our platform, businesses can
                                    streamline their sales cycles and maximize growth.
                                    Merchant AD CRM ensures that every client interaction
                                    is organized, insightful, and actionable, allowing you
                                    to stay ahead in today's competitive market.
                                </SectionPageText>
                                <CheckSection>
                                    <CheckRow>
                                        <CheckCircleRoundedIcon />
                                        <Box>
                                            <span>Lead Management:</span>
                                            <Typography>
                                                Easily organize, track, and nurture leads for
                                                better conversions and growth.
                                            </Typography>
                                        </Box>
                                    </CheckRow>

                                    <CheckRow>
                                        <CheckCircleRoundedIcon />
                                        <Box>
                                            <span>Automated Workflows</span>
                                            <Typography>
                                                Save time with automatic processes that
                                                streamline sales and customer engagement.
                                            </Typography>
                                        </Box>
                                    </CheckRow>

                                    <CheckRow>
                                        <CheckCircleRoundedIcon />
                                        <Box>
                                            <span>Real-Time Insights</span>
                                            <Typography>
                                                Make data-driven decisions with instant access
                                                to customer interactions and analytics
                                            </Typography>
                                        </Box>
                                    </CheckRow>
                                </CheckSection>
                            </CRMColumnStack>
                        </ColumnGap>
                    </Grid>
                </Grid>
            </PagePerSection>

            <PagePerSection className="whitesection">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={5}>
                        <ColumnStack>
                            <SectionPageHeadings className="leftHeading">
                                Live Chat: Resolve up to 80% of cases
                            </SectionPageHeadings>
                            <SectionPageText>
                                Merchant AD’s Live Chat enables real-time support,
                                allowing businesses to resolve up to 80% of inquiries
                                instantly and efficiently.
                            </SectionPageText>
                            <LiveChatInfo>
                                <LiveChatinnData>
                                    <img
                                        src="../assets/images/landing-page/live-chat1.svg"
                                        width="20"
                                        height="21"
                                        alt="live-chat"
                                    />
                                    <LiveChatinnBox>
                                        <Typography variant="h3">
                                            Instant Response Time
                                        </Typography>
                                        <Typography variant="body1">
                                            Address customer concerns in real time, reducing
                                            wait times and improving overall user satisfaction
                                            and retention.
                                        </Typography>
                                    </LiveChatinnBox>
                                </LiveChatinnData>

                                <LiveChatinnData>
                                    <img
                                        src="../assets/images/landing-page/live-chat2.svg"
                                        width="20"
                                        height="21"
                                        alt="live-chat"
                                    />
                                    <LiveChatinnBox>
                                        <Typography variant="h3">
                                            Personalized Support
                                        </Typography>
                                        <Typography variant="body1">
                                            Provide tailored solutions by connecting users
                                            directly with experts, ensuring each query is
                                            handled with care and precision, enhancing
                                            customer trust.
                                        </Typography>
                                    </LiveChatinnBox>
                                </LiveChatinnData>
                                <LiveChatinnData>
                                    <img
                                        src="../assets/images/landing-page/live-chat3.svg"
                                        width="20"
                                        height="24"
                                        alt="live-chat"
                                    />
                                    <LiveChatinnBox>
                                        <Typography variant="h3">
                                            Seamless Integration
                                        </Typography>
                                        <Typography variant="body1">
                                            Our live chat integrates with Merchant AD’s CRM,
                                            ensuring all interactions are logged and easily
                                            accessible for future follow-up.
                                        </Typography>
                                    </LiveChatinnBox>
                                </LiveChatinnData>
                            </LiveChatInfo>
                        </ColumnStack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1}></Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <ChatColumnImage>
                            <img
                                src="/assets/images/landing-page/live-chat-image.webp"
                                width="100%"
                                height="100%"
                                alt="chat"
                            />
                        </ChatColumnImage>
                    </Grid>
                </Grid>
            </PagePerSection>
            <PagePerSection className="pinksection SimplyComBoxSection">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <SimplyComBoxLeft>
                            <SimplyCompleHead>
                                Simplify Complex Pricing with Our <br />
                                Built-in Product Calculator..
                            </SimplyCompleHead>
                            <img
                                src="/assets/images/landing-page/complex-price-img.png" alt="Simplify Complex Pricing" className="complex-price-img"
                            />
                        </SimplyComBoxLeft>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <SimplyCompleRight>
                            <LiveChatinnData>
                                <img
                                    src="../assets/images/landing-page/simply-img1.svg"
                                    alt="Image"
                                />
                                <LiveChatinnBox>
                                    <Typography variant="h3">
                                        Automated Calculations
                                    </Typography>
                                    <Typography variant="body1">
                                        Handle complex pricing equations with ease.
                                    </Typography>
                                </LiveChatinnBox>
                            </LiveChatinnData>

                            <LiveChatinnData>
                                <img
                                    src="../assets/images/landing-page/simply-img2.svg"
                                    alt="Image"
                                />
                                <LiveChatinnBox>
                                    <Typography variant="h3">
                                        Dynamic Inputs
                                    </Typography>
                                    <Typography variant="body1">
                                        Adjust  the parameters like material costs, energy rates, or logistics fees to see real-time price updates.
                                    </Typography>
                                </LiveChatinnBox>
                            </LiveChatinnData>
                            <LiveChatinnData>
                                <img
                                    src="../assets/images/landing-page/simply-img3.svg"
                                    alt="Image"
                                />
                                <LiveChatinnBox>
                                    <Typography variant="h3">
                                        Time-Saving Efficiency
                                    </Typography>
                                    <Typography variant="body1">
                                        No more manual errors—get accurate results instantly.
                                    </Typography>
                                </LiveChatinnBox>
                            </LiveChatinnData>

                            <LiveChatinnData>
                                <img
                                    src="../assets/images/landing-page/simply-img4.svg"
                                    alt="Image"
                                />
                                <LiveChatinnBox>
                                    <Typography variant="h3">
                                        Tailored for Sellers in Energy & Power
                                    </Typography>
                                    <Typography variant="body1">
                                        Designed specifically to meet the needs of sellers in the power and energy sectors.
                                    </Typography>
                                </LiveChatinnBox>
                            </LiveChatinnData>
                        </SimplyCompleRight>


                    </Grid>
                </Grid>
            </PagePerSection>
            <PagePerSection className="whitesection">
                <PageMainHead>Engagement <span>Analytics</span></PageMainHead>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={12} md={7}>
                        <EngagementAnalyticsBox>
                            <img
                                src="/assets/images/landing-page/Revenue.jpg" alt="Revenue"
                            />
                        </EngagementAnalyticsBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        <SectionPageHeadings>
                            Curabitur pretium ante id diam rhoncus, a efficitur lorem tempus.
                        </SectionPageHeadings>
                        <SectionPageText>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </SectionPageText>
                    </Grid>
                </Grid>
            </PagePerSection>
            <PagePerSection className="pinksection">
                <PageMainHead>Why sellers advise <span>Merchant AD</span></PageMainHead>
                <SellerCommonContainer>
                    <Grid container spacing={2}>
                        {videos.map((video, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <VideoContainer>
                                    <VideoIframeBox>
                                        <iframe width="500" height="500" src="https://www.youtube.com/embed/DmOZEt9DwRE" title="Oil and Gas 101: Offshore Drilling at Woodside" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                                    </VideoIframeBox>
                                    <VideoContent>
                                        {/* <VideoName variant="h6">{video.name}</VideoName> */}
                                        <VideoDescription variant="body2">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                                        </VideoDescription>
                                        <WatchButton href={video.videoLink} target="_blank">Watch Video &gt;</WatchButton>
                                    </VideoContent>
                                </VideoContainer>
                            </Grid>
                        ))}
                    </Grid>
                </SellerCommonContainer>
            </PagePerSection>
            <PagePerSection className="whitesection">
                <PageMainHead>Common  <span>Questions</span></PageMainHead>
                <SellerCommonContainer>
                    <CommonQuestionBox>
                        <div>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChangeQ('panel1')}>
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                    <Typography>Q: How do I register as a MerchantAD supplier in the system?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        A: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChangeQ('panel2')}>
                                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                    <Typography>Q: How can we be assured that you will deliver us quality machine with spare parts ? </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                        sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChangeQ('panel3')}>
                                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                    <Typography>Q: Can you manufacture the roll forming machine according to my profile drawing or picture of finished product ?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                        sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel4'} onChange={handleChangeQ('panel4')}>
                                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                                    <Typography>Q: How do I register as a MerchantAD supplier in the system?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        A: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel5'} onChange={handleChangeQ('panel5')}>
                                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                                    <Typography>Q: How can we be assured that you will deliver us quality machine with spare parts ? </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                        sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel6'} onChange={handleChangeQ('panel6')}>
                                <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                                    <Typography>Q: Can you manufacture the roll forming machine according to my profile drawing or picture of finished product ?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                        sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </CommonQuestionBox>
                </SellerCommonContainer>
            </PagePerSection>
            <Shadesbg>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Skewimage2>
                            <Skewimageinsidepadding>
                                <Box>
                                    <Realtime>
                                        24/7 <Realtimespan>real-time</Realtimespan> support.
                                    </Realtime>
                                    <Weeasy>
                                        An easy way to post your sourcing requests and get quotes.
                                    </Weeasy>
                                </Box>
                                <EmainChatBoxOuter>
                                    <TextLayer>
                                        <TaskAltOutlinedIcon />
                                        Email, Chat, call Support
                                    </TextLayer>
                                    <TextLayer>
                                        <TaskAltOutlinedIcon />
                                        Email, Chat, call Support
                                    </TextLayer>
                                </EmainChatBoxOuter>

                                <LearnMoreBox>
                                    <ButtonoverCard>
                                        <ArrowCircleRightOutlinedIcon
                                            sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                                        />
                                        <ButtonText>Learn More</ButtonText>
                                        <TypographyBorderline
                                            component="span"
                                        ></TypographyBorderline>
                                    </ButtonoverCard>
                                </LearnMoreBox>
                            </Skewimageinsidepadding>
                        </Skewimage2>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={6}
                        xl={6}
                        sx={{
                            display: "flex",
                            alignItems: "start",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <FlexBoxforchat>
                            <Box>
                                <Imageborder>
                                    <img src="/assets/buyerchatsvg.svg" alt="" />
                                </Imageborder>
                            </Box>
                            <Box>
                                <Onlinechat>Online Chat</Onlinechat>
                                <Livechat>Live Chat Now</Livechat>
                                <Box sx={{ marginTop: "20px" }}>
                                    <Livechatparagraph>
                                        Merchant AD supplier support is available to solve all
                                        your doubts and issues at any point in <br /> your online
                                        selling business.
                                    </Livechatparagraph>
                                </Box>
                            </Box>
                        </FlexBoxforchat>
                        <ClickHereBox>
                            <ButtonoverCard>
                                <ArrowCircleRightOutlinedIcon
                                    sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                                />
                                <ButtonText>Click Here</ButtonText>
                                <TypographyBorderline
                                    component="span"
                                ></TypographyBorderline>
                            </ButtonoverCard>
                        </ClickHereBox>
                    </Grid>
                </Grid>
            </Shadesbg>
            <FooterPage />
        </SellerPageBody>
    );
}
