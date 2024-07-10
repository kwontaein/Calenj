import {
    DeleteButton,
    EditButton, FileName_Container, ImageHoverBackground, ImageHoverBox, ImagePreview,
    ImagePreviewContainer,
    ImagePreviewDiv,
    OptionButtons
} from "../../../../shared/ui/MultiImageUploadStyled";
import React from "react";
import {ImageHandlerProps} from "../model/types";
import {MultiImage_Container} from "./MultiImageScreenStyled";


export const MultiImageScreen: React.FC<ImageHandlerProps> = ({useMultiImageHandler, maxWidth}) => {
    console.log("maxWidth", maxWidth);
    return (
        <div>
            {useMultiImageHandler.dragOver && (
                <ImageHoverBackground>
                    <ImageHoverBox>
                        Drop your files here
                    </ImageHoverBox>
                </ImageHoverBackground>
            )}
            <input type="file" accept="image/*" onChange={useMultiImageHandler.handleFileChange} multiple
                   style={{display: 'none'}}
                   id="fileInput"/>
            <MultiImage_Container $maxWidth={maxWidth}>
                {useMultiImageHandler.previews.map((preview, index) => (
                    <ImagePreviewDiv key={index}>
                        <OptionButtons>
                            <EditButton onClick={() => useMultiImageHandler.handleCancel(index)}>
                                <i className="bi bi-pencil-square"></i>
                            </EditButton>
                            <DeleteButton onClick={() => useMultiImageHandler.handleCancel(index)}>
                                <i className="bi bi-trash-fill"></i>
                            </DeleteButton>
                        </OptionButtons>
                        <ImagePreviewContainer>
                            <ImagePreview src={preview} alt={`Preview ${index}`}/>
                        </ImagePreviewContainer>
                        <FileName_Container>파일이름</FileName_Container>
                    </ImagePreviewDiv>
                ))}
            </MultiImage_Container>
        </div>
    )
}