import styled from "styled-components";

export const EventView_Container = styled.div<{$allDay:boolean}>`
    width: 100%;
    height: ${props => props.$allDay ? "20px": "100%"};
    display: flex;
    flex-direction: row;
    ${props=>!props.$allDay && `
         &:hover{
        background-color: rgb(0,0,0, 0.3);
        }
    `}
   
`

export const EventView_Content = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    
`
export const EventView_Title = styled.div<{$color:string}>`
    color: ${props=>props.$color};
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 550;
    justify-content: space-between;
`
export const EventView_Time = styled.div<{$color:string}>`
    color: ${props=>props.$color};
    font-size: 10px;

`
export const EventView_TagColor = styled.div<{$color:string}>`
    width: 5px;
    height: 5px;
    background-color: ${props=>props.$color};
    border-radius: 50%;
`

export const EventView_DropDown_Container = styled.div<{$color:string}>`
    font-size:18px;
    color:${props=>props.$color};
    cursor:pointer;
    &:hover{
        color :${props=>props.$color}77;
    }
`