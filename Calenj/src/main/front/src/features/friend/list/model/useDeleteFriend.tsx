import {useFetchFriendList, useFetchUserBanList} from "../../../../entities/reactQuery/model/queryModel";
import {friendDeleteOrBanApi} from "../api/friendDeleteOrBanApi";
import {useConfirm} from "../../../../shared/model";

export const useDeleteFriend = (userId:string)=>{
    const {refetch} =useFetchUserBanList(userId)
    const friendListState = useFetchFriendList(userId);

    return (friendUserId:string, friendName:string, isBan:boolean)=>{
        const postDeleteFriend =()=>{
            friendDeleteOrBanApi(friendUserId,isBan).then(()=>{
                window.alert(isBan ? `${friendName}유저를 차단했습니다` : `${friendName}유저를 친구목록에서 제외했습니다.`)
                refetch()
                friendListState.refetch()
            })
        }
        useConfirm(`정말로 해당 유저를 ${isBan ? '차단':'삭제'}하시겠습니까?`, postDeleteFriend, ()=>{})
    }

}