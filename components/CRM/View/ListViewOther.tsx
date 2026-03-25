import * as React from "react";
import { CrmTableField, TableCoulmn, TaskRelatesTable } from "./style";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "../commonStyle";
import { Box, Chip, Link, Tooltip, Typography } from "@mui/material";
import {
  setSelectedActvityIds,
  setRedirectedValue,
  setSelectedDataIds,
  setSingleActivity,
} from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { useRouter } from "next/router";
import moment from "moment";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { styled } from "@mui/material/styles";
import { TooltipProps } from "@mui/material/Tooltip";

const ToBeStyledTooltip = ({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ tooltip: className }} />
);
const StyledTooltip = styled(ToBeStyledTooltip)(({ theme }) => ({
  backgroundColor: "#f5f5f9",
  color: "rgba(0, 0, 0, 0.87)",
  maxWidth: 220,
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
  fontSize: theme.typography.pxToRem(12),
  border: "1px solid #dadde9",
  "& .MuiTypography-root": {
    fontSize: "12px",
  },
}));

const ListViewOther = (props) => {
  const { userLists, typeName, taskMeetingCalls, dataLoader } = useSelector(
    (state: any) => state.formList
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const EditPopup = (params) => {
    dispatch(setSelectedDataIds([]));
    router.push(
      typeName == "Tasks"
        ? `tasks/${params?.id}`
        : typeName == "Calls"
        ? `calls/${params?.id}`
        : `meetings/${params?.id}`
    );
  };

  const taskColumns: any = [
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span onClick={() => EditPopup(params?.row)}>
            {params?.row?.subject}
          </span>
        );
      },
    },
    {
      field: "task_date",
      headerName: "Due Date",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span onClick={() => EditPopup(params?.row)}>
            {moment(params?.row?.task_date).format("DD MMM YYYY")}
          </span>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span
            style={{ textTransform: "capitalize" }}
            onClick={() => EditPopup(params?.row)}
          >
            {params?.row?.status?.replaceAll("-", " ")}
          </span>
        );
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <div
            style={{
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => EditPopup(params?.row)}
          >
            <span
              className="flagstyle"
              style={{
                color:
                  params?.row?.priority == "high"
                    ? "#d7282f"
                    : params?.row?.priority == "lowest"
                    ? "#999"
                    : params?.row?.priority == "low"
                    ? "#6666c4"
                    : "orange",
              }}
            >
              <FlagOutlinedIcon />
            </span>
            <span> {params?.row?.priority}</span>
          </div>
        );
      },
    },
    {
      field: "related_with",
      headerName: "Related To",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.type_name == "Leads" &&
            params?.row?.related_with_value?.length > 0 ? (
              <TaskRelatesTable
                onClick={() => {
                  dispatch(setRedirectedValue(true));
                  router.push(`leads/${params?.row?.unique_id}`);
                }}
              >
                <StyledTooltip
                  title={
                    <Box>
                      <Typography>
                        <span>Phone:</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "Mobile_No."
                            )?.value
                          }
                        </Link>
                      </Typography>
                      <Typography>
                        <span>Email</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "mail"
                            )?.value
                          }
                        </Link>
                      </Typography>
                    </Box>
                  }
                >
                  <span className="relatedWithValueShow">
                    <i className="icon-leads"></i>
                    <Typography>
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "First_Name"
                        )?.value
                      }{" "}
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "Last_Name"
                        )?.value
                      }
                    </Typography>
                  </span>
                </StyledTooltip>
              </TaskRelatesTable>
            ) : params?.row?.type_name == "Contact" &&
              params?.row?.related_with_value?.length > 0 ? (
              <TaskRelatesTable
                onClick={() => {
                  dispatch(setRedirectedValue(true));
                  router.push(`contacts/${params?.row?.unique_id}`);
                }}
              >
                <StyledTooltip
                  title={
                    <Box>
                      <Typography>
                        <span>Phone:</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "Mobile_No."
                            )?.value
                          }
                        </Link>
                      </Typography>
                      <Typography>
                        <span>Email</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "mail"
                            )?.value
                          }
                        </Link>
                      </Typography>
                    </Box>
                  }
                >
                  <span className="relatedWithValueShow">
                    <i className="icon-contact"></i>
                    <Typography>
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "First_Name"
                        )?.value
                      }{" "}
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "Last_Name"
                        )?.value
                      }
                    </Typography>
                  </span>
                </StyledTooltip>
              </TaskRelatesTable>
            ) : params?.row?.type_name == "Account" &&
              params?.row?.related_with_value?.length > 0 ? (
              <TaskRelatesTable
                onClick={() => {
                  dispatch(setRedirectedValue(true));
                  router.push(`accounts/${params?.row?.unique_id}`);
                }}
              >
                <StyledTooltip
                  title={
                    <Box>
                      <Typography>
                        <span>Account Name:</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) =>
                                ele.name == "Account_Name" ||
                                ele.name == "Account"
                            )?.value
                          }
                        </Link>
                      </Typography>
                      <Typography>
                        <span>Email</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "mail"
                            )?.value
                          }
                        </Link>
                      </Typography>
                    </Box>
                  }
                >
                  <span className="relatedWithValueShow">
                    <i className="icon-account"></i>
                    <Typography>
                      {
                        params?.row?.related_with_value?.find(
                          (ele) =>
                            ele.name == "Account_Name" || ele.name == "Account"
                        )?.value
                      }
                    </Typography>
                  </span>
                </StyledTooltip>
              </TaskRelatesTable>
            ) : (
              params?.row?.related_with_value?.length > 0 && (
                <TaskRelatesTable
                  onClick={() => {
                    dispatch(setRedirectedValue(true));
                    router.push(`deals/${params?.row?.unique_id}`);
                  }}
                >
                  <StyledTooltip
                    title={
                      <Box>
                        <Typography>
                          <span>Phone:</span>
                          <Link>
                            {
                              params?.row?.related_with_value?.find(
                                (ele) => ele.name == "Mobile_No."
                              )?.value
                            }
                          </Link>
                        </Typography>
                        <Typography>
                          <span>Email</span>
                          <Link>
                            {
                              params?.row?.related_with_value?.find(
                                (ele) => ele.name == "mail"
                              )?.value
                            }
                          </Link>
                        </Typography>
                      </Box>
                    }
                  >
                    <span className="relatedWithValueShow">
                      <i className="icon-deal"></i>
                      <Typography>
                        {
                          params?.row?.related_with_value?.find(
                            (ele) => ele.name == "Deal_Name"
                          )?.value
                        }
                      </Typography>
                    </span>
                  </StyledTooltip>
                </TaskRelatesTable>
              )
            )}
          </>
        );
      },
    },
    {
      field: "task_owner",
      headerName: "Task Owner",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        let taskOwner = userLists?.find(
          (ele) => ele.id == params?.row?.task_owner
        );
        return (
          <span onClick={() => EditPopup(params?.row)}>{taskOwner?.name}</span>
        );
      },
    },
    {
      field: "tag",
      headerName: "Tag",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            <CrmTableField>
              <div className="crmlanguagefield">
                {params?.row?.tag_id?.length > 0 &&
                  params?.row?.tag_id?.map((ele, index) => (
                    <Chip
                      key={index}
                      size="small"
                      variant="filled"
                      label={ele.name}
                      sx={{
                        color: "#fff",
                        background: ele.background_color_code,
                        border: `1px solid ${ele.background_color_code}`,
                      }}
                    />
                  ))}
              </div>
            </CrmTableField>
          </>
        );
      },
    },
  ];

  const meetingColumn: any = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span onClick={() => EditPopup(params?.row)}>
            {params?.row?.title}
          </span>
        );
      },
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return <span onClick={() => EditPopup(params?.row)}>{params?.row?.location}</span>;
      },
    },
    {
      field: "from",
      headerName: "From",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return <span onClick={() => EditPopup(params?.row)}>{moment(params?.row?.from).format(`MMM DD, YYYY hh:mm A`)}</span>;
      },
    },
    {
      field: "to",
      headerName: "To",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return <span onClick={() => EditPopup(params?.row)}>{moment(params?.row?.to).format(`MMM DD, YYYY hh:mm A`)}</span>;
      },
    },
    {
      field: "host",
      headerName: "Host",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        let host = userLists?.find((ele) => ele.id == params?.row?.host);
        return <span onClick={() => EditPopup(params?.row)}>{host?.name}</span>;
      },
    },
    {
      field: "related_with",
      headerName: "Related To",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.type_name == "Leads" &&
            params?.row?.related_with_value?.length > 0 ? (
              <TaskRelatesTable
                onClick={() => {
                  dispatch(setRedirectedValue(true));
                  router.push(`leads/${params?.row?.unique_id}`);
                }}
              >
                <StyledTooltip
                  title={
                    <Box>
                      <Typography>
                        <span>Phone:</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "Mobile_No."
                            )?.value
                          }
                        </Link>
                      </Typography>
                      <Typography>
                        <span>Email</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "mail"
                            )?.value
                          }
                        </Link>
                      </Typography>
                    </Box>
                  }
                >
                  <span className="relatedWithValueShow">
                    <i className="icon-leads"></i>
                    <Typography>
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "First_Name"
                        )?.value
                      }{" "}
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "Last_Name"
                        )?.value
                      }
                    </Typography>
                  </span>
                </StyledTooltip>
              </TaskRelatesTable>
            ) : params?.row?.type_name == "Contact" &&
              params?.row?.related_with_value?.length > 0 ? (
              <TaskRelatesTable
                onClick={() => {
                  dispatch(setRedirectedValue(true));
                  router.push(`contacts/${params?.row?.unique_id}`);
                }}
              >
                <StyledTooltip
                  title={
                    <Box>
                      <Typography>
                        <span>Phone:</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "Mobile_No."
                            )?.value
                          }
                        </Link>
                      </Typography>
                      <Typography>
                        <span>Email</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "mail"
                            )?.value
                          }
                        </Link>
                      </Typography>
                    </Box>
                  }
                >
                  <span className="relatedWithValueShow">
                    <i className="icon-contact"></i>
                    <Typography>
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "First_Name"
                        )?.value
                      }{" "}
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "Last_Name"
                        )?.value
                      }
                    </Typography>
                  </span>
                </StyledTooltip>
              </TaskRelatesTable>
            ) : params?.row?.type_name == "Account" &&
              params?.row?.related_with_value?.length > 0 ? (
              <TaskRelatesTable
                onClick={() => {
                  dispatch(setRedirectedValue(true));
                  router.push(`accounts/${params?.row?.unique_id}`);
                }}
              >
                <StyledTooltip
                  title={
                    <Box>
                      <Typography>
                        <span>Account Name:</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) =>
                                ele.name == "Account_Name" ||
                                ele.name == "Account"
                            )?.value
                          }
                        </Link>
                      </Typography>
                      <Typography>
                        <span>Email</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "mail"
                            )?.value
                          }
                        </Link>
                      </Typography>
                    </Box>
                  }
                >
                  <span className="relatedWithValueShow">
                    <i className="icon-account"></i>
                    <Typography>
                      {
                        params?.row?.related_with_value?.find(
                          (ele) =>
                            ele.name == "Account_Name" || ele.name == "Account"
                        )?.value
                      }
                    </Typography>
                  </span>
                </StyledTooltip>
              </TaskRelatesTable>
            ) : (
              params?.row?.related_with_value?.length > 0 && (
                <TaskRelatesTable
                  onClick={() => {
                    dispatch(setRedirectedValue(true));
                    router.push(`deals/${params?.row?.unique_id}`);
                  }}
                >
                  <StyledTooltip
                    title={
                      <Box>
                        <Typography>
                          <span>Phone:</span>
                          <Link>
                            {
                              params?.row?.related_with_value?.find(
                                (ele) => ele.name == "Mobile_No."
                              )?.value
                            }
                          </Link>
                        </Typography>
                        <Typography>
                          <span>Email</span>
                          <Link>
                            {
                              params?.row?.related_with_value?.find(
                                (ele) => ele.name == "mail"
                              )?.value
                            }
                          </Link>
                        </Typography>
                      </Box>
                    }
                  >
                    <span className="relatedWithValueShow">
                      <i className="icon-deal"></i>
                      <Typography>
                        {
                          params?.row?.related_with_value?.find(
                            (ele) => ele.name == "Deal_Name"
                          )?.value
                        }{" "}
                      </Typography>
                    </span>
                  </StyledTooltip>
                </TaskRelatesTable>
              )
            )}
          </>
        );
      },
    },
    {
      field: "tag",
      headerName: "Tag",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            <CrmTableField>
              <div className="crmlanguagefield">
                {params?.row?.tag_id?.length > 0 &&
                  params?.row?.tag_id?.map((ele, index) => (
                    <Chip
                      key={index}
                      size="small"
                      variant="filled"
                      label={ele.name}
                      sx={{
                        color: "#fff",
                        background: ele.background_color_code,
                        border: `1px solid ${ele.background_color_code}`,
                      }}
                    />
                  ))}
              </div>
            </CrmTableField>
          </>
        );
      },
    },
  ];

  const callColumn: any = [
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span onClick={() => EditPopup(params?.row)}>
            {params?.row?.subject}
          </span>
        );
      },
    },
    {
      field: "call_type",
      headerName: "Call Type",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span style={{ textTransform: "capitalize" }} onClick={() => EditPopup(params?.row)}>
            {params?.row?.call_type?.replaceAll("-", " ")}
          </span>
        );
      },
    },
    {
      field: "status",
      headerName: "Call Status",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span style={{ textTransform: "capitalize" }} onClick={() => EditPopup(params?.row)}>
            {params?.row?.status?.replaceAll("-", " ")}
          </span>
        );
      },
    },
    {
      field: "call_start_date_time",
      headerName: "Call Start Time",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span onClick={() => EditPopup(params?.row)}>
            {moment(params?.row?.call_start_date_time).format(
              `MMM DD, YYYY hh:mm A`
            )}
          </span>
        );
      },
    },
    {
      field: "call_duration",
      headerName: "Call Duration (seconds)",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span onClick={() => EditPopup(params?.row)}>
            {params?.row?.call_duration
              ? `${params?.row?.call_duration * 60}:00`
              : "00:00"}
          </span>
        );
      },
    },
    {
      field: "related_with",
      headerName: "Related To",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.type_name == "Leads" &&
            params?.row?.related_with_value?.length > 0 ? (
              <TaskRelatesTable
                onClick={() => {
                  dispatch(setRedirectedValue(true));
                  router.push(`leads/${params?.row?.unique_id}`);
                }}
              >
                <StyledTooltip
                  title={
                    <Box>
                      <Typography>
                        <span>Phone:</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "Mobile_No."
                            )?.value
                          }
                        </Link>
                      </Typography>
                      <Typography>
                        <span>Email</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "mail"
                            )?.value
                          }
                        </Link>
                      </Typography>
                    </Box>
                  }
                >
                  <span className="relatedWithValueShow">
                    <i className="icon-leads"></i>
                    <Typography>
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "First_Name"
                        )?.value
                      }{" "}
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "Last_Name"
                        )?.value
                      }
                    </Typography>
                  </span>
                </StyledTooltip>
              </TaskRelatesTable>
            ) : params?.row?.type_name == "Contact" &&
              params?.row?.related_with_value?.length > 0 ? (
              <TaskRelatesTable
                onClick={() => {
                  dispatch(setRedirectedValue(true));
                  router.push(`contacts/${params?.row?.unique_id}`);
                }}
              >
                <StyledTooltip
                  title={
                    <Box>
                      <Typography>
                        <span>Phone:</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "Mobile_No."
                            )?.value
                          }
                        </Link>
                      </Typography>
                      <Typography>
                        <span>Email</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "mail"
                            )?.value
                          }
                        </Link>
                      </Typography>
                    </Box>
                  }
                >
                  <span className="relatedWithValueShow">
                    <i className="icon-contact"></i>
                    <Typography>
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "First_Name"
                        )?.value
                      }{" "}
                      {
                        params?.row?.related_with_value?.find(
                          (ele) => ele.name == "Last_Name"
                        )?.value
                      }
                    </Typography>
                  </span>
                </StyledTooltip>
              </TaskRelatesTable>
            ) : params?.row?.type_name == "Account" &&
              params?.row?.related_with_value?.length > 0 ? (
              <TaskRelatesTable
                onClick={() => {
                  dispatch(setRedirectedValue(true));
                  router.push(`accounts/${params?.row?.unique_id}`);
                }}
              >
                <StyledTooltip
                  title={
                    <Box>
                      <Typography>
                        <span>Account Name:</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) =>
                                ele.name == "Account_Name" ||
                                ele.name == "Account"
                            )?.value
                          }
                        </Link>
                      </Typography>
                      <Typography>
                        <span>Email</span>
                        <Link>
                          {
                            params?.row?.related_with_value?.find(
                              (ele) => ele.name == "mail"
                            )?.value
                          }
                        </Link>
                      </Typography>
                    </Box>
                  }
                >
                  <span className="relatedWithValueShow">
                    <i className="icon-account"></i>
                    <Typography>
                      {
                        params?.row?.related_with_value?.find(
                          (ele) =>
                            ele.name == "Account_Name" || ele.name == "Account"
                        )?.value
                      }
                    </Typography>
                  </span>
                </StyledTooltip>
              </TaskRelatesTable>
            ) : (
              params?.row?.related_with_value?.length > 0 && (
                <TaskRelatesTable
                  onClick={() => {
                    dispatch(setRedirectedValue(true));
                    router.push(`deals/${params?.row?.unique_id}`);
                  }}
                >
                  <StyledTooltip
                    title={
                      <Box>
                        <Typography>
                          <span>Phone:</span>
                          <Link>
                            {
                              params?.row?.related_with_value?.find(
                                (ele) => ele.name == "Mobile_No."
                              )?.value
                            }
                          </Link>
                        </Typography>
                        <Typography>
                          <span>Email</span>
                          <Link>
                            {
                              params?.row?.related_with_value?.find(
                                (ele) => ele.name == "mail"
                              )?.value
                            }
                          </Link>
                        </Typography>
                      </Box>
                    }
                  >
                    <span className="relatedWithValueShow">
                      <i className="icon-deal"></i>
                      <Typography>
                        {
                          params?.row?.related_with_value?.find(
                            (ele) => ele.name == "Deal_Name"
                          )?.value
                        }
                      </Typography>
                    </span>
                  </StyledTooltip>
                </TaskRelatesTable>
              )
            )}
          </>
        );
      },
    },
    {
      field: "call_owner",
      headerName: "Call Owner",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        let callOwner = userLists?.find(
          (ele) => ele.id == params?.row?.call_owner
        );
        return <span onClick={() => EditPopup(params?.row)}>{callOwner?.name}</span>;
      },
    },
    {
      field: "call_purpose",
      headerName: "Call Purpose",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return <span onClick={() => EditPopup(params?.row)}>{params?.row?.call_purpose}</span>;
      },
    },
    {
      field: "call_agenda",
      headerName: "Call Agenda",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return <span onClick={() => EditPopup(params?.row)}>{params?.row?.call_agenda}</span>;
      },
    },
    {
      field: "recording",
      headerName: "Voice Recording",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span
            style={{ wordBreak: "break-all" }}
            onClick={() => {
              window.open(params?.row?.recording, "_blank", "noreferrer");
            }}
          >
            {params?.row?.recording}
          </span>
        );
      },
    },
    {
      field: "incoming_call_reason",
      headerName: "Reason for Call",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return <span onClick={() => EditPopup(params?.row)}>{params?.row?.incoming_call_reason}</span>;
      },
    },
    {
      field: "tag",
      headerName: "Tag",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            <CrmTableField>
              <div className="crmlanguagefield">
                {params?.row?.tag_id?.length > 0 &&
                  params?.row?.tag_id?.map((ele, index) => (
                    <Chip
                      key={index}
                      size="small"
                      variant="filled"
                      label={ele.name}
                      sx={{
                        color: "#fff",
                        background: ele.background_color_code,
                        border: `1px solid ${ele.background_color_code}`,
                      }}
                    />
                  ))}
              </div>
            </CrmTableField>
          </>
        );
      },
    },
  ];

  const handleCellClick = (param, event) => {
    param.field && event.stopPropagation();
  };

  return (
    <>
      <TableCoulmn sx={{ /*height: 525,*/ width: "100%" }}>
        <DataGridPro
          onCellClick={handleCellClick}
          pagination
          rows={
            dataLoader
              ? []
              : taskMeetingCalls?.data?.data?.length > 0
              ? taskMeetingCalls?.data?.data
              : []
          }
          columns={
            typeName == "Tasks"
              ? taskColumns
              : typeName == "Meetings"
              ? meetingColumn
              : callColumn
          }
          loading={dataLoader}
          getRowHeight={() => "auto"}
          checkboxSelection
          sx={DataGridStyle}
          pageSize={14}
          autoHeight={false}
          onSelectionModelChange={(ids) => {
            dispatch(setSelectedActvityIds(ids));
          }}
        />
      </TableCoulmn>
    </>
  );
};
export default ListViewOther;
