import React, {useState} from 'react';
import axios,{AxiosResponse} from 'axios';

 const Sign : React.FC=()=>{

    interface MyData{
        accountid: string;
        user_password: string;
    }

    const SignHandeler =(key:string, event:string):void =>{
        setData((prevState : MyData)=>{
            return {...prevState, [key]:event}
        })
    };

    const [data, setData] = useState<MyData>({
        accountid: '',
        user_password: '',
    });



    const login = ():void => {
        axios.post('/api/testlogin', data)
            .then((response:AxiosResponse<Object>) => window.location.replace("/"))
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
export default Sign;