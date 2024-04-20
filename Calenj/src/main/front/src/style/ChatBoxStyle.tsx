import styled from 'styled-components'


interface CheckbeforSender{
    $sameUser:boolean,
}

export const ScrollMinWidth =400;
export const ScrollMaxWidht = 500;
export const ScrollMinHeight=450;
export const ScrollMaxHeight=450;

/** 채팅창 Container-스크롤 박스 */
export const ScrollableDiv = styled.div`
    overflow-y: auto; /* 수직 스크롤을 활성화합니다. */
    max-height: ${ScrollMinHeight}px; /* 스크롤 가능한 div의 최대 높이 설정 */
    min-height: ${ScrollMaxHeight}px;
    min-width: ${ScrollMinWidth}px;
    max-width: ${ScrollMaxWidht}px;
    padding-left: 5px;
`;

/** 메시지 관련 styled */
export const MessageBoxContainer = styled.div<CheckbeforSender>`
    padding-top: ${props => (props.$sameUser ? '0px' : '12px')};
    padding-inline: 12px;
    padding-bottom:0px;
`
export const ProfileContainer = styled.div`
    width: 40px;
    height: 40px;
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
`


export const NickNameContainer = styled.div`
    font-weight: 550;
`

export const DateContainer = styled.div`
    color: #FFD369;
    font-size: 12px;
    margin-top: 2px;
`
export const MessageContentContainer = styled.div`
    max-width:${ScrollMinWidth-74}px;
`

/**메세지를 담는 컨테이너 1 */
export const MessageContainer = styled.div`
    margin-left: 10px;
    ${NickNameContainer}{
        padding:2px;
    }
    ${DateContainer}{
        padding:2px;
        margin-left:4px;
    }
    ${MessageContentContainer}{
        padding:2px;
    }

`
export const DateContainer2 = styled.div`
    color: transparent;
    font-size: 12px;
    margin-top: 2px;
    letter-spacing: -1px;
    width: 50px;
`
export const MessageContentContainer2 = styled.div`
    margin-left:6px;
    max-width:${ScrollMinWidth-74}px;
`
/** 메시지를 담는 컨테이너 2*/
export const MessageContainer2 = styled.div`
    display: flex;
    flex-direction: row;
    padding:2px;
    &:hover {
        ${DateContainer2} {
            color: gray;
        }
    }
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

