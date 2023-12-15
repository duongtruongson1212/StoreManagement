import {
  INVENTORY_CHECK_CREATE_FAIL,
  INVENTORY_CHECK_CREATE_REQUEST,
  INVENTORY_CHECK_CREATE_RESET,
  INVENTORY_CHECK_CREATE_SUCCESS,

  INVENTORY_CHECK_LIST_REQUEST,
  INVENTORY_CHECK_LIST_SUCCESS,
  INVENTORY_CHECK_LIST_RESET,
  INVENTORY_CHECK_LIST_FAIL,

  INVENTORY_CHECK_LIST_ITEM_REQUEST,
  INVENTORY_CHECK_LIST_ITEM_SUCCESS,
  INVENTORY_CHECK_LIST_ITEM_RESET,
  INVENTORY_CHECK_LIST_ITEM_FAIL,

  INVENTORY_CHECK_DETAILS_SUCCESS,
  INVENTORY_CHECK_DETAILS_REQUEST,
  INVENTORY_CHECK_DETAILS_RESET,
  INVENTORY_CHECK_DETAILS_FAIL,

  INVENTORY_CHECK_UPDATE_SUCCESS,
  INVENTORY_CHECK_UPDATE_REQUEST,
  INVENTORY_CHECK_UPDATE_RESET,
  INVENTORY_CHECK_UPDATE_FAIL,

  INVENTORY_CHECK_STATUS_SUCCESS,
  INVENTORY_CHECK_STATUS_REQUEST,
  INVENTORY_CHECK_STATUS_RESET,
  INVENTORY_CHECK_STATUS_FAIL,
  INVENTORY_CHECK_CANCEL_REQUEST,
  INVENTORY_CHECK_CANCEL_SUCCESS,
  INVENTORY_CHECK_CANCEL_FAIL,
  INVENTORY_CHECK_CANCEL_RESET

} from "../Constants/InventoryCheckConstant";
import axios from "axios";
import { logout } from "./UserActions";

export const listInventoryCheck = ( keyword = " ", pageNumber = " ", from=' ', to = ' ') => async(dispatch, getState) =>{
  try {
      dispatch({type: INVENTORY_CHECK_LIST_REQUEST});
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const {data} = await axios.get(`/api/inventory-check/?keyword=${keyword}&pageNumber=${pageNumber}&from=${from}&to=${to}`, config)
      dispatch({type: INVENTORY_CHECK_LIST_SUCCESS, payload: data})
  } catch (error) {
      const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if(message === "Not authorized, token failed"){
          dispatch(logout());
      }
      dispatch({type: INVENTORY_CHECK_LIST_FAIL, payload: message});
      setTimeout(() => {
        dispatch({ type: INVENTORY_CHECK_LIST_RESET });
      }, 3000);
  }
}
// LIST ITEM

export const listItemInventoryCheck = (id) => async(dispatch, getState) =>{
  try {
      dispatch({type: INVENTORY_CHECK_LIST_ITEM_REQUEST});
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const {data} = await axios.get(`/api/inventory-check/category/${id}`, config)
      dispatch({type: INVENTORY_CHECK_LIST_ITEM_SUCCESS, payload: data})
  } catch (error) {
      const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if(message === "Not authorized, token failed"){
          dispatch(logout());
      }
      dispatch({type: INVENTORY_CHECK_LIST_ITEM_FAIL, payload: message});
      setTimeout(() => {
        dispatch({ type: INVENTORY_CHECK_LIST_ITEM_RESET });
      }, 3000);
  }
}

//ADMIN IMPORT STOCK SINGLE
export const singleInventoryCheck = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_CHECK_DETAILS_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/inventory-check/${id}`, config);
    dispatch({ type: INVENTORY_CHECK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORY_CHECK_DETAILS_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: INVENTORY_CHECK_DETAILS_RESET });
    }, 3000);
  }
};

//ADMIN IMPORT CREATE
export const createInventoryCheck =
  ({ user, checkedAt, note, checkItems }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: INVENTORY_CHECK_CREATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/inventory-check/`,
        {
          user,
          checkedAt,
          note,
          checkItems,
        },

        config
      );
      dispatch({ type: INVENTORY_CHECK_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: INVENTORY_CHECK_CREATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: INVENTORY_CHECK_CREATE_RESET });
      }, 3000);
    }
  };

//ADMIN IMPORT STATUS
export const statusInventoryCheck = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_CHECK_STATUS_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const { userLogin: {userInfo}} = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const { data } = await axios.put(`/api/inventory-check/${id}/status`,{}, config);
    dispatch({ type: INVENTORY_CHECK_STATUS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORY_CHECK_STATUS_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: INVENTORY_CHECK_STATUS_RESET });
    }, 3000);
  }
};

//ADMIN UPDATE IMPORT
export const updateInventoryCheck = ({ note, user, checkItems, checkedAt, checkId }) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_CHECK_UPDATE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const { userLogin: {userInfo}} = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const { data } = await axios.put(`/api/inventory-check/${checkId}`,
    { note, user, checkItems, checkedAt, checkId },
    config);
    dispatch({ type: INVENTORY_CHECK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORY_CHECK_UPDATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: INVENTORY_CHECK_UPDATE_RESET });
    }, 3000);
  }
};
//cancel
export const cancelInventoryCheck = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_CHECK_CANCEL_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const { userLogin: {userInfo}} = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const { data } = await axios.put(`/api/inventory-check/${id}/cancel`,{}, config);
    dispatch({ type: INVENTORY_CHECK_CANCEL_SUCCESS, payload: data });
  } catch (error) { 
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORY_CHECK_CANCEL_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: INVENTORY_CHECK_CANCEL_RESET });
    }, 3000);
  }
};