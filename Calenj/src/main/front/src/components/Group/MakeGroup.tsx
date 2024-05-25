import React, {useEffect, useRef, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {jwtFilter} from '../../entities/authentication/jwt'
import { useConfirm } from '../../shared/model'
import { UseQueryResult, useQueryClient } from '@tanstack/react-query';
import {Modal_Background} from "../../style/FormStyle";

interface ModalProps {
    onClose: () => void;
    queryState: UseQueryResult;
}


//단순 그룹 생성을 위한 컴포넌트
const MakeGroup: React.FC<ModalProps> = ({onClose,queryState}) => {
    const [groupTitle, setGroupTitle] = useState<string>("");
    const modalBackground = useRef<HTMLDivElement>(null);

    
    const makeGroup = () => {

        axios.post('/api/makeGroup', {groupTitle: groupTitle})
            .then(() => {
                onClose()
                window.alert(`${groupTitle}이름으로 방이 생성되었습니다.`)
            })
            .catch(error => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if (axiosError.response?.status) {
                    console.log(axiosError.response.status);
                    jwtFilter((axiosError.response.status).toString());
                }
            });
    };


    const createGroup = () => {
        const cancle = () => console.log("생성 취소");

        if (groupTitle === "") {
            window.alert("생성할 방이름을 지어주세요.")
        } else {
            useConfirm(`${groupTitle} 이름으로 방을 생성하시겠습니까?`, makeGroup, cancle,queryState);
        }
    }


    return (
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
        </Modal_Background>
    );
}

export default MakeGroup;