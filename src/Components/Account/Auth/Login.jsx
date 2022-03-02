import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
//import { Input } from "../../FormControls/FormControls"
import { required } from "../../../utils/errors";
import {login} from "../../../Redux/Reducers/LoginReducer"
import { connect } from "react-redux";
import style from './Login.module.css'
import NewContainer from "../../New/NewContainer";
import NoConnection from "../../Error/NoConnection";
import Preloader from "../../Preloader/Preloader";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; 

const Login = (props) => {
    const onFinish = (values) => {
        props.login( values.username,
            values.password);
    };
    if (sessionStorage.getItem('Auth')) {
        return <NewContainer/>  
    }
    if (props.preloader) {
        return <Preloader/>
    }
    if (props.error) {
        return  <NoConnection/>
    }
    return (
            <div className={style.Login}>
                <h1 className={style.LoginName}>Авторизация</h1>
                <div className={style.LoginPage}>
                 <Form name="login" onFinish={onFinish} className={style.login_form}>
                    <Form.Item name="username" className={style.formItem}  rules={[{required: true, message: 'Please input your Username!',},]}>        
                            <Input size="large" prefix={<UserOutlined/>}  placeholder="Username" />
                    </Form.Item><br/>
                    <Form.Item name="password"  rules={[{required: true,message: 'Please input your Password!',},]}>
                            <Input size="large" prefix={<LockOutlined/>}  type="password" placeholder="Password"/>
                     </Form.Item>
                        <Form.Item>
                                <Button type="primary" htmlType="submit" >
                                Войти
                                </Button>
                        </Form.Item>
                </Form>
                </div><br/>
                <div className={style.RegistrationPage}>
                    У вас еще нет аккаунта? <br/><NavLink to='/Registration'>Зарегистрироваться</NavLink>
                </div>
            </div>
    )
}

/*const LoginForm = ({handleSubmit}) => {
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
})(LoginForm)*/
 
let mapStateToProps = (State) => ({
    isAuth: State.loginPage.isAuth,
    preloader:State.loginPage.preloader,
    error:State.loginPage.error
})

export default connect(mapStateToProps , {login})(Login)