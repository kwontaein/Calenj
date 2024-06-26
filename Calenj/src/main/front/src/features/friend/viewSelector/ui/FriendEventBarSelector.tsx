import {
    FriendEventBarSelect_Container, FriendSelectButton,
    FriendSelectButton_Container,
    FriendSelectTitle_Container, SignOfFriendAlarm
} from "./FriendEventBarSelectorStyled";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {updateViewState} from "../../../../entities/redux/model/slice/FriendViewSlice";
import {
    QUERY_FRIEND_LIST_KEY,
    QUERY_REQUEST_FRIEND_LIST, QUERY_RESPONSE_FRIEND_LIST,
    useFetchRequestFriendList, useFetchResponseFriendList
} from "../../../../entities/reactQuery";
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";

export const FriendEventBarSelector: React.FC = () => {
    const viewState = useSelector((state:RootState) => state.friendViewState.viewState);
    const dispatch = useDispatch();

    const responseFriendState = useFetchResponseFriendList();
    const requestFriendState = useFetchRequestFriendList();





    return (
        <FriendEventBarSelect_Container>
            <FriendSelectTitle_Container>친구</FriendSelectTitle_Container>
            <hr/>
            <FriendSelectButton_Container>
                <FriendSelectButton $isAble={viewState==='online'} onClick={()=> dispatch(updateViewState({viewState:'online'}))}>
                    온라인
                </FriendSelectButton>
                <FriendSelectButton $isAble={viewState==='all'} onClick={()=> dispatch(updateViewState({viewState:'all'}))}>
                    모두
                </FriendSelectButton>
                <FriendSelectButton $isAble={viewState==='response'} onClick={()=> dispatch(updateViewState({viewState:'response'}))}>
                    요청
                    {responseFriendState.data &&
                       ( responseFriendState.data.length >0 &&
                        <SignOfFriendAlarm>
                        </SignOfFriendAlarm>
                       )
                    }
                </FriendSelectButton>
                <FriendSelectButton $isAble={viewState==='request'} onClick={()=> dispatch(updateViewState({viewState:'request'}))}>
                    대기
                </FriendSelectButton>
            </FriendSelectButton_Container>
        </FriendEventBarSelect_Container>
    )
}