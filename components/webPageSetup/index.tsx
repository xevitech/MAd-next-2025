import { Box, Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import { ProfileHeader } from "../common/profileheader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { MyAppContext } from "@/contextApi/appContext";
import { AccessDenied } from "../common/AccessDenied";
import Dashboard from "pages/dashboard";
import { LOCAL_PUBLIC_URL } from "@/utils/staticValues";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}
const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];
const WebPageSetup = () => {
  const router = useRouter();
  const { role } = useContext(MyAppContext);
  const handleEditPage = () => {
    router.push(`/cmsPage/editor`);
  };
  return (
    <>
      {role == "buyer" ? (
        <Box className="full_page companydetail_page">
          <Grid container>
            <Grid item xs={12}>
              <ProfileHeader text={""} />
              {/* <AccessDenied /> */}
              <Dashboard />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div
          className="full_page companydetail_page"
          style={{
            justifyContent: "space-between",
            paddingTop: "5px",
            minHeight: "calc(100vh + 64px)",
          }}
        >
          <ProfileHeader text={"Website Pages"} />f
          <div
            style={{
              background: "#fff",
              display: "flex",
              minHeight: "50px",
              justifyContent: "space-between",
              position: "relative",
              padding: "18px,25px",
            }}
          >
            <h5 style={{ fontSize: "1rem" }}> All Pages</h5>
            <Button> Add New Page</Button>
          </div>
          <Box sx={{ background: "#F6F8FB", height: "758px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead
                  sx={{
                    fontSize: "0.87rem",
                    fontWeight: 500,
                    color: "rgba(0, 0, 0, 0.87)",
                    fontFamily: "sans-serif",
                  }}
                >
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">URL</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        1
                      </TableCell>
                      <TableCell align="right">Static Page</TableCell>
                      <TableCell align="right">
                        {`${LOCAL_PUBLIC_URL}/pages/turbine`}
                      </TableCell>

                      <TableCell align="right">
                        <Button onClick={handleEditPage}>
                          {" "}
                          Edit with Editor
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      )}
    </>
  );
};
export default WebPageSetup;
