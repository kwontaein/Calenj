import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'


interface UnfocusBackgroundProps {
    focus: string;
}


/**
 * 전역적으로 설정할 스타일
 * 글자색:#EEEEEE
 * 배경 :31363F
 * 메인컬로 :
 * 서브컬러:#393E46
 * 기존 백그라운드 : #222831
 * hover컬로:#007bff
 *
 */
export const GlobalStyle = createGlobalStyle`
	body{
        background-color: #222831; /* 전체 페이지 배경색 */
        margin :0;
        padding: 0;
        height: 100%;
    }
    ul{
        margin:0;
    }
    il{
        list-style: none;
    }
    
    a{
        text-decoration: none;
    }
    
    button{
        appearance: none;
        border:0;
        background-color: #393E46;
        cursor:pointer;
        color: #EEEEEE; /* 전체 페이지 텍스트 색상 */
    }
    
    div{
        color: #EEEEEE; /* 전체 페이지 텍스트 색상 */
        font-size: 13px;
    }
`;


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
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 13px;
`

export const ListView = styled.li`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: -1px;
    padding-top: 10px;
    padding-bottom: 10px;

    &:hover {
        background-color: #393E46;
    }
`







/** 메시지 관련 styled */
export const MessageBoxContainer = styled.div`
    padding: 10px;
`
export const ProfileContainer = styled.div`
    width: 35px;
    height: 35px;
    padding: 5px;
    border-radius: 50px;
    background-color: #007bff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    font-size: 20px;
    color: white;
    font-weight: 550;
`
export const MessageContainer = styled.div`
    margin-left: 10px;
`
export const NickNameContainer = styled.div`
    font-weight: 550;
`

export const DateContainer = styled.div`
    margin-left: 10px;
    color: #FFD369;
    margin-top: 5px;
    font-size: 12px;
    margin-top: 2px;
`
export const DateContainer2 = styled.div`
    color: transparent;
    margin-top: 5px;
    font-size: 12px;
    margin-top: 2px;
    letter-spacing: -1px;
    width: 55px;
`

export const MessageContainer2 = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: -18px;

    &:hover {
        ${DateContainer2} {
            color: gray; 
        }
    }
`



export const DEFAULT_HR = styled.hr`
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #41454b, #393E46);
    height: .1em;
`

export const SIGN_STATE_FORM = styled.div`
    background-color: #393E46; /* 전체 페이지 배경색 */
    color: #EEEEEE; /* 전체 페이지 텍스트 색상 */
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;
export const SIGN_STATE_BUTTON = styled.button`
    background-color: #31363F; /* 전체 페이지 배경색 */
    color: #EEEEEE; /* 전체 페이지 텍스트 색상 */
    height: 30px;
    border-radius: 20px;
    border: 0;
`;
export const SIGN_STATE_TEXT = styled.span`
    color: #EEEEEE; /* 전체 페이지 텍스트 색상 */
    height: 30px;
    border-radius: 20px;
    border: 0;
    display: flex;
    align-items: center;
`;

export const DIV_FULL_HEIGHT = styled.div`
    height: 100%;
`