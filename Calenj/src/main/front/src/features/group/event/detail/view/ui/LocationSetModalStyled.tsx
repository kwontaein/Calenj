import styled from "styled-components";
import {
    BackGroundColor,
    PointColor,
    TextColor,
    ThemeColor2,
    ThemeColor3
} from "../../../../../../shared/ui/SharedStyled";

export const LocationSet_Container =styled.form<{$isPick:boolean}>`
    width: 400px;
    height: ${props=>props.$isPick ? '380px' :'500px'};
    border-radius: 4px;
    background-color: ${ThemeColor3};
    padding : 20px;
    box-sizing: border-box;
    transition: height ease 0.3s;
    
`
export const LocationSet_Title = styled.div`
    font-size: 20px;
    font-weight: 550;
    height: 30px;
`

export const LocationSearch_Input = styled.input.attrs({type:"text"})`
    width: 100%;
    height: 30px;
    border-radius: 4px;
    box-sizing: border-box;
    margin-block: 5px;
`

export const SearchKeyword_Container = styled.div`
    width: 360px;
    max-height: 240px;
    overflow-y: auto;
    background-color: ${ThemeColor2};
    position: absolute;
`

export const SearchKeyword_Item = styled.div`
    width: 100%;
    padding : 5px;
    height: 30px;
    box-sizing: border-box;
    &:hover{
        background-color: ${ThemeColor3}77;
    }
    
`

export const SearchResult_Container = styled.div`
    height: calc(100% - 110px);
    overflow-y: hidden;
    
`
export const SearchResult_Title = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`

export const SearchResultItem_Wrapper = styled.div`
    height: auto;
    margin : 5px;
    border-bottom: 1px solid ${TextColor}77;
    padding: 5px;
    &:hover{
        background-color: ${BackGroundColor}10;
    }
`

export const MapIcon_Container = styled.div`
    color: ${PointColor};
    margin-right: 10px;
    align-items: center;
    margin-top: -3px;
`
export const SearchResult_Category = styled.div`
    width: 100%;
    color: ${TextColor}77;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
    padding-left: 26px;
    box-sizing: border-box;
`

export const SearchEmpty_Container= styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: 12px;
    color: ${TextColor}77;
`

export const ReSearch_Button = styled.button`
    width: 100%;
    height: 30px;
    border-radius: 4px;
    box-sizing: border-box;
    margin-block: 5px;
    font-size: 12px;
`
export const LocateButton_Container = styled.div`
    width:100%;
    height:30px;
    display: flex;
    flex-direction: row;
    justify-content: right;
`

export const LocateResult_Title = styled.div`
    margin-top: 5px;
    font-size: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`