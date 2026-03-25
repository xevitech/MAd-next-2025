import { Box, Container, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { apiClient } from "../common/common";
import {
  Address,
  BackgroundImage,
  BannerTxt,
  BgCircle,
  Bgimage,
  BoxHeading,
  BoxOne,
  BoxSubHeading,
  ButtonBox,
  ButtonText,
  ButtonoverCard,
  CicleImage,
  ContactUsPara,
  FirstContainer,
  FlexBox,
  HeadingText,
  Headingbox,
  InputBox,
  Leaveus,
  Leaveusspan,
  MainBox,
  Sliderbox,
  SliderboxDots,
  Sliderboxstyle,
  SubHeading,
  TextBox,
  Textoverimg1,
  TypographyBorderline,
} from "./style";
function ContactUS() {
  const [loader, setLoader] = useState<boolean>(false);
  const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter email"),
    name: Yup.string().required("Please enter name"),
    subject: Yup.string().required("Please enter subject"),
    message: Yup.string().required("Please enter message"),
  });
  useEffect(() => {
    document.body.classList.add("cms-body");
    return ()=>{
    document.body.classList.remove("cms-body");
    }
  });
  const formik = useFormik({
    validationSchema: validation,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    onSubmit: async (values) => {
      setLoader(true);
      let response = await apiClient("front/create_contact", "post", {
        body: values,
      });
      if (response.status == 200) {
        toast.success("request sent successfully");
      } else {
        toast.error("Something went wrong!");
      }
      formik.resetForm();
      setLoader(false);
    },
  });

  return (
    <>
      <Box sx={{ backgroundColor: "#fff"}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box>
              <Bgimage>
                <BannerTxt>
                  <Box>
                    <Textoverimg1 variant="h1">
                      Get In Touch With Us
                    </Textoverimg1>
                  </Box>
                </BannerTxt>
              </Bgimage>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <BackgroundImage>
              <Sliderbox>
                <SliderboxDots>
                  <Sliderboxstyle></Sliderboxstyle>
                  <Sliderboxstyle></Sliderboxstyle>
                  <Sliderboxstyle></Sliderboxstyle>
                </SliderboxDots>
              </Sliderbox>
              <Box>
                <BoxOne>
                  <Headingbox>
                    <HeadingText>
                      Merchant AD | the best industry services
                    </HeadingText>
                  </Headingbox>
                  <Box sx={{ marginTop: "8px" }}>
                    <SubHeading>
                      We are the modern marketplace in an outdated industry. 
                    </SubHeading>
                  </Box>
                </BoxOne>
              </Box>
              <Box>
                <FirstContainer maxWidth={"xl"}>
                  <Grid container spacing={3} sx={{ justifyContent: "center" }}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={5}
                      lg={5}
                      xl={5}
                      mt={5}
                      sx={{ dispaly: "flex", alignItems: "stretch" }}
                    >
                      <MainBox>
                        <BgCircle>
                          <CicleImage
                            src="/assets/IndianFlag.svg"
                            alt="Indian Flag"
                          />
                        </BgCircle>
                        <TextBox>
                          <Box>
                            <BoxHeading>Office</BoxHeading>
                          </Box>
                          <Box sx={{ marginTop: "20px" }}>
                            <BoxSubHeading>
                              Your feedback and inquiries help us serve you
                              better. Contact us anytime; we're eager to hear
                              from you.
                            </BoxSubHeading>
                          </Box>
                          <Box sx={{ marginTop: "20px", width: "100%" }}>
                            <Box>
                              <FlexBox>
                                <img
                                  src="/assets/Location.svg"
                                  alt="location icon"
                                />
                                <Address>
                                 #70, Tribune Parivar, Zirakpur, Mohali (Chandigarh)
                                </Address>
                              </FlexBox>
                            </Box>
                            <Box sx={{ marginTop: "10px" }}>
                              <FlexBox>
                                <img
                                  src="/assets/Dialing.svg"
                                  alt="call icon"
                                />
                                <a href="tel:+ (91) 964 642 5589">
                                  <Address>+ (91) 7307147096</Address>
                                </a>
                              </FlexBox>
                            </Box>
                            <Box sx={{ marginTop: "10px" }}>
                              <FlexBox>
                                <img src="/assets/Mail.svg" alt="mail icon" />
                                <a href="mailto:info@powercozmo.com">
                                  <Address>care@merchantad.com</Address>
                                </a>
                              </FlexBox>
                            </Box>
                          </Box>
                        </TextBox>
                        <Box
                          sx={{
                            marginTop: "22px",
                            width: "100%",
                            border: "1px solid #E4E4E4",
                            padding: "8px",
                            borderRadius: "8px",
                          }}
                        >

                          
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.4046109720102!2d76.82266197422884!3d30.678890074610297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb55581a8fff%3A0x19f5f3992fa4b896!2s70%2C%20Tribune%20Colony%20Rd%2C%20Baltana%2C%20Zirakpur%2C%20Punjab%20140604!5e0!3m2!1sen!2sin!4v1773068557913!5m2!1sen!2sin"
                            width="100%"
                            height="160"
                            style={{ border: "0" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </Box>
                      </MainBox>
                    </Grid>

                    
                  </Grid>
                </FirstContainer>
              </Box>
            </BackgroundImage>
          </Grid>
        </Grid>
        <Box mt={{ xl: 10, sm: 8, xs: 4, lg: 6 }}>
          <Container maxWidth={"xl"}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={{ textAlign: "center" }}>
                  <HeadingText>Merchant AD | Send Us a Message</HeadingText>
                  <SubHeading>
                    We are the modern marketplace in an outdated industry
                  </SubHeading>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                <Box>
                  <Leaveus>
                    Leave us a message.
                    <Leaveusspan> we'll be in touch.</Leaveusspan>
                  </Leaveus>
                </Box>
                <Box>
                  <ContactUsPara>
                    Your feedback is important to us. If you have any questions,
                    suggestions, or comments, please don't hesitate to contact
                    us. We value your input and aim to provide the best service
                    possible.
                  </ContactUsPara>
                </Box>
                <Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <InputBox>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { width: "100%" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={(e) => {
                              formik.setFieldValue("name", e.target.value);
                              formik.setFieldError("name", "");
                            }}
                            helperText={formik.errors.name}
                            error={formik.errors.name ? true : false}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { width: "100%" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={(e) => {
                              formik.setFieldValue("email", e.target.value);
                              formik.setFieldError("email", "");
                            }}
                            helperText={formik.errors.email}
                            error={formik.errors.email ? true : false}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { width: "100%" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            label="Subject"
                            variant="outlined"
                            name="subject"
                            value={formik.values.subject}
                            onChange={(e) => {
                              formik.setFieldValue("subject", e.target.value);
                              formik.setFieldError("subject", "");
                            }}
                            helperText={formik.errors.subject}
                            error={formik.errors.subject ? true : false}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                          component="form"
                          sx={{
                            "& .MuiTextField-root": { width: "100%" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <Box>
                            <TextField
                              id="outlined-multiline-static"
                              label="Your Message"
                              multiline
                              rows={4}
                              name="message"
                              value={formik.values.message}
                              onChange={(e) => {
                                if (
                                  e.target.value.match(
                                    /^[A-Za-z0-9.,@/\{\}\[\]\+\-*&^%$#!=)("";:?\s]*$/
                                  )
                                )
                                  formik.setFieldValue(
                                    "message",
                                    e.target.value
                                  );
                                formik.setFieldError("message", "");
                              }}
                              helperText={formik.errors.message}
                              error={formik.errors.message ? true : false}
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <ButtonBox>
                          <ButtonoverCard type="submit" disabled={loader}>
                            {loader ? (
                              <ThreeDots
                                height="40"
                                width="40"
                                radius="9"
                                color="white"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                visible={true}
                              />
                            ) : (
                              <>
                                <ButtonText>Submit Request!</ButtonText>
                                <TypographyBorderline component="span"></TypographyBorderline>
                              </>
                            )}
                          </ButtonoverCard>
                        </ButtonBox>
                      </Grid>
                    </Grid>
                  </form>
                </InputBox>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default ContactUS;
