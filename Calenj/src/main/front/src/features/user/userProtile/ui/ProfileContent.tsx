import React from 'react';
import {
    Profile_Container, Profile_Edit_Btn, Profile_Content_Container,
    Profile_Image, Profile_Name_Container, Profile_Nickname, Profile_Option,
    Profile_Top,
    ProfileSetting_Container, Content_Value, Value, See_Value,
    SettingName, Top_Container, Profile_Content_Name, Profile_Content_Value, Profile_Content_Edit
} from "./UserProfileSettingStyled";

interface ProfileContentProps {
    name: string;
    value: string;
}

interface ProfileListProps {
    profileData: ProfileContentProps[];
}

const ProfileContent: React.FC<ProfileContentProps> = ({name, value}) => {
    const defaultSeeValue = (name === '이메일' || name === '전화번호') ? '보이기' : undefined;

    return (
        <Content_Value>
            <Value>
                <Profile_Content_Name>{name}</Profile_Content_Name>
                <Profile_Content_Value>
                    {value}
                    {defaultSeeValue ? (
                        <See_Value>{defaultSeeValue}</See_Value>
                    ) : null}
                </Profile_Content_Value>
            </Value>
            <Profile_Content_Edit>수정</Profile_Content_Edit>
        </Content_Value>
    );
};

const ProfileList: React.FC<ProfileListProps> = ({profileData}) => (
    <div>
        {profileData.map((item, index) => (
            <ProfileContent key={index} name={item.name} value={item.value}/>
        ))}
    </div>
);

export default ProfileList;
