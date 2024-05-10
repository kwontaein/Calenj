//SubNavigation의 내용을 보여주는 컴포넌트
import {connect} from 'react-redux'
import {
    SubNavigateState,
    mapStateToSubNavigationProps
} from "../../../store/slice/SubNavigationSlice";
import {
    GroupSubScreen_Container,
    GroupSubScreenContent_Container,
    GroupSubScreenList_HR,
    GroupSubScreenTop_Container,
    GroupSubScreenTopIcon_Container
} from "../../../style/Group/GroupSubScreenStyle";
import Vote from "../Vote/Vote";
import Notice from "../Notice/Notice";
import useComponentSize from "../../../stateFunc/useComponentSize";
import {useEffect, useRef, useState} from "react";
import SubScreenSelectBox from "./SubScreenSelectBox";

interface ContentsCompositionProps{
    groupId:string;
    memberLength?:number;
}



const GroupSubScreen : React.FC<SubNavigateState & ContentsCompositionProps> = ({subNavigateInfo,memberLength,groupId}) =>{
    const [subScreenRef, subScreenSize] = useComponentSize(); //컴포넌트의 크기를 가져옴
    const [showSelectBox, setShowSelectBox] = useState<boolean>(false);
    const selectBox = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectBox.current && !selectBox.current.contains(e.target as Node)) {
                setShowSelectBox(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectBox]);

    return(
        <GroupSubScreen_Container $mode={subNavigateInfo.mode} ref={subScreenRef}>
            <GroupSubScreenTop_Container>
                {subNavigateInfo.clickState}
                <GroupSubScreenTopIcon_Container ref={selectBox}
                                                 onClick={()=>{setShowSelectBox((prev)=>!prev)}}>
                    <i className="fi fi-rs-menu-dots"  style={{marginTop:"3px"}}></i>
                    {showSelectBox && <SubScreenSelectBox/>}
                </GroupSubScreenTopIcon_Container>
            </GroupSubScreenTop_Container>
            <GroupSubScreenList_HR/>
            <GroupSubScreenContent_Container>

                {(subNavigateInfo.clickState==="투표" && memberLength)&&
                    <Vote member={memberLength} groupId={groupId}
                          subWidth={subNavigateInfo.mode==="row"? subNavigateInfo.screenWidthSize: subScreenSize.width}/>}
                {subNavigateInfo.clickState==="공지" &&
                    <Notice groupId={groupId}
                            subWidth={subNavigateInfo.mode==="row"? subNavigateInfo.screenWidthSize: subScreenSize.width}/>}
            </GroupSubScreenContent_Container>
        </GroupSubScreen_Container>
    )
}
export default connect(mapStateToSubNavigationProps,null) (GroupSubScreen);