import React, {useState} from 'react';
import axios,{AxiosResponse} from 'axios';

 const Sign : React.FC=()=>{

    interface MyData{
        userEmail: string;
        userPassword: string;
    }

    const SignHandeler =(key:string, event:string):void =>{
        setData((prevState : MyData)=>{
            return {...prevState, [key]:event}
        })
    };

    const [data, setData] = useState<MyData>({
        userEmail: '',
        userPassword: '',
    });



    const login = ():void => {
        console.log(data);
        axios.post('/api/login', data)
            .then((response:AxiosResponse<Object>) => window.location.replace("/"))
            .catch(error => console.log(error))
    };

    

    // git 연동 테스트3
    return (
        <div>
            <div>id: <input onChange={(event)=>{SignHandeler("userEmail",event.target.value)}}></input></div>
            <div>pw: <input type="password" onChange={(event)=>{SignHandeler("userPassword",event.target.value)}}></input></div>
     
            <button onClick={login}>로그인</button> 
        
        </div>
    );
    
}
export default Sign;