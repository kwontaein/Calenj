import {debounce} from '../../../shared/lib/actionFun';

export const updateEndpoint = (requestFile: (params: any) => void, param: string) => {
    const debouncedRequest = debounce(() => {
        requestFile({target: 'groupMsg', param: param, requestFile: "ENDPOINT", nowLine: 0});
        console.log('엔드포인트 갱신');
    }, 1000);
    debouncedRequest();
};
