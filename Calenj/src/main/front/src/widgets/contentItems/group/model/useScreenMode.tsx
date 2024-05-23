import {useEffect, useState} from "react";
import {GroupUserList_Container_width} from "../../../../style/Group/GroupUserListStyle";
import {ScrollMarginInline, ScrollMin_width} from "../../../../features/messsage/messageScrollBox/ui/MessageScrollBoxStyled";
import {updateSubScreenMode, updateSubScreenWidthtSize} from "../../../../store/slice/SubNavigationSlice";
import {SubNavigationProps} from "../../../../store/slice/SubNavigationSlice";
import {contentSize} from "../../../../features/subScreen/controlSize/model/types";
import {useDispatch} from "react-redux";

export const useScreenMode = (param:string, contentSize:contentSize, subNavigateInfo : SubNavigationProps, showUserList:boolean):boolean =>{
    const [screenRowFlex,setScreenRowFlex] = useState<boolean>(subNavigateInfo.mode==="row"); //true: flex == row
    const dispatch = useDispatch();

    //전체 스크린의 넓이에 따른 subScreenMode 전환
    useEffect(() => {
        const {screenWidthSize} = subNavigateInfo
        //contentSize-subScreenSize = MessageBoxSize
        let contentWidth = contentSize.width - screenWidthSize;

        if(showUserList) contentWidth -=GroupUserList_Container_width;

        //contnetSize가 최소 크기가 됐는데 subScreen이 최소크기 이상이라면 subScreen을 감소
        if(contentWidth <= (ScrollMin_width + ScrollMarginInline) && screenWidthSize > ScrollMin_width){
            //contentWidth이 ScrollMin_width + ScrollMarginInline 보다 작아진 만큼 subScreen크기 갱신나옴
            //contentWidth <= (ScrollMin_width + ScrollMarginInline) 조건이라 contentWidth-(ScrollMin_width+ScrollMarginInline) < 0
            dispatch(updateSubScreenWidthtSize({screenWidthSize:screenWidthSize+(contentWidth-(ScrollMin_width+ScrollMarginInline))}));
        }

        //기존 subScreenSize가 contentWidth의 초과한만큼 빼도 최소크기이상이면
        if(screenWidthSize+(contentWidth-(ScrollMin_width+ScrollMarginInline))>ScrollMin_width){
            if(screenRowFlex) return
            setScreenRowFlex(true);
            dispatch(updateSubScreenWidthtSize({screenWidthSize: ScrollMin_width}))//다시 최소 사이즈로 초기화
        }else{
            if(!screenRowFlex) return
            setScreenRowFlex(false);
        }
    }, [param,contentSize.width,showUserList,subNavigateInfo.clickState]);


    useEffect(()=>{
        if(screenRowFlex){
            dispatch(updateSubScreenMode({mode:"row"}))
        }else{
            dispatch(updateSubScreenMode({mode:"column"}))
        }
    },[screenRowFlex])


    return screenRowFlex;
}