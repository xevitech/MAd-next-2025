import React, { useEffect, useState } from "react";
import { MiniSiteContainer } from "../styled";
import { AddsliderBtn, SaveBtn } from "@/components/subDomain/Subdomainstyle";
import { Box } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { apiClient } from "@/components/common/common";
import SelectTemplate from "../MenuTemplates/SelectTemplate";
import { MiniTemplate } from "../MenuTemplates/Minisitemplate";
import EditSection from "./EditSection";
import { PageTemplate } from "../MenuTemplates/PageTemplate";
import dynamic from "next/dynamic";
import { CustomTabContentProps } from "@/hooks/Interface";

const TemplateLoadingButton = dynamic(
  () => import("./TemplateLoadingButton")
);

const CustomTabContent: React.FC<CustomTabContentProps> = ({
  data = {},
  activeTab = -1,
  setMinisiteMenus,
}) => {
  const [templateCustomTab, setTemplateCustomTab] = useState({
    content: data?.content || "",
  });
  const [buttonLoader, setButtonLoader] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [defaultTemplateBlocks, setDefaultTemplateBlocks] = useState([]);
  const { headerData } = useSelector((state: any) => state.miniSite);
  const {
    basic_information: { slug },
  } = headerData;

  useEffect(() => {
    const getDefaultTemplateBlock = async () => {
      try {
        const response = await apiClient(
          `mini-site/company_profile/companyDetail-html.html?slug=${slug}`,
          "get"
        );
        if (response.status) {
          const innerObjects = Object.values(response?.data);
          setDefaultTemplateBlocks(innerObjects);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return null;
      }
    };
    getDefaultTemplateBlock();
  }, []);

  const handleTemplateSelect = async (templateID, type) => {
    const templateToFind =
      type === "default"
        ? defaultTemplateBlocks
        : type === "block"
        ? MiniTemplate
        : PageTemplate;
    if (templateID > 0) {
      const template = templateToFind.find((v) => v.id === templateID);
      setTemplateCustomTab((prev) => ({
        content: (prev.content || "") + (template?.html || ""),
      }));
    } else if (typeof templateID == "string") {
      const template = templateToFind.find((v) => v?.name === templateID);
      setTemplateCustomTab((prev) => ({
        content: (prev.content || "") + (template?.html || ""),
      }));
    }
    setIsEditMode(true);
  };

  useEffect(() => {
    if (data?.content) {
      setTemplateCustomTab({ content: data?.content });
    }
  }, [data?.content]);

  useEffect(() => {
    if (activeTab !== null) {
      setTemplateCustomTab({ content: data?.content || "" });
    }
  }, [activeTab, data]);

  const handleSavetemplate = async () => {
    setButtonLoader(true);
    await apiClient("sub_domain/menu_update", "post", {
      body: {
        id: data?.id,
        name: data?.name,
        content: templateCustomTab?.content,
        display_order: activeTab + 1,
      },
    });
    setMinisiteMenus((prev) =>
      prev.map((el) => {
        if (el.name === data?.name) {
          return { ...el, content: templateCustomTab?.content || "" };
        }
        return el;
      })
    );
    setIsEditMode(false);
    setButtonLoader(false);
  };

  return (
    <MiniSiteContainer className="sectionspacing">
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "6px",
          boxShadow:
            "0px 0px 0px rgba(159, 162, 191, 0.18),0px 1px 0px rgba(159, 162, 191, 0.32)",
          padding: "24px",
        }}
      >
        {templateCustomTab?.content === "" && (
          <TemplateLoadingButton openTemplateDrawer={setOpen} />
        )}
        <SelectTemplate
          selectTemplate={handleTemplateSelect}
          open={open}
          setOpen={setOpen}
          defaultTemplateBlocks={defaultTemplateBlocks}
        />

        {isEditMode ? (
          <Box sx={{ position: "relative" }}>
            <EditSection
              setTemplateCustomTab={setTemplateCustomTab}
              templateCustomTab={templateCustomTab}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              setOpen={setOpen}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "12px",
                gap: "12px",
              }}
            >
              <AddsliderBtn
                onClick={() => {
                  setIsEditMode(false);
                  setTemplateCustomTab({
                    content: data?.content || "",
                  });
                }}
              >
                Cancel
              </AddsliderBtn>
              <SaveBtn
                onClick={() => handleSavetemplate()}
                style={{ height: "42px", width: "91.4px" }}
              >
                {" "}
                {buttonLoader ? (
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  <> {"Save"} </>
                )}
              </SaveBtn>
            </Box>
          </Box>
        ) : templateCustomTab?.content ? (
          <EditSection
            setTemplateCustomTab={setTemplateCustomTab}
            templateCustomTab={templateCustomTab}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
        ) : null}
      </Box>
    </MiniSiteContainer>
  );
};

export default CustomTabContent;
