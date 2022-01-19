import React, { Component, forwardRef, useEffect, useRef, useState,useImperativeHandle } from "react";

// 通过forwardRef，实现跨层级获取组件
function Son(props:any) {
    const { grandRef } = props;
    return<div ref={grandRef}>i am son component</div>
}

function Father(props: any) {
    const { grandRef } = props;
    return <div>
        <Son grandRef={ grandRef}/>
    </div>
}

const NewFather = React.forwardRef((props: any, ref: any) => <Father {...props} grandRef={ ref} />)

export const GrandFather =(props:any) =>{
    let ref = useRef(null);
    useEffect(() =>{
        console.log(ref) // span #text 这个是想要获取元素
    },[])
        return <div>
            <NewFather ref={(node:any)=> ref = node } />
        </div>
}

// 通过forwardRef改变ref
const RefComp = (props:any) => {
    const { forwardRef } = props;
    let btnRef = React.useRef(null);
    let formRef = React.useRef(null);
    useEffect(() => {
        forwardRef.current = {
            comp: this,
            btnRef,
            formRef
        }
    },[])
    return <div>
        <button ref={(node: any) => btnRef = node}>button</button>
        <form ref={(node: any) => formRef = node}/>
    </div>
}

const CusRefComp = React.forwardRef((props: any, ref: any) => <RefComp forwardRef={ ref} {...props}/>)

export const CusRefContainer = () => {
    const ref = React.useRef(null);
    useEffect(() =>{
        console.log(ref) // span #text 这个是想要获取元素
    },[])
    return <CusRefComp ref={ ref}/>
}


// Hoc

class Index extends React.Component<any,any>{
    render(){
      return <div>hello,world</div>
    }
}
type CompProps = typeof Index;
  

function HOC(Component: CompProps) {
    // 如果不希望ref挂载到hoc组件，而是希望指向原始的Index，用forward转发ref
     class Wrap extends React.Component<any,any>{
       render(){
          const { forwardedRef ,...otherprops  } = this.props
          return <Component ref={forwardedRef}  {...otherprops}  />
       }
    }
    return  React.forwardRef((props,ref)=> <Wrap forwardedRef={ref} {...props} /> ) 
  }
  const HocIndex =  HOC(Index)
  export const HocRefContainer = ()=>{
    const node = useRef(null)
    useEffect(()=>{
      console.log(node.current)  /* Index 组件实例  */ 
    },[])
    return <div><HocIndex ref={node}  /></div>
  }



class SonMsg extends Component<{
    toFather:(val:any) =>void,
}> {
    
    state = {
        fatherMsg:"",
        sonMsg:""
    }

    setSonMsg = (sonMsg: string) => {
        this.setState({
            sonMsg
        })
    }
    
    toSon = (fatherMsg: any) => {
        this.setState({
            fatherMsg
         })
    }

    render() {
    const { toFather } = this.props;
    return <div className="sonbox" >
    <div className="title" >子组件</div>
    <p>父组件对我说：{ this.state.fatherMsg }</p>
    <div className="label" >对父组件说</div> <input  onChange={(e)=>this.setSonMsg(e.target.value)}   className="input"  /> 
    <button className="searchbtn" onClick={ ()=> toFather(this.state.sonMsg) }  >to father</button>
</div>
}
    
}

export const FatherMsg = () => {
    const [fatherMsg,setFatherMsg] = useState("")
    const [sonMsg, setSonMsg] = useState("")
    const sonInstance = useRef<{
        toSon: (val:string) =>void
    } & SonMsg>(null);
    const toSon = () => {
        sonInstance && sonInstance.current && sonInstance.current.toSon(fatherMsg);
    }
   return  <div className="box" >
        <div className="title" >父组件</div>
        <p>子组件对我说：{ sonMsg }</p>
        <div className="label" >对子组件说</div> <input onChange={ (e) => setFatherMsg(e.target.value) }  className="input"  /> 
        <button className="searchbtn"  onClick={toSon}  >to son</button>
        <SonMsg ref={sonInstance} toFather={setSonMsg} />
    </div>
}

// 函数组件本身没有ref
// 通过结合useImperativeHandle + forwardRef 可以实现父级控制子组件中的数据

const CusRefSon = (props: any,ref:any) => {
    const inputRef = useRef<any>(null);
    const [val, setVal] = useState("")
    
    useImperativeHandle(ref, () => ({
        onFoucs: () => {
            inputRef.current && inputRef.current.focus();
        },
        onChangeVal: (value:any) => {
            setVal(value)
        }
    }))
    return <input ref={inputRef} value={val}/>
}

const FwdCusRefSon = forwardRef(CusRefSon);


export const CusRefFather = () => {
    let ref: {
        onFoucs:() => void,
        onChangeVal:(val:string) =>void
    } | null= null
    const onClick = () => {
        ref && ref.onFoucs();
        ref && ref.onChangeVal("11111");
    }
    return <>
        <FwdCusRefSon ref={(node:any) =>ref= node}/>
        <button onClick={onClick}>on click</button>
    </>
}



// 通过ref保证内部数据改变（不会涉及视图变化）的时候，组件不会重新render
const toLearn = [ { type: 1 , mes:'let us learn React' } , { type:2,mes:'let us learn Vue3.0' }  ]
export  const  DataDemo = ({ id }:{id:string})=>{
    const typeInfo = React.useRef(toLearn[0])
    const changeType = (info:any)=>{
        typeInfo.current = info /* typeInfo 的改变，不需要视图变化 */
        console.log(typeInfo)
    }
    useEffect(()=>{
        if (typeInfo.current.type === 1) {
            console.log(typeInfo);
       }
    },[ id ]) /* 无须将 typeInfo 添加依赖项  */
    return <div>
        {
            toLearn.map(item => <button
                key={item.type}
                onClick={() =>changeType(item)}
                // onClick={changeType.bind(null, item)}
            >
                {item.mes}
            </button>
            )
        }
    </div>
}



export  class RefDemo extends React.Component{
    state={ num:0 }
    node = null
    getDom= (node:any)=>{
        this.node = node
        console.log('此时的参数是什么：', this.node )
     }
    render(){
        return <div >
            <div ref={(node:any)=>{
        this.node = node
        console.log('此时的参数是什么：', this.node )
     }}>ref元素节点</div>
            <button onClick={()=> this.setState({ num: this.state.num + 1  })} >点击</button>
        </div>
    }
}



export const RefApp = () => {
    return <>
    <GrandFather />
    <HocRefContainer/>
    <CusRefContainer />
    <FatherMsg />
    <CusRefFather />
    <DataDemo id="2" />
    <RefDemo/>
    </>
}