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
import { debounce } from 'lodash';

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

// **********************************************

const businessFilter2 = ({}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [checkedBusiness, setCheckedBusiness] = React.useState<any>([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const dispatch = useAppDispatch();

  const debouncedAddQueryParams = debounce((checkedCategoryArray) => {
    // console.log("Adding Query Params for:", checkedCategoryArray); // Log here to verify the array
    addQueryParams(checkedCategoryArray);
}, 3000); // Adjust time as necessary

  // ************************************
  const [filterValue, setFilterValue] = React.useState([]);

  const { filtersData, filterCategory } = useSelector(
    (state: any) => state.productList
  );

  const router: any = useRouter();
  // const filterValue: any = router?.query?.business
  //   ? router.query.business.split(",")
  //   : [];

  const addQueryParams = (id) => {
    // Log the incoming id array
    // console.log("Incoming ID array:", id);

    if (id.length === 0) {
        setCheckedBusiness([]);
        delete router.query.business_type;
        // dispatch(setBusinessFilters([]));
        router.push(router);
      
        dispatch(fetchFilteredProducts(id));
        return;
    }

    // Log the updated checked business state
    setCheckedBusiness(id);
    console.log("Updated Checked Business:", id);

    router.query.business_type = id.join(",");
    // dispatch(setBusinessFilters(id));
    // console.log("Router Query Business:", router.query.business); // Log the router query
    router.push(router);
    dispatch(fetchFilteredProducts({ id }));};




    React.useEffect(() => {
      const filterValue = router.query.business_type ? router.query.business_type.split(",") : []; // Get current businesses from router
      if (Array.isArray(filterValue)) {
        setCheckedBusiness(filterValue); // Set checked businesses from router query
      }
    }, [router.query.business_type]); // Run when query parameters change
  

  let BusinessType = {
    trading_company: "Trading Company",
    manufacturer: "Manufacturer",
    broker: "Broker",
    epc_contractor: "EPC Contractor",
    governmental_entity: "Governmental Entity",
    other: "Other",
    consultant: "Consultant",
  };

  const GridOneOptions = [
    {
      name: "Manufacturers",
      toggle: false,
      options: [
        { name: "Sell directly to businesses", checked: false },
        {
          name: "OEMs: Produce components for other businesses' products",
          checked: false,
        },
      ],
      isChecked: true,
    },

    {
      name: "Distributors",
      isChecked: false,
      toggle: false,
      options: [
        {
          name: "Provide access to a wide range of products",
          checked: false,
        },
        {
          name: "Exclusive Distributors: Sole rights in specific regions",
          checked: false,
        },
        {
          name: "Value-Added Distributors: Offer additional services",
          checked: false,
        },
      ],
    },
    {
      isChecked: false,
      name: "Retailers",
      toggle: false,
      options: [
        {
          name: "Wholesale Retailers: Sell in large quantities at discounted rates",
          checked: false,
        },
        {
          name: "E-commerce Retailers: Sell online, offering 24/7 access",
          checked: false,
        },
      ],
    },
  ];

  const GridTwoOptions = [
    {
      isChecked: false,
      name: "Wholesalers",
      toggle: false,
      options: [
        {
          name: "Sell products in bulk at competitive prices",
          checked: false,
        },
        {
          name: "General Wholesalers: Wide variety of products",
          checked: false,
        },
        {
          name: "Specialty Wholesalers: Deep expertise in specific categories",
          checked: false,
        },
      ],
    },
    {
      isChecked: false,
      name: "Resellers",
      toggle: false,
      options: [
        {
          name: "Resellers: Purchase and resell without adding value",
          checked: false,
        },
        {
          name: "Value-Added Resellers (VARs) Enhance products before reselling",
          checked: false,
        },
      ],
    },
    {
      isChecked: false,
      name: "Others",
      toggle: false,
      options: [
        {
          name: "System Integrators: Design and integrate complex systems",
          checked: false,
        },
        {
          name: "Service Providers: Offer consulting, maintenance, and support services",
          checked: false,
        },
        {
          name: "Design and Engineering",
          checked: false,
        },
      ],
    },
  ];

  let BusinessTypeList = [
    {
      name: "Manufacturers",
      toggle: false,
      options: [
        { name: "Sell directly to businesses", checked: false },
        {
          name: "OEMs: Produce components for other businesses' products",
          checked: false,
        },
      ],
      isChecked: true,
    },
    {
      name: "Agents and Representatives",
      isChecked: false,
      toggle: false,
      options: [
        {
          name: "Manufacturers representatives or businesses in specific regions",
          checked: false,
        },
        {
          name: "Manufacturers' Agents: Sell specific brands or products",
          checked: false,
        },
        {
          name: "Selling Agents: Represent multiple businesses",
          checked: false,
        },
        {
          name: "Brokers: Facilitate transactions between buyers and sellers",
          checked: false,
        },
        {
          name: "Sell products directly to businesses",
          checked: false,
        },
      ],
    },
    {
      name: "Distributors",
      isChecked: false,
      toggle: false,
      options: [
        {
          name: "Provide access to a wide range of products",
          checked: false,
        },
        {
          name: "Exclusive Distributors: Sole rights in specific regions",
          checked: false,
        },
        {
          name: "Value-Added Distributors: Offer additional services",
          checked: false,
        },
      ],
    },
    {
      isChecked: false,
      name: "Retailers",
      toggle: false,
      options: [
        {
          name: "Wholesale Retailers: Sell in large quantities at discounted rates",
          checked: false,
        },
        {
          name: "E-commerce Retailers: Sell online, offering 24/7 access",
          checked: false,
        },
      ],
    },
    {
      isChecked: false,
      name: "Wholesalers",
      toggle: false,
      options: [
        {
          name: "Sell products in bulk at competitive prices",
          checked: false,
        },
        {
          name: "General Wholesalers: Wide variety of products",
          checked: false,
        },
        {
          name: "Specialty Wholesalers: Deep expertise in specific categories",
          checked: false,
        },
      ],
    },
    {
      isChecked: false,
      name: "Resellers",
      toggle: false,
      options: [
        {
          name: "Resellers: Purchase and resell without adding value",
          checked: false,
        },
        {
          name: "Value-Added Resellers (VARs) Enhance products before reselling",
          checked: false,
        },
      ],
    },
    {
      isChecked: false,
      name: "Others",
      toggle: false,
      options: [
        {
          name: "System Integrators: Design and integrate complex systems",
          checked: false,
        },
        {
          name: "Service Providers: Offer consulting, maintenance, and support services",
          checked: false,
        },
        {
          name: "Design and Engineering",
          checked: false,
        },
      ],
    },
  ];

  let BusinessList = [...BusinessTypeList]?.map((v) => ({
    name: v.name,
    id: v.name,
  }));

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
              <Categorytitle variant="h6" className={ProductModule.filter_head}>
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
                  {BusinessList?.map((element, i) => {
                    const labelId = `checkbox-buis-list-label-${element.id}`;

                    return (
                      <MylistItem key={`buisness-${labelId}`} disablePadding>
                        <ListItemButton role={undefined} dense>
                          {/* <FormControlLabel
                            key={`buisness1-${labelId}`}
                            control={<Checkbox />}
                            label={
                              <ListItemText
                                id={labelId}
                                primary={element.name}
                              />
                            }
                            checked={checkedBusiness.includes(element.id)}
                            name={element.name}
                            onChange={(e: any) => {
                              if (e.target.checked) {
                                addQueryParams([...filterValue, element.id]);
                              } else {
                                let filter = filterValue.filter(
                                  (item) => item !== element.id
                                );
                                addQueryParams(filter);
                              }
                            }}
                          /> */}
                          <FormControlLabel
    key={`buisness1-${labelId}`}
    control={<Checkbox />}
    label={
        <ListItemText
            id={labelId}
            primary={element.name}
        />
    }
    checked={checkedBusiness.includes(element.id)}
    name={element.name}
    onChange={(e: any) => {
        if (e.target.checked) {
            // Add the new ID to checkedBusiness
            setCheckedBusiness((prev) => {
                const newChecked = [...prev, element.id];
                debouncedAddQueryParams(newChecked);
                // addQueryParams(newChecked); // Call addQueryParams with the new state
                return newChecked; // Return the new state
            });
        } else {
            // Remove the ID from checkedBusiness
            setCheckedBusiness((prev) => {
                const newChecked = prev.filter((item) => item !== element.id);
                debouncedAddQueryParams(newChecked);
                // addQueryParams(newChecked); // Call addQueryParams with the new state
                return newChecked; // Return the new state
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
          </CategoryBox>
        </Box>
      
    </>
  );
};

export default businessFilter2;
