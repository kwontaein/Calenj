import {TodoListView_Container} from "./TodoListViewStyled";
import {createPortal} from "react-dom";
import {useEffect} from "react";
import {Dictionary} from "@fullcalendar/core";

interface EventViewProps{
    top:number|undefined,
    left:number|undefined
    width:number,
    extendedProps: Dictionary,
}
export const TodoListView :React.FC<EventViewProps> = ({top, left, width, extendedProps}) =>{
    useEffect(() => {
        console.log(extendedProps)
    }, []);
    return createPortal(
        <TodoListView_Container $top={top||0} $left={left||0} $width={width}>

        </TodoListView_Container>,
        document.body
    )
}