import axios from "axios";

let timerId:NodeJS.Timeout | undefined;

export const  promiseDebouncing = (callback:()=>Promise<boolean>, timeout =2000 ):Promise<boolean>=>{
    //timerId 제거
    clearTimeout(timerId);

    return new Promise<boolean>((resolve, reject)=>{
        timerId = setTimeout(async ()=>{
            callback().then((result)=>{resolve(result)})
                .catch((err)=>{reject(err)})
        },timeout);
    })

}