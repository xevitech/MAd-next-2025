import React from "react";
import {
  FieldOuterContainer,
  PersonNameContainer,
  PersonName,
  SwitchButton,
  GridData,
  FloatingEditIcon,
  PencilIcon,
  DeleteIconContainer,
  FieldContainer,
  LabelContainer,
} from "./styles";
import {
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import useAppContext from "@/hooks/useAppContext";
import { FieldValueContainer } from "@/components/CompanySettings/CompanyDetail/commonStyles";
export const PersonDetails = (props) => {
  const { data } = props;
  const { breakPoints } = useAppContext();
  return (
    <>
      <GridData item xs={4}>
        <PersonNameContainer>
          <PersonName>
            {data.name} <SwitchButton defaultChecked />
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
                <LabelContainer breakPoints={breakPoints}>Email</LabelContainer>
                <FieldValueContainer>
                  <p>{data.email}</p>
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
                  <p>{data.Designation}</p>
                </FieldValueContainer>
              </FieldContainer>
            </FieldOuterContainer>
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <FieldOuterContainer>
              <FieldContainer>
                <LabelContainer breakPoints={breakPoints}>
                  Mobile Number
                </LabelContainer>
                <FieldValueContainer>
                  <p>{data.PhoneNo}</p>
                </FieldValueContainer>
              </FieldContainer>
            </FieldOuterContainer>
          </FormControl>
        </PersonNameContainer>
      </GridData>
    </>
  );
};
