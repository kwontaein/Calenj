package org.example.calenj.Main.model;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class PhoneverificationService { //전화번호 인증 서비스

    final DefaultMessageService messageService;

    @Value("${coolsms.apiKey}")
    String api_key;

    @Value("${coolsms.apiSecret}")
    String api_secret;

    // 생성자에서 메시지 서비스 초기화
    public PhoneverificationService() {
        // 메시지 서비스를 초기화합니다.
        this.messageService = NurigoApp.INSTANCE.initialize(api_key, api_secret, "https://api.coolsms.co.kr");
    }

    public Map<String, Object> sendMessage(String phone) {
        Map<String, Object> responseMap = new HashMap<>(); // 응답 데이터를 저장할 Map 객체

        // 랜덤한 인증번호 생성
        Random r = new Random();
        int checkNum = r.nextInt(888888) + 111111;
        System.out.println("인증번호 : " + checkNum);

        // 발신번호 및 수신번호 설정
        Message message = new Message();
        message.setFrom("01025023964");
        message.setTo(phone);
        message.setText("인증번호 : " + checkNum + " 입니다.");

        // 인증번호를 포함한 메시지를 보내고 응답을 받습니다. 무료 횟수 소진으로 주석처리 하겠습니다. 되는건 확인함.
        //SingleMessageSentResponse messageResponse = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        //System.out.println(messageResponse);

        // 응답 데이터에 인증번호 추가
        responseMap.put("checkNum", checkNum);

        return responseMap;
    }

}
