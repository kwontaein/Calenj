import {Input, ErrorMessage, FormLable} from '../../style/FormStyle';
import {ChangeEvent, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import {EmailToken, updateToken, updateCodeValid} from '../../store/EmailValidationSlice';
import '../../style/Sign.scss'
import {RootState} from '../../store/store'
import {Dispatch} from 'redux';

import {useConfirm} from '../../stateFunc/actionFun'


//상위 컴포넌트의 props
interface ComponentProps {
    email: string;
    onClose: () => void;
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

//(Component Props로 전달하기 위한 interface)

const mapStateToProps = (state: RootState): EmailToeknProps => ({
    emailToken: state.emailValidation, // store에서 가져올 상태를 매핑
});

//emailToken 정보를 수정하는 함수 정의 후 connect
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    updateToken: (payload: { tokenId: string; validateTime: number }) => dispatch(updateToken(payload)),
    updateCodeValid: (payload: boolean) => dispatch(updateCodeValid(payload)),
});

type Props = ComponentProps & DispatchProps & EmailToeknProps;

const EmailValidationComponent: React.FC<Props> = ({email, emailToken, updateToken, updateCodeValid,onClose}) => {
    const [code, setCode] = useState<string>('');
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [remainingTime, setRemainingTime] = useState<number>(0);

    const interval = useRef<boolean>();

    /*이메일 인증을 확인하는 코드*/ 
    const codeRequest = async (): Promise<void> => {
        try {
            const response = await axios.post('api/emailCodeValidation', null, {
                params: {
                    validationCode: code,
                    email: email
                },
            });

            console.log(response.data)
            if (response.data === 100) {
                window.alert("인증코드를 입력해주세요.")
            } else if (response.data === 200) {
                window.alert("인증이 완료되었습니다.")
                updateCodeValid(true);
                onClose();
            } else if (response.data === 500) {
                window.alert("인증코드가 일치하지 않습니다.")
            } else if (response.data === 300) {
                window.alert("인증 시간이 만료되었습니다. 인증번호를 재발급해주세요.")
            }
        } catch (error) {
            console.error(error);
        }
    }


      const validateCancle = ()=>{
        const cancle =() =>  console.log("취소");
            if(minutes ===0 &&seconds===0){
                return onClose();
            }else{
                useConfirm(`지금 나가시면 남은시간까지 인증번호를 보낼 수 없습니다.\n정말로 나가시겠습니까?`, onClose, cancle);
            }        
         
    }



    /*토큰의 남은 시간을 계산하여 반환하는 함수 */
    const updateTimer = (): boolean => {
        const currentTime = Date.now();

        //남은 시간 계산 (밀리초 단위)
        setRemainingTime(emailToken.validateTime - currentTime);

        // 남은 시간을 시분초로 변환
        setSeconds(Math.floor((remainingTime / 1000) % 60));
        setMinutes(Math.floor((remainingTime / 1000 / 60) % 60));


        if (remainingTime < 0) {
            return true;
        } else {
            return false;
        }
    }


    // remember function result
    useEffect(() => {
        interval.current = updateTimer();
    }, [updateTimer]);


    //랜더링 시 카운트 다운, 만약 함수가 반환하는 값이 true면 멈춤
    useEffect(() => {
        const id = setInterval(updateTimer, 1000);

        //이메일 토큰 유효시간이 지나면
        if (interval.current) {
            clearInterval(id);
            setSeconds(0);
            setMinutes(0);
            
        }
        return () => clearInterval(id);
    });





    //Redux는 클라이언트 측의 상태 관리 라이브러리이므로 백에서 토큰관리로 철저히 관리해야됨.
    //보안적인 토큰 사용: Redux 애플리케이션에서 중요한 상태를 변경할 때 사용자 인증을 확인

    return (
  
            <div id='emailValidation_Box'>
                <div> 
                    <FormLable style={{marginLeft:'8px'}}>이메일로 전송된 인증코드를 입력해주세요.</FormLable>
                    <button id="btn_cancleValid"onClick={validateCancle}>x</button>
                </div>
                <br></br>
                <div style={{fontSize:"15px", marginTop:"3px", marginLeft:"10px"}}>{email}로 인증요청함</div>

                <ErrorMessage>{(minutes === 0 && seconds === 0) ? "인증시간이 만료되었습니다." : `남은 시간 : ${minutes}분${seconds.toString().padStart(2,'0')}초`}</ErrorMessage>

                <Input maxLength={10} type="text " onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}></Input>
                <div id="btn_emailCodeValidation" onClick={codeRequest}> 확인</div>

            </div>

    );
}


export default connect(mapStateToProps, mapDispatchToProps)(EmailValidationComponent)