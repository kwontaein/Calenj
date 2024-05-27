//SubNavigation의 내용을 보여주는 컴포넌트
import {connect, useSelector} from 'react-redux'
import {
    BoardOptionState,
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
    mapStateToBoardOptionProps,
} from "../../../store/slice/BoardOptionSlice";
import {SubNavigationProps} from "../../../store/slice/SubNavigationSlice"
import {
    GroupSubScreen_Container,
    GroupSubScreenContent_Container,
    GroupSubScreenTop_Container,
    GroupSubScreenTopIcon_Container
} from "../../../style/Group/GroupSubScreenStyle";
import Vote from "../Board/Vote/Vote";
import {useEffect, useRef, useState} from "react";
import SubScreenSelectBox from "./SubScreenSelectBox";
import {BoardSearchMap, BoardParamMap} from '../../../store/module/StompMiddleware';
import {NoticeInfo} from "../../../pages/notice";
import {RootState} from "../../../store/store";


interface ContentsCompositionProps {
    showUserList: boolean,
    subScreenWidth?: number;
    subNavigateInfo: SubNavigationProps,
}


type GroupSubScreenProps = BoardOptionState & DispatchBoardOptionProps & ContentsCompositionProps;


const GroupSubScreen: React.FC<GroupSubScreenProps> = ({
                                                           subNavigateInfo,
                                                           boardOption,
                                                           subScreenWidth,
                                                           showUserList,
                                                           updateBoardParam
                                                       }) => {
    const [showSelectBox, setShowSelectBox] = useState<boolean>(false);
    const [search, setSearch] = useState<boolean>(false); //옵션 선택현황
    const selectBox = useRef<HTMLDivElement>(null);


    //subScreen이 변할 때마다 기존 세팅을 체크하여 그대로 세팅
    useEffect(() => {
        if (subNavigateInfo.clickState !== "공지" && subNavigateInfo.clickState !== "투표") return

        const searchRegister = BoardSearchMap.get(subNavigateInfo.param + subNavigateInfo.clickState)
        if (searchRegister) {
            setShowSelectBox(true)
        } else {
            setShowSelectBox(false);
        }
    }, [subNavigateInfo.param, subNavigateInfo.clickState]);

    //검색 중일 때는 유지되도록 설정
    const isSearching = (word: string) => {
        if (word !== '') {
            if (search) return;
            setSearch(true);
        } else {
            if (!search) return;
            setSearch(false)
        }
    }


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectBox.current && !selectBox.current.contains(e.target as Node)) {
                setShowSelectBox(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        if (!showSelectBox || search) {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSelectBox, search]);

    const ExitBoardDetail = () => {
        if (subNavigateInfo.clickState === "공지") {
            updateBoardParam({noticeParam: ''});
            BoardParamMap.delete(`${subNavigateInfo.param}Notice`)
        } else if (subNavigateInfo.clickState === "투표") {
            updateBoardParam({voteParam: ''});
            BoardParamMap.delete(`${subNavigateInfo.param}Vote`)
        }


    }
// subNavigateInfo.clickState==="투표" ? boardOption.voteParam===""
    return (
        <GroupSubScreen_Container $mode={subNavigateInfo.mode}>
            <GroupSubScreenTop_Container>
                {subNavigateInfo.clickState}
                <GroupSubScreenTopIcon_Container ref={selectBox}
                                                 $isClick={showSelectBox}>
                    {(subNavigateInfo.clickState === "공지" ? boardOption.noticeParam === "" : true) ?
                        <div>
                            {showSelectBox && <SubScreenSelectBox subScreenState={subNavigateInfo.clickState}
                                                                  showUserList={showUserList}
                                                                  groupId={subNavigateInfo.param}
                                                                  isSearching={isSearching}/>}
                            <i className="fi fi-rs-menu-dots" style={{marginTop: "3px"}}
                               onClick={() => {
                                   setShowSelectBox((prev) => !prev)
                               }}></i>
                        </div>
                        : <i className="fi fi-br-exit" style={{marginTop: "3px"}} onClick={ExitBoardDetail}></i>
                    }
                </GroupSubScreenTopIcon_Container>

            </GroupSubScreenTop_Container>
            <GroupSubScreenContent_Container>

                {subNavigateInfo.clickState === "투표" &&
                    <Vote groupId={subNavigateInfo.param}
                          subWidth={subScreenWidth || subNavigateInfo.screenWidthSize}/>}
                {subNavigateInfo.clickState === "공지" &&
                    <NoticeInfo groupId={subNavigateInfo.param}
                                subWidth={subScreenWidth || subNavigateInfo.screenWidthSize}/>}
            </GroupSubScreenContent_Container>
        </GroupSubScreen_Container>
    )
}
export default connect(mapStateToBoardOptionProps, mapDispatchToBoardOptionProps)(GroupSubScreen);