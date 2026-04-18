import React, { useState, useEffect } from "react";
import {
  styled,
  Typography,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import Auth from "@/auth/Auth";
import { toast } from "react-toastify";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Image from "next/image";
import Head from "next/head";
import { BASE_URL } from "@/utils/staticValues";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface AddCategoryInfo {
  id?: number;
  name: string;
  description: string;
  banner?: string;
  icon?: string;
  parent_id?: number;
}

interface AddCategoryError {
  id?: boolean;
  name: boolean;
  description: boolean;
  banner?: boolean;
  icon?: boolean;
  parent_id?: boolean;
}

interface AddCategoryHelperText {
  id?: string;
  name: string;
  description: string;
  banner?: string;
  icon?: string;
  parent_id?: string;
}

interface AddCategoryData {
  id: number;
  name: string;
  description: string;
  banner: string;
  icon: string;
  parent_id: number;
}

interface AddAttributeInfo {
  id?: number;
  name: string;
  category_id: number;
  parent?: number;
}

interface AddAttributeError {
  id?: boolean;
  name: boolean;
  category_id: boolean;
  parent?: boolean;
}

interface AddAttributeHelperText {
  id?: string;
  name: string;
  category_id: string;
  parent?: string;
}

interface AddAttributeData {
  id: number;
  name: string;
  category_id: number;
  parent: number;
}

interface AddSubAttributeInfo {
  id?: number;
  name: string;
  category_id: number;
  parent?: number;
}

interface AddSubAttributeError {
  id?: boolean;
  name: boolean;
  category_id: boolean;
  parent?: boolean;
}

interface AddSubAttributeHelperText {
  id?: string;
  name: string;
  category_id: string;
  parent?: string;
}

interface AddSubAttributeData {
  id: number;
  name: string;
  category_id: number;
  parent: number;
}

export const Categories = () => {
  const OuterContainer = styled("div")({
    justifyContent: "space-between",
    background: "#F6F8FB",
    padding: "15px",
  });

  const [nonApprovedCategories, setNonApprovedCategories] = useState<any[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [allApprovedRootCategoriesBox, setAllApprovedRootCategoriesBox] =
    useState<any[]>([]);

  const [allApprovedSubCategoriesBoxes, setAllApprovedSubCategoriesBoxes] =
    useState<any[]>([]);

  const [allRootAttributesBox, setAllRootAttributesBox] = useState<any[]>([]);

  const [allSubAttributesBox, setAllSubAttributesBox] = useState<any[]>([]);

  const [selectedRootCategoriesIndex, setSelectedRootCategoriesIndex] =
    React.useState(0);

  const [selectedRootCategoriesValue, setSelectedRootCategoriesValue] =
    React.useState("");

  const [selectedSubCategoriesIndexes, setSelectedSubCategoriesIndexes] =
    React.useState<any[]>([]);

  const [selectedSubCategoriesValues, setSelectedSubCategoriesValues] =
    React.useState<any[]>([]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [selectedValue, setSelectedValue] = React.useState("");

  const [selectedAttributeIndex, setSelectedAttributeIndex] = React.useState(0);

  const [selectedAttributeValue, setSelectedAttributeValue] =
    React.useState("");

  const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false);

  const [addCategoryInfo, setAddCategoryInfo] = useState<AddCategoryInfo>({
    id: 0,
    name: "",
    description: "",
    banner: "",
    icon: "",
    parent_id: 0,
  });

  const [addCategoryError, setAddCategoryError] = useState<AddCategoryError>({
    id: false,
    name: false,
    description: false,
    banner: false,
    icon: false,
    parent_id: false,
  });

  const [addCategoryHelperText, setAddCategoryHelperText] =
    useState<AddCategoryHelperText>({
      id: "",
      name: "",
      description: "",
      banner: "",
      icon: "",
      parent_id: "",
    });

  const [showAttributeForm, setShowAttributeForm] = useState<boolean>(false);

  const [addAttributeInfo, setAddAttributeInfo] = useState<AddAttributeInfo>({
    id: 0,
    name: "",
    category_id: 0,
    parent: 0,
  });

  const [addAttributeError, setAddAttributeError] = useState<AddAttributeError>(
    {
      id: false,
      name: false,
      category_id: false,
      parent: false,
    }
  );

  const [addAttributeHelperText, setAddAttributeHelperText] =
    useState<AddAttributeHelperText>({
      id: "",
      name: "",
      category_id: "",
      parent: "",
    });

  const [showSubAttributeForm, setShowSubAttributeForm] =
    useState<boolean>(false);

  const [addSubAttributeData, setAddSubAttributeData] =
    useState<AddSubAttributeData>();

  const [addSubAttributeInfo, setAddSubAttributeInfo] =
    useState<AddSubAttributeInfo>({
      id: 0,
      name: "",
      category_id: 0,
      parent: 0,
    });

  const [addSubAttributeError, setAddSubAttributeError] =
    useState<AddSubAttributeError>({
      id: false,
      name: false,
      category_id: false,
      parent: false,
    });

  const [addSubAttributeHelperText, setAddSubAttributeHelperText] =
    useState<AddSubAttributeHelperText>({
      id: "",
      name: "",
      category_id: "",
      parent: "",
    });

  const [loading, setLoading] = useState<boolean>(false);

  const [problem, setProblem] = useState<number>(0);

  const [formIsValidated, setFormIsValidated] = useState<boolean>(false);

  const [open, setOpen] = React.useState(false);

  const [response_status, setResponseStatus] = React.useState(false);

  const [response_message, setResponseMessage] = React.useState("");

  const handleTableEditClick = async (event, category) => {
    setLoading(false);
    setAddCategoryInfo((prev) => ({ ...prev, ["id"]: category.id }));
    setAddCategoryInfo((prev) => ({ ...prev, ["name"]: category.name }));
    setAddCategoryInfo((prev) => ({
      ...prev,
      ["description"]: category.description,
    }));
    setAddCategoryInfo((prev) => ({ ...prev, ["banner"]: category.banner }));
    setAddCategoryInfo((prev) => ({ ...prev, ["icon"]: category.icon }));
    setAddCategoryInfo((prev) => ({
      ...prev,
      ["parent_id"]: category.parent_id,
    }));
    setAddCategoryError((prev) => ({ ...prev, id: false }));
    setAddCategoryError((prev) => ({ ...prev, name: false }));
    setAddCategoryError((prev) => ({ ...prev, description: false }));
    setAddCategoryError((prev) => ({ ...prev, banner: false }));
    setAddCategoryError((prev) => ({ ...prev, icon: false }));
    setAddCategoryError((prev) => ({ ...prev, parent_id: false }));
    setAddCategoryHelperText((prev) => ({ ...prev, id: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, name: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, description: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, banner: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, icon: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, parent_id: "" }));
    setProblem(0);
    setFormIsValidated(false);
    setOpen(false);
    setResponseStatus(false);
    setResponseMessage("");
    setShowCategoryForm(true);
    setShowAttributeForm(false);
  };

  const handleTableDeleteClick = async (event, category) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      setLoading(true);
      const payload = {
        id: category.id,
      };
      const response_DeleteNonApprovedCategories = await fetch(
        `${BASE_URL}/category/delete`, //
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );
      const data_DeleteNonApprovedCategories =
        await response_DeleteNonApprovedCategories.json();
      if (data_DeleteNonApprovedCategories?.status) {
        toast.success(data_DeleteNonApprovedCategories?.message);
        const response_NonApprovedCategories = await fetch(
          `${BASE_URL}/category/pending_approval`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Auth.token()}`,
            },
          }
        );
        const data_NonApprovedCategories =
          await response_NonApprovedCategories.json();
        if (data_NonApprovedCategories?.status) {
          setNonApprovedCategories(data_NonApprovedCategories?.data);
        } else {
          setNonApprovedCategories([]);
        }
        setLoading(false);
      } else {
        toast.error(data_DeleteNonApprovedCategories?.data?.message);
        setLoading(false);
      }
    }
  };

  const handleListItemClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    category_id: number,
    category_name: string,
    index: number
  ) => {
    setSelectedIndex(category_id);
    setSelectedValue(category_name);
    setLoading(false);
    setAddCategoryInfo((prev) => ({ ...prev, ["id"]: category_id }));
    setAddCategoryInfo((prev) => ({ ...prev, ["name"]: category_name }));
    setAddCategoryError((prev) => ({ ...prev, id: false }));
    setAddCategoryError((prev) => ({ ...prev, name: false }));
    setAddCategoryError((prev) => ({ ...prev, description: false }));
    setAddCategoryError((prev) => ({ ...prev, banner: false }));
    setAddCategoryError((prev) => ({ ...prev, icon: false }));
    setAddCategoryError((prev) => ({ ...prev, parent_id: false }));
    setAddCategoryHelperText((prev) => ({ ...prev, id: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, name: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, description: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, banner: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, icon: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, parent_id: "" }));
    setProblem(0);
    setFormIsValidated(false);
    setOpen(false);
    setResponseStatus(false);
    setResponseMessage("");
    setShowCategoryForm(true);
    setShowAttributeForm(false);
    if (allApprovedSubCategoriesBoxes?.length) {
      allApprovedSubCategoriesBoxes.length = index + 1;
    }
    if (index == -1) {
      setSelectedRootCategoriesIndex(category_id);
      setSelectedRootCategoriesValue(category_name);
      selectedSubCategoriesIndexes.length = 0;
      selectedSubCategoriesValues.length = 0;
    }
    if (index != -1) {
      if (selectedSubCategoriesIndexes?.length) {
        selectedSubCategoriesIndexes.length = index;
      }
      if (selectedSubCategoriesValues?.length) {
        selectedSubCategoriesValues.length = index;
      }
      setSelectedSubCategoriesIndexes([
        ...selectedSubCategoriesIndexes,
        category_id,
      ]);
      setSelectedSubCategoriesValues([
        ...selectedSubCategoriesValues,
        category_name,
      ]);
    }
    // AllApprovedSubCategoriesBoxes
    const payload = {
      parent: category_id,
    };
    const response_AllApprovedSubCategoriesBoxes = await fetch(
      `${BASE_URL}/category/list`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      }
    );
    const data_AllApprovedSubCategoriesBoxes =
      await response_AllApprovedSubCategoriesBoxes.json();
    if (data_AllApprovedSubCategoriesBoxes?.status) {
      if (data_AllApprovedSubCategoriesBoxes?.data != "") {
        setAllApprovedSubCategoriesBoxes([
          ...allApprovedSubCategoriesBoxes,
          data_AllApprovedSubCategoriesBoxes?.data,
        ]);
      }
    }
  };

  const handleEditAttributeClick = async (event, attribute) => {
    setLoading(false);
    setAddAttributeInfo((prev) => ({ ...prev, ["id"]: attribute.id }));
    setAddAttributeInfo((prev) => ({ ...prev, ["name"]: attribute.name }));
    setAddAttributeInfo((prev) => ({
      ...prev,
      ["category_id"]: attribute.category_id,
    }));
    setAddAttributeInfo((prev) => ({ ...prev, ["parent"]: attribute.parent }));
    setAddAttributeError((prev) => ({ ...prev, id: false }));
    setAddAttributeError((prev) => ({ ...prev, name: false }));
    setAddAttributeError((prev) => ({ ...prev, category_id: false }));
    setAddAttributeError((prev) => ({ ...prev, parent: false }));
    setAddAttributeHelperText((prev) => ({ ...prev, id: "" }));
    setAddAttributeHelperText((prev) => ({ ...prev, name: "" }));
    setAddAttributeHelperText((prev) => ({ ...prev, category_id: "" }));
    setAddAttributeHelperText((prev) => ({ ...prev, parent: "" }));
    setProblem(0);
    setFormIsValidated(false);
    setOpen(false);
    setResponseStatus(false);
    setResponseMessage("");
  };

  const handleDeleteAttributeClick = async (event, attribute) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      setLoading(true);
      const payload = {
        id: attribute.id,
      };
      const response_DeleteRootAttributes = await fetch(
        `${BASE_URL}/attributes/delete`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
          },
        }
      );
      const data_DeleteRootAttributes =
        await response_DeleteRootAttributes.json();
      if (data_DeleteRootAttributes?.status) {
        toast.success(data_DeleteRootAttributes?.message);
        setAllRootAttributesBox([]);
        setShowSubAttributeForm(false);
        setAllSubAttributesBox([]);
        const attribute_payload = {
          category_id: selectedIndex,
          parent_id: 0,
        };
        const response_AllRootAttributesBoxes = await fetch(
          `${BASE_URL}/attributes/search`,
          {
            method: "POST",
            body: JSON.stringify(attribute_payload),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
            },
          }
        );
        const data_AllRootAttributesBoxes =
          await response_AllRootAttributesBoxes.json();
        if (data_AllRootAttributesBoxes?.status) {
          if (data_AllRootAttributesBoxes?.data != "") {
            setAllRootAttributesBox(data_AllRootAttributesBoxes?.data);
          }
        }
        setLoading(false);
      } else {
        toast.error(data_DeleteRootAttributes?.data?.message);
        setLoading(false);
      }
    }
  };

  const handleListAttributeClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    attrubute_id: number,
    attribute_name: string,
    index: number
  ) => {
    setSelectedAttributeIndex(attrubute_id);
    setSelectedAttributeValue(attribute_name);
    setLoading(false);
    setAddSubAttributeInfo((prev) => ({ ...prev, ["parent"]: attrubute_id }));
    setShowSubAttributeForm(true);
    setAllSubAttributesBox([]);
    const attribute_payload = {
      category_id: selectedIndex,
      parent_id: attrubute_id,
    };
    const response_AllSubAttributesBoxes = await fetch(
      `${BASE_URL}/attributes/search`,
      {
        method: "POST",
        body: JSON.stringify(attribute_payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      }
    );
    const data_AllSubAttributesBoxes =
      await response_AllSubAttributesBoxes.json();
    if (data_AllSubAttributesBoxes?.status) {
      if (data_AllSubAttributesBoxes?.data != "") {
        setAllSubAttributesBox(data_AllSubAttributesBoxes?.data);
      }
    }
  };

  const handleEditSubAttributeClick = async (event, attribute) => {
    setLoading(false);
    setAddSubAttributeInfo((prev) => ({ ...prev, ["id"]: attribute.id }));
    setAddSubAttributeInfo((prev) => ({ ...prev, ["name"]: attribute.name }));
    setAddSubAttributeInfo((prev) => ({
      ...prev,
      ["category_id"]: attribute.category_id,
    }));
    setAddSubAttributeInfo((prev) => ({
      ...prev,
      ["parent"]: attribute.parent,
    }));
    setAddSubAttributeError((prev) => ({ ...prev, id: false }));
    setAddSubAttributeError((prev) => ({ ...prev, name: false }));
    setAddSubAttributeError((prev) => ({ ...prev, category_id: false }));
    setAddSubAttributeError((prev) => ({ ...prev, parent: false }));
    setAddSubAttributeHelperText((prev) => ({ ...prev, id: "" }));
    setAddSubAttributeHelperText((prev) => ({ ...prev, name: "" }));
    setAddSubAttributeHelperText((prev) => ({ ...prev, category_id: "" }));
    setAddSubAttributeHelperText((prev) => ({ ...prev, parent: "" }));
    setProblem(0);
    setFormIsValidated(false);
    setOpen(false);
    setResponseStatus(false);
    setResponseMessage("");
  };

  const handleDeleteSubAttributeClick = async (event, attribute) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      setLoading(true);
      const payload = {
        id: attribute.id,
      };
      const response_DeleteSubAttributes = await fetch(
        `${BASE_URL}/attributes/delete`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
          },
        }
      );
      const data_DeleteSubAttributes =
        await response_DeleteSubAttributes.json();
      if (data_DeleteSubAttributes?.status) {
        toast.success(data_DeleteSubAttributes?.message);
        resetFieldsSubAttributes();
        setLoading(false);
      } else {
        toast.error(data_DeleteSubAttributes?.data?.message);
        setLoading(false);
      }
    }
  };

  const handleAddNewCategoryClick = () => {
    setLoading(false);
    setAddCategoryInfo((prev) => ({ ...prev, ["id"]: 0 }));
    setAddCategoryInfo((prev) => ({ ...prev, ["name"]: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, ["description"]: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, ["banner"]: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, ["icon"]: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, ["parent_id"]: selectedIndex }));
    setAddCategoryError((prev) => ({ ...prev, id: false }));
    setAddCategoryError((prev) => ({ ...prev, name: false }));
    setAddCategoryError((prev) => ({ ...prev, description: false }));
    setAddCategoryError((prev) => ({ ...prev, banner: false }));
    setAddCategoryError((prev) => ({ ...prev, icon: false }));
    setAddCategoryError((prev) => ({ ...prev, parent_id: false }));
    setAddCategoryHelperText((prev) => ({ ...prev, id: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, name: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, description: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, banner: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, icon: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, parent_id: "" }));
    setProblem(0);
    setFormIsValidated(false);
    setOpen(false);
    setResponseStatus(false);
    setResponseMessage("");
    setShowCategoryForm(true);
    setShowAttributeForm(false);
  };

  const handleAddAttributesClick = async () => {
    setShowCategoryForm(false);
    setAddAttributeInfo((prev) => ({
      ...prev,
      ["category_id"]: selectedIndex,
    }));
    setAddSubAttributeInfo((prev) => ({
      ...prev,
      ["category_id"]: selectedIndex,
    }));
    setShowAttributeForm(true);
    setAllRootAttributesBox([]);
    setShowSubAttributeForm(false);
    setAllSubAttributesBox([]);
    const attribute_payload = {
      category_id: selectedIndex,
      parent_id: 0,
    };
    const response_AllRootAttributesBoxes = await fetch(
      `${BASE_URL}/attributes/search`,
      {
        method: "POST",
        body: JSON.stringify(attribute_payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
      }
    );
    const data_AllRootAttributesBoxes =
      await response_AllRootAttributesBoxes.json();
    if (data_AllRootAttributesBoxes?.status) {
      if (data_AllRootAttributesBoxes?.data != "") {
        setAllRootAttributesBox(data_AllRootAttributesBoxes?.data);
      }
    }
    resetFieldsSubAttributes();
    resetFieldsAttributes();
  };

  const handleAddCategoryInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const name = e.target.id;
    setAddCategoryInfo((prev) => ({ ...prev, [name]: value }));
    if (name === "name") {
      if (value === "") {
        setAddCategoryError((prev) => ({ ...prev, [name]: true }));
        setAddCategoryHelperText((prev) => ({
          ...prev,
          [name]: "Required!",
        }));
      } else {
        setAddCategoryError((prev) => ({ ...prev, [name]: false }));
        setAddCategoryHelperText((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleAddAttributeInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const name = e.target.id;
    setAddAttributeInfo((prev) => ({ ...prev, [name]: value }));
    if (name === "name") {
      if (value === "") {
        setAddAttributeError((prev) => ({ ...prev, [name]: true }));
        setAddAttributeHelperText((prev) => ({
          ...prev,
          [name]: "Required!",
        }));
      } else {
        setAddAttributeError((prev) => ({ ...prev, [name]: false }));
        setAddAttributeHelperText((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleAddSubAttributeInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const name = e.target.id;
    setAddSubAttributeInfo((prev) => ({ ...prev, [name]: value }));
    if (name === "name") {
      if (value === "") {
        setAddSubAttributeError((prev) => ({ ...prev, [name]: true }));
        setAddSubAttributeHelperText((prev) => ({
          ...prev,
          [name]: "Required!",
        }));
      } else {
        setAddSubAttributeError((prev) => ({ ...prev, [name]: false }));
        setAddSubAttributeHelperText((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const onChangeBannerImage = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => {
        setAddCategoryInfo((prev) => ({
          ...prev,
          banner: reader.result.toString(),
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const onDeleteBannerImage = () => {
    setAddCategoryInfo((prev) => ({ ...prev, banner: "" }));
  };

  const onChangeIconImage = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => {
        setAddCategoryInfo((prev) => ({
          ...prev,
          icon: reader.result.toString(),
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const onDeleteIconImage = () => {
    setAddCategoryInfo((prev) => ({ ...prev, icon: "" }));
  };

  const handleSubmitCheck = () => {
    if (addCategoryError?.name) {
      return;
    }

    setProblem(0);
    // Name Validation
    if (addCategoryInfo.name == "") {
      setAddCategoryError((prev) => ({ ...prev, name: true }));
      setAddCategoryHelperText((prev) => ({
        ...prev,
        name: "Required!",
      }));
      setProblem(1);
    } else {
      setAddCategoryError((prev) => ({ ...prev, name: false }));
      setAddCategoryHelperText((prev) => ({ ...prev, name: "" }));
    }
    if (problem > 0) {
      setFormIsValidated((prev) => false);
    }
    if (problem == 0) {
      setFormIsValidated((prev) => true);
      if (!addCategoryError?.name && addCategoryInfo?.name) {
        handleSaveCategory();
      }
    }
  };

  const handleSaveCategory = () => {
    setLoading(true);
    if (addCategoryInfo?.name === "") {
      toast.error("please fill all the fields!");
      return;
    }
    setLoading(false);
    setLoading(true);
    if (addCategoryInfo.id == 0) {
      axios({
        method: "POST",
        url: `${BASE_URL}/category/create`,
        data: addCategoryInfo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      })
        .then((response) => {
          setLoading(false);
          if (response?.data?.status) {
            toast.success(response?.data?.message);
            resetFields();
          } else {
            toast.error(response?.data?.message[0]);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      axios({
        method: "POST",
        url: `${BASE_URL}/category/edit`,
        data: addCategoryInfo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      })
        .then((response) => {
          setLoading(false);
          if (response?.data?.status) {
            toast.success(response?.data?.message);
            resetFields();
          } else {
            toast.error(response?.data?.message[0]);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleCancel = async () => {
    setAllApprovedSubCategoriesBoxes([]);
    setSelectedRootCategoriesIndex(0);
    setSelectedRootCategoriesValue("");
    setSelectedSubCategoriesIndexes([]);
    setSelectedSubCategoriesValues([]);
    setSelectedIndex(0);
    setLoading(false);

    setAddCategoryInfo((prev) => ({ ...prev, id: 0 }));
    setAddCategoryInfo((prev) => ({ ...prev, description: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, name: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, banner: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, icon: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, parent_id: 0 }));

    setAddCategoryError((prev) => ({ ...prev, id: false }));
    setAddCategoryError((prev) => ({ ...prev, name: false }));
    setAddCategoryError((prev) => ({ ...prev, description: false }));
    setAddCategoryError((prev) => ({ ...prev, banner: false }));
    setAddCategoryError((prev) => ({ ...prev, icon: false }));
    setAddCategoryError((prev) => ({ ...prev, parent_id: false }));
    setAddCategoryHelperText((prev) => ({ ...prev, id: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, name: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, description: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, banner: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, icon: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, parent_id: "" }));
    setProblem(0);
    setFormIsValidated(false);
    setOpen(false);
    setResponseStatus(false);
    setResponseMessage("");
    setShowCategoryForm(false);
    // NonApprovedCategories
    const response_NonApprovedCategories = await fetch(
      `${BASE_URL}/category/pending_approval`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      }
    );
    const data_NonApprovedCategories =
      await response_NonApprovedCategories.json();
    if (data_NonApprovedCategories?.status) {
      setNonApprovedCategories(data_NonApprovedCategories?.data);
    } else {
      setNonApprovedCategories([]);
    }
  };

  const handleResetAttributeForm = async () => {
    resetFieldsAttributes();
  };

  const handleResetSubAttributeForm = async () => {
    resetFieldsSubAttributes();
  };

  const handleAddAttributeCheck = () => {
    if (addAttributeError?.name) {
      return;
    }
    setProblem(0);
    // Name Validation
    if (addAttributeInfo.name == "") {
      setAddAttributeError((prev) => ({ ...prev, name: true }));
      setAddAttributeHelperText((prev) => ({
        ...prev,
        name: "Required!",
      }));
      setProblem(1);
    } else {
      setAddAttributeError((prev) => ({ ...prev, name: false }));
      setAddAttributeHelperText((prev) => ({ ...prev, name: "" }));
    }
    if (problem > 0) {
      setFormIsValidated((prev) => false);
    }
    if (problem == 0) {
      setFormIsValidated((prev) => true);
      if (!addAttributeError?.name && addAttributeInfo?.name) {
        handleAddAttribute();
      }
    }
  };

  const handleAddAttribute = () => {
    setLoading(true);
    if (addAttributeInfo?.name === "") {
      toast.error("please fill all the fields!");
      return;
    }
    setLoading(false);
    setLoading(true);
    if (addAttributeInfo.id == 0) {
      axios({
        method: "POST",
        url: `${BASE_URL}/attributes/create`,
        data: addAttributeInfo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      })
        .then((response) => {
          setLoading(false);
          if (response?.data?.status) {
            toast.success(response?.data?.message);
            resetFieldsAttributes();
          } else {
            toast.error(response?.data?.message[0]);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      axios({
        method: "POST",
        url: `${BASE_URL}/attributes/edit`,
        data: addAttributeInfo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      })
        .then((response) => {
          setLoading(false);
          if (response?.data?.status) {
            toast.success(response?.data?.message);
            resetFieldsAttributes();
          } else {
            toast.error(response?.data?.message[0]);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleAddSubAttributeCheck = () => {
    if (addSubAttributeError?.name) {
      return;
    }
    setProblem(0);
    // Name Validation
    if (addSubAttributeInfo.name == "") {
      setAddSubAttributeError((prev) => ({ ...prev, name: true }));
      setAddSubAttributeHelperText((prev) => ({
        ...prev,
        name: "Required!",
      }));
      setProblem(1);
    } else {
      setAddSubAttributeError((prev) => ({ ...prev, name: false }));
      setAddSubAttributeHelperText((prev) => ({ ...prev, name: "" }));
    }
    if (problem > 0) {
      setFormIsValidated((prev) => false);
    }
    if (problem == 0) {
      setFormIsValidated((prev) => true);
      if (!addSubAttributeError?.name && addSubAttributeInfo?.name) {
        handleAddSubAttribute();
      }
    }
  };

  const handleAddSubAttribute = () => {
    setLoading(true);
    if (addSubAttributeInfo?.name === "") {
      toast.error("please fill all the fields!");
      return;
    }
    setLoading(false);
    setLoading(true);
    if (addSubAttributeInfo.id == 0) {
      axios({
        method: "POST",
        url: `${BASE_URL}/attributes/create`,
        data: addSubAttributeInfo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      })
        .then((response) => {
          setLoading(false);
          if (response?.data?.status) {
            toast.success(response?.data?.message);
            resetFieldsSubAttributes();
          } else {
            toast.error(response?.data?.message[0]);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      axios({
        method: "POST",
        url: `${BASE_URL}/attributes/edit`,
        data: addSubAttributeInfo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      })
        .then((response) => {
          setLoading(false);
          if (response?.data?.status) {
            toast.success(response?.data?.message);
            resetFieldsSubAttributes();
          } else {
            toast.error(response?.data?.message[0]);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const resetFields = async () => {
    setAllApprovedSubCategoriesBoxes([]);
    setSelectedRootCategoriesIndex(0);
    setSelectedRootCategoriesValue("");
    setSelectedSubCategoriesIndexes([]);
    setSelectedSubCategoriesValues([]);
    setSelectedIndex(0);
    setLoading(false);
    setAddCategoryInfo((prev) => ({ ...prev, id: 0 }));
    setAddCategoryInfo((prev) => ({ ...prev, name: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, description: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, banner: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, icon: "" }));
    setAddCategoryInfo((prev) => ({ ...prev, parent_id: 0 }));
    setAddCategoryError((prev) => ({ ...prev, id: false }));
    setAddCategoryError((prev) => ({ ...prev, name: false }));
    setAddCategoryError((prev) => ({ ...prev, description: false }));
    setAddCategoryError((prev) => ({ ...prev, banner: false }));
    setAddCategoryError((prev) => ({ ...prev, icon: false }));
    setAddCategoryError((prev) => ({ ...prev, parent_id: false }));
    setAddCategoryHelperText((prev) => ({ ...prev, id: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, name: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, description: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, banner: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, icon: "" }));
    setAddCategoryHelperText((prev) => ({ ...prev, parent_id: "" }));
    setAddAttributeInfo((prev) => ({ ...prev, id: 0 }));
    setAddAttributeInfo((prev) => ({ ...prev, name: "" }));
    setAddAttributeInfo((prev) => ({ ...prev, category_id: 0 }));
    setAddAttributeInfo((prev) => ({ ...prev, parent: 0 }));
    setAddAttributeError((prev) => ({ ...prev, id: false }));
    setAddAttributeError((prev) => ({ ...prev, name: false }));
    setAddAttributeError((prev) => ({ ...prev, category_id: false }));
    setAddAttributeError((prev) => ({ ...prev, parent: false }));
    setAddAttributeHelperText((prev) => ({ ...prev, id: "" }));
    setAddAttributeHelperText((prev) => ({ ...prev, name: "" }));
    setAddAttributeHelperText((prev) => ({ ...prev, category_id: "" }));
    setAddAttributeHelperText((prev) => ({ ...prev, parent: "" }));
    setProblem(0);
    setFormIsValidated(false);
    setOpen(false);
    setResponseStatus(false);
    setResponseMessage("");
    setShowCategoryForm(false);
    setShowAttributeForm(false);
    // NonApprovedCategories
    const response_NonApprovedCategories = await fetch(
      `${BASE_URL}/category/pending_approval`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      }
    );
    const data_NonApprovedCategories =
      await response_NonApprovedCategories.json();
    if (data_NonApprovedCategories?.status) {
      setNonApprovedCategories(data_NonApprovedCategories?.data);
    } else {
      setNonApprovedCategories([]);
    }
  };

  const resetFieldsAttributes = async () => {
    setLoading(false);
    setSelectedAttributeIndex(0);
    setSelectedAttributeValue("");
    setAddAttributeInfo((prev) => ({ ...prev, id: 0 }));
    setAddAttributeInfo((prev) => ({ ...prev, name: "" }));
    setAddAttributeInfo((prev) => ({ ...prev, category_id: selectedIndex }));
    setAddAttributeInfo((prev) => ({ ...prev, parent: 0 }));
    setAddAttributeError((prev) => ({ ...prev, id: false }));
    setAddAttributeError((prev) => ({ ...prev, name: false }));
    setAddAttributeError((prev) => ({ ...prev, category_id: false }));
    setAddAttributeError((prev) => ({ ...prev, parent: false }));
    setAddAttributeHelperText((prev) => ({ ...prev, id: "" }));
    setAddAttributeHelperText((prev) => ({ ...prev, name: "" }));
    setAddAttributeHelperText((prev) => ({ ...prev, category_id: "" }));
    setAddAttributeHelperText((prev) => ({ ...prev, parent: "" }));
    setProblem(0);
    setFormIsValidated(false);
    setOpen(false);
    setResponseStatus(false);
    setResponseMessage("");
    setShowSubAttributeForm(false);
    setAllSubAttributesBox([]);
    const attribute_payload = {
      category_id: selectedIndex,
      parent_id: 0,
    };
    const response_AllRootAttributesBoxes = await fetch(
      `${BASE_URL}/attributes/search`,
      {
        method: "POST",
        body: JSON.stringify(attribute_payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      }
    );
    const data_AllRootAttributesBoxes =
      await response_AllRootAttributesBoxes.json();
    if (data_AllRootAttributesBoxes?.status) {
      if (data_AllRootAttributesBoxes?.data != "") {
        setAllRootAttributesBox(data_AllRootAttributesBoxes?.data);
      }
    }
  };

  const resetFieldsSubAttributes = async () => {
    setLoading(false);
    setAddSubAttributeInfo((prev) => ({ ...prev, id: 0 }));
    setAddSubAttributeInfo((prev) => ({ ...prev, name: "" }));
    setAddSubAttributeInfo((prev) => ({ ...prev, category_id: selectedIndex }));
    setAddSubAttributeInfo((prev) => ({
      ...prev,
      parent: selectedAttributeIndex,
    }));
    setAddSubAttributeError((prev) => ({ ...prev, id: false }));
    setAddSubAttributeError((prev) => ({ ...prev, name: false }));
    setAddSubAttributeError((prev) => ({ ...prev, category_id: false }));
    setAddSubAttributeError((prev) => ({ ...prev, parent: false }));
    setAddSubAttributeHelperText((prev) => ({ ...prev, id: "" }));
    setAddSubAttributeHelperText((prev) => ({ ...prev, name: "" }));
    setAddSubAttributeHelperText((prev) => ({ ...prev, category_id: "" }));
    setAddSubAttributeHelperText((prev) => ({ ...prev, parent: "" }));
    setProblem(0);
    setFormIsValidated(false);
    setOpen(false);
    setResponseStatus(false);
    setResponseMessage("");
    setShowSubAttributeForm(true);
    setAllSubAttributesBox([]);
    // AllSubAttributesBoxes
    const attribute_payload = {
      category_id: selectedIndex,
      parent_id: selectedAttributeIndex,
    };
    const response_AllSubAttributesBoxes = await fetch(
      `${BASE_URL}/attributes/search`,
      {
        method: "POST",
        body: JSON.stringify(attribute_payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
        },
      }
    );
    const data_AllSubAttributesBoxes =
      await response_AllSubAttributesBoxes.json();
    if (data_AllSubAttributesBoxes?.status) {
      if (data_AllSubAttributesBoxes?.data != "") {
        setAllSubAttributesBox(data_AllSubAttributesBoxes?.data);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      // NonApprovedCategories
      const response_NonApprovedCategories = await fetch(
        `${BASE_URL}/category/pending_approval`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
          },
        }
      );
      const data_NonApprovedCategories =
        await response_NonApprovedCategories.json();
      if (data_NonApprovedCategories?.status) {
        setNonApprovedCategories(data_NonApprovedCategories?.data);
      } else {
        setNonApprovedCategories([]);
      }
      // AllApprovedRootCategoriesBox
      const payload = {
        parent: 0,
      };
      const response_AllApprovedRootCategoriesBox = await fetch(
        `${BASE_URL}/category/list`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`, // notice the Bearer before your token
          },
        }
      );
      const data_AllApprovedRootCategoriesBox =
        await response_AllApprovedRootCategoriesBox.json();
      if (data_AllApprovedRootCategoriesBox?.status) {
        setAllApprovedRootCategoriesBox(
          data_AllApprovedRootCategoriesBox?.data
        );
      } else {
        setAllApprovedRootCategoriesBox([]);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Add Catalog | Powercozmo</title>
      </Head>
      <OuterContainer>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Open Sans",
            fontSize: "30px",
            fontWeight: 700,
            lineHeight: "41px",
            letterSpacing: "0em",
            textAlign: "left",
            marginBottom: "15px",
          }}
          gutterBottom
        >
          My Categories
        </Typography>
        <Card variant="outlined" sx={{ marginBottom: "30px" }}>
          <CardContent>
            <Card variant="outlined" sx={{ marginBottom: "25px" }}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 500 }}
                  aria-label="custom pagination table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{
                            fontFamily: "Open Sans",
                            fontSize: "20px",
                            fontWeight: 700,
                            lineHeight: "27px",
                            letterSpacing: "0em",
                            textAlign: "left",
                          }}
                        >
                          Non Approved Categories
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ background: "#F6F8FB" }}>
                      <TableCell>#</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>PARENT CATEGORY</TableCell>
                      <TableCell>STATUS</TableCell>
                      <TableCell align="right">ACTIONS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? nonApprovedCategories.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : nonApprovedCategories
                    ).map((category, i) => (
                      <>
                        <TableRow
                          key={category.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{i + 1 + page * rowsPerPage}</TableCell>
                          <TableCell component="th" scope="row">
                            {category.name}
                          </TableCell>
                          <TableCell>{category.parent_name}</TableCell>
                          <TableCell>{"-"}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              aria-label="edit"
                              size="small"
                              onClick={(event) =>
                                handleTableEditClick(event, category)
                              }
                            >
                              <EditIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              color="error"
                              onClick={(event) =>
                                handleTableDeleteClick(event, category)
                              }
                            >
                              <DeleteIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={5}
                        count={nonApprovedCategories.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Card>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "Open Sans",
                    fontSize: "25px",
                    fontWeight: 700,
                    lineHeight: "27px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    padding: "14px 0px",
                  }}
                >
                  All Approved Categories
                  <IconButton
                    aria-label="verified"
                    size="small"
                    color="success"
                  >
                    <VerifiedIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Serach Category"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "Open Sans",
                fontSize: "15px",
                // fontWeight: 700,
                lineHeight: "18px",
                letterSpacing: "0em",
                textAlign: "left",
                padding: "10px 0",
              }}
            >
              Selected Categories :- <b>{selectedRootCategoriesValue}</b>
              {selectedSubCategoriesValues.map((sub_category: any) => (
                <>&nbsp;-&nbsp;{sub_category}</>
              ))}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent sx={{ padding: "0px !important" }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontFamily: "Open Sans",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "22px",
                        letterSpacing: "0em",
                        textAlign: "left",
                        padding: "16px",
                        paddingBottom: "16px",
                      }}
                    >
                      Add Root Category/Parent
                    </Typography>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        minHeight: 300,
                        maxHeight: 300,
                        "& ul": { padding: 0 },
                        padding: 0,
                      }}
                    >
                      {allApprovedRootCategoriesBox.map((category: any) => (
                        <>
                          <ListItemButton
                            selected={
                              selectedRootCategoriesIndex === category.id
                            }
                            onClick={(event) =>
                              handleListItemClick(
                                event,
                                category.id,
                                category.name,
                                -1
                              )
                            }
                          >
                            <ListItemText primary={category.name} />
                          </ListItemButton>
                          <Divider />
                        </>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              {allApprovedSubCategoriesBoxes.map(
                (
                  allApprovedSubCategoriesBox,
                  allApprovedSubCategoriesBoxKey
                ) => (
                  <>
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ padding: "0px !important" }}>
                          <List
                            sx={{
                              width: "100%",
                              bgcolor: "background.paper",
                              position: "relative",
                              overflow: "auto",
                              minHeight: 354,
                              maxHeight: 354,
                              "& ul": { padding: 0 },
                              padding: 0,
                            }}
                          >
                            {allApprovedSubCategoriesBox.map(
                              (category: any) => (
                                <>
                                  <ListItemButton
                                    selected={selectedSubCategoriesIndexes.includes(
                                      category.id
                                    )}
                                    onClick={(event) =>
                                      handleListItemClick(
                                        event,
                                        category.id,
                                        category.name,
                                        allApprovedSubCategoriesBoxKey
                                      )
                                    }
                                  >
                                    <ListItemText primary={category.name} />
                                  </ListItemButton>
                                  <Divider />
                                </>
                              )
                            )}
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                )
              )}
            </Grid>
            <Button
              variant="outlined"
              color="error"
              onClick={handleAddNewCategoryClick}
              sx={{
                marginTop: "24px",
                fontFamily: "Open Sans",
                fontSize: "13px",
                fontWeight: 700,
                lineeHight: "18px",
                letterSpacing: "0em",
                textAlign: "center",
                textTransform: "capitalize",
                borderRadius: "6px",
              }}
            >
              Add New Category
            </Button>
            {selectedIndex != 0 ? (
              <Button
                variant="outlined"
                color="error"
                onClick={handleAddAttributesClick}
                sx={{
                  marginTop: "24px",
                  fontFamily: "Open Sans",
                  fontSize: "13px",
                  fontWeight: 700,
                  lineeHight: "18px",
                  letterSpacing: "0em",
                  textAlign: "center",
                  textTransform: "capitalize",
                  borderRadius: "6px",
                  marginLeft: "10px",
                }}
              >
                Add Attributes
              </Button>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
        {showCategoryForm ? (
          <Card variant="outlined" sx={{ marginBottom: "30px" }}>
            <CardContent sx={{ paddingTop: "24px" }}>
              <Grid container spacing={2}>
                {addCategoryInfo?.id == 0 ? (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{ paddingTop: "5px !important" }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontFamily: "Open Sans",
                        fontSize: "20px",
                        fontWeight: 700,
                        lineHeight: "27px",
                        letterSpacing: "0em",
                        textAlign: "left",
                      }}
                    >
                      Add Category
                    </Typography>
                  </Grid>
                ) : (
                  ""
                )}
                <Grid item xs={12} md={12}>
                  <TextField
                    type="text"
                    error={addCategoryError?.name}
                    helperText={addCategoryHelperText?.name}
                    variant="outlined"
                    fullWidth
                    label="Category Name"
                    id="name"
                    value={addCategoryInfo?.name}
                    onChange={handleAddCategoryInfoChange}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    error={addCategoryError?.description}
                    helperText={addCategoryHelperText?.description}
                    variant="outlined"
                    fullWidth
                    label="Description"
                    id="description"
                    value={addCategoryInfo?.description}
                    onChange={handleAddCategoryInfoChange}
                    multiline
                    rows={5}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button variant="contained" component="label">
                    Upload Banner
                    <input
                      hidden
                      type="file"
                      onChange={onChangeBannerImage}
                      accept="image/*"
                      id="banner"
                    />
                  </Button>
                  {addCategoryInfo?.banner ? (
                    <>
                      <ImageList sx={{ width: "100%", marginTop: "30px" }}>
                        <ImageListItem key={addCategoryInfo?.banner}>
                          <Image
                            src={addCategoryInfo?.banner}
                            height={200}
                            width={200}
                            alt={"Banner"}
                            loading="lazy"
                          />
                          <ImageListItemBar
                            title={"Banner"}
                            subtitle={""}
                            actionIcon={
                              <IconButton
                                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                aria-label={`info about ${"Banner"}`}
                                color="error"
                                onClick={(event) => onDeleteBannerImage()}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          />
                        </ImageListItem>
                      </ImageList>
                    </>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button variant="contained" component="label">
                    Upload Icon
                    <input
                      hidden
                      type="file"
                      onChange={onChangeIconImage}
                      accept="image/*"
                      id="icon"
                    />
                  </Button>
                  {addCategoryInfo?.icon ? (
                    <>
                      <ImageList sx={{ width: "100%", marginTop: "30px" }}>
                        <ImageListItem key={addCategoryInfo?.icon}>
                          <Image
                            height={200}
                            width={200}
                            src={addCategoryInfo?.icon}
                            alt={"Icon"}
                            loading="lazy"
                          />
                          <ImageListItemBar
                            title={"Icon"}
                            subtitle={""}
                            actionIcon={
                              <IconButton
                                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                aria-label={`info about ${"Icon"}`}
                                color="error"
                                onClick={(event) => onDeleteIconImage()}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          />
                        </ImageListItem>
                      </ImageList>
                    </>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={handleCancel}
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "13px",
                      fontWeight: 700,
                      lineeHight: "18px",
                      letterSpacing: "0em",
                      textAlign: "center",
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      padding: "15px 0px",
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={handleSubmitCheck}
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "13px",
                      fontWeight: 700,
                      lineeHight: "18px",
                      letterSpacing: "0em",
                      textAlign: "center",
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      padding: "15px 0px",
                    }}
                  >
                    Save Category
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          ""
        )}
        {showAttributeForm ? (
          <Card variant="outlined" sx={{ marginBottom: "30px" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "24px",
                      fontWeight: 700,
                      lineHeight: "27px",
                      letterSpacing: "0em",
                      textAlign: "left",
                      marginBottom: "10px",
                    }}
                  >
                    {selectedValue}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: "27px",
                      letterSpacing: "0em",
                      textAlign: "left",
                    }}
                  >
                    My Attributes Definition
                  </Typography>
                  <Card variant="outlined" sx={{ marginTop: "10px" }}>
                    <CardContent sx={{ paddingTop: "24px" }}>
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={12}
                          md={12}
                          sx={{ paddingTop: "5px !important" }}
                        >
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{
                              fontFamily: "Open Sans",
                              fontSize: "16px",
                              fontWeight: 700,
                              lineHeight: "27px",
                              letterSpacing: "0em",
                              textAlign: "left",
                            }}
                          >
                            Custom Specification
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            error={addAttributeError?.name}
                            helperText={addAttributeHelperText?.name}
                            variant="outlined"
                            fullWidth
                            label="Specification Name"
                            placeholder="Size, Color, Weight etc..."
                            id="name"
                            value={addAttributeInfo?.name}
                            onChange={handleAddAttributeInfoChange}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            onClick={handleResetAttributeForm}
                            sx={{
                              fontFamily: "Open Sans",
                              fontSize: "13px",
                              fontWeight: 700,
                              lineeHight: "18px",
                              letterSpacing: "0em",
                              textAlign: "center",
                              textTransform: "capitalize",
                              borderRadius: "6px",
                              padding: "15px 0px",
                            }}
                          >
                            Reset
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={handleAddAttributeCheck}
                            sx={{
                              fontFamily: "Open Sans",
                              fontSize: "13px",
                              fontWeight: 700,
                              lineeHight: "18px",
                              letterSpacing: "0em",
                              textAlign: "center",
                              textTransform: "capitalize",
                              borderRadius: "6px",
                              padding: "15px 0px",
                            }}
                          >
                            Save Specification
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ padding: "0px !important" }}>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontFamily: "Open Sans",
                          fontSize: "16px",
                          fontWeight: 700,
                          lineHeight: "22px",
                          letterSpacing: "0em",
                          textAlign: "left",
                          padding: "16px",
                          paddingBottom: "16px",
                        }}
                      >
                        Specifications
                      </Typography>
                      <List
                        sx={{
                          width: "100%",
                          bgcolor: "background.paper",
                          position: "relative",
                          overflow: "auto",
                          minHeight: 330,
                          maxHeight: 330,
                          "& ul": { padding: 0 },
                          padding: 0,
                        }}
                      >
                        {allRootAttributesBox.map((attribute: any) => (
                          <>
                            <ListItem
                              key={attribute.id}
                              secondaryAction={
                                <>
                                  <IconButton
                                    aria-label="edit"
                                    size="small"
                                    onClick={(event) =>
                                      handleEditAttributeClick(event, attribute)
                                    }
                                  >
                                    <EditIcon sx={{ fontSize: 18 }} />
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    size="small"
                                    color="error"
                                    onClick={(event) =>
                                      handleDeleteAttributeClick(
                                        event,
                                        attribute
                                      )
                                    }
                                  >
                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                  </IconButton>
                                </>
                              }
                              disablePadding
                            >
                              <ListItemButton
                                selected={
                                  selectedAttributeIndex === attribute.id
                                }
                                onClick={(event) =>
                                  handleListAttributeClick(
                                    event,
                                    attribute.id,
                                    attribute.name,
                                    -1
                                  )
                                }
                                dense
                              >
                                <ListItemText
                                  id={attribute.id}
                                  primary={attribute.name}
                                />
                              </ListItemButton>
                            </ListItem>
                            <Divider />
                          </>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                  {showSubAttributeForm ? (
                    <Card variant="outlined" sx={{ marginBottom: "0px" }}>
                      <CardContent
                        sx={{
                          paddingTop: "24px",
                          paddingBottom: "16px !important",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={12}
                            md={12}
                            sx={{ paddingTop: "5px !important" }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{
                                fontFamily: "Open Sans",
                                fontSize: "25px",
                                fontWeight: 700,
                                lineHeight: "27px",
                                letterSpacing: "0em",
                                textAlign: "left",
                              }}
                            >
                              {selectedAttributeValue}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              size="small"
                              error={addSubAttributeError?.name}
                              helperText={addSubAttributeHelperText?.name}
                              variant="outlined"
                              fullWidth
                              label={`Add more ${selectedAttributeValue} here.....`}
                              placeholder={`Add more ${selectedAttributeValue} here.....`}
                              id="name"
                              value={addSubAttributeInfo?.name}
                              onChange={handleAddSubAttributeInfoChange}
                            />
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Button
                              fullWidth
                              variant="outlined"
                              color="error"
                              onClick={handleResetSubAttributeForm}
                              sx={{
                                fontFamily: "Open Sans",
                                fontSize: "13px",
                                fontWeight: 700,
                                lineeHight: "18px",
                                letterSpacing: "0em",
                                textAlign: "center",
                                textTransform: "capitalize",
                                borderRadius: "6px",
                                padding: "8px 0px",
                              }}
                            >
                              Reset
                            </Button>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Button
                              fullWidth
                              variant="contained"
                              color="error"
                              onClick={handleAddSubAttributeCheck}
                              sx={{
                                fontFamily: "Open Sans",
                                fontSize: "13px",
                                fontWeight: 700,
                                lineeHight: "18px",
                                letterSpacing: "0em",
                                textAlign: "center",
                                textTransform: "capitalize",
                                borderRadius: "6px",
                                padding: "8px 0px",
                              }}
                            >
                              Save
                            </Button>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Card variant="outlined">
                              <CardContent sx={{ padding: "0px !important" }}>
                                <List
                                  sx={{
                                    width: "100%",
                                    bgcolor: "background.paper",
                                    position: "relative",
                                    overflow: "auto",
                                    minHeight: 250,
                                    maxHeight: 250,
                                    "& ul": { padding: 0 },
                                    padding: 0,
                                  }}
                                >
                                  {allSubAttributesBox.map((attribute: any) => (
                                    <>
                                      <ListItem
                                        key={attribute.id}
                                        secondaryAction={
                                          <>
                                            <IconButton
                                              aria-label="edit"
                                              size="small"
                                              onClick={(event) =>
                                                handleEditSubAttributeClick(
                                                  event,
                                                  attribute
                                                )
                                              }
                                            >
                                              <EditIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                            <IconButton
                                              aria-label="delete"
                                              size="small"
                                              color="error"
                                              onClick={(event) =>
                                                handleDeleteSubAttributeClick(
                                                  event,
                                                  attribute
                                                )
                                              }
                                            >
                                              <DeleteIcon
                                                sx={{ fontSize: 18 }}
                                              />
                                            </IconButton>
                                          </>
                                        }
                                        disablePadding
                                      >
                                        <ListItemButton dense>
                                          <ListItemText
                                            id={attribute.id}
                                            primary={attribute.name}
                                          />
                                        </ListItemButton>
                                      </ListItem>
                                      <Divider />
                                    </>
                                  ))}
                                </List>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          ""
        )}
      </OuterContainer>
    </>
  );
};
