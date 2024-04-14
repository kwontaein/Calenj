import {CompatClient, Frame, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {call, put, race, delay, take, fork,select} from 'redux-saga/effects';
import {eventChannel, buffers} from 'redux-saga';
import {receivedStompMsg, SEND_STOMP_MSG, UPDATE_DESTINATION, Destination} from "./StompReducer"
import {UPDATE_APP_POSITION} from './AppPositionReducer';
import { time } from "console";


type stateType = "ALARM"| "READ" | "SEND" | "ENDPOINT";

interface AppData{
    [type:string] :string|number,
    state:stateType,
}
interface StompData extends  AppData{
    message:string;
}


export const endPointMap = new Map();

export const subscribeDirection = ['personalTopic', 'groupMsg', 'friendMsg']

function* sendStomp(stompClient: CompatClient) {

    while (true) {
        const {payload} = yield take(SEND_STOMP_MSG)//액션을 기다린 후 dipstch가 완료되면 실행
        const {params, target, message} = yield payload;

        const data: StompData = {
            [target]: `${params}`, //groupMsg,friendMsg
            message: `${message}`,
            state: "SEND", //0:endpoint 로드
        }
        const url = `/app/${target}`
        stompClient.publish({
            destination: `${url}`,
            body: JSON.stringify(data),
        })
    }
}



//endPoint Update를 위한 url위치에 기반한 위치 업데이트
function* sendAppPosition(stompClient: CompatClient){
    while(true){
        const {payload} = yield take(UPDATE_APP_POSITION)//업데이트 될때까지 기다림
        const {target, messageParams, state} = yield payload;
        
        const data:AppData={
            [target] :`${messageParams}`,//메시지 주소
            state: state,
        }
        const url = `/app/${target}`
        stompClient.send(url,{}, JSON.stringify(data))
    }
}


function* sendPublish(destination:Destination,stompClient:CompatClient){

    destination.map((sub: (string | number)[], index: number) => {
        sub.map((params: (string | number)) => {
                    
            const data: AppData = {
                [subscribeDirection[index]]: `${params}`, //groupMsg,friendMsg
                state: "ALARM", //0:endpoint 로드
            }
            const url = `/app/${subscribeDirection[index]}`
            stompClient.publish({
                destination: `${url}`,
                body: JSON.stringify(data),
            })
        })
    })

} 


//제너레이터를 활용한 비동기식 처리
export function* initializeStompChannel(): any {
    const {payload} = yield take(UPDATE_DESTINATION)//액션을 기다린 후 dipstch가 완료되면 실행
    yield startStomp(payload.destination);
}


function* startStomp(destination: Destination): any {

    //비동기식 함수를 호출하는 call을 사용하여 stompClient를받아옴
    //saga의 call을 쓰면 Promis또는 Generator함수만 받으며 Promise 시 res반환 전까지 saga실행중지
    const stompClient = yield call(createStompConnection) //Stomp를 connect하는 함수, 성공 시 다음 명령 실행
    const channel = yield call(createEventChannel, stompClient, destination); //외부 이벤트 소스를 saga의 이벤트를 발생하게 채널연결
    //함수 실행 후 백그라운드에도 유지
    yield fork(sendStomp, stompClient) 
    yield fork(sendAppPosition,stompClient)
    yield fork(sendPublish,destination,stompClient)

    let isRunning = true;

    //put == dispatch랑 동일
    while (isRunning) {
        //race : 경주랑 비슷하게 여러개의 사가 효과가 동시에 실행하고 먼저 완료되는 효과만 처리함
        const {message, timeout} = yield race({
            timeout: delay(60 * 60 * 1000), //1시간 뒤 stomp끊기게 설정 => delay :작업을 지연 시키는 메서드
            message: take(channel), //액션을 기다린 후 dipstch가 완료되면 실행
        });
        if (timeout) isRunning = false;

        console.log('receivedStompMsg(message)',receivedStompMsg(message)) //이거 받은 거 map에 저장하면 됨
        const messageData =yield put(receivedStompMsg(message)); //action dipatch
        

        // && (localStorage.getItem('userId')!== messageData.payload.useEmail)
        if(messageData.payload.state ==="SEND"&& (localStorage.getItem('userId')!== messageData.payload.useEmail)){
            if(messageData.payload.hasOwnProperty('groupMsg')){
                endPointMap.set(messageData.payload.groupMsg, endPointMap.get(messageData.payload.groupMsg)+1)
            }else if(messageData.payload.hasOwnProperty('friendMsg')){
                endPointMap.set(messageData.payload.friendMsg, endPointMap.get(messageData.payload.friendMsg)+1)

            }
        }else if(messageData.payload.state ==="ALARM"){
            if(messageData.payload.hasOwnProperty('groupMsg')){
                endPointMap.set(messageData.payload.groupMsg, endPointMap.get(messageData.payload.groupMsg)||(messageData.payload.endPoint-1))
            }else if(messageData.payload.hasOwnProperty('friendMsg')){
                endPointMap.set(messageData.payload.friendMsg, endPointMap.get(messageData.payload.friendMsg)||(messageData.payload.endPoint-1))
            }
        }
        
     
        
    }  
}


//stomp연결을 위한 함수 >>call로 호출 > 비동기식으로 처리해주는 거, Promise도 가능
function createStompConnection() {

    const stompUrl: string = "http://localhost:8080/ws-stomp"

    return new Promise((res, rej) => {

        const sock = new SockJS(stompUrl);
        const stompClient = Stomp.over(sock);

        // WebSocket 에러 처리
        stompClient.onWebSocketError = (error: Error) => {
            console.error('Error with websocket', error);
            rej(error);
        };

        // Stomp 에러 처리
        stompClient.onStompError = (frame: Frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
            rej(frame);
        };

        stompClient.reconnectDelay = 5000; // 다시 연결 시도 delay : 5초
        stompClient.heartbeatIncoming = 4000; // 서버로부터 연결 수신확인/수신이 오지 않으면 끊긴걸로 간주
        stompClient.heartbeatOutgoing = 4000; // 클라이언트가 서버로 신호를 보냄, 연결이 활성상태를 알림

        const connectionCallback = () => {
            res(stompClient);
        };

        stompClient.onConnect = connectionCallback;
        stompClient.activate();


    });

}

//stomp를 유동적으로 쓰기위한 함수, 이벤트 채널을 발생 =>saga
function createEventChannel(stompClient: CompatClient, destination: Destination) {
    //외부 이벤트 소스(예: 웹 소켓)를 Redux Saga의 이벤트를 발생시키는 채널로 변환
    return eventChannel(emit => {
        //subscriber 함수는 새로운 구독이 시작될 때 호출되고, 구독이 종료될 때 호출되는 unsubscribe 함수를 반환
        const subscribeMessage = () => {
            destination.map((sub: (string | number)[], index: number) => {
                sub.map((params: (string | number)) => {
                    stompClient.subscribe(`/topic/${subscribeDirection[index]}/${params}`, (iMessage: IMessage) => {
                        emit(JSON.parse(iMessage.body));
                    })
                })
            })
        };

        subscribeMessage();
        return function unsubscribe() {
            stompClient.deactivate() //연결 끊기
        };

        //크기를 지정하고 버퍼에 새로운 항목이 추가될 때마다 버퍼의 크기를 동적으로 확장
        //인자로는 확장의 최장크기(크기제한)
    }, buffers.expanding<number>(1000) || buffers.none())
}