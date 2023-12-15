import { 
  USER_SINGLE_SUCCESS,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_SINGLE_REQUEST,
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
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SINGLE_RESET,
  USER_SINGLE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
} from "../Constants/UserConstants";

// LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// ALL USER
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};
//CREATE
export const userCreateReducer = (state= {}, action) =>{
  switch (action.type) {
      case USER_CREATE_REQUEST:
          return {loading: true};
      case USER_CREATE_SUCCESS:
          return {loading: false, success: true, user: action.payload}
      case USER_CREATE_FAIL:
          return {loading: false, error: action.payload}
      case USER_CREATE_RESET:
          return {};  
      default:
          return state;
  }
};
//UPDATE
export const userUpdateReducer = (state = {user:{}}, action) =>{
  switch (action.type) {
      case USER_UPDATE_REQUEST:
          return {loading: true};
      case USER_UPDATE_SUCCESS:
          return {loading: false, success: true, user: action.payload}
      case USER_UPDATE_FAIL:
          return {loading: false, error: action.payload};
      case USER_UPDATE_RESET:
          return {USER: {}}
      default:
          return state
  }
}

// SINGLE USER
export const userSingleReducer = (state = {user:{}}, action) => {
switch (action.type) {
  case USER_SINGLE_REQUEST:
    return {...state, loading: true };
  case USER_SINGLE_SUCCESS:
    return { loading: false, success: true, user: action.payload };
  case USER_SINGLE_FAIL:
    return { loading: false, error: action.payload };
  case USER_SINGLE_RESET:
    return {user:{}};
  default:
    return state;
}
};

// DELETE USER
export const userDeleteReducer = (state = {user:{}}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {...state, loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {user:{}};
    default:
      return state;
  }
  };