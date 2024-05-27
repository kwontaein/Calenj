import {DispatchSubNavigationProps, SubNavigateState} from "../../../../store/slice/SubNavigationSlice";

export interface contentSize{
    width:number,
    height:number,
}

interface ContentItemProps{
    showUserList:boolean,
    contentSize:contentSize,
}

export type MidLineProps =  SubNavigateState & DispatchSubNavigationProps & ContentItemProps;