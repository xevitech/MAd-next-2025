// import React, { useEffect, useState, useRef } from 'react';
// import { Box, Grid, LinearProgress } from '@mui/material';
// import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import { CenterBox, GridImageBox, GridInfoBox, GridStack, LandingPageSubHeadings, LandingPageText } from './styles';

// export default function ScrollableSections() {
//     const [activeSection, setActiveSection] = useState(0);
//     const [progress, setProgress] = useState(0);
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const sections = 4;
//     const displayTime = 3000; // Time for each section

//     const sectionData = [
//         { title: 'Millions of business offerings', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...', icon: <VerifiedOutlinedIcon /> },
//         { title: 'Assured quality and transactions', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...', icon: <LocalOfferIcon /> },
//         { title: 'Millions of business offerings', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...', icon: <VerifiedOutlinedIcon /> },
//         { title: 'One-stop trading solution', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...', icon: <CurrencyExchangeIcon /> }
//     ];

//     const handleScroll = (e: WheelEvent) => {
//         e.preventDefault();

//         if (activeSection === sections - 1 && e.deltaY > 0) {
//             // Scroll to next section after last section
//             window.scrollTo({
//                 top: containerRef.current?.offsetTop + containerRef.current?.offsetHeight!,
//                 behavior: 'smooth',
//             });
//             return;
//         }

//         if (activeSection === 0 && e.deltaY < 0) {
//             // Scroll to previous section before first section
//             window.scrollTo({
//                 top: containerRef.current?.offsetTop - window.innerHeight, // Scroll to previous section above
//                 behavior: 'smooth',
//             });
//             return;
//         }

//         if (e.deltaY !== 0) {
//             setProgress(0);
//             if (e.deltaY > 0 && activeSection < sections - 1) {
//                 setActiveSection((prevSection) => prevSection + 1);
//             } else if (e.deltaY < 0 && activeSection > 0) {
//                 setActiveSection((prevSection) => prevSection - 1);
//             }
//         }
//     };

//     useEffect(() => {
//         let interval: NodeJS.Timeout | null = null;
//         const progressIncrement = 100 / (displayTime / 100);

//         if (progress < 100) {
//             interval = setInterval(() => {
//                 setProgress((prev) => {
//                     if (prev >= 100) {
//                         clearInterval(interval!);
//                         return 100;
//                     }
//                     return prev + progressIncrement;
//                 });
//             }, 100);
//         }

//         return () => clearInterval(interval!);
//     }, [progress]);

//     useEffect(() => {
//         setProgress(0);
//     }, [activeSection]);

//     useEffect(() => {
//         const container = containerRef.current;
//         if (container) {
//             container.addEventListener('wheel', handleScroll, { passive: false });
//         }

//         return () => {
//             if (container) {
//                 container.removeEventListener('wheel', handleScroll);
//             }
//         };
//     }, [activeSection]);

//     useEffect(() => {
//         const container = containerRef.current;
//         if (container) {
//             container.scrollTo({
//                 left: activeSection * container.clientWidth,
//                 behavior: 'smooth',
//             });
//         }
//     }, [activeSection]);

//     return (
//         <>
//             <Box className="scroli"
//                 ref={containerRef}
//                 sx={{
//                     position: 'relative',
//                     width: '100%',
//                     height: '60vh',
//                     // height:"30vh"               
//                     overflowX: 'hidden',
//                     display: 'flex',
//                     flexDirection: 'row',
//                     scrollSnapType: 'x mandatory',
//                     scrollBehavior: 'smooth',
//                     '&::-webkit-scrollbar': { display: 'none' }
//                 }}
//             >
//                 <Grid container spacing={2} sx={{ flexDirection: 'row', width: '100%' }}>
//                     {sectionData.map((section, index) => (
//                         <Grid
//                             key={index}
//                             item
//                             xs={12}
//                             sm={12}
//                             md={3}
//                             lg={3}
//                             sx={{
//                                 opacity: index <= activeSection ? '1' : '0',
//                                 transition: 'background-color 0.9s, opacity 0.9s',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 flexDirection: 'column',
//                                 position: 'relative',
//                             }}
//                         >
//                             <GridStack className={index === activeSection ? 'active' : ''}>
//                                 <GridImageBox>
//                                     {section.icon}
//                                 </GridImageBox>
//                                 <GridInfoBox>
//                                     <LandingPageSubHeadings variant="h4">
//                                         {section.title}
//                                     </LandingPageSubHeadings>
//                                     <LandingPageText>
//                                         {section.description}
//                                     </LandingPageText>
//                                 </GridInfoBox>
//                                 <LandingPageText>
//                                     Learn More <ArrowRightAltOutlinedIcon />
//                                 </LandingPageText>
//                             </GridStack>
//                             {/* <LinearProgress
//                             variant="determinate"
//                             value={index === activeSection ? progress : 0} // Show progress only for the active section
//                             sx={{ position: 'absolute', bottom: 0, width: '100%' }}
//                         /> */}
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>
//         </>
//     );
// }

import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Link } from '@mui/material';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { GridImageBox, GridInfoBox, GridStack, LandingPageSubHeadings, LandingPageText, SectorLearnMore } from './styles';
import router from 'next/router';

const ScrollableSections = () => {
    const [activeDivs, setActiveDivs] = useState(0); // Track active sections (0-4)
    const [isScrolling, setIsScrolling] = useState(false); // Prevent fast scrolling
    const [isInView, setIsInView] = useState(false); // Track if containerRef is in view
    const [visibility, setVisibility] = useState([true, true, true, true]); // Track visibility of sections
    const containerRef = useRef(null); // Ref for container
    const prevDivsRef = useRef(activeDivs); // Track previous activeDivs

    const handleScroll = (event) => {
        if (!isInView || isScrolling) return; // Only handle scroll if in view and not already scrolling

        const delta = event.deltaY; // Scroll direction detection
        let newActiveDivs = activeDivs;

        if (delta > 0 && activeDivs < 4) {
            // Scroll down
            newActiveDivs = activeDivs + 1;
        } else if (delta < 0 && activeDivs > 0) {
            // Scroll up
            newActiveDivs = activeDivs - 1;
        }

        // Handle visibility for reverse scroll
        if (newActiveDivs < activeDivs) {
            const newVisibility = [...visibility];
            newVisibility[activeDivs - 1] = false; // Hide the previous active section
            setVisibility(newVisibility);
        }

        if (newActiveDivs !== activeDivs) {
            setActiveDivs(newActiveDivs);
            setIsScrolling(true);
            setTimeout(() => setIsScrolling(false), 1000); // Delay for smoother scrolling
        }
    };

    useEffect(() => {
        // Intersection Observer to detect when containerRef is in view
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.5 } // Trigger when 50% of the section is in view
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isInView && activeDivs < 4) {
            // Disable page scroll when section is in view and activeDivs < 4
            document.body.style.overflow = 'hidden';
            window.addEventListener('wheel', handleScroll);
        } else {
            // Re-enable page scroll when section is not in view or activeDivs reaches 4
            document.body.style.overflow = 'auto';
            window.removeEventListener('wheel', handleScroll);
        }

        return () => {
            document.body.style.overflow = 'auto'; // Clean up on component unmount
            window.removeEventListener('wheel', handleScroll);
        };
    }, [isInView, isScrolling, activeDivs]);

    useEffect(() => {
        // Update previous activeDivs after each render
        prevDivsRef.current = activeDivs;
    }, [activeDivs]);

    return (
        <Box
            ref={containerRef}
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderBottom: '8px solid #F4F4F4',
            }}
        > 
            <Grid container spacing={2} sx={{ position: 'relative', height: '100%' }}>
                {[{
                    title: "Energy",
                    description: "Merchant AD connects businesses with innovative energy solutions, from renewable energy technologies to power storage systems. Our platform facilitates trade to meet the growing demand for sustainable and efficient energy across industries.",
                    image: "/assets/images/landing-page/energy.svg",
                    link: "/category/energy",
                }, {
                    title: "Power Generation",
                    description: "Merchant AD offers a diverse range of products for the power generation sector, including turbines and grid infrastructure, helping businesses source reliable solutions to enhance efficiency and meet global power demands.",
                    image: "/assets/images/landing-page/power-generation-img.svg",
                    link: "/category/power-generation",
                }, {
                    title: "Oil & Gas",
                    description: "Merchant AD supports the oil & gas industry with a comprehensive marketplace for equipment, pipelines, and safety systems, enabling businesses to optimize operations and meet industry challenges with trusted partners.",
                    image: "/assets/images/landing-page/oilgas-img.svg",
                    link: "/category/oil-gas",
                }, {
                    title: "Water Management",
                    description: "Merchant AD connects businesses with advanced water management solutions, from wastewater treatment to desalination technologies, ensuring efficient water distribution and sustainable practices for industrial and municipal applications.",
                    image: "/assets/images/landing-page/water-management-img.svg",
                    link: "/category/water-management",
                }].map((section, index) => (
                    <Grid
                        key={index}
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        sx={{
                            left: `${index * 25}%`,
                            transform: `translateX(${activeDivs > index ? 0 : -100}%)`,
                            transition: 'transform 0.5s ease',
                            zIndex: activeDivs > index ? 1 : -1,
                            height: '100%',
                            display: visibility[index] ? 'flex' : 'none', // Control visibility
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}
                    >
                        <GridStack>
                            <GridImageBox>
                                <img
                                    src={section.image}
                                    alt={section.title}
                                    width="30"
                                    height="30"
                                />
                            </GridImageBox>
                            <GridInfoBox>
                                <LandingPageSubHeadings variant="h4">{section.title}</LandingPageSubHeadings>
                                <LandingPageText>{section.description}</LandingPageText>
                            </GridInfoBox>
                            <SectorLearnMore>
                                <Link underline="none" onClick={() => router.push(section.link)}>
                                    Learn More <EastRoundedIcon />
                                </Link>
                            </SectorLearnMore>
                            {/* Animated border box */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: "-8px",
                                    left: '0',
                                    width: activeDivs === index ? '0' : '100%',
                                    height: '2px',
                                    backgroundColor: prevDivsRef.current > activeDivs ? 'transparent' : '#d7282f',
                                    transition: 'width 0.9s ease, background-color 0.3s ease',
                                }}
                            />
                        </GridStack>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ScrollableSections;




















// import { Grid, Link } from '@mui/material';
// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { GridImageBox, GridInfoBox, GridStack, LandingPageSubHeadings, LandingPageText, SectorLearnMore } from './styles';
// import Router from 'next/router';
// import EastRoundedIcon from '@mui/icons-material/EastRounded';
// const Container = styled.div`
//   height: 50vh;
//   display: flex;
//   flex-wrap: nowrap;
// `;

// const Panel = styled.div`
//   width: 50vw;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-weight: 600;
//   font-size: 1.5em;
//   text-align: center;
//   position: relative;
//   box-sizing: border-box;
//   padding: 10px;
//   background-color: white;

// //   &:nth-child(odd) {
// //     background-color: #f5f5f5;
// //   }

// //   @media (max-width: 767px) {
// //     background-color: lightpink;
// //     width: 100%;
// //   }
// `;

// const App = () => {
//     useEffect(() => {
//         // Ensure GSAP and ScrollTrigger are accessible globally
//         const gsap = window.gsap;
//         const ScrollTrigger = window.ScrollTrigger;

//         // Select all the panels
//         const sections = document.querySelectorAll('.panel');
//         const mm = gsap.matchMedia();
//         sections.forEach((section, i) => {
//             (section as HTMLElement).style.zIndex = (sections.length - i).toString(); // Cast to HTMLElement and set zIndex
//         });
//         mm.add("(min-width:767px)", () => {
//             let scrollTween = gsap.fromTo(
//               sections,
//               {
//                 xPercent: (i) => -100 * i  // Start each section off to the left
//               },
//               {
//                 xPercent: (i) => 0 , // Animate each section to its final position
//                 ease: "none",
//                 scrollTrigger: {
//                   trigger: ".container",
//                   pin: true,
//                   markers: false,
//                   scrub: 0.1,
//                   start: "top 250px",
//                   end: "+=3000 top"
//                 },
//                 stagger: {
//                   amount: 0.5, // Adjust this to control the timing for each section's appearance
//                   each: 1, // Delay each section's movement by 1 second
//                   from:"center"
//                 }
//               }
//             );
//           });

//         return () => {
//             // Cleanup ScrollTriggers on component unmount
//             ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//         };
//     }, []);

//     return (
//         <Container className='container'>
//             <Panel className='panel'>
//                 <GridStack>
//                     <GridImageBox>
//                         <img
//                             src="/assets/images/landing-page/energy.svg"
//                             alt="Energy"
//                             width="30"
//                             height="30"
//                         />
//                     </GridImageBox>
//                     <GridInfoBox>
//                         <LandingPageSubHeadings variant="h4">
//                             Energy
//                         </LandingPageSubHeadings>
//                         <LandingPageText className="hovertext">
//                             Merchant AD connects businesses with innovative
//                             energy solutions, from renewable energy
//                             technologies to power storage systems. Our
//                             platform facilitates trade to meet the growing
//                             demand for sustainable and efficient energy across
//                             industries.
//                         </LandingPageText>
//                     </GridInfoBox>
//                     <SectorLearnMore>
//                         <Link
//                             underline="none"
//                             onClick={() => Router.push("/category/energy")}
//                         >
//                             Learn More <EastRoundedIcon />
//                         </Link>
//                     </SectorLearnMore>
//                 </GridStack>
//             </Panel>
//             <Panel className='panel'>
//                 <GridStack>
//                     <GridImageBox>
//                         <img
//                             src="/assets/images/landing-page/power-generation-img.svg"
//                             alt="Power Generation"
//                             width="30"
//                             height="30"
//                         />
//                     </GridImageBox>
//                     <GridInfoBox>
//                         <LandingPageSubHeadings variant="h4">
//                             Power Generation
//                         </LandingPageSubHeadings>
//                         <LandingPageText>
//                             Merchant AD offers a diverse range of products for
//                             the power generation sector, including turbines
//                             and grid infrastructure, helping businesses source
//                             reliable solutions to enhance efficiency and meet
//                             global power demands.
//                         </LandingPageText>
//                     </GridInfoBox>
//                     <SectorLearnMore>
//                         <Link
//                             underline="none"
//                             onClick={() =>
//                                 Router.push("/category/power-generation")
//                             }
//                         >
//                             Learn More <EastRoundedIcon />
//                         </Link>
//                     </SectorLearnMore>
//                 </GridStack>
//             </Panel>
//             <Panel className='panel target'>
//                 <GridStack>
//                     <GridImageBox>
//                         <img
//                             src="/assets/images/landing-page/oilgas-img.svg"
//                             alt="Oil & Gas"
//                             width="30"
//                             height="30"
//                         />
//                     </GridImageBox>
//                     <GridInfoBox>
//                         <LandingPageSubHeadings variant="h4">
//                             Oil & Gas
//                         </LandingPageSubHeadings>
//                         <LandingPageText>
//                             Merchant AD supports the oil & gas industry with a
//                             comprehensive marketplace for equipment,
//                             pipelines, and safety systems, enabling businesses
//                             to optimize operations and meet industry
//                             challenges with trusted partners.
//                         </LandingPageText>
//                     </GridInfoBox>
//                     <SectorLearnMore>
//                         <Link
//                             underline="none"
//                             onClick={() => Router.push("/category/oil-gas")}
//                         >
//                             Learn More <EastRoundedIcon />
//                         </Link>
//                     </SectorLearnMore>
//                 </GridStack>
//             </Panel>
//             <Panel className='panel'>
//                 <GridStack className="laststack">
//                     <GridImageBox className="hoverbgcolor">
//                         <img
//                             src="/assets/images/landing-page/water-management-img.svg"
//                             alt="Water Management"
//                             width="30"
//                             height="30"
//                         />
//                     </GridImageBox>
//                     <GridInfoBox>
//                         <LandingPageSubHeadings
//                             className="hovertext"
//                             variant="h4"
//                         >
//                             Water Management
//                         </LandingPageSubHeadings>
//                         <LandingPageText>
//                             Merchant AD connects businesses with advanced
//                             water management solutions, from wastewater
//                             treatment to desalination technologies, ensuring
//                             efficient water distribution and sustainable
//                             practices for industrial and municipal
//                             applications.
//                         </LandingPageText>
//                     </GridInfoBox>
//                     <SectorLearnMore>
//                         <Link
//                             underline="none"
//                             onClick={() =>
//                                 Router.push("/category/water-management")
//                             }
//                         >
//                             Learn More <EastRoundedIcon />
//                         </Link>
//                     </SectorLearnMore>
//                 </GridStack>
//             </Panel>

//         </Container>
//     );
// };

// export default App;
