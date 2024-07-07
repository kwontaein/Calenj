import React from 'react';
import {useMultiImageHandler} from "../model";

const ImagesUploadComponent: React.FC = () => {
    const {
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleCancel,
        handleUpload,
        handleFileChange,
        file,
        setFiles,
        previews,
        dragOver
    } = useMultiImageHandler();

    return (
        <>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                    border: dragOver ? '2px dashed blue' : '2px solid black',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                    style={{display: 'none'}}
                    id="fileInput"/>


                {previews.map((preview, index) => (
                    <div key={index}>
                        <img src={preview} alt={`Preview ${index}`} style={{maxWidth: '100px', maxHeight: '100px'}}/>
                        <button onClick={() => handleCancel(index)}>취소</button>
                    </div>
                ))}
                {file.length > 0 && (
                    <div>
                        <button onClick={handleUpload}>업로드</button>
                    </div>
                )}
            </div>


            <button onClick={() => document.getElementById('fileInput')?.click()}>파일선택</button>
        </>
    );
};

export default ImagesUploadComponent;
