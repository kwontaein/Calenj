import axios, {AxiosResponse} from 'axios';
import {useForm, SubmitHandler, SubmitErrorHandler, FieldErrors} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import {useCallback, useEffect, useState} from 'react';
import {SignUpFormContainer, Input, Button, ErrorMessage, FormLable} from '../../Style/FormStyle';
import EmailValidationComponent from './EmailValidationComponent';
import schema from '../../formShema/signSchema';
import {connect} from "react-redux";
import {EmailToken, updateToken, updateCodeValid} from '../../store/EmailValidationSlice';
import {Dispatch} from 'redux';
import {RootState} from '../../store/store'
import '../../Style/Sign.scss'


type role = "MANAGER" | "ADMIN" | "USER";

interface UserData {
    nickname: string;
    userPassword: string;
    passwordCheck?: string;
    userEmail: string;
}

//인터페이스 확장
interface User extends UserData {
    userRole?: role;
    userJoinDate?: string;
}


// store에서 가져올 state의 타입(EmailToken)
interface EmailToeknProps {
    emailToken: EmailToken;
}


//dispatch 함수타입을 interface로 정의
interface DispatchProps {
    updateToken: (payload: { tokenId: string; validateTime: number }) => void;
    updateCodeValid: (payload: boolean) => void;
}

//emailToken 정보를 수정하는 함수 정의 후 connect
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    updateToken: (payload: { tokenId: string; validateTime: number }) => dispatch(updateToken(payload)),
    updateCodeValid: (payload: boolean) => dispatch(updateCodeValid(payload)),
});

//(Component Props로 전달하기 위한 interface)

const mapStateToProps = (state: RootState): EmailToeknProps => ({
    emailToken: state.emailValidation, // store에서 가져올 상태를 매핑
});




const SignUp: React.FC<EmailToeknProps & DispatchProps> = ({emailToken, updateToken, updateCodeValid}) => {
    
    //이메일 인증 컴포넌트를 마운트하기 위한 State
    const [showAlert, setShowAlert] = useState<boolean>(false); 
    //인증번호 발급여부
    const [validation, setValidation] = useState<boolean>(false);
    //이메일 발급 이후 input을 잠그기 위한 State
    const [eamilInputState,setEamilInputState] = useState<boolean>(false);




    const {register, handleSubmit, formState: {errors}, reset, watch, trigger} = useForm<User>({
        resolver: yupResolver(schema), //유효성 검사
        mode: 'onTouched' //실시간 유효성 검사를 위한 설정
    });

   // 회원가입 완료시 완료 날짜 저장을 위한 함수.
   const makeJoinDate = (): string => {
    const today: Date = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

    
    //성공 시
    const onValid: SubmitHandler<User> = (data: User): Promise<Object> => {
        data.userRole = "USER";
        data.userJoinDate = makeJoinDate();
        setShowAlert(false);


        window.alert("회원가입에 성공했습니다.");

        window.location.replace("/");
        updateToken({tokenId: '', validateTime: 0});//토큰 reset

        setTimeout(() => {
            updateCodeValid(false)
        }, 1000);

        return axios.post('api/saveUser', data)
            .then((response: AxiosResponse<Object>) => response.data)
            .catch((error) => Promise.reject(error));
    };

    //실패 시
    const onInvalid: SubmitErrorHandler<User> = (errors: FieldErrors): void => {
        console.log(errors)
    }




    //이메일 인증요청 -api 반환값 : 인증번호 (쿠키 값에 이메일 인증토큰도 있음)
    const emailRequest = async (): Promise<void> => {
        
        const isValid = await trigger("userEmail");
        const email = watch("userEmail");
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
                if (response.data.code==200) { //이메일 인증 발급 성공 시
                    //인증번호 발급가능
                    setShowAlert(true);
                    setValidation(true);
                    try{
                        const response = await axios.get('api/emailTokenExpiration');
                        //이메일 인증번호 발급완료 =>이메일 검증 가능시간 update 
                        updateToken({tokenId:"tokenUUID",validateTime:response.data});
                    }catch (err) {
                        console.error(err);
                    }
                }
                //인증번호 발급 실패 =(이메일 중복 or 이메일 토큰시간 유효)
                window.alert(response.data.state);
            } catch (error) {
                console.error(error);
            }
        }
    }

    
    useEffect(() => {
        updateCodeValid(false);
    }, [])


    // 이메일 인증 시 인증번호 발급 이후 input을 임의로 바꾸는 걸 방지 (인증번호만 발급 후 이메일 수정 못함)
    const emailInputHandler=()=>{
        const currentTime = Date.now();
        //남은 시간 계산 (밀리초 단위)
        const enableInputEmailTime = emailToken.validateTime-currentTime;
        
        //만약 토큰이 아직 유효하면 이메일 input 수정불가
        if(enableInputEmailTime>0){
            setEamilInputState(true);
        }else{
            setEamilInputState(false);
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
                        <Input {...register("nickname", {required: true})} placeholder="닉네임"/>
                        <ErrorMessage>{errors.nickname?.message}</ErrorMessage>
                    </div>

                    <div>
                        <FormLable>아이디(이메일)</FormLable>
                    </div>


                    <div>
                        <Input type="email" onClick={emailInputHandler} {...register("userEmail", {required: true})} placeholder="이메일"
                               readOnly={(emailToken.codeValid|| eamilInputState)}></Input>
                        <ErrorMessage>{errors.userEmail?.message}</ErrorMessage>
                    </div>

                    {!emailToken.codeValid &&
                        <div id='btn_eamilValidation'
                             onClick={emailRequest}>{validation === false ? "인증번호 발급" : "인증번호 재발급"}
                        </div>}
                    <br></br>

                    {showAlert === true ? !emailToken.codeValid &&
                        <EmailValidationComponent email={watch('userEmail')}/> : null}
                    <div>
                        <div>
                            <FormLable>패스워드</FormLable>
                        </div>
                        <Input type="password" {...register("userPassword", {required: true})}
                               placeholder="비밀번호"></Input>
                        <ErrorMessage>{errors.userPassword?.message}</ErrorMessage>
                    </div>
                    <div>
                        <FormLable>패스워드 확인</FormLable>
                    </div>
                    <div>
                        <Input type="password" {...register("passwordCheck", {required: true})}
                               placeholder="비밀번호 확인"></Input>
                        <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);