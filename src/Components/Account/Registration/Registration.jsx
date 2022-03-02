import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
//import { Input } from "../../FormControls/FormControls"
import {Regist} from "../../../Redux/Reducers/RegistrationReducer"
import { required } from '../../../utils/errors';
import { connect } from "react-redux";
import style from './Registration.module.css'
import NoConnection from "../../Error/NoConnection";
import Login from "../Auth/Login";
import Preloader from "../../Preloader/Preloader";
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css'; 


const Registration = (props) => {
    const onFinish = (values) => {
        props.Regist(values.email, 
            values.phone,
            values.fullname , 
            values.password,
            values.username )
    }
    if (props.isAuth) {
        return <Login/>
    }
    if (props.error) {
        return <NoConnection/>
    }
    if (props.preloader) {
        return <Preloader/>
    }
    return (
        <div className={style.Reg}>
           <h1 className={style.RegName}>Регистрация</h1>
            <div className={style.RegPage}><br/>
             <Form name="Registration" onFinish={onFinish} >
                    <Form.Item name="email"  rules={[{required: true, message: 'Please input your E-mail!',},]}>        
                            <Input size="large" placeholder="E-mail" />
                    </Form.Item><br/>
                    <Form.Item name="phone"  rules={[{required: true, message: 'Please input your Phone!',},]}>        
                            <Input size="large" placeholder="Phone" />
                    </Form.Item><br/>
                    <Form.Item name="fullname"  rules={[{required: true, message: 'Please input your Fullname!',},]}>        
                            <Input size="large" placeholder="Fullname" />
                    </Form.Item><br/>
                    <Form.Item name="password"  rules={[{required: true,message: 'Please input your Password!',},]}>
                            <Input size="large" type="password" placeholder="Password"/>
                     </Form.Item><br/>
                     <Form.Item name="username"  rules={[{required: true, message: 'Please input your Username!',},]}>        
                            <Input size="large" placeholder="Username" />
                    </Form.Item>
                     <div className={style.buttonContainer}>
                        <Form.Item>
                                <Button type="primary" htmlType="submit"  >
                                Зарегистрироваться
                                </Button>
                        </Form.Item>
                     </div>
                </Form>
            </div><br/>
            <div className={style.AuthPage}>
                <NavLink to='/'>Авторизоваться</NavLink>
            </div>
        </div>
    )
}
/*const RegForm = ({handleSubmit}) => {
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
})(RegForm)*/

let mapStateToProps = (state) => ({
    isAuth: state.regPage.isAuth,
    error:state.regPage.error,
    preloader:state.regPage.preloader
})
export default connect(mapStateToProps , {Regist})(Registration);