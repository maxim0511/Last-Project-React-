import React, { Suspense } from "react";
import { connect } from "react-redux";
import {
    SetCurrentPage,
    getImg
} from "../../Redux/Reducers/NewReducer";
import { compose } from "redux";
import Preloader from "../Preloader/Preloader";


const NewPage = React.lazy(()=>import('./New'))

class NewContainer extends React.Component {
    componentDidMount() {
        this.props.getImg(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged= (PageNumber) => {
        this.props.getImg(PageNumber, this.props.pageSize);
    }
    render () {
        return (
            <Suspense fallback={<Preloader/>}>
                <NewPage
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    img={this.props.img}
                    error={this.props.error}
                />
             </Suspense>
        )
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.loginPage.isAuth,
    img:state.newPage.img,
    pageSize:state.newPage.pageSize,
    totalItems:state.newPage.totalItems,
    currentPage:state.newPage.currentPage,
    error:state.newPage.error
})
export default compose(
    connect(mapStateToProps,{
        SetCurrentPage,
        getImg
    }),
)(NewContainer)