import styled, { keyframes, css  } from 'styled-components';
import {PointColor, TextColor, TextColor2, ThemeColor2, ThemeColor3} from "../../../../../../shared/ui/SharedStyled";


interface FilterClickProps{
    $isClick?:boolean,
    $toggleState?:boolean,
}


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


export const SubScreenFilter_Container = styled.div`
    width: calc(100% - 8px);//오른쪽 padding이 없으니 빼줘야함
    color: transparent;
    font-size: 0;
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
        background-color: ${ThemeColor2};
    }
`


/**checkBox*/
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

/**ToggleBox*/

const moveToggle = (toggle:boolean) => keyframes`
    from {

    }
    to{
         ${!toggle && `transform: translateX(-60%)`};
         ${toggle && `transform: translateX(60%)`};
    }
`;
export const FilterToggle_Container = styled.div<FilterClickProps>`
    font-size: 0;
    width: 20%;
    height: 18px;
    padding-inline: 1px;
    border:1px solid  ${props => props.$isClick ? TextColor2 : ThemeColor3};
    border-radius: 50px;
    display: flex;
    justify-content: center;
`
export const FilterToggleItem = styled.div<FilterClickProps>`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${props => props.$isClick ? PointColor : ThemeColor3};
    ${props => props.$toggleState!==undefined && css
    `animation : ${moveToggle(props.$toggleState)} 0.2s ease-out forwards;`
}
`