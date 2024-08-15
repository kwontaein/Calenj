import {useFetchUserBanList} from "../../../../entities/reactQuery/model/queryModel";
import {
    Friend_Hr,
    Friend_NamePlace,
    Friend_ProfilePlace, Friend_TextPlace,
    FriendList_Container, FriendListIcon_Container,
    FriendListUL,
    FriendListView
} from "../../../../shared/ui/FriendListStyled";
import {FriendList} from "../../../../entities/reactQuery";
import {
    Option_Container,
    Option_Item,
    OptionIcon_Wrapper,
    ProfileContainer,
    RowFlexBox
} from "../../../../shared/ui/SharedStyled";
import {InfoBox} from "../../../../shared/ui/InfoBox";
import {useState} from "react";
import {useClickOutSideCheck} from "../../../../shared/model/useClickOutSideCheck";
import {friendDeleteOrBanApi} from "../api/friendDeleteOrBanApi";
import {cancelUserBanApi} from "../api/cancelUserBanApi";
import {AxiosError} from "axios";
import {jwtFilter} from "../../../../entities/authentication/jwt";
import {useConfirm} from "../../../../shared/model";

export const UserBanList :React.FC =()=>{
    const userId = localStorage.getItem('userId')||''
    const {data, isLoading,refetch} = useFetchUserBanList(userId)
    const [hoverText, setHoverText] = useState<string|null>(null)

    const cancelUserBan = (friendUserId:string, nickName:string)=>{
        const postApi = ()=>{
            cancelUserBanApi(friendUserId).then(()=>{
                window.alert(`${nickName}를 차단해제 하였습니다.`)
                refetch()
            }).catch((err)=>{
                const axiosError = err as AxiosError;
                console.log(axiosError);
                if (axiosError.response?.status) {
                    console.log(axiosError.response.status);
                    jwtFilter((axiosError.response.status).toString());
                }
            })
        }
        useConfirm(`${nickName}을 차단을 해제하시겠습니까?` , postApi,()=>{})

    }

    return(
        <FriendList_Container>
            {isLoading && <div>Loading...</div>}
            {data && (
                <FriendListUL>
                    {data.map((user: FriendList) => (
                        <div key={user.chattingRoomId}>
                            <FriendListView>
                                <Friend_ProfilePlace>
                                    <ProfileContainer $userId={user.friendUserId} style={{width:'30px', height:'30px', marginRight:'10px'}}/>
                                    <Friend_TextPlace>
                                        <Friend_NamePlace><b>{user.nickName}</b></Friend_NamePlace>
                                    </Friend_TextPlace>
                                </Friend_ProfilePlace>
                                <RowFlexBox>
                                    <FriendListIcon_Container
                                        onMouseEnter={() => setHoverText('dots')}
                                        onMouseLeave={() => setHoverText(null)} onClick={()=>cancelUserBan(user.friendUserId,user.nickName)}>
                                        {hoverText === 'dots' &&
                                            <InfoBox text={'차단 해제하기'} marginLeft={0} marginTop={-75} tailCenter={true}/>}
                                        <i className="bi bi-eraser-fill"></i>
                                    </FriendListIcon_Container>
                                </RowFlexBox>
                            </FriendListView>
                            <Friend_Hr/>
                        </div>
                    ))}
                </FriendListUL>
            )}
        </FriendList_Container>
    )
}