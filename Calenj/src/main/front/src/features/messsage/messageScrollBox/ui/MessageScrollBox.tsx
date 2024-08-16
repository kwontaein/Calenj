import {useMessageData} from "../model/useMessageData";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    AHMFormat,
    AHMFormatV2,
    changeDateForm,
    debounce,
    shortAHMFormat,
    throttleByAnimationFrame
} from "../../../../shared/lib";
import {useDispatch, useSelector} from "react-redux";
import {
    requestFile,
    RootState,
} from "../../../../entities/redux";
import {
    DateContainer,
    DateContainer2, HR_ChatEndPoint, HR_NewDate, ImageContent, ImageWrapper,
    MessageBoxContainer, MessageContainer,
    MessageContainer2, MessageContentContainer,
    MessageContentContainer2, MessageGridView, MessageScroll_Container, NickNameContainer,
    ScrollableDiv
} from "./MessageScrollBoxStyled";
import {ProfileContainer, RowFlexBox} from "../../../../shared/ui/SharedStyled";
import {Message} from "../../../../entities/reactQuery"
import {dateOperation} from "../lib/dateOperation";
import axios from "axios";
import {useIntersect} from "../../../../shared/model";
import {useMessageScroll} from "../model/useMessageScroll";
import {parseDataString} from "../lib/parseDataString";
import {ImageGrid} from "./ImageGrid";
import {MessageContentView} from "./MessageContentView";


export const MessageScrollBox: React.FC = () => {
    const {inputSize} = useSelector((state: RootState) => state.messageInputSize);
    const {userNameStorage} = useSelector((state: RootState) => state.userNameStorage);
    const {
        messageList,
        chatUUID,
        position,
        topRef,
        bottomRef,
        hasNextPage,
        hasPreviousPage,
        compareDate
    } = useMessageData()
    const {scrollRef, messageRefs} = useMessageScroll(messageList, chatUUID, position)
    
    const MessageBox = useMemo(() => {
        return (
            <ScrollableDiv ref={scrollRef}>
                {hasPreviousPage && <div className="scrollTop" ref={topRef}></div>}
                {messageList.length > 0 &&
                    (messageList.map((message: Message, index: number) => (
                        <div key={message.chatUUID}>
                            {(index !== 0 && compareDate(messageList[index - 1].sendDate, message.sendDate) && (message.chatUUID !== '엔드포인트')) &&
                                <HR_NewDate
                                    data-content={AHMFormat(changeDateForm(message.sendDate.slice(0, 16))).slice(0, 13)}></HR_NewDate>
                            }
                            <MessageBoxContainer className={message.chatUUID}
                                                 key={message.chatUUID}
                                                 ref={(el) => messageRefs.current[message.chatUUID] = el}
                                                 $sameUser={(index !== 0 && messageList[index - 1]?.userId === message.userId) &&
                                                     dateOperation(messageList[index - 1].sendDate, message.sendDate)}>
                                {message.chatUUID === '엔드포인트' ?
                                    <HR_ChatEndPoint data-content={"NEW"}></HR_ChatEndPoint> :
                                    ((index && messageList[index - 1].userId === message.userId) &&
                                    dateOperation(messageList[index - 1].sendDate, message.sendDate) ? (
                                        <MessageContainer2>
                                            <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                            <MessageContentContainer2>
                                                <MessageContentView message={message.message} messageType={message.messageType}/>
                                            </MessageContentContainer2>
                                        </MessageContainer2>
                                    ) : (
                                        <RowFlexBox style={{width: 'auto'}}>
                                            <ProfileContainer style={{minWidth: '40px'}}
                                                              $userId={message.userId}>
                                            </ProfileContainer>
                                            <MessageContainer>
                                                <RowFlexBox>
                                                    <NickNameContainer>{userNameStorage[message.userId].userName}</NickNameContainer>
                                                    <DateContainer>{AHMFormatV2(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer>
                                                </RowFlexBox>
                                                <MessageContentContainer>
                                                    <MessageContentView message={message.message} messageType={message.messageType}/>
                                                </MessageContentContainer>
                                            </MessageContainer>
                                        </RowFlexBox>
                                    ))
                                }
                            </MessageBoxContainer>
                        </div>)
                    ))}

                {hasNextPage && <div className="scrollBottom" style={{marginTop: '10px'}} ref={bottomRef}></div>}


            </ScrollableDiv>
        );
    }, [messageList]);


    return (
        <MessageScroll_Container $inputSize={inputSize}>
            {MessageBox}
        </MessageScroll_Container>
    )
}