import {InviteModal} from '../../invite/ui/InviteModal'
import {
    Btn_ItemSelector,
    SelectorIcon_Container,
    SelectorText_Container
} from "../../invite/ui/RequestInvieteGroupStyled";
import {useState} from "react";
import {ExitModal} from "./ExitModal";


export const GroupExit: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <div>
            <Btn_ItemSelector onClick={() => setModalOpen(true)}>
                <SelectorText_Container>
                    그룹 나가기
                </SelectorText_Container>
                <SelectorIcon_Container>
                    <i className="fi fi-sr-user-add"></i>
                </SelectorIcon_Container>
            </Btn_ItemSelector>
            {modalOpen && <ExitModal onClose={() => setModalOpen(false)}/>}
        </div>
    )
}
