import { loginAPI, regAPI } from "../../API/api";
const SET_USERS_DATA = "reg/SET_USERS_DATA"
const Set_Error = "reg/SET_ERROR"
const SET_PRELOADER = "SET_PRELOADER"

let InitialState = {
    id:null,
    email:null,
    login:null,
    isAuth:false,
    error:false,
    preloader:false
}
const RegistrationReducer  = (State=InitialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA : 
            return {...State, isAuth:action.isAuth}
        case Set_Error:
            return {...State, error:action.error}   
        case SET_PRELOADER :
            return {...State,preloader:action.preloader}
        default :
            return State
    }
}
export const SetAuthAC = () => {
    return {
        type:SET_USERS_DATA,
        isAuth:true
    }
}
export const SetPreloaderAC = (preloader) => {
    return {
        type:SET_PRELOADER,
        preloader
    }
}
export const SetErrorAC = () => {
    return {
        type:Set_Error,
        error:true
    }
}
export const Regist = (email,phone,fullname,password,Username) =>async (dispatch) =>{
    dispatch(SetPreloaderAC(true))
        try {
            let response = await regAPI.registration(email,phone,fullname,password,Username);
            dispatch(SetAuthAC());
            dispatch(SetPreloaderAC(false))
        }
        catch(e){
            dispatch(SetPreloaderAC(false))
            dispatch(SetErrorAC());
        } 
}

export default RegistrationReducer