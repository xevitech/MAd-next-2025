import React, { useEffect, useState } from "react";
import SummaryAccordian from "./SummaryAccordian";
import {
  ChangePlanBtn,
  SearchInput,
  SubSearchCol,
  SubscriptionHead,
} from "@/components/Subscription/styles";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { apiClient } from "@/components/common/common";
import Image from "next/image";
import {
  LargeTextContainer,
  SmallTextContainer,
} from "@/components/common/NoDataFound/style";
import SummarySkeleton from "./summarySkeleton";
import { useSelector } from "react-redux";

const Summary = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [planName, setPlanName] = useState<string>("");
  const [emptyData, setEmptyData] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [planList, setPlanList] = useState<any>([]);
  const [clonePlanList, setClonePlanList] = useState<any>([]);
  const { role } = useSelector((state: any) => state.userData);
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  const filterPlanList = (value) => {
    setPlanName(value);
    if (value === "") {
      setPlanList(clonePlanList);
      setEmptyData(false);
      return;
    }
    let results = clonePlanList.filter((val) => {
      return val.name.toLowerCase().includes(value.toLowerCase());
    });
    if (results.length === 0) setEmptyData(true);
    if (results.length > 0) setEmptyData(false);
    setPlanList(results);
  };

  useEffect(() => {
    setLoader(true);
    FetchPlanDetail();
  }, []);

  const FetchPlanDetail = async () => {
    let response = await apiClient("users/current_plan", "get");
    if (response.status === 200) {
      setLoader(false);
      setPlanList([response.data]);
      setClonePlanList([response.data]);
    } else {
      setLoader(false);
    }
  };

  return (
    <>
      <SubscriptionHead>
        <Typography variant="h6" component="h6">
          Your Subscriptions
        </Typography>
      </SubscriptionHead>
      <SubSearchCol>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={9} lg={9} xl={10}>
            <SearchInput>
              <TextField
                id="input-with-icon-textfield"
                value={planName}
                placeholder="Plan name search here..."
                onChange={(e) => filterPlanList(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "100%" }}
                variant="outlined"
                size="small"
              />
            </SearchInput>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
            <ChangePlanBtn>
              {(role === "seller" ||
                (role === "subuser" && permissions?.plans?.view == true)) && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<img src="assets/changePlan.svg" />}
                >
                  Change Plan
                </Button>
              )}
            </ChangePlanBtn>
          </Grid>
        </Grid>
      </SubSearchCol>
      {!loader &&
        planList.length > 0 &&
        planList.map((plan, index) => {
          return (
            <SummaryAccordian
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              index={index}
              detail={plan}
              setFetchPlanDetail={FetchPlanDetail}
            />
          );
        })}
      {!loader && planList.length == 0 && (
        <Box p={16}>
          <Stack height="100%" alignItems="center" justifyContent="center">
            <div style={{ textAlign: "center" }}>
              <Image
                height={80}
                width={80}
                alt="no data found"
                src={"/assets/NoResult.svg"}
              />
              <LargeTextContainer>No Plan Purchased </LargeTextContainer>
              <SmallTextContainer>
                You havn&apos;t purchased any plan so far <br />
              </SmallTextContainer>
            </div>
          </Stack>
        </Box>
      )}
      {loader && <SummarySkeleton />}
    </>
  );
};

export default Summary;
