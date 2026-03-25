import React, { useEffect, useState } from "react";
import { Container, Header, HeaderName, HeaderHighlight } from "./styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  ActionsContent,
  CustomTableRow,
  LevelContent,
  ParentContent,
  SpecificationsContent,
} from "../levelsTable/styles";
// import useProductContext from "@/hooks/useProductContext";
import { specificationTextLength } from "@/components/common/common";
import {
  Box,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import { removeLevelOrGroup, saveGroupName } from "@/hooks/CalculatorReducer";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { ErrorImage } from "../styles";
import { SaveCancelIconbox } from "../../customSpecs/styles";
import EditProductFormik from "@/hooks/useEditProductFormik";

export const GroupsTable = ({ id, data, name, group_id, ...props }) => {
  // const {
  //   productId,
  //   removeLevelLoader,
  //   renameGroupLoader,
  //   removeLevelLoaderGroup,
  // } = useProductContext();

  const  { productId } = EditProductFormik()
  const {removeLevelLoader, renameGroupLoader, removeLevelLoaderGroup} = useSelector((state : any) => state.editProduct);
  const [groupEdit, setGroupEdit] = useState(false);
  const [groupId, setGroupId] = useState();
  const [groupName, setGroupName] = useState(name);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deleteGroupConfirmation, setDeleteGroupConfirmation] =
    useState<boolean>(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [error, setError] = useState("");
  const [groupSpec, setGropSpecId] = useState("");
  const { specsData } = useSelector((state: any) => state.calculatorData);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSave = async () => {
    setGroupEdit(true);
    const alreadyValue = specsData?.payload.filter(
      (value) => value?.name === groupName && value?.id != groupId
    );
    if (alreadyValue.length > 0) {
      setError("Please enter a unique value for the group name.");
      return;
    }

    if (!groupName.trim()) {
      setError("Please enter group name");
      return;
    }
    editGroupName();
  };
  const editGroupName = async () => {
    setGroupEdit(true);
    setSaveLoader(true);
    try {
      await dispatch(saveGroupName({ productId, groupName, groupId: group_id }));
      setGroupEdit(false);
      setSaveLoader(false);
      setError("");
    } catch {
      setGroupEdit(false);
      setSaveLoader(false);
    }
  };

  const dispatch = useDispatch();
  const [elementId, setElementId] = useState("");
  const [label_id, setLabel_id] = useState('');

  const DeleteGroup = async () => {
    await dispatch(
      removeLevelOrGroup({
        id: elementId,
        isgroup: true,
        groupId: groupSpec,
        productId: productId,
        label_id:label_id
      })
    );
    setDeleteConfirmation(false);
    setDeleteGroupConfirmation(false);
  };
  return (
    <>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="this group level"
          onClickAction={DeleteGroup}
        />
      )}
      {deleteGroupConfirmation && (
        <DeleteDialog
          open={deleteGroupConfirmation}
          handleClose={setDeleteGroupConfirmation}
          text="this group"
          onClickAction={DeleteGroup}
        />
      )}
      <Container style={{ width: "100%", marginLeft: "0%", marginTop: "10px" }}>
        <Header>
          <HeaderName>
            {groupEdit === true && groupId == id ? (
              <span style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  size="small"
                  value={groupName}
                  onChange={(e) => {
                    if (e?.target?.value.length > specificationTextLength) {
                      setError(
                        "The content is too long. Please limit it to 50 characters."
                      );
                    } else {
                      setGroupName(e.target.value);
                      setError("");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSave();
                    }
                  }}
                  sx={{ backgroundColor: "#fff", margin: "0 8px 4px 0" }}
                />
                {saveLoader && (
                  <CircularProgress
                    style={{
                      color: "#DD484E",
                      width: "25px",
                      height: "25px",
                      marginLeft: "10px",
                    }}
                  />
                )}
                {editGroupName && (
                  <Box sx={{ position: "absolute", bottom: "-3px" }}>
                    <Typography
                      sx={{
                        color: "#D7282F",
                        fontSize: "10px",
                        margin: "4px 0 4px 0",
                      }}
                    >
                      {error && (
                        <ErrorImage
                          src="/assets/error-outline-red.svg"
                          alt=""
                          sx={{ height: "8px", width: "8px" }}
                        />
                      )}
                      {error}
                    </Typography>
                  </Box>
                )}

                {renameGroupLoader == id ? (
                  <CircularProgress
                    style={{
                      color: "#D7282F",
                      height: "20px",
                      width: "20px",
                      display: "flex",
                      margin: "0px 0 0 10px",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <>
                    <SaveCancelIconbox>
                      <LightTooltip
                        arrow
                        title="Save"
                        disableInteractive
                        placement="top"
                      >
                        <SaveOutlinedIcon
                          onClick={() => {
                            handleSave();
                          }}
                          sx={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      </LightTooltip>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                        sx={{ margin: "1px 1px 1px 3px" }}
                      />
                      <LightTooltip
                        arrow
                        title="Cancel"
                        disableInteractive
                        placement="top"
                      >
                        <CloseOutlinedIcon
                          onClick={() => {
                            setGroupName(name);
                            setGroupEdit(false);
                            setError("");
                          }}
                          sx={{
                            fontSize: "20px",
                            color: "#d7282f",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </CloseOutlinedIcon>
                      </LightTooltip>
                    </SaveCancelIconbox>
                  </>
                )}
              </span>
            ) : (
              <>
                <span
                  style={{
                    display: "flex",
                    gap: "10px",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    width: "100%",
                  }}
                >
                  {groupName}
                  <LightTooltip
                    title="Edit Group Name"
                    placement="top"
                    disableInteractive
                    arrow
                  >
                    <img
                      height={15}
                      width={15}
                      src={"/assets/EditPencil.svg"}
                      alt="editImage"
                      style={{ marginLeft: "6px", cursor: "pointer" }}
                      onClick={() => {
                        setGroupEdit(true);
                        setGroupId(id);
                      }}
                    />
                  </LightTooltip>
                </span>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ margin: "5px" }}
                />
                <span
                  style={{
                    display: "flex",
                    gap: "10px",
                    textAlign: "center",
                    // marginLeft: "6px",
                    cursor: "pointer",
                  }}
                >
                  <LightTooltip
                    title="Delete Group"
                    placement="top"
                    arrow
                    disableInteractive
                  >
                    <DeleteOutlineIcon
                      onClick={() => {
                        // const id = data?.map((element, index) => {
                        //   return element.specification;
                        // });
                        const group_id = data?.map((element, index) => {
                          return element.group_id;
                        });
                        setElementId(data[0]?.specification || data[0]?.id);

                        const labelId = data?.map((element, index) => {
                          return element.product_attribute_label_id;
                        });
                        setGropSpecId(group_id[0]);
                        setLabel_id(labelId.join(","))
                        setDeleteGroupConfirmation(true);
                      }}
                      style={{
                        color: "#D7282F",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </LightTooltip>
                  {removeLevelLoaderGroup == id && (
                    <CircularProgress
                      style={{
                        color: "#D7282F",
                        height: "22px",
                        width: "22px",
                      }}
                    />
                  )}
                </span>
              </>
            )}
          </HeaderName>
        </Header>
        <Box
          sx={{ "@media screen and (max-width:900px)": { overflow: "auto" } }}
        >
          <Box
            sx={{ "@media screen and (max-width:900px)": { width: "1000px" } }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid  #D2D2D2",
                margin: "16px",
              }}
            >
              <CustomTableRow
                style={{
                  minHeight: "48px",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "24px",
                  letterSpacing: "0.09px",
                  color: "#000000",
                }}
              >
                <LevelContent>Level</LevelContent>
                <SpecificationsContent>Specifications</SpecificationsContent>
                <ParentContent>Parent</ParentContent>
                <ActionsContent>Actions</ActionsContent>
              </CustomTableRow>

              {data?.map((element, index) => (
                <CustomTableRow key={index} evenNotOdd={(index + 1) % 2 === 1}>
                  <LevelContent>{index + 1}</LevelContent>
                  <SpecificationsContent>
                    {element?.specificationName.replaceAll("_", " ")}
                  </SpecificationsContent>
                  <ParentContent>
                    {element?.parentName.replaceAll("_", " ") ? element?.parentName.replaceAll("_", " ") : "N/A"}
                  </ParentContent>
                  <ActionsContent>
                    <LightTooltip
                      title="Delete"
                      arrow
                      disableInteractive
                      placement="top"
                    >
                      <DeleteOutlineIcon
                        onClick={() => {
                          setDeleteConfirmation(true);
                          setElementId(element?.specification || element?.id);
                          setLabel_id(element?.product_attribute_label_id)
                          setGroupId(id);
                        }}
                        style={{
                          color: "#D7282F",
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                      />
                    </LightTooltip>
                    {removeLevelLoader == element?.id && (
                      <CircularProgress
                        style={{
                          color: "#D7282F",
                          height: "25px",
                          width: "25px",
                          display: "flex",
                          float: "right",
                          margin: "0 0 0 20px",
                        }}
                      />
                    )}
                  </ActionsContent>
                </CustomTableRow>
              ))}
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};
