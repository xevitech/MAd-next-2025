import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ProductModule from "./product.module.css";
import { useSelector } from "react-redux";

// import { useDispatch, } from "react-redux";
import { RootState, store, useAppDispatch  } from "redux/store";

import { useRouter } from "next/router";
import { CategoryBox } from "./style";
import { fetchFilteredProducts, setBusinessFilters } from "@/hooks/reducers/manufactureProductsReducer";
import { bdsm } from "@/hooks/reducers/manufactureProductsReducer3";
import { debounce } from 'lodash';
import {MpFetch,MpFiltered} from "@/hooks/reducers/manufactureProductsReducer3"
const Categorymainheading = styled(Typography)(({ theme }) => ({}));
const Categorytitle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "16px",
  fontWeight: 600,
  fontFamily: "Open sans",
}));
const ListItemStyledText = styled(ListItemText)(({ theme }) => ({
  fontSize: "14px",
}));

const StyledList = styled(List)(({ theme }) => ({
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { background: "#EEEEEE" },
  "&::-webkit-scrollbar-thumb": { background: "#D9D9D9", borderRadius: "6px" },
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PrettoSlider = styled(Slider)({
  color: "#231F20",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "rgba(215, 40, 47, 0.85)",
    opacity: 1,
  },
  "& .MuiSlider-thumb": {
    backgroundColor: "#231F20",
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 40,
    height: 30,
    borderRadius: "3px",
    backgroundColor: "#231F20",
    transformOrigin: "bottom left",
  },
});

const StyledInput = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: 4,
  border: "2px solid rgba(34, 51, 84, 0.5)",
  fontSize: "14px",
  fontWeight: 700,
  color: "#231F20",
  padding: " 12px",
  maxWidth: 120,
  fontFamily: "Open sans",
  "& input": {
    paddingLeft: "8px",
    border: "none",
    fontSize: "14px",
    fontFamily: "Open sans",
    width: "100%",
    fontWeight: 700,
    color: "#231F20",
    "&:focus": {
      outline: "none",
    },
  },
  " &:after": {
    display: "none",
    outline: "none",
  },
  "&:before,": {
    content: '"$"',
  },
}));

const MylistItem = styled(ListItem)(() => ({
  "& .MuiButtonBase-root-MuiListItemButton-root": {
    padding: "0 12px",
  },
  "& .MuiFormControlLabel-root": {
    marginRight: "0",
  },
  "& .MuiSvgIcon-root": {
    display: "none",
  },
  ".MuiCheckbox-root": {
    padding: "7px",
    "&:before": {
      content: '" "',
      display: "block",
      width: "13px",
      height: "13px",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "3px",
      height: "8px",
      borderBottom: "1px solid #D7282F",
      borderRight: "1px solid #D7282F",
      position: "absolute",
      top: "9px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },

    },
  },
}));


type BusinessFilterProps = {
  onChange: (selectedFilters: string[]) => void;
  checkedValues: string[]; // Prop to hold current checked values
};

const BusinessFilter4: React.FC<BusinessFilterProps> = ({ onChange, checkedValues }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [checkedBusiness, setCheckedBusiness] = React.useState<string[]>(checkedValues);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const debouncedAddQueryParams = debounce((checkedCategoryArray) => {
    onChange(checkedCategoryArray); // Call onChange with the new checked values
  }, 300); // Adjust time as necessary

  const simplifiedBusinessTypeList = [
    { name: "Manufacturers", values: "Manufacturers" },
    { name: "Agents and Representatives", values: "Agents and Representatives" },
    { name: "Distributors", values: "Distributors" },
    { name: "Retailers", values: "Retailers" },
    { name: "Wholesalers", values: "Wholesalers" },
    { name: "Resellers", values: "Resellers" },
    { name: "Others", values: "Others" }
  ];

  React.useEffect(() => {
    setCheckedBusiness(checkedValues); // Update local state when checkedValues prop changes
  }, [checkedValues]);

  return (
    <>
      <Box className="productnavcheck">
      <CategoryBox>
        <Stack
          direction="row"
          onClick={handleExpandClick}
          alignItems="center"
          justifyContent="space-between"
          padding="2px 0px 2px 12px"
          borderRadius="8px 8px 0 0"
        >
          <Categorytitle variant="h6" style={{ fontSize: "14px" }}>
            Business Type
          </Categorytitle>
          <ExpandMore
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
            style={{ padding: "4px" }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>
        <Collapse in={expanded}>
          <Box p={{ xs: 1 }}>
          <StyledList
                   sx={{
                    width: "100%",
                    maxHeight: 200,
                    overflow: "auto",
                    bgcolor: "background.paper",
                    padding:'0',
                    '& .MuiFormControlLabel-root':{
                      margin:'0',
                    },
                  }}
                  >
              {simplifiedBusinessTypeList.map((element) => {
                const labelId = `checkbox-business-list-label-${element.values}`;

                return (
                  <MylistItem key={`business-${labelId}`} disablePadding>
                    <ListItemButton role={undefined} dense>
                      <FormControlLabel
                       key={`buisness1-${labelId}`}
                        control={<Checkbox />}
                        label={
                          <ListItemText
                            id={labelId}
                            primary={element.name}
                          />
                        }
                        checked={checkedBusiness.includes(element.values)}
                        name={element.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) {
                            setCheckedBusiness((prev) => {
                              const newChecked = [...prev, element.values];
                              debouncedAddQueryParams(newChecked);
                              return newChecked;
                            });
                          } else {
                            setCheckedBusiness((prev) => {
                              const newChecked = prev.filter((item) => item !== element.values);
                              debouncedAddQueryParams(newChecked);
                              return newChecked;
                            });
                          }
                        }}
                      />
                    </ListItemButton>
                  </MylistItem>
                );
              })}
            </StyledList>
          </Box>
        </Collapse>
        </CategoryBox></Box>
    </>
  );
};

export default BusinessFilter4;