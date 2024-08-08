
import {ChangeEvent} from "react";
import {ColorSelector} from "../../../../shared/ui/ColorSelector";
import {EventTagProps} from "../model/types";
import {
    CreateTag_Container,
    CreateTag_Content,
    CreateTagColor_Container,
    CreateTagInput_Container, CreateTagText_Container
} from "./CreateEventTagStyled";
import {ColorPicker_Container} from "./DateEventTagStyled";

export const CreateEventTag:React.FC<EventTagProps> = ({useCreateTag})=>{
    return(
        <CreateTag_Container>
            <CreateTag_Content ref={useCreateTag.colorPickerRef}>
                <CreateTagColor_Container $color={useCreateTag.newTagColor}
                                          onClick={() => useCreateTag.setColorPicker((prev) => !prev)}/>
                <CreateTagInput_Container ref={useCreateTag.createInputRef}
                                          maxLength={8}
                                          onChange={(e: ChangeEvent<HTMLInputElement>) => useCreateTag.setNewTagName(e.target.value)}/>
                <CreateTagText_Container>new</CreateTagText_Container>
                {useCreateTag.colorPicker &&
                    <ColorPicker_Container>
                        <ColorSelector color={useCreateTag.newTagColor} changeColor={useCreateTag.setNewTagColor}/>
                    </ColorPicker_Container>
                }
            </CreateTag_Content>
        </CreateTag_Container>
    )
}