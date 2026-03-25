import React, { useEffect, useState } from "react";
/** Common file for these two components **/
import { OuterContainer } from "../../SellerTools/styles";
/** Common file for these two components **/
import { ProfileHeader } from "../../common/profileheader";
import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import {
  FieldCoulmnInn,
  FieldCoulmnText,
  FieldMappingColumn,
  FieldMappingContainer,
  FieldMappingInner,
  FieldMappingTitle,
  FieldTitleText,
  MappingActionArea,
  MappingActionButon,
  MappingFormcontrol,
  MappingHedingTop,
  MappingTableArea,
  TableStyle,
} from "../style";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  CrmInnerContent,
  SmallBlackOutineBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
} from "../commonStyle";
import { apiClient } from "@/components/common/common";
import { useRouter } from "next/router";
import CommonHeader from "./CommonHeader";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "#FBFBFB",
    padding: "10px 20px",
    borderLeft: "4px solid #34A400",
    borderBottom: "none",
    zIndex: 1,
    position: "relative",
  },

  [`&.${tableCellClasses.head}:last-child`]: {
    borderColor: "#A386C7",
    borderRight: "none",
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#000",
    fontWeight: 600,
    padding: "10px",
    border: "none",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  background: "#F9FAFB",
  border: "none",
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FieldMapping = () => {
  const [inputField, setInputField] = useState<any>([]);
  const [fields, setFields] = useState([]);
  const [leadsField, setLeadsField] = useState([]);
  const [activeButton, setActiveButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleChange = (event, lead, type) => {
    setActiveButton(true);
    const data =
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData"));

    setInputField((prevInputField) => {
      const leadInputId = lead?.id;
      const existingItemIndex = prevInputField.findIndex(
        (item) => item.lead_input_id === leadInputId
      );

      if (existingItemIndex !== -1) {
        const updatedInputField = [...prevInputField];
        updatedInputField[existingItemIndex] = {
          ...updatedInputField[existingItemIndex],
          [`${
            type.toLowerCase() == "company"
              ? type.toLowerCase()
              : type.toLowerCase() == "deals"
              ? "deal"
              : "contact"
          }_input_id`]: event?.target?.value || "",
        };
        updatedInputField[existingItemIndex] = {
          ...updatedInputField[existingItemIndex],
          ["id"]: lead?.mapping_id ? lead?.mapping_id : "",
        };
        return updatedInputField;
      } else {
        return [
          ...prevInputField,
          {
            id: lead?.mapping_id ? lead?.mapping_id : "",
            lead_input_id: leadInputId,
            deal_input_id: type === "deals" ? event?.target?.value : "",
            contact_input_id: type === "contacts" ? event?.target?.value : "",
            company_input_id: type === "company" ? event?.target?.value : "",
            user_id: data?.id,
          },
        ];
      }
    });
  };

  const getAllFields = async () => {
    setLoader(true);
    const data =
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData"));
    let response = await apiClient(
      `crm/lead-convert/index?type_name=Leads&type_id=1,2,3,4&user_id=${data?.id}`,
      "get"
    );
    if (response.status == 200 || response.status == true) {
      setFields(response?.data);
      setLeadsField(response?.data?.filter((ele) => ele?.type_name == "Leads"));
      setLoader(false);
    }
  };

  useEffect(() => {
    getAllFields();
  }, []);

  const renderDynamicMenuItems = (dataType, fieldType, index) => {
    let filterDataTypes = fields?.filter(
      (ele) => ele?.type_name == dataType
    )?.[0]?.form_fields_data;
    let filterInputFields = filterDataTypes?.filter(
      (ele) => ele?.field_type == fieldType?.field_type
    );
    return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue="none"
        onChange={(event) => {
          setLeadsField((prevData) => {
            return prevData.map((item) => {
              if (item?.id) {
                return {
                  ...item,
                  form_fields_data: item.form_fields_data.map((field) => {
                    if (field.id === fieldType?.id) {
                      return {
                        ...field,
                        [`${
                          dataType.toLowerCase() == "company"
                            ? dataType.toLowerCase()
                            : dataType.toLowerCase() == "deals"
                            ? "deal"
                            : "contact"
                        }_input_id`]: event?.target?.value,
                      };
                    }
                    return field;
                  }),
                };
              }
              return item;
            });
          });

          handleChange(event, fieldType, dataType?.toLowerCase());
        }}
        value={
          dataType == "Company"
            ? fieldType?.company_input_id == ""
              ? "none"
              : fieldType?.company_input_id
            : dataType == "Contacts"
            ? fieldType?.contact_input_id == ""
              ? "none"
              : fieldType?.contact_input_id
            : fieldType?.deal_input_id == ""
            ? "none"
            : fieldType?.deal_input_id
        }
        IconComponent={KeyboardArrowDownOutlinedIcon}
      >
        <MenuItem value={"none"}>None</MenuItem>
        {filterInputFields?.map((item) => (
          <MenuItem key={item?.id} value={item?.id}>
            {item?.name == "mail"
              ? "Email"
              : item?.name?.replaceAll("_", " ").replaceAll(".", "")}
          </MenuItem>
        ))}
      </Select>
    );
  };

  useEffect(() => {
    let array = [];
    const data =
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData"));
    leadsField?.length > 0 &&
      leadsField?.[0]?.["form_fields_data"]?.map((ele) => {
        array.push({
          id: ele?.mapping_id,
          lead_input_id: ele?.id,
          deal_input_id: ele?.deal_input_id,
          contact_input_id: ele?.contact_input_id,
          company_input_id: ele?.company_input_id,
          user_id: data?.id,
        });
      });
    setInputField(array);
  }, [activeButton]);

  const hasDuplicate = (arr, key) => {
    const countMap = {};
    for (const obj of arr) {
      const value = obj[key];
      if (value !== "") {
        countMap[value] = (countMap[value] || 0) + 1;
      }
    }
    return Object.values(countMap).some((count: any) => count > 1);
  };

  const saveFieldMapping = async () => {
    const dealInputIdCounts = hasDuplicate(inputField, "deal_input_id");
    const contactInputIdCounts = hasDuplicate(inputField, "contact_input_id");
    const companyInputIdCounts = hasDuplicate(inputField, "company_input_id");

    if (dealInputIdCounts || contactInputIdCounts || companyInputIdCounts) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: `Error in data saving?`,
        text: "Please check all fields carefull you can not update multiple fields into single column",
        icon: "warning",
        showCancelButton: false,
        // confirmButtonText: "Yes, clone it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        allowOutsideClick: false,
      });

      return;
    }

    setLoader(true);
    let response = await apiClient(
      `crm/lead-convert/lead-mapping-fields`,
      "post",
      {
        body: inputField,
      }
    );
    if (response.status == 200 || response.status == true) {
      await getAllFields();
      setActiveButton(false);
      setLoader(false);
      // setInputField([])
    }
  };

  return (
    <div className="full_page crm_pagelayout">
      <OuterContainer>
        <CommonHeader />
      </OuterContainer>
      <CrmInnerContent style={{ background: "none" }}>
        <Typography variant="body2">
          To make lead conversion simple, map the fields in the lead module to
          the fields in the account, contact, and deal modules. The information
          you have gathered will be instantly transferred to an account,
          contact, and deal when you convert a lead using the mapped fields.
        </Typography>
        <FieldMappingContainer>
          <MappingHedingTop>
            <Typography variant="h6" gutterBottom>
              Field Mapping
            </Typography>
            <Typography className="custom_txt">
              <sup className="supcolor">*</sup> Custom Field
            </Typography>
          </MappingHedingTop>

          <Divider />
          <FieldMappingInner>
            <MappingTableArea>
              {loader ? (
                <TableContainer>
                  <Table
                    sx={{
                      borderCollapse: "separate",
                      borderSpacing: "1px 15px",
                    }}
                  >
                    <TableHead>
                      <TableRow sx={{ outline: "1px solid #EAECEF" }}>
                        <TableCell
                          sx={{
                            padding: "10px 20px",
                            backgroundColor: "#FBFBFB",
                          }}
                        >
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={"60%"}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "10px 20px",
                            backgroundColor: "#FBFBFB",
                          }}
                        >
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={"40%"}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "10px 20px",
                            backgroundColor: "#FBFBFB",
                          }}
                        >
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={"40%"}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "10px 20px",
                            backgroundColor: "#FBFBFB",
                          }}
                        >
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={"40%"}
                          />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                        (ele, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              outline: "1px solid #EAECEF",
                              marginTop: "15px",
                            }}
                          >
                            <TableCell
                              sx={{
                                padding: "10px",
                                backgroundColor: "#FBFBFB",
                              }}
                            >
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={30}
                                width={"40%"}
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "10px",
                                backgroundColor: "#FBFBFB",
                              }}
                            >
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={34}
                                width={"70%"}
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "10px",
                                backgroundColor: "#FBFBFB",
                              }}
                            >
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={34}
                                width={"70%"}
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "10px",
                                backgroundColor: "#FBFBFB",
                              }}
                            >
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={34}
                                width={"70%"}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <TableContainer sx={TableStyle}>
                  <Box>
                    <Table
                      sx={{ width: "100%" }}
                      aria-label="customized table"
                      className="mappingtabel"
                    >
                      <TableHead>
                        <TableRow style={{ outline: "none" }}>
                          <StyledTableCell>
                            <FieldTitleText>
                              <i className="icon-leadsblack"></i>Lead
                            </FieldTitleText>
                          </StyledTableCell>
                          <StyledTableCell className="Companystyle">
                            <FieldTitleText>
                              <i className="icon-contact"></i>
                              Accounts
                            </FieldTitleText>
                          </StyledTableCell>
                          <StyledTableCell className="Contactstyle">
                            <FieldTitleText>
                              <i className="icon-account"></i>
                              Contact
                            </FieldTitleText>
                          </StyledTableCell>
                          <StyledTableCell>
                            <FieldTitleText>
                              <i className="icon-deal"></i>
                              Deal
                            </FieldTitleText>
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {leadsField?.length > 0 &&
                          leadsField?.map(
                            (fieldLoop, index) =>
                              fieldLoop?.form_fields_data.length > 0 &&
                              fieldLoop?.form_fields_data?.map(
                                (formFields, fieldIndex) => {
                                  if (formFields?.field_type != "tag") {
                                    return (
                                      <>
                                        <StyledTableRow key={fieldIndex}>
                                          <StyledTableCell
                                            component="th"
                                            scope="row"
                                          >
                                            {" "}
                                            <FieldCoulmnText>
                                              {formFields.is_delete == 1 && (
                                                <sup className="supcolor">
                                                  *{" "}
                                                </sup>
                                              )}
                                              {formFields.name == "mail"
                                                ? "Email"
                                                : formFields.name
                                                    .replaceAll("_", " ")
                                                    .replaceAll(".", "")}
                                            </FieldCoulmnText>
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            <MappingFormcontrol
                                              fullWidth
                                              size="small"
                                            >
                                              {renderDynamicMenuItems(
                                                "Company",
                                                formFields,
                                                fieldIndex
                                              )}
                                            </MappingFormcontrol>
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            <MappingFormcontrol
                                              fullWidth
                                              size="small"
                                            >
                                              {renderDynamicMenuItems(
                                                "Contacts",
                                                formFields,
                                                fieldIndex
                                              )}
                                            </MappingFormcontrol>
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            <MappingFormcontrol
                                              fullWidth
                                              size="small"
                                            >
                                              {renderDynamicMenuItems(
                                                "Deals",
                                                formFields,
                                                fieldIndex
                                              )}
                                            </MappingFormcontrol>
                                          </StyledTableCell>
                                        </StyledTableRow>
                                      </>
                                    );
                                  }
                                }
                              )
                          )}
                      </TableBody>
                    </Table>
                  </Box>
                </TableContainer>
              )}
            </MappingTableArea>
            <MappingActionArea>
              <MappingActionButon>
                <SmallRedOutineBtn
                  variant="outlined"
                  disabled={!activeButton ? true : false}
                  onClick={() => {
                    saveFieldMapping();
                  }}
                >
                  {loader ? (
                    <ThreeDots
                      height="18"
                      width="40"
                      radius="9"
                      color="white"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    "Save"
                  )}
                </SmallRedOutineBtn>
                <SmallBlackOutineBtn
                  variant="outlined"
                  onClick={() => {
                    router.push(`/crm/leads`);
                  }}
                >
                  Cancel
                </SmallBlackOutineBtn>
              </MappingActionButon>
            </MappingActionArea>
          </FieldMappingInner>
        </FieldMappingContainer>
      </CrmInnerContent>
    </div>
  );
};
export default FieldMapping;
