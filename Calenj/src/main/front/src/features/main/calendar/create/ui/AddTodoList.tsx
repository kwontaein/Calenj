import {
    AddToDo_Input,
    AddToDoList_Container,
    AddVoteList_Btn,
    ListInput_Container, TodoList_Container, TodoListContent_Drop_Btn, TodoListEmptyText,
    TodoListItem_Container, TodoListItem_Content
} from "./AddToDoListStyled";
import React, {ChangeEvent} from "react";
import {ReturnTodo, TodoItem} from "../model/types";

export const AddTodoList:React.FC<ReturnTodo> = ({contentRef,todoList, setContent, addList, removeItem}) =>{

    return (
        <AddToDoList_Container>
            <ListInput_Container>
                <AddToDo_Input
                    ref={contentRef}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                    placeholder='항목 입력' maxLength={40}/>
                <AddVoteList_Btn onClick={() => addList()} >추가</AddVoteList_Btn>
            </ListInput_Container>
            <TodoList_Container>
                {todoList.length!==0 ?
                    (todoList.map((list:TodoItem) => (
                        <TodoListItem_Container key={list.id}>
                            <TodoListItem_Content>
                                {list.content}
                            </TodoListItem_Content>
                            <TodoListContent_Drop_Btn
                                onClick={() => removeItem(list.id)}>
                                <i className="fi fi-br-trash" style={{marginTop:'5px'}}></i>
                            </TodoListContent_Drop_Btn>
                        </TodoListItem_Container>
                    )))
                    :
                    <TodoListEmptyText>
                        항목을 추가해주세요
                    </TodoListEmptyText>
                }
            </TodoList_Container>
        </AddToDoList_Container>
    )
}