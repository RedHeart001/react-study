import {MemoParent,PureParent,ForceParent} from './memo'
export const RenderApp = () =>{
    return <div>
        <MemoParent/>
        <PureParent />
        
        <ForceParent/>
    </div>
}