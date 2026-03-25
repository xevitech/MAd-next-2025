import React, { useEffect, useState } from "react";
import {
  DetailsContainer,
  DetailsHeader,
  ContactDetailsText,
  AddMoreButtonContainer,
  AddMoreButton,
  FieldOuterContainer,
  PesronContainer,
  PersonNameContainer,
  PersonName,
  SwitchButton,
  GridData,
  FloatingEditIcon,
  PencilIcon,
  DeleteIconContainer,
  FieldContainer,
  LabelContainer,
  AddMoreDetailsContainer,
  InputField,
  ButtonContainer,
  SaveButton,
} from "./styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useAppContext from "@/hooks/useAppContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider, FormControl, Grid } from "@mui/material";
import Image from "next/image";
import {
  FactorySmallTextContainer,
  FieldValueContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import Auth from "@/auth/Auth";
import { BASE_URL } from "@/utils/staticValues";
import { PersonDetails } from "./PersonDetails";
const ContactPersonDetails = () => {
  const { breakPoints } = useAppContext();
  const [addMore, setMore] = useState(false);
  const dummy_data = [
    {
      id: 1,
      name: "devm",
      email: "xyz@gmail.com",
      Designation: "owner",
      PhoneNo: "123456789",
    },
    {
      id: 2,
      name: "devm",
      email: "xyz@gmail.com",
      Designation: "owner",
      PhoneNo: "123456789",
    },
    {
      id: 1,
      name: "devm",
      email: "xyz@gmail.com",
      Designation: "owner",
      PhoneNo: "123456789",
    },
  ];

  useEffect(() => {
    fetch(`${BASE_URL}/company_profile/contact_person/view`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Auth.token()}`,
      },
    })
      .then((resonse) => resonse.json)
      .then((data) => console.log(data, "data"));

    return () => {};
  }, []);

  const handleSaveDetails = () => {
    setMore(false);
  };

  return (
    <>
      <DetailsContainer>
        <DetailsHeader>
          <ContactDetailsText breakPoints={breakPoints}>
            Contact Person Details
          </ContactDetailsText>
          <FactorySmallTextContainer>
            Manage Information related to Contact Person Details
          </FactorySmallTextContainer>
          <AddMoreButtonContainer onClick={() => setMore(true)}>
            <AddMoreButton
              endIcon={<AddCircleOutlineIcon style={{ fontSize: "20px" }} />}
            >
              {" "}
              Add More
            </AddMoreButton>
          </AddMoreButtonContainer>
        </DetailsHeader>
        <Divider variant="middle" />
        <PesronContainer>
          {dummy_data.length > 0
            ? dummy_data.map((item, index) => (
                <Grid container key={index}>
                  <PersonDetails data={item} />
                </Grid>
              ))
            : !addMore && " Enter Details"}
          {addMore && (
            <AddMoreDetailsContainer dataLength={dummy_data}>
              <GridData item>
                <PersonNameContainer>
                  <PersonName>
                    <InputField placeholder="Add Name here.." />{" "}
                    <SwitchButton defaultChecked />
                  </PersonName>
                  <FieldOuterContainer>
                    <FloatingEditIcon>
                      <PencilIcon>
                        <Image
                          src={"/assets/EditPencil.svg"}
                          layout="fill"
                          alt="editImage"
                        />
                      </PencilIcon>
                      <DeleteIconContainer>
                        <DeleteIcon style={{ fontSize: "14px" }} />{" "}
                      </DeleteIconContainer>
                    </FloatingEditIcon>
                  </FieldOuterContainer>
                  <FormControl sx={{ width: "100%" }}>
                    <FieldOuterContainer>
                      <FieldContainer>
                        <LabelContainer breakPoints={breakPoints}>
                          Name
                        </LabelContainer>
                        <FieldValueContainer>
                          <p>Designation</p>
                        </FieldValueContainer>
                      </FieldContainer>
                    </FieldOuterContainer>
                  </FormControl>
                  <FormControl sx={{ width: "100%" }}>
                    <FieldOuterContainer>
                      <FieldContainer>
                        <LabelContainer breakPoints={breakPoints}>
                          Email
                        </LabelContainer>
                        <FieldValueContainer>
                          <p>Designation</p>
                        </FieldValueContainer>
                      </FieldContainer>
                    </FieldOuterContainer>
                  </FormControl>
                  <FormControl sx={{ width: "100%" }}>
                    <FieldOuterContainer>
                      <FieldContainer>
                        <LabelContainer breakPoints={breakPoints}>
                          Designation
                        </LabelContainer>
                        <FieldValueContainer>
                          <p>Designation</p>
                        </FieldValueContainer>
                      </FieldContainer>
                    </FieldOuterContainer>
                  </FormControl>
                </PersonNameContainer>
              </GridData>
              <ButtonContainer onClick={handleSaveDetails}>
                <SaveButton> Save</SaveButton>{" "}
              </ButtonContainer>
            </AddMoreDetailsContainer>
          )}
        </PesronContainer>
      </DetailsContainer>
    </>
  );
};
export default ContactPersonDetails;
