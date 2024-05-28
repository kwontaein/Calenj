import {saveDBFormat} from "../../../../../../shared/lib";
import {createVoteApi} from "../api/createVoteApi";
import {useConfirm} from "../../../../../../shared/model";
import {VoteContent} from "./types";
import {updateClickState} from "../../../../../../store/slice/BoardOptionSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";
import {useFetchVoteList} from "../../../../../../entities/ReactQuery";
import {useEffect} from "react";
import {AxiosError} from "axios";
import {jwtFilter} from "../../../../../../entities/authentication/jwt";

export const useCreateVote = (voteList:VoteContent[], selectedDate:Date, title:string, multipleOption:boolean, anonymousOption:boolean) => {
    const { param } = useSelector((state:RootState) => state.subNavigateInfo)
    const voteListState = useFetchVoteList(param)
    const dispatch = useDispatch()


    const data = {
        groupId: param,
        voteCreated: saveDBFormat(new Date()),
        voteTitle: title,
        voteEndDate: saveDBFormat(selectedDate),
        isMultiple: multipleOption,
        anonymous: anonymousOption,
        postedVoteChoiceDTO: voteList.map(item => item.content)
    };

    const onClose = () => {
        dispatch(updateClickState({clickState:''}));
    };

    return ()=>{
        const create = ()=> {
            createVoteApi(data)
                .then(() => {
                    window.alert('투표를 생성했습니다.')
                    onClose();
                })
                .catch((error) => {
                    const axiosError = error as AxiosError;
                    console.log(axiosError);
                    if (axiosError.response?.data) {
                        jwtFilter((axiosError.response.data) as string);
                    }
                });
        }
        if (title !== '' && voteList.length > 1 && selectedDate != null) {
            useConfirm(`투표를 생성하시겠습니까?`, create, () => {},voteListState)
        } else if (title === '' && voteList.length < 2) {
            window.alert('제목 입력해주세요.')
        } else if (voteList.length < 2) {
            window.alert('항목을 2개이상 추가해주세요.')
        }else if(selectedDate ===null){
            window.alert('날짜를 입력해주세요.')
        }else{
            window.alert('제목 및 항목을 입력해주세요.')
        }
    }

}