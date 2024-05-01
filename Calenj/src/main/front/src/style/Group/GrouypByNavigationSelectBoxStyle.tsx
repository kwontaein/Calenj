import styled from 'styled-components';
import {TextColor} from "../FormStyle";

export const SelectItem_Container = styled.div`
    width: 204px;
    background-color: black;
    position: absolute;
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
        color:#007bff;
`


export const SelectorIcon_Container = styled.div`
    height: 100%;
    width: 15%;
    align-content: center;
    text-align: center;
        color:#007bff;
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
    transition: background-color 0.3s ease;
    transition: color 0.3s ease;
    &:hover{
        background-color: #007bff;
        font-weight: 0;
            ${SelectorIcon_Container}{
                    color:${TextColor};
            }
            ${SelectorText_Continer}{
                    color: ${TextColor};
            }
    }
`
