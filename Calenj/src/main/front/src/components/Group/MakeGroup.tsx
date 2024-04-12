import React, {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {stateFilter, useConfirm} from '../../stateFunc/actionFun'
import { UseQueryResult, useQueryClient } from '@tanstack/react-query';
import {DispatchAppProps, mapDispatchToAppProps}from '../../store/module/MessageReducer'
import {connect} from "react-redux";
import {QUERY_COOKIE_KEY} from '../../App'
interface ModalProps {
    onClose: () => void;
    queryState: UseQueryResult;
}


//단순 그룹 생성을 위한 컴포넌트
const MakeGroup: React.FC<ModalProps&DispatchAppProps> = ({onClose,queryState,updateAppDirect}) => {
    const [groupTitle, setGroupTitle] = useState<string>("");
    const queryClient = useQueryClient();

    
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
                    stateFilter((axiosError.response.status).toString());
                }
            });
    };


    const createGroup = () => {
        const cancle = () => console.log("생성 취소");

        if (groupTitle === "") {
            window.alert("생성할 방이름을 지어주세요.")
        } else {
            useConfirm(`${groupTitle} 이름으로 방을 생성하시겠습니까?`, makeGroup, cancle,queryState);
            setTimeout(()=>{
                queryClient.invalidateQueries({queryKey:[QUERY_COOKIE_KEY]}) //업데이트 이후 connect를 위한 함수
                console.log('재연결')
            },500)
            
        }
    }


    return (
        <div>
            <input type='text' placeholder='캘린룸 이름' onChange={(e) => setGroupTitle(e.target.value)}></input>
            <button onClick={createGroup}>생성</button>
            <button onClick={onClose}>닫기</button>
        </div>
    );
}

export default connect(null,mapDispatchToAppProps) (MakeGroup);