import React from "react";

export const FormItem = (props:any) => {
    const { name = '', label = '', children = [], value, handleChange } = props;
    
    const onChange = (value: any) => {
        console.log(name);
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
export const Input = (props: any) => {
    const { onChange, value } = props;
    return  <input className="input"  onChange={ (e)=>( onChange && onChange(e.target.value) ) } value={value}  />
}

/* 给Component 增加标签 */
Input.displayName = 'input';
FormItem.displayName = 'formItem'