import { COUNTRY_CREATE_FAIL, COUNTRY_CREATE_REQUEST, COUNTRY_CREATE_RESET, COUNTRY_CREATE_SUCCESS, COUNTRY_DELETE_FAIL, COUNTRY_DELETE_REQUEST, COUNTRY_DELETE_RESET, COUNTRY_DELETE_SUCCESS, COUNTRY_LIST_FAIL, COUNTRY_LIST_REQUEST, COUNTRY_LIST_RESET, COUNTRY_LIST_SUCCESS } from './../Constants/CountryOfOriginConstants';
export const CountryListReducer = (state = { countries: [] }, action) => {
    switch (action.type) {
      case COUNTRY_LIST_REQUEST:
        return { loading: true, countries: [] };
      case COUNTRY_LIST_SUCCESS:
        return { loading: false, countries: action.payload}
      case COUNTRY_LIST_FAIL:
        return { loading: false, error: action.payload };
      case COUNTRY_LIST_RESET:
        return { countries: [] };
      default:
        return state;
    }
};

export const CountryCreateReducer = (state= {}, action) =>{
    switch (action.type) {
        case COUNTRY_CREATE_REQUEST:
            return {loading: true};
        case COUNTRY_CREATE_SUCCESS:
            return {loading: false, success: true, countries: action.payload}
        case COUNTRY_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case COUNTRY_CREATE_RESET:
            return {};  
        default:
            return state;
    }
};

export const CountryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COUNTRY_DELETE_REQUEST:
        return { loading: true };
      case COUNTRY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case COUNTRY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case COUNTRY_DELETE_RESET:
        return {};
      default:
        return state;
    }
};
