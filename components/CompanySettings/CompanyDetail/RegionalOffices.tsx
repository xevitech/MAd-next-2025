import { Redoutlinebtn } from "@/components/common/buttons/ButtonsVariations";
import { Divider, Typography } from "@mui/material";
import { FormControl } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { FactorySmallTextContainer } from "@/components/CompanySettings/CompanyDetail/commonStyles";
import {
  OuterContainer,
  HeaderContainer,
  HeaderTextContainer,
  ContentContainer,
  ContentHeaderContainer,
  LeftContentContainer,
  RightContentContainer,
  FieldLabelContainer,
  FieldValueContainer,
  ContentWrapper,
  IconsStyle,
  FieldContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import CountrySelect from "@/components/common/countrydropdown/Index";
import { apiClient, countryDetail } from "@/components/common/common";
import MobileWithFlag from "@/components/common/numberwithflag";
import EditRegionalOffice from "../Edit/EditRegionalOffice";
import { MyAppContext } from "@/contextApi/appContext";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import EmptyPage from "@/components/common/EmptyPage";
import { Leftlabel, PencilIcon1, Rightlabel } from "./style";
import RegionalSkeleton from "./CompanySkeletons/RegionalSkeleton";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { useDispatch } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
import { DeleteButtonLink } from "./ContactPersonDetail/style";
const RegionalOffices = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const [regionalOfficesList, setRegionalOfficeList] = useState<any>([]);
  const [addMore, setAddMore] = useState<boolean>(true);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [deleteIndex, setDeleteIndex] = useState<number>(-1);
  const [editValues, setEditValues] = useState<any>({});
  const { setCompleteScreenLoader, breakPoints } = useContext(MyAppContext);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  let List = [1];
  const [loader, setLoader] = useState<boolean>(true);
  const getRegionalOfficeList = async () => {
    if (addMore) setAddMore(false);
    if (editIndex >= 0) {
      setEditIndex(-1);
      setEditValues({});
    }
    let response = await apiClient(
      "company_profile/regional_offices/view",
      "get"
    );
    if (response?.status === 200) {
      setCompleteScreenLoader(false);
      setRegionalOfficeList(response.data);
      dispatch(getCompanyProfile());
    } else {
      setCompleteScreenLoader(false);
    }
    setLoader(false);
  };

  useEffect(() => {
    setLoader(true);
    getRegionalOfficeList();
  }, []);
  const CancelEdit = () => {
    setEditIndex(-1);
    setEditValues({});
  };

  const DeleteOffice = async () => {
    setCompleteScreenLoader(true);
    let officeList = [...regionalOfficesList];
    officeList.splice(deleteIndex, 1);
    let response = await apiClient("company_profile/updateProfile", "post", {
      body: { regional_offices: { ...officeList } },
    });
    if (response.status == 200) {
      toast.success("Record Deleted Successfully");
      setDeleteConfirmation(false);
      getRegionalOfficeList();
      dispatch(getCompanyProfile());
    }
  };
  const dispatch = useDispatch();

  return (
    
    <OuterContainer breakPoints={breakPoints}>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="regional office detail"
          onClickAction={DeleteOffice}
        />
      )}
      <HeaderContainer breakPoints={breakPoints}>
        <div>
          <HeaderTextContainer breakPoints={breakPoints}>
            Regional Offices
          </HeaderTextContainer>
          <FactorySmallTextContainer>
            Manage Information related to Regional Offices
          </FactorySmallTextContainer>
        </div>
        {
          <Redoutlinebtn
            classNmae="addregionalbtn"
            height={"36px"}
            onClick={() => {
              setAddMore((prev) => !prev);
              setEditValues({});
              setEditIndex(-1);
            }}
          >
            <div> Add Regional Office</div>
            <AddCircleOutlineIcon sx={{ marginLeft: 1, height: 24 }} />
          </Redoutlinebtn>
        }
      </HeaderContainer>
      <Divider variant="middle" />
      <>
        {loader ? (
          <>
            {List.map((v, i) => (
              <RegionalSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {addMore && (
              <FormControl
                sx={{
                  width: "100%",
                }}
              >
                <EditRegionalOffice
                  regionalOfficesList={regionalOfficesList}
                  getRegionalOfficeList={getRegionalOfficeList}
                  editValues={editValues}
                  CancelEdit={() => setAddMore(false)}
                  editIndex={editIndex}
                  setExpand={setExpand}
                  addMore={addMore}
                  check={1}
                />
              </FormControl>
            )}
            <ContentWrapper breakPoints={breakPoints}>
              <Grid container spacing={2} className="reginal_offices">
                {regionalOfficesList.map((v:any, i:number) => (
                  <Grid item xs={12} md={6} sm={6} lg={4} key={i}>
                    <FormControl
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {i == editIndex && !addMore ? (
                        <EditRegionalOffice
                          regionalOfficesList={regionalOfficesList}
                          getRegionalOfficeList={getRegionalOfficeList}
                          editValues={editValues}
                          CancelEdit={
                            addMore ? () => setAddMore(false) : CancelEdit
                          }
                          editIndex={editIndex}
                          setExpand={setExpand}
                          addMore={addMore}
                          check={2}
                        />
                      ) : (
                        <>
                          <ContentContainer className="reginal_box" style={{paddingBottom:'12px'}}>
                            <ContentHeaderContainer>
                              <LeftContentContainer
                                value={{ padding: "8px 0 8px 0" }}
                              >
                                <Typography
                                  sx={{ fontSize: "14px", fontWeight: "600" }}
                                >
                                {i+1}. Regional Office
                                </Typography>
                              </LeftContentContainer>
                              <RightContentContainer
                                sx={{
                                  position: "absolute",
                                  right: "0px",
                                  top: "0px",
                                }}
                                value={{ padding: "16px 16px 12px 16px" }}
                              >
                                <PencilIcon1>
                                  <LightTooltip
                                    placement="top"
                                    title="Edit"
                                    arrow
                                  >
                                    <Image
                                      style={{ cursor: "pointer" }}
                                      src={"/assets/EditPencil.svg"}
                                      layout="fill"
                                      onClick={() => {
                                        setEditIndex(i);
                                        setEditValues(v);
                                        setAddMore(false);
                                      }}
                                      alt="editImage"
                                    />
                                  </LightTooltip>
                                </PencilIcon1>
                                <LightTooltip
                                  placement="top"
                                  title="Delete"
                                  arrow
                                >
                                  <DeleteButtonLink
                                    sx={IconsStyle}
                                    onClick={() => {
                                      setDeleteConfirmation(true);
                                      setDeleteIndex(i);
                                    }}
                                  />
                                </LightTooltip>
                              </RightContentContainer>
                            </ContentHeaderContainer>
                            <Divider variant="middle" />
                            <Grid
                              container
                              spacing={2}
                              rowSpacing={-1}
                              // alignItems={"center"}
                            >
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <FieldLabelContainer
                                    sx={{ padding: "0px !important" }}
                                    value={{ padding: "16px" }}
                                  >
                                    Registered Office Name
                                  </FieldLabelContainer>
                                  <Rightlabel sx={{ width: "100% !important" }}>
                                    <FieldValueContainer className="RegionalOffices"
                                      breakPoints={breakPoints}
                                    >
                                      {v.officename?.charAt(0).toUpperCase() +
                                        v.officename?.slice(1)}
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                                <Divider
                                  sx={{
                                    display: "none",
                                    "@media screen and (max-width:900px)": {
                                      display: "none",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <Leftlabel>
                                    <FieldLabelContainer
                                      sx={{ padding: "0px !important" }}
                                      value={{ padding: "16px" }}
                                    >
                                      Email
                                    </FieldLabelContainer>
                                  </Leftlabel>
                                  <Rightlabel sx={{ width: "100% !important" }}>
                                    <FieldValueContainer className="RegionalOffices"
                                      sx={{ wordBreak: "break-word" }}
                                      breakPoints={breakPoints}
                                      placeholder="Email"
                                    >
                                      {v.email}
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <Leftlabel>
                                    <FieldLabelContainer
                                      sx={{ padding: "0px !important" }}
                                      value={{ padding: "16px" }}
                                    >
                                      Mobile
                                    </FieldLabelContainer>
                                  </Leftlabel>
                                  <Rightlabel>
                                    <FieldValueContainer className="RegionalOffices"
                                      breakPoints={breakPoints}
                                    >
                                      <MobileWithFlag
                                        mobile_code={v.code}
                                        number={v.mobile}
                                        country_code={v.mobile_country_code}
                                      />
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <Leftlabel>
                                    <FieldLabelContainer
                                      sx={{ padding: "0px !important" }}
                                      value={{ padding: "16px" }}
                                    >
                                      Country
                                    </FieldLabelContainer>
                                  </Leftlabel>
                                  <Rightlabel sx={{ width: "100% !important" }}>
                                    <FieldValueContainer className="RegionalOffices"
                                      autoComplete="off"
                                      breakPoints={breakPoints}
                                    >
                                      <CountrySelect
                                        value={{ margin: "0" }}
                                        setCountry={() => console.log()}
                                        country={v.country?.toUpperCase()}
                                        mode={"view"}
                                        error={false}
                                        errorText={""}
                                      />
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <Leftlabel>
                                    <FieldLabelContainer
                                      sx={{ padding: "0px !important" }}
                                      value={{ padding: "16px" }}
                                    >
                                      Region/State/Province
                                    </FieldLabelContainer>
                                  </Leftlabel>
                                  <Rightlabel>
                                    <FieldValueContainer className="RegionalOffices"
                                      breakPoints={breakPoints}
                                    >
                                      {v.regional_state}
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                                <Divider
                                  sx={{
                                    display: "none",
                                    "@media screen and (max-width:900px)": {
                                      display: "block",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <Leftlabel>
                                    <FieldLabelContainer
                                      sx={{ padding: "0px !important" }}
                                      value={{ padding: "16px" }}
                                    >
                                      City
                                    </FieldLabelContainer>
                                  </Leftlabel>
                                  <Rightlabel>
                                    <FieldValueContainer className="RegionalOffices"
                                      breakPoints={breakPoints}
                                    >
                                      {`${countryDetail({
                                        key: "name",
                                        country_code: v.city,
                                        mobile_code: "",
                                        country_name: "",
                                      })}${v.city}`}
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <Leftlabel>
                                    <FieldLabelContainer
                                      sx={{ padding: "0px !important" }}
                                      value={{ padding: "16px" }}
                                    >
                                      Street Address
                                    </FieldLabelContainer>
                                  </Leftlabel>
                                  <Rightlabel sx={{ width: "100% !important" }}>
                                    <FieldValueContainer className="RegionalOffices"
                                      placeholder="Address"
                                      breakPoints={breakPoints}
                                    >
                                      {v.address}
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <Leftlabel>
                                    <FieldLabelContainer
                                      sx={{ padding: "0px !important" }}
                                      value={{ padding: "16px" }}
                                    >
                                      Postal Code
                                    </FieldLabelContainer>
                                  </Leftlabel>
                                  <Rightlabel>
                                    <FieldValueContainer className="RegionalOffices"
                                      autoComplete="off"
                                      breakPoints={breakPoints}
                                    >
                                      {v.regional_postal_code}
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                                <Divider
                                  sx={{
                                    display: "none",
                                    "@media screen and (max-width:900px)": {
                                      display: "none",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <Leftlabel sx={{width:'100%'}}>
                                    <FieldLabelContainer
                                      sx={{ padding: "0px !important" }}
                                      value={{ padding: "16px" }}
                                    >
                                      Additional Address Details
                                    </FieldLabelContainer>
                                  </Leftlabel>
                                  <Rightlabel sx={{ width: "100% !important" }}>
                                    <FieldValueContainer className="RegionalOffices"
                                      placeholder="Address"
                                      breakPoints={breakPoints}
                                    >
                                      {v.additional_address
                                        ? v.additional_address
                                        : "N/A"}
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                              </Grid>

                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <Leftlabel>
                                    <FieldLabelContainer
                                      sx={{ padding: "0px !important" }}
                                      value={{ padding: "16px" }}
                                    >
                                      Geolocation
                                    </FieldLabelContainer>
                                  </Leftlabel>
                                  <Rightlabel sx={{ width: "100% !important" }}>
                                    <FieldValueContainer className="RegionalOffices"
                                      autoComplete="off"
                                      breakPoints={breakPoints}
                                    >
                                      <p>
                                        {" "}
                                        {v.regional_lats && v.regional_long ? (
                                          <>
                                            {v.regional_lats}, {v.regional_long}
                                          </>
                                        ):"N/A"}
                                      </p>
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                sx={{ padding: "8px 0 0 0px" }}
                              >
                                <FieldContainer
                                  sx={{
                                    display: "block !important",
                                    height: "100%",
                                  }}
                                >
                                  <Leftlabel>
                                    <FieldLabelContainer
                                      sx={{ padding: "0px !important" }}
                                      value={{ padding: "16px" }}
                                    >
                                      Status
                                    </FieldLabelContainer>
                                  </Leftlabel>
                                  <Rightlabel sx={{ width: "100% !important" }}>
                                    <FieldValueContainer className="RegionalOffices"
                                      placeholder="Address"
                                      breakPoints={breakPoints}
                                    >
                                      {v.status}
                                    </FieldValueContainer>
                                  </Rightlabel>
                                </FieldContainer>
                              </Grid>
                            </Grid>
                          </ContentContainer>
                        </>
                      )}
                    </FormControl>
                    {addMore && regionalOfficesList.length === 1 && <></>}
                  </Grid>
                ))}
              </Grid>
            </ContentWrapper>
            {regionalOfficesList.length === 0 && !loader && (
              <EmptyPage
                text={"regional offices"}
                onClickHandler={() => setAddMore(true)}
                logo="/assets/rgionaloffice1.svg"
              />
            )}
          </>
        )}
      </>
    </OuterContainer>
  );
};

export default RegionalOffices;
