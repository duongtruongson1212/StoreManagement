import { INVENTORY_TAG_FAIL, INVENTORY_TAG_REQUEST, INVENTORY_TAG_RESET, INVENTORY_TAG_SUCCESS, INVENTORY_LIST_FAIL, INVENTORY_LIST_REQUEST, INVENTORY_LIST_RESET, INVENTORY_LIST_SUCCESS, INVENTORY_TO_CHECK_LIST_REQUEST, INVENTORY_TO_CHECK_LIST_SUCCESS, INVENTORY_TO_CHECK_LIST_FAIL, INVENTORY_TO_CHECK_LIST_RESET } from './../Constants/InventoryConstants';
  // INVENTORY LIST
  export const inventoryListReducer = (state = {inventories:[]}, action) => {
    switch (action.type) {
      case INVENTORY_LIST_REQUEST:
        return { loading: true, inventories: [] };
      case INVENTORY_LIST_SUCCESS:
        return { loading: false, inventories: action.payload}
      case INVENTORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      case INVENTORY_LIST_RESET:
        return {}
      default:
        return state;
    }
  };
  // TO CHECK
  export const inventoryToCheckListReducer = (state = {inventories:[]}, action) => {
    switch (action.type) {
      case INVENTORY_TO_CHECK_LIST_REQUEST:
        return { loading: true, inventories: [] };
      case INVENTORY_TO_CHECK_LIST_SUCCESS:
        return { loading: false, inventories: action.payload}
      case INVENTORY_TO_CHECK_LIST_FAIL:
        return { loading: false, error: action.payload };
      case INVENTORY_TO_CHECK_LIST_RESET:
        return {}
      default:
        return state;
    }
  };
  
  //INVENTORY TAG
  export const inventoryTagReducer = (state = {}, action) =>{
    switch(action.type){
      case INVENTORY_TAG_REQUEST:
        return { ...state, loading: true};
      case INVENTORY_TAG_SUCCESS:
        return { loading: false, success: true, inventoryItem: action.payload}
      case INVENTORY_TAG_FAIL:
        return { loading: false, error: action.payload}
      case INVENTORY_TAG_RESET:
        return {}
      default: 
        return state;
    }
  }  