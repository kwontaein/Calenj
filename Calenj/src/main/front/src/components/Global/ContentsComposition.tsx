import {FullScreen_div} from '../../style/FormStyle'
import React, {useEffect, useState, useRef} from "react";
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
    EventTopBarContent,
    TransContentsScreen_div,
} from "../../style/Navigation/ContentCompositionStyle";
import GroupUserList from "../Group/GroupUserList"
import {debounce, throttle} from "../../stateFunc/actionFun";
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/queryManagement";
import {GroupDetail} from '../../store/ReactQuery/queryInterface'
import GroupSubScreen from "../Group/GroupSubScreen";
import {GroupList_Container_width} from '../../style/Group/GroupListStyle';
import {SubNavigateTopBar_hegiht, SubNavigation_Container_width} from '../../style/Navigation/SubNavigationStyle';
import {MessageSend_Cotainer_height, ScrollMarginInline, ScrollMin_width} from '../../style/ChatBoxStyle';
import {groupUserList_Container_width} from '../../style/Group/GroupUserListStyle'
import useComponentSize from '../../stateFunc/useComponentSize'

interface qeuryProps {
    isLoading :boolean
    target:string;
    param:string;
}

const ContentsComposition :React.FC<SubNavigateState & DispatchSubNavigationProps & qeuryProps>=({target,param, isLoading,subNavigateInfo,updateSubScreenMode,updateSubScreenWidthtSize,updateSubScreenHeightSize})=>{
    const [showUserList,setShowUserList] = useState<boolean>(false);
    const resizableDivRef = useRef<HTMLDivElement>(null);
    const [divWidth, setDivWidth] = useState<number>(0);
    const [groupDetail,setGroupDetail] = useState<GroupDetail>();
    const [screenRowFlex,setScreenRowFlex] = useState<boolean>(true); //true: flex == row
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [componentRef, size] = useComponentSize(); //컴포넌트의 크기를 가져옴
    const queryClient = useQueryClient();
    const defaultContentSize = GroupList_Container_width + SubNavigation_Container_width;

    //그룹 디테일 불러오기
    useEffect( () => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,param]));
    }, [isLoading,param]);


    useEffect(() => { //div 창의 크기를 observer
        if(target==="group"){
            const resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    const { width } = entry.contentRect;
                    const saveScreenWidth = throttle(()=>{
                        setDivWidth(width);
                    },1000)
                    saveScreenWidth()
                }
            });

            if (resizableDivRef.current) {
                resizeObserver.observe(resizableDivRef.current);
            }
        }
    }, [subNavigateInfo.clickState,param]);

    //기존 세팅이랑 다를 때 바꾸기(넓이가 바뀔 떄마다 바꾸는 것이 아닌 조건이 기존에 세팅한 값이랑 다를 떄 한 번만 바꿈)
    useEffect(() => {
        //컴포넌트의 특정 크기보다 작으면
        const chagneFlg:number =defaultContentSize + ScrollMin_width + ScrollMarginInline + groupUserList_Container_width; // 72+232+300+10+220 = 834
        if(divWidth > chagneFlg){
            if(screenRowFlex) return
            setScreenRowFlex(true);
        }else{
            if(!screenRowFlex) return
            setScreenRowFlex(false);
        }
    }, [divWidth]);



    useEffect(()=>{
        if(screenRowFlex){
            updateSubScreenMode({mode:"row"})
        }else{
            updateSubScreenMode({mode:"column"})
        }
    },[screenRowFlex])


    const userListHandler = () =>{
        setShowUserList(!showUserList);
    }

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
        if (isResizing) {
            if(mode ==="row"){

                //그룹유저 목록 여부에따라 넓이 제한
                if(showUserList){
                    const newWidth =(size.width+defaultContentSize-groupUserList_Container_width) - e.clientX; // MainNav+SubNav크기 -groupUserList (232+72)-220
                    if(newWidth>defaultContentSize && newWidth<(size.width-ScrollMin_width-groupUserList_Container_width)){
                        updateSubScreenWidthtSize({screenWidthSize:newWidth})
                    }
                }
                else{
                    const newWidth =(size.width+defaultContentSize) - e.clientX; //MainNav+SubNav크기 (232+72)
                    if(newWidth>defaultContentSize&& newWidth<(size.width-ScrollMin_width)){
                        updateSubScreenWidthtSize({screenWidthSize:newWidth})
                    }
                }

            }else if(mode ==="column"){
                const newHeight = e.clientY-60;
                //전체크기 - (*이벤트바+input의 크기) 보다 작아야함
                if(newHeight >=216 && newHeight <=size.height-SubNavigateTopBar_hegiht-SubNavigateTopBar_hegiht-MessageSend_Cotainer_height){
                    updateSubScreenHeightSize({screenHeightSize:newHeight})
                }
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

        <FullScreen_div ref={componentRef}>

            <EventTopBar_Container>
                <EventTopBarContent onClick={userListHandler}>
                    <i className="fi fi-ss-users"></i>
                </EventTopBarContent>
            </EventTopBar_Container>


            {(target ==="group"&& groupDetail)&&
                <ContentsScreen_div ref={resizableDivRef} >
                    { param===subNavigateInfo.param &&
                        <FullScreen_div style={{display:"flex", flexDirection:"row"}}>
                            {subNavigateInfo.clickState!=="" &&
                                (screenRowFlex ?
                                        <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                                            <CustomScreen_MessageBox_Contaienr $mode={subNavigateInfo.mode}
                                                                               $width={subNavigateInfo.screenWidthSize}>
                                                <MessageContainer target={target} param={param}/>
                                            </CustomScreen_MessageBox_Contaienr>
                                            <CustomScreen_MiddleLine_div $mode={subNavigateInfo.mode}
                                                                         onMouseDown={handleMouseDown}/>
                                            <CustomScreen_SubContent_Contaienr $mode={subNavigateInfo.mode}
                                                                               $width={subNavigateInfo.screenWidthSize}>
                                                <GroupSubScreen groupId={param} memberLength={groupDetail.members.length}/>
                                            </CustomScreen_SubContent_Contaienr>
                                        </TransContentsScreen_div>
                                        : (screenRowFlex !== undefined &&
                                        <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                                            <CustomScreen_SubContent_Contaienr $mode={subNavigateInfo.mode} $height={subNavigateInfo.screenHeightSize}>
                                                <GroupSubScreen groupId={param} memberLength={groupDetail.members.length}/>
                                            </CustomScreen_SubContent_Contaienr>
                                            <CustomScreen_MiddleLine_div $mode={subNavigateInfo.mode} onMouseDown={handleMouseDown}/>
                                            <CustomScreen_MessageBox_Contaienr $mode={subNavigateInfo.mode} $height={subNavigateInfo.screenHeightSize}>
                                                <MessageContainer target={target} param ={param}/>
                                            </CustomScreen_MessageBox_Contaienr>
                                        </TransContentsScreen_div>
                                    )
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