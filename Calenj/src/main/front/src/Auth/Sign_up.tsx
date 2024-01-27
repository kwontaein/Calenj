import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SignUp :React.FC= () => {

    type role = "MANAGER"|"ADMIN";

    interface MyData{
        accountid: string,
        user_password: string,
        user_email: string,
        user_role: role,
        user_join_date: string,
    }

    const [result,setResult] = useState<string>('');
    
    const today:Date = new Date();
    const formattedDate :string= `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    // 원하는 형식으로 날짜를 설정합니다.

    
    
    const SignHandeler =(key:string, event:string) :void=>{
        setData((prevState)=>{
            return {...prevState, [key]:event}
        })
    }


    
    const [data, setData] = useState<MyData>({
        accountid: '',
        user_password: '',
        user_email: '',
        user_role: 'MANAGER',
        user_join_date: formattedDate,
    });


    const sendAccount = ():void=>{
        axios.post('/api/usersave', data)
            .then(() => {
                setResult("데이터 전송완료");
                window.location.replace("/Sign");
            })
            .catch(error => console.log('데이터 전송 중 에러 발생:', error));
    };
    
 
    return (
        <div style={{marginLeft: "10vw"} }>
            <div>
            <h2>회원가입</h2>
            
            <div>id: <input onChange={(event)=>{SignHandeler("accountid",event.target.value)}}></input></div>
            <div>pw: <input type="password" onChange={(event)=>{SignHandeler("user_password",event.target.value)}}></input></div>
            <div>email: <input onChange={(event)=>{SignHandeler("user_email",event.target.value)}}></input></div>
            <div>phoneNumber: <input onChange={(event)=>{SignHandeler("user_email",event.target.value)}}></input></div>
            
            <button onClick={sendAccount}>전송하기</button>


            <br></br>
                Result : {result}
            </div>
        </div>
    );
};
export default SignUp;