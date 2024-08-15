import {FriendList} from "../../../../entities/reactQuery";

export interface hoverInfo{
    target:string,
    userId:string,
}

export interface FriendListProps{
    friendList:FriendList[]
}