import { Box, Typography, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AboutHeading, AboutLastSection, AboutLastSectionBox, AboutSection, AboutSubHeading, Aboutcontent, BannerBox, BannerTxt, Bgimage, Boxborder, BrandHeading, BrandSubHeading, ButtonBox, DateandIcon, HeadingBox, HeadingContent, Headingtext, Imagebox, NameandDateBox, Outerborderbox, PeronNameIcon, RelatedNewBox, RelatedNewBoxContent, RelatedOuterBox, SliderBox, SliderBoxText, SliderStyle, Spantext, Spantext2, Startext, Subtext, Textoverimg1, Textoverimg2, Textoverimg3, Textoverimg3Box, Textoverimg4, Textoverimg4InnerBox, Textoverimg4OuterBox, ViewMoreButton, ViewMoreLess } from './style'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import SellerProducts from '../ProductDetail/ProductComponents/SellerProducts';
import { setProductList } from "@/hooks/UseProductListContext";
import ProductItem from '../ProductsListing/ProductItem';
import { apiClient } from '../common/common';
import { useAppDispatch } from 'redux/store';
import { useRouter } from 'next/router';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function SectorsList() {
  const { productsList } = useSelector((state: any) => state.productList);
  const normalPostList = productsList;
  const dispatch = useAppDispatch();
  const { query } = useRouter();

  const filterProductList = async (value = "", params = {}, type = "") => {

    let response = await apiClient("front/product/list", "post", {
      body: {
        category_id: query?.id?.[0]
      },
    });
    if (response.status === 200) {
      dispatch(setProductList(response.data));
    }
    return response;
  };
  useEffect(() => {
    filterProductList()
  }, [])
  console.log(normalPostList, "normalPostList")

  const [showAll, setShowAll] = useState(false);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const content = [
    { image: '/assets/dummybrand1.png', text: 'Taff Pvt.Ltd', text1: 'Latham, New York, United States' },
    { image: '/assets/dummybrand2.png', text: 'Taff Pvt.Ltd', text1: 'Latham, New York, United States' },
    { image: '/assets/dummybrand3.png', text: 'Taff Pvt.Ltd', text1: 'Latham, New York, United States' },
    { image: '/assets/dummybrand4.png', text: 'Taff Pvt.Ltd', text1: 'Latham, New York, United States' },
    { image: '/assets/dummybrand5.png', text: 'Taff Pvt.Ltd', text1: 'Latham, New York, United States' },
    { image: '/assets/dummybrand5.png', text: 'Taff Pvt.Ltd', text1: 'Latham, New York, United States' },
    { image: '/assets/dummybrand5.png', text: 'Taff Pvt.Ltd', text1: 'Latham, New York, United States' },
    { image: '/assets/dummybrand5.png', text: 'Taff Pvt.Ltd', text1: 'Latham, New York, United States' },
    { image: '/assets/dummybrand5.png', text: 'Taff Pvt.Ltd', text1: 'Latham, New York, United States' },
    { image: '/assets/dummybrand5.png', text: 'Taff Pvt.Ltd', text1: 'Latham, New York, United States' },
  ];
  const relatedNews = [
    { image: '/assets/dummyrelated1.png', text: 'A Retiring PC Aerospace Materials Engineer Made Protecting Lives His Mission.', text1: 'Like many emerging economies, Bangladesh and Vietnam share a thirst for electricity. Powered by rapid economic growth, the former expects demand for electricity to jump 250% by 2040,', personicon: '/assets/dummyperson.svg', personname: 'Ford henry', timeicon: '/assets/dummytime.svg', date: "25 Oct 2023" },
    { image: '/assets/dummyrelated2.png', text: 'A Retiring PC Aerospace Materials Engineer Made Protecting Lives His Mission.', text1: 'Like many emerging economies, Bangladesh and Vietnam share a thirst for electricity. Powered by rapid economic growth, the former expects demand for electricity to jump 250% by 2040, ', personicon: '/assets/dummyperson.svg', personname: 'Ford henry', timeicon: '/assets/dummytime.svg', date: "25 Oct 2023" },
    { image: '/assets/dummyrelated3.png', text: 'A Retiring PC Aerospace Materials Engineer Made Protecting Lives His Mission.', text1: 'Like many emerging economies, Bangladesh and Vietnam share a thirst for electricity. Powered by rapid economic growth, the former expects demand for electricity to jump 250% by 2040, ', personicon: '/assets/dummyperson.svg', personname: 'Ford henry', timeicon: '/assets/dummytime.svg', date: "25 Oct 2023" },
    { image: '/assets/dummyrelated4.png', text: 'A Retiring PC Aerospace Materials Engineer Made Protecting Lives His Mission.', text1: 'Like many emerging economies, Bangladesh and Vietnam share a thirst for electricity. Powered by rapid economic growth, the former expects demand for electricity to jump 250% by 2040, ', personicon: '/assets/dummyperson.svg', personname: 'Ford henry', timeicon: '/assets/dummytime.svg', date: "25 Oct 2023" },
  ];
  const { data, status, loader } = useSelector(
    (state: any) => state.productDetail.detail
  );
  let relatedProduct =
    data?.related_product?.filter((v) => v.id !== data.id) ?? [];
  console.log("relatedProduct---", relatedProduct)
  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <BannerBox>
        <Bgimage>
          <BannerTxt>
            <Box>
              <Textoverimg1 variant="h1">
                Power
                <Spantext>Genereation</Spantext>
              </Textoverimg1>
              <Textoverimg2>
                Improving your performance
              </Textoverimg2>
              <Textoverimg3Box>
                <Textoverimg3>
                  As an independent service provider, we have the flexibility to respond rapidly to solve your power generation challenges, employing practical solutions with services that will reliably improve the performance.
                </Textoverimg3>
              </Textoverimg3Box>
            </Box>
          </BannerTxt>
        </Bgimage>
      </BannerBox>
      <Textoverimg4OuterBox>
        <Textoverimg4InnerBox>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Textoverimg4>
                Explore the sectors we serve
              </Textoverimg4>
            </Grid>
          </Grid>
          <SliderStyle>
            <Slider {...settings}>
              <Box>
                <SliderBox>
                  <img src="/assets/dummypump.svg" alt="" />
                  <Box>
                    <SliderBoxText>Steam Power</SliderBoxText>
                  </Box>
                </SliderBox>
              </Box>
              <Box>
                <SliderBox>
                  <img src="/assets/dummypump.svg" alt="" />
                  <Box>
                    <SliderBoxText>Wind Energy</SliderBoxText>
                  </Box>
                </SliderBox>
              </Box>
              <Box>
                <SliderBox>
                  <img src="/assets/dummypump.svg" alt="" />
                  <Box>
                    <SliderBoxText>Biomass Power</SliderBoxText>
                  </Box>
                </SliderBox>
              </Box>
              <Box>
                <SliderBox>
                  <img src="/assets/dummypump.svg" alt="" />
                  <Box>
                    <SliderBoxText>Solar Energy</SliderBoxText>
                  </Box>
                </SliderBox>
              </Box>
              <Box>
                <SliderBox>
                  <img src="/assets/dummypump.svg" alt="" />
                  <Box>
                    <SliderBoxText>Hydroelectric Power</SliderBoxText>
                  </Box>
                </SliderBox>
              </Box>
            </Slider>
          </SliderStyle>
        </Textoverimg4InnerBox>
      </Textoverimg4OuterBox>
      <Box>
        <Grid container spacing={0} alignItems={'center'} sx={{ position: 'relative' }}>
          <Grid item xs={6}>
            <Box>
              <img src="/assets/sectorbanner.png" alt="" style={{ width: '100%', height: '759px' }} />
            </Box>
          </Grid>
          <Grid item xs={6} >
            <AboutSection>
              <AboutHeading>ABOUT POWER GENERATION</AboutHeading>
              <AboutSubHeading>INDUSTRIAL EXPERTISE WITH LEGACY, NOW A TOUCH AWAY!</AboutSubHeading>
              <Box>
                <Aboutcontent>
                  We provide flange to flange parts and services to Gas turbines and BOP parts, DI pipes and fittings, valves, Generators. We also provide EPC services to our client projects.
                </Aboutcontent>
              </Box>
              <Box sx={{ margin: '12px 0 0 0' }}>
                <Aboutcontent>
                  We provide flange to flange parts and services to Gas turbines and BOP parts, DI pipes and fittings, valves, Generators. We also provide EPC services to our client projects.
                </Aboutcontent>
              </Box>
              <Box sx={{ margin: '18px 0 0 0' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Box>
                        <StarBorderIcon sx={{ color: '#d7282f' }} />
                      </Box>
                      <Box>
                        <Startext>Certified Engineers</Startext>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Box>
                        <StarBorderIcon sx={{ color: '#d7282f' }} />
                      </Box>
                      <Box>
                        <Startext>Design in Quality</Startext>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Box>
                        <StarBorderIcon sx={{ color: '#d7282f' }} />
                      </Box>
                      <Box>
                        <Startext>Expert Engineers</Startext>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Box>
                        <StarBorderIcon sx={{ color: '#d7282f' }} />
                      </Box>
                      <Box>
                        <Startext>Best Branding</Startext>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <AboutLastSectionBox>
                <AboutLastSection>
                  Merchant AD facilitates an integrated platform that eases the availability of spare parts, components and services to the Power Generation, Oil & Energy, Water & Wastewater management sectors.
                </AboutLastSection>
              </AboutLastSectionBox>
            </AboutSection>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: '#F8F8F8', padding: '0 0 24px 0' }}>
        <HeadingBox sx={{ padding: '30px 0 0 0 !important' }}>
          <HeadingContent>Few Related <Spantext2> Brands</Spantext2></HeadingContent>
        </HeadingBox>
        <Outerborderbox>
          <Grid container spacing={2}>
            {content.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Boxborder>
                  <Imagebox>
                    <img src={item.image} alt="" />
                  </Imagebox>
                  <Box>
                    <BrandHeading>
                      {item.text}
                    </BrandHeading>
                    <BrandSubHeading>
                      {item.text1}
                    </BrandSubHeading>
                  </Box>
                </Boxborder>
              </Grid>
            ))}
          </Grid>
          <ButtonBox>
            <ViewMoreButton>
              view more brands
            </ViewMoreButton>
          </ButtonBox>
        </Outerborderbox>
      </Box>
      <Box sx={{ backgroundColor: '#F8F8F8' }}>
        <RelatedOuterBox>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <HeadingContent>
                  Related Products
                </HeadingContent>
              </Box>
            </Grid>
            {normalPostList.slice(0, showAll ? normalPostList.length : 4).map((element, index) => (
              <Grid item xs={12} sm={4} md={3} key={index}>
                <ProductItem data={element} />
              </Grid>
            ))}
            {normalPostList.length > 4 && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", padding: '24px 0' }}>
                  <ViewMoreLess onClick={handleToggleShowAll}>
                    {showAll ? 'View Less' : 'View More'}
                  </ViewMoreLess>
                </Box>
              </Grid>
            )}
          </Grid>
        </RelatedOuterBox>
      </Box>
      <Box sx={{ backgroundColor: '#F8F8F8', padding: '24px 0 24px 0' }}>
        <HeadingBox>
          <HeadingContent>Related <Spantext2> News</Spantext2></HeadingContent>
        </HeadingBox>
        <Outerborderbox>
          <Grid container spacing={2}>
            {relatedNews.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <RelatedNewBox>
                  <img src={item.image} alt="" />
                  <RelatedNewBoxContent>
                    <Headingtext>
                      {item.text}
                    </Headingtext>
                    <Subtext>
                      {item.text1}
                    </Subtext>
                    <NameandDateBox>
                      <PeronNameIcon>
                        <img src={item.personicon} alt="" />
                        <Typography>{item.personname}</Typography>
                      </PeronNameIcon>
                      <DateandIcon>
                        <img src={item.timeicon} alt="" />
                        <Typography>{item.date}</Typography>
                      </DateandIcon>
                    </NameandDateBox>
                  </RelatedNewBoxContent>
                </RelatedNewBox>
              </Grid>
            ))}
            {relatedProduct.length < 0 && (
              <Grid item xs={12}>
                <SellerProducts
                  marginTop="0px"
                  productList={relatedProduct}
                  Name="Related Product"
                />
              </Grid>
            )}
          </Grid>
        </Outerborderbox>
      </Box>

    </Box>
  )
}
