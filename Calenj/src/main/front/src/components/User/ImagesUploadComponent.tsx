import React, {useState} from 'react';
import axios from "axios";

interface ImageRequest {
    userId: string;
    multipartFiles: File[];
}

const ImagesUploadComponent: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const selectedFilesArray = Array.from(files);
            setSelectedFiles([...selectedFiles, ...selectedFilesArray]);
            const previewUrls = selectedFilesArray.map(file => URL.createObjectURL(file));
            setPreviews([...previews, ...previewUrls]);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length > 0) {
            const userId: string | null = localStorage.getItem('userId') || "userId";
            const formData = new FormData();
            selectedFiles.forEach(file => {
                formData.append('userId', userId);
                formData.append('files', file);
            });
            try {
                const response = await axios.post('/api/imageUpload', formData);
            } catch (error) {
                console.error('Error uploading images:', error);
                // Handle error
            }
        } else {
            console.warn('No files selected');
        }
    };

    const handleCancel = (index: number) => {
        const updatedSelectedFiles = selectedFiles.filter((_, idx) => idx !== index);
        const updatedPreviews = previews.filter((_, idx) => idx !== index);
        setSelectedFiles(updatedSelectedFiles);
        setPreviews(updatedPreviews);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
        const files = event.dataTransfer.files;
        if (files) {
            const selectedFilesArray = Array.from(files);
            setSelectedFiles([...selectedFiles, ...selectedFilesArray]);
            const previewUrls = selectedFilesArray.map(file => URL.createObjectURL(file));
            setPreviews([...previews, ...previewUrls]);
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
            }}>
            <input type="file" accept="image/*" onChange={handleFileChange} multiple/>
            {previews.map((preview, index) => (
                <div key={index}>
                    <img src={preview} alt={`Preview ${index}`} style={{maxWidth: '100px', maxHeight: '100px'}}/>
                    <button onClick={() => handleCancel(index)}>취소</button>
                </div>
            ))}
            {selectedFiles.length > 0 && (
                <div>
                    <button onClick={handleUpload}>업로드</button>
                    <button onClick={() => setSelectedFiles([])}>전체 취소</button>
                </div>
            )}
        </div>
    );
};

export default ImagesUploadComponent;
