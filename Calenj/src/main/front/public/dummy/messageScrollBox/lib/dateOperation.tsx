import {changeDateForm} from "../../../../src/shared/lib";
import {CompatClient} from "@stomp/stompjs";
import {take} from "redux-saga/effects";
import {REQUEST_FILE, StompData} from "../../../../src/entities/redux/model/slice/StompReducer";

// export const dateOperation = (beforeSendDate : string, AfterSendDate : string) => {
//     return ((+changeDateForm(AfterSendDate)) - (+changeDateForm(beforeSendDate)) < 300000)
// }

//endPoint Update 를 위한 url 위치에 기반한 위치 업데이트
// function* requestChatFile(stompClient: CompatClient) {
//     while (true) {
//         const {payload} = yield take(REQUEST_FILE)//업데이트 될때까지 기다림
//         const {target, param, requestFile, nowLine} = yield payload;
//
//         const data: StompData = {
//             param: param,//메시지 주소
//             state: requestFile,
//             nowLine: nowLine,
//         }
//         const url = `/app/${target}`
//         stompClient.send(url, {}, JSON.stringify(data))
//     }
// }