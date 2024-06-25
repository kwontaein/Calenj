import {FullScreen_div} from '../../../shared/ui/SharedStyled'
import React, {useEffect, useState, useRef, useMemo} from "react";
import {useSelector} from 'react-redux'
import {} from '../index'
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../../entities/reactQuery";
import {GroupDetail} from '../../../entities/reactQuery'
import {EventTopBar_Container, ContentsScreen_div} from "./ContentsCompositionStyled"
import {useComponentSize} from '../../../shared/model'
import {RootState} from "../../../entities/redux";
import {GroupContentItem, GroupContentTopItem} from "../../../features/group/contentItems";
import {CalendarView} from "../../../features/main/calendar/view";
import {MainEventTopBar} from "../../../features/main/eventBarItems/ui/MainEventTopBar";
import {RequestFriendView} from "../../../features/main/friend/request/view";
import {MainContentView} from "../../../features/main/contentView/ui/MainContentView";

interface QueryProps {
    isLoading: boolean
}

export const ContentsComposition: React.FC<QueryProps> = ({isLoading}) => {
    const [showUserList, setShowUserList] = useState<boolean>(false);
    const [groupDetail, setGroupDetail] = useState<GroupDetail>();
    const [contentRef, contentSize] = useComponentSize(); //컴포넌트의 크기를 가져옴
    const {navigate, navigateParam} = useSelector((state: RootState) => state.navigateInfo)
    const queryClient = useQueryClient();


    //그룹 디테일 불러오기
    useEffect(() => {
        if (navigate === "group" && navigateParam !== '') {
            setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY, navigateParam]));
        }
    }, [isLoading, navigateParam]);

    const showUserListMutate = () => setShowUserList(!showUserList)

    return (

        <FullScreen_div ref={contentRef}>
            {/*<RequestFriendView onClose={()=>{}} myRequest={true}/>*/}
            <EventTopBar_Container>
                {(navigate === "group" && groupDetail && !isLoading) &&
                    <GroupContentTopItem showUserListMutate={showUserListMutate} showUserList={showUserList}/>}
                {navigate === "main" && <MainEventTopBar/>}
            </EventTopBar_Container>


            <ContentsScreen_div>
                {(navigate === "group" && groupDetail && !isLoading) &&
                    <GroupContentItem param={navigateParam} contentSize={contentSize} showUserList={showUserList}/>}
                {navigate === "main" && <MainContentView/>}
            </ContentsScreen_div>
        </FullScreen_div>
    )
}