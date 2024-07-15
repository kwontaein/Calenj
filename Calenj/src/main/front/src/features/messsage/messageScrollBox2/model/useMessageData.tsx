import {useEffect, useMemo, useState} from "react";
import {
    QUERY_CHATTING_KEY,
    QUERY_NEW_CHAT_KEY,
    useChatFileInfinite,
    useReceiveChatInfinite
} from "../../../../entities/reactQuery/model/queryModel";
import {useChatFetching} from "../../../../entities/message";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {InfiniteData, UseInfiniteQueryResult, useQueryClient} from "@tanstack/react-query";
import {Message} from '../../../../entities/reactQuery'
import {endPointMap, scrollPointMap} from "../../../../entities/redux";
import {changeDateForm} from "../../../../shared/lib";

interface useMessageData {
    compareDate: (date1: string, date2: string) => boolean,
}

export const useMessageData = (param: string): useMessageData => {
    //--------------------------------------------------------------------------------------------------------------- 의존성을 활용한 페이지 랜더링 및 업데이트 관리
    const compareDate = (date1: string, date2: string): boolean => {
        if (changeDateForm(date1).getDate() !== changeDateForm(date2).getDate()) return true
        if (changeDateForm(date1).getMonth() !== changeDateForm(date2).getMonth()) return true
        return changeDateForm(date1).getFullYear() !== changeDateForm(date2).getFullYear();
    }
    return {compareDate};
}