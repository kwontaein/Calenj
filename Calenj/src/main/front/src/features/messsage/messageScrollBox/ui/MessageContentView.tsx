import {ImageGrid} from "./ImageGrid";
import {parseDataString} from "../lib/parseDataString";
import React from "react";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";
interface MessageProps{
    messageType:string,
    message:string,
}
export const MessageContentView :React.FC<MessageProps> =({message,messageType})=>{
    return(
        <FullScreen_div>
            {messageType === 'title' &&
                <div>
                    {message.replace(/\\lineChange/g, '\n').trim()}
                </div>
            }
            {messageType === 'vote' &&
                <div>
                    {message.replace(/\\lineChange/g, '\n').trim()}
                </div>
            }
            {messageType === 'schedule' &&
                <div>
                    {message.replace(/\\lineChange/g, '\n').trim()}
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