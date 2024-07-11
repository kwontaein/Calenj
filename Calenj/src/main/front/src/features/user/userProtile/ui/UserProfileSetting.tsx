import {
    Profile_Container, Profile_Edit_Btn, Profile_Content_Container,
    Profile_Image, Profile_Name_Container, Profile_Nickname, Profile_Option,
    Profile_Top,
    ProfileSetting_Container, Setting_Container,
    SettingName, Top_Container, HR_Setting, Ect_Setting, Password_Set_Btn,
} from "./UserProfileSettingStyled";
import ProfileList from "./ProfileContent";
import {QUERY_USER_INFO_KEY, UserInfo} from "../../../../entities/reactQuery";
import {useQueryClient} from "@tanstack/react-query";


export const UserProfileSetting: React.FC = () => {

    const queryClient = useQueryClient();
    const userId = localStorage.getItem('userId')
    const userData: UserInfo | undefined = queryClient.getQueryData([QUERY_USER_INFO_KEY, userId]);

    const profileData = [
        {name: '별명', value: userData?.nickname},
        {name: '사용자명', value: userData?.userUsedName},
        {name: '이메일', value: userData?.userEmail},
        {name: '전화번호', value: '01025023964'},
    ];

    return (
        <Setting_Container>
            <ProfileSetting_Container>
                <SettingName>내 계정</SettingName>
                <Profile_Container>
                    <Profile_Top>
                        <Top_Container>
                            <Profile_Image $userId={userId}/>
                            <Profile_Name_Container>
                                <Profile_Nickname>{userData?.nickname}</Profile_Nickname>
                                <Profile_Option>•••</Profile_Option>
                            </Profile_Name_Container>
                        </Top_Container>
                        <Profile_Edit_Btn>프로필편집</Profile_Edit_Btn>
                    </Profile_Top>
                    <Profile_Content_Container>
                        <ProfileList profileData={profileData}/>
                    </Profile_Content_Container>
                </Profile_Container>
                <SettingName>비밀번호 및 계정</SettingName>
                <Ect_Setting>
                    <Password_Set_Btn>비밀번호 변경하기</Password_Set_Btn>
                    <Password_Set_Btn>비밀번호 변경하기</Password_Set_Btn>
                </Ect_Setting>
            </ProfileSetting_Container>
        </Setting_Container>
    );
}