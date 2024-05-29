import { useForm, SubmitHandler, SubmitErrorHandler, FieldErrors } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from 'react';
import { SignUpFormContainer, Input, Button, ErrorMessage, FormLable, UnfocusBackground } from '../../../shared/ui/SharedStyled';
import {
    EmailValidationModal,
    useRequestEmailCode,
    useEmailValideAbleCheck,
    RequstEmailCode_Button
} from '../../../features/authentication/emailValidation'
import { schema } from '../../../entities/authentication/emailValidation';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../entities/redux/store';
import '../../../features/authentication/emailValidation/ui/Sign.scss'
import { saveDBFormat } from "../../../shared/lib";
import { saveUserApi, useInputManagement, User } from "../../../features/authentication/sign";
import { updateToken, updateCodeValid } from '../../../entities/redux/slice/EmailValidationSlice'; // Actions 가져오기

export const SignUpForm: React.FC = () => {
    const dispatch = useDispatch();
    const emailToken = useSelector((state: RootState) => state.emailValidation); // emailToken 상태 선택

    const [showAlert, validation, updateValidState, closeModal] = useEmailValideAbleCheck();
    const [isAble, updateInputAble] = useInputManagement(emailToken);
    const { requestEmailCode } = useRequestEmailCode();

    //인증번호 발급여부 (한 번 발급하면 재발급 UI로 변경)
    useEffect(() => {
        dispatch(updateCodeValid(false));
    }, [dispatch]);

    const { register, handleSubmit, formState: { errors }, reset, watch, trigger } = useForm<User>({
        resolver: yupResolver(schema), //유효성 검사
        mode: 'onTouched' //실시간 유효성 검사를 위한 설정
    });

    //성공 시
    const onValid: SubmitHandler<User> = (data: User): Promise<Object> => {
        data.userRole = "USER";
        data.userJoinDate = saveDBFormat(new Date());

        window.alert("회원가입에 성공했습니다.");
        window.location.replace("/");
        dispatch(updateToken({ tokenId: '', validateTime: 0 })); //토큰 reset

        setTimeout(() => {
            dispatch(updateCodeValid(false));
        }, 1000);

        return saveUserApi(data);
    };

    //실패 시
    const onInvalid: SubmitErrorHandler<User> = (errors: FieldErrors): void => {
        console.log(errors);
        if (errors.userEmail?.message) {
            window.alert('이메일 인증을 해주세요.')
        }
    }

    const requestEmailValidation = async () => {
        //특정 필드나 전체 폼에 대해 유효성 검사한다.
        const isValid = await trigger("userEmail");
        const email = watch("userEmail");
        requestEmailCode(email, isValid, updateValidState);
    }

    return (
        <div id="SignUp_Parent_Box">
            <UnfocusBackground focus={String(showAlert)} />
            <SignUpFormContainer focus={String(showAlert)}>
                <h2>회원가입</h2>
                <form onSubmit={handleSubmit(onValid, onInvalid)}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormLable>닉네임</FormLable>
                        <Input {...register("nickname", { required: true })} placeholder="닉네임" />
                        <ErrorMessage>{errors.nickname?.message}</ErrorMessage>
                        <FormLable>아이디(이메일)</FormLable>
                        <Input type="email" onClick={updateInputAble} {...register("userEmail", { required: true })}
                               placeholder="이메일"
                               readOnly={(emailToken.codeValid || isAble)}></Input>
                        <ErrorMessage>{errors.userEmail?.message}</ErrorMessage>

                        {!emailToken.codeValid &&
                            <RequstEmailCode_Button onClick={requestEmailValidation}>
                                {!validation ? "인증번호 발급" : "인증번호 재발급"}
                            </RequstEmailCode_Button>
                        }
                        <FormLable>패스워드</FormLable>
                        <Input type="password" {...register("userPassword", { required: true })}
                               placeholder="비밀번호"></Input>
                        <ErrorMessage>{errors.userPassword?.message}</ErrorMessage>
                        <FormLable>패스워드 확인</FormLable>
                        <Input type="password" {...register("passwordCheck", { required: true })}
                               placeholder="비밀번호 확인"></Input>
                        <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
                        <Button type="submit" style={{ marginTop: '2vw' }}>회원가입</Button>
                    </div>
                </form>
            </SignUpFormContainer>
            {/*이메일 인증번호 발급 시 showAlert = true, 이후 인증까지 완료되면 컴포넌트 닫기  */}
            {showAlert ? !emailToken.codeValid &&
                <EmailValidationModal email={watch('userEmail')} onClose={closeModal} /> : null}
        </div>
    );
};
