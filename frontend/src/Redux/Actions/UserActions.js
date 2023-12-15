import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_RESET,
  USER_CREATE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SINGLE_FAIL,
  USER_SINGLE_REQUEST,
  USER_SINGLE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET,
  USER_SINGLE_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
} from "../Constants/UserConstants";
import axios from "axios";
import { PRODUCT_LIST_RESET } from "../Constants/ProductConstants";
// import { toast } from "react-toastify";
// const ToastObjects = {
//   pauseOnFocusLoss: false,
//   draggable: false,
//   pauseOnHover: false,
//   autoClose: 2000,
// };
// ADMIN LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // if (!data.isAdmin === true) {
    //   toast.error("You are not Admin", ToastObjects);
    //   dispatch({
    //     type: USER_LOGIN_FAIL,
    //   });
    // } else {
    //   dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // }

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: USER_LOGIN_RESET });
    }, 3000);
  }
};

// ADMIN CREATE
export const createUser = ({ name, email, role, phone, password }) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_CREATE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/users/add`,
      {
        name, email, role, phone, password
      }
      , config);
    dispatch({ type: USER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_CREATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: USER_CREATE_RESET });
    }, 3000);
  }
};

// ADMIN LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: PRODUCT_LIST_RESET });
};

// ADMIN ALL USER
export const listUser = (keyword = " ", pageNumber = " ") => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/?keyword=${keyword}&pageNumber=${pageNumber}`, config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: USER_LIST_RESET });
    }, 3000);
  }
};


//ADMIN UPDATE PROVIDER
export const updateUser = ({name, email, role, phone, password ,userID}) => async(dispatch, getState)=>{
  try {
    dispatch({type: USER_UPDATE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${userID}`, {
      name, email, role, phone, password
    }, config)
    dispatch({type: USER_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: USER_UPDATE_RESET });
    }, 3000);
  }
}

//ADMIN USER SINGLE
export const singleUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SINGLE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({ type: USER_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_SINGLE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: USER_SINGLE_RESET });
    }, 3000);
  }
};

//ADMIN USER DELETE
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${id}/delete`, {}, config);
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: USER_DELETE_RESET});
    }, 3000);
  }
};
