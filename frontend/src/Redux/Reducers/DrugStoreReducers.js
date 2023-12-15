import {
  DRUGSTORE_LIST_REQUEST,DRUGSTORE_LIST_FAIL,
  DRUGSTORE_LIST_SUCCESS,DRUGSTORE_LIST_RESET,DRUGSTORE_DELETE_REQUEST,DRUGSTORE_DELETE_SUCCESS,
  DRUGSTORE_DELETE_FAIL,DRUGSTORE_UPDATE_REQUEST,DRUGSTORE_UPDATE_SUCCESS,DRUGSTORE_UPDATE_FAIL,DRUGSTORE_UPDATE_RESET,DRUGSTORE_DELETE_RESET,DRUGSTORE_SINGLE_REQUEST,DRUGSTORE_SINGLE_SUCCESS,DRUGSTORE_SINGLE_FAIL,DRUGSTORE_SINGLE_RESET,
  DRUGSTORE_CATEGORY_REQUEST,DRUGSTORE_CATEGORY_FAIL,DRUGSTORE_CATEGORY_RESET,DRUGSTORE_CATEGORY_SUCCESS,DRUGSTORE_IMPORT_REQUEST,DRUGSTORE_IMPORT_SUCCESS,DRUGSTORE_IMPORT_FAIL,DRUGSTORE_IMPORT_RESET,DRUGSTORE_ALL_REQUEST,DRUGSTORE_ALL_SUCCESS,DRUGSTORE_ALL_FAIL,DRUGSTORE_ALL_RESET,DRUGSTORE_CATEGORY_DRUG_REQUEST,DRUGSTORE_CATEGORY_DRUG_SUCCESS,DRUGSTORE_CATEGORY_DRUG_FAIL,DRUGSTORE_CATEGORY_DRUG_RESET,
  DRUGSTORE_UPDATE_REVIEW_FAIL,
  DRUGSTORE_UPDATE_REVIEW_REQUEST,
  DRUGSTORE_UPDATE_REVIEW_RESET,
  DRUGSTORE_UPDATE_REVIEW_SUCCESS,
} from '../Constants/DrugStoreConstants';

// LIST PRODUCT
export const drugstoreListReducer=(state={drugstores: []},action) => {
  switch(action.type) {
    case DRUGSTORE_LIST_REQUEST:
      return {loading: true,drugstores: []};
    case DRUGSTORE_LIST_SUCCESS:
      return {
        loading: false,
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage,
        drugstores: action.payload
      }
    case DRUGSTORE_LIST_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_LIST_RESET:
      return {drugstores: []};
    default:
      return state;
  }
};

// ALL PRODUCT
export const drugstoreAllReducer=(state={drugstoreall: []},action) => {
  switch(action.type) {
    case DRUGSTORE_ALL_REQUEST:
      return {loading: true,drugstoreall: []};
    case DRUGSTORE_ALL_SUCCESS:
      return {loading: false,drugstoreall: action.payload}
    case DRUGSTORE_ALL_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_ALL_RESET:
      return {drugstoreall: []};
    default:
      return state;
  }
};

// DELETE PRODUCT
export const drugstoreDeleteReducer=(state={},action) => {
  switch(action.type) {
    case DRUGSTORE_DELETE_REQUEST:
      return {loading: true};
    case DRUGSTORE_DELETE_SUCCESS:
      return {loading: false,success: true};
    case DRUGSTORE_DELETE_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};


// CATEGORIES PRODUCT
export const drugstoreCategoriesReducer=(state={drugstore: []},action) => {
  switch(action.type) {
    case DRUGSTORE_CATEGORY_REQUEST:
      return {...state,loading: true};
    case DRUGSTORE_CATEGORY_SUCCESS:
      return {loading: false,success: true,drugstore: action.payload};
    case DRUGSTORE_CATEGORY_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_CATEGORY_RESET:
      return {drugstore: []};
    default:
      return state;
  }
};

// CATEGORIES DRUG PRODUCT
export const drugstoreCategoriesDrugReducer=(state={drugstore: []},action) => {
  switch(action.type) {
    case DRUGSTORE_CATEGORY_DRUG_REQUEST:
      return {...state,loading: true};
    case DRUGSTORE_CATEGORY_DRUG_SUCCESS:
      return {loading: false,success: true,drugstore: action.payload};
    case DRUGSTORE_CATEGORY_DRUG_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_CATEGORY_DRUG_RESET:
      return {drugstore: []};
    default:
      return state;
  }
};


// SINGLE PRODUCT
export const drugstoreSingleReducer=(state={drugstore: {}},action) => {
  switch(action.type) {
    case DRUGSTORE_SINGLE_REQUEST:
      return {...state,loading: true};
    case DRUGSTORE_SINGLE_SUCCESS:
      return {loading: false,drugstore: action.payload,success:true};
    case DRUGSTORE_SINGLE_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_SINGLE_RESET:
      return {drugstore: {}};
    default:
      return state;
  }
};

// UPDATE PRODUCT
export const drugstoreUpdateReducer=(state={drugstore: {}},action) => {
  switch(action.type) {
    case DRUGSTORE_UPDATE_REQUEST:
      return {loading: true};
    case DRUGSTORE_UPDATE_SUCCESS:
      return {loading: false,success: true,drugstore: action.payload};
    case DRUGSTORE_UPDATE_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_UPDATE_RESET:
      return {drugstore: {}};
    default:
      return state;
  }
};


export const drugstoreUpdateReviewReducer=(state={product: {}},action) => {
  switch(action.type) {
    case DRUGSTORE_UPDATE_REVIEW_REQUEST:
      return {loading: true};
    case DRUGSTORE_UPDATE_REVIEW_SUCCESS:
      return {loading: false,success: true,product: action.payload};
    case DRUGSTORE_UPDATE_REVIEW_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_UPDATE_REVIEW_RESET:
      return {product: {}};
    default:
      return state;
  }
};

// IMPORT PRODUCT
export const drugstoreImportReducer=(state={drugstoreImport: []},action) => {
  switch(action.type) {
    case DRUGSTORE_IMPORT_REQUEST:
      return {loading: true};
    case DRUGSTORE_IMPORT_SUCCESS:
      return {loading: false,success: true,drugstoreImport: action.payload};
    case DRUGSTORE_IMPORT_FAIL:
      return {loading: false,error: action.payload};
    case DRUGSTORE_IMPORT_RESET:
      return [];
    default:
      return state;
  }
};