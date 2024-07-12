import {GroupEventOption_Container, GroupEventOption_Item} from "./GroupEventOptionStyled";

export const GroupEventOption :React.FC = () =>{
    return(
        <GroupEventOption_Container>
            <GroupEventOption_Item>
                일정 생성하기
            </GroupEventOption_Item>
            <GroupEventOption_Item>
                일정 관리하기
            </GroupEventOption_Item>
        </GroupEventOption_Container>
    )
}