import {
    AddTag_Button,
    AddTagButton_Container,
    BottomContent_Container, ColorPicker_Container, CreateButton_Container,
    CreateTag_Container,
    CreateTag_Content,
    CreateTagColor_Container, CreateTagInput_Container, CreateTagText_Container,
    DateEventTag_Container,
    TagItem_Container,
    TagItemContent_Container,
    TagItemIcon_Container,
    TagItemText_Container,
    TagTop_Container,
    TopContent_Container,
    TopIcon_Container
} from "./DateEventTagStyled";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {CustomCheckBox} from "../../../../../shared/ui/CustomCheckBox";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {
    createDateEventTag, DateEventTagProps,
    dynamicEventProps, EventTagDTO,
    updateTagClickState
} from "../../../../../entities/redux/model/slice/DateEventTagSlice";
import {EventTagEdit} from "./EventTagEdit";
import {Modal_Condition_Button, PointColor} from "../../../../../shared/ui/SharedStyled";
import {ColorSelector} from "../../../../../shared/ui/ColorSelector";
import axios, {AxiosResponse} from "axios";

export const DateEventTag: React.FC = () => {
    const [tagToggle, setTagToggle] = useState<boolean>(true);
    const [tagName, setTagName] = useState<string>("")
    const tagItemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [createTag, setCreateTag] = useState<boolean>(false)
    const createInputRef = useRef<HTMLInputElement>(null)
    const [newTagName, setNewTagName] = useState<string>('');
    const [colorPicker, setColorPicker] = useState<boolean>(false)
    const [newTagColor, setNewTagColor] = useState<string>(PointColor)
    const colorPickerRef = useRef<HTMLDivElement>(null);


    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)
    const dispatch = useDispatch()
    const updateEventTag = (id: string) => {
        const {isClick} = dynamicEventTag[id]
        dispatch(updateTagClickState({tagId: id, isClick: !isClick}))
    }

    useEffect(() => {
        getEventTag();
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
        const handleClickOutside = (e: MouseEvent) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
                setColorPicker(false);
            }
        };
        if (createTag && createInputRef.current) {
            createInputRef.current.focus();
        }
        setNewTagName('');
        setColorPicker(false);
        setNewTagColor(PointColor)

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [createTag]);


    const colorSetting = (colorPicker: string) => {
        setNewTagColor(colorPicker)
    }

    const createNewTag = () => {
        if (newTagName === "") return
        if (Object.keys(dynamicEventTag).some((key) => dynamicEventTag[key].name === newTagName)) {
            window.alert('이미 존재하는 태그명입니다.')
            return;
        }
        const tag = {
            tagId: Date.now().toString(),
            name: newTagName,
            color: newTagColor,
            defaultTag: false
        }
        dispatch(createDateEventTag(tag));
        axios.post('api/createTag', tag)
            .then(() => window.alert('새로운 태그를 추가했습니다.'))
        setCreateTag(false)
    }

    //이벤트 태그를 가져와서 추가
    const getEventTag = () => {
        axios.get('api/getEventTag')
            .then((res: AxiosResponse<EventTagDTO[]>) => {
                console.log(res.data)
                res.data.map((tag) => {
                    dispatch(createDateEventTag({
                        tagId: tag.id,
                        name: tag.name,
                        color: tag.color,
                        defaultTag: tag.defaultTag
                    }))
                })
            })
            .catch((err) => console.error(err))

    }


    return (
        <DateEventTag_Container>
            <TagTop_Container onClick={() => setTagToggle(prev => !prev)}>
                <TopContent_Container>
                    내 캘린더
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
                                {tagName === id && <EventTagEdit id={id} index={index}/>}
                            </div>

                        </TagItem_Container>
                    ))}
                    {createTag &&
                        <CreateTag_Container>
                            <CreateTag_Content ref={colorPickerRef}>
                                <CreateTagColor_Container $color={newTagColor}
                                                          onClick={() => setColorPicker((prev) => !prev)}/>
                                <CreateTagInput_Container ref={createInputRef}
                                                          maxLength={8}
                                                          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTagName(e.target.value)}/>
                                <CreateTagText_Container>new</CreateTagText_Container>
                                {colorPicker &&
                                    <ColorPicker_Container>
                                        <ColorSelector color={newTagColor} changeColor={colorSetting}/>
                                    </ColorPicker_Container>
                                }
                            </CreateTag_Content>
                        </CreateTag_Container>
                    }
                </BottomContent_Container>
                <AddTagButton_Container>
                    {createTag ?
                        <CreateButton_Container>
                            <Modal_Condition_Button
                                style={{width: 'calc(50% - 10px)', height: "30px", marginLeft: '6px'}}
                                onClick={() => setCreateTag(false)}>
                                취소
                            </Modal_Condition_Button>
                            <Modal_Condition_Button $isAble={newTagName !== ""}
                                                    style={{
                                                        width: 'calc(50% - 10px)',
                                                        height: "30px",
                                                        marginLeft: '6px'
                                                    }}
                                                    onClick={createNewTag}>
                                생성하기
                            </Modal_Condition_Button>
                        </CreateButton_Container>
                        :
                        <AddTag_Button onClick={() => setCreateTag(prev => !prev)}>
                            태그 추가하기
                        </AddTag_Button>
                    }


                </AddTagButton_Container>
            </>
            }
        </DateEventTag_Container>
    )
}