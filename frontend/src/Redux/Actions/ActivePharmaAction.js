import axios from 'axios';
import { API_LIST_REQUEST, API_LIST_SUCCESS, API_LIST_FAIL, API_CREATE_SUCCESS, API_CREATE_FAIL, API_CREATE_REQUEST, API_DELETE_REQUEST, API_DELETE_SUCCESS, API_DELETE_FAIL, API_LIST_RESET, API_CREATE_RESET, API_DELETE_RESET } from '../Constants/ActivePharmaConstants';
import { logout } from "./UserActions";

export const listAPI= () => async (dispatch, getState) => {
  try {
    dispatch({ type: API_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/import/API`, config)
    dispatch({ type: API_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: API_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: API_LIST_RESET });
    }, 3000);
  }
};

export const createAPI = (name) => async (dispatch, getState) => {
    try {
      dispatch({ type: API_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/import/API`, {name}, config);
      dispatch({ type: API_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: API_CREATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: API_CREATE_RESET });
      }, 3000);
    }
  };

export const deleteAPI= (index) => async(dispatch, getState) => {
  try {
    dispatch({ type: API_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/import/API/${index}`, config);
    dispatch({ type: API_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: API_DELETE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: API_DELETE_RESET });
    }, 3000);
  }
};