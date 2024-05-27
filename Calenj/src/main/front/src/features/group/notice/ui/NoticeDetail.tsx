import React, {useLayoutEffect, useState} from 'react';

import DetailTop from '../../../../components/Group/Board/DetailTop'
import {NoticeDetailContainer, NoticeDetailContent_Container} from "./NoticeDetailStyled";
import {FullScreen_div} from "../../../../style/FormStyle";
import {NoticeDetail} from '../../../../entities/ReactQuery'
import {getNoticeDetailApi} from "../api/getNoticeDetailApi";
import {AxiosResponse} from "axios";



interface NoticeListProps{
    noticeId:string,
    subWidth:number,
}

export const NoticeDetailView:React.FC<NoticeListProps>=({noticeId, subWidth})=>{
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
                     <DetailTop state={"notice"} title={detail.noticeTitle} created={detail.noticeCreated} watcher={detail.noticeWatcher} subWidth={subWidth}/>
                     <NoticeDetailContent_Container>
                         {detail.noticeContent}
                     </NoticeDetailContent_Container>
                </FullScreen_div>
            }
        </NoticeDetailContainer>
    )
}
