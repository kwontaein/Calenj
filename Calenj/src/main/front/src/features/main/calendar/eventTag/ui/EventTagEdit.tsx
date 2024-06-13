import {EventTagEdit_Container, EventTagItem_Container} from "./EventTagEditStyled";
import {useEffect, useRef, useState} from "react";
import {
    updateTagColor
} from "../../../../../entities/redux/model/slice/DateEventTagSlice";
import {ColorSelector} from "../../../../../shared/ui/ColorSelector";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";

interface TagEditProps {
    id: string,
    index: number,
}

export const EventTagEdit: React.FC<TagEditProps> = ({id, index}) => {
    const [colorModal, setColorModal] = useState<boolean>(false);
    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)
    const dispatch = useDispatch()
    const changeColor = (color: string) => {
        dispatch(updateTagColor({tagId: id, color: color}));
    }

    return (
        <EventTagEdit_Container $index={index} $colorChange={colorModal}>
            {!(dynamicEventTag[id].defaultTag) &&
                <EventTagItem_Container>
                    삭제하기
                </EventTagItem_Container>
            }
            <EventTagItem_Container $colorChange={colorModal} onClick={() => setColorModal(prev => !prev)}>
                태그 색 지정
            </EventTagItem_Container>
            {colorModal && <ColorSelector color={dynamicEventTag[id].color} changeColor={changeColor}/>}
        </EventTagEdit_Container>

    )
}