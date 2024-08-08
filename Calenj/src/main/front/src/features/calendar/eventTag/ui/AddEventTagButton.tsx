import {Modal_Condition_Button} from "../../../../shared/ui/SharedStyled";

import {EventTagProps} from "../model/types";
import {AddTag_Button, AddTagButton_Container, CreateButton_Container} from "./AddEventTagButtonStyled";


export const AddEventTagButton:React.FC<EventTagProps> = ({useCreateTag}) =>{

    return(
        <AddTagButton_Container>
            {useCreateTag.createTag ?
            <CreateButton_Container>
                <Modal_Condition_Button
                    style={{width: 'calc(50% - 10px)', height: "30px", marginLeft: '6px'}}
                    onClick={() => useCreateTag.setCreateTag()}>
                    취소
                </Modal_Condition_Button>
                <Modal_Condition_Button $isAble={useCreateTag.newTagName !== ""}
                                        style={{
                                            width: 'calc(50% - 10px)',
                                            height: "30px",
                                            marginLeft: '6px'
                                        }}
                                        onClick={useCreateTag.createNewTag}>
                    생성하기
                </Modal_Condition_Button>
            </CreateButton_Container>
            :
            <AddTag_Button onClick={() => useCreateTag.setCreateTag()}>
                태그 추가하기
            </AddTag_Button>
            }
        </AddTagButton_Container>
    )
}