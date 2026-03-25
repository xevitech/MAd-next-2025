import { apiClient } from "@/components/common/common";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import  LoadMore  from "../LoadMore";
import Miniproductlisting  from "../Miniproductlisting";
import { MiniProductsListHeading } from "./MiniProductListHeading";

export default function MiniProductsList() {
    const [productList, setProductList] = useState<any>([])
    useEffect(() => {
        (async () => {
            let response = await apiClient("front/single/view", "post", {
                body: { id: '235', user_id: '' },
            });
            if (response.status === 200) {
                setProductList(response.data.seller_product)
            }
        })();
    }, [])
    return (
        <Box>
            <MiniProductsListHeading/>
            <Miniproductlisting listdata={productList} />
            <LoadMore />
        </Box>
    )
}