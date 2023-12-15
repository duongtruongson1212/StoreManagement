import axios from 'axios';
import { UNIT_LIST_REQUEST, UNIT_LIST_SUCCESS, UNIT_LIST_FAIL, UNIT_CREATE_SUCCESS, UNIT_CREATE_FAIL, UNIT_CREATE_REQUEST, UNIT_DELETE_REQUEST, UNIT_DELETE_SUCCESS, UNIT_DELETE_FAIL, UNIT_LIST_RESET, UNIT_CREATE_RESET, UNIT_DELETE_RESET } from '../Constants/UnitConstants';
import { logout } from "./UserActions";

export const listUnit = () => async (dispatch, getState) => {
  try {
    dispatch({ type: UNIT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/import/unit`, config)
    dispatch({ type: UNIT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: UNIT_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: UNIT_LIST_RESET });
    }, 3000);
  }
};

export const createUnit= (name) => async (dispatch, getState) => {
    try {
      dispatch({ type: UNIT_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/import/unit`, {name}, config);
      dispatch({ type: UNIT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: UNIT_CREATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: UNIT_CREATE_RESET });
      }, 3000);
    }
  };

export const deleteUnit = (index) => async(dispatch, getState) => {
  try {
    dispatch({ type: UNIT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/import/unit/${index}`, config);
    dispatch({ type: UNIT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: UNIT_DELETE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: UNIT_DELETE_RESET });
    }, 3000);
  }
};