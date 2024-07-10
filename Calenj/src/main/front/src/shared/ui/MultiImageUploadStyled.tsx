import styled from "styled-components";
import {ThemeColor2, ThemeColor3} from "./SharedStyled";

export const ImageHoverBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
`
export const ImageHoverBox = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
`

export const ImageInputContainer = styled.div`
    border: 2px solid black;
    border-radius: 5px;
    text-align: center;
    padding: 20px;
    margin-bottom: 10px;
`
export const ImagePreviewDiv = styled.div`
    display: inline-block;
    justify-content: center;
    margin: 0 20px;
    width: 120px;
    height: 150px;
    border-radius: 5px;
    background-color: ${ThemeColor3};
`
export const ImagePreviewContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 110px;
    margin: 5px;
`


export const ImagePreview = styled.img`
    max-width: 100px;
    max-height: 100px;
    border-radius: 2px;
`
export const OptionButtons = styled.div`
    position: absolute;
    margin-left: 80px;
    background-color: ${ThemeColor3};
    border-radius: 5px;
`
export const FileName = styled.div`
    margin: 5px;
`

export const EditButton = styled.button`
    background-color: ${ThemeColor3};
    
    &:hover {
        background-color: black;
    }
`

export const DeleteButton = styled.button`
    color: red;
    background-color: ${ThemeColor3};

    &:hover {
        background-color: black;
    }
`