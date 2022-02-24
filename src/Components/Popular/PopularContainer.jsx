import React, { Suspense } from "react";
import { connect } from "react-redux";
import {
    SetCurrentPage,
    getImg
} from "../../Redux/Reducers/PopularReducer";
import { compose } from "redux";
import Preloader from "../Preloader/Preloader";

const PopularPage = React.lazy(()=>import('./Popular'))

class PopularContainer extends React.Component {
    componentDidMount() {
        this.props.getImg(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged= (PageNumber) => {
        this.props.getImg(PageNumber, this.props.pageSize);
    }
    render () {
        return (
            <Suspense fallback={<Preloader/>}>
                <PopularPage
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
    img:state.popularPage.img,
    pageSize:state.popularPage.pageSize,
    totalItems:state.popularPage.totalItems,
    currentPage:state.popularPage.currentPage,
    error:state.popularPage.error
})

export default compose(connect(mapStateToProps,{
    SetCurrentPage,
    getImg
}))(PopularContainer)