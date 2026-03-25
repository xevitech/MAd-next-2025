import { apiClient, SocialMediaList } from "@/components/common/common";
import EmptyPage from "@/components/common/EmptyPage";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  EditIconContainer,
  FieldsContainer,
  IconAndTextContainer,
  MediaContent,
  MediaHeadingAndIdContainer,
  MediaId,
  SectionContainer,
  SectionHeader,
  SectionHeaderText,
  SectionSubHeaderContainer,
  SectionSubHeaderText,
  SocialAccountsContainer,
  SocialIconContainer,
} from "../styles";
import {
  AccountFieldContainer,
  AddAccountContainer,
  TextFieldButtonContainer,
} from "./style";
import { TextField, MenuItem } from "@mui/material";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";

const SocialAccounts = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [addAccount, setAddAccount] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<number>(0);
  const [socialMediaList, setSocialMediaList] = useState<any>([]);
  const [deleted, setDeleted] = useState<any>([]);
  const [prevProfileLink, setPrevProfileLink] = useState<string>("");
  const [profile_link, setProfileLink] = useState<string>("");
  const [profile_type, setProfileType] = useState<string>("");

  const FetchSocialAccountList = async () => {
    if (edit) setEdit(false);
    if (deleted.length > 0) setDeleted([]);
    let response = await apiClient("profile/list/social", "post", {
      body: { type: "personal" },
    });
    if (response?.data) {
      if (response.data.length > 0) setAddAccount(false);
      setSocialMediaList(response.data);
    }
  };

  useEffect(() => {
    FetchSocialAccountList();
  }, []);

  const DeleteAccounts = async () => {
    setSocialMediaList((prev) => {
      setDeleted((pre) => [...pre, prev[deleteID].id]);
      prev.splice(deleteID, 1);
      setTimeout(() => {
        setDeleteConfirmation(false);
        toast.success("Account deleted successfully");
      }, 100);
      setDeleteID(-1);
      return [...prev];
    });
  };

  const onChangeHandler = (e, index) => {
    setSocialMediaList((prev) => {
      let list = [...prev];
      list[index].profile_link = e.target.value;
      return list;
    });
  };

  const CancelEdit = (index) => {
    setSocialMediaList((prev) => {
      let list = [...prev];
      list[index].profile_link = prevProfileLink;
      return list;
    });
    setPrevProfileLink("");
  };

  const SaveSocialAccounts = async () => {
    let response = await apiClient(`profile/submit/social`, "post", {
      body: { social_data: socialMediaList, delete_ids: deleted.toString() },
    });
    if (response.status === 200) {
      FetchSocialAccountList();
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "profile_type") setProfileType(value);
    if (name === "profile_link") setProfileLink(value);
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionHeaderText>Preffered Instant Message ID</SectionHeaderText>
        <SectionSubHeaderContainer>
          {" "}
          <SectionSubHeaderText>
            {" "}
            Manage Connected Social accounts
          </SectionSubHeaderText>
        </SectionSubHeaderContainer>
        <IconAndTextContainer editIcon={{ editIcon: true }}>
          <EditIconContainer
            style={{
              transform: "translateX(-30px)",
              paddingTop: "10px",
            }}
          >
            <Image
              src={"/assets/EditPencil.svg"}
              alt={"edit-icon"}
              width={15}
              height={12}
            />
          </EditIconContainer>
        </IconAndTextContainer>
      </SectionHeader>
      <FieldsContainer>
        {addAccount || edit ? (
          <form>
            <AddAccountContainer>
              <AccountFieldContainer value={{ flex: 0.2 }}>
                <TextField
                  label={profile_type !== "" ? "" : "Select Social Media"}
                  style={{ width: "100%" }}
                  id="outlined-select-social"
                  variant="outlined"
                  select
                  name={"profile_type"}
                  size="small"
                  value={profile_type}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "13px",
                      },
                    },
                  }}
                >
                  {SocialMediaList.map((option) => (
                    <MenuItem key={option.id} value={option.name.toLowerCase()}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </AccountFieldContainer>
              <AccountFieldContainer value={{ flex: 0.8 }}>
                <TextFieldButtonContainer>
                  <TextField
                    style={{ width: "30%" }}
                    name={"profile_link"}
                    size="small"
                    value={profile_link}
                    onChange={handleChange}
                    placeholder="Insert Link/ ID/ Number"
                  ></TextField>

                  <BtnFilled type="submit" height={"38px"} width={"80px"}>
                    Add
                  </BtnFilled>
                </TextFieldButtonContainer>
              </AccountFieldContainer>
            </AddAccountContainer>
          </form>
        ) : null}

        {socialMediaList.length < 0 ? (
          socialMediaList.map((v, i) => (
            <SocialAccountsContainer key={i}>
              <MediaContent>
                <SocialIconContainer>
                  <div
                    style={{
                      marginTop: "15px",
                    }}
                  >
                    {
                      SocialMediaList.find(
                        (logo) =>
                          logo.name.toLowerCase() ===
                          v.profile_type.toLowerCase()
                      ).logo
                    }
                  </div>
                </SocialIconContainer>

                <MediaHeadingAndIdContainer>
                  <MediaId>{v.profile_link}</MediaId>
                </MediaHeadingAndIdContainer>
              </MediaContent>
            </SocialAccountsContainer>
          ))
        ) : (
          <EmptyPage
            text={"social account"}
            onClickHandler={() => setAddAccount(true)}
            logo=""
          />
        )}
      </FieldsContainer>
    </SectionContainer>
  );
};
export default SocialAccounts;
