import React,{useState} from "react";
import style from "./New.module.css"
import NoConnection from "../Error/NoConnection";
import ComponentContent from '../ComponentContent/ComponentContent'
import { Pagination  } from 'antd';
import 'antd/dist/antd.css'; 
import Preloader from "../Preloader/Preloader";


const New = (props) => {
   if (props.error) {
       return <NoConnection/>
   }
   if (props.preloader) {
       return <Preloader/>
   }
    return (
        <React.Fragment>
        <div className={style.Page}>
            <ComponentContent img={props.img}/>
         </div>
         <div className={style.Page_paginator}>
                <Pagination showSizeChanger={false} className={style.Pagination} onChange={props.onPageChanged} total={props.totalItems} current={ props.currentPage} pageSize={props.pageSize}/>
         </div>
         </React.Fragment>
    )
}
export default New;