import { apiClient } from "@/components/common/common";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { Grid, Link, Slider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { formatDate } from "../common/common";
import { BlogImgBox, BlogReadMore, CenterDes, CommonEachSection, LandingNewsItem, LandingNewsSection, LandingPageHeadings, MainFeedAear, TestimonialBox, TestimonialDataBox, TestimonialDataMainBox, TestimonialDataOuter, TestimonialSlider } from "../guestLayout/landingPage/styles";
import {
  Aboutbackground,
  AboutcompanyTwo,
  BannerTxt,
  Bgimage,
  HeadingBig,
  HeadingBigSub,
  Invisiblebg,
  Li,
  Nextsection,
  SectionColoredBox,
  Sectionheading,
  Sectionpara,
  SectionSubheading,
  SectionWhiteBox,
  TestiminialButton,
  Textoverimg1,
  Ul
} from "./style";

export default function Aboutus() {
  useEffect(() => {
    document.body.classList.add("cms-body");
    return () => {
      document.body.classList.remove("cms-body");
    };
  });

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

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box>
            <Bgimage>
              <BannerTxt>
                <Box>
                  <Textoverimg1 variant="h1">About Us</Textoverimg1>
                </Box>
              </BannerTxt>
            </Bgimage>
          </Box>
        </Grid>
      </Grid>

      <Aboutbackground container spacing={3} sx={{ py: 10 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box>
            <img
              // src="/assets/aboutuslaptop.png"
              src="/about-us-featured.png"
              alt="about company"
              style={{ width: "100%" }}
            />
          </Box>
        </Grid>
        <AboutcompanyTwo item xs={12} sm={12} md={6} lg={6} xl={6} px={10}>
          <Sectionheading>ABOUT COMPANY</Sectionheading>
          <SectionSubheading>
            India's largest online B2B marketplace for Small & Medium Size
          </SectionSubheading>
          <Sectionpara>
            India's largest online B2B marketplace for Small & Medium Size Businesses, connecting global buyers with suppliers. The company offers a platform & tools to over 1.2 million suppliers to generate business leads from over 6.5 million buyers, who use the platform to find reliable & competitive suppliers. The company has over 2800 employees located across 60+ offices in the country.

            MerchantAd.com offers products that enable small & medium size businesses generate business leads (online catalogs/store-fronts), establish their credibility (third party verified trust profile) and use business information (finance, news, trade shows, tenders) for their business promotion. 

            MerchantAd.com has won numerous awards and significant nominations over the years, which include coveted Red Herring Award and Emerging India Award respectively among others. The company has also been widely covered by media for its pioneering role in promoting SME business in the country and for its innovative use of technology in the B2B space.
            
          </Sectionpara>
        </AboutcompanyTwo>
      </Aboutbackground>

      {/* <Pagecontent>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <SliderMainBox>
                <SliderboxDots>
                  <Sliderboxstyle></Sliderboxstyle>
                  <Sliderboxstyle></Sliderboxstyle>
                  <Sliderboxstyle></Sliderboxstyle>
                </SliderboxDots>
              </SliderMainBox>
              <Box sx={{ textAlign: "center", marginTop: "30px" }}>
                <Redtext>Merchant AD</Redtext>
                <Subheading>
                  Source and Procure materials with highly efficient platform.
                </Subheading>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              textAlign="center"
              sx={{ display: "flex", alignItems: "stretch" }}
            >
              <Boxcontent>
                <Icons src="/assets/section3.svg" alt="quality drive star" />
                <Headings>Customer relationship</Headings>
                <Headingtexts>
                  Within a one window frame, view all your enquiries sent &
                  received, Ongoing projects, existing purchases & orders, and
                  previous orders. Engage people from management, sales,
                  marketing, to customers for seamlessly executing orders and
                  purchases.
                </Headingtexts>
              </Boxcontent>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              textAlign="center"
              sx={{ display: "flex", alignItems: "stretch" }}
            >
              <Boxcontent>
                <Icons src="/assets/section2.svg" alt="customer focused" />
                <Headings>AI Driven Tools Integrated</Headings>
                <Headingtexts>
                  Up-selling and cross-selling been never easier with AI driven
                  tools integrated with Product listings to hand out curated
                  list of products & services. Automate follow ups, calls,
                  messages, develop whole sales & marketing management system in
                  our platform!
                </Headingtexts>
              </Boxcontent>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              textAlign="center"
              sx={{ display: "flex", alignItems: "stretch" }}
            >
              <Boxcontent>
                <Icons src="/assets/section1.svg" alt="global sourcing" />
                <Headings>End To End Seamless</Headings>
                <Headingtexts>
                  Draft your product details & publish posts; Run
                  advertisements, get access to countless marketing tools &
                  strategies. We help to channel products in the right business
                  area, with minimal follow ups, in a seamless end to end
                  high-tech platform; all at a never seen lower subscription
                  costs.
                </Headingtexts>
              </Boxcontent>
            </Grid>
          </Grid>
        </Container>
      </Pagecontent> */}

      <SectionWhiteBox>
                  <CommonEachSection>
                    <LandingNewsSection className="mypagecontainer">
                      <LandingPageHeadings>Business Blogs</LandingPageHeadings>
                      <CenterDes>
                        Get tips, insights and inspiration to help you build a
                        thriving business
                      </CenterDes>
                      <MainFeedAear>
                        <Grid container spacing={3}>
                          {Array.isArray(blogs) && blogs.length > 0 ? (
                            blogs.slice(0, 4).map((blog) => (
                              <Grid item xs={12} sm={6} md={3} key={blog.id}>
                                <LandingNewsItem>
                                  <BlogImgBox>
                                    <img
                                      src={
                                        blog.gallery?.length > 0
                                          ? blog.gallery[0].source
                                          : "/assets/images/landing-page/blog-image-1.webp"
                                      }
                                      alt={blog.title || "Blog"}
                                    />
                                  </BlogImgBox>
      
                                  <Typography className="datePlace">
                                    {formatDate(blog.created_at)}
                                  </Typography>
      
                                  <Typography variant="h4">{blog.title}</Typography>
      
                                  <Typography variant="body1">
                                    {blog.short_description || "Coming soon"}
                                  </Typography>
      
                                  <BlogReadMore>
                                    <Link underline="hover" href={`/blog/${blog.slug}`}>
                                      Read More <EastRoundedIcon />
                                    </Link>
                                  </BlogReadMore>
                                </LandingNewsItem>
                              </Grid>
                            ))
                          ) : (
                            <Grid item xs={12}>
                              <Typography align="center" variant="body1">
                                No blogs found.
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
      
                      </MainFeedAear>
                    </LandingNewsSection>
                  </CommonEachSection>
      </SectionWhiteBox>


      <Invisiblebg container spacing={2} px={10}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box>
            <HeadingBig>
              Merchant AD - Your Gateway to Global B2B Trade and Growth
            </HeadingBig>
            <HeadingBigSub>
              Empowering Businesses with Seamless Sourcing, Selling, and
              Growth Opportunities
            </HeadingBigSub>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <Nextsection>
              Unlock Global Opportunities with Merchant AD
            </Nextsection>
            <Ul>
              <Li>Participate in bids, projects across the world.</Li>
              <Li>
                Engage and vet enquiries handed over to you on daily basis.
              </Li>
              <Li>
                Get quotes, tailor-made solutions from industry leading
                companies.
              </Li>
            </Ul>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} lg={6} xl={6} md={6}>
          <Box>
            <img
              src="/assets/foraboutus2.png"
              alt="our mission"
              width={"100%"}
              style={{ borderRadius: "12px" }}
            />
          </Box>
        </Grid>
      </Invisiblebg>

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
      </SectionColoredBox>
    </>
  );
}

