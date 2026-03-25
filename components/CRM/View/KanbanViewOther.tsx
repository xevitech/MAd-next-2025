import * as React from "react";
import { Grid, Menu, MenuProps, styled } from "@mui/material";
import {
  CardHeading,
  ItemInfo,
  CardLayout,
  CardStyle,
  CardInfo,
  LeadNameValue,
  KanbanItemGreen,
  KanbanItemHeaderBlue,
  KanbanItemBlue,
  KanbanItemHeaderRed,
  KanbanItemRed,
  KanbanItemPurple,
  KanbanItemHeaderPurple,
  KanbanBoxContainer,
  TaskKanbanItem,
  KanbanItemHeaderGreen,
} from "./style";
import KanbanView from "../Skeletons/KanbanView";
import { useSelector } from "react-redux";
import { TaskKanbanScrollOuter } from "../style";
import KanbanListOther from "./KanbanListOther";

const KanbanViewOther = (props) => {
  let kanbanData = props?.data?.data?.data;
  const { typeName } = useSelector((state: any) => state.formList);
  const [dataLoader, setDataLoader] = React.useState(true);
  const [leadContacts, setLeadContacts] = React.useState([]);
  const [account, setAccount] = React.useState([]);
  const [deals, setDeals] = React.useState([]);
  const [others, setOthers] = React.useState([]);

  React.useEffect(() => {
    setOthers(
      kanbanData?.filter(
        (ele) => ele.type_name == "" || ele.type_name == null
      )
    );
    setAccount(kanbanData?.filter((ele) => ele.type_name == "Account"));
    setDeals(kanbanData?.filter((ele) => ele.type_name == "Deals"));
    setLeadContacts(
      kanbanData?.filter(
        (ele) => ele.type_name == "Leads" || ele.type_name == "Contact"
      )
    );
    setDataLoader(false);
  }, [kanbanData]);

  return (
    <>
      <KanbanBoxContainer>
        {dataLoader ? (
          <KanbanView />
        ) : (
          <Grid container spacing={2} wrap="nowrap" style={{height:"calc(100% + 16px)"}}>
            <Grid item>
              <TaskKanbanItem>
                <KanbanItemGreen>
                  <KanbanItemHeaderGreen>
                    <ItemInfo>
                      <CardHeading variant="h5" sx={{ color: "#34A400" }}>
                        Leads/Contacts
                      </CardHeading>
                    </ItemInfo>
                  </KanbanItemHeaderGreen>
                  <TaskKanbanScrollOuter>
                    {leadContacts?.length > 0 ? (
                      leadContacts.map(
                        (leadContactsData, leadContactsIndex) => (
                          <KanbanListOther
                            list={leadContactsData}
                            key={leadContactsIndex}
                          />
                        )
                      )
                    ) : (
                      <CardLayout>
                        <CardStyle>
                          <CardInfo>
                            <LeadNameValue variant="h5">
                              No {typeName} found!
                            </LeadNameValue>
                          </CardInfo>
                        </CardStyle>
                      </CardLayout>
                    )}
                  </TaskKanbanScrollOuter>
                </KanbanItemGreen>
              </TaskKanbanItem>
            </Grid>
            <Grid item>
              <TaskKanbanItem>
                <KanbanItemBlue>
                  <KanbanItemHeaderBlue>
                    <ItemInfo>
                      <CardHeading variant="h5" sx={{ color: "#4476CF" }}>
                        Account
                      </CardHeading>
                    </ItemInfo>
                  </KanbanItemHeaderBlue>
                  <TaskKanbanScrollOuter>
                    {account?.length > 0 ? (
                      account.map((accountData, accountIndex) => (
                        <KanbanListOther
                          list={accountData}
                          key={accountIndex}
                        />
                      ))
                    ) : (
                      <CardLayout>
                        <CardStyle>
                          <CardInfo>
                            <LeadNameValue variant="h5">
                              No {typeName} found!
                            </LeadNameValue>
                          </CardInfo>
                        </CardStyle>
                      </CardLayout>
                    )}
                  </TaskKanbanScrollOuter>
                </KanbanItemBlue>
              </TaskKanbanItem>
            </Grid>
            <Grid item>
              <TaskKanbanItem>
                <KanbanItemPurple>
                  <KanbanItemHeaderPurple>
                    <ItemInfo>
                      <CardHeading variant="h5" sx={{ color: "#A386C7" }}>
                        Deals
                      </CardHeading>
                    </ItemInfo>
                  </KanbanItemHeaderPurple>
                  <TaskKanbanScrollOuter>
                    {deals?.length > 0 ? (
                      deals.map((dealsData, dealIndex) => (
                        <KanbanListOther list={dealsData} key={dealIndex} />
                      ))
                    ) : (
                      <CardLayout>
                        <CardStyle>
                          <CardInfo>
                            <LeadNameValue variant="h5">
                              No {typeName} found!
                            </LeadNameValue>
                          </CardInfo>
                        </CardStyle>
                      </CardLayout>
                    )}
                  </TaskKanbanScrollOuter>
                </KanbanItemPurple>
              </TaskKanbanItem>
            </Grid>
            <Grid item>
              <TaskKanbanItem>
                <KanbanItemRed>
                  <KanbanItemHeaderRed>
                    <ItemInfo>
                      <CardHeading variant="h5" sx={{ color: "#D7282F" }}>
                        Others
                      </CardHeading>
                    </ItemInfo>
                  </KanbanItemHeaderRed>
                  <TaskKanbanScrollOuter>
                    {others?.length > 0 ? (
                      others.map((otherData, otherIndex) => (
                        <KanbanListOther list={otherData} key={otherIndex} />
                      ))
                    ) : (
                      <CardLayout>
                        <CardStyle>
                          <CardInfo>
                            <LeadNameValue variant="h5">
                              No {typeName} found!
                            </LeadNameValue>
                          </CardInfo>
                        </CardStyle>
                      </CardLayout>
                    )}
                  </TaskKanbanScrollOuter>
                </KanbanItemRed>
              </TaskKanbanItem>
            </Grid>
          </Grid>
        )}
      </KanbanBoxContainer>
    </>
  );
};
export default KanbanViewOther;
