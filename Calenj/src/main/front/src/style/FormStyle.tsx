import styled from 'styled-components'
import {createGlobalStyle} from 'styled-components'


interface UnfocusBackgroundProps {
    focus: string;
}


/**
 * 전역적으로 설정할 스타일
 * 글자색:#EEEEEE
 * 배경 :31363F
 * 메인컬러 :
 * 서브컬러:#393E46
 * 기존 백그라운드 : #222831
 * hover컬로:#007bff
 *
 */

export const ThemaColor3 = "#31363F";
export const ThemaColor3_hover =  "#4d555e";
export const ThemaColor2 ="#393E46";
export const BackGroundColor = "#222831";
export const TextColor = "#EEEEEE";

export const PointColor = "#007bff";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #222831; /* 전체 페이지 배경색 */
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
        user-select: none; /* Standard */
        
        ::-webkit-scrollbar-thumb{
            background: #217af4; /* 스크롤바의 색상 */
            border-radius: 10px;
        }
        ::-webkit-scrollbar {
            width: 4px;  /* 스크롤바의 너비 */
        }
        ::-webkit-scrollbar-track {
            background: rgba(33, 122, 244, .1);  /*스크롤바 뒷 배경 색상*/
        }
    }


    ul {
        margin: 0;
    }

    il {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    button {
        appearance: none;
        border: 0;
        background-color: ${ThemaColor3};
        cursor: pointer;
        color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
    }

    div {
        color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
        font-size: 15px;
    }
`;


export const FullScreen_div = styled.div`
    width: 100%;
    height: 100%;
`
export const MiniText = styled.div`
    color: gray;
    margin-top: 5px;
    font-size: 12px;
`
//div 가로로 나열
export const RowFlexBox = styled.div`
    display: flex;
    flexdirection: row;
`


export const SignUpFormContainer = styled.div<UnfocusBackgroundProps>`
    position: relative;
    z-index: ${props => (props.focus === "true" ? -1 : 1)}
`;

export const UnfocusBackgound = styled.div<UnfocusBackgroundProps>`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${props => props.focus === "true" ? 'black' : 'transparent'};
    opacity: ${props => props.focus === "true" ? '60%' : '100%'};
`

export const Li = styled.li`
    border-radius: 5px;
    border: 1px solid #ccc;
    margin: 5px;
`

export const Input = styled.input`
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 450px;
`;

export const Mini_Input = styled.input`
    witdh: 100px;
    height: 20px;
    margin: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const Mini_Textarea = styled.textarea`
    width: 200px;
    height: 200px;
    padding-top: 5px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
`


export const Button = styled.button`
    padding: 10px 20px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    background-color: skyblue;
    color: white;
    cursor: pointer;
    width: 470px;
`;

//에러메시지
export const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 10px;
`;


export const FormLable = styled.label`
    font-size: 12px;
    font-weight: 550;
    margin-left: 5px;
`;


export const OveflowBlock = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 5px
`
export const GROUP_USER_LIST = styled.ul`
    width: 110px;
    padding: 0;
    margin: 0;
    font-size: 13px;
`

export const UserListView = styled.li`
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: -1px;
    padding: 10px;
    padding-bottom: 10px;

    &:hover {
        background-color: ${ThemaColor3};
    }
`

export const ListView = styled.li`
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: -1px;
    padding: 10px;
    padding-bottom: 10px;

    &:hover {
        background-color: ${ThemaColor2};
    }
`

export const Modal_Background =styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3)
`



export const DEFAULT_HR = styled.hr`
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #41454b, ${ThemaColor3});
    height: .1em;
`

export const SIGN_STATE_FORM = styled.div`
    background-color: ${ThemaColor3};
    color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;
export const SIGN_STATE_BUTTON = styled.button`
    background-color: ${ThemaColor2}; /* 전체 페이지 배경색 */
    color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
    height: 30px;
    border-radius: 20px;
    border: 0;
`;
export const SIGN_STATE_TEXT = styled.span`
    color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
    height: 30px;
    border-radius: 20px;
    border: 0;
    display: flex;
    align-items: center;
`;

export const DIV_FULL_HEIGHT = styled.div`
    height: 100%;
`