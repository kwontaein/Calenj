// //v5이후로 인자를 객체 형태로 전달해야함
import {QueryClient, useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {checkCookie,logout, getGroupList, getGroupDetail, getVoteList, getNoticeList, getFriendList, getEvents} from './queryUtils'
import {GroupList_item, GroupDetail, VoteList, NoticeList, FriendList, FriendEvent} from "./queryInterface";


export const QUERY_CHATTING_KEY: string = "QUERY_CHATTING_KEY";
export const QUERY_NEW_CAHT_KEY: string = "QUERY_NEW_CAHT_KEY";
export const QUERY_COOKIE_KEY: string = 'QUERY_COOKIE_KEY';
export const QUERY_FRIEND_LIST_KEY: string = 'QUERY_FRIEND_LIST_KEY'
export const QUERY_REQUEST_FRIEND_LIST: string ="QUERY_REQUEST_FRIEND_LIST"
export const QUERY_GROUP_DETAIL_KEY:string = 'QUERY_GROUP_DETAIL_KEY'
export const QUERY_GROUP_LIST_KEY: string = 'QUERY_GROUP_LIST_KEY'
export const QUERY_VOTE_LIST_KEY: string = 'QUERY_VOTE_LIST_KEY'
export const QUERY_NOTICE_LIST_KEY: string ='QUERY_NOTICE_LIST_KEY'


export const useFetchCookie= () =>
    useQuery<boolean, Error>({
        queryKey: [QUERY_COOKIE_KEY],
        queryFn: checkCookie, //HTTP 요청함수 (Promise 를 반환하는 함수)
    });

export const useFetchGroupList = (isOnline:string) =>
    useQuery<GroupList_item[] | null, Error>({
        queryKey: [QUERY_GROUP_LIST_KEY],
        queryFn: () => getGroupList(), //HTTP 요청함수 (Promise를 반환하는 함수)
        enabled: isOnline === "ONLINE",
    })

export const useFetchGroupDetail = (target:string, groupId:string) =>
    useQuery<GroupDetail | null, Error>({
        queryKey: [QUERY_GROUP_DETAIL_KEY, groupId],
        queryFn: () => getGroupDetail(groupId), //HTTP 요청함수 (Promise를 반환하는 함수)
        enabled: target==="group",
    });

export const useFetchNoticeList = (groupId:string) =>
     useQuery<NoticeList[]|null, Error>({
        queryKey: [QUERY_NOTICE_LIST_KEY, groupId],
        queryFn: () => getNoticeList(groupId), //HTTP 요청함수 (Promise를 반환하는 함수)
    });

export const useFetchVoteList = (groupId:string) =>
    useQuery<VoteList[] | null, Error>({
        queryKey: [QUERY_VOTE_LIST_KEY, groupId],
        queryFn: () => getVoteList(groupId), //HTTP 요청함수 (Promise를 반환하는 함수)
    });

export const useFetchFriendsList= () =>
useQuery<FriendList[] | null, Error>({
    queryKey: [QUERY_FRIEND_LIST_KEY],
    queryFn: getFriendList, //HTTP 요청함수 (Promise를 반환하는 함수)
});

export const  useFetchRequsetFriendList= () =>
    useQuery<FriendEvent[] | null, Error>({
        queryKey: [QUERY_REQUEST_FRIEND_LIST],
        queryFn: getEvents, //HTTP 요청함수 (Promise를 반환하는 함수)
    });

/**수정관련 */


export const useMutationCookie = (queryClient :QueryClient) =>
    useMutation({
        mutationFn: logout,
        onSuccess : async () => {
            await queryClient.invalidateQueries({queryKey:[QUERY_COOKIE_KEY]},);
            // await queryClient.invalidateQueries({queryKey: [QUERY_GROUP_LIST_KEY]});
            // await queryClient.invalidateQueries({queryKey: [QUERY_FRIEND_LIST_KEY]});
    },})

