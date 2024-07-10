import {
    DeleteButton,
    EditButton, FileName_Container, ImageHoverBackground, ImageHoverBox, ImagePreview,
    ImagePreviewContainer,
    ImagePreviewDiv,
    OptionButtons
} from "../../../../shared/ui/MultiImageUploadStyled";
import React, {useEffect, useState} from "react";
import {ImageHandlerProps} from "../../messageInputBox/model/types";
import {HR_ImageLine, MultiImage_Container} from "./MultiImageScreenStyled";
import {useComponentSize} from "../../../../shared/model";
import {FileModifyModal} from "./FileModifyModal";
import {ImagePreView} from "./ImagePreView";


export const MultiImageScreen :React.FC<ImageHandlerProps> = ({useMultiImageHandler, isFocus}) =>{
    const [contentRef, contentSize] = useComponentSize()
    const [modifyIndex,setModifyIndex] =useState(-1)
    const [showPreviewIndex,setPreviewIndex] = useState(-1)


    useEffect(() => {
        console.log(useMultiImageHandler.file)
    }, [useMultiImageHandler.file]);

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
                {modifyIndex!==-1 && <FileModifyModal setModifyIndex={setModifyIndex} index={modifyIndex}
                                                      previews={useMultiImageHandler.previews}
                                                      setPreviews={useMultiImageHandler.setPreviews}
                                                      setSelectedFiles={useMultiImageHandler.setFiles}/>}
                {showPreviewIndex!==-1 && <ImagePreView preview={useMultiImageHandler.previews[showPreviewIndex]} setPreviewIndex={setPreviewIndex}/>}
                {useMultiImageHandler.previews.map((preview, index) => (
                    <ImagePreviewDiv key={index}>
                        <OptionButtons>
                            <EditButton onClick={() =>{setModifyIndex(index)}}>
                                <i className="bi bi-pencil-square"></i>
                            </EditButton>
                            <DeleteButton onClick={() => useMultiImageHandler.handleCancel(index)}>
                                <i className="bi bi-trash-fill"></i>
                            </DeleteButton>
                        </OptionButtons>
                        <ImagePreviewContainer onClick={()=>setPreviewIndex(index)}>
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