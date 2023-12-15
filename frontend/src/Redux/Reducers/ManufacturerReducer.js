import { MANUFACTURER_CREATE_FAIL, MANUFACTURER_CREATE_REQUEST, MANUFACTURER_CREATE_RESET, MANUFACTURER_CREATE_SUCCESS, MANUFACTURER_DELETE_FAIL, MANUFACTURER_DELETE_REQUEST, MANUFACTURER_DELETE_RESET, MANUFACTURER_DELETE_SUCCESS, MANUFACTURER_LIST_FAIL, MANUFACTURER_LIST_REQUEST, MANUFACTURER_LIST_RESET, MANUFACTURER_LIST_SUCCESS } from './../Constants/ManufacturerConstants';
export const ManufacturerListReducer = (state = { manufacturers: [] }, action) => {
    switch (action.type) {
      case MANUFACTURER_LIST_REQUEST:
        return { loading: true, manufacturers: [] };
      case MANUFACTURER_LIST_SUCCESS:
        return { loading: false, manufacturers: action.payload}
      case MANUFACTURER_LIST_FAIL:
        return { loading: false, error: action.payload };
      case MANUFACTURER_LIST_RESET:
        return { manufacturers: [] };
      default:
        return state;
    }
};

export const ManufacturerCreateReducer = (state= {}, action) =>{
    switch (action.type) {
        case MANUFACTURER_CREATE_REQUEST:
            return {loading: true};
        case MANUFACTURER_CREATE_SUCCESS:
            return {loading: false, success: true, manufacturers: action.payload}
        case MANUFACTURER_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case MANUFACTURER_CREATE_RESET:
            return {};  
        default:
            return state;
    }
};

export const ManufacturerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case MANUFACTURER_DELETE_REQUEST:
        return { loading: true };
      case MANUFACTURER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case MANUFACTURER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case MANUFACTURER_DELETE_RESET:
        return {};
      default:
        return state;
    }
};
