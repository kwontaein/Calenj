import axios from "axios";

export const imageUploadApi = (data: FormData): Promise<void> => {
    console.log('api')
    console.log(data.getAll('files'))
    return axios.post('/api/imageUpload', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((res) => {
            if (res.status === 200) {
                console.log('Image uploaded successfully!');
            } else {
                console.error('Failed to upload image');
            }
        })
        .catch((err) => {
            console.error('Error uploading image:', err);
        })
}