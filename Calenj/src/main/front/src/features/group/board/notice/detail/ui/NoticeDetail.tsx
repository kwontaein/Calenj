import React, {useLayoutEffect, useState} from 'react';

import {DetailTop} from './DetailTop'
import {NoticeDetailContainer, NoticeDetailContent_Container} from "./NoticeDetailStyled";
import {FullScreen_div} from "../../../../../../shared/ui/SharedStyled";
import {useFetchNoticeDetail} from "../../../../../../entities/reactQuery";



interface NoticeListProps{
    noticeId:string,
}

export const NoticeDetailView:React.FC<NoticeListProps>=({noticeId})=>{
    const {isLoading, data, refetch} =useFetchNoticeDetail(noticeId)

    useLayoutEffect(() => {
        if(!isLoading){
            refetch()
        }
    }, [isLoading]);


    return(
        <NoticeDetailContainer>
            {data &&
                <FullScreen_div>
                     <DetailTop state={"notice"} title={data.noticeTitle} created={data.noticeCreated} watcher={data.noticeWatcher}/>
                     <NoticeDetailContent_Container>
                         {data.noticeContent}
                     </NoticeDetailContent_Container>
                </FullScreen_div>
            }
        </NoticeDetailContainer>
    )
}
