import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Plancardscss from "./plans.module.css";
import { Box } from "@mui/material";
interface Props {
  borderRadius: string;
  fontSize: string;
  flexDirection: string;
  alignItems: string;
  padding: string;
  height: string;
  background: string;
  border: string;
  boxShadow: string;
  textTransform: string;
  marginTop: string;
}

const MainButton = {
  borderRadius: `26px`,
  fontSize: "15px",
  flexDirection: " row",
  alignItems: "center",
  padding: "15px 20px",
  height: "50px",
  background: "#FFFFFF",
  border: "1px solid #D7282F",
  boxShadow: "0px 0px 30px rgba(215, 40, 47, 0.25)",
  textTransform: "math-auto",
  marginTop: "40px 0px",
};

const cls = {
  CheckPlanCGreen: {
    background: "linear-gradient(180deg, #00B884 0%, #19DBA4 100%)",
  },
  CheckPlanMgenta: {
    background: "linear-gradient(180deg, #EC207B 0%, #FD79B4 100%)",
  },
  CheckPlanBlue: {
    background: "linear-gradient(180deg, #00A0D7 0%, #5DCEF5 100%)",
  },
  CheckPlanPurple: {
    background: "linear-gradient(180deg, #6B36AF 0%, #B377FF 100%)",
  },
  CheckPlanBrown: {
    background: "linear-gradient(180deg, #9B3700 0%, #FB8443 100%)",
  },
  CheckPlanRound: {
    width: "25px",
    height: "25px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
    borderRadius: "50%",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
  CheckTick: { color: "#ffff" },
  CrossPlan: { color: "#C8C8C8", border: "1px solid #C8C8C8" },
  TextSize: { fontSize: "15px" },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#00B884",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    "@media screen and (max-width: 800px)": { fontSize: 12 },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedMenus({ planList, featureList }) {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(!anchorEl);
  };

  return (
    <Box className={Plancardscss.container}>
      {anchorEl ? (
        <div
          className={Plancardscss.feaure_list_table}
          style={{ display: "flex" }}
        >
          <TableContainer
            component={Paper}
            className={Plancardscss.featurepaper}
          >
            <Table aria-label="customized table" style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  {planList.map((plan) => (
                    <StyledTableCell
                      align="center"
                    >
                      <span
                        className={` ${Plancardscss.card_txt}
                    } ${Plancardscss[`Plan${plan.color}T`]}`}
                        style={{ textAlign: "left" }}
                      >
                        {plan.name}
                      </span>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {featureList.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell
                      className={Plancardscss.tablecell}
                      component="th"
                      scope="row"
                    >
                      <span className="FontSize">{row.name}</span>
                    </StyledTableCell>
                    {planList.map((plan) => (
                      <StyledTableCell
                        className={Plancardscss.tablecell}
                        style={{
                          borderLeft: "1px solid white",
                          borderRight: "1px solid white",
                          padding: "0px 15px",
                        }}
                        align="center"
                      >
                        {plan.planId.includes(row.id) ? (
                          <span
                            style={{
                              ...cls[`CheckPlan${plan.color}`],
                              ...cls.CheckPlanRound,
                            }}
                          >
                            <CheckOutlinedIcon
                              style={{ ...cls.TextSize, ...cls.CheckTick }}
                            ></CheckOutlinedIcon>
                          </span>
                        ) : (
                          <span
                            style={{ ...cls.CrossPlan, ...cls.CheckPlanRound }}
                          >
                            <CloseOutlinedIcon
                              style={{ ...cls.TextSize }}
                            ></CloseOutlinedIcon>
                          </span>
                        )}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </Box>
  );
}
