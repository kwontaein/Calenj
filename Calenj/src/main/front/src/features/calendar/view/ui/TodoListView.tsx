import {TodoList_Item, TodoListView_Container} from "./TodoListViewStyled";
import {createPortal} from "react-dom";
import {useEffect, useId} from "react";
import chroma from "chroma-js";
import {EventViewProps} from "../model/types";


export const TodoListView :React.FC<EventViewProps> = ({top, left, width, todoList, color}) =>{
    const todoId = useId()
    const [R, G, B]: number[] = chroma(color).rgb();

    return createPortal(
        <TodoListView_Container $top={top||0} $left={left||0} $width={width}>
            {todoList.map((todo:string)=>(
                <TodoList_Item key={todo+todoId} $R={R} $G={G} $B={B}>
                    {todo}
                </TodoList_Item>
            ))}
        </TodoListView_Container>,
        document.body
    )
}