import {VoteList} from '../../../../../store/ReactQuery/queryInterface';
import {changeDateForm} from '../../../../../shared/lib';

const deadlineFilter = (list: VoteList[], end: boolean): VoteList[] => {
    let nowDate = new Date();
    const newList = list.filter((li) => {
        let endDate = changeDateForm(li.voteEndDate); // Date형식으로
        if (end) { // end : true => 마감된 거 찾기
            return endDate < nowDate;
        } else {
            return endDate > nowDate;
        }
    });

    return newList;
};

export default deadlineFilter;
