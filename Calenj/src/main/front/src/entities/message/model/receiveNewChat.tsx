import {Message} from "../../reactQuery";
import StompReducer, {StompData} from "../../redux/model/slice/StompReducer";
import {useSelector} from "react-redux";
import {RootState} from "../../redux";

export const useReceivedMessage = ()=>{
    const {message} = useSelector((state:RootState)=>state.stomp.receiveMessage)
    return ({pageParam = 0}) => {
        //초기 세팅
        if(pageParam===0){
            const startMsg: Message = {
                chatUUID:"시작라인",
                sendDate: "",
                userId: "",
                messageType: "",
                message: "",
            };
            return  startMsg;
        }else{
            return message[0];
        }
    }
}
