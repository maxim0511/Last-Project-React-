import React, { Suspense } from "react";
import { connect } from "react-redux";
import {
    SetCurrentPage,
    getImgPopular
} from "../../Redux/Reducers/AllContentReducer";
import { compose } from "redux";
import Preloader from "../Preloader/Preloader";

const PopularPage = React.lazy(()=>import('./Popular'))

class PopularContainer extends React.Component {
    componentDidMount() {
        this.props.getImgPopular(1, this.props.pageSize);
    }
    onPageChanged= (Page) => {
        this.props.getImgPopular(Page, this.props.pageSize);
    }
    render () {
        return (
            <Suspense fallback={<Preloader/>}>
                <PopularPage
                     preloader={this.props.preloader}
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
    preloader:state.popularPage.preloader,
    isAuth: state.loginPage.isAuth,
    img:state.popularPage.img,
    pageSize:state.popularPage.pageSize,
    totalItems:state.popularPage.totalItems,
    currentPage:state.popularPage.currentPage,
    error:state.popularPage.error
})

export default compose(connect(mapStateToProps,{
    SetCurrentPage,
    getImgPopular
}))(PopularContainer)