import { loginAPI, regAPI } from "../../API/api";
const SET_USERS_DATA = "reg/SET_USERS_DATA"
const Set_Error = "reg/SET_ERROR"

let InitialState = {
    id:null,
    email:null,
    login:null,
    isAuth:false,
    error:false
}
const RegistrationReducer  = (State=InitialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA : 
            return {...State, isAuth:action.isAuth}
        case Set_Error:
            return {...State, error:action.error}   
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
export const SetErrorAC = () => {
    return {
        type:Set_Error,
        error:true
    }
}
export const Regist = (email,phone,fullname,password,Username) =>async (dispatch) =>{
    let response = await regAPI.registration(email,phone,fullname,password,Username);
        try {
            dispatch(SetAuthAC())
        }
        catch(e){
            dispatch(SetErrorAC());
        } 
}

export default RegistrationReducer