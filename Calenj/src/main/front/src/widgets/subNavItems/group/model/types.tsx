import {DispatchSubNavigationProps, SubNavigateState} from "../../../../store/slice/SubNavigationSlice";

interface subNaviationProps{
    groupId:string,
}

export type SubNavProps = SubNavigateState & DispatchSubNavigationProps &subNaviationProps;