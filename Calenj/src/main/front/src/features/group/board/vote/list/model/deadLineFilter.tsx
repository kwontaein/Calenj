import {VoteList} from "../../../../../../entities/reactQuery";
import {changeDateForm} from "../../../../../../shared/lib";

export const deadlineFilter = (list: VoteList[], end: boolean): VoteList[] => {
    let nowDate = new Date();
    return list.filter((li) => {
        let endDate = changeDateForm(li.voteEndDate)//Date형식으로
        return end ? endDate < nowDate : endDate > nowDate;
    });
}
