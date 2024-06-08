import styled from 'styled-components'
import {createGlobalStyle} from 'styled-components'


interface UnfocusBackgroundProps {
    focus: string;
}
interface ClickAbleProps{
    $isAble? :boolean;
}


/**
 * SubNavColor, button색
 * @param ThemaColor3
 */
export const ThemaColor3 = "#2B2E33";//SubNav 222831
/**EventNavColor
 *  @param ThemaColor2
 */
export const ThemaColor2 ="#373B42"; //채팅 및 EventNav 31363F

export const SubScreenColor = "rgb(51,55,62)" //subScreen

export const BackGroundColor = "#212227";

export const TextColor = "#EEEEEE";
export const TextColor2 ="#c2c2c2";
export const PointColor = "#0070E8";
export const PointColor2 ="#FFD369"

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${BackGroundColor}; /* 전체 페이지 배경색 */
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
        user-select: none; /* Standard */
        
        ::-webkit-scrollbar-thumb{
            background: ${PointColor}; /* 스크롤바의 색상 */
            border-radius: 10px;
        }
        ::-webkit-scrollbar {
            width: 4px;  /* 스크롤바의 너비 */
        }
        ::-webkit-scrollbar-track {
            background: ${ThemaColor3};
            margin-block: 5px;
            border-radius: 10px;
        }
    }


    ul {
        margin: 0;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    button {
        appearance: none;
        border: 0;
        background-color: ${ThemaColor2};
        cursor: pointer;
        color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
        padding:5px;
        border-radius: 5px;
        &:hover{
            background-color: ${ThemaColor2}77;
        }
    }

    div {
        color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
        font-size: 15px;
    }
    option{
        background-color: ${ThemaColor3};
    }
`;

export const CheckBox_Label = styled.label`
    margin-inline: 5px;
    height: 100%;
    display: flex;
    align-items: center;
`

export const CheckBoxStyle = styled.input`
    appearance: none; /* 기본 브라우저 스타일 제거 */
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid ${ThemaColor3};
    background-color: ${ThemaColor2};
    margin-right: 5px;
    /* 체크됐을 때의 색상 */
    &:checked {
        background-color: ${PointColor}; /* 체크됐을 때의 배경색 */
        border-color: ${TextColor}; /* 체크됐을 때의 테두리 색 */
        border: 2px solid ${TextColor}
    }
    &:focus {
        box-shadow: ${PointColor}; /* 포커스 효과 */
    }
`


export const FullScreen_div = styled.div`
    width: 100%;
    height: 100%;
`
export const MiniText = styled.div`
    color: ${TextColor2}77;
    margin-top: 5px;
    font-size: 12px;
    align-items: center;
`
//div 가로로 나열
export const RowFlexBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const Info_Container = styled.div`
    width: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: fixed;;
`
export const InfoTail = styled.div`
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    background-color: ${ThemaColor2};
    margin-top: -6px;
    position: relative;
    z-index: 0;
`

export const InfoContent = styled.div`
    width: auto;
    padding: 5px;
    font-size: 12px;
    background-color: ${ThemaColor2};
    position: relative;
    z-index: 1;
    border-radius: 2px;
`



export const SignUpFormContainer = styled.div<UnfocusBackgroundProps>`
    position: relative;
    z-index: ${props => (props.focus === "true" ? -1 : 1)}
`;

export const UnfocusBackground = styled.div<UnfocusBackgroundProps>`
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



export const UserListView = styled.li`
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: -1px;
    padding: 10px;
    display: flex;
    align-items: center;

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

    &:hover {
        background-color: ${ThemaColor2};
    }
`





export const DEFAULT_HR = styled.hr`
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #41454b, ${ThemaColor3});
    height: .1em;
`


export const SignState_Button = styled.button`
    background-color: ${ThemaColor2}; /* 전체 페이지 배경색 */
    color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
    height: 30px;
    border-radius: 20px;
    border: 0;
`;




export const Modal_Background =styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
`

export const Modal_Container = styled.div`
    background-color: ${ThemaColor3};
    width: 440px; //500, 570
    height: 500px;
    border-radius: 5px;
`

export const ModalTopBar_Container = styled.div`
    background-color: ${BackGroundColor};
    width: calc(100% - 30px);
    height: 15px;
    padding : 15px;
    font-size: 16px;
    border-radius: 5px 5px 0 0;
`

export const ModalContent_Container =styled.div`
    width: calc(100% - 40px);
    height: calc(100% - 85px);
    padding: 20px;
    
`

export const Modal_Condition_Button = styled.button<ClickAbleProps>`
    width: 70px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    ${props => props.$isAble &&
            `background-color : ${PointColor};
             &:hover{background-color : ${PointColor}77;
             }
    `}
`