import axios from 'axios';
import { logout } from "./UserActions";
import { CATEGORY_DRUG_LIST_REQUEST, CATEGORY_DRUG_LIST_SUCCESS, CATEGORY_DRUG_LIST_FAIL, CATEGORY_DRUG_CREATE_REQUEST, CATEGORY_DRUG_CREATE_SUCCESS, CATEGORY_DRUG_CREATE_FAIL, CATEGORY_DRUG_UPDATE_REQUEST, CATEGORY_DRUG_UPDATE_SUCCESS, CATEGORY_DRUG_UPDATE_FAIL, CATEGORY_DRUG_DELETE_REQUEST, CATEGORY_DRUG_DELETE_SUCCESS, CATEGORY_DRUG_DELETE_FAIL, CATEGORY_DRUG_LIST_RESET, CATEGORY_DRUG_CREATE_RESET, CATEGORY_DRUG_UPDATE_RESET, CATEGORY_DRUG_DELETE_RESET } from './../Constants/CategoryDrugConstants';
export const listCategoryDrug = () => async(dispatch, getState) =>{
    try {
        dispatch({type: CATEGORY_DRUG_LIST_REQUEST});
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/category-drug/`, config)
        dispatch({type: CATEGORY_DRUG_LIST_SUCCESS, payload: data})
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        if(message === "Not authorized, token failed"){
            dispatch(logout());
        }
        dispatch({type: CATEGORY_DRUG_LIST_FAIL, payload: message});
        setTimeout(() => {
          dispatch({ type: CATEGORY_DRUG_LIST_RESET });
        }, 3000);
    }
}

//ADMIN CATEGORY CREATE
export const createCategoryDrug = ({ name, description, isActive }) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_DRUG_CREATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/category-drug/`,
        {
          name, description, isActive
        }
        , config);
      dispatch({ type: CATEGORY_DRUG_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CATEGORY_DRUG_CREATE_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: CATEGORY_DRUG_CREATE_RESET });
      }, 3000);
    }
  };

//ADMIN UPDATE CATEGORY
export const updateCategoryDrug = ({name, description, isActive, categoryId}) => async(dispatch, getState)=>{
  try {
    dispatch({type: CATEGORY_DRUG_UPDATE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/category-drug/${categoryId}`, {
      name, description, isActive
    }, config)
    dispatch({type: CATEGORY_DRUG_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_DRUG_UPDATE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: CATEGORY_DRUG_UPDATE_RESET });
    }, 3000);
  }
}

// ADMIN CATEGORY DELETE
export const deleteCategoryDrug = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DRUG_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/category-drug/${id}`, config);
    dispatch({ type: CATEGORY_DRUG_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_DRUG_DELETE_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: CATEGORY_DRUG_DELETE_RESET });
    }, 3000);
  }
};