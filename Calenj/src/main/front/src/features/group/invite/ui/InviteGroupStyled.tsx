import styled from "styled-components";
import {PointColor, PointColor2, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const Login_Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Viewport height, 100% of the height of the viewport */
`
export const Ear_Container = styled.div`
    display: flex;
    margin-inline: 20px;
    justify-content: space-between;
`
export const Ear = styled.div`
    background-color: #01254C;
    border-inline: 2px solid white;
    width: 20px;
    height: 30px;
    box-shadow: 10px 0 #01254C;
`
export const Ear_Bottom_Container = styled.div`
    display: flex;
    justify-content: space-between;
`
export const Ear_Bottom = styled.div`
    background-color: #01254C;
    border-inline: 2px solid white;
    width: 20px;
    height: 20px;
    margin-bottom: 20px;
`

export const Login_div = styled.div`
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 7px 10px #0699CD;
`

export const Back_Div = styled.div`
    padding: 20px;
    padding-top: 0;
    border-radius: 10px;
    background-color: ${PointColor};
    box-shadow: #01254C 10px 10px;
`

export const Inner_div = styled.div`
    display: flex;
`
export const Eye_Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-inline: 40px;
    margin-bottom: 20px;
`
export const Eye = styled.div`
    background-color: #0D5A79;
    width: 20px;
    height: 20px;
    border-radius: 50%;
`

export const Tail_Div = styled.div`
    margin-left: 20px;
    width: 0;
    height: 0;
    border-bottom: 15px solid transparent;
    border-top: 15px solid ${PointColor};
    border-left: 15px solid ${PointColor};
    border-right: 15px solid transparent;
`
export const Inner_Wrapper_Div = styled.div`
`

export const Title_Div = styled.h3`
    color: black;
`
export const Content_Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 30px;
    margin-block: 40px;
`
export const Online_Cnt_Div = styled.div`
    color: black;
`

export const Member_Cnt_Div = styled.div`
    color: black;
`

export const Bottom_Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    padding-inline: 10px;
`
export const Accept_Div = styled.button`
    background-color: ${PointColor};
    margin: 5px;
`
export const Denied_Div = styled.button`
    background-color: ${PointColor2};
    color: black;
    margin: 5px;
`
