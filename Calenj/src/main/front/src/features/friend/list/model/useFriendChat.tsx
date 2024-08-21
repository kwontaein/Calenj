import {useDispatch, useSelector} from "react-redux";
import {RootState, updateMainSubNavigation, updateNavigation} from "../../../../entities/redux";
import {useFetchUserChatList} from "../../../../entities/reactQuery";
import {updateUserChatApi} from "../api/updateUserChatApi";

export const useFriendChat = (userId:string)=>{
    const dispatch = useDispatch()
    const {data, refetch} = useFetchUserChatList(userId)
    const {navigateParam} = useSelector((state:RootState)=> state.navigateInfo)

    return (friendUserId:string, isOpen:boolean)=>{

        if(!data) return
        let chatInfo = data.filter(({friendId})=> friendId===friendUserId).at(-1)
        if(!chatInfo) return

        if(isOpen){
            dispatch(updateMainSubNavigation({friendParam:chatInfo.friendId}))
            dispatch(updateNavigation({navigate:'main', navigateParam:chatInfo.chatId}))
        }else{
            if(navigateParam === chatInfo.chatId){
                dispatch(updateMainSubNavigation({friendParam:''}))
                dispatch(updateNavigation({navigate:'main', navigateParam:''}))
            }
        }

        if(chatInfo.open===isOpen) return
        chatInfo.open = isOpen;
        updateUserChatApi(chatInfo).then(()=> refetch())
    }
}