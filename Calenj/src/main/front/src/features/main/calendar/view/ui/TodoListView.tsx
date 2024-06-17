import {TodoListView_Container} from "./TodoListViewStyled";
import {createPortal} from "react-dom";

interface EventViewProps{
    top:number|undefined,
    left:number|undefined
    width:number,
}
export const TodoListView :React.FC<EventViewProps> = ({top, left, width}) =>{

    return createPortal(
        <TodoListView_Container $top={top||0} $left={left||0} $width={width}>

        </TodoListView_Container>,
        document.body
    )
}