import {UseQueryResult} from "@tanstack/react-query";

export const useConfirm= (massage = " ", onConfirm: () => void, onCancel: () => void, refetchQuery?: UseQueryResult) => {
    let result;
    if (typeof onConfirm !== "function") {
        return;
    }
    if (typeof onCancel !== "function") {
        return;
    }
    const confrimAction = () => { //취할 행동
        if (window.confirm(massage)) { //확신 시
            onConfirm();
            setTimeout(() => {
                if (refetchQuery) {
                    setTimeout(()=>{
                        refetchQuery.refetch();
                    },1000)
                }
            }, 500)
            result = true;
        } else {
            onCancel(); //취소 누르면 실행
            result = false;
        }
    };
    confrimAction()
    return result;
}
