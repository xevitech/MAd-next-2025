import { apiClient } from "@/components/common/common";
import { setWishListData } from "@/hooks/HeaderHooks";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

const useUpdateWishlist = () => {
  const [wishListData, setWishList] = useState([]);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      const res = await apiClient("front/list/wishlist", "get");
      setWishList(res?.data);
      dispatch(setWishListData(res?.data));
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  }, [dispatch]);

  return fetchData;  // Returning fetchData function
};

export default useUpdateWishlist;
