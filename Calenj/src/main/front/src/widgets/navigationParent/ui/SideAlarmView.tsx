import {useEffect} from "react";
import {RootState, saveFriendIdByChatRoomId, saveUserName, updateNavigation} from "../../../entities/redux";
import {useDispatch, useSelector} from "react-redux";
import {useFetchFriendList} from "../../../entities/reactQuery";
import styled, {keyframes} from "styled-components";
import {PointColor, ThemeColor3} from "../../../shared/ui/SharedStyled";
import {FriendSideAlarmList} from "../../../features/friend/sideAlarmList/ui/FriendSideAlarmList";
import {GroupSideAlarmItem} from "../../../features/group/sideAlarmList";


const GroupListContent_Container_marginInline = 22;
/** 흔드는 애니메이션 */
const shakeAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    33% {
        transform: rotate(5deg);
    }
    66% {
        transform: rotate(-5deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;
/**캘린제이 아이콘 */
const Btn_CalenJ_Icon = styled.button<{ $isClick:boolean }>`
    appearance: none;
    list-style: none;
    background-color: ${props => props.$isClick ? PointColor : ThemeColor3};
    height: 50px;
    width: 50px;
    border: 0;
    border-radius: ${props => props.$isClick ? "15px" : "50%"};
    overflow: hidden;
    margin-block: 8px;
    background-image: url("/image/calenj_logo.png");
    background-size: 35px;
    background-position: center;
    background-repeat: no-repeat;

    transition: background-color 0.3s ease, border-radius 0.3s ease;

    &:hover {
        background-color: ${PointColor};
        border-radius: 15px;
        animation: ${shakeAnimation} 0.3s ease-out 1s forwards;
    }
`
const SideAlarmList_Container = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: row;
`
/** 그룹 리스트의 내용을 담는 컨테이너 */
const SideAlarmList_Wrapper = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    height: 100%; /* 스크롤 가능한 div의 최대 높이 설정 */
    text-align: center;
    padding-inline: ${GroupListContent_Container_marginInline / 2}px;
    overflow-y: auto; /* 수직 스크롤을 활성화합니다. */
`
const List_HR = styled.div`
    outline: 0;
    border: 0;
    border-radius: 50px;
    background: ${ThemeColor3};
    height: .2em;
    width: 30px;
    margin-block: 10px;
    margin-inline: 10px;
`

export const SideAlarmView: React.FC = () => {
    const dispatch = useDispatch()
    const userId = localStorage.getItem('userId') || ''
    const {data} = useFetchFriendList(userId);
    const {navigate} = useSelector((state: RootState) => state.navigateInfo);
    const {main_subNavState} = useSelector((state:RootState)=> state.subNavigation)

    useEffect(() => {
        if(!data) return
        data.forEach((friend)=>{
            dispatch(saveUserName({userId:friend.friendUserId, userName: friend.nickName}))
            dispatch(saveFriendIdByChatRoomId({chatRoomId:friend.chattingRoomId, friendUserId:friend.friendUserId}))
        })
    }, [data]);

    return (
        <SideAlarmList_Container>
            <SideAlarmList_Wrapper>
                <Btn_CalenJ_Icon $isClick={navigate === "main"} onClick={() => {
                    dispatch(updateNavigation({navigate: 'main', navigateParam:main_subNavState.friendParam}))}}/>
                <FriendSideAlarmList/>
                <List_HR/>
                <GroupSideAlarmItem/>
            </SideAlarmList_Wrapper>
        </SideAlarmList_Container>
    )
}
