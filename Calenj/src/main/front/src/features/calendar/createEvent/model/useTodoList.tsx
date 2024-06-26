import React, {useRef, useState} from "react";
import {ReturnTodo, TodoItem} from "./types";

export const useTodoList = () : ReturnTodo =>{
    const contentRef = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState<string>(''); //항목 (텍스트)
    const [todoList, setTodoList] = useState<TodoItem[]>([]);//항목 리스트

    //List 추가
    const addList = () => {
        if(content===''){
            window.alert('내용을 입력해주세요.');
            return;
        }
        const list: TodoItem = {
            id: Date.now(),
            content: content
        };
        setTodoList([...todoList, list]);
        setContent('');
        if (contentRef.current) {
            contentRef.current.value = '';
        }
    };

    const removeItem = (key: number) => {
        const newList: TodoItem[] = todoList.filter((current) => {
            return current.id !== key
        })
        setTodoList([...newList]);
    }

    return {todoList, contentRef, setContent, addList, removeItem}
}