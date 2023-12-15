import { CONTENT_SINGLE_REQUEST, CONTENT_SINGLE_SUCCESS,CONTENT_SINGLE_FAIL,CONTENT_SINGLE_RESET,CONTENT_UPDATE_REQUEST,CONTENT_UPDATE_SUCCESS,CONTENT_UPDATE_FAIL,CONTENT_UPDATE_RESET } from '../Constants/ContentConstants';

export const contentSingleReducer = (state = {contentUp: {}}, action)=>{
    switch(action.type) {
        case CONTENT_SINGLE_REQUEST:
            return {loading: true, contentUp: {}};
        case CONTENT_SINGLE_SUCCESS:
            return {loading: false, contentUp: action.payload}
        case CONTENT_SINGLE_FAIL:
            return {loading: false, error: action.payload};
        case CONTENT_SINGLE_RESET:
            return {contentUp: {}};    
        default:
            return state;
    }
};



export const contentUpdateReducer = (state = {content:{}}, action) =>{
    switch (action.type) {
        case CONTENT_UPDATE_REQUEST:
            return {loading: true};
        case CONTENT_UPDATE_SUCCESS:
            return {loading: false, success: true, content: action.payload}
        case CONTENT_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case CONTENT_UPDATE_RESET:
            return {content: {}}
        default:
            return state
    }
}
