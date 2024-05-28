import styled from 'styled-components';
import { PointColor, TextColor} from "../FormStyle";

export const SelectItem_Container = styled.div`
    width: 196px;
    background-color: black;
    position: fixed;
    top: 71px;
    left: 82px; //SideNavigation width 72px + subNavigation padding: 10px
    padding: 8px;
    border-radius: 2px;
`
export const SelectorText_Continer = styled.div`
    height: 100%;
    width: 85%;
    align-content: center;
    margin-left: 5px;
    color:${PointColor};
`


export const SelectorIcon_Container = styled.div`
    height: 100%;
    width: 15%;
    align-content: center;
    text-align: center;
        color:${PointColor};
        margin-top: 2px;
`

export const Btn_ItemSelector = styled.div`
    background-color: transparent;
    height: 30px;
    width: 100%;
    font-weight: 550;
    font-size: 15px;
    letter-spacing: -1px;
    display: flex;
    flex-direction: row;
    border-radius: 2px;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover{
        background-color: ${PointColor};
        font-weight: 0;
            ${SelectorIcon_Container}{
                    color:${TextColor};
            }
            ${SelectorText_Continer}{
                    color: ${TextColor};
            }
    }
`
