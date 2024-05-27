import {BoardOptionState, DispatchBoardOptionProps} from "../../../../store/slice/BoardOptionSlice";
import {DispatchSubNavigationProps, SubNavigateState} from "../../../../store/slice/SubNavigationSlice";


export interface ContentsCompositionProps{
    showUserList:boolean,
    subScreenWidth:number;
}

export interface SubScreenProps{
    showUserList : boolean,
}

interface GroupSubScreenProps{
    showUserList:boolean,
    isSearching:(word:string)=>void,
}
export type SelectBoxProps = BoardOptionState & DispatchBoardOptionProps & GroupSubScreenProps;

export interface contentSize{
    width:number,
    height:number,
}

