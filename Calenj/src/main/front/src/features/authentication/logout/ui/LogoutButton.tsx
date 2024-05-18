import {SignState_Button} from "../../../../style/FormStyle";
import {useQueryClient} from "@tanstack/react-query";
import {useMutationCookie} from "../../../../entities/ReactQuery/model/queryModel";

export const LogoutButton : React.FC = ()=>{
    const queryClient = useQueryClient()
    const logout = useMutationCookie(queryClient)

    return(
        <SignState_Button onClick={() => logout.mutate()}>
            로그아웃
        </SignState_Button>
    )
}
