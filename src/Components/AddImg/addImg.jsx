import React from "react";
import style from "./addImg.module.css";
import Login from "../Account/Auth/Login"
import NoConnection from "../Error/NoConnection";
import { Field, reduxForm } from "redux-form";
import { Input,Textarea } from "../FormControls/FormControls";
import { required } from "../../utils/errors";
import FieldFileInput from "../FormControls/FormControls";


const addImg = (props) => {
    const onSubmit = (formData) => {
        if (formData.ImageCategoryNew == undefined){
            props.AddImg(formData.ImageName,
            formData.Desc,
            formData.ImageCategoryNew = false,
            formData.ImageCategoryPopular = true,
            formData.file,
        )
        }
        if (formData.ImageCategoryPopular == undefined){
            props.AddImg(formData.ImageName,
            formData.Desc,
            formData.ImageCategoryNew = true,
            formData.ImageCategoryPopular = false,
            formData.file,
        )
        }
        if (formData.ImageCategoryNew && formData.ImageCategoryPopular) {
            props.AddImg(formData.ImageName,
                formData.Desc,
                formData.ImageCategoryNew = true,
                formData.ImageCategoryPopular = true,
                formData.file ,
            )
        } 
        formData.ImageName='';
        formData.Desc='';
    }

    if (!props.isAuth) {
        return <Login/>  
    }
    if (props.error) {
        return  <NoConnection/>
    }
    return (
            <div className={style.addImg}>
                {props.ImageAddInServer && <div className={style.ImageAddInServer}>
                    <h2 className={style.h2}>Картинка успешно загружена</h2> 
                </div>}
                <div className={style.AddImgPage}>
                    <AddImgPageReduxForm onSubmit={onSubmit} />
                </div>
            </div>
    )
}


const AddImgPageForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={style.Form}>
            <div className={style.ContainerForm}>
            <div >
                <Field className={style.NameImgInput} placeholder="Название картинки"  name={'ImageName'} component={Input} validate={[required]} />
            </div><br/>
            <p className={style.p}>Категория:(Обязательно)</p>
            <div className={style.category}>
                <Field type={'radio'} component={Input} value={'New'} className={style.categoryItem} name={'ImageCategoryNew'} />New
                <Field type={'radio'} component={Input} value={'Popular'}  className={style.categoryItem}  name={'ImageCategoryPopular'} />Popular
            </div><br/>
            <p className={style.p}>Описание:</p>
            <div className={style.Desc}>
                <Field component={Textarea} wrap={'soft'} placeholder="Описание" className={style.DescText} name={'Desc'} validate={[required]}/>
            </div>
            <p className={style.p}>Файл:</p>
            <div className={style.ImgInputCont}>
                <Field component={FieldFileInput} className={style.ImgInput}  name={'file'}  />
            </div><br/>
            <div className={style.buttonContainer}>
                <button className={style.button}>Отправить</button>
            </div>
            </div>
        </form>
    )
}

const AddImgPageReduxForm = reduxForm ({
    form:'AddImg'
})(AddImgPageForm)
 

export default addImg