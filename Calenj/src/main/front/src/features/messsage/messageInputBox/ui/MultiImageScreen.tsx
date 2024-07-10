import {
    DeleteButton,
    EditButton, ImageHoverBackground, ImageHoverBox, ImagePreview,
    ImagePreviewContainer,
    ImagePreviewDiv,
    OptionButtons
} from "../../../../shared/ui/MultiImageUploadStyled";
import React from "react";
import {ImageHandlerProps} from "../model/types";



export const MultiImageScreen :React.FC<ImageHandlerProps> = ({useMultiImageHandler}) =>{

    return(
        <div>
            {useMultiImageHandler.dragOver && (
                <ImageHoverBackground>
                    <ImageHoverBox>
                        Drop your files here
                    </ImageHoverBox>
                </ImageHoverBackground>
            )}
            <input type="file" accept="image/*" onChange={useMultiImageHandler.handleFileChange} multiple style={{display: 'none'}}
                   id="fileInput"/>
            <div>
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
                        <div>파일이름</div>
                    </ImagePreviewDiv>
                ))}</div>
        </div>
    )
}