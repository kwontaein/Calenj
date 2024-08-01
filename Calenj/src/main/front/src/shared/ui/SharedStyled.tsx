import styled, {css, keyframes} from 'styled-components'
import {createGlobalStyle} from 'styled-components'


interface UnfocusBackgroundProps {
    focus: string;
}

interface ClickAbleProps {
    $isAble?: boolean;
}


/**
 * 테마 1
 * 세미블랙
 */
export const ThemeColor3 = "#2B2E33";//SubNav 222831
export const ThemeColor2 = "#373B42"; //채팅 및 EventNav 31363F
export const SubScreenColor = "rgb(51,55,62)" //subScreen
export const BackGroundColor = "#212227";
export const TextColor = "#EEEEEE";
export const PointColor = "#0070E8";
export const PointColor2 = "#FFD369"

/**
 * 테마 2
 * 하늘하늘
 */
// export const ThemeColor2 = "#d1fff8"; //채팅 및 EventNav 31363F
// export const SubScreenColor = "#BDCDD6" //subScreen
// export const ThemeColor3 = "#93BFCF";//SubNav 222831
// export const BackGroundColor = "#6096B4";
// export const TextColor = "#2f2929";
// export const PointColor = "#f3d57f";
// export const PointColor2 = "#7a6802"

/**
 * 테마 3
 * 화이트
 */
// export const ThemeColor2 = "#fdfdfd"; //채팅 및 EventNav 31363F
// export const SubScreenColor = "#e9ebed" //subScreen
// export const ThemeColor3 = "#f0f1f3";//SubNav 222831
// export const BackGroundColor = "#e1e3e6";
// export const TextColor = "#2f2929";
// export const PointColor = "#8e929a";
// export const PointColor2 = "#e56752"


export const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

    body {
        background-color: ${BackGroundColor}; /* 전체 페이지 배경색 */
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
        user-select: none; /* Standard */
        font-family: "Noto Sans KR", sans-serif;


        ::-webkit-scrollbar-thumb {
            background: ${PointColor}; /* 스크롤바의 색상 */
            border-radius: 10px;
        }

        ::-webkit-scrollbar {
            width: 4px; /* 스크롤바의 너비 */
            height: 4px;
        }

        ::-webkit-scrollbar-track {
            background: ${ThemeColor3};
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
        background-color: ${ThemeColor2};
        cursor: pointer;
        color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
        padding: 5px;
        border-radius: 5px;

        &:hover {
            background-color: ${ThemeColor2}77;
        }
    }

    div {
        color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
        font-size: 15px;
    }

    option {
        background-color: ${ThemeColor3};
        border-radius: 2px;
    }

    select {
        border-radius: 2px;
        color: ${TextColor};
    }

    input {
        border: 2px solid ${ThemeColor2};
        outline: none;
        background-color: ${ThemeColor2};
        color: ${TextColor};
        font-family: "Noto Sans KR", sans-serif;

        &:focus {
            outline: none;
            border: 2px solid ${PointColor};
        }
    }

    textarea {
        font-family: "Noto Sans KR", sans-serif;
    }
`;

export const ProfileContainer = styled.div<{ $userId: string }>`
    width: 40px;
    height: 40px;
    min-width: 40px;
    padding: 3px;
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
    user-select: none;
    background-image: ${props => props.$userId ? `url("/image/savedImage/${props.$userId.trim()}.jpeg")` : `url("/image/Logo.png")`};
    background-size: cover;
`

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
    border: 2px solid ${ThemeColor3};
    background-color: ${ThemeColor2};
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
    color: ${TextColor}77;
    margin-top: 5px;
    font-size: 12px;
    align-items: center;
`
//div 가로로 나열
export const RowFlexBox = styled.div`
    display: flex;
    flex-direction: row;
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
    background-color: ${ThemeColor2};
    margin-top: -6px;
    position: relative;
    z-index: 0;
`

export const InfoContent = styled.div`
    width: auto;
    padding: 5px;
    font-size: 12px;
    background-color: ${ThemeColor2};
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


export const UserListView = styled.li<{ $isOnline: boolean | undefined }>`

    opacity: ${({$isOnline}) => $isOnline ? 1 : 0.5};
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: -1px;
    padding: 10px;
    align-items: center;
    display: flex;
    flex-direction: row;

    &:hover {
        background-color: ${ThemeColor3};
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
        background-color: ${ThemeColor2};
    }
`


export const SignState_Button = styled.button`
    height: 100%;
    width: 50px;
    font-size: 10px;
`;


export const Modal_Background = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.3);`

export const Modal_Container = styled.div`
    background-color: ${ThemeColor3};
    width: 440px; //500, 570
    height: 500px;
    border-radius: 5px;
`

export const ModalTopBar_Container = styled.div`
    background-color: ${BackGroundColor};
    width: calc(100% - 30px);
    height: 15px;
    padding: 15px;
    font-size: 16px;
    border-radius: 5px 5px 0 0;
`

export const ModalContent_Container = styled.div`
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

interface ToggleProps {
    $isClick?: boolean,
    $toggleState?: boolean,
}

export const Toggle_Container = styled.div<ToggleProps>`
    font-size: 0;
    width: 20%;
    height: 18px;
    padding-inline: 1px;
    background-color: ${props => props.$isClick ? PointColor : ThemeColor2};
    border: 1px solid ${TextColor}77;
    border-radius: 50px;
    display: flex;
    justify-content: center;`
export const Toggle_Item = styled.div<ToggleProps>`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${props => props.$isClick ? PointColor : ThemeColor3};
    ${props => props.$toggleState !== undefined && css
            `animation: ${moveToggle(props.$toggleState)} 0.2s ease-out forwards;`
    }
`
/**ToggleBox*/

const moveToggle = (toggle: boolean) => keyframes`
    from {

    }
    to {
        ${!toggle && `transform: translateX(-60%)`};
        ${toggle && `transform: translateX(60%)`};
    }
`;


/** Option*/
export const Option_Container = styled.div`
    width: 110px;
    height: auto;
    background-color: ${ThemeColor3};
    position: absolute;
    margin-left: -80px;
    border-radius: 4px;
    z-index: 2;
`


export const OptionIcon_Wrapper = styled.div`
    width: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    margin-inline: 5px;
    color: inherit;
`

export const Option_Item = styled.div<{$isClick?:boolean}>`
    width: calc(100% - 18px);
    height: 15px;
    margin: 4px;
    padding: 10px;
    padding-inline: 5px;
    font-size: 12px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    color: ${props=>props.$isClick ? PointColor2 :TextColor};
    transition: background-color 0.5s ease;
    &:hover {
        background-color: ${BackGroundColor};
        color: ${PointColor2};
        
    }
`

/**radio*/
export const Radio_Label = styled.label`
    margin-right: 5px;
    display: flex;
    align-items: center;
`

export const InputType_Radio = styled.input.attrs({type: 'radio'})`
    appearance: none; /* 기본 브라우저 스타일 제거 */
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid ${ThemeColor3};
    background-color: ${ThemeColor2};
    margin-right: 5px;
    /* 체크됐을 때의 색상 */
    transition: background-color 0.3s ease;

    &:checked {
        background-color: ${PointColor}; /* 체크됐을 때의 배경색 */
        border-color: ${TextColor}; /* 체크됐을 때의 테두리 색 */
    }

    &:focus {
        box-shadow: none;
    }
`