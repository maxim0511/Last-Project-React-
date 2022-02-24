import React, {Component} from "react"
import style from "./FormControls.module.css";

export const FormControlling = ({input,meta,...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.formControl + " " + (hasError ? style.error : '') }>
            <div>
                 {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input,meta,...restProps} = props
    return <FormControlling {...props}><textarea {...input} {...restProps}/></FormControlling>
}
export const Input = (props) => {
    const {input,meta,...restProps} = props
    return <FormControlling {...props}><input {...input} {...restProps}/></FormControlling>
}
export default class FieldFileInput  extends Component{
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render(){
    const { input: { value } } = this.props
    const {input,label, required, meta, } = this.props  
    return(
     <div><label>{label}</label>
     <div>
       <input
        type='file'
        accept='.jpg, .png, .jpeg'
        onChange={this.onChange}
       />
     </div>
     </div>
    )
}
}