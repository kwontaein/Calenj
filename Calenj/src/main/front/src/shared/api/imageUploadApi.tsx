import axios from "axios";

export const imageUploadApi = (data: FormData): Promise<void> => {
    return axios.post('/api/imageUpload', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((res) => {
        })
        .catch((err) => {
            console.error('Error uploading image:', err);
        })
}