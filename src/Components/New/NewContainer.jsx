import React, { Suspense } from "react";
import { connect } from "react-redux";
import {
    SetCurrentPage,
    getImgNew
} from "../../Redux/Reducers/AllContentReducer";
import { compose } from "redux";
import Preloader from "../Preloader/Preloader";


const NewPage = React.lazy(()=>import('./New'))

class NewContainer extends React.Component {
    componentDidMount() {
        this.props.getImgNew(1, this.props.pageSize);
    }
    onPageChanged= (PageNumber) => {
        this.props.getImgNew(PageNumber, this.props.pageSize);
    }
    render () {
        return (
            <Suspense fallback={<Preloader/>}>
                <NewPage
                    totalItems={this.props.totalItems}
                    preloader={this.props.preloader}
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
    preloader:state.newPage.preloader,
    img:state.newPage.img,
    pageSize:state.newPage.pageSize,
    totalItems:state.newPage.totalItems,
    currentPage:state.newPage.currentPage,
    error:state.newPage.error
})
export default compose(
    connect(mapStateToProps,{
        SetCurrentPage,
        getImgNew
    }),
)(NewContainer)