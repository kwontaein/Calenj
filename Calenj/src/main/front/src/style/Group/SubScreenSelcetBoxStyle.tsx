import styled, { keyframes, css  } from 'styled-components';
import {BackGroundColor, PointColor, TextColor, TextColor2, ThemaColor2, ThemaColor3} from "../FormStyle";

interface OptionProps{
    $clickState?:string,
    $option: string,
    $filter?:boolean,
}
interface SubScreenProps{
    $showUserList: boolean
}

interface FilterClickProps{
    $isClick?:boolean,
    $toggleState?:boolean,
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
const moveToggle = (toggle:boolean) => keyframes`
    from {

    }
    to{
         ${!toggle && `transform: translateX(-60%)`};
         ${toggle && `transform: translateX(60%)`};
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

export const SubScreenSelecter_Container =styled.div<OptionProps & SubScreenProps>`
    width:${props=> props.$clickState ==="공지" ? "78px":"118px"};
    height: auto;
    display: flex;
    top: 90px;
    right: ${props=> props.$showUserList ? "215px" :"15px"};
    flex-direction: column;
    background-color: ${BackGroundColor};
    position: absolute;
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
    font-size: 0px;
    display: flex;
    align-items: center;
    animation : ${changeAnimationAfter('filter')} 0.2s linear 0.2s forwards;
`



export const SubScreenSerachItem_Input = styled.input`
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


export const SubScreenFilter_Container = styled.div`
    width: calc(100% - 8px);//오른쪽 padding이 없으니 빼줘야함
    color: transparent;
    font-size: 0px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    opacity: 0;
    animation : ${changeAnimationAfter('filter')} 0.2s linear 0.4s forwards;
`


export const FilterItem_Container = styled.div`
    width: 100%;
    height: 35px;
    font-size: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const FilterContent_Container = styled.div<FilterClickProps>`
    width: 80%;
    display: flex;
    align-items: center;
    border-radius: 10px;
    color: ${TextColor2}77;
    ${props=> props.$isClick && 
         `color: ${TextColor};`
    }
`
export const FilterToggle_Container = styled.div<FilterClickProps>`
    font-size: 0;
    width: 20%;
    height: 18px;
    padding-inline: 1px;
    border:1px solid  ${props => props.$isClick ? TextColor2 : ThemaColor3};
    border-radius: 50px;
    display: flex;
    justify-content: center;
`
export const FilterToggleItem = styled.div<FilterClickProps>`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${props => props.$isClick ? PointColor : ThemaColor3};
    ${props => props.$toggleState!==undefined && css
    `animation : ${moveToggle(props.$toggleState)} 0.2s ease-out forwards;`
    }
`

export const SubScreenFilterButton_Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: right;
`
export const SubScreenFilter_Btn = styled.button`
    width: 30%;
    height: 25px;
    border-radius: 5px;
    &:hover{
        background-color: ${ThemaColor2};
    }
`