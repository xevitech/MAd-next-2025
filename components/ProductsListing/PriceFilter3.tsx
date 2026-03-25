import {
    Box,
    Button,
    ButtonBase,
    Collapse,
    Slider,
    Stack,
    Typography,
  } from "@mui/material";
  import * as React from "react";
  import { styled } from "@mui/material/styles";
  import IconButton, { IconButtonProps } from "@mui/material/IconButton";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import {
    resetToggleHandler,
  } from "@/hooks/UseProductListContext";
  import ProductModule from "./product.module.css";
  import { useSelector } from "react-redux";
  import { useRouter } from "next/router";
  import { useDispatch } from "react-redux";
  import { CategoryBox } from "./style";
  
  const Categorytitle = styled(Typography)(({ theme }) => ({
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "Open sans",
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
    color: "#FF8388",
    height: 5,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-rail": {
      backgroundColor: "#d4d4d4",
      opacity: 1,
      borderRadius: "0"
    },
    "& .MuiSlider-thumb": {
      backgroundColor: "#fff",
      width: "14px",
      height: "14px",
      border: "1px solid #d7282f"
    },
    "& .MuiSlider-valueLabel ": {
      lineHeight: 1.2,
      fontSize: 10,
      padding: 0,
      width: 35,
      height: 22,
      borderRadius: "3px",
      transformOrigin: "bottom left",
      color: "#D7282F",
      backgroundColor: "#FFECEC",
      border: "1px solid #D7282F",
      "&:before": {
        borderRight: "1px solid #D7282F",
        backgroundColor: "#FFECEC",
        borderBottom: "1px solid #D7282F"
      }
    },
    "& .MuiSlider-root": { padding: 0 }
  });
  
  const StyledInput = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 4,
    border: "1px solid rgba(210, 210, 210, 1)",
    fontSize: "14px",
    fontWeight: 600,
    color: "#231F20",
    padding: "1px 2px",
    maxWidth: "47%",
    minWidth: 60,
    height: "40px",
    fontFamily: "Open sans",
    "& input": {
      paddingLeft: "4px",
      border: "none",
      fontSize: "12px",
      fontFamily: "Open sans",
      width: "100%",
      fontWeight: 600,
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
    },
  }));
  const StyledButton = styled(ButtonBase)(({ theme }) => ({
    width: "100%",
    fontFamily: "Open sans",
    color: "#fff",
    background: "rgba(215, 40, 47, 0.85)",
    fontSize: "18px",
    fontWeight: 600,
    padding: "12px",
    borderRadius: 4,
    marginTop: "16px",
  }));
  
  function valuetext(value) {
    return `${value}°C`;
  }
  
  const PriceFilter3 = ({ 
    onPriceChange
}) => {
    const [expanded, setExpanded] = React.useState(false);
    const [sliderValue, setSliderValue] = React.useState([null, null]);
    const [maxPrice, setMaxPrice] = React.useState(50000);
    const [minPrice, setMinPrice] = React.useState(500);
    const [render, setRender] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const { filterCategory, resetToggle } = useSelector(
      (state: any) => state.productList
    );
  
    const dispatch = useDispatch();
  
    const handleChange = (event, newValue) => {
      setSliderValue(newValue);
      setMaxPrice(newValue[1]);
      setMinPrice(newValue[0]);
    
    };
    const router: any = useRouter();
    let values = router?.query?.price_range ? router?.query?.price_range.split(",") : [];
    const handleApply = () => {
      setSliderValue([minPrice, maxPrice]);
    //   addQueryParams([minPrice, maxPrice]);
      if (typeof onPriceChange === 'function') {
        onPriceChange(maxPrice,minPrice);
    } else {
        console.warn('onPriceChange is not a function');
    }
    };
  
    const addQueryParams = (id) => {
       
      if (id.length === 0) {
        delete router.query.price_range;
        router.push(router);
        return;
      }
      router.query.price_range = id.join(",");
      router.push(router);
    };
  
    React.useEffect(() => {
      if (minPrice > 0 || maxPrice > 0) setSliderValue([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);
  
    React.useEffect(() => {
      if (values.length > 0 && !render) {
        setMaxPrice(sliderValue[1]);
        setMinPrice(sliderValue[0]);
        setSliderValue(values);
        setRender(true);
      }
    }, [values]);
  
    React.useEffect(() => {
      if (resetToggle) {
        setMaxPrice(50000);
        setMinPrice(500);
        setSliderValue([10, 50]);
        // dispatch(resetToggleHandler(false));
      }
    }, [resetToggle]);
  
    return (
      <>
        {filterCategory?.price_range && (
          <Box>
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
                  Price Range
                </Categorytitle>
                <ExpandMore
                  expand={expanded}
                  aria-expanded={expanded}
                  style={{ padding: "4px" }}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Stack>
              <Collapse in={expanded}>
                <Box>
                  <Stack sx={{ padding: '0 12px 12px', gap: '7px', }}>
                    <Box
                      sx={{
                        padding: '30px 2px 0 12px',
  
                      }}
                    >
                      <PrettoSlider
                        valueLabelDisplay="on"
                        value={sliderValue}
                        onChange={handleChange}
                        getAriaValueText={valuetext}
                        disableSwap
                        min={0}
                        max={100000}
                      />
                    </Box>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <StyledInput style={{}}>
                        <input
                          id="outlined-basic"
                          placeholder="Min"
                          type="text"
                          value={minPrice}
                          onChange={(e: any) => {
                            const regex = /^[0-9\b]+$/;
                            if (
                              e.target.value === "" ||
                              regex.test(e.target.value)
                            ) {
                              setMinPrice(e.target.value);
                            }
                          }}
                        />
                      </StyledInput>
                      -
                      <StyledInput>
                        <input
                          id="outlined-basic"
                          placeholder="Max"
                          type="text"
                          value={maxPrice}
                          onChange={(e: any) => {
                            const regex = /^[0-9\b]+$/;
                            if (
                              e.target.value === "" ||
                              regex.test(e.target.value)
                            ) {
                              setMaxPrice(e.target.value);
                            }
                          }}
                        />
                      </StyledInput>
                    </Stack>
                    <Box
                      sx={{
                        '& .MuiButtonBase-root': {
                          width: '100%',
                        },
                      }}
                    >
                      <Button
                        variant="outlined"
                        className={ProductModule.brand_serach}
                        onClick={handleApply}
                      >
                        Apply
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </Collapse>
            </CategoryBox>
          </Box>
        )}
      </>
    );
  };
  
  export default PriceFilter3;