import { AddImgAPI,tokenAPI } from "../../API/api";

const SET_IMAGE_IN_SERVER="SET_IMAGE_IN_SERVER";
const Set_Error = "SET_ERROR";
const SET_ID_IMAGE = "SET_ID_IMAGE"

let InitialState = {
    ImageAddInServer:false,
    error:false,
}

const AddImgReducer  = (State=InitialState, action) => {
    switch (action.type) {  
        case SET_IMAGE_IN_SERVER:
            return {...State,ImageAddInServer:action.ImageAddInServer}  
         case Set_Error:
            return {...State, error:action.error}  
        case  SET_ID_IMAGE:
            return {...State, idImage:action.idImage}
        default :
            return State
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

export const AddImg = (ImageName,Desc,ImageCategoryNew,ImageCategoryPopular,file,idFile='') =>async (dispatch) =>{
    let access_token=localStorage.getItem("accesstoken")
    let data = await AddImgAPI.postImg(file,ImageName,access_token);
   


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


    let response = await AddImgAPI.postNewImg(ImageName,Desc,ImageCategoryNew,ImageCategoryPopular,data.data.id);
    try {
        dispatch(SetImageInServerAC())
    }
    catch{
        dispatch(SetErrorAC());
    }
}

export default AddImgReducer;