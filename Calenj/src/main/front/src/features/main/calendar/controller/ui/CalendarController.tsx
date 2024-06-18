import {Controller_Button, Controller_Container} from "./CalendarControllerStyled";
import {Modal_Condition_Button} from "../../../../../shared/ui/SharedStyled";
import {setCalendarCompound} from "../../../../../entities/redux/model/slice/CalendarControllerSlice";
import {useDispatch} from "react-redux";
import {CalendarFromSelector} from "./CalendarFormSelector";

export const CalendarController:React.FC = () =>{
    const dispatch = useDispatch()

    return(
        <Controller_Container>
            <Controller_Button style={{borderRadius:'5px 0 0 5px'}}
                               onClick={()=>{dispatch(setCalendarCompound({compound:'prev-year'}))}}>
                <i className="fi fi-br-angle-double-left"></i>
            </Controller_Button>
            <Controller_Button onClick={()=>{dispatch(setCalendarCompound({compound:'prev-month'}))}}>
                <i className="fi fi-br-angle-left"></i>
            </Controller_Button>
            <Controller_Button onClick={()=>{dispatch(setCalendarCompound({compound:'next-month'}))}}>
                <i className="fi fi-br-angle-right"></i>
            </Controller_Button>
            <Controller_Button style={{borderRadius:'0 5px 5px 0'}}
                               onClick={()=>{dispatch(setCalendarCompound({compound:'next-year'}))}}>
                <i className="fi fi-br-angle-double-right"></i>
            </Controller_Button>
            <Controller_Button style={{borderRadius:'5px', marginLeft:'5px'}}
                               onClick={()=>{dispatch(setCalendarCompound({compound:'today'}))}}>
                오늘
            </Controller_Button>
        </Controller_Container>
    )
}