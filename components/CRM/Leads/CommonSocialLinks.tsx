import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  SocialMediaList,
  apiClient,
  getUniqueListBy,
} from "@/components/common/common";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { TimeZone_List } from "@/components/profile/personalProfile/location/List";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  AddLinksRow,
  AddSocialAccountBox,
  CrmSocialAddLinks,
  CrmSocialLinks,
  SIconBox,
  SIconContainer,
  SIconRight,
  SIconValue,
} from "../commonStyle";
import { CustomFormFieldContainer, LeadInfoHeading, SocialHeading } from "../style";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const CommonSocialLinks = (props) => {
  const { typeName } = useSelector((state: any) => state.formList);
  const data = [
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Twitter",
    "Skype",
    "WhatsApp",
    "WeChat",
  ];
  const [formFields, setFormFields] = useState <any> ([{ platform: "", value: "" }]);
  const [allLinks, setAllLinks] = useState([]);
  const [error, setError] = useState("");
  const [platformError, setPlatformError] = useState("");
  const handlePlatformChange = (platform) => {
    setError("");
    setPlatformError("");
    const updatedFields = [...formFields];
    updatedFields[0].platform = platform;
    setFormFields(updatedFields);
  };

  const handleValueChange = (value) => {
    setError("");
    setPlatformError("");
    const updatedFields = [...formFields];
    updatedFields[0].value = value;
    setFormFields(updatedFields);
  };

  const validateURL = (platform, url) => {
    let regex;

    switch (platform.toLowerCase()) {
      case "instagram":
        // Instagram URL pattern: https://www.instagram.com/{username}/
        regex = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/;
        break;
      case "linkedin":
        // LinkedIn URL pattern: https://www.linkedin.com/in/{username}/
        regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9._-]+\/?$/;
        break;
      case "twitter":
        // Twitter URL pattern: https://twitter.com/{username}
        regex = /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/;
        break;
      case "facebook":
      case "fb":
        // Facebook URL pattern: https://www.facebook.com/{username}
        regex =
          /^(?:(?:http|https):\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
        break;
      default:
        return false;
    }

    return regex.test(url);
  };
  const handleAddField = () => {
    if (
      formFields?.[0]?.platform == "Facebook" ||
      formFields?.[0]?.platform == "Instagram" ||
      formFields?.[0]?.platform == "LinkedIn" ||
      formFields?.[0]?.platform == "Twitter"
    ) {
      if (
        formFields?.[0]?.value != "" && formFields?.[0]?.platform != null &&
        validateURL(formFields?.[0]?.platform, formFields?.[0]?.value)
      ) {
        setError("");
        setPlatformError("");
      } else {
        if(formFields?.[0]?.platform == ''){
          setPlatformError("Please select social account");
        }else if(formFields?.[0]?.value == ''){
          setError("Please enter valid address");
        }else{
          setError("Please enter valid address");
        }
        return;
      }
    } else {
      if (formFields?.[0]?.value != "" && formFields?.[0]?.platform != '') {
        setError("");
        setPlatformError("");
      } else {
        if(formFields?.[0]?.platform == ''){
          setPlatformError("Please select social account");
        }else if(formFields?.[0]?.value == ''){
          setError("Please enter valid details");
        }else{
          setError("Please enter valid details");
        }
        return;
      }
    }
    if (formFields?.[0]?.value != "") {
      setAllLinks((prevLinks) => [...prevLinks, ...formFields]);
      setFormFields([{ platform: "", value: "" }]);
      props?.updateValue(JSON.stringify([...allLinks, ...formFields]));
    }
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  return (
    <AddSocialAccountBox>
      <SocialHeading>Add {props?.label}s</SocialHeading>
      <CrmSocialLinks>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <CustomFormFieldContainer fullWidth>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                IconComponent={KeyboardArrowDownOutlinedIcon}
                value={formFields?.[0]?.platform}
                onChange={(e) => handlePlatformChange(e.target.value)}
                error={platformError ? true : false}
              >
                {data.map((platform, index) => {
                  const matchingItem = allLinks?.find(
                    (item) => item.platform === platform
                  );
                  if (!matchingItem) {
                    return (
                      <MenuItem value={platform} key={index}>
                        {platform}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
              {platformError ? (
                <FormHelperText>{platformError}</FormHelperText>
              ) : null}
            </CustomFormFieldContainer>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CustomFormFieldContainer fullWidth>
              <TextField
                fullWidth
                size="small"
                value={formFields?.[0]?.value}
                onChange={(e) => handleValueChange(e.target.value)}
                error={error ? true : false}
                helperText={error ? error : ""}
              />
            </CustomFormFieldContainer>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Button
              variant="text"
              onClick={handleAddField}
              className="addmoretext"
            >
              + Add
            </Button>
          </Grid>
        </Grid>
      </CrmSocialLinks>
      <CrmSocialAddLinks>
        <Grid container spacing={1}>
          {allLinks?.length > 0 &&
            allLinks?.map((links, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <AddLinksRow>
                  <Grid container spacing={1}>
                    <Grid item xs={11} sm={11} md={11}>
                      <SIconContainer>
                        <SIconBox>
                          {
                            SocialMediaList.find(
                              (v) =>
                                v.name.toLowerCase() ===
                                links?.platform.toLowerCase()
                            )?.logo
                          }
                        </SIconBox>
                        <SIconValue>
                          <Typography className="boldtextname">
                            {links?.platform}
                          </Typography>
                          <Typography
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              window.open(links?.value, "_blank", "noreferrer");
                            }}
                          >
                            {links?.value}
                          </Typography>
                        </SIconValue>
                      </SIconContainer>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1}>
                      <SIconRight className="hoverlinkj">
                        <Tooltip title="Delete" arrow>
                          <IconButton aria-label="delete">
                            <DeleteOutlineOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </SIconRight>
                    </Grid>
                  </Grid>
                </AddLinksRow>
                <Divider />
              </Grid>
            ))}
        </Grid>
      </CrmSocialAddLinks>
    </AddSocialAccountBox>
  );
};

export default CommonSocialLinks;
