import {useDispatch, useSelector} from "react-redux";
import {RootState, updateNavigation} from "../../../../../entities/redux";
import {CurrentFriendView} from "../../../../../features/friend/view"
import {CalendarView} from "../../../../../features/calendar/view";
import {MessageContainer} from "../../../../message";
import {useEffect} from "react";

export const MainContentView:React.FC = () =>{
    const {clickState,friendParam} = useSelector((state:RootState) => state.subNavigation.main_subNavState)
    const {navigateParam} = useSelector((state: RootState) => state.navigateInfo);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateNavigation({navigate:'main', navigateParam:friendParam}))
    }, [friendParam]);

    return(
        <>
            {clickState==='calendar' && <CalendarView/>}
            {(clickState==='friend' && navigateParam==='')&& <CurrentFriendView/>}
            {(clickState==='friend' && navigateParam!=='') && <MessageContainer/>}
        </>
    )
}