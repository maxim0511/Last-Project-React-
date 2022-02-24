import {contentAPI} from '../../API/api'

const Set_Img= "SET_IMG"
const Set_Current_Page= "SET_CURRENT_PAGE";
const Set_Total_Count="SET_TOTAL_COUNT";
const Set_Error = "SET_ERROR"

let InitialState = {
   img:[],
   pageSize:15,
   totalItems:0,
   currentPage:1,
   error:false,
};

const NewReducer = (State = InitialState,action) => {
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
            return {...State, error:action.error}
        default:
            return State;
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

export const getImg =(currentPage,pageSize)=> async (dispatch) =>{ 
    let New=true;
    let Popular=false;
    let response= await contentAPI.content(currentPage,pageSize,New,Popular);
    try{
        dispatch(SetImgAC(response.data.data));
        dispatch(SetTotalCountAC(response.data.totalItems));
        dispatch(SetCurrentPage(currentPage));

    }
    catch(e){
        dispatch(SetErrorAC());
    }
     
}

export default NewReducer;