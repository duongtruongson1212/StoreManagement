import axios from 'axios';
import { MANUFACTURER_LIST_REQUEST, MANUFACTURER_LIST_SUCCESS, MANUFACTURER_LIST_FAIL, MANUFACTURER_CREATE_SUCCESS, MANUFACTURER_CREATE_FAIL, MANUFACTURER_CREATE_REQUEST, MANUFACTURER_DELETE_REQUEST, MANUFACTURER_DELETE_SUCCESS, MANUFACTURER_DELETE_FAIL, MANUFACTURER_LIST_RESET, MANUFACTURER_CREATE_RESET, MANUFACTURER_DELETE_RESET } from '../Constants/ManufacturerConstants';
import { logout } from "./UserActions";

export const listManufacturer = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MANUFACTURER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/import/manufacturer`, config)
    dispatch({ type: MANUFACTURER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: MANUFACTURER_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: MANUFACTURER_LIST_RESET });
    }, 3000);
  }
};

export const createManufacturer= (name) => async (dispatch, getState) => {
    try {
      dispatch({ type: MANUFACTURER_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/import/manufacturer`, {name}, config);
      dispatch({ type: MANUFACTURER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: MANUFACTURER_CREATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: MANUFACTURER_CREATE_RESET });
      }, 3000);
    }
  };

export const deleteManufacturer = (index) => async(dispatch, getState) => {
  try {
    dispatch({ type: MANUFACTURER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/import/manufacturer/${index}`, config);
    dispatch({ type: MANUFACTURER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: MANUFACTURER_DELETE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: MANUFACTURER_DELETE_RESET });
    }, 3000);
  }
};