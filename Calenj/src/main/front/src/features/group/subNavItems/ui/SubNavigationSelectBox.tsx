import {SelectItem_Container} from "./SubNavigationSelectBoxStyled";
import {RequestInviteGroup} from "../../invite";
import {GroupExit} from "../../exit/ui/GroupExit";

export const SubNavigationSelectBox: React.FC = () => {

    return (
        <SelectItem_Container>
            <RequestInviteGroup/>
            <GroupExit/>
        </SelectItem_Container>
    )
}
