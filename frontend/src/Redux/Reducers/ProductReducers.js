import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS, PRODUCT_LIST_RESET, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET, PRODUCT_DELETE_RESET, PRODUCT_SINGLE_REQUEST, PRODUCT_SINGLE_SUCCESS, PRODUCT_SINGLE_FAIL, PRODUCT_SINGLE_RESET,
  PRODUCT_CATEGORY_REQUEST, PRODUCT_CATEGORY_FAIL, PRODUCT_CATEGORY_RESET, PRODUCT_CATEGORY_SUCCESS, PRODUCT_IMPORT_REQUEST, PRODUCT_IMPORT_SUCCESS, PRODUCT_IMPORT_FAIL, PRODUCT_IMPORT_RESET, PRODUCT_ALL_REQUEST, PRODUCT_ALL_SUCCESS, PRODUCT_ALL_FAIL, PRODUCT_ALL_RESET, PRODUCT_CATEGORY_DRUG_REQUEST, PRODUCT_CATEGORY_DRUG_SUCCESS, PRODUCT_CATEGORY_DRUG_FAIL, PRODUCT_CATEGORY_DRUG_RESET, PRODUCT_LIST_WITH_QTY_REQUEST, PRODUCT_LIST_WITH_QTY_SUCCESS, PRODUCT_LIST_WITH_QTY_FAIL, PRODUCT_LIST_WITH_QTY_RESET 
} from '../Constants/ProductConstants';

// LIST PRODUCT
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false,
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage,
        products: action.payload}
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_RESET:
      return { products: [] };
    default:
      return state;
  }
};
// Product List with total in inventory
export const productListWithQtyReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_WITH_QTY_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_WITH_QTY_SUCCESS:
      return { loading: false,
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage,
        products: action.payload}
    case PRODUCT_LIST_WITH_QTY_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_WITH_QTY_RESET:
      return { products: [] };
    default:
      return state;
  }
};


// ALL PRODUCT
export const productAllReducer = (state = { productall: [] }, action) => {
  switch (action.type) {
    case PRODUCT_ALL_REQUEST:
      return { loading: true, productall: [] };
    case PRODUCT_ALL_SUCCESS:
      return { loading: false, productall: action.payload}
    case PRODUCT_ALL_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ALL_RESET:
      return { productall: [] };
    default:
      return state;
  }
};

// DELETE PRODUCT
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// CREATE PRODUCT
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// CATEGORIES PRODUCT
export const productCategoriesReducer = (state = {product:[]}, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return {...state, loading: true };
    case PRODUCT_CATEGORY_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CATEGORY_RESET:
      return {product:[]};
    default:
      return state;
  }
};

// CATEGORIES DRUG PRODUCT
export const productCategoriesDrugReducer = (state = {product:[]}, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_DRUG_REQUEST:
      return {...state, loading: true };
    case PRODUCT_CATEGORY_DRUG_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CATEGORY_DRUG_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CATEGORY_DRUG_RESET:
      return {product:[]};
    default:
      return state;
  }
};


// SINGLE PRODUCT
export const productSingleReducer = (state = {product:{}}, action) => {
  switch (action.type) {
    case PRODUCT_SINGLE_REQUEST:
      return {...state, loading: true };
    case PRODUCT_SINGLE_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_SINGLE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_SINGLE_RESET:
      return {product:{}};
    default:
      return state;
  }
};

// UPDATE PRODUCT
export const productUpdateReducer = (state = {product:{}}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {product:{}};
    default:
      return state;
  }
};

// IMPORT PRODUCT
export const productImportReducer = (state = {productImport: []}, action) => {
  switch (action.type) {
    case PRODUCT_IMPORT_REQUEST:
      return { loading: true };
    case PRODUCT_IMPORT_SUCCESS:
      return { loading: false, success: true, productImport: action.payload };
    case PRODUCT_IMPORT_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_IMPORT_RESET:
      return [];
    default:
      return state;
  }
};