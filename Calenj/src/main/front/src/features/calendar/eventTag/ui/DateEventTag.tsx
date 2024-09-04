import {
    BottomContent_Container,
    DateEventTag_Container,
    TagItem_Container,
    TagItemContent_Container,
    TagItemIcon_Container,
    TagItemText_Container,
    TagTop_Container,
    TopContent_Container,
    TopIcon_Container
} from "./DateEventTagStyled";
import {ChangeEvent, useEffect, useReducer, useRef, useState} from "react";
import {CustomCheckBox} from "../../../../shared/ui/CustomCheckBox";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {
    createDateEventTag,
    updateTagClickState
} from "../../../../entities/redux/model/slice/DateEventTagSlice";
import {EventTagEdit} from "./EventTagEdit";
import {AddEventTagButton} from "./AddEventTagButton";
import {useCreateEventTag} from "../model/useCreateEventTag";
import {CreateEventTag} from "./CreateEventTag";
import {EventTagDTO, useFetchDateEventTag} from "../../../../entities/reactQuery";
import {UseQueryResult} from "@tanstack/react-query";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";

export const DateEventTag: React.FC = () => {
    const [tagToggle, setTagToggle] = useReducer((prev)=>!prev , true)
    const [groupTagToggle, setGroupTagToggle] = useReducer((prev)=>!prev , true)
    const [tagName, setTagName] = useState<string>("")
    const tagItemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)
    const useCreateTag = useCreateEventTag();
    const userId = localStorage.getItem('userId')||''
    const dateEventTagState = useFetchDateEventTag(userId);


    const dispatch = useDispatch()
    const updateEventTag = (id: string) => {
        const {isClick} = dynamicEventTag[id]
        dispatch(updateTagClickState({tagId: id, isClick: !isClick}))
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (tagItemRefs.current.every(ref => ref && !ref.contains(e.target as Node))) {
                setTagName("");
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const eventTags = dateEventTagState.data;
        if(eventTags){
            eventTags.forEach((tag:EventTagDTO)=>{
                dispatch(createDateEventTag({tagId:tag.id,name:tag.name, color:tag.color, defaultTag:tag.defaultTag, groupTag:tag.groupTag}))
            })
        }

    }, [dateEventTagState.isLoading]);



    return (
        <FullScreen_div style={{height:"calc(100% - 140px)"}}>
            <DateEventTag_Container style={{maxHeight:groupTagToggle ? "calc(50% - 15px)": "unset", minHeight: groupTagToggle ? '40px' : "unset"}}>
                <TagTop_Container onClick={setGroupTagToggle}>
                    <TopContent_Container>
                        그룹 태그
                    </TopContent_Container>
                    <TopIcon_Container>
                        {groupTagToggle ?
                            <i className="fi fi-sr-angle-small-up"></i> :
                            <i className="fi fi-sr-angle-small-down"></i>
                        }
                    </TopIcon_Container>
                </TagTop_Container>
                {groupTagToggle && <>
                    <BottomContent_Container>
                        {Object.keys(dynamicEventTag).map((id: string, index: number) => (
                            (dynamicEventTag[id].name!=='' && dynamicEventTag[id].groupTag &&
                                <TagItem_Container key={id} $isClick={tagName === id}>
                                    <TagItemContent_Container>
                                        <CustomCheckBox
                                            isCheck={dynamicEventTag[id].isClick}
                                            checkKey={id}
                                            bgColor={dynamicEventTag[id].color}
                                            updateClickState={updateEventTag}
                                        />
                                        <TagItemText_Container>
                                            {dynamicEventTag[id].name}
                                        </TagItemText_Container>

                                    </TagItemContent_Container>
                                    <div ref={el => tagItemRefs.current[index] = el}>
                                        <TagItemIcon_Container $isClick={tagName === id}>
                                           <div style={{width:'12px'}}></div>
                                        </TagItemIcon_Container>
                                        {tagName === id && <EventTagEdit id={id} top={tagItemRefs.current[index]?.getBoundingClientRect().top||0}/>}
                                    </div>

                                </TagItem_Container>
                            )
                        ))}
                    </BottomContent_Container>
                </>
                }
            </DateEventTag_Container>
            <DateEventTag_Container  style={{maxHeight:tagToggle ? "calc(50% - 15px)": "unset", minHeight: tagToggle ? '40px' : "unset"}}>
                <TagTop_Container onClick={setTagToggle}>
                    <TopContent_Container>
                        개인 태그
                    </TopContent_Container>
                    <TopIcon_Container>
                        {tagToggle ?
                            <i className="fi fi-sr-angle-small-up"></i> :
                            <i className="fi fi-sr-angle-small-down"></i>
                        }
                    </TopIcon_Container>
                </TagTop_Container>
                {tagToggle && <>
                    <BottomContent_Container>
                        {Object.keys(dynamicEventTag).map((id: string, index: number) => (
                            (dynamicEventTag[id].name!=='' && !dynamicEventTag[id].groupTag &&
                            <TagItem_Container key={id} $isClick={tagName === id}>
                                <TagItemContent_Container>
                                    <CustomCheckBox
                                        isCheck={dynamicEventTag[id].isClick}
                                        checkKey={id}
                                        bgColor={dynamicEventTag[id].color}
                                        updateClickState={updateEventTag}
                                    />
                                    <TagItemText_Container>
                                        {dynamicEventTag[id].name}
                                    </TagItemText_Container>

                                </TagItemContent_Container>
                                <div ref={el => tagItemRefs.current[index] = el}>
                                    <TagItemIcon_Container $isClick={tagName === id}
                                                           onClick={() => tagName === "" ? setTagName(id) : setTagName('')}>
                                        <i className="fi fi-rr-menu-dots-vertical"></i>
                                    </TagItemIcon_Container>
                                    {tagName === id && <EventTagEdit id={id} top={tagItemRefs.current[index]?.getBoundingClientRect().top||0}/>}
                                </div>

                            </TagItem_Container>
                            )
                        ))}
                        {useCreateTag.createTag &&
                            <CreateEventTag useCreateTag={useCreateTag}/>
                        }
                    </BottomContent_Container>
                    <AddEventTagButton useCreateTag={useCreateTag}/>
                </>
                }
            </DateEventTag_Container>
        </FullScreen_div>
    )
}