import React, {useState} from 'react';
import {
    Profile_Container, Profile_Edit_Btn, Profile_Content_Container,
    Profile_Image, Profile_Name_Container, Profile_Nickname, Profile_Option,
    Profile_Top,
    ProfileSetting_Container, Content_Value, Value, See_Value,
    SettingName, Top_Container, Profile_Content_Name, Profile_Content_Value, Profile_Content_Edit
} from "./UserProfileSettingStyled";
import ProfileEditModal from './ProfileEditModal';

interface ProfileContentProps {
    name: string;
    value: string | undefined;
}

interface ProfileListProps {
    profileData: ProfileContentProps[];
}

const ProfileContent: React.FC<ProfileContentProps> = ({name, value}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = async (newValue: string) => {
        try {
            // API 호출
            await fetch('/api/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, value: newValue}),
            });
            // 저장 후 필요한 작업
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const maskedEmail = (email: string) => {
        const [localPart, domain] = email.split('@');
        const maskedLocalPart = '*'.repeat(localPart.length);
        return `${maskedLocalPart}@${domain}`;
    };

    const maskedPhoneNumber = (phoneNumber: string) => {
        return '*******' + phoneNumber.slice(-4);
    };

    const displayValue = isVisible
        ? value
        : name === '이메일'
            ? maskedEmail(value || '')
            : name === '전화번호'
                ? maskedPhoneNumber(value || '')
                : value;

    const defaultSeeValue = (name === '이메일' || name === '전화번호') ? '보이기' : undefined;

    return (
        <>
            <Content_Value>
                <Value>
                    <Profile_Content_Name>{name}</Profile_Content_Name>
                    <Profile_Content_Value>
                        {displayValue}
                        {defaultSeeValue ? (
                            <See_Value onClick={handleToggleVisibility}>
                                {isVisible ? '숨기기' : defaultSeeValue}
                            </See_Value>
                        ) : null}
                    </Profile_Content_Value>
                </Value>
                <Profile_Content_Edit onClick={handleEditClick}>수정</Profile_Content_Edit>
            </Content_Value>
            {isEditing && (
                <ProfileEditModal
                    name={name}
                    value={value}
                    onClose={() => setIsEditing(false)}
                    onSave={handleSave}
                />
            )}
        </>
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
