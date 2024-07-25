import React, {useLayoutEffect, useState} from 'react';

import {DetailTop} from './DetailTop'
import {NoticeDetailContainer, NoticeDetailContent_Container} from "./NoticeDetailStyled";
import {FullScreen_div} from "../../../../../../shared/ui/SharedStyled";
import {NoticeDetail} from '../../../../../../entities/reactQuery'
import {getNoticeDetailApi} from "../api/getNoticeDetailApi";



interface NoticeListProps{
    noticeId:string,
}

export const NoticeDetailView:React.FC<NoticeListProps>=({noticeId})=>{
    const [detail, setDetail] = useState<NoticeDetail | null>(null);

    useLayoutEffect(() => {
        getNoticeDetailApi(noticeId).then((res)=>{
            setDetail(res)
        });
    }, []);


    return(
        <NoticeDetailContainer>
            {detail &&
                <FullScreen_div>
                     <DetailTop state={"notice"} title={detail.noticeTitle} created={detail.noticeCreated} watcher={detail.noticeWatcher}/>
                     <NoticeDetailContent_Container>
                         {detail.noticeContent}
                     </NoticeDetailContent_Container>
                </FullScreen_div>
            }
        </NoticeDetailContainer>
    )
}
