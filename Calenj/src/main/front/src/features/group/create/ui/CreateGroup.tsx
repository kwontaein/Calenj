import React, {useRef, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {jwtFilter} from '../../../../entities/authentication/jwt'
import { useConfirm } from '../../../../shared/model'
import { UseQueryResult } from '@tanstack/react-query';
import {Modal_Background} from "../../../../shared/ui/SharedStyled";
import {useCreateGroup} from "../model/useCreateGroup";
import {createPortal} from "react-dom";

interface ModalProps {
    onClose: () => void;
}


//단순 그룹 생성을 위한 컴포넌트
export const CreateGroup: React.FC<ModalProps> = ({onClose}) => {
    const modalBackground = useRef<HTMLDivElement>(null);
    const [groupTitle, setGroupTitle, createGroup] =useCreateGroup(onClose)

    return createPortal (
        <Modal_Background ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current && groupTitle === "") {
                onClose();
            }
        }}>
            <input type='text'
                   placeholder='캘린룸 이름'
                   maxLength={12}
                   onChange={(e) => setGroupTitle(e.target.value)}></input>
            <button onClick={createGroup}>생성</button>
            <button onClick={onClose}>닫기</button>
        </Modal_Background>,
        document.body
    );
}

