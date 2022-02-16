import React,{useCallback, useMemo,useState} from "react";

const Child = ({num}:{num:number}) => {
    console.log('child render!');
    return <div>
        {num}
    </div>
}

// 父级优化策略
export const  MemoParent  = () => {
    const [numA,setNumA] = useState(0)
    const [numB,setNumB] = useState(0)

        return <div>
            {
                // useMemo 会记录上一次执行 create 的返回值，并把它绑定在函数组件对应的 fiber 对象上
                // 只要组件不销毁，缓存值就一直存在，
                // 但是 deps 中如果有一项改变，就会重新执行 create ，返回值作为新的值记录到 fiber 对象上。
                useMemo(() =><Child num={numA} />,[numA])
            } 
            <button onClick={() =>{setNumA(numA + 1)}} >NumA ++</button>
            <button onClick={() =>{setNumB(numB + 1)}} >NumB ++</button>
        </div>
}


// 类组件自身优化策略：PureComponent（浅比较组件的props和state）、shouldComponentUpdate


class ClassChild extends React.PureComponent<any>{
    
    render(): React.ReactNode {
        console.log('class child render!');
        return<div>
            class child
            {/* 突破render限制，强更新的方法 */}
            {/* 另一个是context */}
        <button onClick={() =>{this.forceUpdate()}}>forceUpdate</button>
        </div>
    }
}

export const PureParent = () =>{
    // 返回一个缓存的函数
    const callback =useCallback(() =>{},[]);
    const [NumC,setNumC] = useState(0)
    return <div>
        {
            useMemo(() =><ClassChild callback={callback}/>,[]
            )
        }
        <ClassChild callback={callback}/>
    <button onClick={() =>setNumC(NumC+1)}>NumC ++</button>
    </div> 
}


// 通用优化策略：React.memo(Component,compareFn)，第二个参数是比较函数，如果返回true则不更新

export class ForceParent extends React.Component{
    state = {
        num:0
    }

    render(): React.ReactNode {
        return <div>
        <ClassChild />
        <button onClick={() =>{this.setState({num:this.state.num+1})}}>NumC ++</button>
    </div> 
    }
}