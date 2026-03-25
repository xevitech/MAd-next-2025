import * as React from "react";
import { Box, Button, Grid, Link, Typography, styled } from "@mui/material";
import {
  CardHeading,
  KanbanItem,
  KanbanItemHeader,
  ItemInfo,
  CardLayout,
  CardStyle,
  CardInfo,
  CardMail,
  CompanyInfo,
  ComanyIcon,
  AnnualRevenue,
  PriceValue,
  LeadNameValue,
  RevenueStack,
  EmailStack,
  LeadNumber,
  PriceBoxV,
  AddIcon,
  KanbanItemGreen,
  KanbanItemHeaderBlue,
  KanbanItemBlue,
  KanbanItemHeaderRed,
  KanbanItemRed,
  KanbanItemPurple,
  KanbanItemHeaderPurple,
  KanbanBoxContainer,
  CustomChip,
  LabelChipStack,
  CustomChip2,
  MoreTags,
  StyledBootstrapDialog,
} from "./style";
import Checkbox from "@mui/material/Checkbox";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Image from "next/image";
import ActivityScheduler from "../Leads/ActivityScheduler";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { SmallOutineBtn } from "../commonStyle";
import KanbanLayout from "./DraggableKanban";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    "&::-webkit-scrollbar": {
      width: "0.6em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#bbbaba",
      borderRadius: "8px",
    },
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    background: "#F5F5F5",
  },
  "& .MuiPaper-root": {
    maxWidth: "900px",
  },
  "& .MuiDialogTitle-root": {
    background: "#F5F5F5",
    color: "#4a4a4a",
    fontSize: "18px",
    fontWeight: "600",
    padding: "6px 16px",
  },
}));
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 0,
            color: "#4a4a4a",
          }}
        >
          <CancelOutlinedIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const KanbanView = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <StyledBootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Schedule an activity
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box>
              <ActivityScheduler />
            </Box>
          </DialogContent>
          <DialogActions>
            <SmallOutineBtn onClick={handleClose} variant="outlined">
              Save
            </SmallOutineBtn>
            <SmallOutineBtn onClick={handleClose} variant="outlined">
              Cancel
            </SmallOutineBtn>
          </DialogActions>
        </StyledBootstrapDialog>
      </div>
      <KanbanBoxContainer>        
          <KanbanLayout/>
          {/* <Grid item>
            <KanbanItem>
              <KanbanItemGreen>
                <KanbanItemHeader>
                  <ItemInfo>
                    <CardHeading variant="h5">Untouched</CardHeading>
                    <Checkbox {...label} defaultChecked size="small" />
                  </ItemInfo>
                  <PriceBoxV>
                    <PriceValue>$ 600,000.00 </PriceValue>
                    <LeadNumber> 4 Lead</LeadNumber>
                  </PriceBoxV>
                </KanbanItemHeader>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#" onClick={handleClickOpen}>
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                    <LabelChipStack alignItems="center">
                      <CustomChip color="primary">Industry</CustomChip>
                      <CustomChip2>Lead Source</CustomChip2>
                      <CustomChip color="primary">Chat</CustomChip>
                      <Link href="#">
                        <MoreTags>and 1more</MoreTags>
                      </Link>
                    </LabelChipStack>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Jaivik Koundal</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
              </KanbanItemGreen>
            </KanbanItem>
          </Grid> */}
          {/* <Grid item>
            <KanbanItem>
              <KanbanItemBlue>
                <KanbanItemHeaderBlue>
                  <ItemInfo>
                    <CardHeading variant="h5" sx={{ color: "#4476CF" }}>
                      Qualified
                    </CardHeading>
                    <Checkbox {...label} defaultChecked size="small" />
                  </ItemInfo>
                  <PriceBoxV>
                    <PriceValue>$ 600,000.00 </PriceValue>
                    <LeadNumber> 4 Lead</LeadNumber>
                  </PriceBoxV>
                </KanbanItemHeaderBlue>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#E3EEFF" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#E3EEFF" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
              </KanbanItemBlue>
            </KanbanItem>
          </Grid>
          <Grid item>
            <KanbanItem>
              <KanbanItemRed>
                <KanbanItemHeaderRed>
                  <ItemInfo>
                    <CardHeading variant="h5" sx={{ color: "#D7282F" }}>
                      Non-Qualified
                    </CardHeading>
                    <Checkbox {...label} defaultChecked size="small" />
                  </ItemInfo>
                  <PriceBoxV>
                    <PriceValue>$ 600,000.00 </PriceValue>
                    <LeadNumber> 4 Lead</LeadNumber>
                  </PriceBoxV>
                </KanbanItemHeaderRed>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#FFEEEF" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#FFEEEF" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#FFEEEF" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
              </KanbanItemRed>
            </KanbanItem>
          </Grid>
          <Grid item>
            <KanbanItem>
              <KanbanItemPurple>
                <KanbanItemHeaderPurple>
                  <ItemInfo>
                    <CardHeading variant="h5" sx={{ color: "#A386C7" }}>
                      Nurturing Leads
                    </CardHeading>
                    <Checkbox {...label} defaultChecked size="small" />
                  </ItemInfo>
                  <PriceBoxV>
                    <PriceValue>$ 600,000.00 </PriceValue>
                    <LeadNumber> 4 Lead</LeadNumber>
                  </PriceBoxV>
                </KanbanItemHeaderPurple>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#F7F2FE" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#F7F2FE" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#F7F2FE" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
              </KanbanItemPurple>
            </KanbanItem>
          </Grid>
          <Grid item>
            <KanbanItem>
              <KanbanItemGreen>
                <KanbanItemHeader>
                  <ItemInfo>
                    <CardHeading variant="h5">Untouched</CardHeading>
                    <Checkbox {...label} defaultChecked size="small" />
                  </ItemInfo>
                  <PriceBoxV>
                    <PriceValue>$ 600,000.00 </PriceValue>
                    <LeadNumber> 4 Lead</LeadNumber>
                  </PriceBoxV>
                </KanbanItemHeader>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                    <LabelChipStack alignItems="center">
                      <CustomChip color="primary">Industry</CustomChip>
                      <CustomChip2>Lead Source</CustomChip2>
                      <Link href="#">
                        <MoreTags>and 1more</MoreTags>
                      </Link>
                    </LabelChipStack>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Jaivik Koundal</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
              </KanbanItemGreen>
            </KanbanItem>
          </Grid>
          <Grid item>
            <KanbanItem>
              <KanbanItemBlue>
                <KanbanItemHeaderBlue>
                  <ItemInfo>
                    <CardHeading variant="h5" sx={{ color: "#4476CF" }}>
                      Qualified
                    </CardHeading>
                    <Checkbox {...label} defaultChecked size="small" />
                  </ItemInfo>
                  <PriceBoxV>
                    <PriceValue>$ 600,000.00 </PriceValue>
                    <LeadNumber> 4 Lead</LeadNumber>
                  </PriceBoxV>
                </KanbanItemHeaderBlue>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#E3EEFF" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#E3EEFF" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
              </KanbanItemBlue>
            </KanbanItem>
          </Grid>
          <Grid item>
            <KanbanItem>
              <KanbanItemRed>
                <KanbanItemHeaderRed>
                  <ItemInfo>
                    <CardHeading variant="h5" sx={{ color: "#D7282F" }}>
                      Non-Qualified
                    </CardHeading>
                    <Checkbox {...label} defaultChecked size="small" />
                  </ItemInfo>
                  <PriceBoxV>
                    <PriceValue>$ 600,000.00 </PriceValue>
                    <LeadNumber> 4 Lead</LeadNumber>
                  </PriceBoxV>
                </KanbanItemHeaderRed>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#FFEEEF" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#FFEEEF" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#FFEEEF" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
              </KanbanItemRed>
            </KanbanItem>
          </Grid>
          <Grid item>
            <KanbanItem>
              <KanbanItemPurple>
                <KanbanItemHeaderPurple>
                  <ItemInfo>
                    <CardHeading variant="h5" sx={{ color: "#A386C7" }}>
                      Nurturing Leads
                    </CardHeading>
                    <Checkbox {...label} defaultChecked size="small" />
                  </ItemInfo>
                  <PriceBoxV>
                    <PriceValue>$ 600,000.00 </PriceValue>
                    <LeadNumber> 4 Lead</LeadNumber>
                  </PriceBoxV>
                </KanbanItemHeaderPurple>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#F7F2FE" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#F7F2FE" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
                <CardLayout>
                  <CardStyle>
                    <CardInfo>
                      <LeadNameValue variant="h5">Maya Dogra</LeadNameValue>
                      <Checkbox {...label} defaultChecked size="small" />
                    </CardInfo>
                    <EmailStack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <CardMail variant="body1">abc@gmail.com</CardMail>
                    </EmailStack>
                    <CompanyInfo>
                      <ComanyIcon sx={{ background: "#F7F2FE" }}>
                        <LocationCityIcon />
                      </ComanyIcon>
                      <Typography>Arneja Trading Co.</Typography>
                    </CompanyInfo>
                    <AnnualRevenue>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/dollar-icon.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography>2,50,978.00</Typography>
                          </RevenueStack>
                        </Grid>
                        <Grid item md={6}>
                          <RevenueStack
                            direction="row"
                            alignItems="center"
                            gap={1}
                          >
                            <Image
                              src="/assets/images/crm/country_img.svg"
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                            <Typography fontWeight={400}>Punjab</Typography>
                            <Link href="#">
                              <AddIcon />
                            </Link>
                          </RevenueStack>
                        </Grid>
                      </Grid>
                    </AnnualRevenue>
                  </CardStyle>
                </CardLayout>
              </KanbanItemPurple>
            </KanbanItem>
          </Grid> */}
      </KanbanBoxContainer>
    </>
  );
};
export default KanbanView;
