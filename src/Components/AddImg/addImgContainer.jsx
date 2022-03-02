import React,{ Suspense } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {AddImg} from "../../Redux/Reducers/AddImg"
import Preloader from "../Preloader/Preloader";

const AddImgPage = React.lazy(()=>import("./addImg"))
class AddImgContainer extends React.Component {
    render () {
        return (
            <Suspense fallback={<Preloader/>}>
                <AddImgPage {...this.props} ImageAddInServer={this.props.ImageAddInServer}/>
            </Suspense>
        )
    }
}

let mapStateToProps = (State) => ({
    isAuth:sessionStorage.getItem('Auth'),
    preloader:State.addImgPage.preloader,
    error:State.loginPage.error,
    ImageAddInServer:State.addImgPage.ImageAddInServer
});


export default 
    compose(
    connect(mapStateToProps,
    {
        AddImg
    }),
)(AddImgContainer);