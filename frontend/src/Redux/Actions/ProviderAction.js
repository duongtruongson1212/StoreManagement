import axios from 'axios';
import { PROVIDER_LIST_REQUEST, PROVIDER_LIST_SUCCESS, PROVIDER_LIST_FAIL, PROVIDER_CREATE_SUCCESS, PROVIDER_CREATE_FAIL, PROVIDER_CREATE_REQUEST, PROVIDER_UPDATE_REQUEST, PROVIDER_UPDATE_SUCCESS, PROVIDER_UPDATE_FAIL, PROVIDER_DELETE_REQUEST, PROVIDER_DELETE_SUCCESS, PROVIDER_DELETE_FAIL, PROVIDER_SINGLE_SUCCESS, PROVIDER_LIST_RESET, PROVIDER_SINGLE_RESET, PROVIDER_CREATE_RESET, PROVIDER_UPDATE_RESET, PROVIDER_DELETE_RESET } from '../Constants/ProviderConstants';
import { logout } from "./UserActions";
import { PROVIDER_SINGLE_REQUEST, PROVIDER_SINGLE_FAIL } from './../Constants/ProviderConstants';

export const listProvider = ( keyword = " ", pageNumber = " ") => async (dispatch, getState) => {
  try {
    dispatch({ type: PROVIDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/provider/?keyword=${keyword}&pageNumber=${pageNumber}`, config)
    // const { data } = await axios.get(`/api/products/all`, config);
    dispatch({ type: PROVIDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROVIDER_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: PROVIDER_LIST_RESET });
    }, 3000);
  }
};

//ADMIN PRODUCT SINGLE
export const singleProvider = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROVIDER_SINGLE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/provider/${id}`, config);
    dispatch({ type: PROVIDER_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROVIDER_SINGLE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: PROVIDER_SINGLE_RESET });
    }, 3000);
  }
};

//ADMIN PROVIDER CREATE
export const createProvider = ({ name, contactName, taxCode, invoiceSymbol, phone, email, address}) => async (dispatch, getState) => {
    try {
      dispatch({ type: PROVIDER_CREATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/provider/`,
        {
          name, contactName, taxCode, invoiceSymbol, phone, email, address
        }
        , config);
      dispatch({ type: PROVIDER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PROVIDER_CREATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: PROVIDER_CREATE_RESET });
      }, 3000);
    }
  };

//ADMIN UPDATE PROVIDER
export const updateProvider = ({name, contactName, taxCode, invoiceSymbol, phone, email, address, providerID}) => async(dispatch, getState)=>{
  try {
    dispatch({type: PROVIDER_UPDATE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/provider/${providerID}`, {
      name, contactName, taxCode, invoiceSymbol, phone, email, address
    }, config)
    dispatch({type: PROVIDER_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROVIDER_UPDATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: PROVIDER_UPDATE_RESET });
    }, 3000);
  }
}

// ADMIN PROVIDER DELETE
export const deleteProvider = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: PROVIDER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/provider/${id}`, config);
    dispatch({ type: PROVIDER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROVIDER_DELETE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: PROVIDER_DELETE_RESET });
    }, 3000);
  }
};