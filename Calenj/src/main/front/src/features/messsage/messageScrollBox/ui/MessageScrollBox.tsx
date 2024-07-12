import {useMessageScroll} from "../../index";
import {useMessageData} from "../model/useMessageData";
import {useEffect, useMemo, useState} from "react";
import {AHMFormat, AHMFormatV2, changeDateForm, shortAHMFormat, throttleByAnimationFrame} from "../../../../shared/lib";
import {useComponentSize, useIntersect} from "../../../../shared/model";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
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

export const MessageScrollBox:React.FC =()=>{
    const{navigate} = useSelector((state:RootState)=>state.navigateInfo) //target
    const {inputSize} = useSelector((state:RootState) => state.messageInputSize);
    const {param} = useSelector((state:RootState)=>state.subNavigation.group_subNavState)
    const {userNameRegister} = useSelector((state:RootState)=>state.userNameRegister);

    const {messageList, newMessageList, chatFile, compareDate} = useMessageData(param,navigate)
    const scrollRef =useMessageScroll(param,messageList)

    const loadFile = useMemo(() => {
        return throttleByAnimationFrame(() => {
            if (!scrollRef.current) return
            chatFile.fetchNextPage()
        })
    },[param])

    const topRef = useIntersect((entry, observer) => {
        if (chatFile.hasNextPage && !chatFile.isFetching) {
            observer.unobserve(entry.target);
            loadFile();
        }
    });




    const MessageBox = useMemo(() => {
        const connectList = [...[...messageList].reverse(),...newMessageList].filter((messageData)=> messageData.chatUUID!=="시작라인");

        if (!chatFile.isLoading) {
            return (
                <ScrollableDiv ref={scrollRef}>
                    <div className="scrollTop" ref={topRef}></div>
                    {connectList.map((message: Message , index: number) => (
                        <div key={message.chatUUID +index}>
                            {(index !== 0 && compareDate(connectList[index-1].sendDate, message.sendDate) &&( message.chatUUID!=='엔드포인트')) &&
                                <HR_NewDate data-content={AHMFormat(changeDateForm(message.sendDate.slice(0,16))).slice(0,13)}></HR_NewDate>}
                            <MessageBoxContainer className={message.chatUUID}
                                                 key={message.chatUUID + index}
                                                 $sameUser={(index !== 0 && connectList[index - 1]?.userId === message.userId) &&
                                                     dateOperation(connectList[index-1].sendDate, message.sendDate)}>
                                {message.chatUUID === '엔드포인트' ?

                                    <HR_ChatEndPoint data-content={"NEW"}></HR_ChatEndPoint> :
                                    ((index && connectList[index - 1]?.userId === message.userId) &&
                                    dateOperation(connectList[index-1].sendDate, message.sendDate) ? (
                                        <MessageContainer2>
                                            <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                            <MessageContentContainer2>
                                                {(message.messageType==='null'||message.messageType === null) && message.message.replace(/\\lineChange/g, '\n').trim()}
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
                                                                        <ImageContent $image={image.split('/')[0].trim()}>
                                                                            {image.split('/')[0].trim()}
                                                                            {/*{image.split('/')[1].trim()}*/}
                                                                        </ImageContent>
                                                                    </ImageWrapper>
                                                                ))}
                                                            </MessageGridView>
                                                        )}
                                                        {(message.messageType === 'null'||message.messageType === null) && (
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
                    )}
                    <div className="scrollBottom" style={{marginTop: '10px'}}></div>
                </ScrollableDiv>
            );
        }
        return null;
    }, [messageList, newMessageList]);


    return(
        <MessageScroll_Container $inputSize={inputSize}>
            {MessageBox}
        </MessageScroll_Container>
    )
}