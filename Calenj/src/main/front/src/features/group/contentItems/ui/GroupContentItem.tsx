import {FullScreen_div, ThemaColor2, ThemaColor3} from "../../../../shared/ui/SharedStyled";
import {
    CustomScreen_MessageBox_Container,
    CustomScreen_SubContent_Container,
    TransContentsScreen_div
} from "./ContentCompositionStyle";
import {GroupUserList_Container_width} from "../../user/ui/GroupUserListStyled";
import {GroupSubScreen} from "../../subScreenItems";
import {GroupUserList} from "../../user";
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
    showUserList : boolean,
}

export const GroupContentItem : React.FC<ContentCompositionProps> = ({param, contentSize, showUserList}) =>{
    const subNavigateInfo = useSelector((state:RootState) => state.subNavigateInfo)
    const screenRowFlex = useScreenMode(param,contentSize,showUserList);
    const dispatch = useDispatch()

    useEffect(() => {
        if(param===subNavigateInfo.param){
            dispatch(updateAppPosition({target: "group", param: param}));
        }
    }, [param,subNavigateInfo.param]);

    return(
        param ===subNavigateInfo.param &&
            <FullScreen_div style={{display:"flex"}}>
                    <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                        <CustomScreen_MessageBox_Container $clickState={subNavigateInfo.clickState===""}
                                                           $mode={subNavigateInfo.mode}
                                                           $height={subNavigateInfo.screenHeightSize}
                                                           $width={showUserList ?
                                                               subNavigateInfo.screenWidthSize/(contentSize.width-GroupUserList_Container_width) * 100:
                                                               subNavigateInfo.screenWidthSize/contentSize.width * 100}>

                            <MessageContainer/>
                        </CustomScreen_MessageBox_Container>
                        {subNavigateInfo.clickState !=="" &&
                        <CustomScreen_SubContent_Container $screenRowFlex={screenRowFlex}
                                                           $mode={subNavigateInfo.mode}
                                                           $height={subNavigateInfo.screenHeightSize}
                                                           $width={showUserList ?
                                                               subNavigateInfo.screenWidthSize/(contentSize.width-GroupUserList_Container_width) * 100:
                                                               subNavigateInfo.screenWidthSize/contentSize.width * 100}>

                            {screenRowFlex && <ControlMidLine showUserList={showUserList} contentSize={contentSize}/>}
                            <GroupSubScreen showUserList={showUserList}
                                            subScreenWidth={screenRowFlex ? subNavigateInfo.screenWidthSize :
                                                (showUserList ? contentSize.width-GroupUserList_Container_width: contentSize.width)}/>
                            {!screenRowFlex && <ControlMidLine showUserList={showUserList} contentSize={contentSize}/>}
                        </CustomScreen_SubContent_Container>}
                    </TransContentsScreen_div>

                    {showUserList && <GroupUserList/>}
            </FullScreen_div>
    )
}
