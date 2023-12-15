import axios from 'axios';
import { COUNTRY_LIST_REQUEST, COUNTRY_LIST_SUCCESS, COUNTRY_LIST_FAIL, COUNTRY_CREATE_SUCCESS, COUNTRY_CREATE_FAIL, COUNTRY_CREATE_REQUEST, COUNTRY_DELETE_REQUEST, COUNTRY_DELETE_SUCCESS, COUNTRY_DELETE_FAIL, COUNTRY_LIST_RESET, COUNTRY_CREATE_RESET, COUNTRY_DELETE_RESET } from '../Constants/CountryOfOriginConstants';
import { logout } from "./UserActions";

export const listCountry= () => async (dispatch, getState) => {
  try {
    dispatch({ type: COUNTRY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/import/countryOfOrigin`, config)
    dispatch({ type: COUNTRY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: COUNTRY_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: COUNTRY_LIST_RESET });
    }, 3000);
  }
};

export const createCountry = (name) => async (dispatch, getState) => {
    try {
      dispatch({ type: COUNTRY_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/import/countryOfOrigin`, {name}, config);
      dispatch({ type: COUNTRY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: COUNTRY_CREATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: COUNTRY_CREATE_RESET });
      }, 3000);
    }
  };

export const deleteCountry= (index) => async(dispatch, getState) => {
  try {
    dispatch({ type: COUNTRY_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/import/countryOfOrigin/${index}`, config);
    dispatch({ type: COUNTRY_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: COUNTRY_DELETE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: COUNTRY_DELETE_RESET });
    }, 3000);
  }
};