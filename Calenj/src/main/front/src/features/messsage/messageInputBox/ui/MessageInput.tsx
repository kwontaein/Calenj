import {MessageSend_Cotainer, MessageSend_Input} from "./MessageInputStyled";
import {ChangeEvent, useRef, useState} from "react";
import {useMessageInput} from "../model/useMessageInput";

export const MessageInput = () =>{
    const {chatRef,setContent,sendMessage}=useMessageInput()


    return(
            <MessageSend_Cotainer onSubmit={sendMessage}>
                <MessageSend_Input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setContent(e.target.value)
                }} ref={chatRef}>
                </MessageSend_Input>
            </MessageSend_Cotainer>
    )
}