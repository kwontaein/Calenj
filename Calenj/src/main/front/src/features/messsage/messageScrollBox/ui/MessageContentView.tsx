import {ImageGridMessage} from "./ImageGridMessage";
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
                <ScheduleMessage events={JSON.parse(message)}/>
            }
            {messageType === 'image' &&
                <ImageGridMessage images={parseDataString(message)}/>
            }
            {(messageType === 'null' || messageType === null) &&
                <div>
                    {message.replace(/\\lineChange/g, '\n').trim()}
                </div>
            }
        </FullScreen_div>
    )
}