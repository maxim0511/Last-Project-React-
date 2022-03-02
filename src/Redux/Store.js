import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import LoginReducer from "./Reducers/LoginReducer"
import RegistrationReducer from "./Reducers/RegistrationReducer";
import AddImgReducer from "./Reducers/AddImg";
import AllContentReducer from "./Reducers/AllContentReducer";

let Reducers = combineReducers({
    newPage:AllContentReducer,
    popularPage:AllContentReducer,
    loginPage:LoginReducer,
    regPage:RegistrationReducer,
    addImgPage:AddImgReducer,
    form:formReducer
});

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const Store = createStore(Reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));

window.Store= Store

export default Store;