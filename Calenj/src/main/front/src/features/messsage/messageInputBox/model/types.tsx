import {ChangeEvent} from "react";
import {ReturnFileHandler} from "../../../../shared/model";
import {PreviewData} from "../../../../shared/model/types";

export interface MessageInput{
    chatRef: React.RefObject<HTMLTextAreaElement>,
    handleKeyPress : (event:  React.KeyboardEvent<HTMLTextAreaElement>) => void,
    textAreaHandler:  (e: ChangeEvent<HTMLTextAreaElement>)=>void,
}

export interface MessageInputProps{
    inputSize : number,
    setInputSize : React.Dispatch<React.SetStateAction<number>>
}

export interface ImageHandlerProps{
    useMultiImageHandler: ReturnFileHandler;
    isFocus:boolean
}

export interface MultiImageScreenProps{
    setModifyIndex:  React.Dispatch<React.SetStateAction<number>>,
    index :number,
    previews : PreviewData[],
    setPreviews : React.Dispatch<React.SetStateAction<PreviewData[]>>,
    setSelectedFiles :  React.Dispatch<React.SetStateAction<File[]>>,
}
export interface ImagePreviewProps{
    setPreviewIndex:  React.Dispatch<React.SetStateAction<number>>,
    preview : PreviewData,
}