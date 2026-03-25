import { Collapse, Stack } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ProductModule from "./product.module.css";
import { MainPageFilterBox, MemberFilterBox, MemberTitle } from "./style";
import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { useRouter } from "next/router";
const memberType = ["Verified Member", "Gold Member", "Silver"];
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

const MylistItem = styled(ListItem)(() => ({
  "& .css-178cqt3-MuiButtonBase-root-MuiListItemButton-root": {
    padding: "0 12px",
  },
  "& .css-j204z7-MuiFormControlLabel-root": {
    marginRight: "0",
  },
  "& .css-i4bv87-MuiSvgIcon-root": {},
  ".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root": {
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      top: "8px",
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

export default function PlanNameFilter() {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [filterMember, setFilterMember] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // ************************************
  const priceType = ["Verified Member", "Gold Member", "Silver"];
  const { priceTypeIds, setPriceTypeIds, filterCategory }: any = useSelector(
    (state: any) => state.productList
  );

  const router: any = useRouter();
  const filterValue: any = router?.query?.display_name
    ? router.query.display_name
    : [];

  const addQueryParams = (id) => {
    if (id.length === 0) {
      delete router.query.display_name;
      router.push(router);
      return;
    }
    setFilterMember(id);
    router.query.display_name = id;
    router.push(router);
  };

  return (
    <>
      {filterCategory?.plan_type && (
        <MainPageFilterBox>
          <MemberFilterBox mt={{ xs: 1 }}>
            <Stack
              direction="row"
              onClick={handleExpandClick}
              alignItems="center"
              justifyContent="space-between"
              padding="2px 0px 2px 12px"
              borderRadius="8px 8px 0 0"
            >
              <MemberTitle variant="h6" className={ProductModule.filter_head}>
                Plan Type
              </MemberTitle>
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
              <nav aria-label="main mailbox folders">
                <List
                  sx={{
                    width: "100%",
                    maxHeight: 360,
                    overflow: "auto",
                    paddingTop: "0",
                    bgcolor: "background.paper",
                    "& .MuiListItem-root": {
                      "& .MuiListItemButton-root": {
                        padding: "2px 12px",
                      },
                    },
                  }}
                >
                  <ListItem
                    className={
                      filterValue == "Enterprise" && "selected-filter-main-page"
                    }
                    disablePadding
                    onClick={(e) => addQueryParams("Enterprise")}
                  >
                    <ListItemButton>
                      <ListItemIcon className={ProductModule.listimg}>
                        <Image
                          height={15}
                          width={15}
                          src={"/assets/productlisting/verifymembr.svg"}
                          alt={"Icon"}
                          loading="lazy"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Enterprise"
                        style={{
                          color: filterValue == "Enterprise" ? "#D7282F" : "",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    className={
                      filterValue == "gold" && "selected-filter-main-page"
                    }
                    disablePadding
                    onClick={(e) => addQueryParams("gold")}
                  >
                    <ListItemButton>
                      <ListItemIcon className={ProductModule.listimg}>
                        <Image
                          height={15}
                          width={15}
                          src={"/assets/productlisting/goldmember.svg"}
                          alt={"Icon"}
                          loading="lazy"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Gold"
                        style={{
                          color: filterValue == "gold" ? "#D7282F" : "",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    className={
                      filterValue == "Silver" && "selected-filter-main-page"
                    }
                    disablePadding
                    onClick={(e) => addQueryParams("Silver")}
                  >
                    <ListItemButton>
                      <ListItemIcon className={ProductModule.listimg}>
                        <Image
                          height={15}
                          width={15}
                          src={"/assets/productlisting/silvermember.svg"}
                          alt={"Icon"}
                          loading="lazy"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Silver"
                        style={{
                          color: filterValue == "Silver" ? "#D7282F" : "",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Collapse>
          </MemberFilterBox>
        </MainPageFilterBox>
      )}
    </>
  );
}
