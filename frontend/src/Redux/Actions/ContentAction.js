import axios from 'axios';
import {  CONTENT_UPDATE_REQUEST, CONTENT_UPDATE_SUCCESS, CONTENT_UPDATE_FAIL,CONTENT_UPDATE_RESET,  CONTENT_SINGLE_REQUEST, CONTENT_SINGLE_SUCCESS, CONTENT_SINGLE_FAIL,CONTENT_SINGLE_RESET  } from '../Constants/ContentConstants';
import { logout } from "./UserActions";


export const singleContent = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTENT_SINGLE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/content/`, config);
    dispatch({ type: CONTENT_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CONTENT_SINGLE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: CONTENT_SINGLE_RESET });
    }, 3000);
  }
};

//ADMIN UPDATE CATEGORY
export const updateContent = ({logo, qrCode, phone,banners,companyName,companyAddress,links,contacs, zaloUrl, fbUrl}) => async(dispatch, getState)=>{
  try {
    dispatch({type: CONTENT_UPDATE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/content/`, {
      logo, qrCode, phone,banners,companyName,companyAddress,links,contacs, zaloUrl, fbUrl
    }, config)
    dispatch({type: CONTENT_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CONTENT_UPDATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: CONTENT_UPDATE_RESET });
    }, 3000);
  }
}

