import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import {
  CommentBox,
  CommentText,
  CommentTextBox,
  DoticonBox,
  HeadingNiconBox,
  IconNdateTimeBox,
  NameText,
  Noplan,
  TextNchip,
  TypographySort,
  TypographyTopTared,
  Userplantext,
} from "./Review.Styled";
import { useSelector } from "react-redux";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import { apiClient } from "@/components/common/common";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import { useAppDispatch } from "redux/store";
import { fetchReviewData, setUpdateFeedback } from "@/hooks/miniSite";
import EmptyPage from "../EmptyPages";
import { useRouter } from "next/router";
function CommentList() {
  const [filter, setFilter] = useState("1");
  const dispatch = useAppDispatch();
  const { userInfo, allReview } = useSelector((state: any) => state.miniSite);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCommentDelete = async () => {
    let response = await apiClient(
      `front/mini-site/delete-review/${data?.id}`,
      "delete"
    );
    if (response.status == 200 || response.status == true) {
      setDeleteConfirmation(false);
      toast.success("Your given rating deleted successfully");
      await dispatch(fetchReviewData(userInfo?.basic_information?.slug));
    }
  };

  const LoggedInUser =
    localStorage?.userData && JSON.parse(localStorage?.userData)?.id;

  return (
    <div>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="comment"
          onClickAction={handleCommentDelete}
        />
      )}
      <Box
        p={{ xs: 1, sm: 2 }}
        sx={{
          backgroundColor: "#ffff",
          boxShadow:
            "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
          borderRadius: "6px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            justifyContent: "space-between",
            "@media (max-width: 600px)": {
              flexDirection: "column",
            },
          }}
        >
          <TypographyTopTared>Reviews/Comments </TypographyTopTared>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "@media screen and (max-width:280px": {
                alignItems: "flex-start",
              },
            }}
          >
            <TypographySort>Sort By</TypographySort>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={filter}
                size="small"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >
                <MenuItem value={1}>Most recent</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Divider />
        {allReview?.comments?.length > 0 ? (
          allReview?.comments?.map((comments) => (
            <CommentBox>
              <HeadingNiconBox>
                <TextNchip>
                  <Box>
                    <Avatar
                      alt="Remy Sharp"
                      src={comments?.user?.avatar_original}
                      sx={{ height: "40px", width: "40px" }}
                    />
                  </Box>
                  <Box>
                    <NameText
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#231f20",
                      }}
                    >
                      {comments?.user?.name}
                    </NameText>
                  </Box>
                  <Chip
                    label={comments?.overall_rating}
                    size="small"
                    style={{ background: "#34A853", color: "#ffff" }}
                    onDelete={() => console.log("")}
                    deleteIcon={
                      <StarBorderOutlinedIcon
                        style={{ color: "#fff", cursor: "unset" }}
                      />
                    }
                  />
                </TextNchip>
                {comments?.user?.id == LoggedInUser && (
                  <DoticonBox className="doctionBox">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <MoreVertOutlinedIcon sx={{ color: "#7B7979" }} />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setAnchorEl(null);
                          handleClose();
                          dispatch(setUpdateFeedback([comments]));
                          setData(comments);
                          router.push("#comment-box");
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setAnchorEl(null);
                          setDeleteConfirmation(true);
                          setData(comments);
                        }}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </DoticonBox>
                )}
              </HeadingNiconBox>

              <CommentTextBox>
                <CommentText>{comments?.comments}</CommentText>

                <IconNdateTimeBox>
                  {comments?.user?.plan ? (
                    <>
                      <Box>
                        <CheckCircleIcon
                          sx={{ fontSize: "18px", color: "#7B7979" }}
                        />
                      </Box>
                      <Box>
                        <Userplantext>{comments?.user?.plan}</Userplantext>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box>
                        <CheckCircleIcon
                          sx={{ fontSize: "18px", color: "#7B7979" }}
                        />
                      </Box>
                      <Box>
                        <Noplan>N/A</Noplan>
                      </Box>
                    </>
                  )}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#7B7979",
                      }}
                    >
                      {comments?.created_at &&
                        moment(comments?.created_at).format(
                          "dddd, MMMM Do YYYY"
                        )}
                    </Typography>
                  </Box>
                </IconNdateTimeBox>
              </CommentTextBox>
            </CommentBox>
          ))
        ) : (
          <Box mt={2} textAlign={"center"}>
            <EmptyPage
              text="Review/Comments"
              actiontext={false}
              logo=""
              type="review"
            />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default CommentList;
