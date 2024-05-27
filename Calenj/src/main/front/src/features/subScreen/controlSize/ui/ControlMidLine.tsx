import {CustomScreen_MiddleLine_div} from "./ControlMidLineStyled";
import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {mapDispatchToSubNavigationProps, mapStateToSubNavigationProps} from "../../../../store/slice/SubNavigationSlice";
import {mouseMoveHandler} from "../model/mouseMoveHandler";
import {MidLineProps} from '../model/types'

const ControlMidLine :React.FC<MidLineProps> =({subNavigateInfo,showUserList, contentSize}) =>{
    const [handleMouseDown] = mouseMoveHandler(showUserList, subNavigateInfo.mode,contentSize);


    return(
        <CustomScreen_MiddleLine_div $mode={subNavigateInfo.mode} onMouseDown={handleMouseDown}/>
    )
}
export const ControlLine = connect(mapStateToSubNavigationProps,mapDispatchToSubNavigationProps) (ControlMidLine)