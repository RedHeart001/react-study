import React,{Component,useContext} from 'react';
type ThemeType = {
    background:string,
    color:string
}

const ThemeContext = React.createContext<ThemeType|null>(null);
const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;


const ConsumerComp = () => {
    console.log("消费者3")
    return <ThemeConsumer>
        {(contextValue: ThemeType | null) => {
            console.log("消费者3 children")
            return <div
                style={{ ...contextValue }}
            >
            消费者3
        </div>
        }
        }
    </ThemeConsumer>
}
const ContextComp3 = React.memo(() => <ConsumerComp />) 

const ContextComp2 = () => {

    // 函数组件专用，useContext的参数是要获取value的context，返回的value是最近的provider返回的值
    const contextValue = useContext(ThemeContext);
    const { background = "", color="" } = contextValue || {};
    console.log("消费者2")
        return <div style={{background,color}}>
            消费者2
        </div>
}

class ContextComp1 extends Component{

    render(): React.ReactNode {
        console.log("消费者1")
        const {background,color} = this.context
        return <div style={{background,color}}>
            消费者1
        </div>
    }
}
// 获取最近一层的provider提供的value，只适用于类组件
ContextComp1.contextType = ThemeContext



export class ContextApp extends Component{

    state = {
        theme: {
            background: "pink",
            color:"yellow"
        }
    }

    changeColor = () => {
        this.setState({
            theme:{
                background:'',
                color:""
            }
        })
    }

    render(): React.ReactNode {
        console.log('app render')
        return <>
        <ThemeProvider value={this.state.theme}>
                <ContextComp1 />
                <ContextComp2 />
                <ContextComp3/>
        </ThemeProvider>
        <button onClick={this.changeColor}>change theme</button>
        </>
    }
}