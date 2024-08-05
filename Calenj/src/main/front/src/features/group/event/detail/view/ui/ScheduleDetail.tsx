import React, {useEffect, useReducer, useRef, useState} from "react";
import {
    MapIcon_Container,
    MemberMoreView_Text,
    Schedule_Button,
    ScheduleButton_Container,
    ScheduleDetail_Container, ScheduleDetailScroll_Wrapper, ScheduleDotsIcon_Container,
    ScheduleMap_Container,
    ScheduleMember_Container,
    ScheduleMember_Viewer_Container,
    ScheduleMemberItem_Container, ScheduleMemberName_Container,
    ScheduleMemberProfile_Container, SchedulePrivacy_Container,
    ScheduleStartDate_Container,
    ScheduleTop_Container, Trash_Body, Trash_Container, Trash_Top, TrashIconBottom, TrashIconTop
} from "./ScheduleDetailStyled";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";
import {useClickOutSideCheck} from "../../../../../../shared/model/useClickOutSideCheck";
import {
    GroupSchedule,
    useFetchGroupScheduleList,
    useFetchGroupSubScheduleList
} from "../../../../../../entities/reactQuery";
import {
    InputType_Radio,
    Option_Container,
    Option_Item,
    OptionIcon_Wrapper,
    Radio_Label, RowFlexBox, TextColor
} from "../../../../../../shared/ui/SharedStyled";
import {useGroupScheduleEdit} from "../model/useGroupScheduleEdit";
import {ko} from "date-fns/locale/ko";
import {EventDatePicker} from "../../../../../../shared/ui/CustomDatePickerStyled";
import {AHMFormatV3} from "../../../../../../shared/lib/dateFormat";
import {ScheduleDetailList} from "./ScheduleDetailList";
import {groupSubScheduleReducer} from "../../../../../../entities/group";
import {useListDrag} from "../model/useListDrag";
import {saveSubScheduleApi} from "../api/saveSubScheduleApi";


interface GroupScheduleProps {
    scheduleDetail: GroupSchedule,
}

export const ScheduleDetail: React.FC<GroupScheduleProps> = ({scheduleDetail}) => {
    const groupId = useSelector((state: RootState) => state.subNavigation.group_subNavState.param)
    const groupScheduleList = useFetchGroupScheduleList(groupId)

    const {scheduleId, mapModal} = useSelector((state: RootState) => state.groupSchedule)
    const {userNameRegister} = useSelector((state: RootState) => state.userNameRegister)

    const [optionState, setOptionState] = useReducer((prev) => !prev, false)
    const selectBox = useClickOutSideCheck(optionState, setOptionState)  // 스케줄 옵션관리
    const [showMember, setShowMember] = useReducer((prev) => !prev, false)
    const showMemberRef = useClickOutSideCheck(showMember, setShowMember) // 멤버 옵션관리

    const [month, setMonth] = useState<number>(new Date(scheduleDetail.startDate).getMonth())
    //수정관련
    const {
        editMode,
        setEditMode,
        groupSchedule,
        dispatchGroupSchedule,
        mapHandler
    } = useGroupScheduleEdit(scheduleDetail)


    const groupSubScheduleList = useFetchGroupSubScheduleList(scheduleId); //이 리스트로 넣으면 됨
    const [subScheduleEdit, dispatchSubSchedule] = useReducer(groupSubScheduleReducer, groupSubScheduleList.data || [])
    const useSubSchedule = useListDrag(subScheduleEdit, dispatchSubSchedule, groupSchedule.startDate)


    useEffect(() => {
        console.log(groupSubScheduleList.data)
    }, [groupSubScheduleList.data]);

    const saveGroupSchedule = () => {
        const postAble = subScheduleEdit.every((subSchedule) => subSchedule.subScheduleTitle !== "")
        if (postAble) {
            const postScheduleData = {
                ...scheduleDetail,
                ...groupSchedule,
                groupSubSchedules: subScheduleEdit
            }
            saveSubScheduleApi(postScheduleData)
                .then(() => {
                    window.alert('저장이 완료되었습니다')
                    groupScheduleList.refetch()
                    groupSubScheduleList.refetch()
                })
                .catch((err) => {
                    console.log('fxxk')
                })
        } else {
            window.alert('일정의 제목을 입력해주세요.')
        }
    }

    const mapElement = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10
        });
    })

    return (
        <ScheduleDetail_Container>
            <ScheduleDetailScroll_Wrapper $editMode={editMode}>
                <ScheduleStartDate_Container>
                    <div>
                        일정 시작 :
                        {editMode ?
                            <EventDatePicker
                                dateFormat={'yy년 MM월 dd일 (EEE) aa hh시 mm분'} // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                selected={groupSchedule.startDate}
                                showTimeSelect={true}
                                timeFormat={"HH:mm"}
                                timeIntervals={30}
                                onChange={(date: Date) => dispatchGroupSchedule({
                                    type: 'SET_START_DATE',
                                    payload: date
                                })}
                                locale={ko}
                                minDate={scheduleDetail.startDate} // minDate 이전 날짜 선택 불가
                                popperPlacement="right-start"
                                timeClassName={() => "date-picker-time"}
                                onMonthChange={(date: Date) => setMonth(date.getMonth())}
                                dayClassName={(d) =>
                                    (d.getDate() === groupSchedule.startDate.getDate() && d.getMonth() === groupSchedule.startDate.getMonth())
                                        ? 'custom-day selected-day'
                                        : d.getMonth() === month
                                            ? 'custom-day'
                                            : 'custom-day gray-day'
                                }
                                $width={230}
                                $height={20}
                                $fontSize={15}
                                $marginInline={0}
                            />
                            : ` ${AHMFormatV3(groupSchedule.startDate)}`}
                    </div>
                    <ScheduleDotsIcon_Container onClick={setOptionState} ref={selectBox}>
                        <i className="bi bi-three-dots"/>
                        {optionState &&
                            <Option_Container style={{marginLeft: '-90px'}}>
                                <Option_Item>
                                    <OptionIcon_Wrapper>
                                        <i className="bi bi-person-fill-gear"></i>
                                    </OptionIcon_Wrapper>
                                    인원관리
                                </Option_Item>
                                <Option_Item>
                                    <OptionIcon_Wrapper>
                                        <i className="bi bi-person-fill-exclamation"></i>
                                    </OptionIcon_Wrapper>
                                    권한관리
                                </Option_Item>
                                <Option_Item onClick={() => setEditMode()} $isClick={editMode}>
                                    <OptionIcon_Wrapper>
                                        <i className="bi bi-pencil-square"></i>
                                    </OptionIcon_Wrapper>
                                    {editMode ? "수정완료" : "수정하기"}
                                </Option_Item>
                                <Option_Item>
                                    <OptionIcon_Wrapper>
                                        <i className="bi bi-folder-x"></i>
                                    </OptionIcon_Wrapper>
                                    삭제하기
                                </Option_Item>
                            </Option_Container>
                        }
                    </ScheduleDotsIcon_Container>
                </ScheduleStartDate_Container>
                <SchedulePrivacy_Container>
                    <span>공개범위 : </span>
                    <span style={{marginLeft: '5px'}}>
                        {editMode ?
                            <RowFlexBox style={{marginLeft: '-5px'}}>
                                <Radio_Label>
                                    <InputType_Radio name='inputForm'
                                                     defaultChecked={!groupSchedule.privacy}
                                                     onChange={() => dispatchGroupSchedule({
                                                         type: 'SET_PRIVACY',
                                                         payload: false
                                                     })}/>
                                    <span style={{fontSize: '11px'}}>전체</span>
                                </Radio_Label>
                                <Radio_Label>
                                    <InputType_Radio name='inputForm'
                                                     defaultChecked={groupSchedule.privacy}
                                                     onChange={() => dispatchGroupSchedule({
                                                         type: 'SET_PRIVACY',
                                                         payload: true
                                                     })}/>
                                    <span style={{fontSize: '11px'}}>참가자</span>
                                </Radio_Label>
                            </RowFlexBox>
                            : groupSchedule.privacy ? "참여인원만" : "전체"}
                    </span>
                </SchedulePrivacy_Container>
                <ScheduleMember_Container>
                    <span>참가인원 : </span>
                    <span style={{marginLeft: '5px'}}>
                        {scheduleDetail.managers.map((userKey, index) => index < 2 ? (index !== 0 ? ", " : '') + userNameRegister[userKey].userName : '')}
                    </span>
                    {scheduleDetail.managers.length > 2 &&
                        <div>
                            <MemberMoreView_Text
                                onClick={setShowMember}>외 {scheduleDetail.managers.length - 2}명</MemberMoreView_Text>
                            {showMember &&
                                <ScheduleMember_Viewer_Container ref={showMemberRef}>
                                    {scheduleDetail.managers.map((userKey) => (
                                        <ScheduleMemberItem_Container key={userKey}>
                                            <ScheduleMemberProfile_Container $userId={userKey}/>
                                            <ScheduleMemberName_Container>
                                                {userNameRegister[userKey].userName}
                                            </ScheduleMemberName_Container>
                                        </ScheduleMemberItem_Container>
                                    ))}
                                </ScheduleMember_Viewer_Container>
                            }
                        </div>
                    }
                </ScheduleMember_Container>
                <ScheduleButton_Container>
                    <MapIcon_Container onClick={mapHandler}>
                        <div style={{fontSize: '13px', marginRight: '5px'}}>지도</div>
                        {mapModal ?
                            <i className="fi fi-br-angle-down" style={{marginTop: '3px'}}></i> :
                            <i className="fi fi-br-angle-right" style={{marginTop: '3px'}}></i>
                        }
                    </MapIcon_Container>

                </ScheduleButton_Container>
                {mapModal &&
                    <ScheduleMap_Container id="map" ref={mapElement}>
                        대충 지도
                    </ScheduleMap_Container>
                }
                <ScheduleDetailList useSubSchedule={useSubSchedule}
                                    editMode={editMode}
                                    subScheduleEdit={subScheduleEdit}
                                    dispatchSubSchedule={dispatchSubSchedule}
                                    startDate={new Date(groupSchedule.startDate)}/>
            </ScheduleDetailScroll_Wrapper>

            {editMode &&
                <ScheduleButton_Container style={{paddingTop: '5px', borderTop: `1px solid ${TextColor}77`}}>
                    <div>
                        <Schedule_Button onClick={useSubSchedule.addSubSchedule}>
                            세부일정 추가
                        </Schedule_Button>
                        <Schedule_Button onClick={saveGroupSchedule}>
                            저장하기
                        </Schedule_Button>
                    </div>
                    <Trash_Container onMouseEnter={useSubSchedule.deleteSubSchedule}>
                        <Trash_Top $isDrag={useSubSchedule.dragIndex.current === null}>
                            <TrashIconTop className="bi bi-trash-fill"></TrashIconTop>
                        </Trash_Top>
                        <Trash_Body>
                            <TrashIconBottom className="bi bi-trash-fill"></TrashIconBottom>
                        </Trash_Body>
                    </Trash_Container>
                </ScheduleButton_Container>
            }
        </ScheduleDetail_Container>
    )
}