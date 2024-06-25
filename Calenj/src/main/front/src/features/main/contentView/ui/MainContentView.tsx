import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import Calendar from "react-calendar";
import {CurrentFriendView} from "../../friend/view";

export const MainContentView:React.FC = () =>{

    const {clickState} = useSelector((state:RootState) => state.main_subNavState)
    return(
        <>
            {clickState==='calendar' && <Calendar/>}
            {clickState==='friend' && <CurrentFriendView/>}
        </>
    )
}