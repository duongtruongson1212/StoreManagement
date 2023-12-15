import { CHANGE_THEME } from '../Constants/ThemeConstant'
export const changeTheme = (data) => async(dispatch)=>{
    dispatch({
        type: CHANGE_THEME,
        payload: data
    })
}