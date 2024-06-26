import styled from "styled-components";
import {
    PointColor,
    PointColor2,
    TextColor,
    TextColor2,
    ThemeColor2,
    ThemeColor3
} from "../../../../shared/ui/SharedStyled";
import exp from "node:constants";


export const ReceivedFriendList_Container = styled.div`
    width: calc(100% - 20px);
    border-radius: 5px;
    padding: 10px;
`
export const ReceivedFriendListUL = styled.ul`
    padding: 0;
`

export const ReceivedFriendListView = styled.li`
    padding: 10px;
    height: 45px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;

    &:hover {
        background-color: ${ThemeColor2};
    }
`
export const ReceivedFriend_ProfilePlace = styled.div`
    display: flex;
    align-items: center;
`
export const ReceivedFriend_ImagePlace = styled.div`
    width: 40px;
    height: 40px;
    margin: 0 10px 0 0;
    border-radius: 50%;
    border: 2px inherit ${ThemeColor3};
    background-color: white;
`
export const ReceivedFriend_TextPlace = styled.div`
    width: auto;

`
export const ReceivedFriend_NamePlace = styled.div`
    width: auto;
    font-size: 15px;
`

export const ReceivedFriend_DatePlace = styled.div`
    width: auto;
    font-size: 13px;
    color: ${PointColor2};

`

export const ReceivedFriend_ResponseBtn = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${ThemeColor3};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    font-size: 15px;
`

export const ReceivedFriend_Hr = styled.hr`
    background-color: ${TextColor2}77;
    border: 0;
    height: 1px;
`