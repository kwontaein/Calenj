import {SignState_Button} from "../../../../shared/ui/SharedStyled";
import {useQueryClient} from "@tanstack/react-query";
import {useMutationCookie} from "../../../../entities/reactQuery/model/queryModel";

export const LogoutButton : React.FC = ()=>{
    const queryClient = useQueryClient()
    const logout = useMutationCookie(queryClient)

    return(
        <SignState_Button onClick={() => logout.mutate()}>
            로그아웃
        </SignState_Button>
    )
}
