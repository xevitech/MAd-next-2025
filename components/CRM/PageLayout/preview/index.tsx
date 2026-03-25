import React from "react";
import {
  AvatarContainer,
  DiaglogHeader,
  EditLeadHead,
  GridBox,
  HeadingOption,
  LeadContentOuter,
  LeadsContentContainer,
  LeadsContentInner,
  PageContentRight,
  PreviewCustomDialog,
  PreviewTextRow,
  ProfileContainer,
  TextFieldRowLeft2,
  StyledTextarea,
} from "../style";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  DialogContent,
  TextField,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { setPreviewModal } from "@/hooks/LeadsReducer";
import { useAppDispatch } from "redux/store";
import { InfoIconTooltip } from "../../style";
const Preview = () => {
  const { showImage } = useSelector((state: any) => state.LeadsData);
  const { previewOpenModal, rowListing } = useSelector(
    (state: any) => state.LeadsData
  );
  const dispatch = useAppDispatch();
  const handleClosemodal = () => {
    dispatch(setPreviewModal(false));
  };

  const InnerTextarea = React.forwardRef<
    HTMLTextAreaElement,
    JSX.IntrinsicElements["textarea"]
  >(function InnerTextarea(props, ref) {
    const id = React.useId();
    return (
      <React.Fragment>
        <StyledTextarea minRows={1} {...props} ref={ref} id={id} />
        {/* <StyledLabel htmlFor={id}>Description</StyledLabel> */}
      </React.Fragment>
    );
  });
  return (
    <>
      <PreviewCustomDialog
        open={previewOpenModal}
        onClose={handleClosemodal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DiaglogHeader>
          <Typography>Creat Lead</Typography>
        </DiaglogHeader>
        <DialogContent>
          <PageContentRight>
            <ProfileContainer>
              <AvatarContainer>
                <Avatar
                  style={{ marginRight: "14px" }}
                  alt="Jack Sparrow"
                  src={
                    showImage
                      ? "https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      : ""
                  }
                />
                <Box>
                  <Typography variant="body2">Lead Image</Typography>
                </Box>
              </AvatarContainer>
            </ProfileContainer>
            <LeadContentOuter>
              {rowListing.columnOrder?.map((list) => (
                <LeadsContentContainer>
                  <LeadsContentInner>
                    <Grid container>
                      <HeadingOption>
                        <EditLeadHead variant="h6"> {list.name}</EditLeadHead>
                      </HeadingOption>
                    </Grid>
                    <Divider />
                    <GridBox container spacing={2}>
                      {list?.form_fields?.map((data) => (
                        <Grid item md={list.tab_columns == "single" ? 12 : list.tab_columns == "triple"? 4: 6} sm={6} xs={12}>
                          <PreviewTextRow>
                            <TextFieldRowLeft2>
                              <TextField
                                fullWidth
                                id="standard-basic"
                                variant="standard"
                                // placeholder={
                                //   data?.name == "" ? data?.label : data?.name
                                // }
                                placeholder={data?.name ? data?.name.replace(/_/g, " ") : data?.label.replace(/_/g, " ")}

                                InputProps={{
                                  disableUnderline: true,
                                }}
                              />
                              <Tooltip title={data?.tooltip} placement="top">
                                <span>
                                  {data?.tooltip ? <InfoIconTooltip /> : ""}
                                </span>
                              </Tooltip>
                            </TextFieldRowLeft2>
                          </PreviewTextRow>
                        </Grid>
                      ))}
                    </GridBox>
                  </LeadsContentInner>
                </LeadsContentContainer>
              ))}
            </LeadContentOuter>
          </PageContentRight>
        </DialogContent>
      </PreviewCustomDialog>
    </>
  );
};

export default Preview;
