import React,{useState} from "react";
import style from "../New/New.module.css"
import { Modal } from "antd";
import 'antd/dist/antd.css'; 

const ComponentContent = (props) => {
    const [modal,setModal] = useState(false);
    const [ImageInfo,setImageInfo] = useState('')
    const modalStyle = {
        padding:25,
        height:700,
    }
    const modalOpen = (event)=>{
         setImageInfo(event)
         setModal(true)
    }
    return (
        <div className={style.Page_content}>
        {
            props.img.map(
             u=> 
                        <div className={style.content__item} alt={u.alt} key={u.id}  popular={u.popular} new={u.new} >
                                <img src={'http://gallery.dev.webant.ru/media/' + u.image.name} 
                                    name={u.name}
                                    onClick={(event) =>modalOpen(event.target)}/>
                                <Modal bodyStyle={modalStyle}  centered={true} visible={modal} footer={null}  onCancel={() => setModal(false)}  width={700} > 
                                        <div className={style.container_modal_img}>
                                            <img className={style.modal_img} src={ ImageInfo.src} alt={ImageInfo.alt}/>
                                        </div><br/><br/>
                                        <div className ={style.modal_img_info}>
                                            <h1 className={style.modal_img_name}>{ImageInfo.name}</h1>
                                        </div>
                                </Modal>
                        </div>
                )
                }
        </div>   
    )
}

export default ComponentContent;