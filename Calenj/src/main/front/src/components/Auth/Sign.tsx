import React, {useState} from 'react';
import axios,{AxiosResponse} from 'axios';


 const Sign : React.FC=()=>{


    interface MyData{
        userEmail: string;
        userPassword: string;
    }

    const [data, setData] = useState<MyData>({
        userEmail: '',
        userPassword: '',
    });


    const SignHandeler =(key:string, event:string):void =>{
        setData((prevState : MyData)=>{
            return {...prevState, [key]:event}
        })
    };

   


    const login = ():void => {
        console.log(data);
        axios.post('/api/login', data)
            .then((response:AxiosResponse<Object>) => document.location.replace("/"))
            .catch(error => {
                if(error.response.data === "NON_EXISTENT_ERROR"){
                    window.alert("존재하지 않는 아이디 입니다. 다시 확인해주세요.")
                }else if(error.response.data==="PW_ERROR"){
                    window.alert("비밀번호가 틀렸습니다. 다시 입력해주세요.")
                }
            })
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