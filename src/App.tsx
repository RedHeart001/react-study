import React from "react"
import ReactDOM, { unstable_batchedUpdates, flushSync } from "react-dom"
import {Form,FormItem,Input} from './form'

interface stateInterface {
  readonly num: number
}

class App extends React.Component {
  state: stateInterface = {
    num: 1,
  }

  // 同步更新

  batchUpdate = () => {
    this.setState({
      num: 2,
    })
    this.setState({
      num: 3,
    })
    console.log(this.state.num)
    this.setState(
      (state: stateInterface, props) => {
        console.log(state.num)
        return {
          num: 4,
        }
      },
      () => {
        console.log(this.state.num)
      }
    )
    console.log(this.state.num)
    this.setState(
      {
        num: 5,
      },
      () => {
        console.log(this.state.num)
      }
    )
    console.log(this.state.num)
  }

  asyncBatch1 = () => {
    setTimeout(() => {
      this.batchUpdate()
    }, 50)
  }

  asyncBatch2 = () => {
    setTimeout(() => {
      unstable_batchedUpdates(() => {
        this.batchUpdate()
      })
    }, 50)
  }

  componentDidMount() {
    this.asyncBatch1()
  }

  flushSyncBatch = () => {
    // this.setState({
    //   num: 2,
    // })
    flushSync(() => {
      this.setState({
        num: 3,
      })
    })
    this.setState({
      num: 4,
    })
    this.setState({
      num: 5,
    })
  }

  render() {
    console.log(this.state.num)
    return (
      <div className="App">
        <button onClick={this.flushSyncBatch}>flush button</button>
        {this.state.num}
      </div>
    )
  }
}

export default App

export function Index(props: any) {
  const [number, setNumber] = React.useState(0)
  /* 监听 number 变化 */
  React.useEffect(() => {
    console.log("监听number变化，此时的number是:  " + number)
  }, [number])
  const handerClick = () => {
    /* 批量更新 */
    setNumber(1)
    /** 高优先级更新 ，同时合并上下文中之前的更新操作**/
    ReactDOM.flushSync(() => {
      setNumber((state) => state + 1)
    })
    /* 滞后更新 ，批量更新规则被打破 */
    setTimeout(() => {
      setNumber(3)
    })
  }
  console.log(number)
  return (
    <div>
      <span> {number}</span>
      <button onClick={handerClick}>number++</button>
    </div>
  )
}

export const Container = () => {
  const form = React.useRef<{
    submit:(cb: (data:any) =>void) => void,
    reset:() =>void
  } & Form>(null)
    const submit =()=>{
        /* 表单提交 */
         form.current?.submit((formValue:any)=>{
            console.log(formValue)
        })
    }
    const reset = ()=>{
        /* 表单重置 */
         form.current?.reset()
    }
    return <div className='box' >
        <Form ref={ form } >
            <FormItem name="name" label="我是"  >
                <Input   />
            </FormItem>
            <FormItem name="mes" label="我想对大家说"  >
                <Input   />
            </FormItem>
            <input  placeholder="不需要的input" />
            <Input/>
        </Form>
        <div className="btns" >
            <button className="searchbtn"  onClick={ submit } >提交</button>
            <button className="concellbtn" onClick={ reset } >重置</button>
        </div>
    </div>
}
