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
import {SubNavProfileTop} from "./SubNavProfileTop";

export const SubNavProfile :React.FC = () =>{
    return(
        <SubNavProfile_Container>
            <SubNavProfileTop/>
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
                        구록불
                    </NickName_Container>
                    <Introduction_Container>
                        안녕하세요 저는 캘린제이 백엔드 개발자 권태인입니다.
                    </Introduction_Container>
                    <FriendsNum_Container>
                        친구 50
                    </FriendsNum_Container>

                </ProfileText_Container>
            </SubNavProfile_Content_Container>
        </SubNavProfile_Container>
    )
}