import React, {useLayoutEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useLocation} from 'react-router-dom';
import {useId} from 'react';
import {stateFilter} from '../../../stateFunc/actionFun'


interface VoteDetails {
    voteId: string;
    voteCreater: string;
    voteTitle: string;
    voteItem: string[];
    voteCreated: string;
    voteEndDate: string;
    isMultiple: boolean;
    anonymous: boolean;
    voter: string[];
}


const VoteDetail: React.FC = () => {

    const [detail, setDetail] = useState<VoteDetails | null>(null);
    const [viewBy, setViewBy] = useState<number>(0);
    const location = useLocation();
    const voteInfo = {...location.state};


    function getVoteDetail() {
        axios.post('/api/voteDetail', null, {
            params: {
                voteId: voteInfo.voteId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }) // 객체의 속성명을 'id'로 설정
            .then(response => {
                setDetail(response.data);
                console.log(response.data);
            })
            .catch(error => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if (axiosError.response?.status) {
                    console.log(axiosError.response.status);
                    stateFilter((axiosError.response.status).toString());
                }
            });
    }

    useLayoutEffect(() => {
        getVoteDetail();
    }, []);


    return (
        <div>
            ㅎㅇ
            <hr/>
        </div>
    )
}
export default VoteDetail