import {useEffect, useReducer, useRef, useState} from "react";
import {PointColor} from "../../../../shared/ui/SharedStyled";
import {createEventTagApi} from "../api/createEventTagApi";
import {AxiosResponse} from "axios";
import {createDateEventTag} from "../../../../entities/redux/model/slice/DateEventTagSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {EventTagDTO} from "../../../../entities/reactQuery";
import {useClickOutSideCheck} from "../../../../shared/model/useClickOutSideCheck";
export interface ReturnNewEventTag{
    createTag: boolean,
    setCreateTag :  React.DispatchWithoutAction,
    createInputRef: React.RefObject<HTMLInputElement>,
    newTagName: string,
    setNewTagName: React.Dispatch<React.SetStateAction<string>>,
    colorPicker :boolean,
    setColorPicker: React.Dispatch<React.SetStateAction<boolean>>,
    newTagColor: string,
    setNewTagColor: React.Dispatch<React.SetStateAction<string>>,
    colorPickerRef: React.RefObject<HTMLDivElement>,
    createNewTag:()=>void,
}

export const useCreateEventTag = ():ReturnNewEventTag =>{
    const [createTag, setCreateTag] = useReducer((prev)=>!prev,false)
    const createInputRef = useRef<HTMLInputElement>(null)
    const [newTagName, setNewTagName] = useState<string>('');
    const [colorPicker, setColorPicker] = useState<boolean>(false)
    const [newTagColor, setNewTagColor] = useState<string>(PointColor)
    const colorPickerRef = useClickOutSideCheck(colorPicker,()=>setColorPicker(false))

    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)
    const dispatch = useDispatch()

    useEffect(() => {
        setNewTagName('');
        setColorPicker(false);
        setNewTagColor(PointColor)
        if (createTag && createInputRef.current) {
            createInputRef.current.focus();
        }
    }, [createTag]);


    const createNewTag = () => {
        if (newTagName === "") return
        if (Object.keys(dynamicEventTag).some((key) => dynamicEventTag[key].name === newTagName)) {
            window.alert('이미 존재하는 태그명입니다.')
            return;
        }

        createEventTagApi(newTagName,newTagColor)
            .then((res: AxiosResponse<EventTagDTO>) => {
                window.alert('새로운 태그를 추가했습니다.')
                dispatch(createDateEventTag({
                    tagId: res.data.id,
                    name: res.data.name,
                    color: res.data.color,
                    defaultTag: res.data.defaultTag,
                    groupTag: res.data.groupTag
                }))
            });
        setCreateTag()
    }


    return { createTag,
            setCreateTag ,
            createInputRef,
            newTagName,
            setNewTagName,
            colorPicker,
            setColorPicker,
            newTagColor,
            setNewTagColor,
            colorPickerRef,
            createNewTag
    }
}