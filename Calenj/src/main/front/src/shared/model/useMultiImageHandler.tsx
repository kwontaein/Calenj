import React, {useState} from "react";
import axios from "axios";
import {imageUploadApi} from "../api/imageUploadApi";
interface ReturnFileHandler{
    handleDrop : (event: React.DragEvent<HTMLDivElement>) => void,
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void,
    handleDragLeave : ()=>void,
    handleCancel : (index: number) =>void,
    handleUpload : () =>void,
    handleFileChange : (event: React.ChangeEvent<HTMLInputElement>)=>void
    file : File[],
    setFiles :  React.Dispatch<React.SetStateAction<File[]>>,
    previews : string[],
    dragOver : boolean,
}

export const useMultiImageHandler = () :ReturnFileHandler=>{
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
            imageUploadApi(formData)
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

    return {
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleCancel,
        handleUpload ,
        handleFileChange,
        file : selectedFiles,
        setFiles : setSelectedFiles,
        previews,
        dragOver
    }
}

