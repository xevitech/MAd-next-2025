import * as React from "react";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
/** Common file for these two components **/
import { OuterContainer } from "../../SellerTools/styles";
/** Common file for these two components **/
import { ProfileHeader } from "../../common/profileheader";
import Leads from "./Leads";
import SearchIcon from "@mui/icons-material/Search";
import { HelpIcon, LeadsOuterBox, TabsCustomStyle } from "../style";
import {
  CommonTopSearch,
  CrmFullData,
  CrmInnerContent,
  CrmMainHeadingFullArea,
  FixedCreateButton,
  OutLinedButton,
  QuickAddBox,
  QuickAddBoxInn,
  QuickAddMenu,
  // RedOutLinedButton,
  SearchCommon,
} from "../commonStyle";
import CommonCRMTabs from "./CommonCRMTabs";
import { useSelector } from "react-redux";
import ActionManageTags from "./ActionManageTags";
import { useAppDispatch } from "redux/store";
import CreateForm from "./CreateForm";
import CommonHeader from "./CommonHeader";
import OtherModuels from "./OtherModuels";
import ReminderPopUp from "./ReminderPopUp";
const LeadsManagement = () => {
  const [activeButton, setActiveButton] = React.useState(1);
  const { typeId } = useSelector((state: any) => state.formList);
  const renderComponent = () => {
    switch (typeId) {
      case 1:
      case 2:
      case 3:
      case 4:
        return <Leads />;
      case 5:
      case 6:
      case 7:
        return <OtherModuels />;
      default:
        return <Box sx={{ p: 3 }}> Coming soon....</Box>;
    }
  };

  return (
    <div className="full_page crm_pagelayout">
      <CrmFullData>
        <OuterContainer>
          <CommonHeader />
        </OuterContainer>
        <CrmInnerContent>
          <LeadsOuterBox>
            {/* {actionManage != 5 ? ( */}
            <>
              <CommonCRMTabs activeButton={activeButton} />
              <div>{renderComponent()}</div>
              <ReminderPopUp />
            </>
            {/* ) : (
              <ActionManageTags />
            )} */}
          </LeadsOuterBox>
        </CrmInnerContent>
      </CrmFullData>
    </div>
  );
};
export default LeadsManagement;
