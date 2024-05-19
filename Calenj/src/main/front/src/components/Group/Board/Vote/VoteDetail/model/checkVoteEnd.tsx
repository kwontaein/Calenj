import {changeDateForm} from "../../../../../../shared/lib";

export const checkVoteEnd = (date: string) => {
    let endDate = changeDateForm(date)//Date형식으로
    let nowDate = new Date();
    return endDate < nowDate;

}