
export interface PreviewData{
    image : string,
    name : string,
}
export interface ReturnFileHandler {
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragLeave: () => void;
    handleCancel: (index: number) => void;
    handleUpload: () => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    file: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    previews: PreviewData[];
    setPreviews :  React.Dispatch<React.SetStateAction<PreviewData[]>>
    dragOver: boolean;
}

