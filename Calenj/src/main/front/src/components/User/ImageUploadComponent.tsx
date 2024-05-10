import React, {useState} from 'react';
import axios from "axios";

interface ImageRequest {
    userId: string;
    multipartFile: File;
}

const ImageUploadComponent: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);

    // 파일 선택 시 호출되는 함수
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
            showPreview(file);
        }
    };

    // 파일 미리보기를 생성하는 함수
    const showPreview = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewURL(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // 이미지 업로드 함수
    const handleUpload = async () => {
        if (selectedFile) {
            const data = new FormData();
            const userId: string | null = localStorage.getItem('userId') || "userId";
            data.append('Id', userId);
            data.append('file', selectedFile);
            try {
                const response = await axios.post('/api/imageUpload', data);
                if (response.status === 200) {
                    console.log('Image uploaded successfully!');
                    // 성공 처리
                } else {
                    console.error('Failed to upload image');
                    // 실패 처리
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                // 에러 처리
            }
        } else {
            console.warn('No file selected');
            // 파일 선택 안 됨 처리
        }
    };

    // 이미지 선택 취소 함수
    const handleCancel = () => {
        setSelectedFile(null);
        setPreviewURL(null);
    };

    // 파일 드래그 이벤트 핸들러
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
        const file = event.dataTransfer.files && event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            showPreview(file);
        }
    };

    // 드래그 오버 이벤트 핸들러
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    // 드래그 리브 이벤트 핸들러
    const handleDragLeave = () => {
        setDragOver(false);
    };

    // 붙여넣기 이벤트 핸들러
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        if (event.clipboardData.files.length > 0) {
            const file = event.clipboardData.files[0];
            setSelectedFile(file);
            showPreview(file);
        }
    };

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
            {previewURL && (
                <div>
                    <img src={previewURL} alt="Preview" style={{maxWidth: '100%', maxHeight: '200px'}}/>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
            {selectedFile && (
                <div>
                    <p>Selected File: {selectedFile.name}</p>
                    <button onClick={handleUpload}>Upload</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ImageUploadComponent;
