import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/utils/staticValues";
import { blogListing } from "../Interface";
import { apiClient } from "@/components/common/common";

export const blog = createAsyncThunk("Blog List", async (payload: any) => {
  let { pages, search, category } = payload;
  let response = await fetch(
    `${BASE_URL}/blogs/getAll?page=${pages}&per_page=12&search=${search}&category=${category}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseJson = await response.json();
  return responseJson;
});

export const singleBlogDetail = createAsyncThunk(
  "Single Blog",
  async (payload: any) => {
    let response = await apiClient("blogs/getBlogDetails", "POST", {
      body: {slug:payload},
    });

    return response;
  }
);


export const recentBlogsList = createAsyncThunk(
  "Recent Blog",
  async (payload: any) => {
    let response = await apiClient(`blogs/recentList?take=${payload}`, "GET");
    return response;
  }
);

export const categoryOfBlogs = createAsyncThunk(
  "Blog Category",
  async (payload: any) => {
    let response = await apiClient(`blogs/categoryList?per_page=${payload}`, "GET");
    return response;
  }
);

const UseBlogList = createSlice({
  name: "blogs",
  initialState: {
    blogListed: [],
    blogListedTotal: null,
    singleBlog: null,
    loader: false,
    pageLoader: false,
    singleLoader:false,
    searchValue: "",
    recentBlogs:[],
    blogsCategory:[]
  } as blogListing,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(blog.pending, (state) => {
      state.pageLoader = true;
    });
    builder.addCase(blog.fulfilled, (state, action) => {
      state.blogListed = action.payload.data;
      state.blogListedTotal = action.payload.total;
      state.pageLoader = false;
    });
    builder.addCase(blog.rejected, (state) => {
      state.pageLoader = false;
    });
    builder.addCase(singleBlogDetail.pending, (state) => {
      state.singleLoader = true;
    });
    builder.addCase(singleBlogDetail.fulfilled, (state, action) => {
      state.singleBlog = action.payload.data;
      state.singleLoader = false;
    });
    builder.addCase(singleBlogDetail.rejected, (state, action) => {
      state.singleLoader = false;
    });
    builder.addCase(recentBlogsList.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(recentBlogsList.fulfilled, (state, action) => {
      state.recentBlogs = action.payload.data;
      state.loader = false;
    });
    builder.addCase(recentBlogsList.rejected, (state, action) => {
      state.loader = false;
    });
    builder.addCase(categoryOfBlogs.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(categoryOfBlogs.fulfilled, (state, action) => {
      state.blogsCategory= action.payload.data;
      state.loader = false;
    });
    builder.addCase(categoryOfBlogs.rejected, (state, action) => {
      state.loader = false;
    });
  },
});
export const { setSearchValue } = UseBlogList.actions;
export default UseBlogList;
