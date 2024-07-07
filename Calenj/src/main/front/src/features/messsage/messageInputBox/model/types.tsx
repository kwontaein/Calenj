import {ChangeEvent} from "react";

export interface MessageInput{
    chatRef: React.RefObject<HTMLTextAreaElement>,
    handleKeyPress : (event:  React.KeyboardEvent<HTMLTextAreaElement>) => void,
    textAreaHandler:  (e: ChangeEvent<HTMLTextAreaElement>)=>void,
}

export interface MessageInputProps{
    inputSize : number,
    setInputSize : React.Dispatch<React.SetStateAction<number>>
}