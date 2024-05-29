import React, {useState} from 'react';
import axios from "axios";
import {useFileImageHandler} from "../model";

interface ImageRequest {
    userId: string;
    multipartFile: File;
}

const ImageUploadView: React.FC = () => {
    const {handleDrop,
        handleDragOver,
        handleDragLeave,
        handlePaste,
        handleCancel,
        handleUpload ,
        handleFileChange,
        file,
        imageUrl,
        dragOver
    } = useFileImageHandler()

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onPaste={handlePaste}
            style={{
                border: dragOver ? '2px dashed blue' : '2px solid black',
                padding: '20px',
                borderRadius: '5px',
                textAlign: 'center'
            }}
        >
            <input type="file" accept="image/*" onChange={handleFileChange} onPaste={handlePaste}/>
            {imageUrl && (
                <div>
                    <img src={imageUrl} alt="Preview" style={{maxWidth: '100%', maxHeight: '200px'}}/>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
            {file && (
                <div>
                    <p>Selected File: {file.name}</p>
                    <button onClick={handleUpload}>Upload</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ImageUploadView;
