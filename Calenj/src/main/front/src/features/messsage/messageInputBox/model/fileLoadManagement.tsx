const requestCount = ()=>{
    let requestCount=0;
    return (complete?:boolean)=> {
        if(complete){
            requestCount=0;//완료되면 초기화
        }else if(requestCount>10){
            console.log('버그가 발생하여 refetch를 시작합니다')
        }
        return requestCount++;
    }
}
export const fileLoadManagement = requestCount()