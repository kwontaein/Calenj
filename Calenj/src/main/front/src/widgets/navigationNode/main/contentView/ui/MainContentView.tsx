import {useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {CurrentFriendView} from "../../../../../features/friend/view"
import {CalendarView} from "../../../../../features/calendar/view";
import {MessageContainer} from "../../../../message";
import {useEffect} from "react";

export const MainContentView:React.FC = () =>{

    const {clickState} = useSelector((state:RootState) => state.subNavigation.main_subNavState)
    const {navigateParam} = useSelector((state: RootState) => state.navigateInfo);
    useEffect(() => {
        console.log(navigateParam)
    }, [navigateParam]);

    return(
        <>
            {clickState==='calendar' && <CalendarView/>}
            {(clickState==='friend' && navigateParam==='')&& <CurrentFriendView/>}
            {(clickState==='friend' && navigateParam!=='') && <MessageContainer/>}
        </>
    )
}