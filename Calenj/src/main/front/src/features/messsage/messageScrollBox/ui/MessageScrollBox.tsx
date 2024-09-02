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
import {connect, useDispatch, useSelector} from "react-redux";
import {
    EndPointParamMap, groupEndPointMap,
    RootState,
} from "../../../../entities/redux";
import {
    DateContainer,
    DateContainer2, HR_ChatEndPoint, HR_NewDate,
    MessageBoxContainer, MessageContainer,
    MessageContainer2, MessageContentContainer,
    MessageContentContainer2, MessageScroll_Container, NickNameContainer,
    ScrollableDiv
} from "./MessageScrollBoxStyled";
import {ProfileContainer, RowFlexBox} from "../../../../shared/ui/SharedStyled";
import {Message} from "../../../../entities/reactQuery"
import {dateOperation} from "../lib/dateOperation";
import {useMessageScroll} from "../model/useMessageScroll";
import {MessageContentView} from "./MessageContentView";
import {InviteHippo} from "../../../../shared/ui/logo/InviteHippo";
import {NoticeMessage} from "./NoticeMessage";
import {friendEndPointMap} from "../../../../entities/redux/model/module/StompMiddleware";


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
    const {scrollRef, messageRefs, readEndPoint} = useMessageScroll(messageList, chatUUID, position)
    const {navigateParam, navigate} = useSelector((state:RootState)=> state.navigateInfo)

    const MessageBox = useMemo(() => {
        const endPointUUID = EndPointParamMap.get(navigateParam);
        return (
            <ScrollableDiv ref={scrollRef}>
                {hasPreviousPage && <div className="scrollTop" ref={topRef}></div>}
                {messageList.map((message: Message, index: number) => (
                    <div key={message.chatUUID}>
                        {endPointUUID === message.chatUUID && <HR_ChatEndPoint data-content={"새로운 메시지"}></HR_ChatEndPoint>}

                    {message.messageType === "join" ?
                        <div>
                            <InviteHippo
                                userName={userNameStorage[message.userId] ? userNameStorage[message.userId].userName : ''}/>
                        </div>
                        :
                        message.messageType === "notice" ?
                            <NoticeMessage
                                userName={userNameStorage[message.userId] ? userNameStorage[message.userId].userName : ''}
                                noticeId={message.message}/>
                            :
                            <div>
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
                                        (!endPointUUID && index!==messageList.length-1) &&
                                        <HR_ChatEndPoint data-content={"새로운 메시지"}></HR_ChatEndPoint> :
                                        ((index && messageList[index - 1].userId === message.userId) &&
                                        dateOperation(messageList[index - 1].sendDate, message.sendDate) && messageList[index].chatUUID!==endPointUUID? (
                                            <MessageContainer2>
                                                <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                                <MessageContentContainer2>
                                                    <MessageContentView message={message.message}
                                                                        messageType={message.messageType}/>
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
                                                        <MessageContentView message={message.message}
                                                                            messageType={message.messageType}/>
                                                    </MessageContentContainer>
                                                </MessageContainer>
                                            </RowFlexBox>
                                        ))
                                    }
                                </MessageBoxContainer>
                            </div>}
                    </div>
                    )
                )}
                {hasNextPage && <div className="scrollBottom" style={{marginTop: '-10px'}} ref={bottomRef}></div>}
            </ScrollableDiv>
        );
    }, [messageList,readEndPoint]);


    return (
        <MessageScroll_Container $inputSize={inputSize}>
            {MessageBox}
        </MessageScroll_Container>
    )
}