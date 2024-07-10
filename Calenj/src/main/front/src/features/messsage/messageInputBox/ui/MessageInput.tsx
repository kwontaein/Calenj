import {
    Message_Box_Container,
    MessageIcon_Container, MessageInput_Container,
    MessageSend_Container,
    MessageSend_Textarea
} from "./MessageInputStyled";
import {useMessageInput} from "../model/useMessageInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {useEffect, useState} from "react";
import MultiImageUploadView from "../../../../shared/ui/MultiImageUploadView";
import {useMultiImageHandler} from "../../../../shared/model";
import {MultiImageScreen} from "./MultiImageScreen";
import {updateInputSize} from "../../../../entities/redux/model/slice/InputSizeSlice";

export const MessageInput : React.FC = () =>{
    const {chatRef, handleKeyPress, textAreaHandler} = useMessageInput()
    const {inputSize} = useSelector((state:RootState) => state.messageInputSize);
    const [isFocus, setIsFocus] = useState(false)
    const multiImageHandler = useMultiImageHandler();
    const dispatch = useDispatch()
    const [isFile,setIsFile] = useState<boolean>();

    useEffect(() => {
        if(multiImageHandler.file.length>0){
            setIsFile(true)
        }else{
            setIsFile(false)
        }
    }, [multiImageHandler.file])

    useEffect(() => {
        if(isFile ===undefined) return
        if(isFile){
            dispatch(updateInputSize({inputSize: inputSize + 150}))
        }else if(!isFile){
            dispatch(updateInputSize({inputSize: inputSize - 150}))
        }

    }, [isFile]);


    return(
        <MessageSend_Container $inputSize={inputSize}>
            <Message_Box_Container $isFocus={isFocus}>
                <MultiImageScreen useMultiImageHandler={multiImageHandler}/>
                <MessageInput_Container>
                    <MessageIcon_Container onClick={() => document.getElementById('fileInput')?.click()}>
                        <i className="bi bi-plus-circle-fill"></i>
                    </MessageIcon_Container>
                    <MessageSend_Textarea
                        ref={chatRef}
                        rows={1}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={textAreaHandler}
                        onKeyDown={handleKeyPress}>
                    </MessageSend_Textarea>
                </MessageInput_Container>
            </Message_Box_Container>
        </MessageSend_Container>
    )
}