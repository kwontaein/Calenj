import {
    FriendsNum_Container,
    Introduction_Container,
    NickName_Container,
    Profile_Container,
    ProfileEditButton_div, ProfileText_Container,
    SubNavEmpty_div,
    SubNavProfile_Container,
    SubNavProfile_Content_Container,
    SubNavProfile_div
} from "./SubNavProfileStyled";
import {SubNavProfileBottom} from "./SubNavProfileBottom";
import {useEffect, useState} from "react";
import {QUERY_GROUP_DETAIL_KEY, QUERY_USER_INFO_KEY, UserInfo} from "../../../../entities/reactQuery";
import {useQueryClient} from "@tanstack/react-query";

export const SubNavProfile :React.FC = () =>{
    const userId =localStorage.getItem('userId');
    const queryClient = useQueryClient();
    const [userInfo, setUserInfo] = useState<UserInfo>()

    const userData:UserInfo |undefined = queryClient.getQueryData([QUERY_USER_INFO_KEY,userId]);
    //그룹 디테일 불러오기
    useEffect( () => {
        if(userData){
            setUserInfo(userData);
        }
    }, [userData]);

    return(
        <SubNavProfile_Container>
            <SubNavProfile_Content_Container>
                <Profile_Container>
                    <SubNavProfile_div/>
                    <SubNavEmpty_div>
                        <ProfileEditButton_div>
                            <i className="fi fi-sr-plus-small" style={{marginTop:'3px'}}></i>
                        </ProfileEditButton_div>
                    </SubNavEmpty_div>
                </Profile_Container>
                <ProfileText_Container>
                    <NickName_Container>
                        { userInfo?.nickname}
                    </NickName_Container>
                    <Introduction_Container>
                        {userInfo?.userIntroduce}
                    </Introduction_Container>
                    <FriendsNum_Container>
                        친구 50
                    </FriendsNum_Container>

                </ProfileText_Container>
            </SubNavProfile_Content_Container>
            <SubNavProfileBottom/>

        </SubNavProfile_Container>
    )
}