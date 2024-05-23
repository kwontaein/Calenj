import {useMessageScroll} from "../../index";
import {useMessageData} from "../model/useMessageData";
import {useMemo} from "react";
import {AHMFormatV2, changeDateForm, shortAHMFormat, throttleByAnimationFrame} from "../../../../shared/lib";
import {useIntersect} from "../../../../shared/model";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {
    DateContainer,
    DateContainer2,
    MessageBoxContainer, MessageContainer,
    MessageContainer2, MessageContentContainer,
    MessageContentContainer2, NickNameContainer, ProfileContainer,
    ScrollableDiv
} from "./MessageScrollBoxStyled";
import {RowFlexBox} from "../../../../style/FormStyle";
import {Message} from "../../../../entities/ReactQuery"

export const MessageScrollBox:React.FC =()=>{
    const{navigate} = useSelector((state:RootState)=>state.navigateInfo) //target
    const {param} = useSelector((state:RootState)=>state.subNavigateInfo)
    const {scrollRef,updateReloadScroll}=useMessageScroll(param)
    const {messageList,newMessageList,chatFile} = useMessageData(param,navigate,updateReloadScroll)

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
        const connectList = [...[...messageList].reverse(),...newMessageList]
        const dateOperation = (beforeSendDate : string, AfterSendDate : string) => {
            return ((+changeDateForm(AfterSendDate)) - (+changeDateForm(beforeSendDate)) < 300000)
        }

        if (!chatFile.isLoading) {
            return (
                <ScrollableDiv ref={scrollRef} >
                    <div className="scrollTop" ref={topRef}></div>

                    {connectList.map((message: Message | null, index: number) => (
                        ((message !== null && message.chatUUID !== "시작라인") &&
                            <MessageBoxContainer className={message.chatUUID}
                                                 key={message.chatUUID + index}
                                                 $sameUser={(index !== 0 && connectList[index - 1]?.userEmail === message.userEmail) &&
                                                     dateOperation(connectList[index-1].sendDate, message.sendDate)}>
                                {message.chatUUID === '엔드포인트' ?

                                    <hr data-content={"NEW"}></hr> :
                                    ((index && connectList[index - 1]?.userEmail === message.userEmail) &&
                                    dateOperation(connectList[index-1].sendDate, message.sendDate) ? (
                                        <MessageContainer2>
                                            <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                            <MessageContentContainer2>{message.message}</MessageContentContainer2>
                                        </MessageContainer2>
                                    ) : (
                                        <RowFlexBox style={{width: 'auto'}}>
                                            <ProfileContainer
                                                $userEmail={message.userEmail}></ProfileContainer>
                                            <MessageContainer>
                                                <RowFlexBox>
                                                    <NickNameContainer>{message.nickName}</NickNameContainer>
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
        return null;
    }, [messageList, newMessageList]);


    return(
        <>
        {MessageBox}
        </>
    )
}