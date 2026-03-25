import React, { useState } from "react";
import {
  CustomTableRow,
  LevelContent,
  SpecificationsContent,
  ParentContent,
  ActionsContent,
} from "./styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import useProductContext from "@/hooks/useProductContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { removeLevelOrGroup } from "@/hooks/CalculatorReducer";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
export const LevelsTable = (props) => {
  const { productId, data } = props;
  const dispatch = useDispatch();
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [id, setId] = useState("");
  const [label_id, setLabel_id] = useState('')
  const handleDelete = async (element) => {
    await dispatch(
      removeLevelOrGroup({
        id: id,
        productId,
        label_id:label_id
      })
    );
    setDeleteConfirmation(false);
  };
  return (
    <>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="this level"
          onClickAction={handleDelete}
        />
      )}
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
              <DeleteOutlineIcon
                onClick={() => {
                  setDeleteConfirmation(true);

                  setId(element?.specification || element?.id);
                  setLabel_id(element?.product_attribute_label_id)
                }}
                style={{ color: "#D7282F", cursor: "pointer" }}
              />
            </ActionsContent>
          </CustomTableRow>
        ))}
      </div>
    </>
  );
};
