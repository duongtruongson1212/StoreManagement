
import { CATEGORY_DRUG_LIST_REQUEST, CATEGORY_DRUG_LIST_SUCCESS, CATEGORY_DRUG_LIST_FAIL, CATEGORY_DRUG_LIST_RESET, CATEGORY_DRUG_CREATE_REQUEST, CATEGORY_DRUG_CREATE_SUCCESS, CATEGORY_DRUG_CREATE_FAIL, CATEGORY_DRUG_CREATE_RESET, CATEGORY_DRUG_UPDATE_REQUEST, CATEGORY_DRUG_UPDATE_SUCCESS, CATEGORY_DRUG_UPDATE_FAIL, CATEGORY_DRUG_UPDATE_RESET, CATEGORY_DRUG_DELETE_REQUEST, CATEGORY_DRUG_DELETE_SUCCESS, CATEGORY_DRUG_DELETE_FAIL, CATEGORY_DRUG_DELETE_RESET } from './../Constants/CategoryDrugConstants';
export const categoryDrugListReducer = (state = {categoriesDrug: []}, action)=>{
    switch(action.type) {
        case CATEGORY_DRUG_LIST_REQUEST:
            return {loading: true, categoriesDrug: []};
        case CATEGORY_DRUG_LIST_SUCCESS:
            return {loading: false, categoriesDrug: action.payload}
        case CATEGORY_DRUG_LIST_FAIL:
            return {loading: false, error: action.payload};
        case CATEGORY_DRUG_LIST_RESET:
            return {category: []};    
        default:
            return state;
    }
};

export const categoryDrugCreateReducer = (state= {}, action) =>{
    switch (action.type) {
        case CATEGORY_DRUG_CREATE_REQUEST:
            return {loading: true};
        case CATEGORY_DRUG_CREATE_SUCCESS:
            return {loading: false, success: true, categoryDrug: action.payload}
        case CATEGORY_DRUG_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case CATEGORY_DRUG_CREATE_RESET:
            return {};  
        default:
            return state;
    }
};

export const categoryDrugUpdateReducer = (state = {categoryDrug:{}}, action) =>{
    switch (action.type) {
        case CATEGORY_DRUG_UPDATE_REQUEST:
            return {loading: true};
        case CATEGORY_DRUG_UPDATE_SUCCESS:
            return {loading: false, success: true, categoryDrug: action.payload}
        case CATEGORY_DRUG_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case CATEGORY_DRUG_UPDATE_RESET:
            return {category: {}}
        default:
            return state
    }
}

export const categoryDrugDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_DRUG_DELETE_REQUEST:
        return { loading: true };
      case CATEGORY_DRUG_DELETE_SUCCESS:
        return { loading: false, success: true };
      case CATEGORY_DRUG_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_DRUG_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };