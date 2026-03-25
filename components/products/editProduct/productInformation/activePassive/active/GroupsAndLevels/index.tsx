import React, { useState, useEffect } from "react";
import {
  AttributeDependency,
  DependsOnHeader,
  ErrorImage,
  GroupButtonBox,
  LevelGroupingBox,
  SmallOutlineNewBtn,
  TextandButtonGroup,
} from "./styles";
import { CustomSelector } from "./CustomSelector";
import AddIcon from "@mui/icons-material/Add";
import poststyle from "components/products/editProduct/style.module.css";
import {
  BtnFilled,
  BtnOutlined,
} from "@/components/common/buttons/ButtonsVariations";
import { LevelsTable } from "./levelsTable";
import { GroupsTable } from "./groupsTable";
// import useProductContext from "@/hooks/useProductContext";
import PricingCalculator from "../pricingCalculator";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PriceCalculatorContextProvider } from "@/contextApi/priceCalculator";
import CloseIcon from "@mui/icons-material/Close";
import PopDesign from "./detail.module.css";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-license-pro";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import { GetCurrentPlan } from "@/components/common/common";
import PlanAlertDialog from "@/components/common/DeleteAlert/PlanAlert";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpecsList,
  setPendingSpecs,
  setSelectedSpecs,
  createLevels,
  addGroup,
  listMatrix,
  setParentMulError,
  setLevelParentError,
} from "@/hooks/CalculatorReducer";
import { ThreeDots } from "react-loader-spinner";
import EditProductFormik from "@/hooks/useEditProductFormik";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
import { GridColDef } from "@mui/x-data-grid";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
// import { DataGridStyle } from "@/components/common/commonStyle";
import {
  HeaderCustomSpecs,
  HeaderMainText,
  HeaderSubText,
} from "../customSpecs/styles";
import { setSelectedGroupData } from "@/hooks/PricingCalculatorReducer";
import { DataGridStyle } from "@/components/CRM/commonStyle";
import { toast } from "react-toastify";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#177ddc",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },

  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25) !important",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255,255,255,.35)",
    }),
  },
  "& .Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#d7282f !important", // Track color when active (checked)
  },
  "& .Mui-checked": {
    color: "#fff !important",
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
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
export const ListOfGroupsAndLevels = (props) => {
  const { productId } = EditProductFormik();

  const [showPricingCalculator, setShowPricingCalculator] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openPlanPopup, setOpenPlanPopup] = React.useState(false);
  const [planLoading, setPlanLoading] = React.useState(false);
  const [featureList, setFeatureList] = useState<any>([]);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [noMorePendingStateError, setNoMorePendingStateError] = useState(false);
  const {
    pendingSpecs,
    specsData,
    selectedSpecs,
    specificationsList,
    submitLoader,
    matrixItems,
    levelParentError,
    parentMulError,
  } = useSelector((state: any) => state.calculatorData);

  const isHasChild = specificationsList?.every((spec) => spec?.children?.length > 0);

  const { productCalculatorHeader, productCalculatorInfo } = useSelector(
    (state: any) => state?.PricingCalculator
  );

  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (parentMulError) {
      const timer = setTimeout(() => {
        dispatch(setParentMulError(false));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [parentMulError]);

  useEffect(() => {
    if (levelParentError) {
      const timer = setTimeout(() => {
        dispatch(setLevelParentError(false));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [levelParentError]);

  useEffect(() => {
    if (noMorePendingStateError) {
      const timer = setTimeout(() => {
        setNoMorePendingStateError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [noMorePendingStateError]);
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    GetCurrentPlan(setFeatureList);
    dispatch(getSpecsList(productId));
  }, []);
  const [loader, setLoader] = useState(false);
  const column: any = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: true,
    },
    {
      field: "parentName",
      headerName: "Parent Name",
      width: 300,
      align: "center",
      headerAlign: "center",
    },

    {
      hideable: false,
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <>
            <div className="delIcons">
              <img src="/assets/deleteIcon.svg" />
            </div>
          </>
        );
      },
    },
  ];

  const AuxilaryTable = styled(Box)({
    height: "200px",
    width: "100%",
    padding: "0 16px",
    marginTop: "20px",

    "& .css-1e2bxag-MuiDataGrid-root": {
      border: "0",
      borderTop: "1px solid #d2d2d2",
      borderRadius: "0",
      "& .MuiDataGrid-columnHeader": {
        "&:focus": {
          outline: "0",
        },
      },
      "& .MuiDataGrid-cell": {
        "&:focus": {
          outline: "0",
        },
      },
      "& .MuiDataGrid-row": {
        transition: "all ease .5s",
        "&:hover": {
          backgroundColor: "#FFEEEF",
        },
      },
    },
    "& .delIcons": {
      display: "flex",
      width: "16px",
      height: "16px",
      alignItems: "center",
      "& img": {
        width: "13px",
        cursor: "pointer",
      },
    },
  });

  const [pendingSpecState, setPendingSpecsState] = useState<any>([]);
  const [selectedSpecState, setSelectedSpecsState] = useState<any>([]);
  // DataGrid rows
  const [rows, setRows] = useState([]);
  const [selectedRowId, setSelectedRowsId] = useState([]);

  useEffect(() => {
    dispatch(listMatrix({ productId }));
    setPendingSpecsState(pendingSpecs);
    setSelectedSpecsState(selectedSpecs);
  }, [specsData, selectedSpecs, pendingSpecs]);

  const changeSelection = (id, type) => {
    if (type == "pending") {
      setPendingSpecsState((prev) =>
        prev.map((element) => {
          if (element?.id == id) {
            return { ...element, selected: !element?.selected };
          } else {
            return element;
          }
        })
      );
      dispatch(setPendingSpecs(pendingSpecState));
    } else if (type === "selected") {
      setSelectedSpecsState((prev) =>
        prev.map((element) => {
          if (element?.id == id) {
            return { ...element, selected: !element?.selected };
          } else {
            return element;
          }
        })
      );
      dispatch(setSelectedSpecs(selectedSpecState));
    }
  };

  const onClickAction = () => {
    setPlanLoading(true);
    router.push(`/plancards?productId=${productId}`);
  };

  const handleClosePlan = () => {
    setOpenPlanPopup(false);
  };

  const handleSubmitLevelCreation = () => {
    const selectedSpec = pendingSpecState?.filter((item) => item?.selected);
    if (selectedSpec?.length !== 0) {
      setError(false);
      dispatch(setParentMulError(false));
      dispatch(setLevelParentError(false));
    } else {
      setError(true);
      dispatch(setParentMulError(false));
      dispatch(setLevelParentError(false));
    }
    if (pendingSpecs?.length == 0) {
      setNoMorePendingStateError(true);
      dispatch(setParentMulError(false));
      dispatch(setLevelParentError(false));
    } else {
      setNoMorePendingStateError(false);
      dispatch(setParentMulError(false));
      dispatch(setLevelParentError(false));
    }

    specsData?.is_group == "yes"
      ? dispatch(
          createLevels({
            group_id: specsData?.payload[specsData?.payload?.length - 1]?.id,
            pendingSpecs: pendingSpecState,
            selectedSpecs: selectedSpecState,
            productId: productId,
          })
        )
      : dispatch(
          createLevels({
            group_id: "",
            pendingSpecs: pendingSpecState,
            selectedSpecs: selectedSpecState,
            productId: productId,
          })
        );
  };

  // DataGrid columns
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "name",
      headerName: "Select All",
      flex: 0.5,
      maxWidth: 400,
    },

    {
      field: "dependsOn",
      // headerName: 'Set Attribute Dependency',
      renderHeader: () => (
        <DependsOnHeader>
          Set Attribute Dependency{" "}
          <LightTooltip
            title="Assign a parent to this attribute from the dropdown list if it depends on another attribute. Leave it independent if it does not rely on any other attribute."
            placement="top"
            arrow
            disableInteractive
          >
            <InfoOutlinedIcon sx={{ color: "#50b76c", fontSize: "18px" }} />
          </LightTooltip>
        </DependsOnHeader>
      ),
      flex: 0.5,
      maxWidth: 800,
      renderCell: (params) => {
        const listForDepended = rows?.filter(
          (item) => item?.id !== params?.row?.id
        );
        const dependId = params?.row?.isDependentData;
        const parentData = rows?.find((row) => row?.id === dependId);

        return (
          <>
            <FormControl>
              <FormControlLabel
                control={
                  <AntSwitch
                    disabled={rows?.length === 1}
                    checked={params?.row?.isDepended || false}
                    id={`select-${params?.row?.id}`}
                    onChange={(e) => handleChange(e, params?.row)}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                }
                label={<AttributeDependency>{params?.row?.isDepended ? "Depends On" : "Independent"}</AttributeDependency>}
              />
            </FormControl>

            {params?.row?.isDepended && (
              <Select
                value={dependId || ""}
                onChange={(e) => {
                  const isDependedData = rows?.map((row) => {
                    if (row?.id === params?.row?.id) {
                      return { ...row, isDependentData: e.target.value };
                    }
                    return row;
                  });

                  setRows(isDependedData);
                }}
                displayEmpty
                sx={{ minWidth: 120, marginLeft: "100px" }}
              >
                <MenuItem disabled value="">
                  Select Specification
                </MenuItem>
                {listForDepended?.map((row) => (
                  <MenuItem value={row?.id} key={row?.id}>
                    {row?.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const selectedIds = rows?.reduce((acc, item) => {
      if (item?.selected) {
        acc.push(item?.id);
      }
      return acc;
    }, []);
    setSelectedRowsId(selectedIds);
  }, [rows]);

  useEffect(() => {
    const updateData = rows?.map((row) => {
      const matchingSpec = specsData?.payload?.find(
        (spec) => spec?.id === row?.id
      );

      if (matchingSpec && matchingSpec?.parent) {
        return {
          ...row,
          isDepended: true,
          isDependentData: parseInt(matchingSpec?.parent),
        };
      }
      return row;
    });

    // Compare the updated data with the current rows
    const hasChanges = JSON.stringify(updateData) !== JSON.stringify(rows);

    // Only update the state if there are changes
    if (hasChanges) {
      setRows(updateData);
    }
  }, [specsData, rows]);

  // useEffect(() => {
  //   setRows([
  //     ...(Array.isArray(pendingSpecState) ? pendingSpecState : []),
  //     ...(Array.isArray(selectedSpecState) ? selectedSpecState : []),
  //   ]);
  // }, [pendingSpecState, selectedSpecState]);

  useEffect(() => {
    const updatedRows =
      Array.isArray(pendingSpecState) &&
      pendingSpecState?.filter((spec) =>
        specificationsList?.some(
          (item) => item?.id === spec?.id && item?.children?.length > 0
        )
      );
    setRows([
      ...(Array.isArray(updatedRows) ? updatedRows : []),
      ...(Array.isArray(selectedSpecState) ? selectedSpecState : []),
    ]);
  }, [pendingSpecState, selectedSpecState, specificationsList]);

  const handleChange = (event, rowData) => {
    event.stopPropagation();
    const isDepended = rows?.map((item) => {
      if (item?.id == rowData?.id) {
        return {
          ...item,
          isDepended: event.target.checked,
          isDependentData:
            item?.isDependentData && event.target.checked == false
              ? null
              : item?.isDependentData,
        };
      }
      return item;
    });
    setRows(isDepended);
  };

  const handleLevelSubmission = () => {
    const selectedOrNot = rows?.some((row) => row?.selected);
    if(!selectedOrNot){
      toast?.error("Please select atleast one specification to generate levels.");
      return;
    }
    const isAlreadySelected = rows?.some((row) => {
      return selectedSpecs.some(
        (selected) => selected?.id === row?.id && row?.selected
      );
    });

    if (isAlreadySelected) {
      toast?.error("You have already selected this specification.");
      return;
    }

    const isDependent = rows?.filter((row) => {
      return row?.isDependentData;
    });
    let mulitLevelData: any;
    let similarLevelData: any;
    if (isDependent?.length > 0) {
      mulitLevelData = rows?.reduce((acc, row) => {
        if (row?.selected) {
          acc.push({
            attribute_id: row.id,
            parent_level: row.isDependentData || "",
          });
        }
        return acc;
      }, []);
      // return;
      dispatch(
        createLevels({
          productId: productId,
          levels: mulitLevelData,
          type: "multi",
        })
      );
    } else {
      similarLevelData = rows?.reduce((acc, row) => {
        if (row?.selected) {
          acc.push(row.id);
        }
        return acc;
      }, []);
      // return;
      dispatch(
        createLevels({
          productId: productId,
          levels: similarLevelData,
          type: "similar",
        })
      );
    }

    return;
  };

  const handleCreateGroup = async () => {
    // console.log(rows, specsData,"rowsCheck")
    // return;
    // return;
    // console.log(specsData, "onClick={handleCreateGroup}");
    // return;
    // if(specsData?.is_group == 'no'){
    // await dispatch(addGroup({ productId }));
    // return;
    // }
    // const isDependent = rows?.filter((row) => {
    //   return row?.isDependentData;
    // });
    // if (isDependent?.length > 0) {
    //  const mulitLevelData = rows?.reduce((acc, row) => {
    //     if (row?.selected) {
    //       acc.push({
    //         attribute_id: row.id,
    //         parent_level: row.isDependentData || "",
    //       });
    //     }
    //     return acc;
    //   }, []);
    //   await dispatch(addGroup({ productId, groupData:mulitLevelData, type:'multi', group:"NEW" }));
    //   return;
    // }else{
    //   const similarLevelData = rows?.reduce((acc, row) => {
    //     if (row?.selected) {
    //       acc.push(row.id);
    //     }
    //     return acc;
    //   }, []);
    //   await dispatch(addGroup({ productId, groupData:similarLevelData?.join(','), type:'similar', group:"NEW" }));
    //   return;
    // }

    // console.log(specsData, "onClick={handleCreateGroup}");
    // return;

    const selectedOrNot = rows?.some((row) => row?.selected);
    if(!selectedOrNot){
      toast?.error("Please select atleast one specification to generate levels.");
      return;
    }

    const hasDependent = rows?.some(
      (row) => row?.selected && row?.isDependentData
    );

    const groupData = rows?.reduce(
      (acc, row) => {
        if (row?.selected) {
          if (hasDependent) {
            // If any row is dependent, all should go into multiLevel
            acc.multiLevel.push({
              attribute_id: row.id,
              parent_level: row.isDependentData || "",
            });
          } else {
            // If no dependent rows, all should go into similarLevel
            acc.similarLevel.push(row.id);
          }
        }
        return acc;
      },
      { multiLevel: [], similarLevel: [] }
    );

    if (specsData?.is_group === "no" && specsData?.payload?.length > 0) {
      // return ;
      await dispatch(addGroup({ productId }));
      return;
    }

    // return;
    if (groupData.multiLevel.length > 0) {
      await dispatch(
        createLevels({
          productId,
          levels: groupData.multiLevel,
          type: "multi",
          group: "NEW",
        })
      );
    } else if (groupData.similarLevel.length > 0) {
      await dispatch(
        createLevels({
          productId,
          levels: groupData.similarLevel,
          type: "similar",
          group: "NEW",
        })
      );
    }

    // return;
  };

  useEffect(() =>{
    if (productCalculatorInfo?.[0]?.group_id) {
      dispatch(
        setSelectedGroupData(productCalculatorInfo?.[0]?.group_id)
      );
    }
  }, [productCalculatorInfo?.[0]?.group_id])


  return (
    <>
      {showPricingCalculator && (
        <PriceCalculatorContextProvider>
          <PricingCalculator
            showModal={showPricingCalculator}
            setShowModal={setShowPricingCalculator}
          />
        </PriceCalculatorContextProvider>
      )}
      <div>
        <PlanAlertDialog
          open={openPlanPopup}
          handleClose={handleClosePlan}
          onClickAction={onClickAction}
          loading={planLoading}
          features={"Price Calculator Tool"}
          editpost={true}
        />

        {/* {matrixItems?.length > 0 && (
          <div
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <CustomSelector
              label="Select Specifications"
              data={pendingSpecState || []}
              type="pending"
              changeSelection={changeSelection}
            />
            <CustomSelector
              label="Selected Specification Parent"
              data={selectedSpecState || []}
              type="selected"
              changeSelection={changeSelection}
            />
          </div>
        )} */}
        {/* {matrixItems?.length > 0 && (
          <Box
            className={poststyle.group_level_btn}
            sx={{
              display: "flex",
              alignItems: "center",
              "@media screen and (max-width:600px)": { display: "block" },
            }}
          >
            <BtnOutlined
              sx={{ height: "33px" }}
              onClick={handleSubmitLevelCreation}
            >
              {!submitLoader && !loader ? (
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#e74c3c"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                "Submit"
              )}
            </BtnOutlined>
            {levelParentError && (
              <CommonErrorMessage
                message={
                  "Please choose at least one parent or child for the selected specifications"
                }
              />
            )}
            {parentMulError && (
              <CommonErrorMessage
                message={
                  "Please choose only one parent for the selected specifications."
                }
              />
            )}
            {specsData?.is_group == "yes" && (
              <BtnOutlined
                sx={{ marginLeft: "15px", height: "33px" }}
                onClick={async () => {
                  setLoader(true);
                  const selectedSpec = pendingSpecState?.filter(
                    (item) => item?.selected
                  );
                  if (selectedSpec?.length !== 0) {
                    setError(false);
                    await dispatch(
                      createLevels({
                        group_id: "",
                        pendingSpecs: pendingSpecState,
                        selectedSpecs: selectedSpecState,
                        productId: productId,
                      })
                    );
                    setLoader(false);
                  } else {
                    setLoader(false);
                    setError(true);
                  }
                }}
              >
                {loader ? (
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="#e74c3c"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  <>
                    <AddIcon></AddIcon> Create Group
                  </>
                )}
              </BtnOutlined>
            )}

            {error && pendingSpecs?.length > 0 && (
              <Typography
                sx={{
                  color: "#D7282F",
                  fontSize: "13px",
                  margin: "0 0 0 12px",
                  "@media screen and (max-width:600px)": {
                    fontSize: "10px",
                    margin: "0",
                  },
                }}
              >
                <ErrorImage src="/assets/error-outline-red.svg" alt="" />
                Please select at least one specification before proceeding.
              </Typography>
            )}

            {noMorePendingStateError && (
              <Typography
                sx={{
                  color: "#D7282F",
                  fontSize: "13px",
                  margin: "0 0 0 12px",
                  "@media screen and (max-width:600px)": {
                    fontSize: "10px",
                    margin: "4",
                  },
                }}
              >
                <ErrorImage src="/assets/error-outline-red.svg" alt="" />
                There's no Specification left to select. Please create more
                Specifications to proceed further.
              </Typography>
            )}
          </Box>
        )} */}
        {rows?.length > 0 && matrixItems?.length > 0 && (
          <LevelGroupingBox>
            <HeaderCustomSpecs>
              <HeaderMainText
                sx={{
                  color: "#231f20 !important",
                  fontWeight: "600 !important",
                }}
              >
                Specifications List
              </HeaderMainText>
              <HeaderSubText sx={{ color: "#231f20" }}>
                Select the specifications which you want to use in calculator to
                determine price, you can also set the parent-child relationship
                if there are dependencies of attributes on each other.
              </HeaderSubText>
            </HeaderCustomSpecs>
            <Box sx={{ height: 250, width: "100%",borderBottom:1,borderColor:'divider' }}>
              <DataGridPro
                columns={columns}
                rows={rows}
                checkboxSelection
                rowHeight={38}
                sx={DataGridStyle}
                hideFooter
                disableSelectionOnClick
                selectionModel={selectedRowId}
                onSelectionModelChange={(slect, event: any) => {
                  const updatedRows = rows?.map((item) => ({
                    ...item,
                    selected: slect?.includes(item.id),
                  }));

                  setSelectedRowsId(slect);
                  setRows(updatedRows);
                }}
              />
            </Box>
            <GroupButtonBox>
              <SmallOutlineNewBtn
                variant="outlined"
                size="small"
                sx={{ mr: 2 }}
                onClick={handleCreateGroup}
              >
                + Create Group
              </SmallOutlineNewBtn>
              <SmallOutlineNewBtn
                variant="outlined"
                size="small"
                onClick={handleLevelSubmission}
              >
                Submit Selection
              </SmallOutlineNewBtn>
            </GroupButtonBox>
          </LevelGroupingBox>
        )}

        {specsData?.is_group == "yes" &&
          specsData?.payload.length > 0 &&
          specsData?.payload?.map((element, index) => {
            return (
              <>
                <GroupsTable
                  key={index}
                  data={element?.levels}
                  id={element?.id}
                  group_id={element?.group_id}
                  name={element?.name}
                />
              </>
            );
          })}

        {specsData?.is_group == "no" && isHasChild &&  specsData?.payload?.length > 0 && (
          <LevelsTable data={specsData?.payload} productId={productId} />
        )}

        {specsData?.is_group == null && specsData?.payload?.length > 0 && (
          <AuxilaryTable>
            <DataGridPro
              rowHeight={40}
              rows={specsData?.payload}
              columns={column}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              hideFooter
            />
          </AuxilaryTable>
        )}

        <TextandButtonGroup>
          {showError && (
            <Typography sx={{ color: "#d7282f" }}>
              Please select atleast one specification to generate matrix group
            </Typography>
          )}
          {  isHasChild && selectedSpecs?.length > 0 && (
            <Box
              sx={{
                color: "#264E89",
                fontSize: "13px",
                marginRight: "10px",
                "&:hover":{color:'#d7282f'}
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              View Selected Specifications
            </Box>
          )}         
          { isHasChild && selectedSpecs?.length > 0 && (
            <BtnFilled
              sx={{
                "@media screen and (max-width:480px)": { fontSize: "12px" },
              }}
              onClick={() => {
                let status =
                  featureList?.find((v) => v?.id == 6)?.value ?? false;
                if (status == "no") {
                  setOpenPlanPopup(true);
                  return;
                } else {
                  setShowPricingCalculator((prev) => true);
                }

                if (productCalculatorHeader == "Group") {
                  dispatch(
                    setSelectedGroupData(productCalculatorInfo?.[0]?.group_id)
                  );
                }
              }}
            >
              View Price Calculator
            </BtnFilled>
          )}
        </TextandButtonGroup>

        <Box>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "800px",
                },
              },
            }}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  borderBottom: "1px solid #dddddd",
                  paddingBottom: "16px",
                  fontWeight: "600",
                  color: "#000000",
                }}
              >
                Selected Specifications
              </Typography>
            </BootstrapDialogTitle>

            <DialogContent
              style={{ padding: "0 16px" }}
              className={PopDesign.modal_inner}
            >
              <DialogContentText id="alert-dialog-description">
                <div className={PopDesign.main_tr}>
                  <table
                    style={{ width: "100%" }}
                    className={PopDesign.specification_table}
                  >
                    {selectedSpecs?.length > 0 &&
                      selectedSpecs?.map((element, index) => {
                        return (
                          <tr key={index}>
                            <td
                              key={index}
                              className={PopDesign.main_content}
                              align="left"
                            >
                              {element?.name}
                            </td>
                          </tr>
                        );
                      })}
                  </table>
                </div>
              </DialogContentText>
            </DialogContent>
            <div className={PopDesign.pop_btn}>
              <BtnOutlined
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </BtnOutlined>
            </div>
          </BootstrapDialog>
        </Box>
      </div>
    </>
  );
};
