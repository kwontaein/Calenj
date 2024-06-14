import axios from "axios";

export const createEventTagApi = (newTagName:string, newTagColor:string) =>{
    const newTag = {
        name: newTagName,
        color: newTagColor,
        defaultTag: false
    }
    return axios.post('api/createTag', newTag)
}