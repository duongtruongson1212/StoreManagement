import { PROMOTION_LIST_REQUEST, PROMOTION_LIST_SUCCESS, PROMOTION_LIST_FAIL, PROMOTION_CREATE_FAIL, PROMOTION_CREATE_REQUEST, PROMOTION_CREATE_SUCCESS, PROMOTION_CREATE_RESET, PROMOTION_LIST_RESET, PROMOTION_UPDATE_REQUEST, PROMOTION_UPDATE_SUCCESS, PROMOTION_UPDATE_FAIL, PROMOTION_UPDATE_RESET, PROMOTION_DELETE_REQUEST, PROMOTION_DELETE_SUCCESS, PROMOTION_DELETE_FAIL, PROMOTION_DELETE_RESET ,
    PROMOTION_PRODUCT_LIST_REQUEST, PROMOTION_PRODUCT_LIST_SUCCESS, PROMOTION_PRODUCT_LIST_FAIL,PROMOTION_PRODUCT_LIST_RESET,
} from '../Constants/PromotionConstants';

export const promotionListReducer = (state = {promotions: []}, action)=>{
    switch(action.type) {
        case PROMOTION_LIST_REQUEST:
            return {loading: true, promotions: []};
        case PROMOTION_LIST_SUCCESS:
            return {loading: false, promotions: action.payload}
        case PROMOTION_LIST_FAIL:
            return {loading: false, error: action.payload};
        case PROMOTION_LIST_RESET:
            return {promotion: []};    
        default:
            return state;
    }
};

export const promotionCreateReducer = (state= {}, action) =>{
    switch (action.type) {
        case PROMOTION_CREATE_REQUEST:
            return {loading: true};
        case PROMOTION_CREATE_SUCCESS:
            return {loading: false, success: true, promotion: action.payload}
        case PROMOTION_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PROMOTION_CREATE_RESET:
            return {};  
        default:
            return state;
    }
};

export const promotionUpdateReducer = (state = {promotion:{}}, action) =>{
    switch (action.type) {
        case PROMOTION_UPDATE_REQUEST:
            return {loading: true};
        case PROMOTION_UPDATE_SUCCESS:
            return {loading: false, success: true, promotion: action.payload}
        case PROMOTION_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case PROMOTION_UPDATE_RESET:
            return {promotion: {}}
        default:
            return state
    }
}

export const promotionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PROMOTION_DELETE_REQUEST:
        return { loading: true };
      case PROMOTION_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PROMOTION_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case PROMOTION_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };

  
export const promotionProductListReducer = (state = {data:{}}, action) =>{
    switch (action.type) {
        case PROMOTION_PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PROMOTION_PRODUCT_LIST_SUCCESS:
            return {loading: false, success: true, data: action.payload,success:true}
        case PROMOTION_PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        case PROMOTION_PRODUCT_LIST_RESET:
            return {}
        default:
            return state
    }
}