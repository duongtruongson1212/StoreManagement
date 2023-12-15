import { REQ_INVENTORY_CANCEL_FAIL, REQ_INVENTORY_CANCEL_REQUEST, REQ_INVENTORY_CANCEL_RESET, REQ_INVENTORY_CANCEL_SUCCESS, REQ_INVENTORY_CREATE_FAIL, REQ_INVENTORY_CREATE_REQUEST, REQ_INVENTORY_CREATE_RESET, REQ_INVENTORY_CREATE_SUCCESS, REQ_INVENTORY_DETAILS_FAIL, REQ_INVENTORY_DETAILS_REQUEST, REQ_INVENTORY_DETAILS_SUCCESS, REQ_INVENTORY_LIST_FAIL, REQ_INVENTORY_LIST_REQUEST, REQ_INVENTORY_LIST_SUCCESS, REQ_INVENTORY_STATUS_FAIL, REQ_INVENTORY_STATUS_REQUEST, REQ_INVENTORY_STATUS_RESET, REQ_INVENTORY_STATUS_SUCCESS, REQ_INVENTORY_UPDATE_FAIL, REQ_INVENTORY_UPDATE_REQUEST, REQ_INVENTORY_UPDATE_RESET, REQ_INVENTORY_UPDATE_SUCCESS } from './../Constants/RequestInventoryConstant'; 
  // REQ_INVENTORY LIST
export const reqInventoryListReducer = (state = {reqInventory:[]}, action) => {
  switch (action.type) {
    case REQ_INVENTORY_LIST_REQUEST:
      return { loading: true, reqInventory: [] };
    case REQ_INVENTORY_LIST_SUCCESS:
      return { loading: false, reqInventory: action.payload}
    case REQ_INVENTORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//REQ_INVENTORY DETAIL
export const reqInventoryDetailReducer = (state = {}, action) =>{
switch(action.type){
  case REQ_INVENTORY_DETAILS_REQUEST:
    return { ...state, loading: true};
  case REQ_INVENTORY_DETAILS_SUCCESS:
    return { loading: false, success: true, reqInventoryItem: action.payload}
  case REQ_INVENTORY_DETAILS_FAIL:
    return { loading: false, error: action.payload}
  default: 
    return state;
}
}
  // CREATE REQ_INVENTORY
  export const reqInventoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case REQ_INVENTORY_CREATE_REQUEST:
        return { loading: true };
      case REQ_INVENTORY_CREATE_SUCCESS:
        return { loading: false, success: true, reqInventoryCreated: action.payload };
      case REQ_INVENTORY_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case REQ_INVENTORY_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  // STATUS REQ_INVENTORY
  export const reqInventoryStatusReducer = (state = {}, action) => {
    switch (action.type) {
      case REQ_INVENTORY_STATUS_REQUEST:
        return { loading: true };
      case REQ_INVENTORY_STATUS_SUCCESS:
        return { loading: false, success: true, reqInventoryStatus: action.payload };
      case REQ_INVENTORY_STATUS_FAIL:
        return { loading: false, error: action.payload };
      case REQ_INVENTORY_STATUS_RESET:
        return {};
      default:
        return state;
    }
  };

  // UPDATE REQ_INVENTORY
export const reqInventoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case REQ_INVENTORY_UPDATE_REQUEST:
      return { loading: true };
    case REQ_INVENTORY_UPDATE_SUCCESS:
      return { loading: false, success: true, reqInventoryUpdated: action.payload };
    case REQ_INVENTORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case REQ_INVENTORY_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

  // CANCEL REQ_INVENTORY
  export const reqInventoryCancelReducer = (state = {}, action) => {
    switch (action.type) {
      case REQ_INVENTORY_CANCEL_REQUEST:
        return { loading: true };
      case REQ_INVENTORY_CANCEL_SUCCESS:
        return { loading: false, success: true, reqInventoryCancel: action.payload };
      case REQ_INVENTORY_CANCEL_FAIL:
        return { loading: false, error: action.payload };
      case REQ_INVENTORY_CANCEL_RESET:
        return {};
      default:
        return state;
    }
  };