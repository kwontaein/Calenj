import {FullScreen_div} from '../../../../style/FormStyle'
import React, {useEffect, useState, useRef,useMemo} from "react";
import {connect} from 'react-redux'
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapStateToSubNavigationProps,
    mapDispatchToSubNavigationProps,
} from "../../../../store/slice/SubNavigationSlice";
import {
    ContentsScreen_div,
    EventTopBar_Container,
    EventTopBarContent, EventTopBarSubContent

} from "../../../../widgets/contentItems/group/ui/ContentCompositionStyle";
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../../../entities/ReactQuery/model/queryModel";
import {GroupDetail} from '../../../../entities/ReactQuery'

import {useComponentSize} from '../../../../shared/model'
import GroupContentCompositionItem from "../../../../widgets/contentItems/group/ui/GroupContentCompositionItem";
import GroupContentCompositionTopItem from "../../../../widgets/contentItems/group/ui/GroupContentCompositionTopItem";

interface qeuryProps {
    isLoading :boolean
    target:string;
    param:string;
}

const ContentsComposition :React.FC<SubNavigateState & DispatchSubNavigationProps & qeuryProps>=({target,param, isLoading,subNavigateInfo,updateSubScreenMode,updateSubScreenWidthtSize,updateSubScreenHeightSize})=>{
    const [showUserList,setShowUserList] = useState<boolean>(false);
    const [groupDetail,setGroupDetail] = useState<GroupDetail>();
    const [contentRef, contentSize] = useComponentSize(); //컴포넌트의 크기를 가져옴

    const queryClient = useQueryClient();


    //그룹 디테일 불러오기
    useEffect( () => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,param]));
    }, [isLoading,param]);

    const showUserListMutate = () =>setShowUserList(!showUserList)

    return(

        <FullScreen_div ref={contentRef}>
            <EventTopBar_Container>
                {(target ==="group"&& groupDetail && !isLoading) &&
                <GroupContentCompositionTopItem showUserListMutate={showUserListMutate} showUserList={showUserList}/>}
            </EventTopBar_Container>


            <ContentsScreen_div>
                {(target ==="group" && groupDetail && !isLoading) &&
                <GroupContentCompositionItem param={param} contentSize={contentSize} showUserList={showUserList}/>}
            </ContentsScreen_div>
        </FullScreen_div>
    )
}
export const Node_ContentComposition = connect(mapStateToSubNavigationProps,mapDispatchToSubNavigationProps) (ContentsComposition);