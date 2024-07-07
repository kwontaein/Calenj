import {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ChatContentMap, sendStompMsg} from "../../../../entities/redux";
import {RootState} from "../../../../entities/redux";
import {MessageInput} from "./types";
import {debounce} from "../../../../shared/lib";
import {updateInputSize} from "../../../../entities/redux/model/slice/InputSizeSlice";



export const useMessageInput = ():MessageInput =>{
    const param = useSelector((state:RootState) => state.navigateInfo.navigateParam)
    const {inputSize, inputMaxSize} = useSelector((state:RootState) => state.messageInputSize);

    const [content, setContent] = useState<string>( '');
    const chatRef = useRef<HTMLTextAreaElement>(null);// 채팅 input Ref
    const dispatch = useDispatch()

    //채팅 내용 디바운싱
    const saveContent = useMemo(() => {
        return debounce(()=>{
            if(chatRef.current){
                ChatContentMap.set(param,chatRef.current.value)
            }
        },500)
    }, [param, chatRef]);

    useEffect(() => {
        saveContent()
    }, [content]);

    useEffect(()=>{
        if(chatRef.current){
            chatRef.current.value = ChatContentMap.get(param) || ''
            reSizingInputHeight()
        }
    },[param])


    const handleKeyPress = (event:  React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage()
        }
    };

    //input 사이즈 조절
    const reSizingInputHeight = ()=>{
        if(!chatRef.current) return
        chatRef.current.style.height = '40px'; //height 초기화
        chatRef.current.style.height = chatRef.current.scrollHeight +2 < inputMaxSize ? chatRef.current.scrollHeight +2+'px' : inputMaxSize+'px';

        const height = +(chatRef.current.style.height.replace('px',''))

        if(inputSize !== chatRef.current.scrollHeight){
            dispatch(updateInputSize({inputSize: 20 + height }))
        }
    }

    useEffect(() => {
        reSizingInputHeight()
    }, [inputMaxSize]);

    const textAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>{
        reSizingInputHeight()
        setContent(e.target.value)
    }


    const sendMessage = () => {
        if (content === '') return;
        dispatch(sendStompMsg({target: 'groupMsg', param: param, message: content, messageType: "message"}))
        setContent('');
        if (chatRef.current) {
            chatRef.current.value = ''
            reSizingInputHeight()
        }
    }

    return {chatRef, handleKeyPress, textAreaHandler}
}