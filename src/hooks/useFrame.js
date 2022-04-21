import { useEffect,useCallback } from "react";
import {useSelector,useDispatch} from 'react-redux';
import {setParam} from '../redux/frameSlice';
import { setFunction } from "../redux/functionSlice";
import {FRAME_MESSAGE_TYPE} from '../utils/constant';

export default function useFrame(){
    const dispatch=useDispatch();
    const {origin}=useSelector(state=>state.frame);

    const sendMessageToParent=useCallback((message)=>{
        if(origin){
            window.parent.postMessage(message,origin);
        } else {
            console.log("the origin of parent is null,can not send message to parent.");
        }
    },[origin]);
        
    //这里在主框架窗口中挂载事件监听函数，负责和子窗口之间的操作交互
    const receiveMessageFromMainFrame=useCallback((event)=>{
        console.log("receiveMessageFromMainFrame:",event);
        if(event.data.type===FRAME_MESSAGE_TYPE.INIT){
            dispatch(setParam({origin:event.origin,item:event.data.data}));
        } else if (event.data.type===FRAME_MESSAGE_TYPE.UPDATE_DATA){
            console.log("UPDATE_DATA",event.data)
            dispatch(setFunction(event.data.data));
        }
    },[dispatch]);
        
    useEffect(()=>{
        window.addEventListener("message",receiveMessageFromMainFrame);
        return ()=>{
            window.removeEventListener("message",receiveMessageFromMainFrame);
        }
    });

    return sendMessageToParent;
}