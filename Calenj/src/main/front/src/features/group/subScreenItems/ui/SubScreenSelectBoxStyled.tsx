import styled, {css, keyframes} from "styled-components";
import {
    BackGroundColor,
    PointColor,
    TextColor,
    TextColor2,
    ThemaColor2,
    ThemaColor3
} from "../../../../shared/ui/SharedStyled";

interface OptionProps{
    $clickState?:string,
    $option: string,
    $filter?:boolean,
}
interface SubScreenProps{
    $showUserList: boolean
}

// props에 따라 width와 height을 변경하는 애니메이션 정의
const changeSizeAnimation = (option:string) => keyframes`
    from {
    }

    to {
        width : 200px;
        ${option === 'filter' && `border-radius: 5px`};
    }
`;

const moveAnimation = (option:string) => keyframes`
    from {
        transform: translateX(0);
    }
    to{
         ${option ==='filter' && `transform: translateX(335%)`};
         ${option ==='search' && `transform: translateX(520%)`};
         background-color: transparent;
         color:${TextColor}
    }
`;

const changeAnimationAfter = (option:string) => keyframes`
    from{
        ${option ==="filter" && 'font-size: 14px'};
        ${option ==="search" && 'font-size: 13px'};
    }
    to{
        opacity: 1;
        ${option ==="filter" && 'font-size: 14px'};
        ${option ==="search" && 'font-size: 13px'};
        color: ${TextColor};
    }
`

export const SubScreenOption_Cotainer = styled.div<OptionProps>`
    display: flex;
    flex-direction: row;
`;


export const SubScreenIcon_Container=styled.div<OptionProps>`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: transparent solid;
    background-color: ${props => props.$filter ? PointColor :ThemaColor2};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    color:${TextColor2};
    font-size: 12px;
    
    ${props => props.$option ==="search" &&
    `opacity : 0.7;
                &:hover{
                    opacity : 1;
                }
            `};

    //옵션창에서 hover 시 
    ${props=> props.$option ==='' &&
    ` transition : background-color 0.3s ease;
         transition : border 0.3s ease;
         transition : color 0.3s ease;
        
        &:hover{
            border:3px solid ${PointColor};
            background-color: ${ThemaColor3};
            color: ${TextColor};
        }`
}
`



export const SubScreenSelector_Container =styled.div<OptionProps & SubScreenProps>`
    width:${props=> props.$clickState ==="공지" ? "78px":"118px"};
    height: auto;
    display: flex;
    top: 90px;
    right: ${props=> props.$showUserList ? "215px" :"15px"}; //GroupUserList의 크기만큼 더함
    flex-direction: column;
    background-color: ${BackGroundColor};
    position: fixed;
    padding-block: 8px;
    padding-left: 8px;
    border-radius: 30px;
    ${props => (props.$option === "filter"|| props.$option==="search") && css`
        animation: ${changeSizeAnimation(props.$option)} 0.2s ease-in 0.2s forwards;
    `}
    ${SubScreenIcon_Container}{
        ${props => (props.$option === "filter"|| props.$option==="search") && css`
        animation: ${moveAnimation(props.$option)} 0.2s ease-in 0.2s forwards;
        `}
    }
`



//각각의 아이콘 클릭 시 나타나는 요소
export const OptionStateText_Container = styled.div`
    color: transparent;
    font-size: 0;
    display: flex;
    align-items: center;
    animation : ${changeAnimationAfter('filter')} 0.2s linear 0.2s forwards;
`



export const SubScreenSearchItem_Input = styled.input`
    display: flex;
    position: absolute;
    top: 15px;
    width: 145px;
    border-radius: 30px;
    border: 0;
    padding-left: 10px;
    font-size: 0;
    background-color: transparent;
    color:${TextColor};
    &:focus{
        outline: none;
        border: 0;
    }
    animation : ${changeAnimationAfter('search')} 0.2s linear 0.2s forwards;
`
