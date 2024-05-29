import React, {useState} from 'react';
import axios from "axios";
import {useMultiImageHandler} from "../model";

interface ImageRequest {
    userId: string;
    multipartFiles: File[];
}

const ImagesUploadComponent: React.FC = () => {
    const {
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleCancel,
        handleUpload ,
        handleFileChange,
        file ,
        setFiles,
        previews,
        dragOver
    } = useMultiImageHandler()
    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{
                border: dragOver ? '2px dashed blue' : '2px solid black',
                padding: '20px',
                borderRadius: '5px',
                textAlign: 'center'
            }}>
            <input type="file" accept="image/*" onChange={handleFileChange} multiple/>
            {previews.map((preview, index) => (
                <div key={index}>
                    <img src={preview} alt={`Preview ${index}`} style={{maxWidth: '100px', maxHeight: '100px'}}/>
                    <button onClick={() => handleCancel(index)}>취소</button>
                </div>
            ))}
            {file.length > 0 && (
                <div>
                    <button onClick={handleUpload}>업로드</button>
                    <button onClick={() => setFiles([])}>전체 취소</button>
                </div>
            )}
        </div>
    );
};

export default ImagesUploadComponent;
