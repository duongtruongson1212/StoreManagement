import {
  DRUGSTORE_ALL_FAIL,
  DRUGSTORE_ALL_REQUEST,
  DRUGSTORE_ALL_RESET,
  DRUGSTORE_ALL_SUCCESS,
  DRUGSTORE_CATEGORY_DRUG_FAIL,
  DRUGSTORE_CATEGORY_DRUG_REQUEST,
  DRUGSTORE_CATEGORY_DRUG_RESET,
  DRUGSTORE_CATEGORY_DRUG_SUCCESS,
  DRUGSTORE_CATEGORY_FAIL,
  DRUGSTORE_CATEGORY_REQUEST,
  DRUGSTORE_CATEGORY_RESET,
  DRUGSTORE_CATEGORY_SUCCESS,
  DRUGSTORE_LIST_FAIL,
  DRUGSTORE_LIST_REQUEST,
  DRUGSTORE_LIST_RESET,
  DRUGSTORE_LIST_SUCCESS,
  DRUGSTORE_SINGLE_FAIL,
  DRUGSTORE_SINGLE_REQUEST,
  DRUGSTORE_SINGLE_RESET,
  DRUGSTORE_SINGLE_SUCCESS,
  DRUGSTORE_UPDATE_FAIL,
  DRUGSTORE_UPDATE_REQUEST,
  DRUGSTORE_UPDATE_RESET,
  DRUGSTORE_UPDATE_SUCCESS,

  DRUGSTORE_UPDATE_REVIEW_FAIL,
  DRUGSTORE_UPDATE_REVIEW_REQUEST,
  DRUGSTORE_UPDATE_REVIEW_RESET,
  DRUGSTORE_UPDATE_REVIEW_SUCCESS,
} from '../Constants/DrugStoreConstants';
import {logout} from './UserActions';
import axios from 'axios';

// ADMINDRUGSTORE LIST
export const listDrugStore=(keyword=" ",pageNumber=" ",sort=" ") => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_LIST_REQUEST});

    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data}=await axios.get(`/api/drugstore/all?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`,config)
    // const { data } = await axios.get(`/api/products/all`, config);
    dispatch({type: DRUGSTORE_LIST_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_LIST_RESET});
    },3000);
  }
};

// ADMINDRUGSTORE LIST
export const allDrugStore=() => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_ALL_REQUEST});

    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data}=await axios.get(`/api/drugstore/alldrugstore`,config)
    dispatch({type: DRUGSTORE_ALL_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_ALL_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_ALL_RESET});
    },3000);
  }
};





//ADMINDRUGSTORE CATEGORY
export const categoriesDrugStore=(id) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_CATEGORY_REQUEST});
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data}=await axios.get(`/api/drugstore/${id}/categories`,config);
    dispatch({type: DRUGSTORE_CATEGORY_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_CATEGORY_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_CATEGORY_RESET});
    },3000);
  }
};

//ADMINDRUGSTORE CATEGORY DRUG
export const categoriesDrugDrugStore=(id) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_CATEGORY_DRUG_REQUEST});
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data}=await axios.get(`/api/drugstore/${id}/categories-drug`,config);
    dispatch({type: DRUGSTORE_CATEGORY_DRUG_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_CATEGORY_DRUG_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_CATEGORY_DRUG_RESET});
    },3000);
  }
};


//ADMINDRUGSTORE SINGLE
export const singleDrugStore=(id) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_SINGLE_REQUEST});
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data}=await axios.get(`/api/drugstore/${id}`,config);
    dispatch({type: DRUGSTORE_SINGLE_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_SINGLE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_SINGLE_RESET});
    },3000);
  }
};

// ADMIN UPDATEDRUGSTORE

export const updateDrugStore=({countInStock,isActive,discount,refunded,discountDetail,drugstoreId}) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_UPDATE_REQUEST});
    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data}=await axios.put(`/api/drugstore/${drugstoreId}`,
      {
        countInStock,isActive,discount,refunded,discountDetail
      }
      ,config);
    dispatch({type: DRUGSTORE_UPDATE_SUCCESS,payload: data});
    dispatch({type: DRUGSTORE_SINGLE_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_UPDATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_UPDATE_RESET});
    },3000);
  }
};

export const updateDrugStoreReview=({productId,reviewId,status}) => async (dispatch,getState) => {
  try {
    dispatch({type: DRUGSTORE_UPDATE_REVIEW_REQUEST});
    const {
      userLogin: {userInfo},
    }=getState();

    const config={
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data}=await axios.put(`/api/products/${productId}/update-review`,
      {
        reviewId,status
      }
      ,config);
    dispatch({type: DRUGSTORE_UPDATE_REVIEW_SUCCESS,payload: data});
    dispatch({type: DRUGSTORE_SINGLE_SUCCESS,payload: data});
  } catch(error) {
    const message=
      error.response&&error.response.data.message
        ? error.response.data.message
        :error.message;
    if(message==="Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DRUGSTORE_UPDATE_REVIEW_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({type: DRUGSTORE_UPDATE_REVIEW_RESET});
    },3000);
  }
};
