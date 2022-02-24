import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../FormControls/FormControls"
import {Regist} from "../../../Redux/Reducers/RegistrationReducer"
import { required } from '../../../utils/errors';
import { connect } from "react-redux";
import style from './Registration.module.css'
import NoConnection from "../../Error/NoConnection";
import Login from "../Auth/Login";



const Registration = (props) => {
    const onSubmit = (formData) => {
        props.Regist(formData.email, 
            formData.phone,
             formData.fullname , 
             formData.password,
             formData.username )
    }
    if (props.isAuth) {
        return <Login/>
    }
    if (props.error) {
        return <NoConnection/>
    }
    return (
        <div className={style.Reg}>
           <h1 className={style.RegName}>Регистрация</h1>
            <div className={style.RegPage}>
                <RegistrationReduxForm onSubmit={onSubmit} />
            </div><br/>
            <div className={style.AuthPage}>
                <NavLink to='/'>Авторизоваться</NavLink>
            </div>
        </div>
    )
}
const RegForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={style.Form}>
            <div >
                <Field className={style.RegInput} placeholder="Email"  name={'email'} component={Input} validate={[required]}/>
            </div><br/>
            <div>
                <Field className={style.RegInput} placeholder="Password" type={'password'} name={'password'} component={Input} validate={[required]}/>
            </div><br/>
            <div >
                <Field className={style.RegInput} placeholder="Username"  name={'username'} component={Input} validate={[required]}/>
            </div><br/>
            <div>
                <Field className={style.RegInput} placeholder="Full name" name={'fullname'} component={Input}  validate={[required]}/>
            </div><br/>
            <div>
                <Field className={style.RegInput} placeholder="Mobile phone"  name={'phone'} component={Input} validate={[required]} />
            </div><br/>
                <div className={style.buttonContainer}>
                    <button className={style.button} >Зарегистрироваться</button>
                </div>
        </form>
    )
}
const RegistrationReduxForm = reduxForm ({
    form:'Reg'
})(RegForm)

let mapStateToProps = (state) => ({
    isAuth: state.regPage.isAuth,
    error:state.regPage.error
})
export default connect(mapStateToProps , {Regist})(Registration);