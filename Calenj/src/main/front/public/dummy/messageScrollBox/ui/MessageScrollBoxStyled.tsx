// import styled from 'styled-components'
// import {PointColor2,  ThemeColor2} from "../../../../src/shared/ui/SharedStyled";
//
// interface CheckBeforeSender {
//     $sameUser: boolean,
// }
//
// interface UserProfile{
//     $userId: string | undefined
// }
//
// export const ScrollMin_width = 350;
// export const ScrollMarginInline = 10;
// export const MessageSend_Container_height = 60;
//
//
// export const MessageScroll_Container = styled.div<{$inputSize:number}>`
//     width: 100%;
//     height: calc(100% - ${props=> props.$inputSize}px);
//
// `
// /** 채팅창 Container-스크롤 박스 */
// export const ScrollableDiv = styled.div`
//     overflow-y: auto; /* 수직 스크롤을 활성화. */
//     max-width: calc(100% - ${ScrollMarginInline}); //padding만큼 뺌
//     height: 100%;
//     margin-inline: ${ScrollMarginInline / 2}px;
// `;
//
//
// /** 메시지 관련 styled */
// export const MessageBoxContainer = styled.div<CheckBeforeSender>`
//     padding-top: ${props => (props.$sameUser ? '0px' : '12px')};
//     padding-inline: 12px;
//     padding-bottom: 0;
//     user-select: text;
// `
// export const ProfileContainer = styled.div<UserProfile>`
//     width: 40px;
//     height: 40px;
//     min-width: 40px;
//     padding: 3px;
//     border-radius: 50px;
//     background-color: #007bff;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     display: flex;
//     justify-content: center; /* 수평 가운데 정렬 */
//     align-items: center; /* 수직 가운데 정렬 */
//     font-size: 20px;
//     color: white;
//     font-weight: 550;
//     user-select: none;
//     background-image: ${props => props.$userId? `url("/image/savedImage/${props.$userId.trim()}.jpeg")` : `url("/image/Logo.png")`};
//     background-size: cover;
//
// `
//
//
// export const NickNameContainer = styled.div`
//     font-weight: 550;
// `
//
// export const DateContainer = styled.div`
//     color: ${PointColor2};
//     font-size: 12px;
//     margin-top: 2px;
// `
// export const MessageContentContainer = styled.div`
//     white-space: pre-wrap;
//     word-wrap: break-word;
// `
//
// /**메세지를 담는 컨테이너 1 */
// export const MessageContainer = styled.div`
//     margin-left: 10px;
//
//     ${NickNameContainer} {
//         padding: 2px;
//     }
//
//     ${DateContainer} {
//         padding: 2px;
//         margin-left: 4px;
//     }
//
//     ${MessageContentContainer} {
//         padding: 2px;
//     }
//
// `
// export const DateContainer2 = styled.div`
//     color: transparent;
//     font-size: 12px;
//     margin-top: 2px;
//     letter-spacing: -1.1px;
// `
// export const MessageContentContainer2 = styled.div`
//     margin-left: 10px;
//     word-wrap: break-word;
//     white-space: pre-wrap;
//     padding-inline: 2px;
//     width: calc(100% - 60px);
// `
// /** 메시지를 담는 컨테이너 2*/
// export const MessageContainer2 = styled.div`
//     display: flex;
//     flex-direction: row;
//     padding-block: 2px;
//     width: 100%;
//
//     &:hover {
//         ${DateContainer2} {
//             color: gray;
//         }
//     }
// `
//
// export const MessageGridView = styled.div`
//     display: grid;
//     height: fit-content;
//     grid-auto-flow: row;
//     grid-row-gap: .25rem;
//     grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
//     text-indent: 0;
//     min-height: 0;
//     min-width: 0;
//     padding-top: .125rem;
//     padding-bottom: .125rem;
//     position: relative;
// `
// export const ImageWrapper = styled.div`
//     position: relative;
//     max-height: inherit;
//     border-radius: 2px;
// `
// export const ImageContent = styled.div<{$image:string}>`
//     width: 100%;
//     height: 100%;
//     margin: 0;
//     padding: 0;
//     border: 0;
//     font-weight: inherit;
//     font-style: inherit;
//     font-family: inherit;
//     font-size: 100%;
//     vertical-align: baseline;
//     background-image: ${props => props.$image? `url("/image/savedImage/${props.$image.trim()}.jpeg")` : `url("/image/Logo.png")`};
//     background-size: cover;
// `
//
//
//
// //채팅 endPoint선
// export const HR_ChatEndPoint = styled.hr`
//     line-height: 1em;
//     position: relative;
//     outline: 0;
//     border: 0;
//     color: black;
//     text-align: center;
//     height: 1em;
//
//     &:before {
//         content: '';
//         background: ${PointColor2}77;
//         position: absolute;
//         left: 0;
//         top: 50%;
//         width: 100%;
//         height: 1px;
//     }
//
//     &:after {
//         content: attr(data-content);
//         position: relative;
//         display: inline-block;
//         padding: 0 .3em;
//         color: ${PointColor2};
//         border-radius: 10px;
//         font-size: 12px;
//         font-family: sans-serif;
//         background-color:${ThemeColor2};
//     }
// `
//
// export const HR_NewDate = styled.hr`
//     line-height: 1em;
//     position: relative;
//     outline: 0;
//     border: 0;
//     color: black;
//     text-align: center;
//     height: 1em;
//
//     &:before {
//         content: '';
//         background: ${TextColor2}77;
//         position: absolute;
//         left: 0;
//         top: 50%;
//         width: 100%;
//         height: 1px;
//     }
//
//     &:after {
//         content: attr(data-content);
//         position: relative;
//         display: inline-block;
//         padding: 0 .3em;
//         color: ${TextColor2};
//         border-radius: 10px;
//         font-size: 12px;
//         font-family: sans-serif;
//         background-color:${ThemeColor2};
//     }
// `
//
// export const WaitingBlock_Container = styled.div`
//
// `