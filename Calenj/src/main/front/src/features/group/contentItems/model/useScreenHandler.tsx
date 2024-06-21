import React, {useEffect, useState} from "react";
import {MessageSend_Container_height, ScrollMarginInline, ScrollMin_width} from "../../../messsage/messageScrollBox/ui/MessageScrollBoxStyled";
import {GroupUserList_Container_width} from "../../user/ui/GroupUserListStyled";
import {
    SubNavigate_padding,
    subNavigateBorder,
    SubNavigateTopBar_height, SubNavigation_Container_width
} from "../../subNavItems/ui/GroupSubNavigationStyle";
import {MiddleLine_Size} from "../../subScreenItems";
import {GroupList_Container_width} from "../../navItems_list/ui/GroupListStyle";
import {contentSize} from './types'
import {updateSubScreenHeightSize, updateSubScreenWidthSize} from "../../../../entities/redux/model/slice/GroupSubNavigationSlice";
import {useDispatch} from "react-redux";

export const useScreenHandler = (showUserList:boolean, currentMode:string, contentSize:contentSize,)
    : [handleMouseDown:(e: React.MouseEvent)=>void] => {

    const dispatch = useDispatch();
    const [isResizing, setIsResizing] = useState<boolean>(false); //마우스 Down 시 true로 바껴 이벤트 활성화
    const defaultContentSize = GroupList_Container_width + SubNavigation_Container_width;

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

            if(showUserList) {
                const smallNewWidth = newWidth - GroupUserList_Container_width
                if(smallNewWidth>ScrollMin_width && smallNewWidth<(maxScroll-GroupUserList_Container_width)){
                    // updateSubScreenWidthSize({screenWidthSize: smallNewWidth})
                    dispatch(updateSubScreenWidthSize({screenWidthSize: smallNewWidth}))
                }
            }else {
                if(newWidth>ScrollMin_width && newWidth<maxScroll){
                    // updateSubScreenWidthSize({screenWidthSize:newWidth})
                    dispatch(updateSubScreenWidthSize({screenWidthSize: newWidth}))
                }
            }
        }else if(currentMode ==="column"){
            const newHeight = e.clientY- (SubNavigateTopBar_height+(SubNavigate_padding*2)+subNavigateBorder-MiddleLine_Size);
            //전체크기 - (*이벤트바+input의 크기) 보다 작아야함
            if(newHeight >=185 && newHeight <=contentSize.height-SubNavigateTopBar_height-SubNavigateTopBar_height-MessageSend_Container_height-3){
                dispatch(updateSubScreenHeightSize({screenHeightSize:newHeight}))
            }
        }

    }

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
