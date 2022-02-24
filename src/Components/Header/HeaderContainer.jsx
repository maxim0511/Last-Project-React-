import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {  logout } from "../../Redux/Reducers/LoginReducer";
import Header from "./Header";



class HeaderContainer extends React.Component {
    render () {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (State) => ({
    isAuth:State.loginPage.isAuth,
});


export default 
    compose(
    connect(mapStateToProps,
    {
        logout
    }),
)(HeaderContainer);