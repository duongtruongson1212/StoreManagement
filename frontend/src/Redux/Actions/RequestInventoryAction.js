import { REQ_INVENTORY_CANCEL_FAIL, REQ_INVENTORY_CANCEL_REQUEST, REQ_INVENTORY_CANCEL_RESET, REQ_INVENTORY_CANCEL_SUCCESS, REQ_INVENTORY_CREATE_FAIL, REQ_INVENTORY_CREATE_REQUEST, REQ_INVENTORY_CREATE_RESET, REQ_INVENTORY_CREATE_SUCCESS, REQ_INVENTORY_DETAILS_FAIL, REQ_INVENTORY_DETAILS_REQUEST, REQ_INVENTORY_DETAILS_RESET, REQ_INVENTORY_DETAILS_SUCCESS, REQ_INVENTORY_LIST_FAIL, REQ_INVENTORY_LIST_REQUEST, REQ_INVENTORY_LIST_RESET, REQ_INVENTORY_LIST_SUCCESS, REQ_INVENTORY_STATUS_FAIL, REQ_INVENTORY_STATUS_REQUEST, REQ_INVENTORY_STATUS_RESET, REQ_INVENTORY_STATUS_SUCCESS, REQ_INVENTORY_UPDATE_FAIL, REQ_INVENTORY_UPDATE_REQUEST, REQ_INVENTORY_UPDATE_RESET, REQ_INVENTORY_UPDATE_SUCCESS } from './../Constants/RequestInventoryConstant';
import axios from 'axios';
import { logout } from "./UserActions";

export const listReqInventory = ( keyword = " ", pageNumber = " ", from=' ', to = ' ') => async(dispatch, getState) =>{
  try {
      dispatch({type: REQ_INVENTORY_LIST_REQUEST});
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      } 
      const {data} = await axios.get(`/api/req-inventory/?keyword=${keyword}&pageNumber=${pageNumber}&from=${from}&to=${to}`, config)
      dispatch({type: REQ_INVENTORY_LIST_SUCCESS, payload: data})
  } catch (error) {
      const message = error.response && error.response.data.message 
          ? error.response.data.message
          : error.message
      if(message === "Not authorized, token failed"){
          dispatch(logout());
      }
      dispatch({type: REQ_INVENTORY_LIST_FAIL, payload: message});
      setTimeout(() => {
        dispatch({ type: REQ_INVENTORY_LIST_RESET });
      }, 3000);
  }
}

//ADMIN REQ INVENTORY SINGLE
export const singleReqInventory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQ_INVENTORY_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/req-inventory/${id}`, config);
    dispatch({ type: REQ_INVENTORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REQ_INVENTORY_DETAILS_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: REQ_INVENTORY_DETAILS_RESET });
    }, 3000);
  }
};

//ADMIN IMPORT CREATE
export const createReqInventory = ({ provider, user, requestItems, note,  requestedAt }) => async (dispatch, getState) => {
    try {
      dispatch({ type: REQ_INVENTORY_CREATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/req-inventory/`,
        {
          provider, user, requestItems, note,  requestedAt
        }

        , config);
      dispatch({ type: REQ_INVENTORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: REQ_INVENTORY_CREATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: REQ_INVENTORY_CREATE_RESET });
      }, 3000);
    }
  };

  //ADMIN IMPORT STATUS
export const statusReqInventory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQ_INVENTORY_STATUS_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const { userLogin: {userInfo}} = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const { data } = await axios.put(`/api/req-inventory/${id}/status`,{}, config);
    dispatch({ type: REQ_INVENTORY_STATUS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REQ_INVENTORY_STATUS_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: REQ_INVENTORY_STATUS_RESET });
    }, 3000);
  }
};

  //ADMIN UPDATE IMPORT
  export const updateReqInventory = ({ provider, user, requestItems, note,  requestedAt, reqId }) => async (dispatch, getState) => {
    try {
      dispatch({ type: REQ_INVENTORY_UPDATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const { data } = await axios.put(`/api/req-inventory/${reqId}`,
      {  provider, user, requestItems, note,  requestedAt },
      config);
      dispatch({ type: REQ_INVENTORY_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: REQ_INVENTORY_UPDATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: REQ_INVENTORY_UPDATE_RESET });
      }, 3000);
    }
  };

  //ADMIN IMPORT CANCEL
  export const cancelReqInventory = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: REQ_INVENTORY_CANCEL_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const { data } = await axios.put(`/api/req-inventory/${id}/cancel`,{}, config);
      dispatch({ type: REQ_INVENTORY_CANCEL_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: REQ_INVENTORY_CANCEL_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: REQ_INVENTORY_CANCEL_RESET });
      }, 3000);
    }
  };