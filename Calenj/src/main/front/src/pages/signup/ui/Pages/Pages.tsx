import axios, {AxiosResponse} from 'axios';
import {useForm, SubmitHandler, SubmitErrorHandler, FieldErrors} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from 'react';
import {SignUpFormContainer, Input, Button, ErrorMessage, FormLable, UnfocusBackgound} from '../../../../style/FormStyle';
import {EmailValidationModal} from '../../../../features/authentication/emailValidation'
import {schema} from '../../../../entities/authentication/emailValidation';
import {connect} from "react-redux";
import {EmailToeknProps , DispatchEmailProps , mapDispatchToEmailProps,mapStateToEmailProps} from '../../../../store/slice/EmailValidationSlice';
import '../../../../style/Sign.scss'
import {saveDBFormat} from "../../../../shared/lib";
import {reqestEmailCodeApi, getExpirationTimeApi, useEmailValideAbleCheck} from "../../../../features/authentication/emailValidation";
import {User} from "../../../../features/authentication/sign";






export const SignUpForm: React.FC<EmailToeknProps & DispatchEmailProps> = ({emailToken, updateToken, updateCodeValid}) => {
    const {showAlert,eamilInputLimit, validation ,closeModal,updateValidAble, updateEmailValidateState} = useEmailValideAbleCheck(emailToken);
    //인증번호 발급여부 (한 번 발급하면 재발급 UI로 변경)

    useEffect(() => {
        updateCodeValid(false);
    }, [])





    const {register, handleSubmit, formState: {errors}, reset, watch, trigger} = useForm<User>({
        resolver: yupResolver(schema), //유효성 검사
        mode: 'onTouched' //실시간 유효성 검사를 위한 설정
    });

    //성공 시
    const onValid: SubmitHandler<User> = (data: User): Promise<Object> => {
        data.userRole = "USER";
        data.userJoinDate = saveDBFormat(new Date());

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
        if (errors.emailValidation?.message) {
            window.alert('이메일 인증을 해주세요.')
        }
    }
    const requestEmailValidation = async () =>{
        const isValid = await trigger("userEmail");
        const email = watch("userEmail");
        //인증요청 API
        reqestEmailCodeApi(email,isValid).then((res)=>{
            console.log("res :",res)
            if(res===200){
                updateEmailValidateState();
                getExpirationTimeApi().then((res)=>{
                    if(typeof res === "number"){
                        updateToken({tokenId: "tokenUUID", validateTime: res})
                    }
                })
            }

        })
    }

    return (
        <div id="SignUp_Parent_Box">
            <UnfocusBackgound focus={String(showAlert)}/>
            <SignUpFormContainer focus={String(showAlert)}>
                <h2>회원가입</h2>
                <form onSubmit={handleSubmit(onValid, onInvalid)}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <FormLable>닉네임</FormLable>
                        <Input {...register("nickname", {required: true})} placeholder="닉네임"/>
                        <ErrorMessage>{errors.nickname?.message}</ErrorMessage>
                        <FormLable>아이디(이메일)</FormLable>
                        <Input type="email" onClick={updateValidAble} {...register("userEmail", {required: true})}
                               placeholder="이메일"
                               readOnly={(emailToken.codeValid || eamilInputLimit)}></Input>
                        <ErrorMessage>{errors.userEmail?.message}</ErrorMessage>


                        {!emailToken.codeValid &&
                            <div id='btn_eamilValidation'
                                 onClick={requestEmailValidation}>{!validation ? "인증번호 발급" : "인증번호 재발급"}
                            </div>
                        }
                        <FormLable>패스워드</FormLable>
                        <Input type="password" {...register("userPassword", {required: true})}
                               placeholder="비밀번호"></Input>
                        <ErrorMessage>{errors.userPassword?.message}</ErrorMessage>
                        <FormLable>패스워드 확인</FormLable>
                        <Input type="password" {...register("passwordCheck", {required: true})}
                               placeholder="비밀번호 확인"></Input>
                        <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
                        <Button type="submit" style={{marginTop: '2vw'}}>회원가입</Button>
                    </div>
                </form>
            </SignUpFormContainer>
            {/*이메일 인증번호 발급 시 showAlert = true, 이후 인증까지 완료되면 컴포넌트 닫기  */}
            {showAlert ? !emailToken.codeValid &&
                <EmailValidationModal email={watch('userEmail')} onClose={closeModal}/> : null}
        </div>
    );
};

export const SignUpFormPage = connect(mapStateToEmailProps, mapDispatchToEmailProps)(SignUpForm);