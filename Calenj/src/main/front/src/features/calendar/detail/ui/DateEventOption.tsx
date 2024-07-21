import {
    BackGroundColor,
    Option_Container,
    Option_Item,
    OptionIcon_Wrapper, ThemeColor2,
    ThemeColor3
} from "../../../../shared/ui/SharedStyled";

export const DateEventOption :React.FC = () =>{
    return(
        <Option_Container style={{marginTop:'30px', marginLeft:'-90px', backgroundColor:ThemeColor2}}>
            <Option_Item>
                <OptionIcon_Wrapper>
                    <i className="bi bi-trash3-fill"></i>
                </OptionIcon_Wrapper>
                삭제하기
            </Option_Item>
            <Option_Item>
                <OptionIcon_Wrapper>
                    <i className="bi bi-share-fill"></i>
                </OptionIcon_Wrapper>
                공유하기
            </Option_Item>
        </Option_Container>
    )
}