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
    MessageContentContainer2, MessageGridView, MessageScroll_Container, NickNameContainer, ProfileContainer,
    ScrollableDiv
} from "./MessageScrollBoxStyled";
import {RowFlexBox} from "../../../../shared/ui/SharedStyled";
import {Message} from "../../../../entities/reactQuery"
import {dateOperation} from "../lib/dateOperation";
import axios from "axios";
import {useIntersect} from "../../../../shared/model";
import {useMessageScroll} from "../model/useMessageScroll";

export const MessageScrollBox: React.FC = () => {
    const {inputSize} = useSelector((state: RootState) => state.messageInputSize);
    const {userNameRegister} = useSelector((state: RootState) => state.userNameRegister);
    const {connectMessages, firstPage, lastPage, fetchMoreMessages, compareDate} = useMessageData()
    const {
        containerRef,
        messageRefs,
        topRef,
        bottomRef
    } = useMessageScroll(connectMessages, firstPage, lastPage, fetchMoreMessages)
    





    const MessageBox = useMemo(() => {

        return (
            <ScrollableDiv ref={containerRef}>
                {!firstPage && <div className="scrollTop" ref={topRef}></div>}
                {connectMessages.length > 0 &&
                    (connectMessages.map((message: Message, index: number) => (
                        <div key={message.chatUUID}>
                            {(index !== 0 && compareDate(connectMessages[index - 1].sendDate, message.sendDate) && (message.chatUUID !== '엔드포인트')) &&
                                <HR_NewDate
                                    data-content={AHMFormat(changeDateForm(message.sendDate.slice(0, 16))).slice(0, 13)}></HR_NewDate>}
                            <MessageBoxContainer className={message.chatUUID}
                                                 key={message.chatUUID}
                                                 ref={(el) => messageRefs.current[message.chatUUID] = el}
                                                 $sameUser={(index !== 0 && connectMessages[index - 1]?.userId === message.userId) &&
                                                     dateOperation(connectMessages[index - 1].sendDate, message.sendDate)}>
                                {message.chatUUID === '엔드포인트' ?
                                    <HR_ChatEndPoint data-content={"NEW"}></HR_ChatEndPoint> :
                                    ((index && connectMessages[index - 1].userId === message.userId) &&
                                    dateOperation(connectMessages[index - 1].sendDate, message.sendDate) ? (
                                        <MessageContainer2>
                                            <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                            <MessageContentContainer2>
                                                {(message.messageType === 'null' || message.messageType === null) && message.message.replace(/\\lineChange/g, '\n').trim()}
                                            </MessageContentContainer2>
                                        </MessageContainer2>
                                    ) : (
                                        <RowFlexBox style={{width: 'auto'}}>
                                            <ProfileContainer
                                                $userId={message.userId}>
                                            </ProfileContainer>
                                            <MessageContainer>
                                                <RowFlexBox>
                                                    <NickNameContainer>{userNameRegister[message.userId].userName}</NickNameContainer>
                                                    <DateContainer>{AHMFormatV2(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer>
                                                </RowFlexBox>
                                                <MessageContentContainer>
                                                    <>
                                                        {message.messageType === 'image' && (
                                                            <MessageGridView>
                                                                {message.message.trim().slice(1, -1).split(',').map((image, index) => (
                                                                    <ImageWrapper key={index}>
                                                                        <ImageContent
                                                                            $image={image.split('/')[0].trim()}>
                                                                            {image.split('/')[0].trim()}
                                                                        </ImageContent>
                                                                    </ImageWrapper>
                                                                ))}
                                                            </MessageGridView>
                                                        )}
                                                        {(message.messageType === 'null' || message.messageType === null) && (
                                                            <div>
                                                                {message.message.replace(/\\lineChange/g, '\n').trim()}
                                                            </div>
                                                        )}
                                                    </>
                                                </MessageContentContainer>
                                            </MessageContainer>
                                        </RowFlexBox>
                                    ))
                                }
                            </MessageBoxContainer>
                        </div>)
                    ))}

                <div className="scrollBottom" style={{marginTop: '10px'}} ref={bottomRef}></div>

                <button
                    style={{position: 'fixed', bottom: '70px', right: '10px', backgroundColor: "grey"}}>
                    <p>맨 아래로</p>
                </button>

            </ScrollableDiv>
        );
    }, [connectMessages]);


    return (
        <MessageScroll_Container $inputSize={inputSize}>
            {MessageBox}
        </MessageScroll_Container>
    )
}