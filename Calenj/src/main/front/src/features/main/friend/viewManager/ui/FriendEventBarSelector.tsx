import {
    FriendEventBarSelect_Container, FriendSelectButton,
    FriendSelectButton_Container,
    FriendSelectTitle_Container
} from "./FriendEventBarSelectorStyled";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {updateViewState} from "../../../../../entities/redux/model/slice/FriendViewSlice";

export const FriendEventBarSelector: React.FC = () => {
    const viewState = useSelector((state:RootState) => state.friendViewState.viewState);
    const dispatch = useDispatch();


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
                <FriendSelectButton $isAble={viewState==='request'} onClick={()=> dispatch(updateViewState({viewState:'request'}))}>
                    요청
                </FriendSelectButton>
                <FriendSelectButton $isAble={viewState==='waiting'} onClick={()=> dispatch(updateViewState({viewState:'waiting'}))}>
                    대기
                </FriendSelectButton>
            </FriendSelectButton_Container>
        </FriendEventBarSelect_Container>
    )
}