export interface ReturnShareSchedule{
    shareTarget: ShareList[],
    setTargetHandler:(target:string, targetId: string)=> void
    shareSchedule: ()=>void,
}

export interface ShareList {
    target:string,
    chatId:string,
}