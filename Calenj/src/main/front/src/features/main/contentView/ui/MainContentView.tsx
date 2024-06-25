import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {CurrentFriendView} from "../../friend/view";
import {CalendarView} from "../../calendar/view";

export const MainContentView:React.FC = () =>{

    const {clickState} = useSelector((state:RootState) => state.main_subNavState)
    return(
        <>
            {clickState==='calendar' && <CalendarView/>}
            {clickState==='friend' && <CurrentFriendView/>}
        </>
    )
}