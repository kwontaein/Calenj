import {FullScreen_div} from "../../../../style/FormStyle";
import {
    ContentsScreen_div,
    CustomScreen_MessageBox_Contaienr, CustomScreen_MiddleLine_div, CustomScreen_SubContent_Contaienr, MiddleLine_Size,
    TransContentsScreen_div
} from "../../../../style/Navigation/ContentCompositionStyle";
import {GroupUserList_Container_width} from "../../../../style/Group/GroupUserListStyle";
import GroupSubScreen from "../../../../components/Group/NavigateItems/GroupSubScreen";
import GroupUserList from "../../../../components/Group/GroupUser/GroupUserList";
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapStateToSubNavigationProps,
    mapDispatchToSubNavigationProps,
} from "../../../../store/slice/SubNavigationSlice";
import {
    MessageSend_Cotainer_height,
    ScrollMarginInline,
    ScrollMin_width
} from "../../../../style/ChatBoxStyle";
import {
    SubNavigate_padding,
    subNavigateBorder,
    SubNavigateTopBar_hegiht, SubNavigation_Container_width
} from "../../../../style/Navigation/SubNavigationStyle";
import {GroupList_Container_width} from "../../../../style/Group/GroupListStyle";
import MessageContainer from "../../../../components/MessageBox/MessageContainer";
import {ControlLine} from "../../../../features/subScreen/controlSize";

interface ContentCompotisionProps{
    param : string,
    contentSize:{width:number,height:number}
    showUserList : boolean,
}

const GroupContentCompositionItem : React.FC<SubNavigateState & DispatchSubNavigationProps & ContentCompotisionProps> = ({subNavigateInfo,updateSubScreenWidthtSize, updateSubScreenHeightSize, updateSubScreenMode ,param, contentSize, showUserList}) =>{
    const [screenRowFlex,setScreenRowFlex] = useState<boolean>(true); //true: flex == row

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



    return(
            <FullScreen_div style={{display:"flex", flexDirection:"row"}}>
                {subNavigateInfo.clickState!=="" &&
                    (screenRowFlex ?
                            <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                                <CustomScreen_MessageBox_Contaienr $mode={subNavigateInfo.mode}
                                                                   $width={showUserList ?
                                                                       subNavigateInfo.screenWidthSize/(contentSize.width-GroupUserList_Container_width) * 100:
                                                                       subNavigateInfo.screenWidthSize/contentSize.width * 100}>
                                    <MessageContainer target={"group"} param={param}/>
                                </CustomScreen_MessageBox_Contaienr>
                                <CustomScreen_SubContent_Contaienr $mode={subNavigateInfo.mode}
                                                                   $width={showUserList ?
                                                                       subNavigateInfo.screenWidthSize/(contentSize.width-GroupUserList_Container_width) * 100:
                                                                       subNavigateInfo.screenWidthSize/contentSize.width * 100}>
                                    <ControlLine showUserList={showUserList} contentSize={contentSize}/>
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
                                                    subScreenWidth ={contentSize.width}/>
                                    <ControlLine showUserList={showUserList} contentSize={contentSize}/>
                                </CustomScreen_SubContent_Contaienr>
                                <CustomScreen_MessageBox_Contaienr $mode={subNavigateInfo.mode}
                                                                   $height={subNavigateInfo.screenHeightSize}>
                                    <MessageContainer target={"group"} param ={param}/>
                                </CustomScreen_MessageBox_Contaienr>
                            </TransContentsScreen_div>
                        )
                    }
                    {subNavigateInfo.clickState==="" &&
                        <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                            <MessageContainer target={"group"} param ={param}/>
                        </TransContentsScreen_div>
                    }
                    {showUserList && <GroupUserList/>}
            </FullScreen_div>
    )
}

export default connect(mapStateToSubNavigationProps,mapDispatchToSubNavigationProps) (GroupContentCompositionItem);