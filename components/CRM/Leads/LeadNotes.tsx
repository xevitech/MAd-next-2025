import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import {
  BottomCntentRow,
  BoxNots,
  BoxNotsContent,
  CenterNoteContent,
  EditDeleteAction,
  EditorButtons,
  NContentRow,
  NContentRowInn,
  NotesContainer,
  NotesEditorBox,
  NotsInner,
  StackWithImg,
  TabTitle,
  TimeStack,
  TimeTypo,
} from "../style";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import {
  SmallBlackOutineBtn,
  SmallFilledBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
} from "../commonStyle";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useAppDispatch } from "redux/store";
import {
  createHistory,
  createNotes,
  deleteNotes,
  getAllListOfNotes,
} from "@/hooks/UseCreateFormData";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";
import NotesSkeleton from "../Skeletons/NotesSkeleton";
import { EDITOR_API_KEY } from "@/utils/staticValues";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const LeadNotes = () => {
  const editorRef = useRef(null);

  const handleBody = (event) => {
    setBody(event);
  };
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState(false);
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState("");
  const { notesList, notesLoader, details, typeId } = useSelector(
    (state: any) => state.formList
  );

  useEffect(() => {
    dispatch(getAllListOfNotes());
  }, [dispatch]);

  const saveNote = async () => {
    if (body == "" || body == undefined) {
      setBodyError(true);
    } else {
      setBodyError(false);
      let payloads = {};
      let history = {};
      if (editId) {
        payloads = {
          body: body,
          id: editId,
        };
        history = {
          lead_id: details.unique_id,
          type_id: typeId,
          name: "Notes",
          type: "notes",
          message: `<span>Note Updated - </span>${body} `,
        };
      } else {
        payloads = {
          body: body,
        };
        history = {
          lead_id: details.unique_id,
          type_id: typeId,
          name: "Notes",
          type: "notes",
          message: `<span>Note Created - </span>${body} `,
        };
      }
      let response = await dispatch(createNotes(payloads));
      if (response?.payload?.status == 200) {
        dispatch(createHistory(history));
        setBodyError(false);
        setBody("");
        setEditId("");
        toast.success(response?.payload?.message);
      }
    }
  };

  const deleteNote = async (id, message) => {
    let response = await dispatch(deleteNotes(id));
    if (response?.payload?.status == 200) {
      dispatch(
        createHistory({
          lead_id: details.unique_id,
          type_id: typeId,
          name: "Notes",
          type: "notes",
          message: `<span>Note Deleted - </span>${message} `,
        })
      );
      setBodyError(false);
      setBody("");
      toast.success(response?.payload?.message);
    }
  };
  const [value, setValue] = useState('');

  return (
    <>
      <NotesContainer>
        <NotsInner>
          <NotesEditorBox>
           
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <EditorButtons>
              <SmallBlackOutineBtn
                variant="outlined"
                onClick={() => {
                  setBody("");
                  setEditId("");
                  setBodyError(false);
                }}
              >
                Discard
              </SmallBlackOutineBtn>
              <SmallRedOutineBtn
                variant="outlined"
                onClick={() => {
                  saveNote(); 
                }}
              >
                {notesLoader ? (
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="#D7282F"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  "Save"
                )}
              </SmallRedOutineBtn>
            </EditorButtons>
          </NotesEditorBox>
          {bodyError && (
            <Typography
              sx={{ color: "#d7282f", fontSize: "12px", padding: "0 1rem" }}
            >
              Please enter note!
            </Typography>
          )}
          <BoxNots>
            {notesLoader ? (
              <NotesSkeleton />
            ) : notesList?.length > 0 ? (
              notesList.map((notes, index) => (
                <BoxNotsContent>
                  <NContentRow>
                    <NContentRowInn value={notesList?.length-1 === index}>
                      <CenterNoteContent>
                        <TabTitle>{parse(notes.message)}</TabTitle>
                        <EditDeleteAction className="hidden-button">
                          <IconButton aria-label="edit">
                            <ModeEditOutlineOutlinedIcon
                              onClick={() => {
                                setEditId(notes.id);
                                setBody(notes.message);
                              }}
                            />
                          </IconButton>
                          <Divider
                            sx={{ margin: "4px 0" }}
                            orientation="vertical"
                            variant="middle"
                            flexItem
                          />
                          <IconButton aria-label="delete">
                            <DeleteOutlineOutlinedIcon
                              onClick={() =>
                                deleteNote(notes.id, notes.message)
                              }
                            />
                          </IconButton>
                        </EditDeleteAction>
                      </CenterNoteContent>
                      <BottomCntentRow>
                        <TimeStack>
                          <TimeTypo>
                            {moment(notes.updated_at).fromNow()}
                          </TimeTypo>
                        </TimeStack>
                        <StackWithImg>
                          <Image
                            src={notes.source}
                            alt={notes.name}
                            width={25}
                            height={25}
                            style={{ borderRadius: "50%" }}
                          />
                          <Typography>{notes.name}</Typography>
                        </StackWithImg>
                      </BottomCntentRow>
                    </NContentRowInn>
                  </NContentRow>
                </BoxNotsContent>
              ))
            ) : (
              <BoxNotsContent>
                <NContentRow>No notes added yet</NContentRow>
              </BoxNotsContent>
            )}
          </BoxNots>
        </NotsInner>
      </NotesContainer>
    </>
  );
};

export default LeadNotes;
