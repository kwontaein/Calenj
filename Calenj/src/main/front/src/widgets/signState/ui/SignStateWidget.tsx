import {connect} from "react-redux";
import {
    StompData,
    mapStateToStompProps,
} from '../../../entities/redux/model/slice/StompReducer';
import {
    SIGN_STATE_TEXT,
    SignState_Container,
} from "./SignStateStyled";
import {LoginButton} from '../../../features/authentication/login'
import {LogoutButton} from '../../../features/authentication/logout'
import {SignUpButton} from '../../../features/authentication/sign'

const SignState: React.FC<StompData> = ({stomp}) => {

    return (
        <SignState_Container>
            <SIGN_STATE_TEXT>{localStorage.getItem(`userId`)}</SIGN_STATE_TEXT>
            {stomp.isOnline==="ONLINE" ?
                <LogoutButton/>
                :
                <div>
                    <LoginButton/>
                    <SignUpButton/>
                </div>}
        </SignState_Container>
    );

}

export const SignStateWidget = connect(mapStateToStompProps, null)(SignState);