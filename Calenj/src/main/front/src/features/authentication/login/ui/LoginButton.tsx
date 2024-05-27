import {Link} from "react-router-dom";
import {SignState_Button} from "../../../../style/FormStyle";

export const LoginButton :React.FC=()=>{
    return(
        <Link to="/sign" style={{textDecoration: "none"}}>
            <SignState_Button>로그인</SignState_Button>
        </Link>
    )
}
