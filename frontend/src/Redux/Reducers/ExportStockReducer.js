import { EXPORT_STOCK_CANCEL_FAIL, EXPORT_STOCK_CANCEL_REQUEST, EXPORT_STOCK_CANCEL_RESET, EXPORT_STOCK_CANCEL_SUCCESS, EXPORT_STOCK_CREATE_FAIL, EXPORT_STOCK_CREATE_REQUEST, EXPORT_STOCK_CREATE_RESET, EXPORT_STOCK_CREATE_SUCCESS, EXPORT_STOCK_DETAILS_FAIL, EXPORT_STOCK_DETAILS_REQUEST, EXPORT_STOCK_DETAILS_SUCCESS, EXPORT_STOCK_LIST_FAIL, EXPORT_STOCK_LIST_REQUEST, EXPORT_STOCK_LIST_SUCCESS, EXPORT_STOCK_STATUS_FAIL, EXPORT_STOCK_STATUS_REQUEST, EXPORT_STOCK_STATUS_RESET, EXPORT_STOCK_STATUS_SUCCESS, EXPORT_STOCK_UPDATE_FAIL, EXPORT_STOCK_UPDATE_REQUEST, EXPORT_STOCK_UPDATE_RESET, EXPORT_STOCK_UPDATE_SUCCESS } from '../Constants/ExportStockConstant'; 
  // EXPORT_STOCK LIST
export const exportStockListReducer = (state = {stockExported:[]}, action) => {
  switch (action.type) {
    case EXPORT_STOCK_LIST_REQUEST:
      return { loading: true, stockExported:[] };
    case EXPORT_STOCK_LIST_SUCCESS:
      return { loading: false,
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage,
        stockExported: action.payload}
    case EXPORT_STOCK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//EXPORT_STOCK DETAIL
export const exportStockDetailReducer = (state = {}, action) =>{
switch(action.type){
  case EXPORT_STOCK_DETAILS_REQUEST:
    return { ...state, loading: true};
  case EXPORT_STOCK_DETAILS_SUCCESS:
    return { loading: false, success: true, exportStockItem: action.payload}
  case EXPORT_STOCK_DETAILS_FAIL:
    return { loading: false, error: action.payload}
  default: 
    return state;
}
}
  // CREATE EXPORT_STOCK
  export const exportStockCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case EXPORT_STOCK_CREATE_REQUEST:
        return { loading: true };
      case EXPORT_STOCK_CREATE_SUCCESS:
        return { loading: false, success: true, exportStockCreated: action.payload };
      case EXPORT_STOCK_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case EXPORT_STOCK_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  // STATUS EXPORT_STOCK
  export const exportStockStatusReducer = (state = {}, action) => {
    switch (action.type) {
      case EXPORT_STOCK_STATUS_REQUEST:
        return { loading: true };
      case EXPORT_STOCK_STATUS_SUCCESS:
        return { loading: false, success: true, exportStockStatus: action.payload };
      case EXPORT_STOCK_STATUS_FAIL:
        return { loading: false, error: action.payload };
      case EXPORT_STOCK_STATUS_RESET:
        return {};
      default:
        return state;
    }
  };

  // UPDATE EXPORT STOCK
export const exportStockUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPORT_STOCK_UPDATE_REQUEST:
      return { loading: true };
    case EXPORT_STOCK_UPDATE_SUCCESS:
      return { loading: false, success: true, exportStockUpdated: action.payload };
    case EXPORT_STOCK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EXPORT_STOCK_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

  // CANCEL EXPORT_STOCK
  export const exportStockCancelReducer = (state = {}, action) => {
    switch (action.type) {
      case EXPORT_STOCK_CANCEL_REQUEST:
        return { loading: true };
      case EXPORT_STOCK_CANCEL_SUCCESS:
        return { loading: false, success: true, exportStockCancel: action.payload };
      case EXPORT_STOCK_CANCEL_FAIL:
        return { loading: false, error: action.payload };
      case EXPORT_STOCK_CANCEL_RESET:
        return {};
      default:
        return state;
    }
  };