import {Message} from "../../reactQuery";

export const fileFilter = (messages: Message[]) => {
    messages.filter((msg: Message | null) => msg !== null);  // null이 아닌 메시지만 필터링

    //객체 중복 필터링
    const removeDuplicatesMessage = [...new Set(messages.map((message)=> JSON.stringify(message)))]
        .map((message) => JSON.parse(message)) as Message[];

    if(messages.length !== removeDuplicatesMessage.length){
        //중복된 요소가 있을경우
        return removeDuplicatesMessage;
    }else{
        return messages
    }
}
