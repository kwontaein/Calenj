import { VoteDetailMemoization} from "../../../group/board/vote/detail";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";

interface MessageProps{
    voteData:string
}
export const VoteMessage : React.FC<MessageProps> = ({voteData}) =>{
    const [voteId, voteTitle] = voteData.split(',',2)

    return (
        <FullScreen_div>
            <VoteDetailMemoization voteParam={voteId} isMessage={true}/>
        </FullScreen_div>
    )
}