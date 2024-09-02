import styled from "styled-components";
import {PointColor, TextColor, ThemeColor2} from "../../../shared/ui/SharedStyled";

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

export const Item_Ex_Div = styled.div`
    display: flex;
    height: 24px;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    padding-inline: 5px;
    color: ${TextColor};
    text-align: center;
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

export const ID_Container = styled.div`
    display: flex;
    margin-block: 5px;
    align-items: center;
    background-color: ${ThemeColor2};
    padding: 5px;
`

export const ID_Input = styled.input`
    height: 25px;
    background-color: ${ThemeColor2};
    border: 2px solid ${ThemeColor2};
`
export const Password_Container = styled.div`
    display: flex;
    align-items: center;
    background-color: ${ThemeColor2};
    margin-block: 5px;
    padding: 5px;

`
export const Password_Input = styled.input`
    height: 25px;
    background-color: ${ThemeColor2};
    border: 2px solid ${ThemeColor2};
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
export const Button_Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`
export const SignUp_Btn = styled.div`
    text-decoration: underline;
    color: ${PointColor};
    font-size: 13px;
`