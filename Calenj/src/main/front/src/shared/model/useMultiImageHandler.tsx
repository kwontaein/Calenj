import {useState, useEffect} from 'react';
import {imageUploadApi} from '../api/imageUploadApi';

interface FilePreview {
    file: File;
    preview: string;
}

interface ReturnFileHandler {
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragLeave: () => void;
    handleCancel: (index: number) => void;
    handleUpload: () => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    file: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    previews: string[];
    dragOver: boolean;
}

export const useMultiImageHandler = (): ReturnFileHandler => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const selectedFilesArray = Array.from(files);
            setSelectedFiles(prevFiles => [...prevFiles, ...selectedFilesArray]);
            const previewUrls = selectedFilesArray.map(file => URL.createObjectURL(file));
            setPreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
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
            await imageUploadApi(formData);
        } else {
            console.warn('No files selected');
        }
    };

    const handleCancel = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, idx) => idx !== index));
        setPreviews(prevPreviews => prevPreviews.filter((_, idx) => idx !== index));
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        setDragOver(false);
        const files = event.dataTransfer?.files;
        if (files) {
            const selectedFilesArray = Array.from(files);
            setSelectedFiles(prevFiles => [...prevFiles, ...selectedFilesArray]);
            const previewUrls = selectedFilesArray.map(file => URL.createObjectURL(file));
            setPreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
        }
    };

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
        if (!dragOver) {
            setDragOver(true);
        }
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    useEffect(() => {
        window.addEventListener('drop', handleDrop);
        window.addEventListener('dragover', handleDragOver);
        window.addEventListener('dragleave', handleDragLeave);

        return () => {
            window.removeEventListener('drop', handleDrop);
            window.removeEventListener('dragover', handleDragOver);
            window.removeEventListener('dragleave', handleDragLeave);
        };
    }, []);

    return {
        handleDrop: (event) => handleDrop(event.nativeEvent as DragEvent),
        handleDragOver: (event) => handleDragOver(event.nativeEvent as DragEvent),
        handleDragLeave,
        handleCancel,
        handleUpload,
        handleFileChange,
        file: selectedFiles,
        setFiles: setSelectedFiles,
        previews,
        dragOver
    };
}
