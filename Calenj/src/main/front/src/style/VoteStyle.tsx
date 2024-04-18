import styled from 'styled-components'

interface VoteProps {
    $isCreater: boolean;
    $ableClick: boolean;
}

interface VoteAble {
    $end: boolean
}

/**
 * 투표 상태에 따른 체인지 버튼
 */
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