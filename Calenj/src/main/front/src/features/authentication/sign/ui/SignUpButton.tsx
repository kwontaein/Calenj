import {Link} from "react-router-dom";
import {SignState_Button} from "../../../../shared/ui/SharedStyled";

export const SignUpButton : React.FC = () =>{
    return(
        <Link to="/signup" style={{textDecoration: "none"}}>
            <SignState_Button>회원가입</SignState_Button>
        </Link>
    )
}