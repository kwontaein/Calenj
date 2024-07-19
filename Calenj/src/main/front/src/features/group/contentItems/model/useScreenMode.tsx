import {useEffect, useState} from "react";
import {GroupUserList_Container_width} from "../../members";
import {updateGroupSubScreenMode, updateGroupSubScreenWidthSize} from "../../../../entities/redux";
import {contentSize} from "./types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {ScrollMin_width} from "../../../messsage";
import {ScrollMarginInline} from "../../../messsage/messageScrollBox/ui/MessageScrollBoxStyled";

export const useScreenMode = (param:string, contentSize:contentSize, showUserList:boolean):boolean =>{
    const group_subNavState = useSelector((state:RootState) => state.subNavigation.group_subNavState)
    const [screenRowFlex,setScreenRowFlex] = useState<boolean>(group_subNavState.mode==="row"); //true: flex == row
    const dispatch = useDispatch();



    //전체 스크린의 넓이에 따른 subScreenMode 전환
    useEffect(() => {
        const {screenWidthSize} = group_subNavState
        //contentSize-subScreenSize = MessageBoxSize
        let contentWidth = contentSize.width - screenWidthSize;

        if(showUserList) contentWidth -=GroupUserList_Container_width;

        //contentSize가 최소 크기가 됐는데 subScreen이 최소크기 이상이라면 subScreen을 감소
        if(contentWidth <= (ScrollMin_width + ScrollMarginInline) && screenWidthSize > ScrollMin_width){
            //contentWidth이 ScrollMin_width + ScrollMarginInline 보다 작아진 만큼 subScreen크기 갱신나옴
            //contentWidth <= (ScrollMin_width + ScrollMarginInline) 조건이라 contentWidth-(ScrollMin_width+ScrollMarginInline) < 0
            dispatch(updateGroupSubScreenWidthSize({screenWidthSize:screenWidthSize+(contentWidth-(ScrollMin_width+ScrollMarginInline))}));
        }

        //기존 subScreenSize가 contentWidth의 초과한만큼 빼도 최소크기이상이면
        if(screenWidthSize+(contentWidth-(ScrollMin_width+ScrollMarginInline))>ScrollMin_width){
            if(screenRowFlex) return
            setScreenRowFlex(true);
            dispatch(updateGroupSubScreenWidthSize({screenWidthSize: ScrollMin_width}))//다시 최소 사이즈로 초기화
        }else{
            if(!screenRowFlex) return
            setScreenRowFlex(false);
        }
    }, [param,contentSize.width,showUserList,group_subNavState.clickState]);


    useEffect(()=>{
        if(screenRowFlex){
            dispatch(updateGroupSubScreenMode({mode:"row"}))
        }else{
            dispatch(updateGroupSubScreenMode({mode:"column"}))
        }
    },[screenRowFlex])


    return screenRowFlex;
}