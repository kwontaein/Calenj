import {CustomScreen_MiddleLine_div} from "./ControlMidLineStyled";
import { useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {ContentItemProps} from "../model/types";
import {useScreenHandler} from "../model/useScreenHandler";

export const ControlMidLine :React.FC<ContentItemProps> =({showUserList, contentSize}) =>{
    const {mode} = useSelector((state:RootState)=>state.subNavigateInfo)
    const [handleMouseDown] = useScreenHandler(showUserList, mode,contentSize);

    return(
        <CustomScreen_MiddleLine_div $mode={mode} onMouseDown={handleMouseDown}/>
    )
}
