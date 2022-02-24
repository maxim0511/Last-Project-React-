import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../FormControls/FormControls"
import { required } from "../../../utils/errors";
import {login} from "../../../Redux/Reducers/LoginReducer"
import { connect } from "react-redux";
import style from './Login.module.css'
import NewContainer from "../../New/NewContainer";
import NoConnection from "../../Error/NoConnection";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.Username, formData.password)
    }
    if (props.isAuth) {
        return <NewContainer/>  
    }
    if (props.error) {
        return  <NoConnection/>
    }
    return (
            <div className={style.Login}>
                <h1 className={style.LoginName}>Авторизация</h1>
                <div className={style.LoginPage}>
                    <LoginReduxForm onSubmit={onSubmit} />
                </div><br/>
                <div className={style.RegistrationPage}>
                    У вас еще нет аккаунта? <br/><NavLink to='/Registration'>Зарегистрироваться</NavLink>
                </div>
            </div>
    )
}

const LoginForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={style.Form}>
            <div >
                <Field className={style.LoginInput} placeholder="Username"  name={'Username'} component={Input} validate={[required]} />
            </div><br/>
            <div>
                <Field className={style.LoginInput} placeholder="Password" type={'password'} name={'password'} component={Input} validate={[required]} />
            </div><br/>
                <div className={style.buttonContainer}>
                    <button className={style.button}>Войти</button>
                </div>
        </form>
    )
}

const LoginReduxForm = reduxForm ({
    form:'Login'
})(LoginForm)
 
let mapStateToProps = (State) => ({
    isAuth: State.loginPage.isAuth,
    error:State.loginPage.error
})

export default connect(mapStateToProps , {login})(Login)