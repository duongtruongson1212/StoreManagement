import { NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESS, NOTIFICATION_LIST_FAIL, NOTIFICATION_CREATE_FAIL, NOTIFICATION_CREATE_REQUEST, NOTIFICATION_CREATE_SUCCESS, NOTIFICATION_CREATE_RESET, NOTIFICATION_LIST_RESET, NOTIFICATION_UPDATE_REQUEST, NOTIFICATION_UPDATE_SUCCESS, NOTIFICATION_UPDATE_FAIL, NOTIFICATION_UPDATE_RESET, NOTIFICATION_DELETE_REQUEST, NOTIFICATION_DELETE_SUCCESS, NOTIFICATION_DELETE_FAIL, NOTIFICATION_DELETE_RESET, NOTIFICATION_SINGLE_SUCCESS, NOTIFICATION_SINGLE_RESET, NOTIFICATION_SET_OH } from '../Constants/NotificationConstants';
import { NOTIFICATION_SINGLE_REQUEST, NOTIFICATION_SINGLE_FAIL } from '../Constants/NotificationConstants';

export const NotificationListReducer = (state = { notifications: [] }, action) => {
    switch (action.type) {
      case NOTIFICATION_LIST_REQUEST:
        return { loading: true, notifications: [], numberUnread: 0 };
      case NOTIFICATION_LIST_SUCCESS:
        return { loading: false, notifications: action.payload?.notifications, numberUnread: action?.payload?.numberUnread}
      case NOTIFICATION_LIST_FAIL:
        return { loading: false, error: action.payload };
      case NOTIFICATION_LIST_RESET:
        return { notifications: [] };
      default:
        return state;
    }
  };

// SINGLE NOTIFICATION
export const NotificationSingleReducer = (state = {notification:{}}, action) => {
  switch (action.type) {
    case NOTIFICATION_SINGLE_REQUEST:
      return {...state, loading: true };
    case NOTIFICATION_SINGLE_SUCCESS:
      return { loading: false, success: true, notification: action.payload };
    case NOTIFICATION_SINGLE_FAIL:
      return { loading: false, error: action.payload };
    case NOTIFICATION_SINGLE_RESET:
      return {notification:{}};
    default:
      return state;
  }
};


export const NotificationUpdateReducer = (state = {notification:{}}, action) =>{
    switch (action.type) {
        case NOTIFICATION_UPDATE_REQUEST:
            return {loading: true};
        case NOTIFICATION_UPDATE_SUCCESS:
            return {loading: false, success: true, notification: action.payload}
        case NOTIFICATION_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case NOTIFICATION_UPDATE_RESET:
            return {notification: {}}
        default:
            return state
    }
}


export const NotificationSetOHReducer = (state = {OH: []}, action) => {
  switch (action.type) {
    case NOTIFICATION_SET_OH:
      return {
        OH: action.payload
      };
    default:
      return state;
  }
};
