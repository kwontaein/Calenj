import {useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {ColorOption} from "../../../../../shared/ui/MultiSelector";
import {MultiValue} from "react-select";
import {DateEventAction} from "../../../../../entities/calendar";

interface ReturnDateEventTag{
    setTag :(values: MultiValue<ColorOption>) => void,
    selectorOptionProps: ()=> ColorOption[],
}
export const useDateEventTag = (eventDispatch :React.Dispatch<DateEventAction>) :ReturnDateEventTag=>{
    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)


    //selector에 옵션 넘기기
    const selectorOptionProps = (): ColorOption[] => {
        const options: ColorOption[] = []
        Object.keys(dynamicEventTag).forEach((id) => {
            const option: ColorOption = {
                id: id,
                value: dynamicEventTag[id].name,
                label: dynamicEventTag[id].name,
                color: dynamicEventTag[id].color,
                isDisabled: dynamicEventTag[id].name === '그룹 일정',
            }
            if(dynamicEventTag[id].name!==''){
                options.push(option)
            }
        })
        return options
    }

    //selector에 선택한 태그세팅
    const setTag = (values: MultiValue<ColorOption>) => {
        if (values.length > 0) {
            eventDispatch({type: 'SET_BG_COLOR', payload: values[0].color})
        } else {
            eventDispatch({type: 'SET_BG_COLOR', payload: ''})
        }
        const tagIdList = values.map((value) => value.id)
        eventDispatch({type: 'SET_TAG_KEYS', payload: tagIdList})
    }

    return {selectorOptionProps, setTag}
}