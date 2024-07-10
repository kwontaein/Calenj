import {FullScreen_div} from "../../../../shared/ui/SharedStyled";
import {
    CustomScreen_MessageBox_Container,
    CustomScreen_SubContent_Container,
    TransContentsScreen_div
} from "./GroupContentItemStyled";
import {GroupUserList_Container_width} from "../../members";
import {GroupSubScreen} from "../../subScreenItems";
import {GroupUserList} from "../../members";
import { useDispatch, useSelector} from 'react-redux'
import {MessageContainer} from "../../../../widgets/message";
import {useScreenMode} from "../model/useScreenMode";
import {useEffect} from "react";
import {updateAppPosition} from "../../../../entities/redux";
import {RootState} from "../../../../entities/redux";
import {ControlMidLine} from "./ControlMidLine";

interface ContentCompositionProps{
    param : string,
    contentSize:{width:number,height:number}
}

export const GroupContentItem : React.FC<ContentCompositionProps> = ({param, contentSize}) =>{
    const group_subNavState = useSelector((state:RootState) => state.group_subNavState)
    const screenRowFlex = useScreenMode(param,contentSize,group_subNavState.showMemberList);
    const dispatch = useDispatch()

    useEffect(() => {
        if(param===group_subNavState.param){
            dispatch(updateAppPosition({target: "group", param: param}));
        }
    }, [param,group_subNavState.param]);


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
                            <GroupSubScreen subScreenWidth={screenRowFlex ? group_subNavState.screenWidthSize :
                                                (group_subNavState.showMemberList ? contentSize.width-GroupUserList_Container_width: contentSize.width)}/>
                            {!screenRowFlex && <ControlMidLine contentSize={contentSize}/>}
                        </CustomScreen_SubContent_Container>}
                    </TransContentsScreen_div>

                    {group_subNavState.showMemberList && <GroupUserList/>}
            </FullScreen_div>
    )
}
