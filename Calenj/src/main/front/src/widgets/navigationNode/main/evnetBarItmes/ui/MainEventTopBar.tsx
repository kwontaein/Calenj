import {CalendarController, CalendarFromSelector} from "../../../../../features/calendar/controller";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {RequestFriendInput} from "../../../../../features/friend/checkUserInput";
import {LeftEventBar_Container, MainEventTopBar_Container, RightEventBar_Container} from "./MainEventTopBarStyled";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {FriendEventBarSelector} from "../../../../../features/friend/eventBarItems";
import {FriendChatEventBar} from "../../../../../features/friend/eventBarItems/ui/FriendChatEventBar";

export const MainEventTopBar: React.FC = () => {
    const {clickState, friendParam} = useSelector((state: RootState) => state.subNavigation.main_subNavState)

    return (
        <MainEventTopBar_Container>
            <LeftEventBar_Container>
                {clickState === 'friend' &&
                    (friendParam==='' ?
                    <FriendEventBarSelector/>:
                    <FriendChatEventBar/>)
                }
            </LeftEventBar_Container>
            <RightEventBar_Container $coverAble={clickState==='friend'}>
                {clickState === 'calendar' &&
                    <>
                        <CalendarFromSelector/>
                        <CalendarController/>
                    </>
                }
                {clickState === 'friend' &&
                    friendParam==='' &&
                    <RequestFriendInput/>
                }
            </RightEventBar_Container>
        </MainEventTopBar_Container>
    )
}