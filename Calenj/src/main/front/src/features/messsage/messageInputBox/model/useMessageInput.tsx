import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendStompMsg} from "../../../../entities/redux/module/StompReducer";
import {RootState} from "../../../../entities/redux/store";
import {MessageInput} from "./types";



export const useMessageInput = ():MessageInput =>{
    const [content, setContent] = useState<string>('');
    const chatRef = useRef<HTMLInputElement>(null);// 채팅 input Ref

    const param = useSelector((state:RootState) => state.stomp.param)
    const dispatch = useDispatch()

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (content === '') return;
        dispatch(sendStompMsg({target: 'groupMsg', param: param, message: content, messageType: "message"}))
        setContent('');
        if (chatRef.current) {
            chatRef.current.value = ''
        }
    }

    return {chatRef,setContent, sendMessage}
}