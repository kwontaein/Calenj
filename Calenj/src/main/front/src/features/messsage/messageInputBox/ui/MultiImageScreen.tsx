import {
    DeleteButton,
    EditButton, FileName_Container, ImageHoverBackground, ImageHoverBox, ImagePreview,
    ImagePreviewContainer,
    ImagePreviewDiv,
    OptionButtons
} from "../../../../shared/ui/MultiImageUploadStyled";
import React, {useEffect} from "react";
import {ImageHandlerProps} from "../model/types";
import {HR_ImageLine, MultiImage_Container} from "./MultiImageScreenStyled";
import {useComponentSize} from "../../../../shared/model";


export const MultiImageScreen :React.FC<ImageHandlerProps> = ({useMultiImageHandler, isFocus}) =>{
    const [contentRef, contentSize] = useComponentSize()

    return(
        <div ref={contentRef}>
            {useMultiImageHandler.dragOver && (
                <ImageHoverBackground>
                    <ImageHoverBox>
                        Drop your files here
                    </ImageHoverBox>
                </ImageHoverBackground>
            )}
            <input type="file" accept="image/*" onChange={useMultiImageHandler.handleFileChange} multiple style={{display: 'none'}}
                   id="fileInput"/>
            <MultiImage_Container $exist={useMultiImageHandler.file.length>0} $widthSize={contentSize.width}>
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
                            <ImagePreview src={preview.image} alt={`Preview ${index}`}/>
                        </ImagePreviewContainer>
                        <FileName_Container>{preview.name}</FileName_Container>
                    </ImagePreviewDiv>
                ))}
            </MultiImage_Container>
            {useMultiImageHandler.file.length>0 && <HR_ImageLine $isFocus={isFocus}/>}
        </div>
    )
}