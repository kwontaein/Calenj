import {ByWeekday, Options, RRule, Weekday} from "rrule";
import {RepeatOption} from "../model/types";
import {RepeatState} from "../../../../entities/calendar";

const weekArr = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA]

const freqHash = {
    일: RRule.DAILY,
    주: RRule.WEEKLY,
    달: RRule.MONTHLY,
    년: RRule.YEARLY
};

export const addRruleOptions = (repeatState: RepeatState, start: Date): Partial<Options> => {
    const {
        repeatMode,
        repeatNum,
        repeatCount,
        repeatWeek,
        repeatEnd,
        startTime,
        repeatDeadline,
        repeatOption
    } = repeatState;


    const options: Partial<Options> = {
        dtstart: start,
    };
    const [newStartTime, newEndTime] = [new Date(startTime.toString()).getHours(), new Date(startTime.toString()).getMinutes()];

    if (repeatMode === "cycle") {
        options.freq = freqHash[repeatOption as RepeatOption];
        options.interval = repeatNum;
    } else if (repeatMode === "week" && repeatWeek) {
        options.freq = RRule.WEEKLY;
        const byWeekData: string | number | Weekday | ByWeekday[] | null | undefined = [];
        repeatWeek.forEach((week, index) => {
            if (week) {
                byWeekData.push(weekArr[index])
            }
        })
        options.byweekday = byWeekData;
    }
    if (repeatDeadline === "count") {
        options.count = repeatCount;
    } else if (repeatDeadline === "date") {
        options.until = new Date(repeatEnd.toString());
    }
    options.byhour = newStartTime;
    options.byminute = newEndTime;
    return options
}