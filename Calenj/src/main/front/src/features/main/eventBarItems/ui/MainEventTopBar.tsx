import {CalendarController, CalendarFromSelector} from "../../calendar/controller";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {FriendEventBarSelector} from "../../friend/viewManager/ui/FriendEventBarSelector";
import {RequestFriendInput} from "../../friend/request/requestInput";
import {LeftEventBar_Container, MainEventTopBar_Container, RightEventBar_Container} from "./MainEventTopBarStyled";

export const MainEventTopBar: React.FC = () => {
    const {clickState, friendParam} = useSelector((state: RootState) => state.main_subNavState)

    return (
        <MainEventTopBar_Container>
            <LeftEventBar_Container>
                {clickState === 'friend' &&
                    <FriendEventBarSelector/>
                }
            </LeftEventBar_Container>
            <RightEventBar_Container>
                {clickState === 'calendar' &&
                    <>
                        <CalendarFromSelector/>
                        <CalendarController/>
                    </>
                }
                {clickState === 'friend' &&
                    <RequestFriendInput/>
                }
            </RightEventBar_Container>
        </MainEventTopBar_Container>
    )
}