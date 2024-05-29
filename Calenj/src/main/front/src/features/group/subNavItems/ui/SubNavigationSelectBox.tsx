import {SelectItem_Container} from "./SubNavigationSelectBoxStyled";
import {RequestInviteGroup} from "../../invite";

export const SubNavigationSelectBox:React.FC = () =>{

    return(
        <SelectItem_Container>
            <RequestInviteGroup/>
        </SelectItem_Container>
    )
}
