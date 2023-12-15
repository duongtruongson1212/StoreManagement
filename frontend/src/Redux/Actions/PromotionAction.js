import axios from 'axios';
import { PROMOTION_LIST_REQUEST, PROMOTION_LIST_SUCCESS, PROMOTION_LIST_FAIL, PROMOTION_CREATE_SUCCESS, PROMOTION_CREATE_FAIL, PROMOTION_CREATE_REQUEST, PROMOTION_UPDATE_REQUEST, PROMOTION_UPDATE_SUCCESS, PROMOTION_UPDATE_FAIL, PROMOTION_DELETE_REQUEST, PROMOTION_DELETE_SUCCESS, PROMOTION_DELETE_FAIL, PROMOTION_LIST_RESET, PROMOTION_CREATE_RESET, PROMOTION_UPDATE_RESET, PROMOTION_DELETE_RESET,
  PROMOTION_PRODUCT_LIST_REQUEST, PROMOTION_PRODUCT_LIST_SUCCESS, PROMOTION_PRODUCT_LIST_FAIL,PROMOTION_PRODUCT_LIST_RESET
} from '../Constants/PromotionConstants';
import { logout } from "./UserActions";
export const listPromotion = () => async(dispatch, getState) =>{
    try {
        dispatch({type: PROMOTION_LIST_REQUEST});
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/promotion/`, config)
        dispatch({type: PROMOTION_LIST_SUCCESS, payload: data})
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        if(message === "Not authorized, token failed"){
            dispatch(logout());
        }
        dispatch({type: PROMOTION_LIST_FAIL, payload: message});
        setTimeout(() => {
          dispatch({ type: PROMOTION_LIST_RESET });
        }, 3000);
    }
}

//ADMIN PROMOTION CREATE
export const createPromotion = ({ name, discount, startOn, endOn }) => async (dispatch, getState) => {
    try {
      dispatch({ type: PROMOTION_CREATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/promotion/`,
        {
          name, discount, startOn, endOn
        }
        , config);
      dispatch({ type: PROMOTION_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PROMOTION_CREATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: PROMOTION_CREATE_RESET });
      }, 3000);
    }
  };

//ADMIN UPDATE PROMOTION
export const updatePromotion = ({name, discount, startOn, endOn, promotionId}) => async(dispatch, getState)=>{
  try {
    dispatch({type: PROMOTION_UPDATE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/promotion/${promotionId}`, {
      name, discount, startOn, endOn
    }, config)
    dispatch({type: PROMOTION_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROMOTION_UPDATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: PROMOTION_UPDATE_RESET });
    }, 3000);
  }
}

// ADMIN PROMOTION DELETE
export const deletePromotion = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: PROMOTION_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/promotion/${id}`, config);
    dispatch({ type: PROMOTION_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROMOTION_DELETE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: PROMOTION_DELETE_RESET });
    }, 3000);
  }
};

//PROMOTION PRODUCT LIST
export const promotionProductList = (discountDitail) => async(dispatch, getState)=>{
  try {
    dispatch({type: PROMOTION_PRODUCT_LIST_REQUEST});
    
    const { data } = await axios.post(`/api/promotion/check`,{discountDitail})
    dispatch({type: PROMOTION_PRODUCT_LIST_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROMOTION_PRODUCT_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: PROMOTION_PRODUCT_LIST_RESET });
    }, 3000);
  }
}
