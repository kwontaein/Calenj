import {MessageSend_Container, MessageSend_Textarea} from "./MessageInputStyled";
import {useMessageInput} from "../model/useMessageInput";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";

export const MessageInput : React.FC = () =>{
    const {chatRef, handleKeyPress, textAreaHandler}=useMessageInput()
    const {inputSize} = useSelector((state:RootState) => state.messageInputSize);

    return(
        <MessageSend_Container $inputSize={inputSize}>
            <MessageSend_Textarea
                ref={chatRef}
                rows={1}
                onChange={textAreaHandler}
                onKeyDown={handleKeyPress}>
            </MessageSend_Textarea>
        </MessageSend_Container>
    )
}