import {
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_RESET,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_RESET,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_RESET,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGOUT,
  CUSTOMER_SINGLE_FAIL,
  CUSTOMER_SINGLE_REQUEST,
  CUSTOMER_SINGLE_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_RESET,
  CUSTOMER_SINGLE_RESET,

  CUSTOMER_CHANGE_FAIL,
  CUSTOMER_CHANGE_REQUEST,
  CUSTOMER_CHANGE_RESET,
  CUSTOMER_CHANGE_SUCCESS,

  CUSTOMER_UPDATE_PROFILE_FAIL,
  CUSTOMER_UPDATE_PROFILE_REQUEST,
  CUSTOMER_UPDATE_PROFILE_RESET,
  CUSTOMER_UPDATE_PROFILE_SUCCESS,

  CUSTOMER_DELETE_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_RESET,
  CUSTOMER_DELETE_SUCCESS,
} from "../Constants/CustomerConstants";
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
    dispatch({ type: CUSTOMER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/customers/login`,
      { email, password },
      config
    );
    dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });
    // if (!data.isAdmin === true) {
    //   toast.error("You are not Admin", ToastObjects);
    //   dispatch({
    //     type: CUSTOMER_LOGIN_FAIL,
    //   });
    // } else {
    //   dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });
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
      type: CUSTOMER_LOGIN_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: CUSTOMER_LOGIN_RESET });
    }, 3000);
  }
};

// ADMIN CREATE
export const createCustomer = ({ name, email, role, phone, password }) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_CREATE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/customers/add`,
      {
        name, email, role, phone, password
      }
      , config);
    dispatch({ type: CUSTOMER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_CREATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: CUSTOMER_CREATE_RESET });
    }, 3000);
  }
};

// ADMIN LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: CUSTOMER_LOGOUT });
  dispatch({ type: CUSTOMER_LIST_RESET });
  dispatch({ type: PRODUCT_LIST_RESET });
};

// ADMIN ALL CUSTOMER
export const listCustomer = (keyword = " ", pageNumber = " ") => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/customers/?keyword=${keyword}&pageNumber=${pageNumber}`, config);

    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: CUSTOMER_LIST_RESET });
    }, 3000);
  }
};



//ADMIN UPDATE PROVIDER
export const updateCustomer = ({name, email, role, phone, password ,customerID}) => async(dispatch, getState)=>{
  try {
    dispatch({type: CUSTOMER_UPDATE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/customers/${customerID}`, {
      name, email, role, phone, password
    }, config)
    dispatch({type: CUSTOMER_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_UPDATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: CUSTOMER_UPDATE_RESET });
    }, 3000);
  }
}

//ADMIN CUSTOMER SINGLE
export const singleCustomer = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_SINGLE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/customers/${id}`, config);
    dispatch({ type: CUSTOMER_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_SINGLE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: CUSTOMER_SINGLE_RESET });
    }, 3000);
  }
};

    // CHANGE PROFILE
    export const changeProfile = ({emailModal, passModal}) => async (dispatch) => {
      try {
        dispatch({ type: CUSTOMER_CHANGE_REQUEST });
    
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const formatForm = {
          "email": emailModal,
          "password": passModal
        }
        const { data } = await axios.post(`/api/customers/changeprofile`, formatForm, config);
        dispatch({ type: CUSTOMER_CHANGE_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: CUSTOMER_CHANGE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  
  // UPDATE PROFILE
  export const updateCustomerProfile = (customer,customerId) => async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOMER_UPDATE_PROFILE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(`/api/customers/${customerId}/profile`, customer, config);
      dispatch({ type: CUSTOMER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });
  
      //localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CUSTOMER_UPDATE_PROFILE_FAIL,
        payload: message,
      });
    }
  };

  //ADMIN USER DELETE
export const deleteCustomer = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_DELETE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/customers/${id}/delete`, {}, config);
    dispatch({ type: CUSTOMER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_DELETE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: CUSTOMER_DELETE_RESET});
    }, 3000);
  }
};
