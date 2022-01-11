import React from "react";

interface CompProps {
  children?: any
  [key: string]: any
}

const Child1 = (props: CompProps) => {
    console.log(props);
    return <div>
        <h1>{ props.children}</h1>
    </div>
}
const Container1 = (props: CompProps) => {
    console.log(props);
    const children = React.cloneElement(props?.children, { msg: "from container1" }, <div>{props?.children.props.children}</div>)
  return <div className="Container1">{children}</div>
}

const Container2 = (props: CompProps) => {
    const customProps = {
        msg: 'custom msg'
    }


    return <div className="Container1">{props?.children(customProps)}</div>
}
const Container3 = (props: CompProps) => {
    const customProps = {
        msg: 'mix',
        children:<p>mix</p>
    }
    return props.children.map((child:any) => {
        if (React.isValidElement(child)) {
            return child
        } else if(typeof child == "function"){
            return child(customProps)
        } else {
            return null;
        }
    })
}




export const Container = () => {
    return <>
        <Container1>
            <Child1>
                插槽测试
            </Child1>
        </Container1>
        <Container2>
            {(props:any) => <Child1{...props}/>}
        </Container2>
        <Container3>
            <div>111</div>
        {(props:any) => <Child1{...props}/>}
        </Container3>
    </>
}
