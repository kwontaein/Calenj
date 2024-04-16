import {ChangeEvent, useEffect, useState,useLayoutEffect, useId,useRef} from "react";
import {connect} from "react-redux";
import {DispatchStompProps, mapDispatchToStompProps, StompData, mapStateToStompProps} from '../../store/module/StompReducer'
import {RowFlexBox,ScrollableDiv,MessageBoxContainer,MessageContainer,MessageContainer2,ProfileContainer,DateContainer,DateContainer2,NickNameContainer} from '../../style/FormStyle'
import {endPointMap} from '../../store/module/StompMiddleware';
import {changeDateForm,AHMFormatV2,shortAHMFormat} from '../../stateFunc/actionFun'

interface groupDetailProps {
    target:string;
    param: string;
    updateEndpoint: () => void;
}

interface Message{
    chatUUID:string,
    sendDate:string,
    userEmail:string,
    nickName:string,
    message: string,
}
type groupMsgProps = groupDetailProps & DispatchStompProps & StompData
const GroupMsgBox: React.FC<groupMsgProps> = ({param, stomp, sendStompMsg, updateEndpoint}) => {
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [content, setContent] = useState<string>('');
    const [loading,setLoading] =useState<boolean>(false);
    const [beforeUUID,setBeforUUID] =useState<string>('');
    const chatRef = useRef<HTMLInputElement>(null);
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (content === '') return;
        sendStompMsg({target: 'groupMsg', param: param, message: content})
        setContent('');
        if(chatRef.current){
            chatRef.current.value=''
        }
        updateEndpoint();
        setTimeout(()=>{
            scrollToBottom()
        },100)
        
    }



    
    const settingMessage = ()=>{
        if (stomp.receiveMessage.param !== param ||stomp.receiveMessage.message===null) {
            return
        }
        if(stomp.receiveMessage.state ==="READ"&&!loading){
                 let file = stomp.receiveMessage.message as string[]
                 file.map((fileMessage,index)=>{
                    let msgInfo =fileMessage.split("$",5)
                    const loadMsg:Message = {
                        chatUUID:msgInfo[0],
                        sendDate:msgInfo[1],
                        userEmail:msgInfo[2],
                        nickName:msgInfo[3],
                        message: msgInfo[4],
                    }
                    setMessageList((prev)=>{
                        return [...prev,loadMsg]
                    })

                 })      
                setLoading(true);
        }else if(stomp.receiveMessage.state ==="SEND" && beforeUUID!==stomp.receiveMessage.message[0].split("$",5)[0]){  //재저장을 막기위해 이전 chatUUID를 저장하고 비교함       
            
            const loadMsg:Message = {
                chatUUID:stomp.receiveMessage.message[0].split("$",5)[0],
                sendDate:stomp.receiveMessage.sendDate,
                userEmail:stomp.receiveMessage.userEmail,
                nickName:stomp.receiveMessage.nickName,
                message: stomp.receiveMessage.message[0].split("$",5)[4]
            }
            
            setBeforUUID(stomp.receiveMessage.message[0].split("$",5)[0]) 
            setMessageList((prev)=>{
                return [...prev,loadMsg]
            })
        }

    }

    const scrollToBottom = () => {
        if (messageEndRef.current) {
            console.log( messageEndRef.current.scrollHeight)
            messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
        }
    };



    useEffect(() => {
        settingMessage()
    }, [stomp])

    return (
        <div>
            {loading &&
            <ScrollableDiv ref={messageEndRef}>
               {messageList.map((message,index)=>(
                <MessageBoxContainer key={message.chatUUID+index}>
                    {!message.nickName && '캘린룸에 오신 걸 환영합니다.'}
                    
                    {message.nickName&& 
                            (index&&(messageList[index-1].userEmail===message.userEmail)?
                            <MessageContainer2>
                                <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(1,17)))}</DateContainer2>
                                <div>{message.message}</div>
                            </MessageContainer2>
                            :
                            <RowFlexBox style={{width:'auto'}}>
                            <ProfileContainer>{message.userEmail.slice(0,1)}</ProfileContainer>
                            <div>
                                <RowFlexBox style={{marginLeft:'10px'}}>
                                    <NickNameContainer>
                                        {message.nickName}
                                    </NickNameContainer>
                                    <DateContainer>
                                        {AHMFormatV2(changeDateForm(message.sendDate.slice(1,17)))}
                                    </DateContainer>
                                </RowFlexBox>
                                <MessageContainer>
                                    {message.message}
                                </MessageContainer>
                            </div>
                        </RowFlexBox>
                            )
                    }
                </MessageBoxContainer>
               ))}
        
            </ScrollableDiv>
            }
            <RowFlexBox>
                <form onSubmit={sendMsg}>
                <input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setContent(e.target.value)
                }} ref={chatRef}></input>
                <button>send</button>
                </form>
            </RowFlexBox>
        </div>
    )
}
export default connect(mapStateToStompProps, mapDispatchToStompProps)(GroupMsgBox);