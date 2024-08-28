import {ImageGrid} from "./ImageGrid";
import {parseDataString} from "../lib/parseDataString";
import React, {useEffect} from "react";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";
import {DateEventDetail} from "../../../calendar/detail";
import {ScheduleMessage} from "./ScheduleMessage";
import {VoteMessage} from "./VoteMessage";

interface MessageProps {
    messageType: string,
    message: string,
}

export const MessageContentView: React.FC<MessageProps> = ({message, messageType}) => {

    useEffect(() => {
        if(messageType=== 'schedule'){
            console.log(message.split(','))
        }
    }, []);

    return (
        <FullScreen_div>
            {messageType === 'title' &&
                <div>
                    {message.replace(/\\lineChange/g, '\n').trim()}
                </div>
            }
            {messageType === 'vote' &&
                <VoteMessage voteData={message}/>
            }
            {messageType === 'schedule' &&
                <div>
                    {/*<ScheduleMessage events={JSON.parse(message)}/>*/}
                </div>
            }
            {messageType === 'image' &&
                <ImageGrid images={parseDataString(message)}/>
            }
            {(messageType === 'null' || messageType === null) &&
                <div>
                    {message.replace(/\\lineChange/g, '\n').trim()}
                </div>
            }
        </FullScreen_div>
    )
}