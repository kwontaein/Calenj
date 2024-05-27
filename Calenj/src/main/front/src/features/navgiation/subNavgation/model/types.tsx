import {DispatchSubNavigationProps, SubNavigateState} from "../../../../store/slice/SubNavigationSlice";

export interface SubItemProps{
    subItem:string,
    clickState:string,
    subItemsHandler:(subItem:string)=>void
}

interface subNaviationProps{
    groupId:string,
}

export type SubNavProps = SubNavigateState & DispatchSubNavigationProps &subNaviationProps;