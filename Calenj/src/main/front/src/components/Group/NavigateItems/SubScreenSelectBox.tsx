import {
    BoardOptionState,
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
    mapStateToBoardOptionProps
} from "../../../store/slice/BoardOptionSlice";
import {connect} from "react-redux";
import {
    FilterContent_Container,
    FilterItem_Container,
    FilterToggle_Container, FilterToggleItem,
    OptionStateText_Container, SubScreenFilter_Btn,
    SubScreenFilter_Container, SubScreenFilterButton_Container,
    SubScreenIcon_Container,
    SubScreenOption_Cotainer,
    SubScreenSelecter_Container,
    SubScreenSerachItem_Input
} from "../../../style/Group/SubScreenSelcetBoxStyle";
import React, {useEffect, useState,useRef} from "react";
import {BoardFilterMap, BoardSearchMap} from '../../../store/module/StompMiddleware';

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
    const [filterCheckA,setFilterCheckA] = useState<boolean>(false);
    const [filterCheckB,setFilterCheckB] = useState<boolean>(false);
    const [toggleA,setToggleA] = useState<boolean>(false);
    const [toggleB,setToggleB] = useState<boolean>(false);
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
        const filterRegister =BoardFilterMap.get(groupId+subScreenState)

        if(filterRegister){//Filter Setting의 기록이 있으면 세팅
            setFilter(true);
            updateBoardFilter(filterRegister)
            setFilterCheckA(filterRegister.filterA.isCheck);
            setFilterCheckB(filterRegister.filterB.isCheck);
            setToggleA(filterRegister.filterA.toggleState);
            setToggleB(filterRegister.filterB.toggleState);
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

    const filterReset = () =>{
        if(!filterCheckA && !filterCheckB) return
        setFilterCheckA(false)
        setFilterCheckB(false)
        updateBoardFilter({filterA:{isCheck:false,toggleState:false}, filterB:{isCheck:false,toggleState:false}})
        if(BoardFilterMap.get(groupId+subScreenState)){
            BoardFilterMap.delete(groupId+subScreenState);
        }
    }

    //필터 여부에 따른 토글 초기화 (로딩이 완료 된 이후 작동)
    useEffect(() => {
        if(loading) return
        if(!filterCheckA){
            setToggleA(false)
        }
        if(!filterCheckB){
            setToggleB(false)
        }
    }, [filterCheckA,filterCheckB]);

    const updateFilter =()=>{
        //기존 세팅이랑 같으면 return
        if(!filterCheckA && !filterCheckB) {
            BoardFilterMap.delete(groupId+subScreenState);
            updateBoardFilter({filterA:{isCheck:false,toggleState:false}, filterB:{isCheck:false,toggleState:false}})
            return
        }
        BoardFilterMap.set(groupId+subScreenState,
            {filterA:{isCheck:filterCheckA,toggleState:toggleA},
             filterB:{isCheck:filterCheckB,toggleState:toggleB}})
        updateBoardFilter({filterA:{isCheck:filterCheckA,toggleState:toggleA}, filterB:{isCheck:filterCheckB,toggleState:toggleB}})
    }

    return(
        <div>
            {(subScreenState ==="투표" || subScreenState ==="공지") &&
                <SubScreenSelecter_Container $clickState={subScreenState} $option={boardOption.clickState} $showUserList={showUserList}>
                    <SubScreenOption_Cotainer $option={boardOption.clickState}>

                        {boardOption.clickState ==="filter" && <OptionStateText_Container>필터 설정</OptionStateText_Container>}
                        {boardOption.clickState ==="search" && <SubScreenSerachItem_Input ref={searchRef}
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
                        <SubScreenFilter_Container>
                            <FilterItem_Container>
                                <FilterContent_Container $isClick={filterCheckA}>
                                    <input type="checkbox" style={{marginRight:'5px'}} checked={filterCheckA}
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                               if(!e.target.checked) setToggleA(false)
                                               setFilterCheckA(e.target.checked)}}/>
                                    진행/마감
                                </FilterContent_Container>
                                <FilterToggle_Container $isClick={filterCheckA}
                                                        onClick={()=> {
                                                            if(filterCheckA) setToggleA((prev) => !prev)
                                                        }}>
                                    <FilterToggleItem $isClick={filterCheckA}
                                                      $toggleState={toggleA}/>
                                </FilterToggle_Container>
                            </FilterItem_Container>
                            <FilterItem_Container>
                                <FilterContent_Container $isClick={filterCheckB}>
                                    <input type={"checkbox"} style={{marginRight:'5px'}} checked={filterCheckB}
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                               if(!e.target.checked) setToggleB(false)
                                               setFilterCheckB(e.target.checked)}}/>
                                    참여/미참여
                                </FilterContent_Container>
                                <FilterToggle_Container $isClick={filterCheckB}
                                                        onClick={()=> {
                                                            if(filterCheckB) setToggleB((prev) => !prev)
                                                        }}>
                                    <FilterToggleItem $isClick={filterCheckB}
                                                      $toggleState={toggleB}/>
                                </FilterToggle_Container>
                            </FilterItem_Container>
                            <SubScreenFilterButton_Container>
                                <SubScreenFilter_Btn onClick={updateFilter}
                                                     style={{marginRight:'5px'}}>
                                    적용
                                </SubScreenFilter_Btn>
                                <SubScreenFilter_Btn onClick={filterReset}>
                                    초기화
                                </SubScreenFilter_Btn>
                            </SubScreenFilterButton_Container>
                        </SubScreenFilter_Container>
                    }

            </SubScreenSelecter_Container>
            }

        </div>

    )
}
export default connect(mapStateToBoardOptionProps, mapDispatchToBoardOptionProps) (SubScreenSelectBox);