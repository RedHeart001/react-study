import React, { useState } from "react";
// 如果是ts还需要引入@types/lodash
import  debounce  from "lodash/debounce";

export const FormItem = (props:any) => {
    const { name = '', label = '', children = [], value, handleChange } = props;
    
    const onChange = (value: any) => {
        console.log(value);
        handleChange(name,value);
    }
    const prop = { onChange, value };
    return <div key={name} style={{margin:"10px"}}>
        <span style={{ marginRight: "10px" }}>{label}</span>
        <span>
            {
                React.isValidElement(children) ?
                    React.cloneElement(children,{...prop}):null
            }
        </span>
    </div>
}

/* Input 组件, 负责回传value值 */
// export const Input = (props:any) => {
//     const { onChange, value } = props;
    
//     const db = debounce((value: any) => {
//         console.log(value);
//         onChange(value);
//     },200)

//     const change = (e: any) => {
//         e.persist();
//         db(e.target.value)
//     }
//     return  <input className="input"  onChange={change } value={value}  />
// }

export class Input extends React.Component<any> {
    constructor(props: any) {
        super(props);

    }
    
    changeValue = debounce((value: any) => {
        const { onChange } = this.props;
        onChange(value);
     },200)

     change = (e: any) => {
        e.persist();
        this.changeValue(e.target.value)
}
    render() {
        const { value } = this.props;
    return  <input className="input"  onChange={this.change } value={value}  />
    }
}

/* 给Component 增加标签 */
// Input.displayName = 'input';
FormItem.displayName = 'formItem'