import axios from "axios";

//이메일 토큰의 만료시간을 가져오는 API
export const getExpirationTimeApi = () :Promise<number|Error>=>{
    return new Promise((resolve,reject)=>{
        axios.get('api/emailTokenExpiration')
            .then((res)=>{
                resolve(res.data)
            })
            .catch((err)=>{
                console.log(err)
                reject(err)
            })
    })
}

