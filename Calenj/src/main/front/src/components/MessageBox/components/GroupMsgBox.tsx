import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    mapStateToStompProps,
    mapDispatchToStompProps,
    DispatchStompProps,
    StompData
} from '../../../store/module/StompReducer';
import {MessageComponent_Container} from '../../../style/ChatBoxStyle';
import MessageBox from "./MessageBox";
import MessageSend from "./MessageSend";
import {useChat} from "../hooks/useChat";
import {useScroll} from "../hooks/useScroll";

interface GroupMsgProps extends DispatchStompProps, StompData {
    target: string;
    param: string;
}

const GroupMsgBox: React.FC<GroupMsgProps> = ({target, param, stomp, updateAppPosition, sendStompMsg, requestFile}) => {
    const {content, setContent, sendMsg, messageList, newMessageList, topRef, scrollRef, chatRef, isLoading} =
        useChat({
            param,
            stomp,
            sendStompMsg,
            requestFile
        });
    const {handleScroll, addScrollEvent} = useScroll({scrollRef, updateEndpoint: requestFile, param});

    useEffect(() => {
        addScrollEvent();
        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            }
        }
    }, [isLoading, param]);

    return (
        <MessageComponent_Container>
            <MessageBox messageList={messageList} newMessageList={newMessageList} topRef={topRef}
                        scrollRef={scrollRef}/>
            <MessageSend content={content} setContent={setContent} sendMsg={sendMsg} chatRef={chatRef}/>
        </MessageComponent_Container>
    );
}

export default connect(mapStateToStompProps, mapDispatchToStompProps)(GroupMsgBox);
