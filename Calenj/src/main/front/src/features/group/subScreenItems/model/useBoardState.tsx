import {MutableRefObject, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {BoardParamMap, BoardSearchMap} from "../../../../store/module/StompMiddleware";
import {updateBoardParam} from "../../../../store/slice/BoardOptionSlice";

interface BoardStateProps{
    selectBox: MutableRefObject<HTMLDivElement|null>,
    showSelectBox : boolean,
    isSearching: (word:string)=>void,
    ExitBoardDetail: ()=>void,
    setShowSelectBox: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
export const useBoardState = ():BoardStateProps =>{
    const [showSelectBox, setShowSelectBox] = useState<boolean>(false); //selectBox on/off
    const [search,setSearch] = useState<boolean>(false); //옵션 선택현황
    const selectBox = useRef<HTMLDivElement>(null);
    const {param, clickState} = useSelector((state:RootState) => state.subNavigateInfo)
    const boardOption = useSelector((state:RootState) => state.boardOption)
    const dispatch = useDispatch()

    //subScreen이 변할 때마다 기존 세팅을 체크하여 그대로 세팅
    useEffect(() => {
        if(clickState!=="공지" && clickState!=="투표") return
        const searchRegister = BoardSearchMap.get(param+clickState)
        //이전에 검색중이었으면
        if(searchRegister){
            setShowSelectBox(true)
        }else{
            setShowSelectBox(false);
        }
    }, [param,clickState]);

    //검색 중일 때는 유지되도록 설정
    const isSearching = (word:string)=>{
        if(word!==''){
            if(search) return;
            setSearch(true);
        }else{
            if(!search) return;
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
        if(!showSelectBox || search || boardOption.clickState==="add"){ //이벤트를 삭제하여 다른 곳을 클릭해도 안닫히도록 설정
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSelectBox,search, boardOption.clickState]);

    const ExitBoardDetail =() => {
        if (clickState === "공지") {
            dispatch(updateBoardParam({noticeParam: ''}));
            BoardParamMap.delete(`${param}Notice`)
        } else if (clickState === "투표") {
            dispatch(updateBoardParam({voteParam: ''}));
            BoardParamMap.delete(`${param}Vote`)
        }
    }


    return {selectBox,showSelectBox, isSearching, ExitBoardDetail, setShowSelectBox}
}