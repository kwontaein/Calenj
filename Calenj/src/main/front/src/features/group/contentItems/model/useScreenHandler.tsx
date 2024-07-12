import React, {useEffect, useRef, useState} from "react";
import {
    MessageSend_Container_height,
    ScrollMarginInline,
    ScrollMin_width
} from "../../../messsage/messageScrollBox/ui/MessageScrollBoxStyled";
import {GroupUserList_Container_width} from "../../members";
import {
    SubNavigate_paddingBlock,
    subNavigateBorder,
    SubNavigateTopBar_height, SubNavigation_Container_width
} from "../../subNavItems/ui/GroupSubNavigationStyle";
import {MiddleLine_Size} from "../../subScreenItems";
import {GroupList_Container_width} from "../../navItems_list/ui/GroupListStyle";
import {contentSize} from './types'
import {RootState, updateGroupSubScreenWidthSize, updateGroupSubScreenHeightSize} from "../../../../entities/redux";
import {useDispatch, useSelector} from "react-redux";

export const useScreenHandler = (showMemberList:boolean, currentMode:string, contentSize:contentSize,)
    : [handleMouseDown:(e: React.MouseEvent)=>void] => {

    const dispatch = useDispatch();
    const [isResizing, setIsResizing] = useState<boolean>(false); //마우스 Down 시 true로 바껴 이벤트 활성화
    const defaultContentSize = GroupList_Container_width + SubNavigation_Container_width;
    const {inputSize} = useSelector((state:RootState) => state.messageInputSize);
    const beforeInputSize = useRef<number>(60);
    const {screenHeightSize,mode} = useSelector((state:RootState) => state.subNavigation.group_subNavState);


    //input사이즈 + subScreenHeight의 크기가 전체화면의 크기를 초과하지 않도록 조정
    useEffect(() => {
        if(mode==="row") return
        if(screenHeightSize >= contentSize.height-(SubNavigateTopBar_height*2)-inputSize-3){
            const newHeight = screenHeightSize - (screenHeightSize -(contentSize.height-(SubNavigateTopBar_height*2)-inputSize-3))
            dispatch(updateGroupSubScreenHeightSize({screenHeightSize:newHeight}))
        }
    }, [inputSize]);



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
        if (!isResizing) return;
        if(currentMode ==="row"){
            //content size에서 채팅부분을 제외한 크기
            const maxScroll = contentSize.width -(ScrollMin_width+ScrollMarginInline);
            const newWidth = (contentSize.width + defaultContentSize) - e.clientX;
            // contentSize.width + defaultContentSize = 전체 화면의 크기 (ContentComposition + Main,subNavigation)

            if(showMemberList) {
                const smallNewWidth = newWidth - GroupUserList_Container_width
                if(smallNewWidth>ScrollMin_width && smallNewWidth<(maxScroll-GroupUserList_Container_width)){
                    // updateGroupSubScreenWidthSize({screenWidthSize: smallNewWidth})
                    dispatch(updateGroupSubScreenWidthSize({screenWidthSize: smallNewWidth}))
                }
            }else {
                if(newWidth>ScrollMin_width && newWidth<maxScroll){
                    // updateGroupSubScreenWidthSize({screenWidthSize:newWidth})
                    dispatch(updateGroupSubScreenWidthSize({screenWidthSize: newWidth}))
                }
            }
        }else if(currentMode ==="column"){
            const newHeight = e.clientY- (SubNavigateTopBar_height+(SubNavigate_paddingBlock*2)+subNavigateBorder-MiddleLine_Size);
            //전체크기 - (*이벤트바+input의 크기) 보다 작아야함
            if(newHeight >=185 && newHeight <=contentSize.height-(SubNavigateTopBar_height*2)-inputSize-3){
                dispatch(updateGroupSubScreenHeightSize({screenHeightSize:newHeight}))
            }
        }

    }

    useEffect(() => {
        if(beforeInputSize.current!= inputSize){
            // dispatch(updateGroupSubScreenHeightSize({screenHeightSize:screenHeightSize+(beforeInputSize.current-inputSize)}))
            beforeInputSize.current = inputSize
        }
    }, [inputSize]);

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


    return[handleMouseDown]
};
