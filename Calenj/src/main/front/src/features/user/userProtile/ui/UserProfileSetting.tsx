import {
    Profile_Container, Profile_Edit_Btn, Profile_Content_Container,
    Profile_Image, Profile_Name_Container, Profile_Nickname, Profile_Option,
    Profile_Top,
    ProfileSetting_Container, Content_Value, Value, See_Value,
    SettingName, Top_Container, Profile_Content_Name, Profile_Content_Value, Profile_Content_Edit
} from "./UserProfileSettingStyled";
import ProfileList from "./ProfileContent";

const profileData = [
    {name: '별명', value: '구록불'},
    {name: '사용자명', value: 'grock_bull'},
    {name: '이메일', value: 'kosq3964@naver.com'},
    {name: '전화번호', value: '01025023964'},
];


export const UserProfileSetting: React.FC = () => {
    return (
        <ProfileSetting_Container>
            <SettingName>내 계정</SettingName>
            <Profile_Container>
                <Profile_Top>
                    <Top_Container>
                        <Profile_Image $userId={"2c7f2d75-6dcd-4802-929d-174cb65dce22"}/>
                        <Profile_Name_Container>
                            <Profile_Nickname>닉네임</Profile_Nickname>
                            <Profile_Option>•••</Profile_Option>
                        </Profile_Name_Container>
                    </Top_Container>
                    <Profile_Edit_Btn>프로필편집</Profile_Edit_Btn>
                </Profile_Top>
                <Profile_Content_Container>
                    <ProfileList profileData={profileData}/>
                </Profile_Content_Container>
            </Profile_Container>
            <hr/>
        </ProfileSetting_Container>
    );
}