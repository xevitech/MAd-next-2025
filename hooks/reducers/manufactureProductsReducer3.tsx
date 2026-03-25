// userSlice.js
import { apiClient } from '@/components/common/common';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { RootState,AppDispatch } from "redux/store";

// const router = useRouter();
// Step 2: Define the async thunk for fetching manufacture products data
export const MpFetch = createAsyncThunk('MpFetch', async () => {
    const token = localStorage.getItem("Token");
    const response = await apiClient("product/manufacture/seller_products", "GET", {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    // console.log("API Response:", response);
    return response; // Return the raw response
});
// working function above
// export const MpFiltered = createAsyncThunk(
//     'MpFiltered',
//     async ({ businessFilters1, cf, c, price }: { businessFilters1?: string[]; cf?: string[]; c?: string[]; price?: any[] } = {}, { getState }) => {        const token = localStorage.getItem("Token");
//         const queryParams = new URLSearchParams();

//         const token1 = localStorage.getItem("Token");
//         const state = getState() as RootState;
//                         const {businessFilters} = state.Mpreducer

//                         console.log("businessFilters.getState",businessFilters)


//                 // const {data,
//                 //     mainData,
//                 //     loading,
//                 //     error,
//                 //     permanentProductData,
//                 //     businessFilters, } = useSelector((state: RootState) => state.Mpreducer);
//         // Check if the id parameter is provided and is an array
//         // if (id && id.length > 0) {
//         //     // id.forEach(item => {
//         //     //     queryParams.append('business_type', item); // Append each id to queryParams with key 'business_name'
//         //     // });
//         //     const concatenatedBusiness = id.join(","); // Concatenate without any separator
//         //     queryParams.append('business_type', concatenatedBusiness); 
//         // }
//         if (businessFilters1 && businessFilters1.length > 0) {
//             businessFilters1.forEach(item => {
//                 queryParams.append('business_type', item); // Appends each business type individually
//             });
//         }
//         try {
//             // console.log("reducerfetchBEORE",id,c)
//             const response = await apiClient(`product/manufacture/seller_products?${queryParams.toString()}`, "GET", {
//                 headers: {
//                     Authorization: `Bearer ${token1}`,
//                     'Content-Type': 'application/json',
//                 }
//             });
//             // console.log('API Response:', response);
//             return response; // Return the filtered response
//         } catch (error) {
//             console.error("Error fetching filtered products:", error);
//             throw error; // Rethrow the error so that it can be caught in your slice
//         }
//     }
// );
// // Step 4: Create the manufacture product list slice
// const MpSlice = createSlice({
//     name: 'manufactureProduct',
//     initialState: {
//         data: [],
//         mainData:[],
//         loading: false,
//         error: null,
//         permanentProductData:[],
//         businessFilters: [], // This will hold the selected business filters
//     },
//     reducers: { 
//         setBusinessFilters: (state, action) => {
//             state.businessFilters = action.payload; // Update the business filters in the state
//             // router.push("")
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(MpFetch.pending, (state) => {
//                 state.loading = true; // Set loading to true when the request is pending
//             })
//         .addCase(MpFetch.fulfilled, (state, action) => {
//     const payload = Array.isArray(action.payload) ? action.payload : Object.values(action.payload);
//     state.loading = false;
//     state.mainData = [...payload]; // Create new references
//     state.data = [...payload];
//     state.permanentProductData = [...payload];
//     console.log("data", state.data, "permanentProductData", state.permanentProductData);
// })
//             .addCase(MpFetch.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message; 
//             })
//             .addCase(MpFiltered.pending, (state) => {
//                 state.loading = true;
//                 state.error = null; 
//             })
//             .addCase(MpFiltered.fulfilled, (state, action) => {
//                const payload = Array.isArray(action.payload) ? action.payload : Object.values(action.payload);
//                  state.loading = false;
//                  state.data =[...payload]
//                  console.log("MpFiltered.fulfilled", state.data);
//             })
//             .addCase(MpFiltered.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message; 
//             });
//     },
// });
// MpFiltered thunk now relies on Redux state for filters
export const MpFiltered = createAsyncThunk(
    'MpFiltered',
    async (_, { getState }) => { // No need for parameters now
        const token = localStorage.getItem("Token");
        if (!token) throw new Error("Authorization token is missing.");

        const state = getState() as RootState;
        const { bsf } = state.Mpreducer; // Get filters from Redux state

        const queryParams = new URLSearchParams();
        if (bsf && bsf.length > 0) {
            bsf.forEach(item => queryParams.append('business_type', item));
        }

        try {
            const response = await apiClient(`product/manufacture/seller_products?${queryParams}`, "GET", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            return response;
        } catch (error) {
            console.error("Error fetching filtered products:", error);
            throw error;
        }
    }
);

// setBusinessFilters action updates the filters and triggers the MpFiltered thunk
const MpSlice = createSlice({
    name: 'manufactureProduct',
    initialState: {
        data: [],
        mainData: [],
        loading: false,
        error: null,
        permanentProductData: [],
        bsf:[]
    },
    reducers: {
        bdsm: (state, action) => {
            console.log("Updating businessFilters in store:", action.payload);
            // Append the new id to the existing array, avoiding overwriting
            state.bsf = [...action.payload]
          console.log("state")
          },
      },
    extraReducers: (builder) => {
        builder
            .addCase(MpFetch.pending, (state) => {
                state.loading = true;
            })
            .addCase(MpFetch.fulfilled, (state, action) => {
                const payload = Array.isArray(action.payload) ? action.payload : Object.values(action.payload);
                state.loading = false;
                state.mainData = [...payload];
                state.data = [...payload];
                state.permanentProductData = [...payload];
            })
            .addCase(MpFetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(MpFiltered.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(MpFiltered.fulfilled, (state, action) => {
                const payload = Array.isArray(action.payload) ? action.payload : Object.values(action.payload);
                state.loading = false;
                state.data = [...payload];
            })
            .addCase(MpFiltered.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export const { bdsm } = MpSlice.actions;
// Step 5: Export the reducer
export default MpSlice.reducer; // Correct export









// // userSlice.js
// import { apiClient } from '@/components/common/common';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState, AppDispatch } from "redux/store";

// // Step 2: Define the async thunk for fetching manufacture products data
// export const Mp = createAsyncThunk(
//     'Mp',
//     async () => {
//         const token = localStorage.getItem("Token");
//         const response = await apiClient("product/manufacture/seller_products", "GET", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             }
//         });
//         return response; // Return the raw response
//     }
// );

// // Define the async thunk for fetching filtered products
// export const fetchFilteredProducts = createAsyncThunk(
//     'fetchFilteredProducts',
//     async ({ id, cf, c, price }: { id?: string[]; cf?: string[]; c?: string[]; price?: any[] } = {}) => {
//         const token = localStorage.getItem("Token");
//         const queryParams = new URLSearchParams();

//         // Append business types if provided
//         if (id && id.length > 0) {
//             id.forEach(item => {
//                 queryParams.append('business_type', item);
//             });
//         }

//         // Append country names if provided
//         if (c && c.length > 0) {
//             c.forEach(item => {
//                 queryParams.append('country_name', item);
//             });
//         }

//         // Append category names if provided
//         if (cf && cf.length > 0) {
//             cf.forEach(item => {
//                 queryParams.append('category_name', item);
//             });
//         }

//         // Make the API call with the parameters
//         try {
//             const response = await apiClient(`product/manufacture/seller_products?${queryParams.toString()}`, "GET", {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 }
//             });
//             return response; // Return the filtered response
//         } catch (error) {
//             console.error("Error fetching filtered products:", error);
//             throw error; // Rethrow the error to be handled in the slice
//         }
//     }
// );

// // Step 4: Create the manufacture product list slice
// const manufactureProductListSlice = createSlice({
//     name: 'manufactureProductList',
//     initialState: {
//         data: [],
//         loadingg: false,
//         error: null,
//         productsList: [],
//         categoryProductsList: [],
//         permanentProductData: []
//     },
//     reducers: {
//         setProductList: (state, action) => {
//             state.productsList = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(Mp.pending, (state) => {
//                 state.loadingg = true; // Set loading to true when the request is pending
//             })
//             .addCase(Mp.fulfilled, (state, action) => {
//                 state.loadingg = false; // Set loading to false when the request is fulfilled
//                 const payload = Array.isArray(action.payload) ? action.payload : Object.values(action.payload);
//                 state.data = payload;
//                 state.permanentProductData = payload; // Store original data for further filtering
//             })
//             .addCase(Mp.rejected, (state, action) => {
//                 state.loadingg = false; // Set loading to false when the request is rejected
//                 state.error = action.error.message; // Store the error message
//             })
//             .addCase(fetchFilteredProducts.pending, (state) => {
//                 state.loadingg = true; // Set loading to true when fetching filtered products
//                 state.error = null; // Reset error on new request
//             })
//             .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
//                 state.loadingg = false; // Set loading to false when the request is fulfilled
//                 state.data = Array.isArray(action.payload) ? action.payload : Object.values(action.payload); // Update state with filtered data
//             })
//             .addCase(fetchFilteredProducts.rejected, (state, action) => {
//                 state.loadingg = false; // Set loading to false when the request is rejected
//                 state.error = action.error .message; // Capture the error message
//             });
//     },
// });

// // Step 5: Export the reducer
// export default manufactureProductListSlice.reducer; // Correct export