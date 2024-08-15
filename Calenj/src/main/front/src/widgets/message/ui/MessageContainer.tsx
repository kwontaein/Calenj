import {
    MessageComponent_Container,
} from './MessageContainerStyled'

import {MessageInput, MessageScrollBox} from "../../../features/messsage";
import {useEffect, useRef, useState} from "react";
import {RootState, updateAppPosition} from "../../../entities/redux";
import {useDispatch, useSelector} from "react-redux";

export const MessageContainer: React.FC = () => {
    const {navigate, navigateParam} = useSelector((state: RootState) => state.navigateInfo);
    const stompParam = useSelector((state: RootState) => state.stomp.param)
    const dispatch = useDispatch()
    const messageBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(updateAppPosition({target: navigate, param: navigateParam}));
    }, [navigateParam]);

    return (
        <MessageComponent_Container ref={messageBoxRef}>
            {stompParam === navigateParam &&
                <>
                    <MessageScrollBox/>
                    <MessageInput messageBoxRef={messageBoxRef}/>
                </>
            }
        </MessageComponent_Container>

    )
}
