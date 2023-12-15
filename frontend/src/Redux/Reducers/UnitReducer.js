import { UNIT_CREATE_FAIL, UNIT_CREATE_REQUEST, UNIT_CREATE_RESET, UNIT_CREATE_SUCCESS, UNIT_DELETE_FAIL, UNIT_DELETE_REQUEST, UNIT_DELETE_RESET, UNIT_DELETE_SUCCESS, UNIT_LIST_FAIL, UNIT_LIST_REQUEST, UNIT_LIST_RESET, UNIT_LIST_SUCCESS } from './../Constants/UnitConstants';
export const UnitListReducer = (state = { units: [] }, action) => {
    switch (action.type) {
      case UNIT_LIST_REQUEST:
        return { loading: true, units: [] };
      case UNIT_LIST_SUCCESS:
        return { loading: false, units: action.payload}
      case UNIT_LIST_FAIL:
        return { loading: false, error: action.payload };
      case UNIT_LIST_RESET:
        return { providers: [] };
      default:
        return state;
    }
};

export const UnitCreateReducer = (state= {}, action) =>{
    switch (action.type) {
        case UNIT_CREATE_REQUEST:
            return {loading: true};
        case UNIT_CREATE_SUCCESS:
            return {loading: false, success: true, units: action.payload}
        case UNIT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case UNIT_CREATE_RESET:
            return {};  
        default:
            return state;
    }
};

export const UnitDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case UNIT_DELETE_REQUEST:
        return { loading: true };
      case UNIT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case UNIT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case UNIT_DELETE_RESET:
        return {};
      default:
        return state;
    }
};
