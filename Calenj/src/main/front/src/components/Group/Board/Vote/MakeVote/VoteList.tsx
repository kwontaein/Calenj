import {
    VoteList_Container, VoteListContent_Drop_Btn, VoteListEmptyText,
    VoteListItem_Container,
    VoteListItem_Content
} from "../../../../../style/Group/GroupVoteStyle";
import React from "react";
import {VoteContent} from "../../../../../features/vote/makeVote";

interface ChildProps {
    onDataChange: (data: VoteContent[]) => void;
    voteList: VoteContent[];
}

const VoteList: React.FC<ChildProps> = ({onDataChange, voteList}) => {

    const dataSendToParent = (voteList: VoteContent[]) => {
        onDataChange(voteList); // 부모 컴포넌트에 데이터 전달
    };

    //model
    //List목록 삭제하기 ->voteList
    const deleteLi = (key: number) => {
        const newList: VoteContent[] = voteList.filter((current) => {
            return current.id !== key
        })
        dataSendToParent([...newList]);
    }

    return (
        <VoteList_Container>
            {voteList.length !== 0 ?
                (voteList.map((list) => (
                    <VoteListItem_Container key={list.id}>
                        <VoteListItem_Content>
                            {list.content}
                        </VoteListItem_Content>
                        <VoteListContent_Drop_Btn
                            onClick={() => deleteLi(list.id)}>
                            <i className="fi fi-br-trash" style={{marginTop: '5px'}}></i>
                        </VoteListContent_Drop_Btn>
                    </VoteListItem_Container>
                )))
                :
                <VoteListEmptyText>
                    항목을 추가해주세요
                </VoteListEmptyText>
            }
        </VoteList_Container>
    )
}
export default VoteList;