import {FullScreen_div} from '../../../../style/FormStyle'
import React, {useEffect, useState, useRef,useMemo} from "react";
import {useSelector} from 'react-redux'
import {} from '../'
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../../../entities/ReactQuery/model/queryModel";
import {GroupDetail} from '../../../../entities/ReactQuery'
import {EventTopBar_Container, ContentsScreen_div} from "./ContentsCompositionStyled"
import {useComponentSize} from '../../../../shared/model'
import {RootState} from "../../../../store/store";
import {GroupContentItem,GroupContentTopItem} from "../../../../features/group/contentItems";

interface QeuryProps {
    isLoading :boolean
}

export const ContentsComposition :React.FC<QeuryProps>=({isLoading})=>{
    const [showUserList,setShowUserList] = useState<boolean>(false);
    const [groupDetail,setGroupDetail] = useState<GroupDetail>();
    const [contentRef, contentSize] = useComponentSize(); //컴포넌트의 크기를 가져옴
    const {navigate, navigateParam} = useSelector((state:RootState) => state.navigateInfo)
    const queryClient = useQueryClient();


    //그룹 디테일 불러오기
    useEffect( () => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,navigateParam]));
    }, [isLoading,navigateParam]);

    const showUserListMutate = () =>setShowUserList(!showUserList)

    return(

        <FullScreen_div ref={contentRef}>
            <EventTopBar_Container>
                {(navigate ==="group"&& groupDetail && !isLoading) &&
                <GroupContentTopItem showUserListMutate={showUserListMutate} showUserList={showUserList}/>}
            </EventTopBar_Container>


            <ContentsScreen_div>
                {(navigate ==="group" && groupDetail && !isLoading) &&
                <GroupContentItem param={navigateParam} contentSize={contentSize} showUserList={showUserList}/>}
            </ContentsScreen_div>
        </FullScreen_div>
    )
}