import { Box, Grid, Stack, Divider } from "@mui/material";
import {
  Certificatebutton,
  CertificateOuter,
  Text13,
  SliderBtnCol,
  CertificateThumb,
  ViewBtn,
  CertificateDetail,
} from "./Certificate.styled";
import React, { useState } from "react";
import PopoverSlider from "../PopoverSlider";
import Collapse from "@mui/material/Collapse";
import moment from "moment";
import { checkExpiry } from "@/components/common/common";

function CertificateSlideItem({ itemdata, data, images }: any) {
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (a: any, b: any) => {
    setOpen(false);
  };

  const CollapseHandler = () => {
    if (!viewMore) {
      setTimeout(() => {
        setViewMore((prev) => !prev);
      }, 200);
    } else {
      setViewMore((prev) => !prev);
    }
  };

  const allCertifcatesData = data?.map((ele) => ele?.row);

  const RenderField = (itemdata) => {
    if (itemdata.type == "certificate") {
      return [
        {
          title: "Type of Certification:",
          value: itemdata.type_of_certificate,
        },
        {
          title: "Reference No:",
          value: itemdata.reference_no,
        },
        {
          title: "Name:",
          value: itemdata.name,
        },
        {
          title: "Issued By:",
          value: itemdata.issued_by,
        },
        {
          title: "Start Date (validity period):",
          value: moment(itemdata.start_date).format("DD-MM-YYYY"),
        },
        {
          title: "End Date (validity period):",
          value: moment(itemdata.end_date).format("DD-MM-YYYY"),
        },
        {
          title: "Status:",
          value: checkExpiry(itemdata.end_date) ? "Active" : "Expired",
        },
      ];
    }
    if (itemdata.type == "honor") {
      return [
        {
          title: "Name:",
          value: itemdata.name,
        },
        {
          title: "Issued By:",
          value: itemdata.issued_by,
        },
        {
          title: "Certificate No:",
          value: itemdata.reference_no,
        },
      ];
    }
    if (itemdata.type == "patent") {
      return [
        {
          title: "Patent Name:",
          value: itemdata.name,
        },
        {
          title: "No. of Patent:",
          value: itemdata.no_of_patent,
        },
        {
          title: "Patent Type:",
          value: itemdata.type_of_patent,
        },
        {
          title: "Start Date (validity period):",
          value: moment(itemdata.start_date).format("DD-MM-YYYY"),
        },
        {
          title: "End Date (validity period):",
          value: moment(itemdata.end_date).format("DD-MM-YYYY"),
        },
        {
          title: "Status:",
          value: checkExpiry(itemdata.end_date) ? "Active" : "Expired",
        },
      ];
    }
    if (itemdata.type == "trademark") {
      return [
        {
          title: "Association Category:",
          value: itemdata.associate_category,
        },
        {
          title: "Source of Trademark:",
          value: itemdata.source_of_trademark,
        },
        {
          title: "Source:",
          value: itemdata.name,
        },
        {
          title: "Registration/Filling No:",
          value: itemdata.filling_no,
        },
        {
          title: "Start Date (validity period):",
          value: moment(itemdata.start_date).format("DD-MM-YYYY"),
        },
        {
          title: "End Date (validity period):",
          value: moment(itemdata.end_date).format("DD-MM-YYYY"),
        },
        {
          title: "Status:",
          value: checkExpiry(itemdata.end_date) ? "Active" : "Expired",
        },
      ];
    }
  };

  return (
    <CertificateOuter bord={true} p={{ xs: 1 }} mr={0.5} ml={0.5}>
      <Grid container spacing={{ xs: 1, md: 2, lg: 2 }}>
        <Grid item xs={12} sm={5} md={4} margin="auto">
          <SliderBtnCol>
            <Box textAlign="center">
              <CertificateThumb>
                <img
                  src={images[0]?.source}
                  alt={itemdata?.name}
                />
              </CertificateThumb>
              <ViewBtn mt={{ xs: 1 }}>
                <Certificatebutton onClick={handleClickOpen}>
                  View Certificate
                </Certificatebutton>
              </ViewBtn>
            </Box>

            {open && (
              <PopoverSlider
                open={open}
                handleClose={handleClose}
                activedata={itemdata}
                allData={allCertifcatesData}
              />
            )}
          </SliderBtnCol>
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <CertificateDetail>
            <Stack
              spacing={{ xs: 0.7 }}
              divider={<Divider orientation="horizontal" />}
            >
              {RenderField(itemdata)?.map((v, i) => (
                <Stack direction="row" className="certificateStack">
                  <Box flex={0.8}>
                    <Text13>{v.title}</Text13>
                  </Box>
                  <Box flex={1} className="FontWeight400">
                    {v.title == "Message" ? (
                      <Box className="FontWeight400" flex={1}>
                        <Collapse in={viewMore} collapsedSize={"22px"}>
                          <Text13>{v.value} </Text13>
                        </Collapse>
                        {v.value.length > 10 && (
                          <span
                            className="viewLink"
                            onClick={() => CollapseHandler()}
                          >
                            View {viewMore ? "Less" : "More"}...!
                          </span>
                        )}
                      </Box>
                    ) : (
                      <Text13>
                      {typeof v.value === "object"
                        ? v.value?.map((item) => item.name).join(",")
                        : v.value ?? "--"}
                    </Text13>
                    )}
                  </Box>
                </Stack>
              ))}

              {itemdata.type != "patent" && (
                <Stack direction="row" className="certificateStack">
                  <Box flex={0.8}>
                    <Text13>
                      {itemdata.type == "certificate"
                        ? "Message:"
                        : itemdata.type == "trademark"
                        ? "Approved Goods"
                        : "Certificate Description"}
                    </Text13>
                  </Box>
                  {itemdata.message ? (
                    <Box className="FontWeight400" flex={1}>
                      <Collapse
                        in={viewMore}
                        collapsedSize={
                          itemdata.type == "honor" ? "100px" : "22px"
                        }
                      >
                        <Text13>{itemdata.message}</Text13>
                      </Collapse>
                      {itemdata.message.length > 100 && (
                        <span
                          className="viewLink"
                          onClick={() => CollapseHandler()}
                        >
                          View {viewMore ? "Less" : "More"}...!
                        </span>
                      )}
                    </Box>
                  ) : (
                    <Box flex={1}>---</Box>
                  )}
                </Stack>
              )}
            </Stack>
          </CertificateDetail>
        </Grid>
      </Grid>
    </CertificateOuter>
  );
}

export default CertificateSlideItem;
