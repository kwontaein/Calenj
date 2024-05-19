import {
    GroupVoteModal_Button_Container,
    GroupVoteModal_close_Btn,
} from "../../../../../style/Group/GroupVoteStyle";
import {CheckCondition_Button} from "../../../../../style/FormStyle";
import React, {useEffect, useState} from "react";
import {useConfirm} from "../../../../../shared/model";
import {VoteContent} from "../../../../../features/vote/makeVote";
import {UseQueryResult} from "@tanstack/react-query";
import VoteSetting from "./VoteSetting";
import {postVote} from "./VoteSaveApi";


interface VoteCreateComponentProps {
    groupId: string;
    title: string;
    voteList: VoteContent[];
    queryState: UseQueryResult;
    onClose: () => void;
}

const VoteCreateComponent: React.FC<VoteCreateComponentProps> = ({groupId, title, voteList, queryState, onClose}) => {
    const [multipleOption, setMultipleOption] = useState<boolean>(false);//중복투표여부
    const [anonymousOption, setAnonymousOption] = useState<boolean>(false); //익명여부
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(new Date().setDate(new Date().getDate() + 1)));

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const handleMultipleChange = (isMultiple: boolean) => {
        setMultipleOption(isMultiple);
    };

    const handleAnonymousChange = (isAnonymous: boolean) => {
        setAnonymousOption(isAnonymous);
    };


    useEffect(() => {
    }, [selectedDate])

    //model -> voteList
    const createVote = () => {
        if (title !== '' && voteList.length > 1 && selectedDate != null) {
            useConfirm(`투표를 생성하시겠습니까?`,
                () => postVote({
                    voteList: voteList,
                    groupId: groupId,
                    voteTitle: title,
                    isMultiple: multipleOption,
                    anonymous: anonymousOption,
                    selectedDate: selectedDate,
                    onClose: onClose,
                }),
                () => {
                    window.alert('투표 생성이 취소되었습니다.');
                }, queryState)
        } else if (title === '' && voteList.length < 2) {
            window.alert('제목 입력해주세요.')
        } else if (voteList.length < 2) {
            window.alert('항목을 2개이상 추가해주세요.')
        } else if (selectedDate === null) {
            window.alert('날짜를 입력해주세요.')
        } else {
            window.alert('제목 및 항목을 입력해주세요.')
        }
    }

    //모달창 닫기->voteList
    const closeModal = () => {
        if (voteList.length === 0 && title === "") {
            onClose();
            return
        }
        useConfirm('내용은 저장되지 않습니다. 정말로 취소하시겠습니까?', onClose, () => {
        })
    }

    return (
        <div>
            <VoteSetting selectedDate={selectedDate}
                         onDateChange={handleDateChange}
                         onMultipleChange={handleMultipleChange}
                         onAnonymousChange={handleAnonymousChange}/>
            <GroupVoteModal_Button_Container>
                <GroupVoteModal_close_Btn onClick={closeModal}>
                    취소
                </GroupVoteModal_close_Btn>
                <CheckCondition_Button $isAble={voteList.length > 1 && title !== ""} onClick={createVote}>
                    생성
                </CheckCondition_Button>
            </GroupVoteModal_Button_Container>
        </div>
    )
}
export default VoteCreateComponent;