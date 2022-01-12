import React from "react";

type ChildProps = {
    props: {
        key: string,
        label: string,
        handleChange:(key: string, value: any) => void
        children: any[];
        name: string;
        [key: string]: any;
    },
    [key: string]: any;
} 

type FormProps = {
    children: Array<ChildProps & React.ReactNode>
    [key:string]:any
} & React.ReactNode;


class Form extends React.Component<FormProps>{
    state: {
        formData: {
            [key:string]:any
        }
    } = {
        formData:{}
    };

    submit = (cb:(formData:any) =>void) => {
        cb(this.state.formData)
    }


    reset = () => {
        const { formData } = this.state
       Object.keys(formData).forEach(item=>{
           formData[item] = ''
       })
       this.setState({
           formData
       })
    }

    setFormData = (key: string, value: any) => {
        console.log(key, value);
        this.setState({
            formData: {
                ...this.state.formData,
                [key]: value
            }
        })
    }

    render(): React.ReactNode {
        const { children} = this.props;
        const renderChildren: React.ReactNode[] = [];
        console.log(this.state)
        React.Children.forEach(children, (child:ChildProps) => {
            if (child.type.displayName === 'formItem' && React.isValidElement(child)) {
                const { name = '',label = '',children = []} = child.props;
                renderChildren.push(React.cloneElement(child, {
                    name,
                    handleChange: this.setFormData,
                    label,
                    value:this.state.formData[name] || ''
                },children))
            }
        })
        return renderChildren;
    }
}


export default Form;