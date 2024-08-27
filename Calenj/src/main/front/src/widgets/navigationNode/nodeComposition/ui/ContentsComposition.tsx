import {FullScreen_div} from '../../../../shared/ui/SharedStyled'
import React, {useEffect, useState, useRef, useMemo} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {} from '../index'
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../../../entities/reactQuery";
import {GroupDetail} from '../../../../entities/reactQuery'
import {EventTopBar_Container, ContentsScreen_div} from "./ContentsCompositionStyled"
import {useComponentSize} from '../../../../shared/model'
import {RootState} from "../../../../entities/redux";
import {GroupContentItem, GroupContentTopItem} from "../../../../features/group/contentItems";
import {MainEventTopBar} from "../../main/evnetBarItmes";
import {MainContentView} from "../../main/contentView";
import {updateInputMaxSize} from "../../../../entities/redux/model/slice/InputSizeSlice";

interface QueryProps {
    isLoading: boolean
}

export const ContentsComposition: React.FC<QueryProps> = ({isLoading}) => {
    const [groupDetail, setGroupDetail] = useState<GroupDetail>();
    const [contentRef, contentSize] = useComponentSize(); //컴포넌트의 크기를 가져옴
    const {navigate, navigateParam} = useSelector((state: RootState) => state.navigateInfo)
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateInputMaxSize({inputMaxSize:contentSize.height/2}))
    }, [contentSize.height]);

    //그룹 디테일 불러오기
    useEffect(() => {
        if (navigate === "group" && navigateParam !== '') {
            setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY, navigateParam]));
        }
    }, [isLoading, navigateParam]);


    return (

        <FullScreen_div ref={contentRef}>
            <EventTopBar_Container>
                {(navigate === "group" && groupDetail && !isLoading) &&
                    <GroupContentTopItem/>}
                {navigate === "main" && <MainEventTopBar/>}
            </EventTopBar_Container>


            <ContentsScreen_div>
                {(navigate === "group" && groupDetail && !isLoading) &&
                    <GroupContentItem param={navigateParam} contentSize={contentSize}/>}
                {navigate === "main" && <MainContentView/>}
            </ContentsScreen_div>
        </FullScreen_div>
    )
}