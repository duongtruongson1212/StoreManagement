import { PROVIDER_LIST_REQUEST, PROVIDER_LIST_SUCCESS, PROVIDER_LIST_FAIL, PROVIDER_CREATE_FAIL, PROVIDER_CREATE_REQUEST, PROVIDER_CREATE_SUCCESS, PROVIDER_CREATE_RESET, PROVIDER_LIST_RESET, PROVIDER_UPDATE_REQUEST, PROVIDER_UPDATE_SUCCESS, PROVIDER_UPDATE_FAIL, PROVIDER_UPDATE_RESET, PROVIDER_DELETE_REQUEST, PROVIDER_DELETE_SUCCESS, PROVIDER_DELETE_FAIL, PROVIDER_DELETE_RESET, PROVIDER_SINGLE_SUCCESS, PROVIDER_SINGLE_RESET } from '../Constants/ProviderConstants';
import { PROVIDER_SINGLE_REQUEST, PROVIDER_SINGLE_FAIL } from './../Constants/ProviderConstants';

export const ProviderListReducer = (state = { providers: [] }, action) => {
    switch (action.type) {
      case PROVIDER_LIST_REQUEST:
        return { loading: true, providers: [] };
      case PROVIDER_LIST_SUCCESS:
        return { loading: false,
          totalPage: action.payload.totalPage,
          currentPage: action.payload.currentPage,
          providers: action.payload}
      case PROVIDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PROVIDER_LIST_RESET:
        return { providers: [] };
      default:
        return state;
    }
  };

// SINGLE PROVIDER
export const ProviderSingleReducer = (state = {provider:{}}, action) => {
  switch (action.type) {
    case PROVIDER_SINGLE_REQUEST:
      return {...state, loading: true };
    case PROVIDER_SINGLE_SUCCESS:
      return { loading: false, success: true, provider: action.payload };
    case PROVIDER_SINGLE_FAIL:
      return { loading: false, error: action.payload };
    case PROVIDER_SINGLE_RESET:
      return {provider:{}};
    default:
      return state;
  }
};

  
export const ProviderCreateReducer = (state= {}, action) =>{
    switch (action.type) {
        case PROVIDER_CREATE_REQUEST:
            return {loading: true};
        case PROVIDER_CREATE_SUCCESS:
            return {loading: false, success: true, provider: action.payload}
        case PROVIDER_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PROVIDER_CREATE_RESET:
            return {};  
        default:
            return state;
    }
};

export const ProviderUpdateReducer = (state = {provider:{}}, action) =>{
    switch (action.type) {
        case PROVIDER_UPDATE_REQUEST:
            return {loading: true};
        case PROVIDER_UPDATE_SUCCESS:
            return {loading: false, success: true, provider: action.payload}
        case PROVIDER_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case PROVIDER_UPDATE_RESET:
            return {PROVIDER: {}}
        default:
            return state
    }
}

export const ProviderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PROVIDER_DELETE_REQUEST:
        return { loading: true };
      case PROVIDER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PROVIDER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case PROVIDER_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };