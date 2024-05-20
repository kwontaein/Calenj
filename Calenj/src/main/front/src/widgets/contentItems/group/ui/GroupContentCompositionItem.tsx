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
import {connect, useDispatch} from 'react-redux'
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapStateToSubNavigationProps,
    mapDispatchToSubNavigationProps,
} from "../../../../store/slice/SubNavigationSlice";

import MessageContainer from "../../../../components/MessageBox/MessageContainer2";
import {ControlLine} from "../../../../features/subScreen/controlSize";
import {useScreenMode} from "../model/useScreenMode";

interface ContentCompotisionProps{
    param : string,
    contentSize:{width:number,height:number}
    showUserList : boolean,
}

const GroupContentCompositionItem : React.FC<SubNavigateState & DispatchSubNavigationProps & ContentCompotisionProps> = ({subNavigateInfo,updateSubScreenWidthtSize, updateSubScreenHeightSize, updateSubScreenMode ,param, contentSize, showUserList}) =>{
    const dispatch = useDispatch();
    const screenRowFlex = useScreenMode(contentSize,subNavigateInfo,showUserList,dispatch);

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