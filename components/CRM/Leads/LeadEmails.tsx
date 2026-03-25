import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { DataGridPro } from "@mui/x-data-grid-pro";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {
  ComposeMailBtn,
  EmailActionButon,
  EmailAddress,
  EmailAvatarContainer,
  EmailAvatarInfo,
  EmailAvatarLabel,
  EmailDetailButtoins,
  EmailDetailInnerInfo,
  EmailDetailOuter,
  EmailDetailTop,
  EmailDetailTopRight,
  EmailOuterContainer,
  EmailSubject,
  EmailTabBox,
  ImageWithText,
  MailDetailIcons,
  SelectEmailOption,
  SelectEmailText,
  SubjectMailText,
  TabsStyleMail,
  TabsStyleindicator,
} from "../style";
import {
  BtnFilledLeads,
  DataGridStyle,
  SmallOutineBtn,
} from "../commonStyle";
import ComposeEmail from "./ComposeEmail";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllSelectedEmail, getAllListOfEmails, setEmailViewType, setEmailIds, setDraftData, setEmailIdToSender, createHistory } from "@/hooks/UseCreateFormData";
import moment from "moment";
import { Avatar, Button, Divider, Grid, IconButton, Link, Tooltip } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <EmailTabBox>
          <Typography>{children}</Typography>
        </EmailTabBox>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const LeadEmails = () => {
  const [value, setValue] = React.useState(0);
  const [emailType, setEmailType] = useState(0)
  const { userEmailsList, emailViewType, emailIdToSender, tabsLoader, emailIds, details, typeId } = useSelector((state: any) => state.formList);
  const dispatch = useDispatch()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    dispatch(setEmailIds([]))
    dispatch(setDraftData(''))
  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    dispatch(getAllListOfEmails())
  }, [dispatch])


  const allEmailColumns = [
    {
      field: "id",
      headerName: "Subject",
      width: 100,
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
            <SubjectMailText>
              {
                cellValues?.row?.email_status == 'recieved' ?
                  <Image
                    src="/assets/images/crm/mail_recived.svg"
                    alt="Edit"
                    width={17}
                    height={18}
                  />
                  :
                  <Image
                    src="/assets/images/crm/mail_subject_icon.svg"
                    alt="Edit"
                    width={17}
                    height={18}
                  />
              }

              <ImageWithText onClick={() => {
                cellValues?.row.status == 'draft' && dispatch(setEmailViewType(1))
              }}>
                <EmailSubject>{cellValues?.row?.subject}</EmailSubject>
                <EmailAddress>{cellValues?.row?.to}</EmailAddress>
              </ImageWithText>
            </SubjectMailText>
          </>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Date",
      width: 250,
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
            {moment(cellValues?.row?.created_at).format("ddd MMM DD YYYY HH:mm:ss")}
          </>
        );
      },
    },
    {
      field: "sent_by",
      headerName: "Sent By",
      width: 90,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <span style={{textTransform:'capitalize'}}>
            {cellValues?.value}
          </span>
        );
      },
    },
  ];

  const commonClearDelete =
    emailIds?.length > 0 &&
    (
      <SelectEmailOption>
        <SelectEmailText>{emailIds?.length} Email(s) selected</SelectEmailText>
        <EmailActionButon>
          <SmallOutineBtn
            variant="outlined"
            startIcon={<CancelOutlinedIcon />}
            onClick={() => {
              dispatch(setEmailIds([]))
            }}
          >
            Clear
          </SmallOutineBtn>
          <SmallOutineBtn
            variant="outlined"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={() => {
              dispatch(deleteAllSelectedEmail())
              dispatch(
                createHistory({
                  lead_id: details.unique_id,
                  type_id:typeId,
                  name: "Email",
                  type: "email",
                  message: `<span>Email Deleted</span> `,
                })
              );
            }}
          >
            Delete
          </SmallOutineBtn>
        </EmailActionButon>
      </SelectEmailOption>
    )


  const handleCellClick = (param, event) => {
    dispatch(setEmailIdToSender(param.row))
    if (param.field != '__check__') dispatch(setEmailViewType(1))
    param.field && event.stopPropagation();
    dispatch(setDraftData(param.row))
  };

  return (
    <>
      {
        emailViewType == 0 ?
          (<EmailOuterContainer>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  sx={TabsStyleMail}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    icon={<EmailTwoToneIcon />}
                    iconPosition="start"
                    label="All Emails"
                    {...a11yProps(0)}
                  />
                  <Tab
                    icon={<DescriptionTwoToneIcon />}
                    iconPosition="start"
                    label="Draft"
                    {...a11yProps(1)}
                  />
                  <Tab
                    icon={<CalendarMonthTwoToneIcon />}
                    iconPosition="start"
                    label="Scheduled"
                    {...a11yProps(2)}
                  />
                  <Tab
                    icon={<SendTwoToneIcon />}
                    iconPosition="start"
                    label="Sent"
                    {...a11yProps(3)}
                  />
                  <ComposeMailBtn
                    variant="outlined"
                    startIcon={
                      <Image
                        src="/assets/images/crm/filter.svg"
                        alt="Edit"
                        width={18}
                        height={14}
                      />
                    }
                    onClick={() => {
                      dispatch(setEmailViewType(1))
                    }}
                  >
                    Compose Email
                  </ComposeMailBtn>
                </Tabs>
                <Button variant="outlined" className="Composefixed"
                  startIcon={
                    <Image
                      src="/assets/images/crm/filter.svg"
                      alt="Edit"
                      width={18}
                      height={14}
                    />
                  }
                  onClick={() => {
                    dispatch(setEmailViewType(1))
                  }}
                >
                  Compose Email
                </Button>
              </Box>
              <CustomTabPanel value={value} index={0}>
                {commonClearDelete}
                <Box style={{ height: 520, width: "100%" }}>
                  <DataGridPro
                    pagination
                    rows={userEmailsList ? userEmailsList : []}
                    columns={allEmailColumns}
                    loading={tabsLoader}
                    rowHeight={50}
                    checkboxSelection
                    sx={DataGridStyle}
                    selectionModel={emailIds}
                    onSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      dispatch(setEmailIds(ids))
                    }}
                  // disableRowSelectionOnClick
                  />
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {commonClearDelete}
                <Box style={{ height: 520, width: "100%" }}>
                  <DataGridPro
                    onCellClick={handleCellClick}
                    pagination
                    rows={userEmailsList ? userEmailsList?.filter((ele) => ele.status == 'draft') : []}
                    columns={allEmailColumns}
                    loading={tabsLoader}
                    rowHeight={50}
                    checkboxSelection
                    sx={DataGridStyle}
                    selectionModel={emailIds}
                    onSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      dispatch(setEmailIds(ids))
                    }}
                  // disableRowSelectionOnClick
                  />
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                {commonClearDelete}
                <Box style={{ height: 520, width: "100%" }}>
                  <DataGridPro
                    rows={userEmailsList ? userEmailsList?.filter((ele) => ele.status == 'schedule') : []}
                    columns={allEmailColumns}
                    loading={tabsLoader}
                    rowHeight={50}
                    checkboxSelection
                    sx={DataGridStyle}
                    selectionModel={emailIds}
                    onSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      dispatch(setEmailIds(ids))
                    }}
                  // disableRowSelectionOnClick
                  />
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                {commonClearDelete}
                <Box style={{ height: 520, width: "100%" }}>
                  <DataGridPro
                    rows={userEmailsList ? userEmailsList?.filter((ele) => ele.status == 'send') : []}
                    columns={allEmailColumns}
                    loading={tabsLoader}
                    rowHeight={50}
                    checkboxSelection
                    sx={DataGridStyle}
                    selectionModel={emailIds}
                    onSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      dispatch(setEmailIds(ids))
                    }}
                  // disableRowSelectionOnClick
                  />
                </Box>
              </CustomTabPanel>
            </Box>
          </EmailOuterContainer>)
          :
          (<ComposeEmail
            type={''}
            reciver={details?.mail} 
            unique_id={emailIdToSender?.unique_id ? emailIdToSender?.unique_id : details?.unique_id}
            emailType={emailType}
          />)
      }

      {/* <EmailDetailOuter>
        <EmailDetailTop>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <EmailAvatarContainer>
                <EmailAvatarLabel>
                  <Avatar
                    style={{ marginRight: "14px" }}
                    alt="Jack Sparrow"
                    src="https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  />
                  <EmailAvatarInfo>
                    <Typography variant="body2"> <Link color="inherit" underline="none">{'Kamalpreet Kaur <kamal@powercozmo.com>'}</Link></Typography>
                    <Typography variant="body2">To:  You</Typography>
                  </EmailAvatarInfo>
                </EmailAvatarLabel>
              </EmailAvatarContainer>
            </Grid>
            <Grid item md={4}>
              <EmailDetailTopRight>
                <MailDetailIcons>
                  <IconButton aria-label="Reply Single" size="small">
                    <i className="icon-reply-single"></i>
                  </IconButton>
                  <IconButton aria-label="Reply All" size="small">
                    <i className="icon-reply-all"></i>
                  </IconButton>
                  <IconButton onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined} aria-label="delete">
                    <Tooltip title="More Action" arrow placement="top">
                      <MoreHorizOutlinedIcon />
                    </Tooltip>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        width: "150px",
                        mt: 0,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleClose}> Reply</MenuItem>
                    <MenuItem onClick={handleClose}>Reply All</MenuItem>
                    <MenuItem onClick={handleClose}>Forward</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                    <MenuItem onClick={handleClose}>Mark as unread</MenuItem>
                    <MenuItem onClick={handleClose}>Print</MenuItem>
                  </Menu>
                </MailDetailIcons>
                <Typography variant="body2"> Thu 07-Sep-23 11:26AM</Typography>
              </EmailDetailTopRight>
            </Grid>
          </Grid>
        </EmailDetailTop>
        <Divider />
        <EmailDetailInnerInfo>
          <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
          <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</Typography>
          <Typography variant="h6"> What is Lorem Ipsum?</Typography>
          <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Typography>

          <Typography variant="h6">Why do we use it?</Typography>
          <Typography variant="body2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </Typography>


          <Typography variant="h6">Where does it come from?</Typography>
          <Typography variant="body2">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" written in 45 BC.</Typography>
          <EmailDetailButtoins>
            <BtnFilledLeads variant="contained" startIcon={<ReplyOutlinedIcon />}>
              Send
            </BtnFilledLeads>
          </EmailDetailButtoins>
        </EmailDetailInnerInfo>

      </EmailDetailOuter> */}
    </>
  );
};

export default LeadEmails;
