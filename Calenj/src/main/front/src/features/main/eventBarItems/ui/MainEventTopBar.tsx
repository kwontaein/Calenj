import {CalendarController, CalendarFromSelector} from "../../calendar/controller";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {FriendEventBarSelect} from "../../friend/request/ui/FriendEventBarSelect";
import {FriendEventBarItems} from "../../friend/request/requestInput";

export const MainEventTopBar: React.FC = () => {
    const {clickState, friendParam} = useSelector((state: RootState) => state.main_subNavState)

    const MainEventTopBar_Container = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `
    const RightEventBar_Container = styled.div`
        display: flex;
        flex-direction: row;
    `
    const LeftEventBar_Container = styled.div`
        display: flex;
        flex-direction: row;
    `

    return (
        <MainEventTopBar_Container>
            <LeftEventBar_Container>
                {clickState === 'friend' &&
                    <FriendEventBarSelect></FriendEventBarSelect>
                }
            </LeftEventBar_Container>
            <RightEventBar_Container>
                {clickState==='calendar' &&
                    <>
                        <CalendarFromSelector/>
                        <CalendarController/>
                    </>
                }
                {clickState==='friend' &&
                    <FriendEventBarItems/>
                }
            </RightEventBar_Container>
        </MainEventTopBar_Container>
    )
}