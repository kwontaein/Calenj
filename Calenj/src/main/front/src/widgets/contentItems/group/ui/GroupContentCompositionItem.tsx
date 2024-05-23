import {FullScreen_div, ThemaColor2, ThemaColor3} from "../../../../style/FormStyle";
import {
    CustomScreen_MessageBox_Contaienr,
    CustomScreen_SubContent_Contaienr,
    TransContentsScreen_div
} from "./ContentCompositionStyle";
import {GroupUserList_Container_width} from "../../../../style/Group/GroupUserListStyle";
import GroupSubScreen from "../../../../components/Group/NavigateItems/GroupSubScreen";
import GroupUserList from "../../../../components/Group/GroupUser/GroupUserList";
import {connect} from 'react-redux'
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapStateToSubNavigationProps,
    mapDispatchToSubNavigationProps,
} from "../../../../store/slice/SubNavigationSlice";

import {MessageContainer} from "../../../message";
import {ControlLine} from "../../../../features/subScreen/controlSize";
import {useScreenMode} from "../model/useScreenMode";

interface ContentCompositionProps{
    param : string,
    contentSize:{width:number,height:number}
    showUserList : boolean,
}

const GroupContentCompositionItem : React.FC<SubNavigateState & DispatchSubNavigationProps & ContentCompositionProps> = ({subNavigateInfo , param, contentSize, showUserList}) =>{
    const screenRowFlex = useScreenMode(param,contentSize,subNavigateInfo,showUserList);

    return(
        param ===subNavigateInfo.param &&
            <FullScreen_div style={{display:"flex", flexDirection:"row"}}>
                {subNavigateInfo.clickState!=="" &&
                    (screenRowFlex ?
                            <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                                <CustomScreen_MessageBox_Contaienr $mode={subNavigateInfo.mode}
                                                                   $width={showUserList ?
                                                                       subNavigateInfo.screenWidthSize/(contentSize.width-GroupUserList_Container_width) * 100:
                                                                       subNavigateInfo.screenWidthSize/contentSize.width * 100}>
                                    <MessageContainer/>
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
                                                    subScreenWidth ={showUserList? contentSize.width - GroupUserList_Container_width:contentSize.width}/>
                                    <ControlLine showUserList={showUserList} contentSize={contentSize}/>
                                </CustomScreen_SubContent_Contaienr>
                                <CustomScreen_MessageBox_Contaienr $mode={subNavigateInfo.mode}
                                                                   $height={subNavigateInfo.screenHeightSize}>
                                    <MessageContainer/>
                                </CustomScreen_MessageBox_Contaienr>
                            </TransContentsScreen_div>
                        )
                    }
                    { subNavigateInfo.clickState==="" &&
                        <TransContentsScreen_div $screenRowFlex={screenRowFlex} $showUserList={showUserList}>
                            <MessageContainer/>
                        </TransContentsScreen_div>
                    }
                    {showUserList && <GroupUserList/>}
            </FullScreen_div>
    )
}

export default connect(mapStateToSubNavigationProps,mapDispatchToSubNavigationProps) (GroupContentCompositionItem);