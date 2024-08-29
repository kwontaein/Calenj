import {InviteModal} from './InviteModal'
import {
    Btn_ItemSelector,
    SelectorIcon_Container,
    SelectorText_Container
} from "./RequestInvieteGroupStyled";
import {useReducer, useState} from "react";
import {useInviteCode} from "../model/useInviteCode";


export const RequestInviteGroup: React.FC = () => {
    const [modalOpen, setModalOpen] = useReducer((prev)=>!prev, false)
    const [inviteLink, invite] = useInviteCode(setModalOpen);

    return (
        <div style={{marginBottom: "5px" }}>
            <Btn_ItemSelector onClick={invite}>
                <SelectorText_Container>
                    초대하기
                </SelectorText_Container>
                <SelectorIcon_Container>
                    <i className="fi fi-sr-user-add"></i>
                </SelectorIcon_Container>
            </Btn_ItemSelector>
            {modalOpen && <InviteModal onClose={setModalOpen} inviteLink={inviteLink}/>}
        </div>
    )
}
