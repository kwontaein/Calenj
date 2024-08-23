import {
    FriendsNum_Container,
    Introduction_Container,
    NickName_Container,
    Profile_Container, Profile_UserUseName_Container,
    ProfileEditButton_div, ProfileText_Container,
    SubNavEmpty_div,
    SubNavProfile_Container,
    SubNavProfile_Content_Container,
    SubNavProfile_div, UserInfo_ModifyIcon_Container, UserUseName_Content
} from "./SubNavProfileStyled";
import {SubNavProfileBottom} from "./SubNavProfileBottom";
import {useEffect, useState} from "react";
import {
    FriendList,
    QUERY_GROUP_DETAIL_KEY,
    QUERY_USER_INFO_KEY,
    useFetchFriendList,
    UserInfo
} from "../../../../entities/reactQuery";
import {useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {saveUserName} from "../../../../entities/redux";

export const SubNavProfile: React.FC = () => {
    const userId = localStorage.getItem('userId') || ''
    const [userInfo, setUserInfo] = useState<UserInfo>()
    const friendListState = useFetchFriendList(userId);
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const userData: UserInfo | undefined = queryClient.getQueryData([QUERY_USER_INFO_KEY, userId]);

    //그룹 디테일 불러오기
    useEffect(() => {
        if (userData) {
            dispatch(saveUserName({userId:userData.userId, userName:userData.nickname}))
            setUserInfo(userData);
        }
    }, [userData]);

    return (
        <SubNavProfile_Container>
            <Profile_UserUseName_Container>
                <UserUseName_Content>
                    {userInfo?.userUsedName}
                </UserUseName_Content>
                <Link to="/userSetting">
                    <UserInfo_ModifyIcon_Container>
                        <i className="bi bi-gear-fill"></i>
                    </UserInfo_ModifyIcon_Container>
                </Link>
            </Profile_UserUseName_Container>
            <SubNavProfile_Content_Container>
                <Profile_Container>
                    <SubNavProfile_div $userId={userInfo?.userId || ''}/>
                    <SubNavEmpty_div>
                        <ProfileEditButton_div>
                            <i className="fi fi-sr-plus-small" style={{marginTop: '3px'}}></i>
                        </ProfileEditButton_div>
                    </SubNavEmpty_div>
                </Profile_Container>
                <ProfileText_Container>
                    <NickName_Container>
                        {userInfo?.nickname}
                    </NickName_Container>
                    <Introduction_Container>
                        {userInfo?.userIntroduce}
                    </Introduction_Container>
                    <FriendsNum_Container>
                        나의 친구 {friendListState.data && friendListState.data.length}
                    </FriendsNum_Container>

                </ProfileText_Container>
            </SubNavProfile_Content_Container>
            <SubNavProfileBottom/>
        </SubNavProfile_Container>
    )
}