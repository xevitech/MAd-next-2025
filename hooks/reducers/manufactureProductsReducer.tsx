// userSlice.js
import { apiClient } from '@/components/common/common';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState,AppDispatch } from "redux/store";

// Step 2: Define the async thunk for fetching manufacture products data
export const fetchManufactureProductsData = createAsyncThunk('fetchManufactureProductsData', async () => {
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
// export const handleManufactureProductFilter: any = createAsyncThunk(
//     "More Products Filter",
//     async (payload, { getState, dispatch }, value = null) => {
//       return {};
//     }
//   );
// export const filterProductsByCountry = createAsyncThunk(
//     'filterProductsByCountry',
//     async (country_name, { getState }) => {
//         const state = getState();
//         const allProducts = state.manufactureProductList.data; // Get all products from the state

//         // Filter the products by the specified country_name
//         const filteredProducts = allProducts.filter(product => product.country_name === country_name);
//         return filteredProducts; // Return the filtered products
//     }
// );
export const handleManufactureFilter: any = createAsyncThunk(
    "More Products Filter",
    async (payload, { getState, dispatch }, value = null) => {
      return {};
    }
  );


  // Thunk to fetch filtered products based on selected countries
//   export const fetchFilteredProducts = createAsyncThunk(
//       'fetchFilteredProducts',
//       async (selectedCountries: string[]) => { // Add type annotation here
//           const token = localStorage.getItem("Token");
  
//           // Construct the query parameters for the selected countries
//           const params = new URLSearchParams();
//           console.log(`API Call: product/manufacture/seller_products?${params.toString()}`);
//           // Check if selectedCountries is an array and then iterate over it
//           if (Array.isArray(selectedCountries)) {
//               selectedCountries.forEach(country => {
//                   params.append('country_name', country);
//               });
//           }
          
  
//           // Make the API call with the selected countries as query parameters
//           try {
//               const response = await apiClient(`product/manufacture/seller_products?${params.toString()}`, "GET", {
//                   headers: {
//                       Authorization: `Bearer ${token}`,
//                       'Content-Type': 'application/json',
//                   }
//               });
//               console.log('API Response:', response);
//               return response; // Return the filtered response
//           } catch (error) {
//               console.error("Error fetching filtered products:", error);
//               throw error; // Rethrow the error so that it can be caught in your slice
//           }
//       }
//   );

// Define the async thunk for fetching filtered products

// Define the async thunk for fetching filtered products
// export const fetchFilteredProducts = createAsyncThunk(
//     'fetchFilteredProducts',
//     async (params: { selectedCategory?: string; selectedCountries?: string[] }) => { // Inline type definition
//         const token = localStorage.getItem("Token");
        
//         // Construct the query parameters
//         const queryParams = new URLSearchParams();

//         // Add the category parameter if provided
//         if (params.selectedCategory) {
//             queryParams.append('category_name', params.selectedCategory);
//         }

//         // Check if selectedCountries is an array and add them
//         if (Array.isArray(params.selectedCountries) && params.selectedCountries.length > 0) {
//             params.selectedCountries.forEach(country => {
//                 queryParams.append('country_name', country);
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
//             console.log('API Response:', response);
//             return response; // Return the filtered response
//         } catch (error) {
//             console.error("Error fetching filtered products:", error);
//             throw error; // Rethrow the error so that it can be caught in your slice
//         }
//     }
// );


// export const fetchFilteredProducts = createAsyncThunk(
//     'fetchFilteredProducts',
//     async (selectedCategory?: string[]) => {
//         const token = localStorage.getItem("Token");
//         const queryParams = new URLSearchParams();

//         if (selectedCategory) {
//             queryParams.append('category_name', selectedCategory);
//         }

//         try {
//             const response = await apiClient(`product/manufacture/seller_products?${queryParams.toString()}`, "GET", {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 }
//             });
//             console.log('API Response:', response);
//             return response; // Return the filtered response
//         } catch (error) {
//             console.error("Error fetching filtered products:", error);
//             throw error; // Rethrow the error so that it can be caught in your slice
//         }
//     }
// );

// Define the async thunk for fetching filtered products
// export const fetchFilteredProducts = createAsyncThunk(
//     'fetchFilteredProducts',
//     async (selectedCategories: string[] = []) => { // Accept an array of selectedCategories
//         const token = localStorage.getItem("Token");
//         const queryParams = new URLSearchParams();

//         // Add the category parameters if provided
//         if (selectedCategories.length > 0) {
//             selectedCategories.forEach(category => {
//                 queryParams.append('category_name', category);
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
//             console.log('API Response:', response);
//             return response; // Return the filtered response
//         } catch (error) {
//             console.error("Error fetching filtered products:", error);
//             throw error; // Rethrow the error so that it can be caught in your slice
//         }
//     }
// )
// working function above
export const fetchFilteredProducts = createAsyncThunk(
    'fetchFilteredProducts',
    async ({ id, cf,c,price }: { id?: string[]; cf?: string[],c?: string[],price?:any[] } = {}) => {
        const token = localStorage.getItem("Token");
        const queryParams = new URLSearchParams();

        // Check if the id parameter is provided and is an array
        // if (id && id.length > 0) {
        //     // id.forEach(item => {
        //     //     queryParams.append('business_type', item); // Append each id to queryParams with key 'business_name'
        //     // });
        //     const concatenatedBusiness = id.join(","); // Concatenate without any separator
        //     queryParams.append('business_type', concatenatedBusiness); 
        // }
        if (id && id.length > 0) {
            id.forEach(item => {
                queryParams.append('business_type', item); // Appends each business type individually
            });
        }

        // Add the category parameters if provided
        // if (checkedCategoryArray && checkedCategoryArray.length > 0) {
        //     checkedCategoryArray.forEach(category => {
        //         queryParams.append('category_name', category); // Append each category to queryParams with key 'category_name'
        //     });
        // }
    //     if (cf && cf.length > 0) {
    //       const concatenatedCountries = cf.join(","); // Concatenate without any separator
    //       queryParams.append('category_name', concatenatedCountries); // Append the concatenated string to queryParams
    //   }
    //     if (c && c.length > 0) {
    //         c.forEach(category => {
    //             queryParams.append('country_name', category); // Append each category to queryParams with key 'category_name'
    //         });
    //     }
    if (c && c.length > 0) {
        c.forEach(item => {
            queryParams.append('country_name', item); // Appends each business type individually
        });
    }
    if (cf && cf.length > 0) {
        cf.forEach(item => {
            queryParams.append('category_name', item); // Appends each business type individually
        });
    }

        // orignal b  
        // if (c && c.length > 0) {
        //     const concatenatedCountries = c.join(","); // Concatenate without any separator
        //     queryParams.append('country_name', concatenatedCountries); // Append the concatenated string to queryParams
        // }



        // if (price && price.length > 0) {
        //     id.forEach(item => {
        //         queryParams.append('business_type', item); // Append each id to queryParams with key 'business_name'
        //     });
        // }

        // Make the API call with the parameters
        try {
            // console.log("reducerfetchBEORE",id,c)
            const response = await apiClient(`product/manufacture/seller_products?${queryParams.toString()}`, "GET", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            // console.log('API Response:', response);
            return response; // Return the filtered response
        } catch (error) {
            console.error("Error fetching filtered products:", error);
            throw error; // Rethrow the error so that it can be caught in your slice
        }
    }
);



// Step 4: Create the manufacture product list slice
const manufactureProductListSlice = createSlice({
    name: 'manufactureProductList',
    initialState: {
        data: [],
        data2:[],
        loadingg: false,
        error: null,
        productsList:[],
        
        permanentProductData:[],
        businessFilters: [], // This will hold the selected business filters
        countryFilters: [], // This will hold the selected country name
        categoryFilters: [], // This will hold the selected category name
    },
    reducers: { setProductList: (state, action) => {
        state.productsList = action.payload;
      },
    
        setBusinessFilters: (state, action) => {
            state.businessFilters = action.payload; // Update the business filters in the state
        },
        setCountryName: (state, action) => {
            state.countryFilters = action.payload; // Update the selected country name
        },
        setCategoryName: (state, action) => {
            state.categoryFilters = action.payload; // Update the selected category 
    
    
    
    }},
    extraReducers: (builder) => {
        builder
            .addCase(fetchManufactureProductsData.pending, (state) => {
                state.loadingg = true; // Set loading to true when the request is pending
            })
            .addCase(fetchManufactureProductsData.fulfilled, (state, action) => {
                state.loadingg = false; // Set loading to false when the request is fulfilled
                // Transform the response into an array if necessary
                // state.data = action.payload
                // console.log("datainredux",action.payload)
              const payload=Array.isArray(action.payload) ? action.payload : Object.values(action.payload); 
              state.data=payload
              state.permanentProductData=payload
            })
            .addCase(fetchManufactureProductsData.rejected, (state, action) => {
                state.loadingg = false; // Set loading to false when the request is rejected
                state.error = action.error.message; // Store the error message
            })
            // .addCase(filterProductsByCountry.fulfilled, (state, action) => {
            //     state.filteredData = action.payload; // Store the filtered products
            // });
            .addCase(fetchFilteredProducts.pending, (state) => {
                state.loadingg = true;
                state.error = null; // Reset error on new request
            })
            .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
                state.loadingg = false;
                
                // Directly assign the payload to state.data
                 state.data = Array.isArray(action.payload) ? action.payload : Object.values(action.payload);
                // zupp.filter((i)=>{i.status!=200})
                console.log("fetchFilteredProducts.fulfilled", state.data);
            })
            
            .addCase(fetchFilteredProducts.rejected, (state, action) => {
                state.loadingg = false;
                state.error = action.error.message; // Capture the error message
            });
    },
});
export const { setBusinessFilters, setCountryName, setCategoryName } = manufactureProductListSlice.actions;
// Step 5: Export the reducer
export default manufactureProductListSlice.reducer; // Correct export









// // userSlice.js
// import { apiClient } from '@/components/common/common';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState, AppDispatch } from "redux/store";

// // Step 2: Define the async thunk for fetching manufacture products data
// export const fetchManufactureProductsData = createAsyncThunk(
//     'fetchManufactureProductsData',
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
//             .addCase(fetchManufactureProductsData.pending, (state) => {
//                 state.loadingg = true; // Set loading to true when the request is pending
//             })
//             .addCase(fetchManufactureProductsData.fulfilled, (state, action) => {
//                 state.loadingg = false; // Set loading to false when the request is fulfilled
//                 const payload = Array.isArray(action.payload) ? action.payload : Object.values(action.payload);
//                 state.data = payload;
//                 state.permanentProductData = payload; // Store original data for further filtering
//             })
//             .addCase(fetchManufactureProductsData.rejected, (state, action) => {
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