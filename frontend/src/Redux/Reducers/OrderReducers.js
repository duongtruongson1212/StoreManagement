import { ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DELIVERED_RESET,
  
  ORDER_SEARCH_LIST_FAIL, ORDER_SEARCH_LIST_REQUEST, ORDER_SEARCH_LIST_SUCCESS,
  ORDER_SEARCH_D2D_LIST_FAIL, ORDER_SEARCH_D2D_LIST_REQUEST, ORDER_SEARCH_D2D_LIST_SUCCESS,
  ORDER_CANCELED_RESET, ORDER_CANCELED_SUCCESS, ORDER_CANCELED_REQUEST,ORDER_CANCELED_FAIL,
  ORDER_CONFORM_RESET, ORDER_CONFORM_SUCCESS, ORDER_CONFORM_REQUEST,ORDER_CONFORM_FAIL, ORDER_DELIVERED_FAIL,
  ORDER_COMPLETED_RESET, ORDER_COMPLETED_SUCCESS, ORDER_COMPLETED_REQUEST,ORDER_COMPLETED_FAIL


} from "../Constants/OrderConstants";


// ORDER LIST
export const orderListReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload,success:true };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  // ORDER LIST
export const orderSearchListReducer = (state = {orders:[]}, action) => {
  switch (action.type) {
    case ORDER_SEARCH_LIST_REQUEST:
      return { loading: true };
    case ORDER_SEARCH_LIST_SUCCESS:
      return { loading: false, orders: action.payload ,success:true};
    case ORDER_SEARCH_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

  // ORDER LIST
  export const orderSearchD2DListReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
      case ORDER_SEARCH_D2D_LIST_REQUEST:
        return { loading: true };
      case ORDER_SEARCH_D2D_LIST_SUCCESS:
        return { loading: false, orders: action.payload ,success:true};
      case ORDER_SEARCH_D2D_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

//ORDER DETAIL
export const orderDetailReducer  = (state = {loading : true, orderItems: [], shippingAddress: {}}, action) =>{
  switch(action.type){
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true};
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, orderItems: action.payload}
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload}
    default: 
      return state;
  }
}


//ORDER CONFORM
export const orderConformReducer  = (state= {}, action) =>{
  switch(action.type){
    case ORDER_CONFORM_REQUEST:
      return { loading: true};
    case ORDER_CONFORM_SUCCESS:
      return { loading: false, success: true}
    case ORDER_CONFORM_FAIL:
      return { loading: false, error: action.payload}
    case ORDER_CONFORM_RESET:
      return {}
    default: 
      return state;
  }
}

//ORDER DELIVERED
export const orderDeliveredReducer  = (state= {}, action) =>{
  switch(action.type){
    case ORDER_DELIVERED_REQUEST:
      return { loading: true};
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true}
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload}
    case ORDER_DELIVERED_RESET:
      return {}
    default: 
      return state;
  }
}


//ORDER CANCELED
export const orderCanceledReducer  = (state= {}, action) =>{
  switch(action.type){
    case ORDER_CANCELED_REQUEST:
      return { loading: true};
    case ORDER_CANCELED_SUCCESS:
      return { loading: false, success: true}
    case ORDER_CANCELED_FAIL:
      return { loading: false, error: action.payload}
    case ORDER_CANCELED_RESET:
      return {}
    default: 
      return state;
  }
}


//ORDER RECEIVED
export const orderReceivedReducer  = (state= {}, action) =>{
  switch(action.type){
    case ORDER_COMPLETED_REQUEST:
      return { loading: true};
    case ORDER_COMPLETED_SUCCESS:
      return { loading: false, success: true}
    case ORDER_COMPLETED_FAIL:
      return { loading: false, error: action.payload}
    case ORDER_COMPLETED_RESET:
      return {}
    default: 
      return state;
  }
}


//ORDER COMPLETED
export const orderCompletedReducer  = (state= {}, action) =>{
  switch(action.type){
    case ORDER_COMPLETED_REQUEST:
      return { loading: true};
    case ORDER_COMPLETED_SUCCESS:
      return { loading: false, success: true}
    case ORDER_COMPLETED_FAIL:
      return { loading: false, error: action.payload}
    case ORDER_COMPLETED_RESET:
      return {}
    default: 
      return state;
  }
}