import React, { useEffect, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { apiClient, getUniqueListBy } from "@/components/common/common";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, InputAdornment, Paper, Typography } from "@mui/material";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import List from "@mui/material/List";
import _debounce from "lodash/debounce";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { PinkSmallBtn } from "../commonStyle";
import { NewAccountAdd } from "../style";
const CommonAccounts = (props) => {
  const { typeName } = useSelector((state: any) => state.formList);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(`crm/account_name_list`);

  const fetchData = async () => {
    setLoading(true);
    let response = await apiClient(url, "get");
    const newData = await response?.data?.data;
    setLoading(false);
    newData?.length > 0 &&
      setItems((prevItems) =>
        getUniqueListBy([...prevItems, ...newData], "unique_id")
      );
    if (response?.data?.next_page_url?.includes("crm")) {
      let nextUrl = response?.data?.next_page_url;
      let index = nextUrl.indexOf("crm");
      setUrl(nextUrl.substring(index) && nextUrl.substring(index));
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  const handleSearchAccount=async(value)=>{
   let response= await apiClient( `crm/account_name_list?search=${value}`,"get");
   if(response?.status==200||response?.status==true){
    setItems(response?.data?.data);
   }
  }

  const fetchList = React.useRef(
    _debounce(async (value) => {
      if (value) {
        handleSearchAccount(value);
      }
    }, 200)
  ).current;

  useEffect(() => {
    fetchData();
    setInputValue(props?.defaultValue)
  }, []);

  // const handleScroll = async (event) => {
  //   const listboxNode = event.currentTarget;
  //   const position = listboxNode.scrollTop + listboxNode.clientHeight;
  //   if (listboxNode.scrollHeight - position <= 1 && hasMore && !loading) {
  //     await fetchData();
  //   }
  // };

  const handleAddAccount=async()=>{
   let response = await apiClient(
  `crm/account_name_list?account_name=${inputValue}`,
  "get"
);
if(response?.status==200||response?.status==true){
  setItems(response?.data?.data)
}
  }

  return (
    <Autocomplete
      id="asynchronous-demo"
      size="small"
      popupIcon={<KeyboardArrowDownOutlinedIcon />}
      // isOptionEqualToValue={(option, value) => option.title === value. title}
      getOptionLabel={(option) => option.value}
      options={typeName !== 'Leads'?items:[]}
      inputValue={inputValue}
      loading={loading}
      freeSolo={typeName == 'Leads' ? true : false}
      defaultValue={props?.defaultValue ? { value: props?.defaultValue } : null}
      // value={props?.defaultValue ? {value: props?.defaultValue} : null}
      // ListboxProps={{
      //   onScroll: handleScroll,
      //   style: {
      //     maxHeight: "100px",
      //   },
      // }}
      onChange={(e: any, newValue) => {
        props?.updateValue(newValue);
      }}
      onInputChange={(e: any, newValue)=>{ 
        if(e?.target?.value!==""&&typeName !== 'Leads'){
          fetchList(e?.target?.value)
        }
         setInputValue(newValue); props?.updateValue(newValue)
       } }
      renderOption={(props, option) => (
        <>
          <Box component="li" {...props}>
            {option.value}
          </Box>
        </>
      )}
      // noOptionsText={
      //   <>
      //     <Box component="div" {...props} onClick={handleAddAccount}>
      //       <PinkSmallBtn variant="text">+ Add 'google' as new account</PinkSmallBtn>
      //     </Box>
      //   </>
      // }
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(e) => {
            setInputValue(e.target.value)
            props?.updateValue({ value: e.target.value });
          }}
          label={  props?.startIcon && props?.label}
          helperText={props?.helperText ? props?.helperText : null}
          InputProps={{
            ...params.InputProps,
            autoComplete: "off",
            startAdornment: (
              <>
              {
                props?.startIcon && <InputAdornment position="end">
                  <div className="enadormentcolor"><i className="icon-accountType"></i></div>
                </InputAdornment>
              }
              </>
            ),
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
               {(typeName !== 'Leads' && inputValue!=="") && !items?.some(ele => ele?.value == inputValue) && props?.startIcon &&<NewAccountAdd><Typography>New</Typography></NewAccountAdd>}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),

          }}

        />
      )}
      PaperComponent={({ children }) => {
        return (<>
          
          <Paper>
              {children}
               <Box component="div" {...props} onMouseDown={() => {
                 handleAddAccount();
                }}>    
               {(typeName=="Contacts"||typeName=="Deals")&&<PinkSmallBtn variant="text">+ Add {inputValue} as new account</PinkSmallBtn>}
          </Box>
          </Paper>
          
          </>
        );
      }}
    />
  );
};

export default CommonAccounts;
