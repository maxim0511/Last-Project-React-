import {contentAPI} from '../../API/api';


const Set_Img= "SET_IMG"
const Set_Current_Page= "SET_CURRENT_PAGE";
const Set_Total_Count="SET_TOTAL_COUNT";
const Set_Error = "SET_ERROR";
const SET_PRELOADER = "SET_PRELOADER"

let InitialState = {
   img:[],
   pageSize:15,
   totalItems:0,
   currentPage:1,
   error:false,
   preloader:false,
};

const AllContentReducer = (State = InitialState,action) => {
    switch (action.type) {
        case Set_Img : 
            return {...State, img:action.img};
        ;
        case Set_Current_Page : 
            return {...State, currentPage: action.currentPage}
        ;
        case Set_Total_Count : 
            return {...State, totalItems: action.count}
        ;
        case Set_Error:
            return {...State, error:action.error};
        case SET_PRELOADER :
            return {...State,preloader:action.preloader}    
        default:
            return State;
    }
} 
export const SetPreloaderAC = (preloader) => {
    return {
        type:SET_PRELOADER,
        preloader
    }
}
export const SetImgAC = (img) => {
    return {
        type:Set_Img,
        img
    }
}
export const SetCurrentPage = (currentPage) => {
    return {
        type:Set_Current_Page,
        currentPage
    }
}
export const SetTotalCountAC = (totalItems) => {
    return {
        type:Set_Total_Count,
        count:totalItems
    }
}
export const SetErrorAC = () => {
    return {
        type:Set_Error,
        error:true
    }
}

export const getImgNew =(currentPage ,pageSize)=> async (dispatch) =>{ 
    dispatch(SetPreloaderAC(true))
    let response= await contentAPI.content(currentPage,pageSize,true,false);
    try{
        dispatch(SetImgAC(response.data.data));
        dispatch(SetTotalCountAC(response.data.totalItems));
        dispatch(SetCurrentPage(currentPage));
        dispatch(SetPreloaderAC(false))
    }
    catch(e){
        dispatch(SetPreloaderAC(false))
        dispatch(SetErrorAC());
    }
     
}
export const getImgPopular =(currentPage ,pageSize)=> async (dispatch) =>{ 
    dispatch(SetPreloaderAC(true))
    let response= await contentAPI.content(currentPage,pageSize,false,true);
    try{
        dispatch(SetImgAC(response.data.data));
        dispatch(SetTotalCountAC(response.data.totalItems));
        dispatch(SetCurrentPage(currentPage));
        dispatch(SetPreloaderAC(false))
    }
    catch(e){
        dispatch(SetPreloaderAC(false))
        dispatch(SetErrorAC());
    }
     
}

export default AllContentReducer;