import { loginAPI,tokenAPI } from "../../API/api";

const SET_FIRST_ENTRANCE= 'login/SET_FIRST_ENTRANCE'
const Set_Error = "SET_ERROR"
const SET_USERS_DATA = "SET_USERS_DATA"
const SET_TOKEN = "SET_TOKEN"

let InitialState = {
    id:null,
    name:null,
    randomId:null,
    secret:null,
    access_token:null,
    refresh_token:null,
    isAuth:false,
    error:false,
}
const loginReducer  = (State=InitialState, action) => {
    switch (action.type) {           
        case SET_FIRST_ENTRANCE:
            return {...State, ...action.data}
        case Set_Error:
            return {...State, error:action.error}   
        case SET_USERS_DATA:
            return {...State, isAuth:action.isAuth}
        case SET_TOKEN :
            return {...State, access_token:action.access_token , refresh_token:action.refresh_token}
        default :
            return State
    }
}

export const SetFirstEntrance = (id,secret,password,refresh_token) => {
    return {
        type:SET_FIRST_ENTRANCE,
        data:{id,secret,password,refresh_token}
    }
}
export const SetErrorAC = () => {
    return {
        type:Set_Error,
        error:true
    }
}
export const SetAuthAC = (isAuth) => {
    return {
        type:SET_USERS_DATA,
        isAuth
    }
}
export const SetTokenAC = (access_token,refresh_token) => {
    return {
        type:SET_TOKEN,
        access_token,
        refresh_token
    }
}
export const login = (Username,password,) =>async (dispatch) =>{
    let response = await loginAPI.firstEntrance();
     
            localStorage.clear();
            const id=response.data.id + '_' + response.data.randomId;
            localStorage.setItem('IdClient',id);
            const idPers = response.data.id
            localStorage.setItem('id',idPers);
            const secret =response.data.secret;
            localStorage.setItem('secret',secret);
            const Password = response.data.allowedGrantTypes[0]
            const refreshtoken = response.data.allowedGrantTypes[1];

            dispatch(SetFirstEntrance(id,Password,refreshtoken,secret));
            
             try {
                let data = await loginAPI.login(id,Username,password,secret);
                 const accesstoken = data.data.access_token;
                 const refreshtoken = data.data.refresh_token;
                 localStorage.setItem('accesstoken',accesstoken);
                 localStorage.setItem('refreshtoken',refreshtoken);
                 dispatch(SetTokenAC(accesstoken,refreshtoken))
                dispatch(SetAuthAC(true))
             }
             catch(e){
                 dispatch(SetErrorAC());
                 localStorage.clear();
                 let tokens = await tokenAPI.getNewToken(idPers,refreshtoken,secret);
                 let accessToken = tokens.data.access_token;
                 let refreshToken=tokens.data.refresh_token;
                 dispatch(SetTokenAC(accessToken,refreshToken));
                 localStorage.setItem('accesstoken',accessToken);
                 localStorage.setItem('refreshtoken',refreshToken);
                 dispatch(SetErrorAC());
             }
}
export const logout = ()=> async (dispatch) =>{
    localStorage.clear();
    sessionStorage.clear();
        try {
            const accesstoken=null;
            const refreshtoken = null
            dispatch(SetTokenAC(accesstoken,refreshtoken))
            dispatch(SetFirstEntrance(null,null,null,null));
            dispatch(SetAuthAC(false));
        }
        catch{
            dispatch(SetErrorAC())
        }
}
export default loginReducer