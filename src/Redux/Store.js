import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import NewReducer from "./Reducers/NewReducer";
import PopularReducer from "./Reducers/PopularReducer";
import LoginReducer from "./Reducers/LoginReducer"
import RegistrationReducer from "./Reducers/RegistrationReducer";
import AddImgReducer from "./Reducers/AddImg";

let Reducers = combineReducers({
    newPage:NewReducer,
    popularPage:PopularReducer,
    loginPage:LoginReducer,
    regPage:RegistrationReducer,
    addImgPage:AddImgReducer,
    form:formReducer
});

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const Store = createStore(Reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));

window.Store= Store

export default Store;