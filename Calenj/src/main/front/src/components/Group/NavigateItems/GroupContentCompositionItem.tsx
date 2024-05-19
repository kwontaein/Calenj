import {FullScreen_div} from "../../../style/FormStyle";
import {
    ContentsScreen_div,
    CustomScreen_MessageBox_Contaienr, CustomScreen_MiddleLine_div, CustomScreen_SubContent_Contaienr, MiddleLine_Size,
    TransContentsScreen_div
} from "../../../style/Navigation/ContentCompositionStyle";
import {GroupUserList_Container_width} from "../../../style/Group/GroupUserListStyle";
import GroupSubScreen from "./GroupSubScreen";
import GroupUserList from "../GroupUser/GroupUserList";
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapStateToSubNavigationProps,
    mapDispatchToSubNavigationProps,
} from "../../../store/slice/SubNavigationSlice";
import {
    MessageSend_Cotainer_height,
    ScrollMarginInline,
    ScrollMin_width
} from "../../../style/ChatBoxStyle";
import {
    SubNavigate_padding,
    subNavigateBorder,
    SubNavigateTopBar_hegiht, SubNavigation_Container_width
} from "../../../style/Navigation/SubNavigationStyle";
import {GroupList_Container_width} from "../../../style/Group/GroupListStyle";
import GroupMsgBox from "../../MessageBox/components/GroupMsgBox";

interface ContentCompotisionProps {
    param: string,
    contentSize: { width: number, height: number }
    showUserList: boolean,
}

const GroupContentCompositionItem: React.FC<SubNavigateState & DispatchSubNavigationProps & ContentCompotisionProps> = ({
                                                                                                                            subNavigateInfo,
                                                                                                                            updateSubScreenWidthtSize,
                                                                                                                            updateSubScreenHeightSize,
                                                                                                                            updateSubScreenMode,
                                                                                                                            param,
                                                                                                                            contentSize,
                                                                                                                            showUserList
                                                                                                                        }) => {
    const [screenRowFlex, setScreenRowFlex] = useState<boolean>(true); //true: flex == row
    const [isResizing, setIsResizing] = useState<boolean>(false); //마우스 Down 시 true로 바껴 이벤트 활성화
    const defaultContentSize = GroupList_Container_width + SubNavigation_Container_width;


    //전체 스크린의 넓이에 따른 subScreenMode 전환
    useEffect(() => {
        const {screenWidthSize} = subNavigateInfo
        //contentSize-subScreenSize = MessageBoxSize
        let contentWidth = contentSize.width - screenWidthSize;

        if (showUserList) contentWidth -= GroupUserList_Container_width;

        //contnetSize가 최소 크기가 됐는데 subScreen이 최소크기 이상이라면 subScreen을 감소
        if (contentWidth <= (ScrollMin_width + ScrollMarginInline) && screenWidthSize > ScrollMin_width) {
            //contentWidth이 ScrollMin_width + ScrollMarginInline 보다 작아진 만큼 subScreen크기 갱신나옴
            //contentWidth <= (ScrollMin_width + ScrollMarginInline) 조건이라 contentWidth-(ScrollMin_width+ScrollMarginInline) < 0
            updateSubScreenWidthtSize({screenWidthSize: screenWidthSize + (contentWidth - (ScrollMin_width + ScrollMarginInline))})
        }

        //기존 subScreenSize가 contentWidth의 초과한만큼 빼도 최소크기이상이면
        if (screenWidthSize + (contentWidth - (ScrollMin_width + ScrollMarginInline)) > ScrollMin_width) {
            if (screenRowFlex) return
            setScreenRowFlex(true);
            updateSubScreenWidthtSize({screenWidthSize: ScrollMin_width})//다시 최소 사이즈로 초기화
        } else {
            if (!screenRowFlex) return
            setScreenRowFlex(false);
        }
    }, [contentSize.width, showUserList, subNavigateInfo.clickState]);


    useEffect(() => {
        if (screenRowFlex) {
            updateSubScreenMode({mode: "row"})
        } else {
            updateSubScreenMode({mode: "column"})
        }
    }, [screenRowFlex])


    //마우스로 subScreen의 크기를 조절하는 코드
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
        //flex정렬이 row모드일 경우 (좌우정렬 모드)
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const {mode} = subNavigateInfo
        if (!isResizing) return;
        if (mode === "row") {
            //content size에서 채팅부분을 제외한 크기
            const maxScroll = contentSize.width - (ScrollMin_width + ScrollMarginInline);
            const newWidth = (contentSize.width + defaultContentSize) - e.clientX;
            // contentSize.width + defaultContentSize = 전체 화면의 크기 (ContentComposition + Main,subNavigation)

            if (showUserList) {
                const smallNewWidth = newWidth - GroupUserList_Container_width
                if (smallNewWidth > ScrollMin_width && smallNewWidth < (maxScroll - GroupUserList_Container_width)) {
                    updateSubScreenWidthtSize({screenWidthSize: smallNewWidth})
                }
            } else {
                if (newWidth > ScrollMin_width && newWidth < maxScroll) {
                    updateSubScreenWidthtSize({screenWidthSize: newWidth})
                }
            }

        } else if (mode === "column") {
            const newHeight = e.clientY - (SubNavigateTopBar_hegiht + (SubNavigate_padding * 2) + subNavigateBorder - MiddleLine_Size);
            //전체크기 - (*이벤트바+input의 크기) 보다 작아야함
            if (newHeight >= 185 && newHeight <= contentSize.height - SubNavigateTopBar_hegiht - SubNavigateTopBar_hegiht - MessageSend_Cotainer_height - 3) {
                updateSubScreenHeightSize({screenHeightSize: newHeight})
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


    return (
        <FullScreen_div style={{display: "flex", flexDirection: "row"}}>
            {subNavigateInfo.clickState !== "" &&
                (screenRowFlex ?
                        <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                            <CustomScreen_MessageBox_Contaienr $mode={subNavigateInfo.mode}
                                                               $width={showUserList ?
                                                                   subNavigateInfo.screenWidthSize / (contentSize.width - GroupUserList_Container_width) * 100 :
                                                                   subNavigateInfo.screenWidthSize / contentSize.width * 100}>
                                <GroupMsgBox target={"group"} param={param}/>
                            </CustomScreen_MessageBox_Contaienr>
                            <CustomScreen_SubContent_Contaienr $mode={subNavigateInfo.mode}
                                                               $width={showUserList ?
                                                                   subNavigateInfo.screenWidthSize / (contentSize.width - GroupUserList_Container_width) * 100 :
                                                                   subNavigateInfo.screenWidthSize / contentSize.width * 100}>
                                <CustomScreen_MiddleLine_div $mode={subNavigateInfo.mode}
                                                             onMouseDown={handleMouseDown}/>
                                <GroupSubScreen subNavigateInfo={subNavigateInfo}
                                                showUserList={showUserList}/>
                            </CustomScreen_SubContent_Contaienr>
                        </TransContentsScreen_div>
                        :
                        <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                            <CustomScreen_SubContent_Contaienr $mode={subNavigateInfo.mode}
                                                               $height={subNavigateInfo.screenHeightSize}>
                                <GroupSubScreen subNavigateInfo={subNavigateInfo}
                                                showUserList={showUserList}
                                                subScreenWidth={contentSize.width}/>
                                <CustomScreen_MiddleLine_div $mode={subNavigateInfo.mode}
                                                             onMouseDown={handleMouseDown}/>
                            </CustomScreen_SubContent_Contaienr>
                            <CustomScreen_MessageBox_Contaienr $mode={subNavigateInfo.mode}
                                                               $height={subNavigateInfo.screenHeightSize}>
                                <GroupMsgBox target={"group"} param={param}/>
                            </CustomScreen_MessageBox_Contaienr>
                        </TransContentsScreen_div>
                )
            }
            {subNavigateInfo.clickState === "" &&
                <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                    <GroupMsgBox target={"group"} param={param}/>
                </TransContentsScreen_div>
            }
            {showUserList && <GroupUserList/>}
        </FullScreen_div>
    )
}

export default connect(mapStateToSubNavigationProps, mapDispatchToSubNavigationProps)(GroupContentCompositionItem);