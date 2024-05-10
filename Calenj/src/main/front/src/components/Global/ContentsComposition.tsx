import {FullScreen_div} from '../../style/FormStyle'
import React, {useEffect, useState, useRef,useMemo} from "react";
import {connect} from 'react-redux'
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapStateToSubNavigationProps,
    mapDispatchToSubNavigationProps,
} from "../../store/slice/SubNavigationSlice";
import MessageContainer from "../MessageBox/MessageContainer";
import {
    ContentsScreen_div,
    CustomScreen_MessageBox_Contaienr, CustomScreen_MiddleLine_div, CustomScreen_SubContent_Contaienr,
    EventTopBar_Container,
    EventTopBarContent, EventTopBarSubContent,
    TransContentsScreen_div,
} from "../../style/Navigation/ContentCompositionStyle";
import GroupUserList from "../Group/GroupUserList"
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/queryManagement";
import {GroupDetail} from '../../store/ReactQuery/queryInterface'
import GroupSubScreen from "../Group/NavigateItems/GroupSubScreen";
import {GroupList_Container_width} from '../../style/Group/GroupListStyle';
import {
    SubNavigate_padding, subNavigateBorder,
    SubNavigateTopBar_hegiht,
    SubNavigation_Container_width
} from '../../style/Navigation/SubNavigationStyle';
import {MessageSend_Cotainer_height, ScrollMarginInline, ScrollMin_width} from '../../style/ChatBoxStyle';
import {GroupUserList_Container_width} from '../../style/Group/GroupUserListStyle'
import useComponentSize from '../../stateFunc/useComponentSize'

interface qeuryProps {
    isLoading :boolean
    target:string;
    param:string;
}

const ContentsComposition :React.FC<SubNavigateState & DispatchSubNavigationProps & qeuryProps>=({target,param, isLoading,subNavigateInfo,updateSubScreenMode,updateSubScreenWidthtSize,updateSubScreenHeightSize})=>{
    const [showUserList,setShowUserList] = useState<boolean>(false);
    const [groupDetail,setGroupDetail] = useState<GroupDetail>();
    const [screenRowFlex,setScreenRowFlex] = useState<boolean>(true); //true: flex == row
    const [isResizing, setIsResizing] = useState<boolean>(false); //마우스 Down 시 true로 바껴 이벤트 활성화
    const [contentRef, contentSize] = useComponentSize(); //컴포넌트의 크기를 가져옴
    const queryClient = useQueryClient();
    const defaultContentSize = GroupList_Container_width + SubNavigation_Container_width;

    //그룹 디테일 불러오기
    useEffect( () => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,param]));
    }, [isLoading,param]);

    //고정된 넓이를 가지는 컴포넌트에 따라 flagPoint를 바꿈
    useEffect(() => {
        const {screenWidthSize} = subNavigateInfo
        //contentSize-subScreenSize = MessageBoxSize
        let contentWidth = contentSize.width - screenWidthSize;

        if(showUserList) contentWidth -=GroupUserList_Container_width;

        //contnetSize가 최소 크기가 됐는데 subScreen이 최소크기 이상이라면 subScreen을 감소
        if(contentWidth <= (ScrollMin_width + ScrollMarginInline) && screenWidthSize > ScrollMin_width){
            //contentWidth이 ScrollMin_width + ScrollMarginInline 보다 작아진 만큼 subScreen크기 갱신나옴
            //contentWidth <= (ScrollMin_width + ScrollMarginInline) 조건이라 contentWidth-(ScrollMin_width+ScrollMarginInline) < 0
            updateSubScreenWidthtSize({screenWidthSize:screenWidthSize+(contentWidth-(ScrollMin_width+ScrollMarginInline))})
        }

        //기존 subScreenSize가 contentWidth의 초과한만큼 빼도 최소크기이상이면
        if(screenWidthSize+(contentWidth-(ScrollMin_width+ScrollMarginInline))>ScrollMin_width){
            if(screenRowFlex) return
            setScreenRowFlex(true);
            updateSubScreenWidthtSize({screenWidthSize: ScrollMin_width})//다시 최소 사이즈로 초기화
        }else{
            if(!screenRowFlex) return
            setScreenRowFlex(false);
        }
    }, [contentSize.width,showUserList,subNavigateInfo.clickState]);


    useEffect(()=>{
        if(screenRowFlex){
            updateSubScreenMode({mode:"row"})
        }else{
            updateSubScreenMode({mode:"column"})
        }
    },[screenRowFlex])


    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
        //flex정렬이 row모드일 경우 (좌우정렬 모드)
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const {mode}= subNavigateInfo
        if (!isResizing) return;
        if(mode ==="row"){
            //content size에서 채팅부분을 제외한 크기
            const maxScroll = contentSize.width -(ScrollMin_width+ScrollMarginInline);
            const newWidth =(contentSize.width + defaultContentSize) - e.clientX;
            // contentSize.width + defaultContentSize = 전체 화면의 크기 (ContentComposition + Main,subNavigation)

            if(showUserList) {
                const smallNewWidth = newWidth - GroupUserList_Container_width
                if(smallNewWidth>ScrollMin_width && smallNewWidth<(maxScroll-GroupUserList_Container_width)){
                    updateSubScreenWidthtSize({screenWidthSize: smallNewWidth})
                }
            }else {
                if(newWidth>ScrollMin_width && newWidth<maxScroll){
                    updateSubScreenWidthtSize({screenWidthSize:newWidth})
                }
            }

        }else if(mode ==="column"){
            const newHeight = e.clientY- (SubNavigateTopBar_hegiht+(SubNavigate_padding*2)+subNavigateBorder-3);
            //전체크기 - (*이벤트바+input의 크기) 보다 작아야함
            if(newHeight >=180 && newHeight <=contentSize.height-SubNavigateTopBar_hegiht-SubNavigateTopBar_hegiht-MessageSend_Cotainer_height-3){
                updateSubScreenHeightSize({screenHeightSize:newHeight})
            }
        }

    };

    // 마우스 이벤트 추가
    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);



    //TODO: subScreen + MessageBox가 특정크기 이상일 때 groupUserList가 못나오니 그 상황에는 selectBox형태로 띄우기

    return(

        <FullScreen_div ref={contentRef}>

            <EventTopBar_Container>
                {subNavigateInfo.clickState==="공지"&&
                    <EventTopBarSubContent>
                        <i className="fi fi-ss-megaphone"></i>
                    </EventTopBarSubContent>}
                {subNavigateInfo.clickState==="투표"&&
                    <EventTopBarSubContent>
                        <i className="fi fi-ss-vote-yea"></i>
                    </EventTopBarSubContent>}
                <EventTopBarContent $isClick={showUserList}
                                    onClick={()=>setShowUserList(!showUserList)}>
                    <i className="fi fi-ss-users"></i>
                </EventTopBarContent>

            </EventTopBar_Container>


            {(target ==="group"&& groupDetail)&&
                <ContentsScreen_div>
                    { param===subNavigateInfo.param &&
                        <FullScreen_div style={{display:"flex", flexDirection:"row"}}>
                            {subNavigateInfo.clickState!=="" &&
                                (screenRowFlex ?
                                        <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                                            <CustomScreen_MessageBox_Contaienr $mode={subNavigateInfo.mode}
                                                                               $width={showUserList ?
                                                                                   subNavigateInfo.screenWidthSize/(contentSize.width-GroupUserList_Container_width) * 100:
                                                                                   subNavigateInfo.screenWidthSize/contentSize.width * 100}>
                                                <MessageContainer target={target} param={param}/>
                                            </CustomScreen_MessageBox_Contaienr>
                                            <CustomScreen_SubContent_Contaienr $mode={subNavigateInfo.mode}
                                                                               $width={showUserList ?
                                                                                   subNavigateInfo.screenWidthSize/(contentSize.width-GroupUserList_Container_width) * 100:
                                                                                   subNavigateInfo.screenWidthSize/contentSize.width * 100}>
                                                <CustomScreen_MiddleLine_div $mode={subNavigateInfo.mode} onMouseDown={handleMouseDown}/>
                                                <GroupSubScreen groupId={param} memberLength={groupDetail.members.length}/>
                                            </CustomScreen_SubContent_Contaienr>
                                        </TransContentsScreen_div>
                                        :
                                        <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                                            <CustomScreen_SubContent_Contaienr $mode={subNavigateInfo.mode}
                                                                               $height={subNavigateInfo.screenHeightSize}>
                                                <GroupSubScreen groupId={param} memberLength={groupDetail.members.length}/>
                                                <CustomScreen_MiddleLine_div $mode={subNavigateInfo.mode} onMouseDown={handleMouseDown}/>
                                            </CustomScreen_SubContent_Contaienr>
                                            <CustomScreen_MessageBox_Contaienr
                                                                               $mode={subNavigateInfo.mode}
                                                                               $height={subNavigateInfo.screenHeightSize}>
                                                <MessageContainer target={target} param ={param}/>
                                            </CustomScreen_MessageBox_Contaienr>
                                        </TransContentsScreen_div>
                                )
                            }
                            {subNavigateInfo.clickState==="" &&
                                <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                                      <MessageContainer target={target} param ={param}/>
                                </TransContentsScreen_div>
                            }
                            {showUserList && <GroupUserList isLoading={isLoading}/>}
                        </FullScreen_div>
                    }

                </ContentsScreen_div>
            }

        </FullScreen_div>
    )
}
export default connect(mapStateToSubNavigationProps,mapDispatchToSubNavigationProps) (ContentsComposition);