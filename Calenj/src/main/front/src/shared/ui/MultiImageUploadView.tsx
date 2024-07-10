import React from 'react';
import {useMultiImageHandler} from '../model';
import {
    DeleteButton,
    EditButton,
    FileName,
    ImageHoverBackground,
    ImageHoverBox,
    ImageInputContainer, ImagePreview,
    ImagePreviewContainer, ImagePreviewDiv, OptionButtons
} from "./MultiImageUploadStyled";

const MultiImageUploadView: React.FC = () => {
    const {
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleCancel,
        handleUpload,
        handleFileChange,
        file,
        previews,
        dragOver
    } = useMultiImageHandler();

    return (
        <>
            {dragOver && (
                <ImageHoverBackground>
                    <ImageHoverBox>
                        Drop your files here
                    </ImageHoverBox>
                </ImageHoverBackground>
            )}
                <ImageInputContainer
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <input type="file" accept="image/*" onChange={handleFileChange} multiple style={{display: 'none'}}
                           id="fileInput"/>
                    <div>
                        {previews.map((preview, index) => (
                            <ImagePreviewDiv key={index}>
                                <OptionButtons>
                                    <EditButton onClick={() => handleCancel(index)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </EditButton>
                                    <DeleteButton onClick={() => handleCancel(index)}>
                                        <i className="bi bi-trash-fill"></i>
                                    </DeleteButton>
                                </OptionButtons>
                                <ImagePreviewContainer>
                                    <ImagePreview src={preview} alt={`Preview ${index}`}/>
                                </ImagePreviewContainer>
                                <div>파일이름</div>
                            </ImagePreviewDiv>
                        ))}</div>

                    {file.length > 0 && (
                        <FileName>
                            <button onClick={handleUpload}>업로드</button>
                        </FileName>
                    )}
                </ImageInputContainer>
                <button onClick={() => document.getElementById('fileInput')?.click()}>파일선택</button>
        </>
    );
};

export default MultiImageUploadView;
