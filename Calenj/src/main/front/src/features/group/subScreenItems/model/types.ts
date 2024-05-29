import {BoardOptionState, DispatchBoardOptionProps} from "../../../../entities/redux/slice/BoardOptionSlice";
import {DispatchSubNavigationProps, SubNavigateState} from "../../../../entities/redux/slice/SubNavigationSlice";


export interface ContentsCompositionProps{
    showUserList:boolean,
    subScreenWidth:number;
}

export interface SubScreenProps{
    showUserList : boolean,
}

export interface GroupSubScreenProps{
    showUserList:boolean,
    isSearching:(word:string)=>void,
}

export interface contentSize{
    width:number,
    height:number,
}

