import React, { useState, useEffect } from "react";
import {
  styled,
  Typography,
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { BASE_URL } from "@/utils/staticValues";

interface AddCategoryInfo {
  name: string;
  parent?: number;
}

interface AddCategoryError {
  name: boolean;
  parent?: boolean;
}

interface AddCategoryHelperText {
  name: string;
  parent?: string;
}

interface AddCategoryData {
  id: number;
  name: string;
  parent: number;
}

export const CategoriesList = () => {
  const OuterContainer = styled("div")({
    justifyContent: "space-between",
    background: "#F6F8FB",
    padding: "15px",
  });

  const [nonApprovedCategories, setNonApprovedCategories] = useState<any[]>([]);

  const [allApprovedRootCategoriesBox, setAllApprovedRootCategoriesBox] =
    useState<any[]>([]);

  const [allApprovedSubCategoriesBoxes, setAllApprovedSubCategoriesBoxes] =
    useState<any[]>([]);

  const [selectedRootCategoriesIndex, setSelectedRootCategoriesIndex] =
    React.useState(0);

  const [selectedRootCategoriesValue, setSelectedRootCategoriesValue] =
    React.useState("");

  const [selectedSubCategoriesIndexes, setSelectedSubCategoriesIndexes] =
    React.useState<any[]>([]);

  const [selectedSubCategoriesValues, setSelectedSubCategoriesValues] =
    React.useState<any[]>([]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [showAddCategory, setShowAddCategory] = React.useState(0);

  const [showUpdateCategory, setShowUpdateCategory] = React.useState(0);

  const [addCategoryInfo, setAddCategoryInfo] = useState<AddCategoryInfo>({
    name: "",
    parent: 0,
  });
  const dispatch = useDispatch();
  const [addCategoryError, setAddCategoryError] = useState<AddCategoryError>({
    name: false,
    parent: false,
  });

  const [addCategoryHelperText, setAddCategoryHelperText] =
    useState<AddCategoryHelperText>({
      name: "",
      parent: "",
    });

  const handleListItemClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    category_id: number,
    category_name: string,
    index: number
  ) => {
    setSelectedIndex(category_id);
    if (allApprovedSubCategoriesBoxes?.length) {
      allApprovedSubCategoriesBoxes.length = index + 1;
    }
    if (index == -1) {
      setSelectedRootCategoriesIndex(category_id);
      setSelectedRootCategoriesValue(category_name);
      selectedSubCategoriesIndexes.length = 0;
      selectedSubCategoriesValues.length = 0;
    }
    if (index != -1) {
      if (selectedSubCategoriesIndexes?.length) {
        selectedSubCategoriesIndexes.length = index;
      }
      if (selectedSubCategoriesValues?.length) {
        selectedSubCategoriesValues.length = index;
      }
      setSelectedSubCategoriesIndexes([
        ...selectedSubCategoriesIndexes,
        category_id,
      ]);
      setSelectedSubCategoriesValues([
        ...selectedSubCategoriesValues,
        category_name,
      ]);
    }
    // AllApprovedSubCategoriesBoxes
    const payload = {
      parent: category_id,
    };
    const response_AllApprovedSubCategoriesBoxes = await fetch(
      `${BASE_URL}/categoryList`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data_AllApprovedSubCategoriesBoxes =
      await response_AllApprovedSubCategoriesBoxes.json();
    if (data_AllApprovedSubCategoriesBoxes?.status) {
      console.log("category------", data_AllApprovedSubCategoriesBoxes?.data);
      dispatch(data_AllApprovedSubCategoriesBoxes?.data);
      if (data_AllApprovedSubCategoriesBoxes?.data != "") {
        setAllApprovedSubCategoriesBoxes([
          ...allApprovedSubCategoriesBoxes,
          data_AllApprovedSubCategoriesBoxes?.data,
        ]);
      }
    }
    if (index == -1) {
    }
    if (index != -1) {
    }
  };

  const handleAddCategoryInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const name = e.target.id;
    setAddCategoryInfo((prev) => ({ ...prev, [name]: value }));
    if (name === "name") {
      if (value === "") {
        setAddCategoryError((prev) => ({ ...prev, [name]: true }));
        setAddCategoryHelperText((prev) => ({
          ...prev,
          [name]: "Required!",
        }));
      } else {
        setAddCategoryError((prev) => ({ ...prev, [name]: false }));
        setAddCategoryHelperText((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleSaveCategory = () => {
    if (addCategoryInfo?.name === "") {
      toast.error("please fill all the fields!");
      return;
    }
  };

  useEffect(() => {
    (async () => {
      // NonApprovedCategories
      const payload = {
        parent: 0,
      };
      const response_NonApprovedCategories = await fetch(
        `${BASE_URL}/categoryList`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data_NonApprovedCategories =
        await response_NonApprovedCategories.json();
      if (data_NonApprovedCategories?.status) {
        setNonApprovedCategories(data_NonApprovedCategories?.data);
      } else {
        setNonApprovedCategories([]);
      }
      // AllApprovedRootCategoriesBox
      const response_AllApprovedRootCategoriesBox = await fetch(
        `${BASE_URL}/categoryList`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data_AllApprovedRootCategoriesBox =
        await response_AllApprovedRootCategoriesBox.json();
      if (data_AllApprovedRootCategoriesBox?.status) {
        setAllApprovedRootCategoriesBox(
          data_AllApprovedRootCategoriesBox?.data
        );
      } else {
        setAllApprovedRootCategoriesBox([]);
      }
    })();
  }, []);

  const handleAddNewCategoryClick = () => {
    setShowUpdateCategory(0);
    setShowAddCategory(1);
  };

  return (
    <>
      <OuterContainer>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Open Sans",
            fontSize: "30px",
            fontWeight: 700,
            lineHeight: "41px",
            letterSpacing: "0em",
            textAlign: "left",
            marginBottom: "15px",
          }}
          gutterBottom
        >
          My Categories
        </Typography>
        <Card variant="outlined" sx={{ marginBottom: "30px" }}>
          <CardContent>
            <Card variant="outlined" sx={{ marginBottom: "25px" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{
                            fontFamily: "Open Sans",
                            fontSize: "20px",
                            fontWeight: 700,
                            lineHeight: "27px",
                            letterSpacing: "0em",
                            textAlign: "left",
                          }}
                        >
                          Non Approved Categories
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ background: "#F6F8FB" }}>
                      <TableCell>#</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>PARENT CATEGORY</TableCell>
                      <TableCell>STATUS</TableCell>
                      <TableCell align="right">ACTIONS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {nonApprovedCategories.map((category, i) => (
                      <>
                        <TableRow
                          key={category.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{i + 1}</TableCell>
                          <TableCell component="th" scope="row">
                            {category.name}
                          </TableCell>
                          <TableCell>{"-"}</TableCell>
                          <TableCell>{"-"}</TableCell>
                          <TableCell align="right">
                            <IconButton aria-label="edit" size="small">
                              <EditIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              color="error"
                            >
                              <DeleteIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "Open Sans",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "27px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    padding: "14px 0px",
                  }}
                >
                  All Approved Categories
                  <IconButton
                    aria-label="verified"
                    size="small"
                    color="success"
                  >
                    <VerifiedIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Serach Category"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "Open Sans",
                fontSize: "15px",
                // fontWeight: 700,
                lineHeight: "18px",
                letterSpacing: "0em",
                textAlign: "left",
                padding: "10px 0",
              }}
            >
              Selected Categories :- <b>{selectedRootCategoriesValue}</b>
              {selectedSubCategoriesValues.map((sub_category: any) => (
                <>&nbsp;-&nbsp;{sub_category}</>
              ))}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent sx={{ padding: "0px !important" }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontFamily: "Open Sans",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "22px",
                        letterSpacing: "0em",
                        textAlign: "left",
                        padding: "16px",
                        paddingBottom: "16px",
                      }}
                    >
                      Add Root Category/Parent
                    </Typography>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        minHeight: 300,
                        maxHeight: 300,
                        "& ul": { padding: 0 },
                        padding: 0,
                      }}
                    >
                      {allApprovedRootCategoriesBox.map((category: any) => (
                        <>
                          <ListItemButton
                            selected={
                              selectedRootCategoriesIndex === category.id
                            }
                            onClick={(event) =>
                              handleListItemClick(
                                event,
                                category.id,
                                category.name,
                                -1
                              )
                            }
                          >
                            <ListItemText primary={category.name} />
                          </ListItemButton>
                          <Divider />
                        </>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              {allApprovedSubCategoriesBoxes.map(
                (
                  allApprovedSubCategoriesBox,
                  allApprovedSubCategoriesBoxKey
                ) => (
                  <>
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ padding: "0px !important" }}>
                          <List
                            sx={{
                              width: "100%",
                              bgcolor: "background.paper",
                              position: "relative",
                              overflow: "auto",
                              minHeight: 354,
                              maxHeight: 354,
                              "& ul": { padding: 0 },
                              padding: 0,
                            }}
                          >
                            {allApprovedSubCategoriesBox.map(
                              (category: any) => (
                                <>
                                  <ListItemButton
                                    selected={selectedSubCategoriesIndexes.includes(
                                      category.id
                                    )}
                                    onClick={(event) =>
                                      handleListItemClick(
                                        event,
                                        category.id,
                                        category.name,
                                        allApprovedSubCategoriesBoxKey
                                      )
                                    }
                                  >
                                    <ListItemText primary={category.name} />
                                  </ListItemButton>
                                  <Divider />
                                </>
                              )
                            )}
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                )
              )}
            </Grid>
            <Button
              variant="outlined"
              color="error"
              onClick={handleAddNewCategoryClick}
              sx={{
                marginTop: "24px",
                fontFamily: "Open Sans",
                fontSize: "13px",
                fontWeight: 700,
                lineeHight: "18px",
                letterSpacing: "0em",
                textAlign: "center",
                textTransform: "capitalize",
                borderRadius: "6px",
              }}
            >
              Add New Category
            </Button>
          </CardContent>
        </Card>
        {showAddCategory == 1 ? (
          <Card variant="outlined" sx={{ marginBottom: "30px" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "20px",
                      fontWeight: 700,
                      lineHeight: "27px",
                      letterSpacing: "0em",
                      textAlign: "left",
                    }}
                  >
                    Add Category
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    error={addCategoryError?.name}
                    helperText={addCategoryHelperText?.name}
                    variant="outlined"
                    // required
                    fullWidth
                    label="Category Name"
                    id="name"
                    value={addCategoryInfo?.name}
                    onChange={handleAddCategoryInfoChange}
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={5}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Banner"
                    variant="outlined"
                    type="file"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Icon"
                    variant="outlined"
                    type="file"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "13px",
                      fontWeight: 700,
                      lineeHight: "18px",
                      letterSpacing: "0em",
                      textAlign: "center",
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      padding: "15px 0px",
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={handleSaveCategory}
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "13px",
                      fontWeight: 700,
                      lineeHight: "18px",
                      letterSpacing: "0em",
                      textAlign: "center",
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      padding: "15px 0px",
                    }}
                  >
                    Save Category
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          ""
        )}
        {showUpdateCategory == 1 ? (
          <Card variant="outlined" sx={{ marginBottom: "30px" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="Category Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={5}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Banner"
                    variant="outlined"
                    type="file"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Icon"
                    variant="outlined"
                    type="file"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "13px",
                      fontWeight: 700,
                      lineeHight: "18px",
                      letterSpacing: "0em",
                      textAlign: "center",
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      padding: "15px 0px",
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "13px",
                      fontWeight: 700,
                      lineeHight: "18px",
                      letterSpacing: "0em",
                      textAlign: "center",
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      padding: "15px 0px",
                    }}
                  >
                    Save Category
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          ""
        )}
      </OuterContainer>
    </>
  );
};
