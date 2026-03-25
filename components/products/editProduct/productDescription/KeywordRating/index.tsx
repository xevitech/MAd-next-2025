import React, { useEffect, useState } from "react";
import {
  KeywordRatingSection,
  KRatingButton,
  ManualKeywordChip,
} from "./style";
import { Box, Checkbox, CircularProgress, TextField } from "@mui/material";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { BASE_URL } from "@/utils/staticValues";
import { getProductId } from "@/components/common/common";
import Auth from "@/auth/Auth";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { Autocomplete, Grid, ListItem, ListItemText } from "@mui/material";
import {
  AttributeCheckChipBox,
  AttributeRedCheck,
  ProductAppUseTitle,
  ProductDesApplicationAndUseCases,
  ProductSelctionDropdown,
  AttributeTooltipBox,
} from "../styles";

function KeywordRating(props) {
  const {
    category_lists,
    // selectedKeywords,
    // setSelectedKeywords,
    // suggestedKeywords,
    // setSuggestedKeywords = null,
    // fetchKeywords,
    formik,
  } = props;
  const [inputValue, setInputValue] = useState("");
  const product_id = getProductId();
  const { brandsData } = useSelector((state: any) => state?.editProduct);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<any>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<any>([]);

  const getUniqueByName = (data) => {
    const map = new Map();
    return data.filter((item) => {
      if (!map.has(item.name)) {
        map.set(item.name, true);
        return true;
      }
      return false;
    });
  };

  const fetchKeywords = async () => {
    if (category_lists?.lenght == 0) {
      return;
    }
    let category_id = category_lists?.map((ele) => ele?.id);
    if (category_id?.length == 0) {
      return;
    }
    const response = await fetch(
      `${BASE_URL}/keywords/keyword-list?product_id=${product_id}&category_id=${category_id?.join(
        ","
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        // body:JSON.stringify({product_id: product_id}),
      }
    );
    if (response?.ok) {
      const responseData = await response.json();
      // setSuggestedKeywords(responseData?.data?.suggested_keywords);
      const suggestedKeywords = getUniqueByName(
        responseData?.data?.suggested_keywords
      );
      setSuggestedKeywords(suggestedKeywords);
      setSelectedKeywords(responseData?.data?.product_keywords);
      localStorage.setItem("product_keyword", JSON.stringify(responseData?.data?.product_keywords))
      formik.setFieldValue(
        "selectedKeywords",
        responseData?.data?.product_keywords
      );
      formik?.setFieldError("selectedKeywords", "");
    }
  };

  useEffect(() => {
    fetchKeywords();
  }, [JSON.stringify(category_lists)]);

  const addNewKeyword = async (
    keywordName,
    rating = 0,
    isSuggested = false,
    keyword: any = {}
  ) => {
    let category_id = category_lists?.map((ele) => ele?.id);
    setIsDisabled(false);
    if (isSuggested) {
      try {
        setIsDisabled(true);
        const response = await fetch(`${BASE_URL}/keywords/add-keywords`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: JSON.stringify({
            product_id: product_id,
            name: keywordName,
            rating: rating,
            is_suggested: isSuggested ? 1 : 0,
            master_id: keyword?.master_keyword_id,
            category_id: category_id[category_id?.length - 1],
          }),
        });
        const responsedata = await response.json();
        if (response.ok) {
          setInputValue("");
          setIsDisabled(false);
          await fetchKeywords();
          return;
        } else {
          setIsDisabled(false);
          setInputValue("");
          toast.error(responsedata?.message[0]);
          return;
        }
      } catch (error) {
        //handle error
        return;
      }
    }
    if (keywordName == "") {
      return;
    }

    if (formik.values?.name.toLowerCase() === keywordName.toLowerCase()) {
      toast.error("keyword name should not be same as Product Title.");
      setInputValue("");
      return;
    }

    const isCategoryNameSame = category_lists?.some(
      (category: any) =>
        category?.name.toLowerCase() === keywordName.toLowerCase()
    );

    if (isCategoryNameSame) {
      toast.error("Keyword name should not be the same as Category name.");
      setInputValue("");
      return;
    }

    const isBrandNameSame = brandsData?.some(
      (brand: any) => brand?.view.toLowerCase() === keywordName.toLowerCase()
    );

    if (isBrandNameSame) {
      toast.error("Keyword name should not be the same as brand name.");
      setInputValue("");
      return;
    }

    try {
      setIsDisabled(true);
      const response = await fetch(`${BASE_URL}/keywords/add-keywords`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: JSON.stringify({
          product_id: product_id,
          name: keywordName,
          rating: rating,
          is_suggested: 0,
          category_id: category_id[category_id?.length - 1],
        }),
      });
      const responsedata = await response.json();
      if (response.ok) {
        setInputValue("");
        setIsDisabled(false);
        await fetchKeywords();
        return;
      } else {
        setIsDisabled(false);
        setInputValue("");
        toast.error(responsedata?.message[0]);
        return;
      }
    } catch (error) {
      setIsDisabled(false);
      //handle error
    }
  };

  const handleDelete = async (keyword) => {
    try {
      setIsDisabled(true);
      const { master_keyword_id, score } = keyword;
      const response = await fetch(`${BASE_URL}/keywords/delete-keyword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: JSON.stringify({
          product_id: product_id,
          master_keyword_id,
          rating: score,
        }),
      });
      if (response.ok) {
        setIsDisabled(false);
        await fetchKeywords();
      }
    } catch (error) {
      setIsDisabled(false);
      //handle error here;
    }
  };

  const handleAddKeyword = (keyword, isSuggested = false) => {
    if (!selectedKeywords.some((item) => item?.id === keyword?.id)) {
      addNewKeyword(keyword?.name, keyword.score, isSuggested, keyword);
    }
  };
  const handleKeyDown = (event, isSuggested = false) => {
    formik?.setFieldError("selectedKeywords", "");
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (
        selectedKeywords.some(
          (item) =>
            item?.name.toLocaleLowerCase() === inputValue.toLocaleLowerCase()
        )
      ) {
        toast.error("Keyword already Exist.");
        return;
      }
      event.preventDefault();
      addNewKeyword(inputValue.trim(), 0, isSuggested);
      return;
    }
    if (event.key === "Backspace" && inputValue == "") {
      const cloneKeyword = [...selectedKeywords];
      handleDelete(cloneKeyword[cloneKeyword?.length - 1]);
      cloneKeyword.splice(cloneKeyword.length - 1);
      setSelectedKeywords(cloneKeyword);
      formik.setFieldValue("selectedKeywords", cloneKeyword);
    }
  };

  const isSelected = (keyword) => {
    if (selectedKeywords.some((item) => item?.name === keyword?.name)) {
      return true;
    }
    return false;
  };

  const handleBackspaceDelete = (e, keyword) => {
    if (e.key === "Backspace") {
      handleDelete(keyword);
    }
  };

  const handleRating = async (star, keyword) => {
    let { master_keyword_id, rating } = keyword;
    if (!master_keyword_id) {
      master_keyword_id = keyword?.id;
    }
    //for adding the rating
    if (star != "" && rating == 0) {
      const response = await fetch(`${BASE_URL}/keywords/add-keyword-rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: JSON.stringify({
          product_id: product_id,
          master_keyword_id: master_keyword_id,
          rating: star,
        }),
      });
      if (response.ok) {
        await fetchKeywords();
      }
      return;
    }

    //udpdate keyword rating
    if (rating > 0 && star != "") {
      const response = await fetch(
        `${BASE_URL}/keywords/update-keyword-rating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: JSON.stringify({
            product_id: product_id,
            master_keyword_id: master_keyword_id,
            rating: star,
          }),
        }
      );
      if (response.ok) {
        await fetchKeywords();
      }
      return;
    }
  };

  const handleToggleOption = (option, selected) => {
    if (selected) {
      const keywordForDeletion = selectedKeywords.find(
        (key) => key?.name == option
      );
      handleDelete(keywordForDeletion);
    }
  };
  // const getChipTextColor = (rating: number): string => {
  //   switch (rating) {
  //     case 1:
  //       return "#d7282f"; // Red
  //     case 2:
  //       return "#FFA700"; // Orange
  //     case 3:
  //       return "#F2E803"; // Yellow
  //     case 4:
  //       return "#92E203"; // Light Green
  //     case 5:
  //       return "#2CBA00"; // Green
  //     default:
  //       return "inherit"; // Default text color
  //   }
  // };

  const capitalizeWords = (str) => {
    let charLimit = 50; // Default limit

    if (window.innerWidth >= 280 && window.innerWidth <= 320) {
      charLimit = 12;
    } else if (window.innerWidth >= 320 && window.innerWidth <= 480) {
      charLimit = 21;
    }

    let formattedStr = str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return formattedStr.length > charLimit
      ? formattedStr.slice(0, charLimit) + "..."
      : formattedStr;
  };
  const getChipTextColor = (rating: number) => {
    if (rating >= 0.1 && rating <= 1) return "#d7282f";
    if (rating >= 1.1 && rating <= 2) return "#FFA700";
    if (rating >= 2.1 && rating <= 3) return "#F2E803";
    if (rating >= 3.1 && rating <= 4) return "#92E203";
    if (rating >= 4.1 && rating <= 5) return "#2CBA00";
    return "black"; // Default color if no rating matches
  };
  return (
    <KeywordRatingSection>
      <Grid item xl={12} lg={12} md={12} xs={12}>
        <ProductDesApplicationAndUseCases>
          <ProductAppUseTitle>
            Add Keywords / Select From Suggestion
            <LightTooltip placement={"top"} title="Required!" arrow>
              <span className="redStar">*</span>
            </LightTooltip>
          </ProductAppUseTitle>

          <ProductSelctionDropdown>
            <Box>
              <Autocomplete
                fullWidth
                size="small"
                multiple
                freeSolo
                options={suggestedKeywords?.map((item) => item?.name)}
                value={selectedKeywords?.map((item) => item?.name)}
                disabled={isDisabled}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Type and press Enter to add"
                    onChange={(event: any) => {
                      // setKeywordError(false);
                      formik?.setFieldError("selectedKeywords", "");
                      setInputValue(event?.target?.value);
                    }}
                    onKeyDown={handleKeyDown}
                    InputLabelProps={{ shrink: true }}
                    error={formik?.errors?.selectedKeywords || isDisabled}
                    helperText={
                      formik?.errors?.selectedKeywords
                        ? formik?.errors?.selectedKeywords
                        : ""
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      },
                      "& .MuiAutocomplete-input": {
                        padding: "0px 4px !important",
                      },
                    }}
                  />
                )}
                renderOption={(props, option, { selected }) => (
                  <ListItem
                    {...props}
                    onClick={() => {
                      const currentKeyword = suggestedKeywords.find(
                        (keyword) => keyword.name == option
                      );

                      if (isSelected(currentKeyword)) {
                        return;
                      }
                      handleAddKeyword(currentKeyword, true);
                    }}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "13px",
                      },
                      "& svg": {
                        fontSize: "18px",
                      },
                    }}
                  >
                    <Checkbox
                      checked={selected}
                      onChange={() => handleToggleOption(option, selected)}
                      style={{
                        marginRight: 4,
                        padding: 4,
                        color: selected ? "#d7282f" : "",
                      }}
                    />
                    <ListItemText primary={option} />
                  </ListItem>
                )}
                renderTags={(value, getTagProps) => {
                  return (
                    <>
                      {value.map((option, index) => {
                        const currentKeyword = selectedKeywords.find(
                          (keyword) => keyword.name == option
                        );
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <LightTooltip
                              key={index}
                              title={
                                <AttributeTooltipBox>
                                  <StarRoundedIcon
                                    className={`${
                                      currentKeyword?.rating == 1 ||
                                      currentKeyword?.rating > 1
                                        ? "redstar opacityONE"
                                        : "redstar"
                                    }`}
                                    onClick={() =>
                                      handleRating(1, currentKeyword)
                                    }
                                  />
                                  <StarRoundedIcon
                                    className={`${
                                      currentKeyword?.rating == 2 ||
                                      currentKeyword?.rating > 2
                                        ? "orangestar opacityONE"
                                        : "orangestar"
                                    }`}
                                    onClick={() =>
                                      handleRating(2, currentKeyword)
                                    }
                                  />
                                  <StarRoundedIcon
                                    className={`${
                                      currentKeyword?.rating == 3 ||
                                      currentKeyword?.rating > 3
                                        ? "yellowstar opacityONE"
                                        : "yellowstar"
                                    }`}
                                    onClick={() =>
                                      handleRating(3, currentKeyword)
                                    }
                                  />
                                  <StarRoundedIcon
                                    className={`${
                                      currentKeyword?.rating == 4 ||
                                      currentKeyword?.rating > 4
                                        ? "lightgreenstar opacityONE"
                                        : "lightgreenstar"
                                    }`}
                                    onClick={() =>
                                      handleRating(4, currentKeyword)
                                    }
                                  />
                                  <StarRoundedIcon
                                    className={`${
                                      currentKeyword?.rating === 5 ||
                                      currentKeyword?.rating > 5
                                        ? "greenstar opacityONE"
                                        : "greenstar"
                                    }`}
                                    onClick={() =>
                                      handleRating(5, currentKeyword)
                                    }
                                  />
                                </AttributeTooltipBox>
                              }
                              arrow
                              placement="top"
                            >
                              <AttributeCheckChipBox>
                                <AttributeRedCheck>
                                  <Image
                                    width={22}
                                    height={24}
                                    src={"/assets/selectedAttribute.svg"}
                                    alt="img"
                                  />
                                </AttributeRedCheck>
                                <ManualKeywordChip
                                  label={
                                    <>
                                      {capitalizeWords(option)}{" "}
                                      <span
                                        style={{
                                          color: getChipTextColor(
                                            currentKeyword?.rating || 0
                                          ),
                                        }}
                                      >
                                        (
                                        {currentKeyword?.rating ||
                                          currentKeyword?.score ||
                                          0}
                                        )
                                      </span>
                                    </>
                                  }
                                  {...getTagProps({ index })}
                                  onDelete={() => handleDelete(currentKeyword)}
                                  onKeyDown={(e) =>
                                    handleBackspaceDelete(e, currentKeyword)
                                  }
                                />
                              </AttributeCheckChipBox>
                            </LightTooltip>
                          </Box>
                        );
                      })}

                      {isDisabled && (
                        <>
                          <CircularProgress
                            sx={{
                              color: "#d7282f",
                              "&.MuiCircularProgress-root": {
                                height: "20px !important",
                                width: "20px !important",
                              },
                            }}
                          />
                        </>
                      )}
                    </>
                  );
                }}
              />
            </Box>
          </ProductSelctionDropdown>
        </ProductDesApplicationAndUseCases>
      </Grid>
      {/* {keywordError && (
        <CommonErrorMessage
          message={
            "Please Select or enter altleast 1 Keyword related to your product"
          }
        />
      )} */}
      <KRatingButton>
        <Typography variant="body2" color="textSecondary">
          Highlight your most important keywords by giving them a higher ranking
          and give lower rankings to less important ones (5 rank for most
          relevant, 1 rank for less relevant). This approach not only boosts how
          easily people can find your product but also makes sure that the
          keywords accurately showcase its features. Product Keyword is using as
          an Search Keyword.
        </Typography>
        {/* <Button variant="contained" color="primary">
          Submit
        </Button> */}
      </KRatingButton>
    </KeywordRatingSection>
  );
}
export default KeywordRating;
