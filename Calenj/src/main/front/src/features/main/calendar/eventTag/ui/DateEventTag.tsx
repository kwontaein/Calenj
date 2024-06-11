import {
    BottomContent_Container,
    DateEventTag_Container,
    TagCheckBox,
    TagItem_Container,
    TagItemContent_Container,
    TagItemIcon_Container,
    TagItemText_Container,
    TagTop_Container,
    TopContent_Container,
    TopIcon_Container
} from "./DateEventTagStyled";
import {useEffect, useState} from "react";
import {CustomCheckBox} from "../../../../../shared/ui/CustomCheckBox";
import {PointColor} from "../../../../../shared/ui/SharedStyled";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {updateTagClickState} from "../../../../../entities/redux/model/slice/DateEventTagSlice";

export const DateEventTag : React.FC = () =>{
    const [tagToggle,setTagToggle] = useState<boolean>(true);
    const {dynamicEventTag} = useSelector((state:RootState) => state.dateEventTag)
    const dispatch = useDispatch()
    const updateEventTag = (id:string)=>{
        const {isClick} = dynamicEventTag[id]
        dispatch(updateTagClickState({name:id, isClick: !isClick}))
    }

    return (
        <DateEventTag_Container>
            <TagTop_Container onClick={()=>setTagToggle(prev=>!prev)}>
                <TopContent_Container>
                    내 캘린더
                </TopContent_Container>
                <TopIcon_Container>
                    {tagToggle ?
                        <i className="fi fi-sr-angle-small-down"></i> :
                        <i className="fi fi-sr-angle-small-up"></i>
                    }
                </TopIcon_Container>
            </TagTop_Container>
            <BottomContent_Container>
                {Object.keys(dynamicEventTag).map((id: string) => (
                    <TagItem_Container key={id}>
                        <TagItemContent_Container>
                            <CustomCheckBox
                                isCheck={dynamicEventTag[id].isClick}
                                checkKey={id}
                                bgColor={dynamicEventTag[id].color}
                                updateClickState={updateEventTag}
                            />
                            <TagItemText_Container>
                                {id}
                            </TagItemText_Container>
                        </TagItemContent_Container>
                        <TagItemIcon_Container>
                            <i className="fi fi-rr-menu-dots-vertical"></i>
                        </TagItemIcon_Container>
                    </TagItem_Container>
                ))}
            </BottomContent_Container>
        </DateEventTag_Container>
    )
}