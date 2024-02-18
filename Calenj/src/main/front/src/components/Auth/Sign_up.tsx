import axios, { AxiosResponse} from 'axios';
import {useForm, SubmitHandler, SubmitErrorHandler, FieldErrors} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from 'react';
import {SignUpFormContainer,Input, Button, ErrorMessage,FormLable} from '../../style/FormStyle';
// import EmailValidationComponent from './EmailValidationComponent';
import schema from '../../formShema/signSchema';
import '../../style/sign.scss'



type role = "MANAGER" | "ADMIN" | "USER";

interface UserData {
    nick_name: string;
    accountid: string;
    user_password: string;
    password_check?: string;
    user_email: string;
}

//인터페이스 확장
interface User extends UserData {
    user_role?: role;
    user_join_date?: string;
    email_certification?: string;
}



const SignUp: React.FC = () => {

    


  //regiset : 첫번재 매개변수 객체의 key값을 받음, 2번째 매개변수로는 객체에 대한 유효성 검증코드
    //watch : 옵저버 기능 ->  register 한 항목의 변경사항을 추적
    //handleSubmit : Submit 시 사용, 데이터 유효성 검사가능(2번째 매개변수에 함수등록)
    const {register, handleSubmit, formState: {errors}, reset, watch, trigger} = useForm<User>({
        resolver: yupResolver(schema), //유효성 검사
        mode: 'onChange' //실시간 유효성 검사를 위한 설정
    });

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [validation, setValidation] = useState<string>('');
    const accountId = watch("accountid");



    // 원하는 형식으로 날짜를 설정합니다.
    const makeJoinDate = (): string => {
        const today: Date = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }


    //성공 시
    const onValid: SubmitHandler<User> = (data: User): Promise<Object> => {
        data.user_role = "USER";
        data.user_join_date = makeJoinDate();
        console.log("회원가입 성공");
        return axios.post('api/usersave', data)
            .then((response: AxiosResponse<Object>) => response.data)
            .catch((error) => Promise.reject(error));
    };

    //실패 시
    const onInvalid: SubmitErrorHandler<User> = (errors: FieldErrors): void => {
        console.log(errors)
    }



    //아이디 중복체크
    const accountIdDuplication = async (): Promise<void> => {
        const isValid = await trigger("accountid");
        console.log(isValid);
        if(isValid) {
            console.log(`${accountId}로 중복확인`)
            const response = await axios.post('/api/IdDuplicated' , null,{
                params: {
                    userName: accountId
                }
            });
            if(response.data){ 
                window.alert("사용 가능한 아이디입니다.")
            }else{
                window.alert("중복된 아이디입니다.")
            }
            //스키마로 id 중복체크 검증
            // schema.validate({id_duplication: response.data}).catch((err)=> console.log(err.message))
        }
    };

    const emailValidationController = ()=>{

    }




    return (
        <div>
            <SignUpFormContainer>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit(onValid, onInvalid)}>
                <div>
                    <FormLable>닉네임</FormLable>
                </div>
                <div>
                    <Input {...register("nick_name", {required: true})} placeholder="닉네임"/>
                    <ErrorMessage>{errors.nick_name?.message}</ErrorMessage>
                </div>
                <div>
                    <FormLable>아이디</FormLable>
                </div>
                <div>
                    <Input {...register("accountid", {required: true, validate:{zero:(value)=>value.length==0? "아이디를 입력해주세요":""}})} placeholder="아이디"></Input>
                    <div id='btn_idValidation' onClick={accountIdDuplication}>중복확인</div>
                    <ErrorMessage>{errors.accountid?.message}</ErrorMessage>
                </div>
                <div>
                    <FormLable>이메일</FormLable>
                </div>
                <div>    
                    <Input type="email" {...register("user_email", {required: true})} placeholder="이메일"></Input>
                    <ErrorMessage>{errors.user_email?.message}</ErrorMessage>
                </div>

                <div id='btn_eamilValidation' >{validation === '' ? "인증번호 발급" : "인증번호 재발급"}</div>
                <br></br>
            
                <div>
                <div>
                    <FormLable>패스워드</FormLable> 
                </div>
                    <Input type="password" {...register("user_password", {required: true})} placeholder="비밀번호"></Input>
                    <ErrorMessage>{errors.user_password?.message}</ErrorMessage>
                </div>             
                <div>
                    <FormLable>패스워드 확인</FormLable>
                </div>
                <div>
                    <Input type="password" {...register("password_check", {required: true})} placeholder="비밀번호 확인"></Input>
                    <ErrorMessage>{errors.password_check?.message}</ErrorMessage>
                </div>
                <div>
                <Button type="submit" style={{marginTop: '2vw'}}>회원가입</Button>
                </div>
                <br></br>

            </form>
            </SignUpFormContainer>

        </div>
    );
};


export default SignUp;