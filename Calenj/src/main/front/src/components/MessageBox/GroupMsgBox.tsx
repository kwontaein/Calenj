import {ChangeEvent, useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    DispatchStompProps,
    mapDispatchToStompProps,
    StompData,
    mapStateToStompProps
} from '../../store/module/StompReducer'
import {ScrollableDiv, RowFlexBox} from '../../style/FormStyle';
import {endPointMap} from '../../store/module/StompMiddleware';

interface groupDetailProps {
    groupId: string;
    updateEndpoint: () => void
}

interface MessageData {
    message: string;
    messageDate: string;
    Sendr: string;
}

type groupMsgProps = groupDetailProps & DispatchStompProps & StompData
const GroupMsgBox: React.FC<groupMsgProps> = ({groupId, stomp, sendStompMsg, updateEndpoint}) => {
    const [messageList, setMessageList] = useState<MessageData[]>([]);
    const [content, setContent] = useState<string>('');


    const sendMsg = () => {
        if (content === '') return;
        sendStompMsg({target: 'groupMsg', param: groupId, sendMessage: content})
        updateEndpoint();
    }


    useEffect(() => {
        console.log(stomp)
        if (stomp.param === groupId) {
        }
    }, [stomp])
    return (
        <div>
            <ScrollableDiv>
                ㅇㅅㅇ
            </ScrollableDiv>
            <RowFlexBox>
                <input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setContent(e.target.value)
                }}></input>
                <button onClick={sendMsg}>send</button>
            </RowFlexBox>
        </div>
    )
}
export default connect(mapStateToStompProps, mapDispatchToStompProps)(GroupMsgBox);