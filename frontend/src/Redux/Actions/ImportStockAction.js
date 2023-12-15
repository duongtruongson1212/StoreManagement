import { IMPORT_STOCK_CANCEL_FAIL, IMPORT_STOCK_CANCEL_REQUEST, IMPORT_STOCK_CANCEL_RESET, IMPORT_STOCK_CANCEL_SUCCESS, IMPORT_STOCK_CREATE_FAIL, IMPORT_STOCK_CREATE_REQUEST, IMPORT_STOCK_CREATE_RESET, IMPORT_STOCK_CREATE_SUCCESS, IMPORT_STOCK_DETAILS_FAIL, IMPORT_STOCK_DETAILS_REQUEST, IMPORT_STOCK_DETAILS_RESET, IMPORT_STOCK_DETAILS_SUCCESS, IMPORT_STOCK_LIST_FAIL, IMPORT_STOCK_LIST_REQUEST, IMPORT_STOCK_LIST_RESET, IMPORT_STOCK_LIST_SUCCESS, IMPORT_STOCK_STATUS_FAIL, IMPORT_STOCK_STATUS_REQUEST, IMPORT_STOCK_STATUS_RESET, IMPORT_STOCK_STATUS_SUCCESS, IMPORT_STOCK_UPDATE_FAIL, IMPORT_STOCK_UPDATE_REQUEST, IMPORT_STOCK_UPDATE_RESET, IMPORT_STOCK_UPDATE_SUCCESS } from './../Constants/ImportStockConstant';
import axios from 'axios';
import { logout } from "./UserActions";

export const listImportStock = ( keyword = " ", pageNumber = " ", from=' ', to = ' ') => async(dispatch, getState) =>{
  try {
      dispatch({type: IMPORT_STOCK_LIST_REQUEST});
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      } 
      const {data} = await axios.get(`/api/import-stock/?keyword=${keyword}&pageNumber=${pageNumber}&from=${from}&to=${to}`, config)
      dispatch({type: IMPORT_STOCK_LIST_SUCCESS, payload: data})
  } catch (error) {
      const message = error.response && error.response.data.message 
          ? error.response.data.message
          : error.message
      if(message === "Not authorized, token failed"){
          dispatch(logout());
      }
      dispatch({type: IMPORT_STOCK_LIST_FAIL, payload: message});
      setTimeout(() => {
        dispatch({ type: IMPORT_STOCK_LIST_RESET });
      }, 3000);
  }
}

//ADMIN IMPORT STOCK SINGLE
export const singleImportStock = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: IMPORT_STOCK_DETAILS_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/import-stock/${id}`, config);
    dispatch({ type: IMPORT_STOCK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: IMPORT_STOCK_DETAILS_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: IMPORT_STOCK_DETAILS_RESET });
    }, 3000);
  }
};

//ADMIN IMPORT CREATE
export const createImportStock = ({ provider, user, importItems, totalPrice, totalVAT, totalDiscount, invoiceNumber, invoiceSymbol, importedAt }) => async (dispatch, getState) => {
    try {
      dispatch({ type: IMPORT_STOCK_CREATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/import-stock/`,
        {
          provider, user, importItems, totalPrice, totalVAT, totalDiscount, invoiceNumber, invoiceSymbol, importedAt
        }

        , config);
      dispatch({ type: IMPORT_STOCK_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: IMPORT_STOCK_CREATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: IMPORT_STOCK_CREATE_RESET });
      }, 3000);
    }
  };

  //ADMIN IMPORT STATUS
export const statusImportStock = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: IMPORT_STOCK_STATUS_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const { userLogin: {userInfo}} = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const { data } = await axios.put(`/api/import-stock/${id}/status`,{}, config);
    dispatch({ type: IMPORT_STOCK_STATUS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: IMPORT_STOCK_STATUS_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: IMPORT_STOCK_STATUS_RESET });
    }, 3000);
  }
};

  //ADMIN UPDATE IMPORT
  export const updateImportStock = ({ provider, user, importItems, status, totalPrice, totalVAT, totalDiscount, invoiceNumber, invoiceSymbol, importedAt, importId }) => async (dispatch, getState) => {
    try {
      dispatch({ type: IMPORT_STOCK_UPDATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const { data } = await axios.put(`/api/import-stock/${importId}`,
      { provider, user, importItems, status, totalPrice, totalVAT, totalDiscount, invoiceNumber, invoiceSymbol, importedAt },
      config);
      dispatch({ type: IMPORT_STOCK_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: IMPORT_STOCK_UPDATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: IMPORT_STOCK_UPDATE_RESET });
      }, 3000);
    }
  };

  //ADMIN IMPORT CANCEL
  export const cancelImportStock = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: IMPORT_STOCK_CANCEL_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const { data } = await axios.put(`/api/import-stock/${id}/cancel`,{}, config);
      dispatch({ type: IMPORT_STOCK_CANCEL_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: IMPORT_STOCK_CANCEL_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: IMPORT_STOCK_CANCEL_RESET });
      }, 3000);
    }
  };