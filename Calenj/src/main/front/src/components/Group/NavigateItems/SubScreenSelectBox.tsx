import {
    BoardOptionState,
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
    mapStateToBoardOptionProps
} from "../../../store/slice/BoardOptionSlice";
import {connect} from "react-redux";
import {
    OptionStateText_Container,
    SubScreenIcon_Container,
    SubScreenOption_Cotainer,
    SubScreenSelecter_Container,
    SubScreenSearchItem_Input
} from "../../../style/Group/SubScreenSelcetBoxStyle";
import React, {useEffect, useState,useRef} from "react";
import {BoardFilterMap, BoardSearchMap} from '../../../store/module/StompMiddleware';
import VoteFilterItems from "../Board/Vote/VoteFilterItems";

interface GroupSubScreenProps{
    groupId:string,
    subScreenState:string,
    showUserList:boolean,
    isSearching:(word:string)=>void,
}


/**
 * 1. 랜더링 시 Option의 저장된 상태가 있으면 가져옴
 * 2. 이후 subNav의 stateOption이 변경되면 옵션에 따른 저장 clickState+Option ({state: true/false ,+@})
 * 3. 상태를 저장하고 1번을 반복 ( 페이지 전환 시 처리 )
 * 3-1 페이지 전환 (subNav의 param이 변경 된 경우) => param별로 설정된 filter 및 Search옵션을 가져옴
 * 만약 설정된 filter및 search를 취소하면 원래대로 다시 세팅
 */
type SelectBoxProps = BoardOptionState & DispatchBoardOptionProps & GroupSubScreenProps;

const SubScreenSelectBox:React.FC<SelectBoxProps> =({groupId,subScreenState, showUserList, isSearching, boardOption,updateClickState, updateBoardFilter, updateBoardSearch})=>{
    const [filter, setFilter] = useState<boolean>(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchWord,setSearchWord] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(true);



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
        const searchRegister =BoardSearchMap.get(groupId+subScreenState)
        if(searchRegister){
            updateClickState({clickState:"search"})
        }else{
            updateBoardSearch({search_keyWord:""})
        }
        const filterRegister =BoardFilterMap.get(groupId+"vote")
        if(filterRegister){//Filter Setting의 기록이 있으면 세팅
            setFilter(true);
            updateBoardFilter(filterRegister)
        }else{
            //없으면 초기화
            updateBoardFilter({filterA:{isCheck:false,toggleState:false}, filterB:{isCheck:false,toggleState:false}})
            setFilter(false);
        }
        setLoading(false); //로딩완료
        return ()=>{
            updateClickState({clickState:''})
            updateBoardSearch({search_keyWord:''})
        }
    }, [subScreenState,groupId]);



    //랜더링 이후 검색중이었으면 다시 세팅
    useEffect(() => {
        const searchRegister =BoardSearchMap.get(groupId+subScreenState)
        if(searchRegister) {
            setTimeout(() => {
                if (!searchRef.current) return;
                searchRef.current.value = searchRegister;
                setSearchWord(searchRegister);
            }, 400)

            updateBoardSearch({search_keyWord: searchRegister});
        }
    }, [searchRef.current,subScreenState]);



   useEffect(()=>{
       if(loading) return
       isSearching(searchWord)
       updateBoardSearch({search_keyWord:searchWord})
       if(searchWord!==''){
           BoardSearchMap.set(groupId+subScreenState,searchWord);
       }else{
           BoardSearchMap.delete(groupId+subScreenState);
       }
   },[searchWord])



    return(
        <div>
            {(subScreenState ==="투표" || subScreenState ==="공지") &&
                <SubScreenSelecter_Container $clickState={subScreenState} $option={boardOption.clickState} $showUserList={showUserList}>
                    <SubScreenOption_Cotainer $option={boardOption.clickState}>

                        {boardOption.clickState ==="filter" && <OptionStateText_Container>필터 설정</OptionStateText_Container>}
                        {boardOption.clickState ==="search" && <SubScreenSearchItem_Input ref={searchRef}
                                                                                          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setSearchWord(e.target.value)}}/>}

                        {(subScreenState!=="공지") && (boardOption.clickState ==="" ||boardOption.clickState !=="search")  &&
                        <SubScreenIcon_Container $option={boardOption.clickState}
                                                 $filter={filter}
                                                 onClick={()=>{updateClickState({clickState:"filter"})}}>
                            <i className="fi fi-rs-filter" style={{marginTop: "3px"}}></i>
                        </SubScreenIcon_Container>
                        }
                        {boardOption.clickState !=="filter"  &&
                        <SubScreenIcon_Container $option={boardOption.clickState}
                                                 onClick={()=>{updateClickState({clickState:"search"})}}>
                            <i className="fi fi-br-search" style={{marginTop: "3px"}}></i>
                        </SubScreenIcon_Container>
                        }
                        {(boardOption.clickState===""|| boardOption.clickState==="add")  &&
                        <SubScreenIcon_Container $option={boardOption.clickState}
                                                 onClick={()=>{updateClickState({clickState:"add"})}}>
                            <i className="fi fi-sr-plus-small" style={{marginTop: "3px", fontSize:"20px"}}></i>
                        </SubScreenIcon_Container>
                        }
                    </SubScreenOption_Cotainer>

                    {boardOption.clickState ==="filter" &&
                        <VoteFilterItems groupId={groupId}/>
                    }
            </SubScreenSelecter_Container>
            }

        </div>

    )
}
export default connect(mapStateToBoardOptionProps, mapDispatchToBoardOptionProps) (SubScreenSelectBox);