import axios, {AxiosResponse} from 'axios';
import {useForm, SubmitHandler, SubmitErrorHandler, FieldErrors} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from 'react';
import {SignUpFormContainer, Input, Button, ErrorMessage, FormLable} from '../../Style/FormStyle';
import EmailValidationComponent from './EmailValidationComponent';
import schema from '../../formShema/signSchema';
import '../../Style/Sign.scss'


type role = "MANAGER" | "ADMIN" | "USER";

interface UserData {
    nick_name: string;
    user_email: string;
    user_password: string;
    password_check?: string;
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
        mode: 'onTouched' //실시간 유효성 검사를 위한 설정
    });

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [validation, setValidation] = useState<boolean>(false);


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


  

    //이메일 인증요청 -api 반환값 : 인증번호 (쿠키 값에 이메일 인증토큰도 있음)
    const emailRequest = async (): Promise<void> => {

        const isValid = await trigger("user_email");
        const email = watch("user_email");
        if (isValid) {

            try {
                const response = await axios.post('api/sendEmail', null,
                    {
                        params: {
                            email: email
                        },
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    }
                );

                console.log(response.data)
                if (response.data != "이미 가입된 이메일입니다." && response.data != "이메일 인증코드는 5분에 한 번 보낼 수 있습니다. 잠시후 다시 시도해 주세요.") {
                    setShowAlert(true);
                    window.alert("이메일 인증코드가 발급되었습니다.")
                } else { //중복된 이메일이 아니고 토큰이 유효하지 않으면 
                    window.alert(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

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
                        <FormLable>이메일</FormLable>
                    </div>
                    <div>
                        <Input type="email" {...register("user_email", {required: true})} placeholder="이메일"></Input>
                        <ErrorMessage>{errors.user_email?.message}</ErrorMessage>
                    </div>

                    <div id='btn_eamilValidation'
                         onClick={emailRequest}>{validation === false ? "인증번호 발급" : "인증번호 재발급"}</div>
                    <br></br>

                    {showAlert && <EmailValidationComponent email={watch('user_email')}/>}
                    <div>
                        <div>
                            <FormLable>패스워드</FormLable>
                        </div>
                        <Input type="password" {...register("user_password", {required: true})}
                               placeholder="비밀번호"></Input>
                        <ErrorMessage>{errors.user_password?.message}</ErrorMessage>
                    </div>
                    <div>
                        <FormLable>패스워드 확인</FormLable>
                    </div>
                    <div>
                        <Input type="password" {...register("password_check", {required: true})}
                               placeholder="비밀번호 확인"></Input>
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