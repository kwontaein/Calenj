import { CompatClient, Frame, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { call ,put, race,delay,take,fork} from 'redux-saga/effects';
import { eventChannel ,buffers } from 'redux-saga';
import {receivedStompMsg, SEND_STOMP_MSG,UPDATE_DESTINATION,UPDATE_APP,Destination} from "./StompReducer"

interface StompData {
    [type:string]: string|number,
    message: string
}

const subscribeDirection = ['personalTopic', 'groupMsg', 'friendMsg']

function* sendStomp(stompClient: CompatClient) {

    while (true) {
        const {payload} = yield take(SEND_STOMP_MSG)//액션을 기다린 후 dipstch가 완료되면 실행
        const {params, target, message} = yield payload;
        console.log(payload);
        const data: StompData = {
            [target]: `${params}`,
            message: `${message}`
        }
        const url = `/app/${target}`
        stompClient.publish({
            destination: `${url}`,
            body: JSON.stringify(data),
        })
    }
}


//제너레이터를 활용한 비동기식 처리
export function* initializeStompChannel(): any {
    console.log('Saga실행')
    const {payload} = yield take(UPDATE_DESTINATION)//액션을 기다린 후 dipstch가 완료되면 실행
    yield startStomp(payload.destination);
}


function* startStomp(destination: Destination): any {

    //비동기식 함수를 호출하는 call을 사용하여 stompClient를받아옴
    //saga의 call을 쓰면 Promis또는 Generator함수만 받으며 Promise 시 res반환 전까지 saga실행중지
    const stompClient = yield call(createStompConnection) //Stomp를 connect하는 함수, 성공 시 다음 명령 실행
    const channel = yield call(createEventChannel, stompClient, destination); //외부 이벤트 소스를 saga의 이벤트를 발생하게 채널연결
    const lastWriteTask = yield fork(sendStomp, stompClient) //함수 실행 후 백그라운드에도 유지

    let isRunning = true;

    //put == dispatch랑 동일
    while (isRunning) {
        //race : 경주랑 비슷하게 여러개의 사가 효과가 동시에 실행하고 먼저 완료되는 효과만 처리함
        const {message, timeout} = yield race({
            timeout: delay(60 * 60 * 1000), //1시간 뒤 stomp끊기게 설정 => delay :작업을 지연 시키는 메서드
            message: take(channel), //액션을 기다린 후 dipstch가 완료되면 실행
        });
        if (timeout) isRunning = false;

        console.log("receivedStompMsg(message)", receivedStompMsg(message))
        yield put(receivedStompMsg(message)); //action dipatch
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
                    stompClient.subscribe(`/topic/${subscribeDirection[index]}/${params}`, (isOnline: IMessage) => {
                        emit(JSON.parse(isOnline.body));
                        console.log(`/topic/${subscribeDirection[index]}/${params}`);
                        console.log("Received message:", JSON.parse(isOnline.body));
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