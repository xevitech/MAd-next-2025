import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import SingleSpecTable from "./table";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import Image from "next/image";
import { MultiSpecTable } from "./multiTable";
import {
  AccordionBox,
  CalculatorTable,
  GroupHeading,
  useStyles,
} from "./styles";
import { useSelector } from "react-redux";

export default function TableWrapper({
  headerName,
  updateEquationsData,
}) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { productCalculatorInfo } = useSelector(
    (state: any) => state?.PricingCalculator
  );
  const { classes } = useStyles();

  return (
    <div className="accordian-wrapper specificationWrapper">
      <GroupHeading>
        {headerName
          ? ` ${capitalizeFirstLetter(headerName)} Specifications`
          : ""}
      </GroupHeading>
      {productCalculatorInfo?.map((ele) => (
        <AccordionBox>
          <Accordion
            key={ele?.id}
            style={{
              borderRadius: "6px",
              marginTop: "12px",
            }}
            expanded={expanded === ele?.name}
            onChange={handleChange(ele?.name)}
          >
            <AccordionSummary
              expandIcon={
                expanded === ele?.name ? (
                  <Image
                    src={"/assets/minusIcon.svg"}
                    height={14}
                    width={15}
                    alt="minus-icon"
                  />
                ) : (
                  <Image
                    src={"/assets/plus_Sign.svg"}
                    height={14}
                    width={14}
                    alt="plus_sign"
                  />
                )
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                sx={{ width: "93%", flexShrink: 0 }}
                style={{ fontSize: "14px" }}
              >
                {ele?.name.replaceAll("_", " ")}
                {/* <span>(#{ele?.tag})</span> */}
              </Typography>
              <Typography style={{ textAlign: "right", minWidth: "40px" }}>
                <span>({ele?.unit ? ele?.unit : "unit"}) </span>
              </Typography>
            </AccordionSummary>
            <CalculatorTable
              className={
                ele?.level?.split(",")?.length && classes.noParameterLink
              }
            >
              {ele?.level?.split(",")?.length > 1 ? (
                <>
                  <MultiSpecTable data={ele} expanded={expanded == ele?.name} />
                </>
              ) : (
                <>
                  <SingleSpecTable
                    headerName={headerName}
                    data={ele}
                    updateEquationsData={updateEquationsData}
                  />
                </>
              )}
            </CalculatorTable>
          </Accordion>
        </AccordionBox>
      ))}
    </div>
  );
}
