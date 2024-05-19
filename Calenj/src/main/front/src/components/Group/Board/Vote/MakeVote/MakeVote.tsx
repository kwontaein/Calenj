import React, {ChangeEvent, MutableRefObject, useEffect, useRef, useState} from 'react';
import {Modal_Background} from '../../../../../style/FormStyle';
import '../../../../../style/ModalStyle.scss';
import 'react-datepicker/dist/react-datepicker.css'
import 'dayjs/locale/ko'; // 한국어 locale 추가
import {
    GroupVoteModal_Container,
    GroupVoteModal_Title,
    GroupVoteModal_TopContent_Container,
    MiniVote_Input,
    VoteList_Container,
    VoteListItem_Container,
    VoteListItem_Content,
    VoteListContent_Drop_Btn,
    ButtomContent_Containr,
    VoteListEmptyText,
} from "../../../../../style/Group/GroupVoteStyle";
import {ModalProps, VoteContent} from "../../../../../features/vote/makeVote";
import ListInput from "./ListInput";
import VoteCreateComponent from "./VoteCreateComponent";
import VoteList from "./VoteList";

const MakeVote: React.FC<ModalProps> = ({onClose, groupId, queryState}) => {
    const [title, setTitle] = useState<string>('');
    const [voteList, setVoteList] = useState<VoteContent[]>([]);//항목 리스트
    // const datepickerRef =useRef<ReactDatePickerProps>()
    const inputRef = useRef<HTMLInputElement>(null);
    const modalBackground = useRef<HTMLDivElement>(null);

    const handleDataChange = (newData: VoteContent[]) => {
        setVoteList([...voteList, ...newData]); // 하위 컴포넌트에서 전달된 데이터로 상태 업데이트
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    return (
        <Modal_Background ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current && title === "" && voteList.length === 0) {
                onClose();
            }
        }}>
            <GroupVoteModal_Container>
                <GroupVoteModal_TopContent_Container>
                    <GroupVoteModal_Title>투표 만들기</GroupVoteModal_Title>
                </GroupVoteModal_TopContent_Container>
                <MiniVote_Input onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                ref={inputRef}
                                maxLength={30}
                                placeholder='투표 제목'/>
                <ListInput onDataChange={handleDataChange} voteList={voteList}/>
                <VoteList voteList={voteList} onDataChange={handleDataChange}/>
                <ButtomContent_Containr>
                    <div style={{height: "4.3%"}}>투표 마감</div>
                    <VoteCreateComponent groupId={groupId} title={title} voteList={voteList} queryState={queryState}
                                         onClose={onClose}/>
                </ButtomContent_Containr>
            </GroupVoteModal_Container>
        </Modal_Background>
    )
}
export default MakeVote;