import {MutableRefObject, useEffect, useRef, useState} from "react";
import {BoardFilterMap, BoardSearchMap} from "../../../../store/module/StompMiddleware";
import {updateBoardFilter, updateBoardSearch, updateClickState} from "../../../../store/slice/BoardOptionSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";

interface SelectBoxReturn {
    searchRef: MutableRefObject<HTMLInputElement|null>
    filter: boolean,
    setSearchWord: (value: (((prevState: string) => string) | string)) => void,

}

export const useSelectBoxState =(isSearching:(word:string)=>void):SelectBoxReturn =>{
    const searchRef = useRef<HTMLInputElement>(null);
    const [filter, setFilter] = useState<boolean>(false);
    const [searchWord,setSearchWord] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(true);
    const { param, clickState } = useSelector((state:RootState) => state.subNavigateInfo)

    const boardOption = useSelector((state:RootState) => state.boardOption)
    const dispatch = useDispatch()

    //OptionState===Search => inputFocus
    useEffect(() => {
        if(boardOption.clickState==="search"){
            setTimeout(()=>{
                searchRef.current?.focus();
            },700)
        }
    }, [boardOption.clickState])

    //랜더링 시 저장된 값 세팅
    useEffect(() => {
        const searchRegister =BoardSearchMap.get(param+clickState)
        if(searchRegister){
            dispatch(updateClickState({clickState:"search"}))
        }else{
            dispatch(updateBoardSearch({search_keyWord:""}))
        }
        const filterRegister =BoardFilterMap.get(param+"vote")
        if(filterRegister){//Filter Setting의 기록이 있으면 세팅
            setFilter(true);
            dispatch(updateBoardFilter(filterRegister))
        }else{
            //없으면 초기화
            dispatch(updateBoardFilter({filterA:{isCheck:false,toggleState:false}, filterB:{isCheck:false,toggleState:false}}))
            setFilter(false);
        }
        setLoading(false); //로딩완료
        return ()=>{
            dispatch(updateClickState({clickState:''}))
            dispatch(updateBoardSearch({search_keyWord:''}))
        }
    }, [clickState,param]);



    //랜더링 이후 검색중이었으면 다시 세팅
    useEffect(() => {
        const searchRegister =BoardSearchMap.get(param+clickState)
        if(searchRegister) {
            setTimeout(() => {
                if (!searchRef.current) return;
                searchRef.current.value = searchRegister;
                setSearchWord(searchRegister);
            }, 400)

            dispatch(updateBoardSearch({search_keyWord: searchRegister}));
        }
    }, [searchRef.current,clickState]);


    //검색중인 키워드가 세팅되면
    useEffect(()=>{
        if(loading) return
        isSearching(searchWord)
        dispatch(updateBoardSearch({search_keyWord:searchWord}));
        if(searchWord!==''){
            BoardSearchMap.set(param+clickState,searchWord);
        }else{
            BoardSearchMap.delete(param+clickState);
        }
    },[searchWord])


    return {searchRef, filter, setSearchWord}
}