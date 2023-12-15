import { CHANGE_THEME } from "../Constants/ThemeConstant"
export const themeReducer = ( state = { theme: "light" }, action) =>{
    switch(action.type) {
        case CHANGE_THEME:
            return{
                ...state,
                theme: action.payload
            }
        default:
            return state;
    }
}