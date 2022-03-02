import React, { useEffect, useState } from "react";
import style from "./addImg.module.css";
import Login from "../Account/Auth/Login"
import NoConnection from "../Error/NoConnection";
import { Field, reduxForm } from "redux-form";
//import { Input,Textarea } from "../FormControls/FormControls";
import { required } from "../../utils/errors";
import FieldFileInput from "../FormControls/FormControls";
import Preloader from "../Preloader/Preloader";
import { Radio, Upload } from "antd";
import { Form, Input, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; 

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
      }
    
      return e && e.fileList;
  };

const AddImgComponent = (props) => {
    const onFinish = (values) => {
        if (values.radio_group == 1) {
            let New = true;
            let Popular = false
            props.AddImg(values,New,Popular)
        } else {
            let New = false;
            let Popular = true
            props.AddImg(values,New,Popular)
        }
    }
    if (!props.isAuth) {
        return <Login/>  
    }
    if (props.preloader) {
        return <Preloader/>
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
                    <Form  onFinish={onFinish} ><br/>
                        <Form.Item name="ImageName"  rules={[{required: true, message: 'Please input your Image name!',},]}>        
                                <Input placeholder="ImageName"  size="large"/>
                        </Form.Item><br/>
                        <Form.Item name="radio_group" label="Категория">
                                <Radio.Group>
                                    <Radio value="1" >New</Radio>
                                    <Radio value="2" >Popular</Radio>
                                </Radio.Group>
                        </Form.Item>
                        <Form.Item name="Desc"  rules={[{required: true,message: 'Please input your Description!',},]}>
                                <Input size="large" placeholder="Description"/>
                        </Form.Item>
                        <Form.Item name="file" label="Upload File"  valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload listType="picture" name="logo" beforeUpload={(file, fileList)=>false} >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                        <div className={style.buttonContainer}>
                            <Form.Item>
                                    <Button type="primary" htmlType="submit" className={style.button}>
                                        Отправить
                                    </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
    )
}


/*const AddImgPageForm = ({handleSubmit}) => {
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
})(AddImgPageForm)*/
 

export default AddImgComponent