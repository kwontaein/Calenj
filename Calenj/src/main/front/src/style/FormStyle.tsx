import styled from 'styled-components'


interface UnfocusBackgroundProps {
    focus: string;
}

interface VoteProps {
    $isCreater: boolean;
    $ableClick: boolean;
}

interface VoteAble {
    $end: boolean
}

export const GlobalStyles = styled.div`
    background-color: #222831; /* 전체 페이지 배경색 */
    color: #EEEEEE; /* 전체 페이지 텍스트 색상 */
    /* 기타 전역 스타일 */
`;
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

//div 가로로 나열
export const RowFlexBox = styled.div`
    display: flex;
    flexdirection: row;
`


//item오른쪽으로 정렬
export const Right_flexBox = styled.div`
    margin-top: 10px;
    width: 205px;
    text-align: right;
`;

export const OveflowBlock = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 5px
`


export const ListView = styled.li`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 40px;
    margin-left: -40px;
    margin-top: -1px;
    padding-top: 10px;
    padding-bottom: 10px;

    &:hover {
        background-color: #393E46;
    }
`

export const MiniText = styled.div`
    color: gray;
    margin-top: 5px;
    font-size: 12px;
`

//isPick을 통해 투표 항목을 선택했는지 체크하고 ui변경
export const TrasformButton = styled.button<VoteProps>`

    width: ${props => props.$isCreater ? '43.5vw' : '88vw'};
    padding: ${props => props.$isCreater ? '1.2vw' : '15px'};
    margin-top: 2vw;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    ${props => props.$ableClick ?
            `cursor: pointer;
        hover:#ccc;
        transition : background-color 0.3s ease;
        &:hover{
            background-color: rgb(228, 227, 227);
        }`
            :
            `
    background-color : #fafafa;
    color :#d6d6d6;
    border: 1px solid rgb(219, 219, 219);
    `}

`;

//투표에서 활용되는 div로 투표가 만료되면 투명도를 저절
export const TransVoteContainer = styled.div<VoteAble>`
    margin-top: 20px;

    ${props => props.$end && `
        & > * {
            opacity: 0.7;
        }
    `}
`;


export const ScrollableDiv = styled.div`
    overflow-y: auto; /* 수직 스크롤을 활성화합니다. */
    max-height: 300px; /* 스크롤 가능한 div의 최대 높이 설정 */
    padding-left: 5px;
    margin-bottom: -5px
`;


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
//div 가로로 나열
export const INPUT_DIV = styled.div`
`

export const SEND_INPUT = styled.input`
    background-color: #393E46;
    color: #EEEEEE;
    border-radius: 10px;
    border: 1px solid #797979;
    width: 90%;
    height: 30px;
    margin: 0 5px 0 5px;
`
export const IMG_SIZE = styled.img`

    width: 32px;
    height: 32px;
    filter: invert(87%) sepia(53%) saturate(635%) hue-rotate(320deg) brightness(101%) contrast(101%);
`

export const SEND_BUTTON = styled.button`
    background-color: #222831;
    color: #EEEEEE;
    border-radius: 5px;
    border: 0;
    width: 34px;
    height: 34px;
    display: inline-block;
    padding: 1px;

    &:hover {
        background-color: #393E46;
    }
`

export const FORM_SENDMSG = styled.form`
    height: 34px;
    display: flex;
`
//채팅 endPoint선
export const HR_ChatEndPoint = styled.hr`
    line-height: 1em;
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    text-align: center;
    height: 1.5em;

    &:before {
        content: '';
        background: linear-gradient(to right, rgba(0, 0, 0, 0), #b24ad0, #802bc2);
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 2px;
    }

    &:after {
        content: attr(data-content);
        position: relative;
        display: inline-block;
        padding: 0 .3em;
        line-height: 1.5em;
        margin-left: 90vw;
        color: white;
        border-radius: 10px;
        font-size: 15px;
        font-weight: bold;
        font-family: sans-serif;
        background-color: #b24ad0;
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