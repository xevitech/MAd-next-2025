import React, { useEffect, useState } from "react";
import Template from "./template.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';


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


const InnerPipePage = (props: TabPanelProps) => {
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
                                    src="/assets/cms-img/pcourengineering.png"
                                    alt="Pipes"
                                    title="Pipes Image"
                                    height='50vh'
                                />
                                <div className={Template.banner_txt}>
                                    <h1>Merchant AD Pipelines and Water Systems</h1>
                                    <h2>Pipes & Fittings- Valves & Pumps</h2>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    {/* START Second Section part*/}
                    <div className={Template.service_sec}>
                        <div className={Template.service_secinn}>
                            <Container maxWidth="lg">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} mt={4}>
                                        <div
                                        >
                                            <p className={Template.paragraph}>
                                                <b>WATER PRO Ductile Iron Pipes</b> of Merchant AD Ductile Iron portfolio is one of the sufficient and most preferred product line offering Ductile Iron pipes with European Standard line for the Pipes. <b>WATER PRO series</b> is finding widespread applications among the <b>Middle East, Asian, African countries</b> for their Standard recognition and compatible for economical project requirements.
                                            </p>
                                            <p className={Template.paragraph}>
                                                <b>WATER PRO Pipes</b> are developed for our clients to give a dual benefit of both efficient and economical project requirement solutions. They are in strict adherence to EN545 norms and regulations for Ductile iron pipes, fittings, and accessories. The centrifugally spun pipes are designed, and quality assured for longevity and reliability. They are efficient proven even under aggressive water flowing inside the pipeline.
                                            </p>


                                            <p className={`${Template.paragraph} ${Template.paragraphmarginT}`}>
                                                <b>Soil and Environmental</b> conditions influence the pipeline durability. Soil conditions vary from medium to very aggressive may corrode the pipeline earlier than its expected time. Ambient conditions like humidity, rainfall, temperature also are highly influential factors and are to be considered while designing the parameters for pipeline. Installation like above and below ground also comprises this.
                                            </p>
                                            <p className={Template.paragraph}>
                                                Merchant AD Ductile Iron portfolio offers conventional, strengthening, and unique lining and coating with highly efficient applying technologies to overcome and allow the pipeline to handle even the harshest and worst environmental conditions. They are optimized to balance between maintaining the water hygiene and pipes longevity.
                                            </p>
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <div>
                                            <h4>
                                                <b> Cost Analysis. Standardized
                                                    Top industry quality,
                                                    Life Cycle Durability </b>
                                                <span className={Template.TextSize}>
                                                    Meticulous Design, Quality are Promises of
                                                    <span className={Template.text}> Water Pro.</span>
                                                </span>
                                            </h4>
                                        </div>
                                        <div className={Template.BothImage}>
                                            <img
                                                className={Template.SecondSectionImg}
                                                src="/assets/cms-img/strong_and_tough-300x200.jpg"
                                                alt=""
                                            />
                                            <img
                                                className={`${Template.SecondSectionSettingImg} ${Template.Applogo}`}
                                                src="/assets/cms-img/pattern-4.png"
                                                alt="Setting Image"
                                            />
                                        </div>
                                        <Button
                                            className={Template.redcolor}
                                            variant="contained"
                                            endIcon={<ArrowForwardOutlinedIcon />}
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
                                    Water Pro Characteristics
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
                                                    Regulations of DI Pipes
                                                </p>
                                                <p className={Template.normal_Textcolor}>
                                                    Confirming to EN 545 regulations of
                                                    Ductile Iron Pipes, Joints, Fittings,
                                                    and Accessories.
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
                                                    High Pressure Applications
                                                </p>
                                                <p className={Template.normal_Textcolor}>
                                                    Operating pressure 40 Bar, permissible up to 48 Bar
                                                    and test pressure withstanding up to 53 Bar for high
                                                    pressure applications.
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
                                                    Traffic Loading Conditions
                                                </p>
                                                <p className={Template.normal_Textcolor}>
                                                    High rated hoop stress and axial strength material
                                                    composition maintaining the reliability even for
                                                    underground, disturbances,
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
                                                <p className={Template.Htext}>Feasibility</p>
                                                <p className={Template.normal_Textcolor}>
                                                    Feasibility with Push-On joint, Flanged Joint
                                                    confirming to EN 545 and Restrained Joint to ISO10804.
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
                                                <p className={Template.Htext}>Suitable Deviation</p>
                                                <p className={Template.normal_Textcolor}>
                                                    50 of angular deflection providing suitable deviation
                                                    in the pipeline avoiding additional components.
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
                                                <p className={Template.Htext}>PC Strength</p>
                                                <p className={Template.normal_Textcolor}>
                                                    PC Strength MAX lining can protect pipeline and
                                                    cement lining even while handling aggressive
                                                    and low pH potable water.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={Template.BlockIcons}>
                                            <img
                                                className={Template.BlockIconImg}
                                                src="/assets/cms-img/pcshield.png"
                                                alt=""
                                                width='65'
                                                height='65'
                                            />
                                            <Box className={Template.textmarginleft}>
                                                <p className={Template.Htext}>PC Shield MAX Coating</p>
                                                <p className={Template.normal_Textcolor}>
                                                    PC Shield MAX Coating safeguards the pipeline against
                                                    extreme climatic conditions, environmental hazards and
                                                    provides decades of optimum conditions.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={Template.BlockIcons}>
                                            <img
                                                className={Template.BlockIconImg}
                                                src="/assets/cms-img/trenchless.png"
                                                alt=""
                                                width='65'
                                                height='65'
                                            />
                                            <Box className={Template.textmarginleft}>
                                                <p className={Template.Htext}>
                                                    Trenchless Installation
                                                </p>
                                                <p className={Template.normal_Textcolor}>
                                                    Trenchless installation reducing the overheads for
                                                    soil, manpower, heavy equipment, and time.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Container>
                    {/* END Water Pro Characteristics part*/}

                    {/* tab section */}
                    <Box sx={{ px: 6 }}>
                        <h4 className={Template.common_head}>
                            Merchant AD <b>PIPELINE</b>  AND <b>WATER PRO PORTFOLIO</b>
                        </h4>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
                                    "& .MuiTabs-indicator": { display: 'none' },
                                    "& .MuiTab-root.Mui-selected": {
                                        color: "white", backgroundColor: '#D7282F'
                                    }
                                }}>
                                    <Tab label="Water Pro I C40 " {...a11yProps(0)} sx={{ backgroundColor: 'black', color: 'white', marginRight: '10px', borderRadius: '30px' }} />
                                    <Tab label="Water Pro II C30" {...a11yProps(1)} sx={{ backgroundColor: 'black', color: 'white', marginRight: '10px', borderRadius: '30px' }} />
                                    <Tab label="Water Pro III C25" {...a11yProps(2)} sx={{ backgroundColor: 'black', color: 'white', marginRight: '10px', borderRadius: '30px' }} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <h2>Key Specifications</h2>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />SIZE RANGE: DN80-DN300.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />PERMISSIBLE PRESSURE: Up to 48 Bar.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />STANDARDIZED LENGTHS: 5.5m/6.0m.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />END CONFIGURATIONS: Socket/Spigot/Flange.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />Flange Standards – PN10, PN16, PN25, PN40.</p>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Box display='flex' alignItems='center'>
                                            <Box>
                                                <h5 style={{ fontSize: '1.2em' }}>Dimensional Characteristics</h5>
                                            </Box>
                                            <Box>
                                                <img src="/assets/cms-img/bluepipe.png" alt="" width='100%' />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <h2>Key Specifications</h2>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />SIZE RANGE: DN350-DN600..</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />PERMISSIBLE PRESSURE: Up to 36 Bar.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />STANDARDIZED LENGTHS: 5.5m/6.0m.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />END CONFIGURATIONS: Socket/Spigot/Flange.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />Flange Standards – PN10, PN16, PN25, PN40.</p>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Box display='flex' alignItems='center'>
                                            <Box>
                                                <h5 style={{ fontSize: '1.2em' }}>Dimensional Characteristics</h5>
                                            </Box>
                                            <Box>
                                                <img src="/assets/cms-img/bluepipe.png" alt="" width='100%' />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <h2>Key Specifications</h2>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />SIZE RANGE: DN700-DN2 600.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />PERMISSIBLE PRESSURE: Up to 48 Bar.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />STANDARDIZED LENGTHS: 5.5m/6.0m.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />END CONFIGURATIONS: Socket/Spigot/Flange.</p>
                                        <p className={Template.tabsli}><KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#d7282f' }} />Flange Standards – PN10, PN16, PN25, PN40.</p>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Box display='flex' alignItems='center'>
                                            <Box>
                                                <h5 style={{ fontSize: '1.2em' }}>Dimensional Characteristics</h5>
                                            </Box>
                                            <Box>
                                                <img src="/assets/cms-img/bluepipe.png" alt="" width='100%' />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </Box>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Container maxWidth='xl' sx={{ textAlign: 'center' }}>
                                    <h5 style={{ fontSize: '18px', lineHeight: '1.5em' }}>DS <span style={{ fontWeight: '100', fontSize: '16px' }}>-Socket Depth, in mm.</span> <span>| LS </span><span style={{ fontWeight: '100', fontSize: '16px' }}>-Length of Socket, in mm.</span> <span>e </span><span style={{ fontWeight: '100', fontSize: '16px' }}>-Nominal wall thickness, in mm.</span><span> | c </span><span style={{ fontWeight: '100', fontSize: '16px' }}>-Internal lining thickness, in mm.</span><span> Lu </span><span style={{ fontWeight: '100', fontSize: '16px' }}>Standardized length, in metres.</span><span> Effective Laying Length, L is = Lu-(LS/1000), in metres</span><span>DI </span><span style={{ fontWeight: '100', fontSize: '16px' }}>-Internal diameter of the pipe, in mm.</span><span> | DE </span><span style={{ fontWeight: '100', fontSize: '16px' }}>-External Diameter, in mm.</span></h5>
                                </Container>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* Start table  */}
                    <Box px={6} mt={5}>
                        <TableContainer component={Paper}>
                            <Table className={Template.list_Table} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><b>Size</b></TableCell>
                                        <TableCell align="left"><b>Class</b></TableCell>
                                        <TableCell align="left"><b>External Diameter</b></TableCell>
                                        <TableCell align="left"><b>Nominal thickness</b></TableCell>
                                        <TableCell align="left"><b>Outer socket diameter</b></TableCell>
                                        <TableCell align="left"><b>Socket Depth</b></TableCell>
                                        <TableCell align="left"><b>Pipe Barrel weight per metre</b></TableCell>
                                        <TableCell align="left"><b>Deflection</b></TableCell>
                                        <TableCell align="left"><b>Internal lining</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.name}</TableCell>
                                            <TableCell align="left">{row.calories}</TableCell>
                                            <TableCell align="left">{row.next}</TableCell>
                                            <TableCell align="left">{row.carbs}</TableCell>
                                            <TableCell align="left">{row.protein}</TableCell>
                                            <TableCell align="left">{row.caries}</TableCell>
                                            <TableCell align="left">{row.matt}</TableCell>
                                            <TableCell align="left">{row.card}</TableCell>
                                            <TableCell align="left">{row.prot}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {/* coating and lining section starts here */}

                    <Box px={6} mt={8}>
                        <h4 className={Template.common_head}>
                            COATINGS AND LININGS
                        </h4>
                        <Box>
                            <Box sx={{ borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
                                    backgroundColor: '#f1f1f1', width: "100%",
                                    "& .MuiTabs-indicator": { display: 'none' },
                                    "& .MuiTab-root.Mui-selected": {
                                        color: "white", backgroundColor: '#04000f'
                                    }
                                }}>
                                    <Tab label="Lining Options" {...a11yProps(0)} className={Template.tabheading} />
                                    <Tab label="Coating Options" {...a11yProps(1)} className={Template.tabheading} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <Box>
                                    <p className={Template.firsttabtext}>Internal cement mortar lining is an integral part in the process of making the pipes. The Iron pipeline carrying water as medium is exposed to reactions with water and its substances, acidic nature and aggressiveness of the potable water, incrustation, including contamination, discoloration, or turbidity on the water.
                                    </p>
                                    <p className={`${Template.firsttabtext} ${Template.firsttabtextmt}`}>
                                        <b>Merchant AD lining configurations</b> are provided to maintain the balance optimum between the metallic material and water hygiene safeguarding. In the final point internal lining of the ductile iron pipes are confirmed with the water medium carried and the nature of usage and application.
                                    </p>
                                    <Grid container spacing={3} mt={0}>
                                        <Grid item xs={4}>
                                            <h2 className={Template.tabsubheadingmb}>Standard Lining</h2>
                                            <p className={Template.firsttabtext}>Standard lining for DI Pipes involves ordinary Portland cement spun over the internal walls of the ductile iron pipes for a minimum of 2.5mm thickness confirming to ISO4179 general requirements with an optional seal coat can be provided.</p>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h2 className={Template.tabsubheadingmb}>
                                                PC Strength Lining
                                            </h2>
                                            <p className={Template.firsttabtext}>
                                                Lining is an efficient method to maintain the water hygiene and protect the pipeline. Merchant AD Standard Cement lining can be carried with carried composition of cement varying to the potable water and end requirements with an optional layer of seal coat can be provided.
                                            </p>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box><CircleOutlinedIcon sx={{ color: '#D7282f', fontSize: '20px' }} /></Box>
                                                <Box><p className={Template.firsttabtext}>
                                                    Blast Furnace Slag cement for maintaining the water hygiene in case of food processing, drinking water pipes.
                                                </p></Box>
                                            </Box>

                                            <p className={Template.firsttabtext}>
                                                <CircleOutlinedIcon sx={{ color: '#D7282f', fontSize: '20px' }} />  Sulphate resistant cement mortar to avoid sulphate salts formation which could attack the internal walls of the pipes.
                                            </p>
                                            <p className={Template.firsttabtext}>
                                                <CircleOutlinedIcon sx={{ color: '#D7282f', fontSize: '20px' }} /> High alumina cement mortar to carry aggressive and low pH potable water to avoid chemical erosion especially in coastal conditions and pipeline carrying industrial wastewater.
                                            </p>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h2 className={Template.tabsubheadingmb}>PC Strength Max Lining</h2>
                                            <p className={Template.firsttabtext}>
                                                Polyurethane lining confirming to EN15655 can be applied to handle wide range of medium flowing inside the pipeline from carrying drinking water, and industrial wastewater. They are susceptible and possess chemical, abrasion and corrosion resistance making them a viable option to line coat along the pipe inside with an optional layer of seal coat can be provided.
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Box>
                                    <p className={Template.firsttabtext}>External coating is again an integrated manufacturing process in the ductile iron pipes provided for protection against soil abrasion, acidity reserves in the soil, stray currents presence or occurrence, presence of gravels, refuses, cinders, slags, pollutions from wastes. Extensive and active understanding of soil parameters is recommended for selecting the best in configurations.
                                    </p>
                                    <p className={Template.firsttabtext}>
                                        <b>Merchant AD Coating configuration</b> helps protect the pipeline under material deterioration, erosion and supports for long usage over decades by safeguarding the metallic thickness and composition.
                                    </p>
                                    <Grid container spacing={3} mt={0}>
                                        <Grid item xs={4}>
                                            <h2 className={Template.tabsubheadingmb}>Standard Coating</h2>
                                            <p className={Template.firsttabtext}>Standard alloy coating of Aluminium and Zinc confirming with ISO8179-1 with a minimum deposition rate 130/200/400 gm/m2 is sprayed along the exterior surface of the pipes with finishing layer Bitumen or Epoxy paint in colours blue, red, or black with 70- or 100-microns thickness. The ZnAl coating has potential to handle higher resistive soils in both above and below ground laying conditions, lesser pH level and abrasive soils and in peaty soils. Merchant AD Standard coating insulates against stray currents too.</p>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h2 className={Template.tabsubheadingmb}>
                                                PC Shield Coating
                                            </h2>
                                            <p className={Template.firsttabtext}>
                                                Resin coating with thermosets such as Polyethylene and Polyurethane coating confirming to EN14628 layers with a minimum thickness of 1mm are provided on the external coat provides the maximum insulation and are non-prone to temperature cold flow. PC Shield Coating is sprayed on the pipe provides unparalleled hardness, impact resistance and indentation resistance along with corrosion resistance.
                                            </p>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <h2 className={Template.tabsubheadingmb}>PC Shield MAX Coating</h2>
                                            <p className={Template.firsttabtext}>
                                                <b>Cement mortar</b> can also be provided as a coating layer on the external surface of the pipes, provides and protects the pipes against external ambient conditions, impact loads, stresses and mitigates the external media contact to the pipes. They give excellent mechanical stress addition property to the pipe during transportation and installation. PC Shield MAX coated pipes can be installed by trenchless installation techniques too. Coating of Joint areas are provided with either Bitumen, Epoxy, Polyurethane in accordance with BSEN 3416,14901, 15189 respectively.
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </TabPanel>
                        </Box>
                    </Box>
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
                </div>
            )}
        </>
    );
};
export default InnerPipePage;
