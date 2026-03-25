import React from "react";
import {
  ManageOrderTxt,
  ManageOrderTxt1,
  OrderBottomText,
  OrderBox,
  OrderText,
  TradeAssuranceTxt,
} from "./style";
import { Divider, Link, Typography } from "@mui/material";

function OrderPopupData(props) {
  const { setAnchorMenuMessage } = props;
  return (
    <div>
      <OrderBox
        onMouseLeave={() => {
          setAnchorMenuMessage(null);
        }}
      >
        <ManageOrderTxt>Manage orders as a buyer</ManageOrderTxt>
        <ManageOrderTxt1>
          <Typography>Waiting for payment (0)</Typography>
          <Typography>Waiting for confirmation (0)</Typography>
          <Typography>All orders</Typography>
        </ManageOrderTxt1>
        <Divider />
        <OrderBottomText>
          <TradeAssuranceTxt>
            <img
              src="/assets/images/header/trade-assurence.svg"
              title=""
              alt=""
            />
            Trade Assurance
          </TradeAssuranceTxt>
          <OrderText>Enjoy Protection from payment to delivery</OrderText>
          <OrderText>
            <Link color="inherit">Learn More</Link>
          </OrderText>
          {/* <OrderText><Link color="inherit" underline="always">Learn More</Link></OrderText> */}
        </OrderBottomText>
      </OrderBox>
    </div>
  );
}

export default OrderPopupData;
