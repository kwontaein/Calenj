import styled from "styled-components";
import {
    BackGroundColor,
    PointColor,
    PointColor2,
    TextColor,
    ThemeColor2,
    ThemeColor3
} from "../../../../shared/ui/SharedStyled";
import {number} from "yup";

export const Setting_Container = styled.div`
    background-color: ${ThemeColor2};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ProfileSetting_Container = styled.div`
    background-color: ${ThemeColor2};
    padding: 10px;
`

export const SettingName = styled.div`
    padding: 20px;
`

export const Profile_Container = styled.div`
    background-color: ${BackGroundColor};
    margin-inline: 20px;
    width: 600px;
    padding: 10px;
    border-radius: 10px;
`

export const Profile_Top = styled.div`
    width: calc(100% - 20px);
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Profile_Image = styled.div<{ $userId: string | null }>`
    width: 100px;
    height: 100px;
    border: 3px solid ${ThemeColor2};
    border-radius: 10px;
    background-color: black;
    background-image: ${props => props.$userId ? `url("/image/savedImage/${props.$userId.trim()}.jpeg")` : `url("/image/Logo.png")`};
    background-size: 100px 100px; /* 너비 100px, 높이 100px */
`


export const Top_Container = styled.div`
    display: flex;
    align-items: center;
`
export const Profile_Name_Container = styled.div`
    display: flex;
`

export const Profile_Nickname = styled.div`
    padding: 0 10px;
    font-size: 20px;
    display: flex;
`

export const Profile_Option = styled.div`
    font-size: 20px;
    display: flex;
`

export const Profile_Edit_Btn = styled.div`
    background-color: ${PointColor};
    padding-block: 5px;
    padding-inline: 10px;
    border-radius: 10px;
`

export const Profile_Content_Container = styled.div`
    margin: 10px;
    padding-block: 10px;
    width: calc(100% - 20px);
    background-color: ${ThemeColor3};
    border-radius: 10px;
`

export const Content_Value = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
`
export const Value = styled.div`

`
export const Profile_Content_Name = styled.div`
    color: ${TextColor}77;
    font-size: 12px;
`
export const Profile_Content_Value = styled.div`
    display: flex;
    align-items: center;
`
export const See_Value = styled.div`
    font-size: 12px;
    padding-inline: 10px;
    color: ${PointColor2};
`

export const Profile_Content_Edit = styled.div`
    background-color: ${ThemeColor2};
    padding-block: 5px;
    padding-inline: 10px;
    border-radius: 10px;

    &:hover {
        background-color: ${ThemeColor2}77;
    }
`

export const HR_Setting = styled.hr`
    margin: 20px;
    width: calc(100%);
`
export const Ect_Setting = styled.div`

    padding: 20px;
`
export const Password_Set_Btn = styled.div`
    background-color: ${PointColor};
    width: 100px;
    padding: 5px;
    margin: 5px;
    border-radius: 10px;
    font-size: 13px;
`