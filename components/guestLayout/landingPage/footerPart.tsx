import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Grid, Link, Typography } from "@mui/material";
import { CopyrightTxt, FooterCol, SocialIcons, Textlink, useStyles } from './styles';

const FooterPage=()=>{
    const {classes} = useStyles();


    return(
      <Grid container spacing={3} className={classes.bgimage} pb={2} >
      <Grid item xs={4} >
          <FooterCol>
              <img className="ComLogo" src='/assets/logo2.svg' alt='' />
              <Typography>Merchant AD Our company's founders & CEO are electrical and mechanical engineers and businessman</Typography>
              <Typography><Textlink>info@merchantad.com</Textlink></Typography>
          </FooterCol>
      </Grid>
      <Grid item xs={3}>
          <FooterCol>
              <Typography variant="h5">Quick Links</Typography>
              <Box className={classes.borderr}></Box>
              <Typography><Textlink>About Us</Textlink></Typography>
              <Typography><Textlink href="/ductilepipePage/ductilePipe">Our Products</Textlink></Typography>
              <Typography><Textlink>Contact Us</Textlink></Typography>
          </FooterCol>
      </Grid>
      {/* <Grid item xs={3}>
          <FooterCol>
              <Typography variant="h5">Main Products</Typography>
              <Box className={classes.borderr}></Box>
              <Typography><Textlink>Pipes</Textlink></Typography>
              <Typography><Textlink>Fittings</Textlink></Typography>
              <Typography><Textlink>Valves</Textlink></Typography>
              <Typography><Textlink>Accessories</Textlink></Typography>
          </FooterCol>
      </Grid> */}
      <Grid item xs={2}>
          <FooterCol>
              <Typography variant="h5">Follow Us</Typography>
              <Box className={classes.borderr}></Box>
              <SocialIcons display='flex' sx={{ mt: 3 }}>
                <Link href="https://www.facebook.com" target="_blank"><FacebookIcon></FacebookIcon></Link>
                <Link href="https://twitter.com" target="_blank"><TwitterIcon></TwitterIcon></Link>
                <Link href="https://www.linkedin.com/" target="_blank"><LinkedInIcon></LinkedInIcon></Link>
                <Link href="https://www.instagram.com/" target="_blank"><InstagramIcon></InstagramIcon></Link>
              </SocialIcons>
          </FooterCol>
      </Grid>
      <Grid item xs={12}>
          <CopyrightTxt>
              <Typography>© 2026 Merchant AD - All rights reserved.</Typography>
          </CopyrightTxt>
      </Grid>
  </Grid>
    )
}
export default FooterPage;