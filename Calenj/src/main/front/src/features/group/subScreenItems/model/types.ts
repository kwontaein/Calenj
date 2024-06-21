
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

