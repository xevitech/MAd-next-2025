import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Collapse,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { CategoryBox, MainPageFilterBox } from "./style";
import ProductModule from "./product.module.css";
import { LightTooltip } from "../common/Tooltip/tooltip";

const Categorytitle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "16px",
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

const StyledList = styled(List)(({ theme }) => ({
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { background: "#EEEEEE" },
  "&::-webkit-scrollbar-thumb": { background: "#D9D9D9", borderRadius: "6px" },
  "& .MuiListItemButton-root": {
    paddingTop: "3px",
    paddingBottom: "3px",
  },
}));

const ListItemStyledText = styled(ListItemText)(({ theme }) => ({
  fontSize: "13px !important",
  color: "#231F20",
}));

const PriceFilter4 = ({ value, onAnnualPriceChange }) => {
  const [expanded, setExpanded] = React.useState(false);
  const options = [
    "Below USD 1 Million",
    "USD 1 Million - USD 2.5 Million",
    "USD 2.5 Million - USD 5 Million",
    "USD 5 Million - USD 10 Million",
    "USD 10 Million - USD 50 Million",
    "USD 50 Million - USD 100 Million",
    "Above USD 100 Million",
  ];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (option) => {
    // Deselect if the option is already selected, otherwise select it
    const newValue = value === option ? null : option;
    onAnnualPriceChange(newValue);
  };

  return (
    <MainPageFilterBox>
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
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>

        <Collapse in={expanded}>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <nav aria-label="main mailbox folders">
              <StyledList
                sx={{
                  maxHeight: 200,
                  overflow: "auto",
                }}
              >
                {options.length > 0 &&
                  options.map((option) => (
                    <ListItem
                      key={option}
                      disablePadding
                      onClick={() => handleChange(option)}
                    >
                      <LightTooltip
                        arrow
                        placement="top"
                        title={option}
                        disableInteractive
                        sx={{
                          "& .MuiTooltip-tooltip": {
                            textTransform: "capitalize",
                          },
                        }}
                      >
                        <ListItemButton>
                          <ListItemStyledText
                            primary={option}
                            style={{
                              color: value === option ? "#d7282f" : "",
                            }}
                          />
                        </ListItemButton>
                      </LightTooltip>
                    </ListItem>
                  ))}
              </StyledList>
            </nav>
          </Box>
        </Collapse>
      </CategoryBox>
    </MainPageFilterBox>
  );
};

export default PriceFilter4;
