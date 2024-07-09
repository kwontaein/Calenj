import {
    MessageIcon_Container,
    MessageSend_Box,
    MessageSend_Container,
    MessageSend_Textarea
} from "./MessageInputStyled";
import {useMessageInput} from "../model/useMessageInput";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {useEffect, useState} from "react";

export const MessageInput : React.FC = () =>{
    const {chatRef, handleKeyPress, textAreaHandler} = useMessageInput()
    const {inputSize} = useSelector((state:RootState) => state.messageInputSize);
    const [isFocus, setIsFocus] = useState(false)


    return(
        <MessageSend_Container $inputSize={inputSize}>
            <MessageSend_Box $isFocus={isFocus}>
                <MessageIcon_Container>
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
            </MessageSend_Box>
        </MessageSend_Container>
    )
}