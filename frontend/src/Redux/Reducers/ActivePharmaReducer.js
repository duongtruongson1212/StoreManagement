import { API_CREATE_FAIL, API_CREATE_REQUEST, API_CREATE_RESET, API_CREATE_SUCCESS, API_DELETE_FAIL, API_DELETE_REQUEST, API_DELETE_RESET, API_DELETE_SUCCESS, API_LIST_FAIL, API_LIST_REQUEST, API_LIST_RESET, API_LIST_SUCCESS } from './../Constants/ActivePharmaConstants';
export const APIListReducer = (state = { API_item: [] }, action) => {
    switch (action.type) {
      case API_LIST_REQUEST:
        return { loading: true, API_item:[] };
      case API_LIST_SUCCESS:
        return { loading: false, API_item: action.payload}
      case API_LIST_FAIL:
        return { loading: false, error: action.payload };
      case API_LIST_RESET:
        return { API_item: [] };
      default:
        return state;
    }
};

export const APICreateReducer = (state= {}, action) =>{
    switch (action.type) {
        case API_CREATE_REQUEST:
            return {loading: true};
        case API_CREATE_SUCCESS:
            return {loading: false, success: true, API_item: action.payload}
        case API_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case API_CREATE_RESET:
            return {};  
        default:
            return state;
    }
};

export const APIDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case API_DELETE_REQUEST:
        return { loading: true };
      case API_DELETE_SUCCESS:
        return { loading: false, success: true };
      case API_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case API_DELETE_RESET:
        return {};
      default:
        return state;
    }
};
