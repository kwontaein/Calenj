import axios, {AxiosResponse} from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
   

type role = "MANAGER"|"ADMIN";

interface UserData{
    nick_name: string;
    accountid: string;
    user_password: string;
    password_check:string;
    user_email: string;
    
}
//인터페이스 확장
interface User extends UserData{
    user_role?: role;
    user_join_date?: string;
}


const schema: yup.ObjectSchema<UserData> = yup.object().shape({
    nick_name: yup.string()
      .min(2, "닉네임은 최소 2글자 이상입니다!")
      .max(10, "닉네임은 최대 10글자입니다!")
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\\d\s]*$/,
        "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!")
      .required('닉네임을 입력해주세요'),
    // checkNickname: yup.boolean().required('중복체크해주세요'),
    accountid: yup.string()
      .min(3, '3자 이상 입력해주세요!')
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\\d\s]*$/,
        "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!")
      .required('아이디를 입력해주세요'),
      user_password: yup.string()
      .max(16, "비밀번호는 최대 16자리입니다!")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
        "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함한 8자리 이상 입력해주세요"
    )
      // .matches(regexPasswd, '비밀번호를 8~16자로 영문 대소문자, 숫자, 특수기호를 조합해서 사용하세요.')
      .required('비밀번호를 입력해주세요'),
    password_check: yup
      .string()
      .oneOf([yup.ref('user_password'), undefined], '비밀번호가 일치하지 않습니다')
      .required('비밀번호를 한번 더 입력해주세요'),
      user_email: yup.string()
      .email('이메일형식이 적합하지 않습니다.')
      .required('이메일 인증해주세요'),
  })
  

    

const SignUp :React.FC= () => {

   
    //regiset : 첫번재 매개변수 객체의 key값을 받음, 2번째 매개변수로는 객체에 대한 유효성 검증코드
    //watch : 옵저버 기능 ->  register 한 항목의 변경사항을 추적
    //handleSubmit : Submit 시 사용, 데이터 유효성 검사가능(2번째 매개변수에 함수등록)
    const {register, handleSubmit, formState:{errors}, reset}=useForm<UserData>({
        resolver : yupResolver(schema), //유효성 검사
        mode: 'onChange' //실시간 유효성 검사를 위한 설정
        });

    
   
    
    const makeJoinDate=():string=>{
      const today:Date = new Date();
       
      return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      // 원하는 형식으로 날짜를 설정합니다.
    }


    
   const onSubmitHandler : SubmitHandler<User> =async(data:User)=>{
     data.user_role = "MANAGER";
     data.user_join_date = makeJoinDate();
     
     try {
      const result = await postSignup(data);
      console.log('성공:', result);
      document.location.replace('/sign')
    } catch (error) {
      console.error('실패:', error);
    }
   }

   const postSignup = (data: User): Promise<Object> => {
    return axios.post('api/signup', data)
      .then((response: AxiosResponse<Object>) => response.data)
      .catch((error) => Promise.reject(error));
  };




    // const onClickLogin = () => {
    //     document.location.replace('/sign')
    //     reset();
    //   }
 
    return (
        <div style={{marginLeft: "10vw", display:'flex', flexDirection:'column', width:"100px"} }>

          <h2>회원가입</h2>
          
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            
            닉네임: <input {...register("nick_name",{required: true})} placeholder="닉네임"></input>
            아이디: <input {...register("accountid",{required: true})} placeholder="아이디"></input>
            이메일: <input type="email" {...register("user_email",{required: true})} placeholder="이메일"></input>
            패스워드: <input type="password" {...register("user_password",{required: true})} placeholder="비밀번호"></input>
            패스워드 확인: <input type="password" {...register("password_check",{required: true})} placeholder="비밀번호 확인"></input>
            
           <button type="submit" style={{marginTop:'2vw'}}>Submit</button><br></br>
           
          </form>
               
  
        </div>
    );
};
export default SignUp;