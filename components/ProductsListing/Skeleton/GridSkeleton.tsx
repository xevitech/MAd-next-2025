import React from "react";
import {
  Divider,
  Box,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function GridSkeleton() {
  return (
    <>
      <Grid container spacing={2} alignItems={"stretch"}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <Box
                sx={{
                  border: "1px solid #e1e1e1",
                  boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
                  borderRadius: "6px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                  }}
                >
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Skeleton variant="text" animation="wave" width={100} />
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      <Skeleton variant="text" animation="wave" width={50} />
                    </Box>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ padding: "6px", height:"228px" }}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={1.5}
                      sx={{
                        display: "flex", height:"100%",
                        justifyContent: "center",
                        "@media screen and (max-width:600px)": {
                          display: "none",
                        },
                      }}
                    >
                      <Stack
                        gap={"5px"}
                        justifyContent={"flex-start"}
                        display={"flex"}
                        width={"100%"}
                      >
                        <Skeleton
                          variant="rectangular"
                          height={"50px"}
                          width={"100%"}
                          style={{ borderRadius: "5px" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          height={"50px"}
                          width={"100%"}
                          style={{ borderRadius: "5px" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          height={"50px"}
                          width={"100%"}
                          style={{ borderRadius: "5px" }}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={10.5}>
                      <Skeleton
                        variant="rounded"
                        style={{ height: "100%", textAlign: "center" }}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    padding: "10px",
                  }}
                >
                  <Box>
                    <Skeleton variant="text" animation="wave" width={"80%"} />
                  </Box>
                  <Box>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"40%"}
                      height={25}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    padding: "6px 0",
                    borderTop: "1px solid #e7e7e7",
                    margin: "8px 10px 0px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Box>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap:"10px"
                          }}
                        >
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={30}
                          />
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={30}
                          />
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            border: "1px solid #e7e7e7",
                            padding: "3px 8px",
                            minWidth: "100px",
                            borderRadius: "4px",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={"100%"}
                          />
                        </Box>
                        <Box
                          sx={{
                            border: "1px solid #e7e7e7",
                            padding: "3px 8px",
                            minWidth: "40px",
                            borderRadius: "4px",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={"100%"}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4} height={"100%"}>
                  <Box
                    sx={{
                      border: "1px solid #e1e1e1",
                      boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
                      borderRadius: "6px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                      }}
                    >
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={100}
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={50}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Divider />
                    <Box
                      sx={{
                        padding: "4px",
                        border: "1px solid #e7e7e7",
                        margin: "8px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={"100%"}
                        height={"150px"}
                      />
                    </Box>
                    <Box
                      sx={{
                        margin: "8px",
                        borderBottom: "1px solid #e7e7e7",
                        paddingBottom: "10px",
                      }}
                    >
                      <Skeleton variant="text" animation="wave" width={"70%"} />
                      <Skeleton variant="text" animation="wave" width={"50%"} />
                    </Box>

                    <Box
                      sx={{
                        margin: "8px",
                        borderBottom: "1px dashed #e7e7e7",
                        paddingBottom: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "25px",
                          margin: "2px 8px",
                        }}
                      >
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={70}
                          />
                        </Box>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={60}
                          />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "35px",
                          margin: "2px 8px",
                        }}
                      >
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={60}
                          />
                        </Box>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={60}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        margin: "8px",
                        padding: "8px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          border: "1px solid #e7e7e7",
                          padding: "3px 8px",
                          minWidth: "100px",
                          borderRadius: "4px",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                        />
                      </Box>
                      <Box
                        sx={{
                          border: "1px solid #e7e7e7",
                          padding: "3px 8px",
                          minWidth: "40px",
                          borderRadius: "4px",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4} height={"100%"}>
                  <Box
                    sx={{
                      border: "1px solid #e1e1e1",
                      boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
                      borderRadius: "6px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                      }}
                    >
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={100}
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={50}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Divider />
                    <Box
                      sx={{
                        padding: "4px",
                        border: "1px solid #e7e7e7",
                        margin: "8px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={"100%"}
                        height={"150px"}
                      />
                    </Box>
                    <Box
                      sx={{
                        margin: "8px",
                        borderBottom: "1px solid #e7e7e7",
                        paddingBottom: "10px",
                      }}
                    >
                      <Skeleton variant="text" animation="wave" width={"70%"} />
                      <Skeleton variant="text" animation="wave" width={"50%"} />
                    </Box>

                    <Box
                      sx={{
                        margin: "8px",
                        borderBottom: "1px dashed #e7e7e7",
                        paddingBottom: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "25px",
                          margin: "2px 8px",
                        }}
                      >
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={70}
                          />
                        </Box>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={60}
                          />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "35px",
                          margin: "2px 8px",
                        }}
                      >
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={60}
                          />
                        </Box>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={60}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        margin: "8px",
                        padding: "8px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          border: "1px solid #e7e7e7",
                          padding: "3px 8px",
                          minWidth: "100px",
                          borderRadius: "4px",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                        />
                      </Box>
                      <Box
                        sx={{
                          border: "1px solid #e7e7e7",
                          padding: "3px 8px",
                          minWidth: "40px",
                          borderRadius: "4px",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4} height={"100%"} sx={{
                  
                   "@media screen and (max-width: 1600px)": {
                    display:"none"
                  },
                }}>
                  <Box
                    sx={{
                      border: "1px solid #e1e1e1",
                      boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
                      borderRadius: "6px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                      }}
                    >
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={100}
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={50}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Divider />
                    <Box
                      sx={{
                        padding: "4px",
                        border: "1px solid #e7e7e7",
                        margin: "8px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={"100%"}
                        height={"150px"}
                      />
                    </Box>
                    <Box
                      sx={{
                        margin: "8px",
                        borderBottom: "1px solid #e7e7e7",
                        paddingBottom: "10px",
                      }}
                    >
                      <Skeleton variant="text" animation="wave" width={"70%"} />
                      <Skeleton variant="text" animation="wave" width={"50%"} />
                    </Box>

                    <Box
                      sx={{
                        margin: "8px",
                        borderBottom: "1px dashed #e7e7e7",
                        paddingBottom: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "25px",
                          margin: "2px 8px",
                        }}
                      >
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={70}
                          />
                        </Box>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={60}
                          />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "35px",
                          margin: "2px 8px",
                        }}
                      >
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={60}
                          />
                        </Box>
                        <Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={60}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        margin: "8px",
                        padding: "8px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          border: "1px solid #e7e7e7",
                          padding: "3px 8px",
                          minWidth: "100px",
                          borderRadius: "4px",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                        />
                      </Box>
                      <Box
                        sx={{
                          border: "1px solid #e7e7e7",
                          padding: "3px 8px",
                          minWidth: "40px",
                          borderRadius: "4px",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
              <Skeleton variant="text" animation="wave" width={"50%"} />
            </Box>

            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "40px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
              <Skeleton variant="text" animation="wave" width={"50%"} />
            </Box>

            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "40px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
              <Skeleton variant="text" animation="wave" width={"50%"} />
            </Box>

            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "40px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
              <Skeleton variant="text" animation="wave" width={"50%"} />
            </Box>

            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "40px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
              <Skeleton variant="text" animation="wave" width={"50%"} />
            </Box>

            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "40px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
              <Skeleton variant="text" animation="wave" width={"50%"} />
            </Box>

            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "40px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
              <Skeleton variant="text" animation="wave" width={"50%"} />
            </Box>

            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "40px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
              <Skeleton variant="text" animation="wave" width={"50%"} />
            </Box>

            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "40px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
              <Skeleton variant="text" animation="wave" width={"50%"} />
            </Box>

            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "40px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px solid #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
              <Skeleton variant="text" animation="wave" width={"50%"} />
            </Box>

            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "40px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
