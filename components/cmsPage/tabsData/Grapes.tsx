import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsPluginForms from "grapesjs-plugin-forms";
import gjsPluginExport from "grapesjs-plugin-export";
import gjsBasicBlock from "grapesjs-blocks-basic";
import gjsImageEditing from "grapesjs-tui-image-editor";
import gjsCustomCode from "grapesjs-custom-code";
import grapesjsTabsPlugin from "grapesjs-tabs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-plugin-ckeditor";
import gjsCustomBlocks from "grapesjs-custom-blocks";
import * as filestack from "grapesjs-plugin-filestack";
import "grapesjs/dist/css/grapes.min.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import PreviewEdited from "./previewEdited";
import "grapesjs-accordion";
import { GetUrlParams, apiClient } from "@/components/common/common";
import {
  JumboTronPlugin,
  PortfolioPlugin,
  PhotoGallery,
  Testimonial,
  ImageBox,
  IconBox,
  CarousalPlugin,
  AddAccordian,
  AddTabs,
  NavigationButton,
  OrderedList,
  UnOrderedList,
  ListIcon,
  FluidContainer,
  Container,
  Header,
  ThreeColumns,
  TwoColumns,
  Column,
  ThreebySevenColumns,
  Section,
} from "./Components";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
const Grapes = () => {
  const router = useRouter();
  const [editor, setEditor] = useState(null);
  const [Projecthtml, setProjectHtml] = useState<string>("");
  const [Projectcss, setProjectcss] = useState<string>("");
  const block = useRef(null);
  const [preview, setPreview] = useState({ editedData: "", status: false });
  const [origin, setOrigin] = useState<any>("http://localhost:3001");

  const FetchPageData = async () => {
    const id = GetUrlParams("id");
    const key = GetUrlParams("key");
    if (id && key) {
      let response = await apiClient(`cms/get_page_data?id=${id}`, "get");
      if (response.status === 200) {
        const { html, css } = response.data;
        if (html) setProjectHtml(html);
        if (css) setProjectcss(css);
      }
    } else {
      setTimeout(() => {
        alert("please login");
        router.back();
      }, 500);
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      setOrigin(window.location.origin);
    }
    FetchPageData();
  }, []);

  const customStyle = {
    name: "Custom Class",
    label: "Custom Class",
  };

  useEffect(() => {
    const editor: any = grapesjs?.init({
      container: "#editor",
      fromElement: true,
      showOffsets: true,
      storageManager: false,
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
          "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
          "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/#[[MDB 5]]#/mdb.min.css",
          `${origin}/assets/GrapesCss/custom.css`,
          "https://fonts.googleapis.com/css?family=Archivo+Narrow:400,400i,700,700i|Roboto:300,300i,400,400i,500,500i,700,700i&subset=latin,latin-ext",
        ],
        scripts: [
          "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js",
          "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js",
          "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
          "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/#[[latestVersion]]#/mdb.min.js",
          "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
          "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
        ],
      },
      // assetManager: {
      //   storageType: "",
      //   storeOnChange: true,
      //   storeAfterUpload: true,
      //   upload: "https://localhost/assets/upload", //for temporary storage
      //   assets: [],
      //   uploadFile: function (e) {
      //     var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      //     var formData = new FormData();
      //     for (var i in files) {
      //       formData.append("file-" + i, files[i]); //containing all the selected images from local
      //     }
      //     $.ajax({
      //       url: "/location to your php page/upload_image.php",
      //       type: "POST",
      //       data: formData,
      //       contentType: false,
      //       crossDomain: true,
      //       dataType: "json",
      //       mimeType: "multipart/form-data",
      //       processData: false,
      //       success: function (result) {
      //         var myJSON = [];
      //         $.each(result["data"], function (key, value) {
      //           myJSON[key] = value;
      //         });
      //         var images = myJSON;
      //         editor.AssetManager.add(images);
      //       },
      //     });
      //   },
      // },
      selectorManager: {
        componentFirst: true,
        selectors: [
          { name: "MyClass", label: "My Class" },
          { name: "MyOtherClass", label: "My Other Class" },
          customStyle,
        ],
      },
      styleManager: {
        sectors: [
          {
            name: "Dimensions",
            open: false,
            buildProps: [
              "width",
              "height",
              "max-width",
              "min-height",
              "margin",
              "padding",
            ],
          },
          {
            name: "General",
            open: false,
            buildProps: [
              "float",
              "display",
              "position",
              "top",
              "right",
              "left",
              "bottom",
            ],
          },
          {
            name: "Decoration",
            open: false,
            buildProps: [
              "border-radius",
              "background-color",
              "border",
              "box-shadow",
              "background",
            ],
          },
          {
            name: "Typography",
            open: false,
            buildProps: [
              "font-family",
              "font-weight",
              "font-size",
              "color",
              "line-height",
              "letter-spacing",
              "text-align",
            ],
            properties: [],
          },
          {
            name: "Extra",
            open: false,
            buildProps: ["transition", "perspective", "transform", "opacity"],
          },
        ],
      },
      plugins: [
        Section,
        gjsCustomBlocks,
        gjsPresetWebpage,
        gjsPluginForms,
        gjsPluginExport,
        gjsBasicBlock,
        // gjsImageEditing,
        gjsCustomCode,
        // grapesjsTabsPlugin,
        // filestack,
        // ImagesWithTextPlugin,
        // ImagewithRightText,
        JumboTronPlugin,
        PortfolioPlugin,
        PhotoGallery,
        Testimonial,
        ImageBox,
        IconBox,
        OrderedList,
        UnOrderedList,
        CarousalPlugin,
        NavigationButton,
        ListIcon,
        FluidContainer,
        Container,
        Header,
        Column,
        TwoColumns,
        ThreeColumns,
        ThreebySevenColumns,
      ],
      pluginsOpts: {
        gjsPresetWebpage: {
          blocksBasicOpts: { blocks: [] },
        },
        gjsCustomBlocks: {
          gjsCustomBlocks: {},
        },
        gjsToolBox: {
          gjsToolBox: {
            panels: true,
            traitsInSm: true,
            resizer: true,
            breadcrumbs: true,
            gridBlock: {},
            gridComponent: {},
            gridClass: "grid",
            gridCellClass: "grid-cell",
            cellItemClass: "cell-item",
            labelColors: "Image palette",
            labelApply: "Add",
            onAdd: 0,
            minScreenSize: 250,
            refreshPalette: [
              {
                sector: "typography",
                name: "Color",
                property: "color",
                type: "color",
                defaults: "black",
              },
            ],
          },
        },
      },
    });
    const blockManager = editor.Blocks;
    const allBlocks = editor.BlockManager.getAll();
    const blockId = allBlocks.where({ label: "1 Column" })[0].cid;
    const blockId2 = allBlocks.where({ label: "2 Columns" })[0].cid;
    const blockId3 = allBlocks.where({ label: "2 Columns 3/7" })[0].cid;
    const blockId4 = allBlocks.where({ label: "3 Columns" })[0].cid;

    // [blockId, blockId2, blockId3, blockId4].forEach((v) => {
    //   const block = blockManager.get(v);
    //   blockManager.remove(block);
    // });

    editor.Components.addType("cell", {
      isComponent(el) {
        if (!(["td", "th"].indexOf(el.tagName?.toLowerCase()) >= 0)) {
          return false;
        }

        const allChildNodes: Node[] = [];
        function collectChildNodes(arr: Node) {
          const { childNodes } = arr;
          if (childNodes.length > 0) {
            for (let index = 0; index < childNodes.length; index += 1) {
              const arrayChildNode = childNodes[index];
              if (arrayChildNode.childNodes?.length > 0) {
                collectChildNodes(arrayChildNode);
              } else {
                allChildNodes.push(arrayChildNode);
              }
            }
          } else {
            allChildNodes.push(arr);
          }
        }
        collectChildNodes(el);
        return !allChildNodes.every(
          (item) => item.nodeType === 3 || item.nodeName?.toLowerCase() === "br"
        );
      },
    });
    editor.on("load", () => {
      const panelManager = editor.Panels;
      panelManager.removeButton("options", "Preview");
    });

    function onBlockAdd(block) {
      if (block.id === "accordion") {
        var allBlocks = editor.BlockManager.getAll().clone();
        var filteredBlocks = allBlocks.where({ label: "Accordion Block" });
        const add = editor.Blocks;
        const block = add.get("accordion");
        block.set({
          content: AddAccordian(),
        });
      }
    }
    function onTabAdd(b) {
      let block = b?.em ?? b;

      if (block.id === "tabs") {
        var allBlocks = editor.BlockManager.getAll().clone();
        var filteredBlocks = allBlocks.where({ label: "Tabs Block" });
        const add = editor.Blocks;
        const block = add.get("tabs");
        block.set({
          content: AddTabs(),
        });
      }
    }
    editor.DomComponents.addType("text", {
      model: {
        defaults: {
          traits: [
            {
              type: "select",
              options: [
                { value: "h1", name: "Heading 1" },
                { value: "h2", name: "Heading 2" },
                { value: "h3", name: "Heading 3" },
                { value: "h4", name: "Heading 4" },
                { value: "h5", name: "Heading 5" },
                { value: "h6", name: "Heading 6" },
              ],
              label: "Size",
              name: "tagName",
              changeProp: 1,
            },
          ],
          attributes: { type: "text", required: true },
        },
      },
    });

    editor.BlockManager.add("accordion", {
      active: false,
      label: "Accordion Block",
      content: AddAccordian,
      script: () => {
        console.log("script added");
      },
      attributes: {
        class: "h-25 d-inline-block",
      },
      category: "Collapse",
      Category: "Collapse",
      media: `<svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.0791 28.4441L27.3291 28.4441" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
        <path d="M3.0791 24.4407L27.3291 24.4407" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
        <path d="M3.0791 5.45959L27.3291 5.45959" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
        <path d="M3.0791 1.45618L27.3291 1.45617" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
        <rect x="1.06875" y="8.23416" width="28.1311" height="13.4204" stroke="white" stroke-width="0.7"/>
        </svg>
        `,
    });
    const commands = editor.Commands;
    // commands.add("core:copy", (editor) => {
    //   const add = editor.Blocks;
    //   const block = add.get("tabs");
    //   block.set({
    //     content: AddTabs(),
    //   });
    // });
    // commands.add("core:paste", (editor) => {
    //   const add = editor.Blocks;
    //   const block = add.get("tabs");
    //   block.set({
    //     content: AddTabs(),
    //   });
    // });
    // commands.add("core:paste", onTabAdd);

    editor.on("block:drag:start", onBlockAdd);
    editor.BlockManager.add("tabs", {
      open: false,
      label: "Tabs Block",
      content: AddTabs,
      script: () => {
        console.log("script added");
      },
      category: "Collapse",
      Category: "Collapse",
      attributes: {
        class: "h-25 d-inline-block",
      },
      media: `<svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 6.88V1.88H3C1.9 1.88 1 2.78 1 3.88V7.88V21.88C1 22.98 1.9 23.88 3 23.88H27C28.1 23.88 29 22.98 29 21.88V6.88H11Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    });
    editor.on("block:drag:start", onTabAdd);
    editor.setComponents(Projecthtml);
    editor.setStyle(Projectcss);
    setEditor(editor);
  }, [Projecthtml, Projectcss, origin]);

  const handleSaveHtml = async () => {
    const htmlData = editor.getHtml();
    const getCss = editor.getCss();
    const getstyle = editor.getStyle();
    const id = GetUrlParams("id");
    const key = GetUrlParams("key");
    let response = await apiClient("cms/update", "post", {
      body: {
        key,
        id,
        html: `${htmlData}`,
        css: `${getCss}`,
      },
    });

    if (response.status === 200) {
      alert("page saved successfully");
    }
    // const css = editor.setStyle(css);
    // setPreview({ editedData: htmlData, status: true });
  };

  return (
    <>
      <Button onClick={handleSaveHtml}> Save Data</Button>
      {!preview.status && (
        <>
          <div id="editor"></div>
          <div ref={block}></div>
        </>
      )}
      {preview.status && (
        <>
          <Button
            onClick={() => setPreview((prev) => ({ ...prev, status: false }))}
          >
            back
          </Button>
          <PreviewEdited
            edData={preview.editedData}
            editedCss={editor.getCss()}
          />
        </>
      )}
    </>
  );
};
export default Grapes;
