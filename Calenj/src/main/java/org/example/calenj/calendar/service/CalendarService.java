package org.example.calenj.calendar.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.calendar.domain.StampEntity;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.calendar.dto.request.ScheduleRequest;
import org.example.calenj.calendar.dto.request.StampRequest;
import org.example.calenj.calendar.dto.response.StampResponse;
import org.example.calenj.calendar.repository.StampRepository;
import org.example.calenj.calendar.repository.UserScheduleRepository;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final StampRepository stampRepository;
    private final UserScheduleRepository userScheduleRepository;
    private final UserRepository userRepository;
    private final GlobalService globalService;


    public void saveStamp(StampRequest stampRequest) {

        UserEntity userEntity = userRepository.findByUserId(stampRequest.getUserId()).orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        StampEntity stampEntity = StampEntity.builder()
                .userId(userEntity)
                .content(stampRequest.getContent())
                .title(stampRequest.getTitle()).build();

        stampRepository.save(stampEntity);
    }

    public List<StampResponse> getStampList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        return stampRepository.findByUserID(UUID.fromString(userDetails.getUsername())).orElse(null);
    }

    @Transactional
    public void updateSchedule(ScheduleRequest scheduleRequest) {
        UserScheduleEntity userSchedule = userScheduleRepository.findById(scheduleRequest.getScheduleId()).orElseThrow(() -> new RuntimeException("오류"));
        //변경 감지를 통한 자동 업데이트
        userSchedule.updateScheduleDetails(scheduleRequest);
    }


    public void deleteSchedule(UUID scheduleID) {
        userScheduleRepository.deleteById(scheduleID);
    }

    public void saveSchedule(ScheduleRequest scheduleRequest) {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        UserEntity userEntity = userRepository.findByUserId(UUID.fromString(userDetails.getUsername())).orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        int delay = calculateDelay(scheduleRequest.getExtendedProps().getRepeatState().getRepeatNum(), scheduleRequest.getExtendedProps().getRepeatState().getRepeatOption());

        UserScheduleEntity userScheduleEntity = UserScheduleEntity.builder()
                .scheduleId(scheduleRequest.getScheduleId())
                .userId(userEntity)
                .scheduleStartDateTime(scheduleRequest.getStart())
                .scheduleEndDateTime(scheduleRequest.getEnd())
                .userScheduleTitle(scheduleRequest.getTitle())
                .userScheduleContent(scheduleRequest.getExtendedProps().getContent())
                .scheduleRepeat(scheduleRequest.getExtendedProps().getRepeatState().isRepeat())
                .scheduleRepeatPeriod(scheduleRequest.getExtendedProps().getRepeatState().getRepeatEnd())
                .scheduleRepeatDelay(delay).build();

        userScheduleRepository.save(userScheduleEntity);
    }

    public void getScheduleList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        userScheduleRepository.findListByUserId(UUID.fromString(userDetails.getUsername()));
    }


    public int calculateDelay(int repeatNum, String repeatOption) {
        int calculated = 0;
        switch (repeatOption) {
            case "day":
                calculated = repeatNum;
                break;
            case "week":
                calculated = repeatNum * 7;
                break;
            case "month":
                calculated = repeatNum * 31;
                break;
        }
        return calculated;
    }
}
