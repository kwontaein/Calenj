export const subscribeFilter = (friendList: string[], groupList: string[], userId: string): string[][] => {
    let paramsList = [];
    paramsList.push([userId]) //개인이벤트
    paramsList.push(groupList) //그룹채팅
    paramsList.push(friendList) //친구채팅
    return paramsList;
}