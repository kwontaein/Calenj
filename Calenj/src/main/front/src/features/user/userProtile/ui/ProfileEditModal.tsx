import React, {useState} from 'react';
import {Modal_Button, Modal_Content, Modal_Input, Modal_Overlay} from "./ProfileEditModalStyled";

interface ProfileEditModalProps {
    name: string;
    value: string | undefined;
    onClose: () => void;
    onSave: (newValue: string) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({name, value, onClose, onSave}) => {
    const [newValue, setNewValue] = useState(value);

    const handleSave = () => {
        onSave(newValue || '');
        onClose();
    };

    return (
        <Modal_Overlay>
            <Modal_Content>
                <h2>{name} 수정</h2>
                <Modal_Input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                />
                <div>
                    <Modal_Button onClick={handleSave}>저장</Modal_Button>
                    <Modal_Button onClick={onClose}>취소</Modal_Button>
                </div>
            </Modal_Content>
        </Modal_Overlay>
    );
};

export default ProfileEditModal;