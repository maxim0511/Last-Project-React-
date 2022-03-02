import { AddImgAPI,tokenAPI } from "../../API/api";

const SET_IMAGE_IN_SERVER="SET_IMAGE_IN_SERVER";
const Set_Error = "SET_ERROR";
const SET_ID_IMAGE = "SET_ID_IMAGE"
const SET_PRELOADER = "SET_PRELOADER"

let InitialState = {
    ImageAddInServer:false,
    error:false,
    preloader:false,
}

const AddImgReducer  = (State=InitialState, action) => {
    switch (action.type) {  
        case SET_IMAGE_IN_SERVER:
            return {...State,ImageAddInServer:action.ImageAddInServer}  
         case Set_Error:
            return {...State, error:action.error}  
        case  SET_ID_IMAGE:
            return {...State, idImage:action.idImage}
        case SET_PRELOADER :
            return {...State,preloader:action.preloader}
        default :
            return State
    }
}

export const SetPreloaderAC = (preloader) => {
    return {
        type:SET_PRELOADER,
        preloader
    }
}

export const SetImageInServerAC = () => {
    return {
        type:SET_IMAGE_IN_SERVER,
        ImageAddInServer:true
    }
}
export const SetErrorAC = () => {
    return {
        type:Set_Error,
        error:true
    }
}

export const AddImg = (values,New,Popular) =>async (dispatch) =>{
    const file = values.file[0].originFileObj;
    const nameImg = values.ImageName;
    const description = values.Desc;

    dispatch(SetPreloaderAC(true))
    let access_token=localStorage.getItem("accesstoken")
   try{ 
       let data = await AddImgAPI.postImg(file,nameImg,access_token);
   

        let idPers=localStorage.getItem('IdClient');
        let refreshtoken = localStorage.getItem('refreshtoken');
        let secret = localStorage.getItem('secret')
        let tokens = await tokenAPI.getNewToken(idPers,refreshtoken,secret);
        let accesstoken = tokens.data.access_token;
        let refreshToken=tokens.data.refresh_token;
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('refreshtoken');
        localStorage.setItem('accesstoken',accesstoken);
        localStorage.setItem('refreshtoken',refreshToken);
   

    
        try {
            await AddImgAPI.postNewImg(nameImg,description,New,Popular,data.data.id);
            dispatch(SetPreloaderAC(false))
            dispatch(SetImageInServerAC())
        }
        catch{
            dispatch(SetPreloaderAC(false))
            dispatch(SetErrorAC());
        }
    }
    catch{
        dispatch(SetPreloaderAC(false))
        dispatch(SetErrorAC());
    }
}

export default AddImgReducer;