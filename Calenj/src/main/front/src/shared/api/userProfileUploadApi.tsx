import axios from "axios";

export const userProfileUploadApi = (data: FormData): Promise<void> => {
    console.log('api')
    console.log(data.getAll('file'))
    return axios.post('/api/userProfileUpload', data, {
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