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
    children: Array<ChildProps & React.ReactNode>,
    [key:string]:any
} & React.ReactNode;

class Form extends React.Component<FormProps>{
    state = {
        formData:{}
    };

    submit = (cb:(formData:any) =>void) => {
        cb(this.state.formData)
    }


    reset = () => {
        this.setState({
            formData:{}
        })
    }

    setFormData = (key: string, value: any) => {
        this.setState({
            ...this.state.formData,
            [key]:value
        })
    }

    render(): React.ReactNode {
        const { children} = this.props;
        const renderChildren:React.ReactNode[] = [];
        React.Children.forEach(children, (child:ChildProps) => {
            const { name = '',label = 'default label',children = []} = child.props;
            if (name === 'formItem' && React.isValidElement(child)) {
                renderChildren.push(React.cloneElement(child, {
                    key: name,
                    handleChange:this.setFormData,
                    label
                },children))
            }
        })
        return renderChildren;
    }
}


export default Form;