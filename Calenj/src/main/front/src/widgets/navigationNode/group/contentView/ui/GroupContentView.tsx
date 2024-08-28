
import {useEffect} from "react";
import {RootState} from "../../../../../entities/redux";
import {useSelector} from "react-redux";
import {FullScreen_div} from "../../../../../shared/ui/SharedStyled";
import {
    CustomScreen_MessageBox_Container, CustomScreen_SubContent_Container,
    TransContentsScreen_div
} from "../../../../../features/group/contentItems/ui/GroupContentItemStyled";
import {MessageContainer} from "../../../../message";
import {GroupUserList, GroupUserList_Container_width} from "../../../../../features/group/members";
import {ControlMidLine} from "../../../../../features/group/contentItems";
import {GroupSubScreen} from "../../../../../features/group/subScreenItems";
import {useScreenMode} from "../model/useScreenMode";


interface ContentCompositionProps{
    param : string,
    contentSize:{width:number,height:number}
}

export const GroupContentView : React.FC<ContentCompositionProps> = ({param, contentSize}) =>{
    const group_subNavState = useSelector((state:RootState) => state.subNavigation.group_subNavState)
    const screenRowFlex = useScreenMode(param,contentSize,group_subNavState.showMemberList);



    return(
        param ===group_subNavState.param &&
        <FullScreen_div style={{display:"flex"}}>
            <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showMemberList={group_subNavState.showMemberList}>
                <CustomScreen_MessageBox_Container $clickState={group_subNavState.clickState===""}
                                                   $mode={group_subNavState.mode}
                                                   $height={group_subNavState.screenHeightSize}
                                                   $width={group_subNavState.showMemberList ?
                                                       group_subNavState.screenWidthSize/(contentSize.width-GroupUserList_Container_width) * 100:
                                                       group_subNavState.screenWidthSize/contentSize.width * 100}>

                    <MessageContainer/>
                </CustomScreen_MessageBox_Container>
                {group_subNavState.clickState !=="" &&
                    <CustomScreen_SubContent_Container $screenRowFlex={screenRowFlex}
                                                       $mode={group_subNavState.mode}
                                                       $height={group_subNavState.screenHeightSize}
                                                       $width={group_subNavState.showMemberList ?
                                                           group_subNavState.screenWidthSize/(contentSize.width-GroupUserList_Container_width) * 100:
                                                           group_subNavState.screenWidthSize/contentSize.width * 100}>

                        {screenRowFlex && <ControlMidLine contentSize={contentSize}/>}
                        <GroupSubScreen/>
                        {!screenRowFlex && <ControlMidLine contentSize={contentSize}/>}
                    </CustomScreen_SubContent_Container>}
            </TransContentsScreen_div>

            {group_subNavState.showMemberList && <GroupUserList/>}
        </FullScreen_div>
    )
}
