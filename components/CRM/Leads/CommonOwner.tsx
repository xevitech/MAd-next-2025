import * as React from "react";
import {
  CustomFormFieldContainer,
  FormControlstyle,
  FormFieldContainer,
  TaskAvatarContainer,
  TaskAvatarLabel,
} from "../style";
import {
  Avatar,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";
import { toast } from "react-toastify";
import { CommonFormcontrol } from "../commonStyle";

const CommonOwner = (props) => {
  const options = props?.userLists;
  const defaultOwner = props?.defaultOwner;
  const setValues = props?.updateValue;
  const label = props?.label;
  const disabled = props?.disabled;
  const error = props?.error;
  const [owner, setOwner] = React.useState({ name: "" });
  React.useEffect(() => {
    if (defaultOwner?.name !== undefined) {
      setOwner({ name: defaultOwner.name });
    }
  }, [defaultOwner]);

  const renderOption = (props, option) => {
    return (
      <ListItemButton {...props}>
        <TaskAvatarContainer>
          <TaskAvatarLabel>
            <Avatar alt="Image" src={option.file_name} />
            <div>
              <Typography variant="body2" className="TaskUsername">
                {" "}
                {option.name}
              </Typography>
              <Typography
                variant="body2"
                className="TaskUseremail"
                title={option.email}
              >
                <Link underline="hover">{option.email}</Link>
              </Typography>
            </div>
          </TaskAvatarLabel>
        </TaskAvatarContainer>
      </ListItemButton>
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
        <CustomFormFieldContainer
          fullWidth
          size="small"
          className={
            label == "Lead Owner" ||
              label == "Contact Owner" ||
              label == "Account Owner" ||
              label == "Deal Owner"
              ? "Createleadautocomplete"
              : "CreateTask"
          }
        >
          <Autocomplete
            componentsProps={{
              paper: {
                sx: {
                  width: 270,
                },
              },
            }}
            id="free-solo-demo"
            freeSolo
            size="small"
            disabled={disabled ? true
              : false
            }
            style={disabled ? { background: "#f5f3f3" }
              : null
            }
            defaultValue={owner ? owner : {}}
            value={owner ? owner : {}}
            onChange={(event, newValue) => {
              props?.updateValue(newValue);
            }}
            options={options}
            getOptionLabel={(option) => option.name}
            ListboxProps={{
              className: "myCustomList",
            }}
            renderOption={renderOption}
            renderInput={(params) => (
              <>
                {label == "Lead Owner" ||
                  label == "Contact Owner" ||
                  label == "Account Owner" ||
                  label == "Deal Owner" ? (
                  <></>
                ) : (
                  <>
                    <Image
                      src="/assets/images/crm/form1.svg"
                      alt="Image"
                      width={16}
                      height={16}
                    />
                    <InputLabel htmlFor="input-with-icon-adornment">
                      {label}
                    </InputLabel>
                  </>
                )}

                <TextField size=""
                  {...params}
                  variant="outlined"
                  error={error}
                  label={
                    label == "Lead Owner" ||
                      label == "Contact Owner" ||
                      label == "Account Owner" ||
                      label == "Deal Owner"
                      ? label
                      : ""
                  }
                  InputProps={{
                    ...params.InputProps,
                    autoComplete: "off",
                    startAdornment: (
                      <>
                        {props?.startIcon &&
                          <InputAdornment position="end">
                            <div className="enadormentcolor"><i className="icon-owner"></i></div>
                          </InputAdornment>
                        }
                      </>
                    ),
                  }}
                  helperText={props?.errorText ? props?.errorText : props?.helperText ? props?.helperText : null}
                />
              </>
            )}
          />
        </CustomFormFieldContainer>
      </Grid>
    </Grid>
  );
};
export default CommonOwner;
