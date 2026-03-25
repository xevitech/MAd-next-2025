import { Box, Grid, Link, List, ListItem, ListItemText, styled, Typography } from "@mui/material";
function Privacy() {
  const Textoverimg1 = styled(Typography)(() => ({
    fontSize: "40px  ",
    fontWeight: "700",
    color: "#FFFFFF",
    "@media only screen and (max-width: 900px)": {
      fontSize: "30px",
    },
    "@media only screen and (max-width: 600px)": {
      fontSize: "20px",
    },
    "@media only screen and (max-width: 340px)": {
      fontSize: "18px",
    },
  }));
  const Bgimage = styled(Box)(() => ({
    backgroundImage: `url('/assets/banners/commonbanner.png')`,
    height: "40vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "relative",
    width: "100%",
    "&:before": {
      content: '" "',
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.66)",
      position: "absolute",
    },
  }));
  const BannerTxt = styled(Box)(() => ({
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  }));
  const StyledContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    lineHeight: 1.6,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
    width: "80%",
    margin: "0 auto",
    "& .MuiTypography-h5": {
      fontWeight: 700
    },
    " .MuiTypography-h4": {
      fontWeight: 700,
      fontSize: "20px"
    },
    "& .MuiTypography-h6": {
      fontSize: "16px",
      fontWeight: 600
    },
    "& .MuiTypography-body1": {
      padding: "5px 0"
    },
    "& .MuiListItem-root": {
      padding: "0 10px"
    }
  }));

  const StyledList = styled(List)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }));
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box>
            <Bgimage>
              <BannerTxt>
                <Box>
                  <Textoverimg1 variant="h1">Privacy Policy</Textoverimg1>
                </Box>
              </BannerTxt>
            </Bgimage>
          </Box>
        </Grid>
      </Grid>
      <StyledContainer>
        <Box my={4}>
          <Typography paragraph>
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information
            when You use the Service and tells You about Your privacy rights and how the law protects You.
          </Typography>
          <Typography paragraph>
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and
            use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the
            Privacy Policy Generator.
          </Typography>

          <Box my={3}>
            <Typography variant="h5" gutterBottom>
              Interpretation and Definitions
            </Typography>

            <Typography variant="h6" gutterBottom>
              Interpretation
            </Typography>
            <Typography paragraph>
              The words of which the initial letter is capitalized have meanings defined under the following conditions. The
              following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Definitions
            </Typography>
            <Typography paragraph>
              For the purposes of this Privacy Policy:
            </Typography>

            <Box pl={2}>
              <Typography variant="body1" paragraph>
                <strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a
                party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled
                to vote for election of directors or other managing authority.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to
                Merchant AD.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a
                website, containing the details of Your browsing history on that website among its many uses.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Country</strong> refers to: Chandigarh, India.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital
                tablet.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Service</strong> refers to the Website.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the
                Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to
                provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company
                in analyzing how the Service is used.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Third-party Social Media Service</strong> refers to any website or any social network website through
                which a User can log in or create an account to use the Service.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or
                from the Service infrastructure itself (for example, the duration of a page visit).
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Website</strong> refers to Merchant AD, accessible from <a href="https://dev.Merchant AD.com/">https://dev.Merchant AD.com/</a>
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity
                on behalf of which such individual is accessing or using the Service, as applicable.
              </Typography>
            </Box>
            <Box my={4}>
              <Typography variant="h4" gutterBottom>
                Collecting and Using Your Personal Data
              </Typography>

              <Typography variant="h5" gutterBottom>
                Types of Data Collected
              </Typography>

              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Personal Data
                </Typography>
                <Typography paragraph>
                  While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be
                  used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Email address" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="First name and last name" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Phone number" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Address, State, Province, ZIP/Postal code, City" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Usage Data" />
                  </ListItem>
                </List>
              </Box>

              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Usage Data
                </Typography>
                <Typography paragraph>
                  Usage Data is collected automatically when using the Service.
                </Typography>
                <Typography paragraph>
                  Usage Data may include information such as Your Device's Internet Protocol address (e.g., IP address), browser
                  type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on
                  those pages, unique device identifiers, and other diagnostic data.
                </Typography>
                <Typography paragraph>
                  When You access the Service by or through a mobile device, We may collect certain information automatically,
                  including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of
                  Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device
                  identifiers, and other diagnostic data.
                </Typography>
                <Typography paragraph>
                  We may also collect information that Your browser sends whenever You visit our Service or when You access the
                  Service by or through a mobile device.
                </Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Information from Third-Party Social Media Services
                </Typography>
                <Typography paragraph>
                  The Company allows You to create an account and log in to use the Service through the following Third-party Social
                  Media Services:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Google" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Facebook" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Instagram" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Twitter" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="LinkedIn" />
                  </ListItem>
                </List>
                <Typography paragraph>
                  If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may
                  collect Personal data that is already associated with Your Third-Party Social Media Service's account, such as
                  Your name, Your email address, Your activities, or Your contact list associated with that account.
                </Typography>
                <Typography paragraph>
                  You may also have the option of sharing additional information with the Company through Your Third-Party Social
                  Media Service's account. If You choose to provide such information and Personal Data, during registration or
                  otherwise, You are giving the Company permission to use, share, and store it in a manner consistent with this
                  Privacy Policy.
                </Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Tracking Technologies and Cookies
                </Typography>
                <Typography paragraph>
                  We use Cookies and similar tracking technologies to track the activity on Our Service and store certain
                  information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to
                  improve and analyze Our Service. The technologies We use may include:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Cookies or Browser Cookies"
                      secondary="A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Web Beacons"
                      secondary="Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity)."
                    />
                  </ListItem>
                </List>
                <Box my={4}>
                  <Typography variant="h4" gutterBottom>
                    Use of Cookies
                  </Typography>

                  <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                      Necessary / Essential Cookies
                    </Typography>
                    <Typography>
                      <strong>Type:</strong> Session Cookies
                    </Typography>
                    <Typography>
                      <strong>Administered by:</strong> Us
                    </Typography>
                    <Typography paragraph>
                      Purpose: These Cookies are essential to provide You with services available through the Website and to enable You
                      to use some of its features. They help authenticate users and prevent fraudulent use of user accounts. Without
                      these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide
                      You with those services.
                    </Typography>
                  </Box>

                  <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                      Cookies Policy / Notice Acceptance Cookies
                    </Typography>
                    <Typography>
                      <strong>Type:</strong> Persistent Cookies
                    </Typography>
                    <Typography>
                      <strong>Administered by:</strong> Us
                    </Typography>
                    <Typography paragraph>
                      Purpose: These Cookies identify if users have accepted the use of cookies on the Website.
                    </Typography>
                  </Box>

                  <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                      Functionality Cookies
                    </Typography>
                    <Typography>
                      <strong>Type:</strong> Persistent Cookies
                    </Typography>
                    <Typography>
                      <strong>Administered by:</strong> Us
                    </Typography>
                    <Typography paragraph>
                      Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your
                      login details or language preference. The purpose of these Cookies is to provide You with a more personal
                      experience and to avoid You having to re-enter your preferences every time You use the Website.
                    </Typography>
                  </Box>

                  <Typography paragraph>
                    For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy
                    or the Cookies section of our Privacy Policy.
                  </Typography>

                  <Typography variant="h4" gutterBottom>
                    Use of Your Personal Data
                  </Typography>

                  <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                      The Company may use Personal Data for the following purposes:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="To provide and maintain our Service, including to monitor its usage." />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To manage Your Account as a registered user of the Service." />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="For the performance of a contract for purchased products, items, or services." />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To contact You via email, calls, SMS, or push notifications for updates and communication." />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To provide You with news, offers, and general information unless opted out." />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To manage and respond to Your requests." />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="For business transfers or mergers involving Your data." />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="For other purposes like data analysis, marketing, and service improvement." />
                      </ListItem>
                    </List>
                  </Box>

                  <Typography variant="h4" gutterBottom>
                    Retention of Your Personal Data
                  </Typography>
                  <Typography paragraph>
                    The Company will retain Your Personal Data only as long as necessary for the purposes outlined in this Privacy
                    Policy, to comply with legal obligations, resolve disputes, and enforce agreements. Usage Data is generally
                    retained for shorter periods unless required for security or functionality improvement.
                  </Typography>

                  <Typography variant="h4" gutterBottom>
                    Transfer of Your Personal Data
                  </Typography>
                  <Typography paragraph>
                    Your information may be transferred to and maintained on computers located outside Your jurisdiction where data
                    protection laws may differ. The Company ensures adequate data security during such transfers.
                  </Typography>

                  <Typography variant="h4" gutterBottom>
                    Delete Your Personal Data
                  </Typography>
                  <Typography paragraph>
                    You may delete or request assistance in deleting Personal Data by accessing Your account settings or contacting Us.
                    Some data may be retained for legal or business purposes.
                  </Typography>

                  <Typography variant="h4" gutterBottom>
                    Disclosure of Your Personal Data
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="For business transactions like mergers or sales." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="To comply with legal obligations or valid requests by authorities." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="To protect rights, property, or safety of the Company, Users, or the public." />
                    </ListItem>
                  </List>

                  <Typography variant="h4" gutterBottom>
                    Children's Privacy
                  </Typography>
                  <Typography paragraph>
                    We do not knowingly collect data from anyone under 13. If you believe a child has provided Personal Data, please
                    contact Us to remove the data.
                  </Typography>

                  <Typography variant="h4" gutterBottom>
                    Links to Other Websites
                  </Typography>
                  <Typography paragraph>
                    Our Service may contain links to third-party sites. We are not responsible for their content or privacy practices.
                    Please review their Privacy Policies.
                  </Typography>

                  <Typography variant="h4" gutterBottom>
                    Changes to this Privacy Policy
                  </Typography>
                  <Typography paragraph>
                    We may update this Privacy Policy periodically. Changes will be notified via email or a prominent notice on our
                    Service. Please review this policy periodically.
                  </Typography>

                  <Typography variant="h4" gutterBottom>
                    Contact Us
                  </Typography>
                  <Typography paragraph>
                    If you have questions, visit our contact page:{' '}
                    <Link href="https://dev.Merchant AD.com/contact-us" target="_blank">
                      Contact Us
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

      </StyledContainer>


    </div>
  );
}

export default Privacy;
