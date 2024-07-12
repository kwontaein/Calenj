import {useEffect, useState} from 'react';
import {imageUploadApi} from '../api/imageUploadApi';
import {PreviewData, ReturnFileHandler} from "./types";
import {useSelector} from "react-redux";
import {RootState} from "../../entities/redux";


export const useMultiImageHandler = (): ReturnFileHandler => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<PreviewData[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const groupId= useSelector((state:RootState)=> state.subNavigation.group_subNavState.param)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const selectedFilesArray = Array.from(files);
            setSelectedFiles(prevFiles => [...prevFiles, ...selectedFilesArray]);
            const previewUrls = selectedFilesArray.map(file => {
                return {
                    image: URL.createObjectURL(file),
                    name: file.name,
                }
            });
            setPreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length > 0) {
            const userId: string = localStorage.getItem('userId') || "userId";
            const formData = new FormData();
            formData.append('groupId', groupId);
            formData.append('userId', userId);
            selectedFiles.forEach(file => {
                formData.append('files', file);
            });
            console.log(formData)
            await imageUploadApi(formData).then(()=>{
                setPreviews([]);
                setSelectedFiles([]);
            });
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
            const previewUrls = selectedFilesArray.map(file => {
                return {
                    image: URL.createObjectURL(file),
                    name: file.name,
                }
            });
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
        setPreviews,
        dragOver
    };
}
