import axios from "axios";
import {
  NOTIFICATION_LIST_REQUEST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_UPDATE_RESET,
  NOTIFICATION_UPDATE_FAIL,
  NOTIFICATION_UPDATE_SUCCESS,
  NOTIFICATION_UPDATE_REQUEST,
  NOTIFICATION_SINGLE_SUCCESS,
  NOTIFICATION_SINGLE_RESET,
  NOTIFICATION_LIST_RESET,
  NOTIFICATION_SET_OH,
} from "../Constants/NotificationConstants";
import { logout } from "./UserActions";
import {
  NOTIFICATION_SINGLE_REQUEST,
  NOTIFICATION_SINGLE_FAIL,
} from "../Constants/NotificationConstants";
export const listNotification = (limit) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTIFICATION_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const checkLimit = limit ? "all" : "limit";
    const { data } = await axios.get(
      `/api/notification/?limit=${checkLimit}`,
      config
    );
    dispatch({ type: NOTIFICATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTIFICATION_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: NOTIFICATION_LIST_RESET });
    }, 3000);
  }
};

//ADMIN PRODUCT SINGLE
export const singleNotification = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTIFICATION_SINGLE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/notification/${id}`, config);
    dispatch({ type: NOTIFICATION_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTIFICATION_SINGLE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: NOTIFICATION_SINGLE_RESET });
    }, 3000);
  }
};

//ADMIN UPDATE NOTIFICATION
export const updateNotification = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTIFICATION_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/notification/${id}`, {}, config);
    dispatch({ type: NOTIFICATION_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTIFICATION_UPDATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: NOTIFICATION_UPDATE_RESET });
    }, 3000);
  }
};



export const SetOHNotification = (value) => ({
  type: NOTIFICATION_SET_OH,
  payload: value,
});
