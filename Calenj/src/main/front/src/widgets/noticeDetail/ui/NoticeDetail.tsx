import React, {useLayoutEffect, useState} from 'react';
import {NoticeDetailContainer, NoticeDetailContent_Container} from "../../../style/Group/GroupNoticeStyle";
import {FullScreen_div} from "../../../style/FormStyle";
import {getNoticeDetail} from "../../../features/notice/noticeDetail/api/noticeDetailApi";
import DetailTop from "../../../components/Group/Board/DetailTop";
import {NoticeDetails, NoticeListProps} from "../../../features/notice/noticeDetail";


const NoticeDetail: React.FC<NoticeListProps> = ({noticeId, subWidth}) => {
    const [detail, setDetail] = useState<NoticeDetails | null>(null);
    const detailMutate = (detail: NoticeDetails) => {
        setDetail(detail)
    }

    useLayoutEffect(() => {
        getNoticeDetail(detailMutate, noticeId);
    }, []);

    return (
        <NoticeDetailContainer>
            {detail &&
                <FullScreen_div>
                    <DetailTop state={"notice"} title={detail.noticeTitle} created={detail.noticeCreated}
                               watcher={detail.noticeWatcher} subWidth={subWidth}/>
                    <NoticeDetailContent_Container>
                        {detail.noticeContent}
                    </NoticeDetailContent_Container>
                </FullScreen_div>
            }
        </NoticeDetailContainer>
    )
}
export const NoticeDetailInfo = NoticeDetail;