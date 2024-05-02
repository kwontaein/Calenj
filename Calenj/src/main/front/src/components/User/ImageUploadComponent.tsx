import React, {useState} from 'react';
import axios from "axios";

interface ImageRequest {
    userId: string;
    multipartFile: File;
}

const ImageUploadComponent: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const imageRequest: ImageRequest = {
                userId: localStorage.getItem('userId') || '',
                multipartFile: selectedFile,
            };

            console.log(imageRequest)
            try {
                const response = await axios.post('/api/imageUpload', imageRequest);
                if (response.status === 200) {
                    console.log('Image uploaded successfully!');
                    // Handle success
                } else {
                    console.error('Failed to upload image');
                    // Handle error
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                // Handle error
            }
        } else {
            console.warn('No file selected');
            // Handle no file selected
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
        const file = event.dataTransfer.files && event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

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
            }}
        >
            <p>Drag and drop your image here, or click to select file</p>
            <input type="file" accept="image/*" onChange={handleFileChange}/>
            <label htmlFor="fileInput">Select File</label>
            {selectedFile && (
                <div>
                    <p>Selected File: {selectedFile.name}</p>
                    <button onClick={handleUpload}>Upload</button>
                </div>
            )}
        </div>
    );
};

export default ImageUploadComponent;
