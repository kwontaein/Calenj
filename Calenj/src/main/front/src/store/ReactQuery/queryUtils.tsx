//api 를 통하여 쿠키를 post 하여 boolean 값을 return 받는다.
//accessToken 만료 시 refreshToken 체크 후 재발급, 모든 토큰 만료 시 재로그인 필요
import axios, {AxiosError} from "axios";
import {stateFilter} from "../../stateFunc/actionFun";
import {GroupList_item, GroupDetail , VoteList, NoticeList, FriendList, FriendEvent} from "./queryInterface";
import {useMutation} from "@tanstack/react-query";
import {QUERY_COOKIE_KEY} from "../../components/Auth/SignState";

//쿠키체크
export const checkCookie = async (): Promise<boolean> => {
    const response = await axios.post('/api/postCookie');

    return response.data;
}
export const logout = async (): Promise<boolean> => {
    try {
        const response = await axios.post('/api/logout');
        return response.data;
    } catch (error) {
        document.location.replace('/')
        return false;
    }
};



//그룹리스트
export const getGroupList = async (): Promise<GroupList_item[] | null> => {
    try {
        const response = await axios.get('/api/groupList');
        const data = response.data as GroupList_item[];
        const dataSort = data.sort((a, b) => {
            return (Number(b.groupCreated) - Number(a.groupCreated));
        })
        return dataSort;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        if (axiosError.response?.status) {
            console.log(axiosError.response.status);
            stateFilter((axiosError.response.status).toString());
        }
        return null;
    }
}

export const getGroupDetail = async (groupId:string): Promise<GroupDetail | null> => {
    try {
        const response = await axios.post('/api/groupDetail', {
            groupId: groupId
        }) // 객체의 속성명을 'id'로 설정;
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        if (axiosError.response?.status) {
            console.log(axiosError.response.status);
            stateFilter((axiosError.response.status).toString());
        }
        return null;
    }
}

//공지리스트
export const getNoticeList = async (groupId:string): Promise<NoticeList[]|null>=> {
    try{
        const response = await axios.post('/api/noticeList',{groupId:groupId});
        // console.log(response.data);
        return response.data
    }catch(error){
        const axiosError = error as AxiosError;
        console.log(axiosError);
        if(axiosError.response?.data){
            stateFilter((axiosError.response.data) as string);
        }
        return null;
    }
}


//투표리스트 불러오기
export const getVoteList = async (groupId:string): Promise<VoteList[] | null> => {
    try {
        const response = await axios.post('/api/voteList', {groupId: groupId});

        return response.data
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        if (axiosError.response?.data) {
            stateFilter((axiosError.response.data) as string);
        }
        return null;
    }
}


//친구리스트 불러오기
export const getFriendList = async (): Promise<FriendList[] | null> => {
    try {
        const response = await axios.get('/api/getFriendList');
        console.log('친구 목록을 불러옵니다.');
        const data = response.data as FriendList[];
        const dataSort = data.sort((a, b) => {
            return (Number(b.friendAddDate) - Number(a.friendAddDate));
        })
        return dataSort;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        if (axiosError.response?.status) {
            console.log(axiosError.response.status);
            stateFilter((axiosError.response.status).toString());
        }
        return null;
    }
}


//친구요청 이벤트 가져오기
export const getEvents = async (): Promise<FriendEvent[] | null> => {
    try {
        const response = await axios.get('/api/ResponseFriendList');
        console.log('친구 요청 받은 목록을 불러옵니다.');
        const data = response.data as FriendEvent[];
        const dataSort = data.sort((a, b) => {
            return (Number(b.createDate) - Number(a.createDate));
        })
        return dataSort;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        if (axiosError.response?.status) {
            console.log(axiosError.response.status);
            stateFilter((axiosError.response.status).toString());
        }
        return null;
    }
}




/**useChattingFile 에 사용되는 함수 */
