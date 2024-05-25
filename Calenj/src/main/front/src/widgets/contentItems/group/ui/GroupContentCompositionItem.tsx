import {FullScreen_div, ThemaColor2, ThemaColor3} from "../../../../style/FormStyle";
import {
    CustomScreen_MessageBox_Container,
    CustomScreen_SubContent_Container,
    TransContentsScreen_div
} from "./ContentCompositionStyle";
import {GroupUserList_Container_width} from "../../../../style/Group/GroupUserListStyle";
import GroupSubScreen from "../../../../components/Group/NavigateItems/GroupSubScreen";
import GroupUserList from "../../../../components/Group/GroupUser/GroupUserList";
import {connect, useDispatch, useSelector} from 'react-redux'
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapStateToSubNavigationProps,
    mapDispatchToSubNavigationProps,
} from "../../../../store/slice/SubNavigationSlice";

import {MessageContainer} from "../../../message";
import {ControlLine} from "../../../../features/subScreen/controlSize";
import {useScreenMode} from "../model/useScreenMode";
import {useEffect} from "react";
import {updateAppPosition} from "../../../../store/module/StompReducer";

interface ContentCompositionProps{
    param : string,
    contentSize:{width:number,height:number}
    showUserList : boolean,
}

const GroupContentCompositionItem : React.FC<SubNavigateState & DispatchSubNavigationProps & ContentCompositionProps> = ({subNavigateInfo , param, contentSize, showUserList}) =>{
    const screenRowFlex = useScreenMode(param,contentSize,subNavigateInfo,showUserList);
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

                            {screenRowFlex && <ControlLine showUserList={showUserList} contentSize={contentSize}/>}
                            <GroupSubScreen subNavigateInfo={subNavigateInfo}
                                            showUserList={showUserList}
                                            subScreenWidth={screenRowFlex ? subNavigateInfo.screenWidthSize :
                                                (showUserList ? contentSize.width-GroupUserList_Container_width: contentSize.width)}/>
                            {!screenRowFlex && <ControlLine showUserList={showUserList} contentSize={contentSize}/>}
                        </CustomScreen_SubContent_Container>}

                    </TransContentsScreen_div>

                    {showUserList && <GroupUserList/>}
            </FullScreen_div>
    )
}

export default connect(mapStateToSubNavigationProps,mapDispatchToSubNavigationProps) (GroupContentCompositionItem);