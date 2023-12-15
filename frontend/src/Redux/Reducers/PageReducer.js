import { PAGE_CREATE_FAIL, PAGE_CREATE_REQUEST, PAGE_CREATE_RESET, PAGE_CREATE_SUCCESS, PAGE_DELETE_FAIL, PAGE_DELETE_REQUEST, PAGE_DELETE_RESET, PAGE_DELETE_SUCCESS, PAGE_LIST_FAIL, PAGE_LIST_REQUEST, PAGE_LIST_RESET, PAGE_LIST_SUCCESS } from '../Constants/PageConstants';
export const PageListReducer = (state = { pages: [] }, action) => {
    switch (action.type) {
      case PAGE_LIST_REQUEST:
        return { loading: true, pages: [] };
      case PAGE_LIST_SUCCESS:
        return { loading: false, pages: action.payload}
      case PAGE_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PAGE_LIST_RESET:
        return { pages: [] };
      default:
        return state;
    }
};

export const PageCreateReducer = (state= {}, action) =>{
    switch (action.type) {
        case PAGE_CREATE_REQUEST:
            return {loading: true};
        case PAGE_CREATE_SUCCESS:
            return {loading: false, success: true, pages: action.payload}
        case PAGE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PAGE_CREATE_RESET:
            return {};  
        default:
            return state;
    }
};

export const PageDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PAGE_DELETE_REQUEST:
        return { loading: true };
      case PAGE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PAGE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case PAGE_DELETE_RESET:
        return {};
      default:
        return state;
    }
};
