import {SignState_Button} from "../../../../shared/ui/SharedStyled";
import {useQueryClient} from "@tanstack/react-query";
import {useMutationCookie} from "../../../../entities/reactQuery";
import {useConfirm} from "../../../../shared/model";

export const LogoutButton : React.FC = ()=>{
    const queryClient = useQueryClient()
    const logout = useMutationCookie(queryClient)
    const logoutHandler = ()=>{
        useConfirm('정말로 로그아웃 하시겠습니까?',()=>logout.mutate(),()=>{})
    }
    
    return(
        <SignState_Button onClick={logoutHandler}>
            로그아웃
        </SignState_Button>
    )
}
