import {useEffect} from "react";
import {VoteMessage_Container} from "./VoteMessageStyled";
import {useFetchVoteDetail} from "../../../../entities/reactQuery";
import {VoteDetail} from "../../../group/board/vote/detail";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";

interface MessageProps{
    voteData:string
}
export const VoteMessage : React.FC<MessageProps> = ({voteData}) =>{
    const [voteId, voteTitle] = voteData.split(',',2)

    return (
        <FullScreen_div>
            <VoteDetail voteParam={voteId} isMessage={true}/>
        </FullScreen_div>
    )
}