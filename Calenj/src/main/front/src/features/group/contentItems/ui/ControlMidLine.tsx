import {CustomScreen_MiddleLine_div} from "./ControlMidLineStyled";
import { useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {ContentItemProps} from "../model/types";
import {useScreenHandler} from "../model/useScreenHandler";

export const ControlMidLine :React.FC<ContentItemProps> =({contentSize}) =>{
    const {mode, showMemberList} = useSelector((state:RootState)=>state.subNavigation.group_subNavState)
    const [handleMouseDown] = useScreenHandler(showMemberList, mode,contentSize);

    return(
        <CustomScreen_MiddleLine_div $mode={mode} onMouseDown={handleMouseDown}/>
    )
}
