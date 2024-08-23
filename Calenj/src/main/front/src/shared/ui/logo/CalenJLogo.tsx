import styled from "styled-components";
import {FullScreen_div, PointColor, RowFlexBox, TextColor, ThemeColor3} from "../SharedStyled";
import {useComponentSize} from "../../model";
import {HippoComponent} from "./HippoComponent";

export const C_Text = styled.div`
    width: 80px;
    border-block: 30px solid ${ThemeColor3};
    border-left: 30px solid ${ThemeColor3};
    height: 150px;
    box-sizing: border-box;
    margin-inline: 5px;
    border-radius: 2px;
`

export const A_Text = styled.div`
    width: 75px;
    border-inline: 30px solid ${ThemeColor3};
    border-top: 30px solid ${ThemeColor3};
    height: 150px;
    box-sizing: border-box;
    margin-inline: 2px;
    border-radius: 2px;
`
export const A_Piece = styled.div`
    height: 25%;
    border-bottom: 30px solid ${ThemeColor3};
`
export const L_Text = styled.div`
    width: 70px;
    border-left: 30px solid ${ThemeColor3};
    border-bottom: 30px solid ${ThemeColor3};
    height: 150px;
    box-sizing: border-box;
    margin-inline: 15px;
    transform: rotate(-10deg);
    margin-top: -5px;
`
export const E_Text = styled.div`
    width: 70px;
    height: 150px;
    border-left: 30px solid ${ThemeColor3};
    border-bottom: 30px solid ${ThemeColor3};
    box-sizing: border-box;
    margin-right: 2px;
    position: relative;
    z-index: 5;
`
export const E_Piece = styled.div`
    width: 100%;
    height: 70%;
    box-sizing: border-box;
    border-block: 25px solid ${ThemeColor3};
    border-right: 25px solid ${ThemeColor3};
`
export const E_Shadow = styled.div`
    width: 40px;
    height: 80px;
    margin-top: 70px;
    margin-right: -40px;
    box-shadow: -10px 0 7px rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 5;
`
export const N_Text = styled.div`
    width: 80px;
    height: 150px;
    border-top: 30px solid ${ThemeColor3};
    border-inline: 30px solid ${ThemeColor3};
    box-sizing: border-box;
    margin-inline: 10px;
`

export const J_Text = styled.div`
    width: 90px;
    height: 150px;
    border-top: 30px solid ${PointColor};
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    margin-inline: 4px;
    align-items: end;
    transform: rotate(80deg) translateZ(0);
    
`
export const J_Piece_Left = styled.div`
    height: 100%;
    width: 55%;
    box-sizing: border-box;
    border-right: 15px solid ${PointColor};
    border-bottom: 30px solid  ${PointColor};
    transform:  translateZ(0);
`
export const J_Piece_Left_Tail = styled.div`
    height: 50%;
    margin-left: -5px;
    width: 40px;
    background-color: ${PointColor};
    transform:  translateZ(0);

`

export const J_Piece_Right = styled.div`
    height: 100%;
    width: 45%;
    box-sizing: border-box;
    border-left: 15px solid ${PointColor};
    transform:  translateZ(0);
`

export const Text_Wrapper = styled.div`
    width: 100%;
    text-align: center;
    font-size: 15px;
    color: ${TextColor}77;
    margin-block: 10px;
`


export const CalenJLogo :React.FC<{text?:string}> = ({text})=>{

    return(
        <div style={{marginTop:'30px'}}>
            {text &&
                <Text_Wrapper>
                    {text}
                </Text_Wrapper>
            }
            <RowFlexBox style={{width:'auto', justifyContent:'center', marginTop:'10px'}}>
                <C_Text/>
                <A_Text>
                    <A_Piece/>
                </A_Text>
                <L_Text/>
                <E_Shadow/>
                <E_Text>
                    <E_Piece/>
                </E_Text>
                <N_Text/>
            </RowFlexBox>
            <HippoComponent/>
            <div style={{display:'flex', justifyContent:'center'}}>
                <J_Text>
                    <J_Piece_Left_Tail/>
                    <J_Piece_Left/>
                    <J_Piece_Right/>
                </J_Text>
            </div>
        </div>
    )
}