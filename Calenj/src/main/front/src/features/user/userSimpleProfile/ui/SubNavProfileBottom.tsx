import {
    Logout_Button,
    ProfileClickPointer_Container, ProfileIcon_Container,
    SubNavProfileTop_Container,
    SubNavProfileTop_Content,
    SubProfileTopMenu_Container
} from "./SubNavProfileBottomStyled";
import {useDispatch, useSelector} from "react-redux";
import {RootState, updateMainSubNavigation, updateNavigation} from "../../../../entities/redux";
import {LogoutButton} from "../../../authentication/logout";

export const SubNavProfileBottom :React.FC = () =>{
    const {clickState, friendParam} = useSelector((state:RootState)=> state.subNavigation.main_subNavState)
    const dispatch = useDispatch();
    const subNavHandler = (target:string)=>{
        dispatch(updateMainSubNavigation({clickState:target}));
    }

    return (
        <SubNavProfileTop_Container>
            <SubProfileTopMenu_Container>
                <ProfileClickPointer_Container $isClick={clickState==="calendar"}
                                               onClick={()=>subNavHandler('calendar')}
                                               style={{marginRight:'10px'}}>
                    <ProfileIcon_Container>
                        <i className="bi bi-calendar-week-fill"></i>
                    </ProfileIcon_Container>
                </ProfileClickPointer_Container>
                <ProfileClickPointer_Container $isClick={clickState==="friend"}
                                               onClick={()=>subNavHandler('friend')}>
                    <ProfileIcon_Container>
                        <i className="bi bi-people-fill"></i>
                    </ProfileIcon_Container>
                </ProfileClickPointer_Container>
            </SubProfileTopMenu_Container>
            <LogoutButton/>
        </SubNavProfileTop_Container>
    )
}