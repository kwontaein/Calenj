import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Test(){

    const [data, setData] = useState({
        userName: "dysj12",
        userPw : "dysj1234"    
    })

    const [result, setResult] = useState("연결중")

    useEffect(()=>{
        console.log("실행")
        axios.post('/api/login',data)
        
        .then((res) =>{
            setResult(res.data);
        }).catch((err)=>{
            console.log(err)
        })
    },[])


    return(
        <div>
            <h2>데이터 전송 예제 : {result}</h2>
        </div>
    )
}