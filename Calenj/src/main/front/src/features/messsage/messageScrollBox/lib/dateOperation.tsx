import {changeDateForm} from "../../../../shared/lib";

export const dateOperation = (beforeSendDate : string, AfterSendDate : string) => {
    return ((+changeDateForm(AfterSendDate)) - (+changeDateForm(beforeSendDate)) < 300000)
}