import {useDispatch, useSelector} from "react-redux";
import {RootState, updateMainSubNavigation} from "../../../../entities/redux";
import {useFetchUserChatList} from "../../../../entities/reactQuery";
import {updateUserChatApi} from "../api/updateUserChatApi";

export const useFriendChat = (userId:string)=>{
    const dispatch = useDispatch()
    const {data, refetch} = useFetchUserChatList(userId)
    const {main_subNavState} = useSelector((state:RootState)=> state.subNavigation)

    return (friendUserId:string, isOpen:boolean)=>{

        if(!data) return
        let chatInfo = data.filter(({friendId})=> friendId===friendUserId).at(-1)
        if(!chatInfo) return

        if(isOpen){
            dispatch(updateMainSubNavigation({friendParam:chatInfo.chatId}))
        }else{
            if(main_subNavState.friendParam === friendUserId){
                dispatch(updateMainSubNavigation({friendParam:''}))
            }
        }

        if(chatInfo.open===isOpen) return
        chatInfo.open = isOpen;
        updateUserChatApi(chatInfo).then(()=>{
            refetch()
        })
    }
}