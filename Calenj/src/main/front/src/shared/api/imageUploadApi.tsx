import axios from "axios";

export const imageUploadApi = ( data: FormData ) : void =>{

        axios.post('/api/imageUpload', data)
            .then((res)=>{
                if(res.data ===200){
                    console.log('Image uploaded successfully!');
                }else{
                    console.error('Failed to upload image');
                }
            })
            .catch((err)=>{
                console.error('Error uploading image:', err);
            })
}