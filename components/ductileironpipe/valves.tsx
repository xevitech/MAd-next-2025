import React, { useEffect, useState } from "react";
import Template from "./template.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
    Textlink,
    useStyles,
    FooterCol,
    SocialIcons,
    CopyrightTxt,
} from "../guestLayout/landingPage/styles";
import Link from "next/link";



import { Tabs } from "@mui/material";

function createData(name, calories, next, carbs, protein, caries, matt, card, prot) {
    return { name, calories, next, carbs, protein, caries, matt, card, prot };
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const rows = [
    createData(<b>DN</b>, "", "DE", "e", "DS", "LS", "m", "θ", "c"),
    createData(<b>mm</b>, "", "mm", "mm", "mm", "mm", "kg", "deg", "mm"),
    createData(<b>θ80</b>, "C40", "mm", 45, 55, 85, 9.8, 5, "3±1"),
    createData(<b>θ100</b>, "C40", 118, 4.7, 4.44, 163, 88, 5, "3±1"),
    createData(<b>θ125</b>, "C40", 1.0, 419, 349, 16.0, 19, 5, "3±1"),
    createData(<b>θ150</b>, "C40", 160, 49, 5.59, 16.0, 29, 5, "3±1"),
    createData(<b>θ200</b>, "C40", 15.0, 49, 39, 16.0, 44, 5, "3±1"),
    createData(<b>θ250</b>, "C40", 10, 49, 90, 16.0, 49, 5, "3±1"),
    createData(<b>θ300</b>, "C40", 165, 49, 319, 16.0, 50, 5, "3±1"),
];


const valves = (props: TabPanelProps) => {
    const [domLoaded, setDomLoaded] = useState(false);
    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    const {classes} = useStyles();
    return (
        <>

            {domLoaded && (

                <div className={Template.page_container}>
                    <Grid container>
                        <Grid item xs={12}>
                            <div className={Template.banner}>
                                <img
                                    className={Template.overlay}
                                    src="/assets/cms-img/valves2.jpg"
                                    alt="Pipes"
                                    title="Pipes Image"
                                    height='50vh'
                                />
                                <div className={Template.banner_txt}>
                                    <h1>Ductile Iron Valves</h1>
                                    <h2> <span className={Template.fittingred}>Valves</span> are mechanical devices which can also be controlled electronically primarily installed to open or close the flow inside the pipeline. They are also used to partially restrict, re-direct the inflow fluid.</h2>
                                </div>

                            </div>
                        </Grid>
                    </Grid>

                    {/* START Second Section part*/}
                    <div className={Template.service_sec}>
                        <div className={Template.service_secinn}>
                            <Container maxWidth="lg">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} mt={2.9}>
                                        <div
                                        >
                                            <p>They are typically used at <b>inlet of the systems basically</b> in forward line from the sources, where the flow can be operated and controlled. <span className={Template.fittingred}> process industries find valves application</span> the most as the forward line is being fed into the system.</p>
                                            <h4 className={Template.common_head}>
                                                OVERVIEW
                                            </h4>
                                            <Typography className={Template.paragraph}>
                                                Merchant AD Pipeline and infrastructure portfolio provides you with access to valves with unrestricted size ranges and flow operations. Hand operated manual valves to actuated valve systems, flow contracting and distributing valves, with size ranges for the entire Merchant AD Ductile Iron pipes and Fittings are available at Merchant AD Valves and pumps.
                                            </Typography>
                                            <Typography className={Template.paragraph} mt={3}>
                                                Our Ductile Iron Portfolio with an aim to serve and give access to our Pipeline and Infrastructure industry peers and clients pushes our limits to provide parts and components with an entire range, and with entire we mean in size range (DN-DN2600), end configurations (Socket/flange/groove), classification (Rising/Non- rising/ resilient/metal seat), standardization (ISO/EN), dimensions (/Stem/Bonnet). We are proud to say Merchant AD is the World’s unique access portal for Pipes, Fittings, Valves and Accessories because we understand even the nuance and unique needs in the industry and thrive to provide services for the same.
                                            </Typography>
                                            <Typography className={Template.paragraph} mt={3}>
                                                Our valves are stringent with the safety norms and regulations even for usage under critical conditions and accident-prone zones. They are equipped with airtight sealings and rubber gaskets to avoid intrusion, extrusion, flow disturbances. Valve positioning components are available in our Merchant AD Fittings Portfolio.
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        mt={2.9}
                                    >
                                        <div
                                        >
                                            <p className={Template.middleEastfw}>
                                                With applications varying from carrying potable water, process industries, on shore and offshore fire extinguishing systems, above and buried valves are available at Merchant AD which can be instantly quoted and shipped with our edge technology user interface and CRM systems.
                                            </p>
                                        </div>
                                        <div className={Template.BothImage}>
                                            <img
                                                className={Template.SecondSectionImg4}
                                                src="/assets/cms-img/ball-valve-combo.jpg"
                                                alt=""
                                                
                                            />
                                        </div>
                                        <Button
                                            className={Template.redcolor}
                                            variant="contained"
                                            endIcon={<ArrowForwardOutlinedIcon />}
                                            sx={{ mt: 8, textTransform: 'capitalize', border: '1px solid red', }}
                                        >
                                            Contact Us today
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </div>
                    {/* END Second Section part*/}

                    {/* START Water Pro Characteristics part*/}
                    <Container maxWidth="lg" sx={{ mt: 10 }}>
                        <Grid item xs={12} md={6} sm={12}>
                            <div>
                                <h4 className={Template.common_head}>
                                    Merchant AD DUCTILE IRON CHARACTERISTICS
                                </h4>
                            </div>
                            <div id="ThirdSection">
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <Box className={Template.BlockIcons}>
                                            <img
                                                className={Template.BlockIconImg}
                                                src="/assets/cms-img/regulation.png"
                                                alt=""
                                                width='65'
                                                height='65'
                                            />
                                            <Box className={Template.textmarginleft}>
                                                <p className={Template.Htext}>
                                                    Soil Conditions
                                                </p>
                                                <p className={Template.normal_Textcolor}>
                                                    Proven rigidity and longevity under medium-aggressive soil conditions, all corrosion loads and environmental effects like water, ambient temperature,
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={Template.BlockIcons}>
                                            <img
                                                className={Template.BlockIconImg}
                                                src="/assets/cms-img/highpressure.png"
                                                alt=""
                                                width='65'
                                                height='65'
                                            />
                                            <Box className={Template.textmarginleft}>
                                                <p className={Template.Htext}>
                                                    Traffic Load Proofing.
                                                </p>
                                                <p className={Template.normal_Textcolor}>
                                                    Above and below ground applications with traffic load proofing.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={Template.BlockIcons}>
                                            <img
                                                className={Template.BlockIconImg}
                                                src="/assets/cms-img/trafficloader.png"
                                                alt=""
                                                width='65'
                                                height='65'
                                            />
                                            <Box className={Template.textmarginleft}>
                                                <p className={Template.Htext}>
                                                    Material Brand
                                                </p>
                                                <p className={Template.normal_Textcolor}>
                                                    Carries the ductile iron material brand parameters rigidity, ductility, and durability.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={Template.BlockIcons}>
                                            <img
                                                className={Template.BlockIconImg}
                                                src="/assets/cms-img/feasibility.png"
                                                alt=""
                                                width='65'
                                                height='65'
                                            />
                                            <Box className={Template.textmarginleft}>
                                                <p className={Template.Htext}>Proofing Products</p>
                                                <p className={Template.normal_Textcolor}>
                                                    Tightness and leak proofing products at Merchant AD, to avoid operational losses.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={Template.BlockIcons}>
                                            <img
                                                className={Template.BlockIconImg}
                                                src="/assets/cms-img/suitable.png"
                                                alt=""
                                                width='65'
                                                height='65'
                                            />
                                            <Box className={Template.textmarginleft}>
                                                <p className={Template.Htext}>Pipeline Design</p>
                                                <p className={Template.normal_Textcolor}>
                                                    Higher axial deflections so the pipeline design and network can be facilitated.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={Template.BlockIcons}>
                                            <img
                                                className={Template.BlockIconImg}
                                                src="/assets/cms-img/pcstrength.png"
                                                alt=""
                                                width='65'
                                                height='65'
                                            />
                                            <Box className={Template.textmarginleft}>
                                                <p className={Template.Htext}>Merchant AD DI Fittings</p>
                                                <p className={Template.normal_Textcolor}>
                                                    Merchant AD DI Fittings undergo uncompromised quality assurance and testing procedures.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={Template.BlockIcons}>
                                            <img
                                                className={Template.BlockIconImg}
                                                src="/assets/cms-img/pcstrength.png"
                                                alt=""
                                                width='65'
                                                height='65'
                                            />
                                            <Box className={Template.textmarginleft}>
                                                <p className={Template.Htext}>Merchant AD DI Fittings</p>
                                                <p className={Template.normal_Textcolor}>
                                                    Merchant AD DI Fittings undergo uncompromised quality assurance and testing procedures.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={Template.BlockIcons}>
                                            <img
                                                className={Template.BlockIconImg}
                                                src="/assets/cms-img/pcstrength.png"
                                                alt=""
                                                width='65'
                                                height='65'
                                            />
                                            <Box className={Template.textmarginleft}>
                                                <p className={Template.Htext}>Merchant AD DI Fittings</p>
                                                <p className={Template.normal_Textcolor}>
                                                    Merchant AD DI Fittings undergo uncompromised quality assurance and testing procedures.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Container>
                    {/* END Water Pro Characteristics part*/}

                    <Container maxWidth="lg" sx={{ mt: 10 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Box>
                                    <h4 className={Template.common_head}>
                                        STANDARDIZATIONS CERTIFICATIONS
                                    </h4>
                                </Box>
                                <Box>
                                    <p>
                                        Design carried according to EN 1171 and stricter quality assurance over manufacturing and quality carried to exceed the standard requirements.
                                    </p>
                                    <p>ISO1074-1/2 for minimum purpose for fitness requirements and hydraulic testing carried for valves to be used in water pipeline systems above or below ground for resilient seated valves.</p>
                                    <p>Flanged valves with flange to flange and flange to centre compliance to ISO5752.</p>
                                    <p>ISO10631 appliance to butterfly valves.</p>
                                    <p> Fusion bonded epoxy coating are in compliance with EN14901-1</p>
                                </Box>

                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <img src="/assets/cms-img/valves1.png" alt="" width='90%' />
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>

                    {/* tab section */}
                    <Box sx={{ backgroundColor: '#EDF0F2' }}>
                        <Container maxWidth="lg" sx={{ mt: 10 }} className={Template.bgmap}>
                            <Grid container spacing={2} className={Template.bgmap}>
                                <Grid item xs={12}>
                                    <Box>
                                        <h4 className={Template.common_head}>
                                            VALVES PORTFOLIO
                                        </h4>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <Box sx={{ width: "100%" }}>
                                        <Box sx={{}}>
                                            <Tabs
                                                value={value}
                                                onChange={handleChange}
                                                aria-label="basic tabs example"
                                                sx={{
                                                    "& .MuiTabs-indicator": { display: "none" },
                                                    "& .MuiTab-root.Mui-selected": {
                                                        color: "white",
                                                        backgroundColor: "black"
                                                    }
                                                }}
                                            >
                                                <Tab
                                                    label="Gate Valves"
                                                    {...a11yProps(0)}
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "black",
                                                            color: "white",
                                                            opacity: 1
                                                        }
                                                    }}
                                                />
                                                <Tab
                                                    label="Butterfly Valves"
                                                    {...a11yProps(1)}
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "black",
                                                            color: "white",
                                                            opacity: 1
                                                        }
                                                    }}
                                                />
                                                <Tab
                                                    label="Exhaust Valves"
                                                    {...a11yProps(2)}
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "black",
                                                            color: "white",
                                                            opacity: 1
                                                        }
                                                    }}
                                                />
                                                <Tab
                                                    label="Check Valves"
                                                    {...a11yProps(3)}
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "black",
                                                            color: "white",
                                                            opacity: 1
                                                        }
                                                    }}
                                                />
                                                <Tab
                                                    label="Needle Valves"
                                                    {...a11yProps(4)}
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "black",
                                                            color: "white",
                                                            opacity: 1
                                                        }
                                                    }}
                                                />
                                                <Tab
                                                    label="Control Valves"
                                                    {...a11yProps(5)}
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "black",
                                                            color: "white",
                                                            opacity: 1
                                                        }
                                                    }}
                                                />
                                            </Tabs>
                                        </Box>
                                        <TabPanel value={value} index={0}>
                                            <Grid container spacing={3} display='flex' alignItems='center'>
                                                <Grid item xs={8}>
                                                    <p className={Template.tabtext}>
                                                        Gate valves shut-off valves, predominant valve kind with varying applications in above and below surface conditions. They are easy to operate and install. They are usually provided with a thread screw attached to the gate which can be turned either upside or downside to open and close the flow in the pipeline. They occupy lesser vertical space to accommodate better in underground installations. Bypass configured gate valves are also in our Merchant AD Valves portfolio.
                                                    </p>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        className={Template.redcolor}
                                                        variant="contained"
                                                        endIcon={<ArrowForwardOutlinedIcon />}
                                                    >
                                                        Download Technical Datasheet
                                                    </Button>
                                                </Grid>

                                                <Grid container spacing={5}>
                                                    <Grid item xs={9}>
                                                        <Box>
                                                            <TableContainer>
                                                                <Table>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                VALVE TYPE
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                GATE VALVES
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Nominal Size range
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            DN80-DN2600
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Stem action
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1. Rising
                                                                            2. Non- Rising
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Seat profile
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1. Resilient seated
                                                                            2. Metal seated
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            End configurations
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1.Double Socket end
                                                                            2. Double Flange end
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Permissible Pressure rating
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            16 bar
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Valve Actuation
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1. Handwheel
                                                                            2. Cap
                                                                            3. Gearbox
                                                                            4. Actuator
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Leakage proofing
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Sealing Rings
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1. Push on Joint
                                                                            2. Flanged joint
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Flange standards
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            PN10, PN16, PN25, PN40
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Box className={Template.boxbgNp}>
                                                            <h4>
                                                                Explore Our Entire Ductile Iron Portfolio
                                                            </h4>
                                                            <ul className={Template.liststylenone}>
                                                                <li>
                                                                    Pipes and Joints
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Valves
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Accessories
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Pumps
                                                                </li>
                                                            </ul>
                                                            <Button>View All</Button>
                                                        </Box>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <Grid container spacing={3} display='flex' alignItems='center'>
                                                <Grid item xs={8}>
                                                    <p className={Template.tabtext}>
                                                        Butterfly valves has a disc inside the bore of the valve which is turned to allow or block the flow. It is a simples shut off valve used in frequent and easy open/close applications. They take very less space, economical and takes minimal time for installation. The stub and disc are seated inside the bore with centric and eccentric positions depending on the application. They are much viable application for underground installations.
                                                    </p>
                                                    <p>Merchant AD Valves include butterfly valves with stub and disc configurations, the valves are vulcanized to provide proper sealing and debris collection and flushing out. For frequent operating conditions tilted disc butterfly valves are also available at Merchant AD.</p>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        className={Template.redcolor}
                                                        variant="contained"
                                                        endIcon={<ArrowForwardOutlinedIcon />}
                                                    >
                                                        Download Technical Datasheet
                                                    </Button>
                                                </Grid>
                                                <Grid container spacing={5}>
                                                    <Grid item xs={9}>
                                                        <Box>
                                                            <TableContainer>
                                                                <Table>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                VALVE TYPE
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                GATE VALVES
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Nominal Size range
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            DN80-DN2600
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Components
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Stub shaft and Disc
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Profile
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1. Centric Stub shaft and disc
                                                                            2. Double Eccentric
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Configurations
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            ⦁ Fixed liner
                                                                            ⦁ Loose liner
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Permissible Pressure rating
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            16 bar
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Valve Actuation
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1. Lever
                                                                            2. Handwheel
                                                                            3. Worm gear
                                                                            4. Pneumatic actuator
                                                                            5. Electrical actuator
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Leakage proofing
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Triple O-ring
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Flanged joint
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly components
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Bolt, nuts, washers, Flange gaskets.
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Flange standards
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            PN10, PN16, PN25, PN40
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Box className={Template.boxbgNp}>
                                                            <h4 >
                                                                Explore Our Entire Ductile Iron Portfolio
                                                            </h4>
                                                            <ul className={Template.liststylenone}>
                                                                <li>
                                                                    Pipes and Joints
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Valves
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Accessories
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Pumps
                                                                </li>
                                                            </ul>
                                                            <Button>View All</Button>
                                                        </Box>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            <Grid container spacing={3} display='flex' alignItems='center'>
                                                <Grid item xs={8}>
                                                    <p className={Template.tabtext}>
                                                        Exhaust valves are air relief valves that are equipped with the pipes to release the air pockets that is trapped inside the pipeline with the flowing water. Air traps inside the pipeline imparts load on the pumping unit and obstructs the flow.
                                                    </p>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        className={Template.redcolor}
                                                        variant="contained"
                                                        endIcon={<ArrowForwardOutlinedIcon />}
                                                    >
                                                        Download Technical Datasheet
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <p>
                                                        In a long run pipeline for kilometres fault identification is practically difficult and time consuming. To avoid such operational losses and provide smooth and continuous flow of the fluid Merchant AD serves with air valves that are equipped on top of the pipeline. This also avoids pressure fluctuations and damages to the pipeline and systems are prevented with the right components at Merchant AD.
                                                    </p>
                                                </Grid>
                                                <Grid container spacing={5}>
                                                    <Grid item xs={9}>
                                                        <Box>
                                                            <TableContainer>
                                                                <Table>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                VALVE TYPE
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                GATE VALVES
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>

                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Components
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Stub shaft and Disc
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Types
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1.PC Auto Air
                                                                            2.PC Air and Vacuum
                                                                            3.PC Auto Air and Vacuum
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            End Configurations
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            ⦁ Threaded end
                                                                            ⦁ Flanged end
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Leakage proofing
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Vulcanized EPDM
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Threaded joint, Flanged joint
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly components
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Bolt, nuts, washers, Flange gaskets
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Flange standards
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            PN10, PN16, PN25, PN40
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Box className={Template.boxbgNp}>
                                                            <h4 >
                                                                Explore Our Entire Ductile Iron Portfolio
                                                            </h4>
                                                            <ul className={Template.liststylenone}>
                                                                <li>
                                                                    Pipes and Joints
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Valves
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Accessories
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Pumps
                                                                </li>
                                                            </ul>
                                                            <Button>View All</Button>
                                                        </Box>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={3}>
                                            <Grid container spacing={3} display='flex' alignItems='center'>
                                                <Grid item xs={8}>
                                                    <p className={Template.tabtext}>
                                                        Check valves also known as foot valves; Non-Return Valves (NRV) are uni -directional flow restricting valves allowing fluid to flow and avoid the backflow. Generally, a spring action system is provided inside the valve to restrict the back flow. In process flow industries where the fluid return flow is to be restricted, water pumping vertically against gravity, non-self-priming pumps where the water is kept inside the pipes.
                                                    </p>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        className={Template.redcolor}
                                                        variant="contained"
                                                        endIcon={<ArrowForwardOutlinedIcon />}
                                                    >
                                                        Download Technical Datasheet
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <p>
                                                        Choosing a Check Valve takes the account if cost and proper functionality of the valve. Merchant AD Valves portfolio offers Check Valves that are best priced in the industry and proves its potential functionality to its fullest. Some of our major applications of these valves were in process industries and high storey pumping where the return flow is entirely not desired.
                                                    </p>
                                                </Grid>
                                                <Grid container spacing={5}>
                                                    <Grid item xs={9}>
                                                        <Box mt={2}>
                                                            <p>
                                                                Merchant AD Check valves are designed, manufactured, and tested to optimally maintain the risks of water hammer, relative pressure losses and costing of the product. Such a perfect balance provides between the vital factors makes our product range a global success.
                                                            </p>
                                                        </Box>
                                                        <Box>
                                                            <TableContainer>
                                                                <Table>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                VALVE TYPE
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                GATE VALVES
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>

                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Size Range
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            DN80-DN2600
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Seat Profile
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Resilient seated
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Types
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1. Swing Check valve
                                                                            2. Ball Check Valves
                                                                            3. Wafer type Check valves
                                                                            4. Rubber Disc Check valves
                                                                            5. Silent Check valves
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            End Configurations
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Flanged end
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Leakage proofing
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Vulcanized EPDM
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Flanged joint
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly Components
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Bolt, nuts, washers, Flange gaskets.
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Flange standards
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            PN10, PN16, PN25, PN40
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Box className={Template.boxbgNp}>
                                                            <h4 >
                                                                Explore Our Entire Ductile Iron Portfolio
                                                            </h4>
                                                            <ul className={Template.liststylenone}>
                                                                <li>
                                                                    Pipes and Joints
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Valves
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Accessories
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Pumps
                                                                </li>
                                                            </ul>
                                                            <Button>View All</Button>
                                                        </Box>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={4}>
                                            <Grid container spacing={3} display='flex' alignItems='center'>
                                                <Grid item xs={8}>
                                                    <p className={Template.tabtext}>
                                                        Needle valves are flow precision control valves where the piston can be operated at any intermittent position to accurately control the flow pressure and volume into the system from the pipeline. Initial starting of the pumping unit, by-pass segments, regulatory valves are where these valves find their application. Generally, a gearbox is attached for precise movement of piston inside the valve.
                                                    </p>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        className={Template.redcolor}
                                                        variant="contained"
                                                        endIcon={<ArrowForwardOutlinedIcon />}
                                                    >
                                                        Download Technical Datasheet
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <p>
                                                        Merchant AD Needle valves are designed to take care of the precision control movement required in the flow. They are rigid and robust even to handle the extreme pressure condition
                                                    </p>
                                                </Grid>
                                                <Grid container spacing={5}>
                                                    <Grid item xs={9}>
                                                        <Box>
                                                            <TableContainer>
                                                                <Table>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                VALVE TYPE
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                GATE VALVES
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>

                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Size Range
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            DN80-DN2600
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Seat Profile
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Resilient seated
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Types
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1. Swing Check valve
                                                                            2. Ball Check Valves
                                                                            3. Wafer type Check valves
                                                                            4. Rubber Disc Check valves
                                                                            5. Silent Check valves
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            End Configurations
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Flanged end
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Leakage proofing
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Vulcanized EPDM
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Flanged joint
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly Components
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Bolt, nuts, washers, Flange gaskets.
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Flange standards
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            PN10, PN16, PN25, PN40
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Box className={Template.boxbgNp}>
                                                            <h4>
                                                                Explore Our Entire Ductile Iron Portfolio
                                                            </h4>
                                                            <ul className={Template.lisststylenone}>
                                                                <li>
                                                                    Pipes and Joints
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Valves
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Accessories
                                                                </li>
                                                                <li className={Template.limt}>
                                                                    Pumps
                                                                </li>
                                                            </ul>
                                                            <Button>View All</Button>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={5}>
                                            <Grid container spacing={3} display='flex' alignItems='center'>
                                                <Grid item xs={8}>
                                                    <p className={Template.tabtext}>
                                                        Complex pipeline with varying systems, flow and supply networking water controlling and regulating may lead to losses in water, pressure, and pump power. With Merchant AD Control valves, these demanding losses can be dropped to zero. Energy and water being the primary concerns in water management industry, the control valves are the optimal solution to overcome them.
                                                    </p>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        className={Template.redcolor}
                                                        variant="contained"
                                                        endIcon={<ArrowForwardOutlinedIcon />}
                                                    >
                                                        Download Technical Datasheet
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <p>
                                                        Merchant AD Control valves finds application in both pressure reducing and pressure maintaining systems. Under network distribution systems where alternating pressures are to be delivered at the outlet section, our control valves work seamlessly avoiding the losses. Merchant AD Valves include control valves with pressure reduction, relieving, surge alerting and also combination of these pressure configurations.
                                                    </p>
                                                </Grid>
                                                <Grid container spacing={5}>
                                                    <Grid item xs={9}>
                                                        <Box>
                                                            <TableContainer>
                                                                <Table>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                VALVE TYPE
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                GATE VALVES
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>

                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Size Range
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            DN80-DN2600
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Seat Profile
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Resilient seated
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Types
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            1. Swing Check valve
                                                                            2. Ball Check Valves
                                                                            3. Wafer type Check valves
                                                                            4. Rubber Disc Check valves
                                                                            5. Silent Check valves
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            End Configurations
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Flanged end
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Leakage proofing
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Vulcanized EPDM
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Flanged joint
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Assembly Components
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Bolt, nuts, washers, Flange gaskets.
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className={Template.tableheading}>
                                                                            Flange standards
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            PN10, PN16, PN25, PN40
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Box>
                                                            <h4>
                                                                Explore Our Entire Ductile Iron Portfolio
                                                            </h4>
                                                            <ul>
                                                                <li>
                                                                    Pipes and Joints
                                                                </li>
                                                                <li>
                                                                    Valves
                                                                </li>
                                                                <li>
                                                                    Accessories
                                                                </li>
                                                                <li>
                                                                    Pumps
                                                                </li>
                                                            </ul>
                                                            <Button>View All</Button>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                    {/* tab section */}
                    <Container maxWidth="lg" sx={{ mt: 10 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Typography> <b> Merchant AD provides wide range of coating options,</b></Typography>
                                <Box>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={Template.accodionhead}>Coating</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Fusion bonded epoxy powder coat or 2-layer epoxy, with a minimum average film thickness of 250 microns specified by EN14901-1/ISO18468 can be applied or sprayed for
                                                <p>
                                                    Heavy duty, aggressive soil conditions and superior corrosion resistant property
                                                </p>
                                                <p>
                                                    Increased availability with compatibility of zero curing hours.
                                                </p>
                                                <p>
                                                    Can be customized to higher deposition rate on both internal and external layers of the fittings.
                                                </p>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                                <Box className={Template.boxbgcolor}>
                                    <p>Corrosive effluent TMPO Coating, complying to EN14901-2 for Fittings when operating temperatures are extreme within the range specified, highly intensive coating layer, which also maintains environmental pollution standards.</p>
                                    <p> Under requirements we also offer bituminous paint on the fittings externally with a minimum layer of 70 microns.</p>
                                    <p>We also provide external special lining like Enamel applied to a minimum of 150 microns with diffusion technology providing a strong physical and chemical bonding to the fitting.</p>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <b>
                                        Our lining standards for ductile iron have been tested ultimately to meet both drinking water hygiene and corrosion resistant property.
                                    </b>
                                </Typography>
                                <Box>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={Template.accodionhead}>Lining</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Polymer- modified cement mortar lining is provided internally with a smooth, dense, and continuous layer in accordance with EN545. Bitumen or epoxy coat is provided for the joints.
                                                <p>
                                                    Cement compositions are also varied accordingly to meet end demands,
                                                </p>
                                                <p>
                                                    Blast Furnace Slag cement mortar, as a binder which maintains the hygiene in drinking water efficiently.
                                                </p>
                                                <p>
                                                    Sulphate resistant cement mortar
                                                </p>
                                                <p>
                                                    High alumina cement mortar, which is best suitable and recommended for aggressive potable water application which protects the primary cement mortar layer composition.
                                                </p>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                                <Box className={Template.boxbgcolor}>
                                    <p>
                                        For preventing alkaline spike and tuberculation internally, seal coat layer is provided with ISO16132 standards.
                                    </p>
                                    <p>
                                        Customized Polyurethane lining, BSEN15655/ ISO8180, with our dual component spraying technology provides high electrical insulation between inflow fluid and DI inner walls.
                                    </p>
                                    <p>
                                        We also provide internal special lining like Enamel applied to a minimum of 150 microns with diffusion technology.
                                    </p>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>

                    {/* footer */}
                    <Grid container spacing={3} className={classes.bgimage} pb={5}>
                        <Grid item xs={4}>
                            <FooterCol>
                                <img className="ComLogo" src="/assets/cms-img/logowithnored.svg" alt="" />
                                <Typography>
                                    Merchant AD Our company's founders & CEO are electrical and
                                    mechanical engineers and businessman
                                </Typography>
                                <Typography>
                                    <Textlink>info@powercozmo.com</Textlink>
                                </Typography>
                            </FooterCol>
                        </Grid>
                        <Grid item xs={3}>
                            <FooterCol>
                                <Typography variant="h5">Quick Links</Typography>
                                <Box className={classes.borderr}></Box>
                                <Typography>
                                    <Textlink>About Us</Textlink>
                                </Typography>
                                <Typography>
                                    <Textlink href="/ductilepipePage/ductilePipe">
                                        Our Products
                                    </Textlink>
                                </Typography>
                                <Typography>
                                    <Textlink>Contact Us</Textlink>
                                </Typography>
                            </FooterCol>
                        </Grid>
                        <Grid item xs={3}>
                            <FooterCol>
                                <Typography variant="h5">Main Products</Typography>
                                <Box className={classes.borderr}></Box>
                                <Typography>
                                    <Textlink>Pipes</Textlink>
                                </Typography>
                                <Typography>
                                    <Textlink>Fittings</Textlink>
                                </Typography>
                                <Typography>
                                    <Textlink>Valves</Textlink>
                                </Typography>
                                <Typography>
                                    <Textlink>Accessories</Textlink>
                                </Typography>
                            </FooterCol>
                        </Grid>
                        <Grid item xs={2}>
                            <FooterCol>
                                <Typography variant="h5">Follow Us</Typography>
                                <Box className={classes.borderr}></Box>
                                <SocialIcons display="flex" sx={{ mt: 3 }}>
                                    <Link
                                        href="https://www.facebook.com/powercozmo.epg"
                                        target="_blank"
                                    >
                                        <FacebookIcon></FacebookIcon>
                                    </Link>
                                    <Link href="https://twitter.com/powercozmo" target="_blank">
                                        <TwitterIcon></TwitterIcon>
                                    </Link>
                                    <Link
                                        href="https://www.linkedin.com/company/powercozmo"
                                        target="_blank"
                                    >
                                        <LinkedInIcon></LinkedInIcon>
                                    </Link>
                                    <Link
                                        href="https://www.instagram.com/powercozmo/"
                                        target="_blank"
                                    >
                                        <InstagramIcon></InstagramIcon>
                                    </Link>
                                </SocialIcons>

                            </FooterCol>
                        </Grid>
                        <Grid item xs={12}>
                            <CopyrightTxt>
                                <Typography>
                                    © 2024 Merchant AD - All rights reserved.
                                </Typography>
                            </CopyrightTxt>
                        </Grid>
                    </Grid>
                </div >
            )}
        </>
    );
};
export default valves;
