import {Message} from "../../reactQuery/api/types";

export const fileFilter = (messages: string[]) => {
    const messageEntries = Array.from(messages, (message: string) => {
        const [chatUUID,sendDate,userEmail,nickName,messageType,messageContent] = message.split("$", 6);

        const loadMsg: Message = {
            chatUUID: chatUUID,
            sendDate: sendDate.slice(1, 17),
            userEmail: userEmail,
            nickName: nickName,
            messageType: messageType,
            message: messageContent,
        };

        return loadMsg;
    }).filter((msg: Message | null) => msg !== null);  // null이 아닌 메시지만 필터링

    //객체 중복 필터링
    const removeDuplicatesMessage = [...new Set(messageEntries.map((message)=> JSON.stringify(message)))]
        .map((message) => JSON.parse(message)) as Message[];

    if(messageEntries.length !== removeDuplicatesMessage.length){
        //중복된 요소가 있을경우
        return removeDuplicatesMessage;
    }else{
        return messageEntries
    }
}
