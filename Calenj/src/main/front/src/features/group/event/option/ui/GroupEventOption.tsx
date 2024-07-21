import {Option_Container, Option_Item, OptionIcon_Wrapper} from "../../../../../shared/ui/SharedStyled";

export const GroupEventOption :React.FC = () =>{
    return(
        <Option_Container>
            <Option_Item>
                <OptionIcon_Wrapper>
                    <i className="bi bi-plus-square"></i>
                </OptionIcon_Wrapper>
                생성하기
            </Option_Item>
            <Option_Item>
                <OptionIcon_Wrapper>
                    <i className="bi bi-pencil-square"></i>
                </OptionIcon_Wrapper>
                수정하기
            </Option_Item>
        </Option_Container>
    )
}