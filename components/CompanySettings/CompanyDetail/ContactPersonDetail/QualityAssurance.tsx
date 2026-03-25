import React, { useContext, useState } from "react";
import {
  HeaderContainer,
  HeaderTextContainer,
  OuterContainer,
  IconsStyle,
  EditTextContainer,
  FieldContainer,
  FieldLabelContainer,
  FieldValueContainer,
  QualityFieldContainer,
  ContentHeaderContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { Divider, FormControl, Grid } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import {
  BtnFilled,
  BtnOutlined,
} from "@/components/common/buttons/ButtonsVariations";
import { MyAppContext } from "@/contextApi/appContext";

const QualityAssurance = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const {breakPoints, } = useContext(MyAppContext);
  

  return (

    <Grid container>
      <Grid item xs={12}>
    <OuterContainer value={"20px"} breakPoints={breakPoints}>
      <HeaderContainer breakPoints={breakPoints}>
        <HeaderTextContainer breakPoints={breakPoints}>QAQC</HeaderTextContainer>
        {!edit && (
          <EditTextContainer onClick={() => setEdit(true)}>
            <CreateOutlinedIcon sx={IconsStyle} />
            Edit
          </EditTextContainer>
        )}
      </HeaderContainer>
      <Divider variant="middle" />
      <FormControl>
        <ContentHeaderContainer breakPoints={breakPoints}>
          <QualityFieldContainer breakPoints={breakPoints}>
            <FieldContainer breakPoints={breakPoints}>
              <FieldLabelContainer value={{ padding: "16px" }} breakPoints={breakPoints}>
                Testing Facility
              </FieldLabelContainer>

              <FieldValueContainer breakPoints={breakPoints}>
                <BtnFilled borderRadius={"6px"} height={"35px"}>
                  In-house
                </BtnFilled>
              </FieldValueContainer>
            </FieldContainer>

            <Divider variant="middle" />
            <FieldContainer breakPoints={breakPoints} value={{ padding: "16px" }}>
              <FieldLabelContainer breakPoints={breakPoints}>First Pass Yield</FieldLabelContainer>
              <FieldValueContainer breakPoints={breakPoints}>10%</FieldValueContainer>
            </FieldContainer>
            <Divider variant="middle" />
            <FieldContainer breakPoints={breakPoints} value={{ padding: "16px" }}>
              <FieldLabelContainer breakPoints={breakPoints}>
                Certification Level of Quality Head (If any)
              </FieldLabelContainer>
              <FieldValueContainer breakPoints={breakPoints}>abc</FieldValueContainer>
            </FieldContainer>
            <Divider variant="middle" />
            <FieldContainer breakPoints={breakPoints} value={{ padding: "16px" }}>
              <FieldLabelContainer breakPoints={breakPoints}>Scrap Rate</FieldLabelContainer>
              <FieldValueContainer breakPoints={breakPoints}>5%</FieldValueContainer>
            </FieldContainer>
            <Divider variant="middle" />
          </QualityFieldContainer>

          <QualityFieldContainer breakPoints={breakPoints}>
            <FieldContainer breakPoints={breakPoints} value={{ padding: "16px" }}>
              <FieldLabelContainer breakPoints={breakPoints}>Inspecting Parties</FieldLabelContainer>
              <FieldValueContainer></FieldValueContainer>
            </FieldContainer>
            <Divider variant="middle" />         

            <FieldContainer breakPoints={breakPoints} value={{ padding: "16px" }}>
              <FieldLabelContainer breakPoints={breakPoints}>Overall Yield</FieldLabelContainer>
              <FieldValueContainer breakPoints={breakPoints}>15%</FieldValueContainer>
            </FieldContainer>
            <Divider variant="middle" />  

            <FieldContainer value={{ padding: "16px" }}>
              <FieldLabelContainer breakPoints={breakPoints}>Supplier Defect Rate</FieldLabelContainer>
              <FieldValueContainer breakPoints={breakPoints}>20%</FieldValueContainer>
            </FieldContainer>
            <Divider variant="middle" />

            <FieldContainer>
              <FieldLabelContainer></FieldLabelContainer>
              <FieldValueContainer breakPoints={breakPoints} value={{ padding: "12px" }}>
                {edit && (
                  <div>
                    <BtnFilled borderRadius={"6px"} height={"35px"}>
                      Save
                    </BtnFilled>
                    <BtnOutlined
                      borderRadius={"6px"}
                      height={"35px"}
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </BtnOutlined>
                  </div>
                )}
              </FieldValueContainer>
            </FieldContainer>
          </QualityFieldContainer>
        </ContentHeaderContainer>
      </FormControl>
    </OuterContainer>
    </Grid>
    </Grid>
  );
};
export default QualityAssurance;
