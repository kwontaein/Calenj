import {
    MessageComponent_Container,
} from './MessageContainerStyled'

import {MessageInput, MessageScrollBox} from "../../../features/messsage";
import ImagesUploadComponent from "../../../shared/ui/MultiImageUploadView";

export const MessageContainer: React.FC = () => {

    return (
        <MessageComponent_Container>
            <MessageScrollBox/>
            <MessageInput/>
        </MessageComponent_Container>
    )
}
