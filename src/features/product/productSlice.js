import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchAllProducts,fetchProductsByFilters,fetchBrands,fetchCategories,fetchProductById} from "./productAPI";
const initialState = {
  products: [],
  status: 'idle',
  totalItems:0,
  brands:[],
  categories:[],
  selectedProduct:null
};


//actions for products
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    // console.log("slice",id)
    const response = await fetchProductById(id);
    console.log("data",response.data)
    return response.data;
  }
);


//actions for products
export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

//actions for brands
export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);


//actions for categories
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

//action product filters
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    return response.data;

  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
   
      state.value += 1;
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;

      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      //brands
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      //categories
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })

      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.products += action.payload;
        // state.products.concat(action.payload);
        state.selectedProduct = action.payload;

      })
  },
});

//action creators
export const { increment } = productSlice.actions;

//selectors
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
