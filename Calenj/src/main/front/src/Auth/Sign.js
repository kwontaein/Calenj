import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Sign(){
    const SignHandeler =(key, event) =>{
        setData((prevState)=>{
            return {...prevState, [key]:event}
        })
    }

    const [data, setData] = useState({
        accountid: '',
        user_password: '',
    });



    const login = () => {
        axios.post('/api/testlogin', data)
            .then(response => window.location.replace("/"))
            .catch(error => console.log(error))
    };



    return (
        <div>
            <div>id: <input onChange={(event)=>{SignHandeler("accountid",event.target.value)}}></input></div>
            <div>pw: <input type="password" onChange={(event)=>{SignHandeler("user_password",event.target.value)}}></input></div>
     
            <button onClick={login}>로그인</button> 
        
        </div>
    );
    
}