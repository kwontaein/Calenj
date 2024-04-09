import styled from 'styled-components'


interface UnfocusBackgroundProps {
    focus: string;
}
interface VoteProps{
    $isCreater :boolean;
    $ableClick : boolean;
}
interface VoteAble{
    $end:boolean
}



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
    border: 0.5px solid #ccc;
    padding-left: 40px;
    margin-left: -40px;
    margin-top: -1px;
    padding-top: 10px;
    padding-bottom: 10px;
`

export const MiniText = styled.div`
    color: gray;
    margin-top: 5px;
    font-size: 12px;
`

//isPick을 통해 항목을 선택했는지 체크
export const TrasformButton = styled.button<VoteProps>`
    
    width: ${props=>props.$isCreater? '43.5vw': '88vw'};
    padding: ${props=>props.$isCreater ? '1.2vw': '15px'};
    margin-top:2vw;
    font-size:15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    ${props=>props.$ableClick?
        `cursor: pointer;
        hover:#ccc;
        transition : background-color 0.3s ease;
        &:hover{
            background-color: rgb(228, 227, 227);
        }`
    :
    `
    background-color :  #fafafa;
    color :#d6d6d6;
    border: 1px solid rgb(219, 219, 219);
    `}
   
`;

export const TransVoteContainer = styled.div<VoteAble>`
    margin-top: 20px;
    
    ${props => props.$end && `
        & > * {
            opacity: 0.7;
        }
    `}
`;

