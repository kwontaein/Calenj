import {changeDateForm} from "../../../../shared/lib";

const dateOperation = (beforeSendDate : string, AfterSendDate : string) => {
    return ((+changeDateForm(AfterSendDate)) - (+changeDateForm(beforeSendDate)) < 300000)
}