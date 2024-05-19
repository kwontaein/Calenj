import React, {useMemo} from "react";
import {
    ScrollableDiv,
    MessageBoxContainer,
    MessageContainer,
    MessageContainer2,
    ProfileContainer,
    DateContainer,
    DateContainer2,
    NickNameContainer,
    MessageContentContainer,
    MessageContentContainer2
} from '../../../style/ChatBoxStyle';
import {RowFlexBox} from '../../../style/FormStyle';
import {changeDateForm, AHMFormatV2, shortAHMFormat} from '../../../shared/lib';
import {Message} from "../types";

interface MessageBoxProps {
    messageList: Message[];
    newMessageList: Message[];
    topRef: React.RefObject<HTMLDivElement>;
    scrollRef: React.RefObject<HTMLDivElement>;
}

const MessageBox: React.FC<MessageBoxProps> = ({messageList, newMessageList, topRef, scrollRef}) => {
    const dateOprration = (beforeSendDate: string, AfterSendDate: string) => {
        return ((+changeDateForm(AfterSendDate)) - (+changeDateForm(beforeSendDate)) < 300000);
    }

    const connectList = useMemo(() => [...[...messageList].reverse(), ...newMessageList], [messageList, newMessageList]);

    return (
        <ScrollableDiv ref={scrollRef}>
            <div className="scrollTop" ref={topRef}></div>
            {connectList.map((message: Message, index: number) => (
                ((message !== null && message.chatUUID !== "시작라인") &&
                    <MessageBoxContainer className={message.chatUUID} key={message.chatUUID + index}
                                         $sameUser={(index !== 0 && connectList[index - 1]?.userId === message.userId) && dateOprration(connectList[index - 1].sendDate, message.sendDate)}>
                        {message.chatUUID === '엔드포인트' ?
                            <hr data-content={"NEW"}></hr> :
                            ((index && connectList[index - 1]?.userId === message.userId) &&
                            dateOprration(connectList[index - 1].sendDate, message.sendDate) ? (
                                <MessageContainer2>
                                    <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                    <MessageContentContainer2>{message.message}</MessageContentContainer2>
                                </MessageContainer2>
                            ) : (
                                <RowFlexBox style={{width: 'auto'}}>
                                    <ProfileContainer $userId={message.userId}></ProfileContainer>
                                    <MessageContainer>
                                        <RowFlexBox>
                                            <NickNameContainer>{message.userId}</NickNameContainer>
                                            <DateContainer>{AHMFormatV2(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer>
                                        </RowFlexBox>
                                        <MessageContentContainer>{message.message}</MessageContentContainer>
                                    </MessageContainer>
                                </RowFlexBox>
                            ))
                        }
                    </MessageBoxContainer>)
            ))}
            <div className="scrollBottom" style={{marginTop: '10px'}}></div>
        </ScrollableDiv>
    );
}

export default MessageBox;
