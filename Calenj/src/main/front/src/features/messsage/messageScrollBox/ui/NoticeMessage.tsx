import {useEffect, useLayoutEffect, useReducer, useState} from "react";
import {
    NoticeContent_Wrapper,
    NoticeMessage_Container,
    NoticeMessage_Wrapper,
    NoticeTitle_Wrapper,
    SpeakerIcon_Wrapper
} from "./NoticeMessageStyled";
import {RowFlexBox, TextColor} from "../../../../shared/ui/SharedStyled";
import {useComponentSize} from "../../../../shared/model";
import {useFetchNoticeDetail} from "../../../../entities/reactQuery";

interface NoticeMessageProps{
    userName :string,
    noticeId : string,
}
export const NoticeMessage :React.FC<NoticeMessageProps> = ({userName, noticeId})=>{
    const [contentRef, contentSize]= useComponentSize()
    const { data } =useFetchNoticeDetail(noticeId)
    const [noticeView, setNoticeView] = useReducer((prev)=>!prev, false);


    return(
        <NoticeMessage_Container>
            <RowFlexBox style={{width:'100%'}}>
                <SpeakerIcon_Wrapper style={{fontSize: contentSize.width>307 ? '18px' : '15px'}}>
                    <i className="bi bi-megaphone-fill"></i>
                </SpeakerIcon_Wrapper>



            <NoticeMessage_Wrapper ref={contentRef}>
                <div style={{fontSize: contentSize.width>307 ? '16px' : '13px'}}>
                    {userName}님이 새로운 공지를 등록했습니다.
                </div>
                {data &&
                    <div >
                        <NoticeTitle_Wrapper style={{fontSize: contentSize.width > 307 ? '15px' : '14px'}}>
                            제목 : {data.noticeTitle}
                        </NoticeTitle_Wrapper>
                        {noticeView &&
                            <NoticeContent_Wrapper style={{fontSize: contentSize.width > 307 ? '14px' : '13px'}}>
                                {data.noticeContent}
                            </NoticeContent_Wrapper>
                        }
                        <div onClick={setNoticeView} style={{fontSize: contentSize.width > 307 ? '13px' : '12px',color:`${TextColor}77`}}>
                            {noticeView ? "내용 숨기기" : "내용 보기"}
                        </div>
                    </div>
                }
            </NoticeMessage_Wrapper>

            </RowFlexBox>
        </NoticeMessage_Container>
    )

}