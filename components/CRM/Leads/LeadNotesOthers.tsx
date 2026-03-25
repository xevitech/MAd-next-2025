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
import { SmallFilledBtn, SmallOutineBtn } from "../commonStyle";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useAppDispatch } from "redux/store";
import {
  createHistory,
  createNotes,
  createTaskMeetingCallsHistory,
  deleteNotes,
  getAllListOfNotes,
} from "@/hooks/UseCreateFormData";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";
import NotesSkeleton from "../Skeletons/NotesSkeleton";
import { apiClient } from "@/components/common/common";
import { useRouter } from "next/router";
import { EDITOR_API_KEY } from "@/utils/staticValues";
const LeadNotesOthers = () => {
  const editorRef = useRef(null);

  const handleBody = (event) => {
    setBody(event);
  };
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState(false);
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [notesLoader, setNotesLoader] = useState(false);
  const router = useRouter();
  const { typeId } = useSelector((state: any) => state.formList);

  const getAllListOfNotes = async () => {
    setNotesLoader(true);
    let response = await apiClient(
      `crm/notes/create_notes?unique_id=${router?.query?.id}&type_id=${typeId}`,
      "get"
    );
    setNotesLoader(false);
    if (response.status == 200 || response.status == true) {
      setNotesList(response?.data);
    }
  };

  useEffect(() => {
    getAllListOfNotes();
  }, [dispatch]);

  const saveNote = async () => {
    if (body == "" || body == undefined) {
      setBodyError(true);
    } else {
      setBodyError(false);
      let payloads = {};
      let url = "crm/notes/create_notes";
      let method = "post";
      let history = {};
      if (editId) {
        payloads = {
          message: body,
          id: editId,
          unique_id: router?.query?.id,
          type_id: typeId,
        };
        url = "crm/notes/create_notes/" + editId;
        method = "PUT";
        history = {
          lead_id: router?.query?.id,
          name: "Notes",
          type: "notes",
          message: `<span>Note Updated - </span>${body} `,
        };
      } else {
        payloads = {
          unique_id: router?.query?.id,
          message: body,
          type_id: typeId,
        };
        history = {
          lead_id: router?.query?.id,
          name: "Notes",
          type: "notes",
          message: `<span>Note Created - </span>${body} `,
        };
      }
      let response = await apiClient(url, method, {
        body: payloads,
      });
      if (response?.status == 200) {
        dispatch(createTaskMeetingCallsHistory(history));
        setBodyError(false);
        setBody("");
        setEditId("");
        await getAllListOfNotes();
        toast.success(response?.payload?.message);
      }
    }
  };

  const deleteNote = async (id, message) => {
    let response = await apiClient(`crm/notes/create_notes/${id}`, "delete");
    if (response?.status == 200) {
      dispatch(
        createTaskMeetingCallsHistory({
          lead_id: router?.query?.id,
          name: "Notes",
          type: "notes",
          message: `<span>Note Deleted - </span>${message} `,
        })
      );
      setBodyError(false);
      setBody("");
      await getAllListOfNotes();
      toast.success(response?.payload?.message);
    }
  };

  return (
    <>
      <NotesContainer>
        <NotsInner>
          <NotesEditorBox>
            <Editor
              apiKey={EDITOR_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={body}
              onEditorChange={(e, q) => handleBody(q.getContent())}
              init={{
                height: 50,
                menubar: false,
                branding: false,
                plugins: [
                  "autoresize",
                  "mentions advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media paste code help wordcount",
                ],
                toolbar:
                  // "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | emoticons| help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                emoticons_append: {
                  custom_mind_explode: {
                    keywords: ["brain", "mind", "explode", "blown"],
                    char: "🤯",
                  },
                },
              }}
            />

            <EditorButtons>
              <SmallOutineBtn
                variant="outlined"
                onClick={() => {
                  setBody("");
                  setEditId("");
                  setBodyError(false);
                }}
              >
                Discard
              </SmallOutineBtn>
              <SmallOutineBtn
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
              </SmallOutineBtn>
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
              notesList.map((notes) => (
                <BoxNotsContent>
                  <NContentRow>
                    <NContentRowInn>
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

export default LeadNotesOthers;
