import {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ChatContentMap, sendStompMsg} from "../../../../entities/redux";
import {RootState} from "../../../../entities/redux";
import {MessageInput} from "./types";
import {debounce} from "../../../../shared/lib";
import {updateInputSize} from "../../../../entities/redux/model/slice/InputSizeSlice";
import {ReturnFileHandler} from "../../../../shared/model";
import {imageUploadApi} from "../../../../shared/api/imageUploadApi";


export const useMessageInput = (multiImageHandler: ReturnFileHandler): MessageInput => {
    const {navigateParam, navigate} = useSelector((state: RootState) => state.navigateInfo)
    const {inputSize, inputMaxSize} = useSelector((state: RootState) => state.messageInputSize);

    const [content, setContent] = useState<string>('');
    const chatRef = useRef<HTMLTextAreaElement>(null);// 채팅 input Ref
    const dispatch = useDispatch()

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.value = ChatContentMap.get(navigateParam) || ''
            reSizingInputHeight()
        }
    }, [navigateParam])


    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage()
        }
    };

    //input 사이즈 조절
    const reSizingInputHeight = () => {
        if (!chatRef.current) return
        chatRef.current.style.height = '40px'; //height 초기화
        //최대 넓이를 넘지 않도록 input 사이즈 조정
        chatRef.current.style.height = chatRef.current.scrollHeight + 2 < inputMaxSize ? chatRef.current.scrollHeight + 2 + 'px' : inputMaxSize + 'px';
        //input의 크기
        const height = +(chatRef.current.style.height.replace('px', ''))

        if (inputSize !== chatRef.current.scrollHeight) {
            dispatch(updateInputSize({inputSize: (multiImageHandler.file.length > 0 ? 185 : 20) + height}))
        }
    }


    useEffect(() => {
        reSizingInputHeight()
    }, [inputMaxSize, multiImageHandler.file.length]);

    const textAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        reSizingInputHeight()
        setContent(e.target.value)
    }


    const sendMessage = () => {

        //무의미한 \n 제거
        const newContent: string = content.split('\n').reduce((prev, current) => {
            if (prev === '') {
                return prev + current
            } else {
                return prev + '\n' + current
            }
        })

        if (multiImageHandler.file.length > 0) {
            multiImageHandler.handleUpload()
        }

        if (newContent === '') return;
        //메세지 전송
        let target = navigate ==='main' ? 'friendMsg' :'groupMsg'
        dispatch(sendStompMsg({target: target, param: navigateParam, message: newContent, messageType: "message"}))
        setContent('');
        if (chatRef.current) {
            chatRef.current.value = ''
            reSizingInputHeight()
        }
    }

    return {chatRef, handleKeyPress, textAreaHandler}
}